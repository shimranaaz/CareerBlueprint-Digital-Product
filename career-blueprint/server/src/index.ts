import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import ordersRouter from "./routes/orders";
import webhooksRouter from "./routes/webhooks";
import adminRouter from "./routes/admin";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

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