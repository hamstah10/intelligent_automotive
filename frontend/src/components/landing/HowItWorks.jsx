import { motion } from 'framer-motion';
import { Database, Zap, LineChart, Bell } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Database,
    title: 'Daten sammeln',
    description: 'Unsere Crawler durchsuchen kontinuierlich alle relevanten Quellen und sammeln Fahrzeug- und Tuning-Daten.',
    color: 'cyan',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Verarbeiten',
    description: 'Die Daten werden normalisiert, kategorisiert und in unserer Datenbank strukturiert gespeichert.',
    color: 'yellow',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Analysieren',
    description: 'Algorithmen berechnen Deal Scores, erkennen Preistrends und identifizieren Marktchancen.',
    color: 'cyan',
  },
  {
    number: '04',
    icon: Bell,
    title: 'Informieren',
    description: 'Du erhältst sofortige Benachrichtigungen und Insights direkt in dein Dashboard.',
    color: 'yellow',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-12 h-px bg-white/20" />
            <span className="text-white/50 text-xs font-mono uppercase tracking-[0.2em]">
              Workflow
            </span>
            <span className="w-12 h-px bg-white/20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
          >
            So funktioniert's
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Von der Datenerfassung bis zum Insight – ein vollautomatisierter Prozess
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLastInRow = index === 3 || index === 1;
            const isLastRow = index >= 2;
            const accentColor = step.color === 'cyan' ? '#00E5FF' : '#CCFF00';

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-testid={`how-it-works-step-${index}`}
                className={`relative p-8 lg:p-10 ${
                  !isLastInRow ? 'lg:border-r border-white/10' : ''
                } ${!isLastRow ? 'border-b lg:border-b-0' : ''} ${
                  index < 2 ? 'lg:border-b border-white/10' : ''
                }`}
              >
                {/* Step Number */}
                <span 
                  className="text-6xl lg:text-7xl font-bold font-['Outfit'] tracking-tighter opacity-10 absolute top-4 right-4"
                  style={{ color: accentColor }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ 
                    backgroundColor: `${accentColor}10`,
                    border: `1px solid ${accentColor}30`
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>

                {/* Content */}
                <h3 className="font-['Outfit'] text-xl font-semibold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connection Line (Desktop) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm font-mono">
            &lt; Vollautomatisiert. 24/7. In Echtzeit. /&gt;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
