import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, ChevronRight, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const questions = [
  {
    q: 'Was ist dein Budget?',
    options: [
      { label: 'Bis €20.000', value: 'low' },
      { label: '€20.000 — €40.000', value: 'mid' },
      { label: '€40.000 — €70.000', value: 'high' },
      { label: 'Über €70.000', value: 'premium' },
    ],
  },
  {
    q: 'Welcher Fahrzeugtyp?',
    options: [
      { label: 'Limousine / Touring', value: 'sedan' },
      { label: 'SUV / Crossover', value: 'suv' },
      { label: 'Sportwagen / Coupé', value: 'sport' },
      { label: 'Kompakt / Kleinwagen', value: 'compact' },
    ],
  },
  {
    q: 'Welche Region?',
    options: [
      { label: 'Bayern / BW', value: 'south' },
      { label: 'NRW / Hessen', value: 'west' },
      { label: 'Berlin / Sachsen', value: 'east' },
      { label: 'Hamburg / Niedersachsen', value: 'north' },
    ],
  },
];

const results = { low: 47, mid: 89, high: 52, premium: 23, sedan: 15, suv: 12, sport: 8, compact: 18, south: 5, west: 7, east: 4, north: 6 };

export const DealQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const done = step >= questions.length;

  const handleAnswer = (val) => {
    setAnswers(prev => [...prev, val]);
    setStep(s => s + 1);
  };

  const dealCount = done ? answers.reduce((s, a) => s + (results[a] || 10), 0) : 0;

  const reset = () => { setStep(0); setAnswers([]); };

  return (
    <section data-testid="deal-quiz" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full mb-6">
            <Crosshair className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Deal Finder</span>
          </div>
          <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold text-white mb-4">Finde deinen Deal</h2>
          <p className="text-white/40 text-base">3 Fragen — und wir zeigen dir wie viele Top-Deals auf dich warten.</p>
        </motion.div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Progress */}
          {!done && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
              <motion.div className="h-full bg-[#00E5FF]" animate={{ width: `${(step / questions.length) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-md">
                <p className="text-white/30 text-xs mb-2 text-center">Frage {step + 1} von {questions.length}</p>
                <h3 className="font-['Orbitron'] text-base font-bold text-white text-center mb-8">{questions[step].q}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {questions[step].options.map((opt) => (
                    <button key={opt.value} onClick={() => handleAnswer(opt.value)}
                      className="p-4 bg-[#0A0A0A] border border-white/10 rounded-xl text-white text-sm font-medium hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5 transition-all text-center">
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#00E5FF]/10 flex items-center justify-center mx-auto mb-6">
                  <span className="font-['Orbitron'] text-base font-bold text-[#00E5FF]">{dealCount}</span>
                </div>
                <h3 className="font-['Orbitron'] text-base font-bold text-white mb-2">Wir hätten {dealCount} Deals für dich!</h3>
                <p className="text-white/40 text-sm mb-8">Basierend auf deinen Präferenzen. Starte jetzt und verpasse keinen Deal.</p>
                <div className="flex items-center gap-3 justify-center">
                  <Link to="/demo">
                    <Button className="bg-[#00E5FF] text-black hover:bg-[#00c8e0] font-semibold rounded-lg h-11 px-6 text-sm gap-2">
                      Demo buchen <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button onClick={reset} className="h-11 px-4 bg-white/5 border border-white/10 rounded-lg text-white/50 text-sm hover:border-white/20 transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />Nochmal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
