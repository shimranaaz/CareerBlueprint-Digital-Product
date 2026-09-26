import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    image: "/priya.jpg",
    name: "Priya S.",
    tag: "Fresher",
    quote: "Got my first interview call within 2 weeks of using the prompts and resume template. Really helpful.",
  },
  {
    image: "/arjun.jpg",
    name: "Arjun K.",
    tag: "3+ Years Exp.",
    quote: "The LinkedIn and Naukri optimization guide helped me get noticed by recruiters. Highly recommend!",
  },
  {
    image: "/sneha.jpg",
    name: "Sneha R.",
    tag: "Job Seeker",
    quote: "The interview preparation section was a game changer. I felt confident and well prepared.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#095859] mb-2">
            What Our Users Say
          </h2>
          <p className="text-[#5C6B6B]">Real people. Real progress.</p>
          <p className="text-xs text-[#5C6B6B]/70 mt-1 italic">
            Sample reviews shown for illustration in this preview build.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#F5F8F8] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.image}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover bg-[#095859]/10"
                />
                <div>
                  <p className="font-semibold text-[#095859] text-sm">{t.name}</p>
                  <p className="text-xs text-[#5C6B6B]">{t.tag}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-[#F5C400] text-xs" />
                ))}
              </div>
              <p className="text-sm text-[#5C6B6B] leading-relaxed">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;