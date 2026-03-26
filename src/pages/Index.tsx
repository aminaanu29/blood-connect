import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import BloodRequestForm from "@/components/BloodRequestForm";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <BloodRequestForm />
      
      
      <Footer />
    </div>
  );
};

export default Index;
