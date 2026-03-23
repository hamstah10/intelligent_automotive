import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { DashboardThemeProvider, useDashTheme } from "@/components/dashboard/DashboardThemeContext";
import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { LiveTicker } from "@/components/landing/LiveTicker";
import { FeaturesMarket } from "@/components/landing/FeaturesMarket";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { FeaturesTuning } from "@/components/landing/FeaturesTuning";
import { ECUVisualizer } from "@/components/landing/ECUVisualizer";
import { AIDealAnalyzer } from "@/components/landing/AIDealAnalyzer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { RealtimeCounter } from "@/components/landing/RealtimeCounter";
import { IntegrationShowcase } from "@/components/landing/IntegrationShowcase";
import { ParallaxDataWall } from "@/components/landing/ParallaxDataWall";
import { DealQuiz } from "@/components/landing/DealQuiz";
import { VehicleConfigurator } from "@/components/landing/VehicleConfigurator";
import { BeforeAfterSlider } from "@/components/landing/BeforeAfterSlider";
import { CompetitorRadar } from "@/components/landing/CompetitorRadar";
import { MarketHeatmap } from "@/components/landing/MarketHeatmap";
import { MarketPage } from "@/components/pages/MarketPage";
import { TuningPage } from "@/components/pages/TuningPage";
import { LoginPage } from "@/components/pages/LoginPage";
import { RegisterPage } from "@/components/pages/RegisterPage";
import { DemoPage } from "@/components/pages/DemoPage";
import { SupportPage } from "@/components/pages/SupportPage";
import { StatusPage } from "@/components/pages/StatusPage";
import DashboardPage from "@/components/dashboard/DashboardPage";

const HomePage = () => {
  return (
    <div className="site-page min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <HeroSection />
        <IntegrationShowcase />
        <LiveTicker />
        <RealtimeCounter />
        <FeaturesMarket />
        <MarketHeatmap />
        <ParallaxDataWall />
        <ROICalculator />
        <VehicleConfigurator />
        <DealQuiz />
        <FeaturesTuning />
        <ECUVisualizer />
        <AIDealAnalyzer />
        <BeforeAfterSlider />
        <CompetitorRadar />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

const AppInner = () => {
  const { theme } = useDashTheme();

  return (
    <div data-site-theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/tuning" element={<TuningPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/system-status" element={<StatusPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === 'light' ? '#ffffff' : '#111111',
            border: `1px solid ${theme === 'light' ? '#e2e5eb' : 'rgba(255,255,255,0.1)'}`,
            color: theme === 'light' ? '#1a1a2e' : '#fff',
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <DashboardThemeProvider>
        <AppInner />
      </DashboardThemeProvider>
    </BrowserRouter>
  );
}

export default App;
