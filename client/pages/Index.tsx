import Header from "@/components/Header";
import EnhancedHero from "@/components/EnhancedHero";
import EnhancedServices from "@/components/EnhancedServices";
import Method from "@/components/Method";
import EnhancedPortfolio from "@/components/EnhancedPortfolio";
import KPIStrip from "@/components/KPIStrip";
import TechStack from "@/components/TechStack";
import WhyUs from "@/components/WhyUs";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <EnhancedHero />
      <EnhancedServices />
      <Method />
      <EnhancedPortfolio />
      <KPIStrip />
      <TechStack />
      <WhyUs />
      <FinalCTA />
      <Footer />
    </div>
  );
}
