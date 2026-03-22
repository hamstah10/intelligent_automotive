import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Car, Wrench, Bell, FileText,
  Users, Building2, ChevronRight
} from 'lucide-react';

const navItems = [
  { name: 'Übersicht', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Market', href: '/dashboard/market', icon: Car, badge: 0 },
  { name: 'Tuning', href: '/dashboard/tuning', icon: Wrench, badge: 17 },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell, badge: 61 },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Teams', href: '/dashboard/teams', icon: Users },
  { name: 'Tenants', href: '/dashboard/tenants', icon: Building2 },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside
      data-testid="dashboard-sidebar"
      className="fixed left-0 top-0 bottom-0 w-[200px] bg-[#0c1017] border-r border-white/5 flex flex-col z-40"
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#CCFF00]/15 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-[#CCFF00]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-sm font-['Space_Grotesk'] tracking-tight">AutoIntel</span>
            <span className="text-white/40 text-[10px]">Market + Tuning Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href ||
            (item.href === '/dashboard' && location.pathname === '/dashboard');

          return (
            <Link
              key={item.name}
              to={item.href}
              data-testid={`sidebar-nav-${item.name.toLowerCase()}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#CCFF00] text-[#0c1017]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="flex-1">{item.name}</span>
              {item.badge !== undefined && (
                <span className={`min-w-[24px] h-[22px] flex items-center justify-center rounded-md text-xs font-semibold ${
                  isActive ? 'bg-[#0c1017]/20 text-[#0c1017]' : 'bg-white/10 text-white/60'
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
          className="p-4 bg-[#111827] rounded-xl border border-white/5"
        >
          <div className="text-white font-semibold text-sm mb-0.5">Plan Status</div>
          <div className="text-white/40 text-xs mb-3">Combined Elite Plan</div>
          <div className="h-2 bg-[#1a2030] rounded-full overflow-hidden mb-2">
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
