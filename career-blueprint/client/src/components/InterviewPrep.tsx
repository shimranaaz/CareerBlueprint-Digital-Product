import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faMicrophone, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const topics = [
  "HR interview questions",
  "Fresher & experienced questions",
  "Tell me about yourself",
  "Strengths & weaknesses",
  "Salary questions",
  "Career gap questions",
  "Why should we hire you?",
  "STAR method",
  "Questions to ask interviewer",
  "Common mistakes to avoid",
  "AI interview preparation prompts",
];

function InterviewPrep() {
  return (
    <section id="interview-prep" className="bg-[#F5F8F8] py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Interview Preparation
          </h2>
          <p className="text-[#5C6B6B]">
            Be confident. Be prepared. Get the job.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-sm text-[#5C6B6B]">
                <FontAwesomeIcon icon={faCircleCheck} className="text-[#5DCAA5] text-xs" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#095859] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faMicrophone} className="text-[#5DCAA5] text-lg" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Interview Ready</p>
              <p className="text-white/70 text-sm">
                Turn your preparation into confidence.
              </p>
            </div>
          </div>
          <Link
            to="/checkout"
            className="bg-[#F5C400] text-[#095859] font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 whitespace-nowrap hover:brightness-95 transition"
          >
            Get Full Access
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default InterviewPrep;