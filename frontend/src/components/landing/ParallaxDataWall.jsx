import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Database, Shield, TrendingUp, Zap, Globe, Clock } from 'lucide-react';

const stats = [
  { value: '10.248', label: 'ECUs analysiert', icon: Database, color: '#CCFF00' },
  { value: '€2.4M', label: 'Ersparnis gefunden', icon: TrendingUp, color: '#00E5FF' },
  { value: '94%', label: 'Abdeckungsrate', icon: Shield, color: '#CCFF00' },
  { value: '<2s', label: 'Analyse-Zeit', icon: Zap, color: '#00E5FF' },
  { value: '47', label: 'Regionen abgedeckt', icon: Globe, color: '#CCFF00' },
  { value: '24/7', label: 'Echtzeit-Monitoring', icon: Clock, color: '#00E5FF' },
];

export const ParallaxDataWall = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold text-white mb-4">Die Zahlen sprechen für sich</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">Automotive Intelligence in Echtzeit — powered by Data.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div key={stat.label} style={{ y: isEven ? y1 : y2 }}
                initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.08 }}>
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: `${stat.color}10` }}>
                    <Icon className="w-7 h-7 transition-colors" style={{ color: stat.color }} />
                  </div>
                  <div className="font-['Orbitron'] text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
