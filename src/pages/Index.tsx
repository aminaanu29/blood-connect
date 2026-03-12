import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BloodRequestForm from "@/components/BloodRequestForm";

import NSSSection from "@/components/NSSSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <BloodRequestForm />
      
      <NSSSection />
      <Footer />
    </div>
  );
};

export default Index;
