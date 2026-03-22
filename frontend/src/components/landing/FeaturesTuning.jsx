import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, FileText, Wrench, Database, GitBranch, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const tuningFeatures = [
  {
    icon: Cpu,
    title: 'ECU Finder',
    description: 'Fahrzeug eingeben, ECU finden. Die komplette Steuergeräte-Datenbank für jedes Fahrzeug.',
    span: 'col-span-1 md:col-span-6 row-span-1',
    hasImage: true,
    imageUrl: 'https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    icon: Database,
    title: 'Tool Matrix',
    description: 'Welches Tool unterstützt welches ECU? Bench, OBD, Boot – alle Methoden auf einen Blick.',
    span: 'col-span-1 md:col-span-6 row-span-1',
  },
  {
    icon: GitBranch,
    title: 'Protokoll-Tracking',
    description: 'Bleib auf dem neuesten Stand bei Protokoll-Updates und neuen Support-Erweiterungen.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: FileText,
    title: 'Dokumente & Release Notes',
    description: 'Alle technischen Dokumente, PDFs und Release Notes zentral an einem Ort.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: AlertTriangle,
    title: 'Known Issues',
    description: 'Bekannte Probleme und deren Lösungen. Lerne aus der Community.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Wrench,
    title: 'Support Matrix',
    description: 'Die vollständige Übersicht aller unterstützten Steuergeräte pro Tool und Methode.',
    span: 'col-span-1 md:col-span-12 row-span-1',
    hasImage: true,
    imageUrl: 'https://images.pexels.com/photos/7564872/pexels-photo-7564872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

export const FeaturesTuning = () => {
  return (
    <section
      data-testid="features-tuning-section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#CCFF00]/5 rounded-full blur-[150px] pointer-events-none" />

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
            <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">
              02 / Tuning Intelligence
            </span>
            <span className="w-12 h-px bg-[#CCFF00]/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
          >
            Verstehe{' '}
            <span className="text-gradient-yellow">jedes Steuergerät</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base lg:text-lg max-w-2xl leading-relaxed mb-6"
          >
            ECU, TCU, Tools und Protokolle – zentralisiere dein technisches Wissen 
            und bleib immer auf dem neuesten Stand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/tuning">
              <Button 
                variant="outline" 
                className="border-[#CCFF00]/30 text-[#CCFF00] hover:bg-[#CCFF00]/10 rounded-full group"
                data-testid="tuning-learn-more-btn"
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
          {tuningFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-testid={`tuning-feature-${index}`}
                className={`${feature.span} group relative bg-[#111111] border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden transition-colors duration-300 hover:border-[#CCFF00]/30`}
              >
                {/* Background Image for specific cards */}
                {feature.hasImage && (
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src={feature.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-[#CCFF00]" />
                  </div>
                  <h3 className="font-['Outfit'] text-xl font-semibold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                  style={{ boxShadow: 'inset 0 0 30px rgba(204, 255, 0, 0.1)' }} 
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
