import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function FinalCta() {
  return (
    <section className="bg-[#095859] py-16 px-4 md:px-8 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-5xl font-bold text-[#5DCAA5] mb-3">₹99</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to Upgrade Your Job Search?
        </h2>
        <p className="text-white/70 mb-8">
          Get the complete Career Blueprint Job Search Kit today.
        </p>
        <Link
          to="/checkout"
          className="bg-[#F5C400] text-[#095859] font-bold px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:brightness-95 transition"
        >
          Get My Job Search Kit
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </section>
  );
}

export default FinalCta;