import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const plans = [
  {
    name: 'Basic',
    price: '49',
    description: 'Perfekt für Einsteiger',
    features: [
      'Market Intelligence Zugang',
      '1.000 Listings/Monat',
      'Basic Deal Score',
      '3 Suchprofile',
      'E-Mail Alerts',
      'Standard Support',
    ],
    cta: 'Jetzt starten',
    popular: false,
    color: 'white',
  },
  {
    name: 'Pro',
    price: '99',
    description: 'Für professionelle Händler',
    features: [
      'Alles aus Basic',
      '10.000 Listings/Monat',
      'Advanced Deal Score',
      'Unbegrenzte Suchprofile',
      'Real-time Alerts',
      'API Zugang',
      'Priority Support',
    ],
    cta: 'Jetzt starten',
    popular: false,
    color: 'cyan',
  },
  {
    name: 'Elite',
    price: '199',
    description: 'Maximale Power',
    features: [
      'Alles aus Pro',
      'Unbegrenzte Listings',
      'Konkurrenz-Monitoring',
      'Custom Alerts',
      'Dedicated Account Manager',
      'White-Label Reports',
    ],
    cta: 'Kontakt aufnehmen',
    popular: false,
    color: 'yellow',
  },
  {
    name: 'Combined',
    price: '299',
    description: 'Market + Tuning Intelligence',
    features: [
      'Vollständiger Market Zugang',
      'Vollständiger Tuning Zugang',
      'ECU/TCU Datenbank',
      'Tool Matrix & Protokolle',
      'Cross-Platform Insights',
      'Enterprise Support',
      'Custom Integrationen',
    ],
    cta: 'Demo buchen',
    popular: true,
    color: 'combined',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const Pricing = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#00E5FF]/5 rounded-lg blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#CCFF00]/5 rounded-lg blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-12 h-px bg-white/20" />
            <span className="text-white/50 text-xs font-mono uppercase tracking-[0.2em]">
              Preise
            </span>
            <span className="w-12 h-px bg-white/20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
          >
            Transparente Preise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Wähle den Plan, der zu deinem Geschäft passt. Jederzeit upgraden oder kündigen.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan, index) => {
            const getBorderColor = () => {
              if (plan.popular) return 'border-[#CCFF00]';
              if (plan.color === 'cyan') return 'border-[#00E5FF]/30';
              if (plan.color === 'yellow') return 'border-[#CCFF00]/30';
              return 'border-white/10';
            };

            const getButtonStyle = () => {
              if (plan.popular) return 'bg-[#CCFF00] text-black hover:bg-[#B3E600]';
              if (plan.color === 'cyan') return 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/20';
              if (plan.color === 'yellow') return 'bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 hover:bg-[#CCFF00]/20';
              return 'bg-white/5 text-white border border-white/10 hover:bg-white/10';
            };

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
                className={`relative group bg-[#111111]/80 backdrop-blur-sm border ${getBorderColor()} rounded-2xl p-6 lg:p-8 transition-transform duration-300 hover:-translate-y-2 ${
                  plan.popular ? 'ring-1 ring-[#CCFF00]/50' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-[#CCFF00] text-black text-xs font-semibold px-3 py-1 rounded-lg">
                      <Zap className="w-3 h-3" />
                      Beliebt
                    </div>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white mb-1 tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-['Space_Grotesk'] text-4xl lg:text-5xl font-bold text-white tracking-tighter">
                    €{plan.price}
                  </span>
                  <span className="text-white/50 text-sm">/Monat</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#CCFF00] mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                  className={`w-full font-semibold rounded-lg py-5 transition-transform duration-200 active:scale-95 ${getButtonStyle()}`}
                  onClick={() => scrollToSection('#cta')}
                >
                  {plan.cta}
                </Button>

                {/* Tracing Beam Effect for Combined */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-20" style={{
                      background: 'linear-gradient(135deg, transparent 40%, rgba(204,255,0,0.1) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s ease-in-out infinite',
                    }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-white/40 text-sm mt-10"
        >
          Alle Preise zzgl. MwSt. • Monatlich kündbar • 14 Tage Geld-zurück-Garantie
        </motion.p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};
