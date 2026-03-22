import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Car, Wrench, Bell, FileText, Users, Building2, Sun, Moon } from 'lucide-react';
import { useDashTheme } from './DashboardThemeContext';

const navItems = [
  { name: 'Übersicht', href: '/dashboard', icon: LayoutDashboard, color: null },
  { name: 'Market', href: '/dashboard/market', icon: Car, badge: 0, color: '#00E5FF' },
  { name: 'Tuning', href: '/dashboard/tuning', icon: Wrench, badge: 17, color: '#CCFF00' },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell, badge: 61, color: null },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText, color: null },
  { name: 'Teams', href: '/dashboard/teams', icon: Users, color: null },
  { name: 'Tenants', href: '/dashboard/tenants', icon: Building2, color: null },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useDashTheme();
  const isLight = theme === 'light';

  return (
    <aside
      data-testid="dashboard-sidebar"
      className="fixed left-0 top-0 bottom-0 w-[220px] flex flex-col z-40 transition-colors duration-300"
      style={{ backgroundColor: 'var(--d-bg)', borderRight: '1px solid var(--d-border)' }}
    >
      {/* Logo */}
      <div className="px-5 py-6" style={{ borderBottom: '1px solid var(--d-border)' }}>
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png"
            alt="intelligent automotive"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm font-['Space_Grotesk'] tracking-tight" style={{ color: 'var(--d-text)' }}>AutoIntel</span>
            <span className="text-[10px]" style={{ color: 'var(--d-text-sec)' }}>Market + Tuning Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href ||
            (item.href === '/dashboard' && location.pathname === '/dashboard');
          const activeColor = item.color || '#CCFF00';

          return (
            <Link
              key={item.name}
              to={item.href}
              data-testid={`sidebar-nav-${item.name.toLowerCase()}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={isActive
                ? { backgroundColor: activeColor, color: '#000' }
                : { color: 'var(--d-text-sec)' }
              }
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--d-hover)'; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Icon className="w-[18px] h-[18px]" style={!isActive && item.color ? { color: `${item.color}80` } : {}} />
              <span className="flex-1">{item.name}</span>
              {item.badge !== undefined && (
                <span
                  className="min-w-[26px] h-[22px] flex items-center justify-center rounded-md text-[11px] font-semibold"
                  style={isActive
                    ? { backgroundColor: 'rgba(0,0,0,0.15)', color: '#000' }
                    : { backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)' }
                  }
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle + Plan Status */}
      <div className="px-3 pb-5 space-y-3">
        {/* Theme Toggle */}
        <button
          data-testid="theme-toggle-btn"
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
          style={{ backgroundColor: 'var(--d-surface)', border: '1px solid var(--d-border)', color: 'var(--d-text-sec)' }}
        >
          <div className="relative w-10 h-[22px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: isLight ? '#00E5FF' : 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="absolute top-[3px] w-4 h-4 rounded-full flex items-center justify-center"
              animate={{ left: isLight ? '22px' : '3px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ backgroundColor: isLight ? '#ffffff' : '#CCFF00' }}
            >
              {isLight
                ? <Sun className="w-2.5 h-2.5 text-[#00E5FF]" />
                : <Moon className="w-2.5 h-2.5 text-black" />
              }
            </motion.div>
          </div>
          <span>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Plan Status */}
        <div
          data-testid="plan-status-card"
          className="p-4 rounded-2xl transition-colors duration-300"
          style={{ backgroundColor: 'var(--d-surface)', border: '1px solid var(--d-border)' }}
        >
          <div className="font-semibold text-sm mb-0.5" style={{ color: 'var(--d-text)' }}>Plan Status</div>
          <div className="text-xs mb-3" style={{ color: 'var(--d-text-sec)' }}>Combined Elite Plan</div>
          <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ backgroundColor: 'var(--d-border-sub)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-[#CCFF00] rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: 'var(--d-text-sec)' }}>API & Alerts Nutzung</span>
            <span className="font-semibold" style={{ color: 'var(--d-text)' }}>78%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
