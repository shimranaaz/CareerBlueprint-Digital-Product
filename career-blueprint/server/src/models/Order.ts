import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  name: string;
  email: string;
  mobile: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  status: "created" | "paid" | "failed";
  emailDelivered: boolean;
  createdAt: Date;
  paidAt?: Date;
}

const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  mobile: { type: String, required: true, trim: true },
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true }, // paise
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },
  emailDelivered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
});

export default mongoose.model<IOrder>("Order", OrderSchema);