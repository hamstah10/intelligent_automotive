import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Cpu, Monitor, Car, Zap, Search, ChevronDown, Lightbulb,
  Eye, Music, Shield, Settings2, Thermometer, Lock, Wifi, Battery,
  Clock, TrendingUp, Star, ArrowRight, Gauge, Database, Activity
} from 'lucide-react';
import { Input } from '../ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const PURPLE = '#c084fc';
const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

/* ── KPI Stats ── */
const kpis = [
  { label: 'Verfügbare Codings', value: '2.847', icon: Code, accent: PURPLE, sub: '+124 diese Woche' },
  { label: 'Module gesamt', value: '186', icon: Cpu, accent: BLUE, sub: '12 Plattformen' },
  { label: 'Unterstützte Fahrzeuge', value: '1.420', icon: Car, accent: GREEN, sub: 'VAG, BMW, MB, ...' },
  { label: 'Neue Codings', value: '38', icon: TrendingUp, accent: '#facc15', sub: 'letzte 7 Tage' },
];

/* ── Quick Finder Options ── */
const vehicles = ['BMW F30 / F31', 'BMW G20 / G21', 'BMW G80 / G82', 'Audi A4 (B9)', 'Audi A6 (C8)', 'Audi Q5 (FY)', 'VW Golf 8 (CD)', 'VW Passat (B8)', 'Mercedes W206', 'Mercedes W213'];
const platforms = ['MQB (VW/Audi)', 'MQB Evo', 'MLB Evo (Audi)', 'CLAR (BMW)', 'MRA2 (Mercedes)', 'PPC (Porsche)'];

/* ── Steuergeräte / Module ── */
const modules = [
  { name: 'Zentralelektrik', code: 'BCM / 09', count: 342, icon: Zap, color: PURPLE },
  { name: 'Motor (ECU)', code: 'ECM / 01', count: 518, icon: Gauge, color: BLUE },
  { name: 'ABS / ESP', code: 'ABS / 03', count: 198, icon: Shield, color: '#f87171' },
  { name: 'Infotainment', code: 'MIB / 5F', count: 421, icon: Music, color: GREEN },
  { name: 'Instrumenten-Cluster', code: 'IC / 17', count: 156, icon: Monitor, color: '#facc15' },
  { name: 'Getriebesteuerung', code: 'TCU / 02', count: 287, icon: Settings2, color: BLUE },
  { name: 'Klimasteuerung', code: 'HVAC / 08', count: 134, icon: Thermometer, color: '#22c55e' },
  { name: 'Zugangssteuerung', code: 'KES / 09', count: 95, icon: Lock, color: PURPLE },
  { name: 'Konnektivität', code: 'OCU / 14', count: 78, icon: Wifi, color: BLUE },
  { name: 'Batterie-Mgmt', code: 'BMS / 8C', count: 62, icon: Battery, color: GREEN },
];

/* ── Coding Kategorien ── */
const categories = [
  {
    name: 'Komfortfunktionen', icon: Settings2, color: PURPLE, count: 486,
    items: ['Fensterheber Komfortbedienung', 'Spiegel anklappen bei Verriegelung', 'Akustische Verriegelung', 'Sitzheizung-Speicher', 'Automatische Heckklappe', 'Begrüßungslicht'],
  },
  {
    name: 'Licht & Beleuchtung', icon: Lightbulb, color: '#facc15', count: 312,
    items: ['Tagfahrlicht Anpassung', 'Ambiente-Beleuchtung erweitert', 'Coming Home Dauer', 'Blinker Lauflicht', 'Fernlichtassistent-Empfindlichkeit', 'Nebelschlusslicht als Bremslicht'],
  },
  {
    name: 'Infotainment', icon: Music, color: BLUE, count: 278,
    items: ['Video in Motion (ViM)', 'Navigation Geschwindigkeitslimit', 'Apple CarPlay Fullscreen', 'Startbild anpassen', 'Equalizer-Erweiterung', 'Display Helligkeit'],
  },
  {
    name: 'Assistenzsysteme', icon: Eye, color: GREEN, count: 195,
    items: ['Lane Assist Anpassung', 'ACC Abstandsregelung', 'Park Assist Konfiguration', 'Rückfahrkamera Linien', 'Totwinkelassistent', 'Speed Limiter Warnung'],
  },
];

/* ── Coverage Chart ── */
const coverageData = [
  { brand: 'VW', codings: 842 }, { brand: 'BMW', codings: 624 },
  { brand: 'Audi', codings: 581 }, { brand: 'MB', codings: 412 },
  { brand: 'Porsche', codings: 198 }, { brand: 'Skoda', codings: 154 },
];

/* ── Activity Feed ── */
const activityFeed = [
  { type: 'new', text: 'BMW G20: Digitaler Tacho Freischaltung', time: 'vor 2 Std.', color: '#22c55e' },
  { type: 'popular', text: 'VW Golf 8: Video in Motion (ViM)', time: '1.284 Aktivierungen', color: PURPLE },
  { type: 'new', text: 'Audi A6 C8: Ambiente 30 Farben', time: 'vor 5 Std.', color: '#22c55e' },
  { type: 'popular', text: 'BMW F30: Spiegel anklappen', time: '982 Aktivierungen', color: PURPLE },
  { type: 'updated', text: 'Mercedes W206: ACC Coding aktualisiert', time: 'vor 8 Std.', color: '#facc15' },
  { type: 'new', text: 'VW Passat B8: Blinker Lauflicht', time: 'vor 12 Std.', color: '#22c55e' },
  { type: 'popular', text: 'Audi Q5: Akustische Verriegelung', time: '756 Aktivierungen', color: PURPLE },
  { type: 'updated', text: 'BMW G80: Launch Control Byte-Map', time: 'vor 1 Tag', color: '#facc15' },
];

