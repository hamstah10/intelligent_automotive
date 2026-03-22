import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Radar as RadarIcon } from 'lucide-react';

const categories = ['Geschwindigkeit', 'Genauigkeit', 'Abdeckung', 'Kosten', 'Skalierung', 'Echtzeit'];
const autoIntel = [95, 92, 94, 85, 90, 98];
const manual = [20, 55, 35, 30, 15, 10];

const toRadarPoints = (values, cx, cy, r) => {
  return values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    const pct = v / 100;
    return { x: cx + r * pct * Math.cos(angle), y: cy + r * pct * Math.sin(angle) };
  });
};

export const CompetitorRadar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cx = 200, cy = 200, r = 150;
  const aiPoints = toRadarPoints(autoIntel, cx, cy, r);
  const manPoints = toRadarPoints(manual, cx, cy, r);
  const aiPath = aiPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  const manPath = manPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full mb-6">
            <RadarIcon className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Performance Vergleich</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white mb-4">AutoIntel vs. Manuelle Suche</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">In jeder Dimension überlegen. Datengetrieben statt Bauchgefühl.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          {/* Radar Chart */}
          <div className="lg:col-span-3 bg-[#111111] border border-white/10 rounded-2xl p-6 flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-[400px]">
              {/* Grid */}
              {gridLevels.map((level) => {
                const pts = categories.map((_, i) => {
                  const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
                  return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
                }).join(' ');
                return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
              })}
              {/* Axes */}
              {categories.map((_, i) => {
                const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
                return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
              })}
              {/* Manual area */}
              <motion.path d={manPath} fill="rgba(248,113,113,0.1)" stroke="#f87171" strokeWidth="2"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }} />
              {/* AutoIntel area */}
              <motion.path d={aiPath} fill="rgba(0,229,255,0.12)" stroke="#00E5FF" strokeWidth="2"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} />
              {/* Dots */}
              {aiPoints.map((p, i) => (
                <motion.circle key={`ai-${i}`} cx={p.x} cy={p.y} r="4" fill="#00E5FF"
                  initial={{ opacity: 0, r: 0 }} animate={inView ? { opacity: 1, r: 4 } : {}} transition={{ delay: 0.7 + i * 0.05 }} />
              ))}
              {/* Labels */}
              {categories.map((cat, i) => {
                const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
                const lx = cx + (r + 28) * Math.cos(angle);
                const ly = cy + (r + 28) * Math.sin(angle);
                return (
                  <text key={cat} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Space Grotesk">{cat}</text>
                );
              })}
            </svg>
          </div>

          {/* Legend + Values */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#111111] border border-[#00E5FF]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#00E5FF]" />
                <span className="text-white font-semibold text-sm">AutoIntel</span>
              </div>
              {categories.map((cat, i) => (
                <div key={cat} className="flex items-center justify-between py-1.5">
                  <span className="text-white/50 text-xs">{cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-[#00E5FF] rounded-full" style={{ width: `${autoIntel[i]}%` }} /></div>
                    <span className="text-[#00E5FF] text-xs font-semibold w-8 text-right">{autoIntel[i]}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111111] border border-red-500/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-white font-semibold text-sm">Manuelle Suche</span>
              </div>
              {categories.map((cat, i) => (
                <div key={cat} className="flex items-center justify-between py-1.5">
                  <span className="text-white/50 text-xs">{cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-400 rounded-full" style={{ width: `${manual[i]}%` }} /></div>
                    <span className="text-red-400 text-xs font-semibold w-8 text-right">{manual[i]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
