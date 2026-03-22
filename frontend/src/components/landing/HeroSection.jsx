import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, Play, BarChart3, Cpu } from 'lucide-react';
import { useModals } from '@/App';

export const HeroSection = () => {
  const { openDemo } = useModals();
  
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1764552283704-ed67e7ad6059?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxkYXJrJTIwc2xlZWslMjBzcG9ydHMlMjBjYXIlMjBoZWFkbGlnaHRzfGVufDB8fHx8MTc3NDE0OTA4MXww&ixlib=rb-4.1.0&q=85"
          alt="Dark sports car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-lg blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CCFF00]/10 rounded-lg blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-left">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">
            Automotive Intelligence Platform
          </span>
          <span className="w-12 h-px bg-[#CCFF00]/50" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 max-w-4xl"
        >
          Die{' '}
          <span className="text-gradient-cyan">Daten</span>
          , die dein{' '}
          <span className="text-gradient-yellow">Geschäft</span>
          {' '}antreiben
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-base lg:text-lg leading-relaxed max-w-2xl mb-10"
        >
          Eine zentrale Plattform für die Automotive-Branche. Analysiere Fahrzeugmärkte, 
          erkenne Deals unter Marktwert und verstehe jedes Steuergerät.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <Button
            data-testid="hero-cta-demo"
            className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-8 py-6 text-base rounded-lg transition-transform duration-200 active:scale-95 group"
            onClick={openDemo}
          >
            Demo buchen
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button
            data-testid="hero-cta-waitlist"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base rounded-lg backdrop-blur-sm"
            onClick={() => scrollToSection('#cta')}
          >
            <Play className="mr-2 w-4 h-4" />
            Video ansehen
          </Button>
        </motion.div>

        {/* Product Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-3 px-5 py-3 bg-[#111111] border border-[#00E5FF]/30 rounded-lg">
            <BarChart3 className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-white/80 text-sm font-medium">Market Intelligence</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 bg-[#111111] border border-[#CCFF00]/30 rounded-lg">
            <Cpu className="w-5 h-5 text-[#CCFF00]" />
            <span className="text-white/80 text-sm font-medium">Tuning Intelligence</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10"
        >
          {[
            { value: '50K+', label: 'Fahrzeuge analysiert' },
            { value: '1.2M', label: 'Datenpunkte' },
            { value: '99.9%', label: 'Uptime' },
            { value: '< 1s', label: 'API Response' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] tracking-tight text-white">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-lg flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};
