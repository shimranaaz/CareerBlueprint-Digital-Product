import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "What's Inside", href: "#whats-inside" },
    { label: "How It Works", href: "#job-search-system" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <style>{`
        .header-logo {
          height: 70px;
          width: 330px;
          margin-left: -99px;
        }
        @media (max-width: 768px) {
          .header-logo {
            height: 70px;
            width: 330px;
            margin-left: -51px;
          }
        }
      `}</style>
      <div className="max-w-6xl mx-auto pl-0 pr-4 md:pr-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/Logo.png"
              alt="Career Blueprint"
              className="object-cover header-logo"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            
              <a key={link.label}
              href={link.href}
              className="text-[#5C6B6B] hover:text-[#095859] text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/checkout"
            className="bg-[#095859] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0a6b6c] transition-colors"
          >
            Get the Kit — ₹99
          </Link>
        </div>

            <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#095859] text-2xl"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            
              <a key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#5C6B6B] text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/checkout"
            className="bg-[#095859] text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center"
          >
            Get the Kit — ₹99
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;