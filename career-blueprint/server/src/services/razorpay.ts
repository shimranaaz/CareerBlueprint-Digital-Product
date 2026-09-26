import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.error("Razorpay keys are not set in .env");
}

export const razorpay = new Razorpay({
  key_id: keyId as string,
  key_secret: keySecret as string,
});