import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, Cpu, FileText, Wrench, Database, 
  GitBranch, AlertTriangle, Search, Zap, CheckCircle, Code,
  Settings, Shield, Layers, Terminal
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

// Code Block Animation
const CodeBlock = ({ lines }) => {
  return (
    <div className="bg-[#0A0A0A] rounded-xl p-6 font-mono text-sm overflow-hidden">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4"
        >
          <span className="text-white/30 w-6 text-right">{index + 1}</span>
          <span className="text-white/80">{line}</span>
        </motion.div>
      ))}
    </div>
  );
};

export const TuningPage = () => {
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
        className="fixed top-0 left-0 h-1 bg-[#CCFF00] z-50"
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
            src="https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Engine"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-lg bg-[#CCFF00]/10 blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-lg bg-[#CCFF00]/5 blur-[80px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        {/* Circuit Pattern with Parallax */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y: useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]) }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50h40M60 50h40M50 0v40M50 60v40" stroke="#CCFF00" strokeWidth="0.5" fill="none"/>
              <circle cx="50" cy="50" r="3" fill="#CCFF00"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </motion.div>

        {/* Content with Parallax */}
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          style={{ y: textY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-lg text-[#CCFF00] text-sm font-mono uppercase tracking-wider mb-8">
              <Cpu className="w-4 h-4" />
              Tuning Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Orbitron'] text-base sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
            data-testid="tuning-hero-title"
          >
            Verstehe jedes{' '}
            <span className="text-gradient-yellow">Steuergerät</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            ECU, TCU, Protokolle und Tools – die komplette technische 
            Wissensdatenbank für Tuning-Profis.
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
            <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
              Die Herausforderung
            </span>
            <h2 className="font-['Orbitron'] text-base sm:text-4xl lg:text-6xl font-bold tracking-tighter text-white mb-8">
              Tuning-Wissen ist
              <br />
              <span className="text-white/30">fragmentiert.</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Search, 
                title: 'Endlose Recherche',
                description: 'Stunden in Foren und PDFs verbracht, um herauszufinden ob ein Tool ein ECU unterstützt.'
              },
              { 
                icon: AlertTriangle, 
                title: 'Veraltete Infos',
                description: 'Support-Listen ändern sich ständig. Was gestern ging, funktioniert heute vielleicht nicht mehr.'
              },
              { 
                icon: Layers, 
                title: 'Kein Überblick',
                description: 'Verschiedene Protokolle, Methoden, Tools – wer behält da noch den Durchblick?'
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="p-8 bg-[#111111] border border-white/10 rounded-2xl h-full">
                  <item.icon className="w-10 h-10 text-[#CCFF00]/50 mb-6" />
                  <h3 className="font-['Orbitron'] text-base font-semibold text-white mb-3">
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
            <h2 className="font-['Orbitron'] text-base sm:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8">
              Eine Quelle der Wahrheit
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-white/60 text-xl lg:text-2xl leading-relaxed">
              Fahrzeug eingeben → ECU finden → Kompatible Tools sehen → 
              <span className="text-[#CCFF00]"> Sofort loslegen.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature 1 - ECU Finder */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#CCFF00]/5 rounded-3xl blur-xl" />
                <div className="relative bg-[#111111] border border-[#CCFF00]/20 rounded-2xl p-8">
                  {/* ECU Finder UI Mockup */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-[#0A0A0A] rounded-xl border border-white/10">
                      <Search className="w-5 h-5 text-white/40" />
                      <span className="text-white/60">BMW 330d E90 2008</span>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="text-[#CCFF00] text-xs font-mono uppercase tracking-wider">
                        Gefundene Steuergeräte
                      </div>
                      
                      {[
                        { type: 'ECU', name: 'Bosch EDC17CP02', status: 'Vollständig unterstützt' },
                        { type: 'TCU', name: 'ZF 6HP', status: 'Read/Write' },
                        { type: 'DSC', name: 'Bosch 5.7', status: 'Nur Lesen' },
                      ].map((ecu, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="p-4 bg-[#0A0A0A] rounded-xl border border-[#CCFF00]/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 bg-[#CCFF00]/10 text-[#CCFF00] text-xs font-mono rounded">
                                {ecu.type}
                              </span>
                              <span className="text-white font-medium">{ecu.name}</span>
                            </div>
                            <Cpu className="w-4 h-4 text-[#CCFF00]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white/50 text-sm">{ecu.status}</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
                Feature 01
              </span>
              <h3 className="font-['Orbitron'] text-base lg:text-4xl font-bold tracking-tight text-white mb-6">
                ECU Finder
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Gib einfach das Fahrzeug ein und erhalte sofort alle verbauten 
                Steuergeräte – mit detaillierten Infos zu Unterstützung und Methoden.
              </p>
              <ul className="space-y-4">
                {[
                  '10.000+ ECU-Typen in der Datenbank',
                  'Marke, Modell, Baujahr eingeben',
                  'Sofortige Ergebnisse',
                  'Detaillierte Spezifikationen'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-[#CCFF00]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Feature 2 - Tool Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <AnimatedSection className="lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#CCFF00]/5 rounded-3xl blur-xl" />
                <div className="relative bg-[#111111] border border-[#CCFF00]/20 rounded-2xl p-8 overflow-x-auto">
                  {/* Tool Matrix Table */}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 text-white/50 font-normal">Tool</th>
                        <th className="text-center py-3 text-white/50 font-normal">Bench</th>
                        <th className="text-center py-3 text-white/50 font-normal">OBD</th>
                        <th className="text-center py-3 text-white/50 font-normal">Boot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tool: 'Autotuner', bench: true, obd: true, boot: true },
                        { tool: 'KESSv3', bench: true, obd: true, boot: false },
                        { tool: 'KTAG', bench: true, obd: false, boot: true },
                        { tool: 'CMD Flash', bench: true, obd: true, boot: false },
                      ].map((row, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-white/5"
                        >
                          <td className="py-3 text-white font-medium">{row.tool}</td>
                          <td className="text-center py-3">
                            {row.bench ? (
                              <span className="text-green-400">●</span>
                            ) : (
                              <span className="text-white/20">○</span>
                            )}
                          </td>
                          <td className="text-center py-3">
                            {row.obd ? (
                              <span className="text-green-400">●</span>
                            ) : (
                              <span className="text-white/20">○</span>
                            )}
                          </td>
                          <td className="text-center py-3">
                            {row.boot ? (
                              <span className="text-green-400">●</span>
                            ) : (
                              <span className="text-white/20">○</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 text-xs text-white/40">
                    <span className="text-green-400">●</span> Unterstützt &nbsp;
                    <span className="text-white/20">○</span> Nicht verfügbar
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:order-1">
              <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
                Feature 02
              </span>
              <h3 className="font-['Orbitron'] text-base lg:text-4xl font-bold tracking-tight text-white mb-6">
                Tool Matrix
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Welches Tool unterstützt welches ECU? Bench, OBD oder Boot? 
                Die komplette Kompatibilitäts-Übersicht auf einen Blick.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Settings, label: 'Bench' },
                  { icon: Terminal, label: 'OBD' },
                  { icon: Shield, label: 'Boot' },
                ].map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-[#111111] border border-white/10 rounded-xl text-center"
                  >
                    <method.icon className="w-6 h-6 text-[#CCFF00] mx-auto mb-2" />
                    <div className="text-white/80 text-sm">{method.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Feature 3 - Protocol Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#CCFF00]/5 rounded-3xl blur-xl" />
                <div className="relative bg-[#111111] border border-[#CCFF00]/20 rounded-2xl p-8">
                  {/* Protocol Updates Feed */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-wider">
                        Letzte Updates
                      </span>
                      <span className="text-white/30 text-xs">Live</span>
                    </div>
                    
                    {[
                      { date: 'Heute', title: 'Autotuner v4.2.1', desc: '+15 neue ECU Support', type: 'release' },
                      { date: 'Gestern', title: 'KESSv3 Update', desc: 'BMW B58 Boot-Mode hinzugefügt', type: 'feature' },
                      { date: '2 Tage', title: 'Known Issue', desc: 'PSA DW10 - Checksum Problem', type: 'issue' },
                    ].map((update, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className={`p-4 rounded-xl border ${
                          update.type === 'release' ? 'bg-[#CCFF00]/5 border-[#CCFF00]/20' :
                          update.type === 'issue' ? 'bg-red-500/5 border-red-500/20' :
                          'bg-[#0A0A0A] border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{update.title}</span>
                          <span className="text-white/30 text-xs">{update.date}</span>
                        </div>
                        <p className="text-white/50 text-sm">{update.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
                Feature 03
              </span>
              <h3 className="font-['Orbitron'] text-base lg:text-4xl font-bold tracking-tight text-white mb-6">
                Protokoll-Tracking
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Bleib auf dem neuesten Stand: Neue Releases, Support-Erweiterungen, 
                Known Issues – alles in einem Feed.
              </p>
              <ul className="space-y-4">
                {[
                  'Automatische Update-Benachrichtigungen',
                  'Release Notes aggregiert',
                  'Known Issues Datenbank',
                  'Community-Feedback integriert'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle className="w-5 h-5 text-[#CCFF00]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-base sm:text-4xl font-bold tracking-tighter text-white mb-4">
              Die Datenbank in Zahlen
            </h2>
            <p className="text-white/50">Kontinuierlich wachsend und aktualisiert</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'ECU-Typen' },
              { value: '50+', label: 'Tool-Hersteller' },
              { value: '200+', label: 'Protokolle' },
              { value: 'Täglich', label: 'Updates' },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="text-center">
                <div className="font-['Orbitron'] text-base lg:text-5xl font-bold text-[#CCFF00] tracking-tighter">
                  {stat.value}
                </div>
                <p className="text-white/50 text-sm mt-2">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-base sm:text-4xl font-bold tracking-tighter text-white">
              Ein typischer Workflow
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              { step: '01', title: 'Kunde kommt mit BMW 320d F30', desc: 'Gib das Fahrzeug in den ECU Finder ein.' },
              { step: '02', title: 'ECU identifiziert: Bosch EDC17C50', desc: 'Alle technischen Details auf einen Blick.' },
              { step: '03', title: 'Tool Matrix checken', desc: 'Siehst sofort: Autotuner unterstützt OBD & Bench.' },
              { step: '04', title: 'Known Issues prüfen', desc: 'Keine bekannten Probleme - grünes Licht!' },
              { step: '05', title: 'Loslegen', desc: 'Alle Infos, die du brauchst. Keine Recherche mehr.' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="flex items-start gap-6 p-6 bg-[#111111] border border-white/10 rounded-2xl hover:border-[#CCFF00]/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#CCFF00] font-mono font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-['Orbitron'] text-base sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
              Bereit für
              <br />
              <span className="text-gradient-yellow">effizienteres Tuning?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Schluss mit endloser Recherche. Starte jetzt mit Tuning Intelligence 
              und finde sofort die Infos, die du brauchst.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#cta">
                <Button 
                  className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-8 py-6 text-lg rounded-lg"
                  data-testid="tuning-cta-demo"
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
              <span className="text-white font-semibold text-xs font-['Orbitron'] tracking-tight">
                intelligent
              </span>
              <span className="text-[#CCFF00] font-bold text-xs font-['Orbitron'] tracking-tight">
                automotive
              </span>
            </div>
          </div>
          <p className="text-white/40 text-sm">© 2024 intelligent-automotive. Tuning Intelligence.</p>
        </div>
      </footer>
    </div>
  );
};
