import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Mit AutoIntel finden wir Fahrzeuge unter Marktwert bevor unsere Konkurrenz sie überhaupt sieht. Ein Game-Changer für unser Geschäft.',
    author: 'Michael Schneider',
    role: 'Geschäftsführer, Premium Cars München',
    avatar: 'https://images.pexels.com/photos/6720529/pexels-photo-6720529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    color: 'cyan',
  },
  {
    quote: 'Die ECU-Datenbank hat unsere Recherche-Zeit um 80% reduziert. Wir wissen sofort welches Tool wir brauchen.',
    author: 'Thomas Weber',
    role: 'Tuning-Spezialist, Weber Performance',
    avatar: 'https://images.pexels.com/photos/7807035/pexels-photo-7807035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    color: 'yellow',
  },
  {
    quote: 'Endlich eine Plattform, die Market und Tuning Intelligence vereint. Genau das hat in der Branche gefehlt.',
    author: 'Sarah Fischer',
    role: 'Head of Operations, AutoGroup Deutschland',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    color: 'cyan',
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
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const Testimonials = () => {
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#0A0A0A]"
    >
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
            <span className="text-white/50 text-xs font-mono uppercase tracking-[0.2em]">
              Kundenstimmen
            </span>
            <span className="w-12 h-px bg-white/20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-['Orbitron'] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-white"
          >
            Was unsere Kunden sagen
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => {
            const accentColor = testimonial.color === 'cyan' ? '#00E5FF' : '#CCFF00';
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-testid={`testimonial-${index}`}
                className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 lg:p-8 group hover:border-white/20 transition-colors duration-300"
              >
                {/* Quote Icon */}
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                  style={{ 
                    backgroundColor: `${accentColor}10`,
                    border: `1px solid ${accentColor}30`
                  }}
                >
                  <Quote className="w-5 h-5" style={{ color: accentColor }} />
                </div>

                {/* Quote Text */}
                <p className="text-white/80 text-base leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/10">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-white/50 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Decorative Line */}
                <div 
                  className="absolute bottom-0 left-8 right-8 h-px opacity-30"
                  style={{ backgroundColor: accentColor }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '500+', label: 'Aktive Nutzer' },
            { value: '98%', label: 'Kundenzufriedenheit' },
            { value: '24/7', label: 'Support verfügbar' },
            { value: '<2h', label: 'Avg. Response Time' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-['Orbitron'] text-xl lg:text-2xl font-bold text-white tracking-tighter">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
