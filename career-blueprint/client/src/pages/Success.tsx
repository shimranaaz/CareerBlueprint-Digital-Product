import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import confetti from "canvas-confetti";

function Success() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#095859", "#D65C4A", "#F5F8F8"];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-[#095859]/10 flex items-center justify-center mb-2">
        <span className="text-4xl text-[#095859]">✓</span>
      </div>
      <h1 className="text-4xl font-bold text-[#095859]">Congratulations!</h1>
      <p className="text-[#5C6B6B] max-w-sm">
        We've sent your Job Search Kit to{" "}
        {email ? <span className="font-semibold text-[#095859]">{email}</span> : "your email"}.
        Check your inbox (and spam folder) — it may take a minute to arrive.
      </p>
      <Link
        to="/"
        className="bg-[#095859] text-white font-semibold rounded-lg px-6 py-3 mt-4 hover:bg-[#0a6b6c] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Success;