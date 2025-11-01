import AboutSection from "../components/AboutSection";
import FaqSection from "../components/FaqSection";
import FooterSection from "../components/FooterSection";
import GuideSection from "../components/GuideSection";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <GuideSection />
      <FaqSection />
      <FooterSection />
    </>
  );
};

export default HomePage;