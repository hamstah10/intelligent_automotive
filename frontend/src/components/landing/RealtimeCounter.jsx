import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Car, Cpu, TrendingUp } from 'lucide-react';

const counters = [
  { label: 'Deals heute analysiert', end: 847, icon: TrendingUp, color: '#00E5FF', suffix: '' },
  { label: 'Aktive Fahrzeuge im Index', end: 124389, icon: Car, color: '#00E5FF', suffix: '' },
  { label: 'ECUs in der Datenbank', end: 10248, icon: Cpu, color: '#CCFF00', suffix: '' },
  { label: 'Ersparnis gefunden', end: 2.4, icon: Activity, color: '#CCFF00', suffix: 'M €', decimals: 1 },
];

const AnimatedNumber = ({ end, duration = 2, suffix = '', decimals = 0, inView }) => {
  const [current, setCurrent] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    if (!inView) return;
    startTime.current = null;
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * end);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  const formatted = decimals > 0
    ? current.toFixed(decimals)
    : Math.floor(current).toLocaleString('de-DE');
  return <>{formatted}{suffix}</>;
};

export const RealtimeCounter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {counters.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center group hover:border-white/20 transition-colors">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${c.color}15` }}>
                  <Icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <div className="font-['Space_Grotesk'] text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
                  <AnimatedNumber end={c.end} suffix={c.suffix} decimals={c.decimals || 0} inView={inView} />
                </div>
                <div className="text-white/40 text-sm">{c.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
