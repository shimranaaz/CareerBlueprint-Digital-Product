import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faBolt, faBan, faArrowRight, faFire } from "@fortawesome/free-solid-svg-icons";

const items = [
  { label: "2 Resume Templates", value: "₹199" },
  { label: "99 Job Search Prompts", value: "₹299" },
  { label: "LinkedIn Optimization", value: "₹199" },
  { label: "Naukri Optimization", value: "₹199" },
  { label: "Interview Preparation", value: "₹199" },
];

// Seconds left until the next local midnight (12:00 AM), based on the visitor's device clock
function getSecondsUntilMidnight(): number {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
  const diff = Math.floor((nextMidnight.getTime() - now.getTime()) / 1000);
  return Math.min(Math.max(diff, 0), 24 * 3600 - 1);
}

function useCountdown() {
  const [totalSeconds, setTotalSeconds] = useState(getSecondsUntilMidnight);

  useEffect(() => {
    // Recalculate from the real clock every second, so it stays correct
    // after refreshes, sleeping tabs, and the midnight rollover.
    const tick = () => setTotalSeconds(getSecondsUntilMidnight());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function ValueStack() {
  const { hours, minutes, seconds } = useCountdown();

  return (
    <section className="bg-[#F5F8F8] py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Real Value. One Small Price.
          </h2>
          <p className="text-[#5C6B6B]">
            You're getting 5 powerful resources for just ₹99 (one-time payment).
          </p>
        </div>

        {/* Value list card */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <p className="text-xs text-[#5C6B6B] mb-4">
            Reference pricing shown for comparison — not sold separately.
          </p>
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm text-[#5C6B6B]">{item.label}</span>
              <span className="text-sm font-semibold text-[#095859]">{item.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4">
            <span className="font-bold text-[#095859]">Total Value</span>
            <span className="font-bold text-[#095859]">₹895+</span>
          </div>
        </div>

        {/* Timer card */}
        <div className="rounded-2xl overflow-hidden mb-4">
          <div className="bg-[#DC2626] text-white text-center font-bold px-4 py-4 text-base md:text-lg leading-snug">
            <FontAwesomeIcon icon={faFire} className="text-[#F5C400] mr-2" />
            URGENT OFFER: ONLY A FEW SPOTS LEFT AT THIS PRICE!
            <FontAwesomeIcon icon={faFire} className="text-[#F5C400] ml-2" />
          </div>
          <div className="bg-[#095859] text-white text-center px-4 py-5">
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
              <span className="text-sm md:text-base font-semibold uppercase tracking-wide">
                Expires in:
              </span>
              <div className="flex items-start gap-2 text-3xl md:text-4xl font-bold tabular-nums">
                <span>[</span>
                <div className="flex flex-col items-center">
                  <span>{pad(hours)}</span>
                  <span className="text-xs font-normal opacity-80">Hours</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{pad(minutes)}</span>
                  <span className="text-xs font-normal opacity-80">Min</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{pad(seconds)}</span>
                  <span className="text-xs font-normal opacity-80">Sec</span>
                </div>
                <span>]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer card */}
        <div className="bg-[#F5C400] rounded-2xl p-6 md:p-8 text-center mb-6">
          <p className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">
            Get a 89% Discount!
          </p>
          <p className="text-[#1A1A1A] text-sm md:text-base mb-2">
            Total Value: <span className="line-through">~₹895+</span>
          </p>
          <p className="text-5xl font-bold text-[#1A1A1A] mb-5">Just ₹99</p>
          <Link
            to="/checkout"
            className="bg-[#095859] text-white font-bold px-6 md:px-8 py-3.5 rounded-lg inline-flex items-center gap-2 hover:bg-[#0a6b6c] transition-colors shadow-lg"
          >
            Claim My Complete Job Search Kit
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <p className="text-[#1A1A1A] text-sm mt-4">
            Over 5,000 satisfied users can't be wrong!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-1.5 text-sm text-[#5C6B6B]">
            <FontAwesomeIcon icon={faShieldHalved} className="text-[#095859]" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#5C6B6B]">
            <FontAwesomeIcon icon={faBolt} className="text-[#095859]" />
            Instant Access
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#5C6B6B]">
            <FontAwesomeIcon icon={faBan} className="text-[#095859]" />
            No Subscription
          </span>
        </div>
      </div>
    </section>
  );
}

export default ValueStack;