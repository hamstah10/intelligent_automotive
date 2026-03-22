import { motion } from 'framer-motion';
import { Users, Shield, Mail, Clock, MoreVertical, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';

const teamMembers = [
  { id: 1, name: 'Max Mustermann', email: 'max@autointel.de', role: 'Admin', status: 'online', avatar: 'MM', lastActive: 'Gerade aktiv', color: 'bg-[#CCFF00]' },
  { id: 2, name: 'Lisa Schmidt', email: 'lisa@autointel.de', role: 'Analyst', status: 'online', avatar: 'LS', lastActive: 'Gerade aktiv', color: 'bg-[#00E5FF]' },
  { id: 3, name: 'Tim Weber', email: 'tim@autointel.de', role: 'Tuning-Spezialist', status: 'offline', avatar: 'TW', lastActive: 'vor 2h', color: 'bg-purple-500' },
  { id: 4, name: 'Sarah Koch', email: 'sarah@autointel.de', role: 'Analyst', status: 'online', avatar: 'SK', lastActive: 'Gerade aktiv', color: 'bg-orange-500' },
  { id: 5, name: 'Jan Becker', email: 'jan@autointel.de', role: 'Viewer', status: 'offline', avatar: 'JB', lastActive: 'vor 1d', color: 'bg-pink-500' },
  { id: 6, name: 'Anna Hoffmann', email: 'anna@autointel.de', role: 'Tuning-Spezialist', status: 'offline', avatar: 'AH', lastActive: 'vor 5h', color: 'bg-teal-500' },
];

const roles = [
  { name: 'Admin', desc: 'Vollzugriff auf alle Funktionen', count: 1, color: 'text-[#CCFF00]' },
  { name: 'Analyst', desc: 'Market + Reports lesen und bearbeiten', count: 2, color: 'text-[#00E5FF]' },
  { name: 'Tuning-Spezialist', desc: 'ECU-Daten pflegen und bearbeiten', count: 2, color: 'text-purple-400' },
  { name: 'Viewer', desc: 'Nur Lesezugriff', count: 1, color: 'text-white/40' },
];

const statusColor = { online: 'bg-green-500', offline: 'bg-white/20' };

export const DashboardTeams = () => {
  const online = teamMembers.filter(m => m.status === 'online').length;

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="teams-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Teams</h1>
          <p className="text-white/40 text-sm mt-1.5">{teamMembers.length} Mitglieder · {online} online</p>
        </div>
        <Button className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-10 px-5 text-sm gap-2">
          <UserPlus className="w-4 h-4" />Mitglied einladen
        </Button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roles.map((role, i) => (
          <motion.div key={role.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#111111] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <Shield className={`w-5 h-5 ${role.color}`} />
              <span className="font-['Space_Grotesk'] text-2xl font-bold text-white">{role.count}</span>
            </div>
            <div className="text-white font-medium text-sm">{role.name}</div>
            <div className="text-white/30 text-xs mt-0.5">{role.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Members List */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-5">Alle Mitglieder</h3>
        <div className="space-y-2.5">
          {teamMembers.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}
              className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center text-black font-bold text-sm`}>{member.avatar}</div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0A0A0A] ${statusColor[member.status]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm">{member.name}</div>
                <div className="text-white/30 text-xs flex items-center gap-2">
                  <Mail className="w-3 h-3" />{member.email}
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white/5 rounded-lg text-white/50 text-xs font-medium border border-white/10">{member.role}</span>
              <div className="text-white/25 text-xs flex items-center gap-1 shrink-0 w-[100px] justify-end"><Clock className="w-3 h-3" />{member.lastActive}</div>
              <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"><MoreVertical className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
