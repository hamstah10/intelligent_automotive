import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesMarket } from "@/components/landing/FeaturesMarket";
import { FeaturesTuning } from "@/components/landing/FeaturesTuning";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { MarketPage } from "@/components/pages/MarketPage";
import { TuningPage } from "@/components/pages/TuningPage";

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
        
        {/* Features - Market Intelligence */}
        <FeaturesMarket />
        
        {/* Features - Tuning Intelligence */}
        <FeaturesTuning />
        
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
      
      {/* Toast Notifications */}
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
