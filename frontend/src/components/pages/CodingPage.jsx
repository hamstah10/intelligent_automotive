import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Code, Cpu, Monitor, Zap, Database,
  Settings2, Lightbulb, Music, Eye, Shield, Lock, CheckCircle,
  Terminal, Layers, Car
} from 'lucide-react';
import { Button } from '../ui/button';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="font-['Orbitron'] text-2xl lg:text-3xl font-bold text-white tracking-tighter">
      {prefix}{isInView ? value : '0'}{suffix}
    </motion.span>
  );
};

const PURPLE = '#c084fc';

const features = [
  { icon: Code, title: 'Codierungen', desc: 'Über 2.800 verifizierte Codierungen für alle gängigen Plattformen und Steuergeräte.' },
  { icon: Cpu, title: 'Steuergeräte-Datenbank', desc: 'Detaillierte Byte/Bit-Dokumentation für BCM, ECU, TCU, MIB und weitere Module.' },
  { icon: Layers, title: 'Plattform-Mapping', desc: 'MQB, MQB Evo, MLB Evo, CLAR, MRA2 — alle Plattformen systematisch erfasst.' },
  { icon: Terminal, title: 'Diagnose-Wissen', desc: 'Fehlercode-Interpretation, Adaptionswerte und Reset-Prozeduren dokumentiert.' },
  { icon: Shield, title: 'Risiko-Bewertung', desc: 'Jede Codierung mit Risiko-Level und Rückgängig-Anleitung versehen.' },
  { icon: Database, title: 'Community-Updates', desc: 'Tägliche Updates durch verifizierte Experten aus der Tuning-Community.' },
];

const modules = [
  { name: 'Zentralelektrik', code: 'BCM / 09', icon: Zap, codings: 342 },
  { name: 'Motor (ECU)', code: 'ECM / 01', icon: Settings2, codings: 518 },
  { name: 'Infotainment', code: 'MIB / 5F', icon: Music, codings: 421 },
  { name: 'Instrumenten-Cluster', code: 'IC / 17', icon: Monitor, codings: 156 },
  { name: 'ABS / ESP', code: 'ABS / 03', icon: Shield, codings: 198 },
  { name: 'Zugangssteuerung', code: 'KES / 09', icon: Lock, codings: 95 },
];

const categories = [
  { name: 'Komfort', icon: Settings2, count: 486, examples: ['Fensterheber-Komfort', 'Spiegel anklappen', 'Akustische Verriegelung'] },
  { name: 'Licht', icon: Lightbulb, count: 312, examples: ['Tagfahrlicht', 'Ambiente-Beleuchtung', 'Blinker Lauflicht'] },
  { name: 'Infotainment', icon: Music, count: 278, examples: ['Video in Motion', 'CarPlay Fullscreen', 'Startbild anpassen'] },
  { name: 'Assistenzsysteme', icon: Eye, count: 195, examples: ['Lane Assist', 'ACC Anpassung', 'Rückfahrkamera'] },
];

export const CodingPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(heroScrollProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div ref={containerRef} className="site-subpage min-h-screen bg-[#050505] text-white">
      <motion.div className="fixed top-0 left-0 h-1 z-50" style={{ width: progressWidth, backgroundColor: PURPLE }} />

      <div className="fixed top-6 left-6 z-40">
        <Link to="/"><Button variant="ghost" data-testid="coding-back-btn" className="text-white/70 hover:text-white hover:bg-white/5"><ArrowLeft className="w-4 h-4 mr-2" />Zurück</Button></Link>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop" alt="Coding Intelligence" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        </motion.div>

        {/* Floating Blur Elements */}
        <motion.div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-lg blur-[100px]" style={{ backgroundColor: `${PURPLE}15` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-lg blur-[80px]" style={{ backgroundColor: `${PURPLE}0a` }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />

        {/* Giant Logo A - Coding Purple */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative">
            <img
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png"
              alt=""
              className="w-[420px] h-[420px] lg:w-[520px] lg:h-[520px] object-contain opacity-[0.12]"
              style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(40%) saturate(800%) hue-rotate(220deg) brightness(110%) contrast(95%)' }}
            />
            <div className="absolute inset-0 blur-[60px] rounded-full" style={{ backgroundColor: `${PURPLE}08` }} />
          </motion.div>
        </div>

        {/* Code Rain / Matrix Animation */}
        <motion.div className="absolute inset-0 opacity-[0.06] overflow-hidden"
          style={{ y: useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]) }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="codegrid" x="0" y="0" width="120" height="160" patternUnits="userSpaceOnUse">
                <text x="10" y="20" fill={PURPLE} fontSize="11" fontFamily="monospace" opacity="0.7">{'{ }'}</text>
                <text x="60" y="40" fill={PURPLE} fontSize="10" fontFamily="monospace" opacity="0.5">0x5F</text>
                <text x="15" y="60" fill={PURPLE} fontSize="11" fontFamily="monospace" opacity="0.6">byte</text>
                <text x="75" y="75" fill={PURPLE} fontSize="9" fontFamily="monospace" opacity="0.4">ECU</text>
                <text x="5" y="95" fill={PURPLE} fontSize="10" fontFamily="monospace" opacity="0.5">{'</ >'}</text>
                <text x="65" y="110" fill={PURPLE} fontSize="11" fontFamily="monospace" opacity="0.7">0b11</text>
                <text x="30" y="130" fill={PURPLE} fontSize="9" fontFamily="monospace" opacity="0.4">BCM</text>
                <text x="80" y="150" fill={PURPLE} fontSize="10" fontFamily="monospace" opacity="0.6">{'{ }'}</text>
                <path d="M0 80h40 M80 80h40 M60 0v50 M60 110v50" stroke={PURPLE} strokeWidth="0.3" fill="none" opacity="0.3"/>
                <circle cx="60" cy="80" r="2" fill={PURPLE} opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#codegrid)"/>
          </svg>
        </motion.div>

        {/* Animated Code Lines floating */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <motion.div key={i} className="absolute text-xs font-mono pointer-events-none select-none whitespace-nowrap" style={{ color: `${PURPLE}20` }}
            initial={{ x: `${10 + i * 15}%`, y: '-5%', opacity: 0 }}
            animate={{ y: '105%', opacity: [0, 0.3, 0.3, 0] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity, delay: i * 1.8, ease: 'linear' }}>
            {['ECU.write(0x09, 0x5F, 0b11001);', 'BCM.adaptation(channel_42);', 'byte[3] = 0xFF & mask;', 'readDTC(module="ABS");', 'flash(ecu, stage=1);', 'coding.apply(comfort);'][i]}
          </motion.div>
        ))}

        {/* Content with Parallax */}
        <motion.div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono uppercase tracking-wider mb-8"
              style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30`, color: PURPLE }}>
              <Code className="w-4 h-4" />
              Coding Intelligence
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="coding-hero-title"
            className="font-['Orbitron'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-[0.9] mb-8">
            Codierungen.{' '}
            <span style={{ color: PURPLE }}>Systematisch.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Die umfassendste Datenbank für Fahrzeug-Codierungen. Steuergeräte, Byte/Bit-Logik und Diagnosewissen — strukturiert und sofort nutzbar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard/coding">
              <Button data-testid="coding-hero-cta" className="text-black font-semibold px-8 h-12 text-sm rounded-xl gap-2" style={{ backgroundColor: PURPLE }}>
                Dashboard öffnen <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 h-12 text-sm rounded-xl">Demo buchen</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '2.847', label: 'Codierungen', suffix: '+' },
              { value: '186', label: 'Module / ECUs', suffix: '' },
              { value: '12', label: 'Plattformen', suffix: '' },
              { value: '1.420', label: 'Fahrzeuge', suffix: '+' },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
                <div className="text-white/40 text-sm mt-2">{s.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold mb-4">Was Coding Intelligence bietet</h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">Alles was du brauchst, um Fahrzeug-Codierungen professionell zu verstehen und anzuwenden.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <AnimatedSection key={f.title} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors" data-testid={`coding-feature-${i}`}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${PURPLE}12` }}>
                      <Icon className="w-5 h-5" style={{ color: PURPLE }} />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold mb-4">Unterstützte Steuergeräte</h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">Von der Zentralelektrik bis zum Infotainment — alle relevanten Module abgedeckt.</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <AnimatedSection key={m.name} delay={i * 0.06}>
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#c084fc]/20 transition-colors group" data-testid={`coding-module-${i}`}>
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-5 h-5" style={{ color: PURPLE }} />
                      <span className="text-[10px] font-mono text-white/30">{m.code}</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{m.name}</h4>
                    <p className="text-white/40 text-xs">{m.codings} Codierungen</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold mb-4">Coding Kategorien</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <AnimatedSection key={cat.name} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]" data-testid={`coding-cat-${i}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PURPLE}12` }}>
                        <Icon className="w-5 h-5" style={{ color: PURPLE }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base">{cat.name}</h4>
                        <span className="text-white/40 text-xs">{cat.count} Codierungen</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.examples.map(ex => (
                        <span key={ex} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60">{ex}</span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold mb-4">Bereit für professionelle Codierungen?</h2>
            <p className="text-white/50 text-base mb-8">Starte jetzt mit Coding Intelligence und erschließe das volle Potenzial deiner Fahrzeuge.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard/coding">
                <Button data-testid="coding-cta-bottom" className="text-black font-semibold px-8 h-12 text-sm rounded-xl gap-2" style={{ backgroundColor: PURPLE }}>
                  <Code className="w-4 h-4" /> Jetzt starten
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 h-12 text-sm rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Zur Startseite
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};
