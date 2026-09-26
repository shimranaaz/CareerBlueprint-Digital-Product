import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface Feature {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  checklist: string[];
  video: string;
  url: string;
  badge: string;
}

const features: Feature[] = [
  {
    eyebrow: "01 — FRESHER RESUME",
    titleLine1: "Built for your first job.",
    titleLine2: "Not your fifth.",
    description:
      "A clean, ATS-friendly resume template designed specifically for freshers — structured to highlight projects, skills and internships even with zero work experience.",
    checklist: [
      "Designed for freshers with no experience gap",
      "ATS-friendly structure and formatting",
      "Fully editable HTML — no software needed",
    ],
    video: "/videos/fresher.webm",
    url: "careerblueprint.co.in/resume-fresher",
    badge: "Resume Demo",
  },
  {
    eyebrow: "02 — PROFESSIONAL RESUME",
    titleLine1: "Show the experience.",
    titleLine2: "Skip the fluff.",
    description:
      "A polished template built for working professionals — organized to lead with impact, quantify achievements, and pass recruiter screening in seconds.",
    checklist: [
      "Built for 1+ years of work experience",
      "Highlights achievements, not just duties",
      "Mobile responsive and easy to edit",
    ],
    video: "/videos/experience.webm",
    url: "careerblueprint.co.in/resume-professional",
    badge: "Resume Demo",
  },
  {
    eyebrow: "03 — AI PROMPT LIBRARY",
    titleLine1: "99 prompts.",
    titleLine2: "Zero blank pages.",
    description:
      "Copy-paste prompts for every stage of your job search — from finding relevant openings to writing outreach messages and prepping tailored answers with any AI tool.",
    checklist: [
      "Prompts for freshers, 1-3 yrs and 3-7 yrs",
      "Works with ChatGPT or any AI tool",
      "Covers job search, outreach and prep",
    ],
    video: "/videos/99prompt.webm",
    url: "careerblueprint.co.in/ai-prompts",
    badge: "Prompt Library Demo",
  },
  {
    eyebrow: "04 — NAUKRI OPTIMIZATION",
    titleLine1: "Get found by recruiters.",
    titleLine2: "Not lost in the crowd.",
    description:
      "A step-by-step guide to optimizing your Naukri profile — headline, key skills, and visibility settings that actually influence recruiter search rankings.",
    checklist: [
      "Profile headline and summary formulas",
      "Visibility and recruiter-search settings",
      "Key skills and preference optimization",
    ],
    video: "/videos/naukri.webm",
    url: "careerblueprint.co.in/naukri-guide",
    badge: "Naukri Guide Demo",
  },
  {
    eyebrow: "05 — INTERVIEW PREP",
    titleLine1: "Walk in ready.",
    titleLine2: "Walk out confident.",
    description:
      "Structured frameworks and real questions for HR and technical rounds, plus AI prompts to practice tailored answers before the interview that actually matters.",
    checklist: [
      "HR and technical question frameworks",
      "STAR method with real examples",
      "AI prompts to practice tailored answers",
    ],
    video: "/videos/interview.webm",
    url: "careerblueprint.co.in/interview-prep",
    badge: "Interview Prep Demo",
  },
];

function BrowserVideoFrame({ video, badge }: { video: string; badge: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
         <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative aspect-video bg-black">
        <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5]" />
          <span className="text-white text-xs font-medium">{badge}</span>
        </div>

                <video
          ref={videoRef}
          src={video}
          className="w-full h-full"
          style={{ objectFit: "contain" }}          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          controls={playing}
          playsInline
        />

        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
            aria-label="Play video"
          >
            <span className="w-16 h-16 rounded-full bg-[#095859] flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function VideoDemo() {
  return (
    <section className="bg-[#F5F8F8] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            See Exactly What You're Getting
          </h2>
          <p className="text-[#5C6B6B]">
            Real walkthroughs of every part of the kit.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {features.map((f, i) => (
            <div
              key={f.eyebrow}
              className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <p className="text-xs font-bold tracking-wide text-[#5DCAA5] mb-3">
                  {f.eyebrow}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#095859] leading-tight mb-4">
                  {f.titleLine1}
                  <br />
                  <span className="italic text-[#5C6B6B]">{f.titleLine2}</span>
                </h3>
                <p className="text-[#5C6B6B] mb-6 leading-relaxed">{f.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {f.checklist.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#5C6B6B]">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-[#5DCAA5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

                          <BrowserVideoFrame video={f.video} badge={f.badge} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoDemo;