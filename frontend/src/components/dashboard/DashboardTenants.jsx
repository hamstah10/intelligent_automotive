import { motion } from 'framer-motion';
import { Building2, Users, Database, Globe, Clock, Settings, Check, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

const tenants = [
  { id: 1, name: 'AutoHaus Süd GmbH', plan: 'Elite', members: 8, listings: 1247, status: 'active', region: 'Bayern', since: 'Jan 2025', usage: 92 },
  { id: 2, name: 'Premium Cars Nord', plan: 'Pro', members: 4, listings: 634, status: 'active', region: 'Hamburg', since: 'Mär 2025', usage: 67 },
  { id: 3, name: 'Star Motors Berlin', plan: 'Elite', members: 12, listings: 2100, status: 'active', region: 'Berlin', since: 'Dez 2024', usage: 88 },
  { id: 4, name: 'VW Zentrum FFM', plan: 'Combined', members: 6, listings: 890, status: 'active', region: 'Frankfurt', since: 'Feb 2025', usage: 75 },
  { id: 5, name: 'TuningWerk München', plan: 'Pro', members: 3, listings: 0, status: 'trial', region: 'München', since: 'Mär 2026', usage: 31 },
  { id: 6, name: 'Porsche Zentrum Stuttgart', plan: 'Elite', members: 5, listings: 456, status: 'active', region: 'Stuttgart', since: 'Nov 2024', usage: 81 },
];

const planColors = {
  Elite: 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/20',
  Pro: 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/20',
  Combined: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  Basic: 'bg-white/5 text-white/50 border-white/10',
};

const statusConfig = {
  active: { label: 'Aktiv', icon: Check, color: 'text-green-400' },
  trial: { label: 'Trial', icon: Clock, color: 'text-yellow-400' },
  suspended: { label: 'Gesperrt', icon: AlertTriangle, color: 'text-red-400' },
};

export const DashboardTenants = () => {
  const active = tenants.filter(t => t.status === 'active').length;
  const totalMembers = tenants.reduce((acc, t) => acc + t.members, 0);
  const totalListings = tenants.reduce((acc, t) => acc + t.listings, 0);

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="tenants-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Tenants</h1>
          <p className="text-white/40 text-sm mt-1.5">Mandanten-Verwaltung und Übersicht.</p>
        </div>
        <Button className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-10 px-5 text-sm gap-2">
          <Building2 className="w-4 h-4" />Neuen Tenant anlegen
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Aktive Tenants', value: active, icon: Building2 },
          { label: 'Gesamt Nutzer', value: totalMembers, icon: Users },
          { label: 'Gesamt Listings', value: totalListings.toLocaleString('de-DE'), icon: Database },
          { label: 'Regionen', value: new Set(tenants.map(t => t.region)).size, icon: Globe },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex items-start justify-between">
              <div>
                <div className="text-white/40 text-sm mb-1">{s.label}</div>
                <div className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">{s.value}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Icon className="w-5 h-5 text-white/30" /></div>
            </motion.div>
          );
        })}
      </div>

      {/* Tenants List */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-5">Alle Tenants</h3>
        <div className="space-y-2.5">
          {tenants.map((tenant, i) => {
            const sc = statusConfig[tenant.status];
            const StatusIcon = sc.icon;
            return (
              <motion.div key={tenant.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}
                className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5 hover:border-[#CCFF00]/15 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-medium text-sm">{tenant.name}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${planColors[tenant.plan]}`}>{tenant.plan}</span>
                      <span className={`flex items-center gap-1 text-xs ${sc.color}`}><StatusIcon className="w-3 h-3" />{sc.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span><Users className="w-3 h-3 inline mr-1" />{tenant.members} Mitglieder</span>
                      <span><Database className="w-3 h-3 inline mr-1" />{tenant.listings.toLocaleString('de-DE')} Listings</span>
                      <span><Globe className="w-3 h-3 inline mr-1" />{tenant.region}</span>
                      <span><Clock className="w-3 h-3 inline mr-1" />Seit {tenant.since}</span>
                    </div>
                  </div>
                  <div className="shrink-0 w-[120px]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-white/30">Nutzung</span>
                      <span className="text-white font-medium">{tenant.usage}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#CCFF00] rounded-full" style={{ width: `${tenant.usage}%` }} />
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors shrink-0"><Settings className="w-4 h-4" /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};
