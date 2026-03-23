import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, Car, Gauge, Fuel, Calendar, Euro, Check, X, Zap } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const vehicles = [
  { id: 'v1', name: 'BMW M340i xDrive', year: 2023, price: 58700, ps: 374, nm: 500, fuel: '7.1 L/100km', accel: 4.4, top: 250, drive: 'xDrive AWD', brand: 'BMW', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=240&fit=crop', color: BLUE },
  { id: 'v2', name: 'Audi RS3 Sportback', year: 2023, price: 62300, ps: 400, nm: 500, fuel: '8.3 L/100km', accel: 3.8, top: 280, drive: 'quattro AWD', brand: 'Audi', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&h=240&fit=crop', color: '#c084fc' },
  { id: 'v3', name: 'Mercedes AMG C43', year: 2023, price: 65800, ps: 408, nm: 500, fuel: '8.7 L/100km', accel: 4.6, top: 250, drive: '4MATIC+ AWD', brand: 'Mercedes', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=240&fit=crop', color: '#f0f0f0' },
  { id: 'v4', name: 'VW Golf 8 R', year: 2023, price: 48900, ps: 333, nm: 420, fuel: '7.6 L/100km', accel: 4.7, top: 270, drive: '4Motion AWD', brand: 'VW', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=240&fit=crop', color: GREEN },
];

const radarMetrics = ['Leistung', 'Drehmoment', 'Effizienz', 'Beschleunigung', 'Top Speed', 'Preis/Leistung'];

const normalize = (v, metric) => {
  const ranges = {
    'Leistung': [300, 420], 'Drehmoment': [400, 520], 'Effizienz': [6, 9],
    'Beschleunigung': [3.5, 5], 'Top Speed': [240, 290], 'Preis/Leistung': [45000, 70000],
  };
  const [min, max] = ranges[metric];
  if (metric === 'Effizienz' || metric === 'Beschleunigung' || metric === 'Preis/Leistung') {
    return Math.round(((max - v) / (max - min)) * 100);
  }
  return Math.round(((v - min) / (max - min)) * 100);
};

const getRadarData = (vA, vB) => radarMetrics.map(m => {
  const valA = m === 'Leistung' ? vA.ps : m === 'Drehmoment' ? vA.nm : m === 'Effizienz' ? parseFloat(vA.fuel) : m === 'Beschleunigung' ? vA.accel : m === 'Top Speed' ? vA.top : vA.price;
  const valB = m === 'Leistung' ? vB.ps : m === 'Drehmoment' ? vB.nm : m === 'Effizienz' ? parseFloat(vB.fuel) : m === 'Beschleunigung' ? vB.accel : m === 'Top Speed' ? vB.top : vB.price;
  return { metric: m, [vA.brand]: normalize(valA, m), [vB.brand]: normalize(valB, m) };
});

const fmt = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const BeispielVergleich = () => {
  const [selA, setSelA] = useState(0);
  const [selB, setSelB] = useState(1);
  const vA = vehicles[selA];
  const vB = vehicles[selB];
  const radarData = getRadarData(vA, vB);

  const specs = [
    { label: 'Leistung', a: `${vA.ps} PS`, b: `${vB.ps} PS`, better: vA.ps > vB.ps ? 'a' : vB.ps > vA.ps ? 'b' : null },
    { label: 'Drehmoment', a: `${vA.nm} Nm`, b: `${vB.nm} Nm`, better: vA.nm > vB.nm ? 'a' : vB.nm > vA.nm ? 'b' : null },
    { label: '0-100 km/h', a: `${vA.accel}s`, b: `${vB.accel}s`, better: vA.accel < vB.accel ? 'a' : vB.accel < vA.accel ? 'b' : null },
    { label: 'Top Speed', a: `${vA.top} km/h`, b: `${vB.top} km/h`, better: vA.top > vB.top ? 'a' : vB.top > vA.top ? 'b' : null },
    { label: 'Verbrauch', a: vA.fuel, b: vB.fuel, better: parseFloat(vA.fuel) < parseFloat(vB.fuel) ? 'a' : parseFloat(vB.fuel) < parseFloat(vA.fuel) ? 'b' : null },
    { label: 'Preis', a: fmt(vA.price), b: fmt(vB.price), better: vA.price < vB.price ? 'a' : vB.price < vA.price ? 'b' : null },
    { label: 'Antrieb', a: vA.drive, b: vB.drive, better: null },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 data-testid="beispiel-vergleich-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Fahrzeug-Vergleich</h1>
        <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Performance-Daten zweier Fahrzeuge im Direktvergleich</p>
      </div>

      {/* Vehicle Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {[{ sel: selA, setSel: setSelA, label: 'Fahrzeug A', accent: vA.color }, { sel: selB, setSel: setSelB, label: 'Fahrzeug B', accent: vB.color }].map(({ sel, setSel, label, accent }, idx) => (
          <div key={idx} className={surface('p-4')}>
            <div className="text-xs font-semibold mb-3 px-1" style={{ color: accent }}>{label}</div>
            <div className="grid grid-cols-2 gap-2">
              {vehicles.map((v, i) => (
                <button key={v.id} data-testid={`select-vehicle-${idx}-${i}`} onClick={() => setSel(i)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all duration-200"
                  style={sel === i
                    ? { backgroundColor: `${accent}15`, border: `1px solid ${accent}40` }
                    : { backgroundColor: 'transparent', border: '1px solid var(--d-border-sub)' }
                  }>
                  <img src={v.image} alt={v.name} className="w-12 h-8 rounded-lg object-cover" />
                  <div>
                    <div className="text-xs font-medium truncate" style={{ color: sel === i ? accent : t.text }}>{v.name}</div>
                    <div className="text-[10px]" style={{ color: t.textDim }}>{v.year} · {v.ps} PS</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Radar Chart + Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Radar */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`lg:col-span-5 ${surface('p-6')}`}>
          <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Performance Radar</h3>
          <p className="text-xs mb-4" style={{ color: t.textMut }}>Normalisiert auf 0-100 Skala</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--d-chart-grid)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} />
                <Radar name={vA.brand} dataKey={vA.brand} stroke={vA.color} fill={vA.color} fillOpacity={0.15} strokeWidth={2} />
                <Radar name={vB.brand} dataKey={vB.brand} stroke={vB.color} fill={vB.color} fillOpacity={0.15} strokeWidth={2} />
                <Tooltip content={<ThemedTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <span className="flex items-center gap-2 text-xs"><span className="w-3 h-1 rounded-full" style={{ backgroundColor: vA.color }} /><span style={{ color: t.textSec }}>{vA.name}</span></span>
            <span className="flex items-center gap-2 text-xs"><span className="w-3 h-1 rounded-full" style={{ backgroundColor: vB.color }} /><span style={{ color: t.textSec }}>{vB.name}</span></span>
          </div>
        </motion.div>

        {/* Specs Table */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`lg:col-span-7 ${surface('p-6')}`}>
          <h3 className="font-['Orbitron'] text-sm font-bold mb-4" style={{ color: t.text }}>Spezifikationen</h3>
          <div className="space-y-1">
            {specs.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.04 }}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 py-2.5 rounded-xl"
                style={{ backgroundColor: i % 2 === 0 ? 'var(--d-surface-alt)' : 'transparent' }}>
                <div className="text-right">
                  <span className="text-sm font-semibold" style={{ color: s.better === 'a' ? GREEN : t.text }}>{s.a}</span>
                  {s.better === 'a' && <Zap className="inline w-3 h-3 ml-1" style={{ color: GREEN }} />}
                </div>
                <span className="text-xs font-medium text-center min-w-[100px]" style={{ color: t.textMut }}>{s.label}</span>
                <div>
                  <span className="text-sm font-semibold" style={{ color: s.better === 'b' ? GREEN : t.text }}>{s.b}</span>
                  {s.better === 'b' && <Zap className="inline w-3 h-3 ml-1" style={{ color: GREEN }} />}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
