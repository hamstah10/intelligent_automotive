import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Calendar, Euro, Eye, Bell, Filter } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const trackedVehicles = [
  {
    name: 'BMW 320d Touring (F31)', current: 22800, prev: 24500, trend: -6.9,
    history: [
      { m: 'Aug', p: 26200 }, { m: 'Sep', p: 25800 }, { m: 'Okt', p: 25100 },
      { m: 'Nov', p: 24500 }, { m: 'Dez', p: 23900 }, { m: 'Jan', p: 23200 }, { m: 'Feb', p: 22800 },
    ],
    color: BLUE, alert: true,
  },
  {
    name: 'VW Golf 8 GTI', current: 31200, prev: 29800, trend: 4.7,
    history: [
      { m: 'Aug', p: 28500 }, { m: 'Sep', p: 29100 }, { m: 'Okt', p: 29400 },
      { m: 'Nov', p: 29800 }, { m: 'Dez', p: 30200 }, { m: 'Jan', p: 30800 }, { m: 'Feb', p: 31200 },
    ],
    color: GREEN, alert: false,
  },
  {
    name: 'Audi A4 Avant 40 TDI', current: 28400, prev: 29200, trend: -2.7,
    history: [
      { m: 'Aug', p: 30100 }, { m: 'Sep', p: 29900 }, { m: 'Okt', p: 29600 },
      { m: 'Nov', p: 29200 }, { m: 'Dez', p: 29000 }, { m: 'Jan', p: 28700 }, { m: 'Feb', p: 28400 },
    ],
    color: '#c084fc', alert: true,
  },
  {
    name: 'Porsche Macan S', current: 54200, prev: 52800, trend: 2.7,
    history: [
      { m: 'Aug', p: 50200 }, { m: 'Sep', p: 51000 }, { m: 'Okt', p: 51500 },
      { m: 'Nov', p: 52800 }, { m: 'Dez', p: 53100 }, { m: 'Jan', p: 53800 }, { m: 'Feb', p: 54200 },
    ],
    color: '#f87171', alert: false,
  },
];

const combinedData = trackedVehicles[0].history.map((_, i) => {
  const point = { m: trackedVehicles[0].history[i].m };
  trackedVehicles.forEach(v => { point[v.name] = v.history[i].p; });
  return point;
});

const marketIndex = [
  { m: 'Aug', idx: 100 }, { m: 'Sep', idx: 98.5 }, { m: 'Okt', idx: 97.1 },
  { m: 'Nov', idx: 95.8 }, { m: 'Dez', idx: 96.2 }, { m: 'Jan', idx: 95.1 }, { m: 'Feb', idx: 94.3 },
];

const fmt = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const BeispielPreisTracker = () => {
  const [selected, setSelected] = useState(0);
  const v = trackedVehicles[selected];

  return (
    <>
      <div className="mb-6">
        <h1 data-testid="beispiel-preis-tracker-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Preis-Tracker</h1>
        <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Preisentwicklung deiner beobachteten Fahrzeuge in Echtzeit</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {trackedVehicles.map((v, i) => {
          const isDown = v.trend < 0;
          return (
            <motion.button key={v.name} data-testid={`tracker-card-${i}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(i)}
              className={`${surface('p-4 text-left cursor-pointer')} ${selected === i ? 'ring-1' : ''}`}
              style={selected === i ? { borderColor: v.color, boxShadow: `0 0 12px ${v.color}15` } : {}}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                {v.alert && <Bell className="w-3.5 h-3.5 text-[#facc15]" />}
              </div>
              <div className="text-xs truncate mb-1" style={{ color: t.textSec }}>{v.name}</div>
              <div className="font-['Orbitron'] text-lg font-bold" style={{ color: t.text }}>{fmt(v.current)}</div>
              <div className="flex items-center gap-1 mt-1">
                {isDown ? <TrendingDown className="w-3 h-3 text-[#f87171]" /> : <TrendingUp className="w-3 h-3 text-[#22c55e]" />}
                <span className="text-xs font-semibold" style={{ color: isDown ? '#f87171' : '#22c55e' }}>{v.trend > 0 ? '+' : ''}{v.trend}%</span>
                <span className="text-[10px]" style={{ color: t.textDim }}>7 Monate</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Individual Vehicle Chart */}
        <motion.div key={v.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`lg:col-span-8 ${surface('p-6')}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>{v.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Preisverlauf Aug 2025 – Feb 2026</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: `${v.color}15`, color: v.color, border: `1px solid ${v.color}30` }}>
              {fmt(v.current)}
            </span>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={v.history}>
                <defs>
                  <linearGradient id={`grad-${selected}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={v.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={v.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<ThemedTooltip />} />
                <Area type="monotone" dataKey="p" stroke={v.color} strokeWidth={2.5} fill={`url(#grad-${selected})`} dot={{ r: 4, fill: v.color, strokeWidth: 0 }} activeDot={{ r: 6, fill: v.color }} name="Preis" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Market Index */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`lg:col-span-4 ${surface('p-6')}`}>
          <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>Markt-Index</h3>
          <p className="text-xs mt-0.5 mb-4" style={{ color: t.textMut }}>Gesamtmarkt-Entwicklung (Basis: 100)</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketIndex}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} />
                <YAxis domain={[92, 102]} axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} />
                <Tooltip content={<ThemedTooltip />} />
                <Line type="monotone" dataKey="idx" stroke="#f87171" strokeWidth={2} dot={{ r: 3, fill: '#f87171' }} name="Index" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-[#f87171]" />
              <span className="text-xs font-semibold text-[#f87171]">-5.7% seit August</span>
            </div>
            <p className="text-[10px]" style={{ color: t.textDim }}>Gesamtmarkt zeigt fallenden Trend — guter Zeitpunkt zum Kaufen.</p>
          </div>
        </motion.div>
      </div>

      {/* Combined Overlay */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={surface('p-6')}>
        <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Alle Fahrzeuge im Vergleich</h3>
        <p className="text-xs mb-4" style={{ color: t.textMut }}>Preisentwicklung aller beobachteten Fahrzeuge</p>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ThemedTooltip />} />
              {trackedVehicles.map(v => (
                <Line key={v.name} type="monotone" dataKey={v.name} stroke={v.color} strokeWidth={2} dot={false} name={v.name} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          {trackedVehicles.map(v => (
            <span key={v.name} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-1 rounded-full" style={{ backgroundColor: v.color }} />
              <span style={{ color: t.textSec }}>{v.name}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
};
