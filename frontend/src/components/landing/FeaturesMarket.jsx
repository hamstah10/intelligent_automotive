import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Search, Bell, Target, BarChart2, Eye, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const marketFeatures = [
  {
    icon: TrendingUp,
    title: 'Preisanalyse',
    description: 'Verstehe Marktpreise in Echtzeit und erkenne Trends bevor andere.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Target,
    title: 'Deal Score',
    description: 'Automatische Bewertung jedes Fahrzeugs. Finde Deals unter Marktwert sofort.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Speichere komplexe Suchprofile und lass dich bei neuen Treffern benachrichtigen.',
    span: 'col-span-1 md:col-span-4 row-span-1',
  },
  {
    icon: Eye,
    title: 'Konkurrenz-Monitoring',
    description: 'Behalte Händler und deren Bestände im Blick. Reagiere schneller als die Konkurrenz.',
    span: 'col-span-1 md:col-span-6 row-span-1',
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwwfHx8fDE3NzQxNDkwODR8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    icon: Bell,
    title: 'Echtzeit-Alerts',
    description: 'Werde sofort informiert wenn ein neues Fahrzeug deinen Kriterien entspricht oder ein Preis fällt.',
    span: 'col-span-1 md:col-span-6 row-span-1',
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

export const FeaturesMarket = () => {
  return (
    <section
      id="features"
      data-testid="features-market-section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-lg blur-[150px] pointer-events-none" />

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
            <span className="text-[#00E5FF] text-xs font-mono uppercase tracking-[0.2em]">
              01 / Market Intelligence
            </span>
            <span className="w-12 h-px bg-[#00E5FF]/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Orbitron'] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-white mb-4"
          >
            Finde Fahrzeuge{' '}
            <span className="text-gradient-cyan">unter Marktwert</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base lg:text-lg max-w-2xl leading-relaxed mb-6"
          >
            Analysiere den Fahrzeugmarkt, verstehe Preise, erkenne Deals und 
            überwache deine Konkurrenz – alles in einer Plattform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/market">
              <Button 
                variant="outline" 
                className="border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-lg group"
                data-testid="market-learn-more-btn"
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
          {marketFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-testid={`market-feature-${index}`}
                className={`${feature.span} group relative bg-[#111111] border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden transition-colors duration-300 hover:border-[#00E5FF]/30`}
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
                  <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-[#00E5FF]" />
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
                  style={{ boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.1)' }} 
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
