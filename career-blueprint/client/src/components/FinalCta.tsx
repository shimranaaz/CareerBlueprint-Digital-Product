import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function FinalCta() {
  return (
    <section className="bg-[#095859] py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#E8B923] bg-gradient-to-br from-[#D9A800] via-[#F5C400] to-[#C99A00] px-5 py-8 md:px-10 md:py-10 text-center shadow-xl">
          {/* Corner ribbon */}
          <div className="absolute top-6 -right-12 w-44 rotate-45 bg-[#095859] text-white text-[10px] font-bold leading-tight tracking-wide py-1.5 shadow-md">
            LIMITED EDITION
            <br />
            BUNDLE
          </div>

          <p className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-1">
            Get a 89% Discount!
          </p>
          <p className="text-[#1A1A1A] text-sm md:text-base mb-4">
            Total Value: <span className="line-through decoration-[#8B1A1A]">~₹895+</span>
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] uppercase mb-6">
            Urgent Enrollment
          </h2>

          <Link
            to="/checkout"
            className="w-full bg-gradient-to-b from-[#0d7a7b] to-[#095859] text-white text-xl md:text-2xl font-bold uppercase py-4 rounded-xl inline-flex items-center justify-center gap-3 border border-[#F5C400]/60 shadow-lg hover:brightness-110 transition"
          >
            Claim Now
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>

          <p className="text-[#1A1A1A] text-sm md:text-base mt-5">
            Over 5,000 satisfied users
          </p>
        </div>
      </div>
    </section>
  );
}

export default FinalCta;