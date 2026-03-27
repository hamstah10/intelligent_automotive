import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Cpu, Layers, Terminal, Shield, Database, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const codingFeatures = [
  {
    icon: Code,
    title: 'Codierungen',
    description: 'Über 2.800 verifizierte Codierungen für alle gängigen Plattformen und Steuergeräte.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Cpu,
    title: 'Steuergeräte-Datenbank',
    description: 'Detaillierte Byte/Bit-Dokumentation für BCM, ECU, TCU, MIB und weitere Module.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Layers,
    title: 'Plattform-Mapping',
    description: 'MQB, MQB Evo, MLB Evo, CLAR, MRA2 — alle Plattformen systematisch erfasst.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Terminal,
    title: 'Diagnose-Wissen',
    description: 'Fehlercode-Interpretation, Adaptionswerte und Reset-Prozeduren — alles an einem Ort.',
    span: 'col-span-1 md:col-span-6 row-span-1',
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop',
  },
  {
    icon: Shield,
    title: 'Risiko-Bewertung',
    description: 'Jede Codierung mit Risiko-Level bewertet. Inklusive Rückgängig-Anleitung und Known Issues.',
    span: 'col-span-1 md:col-span-6 row-span-1',
  },
  {
    icon: Database,
    title: 'Community-Updates',
    description: 'Tägliche Updates durch verifizierte Experten. Neue Codierungen, Module und Plattformen.',
    span: 'col-span-1 md:col-span-12 row-span-1',
    hasImage: true,
    imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const PURPLE = '#c084fc';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const FeaturesCoding = () => {
  return (
    <section
      data-testid="features-coding-section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-lg blur-[150px] pointer-events-none" style={{ backgroundColor: `${PURPLE}08` }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: PURPLE }}>
              03 / Coding Intelligence
            </span>
            <span className="w-12 h-px" style={{ backgroundColor: `${PURPLE}80` }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Orbitron'] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-white mb-4"
          >
            Codiere{' '}
            <span style={{ color: PURPLE }}>jedes Fahrzeug</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base lg:text-lg max-w-2xl leading-relaxed mb-6"
          >
            Die umfassendste Datenbank für Fahrzeug-Codierungen. Steuergeräte, 
            Byte/Bit-Logik und Diagnosewissen — strukturiert und sofort nutzbar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/coding">
              <Button
                variant="outline"
                className="rounded-lg group"
                style={{ borderColor: `${PURPLE}50`, color: PURPLE }}
                data-testid="coding-learn-more-btn"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${PURPLE}18`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Mehr erfahren
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {codingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-testid={`coding-feature-landing-${index}`}
                className={`${feature.span} group relative bg-[#111111] border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden transition-colors duration-300`}
                style={{ '--hover-border': `${PURPLE}50` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${PURPLE}50`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {/* Background Image for specific cards */}
                {feature.hasImage && (
                  <div className="absolute inset-0 opacity-20">
                    <img src={feature.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30` }}>
                    <Icon className="w-6 h-6" style={{ color: PURPLE }} />
                  </div>
                  <h3 className="font-['Orbitron'] text-base font-semibold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 30px ${PURPLE}15` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
