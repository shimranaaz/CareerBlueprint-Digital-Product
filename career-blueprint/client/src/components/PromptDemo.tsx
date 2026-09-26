import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

type Tab = "fresher" | "1-3" | "3-7";

const prompts: Record<Tab, string> = {
  fresher: `Find relevant entry-level jobs based on my degree and skills. Give me 15 job titles, companies, and locations to apply to, plus a short tip on tailoring my resume for each.`,
  "1-3": `Find relevant jobs based on my experience and skills. Give me 20 job opportunities with job titles, company names, locations and apply links.`,
  "3-7": `Find leadership-track roles that match my 3-7 years of experience. Give me 20 opportunities with job titles, companies, seniority level, and what to highlight in my application.`,
};

const tabLabels: { key: Tab; label: string }[] = [
  { key: "fresher", label: "Fresher" },
  { key: "1-3", label: "1-3 Yrs" },
  { key: "3-7", label: "3-7 Yrs" },
];

function PromptDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("fresher");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompts[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard write failed silently — no crash, just no visual feedback
    }
  };

  return (
    <section id="ai-prompt-demo" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Try a Job Search Prompt
          </h2>
          <p className="text-[#5C6B6B]">
            Feel the power of our 99 AI prompts. Here's a sample from our job search category.
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {tabLabels.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-[#095859] text-white"
                  : "bg-[#F5F8F8] text-[#5C6B6B] hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-[#F5F8F8] rounded-2xl p-6 mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-[#095859] text-sm leading-relaxed mb-4"
            >
              {prompts[activeTab]}
            </motion.p>
          </AnimatePresence>

          <button
            onClick={handleCopy}
            className="bg-[#095859] text-white text-sm font-semibold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 hover:bg-[#0a6b6c] transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCheck} />
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCopy} />
                  Copy Prompt
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold text-[#095859] mb-2">How to use it?</p>
          <ol className="text-sm text-[#5C6B6B] space-y-1 list-decimal list-inside">
            <li>Copy the prompt</li>
            <li>Paste it in ChatGPT or any AI tool</li>
            <li>Add your skills/experience</li>
            <li>Get personalized job opportunities</li>
          </ol>
        </div>

        <div className="bg-[#095859] rounded-2xl p-6 md:p-8 text-center">
          <FontAwesomeIcon icon={faLock} className="text-[#5DCAA5] text-xl mb-3" />
          <h3 className="text-white font-bold text-lg mb-1">Want all 99 prompts?</h3>
          <p className="text-white/70 text-sm mb-4">
            Get the complete Job Search Kit for just{" "}
            <span className="text-[#5DCAA5] font-bold">₹99</span>
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

export default PromptDemo;