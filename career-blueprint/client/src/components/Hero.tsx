import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCarousel from "./ProductCarousel";

function Hero() {
  return (
    <section className="bg-[#095859] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            ● ONE-TIME PAYMENT
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Get Your Job Search Kit for Just{" "}
            <span className="text-[#5DCAA5]">₹99</span>
          </h1>

          <p className="text-white/80 text-base md:text-lg mb-8">
            2 Resume Templates + 99 AI Job Search Prompts + LinkedIn &amp;
            Naukri Optimization + Interview Preparation. Everything you need
            to search and apply for jobs smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              to="/checkout"
              className="bg-[#F5C400] text-[#095859] font-bold px-6 py-3.5 rounded-lg text-center hover:brightness-95 transition inline-flex items-center justify-center gap-2"
            >
              GET EVERYTHING FOR ₹99
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
            {["Instant Access", "One-Time Payment", "No Subscription"].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-white/80"
                >
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[#5DCAA5]" />
                  {item}
                </span>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">₹99</span>
            <span className="text-white/50 line-through text-lg">₹499</span>
            <span className="relative bg-[#F5C400] text-[#095859] text-xs font-bold px-3 py-1.5 rounded-full -rotate-6 shadow-sm">
              Launch Offer
            </span>
          </div>
        </div>

              <div className="flex justify-center">
          <ProductCarousel />
        </div>
      </div>
    </section>
  );
}

export default Hero;