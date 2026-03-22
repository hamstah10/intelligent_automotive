import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const faqs = [
  {
    question: 'Was ist der Unterschied zwischen Market und Tuning Intelligence?',
    answer: 'Market Intelligence fokussiert sich auf Fahrzeugmarkt-Analysen: Preisvergleiche, Deal Scores und Händler-Monitoring. Tuning Intelligence konzentriert sich auf technische Daten: ECU/TCU-Datenbanken, Tool-Kompatibilität und Protokoll-Updates. Mit dem Combined-Plan erhältst du Zugang zu beiden Produkten.',
  },
  {
    question: 'Woher stammen die Daten?',
    answer: 'Unsere Crawler durchsuchen kontinuierlich öffentlich zugängliche Quellen wie Fahrzeugbörsen, Händlerwebsites und technische Dokumentationen. Die Daten werden normalisiert, verifiziert und in Echtzeit aktualisiert.',
  },
  {
    question: 'Kann ich die Plattform kostenlos testen?',
    answer: 'Ja, wir bieten eine 14-tägige kostenlose Testphase für alle Pläne an. Keine Kreditkarte erforderlich. Buche einfach eine Demo und wir richten deinen Test-Account ein.',
  },
  {
    question: 'Gibt es eine API für eigene Integrationen?',
    answer: 'Ab dem Pro-Plan erhältst du vollen API-Zugang. Du kannst unsere Daten in deine eigenen Systeme integrieren – CRM, ERP oder Custom-Dashboards. Die API-Dokumentation ist umfangreich und wir bieten technischen Support.',
  },
  {
    question: 'Wie funktioniert der Deal Score?',
    answer: 'Der Deal Score analysiert jeden Listing anhand von Marktpreisen, Kilometerstand, Ausstattung und historischen Daten. Ein Score von 80+ bedeutet, dass das Fahrzeug deutlich unter Marktwert angeboten wird. Der Algorithmus wird kontinuierlich optimiert.',
  },
  {
    question: 'Welche ECUs und Tools werden unterstützt?',
    answer: 'Unsere Datenbank umfasst über 10.000 ECU-Typen und alle gängigen Tuning-Tools wie Autotuner, KESSv3, KTAG und mehr. Die Support-Matrix zeigt dir genau welche Methoden (Bench, OBD, Boot) für jedes Steuergerät verfügbar sind.',
  },
  {
    question: 'Kann ich monatlich kündigen?',
    answer: 'Ja, alle unsere Pläne sind monatlich kündbar. Es gibt keine langfristigen Verträge oder versteckten Gebühren. Du kannst jederzeit upgraden, downgraden oder kündigen.',
  },
  {
    question: 'Bietet ihr auch Enterprise-Lösungen an?',
    answer: 'Ja, für größere Teams und spezielle Anforderungen bieten wir maßgeschneiderte Enterprise-Lösungen. Dazu gehören dedizierte Server, Custom Integrationen, SLA-Garantien und persönliche Account Manager. Kontaktiere uns für ein individuelles Angebot.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const FAQ = () => {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
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
              FAQ
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
            Häufig gestellte Fragen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base lg:text-lg leading-relaxed"
          >
            Alles was du über AutoIntel wissen musst
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  data-testid={`faq-item-${index}`}
                  className="border border-white/10 rounded-xl px-6 bg-[#111111]/50 data-[state=open]:border-white/20 transition-colors duration-200"
                >
                  <AccordionTrigger className="py-5 text-left hover:no-underline group">
                    <div className="flex items-start gap-4">
                      <span className="text-[#CCFF00]/50 font-mono text-xs mt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white font-medium text-base group-hover:text-white/90 transition-colors duration-200">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-10 text-white/60 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm">
            Noch Fragen?{' '}
            <a 
              href="#cta" 
              className="text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Kontaktiere uns
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
