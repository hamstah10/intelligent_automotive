import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Car, TrendingUp, Bell, Cpu,
  TrendingDown, AlertTriangle, Eye, Clock, ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { DashboardSidebar } from './DashboardSidebar';

// ─── Mock Data ──────────────────────────────────────
const kpiCards = [
  { title: 'Neue Listings', value: 0, icon: Car, badge: '+live', badgeColor: 'bg-[#CCFF00]/20 text-[#CCFF00]', sub: 'aus Symfony API' },
  { title: 'Top-Deals', value: 0, icon: TrendingUp, badge: '+aktiv', badgeColor: 'bg-[#CCFF00]/20 text-[#CCFF00]', sub: 'vereinfachter Start' },
  { title: 'Aktive Alerts', value: 61, icon: Bell, badge: '+9', badgeColor: 'bg-green-500/20 text-green-400', sub: 'Mock-Wert' },
  { title: 'Tuning Updates', value: 17, icon: Cpu, badge: '+4', badgeColor: 'bg-green-500/20 text-green-400', sub: 'Mock-Wert' },
];

const marketChartData = [
  { day: 'Mo', price: 18200 },
  { day: 'Di', price: 17800 },
  { day: 'Mi', price: 18500 },
  { day: 'Do', price: 19100 },
  { day: 'Fr', price: 18800 },
  { day: 'Sa', price: 19500 },
  { day: 'So', price: 20100 },
];

const alertItems = [
  { title: 'Preisdrop > 5%', sub: 'Neue Ereignisse seit letztem Sync', count: 14, icon: TrendingDown },
  { title: 'Neue ECU Releases', sub: 'Neue Ereignisse seit letztem Sync', count: 9, icon: Cpu },
  { title: 'Known Issues', sub: 'Neue Ereignisse seit letztem Sync', count: 3, icon: AlertTriangle },
  { title: 'Watchlist Treffer', sub: 'Neue Ereignisse seit letztem Sync', count: 21, icon: Eye },
];

const tuningFeed = [
  {
    title: 'Continental SID212 jetzt per Bench unterstützt',
    tags: [
      { label: 'FLEX', color: 'bg-white/10 text-white/70' },
      { label: 'Bench', color: 'bg-white/10 text-white/70' },
      { label: 'Risiko: Mittel', color: 'bg-yellow-500/20 text-yellow-300' },
    ],
    time: 'vor 2h',
  },
  {
    title: 'Bosch MG1CS031 neuer Unlock-Hinweis',
    tags: [
      { label: 'Autotuner', color: 'bg-white/10 text-white/70' },
      { label: 'OBD / Patch', color: 'bg-white/10 text-white/70' },
      { label: 'Risiko: Hoch', color: 'bg-red-500/20 text-red-300' },
    ],
    time: 'vor 4h',
  },
  {
    title: 'ZF8HP Support Matrix erweitert',
    tags: [
      { label: 'KESS3', color: 'bg-white/10 text-white/70' },
      { label: 'Bench', color: 'bg-white/10 text-white/70' },
      { label: 'Risiko: Niedrig', color: 'bg-green-500/20 text-green-300' },
    ],
    time: 'vor 7h',
  },
];

const updateFreqData = [
  { day: 'Mo', updates: 3 },
  { day: 'Di', updates: 5 },
  { day: 'Mi', updates: 7 },
  { day: 'Do', updates: 6 },
  { day: 'Fr', updates: 9 },
  { day: 'Sa', updates: 11 },
  { day: 'So', updates: 8 },
];

// ─── Custom Tooltip ─────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2035] border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-white font-semibold">{payload[0].value.toLocaleString('de-DE')}</p>
      </div>
    );
  }
  return null;
};

