import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFileLines,
  faWrench,
  faPenToSquare,
  faAddressBook,
  faComments,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    icon: faMagnifyingGlass,
    title: "Find relevant jobs",
    description: "Discover opportunities that match your skills.",
  },
  {
    icon: faFileLines,
    title: "Understand the job description",
    description: "Know what the company really needs.",
  },
  {
    icon: faWrench,
    title: "Optimize your resume",
    description: "Make it ATS-friendly and impactful.",
  },
  {
    icon: faPenToSquare,
    title: "Customize your application",
    description: "Tailor your resume and cover letter.",
  },
  {
    icon: faAddressBook,
    title: "Contact recruiters",
    description: "Build genuine connections.",
  },
  {
    icon: faComments,
    title: "Prepare for interview",
    description: "Use our guides and AI prompts.",
  },
  {
    icon: faArrowRotateLeft,
    title: "Follow up",
    description: "Stay on top and increase your chances.",
  },
];

function Timeline() {
  return (
    <section id="job-search-system" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            Don't Just Apply. Build a Job Search System.
          </h2>
          <p className="text-[#5C6B6B]">
            Our kit gives you the right tools for every step of your journey — from finding the right jobs to getting that interview call.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200" />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex gap-4 items-start">
                <div className="relative z-10 w-10 h-10 rounded-full bg-[#095859] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="bg-[#F5F8F8] rounded-xl p-4 flex-1 flex items-center gap-3">
                  <FontAwesomeIcon icon={step.icon} className="text-[#095859] text-lg shrink-0" />
                  <div>
                    <p className="font-semibold text-[#095859] text-sm">{step.title}</p>
                    <p className="text-xs text-[#5C6B6B]">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F5F8F8] rounded-2xl p-5 text-center mt-8">
          <p className="text-sm text-[#5C6B6B]">
            Your <span className="font-bold text-[#095859]">₹99</span> kit gives you resources for every step.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Timeline;