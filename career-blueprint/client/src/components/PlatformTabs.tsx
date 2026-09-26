import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faCircleCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Platform = "linkedin" | "naukri";

interface PlatformContent {
  title: string;
  items: string[];
  cta: string;
}

const linkedinContent: PlatformContent = {
  title: "LinkedIn Optimization Includes:",
  items: [
    "Headline formula",
    "About section guide",
    "Skills optimization",
    "Experience section",
    "Profile photo & banner tips",
    "Featured section",
    "Open-to-work setup",
    "Recruiter visibility",
    "Job search strategy",
    "Recruiter message templates",
  ],
  cta: "View LinkedIn Guide",
};

const naukriContent: PlatformContent = {
  title: "Naukri Optimization Includes:",
  items: [
    "Profile headline",
    "Key skills",
    "Resume headline",
    "Profile summary",
    "Employment details",
    "Preferred job settings",
    "Location preferences",
    "Recruiter visibility",
    "Profile update strategy",
  ],
  cta: "View Naukri Guide",
};

function PlatformTabs() {
  const [platform, setPlatform] = useState<Platform>("linkedin");
  const active = platform === "linkedin" ? linkedinContent : naukriContent;

  return (
    <section id="linkedin-naukri" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            LinkedIn + Naukri Optimization
          </h2>
          <p className="text-[#5C6B6B]">
            Get noticed by recruiters. Make your profile work for you.
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => setPlatform("linkedin")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
              platform === "linkedin"
                ? "bg-[#095859] text-white"
                : "bg-[#F5F8F8] text-[#5C6B6B] hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={faLinkedin} />
            LinkedIn
          </button>
          <button
            onClick={() => setPlatform("naukri")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
              platform === "naukri"
                ? "bg-[#095859] text-white"
                : "bg-[#F5F8F8] text-[#5C6B6B] hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Naukri
          </button>
        </div>

        <div className="bg-[#F5F8F8] rounded-2xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-semibold text-[#095859] mb-4">{active.title}</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {active.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#5C6B6B]">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-[#5DCAA5] text-xs" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/checkout"
                className="bg-[#095859] text-white text-sm font-semibold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 hover:bg-[#0a6b6c] transition-colors"
              >
                {active.cta}
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default PlatformTabs;