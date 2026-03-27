import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Car, Wrench, Bell, FileText, Users, Building2,
  Sun, Moon, Layers, ChevronDown, Brain, Calculator, Search, HelpCircle,
  ArrowLeftRight, Radar, Map, Sparkles, Boxes, GitCompare, TrendingUp,
  Truck, BarChart3, Zap
} from 'lucide-react';
import { useDashTheme } from './DashboardThemeContext';

const mainNav = [
  { name: 'Übersicht', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Market', href: '/dashboard/market', icon: Car, badge: 0, color: '#00E5FF' },
  { name: 'Tuning', href: '/dashboard/tuning', icon: Wrench, badge: 17, color: '#CCFF00' },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell, badge: 61 },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
];

const toolNav = [
  { name: 'Deal Analyzer', href: '/dashboard/tools/deal-analyzer', icon: Brain, color: '#00E5FF' },
  { name: 'ROI Rechner', href: '/dashboard/tools/roi-rechner', icon: Calculator, color: '#CCFF00' },
  { name: 'Marktwert-Check', href: '/dashboard/tools/marktwert', icon: Search, color: '#00E5FF' },
  { name: 'Deal Quiz', href: '/dashboard/tools/deal-quiz', icon: HelpCircle, color: '#CCFF00' },
  { name: 'Vorher/Nachher', href: '/dashboard/tools/vorher-nachher', icon: ArrowLeftRight, color: '#00E5FF' },
  { name: 'Wettbewerb-Radar', href: '/dashboard/tools/radar', icon: Radar, color: '#CCFF00' },
  { name: 'Markt-Heatmap', href: '/dashboard/tools/heatmap', icon: Map, color: '#00E5FF' },
];

const beispielNav = [
  { name: 'Fahrzeug-Vergleich', href: '/dashboard/beispiele/vergleich', icon: GitCompare, color: '#00E5FF' },
  { name: 'Preis-Tracker', href: '/dashboard/beispiele/preis-tracker', icon: TrendingUp, color: '#CCFF00' },
  { name: 'Flotten-Übersicht', href: '/dashboard/beispiele/flotte', icon: Truck, color: '#00E5FF' },
  { name: 'Markt-Report', href: '/dashboard/beispiele/markt-report', icon: BarChart3, color: '#CCFF00' },
  { name: 'Tuning Showcase', href: '/dashboard/beispiele/tuning-showcase', icon: Zap, color: '#00E5FF' },
  { name: 'Dashboard Widgets', href: '/dashboard/beispiele/widgets', icon: Boxes, color: '#CCFF00' },
];

const bottomNav = [
  { name: 'Empfehlungen', href: '/dashboard/empfehlungen', icon: Sparkles, color: '#CCFF00' },
  { name: 'Teams', href: '/dashboard/teams', icon: Users },
  { name: 'Tenants', href: '/dashboard/tenants', icon: Building2 },
];

