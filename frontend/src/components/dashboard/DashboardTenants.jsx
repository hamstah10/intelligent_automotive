import { motion } from 'framer-motion';
import { Building2, Users, Database, Globe, MoreHorizontal, Check, Pause } from 'lucide-react';
import { t, surface } from './themeUtils';

const tenants = [
  { id: 1, name: 'AutoHaus Süd GmbH', region: 'Bayern', users: 12, listings: 1247, status: 'active', plan: 'Enterprise', color: '#CCFF00' },
  { id: 2, name: 'Premium Cars Nord', region: 'Hamburg', users: 8, listings: 890, status: 'active', plan: 'Professional', color: '#00E5FF' },
  { id: 3, name: 'Star Motors Berlin', region: 'Berlin', users: 15, listings: 2100, status: 'active', plan: 'Enterprise', color: '#CCFF00' },
  { id: 4, name: 'VW Zentrum FFM', region: 'Hessen', users: 6, listings: 560, status: 'paused', plan: 'Starter', color: '#facc15' },
  { id: 5, name: 'Tuning Experts München', region: 'Bayern', users: 4, listings: 320, status: 'active', plan: 'Professional', color: '#00E5FF' },
  { id: 6, name: 'Drive & Style Köln', region: 'NRW', users: 9, listings: 780, status: 'active', plan: 'Enterprise', color: '#CCFF00' },
];

const stats = [
  { label: 'Aktive Tenants', value: '5', icon: Building2, color: '#CCFF00' },
  { label: 'Gesamt-Nutzer', value: '54', icon: Users, color: '#00E5FF' },
  { label: 'Datenbank-Einträge', value: '5.9K', icon: Database, color: '#c084fc' },
  { label: 'Regionen', value: '4', icon: Globe, color: '#facc15' },
];

const planColor = (plan) => {
  if (plan === 'Enterprise') return { bg: 'rgba(204,255,0,0.15)', color: '#CCFF00' };
  if (plan === 'Professional') return { bg: 'rgba(0,229,255,0.15)', color: '#00E5FF' };
  return { bg: 'rgba(250,204,21,0.15)', color: '#facc15' };
};

export const DashboardTenants = () => (
  <>
    <div className="mb-8">
      <h1 data-testid="tenants-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Tenants</h1>
      <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Multi-Tenant Verwaltung und Mandanten-Übersicht.</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${surface()} p-5 flex items-start justify-between`}>
            <div>
              <div className="text-sm mb-1" style={{ color: t.textSec }}>{stat.label}</div>
              <div className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>{stat.value}</div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
              <Icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Table */}
    <div className={`${surface()} overflow-hidden`}>
      <div className="p-5 pb-0">
        <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>Alle Mandanten</h3>
        <p className="text-xs mt-0.5 mb-5" style={{ color: t.textMut }}>{tenants.length} Mandanten registriert</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--d-border)' }}>
              {['Mandant', 'Region', 'Nutzer', 'Listings', 'Plan', 'Status', ''].map(h => (
                <th key={h} className="text-left font-medium px-5 py-3 text-xs" style={{ color: t.textSec }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, i) => {
              const pc = planColor(tenant.plan);
              return (
                <motion.tr key={tenant.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.04 }}
                  className="transition-colors" style={{ borderBottom: '1px solid var(--d-border-sub)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--d-hover)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[11px] text-black" style={{ backgroundColor: tenant.color }}>
                        {tenant.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium" style={{ color: t.text }}>{tenant.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4" style={{ color: t.textSec }}>{tenant.region}</td>
                  <td className="px-5 py-4" style={{ color: t.textSec }}>{tenant.users}</td>
                  <td className="px-5 py-4" style={{ color: t.textSec }}>{tenant.listings.toLocaleString('de-DE')}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: pc.bg, color: pc.color }}>{tenant.plan}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: tenant.status === 'active' ? '#22c55e' : '#facc15' }}>
                      {tenant.status === 'active' ? <Check className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                      {tenant.status === 'active' ? 'Aktiv' : 'Pausiert'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg transition-colors" style={{ color: t.textMut }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--d-hover)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
