import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MechanismOfAction from "./components/MechanismOfAction";
import AboutSection from "./components/AboutSection";
import MeetPISection from "./components/MeetPISection";
import BenefitsSection from "./components/BenefitsSection";
import EnrollmentSection from "./components/EnrollmentSection";
import ConsultationSection from "./components/ConsultationSection";
import ContactSection from "./components/ContactSection";
import FloatingCTA from "./components/FloatingCTA";
import FAQSection from "./components/FAQSection";
import DoctorVideoSection from "./components/DoctorVideoSection";
import CrisisSupport from "./components/CrisisSupport";
import EligibilitySection from "./components/EligibilitySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DoctorVideoSection />
      <AboutSection />
      <EligibilitySection />
      <MechanismOfAction />
      <MeetPISection />
      <BenefitsSection />
      <EnrollmentSection />
      <FAQSection />
      <ConsultationSection />
      <ContactSection />
      <CrisisSupport />
      <Footer />
      <FloatingCTA />
    </>
  );
}
