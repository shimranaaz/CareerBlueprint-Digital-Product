import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order";
import { adminAuth } from "../middleware/adminAuth";
import { sendKitEmail } from "../services/email";

const router = Router();

// POST /api/admin/login
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });

   res.cookie("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({ success: true });
});

// POST /api/admin/logout
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.json({ success: true });
});

// GET /api/admin/me — check if session is valid
router.get("/me", adminAuth, (_req: Request, res: Response) => {
  return res.json({ authenticated: true });
});

// GET /api/admin/orders
router.get("/orders", adminAuth, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const search = (req.query.search as string) || "";
    const status = (req.query.status as string) || "";

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (status && status !== "all") {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    const allPaid = await Order.find({ status: "paid" });
    const totalRevenue = allPaid.reduce((sum, o) => sum + o.amount, 0) / 100;

    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);
    const thisMonthPaid = allPaid.filter((o) => o.paidAt && o.paidAt >= thisMonthStart);
    const revenueThisMonth = thisMonthPaid.reduce((sum, o) => sum + o.amount, 0) / 100;

    return res.json({
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      summary: {
        totalOrders: await Order.countDocuments(),
        totalPaid: allPaid.length,
        totalRevenue,
        revenueThisMonth,
      },
    });
  } catch (err) {
    console.error("Admin orders fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/admin/orders/:orderId/resend
router.post("/orders/:orderId/resend", adminAuth, async (req: Request, res: Response) => {
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
    console.error("Admin resend error:", err);
    return res.status(500).json({ error: "Failed to resend email" });
  }
});

// DELETE /api/admin/orders/:orderId
router.delete("/orders/:orderId", adminAuth, async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error("Admin delete error:", err);
    return res.status(500).json({ error: "Failed to delete order" });
  }
});


export default router;