import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faArrowRight,
  faFileCode,
  faMobileScreen,
  faCircleCheck,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

type Tab = "fresher" | "professional";

const badges = [
  { icon: faFileCode, label: "HTML Format" },
  { icon: faMobileScreen, label: "Mobile Responsive" },
  { icon: faCircleCheck, label: "ATS-Friendly" },
  { icon: faPenToSquare, label: "Easy to Edit" },
];

const templateImages: Record<Tab, string> = {
  fresher: "/resume-fresher.png",
  professional: "/geometric-blue.webp",
};

function ResumePreview() {
  const [activeTab, setActiveTab] = useState<Tab>("fresher");

  return (
    <section id="resume-preview" className="bg-[#F5F8F8] py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Professional Resume Templates
          </h2>
          <p className="text-[#5C6B6B]">
            Two ready-to-edit HTML templates. Modern, clean and ATS-friendly.
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => setActiveTab("fresher")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "fresher"
                ? "bg-[#095859] text-white"
                : "bg-white text-[#5C6B6B] hover:bg-gray-100"
            }`}
          >
            Fresher Template
          </button>
          <button
            onClick={() => setActiveTab("professional")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "professional"
                ? "bg-[#095859] text-white"
                : "bg-white text-[#5C6B6B] hover:bg-gray-100"
            }`}
          >
            Professional Template
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F5F8F8] rounded-xl overflow-hidden flex justify-center"
            >
              <img
                src={templateImages[activeTab]}
                alt={activeTab === "fresher" ? "Fresher resume template" : "Professional resume template"}
                className="max-h-[420px] w-auto object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-5">
            
              <a href="#checkout-cta"
              className="text-[#095859] text-sm font-semibold inline-flex items-center gap-1.5 hover:underline"
            >
              View Template
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 pt-5 border-t border-gray-100">
            {badges.map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-1.5 text-xs text-[#5C6B6B]"
              >
                <FontAwesomeIcon icon={b.icon} className="text-[#095859]" />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#095859] rounded-2xl p-6 md:p-8 text-center">
          <FontAwesomeIcon icon={faLock} className="text-[#5DCAA5] text-xl mb-3" />
          <h3 className="text-white font-bold text-lg mb-1">Unlock Both Templates</h3>
          <p className="text-white/70 text-sm mb-4">
            Get both professional templates with the complete{" "}
            <span className="text-[#5DCAA5] font-bold">₹99</span> Job Search Kit.
          </p>
          <Link
            to="/checkout"
            className="bg-[#F5C400] text-[#095859] font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:brightness-95 transition"
          >
            Get Full Access
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResumePreview;