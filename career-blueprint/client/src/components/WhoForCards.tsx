import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBriefcase,
  faRightLeft,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

const audiences = [
  {
    icon: faGraduationCap,
    title: "Freshers",
    description: "Build a professional resume and start applying with confidence.",
  },
  {
    icon: faBriefcase,
    title: "Working Professionals",
    description: "Improve your resume and profiles for your next opportunity.",
  },
  {
    icon: faRightLeft,
    title: "Job Switchers",
    description: "Prepare stronger applications and interviews.",
  },
  {
    icon: faBolt,
    title: "Active Job Seekers",
    description: "Use AI prompts to speed up your daily job search.",
  },
];

function WhoForCards() {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Who Is This For?
          </h2>
          <p className="text-[#5C6B6B]">
            No matter where you are in your career, this kit is for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="bg-[#F5F8F8] rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#095859]/10 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={a.icon} className="text-[#095859] text-lg" />
              </div>
              <div>
                <p className="font-semibold text-[#095859] mb-1">{a.title}</p>
                <p className="text-sm text-[#5C6B6B]">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoForCards;