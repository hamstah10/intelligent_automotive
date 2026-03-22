import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'So funktioniert\'s', href: '#how-it-works' },
  { name: 'Preise', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        data-testid="navigation-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'glass border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            data-testid="nav-logo"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-[#CCFF00] flex items-center justify-center">
              <span className="font-bold text-black text-lg font-['Outfit']">AI</span>
            </div>
            <span className="text-white font-semibold text-xl font-['Outfit'] tracking-tight">
              AutoIntel
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => scrollToSection(link.href)}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              data-testid="nav-login-btn"
              className="text-white/80 hover:text-white hover:bg-white/5"
              onClick={() => scrollToSection('#cta')}
            >
              Anmelden
            </Button>
            <Button
              data-testid="nav-demo-btn"
              className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-5 rounded-full transition-transform duration-200 active:scale-95"
              onClick={() => scrollToSection('#cta')}
            >
              Demo buchen
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-20 px-6 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white text-lg py-3 border-b border-white/10 text-left"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white"
                  onClick={() => scrollToSection('#cta')}
                >
                  Anmelden
                </Button>
                <Button
                  className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold"
                  onClick={() => scrollToSection('#cta')}
                >
                  Demo buchen
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
