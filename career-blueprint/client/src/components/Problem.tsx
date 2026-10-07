import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faMagnifyingGlass,
  faBriefcase,
  faMicrophone,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import AutoScrollRow from "./AutoScrollRow";

const problems = [
  {
    icon: faFileLines,
    title: "Your resume isn't getting noticed",
    detail: "(ATS rejects / weak format)",
  },
  {
    icon: faMagnifyingGlass,
    title: "You don't know which jobs to apply for",
    detail: "(you waste time on irrelevant jobs)",
  },
  {
    icon: faBriefcase,
    title: "Your LinkedIn / Naukri profile isn't optimized",
    detail: "(recruiters can't find you)",
  },
  {
    icon: faMicrophone,
    title: "You don't know how to prepare for interviews",
    detail: "(you feel unconfident)",
  },
];

function Problem() {
  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Why Are You Not Getting Enough Interview Calls?
          </h2>
          <p className="text-[#5C6B6B]">
            You're not alone. Many job seekers face the same challenges.
          </p>
        </div>

        {/* Mobile: auto-scrolling row | md+: 4-column grid */}
        <AutoScrollRow className="md:grid md:grid-cols-4 mb-6 md:mb-8">
          {problems.map((p) => (
            <div
              key={p.title}
              className="
                bg-[#F5F8F8] rounded-2xl p-5 border-l-4 border-[#D65C4A]
                shrink-0 w-[75%] sm:w-[45%] snap-start
                md:w-auto md:shrink
              "
            >
              <div className="flex items-start justify-between mb-3">
                <FontAwesomeIcon
                  icon={p.icon}
                  className="text-[#5C6B6B] text-xl"
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-[#D65C4A] text-lg"
                />
              </div>
              <p className="font-semibold text-[#095859] mb-1">{p.title}</p>
              <p className="text-sm text-[#5C6B6B]">{p.detail}</p>
            </div>
          ))}
        </AutoScrollRow>

        <div className="bg-[#095859] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white text-lg md:text-xl font-semibold">
            We built one simple kit to fix all four.
          </p>
          <Link
            to="/checkout"
            className="bg-[#F5C400] text-[#095859] font-bold px-6 py-3 rounded-lg whitespace-nowrap hover:brightness-95 transition inline-flex items-center gap-2"
          >
            See The Solution
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Problem;