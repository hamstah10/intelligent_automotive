import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const monthlyData = [
  { month: 'Okt', listings: 890, deals: 34, alerts: 120 },
  { month: 'Nov', listings: 1020, deals: 41, alerts: 98 },
  { month: 'Dez', listings: 780, deals: 28, alerts: 145 },
  { month: 'Jan', listings: 1150, deals: 52, alerts: 110 },
  { month: 'Feb', listings: 1340, deals: 48, alerts: 132 },
  { month: 'Mär', listings: 1247, deals: 23, alerts: 61 },
];

const reports = [
  { id: 1, title: 'Monatsbericht März 2026', desc: 'Komplettübersicht: Market + Tuning', date: '22.03.2026', type: 'monthly', status: 'ready' },
  { id: 2, title: 'Deal-Analyse Q1 2026', desc: 'Top-Deals, Preisentwicklung, ROI', date: '15.03.2026', type: 'quarterly', status: 'ready' },
  { id: 3, title: 'ECU-Abdeckungsreport', desc: 'Tool-Matrix, neue Releases, Coverage', date: '10.03.2026', type: 'tuning', status: 'ready' },
  { id: 4, title: 'Konkurrenz-Monitoring', desc: 'Händlervergleich, Preispositionierung', date: '05.03.2026', type: 'competitive', status: 'ready' },
  { id: 5, title: 'Monatsbericht April 2026', desc: 'Wird automatisch generiert', date: '01.04.2026', type: 'monthly', status: 'scheduled' },
];

const kpis = [
  { label: 'Reports erstellt', value: '24', sub: 'In den letzten 90 Tagen', icon: FileText },
  { label: 'Ø Deal Score', value: '82', sub: '+4 vs. Vormonat', icon: TrendingUp },
  { label: 'Datenqualität', value: '96%', sub: 'Crawler Accuracy', icon: BarChart3 },
  { label: 'API-Aufrufe', value: '12.4K', sub: 'Diesen Monat', icon: PieChart },
];

const typeColors = {
  monthly: 'bg-[#00E5FF]/15 text-[#00E5FF]',
  quarterly: 'bg-[#CCFF00]/15 text-[#CCFF00]',
  tuning: 'bg-purple-500/15 text-purple-400',
  competitive: 'bg-orange-500/15 text-orange-400',
};

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-xs shadow-xl">
        <p className="text-white/40 mb-1">{label}</p>
        {payload.map((p, i) => <p key={i} className="text-white font-semibold">{p.name}: {p.value}</p>)}
      </div>
    );
  }
  return null;
};

export const DashboardReports = () => {
  return (
    <>
      <div className="mb-8">
        <h1 data-testid="reports-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Reports</h1>
        <p className="text-white/40 text-sm mt-1.5">Automatische Berichte und Analytics.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex items-start justify-between">
              <div>
                <div className="text-white/40 text-sm mb-1">{kpi.label}</div>
                <div className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">{kpi.value}</div>
                <div className="text-white/25 text-xs mt-1">{kpi.sub}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Icon className="w-5 h-5 text-white/30" /></div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-1">Aktivität der letzten 6 Monate</h3>
        <p className="text-white/30 text-xs mb-6">Listings, Deals und Alerts im Überblick</p>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 12 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="listings" fill="#CCFF00" radius={[4, 4, 0, 0]} barSize={18} name="Listings" />
              <Bar dataKey="deals" fill="#00E5FF" radius={[4, 4, 0, 0]} barSize={18} name="Deals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Reports List */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Verfügbare Reports</h3>
      </div>
      <div className="space-y-2.5">
        {reports.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.04 }}
            className="p-4 bg-[#111111] border border-white/10 rounded-2xl flex items-center gap-4 hover:border-[#CCFF00]/20 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-white/40" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white font-medium text-sm">{r.title}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${typeColors[r.type]}`}>{r.type === 'monthly' ? 'Monatlich' : r.type === 'quarterly' ? 'Quartal' : r.type === 'tuning' ? 'Tuning' : 'Konkurrenz'}</span>
              </div>
              <p className="text-white/30 text-xs">{r.desc}</p>
            </div>
            <div className="text-white/25 text-xs flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" />{r.date}</div>
            {r.status === 'ready' ? (
              <Button variant="ghost" size="sm" className="text-[#CCFF00] hover:bg-[#CCFF00]/10 shrink-0"><Download className="w-4 h-4" /></Button>
            ) : (
              <span className="text-white/25 text-xs flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" />Geplant</span>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};
