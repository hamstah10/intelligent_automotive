import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const hotspots = [
  { city: 'München', x: 285, y: 310, deals: 89, price: 'hoch', color: '#f87171' },
  { city: 'Berlin', x: 320, y: 155, deals: 124, price: 'mittel', color: '#facc15' },
  { city: 'Hamburg', x: 240, y: 100, deals: 67, price: 'günstig', color: '#00E5FF' },
  { city: 'Frankfurt', x: 215, y: 250, deals: 53, price: 'hoch', color: '#f87171' },
  { city: 'Köln', x: 170, y: 215, deals: 71, price: 'mittel', color: '#facc15' },
  { city: 'Stuttgart', x: 230, y: 305, deals: 45, price: 'hoch', color: '#f87171' },
  { city: 'Düsseldorf', x: 165, y: 195, deals: 38, price: 'günstig', color: '#00E5FF' },
  { city: 'Leipzig', x: 310, y: 200, deals: 42, price: 'günstig', color: '#00E5FF' },
];

export const MarketHeatmap = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Live Heatmap</span>
          </div>
          <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold text-white mb-4">Deal-Hotspots in Deutschland</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">Echtzeit-Übersicht: Wo sind gerade die besten Deals?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Map */}
          <div className="lg:col-span-3 bg-[#111111] border border-white/10 rounded-2xl p-6 relative">
            <svg viewBox="0 0 450 420" className="w-full">
              {/* Simplified Germany outline */}
              <path d="M220,30 L260,25 L300,40 L340,35 L370,60 L380,90 L360,120 L370,150 L350,170 L360,200 L340,230 L350,260 L330,280 L340,310 L310,330 L290,350 L260,340 L240,360 L220,350 L200,370 L180,350 L160,340 L140,310 L150,280 L130,260 L140,230 L155,210 L145,185 L160,160 L150,130 L170,100 L160,70 L180,50 L200,40 Z"
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

              {/* Hotspot pulses */}
              {hotspots.map((spot, i) => (
                <g key={spot.city}>
                  <motion.circle cx={spot.x} cy={spot.y} r="25" fill={spot.color} opacity="0"
                    animate={inView ? { opacity: [0, 0.15, 0], r: [15, 35, 45] } : {}}
                    transition={{ delay: i * 0.15, duration: 2, repeat: Infinity, repeatDelay: 1 }} />
                  <motion.circle cx={spot.x} cy={spot.y} r="8" fill={spot.color}
                    initial={{ opacity: 0, r: 0 }} animate={inView ? { opacity: 0.8, r: 8 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }} />
                  <motion.circle cx={spot.x} cy={spot.y} r="3" fill="white"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }} />
                  <motion.text x={spot.x} y={spot.y - 16} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Orbitron" fontWeight="600"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 + i * 0.1 }}>
                    {spot.city}
                  </motion.text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend + Top Cities */}
          <div className="lg:col-span-2 space-y-4">
            {/* Color Legend */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">
              <h4 className="font-['Orbitron'] text-sm font-bold text-white mb-4">Preisniveau</h4>
              <div className="space-y-2.5">
                {[{ label: 'Günstig — unter Marktwert', color: '#00E5FF' }, { label: 'Mittel — Marktwert', color: '#facc15' }, { label: 'Hoch — über Marktwert', color: '#f87171' }].map(l => (
                  <div key={l.label} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                    <span className="text-white/50 text-xs">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cities */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5">
              <h4 className="font-['Orbitron'] text-sm font-bold text-white mb-4">Top Deal-Städte</h4>
              <div className="space-y-2">
                {hotspots.sort((a, b) => b.deals - a.deals).slice(0, 5).map((spot, i) => (
                  <motion.div key={spot.city} initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center justify-between p-2.5 bg-[#0A0A0A] rounded-xl border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: `${spot.color}20`, color: spot.color }}>
                        {i + 1}
                      </span>
                      <span className="text-white text-sm font-medium">{spot.city}</span>
                    </div>
                    <span className="text-white/50 text-xs">{spot.deals} Deals</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
