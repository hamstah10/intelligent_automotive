import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BarChart2, Cpu, Code, Moon, Sun, Layers } from 'lucide-react';
import { Button } from '../ui/button';
import { useDashTheme } from '../dashboard/DashboardThemeContext';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'So funktioniert\'s', href: '#how-it-works' },
  { name: 'Preise', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const productLinks = [
  { name: 'Market Intelligence', href: '/market', icon: BarChart2, color: '#00E5FF' },
  { name: 'Tuning Intelligence', href: '/tuning', icon: Cpu, color: '#CCFF00' },
  { name: 'Coding Intelligence', href: '/coding', icon: Code, color: '#c084fc' },
];

const themeIcons = { dark: Moon, light: Sun, gradient: Layers };
const themeOrder = ['dark', 'light', 'gradient'];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useDashTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    if (location.pathname !== '/') { window.location.href = '/' + href; return; }
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const cycleTheme = () => {
    const idx = themeOrder.indexOf(theme);
    setTheme(themeOrder[(idx + 1) % themeOrder.length]);
  };

  const ThemeIcon = themeIcons[theme];
  const textClass = isLight ? 'text-[#1a1a2e]' : 'text-white';
  const textMutedClass = isLight ? 'text-[#6b7280]' : 'text-white/70';
  const textDimClass = isLight ? 'text-[#9ca3af]' : 'text-white/50';

  return (
    <>
      <motion.header
        data-testid="navigation-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? `glass border-b ${isLight ? 'border-gray-200' : 'border-white/10'}` : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            data-testid="nav-logo"
            className="flex items-center gap-3 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png"
              alt="intelligent automotive"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className={`font-semibold text-sm font-['Orbitron'] tracking-tight ${textClass}`}>intelligent</span>
              <span className="text-[#CCFF00] font-bold text-sm font-['Orbitron'] tracking-tight">automotive</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <button
                data-testid="nav-products-dropdown"
                className={`flex items-center gap-1 ${textMutedClass} hover:${textClass} transition-colors duration-200 text-sm font-medium`}
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
                    className={`absolute top-full left-0 mt-2 w-64 rounded-xl p-2 shadow-xl border ${
                      isLight ? 'bg-white border-gray-200' : 'bg-[#111111] border-white/10'
                    }`}
                  >
                    {productLinks.map((product) => {
                      const Icon = product.icon;
                      return (
                        <Link
                          key={product.name}
                          to={product.href}
                          data-testid={`nav-product-${product.name.toLowerCase().replace(/\s/g, '-')}`}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 group ${
                            isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${product.color}15` }}>
                            <Icon className="w-5 h-5" style={{ color: product.color }} />
                          </div>
                          <div>
                            <div className={`font-medium text-sm ${textClass}`}>{product.name}</div>
                            <div className={`text-xs ${textDimClass}`}>Mehr erfahren</div>
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
                className={`${textMutedClass} hover:${textClass} transition-colors duration-200 text-sm font-medium`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              data-testid="nav-theme-toggle"
              onClick={cycleTheme}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border ${
                isLight ? 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200' : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title={`Theme: ${theme}`}
            >
              <ThemeIcon className="w-4 h-4" />
            </button>

            <Link to="/login">
              <Button
                variant="ghost"
                data-testid="nav-login-btn"
                className={isLight ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/5'}
              >
                Anmelden
              </Button>
            </Link>
            <Link to="/demo">
              <Button
                data-testid="nav-demo-btn"
                className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-5 rounded-lg transition-transform duration-200 active:scale-95"
              >
                Demo buchen
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className={`md:hidden p-2 ${textClass}`}
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
            className={`fixed inset-0 z-40 pt-20 px-6 md:hidden ${isLight ? 'bg-white' : 'bg-[#050505]'}`}
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              <div className={`pb-4 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                <span className={`text-xs uppercase tracking-wider mb-3 block ${textDimClass}`}>Produkte</span>
                {productLinks.map((product) => {
                  const Icon = product.icon;
                  return (
                    <Link key={product.name} to={product.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3">
                      <Icon className="w-5 h-5" style={{ color: product.color }} />
                      <span className={textClass}>{product.name}</span>
                    </Link>
                  );
                })}
              </div>
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => scrollToSection(link.href)}
                  className={`${textClass} text-lg py-3 border-b ${isLight ? 'border-gray-200' : 'border-white/10'} text-left`}>
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className={`w-full ${isLight ? 'border-gray-300 text-gray-700' : 'border-white/20 text-white'}`}>Anmelden</Button>
                </Link>
                <Link to="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold">Demo buchen</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