const typeLabel = { new: 'Neu', popular: 'Beliebt', updated: 'Update' };
const typeIcon = { new: TrendingUp, popular: Star, updated: Clock };

/* ── Select Component ── */
const Select = ({ value, onChange, options, placeholder, testId }) => (
  <div className="relative flex-1">
    <select data-testid={testId} value={value} onChange={e => onChange(e.target.value)}
      className="w-full h-10 px-3 pr-8 rounded-lg text-sm font-medium appearance-none cursor-pointer transition-colors focus:outline-none"
      style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border)', color: value ? t.text : t.textMut }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: t.textMut }} />
  </div>
);

export const DashboardCoding = () => {
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  return (
    <>
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
        <div>
          <h1 data-testid="coding-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Coding Intelligence</h1>
          <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Codierungen, Steuergeräte und Funktionen auf einen Blick</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMut }} />
          <Input data-testid="coding-search" placeholder="Coding, Modul oder Fahrzeug suchen..." value={searchText} onChange={e => setSearchText(e.target.value)}
            className="pl-10 w-[300px] rounded-lg h-10 text-sm" style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }} />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div key={k.label} data-testid={`coding-kpi-${i}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={surface('p-4')}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${k.accent}12` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: k.accent }} />
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg" style={{ backgroundColor: `${k.accent}10`, color: k.accent }}>{k.sub}</span>
              </div>
              <div className="text-xs" style={{ color: t.textSec }}>{k.label}</div>
              <div className="font-['Orbitron'] text-lg font-bold mt-0.5" style={{ color: t.text }}>{k.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Finder */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        data-testid="quick-finder" className={`${surface('p-5')} mb-6`}>
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4" style={{ color: PURPLE }} />
          <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Quick Finder</h3>
          <span className="text-[10px] ml-auto" style={{ color: t.textDim }}>Fahrzeug und Plattform auswählen um verfügbare Codings zu finden</span>
        </div>
        <div className="flex gap-3 items-end">
          <Select value={vehicleFilter} onChange={setVehicleFilter} options={vehicles} placeholder="Fahrzeug auswählen..." testId="coding-vehicle-select" />
          <Select value={platformFilter} onChange={setPlatformFilter} options={platforms} placeholder="Plattform auswählen..." testId="coding-platform-select" />
          <button data-testid="coding-find-btn" className="h-10 px-5 rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0"
            style={{ backgroundColor: PURPLE, color: '#000' }}>
            <Search className="w-3.5 h-3.5" /> Suchen
          </button>
        </div>
      </motion.div>

      {/* Steuergeräte / Module Grid */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
        <h3 className="font-['Orbitron'] text-xs font-bold mb-3" style={{ color: t.text }}>Steuergeräte / Module</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div key={m.name} data-testid={`module-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + i * 0.03 }}
                className={`${surface('p-4')} cursor-pointer group`}>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: `${m.color}12` }}>
                    <Icon className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--d-surface-alt)', color: t.textDim }}>{m.code}</span>
                </div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: t.text }}>{m.name}</div>
                <div className="text-[10px]" style={{ color: t.textDim }}>{m.count} Codings</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Coding Kategorien + Chart + Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Categories */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="font-['Orbitron'] text-xs font-bold mb-1" style={{ color: t.text }}>Coding Kategorien</h3>
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.name} data-testid={`category-${ci}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + ci * 0.06 }}
                className={surface('p-4')}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}12` }}>
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: t.text }}>{cat.name}</div>
                    <div className="text-[10px]" style={{ color: t.textDim }}>{cat.count} Codierungen verfügbar</div>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: t.textMut }} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                  {cat.items.map(item => (
                    <div key={item} className={`text-[11px] px-2.5 py-1.5 rounded-lg ${surfaceAlt()}`} style={{ color: t.textSec }}>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar: Chart + Feed */}
        <div className="lg:col-span-5 space-y-4">
          {/* Coverage Chart */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className={surface('p-5')}>
            <h3 className="font-['Orbitron'] text-xs font-bold mb-1" style={{ color: t.text }}>Coding-Abdeckung</h3>
            <p className="text-[10px] mb-4" style={{ color: t.textDim }}>Verfügbare Codierungen nach Hersteller</p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coverageData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} />
                  <YAxis type="category" dataKey="brand" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} width={50} />
                  <Tooltip content={<ThemedTooltip />} />
                  <Bar dataKey="codings" fill={PURPLE} barSize={14} radius={[0, 6, 6, 0]} name="Codings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            data-testid="coding-activity" className={surface('p-5')}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Aktivität</h3>
              <span className="flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /> Live
              </span>
            </div>
            <div className="space-y-1">
              {activityFeed.map((a, i) => {
                const Icon = typeIcon[a.type];
                return (
                  <motion.div key={i} data-testid={`coding-feed-${i}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.04 }}
                    className="flex items-start gap-2.5 p-2 rounded-lg" style={{ backgroundColor: i === 0 ? 'var(--d-surface-alt)' : 'transparent' }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${a.color}12` }}>
                      <Icon className="w-3 h-3" style={{ color: a.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${a.color}12`, color: a.color }}>{typeLabel[a.type]}</span>
                      </div>
                      <p className="text-[11px] leading-snug" style={{ color: t.textSec }}>{a.text}</p>
                      <span className="text-[9px] flex items-center gap-1 mt-0.5" style={{ color: t.textDim }}>
                        <Clock className="w-2.5 h-2.5" />{a.time}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
