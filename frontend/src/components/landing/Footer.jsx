import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ArrowRight, Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { toast } from 'sonner';

const footerLinks = {
  Produkt: [
    { name: 'Market Intelligence', href: '/market' },
    { name: 'Tuning Intelligence', href: '/tuning' },
    { name: 'Preise', href: '/#pricing' },
    { name: 'API Dokumentation', href: '/support' },
  ],
  Unternehmen: [
    { name: 'Über uns', href: '#' },
    { name: 'Karriere', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Presse', href: '#' },
  ],
  Support: [
    { name: 'Hilfe Center', href: '/support' },
    { name: 'Dokumentation', href: '/support' },
    { name: 'API Referenz', href: '/support' },
    { name: 'Kontakt', href: '#' },
  ],
  Legal: [
    { name: 'Datenschutz', href: '#' },
    { name: 'AGB', href: '#' },
    { name: 'Impressum', href: '#' },
    { name: 'Cookie-Einstellungen', href: '#' },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Bitte gib eine E-Mail-Adresse ein');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Erfolgreich angemeldet! Wir melden uns bald.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer
      id="cta"
      data-testid="footer-section"
      className="relative bg-[#0A0A0A] border-t border-white/10"
    >
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6">
            STARTEN SIE{' '}
            <span className="text-gradient-yellow">JETZT</span>
          </h2>
          <p className="text-white/60 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Bereit für die Zukunft der Automotive Intelligence? 
            Registriere dich für Updates oder buche eine Demo.
          </p>

          {/* CTA Form */}
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            data-testid="newsletter-form"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="email"
                placeholder="Deine E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="newsletter-email-input"
                className="w-full pl-12 pr-4 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg focus:border-[#CCFF00]/50 focus:ring-[#CCFF00]/20"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="newsletter-submit-btn"
              className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-8 py-6 rounded-lg transition-transform duration-200 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Anmelden'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {/* Alternative CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/demo">
              <Button
                variant="outline"
                data-testid="footer-demo-btn"
                className="border-white/20 text-white hover:bg-white/5 rounded-lg"
              >
                Demo buchen
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                data-testid="footer-login-btn"
                className="border-white/20 text-white hover:bg-white/5 rounded-lg"
              >
                Anmelden
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-16" />

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-tight">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" 
              alt="intelligent automotive"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-xs font-['Space_Grotesk'] tracking-tight">
                intelligent
              </span>
              <span className="text-[#CCFF00] font-bold text-xs font-['Space_Grotesk'] tracking-tight">
                automotive
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm">
            © 2024 intelligent-automotive. Alle Rechte vorbehalten.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Github, label: 'GitHub' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
