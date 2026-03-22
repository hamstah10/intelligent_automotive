import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, TrendingUp, Search, Bell, Target, 
  BarChart2, Eye, Car, DollarSign, Clock, Zap, CheckCircle,
  LineChart, PieChart, Activity
} from 'lucide-react';
import { Button } from '../ui/button';

// Animated Section Component
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax Image Component
const ParallaxImage = ({ src, alt, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
};

// Counter Animation Component
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="font-['Space_Grotesk'] text-4xl lg:text-6xl font-bold text-white tracking-tighter"
    >
      {prefix}{isInView ? value : '0'}{suffix}
    </motion.span>
  );
};

export const MarketPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(heroScrollProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-[#00E5FF] z-50"
        style={{ width: progressWidth }}
      />

      {/* Back Navigation */}
      <div className="fixed top-6 left-6 z-40">
        <Link to="/">
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/5"
            data-testid="back-to-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwwfHx8fDE3NzQxNDkwODR8MA&ixlib=rb-4.1.0&q=85"
            alt="Data Analytics"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-lg bg-[#00E5FF]/10 blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Content */}
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          style={{ y: textY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono uppercase tracking-wider mb-8">
              <BarChart2 className="w-4 h-4" />
              Market Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Space_Grotesk'] text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
            data-testid="market-hero-title"
          >
            Finde den{' '}
            <span className="text-gradient-cyan">perfekten</span>
            <br />
            Deal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Während andere noch suchen, hast du bereits gekauft. 
            Market Intelligence zeigt dir Fahrzeuge unter Marktwert – in Echtzeit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 rotate-90" />
              </motion.div>
              Scroll für die Story
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-20">
            <span className="text-[#00E5FF] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
              Das Problem
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter text-white mb-8">
              Der Fahrzeugmarkt ist
              <br />
              <span className="text-white/30">unübersichtlich.</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Clock, 
                title: 'Zeitverschwendung',
                description: 'Stunden damit verbracht, durch tausende Listings zu scrollen ohne echte Insights.'
              },
              { 
                icon: DollarSign, 
                title: 'Verpasste Deals',
                description: 'Die besten Angebote sind weg, bevor du sie überhaupt siehst.'
              },
              { 
                icon: Eye, 
                title: 'Blinde Flecken',
                description: 'Keine Ahnung, was die Konkurrenz macht oder wie sich Preise entwickeln.'
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="p-8 bg-[#111111] border border-white/10 rounded-2xl h-full">
                  <item.icon className="w-10 h-10 text-[#00E5FF]/50 mb-6" />
                  <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Intro */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8">
              Stell dir vor...
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-white/60 text-xl lg:text-2xl leading-relaxed">
              ...du bekommst eine Benachrichtigung, sobald ein Fahrzeug 
              <span className="text-[#00E5FF]"> 15% unter Marktwert </span>
              gelistet wird. Noch bevor die Konkurrenz es sieht.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <span className="text-[#00E5FF] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
              Die Lösung
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
              Market Intelligence Features
            </h2>
          </AnimatedSection>

          {/* Feature 1 - Deal Score */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#00E5FF]/5 rounded-3xl blur-xl" />
                <div className="relative bg-[#111111] border border-[#00E5FF]/20 rounded-2xl p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 flex items-center justify-center">
                      <Target className="w-8 h-8 text-[#00E5FF]" />
                    </div>
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">Deal Score</h3>
                      <p className="text-[#00E5FF] text-sm">Automatische Bewertung</p>
                    </div>
                  </div>
                  
                  {/* Visual Score Display */}
                  <div className="space-y-4">
                    {[
                      { score: 92, label: 'BMW 320d Touring', price: '€24.900', savings: '-€3.100' },
                      { score: 87, label: 'Audi A4 Avant', price: '€28.500', savings: '-€2.400' },
                      { score: 78, label: 'Mercedes C-Klasse', price: '€31.200', savings: '-€1.800' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                            item.score >= 90 ? 'bg-green-500/20 text-green-400' :
                            item.score >= 80 ? 'bg-[#00E5FF]/20 text-[#00E5FF]' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.score}
                          </div>
                          <div>
                            <div className="text-white font-medium">{item.label}</div>
                            <div className="text-white/50 text-sm">{item.price}</div>
                          </div>
                        </div>
                        <div className="text-green-400 font-semibold">{item.savings}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="font-['Space_Grotesk'] text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6">
                Sofort wissen, ob sich ein Deal lohnt
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Unser Algorithmus analysiert jeden Listing basierend auf Marktpreisen, 
                Kilometerstand, Ausstattung und historischen Daten. Ein Score von 80+ 
                bedeutet: Kaufen, bevor es jemand anders tut.
              </p>
              <ul className="space-y-4">
                {[
                  'Echtzeit-Marktpreisvergleich',
                  'Kilometerstand-Analyse',
                  'Ausstattungs-Bewertung',
                  'Historische Preisentwicklung'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-[#00E5FF]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Feature 2 - Real-time Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <AnimatedSection className="lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#00E5FF]/5 rounded-3xl blur-xl" />
                <div className="relative bg-[#111111] border border-[#00E5FF]/20 rounded-2xl p-8 overflow-hidden">
                  {/* Alert Notifications Stack */}
                  <div className="space-y-4">
                    {[
                      { time: 'Gerade eben', title: 'Neuer Deal gefunden!', desc: 'BMW 320d - Score 94', urgent: true },
                      { time: 'Vor 5 Min', title: 'Preissenkung', desc: 'Audi A4 - €1.500 günstiger', urgent: false },
                      { time: 'Vor 12 Min', title: 'Neues Listing', desc: 'Mercedes C220d - Passt zu Suche #3', urgent: false },
                    ].map((alert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.15 }}
                        className={`p-4 rounded-xl border ${
                          alert.urgent 
                            ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30' 
                            : 'bg-[#0A0A0A] border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              alert.urgent ? 'bg-[#00E5FF]/20' : 'bg-white/5'
                            }`}>
                              <Bell className={`w-5 h-5 ${alert.urgent ? 'text-[#00E5FF]' : 'text-white/50'}`} />
                            </div>
                            <div>
                              <div className="text-white font-medium">{alert.title}</div>
                              <div className="text-white/50 text-sm">{alert.desc}</div>
                            </div>
                          </div>
                          <span className="text-white/30 text-xs">{alert.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:order-1">
              <h3 className="font-['Space_Grotesk'] text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6">
                Nie wieder einen Deal verpassen
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Definiere deine Suchkriterien und werde sofort benachrichtigt – 
                per E-Mail, Push oder SMS. Du entscheidest, wann und wie.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '<30s', label: 'Alert-Zeit' },
                  { value: '24/7', label: 'Monitoring' },
                  { value: '∞', label: 'Suchprofile' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-[#111111] border border-white/10 rounded-xl text-center"
                  >
                    <div className="text-[#00E5FF] text-2xl font-bold font-['Space_Grotesk']">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Feature 3 - Competitor Monitoring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#00E5FF]/5 rounded-3xl blur-xl" />
                <div className="relative bg-[#111111] border border-[#00E5FF]/20 rounded-2xl p-8">
                  {/* Competitor Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Autohaus Müller', listings: 47, change: '+12%', trend: 'up' },
                      { name: 'Car Center Nord', listings: 89, change: '-5%', trend: 'down' },
                      { name: 'Premium Cars GmbH', listings: 124, change: '+3%', trend: 'up' },
                      { name: 'Auto König', listings: 62, change: '+8%', trend: 'up' },
                    ].map((dealer, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-[#0A0A0A] rounded-xl"
                      >
                        <div className="text-white font-medium text-sm mb-2">{dealer.name}</div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-bold text-white">{dealer.listings}</div>
                          <div className={`text-sm ${dealer.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {dealer.change}
                          </div>
                        </div>
                        <div className="text-white/40 text-xs mt-1">Listings</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3 className="font-['Space_Grotesk'] text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6">
                Wisse, was die Konkurrenz macht
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Behalte Händler im Blick: Neue Listings, Preisänderungen, 
                Bestandsentwicklung. Reagiere schneller als alle anderen.
              </p>
              <ul className="space-y-4">
                {[
                  'Händler-Bestände tracken',
                  'Preisstrategien analysieren',
                  'Marktanteile vergleichen',
                  'Trend-Prognosen erhalten'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-[#00E5FF]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tighter text-white">
              Die Zahlen sprechen für sich
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K', suffix: '+', label: 'Fahrzeuge analysiert' },
              { value: '€2.3', suffix: 'M', label: 'Ersparnis für Kunden' },
              { value: '1.2', suffix: 'M', label: 'Datenpunkte täglich' },
              { value: '< 30', suffix: 's', label: 'Alert-Geschwindigkeit' },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 text-sm mt-2">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
              Bereit, keine Deals
              <br />
              mehr zu verpassen?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Starte jetzt mit Market Intelligence und entdecke 
              Fahrzeuge unter Marktwert – bevor es andere tun.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#cta">
                <Button 
                  className="bg-[#00E5FF] text-black hover:bg-[#00CDE6] font-semibold px-8 py-6 text-lg rounded-lg"
                  data-testid="market-cta-demo"
                >
                  Demo buchen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-lg"
                >
                  Zurück zur Übersicht
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" 
              alt="intelligent automotive"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-xs font-['Space_Grotesk'] tracking-tight">
                intelligent
              </span>
              <span className="text-[#00E5FF] font-bold text-xs font-['Space_Grotesk'] tracking-tight">
                automotive
              </span>
            </div>
          </div>
          <p className="text-white/40 text-sm">© 2024 intelligent-automotive. Market Intelligence.</p>
        </div>
      </footer>
    </div>
  );
};
