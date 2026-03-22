import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { LiveTicker } from "@/components/landing/LiveTicker";
import { FeaturesMarket } from "@/components/landing/FeaturesMarket";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { FeaturesTuning } from "@/components/landing/FeaturesTuning";
import { ECUVisualizer } from "@/components/landing/ECUVisualizer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { MarketPage } from "@/components/pages/MarketPage";
import { TuningPage } from "@/components/pages/TuningPage";
import { LoginPage } from "@/components/pages/LoginPage";
import { RegisterPage } from "@/components/pages/RegisterPage";
import { DemoPage } from "@/components/pages/DemoPage";
import { SupportPage } from "@/components/pages/SupportPage";
import { StatusPage } from "@/components/pages/StatusPage";

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Live Deal Ticker */}
        <LiveTicker />
        
        {/* Features - Market Intelligence */}
        <FeaturesMarket />
        
        {/* ROI Calculator */}
        <ROICalculator />
        
        {/* Features - Tuning Intelligence */}
        <FeaturesTuning />
        
        {/* ECU Visualizer */}
        <ECUVisualizer />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Pricing */}
        <Pricing />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* FAQ */}
        <FAQ />
      </main>
      
      {/* Footer with CTA */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/tuning" element={<TuningPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