// ─── Dashboard Page ────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('tuning');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'market', label: 'Market' },
    { id: 'tuning', label: 'Tuning' },
    { id: 'management', label: 'Management' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <DashboardSidebar />

      {/* Main Content */}
      <main className="ml-[200px] p-8">
        {/* ─── Header ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div>
            <h1 data-testid="dashboard-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">
              Automotive Dashboard
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Echtzeit-Übersicht für Fahrzeugmarkt, Preisänderungen und Tuning-Updates.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                data-testid="dashboard-search"
                placeholder="Suche nach Fahrzeug, Marke, Modell ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[280px] bg-[#111827] border-white/10 text-white placeholder:text-white/30 rounded-lg h-10 text-sm"
              />
            </div>
            <Button
              data-testid="dashboard-filter-btn"
              className="bg-[#CCFF00] text-[#0c1017] hover:bg-[#b8e600] font-semibold rounded-lg h-10 px-4 text-sm gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </Button>
            <button className="h-10 px-4 bg-[#111827] border border-white/10 rounded-lg text-white/50 text-sm hover:border-white/20 transition-colors">
              Marke (z.B. VW)
            </button>
            <button className="h-10 px-4 bg-[#111827] border border-white/10 rounded-lg text-white/50 text-sm hover:border-white/20 transition-colors">
              Min Preis
            </button>
            <button className="h-10 px-4 bg-[#111827] border border-white/10 rounded-lg text-white/50 text-sm hover:border-white/20 transition-colors">
              Max Preis
            </button>
          </div>
        </div>

        {/* ─── KPI Row ────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-testid={`kpi-card-${i}`}
                className="bg-[#111827] border border-white/5 rounded-xl p-5 flex items-start justify-between hover:border-white/10 transition-colors"
              >
                <div>
                  <div className="text-white/50 text-sm mb-2">{card.title}</div>
                  <div className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight">
                    {card.value}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    <span className="text-white/30 text-xs">{card.sub}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white/40" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Middle Row: Chart + Alerts ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          {/* Marktbewegung Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            data-testid="market-chart-card"
            className="lg:col-span-3 bg-[#111827] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Marktbewegung</h3>
                <p className="text-white/40 text-xs mt-0.5">Durchschnittspreise der letzten 7 Tage</p>
              </div>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-white/60 text-xs font-medium">
                Live
              </span>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                    domain={[0, 25000]}
                    tickFormatter={(v) => v.toLocaleString('de-DE')}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#CCFF00"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: '#CCFF00', stroke: '#0a0e17', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Alert-Zentrale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            data-testid="alert-center-card"
            className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-xl p-6"
          >
            <div className="mb-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Alert-Zentrale</h3>
              <p className="text-white/40 text-xs mt-0.5">Wichtigste Signale aus beiden Modulen</p>
            </div>
            <div className="space-y-3">
              {alertItems.map((alert, i) => {
                const Icon = alert.icon;
                return (
                  <motion.div
                    key={alert.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    data-testid={`alert-item-${i}`}
                    className="flex items-center gap-3 p-3 bg-[#0a0e17] rounded-lg border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{alert.title}</div>
                      <div className="text-white/30 text-[11px] truncate">{alert.sub}</div>
                    </div>
                    <span className="min-w-[28px] h-[28px] flex items-center justify-center rounded-lg bg-[#CCFF00] text-[#0c1017] text-xs font-bold shrink-0">
                      {alert.count}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ─── Tab Bar ────────────────────────── */}
        <div className="flex items-center gap-1 mb-6 bg-[#111827] border border-white/5 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#CCFF00] text-[#0c1017]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Bottom Row: Feed + Frequency ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Tuning Change Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            data-testid="tuning-feed-card"
            className="lg:col-span-3 bg-[#111827] border border-white/5 rounded-xl p-6"
          >
            <div className="mb-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Tuning Change Feed</h3>
              <p className="text-white/40 text-xs mt-0.5">Mock-Daten bis dein Tuning-Modul live ist</p>
            </div>
            <div className="space-y-3">
              {tuningFeed.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  data-testid={`feed-item-${i}`}
                  className="p-4 bg-[#0a0e17] rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-white font-medium text-sm">{item.title}</span>
                    <span className="flex items-center gap-1 text-white/30 text-xs shrink-0 ml-4">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, j) => (
                      <span
                        key={j}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Update-Frequenz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            data-testid="update-freq-card"
            className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-xl p-6"
          >
            <div className="mb-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Update-Frequenz</h3>
              <p className="text-white/40 text-xs mt-0.5">Letzte 7 Tage</p>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={updateFreqData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                    domain={[0, 12]}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="updates"
                    fill="#CCFF00"
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
