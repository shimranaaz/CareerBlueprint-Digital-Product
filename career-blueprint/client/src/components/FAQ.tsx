import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Is this a subscription?",
    a: "No, it's a one-time payment of ₹99. You get lifetime access to everything included in the kit with no recurring charges.",
  },
  {
    q: "How will I receive the products?",
    a: "Immediately after payment, we email you a zip file with all the resources. You can also access everything anytime from your dashboard.",
  },
  {
    q: "Can I edit the resume templates?",
    a: "Yes. Both templates are provided as easy-to-edit HTML files that work on any device — just add your own details.",
  },
  {
    q: "Are the prompts useful for freshers?",
    a: "Yes, the prompt library includes prompts tailored specifically for freshers as well as experienced professionals.",
  },
  {
    q: "Can experienced professionals use it?",
    a: "Absolutely. The kit includes separate resources and prompts for 1-3 years and 3-7 years experience levels.",
  },
  {
    q: "Can I use the prompts with ChatGPT?",
    a: "Yes, the prompts work with ChatGPT or any other AI tool you prefer to use.",
  },
  {
    q: "Do I get a manual resume-writing service?",
    a: "No, this kit gives you AI-assisted templates and prompts to help you write and improve your resume yourself — it isn't a done-for-you writing service.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#F5F8F8] py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[#5C6B6B]">Everything you need to know.</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden mb-6">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-5 py-4"
              >
                <span className="font-medium text-[#095859] text-sm pr-4">{faq.q}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[#5C6B6B] text-xs shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#5C6B6B] px-5 pb-4 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 text-center">
          <FontAwesomeIcon icon={faHeadset} className="text-[#095859] text-xl mb-2" />
          <p className="font-semibold text-[#095859] mb-1">Still have questions?</p>
          <p className="text-sm text-[#5C6B6B] mb-4">We're here to help. Contact us anytime.</p>
          
            <a href="mailto:info.careersblueprint@gmail.com"
            className="bg-[#095859] text-white text-sm font-semibold px-5 py-2.5 rounded-lg inline-block hover:bg-[#0a6b6c] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;