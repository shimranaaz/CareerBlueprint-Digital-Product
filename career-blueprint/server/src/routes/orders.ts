import { Router, Request, Response } from "express";
import crypto from "crypto";
import Order from "../models/Order";
import { razorpay } from "../services/razorpay";
import { sendKitEmail } from "../services/email";
import path from "path";

const router = Router();

const AMOUNT_PAISE = 9900; // ₹99

// Basic validators
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);

// POST /api/orders/create
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ error: "Name, email and mobile are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    if (!isValidMobile(mobile)) {
      return res.status(400).json({ error: "Invalid 10-digit Indian mobile number" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: AMOUNT_PAISE,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const order = await Order.create({
      name,
      email,
      mobile,
      razorpayOrderId: razorpayOrder.id,
      amount: AMOUNT_PAISE,
      status: "created",
    });

    return res.json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      amount: AMOUNT_PAISE,
      currency: "INR",
    });
  } catch (err) {
    console.error("Order create error:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
});

// POST /api/orders/verify
router.post("/verify", async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing verification fields" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAt: new Date(),
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const emailResult = await sendKitEmail(order.email, order.name);
    order.emailDelivered = emailResult.success;
    await order.save();

    return res.json({ success: true, orderId: order._id, emailDelivered: emailResult.success });;
  } catch (err) {
    console.error("Order verify error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
});

// GET /api/orders/:orderId
router.get("/:orderId", async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json({
      status: order.status,
      name: order.name,
      email: order.email,
      emailDelivered: order.emailDelivered,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch order" });
  }
});

// POST /api/orders/:orderId/resend
router.post("/:orderId/resend", async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "paid") {
      return res.status(400).json({ error: "Order is not paid" });
    }

    const emailResult = await sendKitEmail(order.email, order.name);
    order.emailDelivered = emailResult.success;
    await order.save();

    return res.json({ success: emailResult.success, error: emailResult.error });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to resend email" });
  }
});

// GET /api/orders/:orderId/download
router.get("/:orderId/download", async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order || order.status !== "paid") {
      return res.status(403).json({ error: "Order not found or not paid" });
    }

    const zipPath = path.join(__dirname, "..", "..", "assets", "Career-Toolkit.zip");
    return res.download(zipPath, "career-blueprint-job-search-kit.zip");
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ error: "Download failed" });
  }
});

export default router;