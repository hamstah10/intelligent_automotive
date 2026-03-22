import { motion } from 'framer-motion';
import { Users, Shield, Crown, Eye, Mail, MoreHorizontal } from 'lucide-react';
import { t, surface, surfaceAlt } from './themeUtils';

const roles = [
  { name: 'Admin', desc: 'Vollzugriff auf alle Module', color: '#CCFF00', icon: Crown, count: 2 },
  { name: 'Analyst', desc: 'Market + Reports Zugriff', color: '#00E5FF', icon: Eye, count: 4 },
  { name: 'Tuner', desc: 'Tuning-Modul Zugriff', color: '#c084fc', icon: Shield, count: 3 },
  { name: 'Viewer', desc: 'Nur-Lese Zugriff', color: '#facc15', icon: Eye, count: 5 },
];

const members = [
  { name: 'Max Mustermann', email: 'max@autointel.de', role: 'Admin', avatar: 'MM', status: 'online' },
  { name: 'Sarah Schmidt', email: 'sarah@autointel.de', role: 'Analyst', avatar: 'SS', status: 'online' },
  { name: 'Jan Weber', email: 'jan@autointel.de', role: 'Tuner', avatar: 'JW', status: 'offline' },
  { name: 'Lisa Müller', email: 'lisa@autointel.de', role: 'Analyst', avatar: 'LM', status: 'online' },
  { name: 'Tom Fischer', email: 'tom@autointel.de', role: 'Viewer', avatar: 'TF', status: 'offline' },
  { name: 'Anna Koch', email: 'anna@autointel.de', role: 'Tuner', avatar: 'AK', status: 'online' },
];

const roleColor = (role) => {
  if (role === 'Admin') return { bg: 'rgba(204,255,0,0.15)', color: '#CCFF00' };
  if (role === 'Analyst') return { bg: 'rgba(0,229,255,0.15)', color: '#00E5FF' };
  if (role === 'Tuner') return { bg: 'rgba(192,132,252,0.15)', color: '#c084fc' };
  return { bg: 'rgba(250,204,21,0.15)', color: '#facc15' };
};

export const DashboardTeams = () => (
  <>
    <div className="mb-8">
      <h1 data-testid="teams-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight" style={{ color: t.text }}>Teams</h1>
      <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Team-Mitglieder, Rollen und Berechtigungen verwalten.</p>
    </div>

    {/* Roles */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {roles.map((role, i) => {
        const Icon = role.icon;
        return (
          <motion.div key={role.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${surface()} p-5`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${role.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: role.color }} />
              </div>
              <span className="font-['Space_Grotesk'] text-2xl font-bold" style={{ color: t.text }}>{role.count}</span>
            </div>
            <div className="font-medium text-sm" style={{ color: t.text }}>{role.name}</div>
            <div className="text-xs mt-0.5" style={{ color: t.textDim }}>{role.desc}</div>
          </motion.div>
        );
      })}
    </div>

    {/* Members */}
    <h3 className="font-['Space_Grotesk'] text-lg font-bold mb-4" style={{ color: t.text }}>Mitglieder</h3>
    <div className="space-y-2.5">
      {members.map((m, i) => {
        const rc = roleColor(m.role);
        return (
          <motion.div key={m.email} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
            className={`p-4 ${surface()} flex items-center gap-4`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs text-black bg-gradient-to-br from-[#CCFF00] to-[#00E5FF] shrink-0">
              {m.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm" style={{ color: t.text }}>{m.name}</span>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.status === 'online' ? '#22c55e' : 'var(--d-text-dim)' }} />
              </div>
              <div className="text-xs flex items-center gap-1" style={{ color: t.textDim }}><Mail className="w-3 h-3" />{m.email}</div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: rc.bg, color: rc.color }}>{m.role}</span>
            <button className="p-2 rounded-lg transition-colors" style={{ color: t.textMut }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--d-hover)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </motion.div>
        );
      })}
    </div>
  </>
);
