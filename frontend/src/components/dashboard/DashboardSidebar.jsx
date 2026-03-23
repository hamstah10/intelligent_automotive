import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Car, Wrench, Bell, FileText, Users, Building2, Sun, Moon, Layers } from 'lucide-react';
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

const themeOptions = [
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'gradient', icon: Layers, label: 'Gradient' },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { theme, setTheme } = useDashTheme();

  return (
    <aside
      data-testid="dashboard-sidebar"
      className="dash-sidebar fixed left-0 top-0 bottom-0 w-[220px] flex flex-col z-40 transition-all duration-300"
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
            <span className="font-semibold text-sm font-['Orbitron'] tracking-tight" style={{ color: 'var(--d-text)' }}>AutoIntel</span>
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

      {/* Theme Switch + Plan Status */}
      <div className="px-3 pb-5 space-y-3">
        {/* 3-Way Theme Switch */}
        <div
          data-testid="theme-switch"
          className="dash-card relative flex items-center p-1 rounded-xl transition-all duration-300"
          style={{ backgroundColor: 'var(--d-surface)', border: '1px solid var(--d-border)' }}
        >
          {/* Animated Indicator */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-lg z-0"
            animate={{
              left: theme === 'dark' ? '4px' : theme === 'light' ? 'calc(33.33% + 1px)' : 'calc(66.66% - 1px)',
              width: 'calc(33.33% - 4px)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              background: theme === 'dark' ? 'rgba(204,255,0,0.15)' : theme === 'light' ? 'rgba(0,229,255,0.15)' : 'linear-gradient(135deg, rgba(204,255,0,0.15), rgba(0,229,255,0.15))',
              border: `1px solid ${theme === 'dark' ? 'rgba(204,255,0,0.2)' : theme === 'light' ? 'rgba(0,229,255,0.2)' : 'rgba(204,255,0,0.15)'}`,
            }}
          />

          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = theme === opt.id;
            const activeColor = opt.id === 'dark' ? '#CCFF00' : opt.id === 'light' ? '#00E5FF' : '#CCFF00';
            return (
              <button
                key={opt.id}
                data-testid={`theme-btn-${opt.id}`}
                onClick={() => setTheme(opt.id)}
                className="relative z-10 flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg text-[10px] font-medium transition-colors duration-200"
                style={{ color: isActive ? activeColor : 'var(--d-text-mut)' }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Plan Status */}
        <div
          data-testid="plan-status-card"
          className="dash-card p-4 rounded-2xl transition-all duration-300"
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
