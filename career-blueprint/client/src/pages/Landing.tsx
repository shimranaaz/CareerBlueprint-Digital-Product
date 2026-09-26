import Header from "../components/Header";
import Hero from "../components/Hero";
import VideoDemo from "../components/VideoDemo";
import Problem from "../components/Problem";
import WhatsInside from "../components/WhatsInside";
import PromptDemo from "../components/PromptDemo";
import ResumePreview from "../components/ResumePreview";
import PlatformTabs from "../components/PlatformTabs";
import InterviewPrep from "../components/InterviewPrep";
import Timeline from "../components/Timeline";
import ChallengeGrid from "../components/ChallengeGrid";
import WhoForCards from "../components/WhoForCards";
import ValueStack from "../components/ValueStack";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import StickyBar from "../components/StickyBar";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <VideoDemo />
      <Problem />
      <WhatsInside />
      <PromptDemo />
      <ResumePreview />
      <PlatformTabs />
      <InterviewPrep />
      <Timeline />
      <ChallengeGrid />
      <WhoForCards />
      <ValueStack />
      <Testimonials />
      <FAQ />
      <FinalCta />
      <Footer />
      <StickyBar />
    </div>
  );
}

export default Landing;