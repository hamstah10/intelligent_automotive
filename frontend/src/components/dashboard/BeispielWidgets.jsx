import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Car, Euro, Zap, Users, Eye, ShoppingCart,
  Activity, MessageSquare, Clock, ArrowUpRight, ArrowDownRight, Flame,
  Shield, Target, Gauge, Wifi, Server, Database, Globe, BarChart3
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

/* ── Sparkline helper ── */
const Spark = ({ data, color, w = 64, h = 24 }) => {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / r) * (h - 4) - 2}`).join(' ');
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
};

/* ── Data ── */
const kpis = [
  { title: 'Umsatz', value: '€248.5k', change: '+12.4%', up: true, icon: Euro, color: GREEN, spark: [18, 22, 19, 28, 25, 32, 30, 38, 35, 42] },
  { title: 'Fahrzeuge', value: '1.284', change: '+8.2%', up: true, icon: Car, color: BLUE, spark: [95, 102, 98, 115, 108, 122, 118, 130, 125, 138] },
  { title: 'Conversions', value: '6.8%', change: '+0.9%', up: true, icon: Target, color: '#c084fc', spark: [4.2, 4.8, 5.1, 5.5, 5.2, 5.8, 6.1, 6.3, 6.5, 6.8] },
  { title: 'Besucher', value: '42.1k', change: '-2.1%', up: false, icon: Eye, color: '#facc15', spark: [48, 45, 44, 46, 43, 41, 42, 40, 41, 42] },
  { title: 'Deals', value: '89', change: '+24', up: true, icon: ShoppingCart, color: '#22c55e', spark: [52, 58, 62, 55, 68, 72, 65, 78, 82, 89] },
  { title: 'Avg. Deal Score', value: '78.4', change: '+3.2', up: true, icon: Zap, color: '#f87171', spark: [68, 70, 72, 71, 74, 73, 76, 75, 77, 78] },
];

const revenueData = [
  { m: 'Sep', market: 32400, tuning: 18200 }, { m: 'Okt', market: 35100, tuning: 19800 },
  { m: 'Nov', market: 33800, tuning: 21500 }, { m: 'Dez', market: 38200, tuning: 22100 },
  { m: 'Jan', market: 41500, tuning: 24800 }, { m: 'Feb', market: 44200, tuning: 26300 },
];

const conversionFunnel = [
  { step: 'Besucher', value: 42100, color: 'rgba(255,255,255,0.12)' },
  { step: 'Listings', value: 18400, color: BLUE },
  { step: 'Details', value: 8200, color: '#c084fc' },
  { step: 'Kontakt', value: 2860, color: GREEN },
  { step: 'Deal', value: 890, color: '#22c55e' },
];

const channelData = [
  { name: 'Direkt', value: 38, color: BLUE },
  { name: 'Google', value: 28, color: GREEN },
  { name: 'Social', value: 18, color: '#c084fc' },
  { name: 'Referral', value: 10, color: '#facc15' },
  { name: 'Email', value: 6, color: '#f87171' },
];

const activityFeed = [
  { user: 'M. Schmidt', action: 'hat einen Deal abgeschlossen', item: 'BMW 320d', time: 'vor 3 Min.', icon: ShoppingCart, color: '#22c55e' },
  { user: 'K. Weber', action: 'hat Alert erstellt für', item: 'Golf GTI < €28k', time: 'vor 12 Min.', icon: Activity, color: BLUE },
  { user: 'S. Müller', action: 'hat Marktwert geprüft:', item: 'Audi A4 Avant', time: 'vor 18 Min.', icon: Eye, color: '#c084fc' },
  { user: 'T. Fischer', action: 'hat Tuning-Anfrage gestellt:', item: 'RS3 Stage 1', time: 'vor 25 Min.', icon: Zap, color: GREEN },
  { user: 'L. Wagner', action: 'neuer ROI-Report für', item: 'Porsche Macan', time: 'vor 34 Min.', icon: BarChart3, color: '#facc15' },
  { user: 'A. Becker', action: 'hat Deal analysiert:', item: 'Mercedes C220d', time: 'vor 42 Min.', icon: Target, color: '#f87171' },
];

const systemHealth = [
  { name: 'API', value: 99.8, fill: '#22c55e' },
  { name: 'Crawler', value: 94.2, fill: BLUE },
  { name: 'DB', value: 97.5, fill: GREEN },
];

const weeklyHeatmap = [
  [3, 5, 8, 12, 15, 11, 7],
  [4, 7, 11, 18, 22, 16, 9],
  [2, 6, 14, 25, 28, 19, 8],
  [5, 9, 16, 21, 24, 17, 10],
  [3, 8, 13, 19, 20, 14, 6],
];
const heatDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const heatHours = ['06:00', '10:00', '14:00', '18:00', '22:00'];

const heatColor = (v) => {
  if (v < 5) return 'rgba(0,229,255,0.08)';
  if (v < 10) return 'rgba(0,229,255,0.18)';
  if (v < 15) return 'rgba(0,229,255,0.32)';
  if (v < 20) return 'rgba(0,229,255,0.50)';
  if (v < 25) return 'rgba(0,229,255,0.70)';
  return 'rgba(0,229,255,0.90)';
};

const statusCards = [
  { label: 'Server', icon: Server, status: 'online', latency: '12ms', color: '#22c55e' },
  { label: 'Database', icon: Database, status: 'online', latency: '3ms', color: '#22c55e' },
  { label: 'Crawler', icon: Globe, status: 'running', latency: '245ms', color: BLUE },
  { label: 'WebSocket', icon: Wifi, status: 'online', latency: '8ms', color: '#22c55e' },
];

export const BeispielWidgets = () => (
  <>
    <div className="mb-6">
      <h1 data-testid="beispiel-widgets-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>
        Dashboard Widgets
      </h1>
      <p className="text-sm mt-1.5" style={{ color: t.textSec }}>
        Widget-Bibliothek — KPIs, Charts, Feeds und System-Monitoring
      </p>
    </div>

    {/* ── Row 1: Mini KPIs ── */}
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
      {kpis.map((k, i) => {
        const Icon = k.icon;
        return (
          <motion.div key={k.title} data-testid={`widget-kpi-${i}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className={surface('p-4')}>
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.color}12` }}>
                <Icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <Spark data={k.spark} color={k.color} />
            </div>
            <div className="text-[11px] mb-0.5" style={{ color: t.textMut }}>{k.title}</div>
            <div className="font-['Orbitron'] text-base font-bold tracking-tight" style={{ color: t.text }}>{k.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {k.up ? <ArrowUpRight className="w-3 h-3 text-[#22c55e]" /> : <ArrowDownRight className="w-3 h-3 text-[#f87171]" />}
              <span className="text-[10px] font-semibold" style={{ color: k.up ? '#22c55e' : '#f87171' }}>{k.change}</span>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* ── Row 2: Charts ── */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* Revenue Area Chart */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        data-testid="widget-revenue-chart" className={`lg:col-span-5 ${surface('p-5')}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Umsatz</h3>
            <p className="text-[10px] mt-0.5" style={{ color: t.textDim }}>Market vs. Tuning · 6 Monate</p>
          </div>
          <div className="flex gap-3">
            {[{ l: 'Market', c: BLUE }, { l: 'Tuning', c: GREEN }].map(x => (
              <span key={x.l} className="flex items-center gap-1 text-[10px]"><span className="w-2 h-1 rounded-full" style={{ backgroundColor: x.c }} /><span style={{ color: t.textSec }}>{x.l}</span></span>
            ))}
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="gRevB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={BLUE} stopOpacity={0.2} /><stop offset="95%" stopColor={BLUE} stopOpacity={0} /></linearGradient>
                <linearGradient id="gRevG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={GREEN} stopOpacity={0.2} /><stop offset="95%" stopColor={GREEN} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ThemedTooltip />} />
              <Area type="monotone" dataKey="market" stroke={BLUE} strokeWidth={2} fill="url(#gRevB)" name="Market" />
              <Area type="monotone" dataKey="tuning" stroke={GREEN} strokeWidth={2} fill="url(#gRevG)" name="Tuning" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Conversion Funnel */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        data-testid="widget-funnel" className={`lg:col-span-4 ${surface('p-5')}`}>
        <h3 className="font-['Orbitron'] text-xs font-bold mb-1" style={{ color: t.text }}>Conversion Funnel</h3>
        <p className="text-[10px] mb-4" style={{ color: t.textDim }}>Besucher bis Deal</p>
        <div className="space-y-2">
          {conversionFunnel.map((step, i) => {
            const pct = (step.value / conversionFunnel[0].value) * 100;
            const rate = i > 0 ? ((step.value / conversionFunnel[i - 1].value) * 100).toFixed(1) : '100';
            return (
              <div key={step.step}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: t.textSec }}>{step.step}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold font-['Orbitron']" style={{ color: t.text }}>{step.value.toLocaleString('de-DE')}</span>
                    {i > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${step.color}15`, color: step.color }}>{rate}%</span>}
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--d-border-sub)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                    className="h-full rounded-full" style={{ backgroundColor: step.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Channel Donut */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        data-testid="widget-channels" className={`lg:col-span-3 ${surface('p-5')}`}>
        <h3 className="font-['Orbitron'] text-xs font-bold mb-1" style={{ color: t.text }}>Traffic Quellen</h3>
        <p className="text-[10px] mb-2" style={{ color: t.textDim }}>Verteilung nach Kanal</p>
        <div className="h-[130px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={36} outerRadius={55} paddingAngle={3} dataKey="value" stroke="none">
                {channelData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<ThemedTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
          {channelData.map(c => (
            <div key={c.name} className="flex items-center gap-1.5 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <span style={{ color: t.textSec }}>{c.name}</span>
              <span className="ml-auto font-semibold" style={{ color: t.text }}>{c.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* ── Row 3: Activity + Heatmap + System ── */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* Live Activity Feed */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        data-testid="widget-activity-feed" className={`lg:col-span-4 ${surface('p-5')}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Live Feed</h3>
          <span className="flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /> Live
          </span>
        </div>
        <div className="space-y-1">
          {activityFeed.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.05 }}
                data-testid={`feed-item-${i}`}
                className="flex items-start gap-2.5 p-2 rounded-lg transition-colors" style={{ backgroundColor: i === 0 ? 'var(--d-surface-alt)' : 'transparent' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${a.color}12` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-snug" style={{ color: t.textSec }}>
                    <span className="font-semibold" style={{ color: t.text }}>{a.user}</span> {a.action} <span className="font-medium" style={{ color: a.color }}>{a.item}</span>
                  </p>
                  <span className="text-[9px] flex items-center gap-1 mt-0.5" style={{ color: t.textDim }}><Clock className="w-2.5 h-2.5" />{a.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Activity Heatmap */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        data-testid="widget-heatmap" className={`lg:col-span-5 ${surface('p-5')}`}>
        <h3 className="font-['Orbitron'] text-xs font-bold mb-1" style={{ color: t.text }}>Aktivitäts-Heatmap</h3>
        <p className="text-[10px] mb-4" style={{ color: t.textDim }}>Deals pro Stunde & Wochentag</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-12" />
                {heatDays.map(d => (
                  <th key={d} className="text-center text-[10px] font-medium pb-2" style={{ color: t.textMut }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyHeatmap.map((row, ri) => (
                <tr key={ri}>
                  <td className="text-[10px] pr-2 text-right font-mono" style={{ color: t.textDim }}>{heatHours[ri]}</td>
                  {row.map((val, ci) => (
                    <td key={ci} className="p-0.5">
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + (ri * 7 + ci) * 0.012 }}
                        className="w-full aspect-square rounded-md flex items-center justify-center text-[9px] font-semibold cursor-default"
                        style={{ backgroundColor: heatColor(val), color: val > 15 ? '#000' : t.textDim }}
                        title={`${heatDays[ci]} ${heatHours[ri]}: ${val} Deals`}
                      >
                        {val}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-2 mt-3 justify-center">
          <span className="text-[9px]" style={{ color: t.textDim }}>Wenig</span>
          {[0.08, 0.18, 0.32, 0.50, 0.70, 0.90].map((op, i) => (
            <span key={i} className="w-4 h-4 rounded" style={{ backgroundColor: `rgba(0,229,255,${op})` }} />
          ))}
          <span className="text-[9px]" style={{ color: t.textDim }}>Viel</span>
        </div>
      </motion.div>

      {/* System Health + Status */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        data-testid="widget-system" className={`lg:col-span-3 ${surface('p-5')}`}>
        <h3 className="font-['Orbitron'] text-xs font-bold mb-1" style={{ color: t.text }}>System</h3>
        <p className="text-[10px] mb-3" style={{ color: t.textDim }}>Health & Uptime</p>
        <div className="h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={systemHealth} startAngle={180} endAngle={0}>
              <RadialBar background={{ fill: 'var(--d-border-sub)' }} dataKey="value" cornerRadius={8} />
              <Tooltip content={<ThemedTooltip />} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          {systemHealth.map(s => (
            <span key={s.name} className="flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.fill }} />
              <span style={{ color: t.textSec }}>{s.name}</span>
              <span className="font-semibold" style={{ color: t.text }}>{s.value}%</span>
            </span>
          ))}
        </div>
        <div className="space-y-1.5">
          {statusCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} data-testid={`status-card-${i}`}
                className={`flex items-center gap-2 p-2 rounded-lg ${surfaceAlt()}`}>
                <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                <span className="text-[11px] font-medium flex-1" style={{ color: t.text }}>{s.label}</span>
                <span className="text-[9px] font-mono" style={{ color: t.textDim }}>{s.latency}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>

    {/* ── Row 4: Compact Stats Grid ── */}
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className={surface('p-5')}>
      <h3 className="font-['Orbitron'] text-xs font-bold mb-4" style={{ color: t.text }}>Performance-Metriken</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Avg. Response', value: '142ms', target: 200, current: 142, color: '#22c55e', icon: Gauge },
          { label: 'Uptime', value: '99.97%', target: 100, current: 99.97, color: BLUE, icon: Shield },
          { label: 'Active Users', value: '2.847', target: 5000, current: 2847, color: GREEN, icon: Users },
          { label: 'Error Rate', value: '0.02%', target: 1, current: 0.02, color: '#22c55e', icon: Flame },
          { label: 'API Calls/Min', value: '1.248', target: 2000, current: 1248, color: '#c084fc', icon: Activity },
          { label: 'Cache Hit', value: '94.2%', target: 100, current: 94.2, color: '#facc15', icon: Zap },
          { label: 'DB Queries/s', value: '342', target: 500, current: 342, color: BLUE, icon: Database },
          { label: 'Bandwidth', value: '12.4 GB', target: 50, current: 12.4, color: GREEN, icon: Globe },
        ].map((m, i) => {
          const Icon = m.icon;
          const pct = Math.min((m.current / m.target) * 100, 100);
          return (
            <motion.div key={m.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.04 }}
              data-testid={`metric-card-${i}`} className={`p-3 rounded-xl ${surfaceAlt()}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                <span className="text-[10px] font-medium" style={{ color: t.textMut }}>{m.label}</span>
              </div>
              <div className="font-['Orbitron'] text-sm font-bold mb-2" style={{ color: t.text }}>{m.value}</div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--d-border-sub)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.65 + i * 0.04 }}
                  className="h-full rounded-full" style={{ backgroundColor: m.color }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </>
);
