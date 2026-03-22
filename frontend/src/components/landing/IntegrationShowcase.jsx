import { motion } from 'framer-motion';

const integrations = [
  { name: 'mobile.de', color: '#00E5FF' },
  { name: 'AutoScout24', color: '#FF6B00' },
  { name: 'DAT', color: '#00E5FF' },
  { name: 'Schwacke', color: '#CCFF00' },
  { name: 'Autotuner', color: '#CCFF00' },
  { name: 'KESSv3', color: '#00E5FF' },
  { name: 'KTAG', color: '#c084fc' },
  { name: 'CMD Flash', color: '#CCFF00' },
  { name: 'FLEX', color: '#00E5FF' },
  { name: 'TecAlliance', color: '#facc15' },
  { name: 'HaynesPro', color: '#00E5FF' },
  { name: 'EurotaxGlass', color: '#CCFF00' },
];

export const IntegrationShowcase = () => {
  const doubled = [...integrations, ...integrations];

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <p className="text-center text-white/30 text-sm font-medium tracking-wider uppercase">Verbunden mit den wichtigsten Plattformen & Tools</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -50 * integrations.length] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 w-max"
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-[#111111] border border-white/10 rounded-xl shrink-0 hover:border-white/20 transition-colors">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-white/60 text-sm font-medium whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
