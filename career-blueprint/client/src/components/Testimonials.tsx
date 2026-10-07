import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import AutoScrollRow from "./AutoScrollRow";

const testimonials = [
  {
    tag: "Fresher",
    quote:
      "I was applying for jobs every day but hardly getting any responses. The resume template and LinkedIn tips helped me improve my profile and apply in a better way. Within a week, I started getting more responses from recruiters.",
    author: "B.Com Graduate, Fresher",
  },
  {
    tag: "Career Switcher",
    quote:
      "Honestly, I wasn't sure about buying it because it was only ₹99. But the job-search prompts were actually useful. Instead of spending hours figuring out what to ask ChatGPT, I could just use the prompts and get started quickly.",
    author: "2 Years Experience, Career Switcher",
  },
  {
    tag: "Experienced Job Seeker",
    quote:
      "The interview preparation section was the most useful for me. I went through it before my interviews and it helped me understand what I should prepare and how to answer better. I felt much more confident going into the interviews.",
    author: "Experienced Professional",
  },
  {
    tag: "Mid-Level Professional",
    quote:
      "I had already tried a few free resume templates, but I was still not getting shortlisted. This helped me improve my resume structure, keywords and LinkedIn profile. It was simple to use and gave me a much better idea of how to present my experience.",
    author: "Mid-Level Professional",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            What Our Users Say
          </h2>
          <p className="text-[#5C6B6B]">Real people. Real progress.</p>
          <p className="text-xs text-[#5C6B6B]/70 mt-1 italic">
            Sample reviews shown for illustration in this preview build.
          </p>
        </div>

        {/* Mobile: auto-scrolling row | md+: 2-column grid */}
        <AutoScrollRow
          className="md:grid md:grid-cols-2 md:gap-5"
          interval={2400}
        >
          {testimonials.map((t) => (
            <div
              key={t.tag}
              className="
                bg-[#F5F8F8] rounded-2xl p-6 flex flex-col
                shrink-0 w-[85%] sm:w-[60%] snap-start
                md:w-auto md:shrink
              "
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#095859] bg-[#095859]/10 px-3 py-1 rounded-full">
                  {t.tag}
                </span>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-[#095859]/20 text-xl"
                />
              </div>

              <p className="text-sm text-[#5C6B6B] leading-relaxed mb-5 flex-1">
                {t.quote}
              </p>

              <div className="flex items-center gap-2 border-t border-[#095859]/10 pt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] shrink-0" />
                <p className="text-sm font-semibold text-[#095859]">{t.author}</p>
              </div>
            </div>
          ))}
        </AutoScrollRow>
      </div>
    </section>
  );
}

export default Testimonials;