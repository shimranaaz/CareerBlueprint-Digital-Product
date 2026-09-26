import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faWandMagicSparkles, faComments } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const products = [
  {
    icon: faFileLines,
    title: "2 Professional Resume Templates",
    description: "Edit, customize and use your resume anywhere.",
    linkLabel: "Preview Resumes",
    anchor: "#resume-preview",
  },
  {
    icon: faWandMagicSparkles,
    title: "99 AI Job Search Prompts",
    description: "Find jobs, improve applications, contact recruiters and prepare with AI.",
    linkLabel: "View Prompts",
    anchor: "#ai-prompt-demo",
  },
  {
    icon: faLinkedin,
    title: "LinkedIn + Naukri Optimization",
    description: "Improve your profiles so recruiters can understand your skills faster.",
    linkLabel: "See Guide",
    anchor: "#linkedin-naukri",
  },
  {
    icon: faComments,
    title: "Interview Preparation Kit",
    description: "Questions, answers, frameworks and AI prompts to prepare before your interview.",
    linkLabel: "Preview Guide",
    anchor: "#interview-prep",
  },
];
function WhatsInside() {
  return (
    <section id="whats-inside" className="bg-[#F5F8F8] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            What's Inside The Job Search Kit?
          </h2>
          <p className="text-[#5C6B6B]">
            Everything you need in one complete package. Practical tools. Proven strategies. Real results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
            >
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-[#095859]/10">
                <FontAwesomeIcon icon={p.icon} className="text-lg text-[#095859]" />
              </div>
              <h3 className="font-semibold text-[#095859] mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-[#5C6B6B] mb-5 flex-1">
                {p.description}
              </p>
              
                <a href={p.anchor}
                className="bg-[#095859] text-white text-sm font-semibold text-center py-2.5 rounded-lg hover:bg-[#0a6b6c] transition-colors"
              >
                {p.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatsInside;