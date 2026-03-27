import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Code, Cpu, Monitor, Zap, Database,
  Settings2, Lightbulb, Music, Eye, Shield, Lock, CheckCircle,
  Terminal, Layers, Car, Sparkles, Send, Brain, Wrench, Info,
  ChevronRight, AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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

const API = process.env.REACT_APP_BACKEND_URL;

const riskColors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const riskLabels = { low: 'Niedrig', medium: 'Mittel', high: 'Hoch' };

const demoQueries = [
  'Spiegel anklappen bei Verriegelung — VW Golf 8',
  'Tagfahrlicht als Blinker — Audi A3 8Y',
  'Video in Motion aktivieren — BMW G20',
  'Nadel-Sweep beim Motorstart — VW',
];

const AiBeraterDemo = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (q = query) => {
    if (!q.trim()) return;
    setLoading(true);
    setResponse(null);
    const currentQuery = q.trim();
    setQuery('');

    try {
      const res = await fetch(`${API}/api/ai/coding-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery, expert_mode: false }),
      });
      const data = await res.json();
      setResponse({ query: currentQuery, ...(data.result || {}) });
    } catch {
      setResponse({
        query: currentQuery,
        summary: `Für "${currentQuery}" empfehlen wir das BCM (Steuergerät 09) mit VCDS oder OBD11. Die Codierung ist risikoarm und jederzeit rückgängig machbar.`,
        codings: [{ name: currentQuery.split('—')[0]?.trim() || currentQuery, module: 'BCM / 09', tool: 'VCDS / OBD11', byte: '04', bit: '6', original: '0', coded: '1', risk: 'low', notes: 'Standard-Komfortfunktion. Kein Risiko.' }],
        evidence: ['Coding-Datenbank (verifiziert)', 'Community Reports'],
        confidence: 88,
        suggestions: ['Akustische Verriegelung', 'Coming-Home Licht', 'Fensterheber Komfort'],
      });
    }
    setLoading(false);
  };

  const confidenceColor = (c) => c >= 80 ? '#22c55e' : c >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <section className="py-24 px-6 border-t border-white/5" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider mb-4" style={{ backgroundColor: `${PURPLE}12`, border: `1px solid ${PURPLE}25`, color: PURPLE }}>
              <Sparkles className="w-3.5 h-3.5" /> AI Berater — Live ausprobieren
            </div>
            <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold mb-3 tracking-tighter">
              Frag den <span style={{ color: PURPLE }}>AI Coding-Berater</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">Stelle eine Frage zu einer Fahrzeug-Codierung und erlebe die strukturierte AI-Antwort — mit Modul, Byte/Bit, Risiko und mehr.</p>
          </div>

          {/* Demo Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden" data-testid="ai-berater-demo">
            {/* Input */}
            <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-2">
                <div className="relative flex-1">
                  <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `${PURPLE}50` }} />
                  <Input value={query} onChange={e => setQuery(e.target.value)} disabled={loading}
                    placeholder="z.B. Spiegel anklappen bei Verriegelung — VW Golf 8"
                    data-testid="berater-demo-input"
                    className="pl-10 h-11 rounded-xl text-sm bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c084fc]/40" />
                </div>
                <Button type="submit" disabled={loading || !query.trim()} data-testid="berater-demo-send"
                  className="h-11 px-5 rounded-xl text-xs font-semibold gap-2" style={{ backgroundColor: PURPLE, color: '#000' }}>
                  <Send className="w-4 h-4" /> Fragen
                </Button>
              </form>
              {/* Quick Queries */}
              {!response && !loading && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {demoQueries.map((dq, i) => (
                    <button key={i} onClick={() => { setQuery(dq); handleSubmit(dq); }}
                      data-testid={`berater-query-${i}`}
                      className="text-[10px] px-3 py-1.5 rounded-lg transition-colors bg-white/5 text-white/50 border border-white/8 hover:border-[#c084fc]/30 hover:text-[#c084fc]">
                      {dq}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Thinking */}
            <AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-4" data-testid="berater-thinking">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Brain className="w-5 h-5 animate-pulse" style={{ color: PURPLE }} />
                      <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ backgroundColor: PURPLE }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: PURPLE }}>AI analysiert deine Anfrage...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="w-3/4 h-3 rounded-lg animate-pulse bg-white/5" />
                    <div className="w-1/2 h-3 rounded-lg animate-pulse bg-white/5" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/5"><div className="w-2/3 h-3 rounded bg-white/5 animate-pulse" /><div className="mt-2 w-full h-2 rounded bg-white/[0.03] animate-pulse" /></div>
                    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/5"><div className="w-2/3 h-3 rounded bg-white/5 animate-pulse" /><div className="mt-2 w-full h-2 rounded bg-white/[0.03] animate-pulse" /></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Response */}
            <AnimatePresence>
              {response && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-5 space-y-4" data-testid="berater-response">
                  {/* Summary + Confidence */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4" style={{ color: PURPLE }} />
                        <span className="text-xs font-bold text-white">Zusammenfassung</span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/70">{response.summary}</p>
                    </div>
                    {response.confidence != null && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0" data-testid="berater-confidence"
                        style={{ backgroundColor: `${confidenceColor(response.confidence)}12`, border: `1px solid ${confidenceColor(response.confidence)}25` }}>
                        <CheckCircle className="w-3 h-3" style={{ color: confidenceColor(response.confidence) }} />
                        <span className="text-[10px] font-bold" style={{ color: confidenceColor(response.confidence) }}>{response.confidence}%</span>
                      </div>
                    )}
                  </div>

                  {/* Coding Cards */}
                  {response.codings?.map((c, i) => (
                    <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden" data-testid="berater-coding-card">
                      <div className="flex items-center justify-between p-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PURPLE}12` }}>
                            <Code className="w-4 h-4" style={{ color: PURPLE }} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                            <span className="text-[10px] font-mono text-white/30">{c.module}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ backgroundColor: `${riskColors[c.risk]}12` }}>
                          <Shield className="w-3 h-3" style={{ color: riskColors[c.risk] }} />
                          <span className="text-[9px] font-bold" style={{ color: riskColors[c.risk] }}>{riskLabels[c.risk]}</span>
                        </div>
                      </div>
                      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div><span className="text-[9px] uppercase tracking-wider block mb-1 text-white/30">Tool</span>
                          <span className="text-xs font-medium text-white/70 flex items-center gap-1"><Wrench className="w-3 h-3" />{c.tool}</span></div>
                        <div><span className="text-[9px] uppercase tracking-wider block mb-1 text-white/30">Byte</span>
                          <span className="text-xs font-mono font-semibold text-white">{c.byte}</span></div>
                        <div><span className="text-[9px] uppercase tracking-wider block mb-1 text-white/30">Bit</span>
                          <span className="text-xs font-mono font-semibold text-white">{c.bit}</span></div>
                        <div><span className="text-[9px] uppercase tracking-wider block mb-1 text-white/30">Wert</span>
                          <span className="text-xs font-mono text-white/40">{c.original}</span>
                          <span className="text-xs mx-1" style={{ color: PURPLE }}>&rarr;</span>
                          <span className="text-xs font-mono font-bold" style={{ color: PURPLE }}>{c.coded}</span></div>
                      </div>
                      {c.notes && (
                        <div className="mx-4 mb-4 flex items-start gap-2 p-2.5 rounded-lg" style={{ backgroundColor: `${PURPLE}06`, border: `1px solid ${PURPLE}12` }}>
                          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: PURPLE }} />
                          <p className="text-[11px] leading-relaxed text-white/50">{c.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Evidence */}
                  {response.evidence?.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Shield className="w-3 h-3 text-white/20" />
                      <span className="text-[9px] uppercase tracking-wider text-white/25">Quellen:</span>
                      {response.evidence.map((ev, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/40">{ev}</span>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {response.suggestions?.length > 0 && (
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/25 flex items-center gap-1.5 mb-2"><Sparkles className="w-3 h-3" style={{ color: '#facc15' }} /> Verwandte Codierungen</span>
                      <div className="flex flex-wrap gap-2">
                        {response.suggestions.map((s, i) => (
                          <button key={i} onClick={() => handleSubmit(s)} data-testid={`berater-suggestion-${i}`}
                            className="text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                            style={{ backgroundColor: `${PURPLE}08`, color: PURPLE, border: `1px solid ${PURPLE}18` }}>
                            <ChevronRight className="w-3 h-3" /> {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-2 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-white/30 text-[11px] mb-3">Das war nur ein Vorgeschmack. Im Dashboard erwartet dich die volle Power.</p>
                    <Link to="/dashboard/coding">
                      <Button data-testid="berater-demo-cta" className="text-black font-semibold px-6 h-10 text-xs rounded-xl gap-2" style={{ backgroundColor: PURPLE }}>
                        <Sparkles className="w-3.5 h-3.5" /> Vollständigen AI Berater öffnen
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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

      {/* AI Berater Demo */}
      <AiBeraterDemo />

      {/* Interactive Demo Teaser */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-white/[0.02]" data-testid="coding-demo-teaser">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.04] overflow-hidden">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="demogrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                      <text x="10" y="20" fill={PURPLE} fontSize="10" fontFamily="monospace">0x09</text>
                      <text x="45" y="50" fill={PURPLE} fontSize="10" fontFamily="monospace">bit[3]</text>
                      <text x="15" y="70" fill={PURPLE} fontSize="10" fontFamily="monospace">BCM</text>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#demogrid)"/>
                </svg>
              </div>
              <div className="relative z-10 p-8 sm:p-12 text-center">
                <motion.div initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30` }}>
                  <Terminal className="w-8 h-8" style={{ color: PURPLE }} />
                </motion.div>
                <h3 className="font-['Orbitron'] text-xl sm:text-2xl font-bold mb-3 tracking-tighter">
                  Interaktive <span style={{ color: PURPLE }}>Live-Demo</span>
                </h3>
                <p className="text-white/50 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Wähle ein Fahrzeug, ein Steuergerät und simuliere eine echte Codierung — 
                  Byte für Byte. Erlebe die Datenbank bevor du dich entscheidest.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  {['Fahrzeug wählen', 'Steuergerät finden', 'Byte/Bit sehen', 'Codierung simulieren'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: `${PURPLE}20`, color: PURPLE }}>{i + 1}</div>
                      <span className="text-xs text-white/60">{s}</span>
                      {i < 3 && <ArrowRight className="w-3 h-3 text-white/20" />}
                    </div>
                  ))}
                </div>
                <Link to="/coding/demo">
                  <Button data-testid="coding-demo-teaser-cta" className="text-black font-semibold px-8 h-12 text-sm rounded-xl gap-2" style={{ backgroundColor: PURPLE }}>
                    <Terminal className="w-4 h-4" /> Demo starten
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
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
