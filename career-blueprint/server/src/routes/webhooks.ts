import { Router, Request, Response } from "express";
import crypto from "crypto";
import Order from "../models/Order";
import { sendKitEmail } from "../services/email";

const router = Router();

// POST /api/webhooks/razorpay
// NOTE: this route needs the raw request body (not JSON-parsed) to verify the signature correctly.
router.post("/razorpay", async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
    const signature = req.headers["x-razorpay-signature"] as string;

    if (!signature) {
      return res.status(400).json({ error: "Missing signature" });
    }

    const rawBody = (req as any).rawBody as Buffer;

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Webhook signature mismatch");
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    const event = JSON.parse(rawBody.toString());

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      const order = await Order.findOne({ razorpayOrderId });

      if (order && order.status !== "paid") {
        order.status = "paid";
        order.razorpayPaymentId = razorpayPaymentId;
        order.paidAt = new Date();
        await order.save();
        console.log(`Order ${order._id} marked paid via webhook`);
             const emailResult = await sendKitEmail(order.email, order.name);
        order.emailDelivered = emailResult.success;
        await order.save();
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;