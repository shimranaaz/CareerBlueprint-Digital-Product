import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCarouselLight from "../components/ProductCarouselLight";
import {
  faMobileScreen,
  faCreditCard,
  faBuildingColumns,
  faWallet,
  faShieldHalved,
  faBolt,
  faBan,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import api from "../lib/api";
import { loadRazorpayScript } from "../lib/loadRazorpay";

const paymentMethods = [
  { key: "upi", label: "UPI (Recommended)", icon: faMobileScreen },
  { key: "card", label: "Card", icon: faCreditCard },
  { key: "netbanking", label: "Net Banking", icon: faBuildingColumns },
  { key: "wallet", label: "Wallet", icon: faWallet },
];

const loadingMessages = [
  "Creating your secure order...",
  "Connecting to payment gateway...",
  "Almost there, hang tight...",
  "Our server is waking up, this can take up to 30 seconds...",
];

function Checkout() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Loader overlay state
  const [busy, setBusy] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [overlayText, setOverlayText] = useState<string | null>(null);

  // Rotate status messages while the overlay is showing
  useEffect(() => {
    if (!busy) {
      setMsgIndex(0);
      return;
    }
    const id = setInterval(
      () => setMsgIndex((i) => Math.min(i + 1, loadingMessages.length - 1)),
      5000
    );
    return () => clearInterval(id);
  }, [busy]);

  // Warm up the backend as soon as the page opens (helps with cold starts)
  useEffect(() => {
    api.get("/api/health").catch(() => {});
  }, []);

  const validate = (): string | null => {
    if (!name.trim()) return "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email";
    if (!/^[6-9]\d{9}$/.test(mobile)) return "Please enter a valid 10-digit mobile number";
    return null;
  };

  const resetState = () => {
    setLoading(false);
    setBusy(false);
    setOverlayText(null);
  };

  const handlePay = async () => {
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setBusy(true);

    try {
      const { data: order } = await api.post("/api/orders/create", {
        name,
        email,
        mobile,
      });

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError("Failed to load payment gateway. Please check your internet connection and try again.");
        resetState();
        return;
      }

      const options = {
        key: order.razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "Career Blueprint",
        description: "Job Search Kit",
        order_id: order.razorpayOrderId,
        prefill: { name, email, contact: mobile },
        theme: { color: "#095859" },
        handler: async (response: any) => {
          setOverlayText("Verifying your payment, please don't close this page...");
          setBusy(true);
          try {
            const { data: verifyResult } = await api.post("/api/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResult.success) {
              navigate(`/success?email=${encodeURIComponent(email)}`);
            } else {
              setError("Payment verification failed. Please contact support.");
              resetState();
            }
          } catch {
            setError("Payment verification failed. Please contact support.");
            resetState();
          }
        },
        modal: {
          ondismiss: () => {
            resetState();
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", () => {
        setError("Payment failed. Please try again.");
        resetState();
      });

      // Hide our overlay; Razorpay's own modal takes over
      setBusy(false);
      razorpay.open();
    } catch {
      setError("Something went wrong while creating your order. Please try again.");
      resetState();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F8] flex items-center justify-center px-4 py-10">
      {/* Loader overlay */}
      {busy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs text-center">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-[#095859]/20 border-t-[#095859] animate-spin" />
            <p className="text-sm font-semibold text-[#095859] mb-1">
              {overlayText ?? loadingMessages[msgIndex]}
            </p>
            <p className="text-xs text-[#5C6B6B]">
              Please don't close or refresh this page.
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium text-[#095859] mb-4 hover:text-[#0a6b6c] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:sticky md:top-10">
            <h2 className="text-sm font-semibold text-[#095859] mb-4 text-center">
              What's Inside Your Kit
            </h2>
            <ProductCarouselLight />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 w-full max-w-md mx-auto md:mx-0">
            <h1 className="text-xl font-bold text-[#095859] mb-1">Secure Checkout</h1>
            <p className="text-sm text-[#5C6B6B] mb-6">
              Fill in your details to get instant access. Job Search Kit — ₹99
            </p>

            {error && (
              <div className="bg-red-50 text-[#D65C4A] text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-[#5C6B6B] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#095859]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5C6B6B] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#095859]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5C6B6B] mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#095859]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#5C6B6B] mb-2">
                Payment Method
              </label>
              <div className="flex flex-col gap-2">
                {paymentMethods.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMethod(m.key)}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 text-sm text-left transition-colors ${
                      method === m.key
                        ? "border-[#095859] bg-[#095859]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        method === m.key ? "border-[#095859]" : "border-gray-300"
                      }`}
                    >
                      {method === m.key && (
                        <span className="w-2 h-2 rounded-full bg-[#095859]" />
                      )}
                    </span>
                    <FontAwesomeIcon icon={m.icon} className="text-[#095859] text-sm" />
                    <span className="text-[#095859] font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#5C6B6B]/70 mt-2">
                Razorpay's checkout handles the actual method selection.
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#095859] text-white font-bold rounded-lg py-3.5 disabled:opacity-60 hover:bg-[#0a6b6c] transition-colors"
            >
              {loading && (
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              )}
              {loading ? "Processing..." : "PAY ₹99"}
            </button>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-5 pt-5 border-t border-gray-100">
              <span className="flex items-center gap-1.5 text-xs text-[#5C6B6B]">
                <FontAwesomeIcon icon={faShieldHalved} className="text-[#095859]" />
                Secure Payment
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#5C6B6B]">
                <FontAwesomeIcon icon={faBolt} className="text-[#095859]" />
                Instant Access
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#5C6B6B]">
                <FontAwesomeIcon icon={faBan} className="text-[#095859]" />
                No Subscription
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;