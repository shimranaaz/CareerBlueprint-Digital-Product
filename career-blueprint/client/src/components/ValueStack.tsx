import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faBolt, faBan, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const items = [
  { label: "2 Resume Templates", value: "₹199" },
  { label: "99 Job Search Prompts", value: "₹299" },
  { label: "LinkedIn Optimization", value: "₹199" },
  { label: "Naukri Optimization", value: "₹199" },
  { label: "Interview Preparation", value: "₹199" },
];

function ValueStack() {
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

        <div className="bg-[#F5C400] rounded-2xl p-6 md:p-8 text-center mb-6">
          <p className="text-[#095859]/70 text-sm font-semibold mb-1">Today</p>
          <p className="text-4xl font-bold text-[#095859] mb-4">Just ₹99</p>
          <Link
            to="/checkout"
            className="bg-[#095859] text-white font-bold px-8 py-3.5 rounded-lg inline-flex items-center gap-2 hover:bg-[#0a6b6c] transition-colors"
          >
            Get My Job Search Kit
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
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