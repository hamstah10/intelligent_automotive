import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Car, TrendingUp, TrendingDown, Bell, Cpu,
  AlertTriangle, Eye, Clock, BarChart3, PieChart as PieIcon, Activity
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const kpiCards = [
  { title: 'Neue Listings', value: 0, icon: Car, badge: '+live', sub: 'aus Symfony API', accent: BLUE, type: 'market', trend: [12, 15, 18, 14, 22, 19, 0] },
  { title: 'Top-Deals', value: 0, icon: TrendingUp, badge: '+aktiv', sub: 'vereinfachter Start', accent: BLUE, type: 'market', trend: [5, 8, 12, 9, 15, 11, 0] },
  { title: 'Aktive Alerts', value: 61, icon: Bell, badge: '+9', sub: 'Mock-Wert', accent: GREEN, type: 'tuning', trend: [42, 38, 45, 52, 48, 55, 61] },
  { title: 'Tuning Updates', value: 17, icon: Cpu, badge: '+4', sub: 'Mock-Wert', accent: GREEN, type: 'tuning', trend: [8, 10, 12, 9, 14, 13, 17] },
];

const marketChartData = [
  { day: 'Mo', price: 18200, volume: 120 }, { day: 'Di', price: 17800, volume: 98 },
  { day: 'Mi', price: 18500, volume: 145 }, { day: 'Do', price: 19100, volume: 132 },
  { day: 'Fr', price: 18800, volume: 156 }, { day: 'Sa', price: 19500, volume: 89 },
  { day: 'So', price: 20100, volume: 72 },
];

const alertItems = [
  { title: 'Preisdrop > 5%', sub: 'Neue Ereignisse seit letztem Sync', count: 14, icon: TrendingDown, color: BLUE },
  { title: 'Neue ECU Releases', sub: 'Neue Ereignisse seit letztem Sync', count: 9, icon: Cpu, color: GREEN },
  { title: 'Known Issues', sub: 'Neue Ereignisse seit letztem Sync', count: 3, icon: AlertTriangle, color: '#f87171' },
  { title: 'Watchlist Treffer', sub: 'Neue Ereignisse seit letztem Sync', count: 21, icon: Eye, color: '#c084fc' },
];

const tuningFeed = [
  { title: 'Continental SID212 jetzt per Bench unterstützt', tags: [{ label: 'FLEX' }, { label: 'Bench' }, { label: 'Risiko: Mittel', risk: 'yellow' }], time: 'vor 2h' },
  { title: 'Bosch MG1CS031 neuer Unlock-Hinweis', tags: [{ label: 'Autotuner' }, { label: 'OBD / Patch' }, { label: 'Risiko: Hoch', risk: 'red' }], time: 'vor 4h' },
  { title: 'ZF8HP Support Matrix erweitert', tags: [{ label: 'KESS3' }, { label: 'Bench' }, { label: 'Risiko: Niedrig', risk: 'green' }], time: 'vor 7h' },
];

const updateFreqData = [
  { day: 'Mo', market: 8, tuning: 3 }, { day: 'Di', market: 12, tuning: 5 },
  { day: 'Mi', market: 15, tuning: 7 }, { day: 'Do', market: 11, tuning: 6 },
  { day: 'Fr', market: 18, tuning: 9 }, { day: 'Sa', market: 9, tuning: 11 },
  { day: 'So', market: 6, tuning: 8 },
];

const segmentData = [
  { name: 'Kompakt', value: 35, color: BLUE }, { name: 'Mittelklasse', value: 28, color: '#0ea5e9' },
  { name: 'Premium', value: 22, color: GREEN }, { name: 'SUV', value: 15, color: '#facc15' },
];

const dealScoreDistribution = [
  { range: '0-20', count: 5 }, { range: '21-40', count: 12 }, { range: '41-60', count: 28 },
  { range: '61-80', count: 45 }, { range: '81-100', count: 31 },
];

const healthData = [
  { name: 'Market', value: 94, fill: BLUE }, { name: 'Tuning', value: 87, fill: GREEN }, { name: 'Alerts', value: 72, fill: '#c084fc' },
];

