import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faWrench,
  faMagnifyingGlass,
  faListCheck,
  faComments,
  faArrowRotateLeft,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const days = [
  { label: "Day 1", title: "Fix your resume", icon: faWrench },
  { label: "Day 2", title: "Optimize LinkedIn", icon: faLinkedin },
  { label: "Day 3", title: "Optimize Naukri", icon: faMagnifyingGlass },
  { label: "Day 4", title: "Find 20 relevant jobs", icon: faFileLines },
  { label: "Day 5", title: "Customize applications", icon: faListCheck },
  { label: "Day 6", title: "Prepare for interviews", icon: faComments },
  { label: "Day 7", title: "Follow up with recruiters", icon: faArrowRotateLeft },
];

function ChallengeGrid() {
  return (
    <section className="bg-[#F5F8F8] py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            7-Day Job Search Challenge
          </h2>
          <p className="text-[#5C6B6B]">
            Small steps. Big results. Follow this 7-day plan and see the difference.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {days.map((day) => (
            <div key={day.label} className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#095859]/10">
                <FontAwesomeIcon icon={day.icon} className="text-sm text-[#095859]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#5C6B6B] uppercase tracking-wide">
                  {day.label}
                </p>
                <p className="text-sm font-semibold text-[#095859]">{day.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faTrophy} className="text-[#F5C400] text-xl" />
            <p className="text-sm text-[#5C6B6B]">
              7 days. Better habits. More opportunities.
            </p>
          </div>
          <Link
            to="/checkout"
            className="bg-[#095859] text-white font-semibold px-6 py-3 rounded-lg whitespace-nowrap hover:bg-[#0a6b6c] transition-colors"
          >
            Start the 7-Day Challenge
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ChallengeGrid;