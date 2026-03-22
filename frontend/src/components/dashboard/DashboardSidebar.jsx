import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Car, Wrench, Bell, FileText,
  Users, Building2
} from 'lucide-react';

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

  return (
    <aside
      data-testid="dashboard-sidebar"
      className="fixed left-0 top-0 bottom-0 w-[220px] bg-[#050505] border-r border-white/10 flex flex-col z-40"
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png"
            alt="intelligent automotive"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm font-['Space_Grotesk'] tracking-tight">AutoIntel</span>
            <span className="text-white/40 text-[10px]">Market + Tuning Intelligence</span>
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-black'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={isActive ? { backgroundColor: activeColor } : {}}
            >
              <Icon className="w-[18px] h-[18px]" style={!isActive && item.color ? { color: `${item.color}80` } : {}} />
              <span className="flex-1">{item.name}</span>
              {item.badge !== undefined && (
                <span className={`min-w-[26px] h-[22px] flex items-center justify-center rounded-md text-[11px] font-semibold ${
                  isActive ? 'bg-black/15 text-black' : 'bg-white/10 text-white/50'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Plan Status */}
      <div className="px-3 pb-5">
        <div
          data-testid="plan-status-card"
          className="p-4 bg-[#111111] rounded-2xl border border-white/10"
        >
          <div className="text-white font-semibold text-sm mb-0.5">Plan Status</div>
          <div className="text-white/40 text-xs mb-3">Combined Elite Plan</div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-[#CCFF00] rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">API & Alerts Nutzung</span>
            <span className="text-white font-semibold">78%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
