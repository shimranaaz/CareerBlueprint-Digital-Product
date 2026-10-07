import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Extra classes: desktop grid layout, bottom margin, etc. */
  className?: string;
  /** Time between slides in ms */
  interval?: number;
};

// Custom slide animation (the browser's "smooth" can't be tuned)
function animateTo(el: HTMLElement, target: number, duration = 500) {
  const start = el.scrollLeft;
  const change = target - start;
  const t0 = performance.now();
  el.style.scrollSnapType = "none"; // stop snap fighting the animation

  const tick = (now: number) => {
    const p = Math.min((now - t0) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); // ease-out
    el.scrollLeft = start + change * ease;
    if (p < 1) requestAnimationFrame(tick);
    else el.style.scrollSnapType = ""; // restore snap
  };
  requestAnimationFrame(tick);
}

function AutoScrollRow({ children, className = "", interval = 1500 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lastInteraction = useRef(0);
  const hovering = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Only auto-scroll while the row is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    const timer = setInterval(() => {
      if (
        desktop.matches ||
        reduceMotion.matches ||
        hovering.current ||
        !visible.current ||
        Date.now() - lastInteraction.current < 1500 // pause after user touches
      ) {
        return;
      }

      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;

      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = first.offsetWidth + gap;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

      if (atEnd) {
        animateTo(el, 0);
      } else {
        animateTo(el, el.scrollLeft + step);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [interval]);

  const markInteraction = () => {
    lastInteraction.current = Date.now();
  };

  return (
    <div
      ref={ref}
      onTouchStart={markInteraction}
      onTouchMove={markInteraction}
      onPointerDown={markInteraction}
      onWheel={markInteraction}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      className={`
        flex gap-4 overflow-x-auto snap-x snap-mandatory
        -mx-4 px-4 pb-3
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:snap-none
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default AutoScrollRow;