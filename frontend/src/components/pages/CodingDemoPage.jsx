import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Mail, Lock, Car, Cpu, Code, Monitor,
  Zap, Music, Shield, Settings2, CheckCircle, RotateCcw,
  ChevronRight, AlertTriangle, Info, Terminal, Eye
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const PURPLE = '#c084fc';
const PURPLE_DIM = '#a855f7';

/* ── Realistic Vehicle Data ── */
const vehicles = [
  { id: 'golf8', name: 'VW Golf 8', platform: 'MQB Evo', year: '2020–2025', img: 'https://images.unsplash.com/photo-1606611013004-1a3e0e1e2b0c?w=400&h=250&fit=crop' },
  { id: 'a3-8y', name: 'Audi A3 8Y', platform: 'MQB Evo', year: '2020–2025', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
  { id: 'octavia4', name: 'Skoda Octavia IV', platform: 'MQB Evo', year: '2020–2025', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=250&fit=crop' },
  { id: 'tiguan2', name: 'VW Tiguan II', platform: 'MQB', year: '2016–2024', img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=250&fit=crop' },
  { id: 'leon4', name: 'SEAT Leon IV', platform: 'MQB Evo', year: '2020–2025', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' },
];

const ecus = [
  { id: 'bcm', name: 'Zentralelektrik', code: 'BCM / 09', icon: Zap, codings: 12 },
  { id: 'mib', name: 'Infotainment', code: 'MIB / 5F', icon: Music, codings: 8 },
  { id: 'ic', name: 'Instrumenten-Cluster', code: 'IC / 17', icon: Monitor, codings: 6 },
  { id: 'abs', name: 'ABS / ESP', code: 'ABS / 03', icon: Shield, codings: 4 },
];

const codingsData = {
  bcm: [
    { id: 'tfl', name: 'Tagfahrlicht als Blinker', byte: 14, bit: '0–1', original: '00', coded: '01', risk: 'low', category: 'Licht', desc: 'Tagfahrlicht dimmt beim Blinken ab. OEM-Funktion bei höheren Ausstattungen.' },
    { id: 'mirror', name: 'Spiegel anklappen bei Verriegelung', byte: 4, bit: '6', original: '0', coded: '1', risk: 'low', category: 'Komfort', desc: 'Außenspiegel klappen automatisch an wenn das Fahrzeug verriegelt wird.' },
    { id: 'acoustic', name: 'Akustische Verriegelungsbestätigung', byte: 10, bit: '3', original: '0', coded: '1', risk: 'low', category: 'Komfort', desc: 'Hupton bei Verriegelung/Entriegelung. Aktiviert die akustische Rückmeldung.' },
    { id: 'window', name: 'Fensterheber-Komfortbedienung', byte: 3, bit: '2', original: '0', coded: '1', risk: 'low', category: 'Komfort', desc: 'Alle Fenster per Schlüssel-Fernbedienung öffnen/schließen.' },
    { id: 'drl-bright', name: 'Tagfahrlicht Helligkeit +30%', byte: 14, bit: '4–5', original: '10', coded: '11', risk: 'medium', category: 'Licht', desc: 'Erhöht die Helligkeit des Tagfahrlichts. Achtung: Kann bei TÜV-Prüfung auffallen.' },
    { id: 'needle', name: 'Coming-Home Lichtdauer', byte: 7, bit: '0–3', original: '0010', coded: '0100', risk: 'low', category: 'Licht', desc: 'Verlängert die Coming-Home Beleuchtung von 10s auf 30s.' },
  ],
  mib: [
    { id: 'vim', name: 'Video in Motion', byte: 1, bit: '4', original: '0', coded: '1', risk: 'high', category: 'Infotainment', desc: 'Erlaubt Videowiedergabe während der Fahrt. ACHTUNG: Nur für Beifahrer! Nutzung durch Fahrer ist illegal.' },
    { id: 'carplay', name: 'CarPlay Fullscreen', byte: 18, bit: '0', original: '0', coded: '1', risk: 'low', category: 'Infotainment', desc: 'Erweitert Apple CarPlay auf den gesamten Bildschirm ohne Splitscreen.' },
    { id: 'startimg', name: 'Startbild anpassen', byte: 22, bit: '2–3', original: '00', coded: '01', risk: 'low', category: 'Infotainment', desc: 'Ermöglicht ein individuelles Startbild beim Einschalten des Infotainments.' },
    { id: 'green', name: 'Green Engineering Menü', byte: 5, bit: '7', original: '0', coded: '1', risk: 'medium', category: 'Infotainment', desc: 'Aktiviert das versteckte Green-Engineering-Menü für erweiterte Diagnose.' },
  ],
  ic: [
    { id: 'oil', name: 'Öldruck-Anzeige aktivieren', byte: 2, bit: '5', original: '0', coded: '1', risk: 'low', category: 'Anzeige', desc: 'Zeigt den Öldruck als zusätzlichen Wert im digitalen Cockpit an.' },
    { id: 'sweep', name: 'Nadel-Sweep beim Start', byte: 1, bit: '0', original: '0', coded: '1', risk: 'low', category: 'Anzeige', desc: 'Zeiger durchlaufen beim Motorstart den vollen Bereich — wie bei Sport-Modellen.' },
    { id: 'speed', name: 'Digitale Geschwindigkeit', byte: 4, bit: '1', original: '0', coded: '1', risk: 'low', category: 'Anzeige', desc: 'Zeigt die Geschwindigkeit zusätzlich digital im Kombiinstrument an.' },
    { id: 'lap', name: 'Rundenzeit-Anzeige', byte: 6, bit: '3', original: '0', coded: '1', risk: 'low', category: 'Anzeige', desc: 'Aktiviert einen Rundenzeitmesser im Sport-Modus des digitalen Cockpits.' },
  ],
  abs: [
    { id: 'esc-sport', name: 'ESC Sport Modus erweitert', byte: 8, bit: '2', original: '0', coded: '1', risk: 'high', category: 'Fahrwerk', desc: 'Erweitert den ESC-Sport Modus mit späterem Eingriff. NUR für Trackdays!' },
    { id: 'brake-light', name: 'Dynamische Bremsleuchte', byte: 3, bit: '4', original: '0', coded: '1', risk: 'low', category: 'Sicherheit', desc: 'Bremsleuchte blinkt bei Notbremsung — erhöht die Sichtbarkeit für nachfolgende Fahrzeuge.' },
    { id: 'hill', name: 'Hill Hold Assist Dauer', byte: 5, bit: '0–1', original: '01', coded: '10', risk: 'low', category: 'Fahrwerk', desc: 'Verlängert die Haltezeit des Berganfahrassistenten von 2s auf 4s.' },
  ],
};

const riskColors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const riskLabels = { low: 'Niedrig', medium: 'Mittel', high: 'Hoch' };

/* ── Byte/Bit Visualizer Component ── */
const ByteVisualizer = ({ coding, isApplied }) => {
  const bits = (isApplied ? coding.coded : coding.original).split('');
  const targetBits = coding.coded.split('');
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <span>Byte {String(coding.byte).padStart(2, '0')}</span>
        <span className="mx-1">|</span>
        <span>Bit {coding.bit}</span>
      </div>
      <div className="flex gap-1">
        {bits.map((bit, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: isApplied && bit !== coding.original.split('')[i]
                ? `${PURPLE}40`
                : bit === '1' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
              borderColor: isApplied && bit !== coding.original.split('')[i]
                ? PURPLE
                : 'rgba(255,255,255,0.1)',
            }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="w-9 h-9 rounded-lg border flex items-center justify-center font-mono text-sm font-bold"
            style={{ color: isApplied && bit !== coding.original.split('')[i] ? PURPLE : 'rgba(255,255,255,0.6)' }}
          >
            {bit}
          </motion.div>
        ))}
      </div>
      {isApplied && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 mt-1">
          <CheckCircle className="w-3 h-3" style={{ color: '#22c55e' }} />
          <span className="text-[10px]" style={{ color: '#22c55e' }}>Codierung angewendet</span>
        </motion.div>
      )}
    </div>
  );
};

/* ── Steps ── */
const STEPS = ['email', 'vehicle', 'ecu', 'coding', 'applied'];
const stepLabels = ['Zugang', 'Fahrzeug', 'Steuergerät', 'Codierung', 'Ergebnis'];

export const CodingDemoPage = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedEcu, setSelectedEcu] = useState(null);
  const [selectedCoding, setSelectedCoding] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [applyProgress, setApplyProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const currentStepIdx = STEPS.indexOf(step);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }
    toast.success('Zugang freigeschaltet!');
    setStep('vehicle');
  };

  const handleSelectVehicle = (v) => {
    setSelectedVehicle(v);
    setSelectedEcu(null);
    setSelectedCoding(null);
    setIsApplied(false);
    setStep('ecu');
  };

  const handleSelectEcu = (e) => {
    setSelectedEcu(e);
    setSelectedCoding(null);
    setIsApplied(false);
    setStep('coding');
  };

  const handleSelectCoding = (c) => {
    setSelectedCoding(c);
    setIsApplied(false);
  };

  const handleApply = () => {
    setIsApplying(true);
    setApplyProgress(0);
    const interval = setInterval(() => {
      setApplyProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsApplying(false);
          setIsApplied(true);
          setStep('applied');
          toast.success('Codierung erfolgreich simuliert!');
          return 100;
        }
        return p + 2;
      });
    }, 40);
  };

  const handleReset = () => {
    setSelectedCoding(null);
    setIsApplied(false);
    setApplyProgress(0);
    setStep('coding');
  };

  const handleFullReset = () => {
    setSelectedVehicle(null);
    setSelectedEcu(null);
    setSelectedCoding(null);
    setIsApplied(false);
    setApplyProgress(0);
    setStep('vehicle');
  };

  const availableCodings = selectedEcu ? (codingsData[selectedEcu.id] || []) : [];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 h-1 z-50" style={{ backgroundColor: PURPLE }}
        animate={{ width: `${((currentStepIdx) / (STEPS.length - 1)) * 100}%` }}
        transition={{ duration: 0.5 }} />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-40">
        <Link to="/coding">
          <Button variant="ghost" data-testid="demo-back-btn" className="text-white/70 hover:text-white hover:bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" />Zurück
          </Button>
        </Link>
      </div>

      {/* Step Indicator */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              data-testid={`step-indicator-${s}`}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono transition-all duration-300"
              style={{
                backgroundColor: i <= currentStepIdx ? `${PURPLE}25` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i <= currentStepIdx ? PURPLE : 'rgba(255,255,255,0.1)'}`,
                color: i <= currentStepIdx ? PURPLE : 'rgba(255,255,255,0.3)',
              }}
            >
              {i < currentStepIdx ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className="w-4 h-px" style={{ backgroundColor: i < currentStepIdx ? PURPLE : 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </div>

      {/* Floating Glows */}
      <div className="fixed top-1/3 left-1/4 w-64 h-64 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${PURPLE}08` }} />
      <div className="fixed bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: `${PURPLE}06` }} />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Email Gate ── */}
          {step === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              className="min-h-[70vh] flex flex-col items-center justify-center text-center">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30` }}>
                <Terminal className="w-10 h-10" style={{ color: PURPLE }} />
              </motion.div>
              <h1 data-testid="demo-title" className="font-['Orbitron'] text-3xl sm:text-4xl font-bold tracking-tighter mb-4">
                Coding Intelligence <span style={{ color: PURPLE }}>Live-Demo</span>
              </h1>
              <p className="text-white/50 text-base max-w-lg mb-10 leading-relaxed">
                Erlebe die Codierungs-Datenbank interaktiv. Wähle ein Fahrzeug, ein Steuergerät und simuliere eine echte Codierung — Byte für Byte.
              </p>
              <form onSubmit={handleEmailSubmit} className="w-full max-w-sm" data-testid="demo-email-form">
                <div className="relative mb-4">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <Input
                    type="email" placeholder="Deine E-Mail-Adresse" value={email} onChange={(e) => setEmail(e.target.value)}
                    data-testid="demo-email-input"
                    className="w-full pl-12 pr-4 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[#c084fc]/50 focus:ring-[#c084fc]/20"
                  />
                </div>
                <Button type="submit" data-testid="demo-email-submit"
                  className="w-full py-6 text-sm font-semibold rounded-xl text-black gap-2" style={{ backgroundColor: PURPLE }}>
                  <Lock className="w-4 h-4" /> Demo freischalten
                </Button>
                <p className="text-white/30 text-xs mt-4">Kein Spam. Nur relevante Updates.</p>
              </form>
            </motion.div>
          )}

          {/* ── STEP 2: Vehicle Selection ── */}
          {step === 'vehicle' && (
            <motion.div key="vehicle" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider mb-4"
                  style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30`, color: PURPLE }}>
                  <Car className="w-3.5 h-3.5" /> Schritt 1
                </span>
                <h2 data-testid="step-vehicle-title" className="font-['Orbitron'] text-2xl sm:text-3xl font-bold tracking-tighter mb-3">
                  Wähle dein <span style={{ color: PURPLE }}>Fahrzeug</span>
                </h2>
                <p className="text-white/50 text-sm">Wähle ein Fahrzeug aus unserer Datenbank.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((v, i) => (
                  <motion.button key={v.id} data-testid={`vehicle-${v.id}`}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    onClick={() => handleSelectVehicle(v)}
                    className="group text-left rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#c084fc]/40 bg-white/[0.02] hover:bg-white/[0.04]">
                    <div className="h-36 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                      <img src={v.img} alt={v.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="text-[10px] font-mono px-2 py-1 rounded-md" style={{ backgroundColor: `${PURPLE}20`, color: PURPLE }}>{v.platform}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-base mb-1 group-hover:text-[#c084fc] transition-colors">{v.name}</h3>
                      <p className="text-white/40 text-xs">{v.year}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: ECU Selection ── */}
          {step === 'ecu' && selectedVehicle && (
            <motion.div key="ecu" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-white/40 mb-8 font-mono">
                <button onClick={handleFullReset} className="hover:text-white/70 transition-colors">{selectedVehicle.name}</button>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: PURPLE }}>Steuergerät wählen</span>
              </div>

              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider mb-4"
                  style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30`, color: PURPLE }}>
                  <Cpu className="w-3.5 h-3.5" /> Schritt 2
                </span>
                <h2 data-testid="step-ecu-title" className="font-['Orbitron'] text-2xl sm:text-3xl font-bold tracking-tighter mb-3">
                  Wähle ein <span style={{ color: PURPLE }}>Steuergerät</span>
                </h2>
                <p className="text-white/50 text-sm">{selectedVehicle.name} · {selectedVehicle.platform}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {ecus.map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <motion.button key={e.id} data-testid={`ecu-${e.id}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      onClick={() => handleSelectEcu(e)}
                      className="group text-left p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#c084fc]/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PURPLE}12` }}>
                          <Icon className="w-5 h-5" style={{ color: PURPLE }} />
                        </div>
                        <span className="text-[10px] font-mono text-white/30">{e.code}</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-[#c084fc] transition-colors">{e.name}</h3>
                      <p className="text-white/40 text-xs">{e.codings} Codierungen verfügbar</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Coding Selection + Byte/Bit View ── */}
          {(step === 'coding' || step === 'applied') && selectedVehicle && selectedEcu && (
            <motion.div key="coding" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-white/40 mb-8 font-mono flex-wrap">
                <button onClick={handleFullReset} className="hover:text-white/70 transition-colors">{selectedVehicle.name}</button>
                <ChevronRight className="w-3 h-3" />
                <button onClick={() => { setStep('ecu'); setSelectedCoding(null); setIsApplied(false); }} className="hover:text-white/70 transition-colors">{selectedEcu.name}</button>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: PURPLE }}>Codierungen</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Coding List */}
                <div className="lg:col-span-2 space-y-2">
                  <h3 className="font-['Orbitron'] text-sm font-bold mb-4 flex items-center gap-2">
                    <Code className="w-4 h-4" style={{ color: PURPLE }} />
                    {selectedEcu.name} — Codierungen
                  </h3>
                  {availableCodings.map((c, i) => (
                    <motion.button key={c.id} data-testid={`coding-${c.id}`}
                      initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => handleSelectCoding(c)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        selectedCoding?.id === c.id ? 'bg-white/[0.06]' : 'bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}
                      style={{ borderColor: selectedCoding?.id === c.id ? `${PURPLE}60` : 'rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-medium text-sm" style={{ color: selectedCoding?.id === c.id ? PURPLE : 'white' }}>{c.name}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: riskColors[c.risk] }} />
                          <span className="text-[9px] font-mono" style={{ color: riskColors[c.risk] }}>{riskLabels[c.risk]}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-white/30">Byte {String(c.byte).padStart(2, '0')} · Bit {c.bit}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Right: Detail View */}
                <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                    {selectedCoding ? (
                      <motion.div key={selectedCoding.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden" data-testid="coding-detail-view">
                        {/* Header */}
                        <div className="p-6 border-b border-white/5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-mono px-2 py-1 rounded-md" style={{ backgroundColor: `${PURPLE}15`, color: PURPLE }}>
                              {selectedEcu.code} · Byte {String(selectedCoding.byte).padStart(2, '0')}
                            </span>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ backgroundColor: `${riskColors[selectedCoding.risk]}15` }}>
                              <AlertTriangle className="w-3 h-3" style={{ color: riskColors[selectedCoding.risk] }} />
                              <span className="text-[10px] font-medium" style={{ color: riskColors[selectedCoding.risk] }}>Risiko: {riskLabels[selectedCoding.risk]}</span>
                            </div>
                          </div>
                          <h3 className="font-['Orbitron'] text-lg font-bold mb-2">{selectedCoding.name}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{selectedCoding.desc}</p>
                        </div>

                        {/* Byte/Bit Visualization */}
                        <div className="p-6 border-b border-white/5">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Byte / Bit Visualisierung</h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <span className="text-[10px] text-white/30 block mb-2">Original</span>
                              <ByteVisualizer coding={selectedCoding} isApplied={false} />
                            </div>
                            <div>
                              <span className="text-[10px] block mb-2" style={{ color: PURPLE }}>Nach Codierung</span>
                              <ByteVisualizer coding={selectedCoding} isApplied={true} />
                            </div>
                          </div>
                        </div>

                        {/* Info Row */}
                        <div className="p-6 border-b border-white/5 grid grid-cols-3 gap-4">
                          <div>
                            <span className="text-[10px] text-white/30 block mb-1">Kategorie</span>
                            <span className="text-xs font-medium">{selectedCoding.category}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-white/30 block mb-1">Plattform</span>
                            <span className="text-xs font-medium">{selectedVehicle.platform}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-white/30 block mb-1">Fahrzeug</span>
                            <span className="text-xs font-medium">{selectedVehicle.name}</span>
                          </div>
                        </div>

                        {/* Apply / Reset */}
                        <div className="p-6">
                          {isApplying ? (
                            <div data-testid="apply-progress">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono" style={{ color: PURPLE }}>Codierung wird angewendet...</span>
                                <span className="text-xs font-mono text-white/40">{applyProgress}%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                                <motion.div className="h-full rounded-full" style={{ backgroundColor: PURPLE, width: `${applyProgress}%` }} />
                              </div>
                              <div className="mt-3 space-y-1">
                                {applyProgress > 10 && <p className="text-[10px] font-mono text-white/30">Verbindung zum Steuergerät...</p>}
                                {applyProgress > 35 && <p className="text-[10px] font-mono text-white/30">Byte {String(selectedCoding.byte).padStart(2, '0')} lesen...</p>}
                                {applyProgress > 60 && <p className="text-[10px] font-mono" style={{ color: PURPLE }}>Bit {selectedCoding.bit} schreiben: {selectedCoding.original} → {selectedCoding.coded}</p>}
                                {applyProgress > 85 && <p className="text-[10px] font-mono text-white/30">Verifizierung...</p>}
                              </div>
                            </div>
                          ) : isApplied ? (
                            <div data-testid="apply-success" className="text-center">
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#22c55e15', border: '1px solid #22c55e30' }}>
                                <CheckCircle className="w-8 h-8 text-[#22c55e]" />
                              </motion.div>
                              <h4 className="font-['Orbitron'] text-base font-bold mb-2">Codierung erfolgreich!</h4>
                              <p className="text-white/50 text-xs mb-6">"{selectedCoding.name}" wurde simuliert auf dem {selectedVehicle.name}.</p>
                              <div className="flex gap-3 justify-center">
                                <Button data-testid="demo-reset-btn" onClick={handleReset} variant="outline"
                                  className="border-white/10 text-white/70 hover:bg-white/5 rounded-xl gap-2 text-xs">
                                  <RotateCcw className="w-3.5 h-3.5" /> Andere Codierung
                                </Button>
                                <Button data-testid="demo-full-reset-btn" onClick={handleFullReset} variant="outline"
                                  className="border-white/10 text-white/70 hover:bg-white/5 rounded-xl gap-2 text-xs">
                                  <Car className="w-3.5 h-3.5" /> Anderes Fahrzeug
                                </Button>
                              </div>
                              <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                <p className="text-white/40 text-xs mb-3">Gefällt dir die Demo? Schalte die volle Datenbank frei.</p>
                                <Link to="/demo">
                                  <Button data-testid="demo-upgrade-cta" className="text-black font-semibold px-6 text-xs rounded-xl gap-2" style={{ backgroundColor: PURPLE }}>
                                    Vollzugang anfragen <ArrowRight className="w-3.5 h-3.5" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              <Button data-testid="demo-apply-btn" onClick={handleApply}
                                className="flex-1 py-5 text-sm font-semibold rounded-xl gap-2 text-black" style={{ backgroundColor: PURPLE }}>
                                <Zap className="w-4 h-4" /> Codierung simulieren
                              </Button>
                            </div>
                          )}

                          {selectedCoding.risk === 'high' && !isApplying && !isApplied && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="flex items-start gap-2 mt-4 p-3 rounded-xl" style={{ backgroundColor: '#ef444410', border: '1px solid #ef444420' }}>
                              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-[#ef4444]" />
                              <p className="text-[11px] text-[#ef4444]/80 leading-relaxed">
                                Hohes Risiko: Diese Codierung kann sicherheitsrelevante Systeme beeinflussen. Nur für erfahrene Anwender empfohlen.
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="rounded-2xl border border-dashed border-white/10 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                        <Eye className="w-10 h-10 text-white/10 mb-4" />
                        <p className="text-white/30 text-sm">Wähle eine Codierung aus der Liste</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
