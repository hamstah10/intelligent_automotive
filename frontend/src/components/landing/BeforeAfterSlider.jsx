import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

const beforeItems = [
  { label: 'Manuelle Suche', time: '3-4 Stunden/Tag' },
  { label: 'Excel-Tabellen', time: 'Fehleranfällig' },
  { label: 'Keine Preishistorie', time: 'Blind kaufen' },
  { label: 'ECU-Infos verstreut', time: 'Forum-Recherche' },
  { label: 'Kein Alerting', time: 'Deals verpassen' },
];

const afterItems = [
  { label: 'AI-Analyse', time: '< 2 Sekunden' },
  { label: 'Live Dashboard', time: 'Automatisch' },
  { label: 'Preistrend-Charts', time: 'Datenbasiert' },
  { label: 'ECU-Datenbank', time: '10.248 Einträge' },
  { label: 'Smart Alerts', time: 'Sofort benachrichtigt' },
];

export const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <ArrowLeftRight className="w-4 h-4 text-white/60" />
            <span className="text-white/60 text-sm font-medium">Vorher / Nachher</span>
          </div>
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-white mb-4">Der Unterschied</h2>
        </motion.div>

        <div className="relative bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
          {/* Slider Track */}
          <input type="range" min={0} max={100} value={position} onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-col-resize z-20" />

          <div className="flex h-[380px]">
            {/* Before */}
            <div className="relative overflow-hidden" style={{ width: `${position}%` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-[#111111] p-8 min-w-[500px]">
                <div className="mb-6">
                  <span className="px-3 py-1 bg-red-500/15 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20">Ohne AutoIntel</span>
                </div>
                <div className="space-y-4">
                  {beforeItems.map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                      <span className="text-white/60 text-sm">{item.label}</span>
                      <span className="text-red-400 text-xs font-medium">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative w-[3px] bg-white/20 z-10 shrink-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <ArrowLeftRight className="w-5 h-5 text-black" />
              </div>
            </div>

            {/* After */}
            <div className="flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#00E5FF]/5 to-[#111111] p-8">
                <div className="mb-6">
                  <span className="px-3 py-1 bg-[#00E5FF]/15 text-[#00E5FF] text-xs font-semibold rounded-lg border border-[#00E5FF]/20">Mit AutoIntel</span>
                </div>
                <div className="space-y-4">
                  {afterItems.map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between p-3 bg-[#00E5FF]/5 border border-[#00E5FF]/10 rounded-xl">
                      <span className="text-white/80 text-sm font-medium">{item.label}</span>
                      <span className="text-[#00E5FF] text-xs font-semibold">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
