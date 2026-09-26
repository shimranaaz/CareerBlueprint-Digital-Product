import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Order from "../models/Order";

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const orderId = process.argv[2];
  if (!orderId) {
    console.error("Usage: ts-node src/scripts/markPaid.ts <orderId>");
    process.exit(1);
  }
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: "paid", paidAt: new Date() },
    { new: true }
  );
  console.log(order);
  process.exit(0);
};

run();