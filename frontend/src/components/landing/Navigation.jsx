import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BarChart2, Cpu } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'So funktioniert\'s', href: '#how-it-works' },
  { name: 'Preise', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const productLinks = [
  { name: 'Market Intelligence', href: '/market', icon: BarChart2, color: '#00E5FF' },
  { name: 'Tuning Intelligence', href: '/tuning', icon: Cpu, color: '#CCFF00' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
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
              <span className="font-bold text-black text-lg font-['Space_Grotesk']">iA</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-sm font-['Space_Grotesk'] tracking-tight">
                intelligent
              </span>
              <span className="text-[#CCFF00] font-bold text-sm font-['Space_Grotesk'] tracking-tight">
                automotive
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <button
                data-testid="nav-products-dropdown"
                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Produkte
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProductMenu ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showProductMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#111111] border border-white/10 rounded-xl p-2 shadow-xl"
                  >
                    {productLinks.map((product) => {
                      const Icon = product.icon;
                      return (
                        <Link
                          key={product.name}
                          to={product.href}
                          data-testid={`nav-product-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                        >
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${product.color}15` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: product.color }} />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{product.name}</div>
                            <div className="text-white/50 text-xs">Mehr erfahren</div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-5 rounded-lg transition-transform duration-200 active:scale-95"
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
              {/* Product Links */}
              <div className="pb-4 border-b border-white/10">
                <span className="text-white/50 text-xs uppercase tracking-wider mb-3 block">Produkte</span>
                {productLinks.map((product) => {
                  const Icon = product.icon;
                  return (
                    <Link
                      key={product.name}
                      to={product.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3"
                    >
                      <Icon className="w-5 h-5" style={{ color: product.color }} />
                      <span className="text-white">{product.name}</span>
                    </Link>
                  );
                })}
              </div>
              
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