const MiniSparkline = ({ data, color, width = 60, height = 24 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
};

const riskTagColor = (risk) => {
  if (risk === 'yellow') return { bg: 'rgba(250,204,21,0.15)', color: '#eab308', border: 'rgba(250,204,21,0.2)' };
  if (risk === 'red') return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.2)' };
  return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: 'rgba(34,197,94,0.2)' };
};

export const DashboardOverview = () => {
  const [activeTab, setActiveTab] = useState('tuning');
  const [searchQuery, setSearchQuery] = useState('');
  const tabs = [
    { id: 'market', label: 'Market', color: BLUE },
    { id: 'tuning', label: 'Tuning', color: GREEN },
    { id: 'management', label: 'Management', color: 'var(--d-text)' },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="dashboard-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Automotive Dashboard</h1>
          <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Echtzeit-Übersicht für Fahrzeugmarkt, Preisänderungen und Tuning-Updates.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMut }} />
            <Input data-testid="dashboard-search" placeholder="Suche nach Fahrzeug, Marke, Modell ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[280px] rounded-lg h-10 text-sm transition-colors duration-300"
              style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }} />
          </div>
          <Button data-testid="dashboard-filter-btn" className="bg-[#00E5FF] text-black hover:bg-[#00c8e0] font-semibold rounded-lg h-10 px-5 text-sm gap-2">
            <SlidersHorizontal className="w-4 h-4" />Filter
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          const isMarket = card.type === 'market';
          const accentBg = isMarket ? 'rgba(0,229,255,0.1)' : 'rgba(204,255,0,0.1)';
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} data-testid={`kpi-card-${i}`}
              className={`${surface()} p-5 group`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentBg }}>
                  <Icon className="w-5 h-5" style={{ color: card.accent }} />
                </div>
                <MiniSparkline data={card.trend} color={card.accent} />
              </div>
              <div className="text-sm mb-1" style={{ color: t.textSec }}>{card.title}</div>
              <div className="flex items-end gap-3">
                <span className="font-['Orbitron'] text-xl font-bold tracking-tighter" style={{ color: t.text }}>{card.value}</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold mb-1" style={{ backgroundColor: accentBg, color: card.accent }}>{card.badge}</span>
              </div>
              <div className="text-xs mt-1" style={{ color: t.textDim }}>{card.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Marktbewegung */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} data-testid="market-chart-card" className={`lg:col-span-5 ${surface()} p-6`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-['Orbitron'] text-base font-bold" style={{ color: t.text }}>Marktbewegung</h3>
              <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Preis + Volumen · 7 Tage</p>
            </div>
            <span className="px-2.5 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-lg text-[#00E5FF] text-xs font-medium">Market</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketChartData}>
                <defs>
                  <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BLUE} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                <YAxis yAxisId="price" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} domain={[15000, 22000]} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <YAxis yAxisId="vol" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-text-dim)', fontSize: 11 }} />
                <Tooltip content={<ThemedTooltip />} />
                <Bar yAxisId="vol" dataKey="volume" fill="rgba(0,229,255,0.1)" radius={[4, 4, 0, 0]} barSize={20} name="Volumen" />
                <Area yAxisId="price" type="monotone" dataKey="price" stroke={BLUE} strokeWidth={2} fill="url(#marketGrad)" dot={false} activeDot={{ r: 4, fill: BLUE }} name="Ø Preis" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Alert-Zentrale */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} data-testid="alert-center-card" className={`lg:col-span-4 ${surface()} p-6`}>
          <div className="mb-4">
            <h3 className="font-['Orbitron'] text-base font-bold" style={{ color: t.text }}>Alert-Zentrale</h3>
            <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Signale aus beiden Modulen</p>
          </div>
          <div className="space-y-2">
            {alertItems.map((alert, i) => {
              const Icon = alert.icon;
              return (
                <motion.div key={alert.title} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.06 }} data-testid={`alert-item-${i}`}
                  className={`flex items-center gap-3 p-2.5 ${surfaceAlt()} cursor-pointer`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${alert.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: alert.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: t.text }}>{alert.title}</div>
                    <div className="text-[10px] truncate" style={{ color: t.textDim }}>{alert.sub}</div>
                  </div>
                  <span className="min-w-[28px] h-[28px] flex items-center justify-center rounded-full text-black text-xs font-bold shrink-0" style={{ backgroundColor: alert.color }}>
                    {alert.count}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Segment Donut */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={`lg:col-span-3 ${surface()} p-6`}>
          <h3 className="font-['Orbitron'] text-base font-bold mb-0.5" style={{ color: t.text }}>Segmente</h3>
          <p className="text-xs mb-3" style={{ color: t.textMut }}>Listings nach Fahrzeugklasse</p>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segmentData} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value" stroke="none">
                  {segmentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<ThemedTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {segmentData.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span style={{ color: t.textSec }}>{s.name}</span>
                <span className="font-medium" style={{ color: t.text }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-1 mb-6 rounded-xl p-1 w-fit transition-colors duration-300" style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
        {tabs.map((tab) => (
          <button key={tab.id} data-testid={`tab-${tab.id}`} onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={activeTab === tab.id ? { backgroundColor: tab.color, color: '#000' } : { color: t.textSec }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Update Frequenz */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} data-testid="update-freq-card" className={`lg:col-span-5 ${surface()} p-6`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-['Orbitron'] text-base font-bold" style={{ color: t.text }}>Aktivität</h3>
              <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Market vs. Tuning · 7 Tage</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} /><span style={{ color: t.textSec }}>Market</span></span>
              <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: GREEN }} /><span style={{ color: t.textSec }}>Tuning</span></span>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={updateFreqData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                <Tooltip content={<ThemedTooltip />} />
                <Bar dataKey="market" fill={BLUE} radius={[4, 4, 0, 0]} barSize={14} name="Market" stackId="a" />
                <Bar dataKey="tuning" fill={GREEN} radius={[4, 4, 0, 0]} barSize={14} name="Tuning" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Deal Score Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className={`lg:col-span-4 ${surface()} p-6`}>
          <h3 className="font-['Orbitron'] text-base font-bold mb-0.5" style={{ color: t.text }}>Deal Score Verteilung</h3>
          <p className="text-xs mb-5" style={{ color: t.textMut }}>Anzahl Deals nach Score-Range</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealScoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                <Tooltip content={<ThemedTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32} name="Deals">
                  {dealScoreDistribution.map((_, i) => <Cell key={i} fill={i < 2 ? '#f87171' : i < 3 ? '#facc15' : BLUE} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className={`lg:col-span-3 ${surface()} p-6`}>
          <h3 className="font-['Orbitron'] text-base font-bold mb-0.5" style={{ color: t.text }}>System Health</h3>
          <p className="text-xs mb-3" style={{ color: t.textMut }}>Modul-Performance</p>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={healthData} startAngle={180} endAngle={0}>
                <RadialBar background={{ fill: 'var(--d-border-sub)' }} dataKey="value" cornerRadius={8} />
                <Tooltip content={<ThemedTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1">
            {healthData.map(h => (
              <div key={h.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: h.fill }} />
                <span style={{ color: t.textSec }}>{h.name}</span>
                <span className="font-semibold" style={{ color: t.text }}>{h.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tuning Feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} data-testid="tuning-feed-card" className={`${surface()} p-6`}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-['Orbitron'] text-base font-bold" style={{ color: t.text }}>Tuning Change Feed</h3>
            <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Mock-Daten bis dein Tuning-Modul live ist</p>
          </div>
          <span className="px-2.5 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-lg text-[#CCFF00] text-xs font-medium">Tuning</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tuningFeed.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.06 }} data-testid={`feed-item-${i}`}
              className={`p-4 ${surfaceAlt()}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="font-medium text-sm leading-snug" style={{ color: t.text }}>{item.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {item.tags.map((tag, j) => {
                  const rc = tag.risk ? riskTagColor(tag.risk) : null;
                  return (
                    <span key={j} className="px-2 py-0.5 rounded-lg text-[10px] font-medium"
                      style={rc
                        ? { backgroundColor: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }
                        : { backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)', border: '1px solid var(--d-border)' }
                      }>
                      {tag.label}
                    </span>
                  );
                })}
              </div>
              <span className="flex items-center gap-1 text-[11px]" style={{ color: t.textDim }}><Clock className="w-3 h-3" />{item.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
