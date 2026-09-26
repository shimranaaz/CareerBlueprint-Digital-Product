import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const slides = [
  { image: "/fresher-resume.png", label: "Fresher Resume Template" },
  { image: "/experience-resume.png", label: "Professional Resume Template" },
  { image: "/99prompt.png", label: "99 AI Job Search Prompts" },
  { image: "/interview.png", label: "Interview Preparation Guide" },
  { image: "/linkedin.png", label: "LinkedIn Optimization Guide" },
  { image: "/naukri.png", label: "Naukri Optimization Guide" },
];

interface ProductCarouselProps {
  autoPlay?: boolean;
  interval?: number;
}

function ProductCarousel({ autoPlay = true, interval = 3500 }: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      goTo(index + 1, 1);
    }, interval);
    return () => clearInterval(timer);
  }, [index, autoPlay, interval, goTo]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={index}
            src={slides[index].image}
            alt={slides[index].label}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>

        <button
          onClick={() => goTo(index - 1, -1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#095859] shadow-sm hover:bg-white transition-colors"
          aria-label="Previous"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </button>
        <button
          onClick={() => goTo(index + 1, 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#095859] shadow-sm hover:bg-white transition-colors"
          aria-label="Next"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[#5DCAA5]" : "w-1.5 bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-white/70 text-xs mt-2">{slides[index].label}</p>
    </div>
  );
}

export default ProductCarousel;