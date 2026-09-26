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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-lg">
      <span className="text-sm font-semibold text-[#095859]">
        Job Search Kit ₹99
      </span>
      <Link
        to="/checkout"
        className="bg-[#095859] text-white text-sm font-semibold px-5 py-2 rounded-lg"
      >
        GET IT
      </Link>
    </div>
  );
}

export default StickyBar;