const themeOptions = [
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'gradient', icon: Layers, label: 'Gradient' },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { theme, setTheme } = useDashTheme();
  const [toolsOpen, setToolsOpen] = useState(() => location.pathname.includes('/tools/'));
  const [beispieleOpen, setBeispieleOpen] = useState(() => location.pathname.includes('/beispiele/'));

  const isToolActive = toolNav.some(t => location.pathname === t.href);
  const isBeispielActive = beispielNav.some(b => location.pathname === b.href);

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;
    const activeColor = item.color || '#CCFF00';
    return (
      <Link
        to={item.href}
        data-testid={`sidebar-nav-${item.name.toLowerCase().replace(/[\s\/]/g, '-')}`}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        style={isActive ? { backgroundColor: activeColor, color: '#000' } : { color: 'var(--d-text-sec)' }}
        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--d-hover)'; }}
        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <Icon className="w-[18px] h-[18px]" style={!isActive && item.color ? { color: `${item.color}80` } : {}} />
        <span className="flex-1 truncate">{item.name}</span>
        {item.badge !== undefined && (
          <span className="min-w-[24px] h-[20px] flex items-center justify-center rounded-md text-[10px] font-semibold"
            style={isActive ? { backgroundColor: 'rgba(0,0,0,0.15)', color: '#000' } : { backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)' }}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside data-testid="dashboard-sidebar"
      className="dash-sidebar fixed left-0 top-0 bottom-0 w-[220px] flex flex-col z-40 transition-all duration-300"
      style={{ backgroundColor: 'var(--d-bg)', borderRight: '1px solid var(--d-border)' }}>

      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--d-border)' }}>
        <Link to="/" className="flex items-center gap-3">
          <img src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" alt="AutoIntel" className="w-9 h-9 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-xs font-['Orbitron'] tracking-tight" style={{ color: 'var(--d-text)' }}>AutoIntel</span>
            <span className="text-[9px]" style={{ color: 'var(--d-text-sec)' }}>Market + Tuning</span>
          </div>
        </Link>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
        {/* Main Nav */}
        {mainNav.map(item => <NavLink key={item.href} item={item} />)}

        {/* Tools Section */}
        <div className="pt-3 pb-1">
          <button
            data-testid="sidebar-tools-toggle"
            onClick={() => setToolsOpen(!toolsOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ color: isToolActive ? '#CCFF00' : 'var(--d-text-sec)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--d-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <Sparkles className="w-[18px] h-[18px]" style={{ color: isToolActive ? '#CCFF00' : undefined }} />
            <span className="flex-1 text-left">Tools</span>
            <span className="min-w-[24px] h-[20px] flex items-center justify-center rounded-md text-[10px] font-semibold"
              style={{ backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)' }}>
              {toolNav.length}
            </span>
            <motion.div animate={{ rotate: toolsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {toolsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pl-3 pt-1 space-y-0.5">
                  {toolNav.map(item => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link key={item.href} to={item.href}
                        data-testid={`sidebar-tool-${item.name.toLowerCase().replace(/[\s\/]/g, '-')}`}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                        style={isActive ? { backgroundColor: item.color, color: '#000' } : { color: 'var(--d-text-mut)' }}
                        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'var(--d-hover)'; e.currentTarget.style.color = 'var(--d-text-sec)'; } }}
                        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--d-text-mut)'; } }}
                      >
                        <Icon className="w-3.5 h-3.5" style={!isActive ? { color: `${item.color}60` } : {}} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Beispiele Section */}
        <div className="pb-1">
          <button
            data-testid="sidebar-beispiele-toggle"
            onClick={() => setBeispieleOpen(!beispieleOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ color: isBeispielActive ? '#00E5FF' : 'var(--d-text-sec)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--d-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <Boxes className="w-[18px] h-[18px]" style={{ color: isBeispielActive ? '#00E5FF' : undefined }} />
            <span className="flex-1 text-left">Beispiele</span>
            <span className="min-w-[24px] h-[20px] flex items-center justify-center rounded-md text-[10px] font-semibold"
              style={{ backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)' }}>
              {beispielNav.length}
            </span>
            <motion.div animate={{ rotate: beispieleOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {beispieleOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pl-3 pt-1 space-y-0.5">
                  {beispielNav.map(item => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link key={item.href} to={item.href}
                        data-testid={`sidebar-beispiel-${item.name.toLowerCase().replace(/[\s\/\-]/g, '-')}`}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                        style={isActive ? { backgroundColor: item.color, color: '#000' } : { color: 'var(--d-text-mut)' }}
                        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'var(--d-hover)'; e.currentTarget.style.color = 'var(--d-text-sec)'; } }}
                        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--d-text-mut)'; } }}
                      >
                        <Icon className="w-3.5 h-3.5" style={!isActive ? { color: `${item.color}60` } : {}} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="py-2"><div className="h-px" style={{ backgroundColor: 'var(--d-border)' }} /></div>

        {/* Bottom Nav */}
        {bottomNav.map(item => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* Theme + Plan */}
      <div className="px-3 pb-4 space-y-2.5 shrink-0">
        <div data-testid="theme-switch" className="dash-card relative flex items-center p-1 rounded-xl transition-all duration-300"
          style={{ backgroundColor: 'var(--d-surface)', border: '1px solid var(--d-border)' }}>
          <motion.div className="absolute top-1 bottom-1 rounded-lg z-0"
            animate={{ left: theme === 'dark' ? '4px' : theme === 'light' ? 'calc(33.33% + 1px)' : 'calc(66.66% - 1px)', width: 'calc(33.33% - 4px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ background: theme === 'dark' ? 'rgba(204,255,0,0.15)' : theme === 'light' ? 'rgba(0,229,255,0.15)' : 'linear-gradient(135deg, rgba(204,255,0,0.15), rgba(0,229,255,0.15))', border: `1px solid ${theme === 'dark' ? 'rgba(204,255,0,0.2)' : theme === 'light' ? 'rgba(0,229,255,0.2)' : 'rgba(204,255,0,0.15)'}` }} />
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = theme === opt.id;
            const ac = opt.id === 'dark' ? '#CCFF00' : opt.id === 'light' ? '#00E5FF' : '#CCFF00';
            return (
              <button key={opt.id} data-testid={`theme-btn-${opt.id}`} onClick={() => setTheme(opt.id)}
                className="relative z-10 flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[9px] font-medium transition-colors duration-200"
                style={{ color: isActive ? ac : 'var(--d-text-mut)' }}>
                <Icon className="w-3 h-3" /><span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        <div data-testid="plan-status-card" className="dash-card p-3 rounded-xl transition-all duration-300"
          style={{ backgroundColor: 'var(--d-surface)', border: '1px solid var(--d-border)' }}>
          <div className="font-semibold text-xs mb-0.5" style={{ color: 'var(--d-text)' }}>Combined Elite</div>
          <div className="h-1 rounded-full overflow-hidden mb-1" style={{ backgroundColor: 'var(--d-border-sub)' }}>
            <div className="h-full bg-[#CCFF00] rounded-full" style={{ width: '78%' }} />
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span style={{ color: 'var(--d-text-sec)' }}>API Nutzung</span>
            <span className="font-semibold" style={{ color: 'var(--d-text)' }}>78%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
