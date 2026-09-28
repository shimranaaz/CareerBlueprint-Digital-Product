import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Roughly the height of the hero section — adjust if needed
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-[#095859] leading-tight truncate">
          Your next interview call
        </p>
        <p className="text-xs text-[#5C6B6B] leading-tight mt-0.5">
          Job search tools
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end leading-none">
          <span className="text-xs text-[#5C6B6B] line-through">₹399</span>
          <span className="text-lg font-bold text-[#095859]">₹99</span>
        </div>
        <Link
          to="/checkout"
          className="bg-[#095859] text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
        >
          GET IT
        </Link>
      </div>
    </div>
  );
}

export default StickyBar;