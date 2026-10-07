import { Router } from "express";
import Visit from "../models/Visit";
// import your existing admin auth middleware, e.g.:
// import { requireAdmin } from "../middleware/auth";

const router = Router();

// Public: called once per visit. 1st visit -> 1, 2nd -> 2, ...
router.post("/api/visits", async (_req, res) => {
  try {
    const doc = await Visit.findOneAndUpdate(
      { key: "site" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    res.json({ count: doc.count });
  } catch {
    res.status(500).json({ message: "Failed to record visit" });
  }
});

// Admin only: use the SAME middleware as your other /api/admin routes
router.get("/api/admin/visits", /* requireAdmin, */ async (_req, res) => {
  const doc = await Visit.findOne({ key: "site" });
  res.json({ count: doc?.count ?? 0 });
});

export default router;