import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import ordersRouter from "./routes/orders";
import webhooksRouter from "./routes/webhooks";
import adminRouter from "./routes/admin";
import visitsRouter from "./routes/visits";

const app = express();
app.set("trust proxy", 1);

// Always allow the production domains, plus anything set in Render env vars
const defaultOrigins = [
  "https://careerblueprint.co.in",
  "https://www.careerblueprint.co.in",
];

const envOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header = server-to-server (e.g. Razorpay webhooks), allow
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn("Blocked by CORS:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(visitsRouter);

app.use(
  "/api/webhooks",
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Career Blueprint server running" });
});

app.use("/api/orders", ordersRouter);
app.use("/api/webhooks", webhooksRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});