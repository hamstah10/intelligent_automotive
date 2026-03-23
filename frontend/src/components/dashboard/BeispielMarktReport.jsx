import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingDown, TrendingUp, MapPin, Car, Euro, BarChart3, ArrowRight, Download, Share2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const priceData = [
  { m: 'Jul', premium: 52400, mittel: 32100, kompakt: 21800 },
  { m: 'Aug', premium: 51800, mittel: 31600, kompakt: 21400 },
  { m: 'Sep', premium: 51200, mittel: 31200, kompakt: 21100 },
  { m: 'Okt', premium: 50500, mittel: 30800, kompakt: 20700 },
  { m: 'Nov', premium: 50100, mittel: 30400, kompakt: 20500 },
  { m: 'Dez', premium: 49800, mittel: 30100, kompakt: 20200 },
  { m: 'Jan', premium: 49200, mittel: 29800, kompakt: 19900 },
  { m: 'Feb', premium: 48700, mittel: 29500, kompakt: 19600 },
];

const brandShare = [
  { name: 'BMW', value: 24, color: BLUE },
  { name: 'VW', value: 21, color: GREEN },
  { name: 'Mercedes', value: 19, color: '#c084fc' },
  { name: 'Audi', value: 17, color: '#f87171' },
  { name: 'Andere', value: 19, color: 'rgba(255,255,255,0.15)' },
];

const regionData = [
  { region: 'Bayern', avg: 34200, listings: 1842 },
  { region: 'NRW', avg: 29800, listings: 2156 },
  { region: 'BaWü', avg: 33500, listings: 1423 },
  { region: 'Hessen', avg: 31200, listings: 987 },
  { region: 'Berlin', avg: 28900, listings: 1254 },
  { region: 'Sachsen', avg: 26400, listings: 678 },
];

const keyFindings = [
  { icon: TrendingDown, color: '#f87171', title: 'Marktpreise fallen', desc: 'Durchschnittlich -6.8% in den letzten 8 Monaten über alle Segmente.' },
  { icon: Car, color: BLUE, title: 'SUV-Segment wächst', desc: 'SUV/Crossover-Angebot +14% gegenüber Vorjahr, drückt Preise im Mittelklasse-Segment.' },
  { icon: Euro, color: GREEN, title: 'Kompakt-Deals', desc: 'Kompaktwagen unter €20.000 erstmals seit 2023 — ideales Einstiegs-Window.' },
  { icon: MapPin, color: '#c084fc', title: 'Bayern teuerste Region', desc: 'Durchschnitt €34.200 — Preisgefälle von bis zu €7.800 nach Sachsen.' },
];

const fmt = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const BeispielMarktReport = () => (
  <>
    {/* Report Header */}
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 data-testid="beispiel-report-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Markt-Report</h1>
        <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Beispiel-Report: Deutscher Gebrauchtwagenmarkt Q4 2025 / Q1 2026</p>
      </div>
      <div className="flex items-center gap-2">
        <Button data-testid="report-download-btn" variant="outline" className="h-8 gap-1.5 text-xs rounded-lg" style={{ borderColor: t.border, color: t.textSec }}>
          <Download className="w-3.5 h-3.5" /> PDF
        </Button>
        <Button data-testid="report-share-btn" className="h-8 gap-1.5 text-xs rounded-lg bg-[#00E5FF] text-black hover:bg-[#00c8e0]">
          <Share2 className="w-3.5 h-3.5" /> Teilen
        </Button>
      </div>
    </div>

    {/* Report Meta */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${surface('p-5')} mb-6`}>
      <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: t.textSec }}>
        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" style={{ color: BLUE }} />Zeitraum: Jul 2025 – Feb 2026</span>
        <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5" style={{ color: GREEN }} />12.847 analysierte Listings</span>
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: '#c084fc' }} />6 Regionen</span>
        <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" style={{ color: '#facc15' }} />3 Segmente</span>
      </div>
    </motion.div>

    {/* Key Findings */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      {keyFindings.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            data-testid={`finding-${i}`} className={surface('p-4 flex items-start gap-3')}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${f.color}12` }}>
              <Icon className="w-4.5 h-4.5" style={{ color: f.color }} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: t.text }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: t.textSec }}>{f.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* Price Trends */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={`lg:col-span-8 ${surface('p-6')}`}>
        <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>Preisentwicklung nach Segment</h3>
        <p className="text-xs mt-0.5 mb-4" style={{ color: t.textMut }}>Durchschnittliche Angebotspreise Jul '25 – Feb '26</p>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="gradPrem" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={BLUE} stopOpacity={0.15} /><stop offset="95%" stopColor={BLUE} stopOpacity={0} /></linearGradient>
                <linearGradient id="gradMid" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={GREEN} stopOpacity={0.15} /><stop offset="95%" stopColor={GREEN} stopOpacity={0} /></linearGradient>
                <linearGradient id="gradComp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c084fc" stopOpacity={0.15} /><stop offset="95%" stopColor="#c084fc" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ThemedTooltip />} />
              <Area type="monotone" dataKey="premium" stroke={BLUE} strokeWidth={2} fill="url(#gradPrem)" name="Premium" />
              <Area type="monotone" dataKey="mittel" stroke={GREEN} strokeWidth={2} fill="url(#gradMid)" name="Mittelklasse" />
              <Area type="monotone" dataKey="kompakt" stroke="#c084fc" strokeWidth={2} fill="url(#gradComp)" name="Kompakt" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3">
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-1 rounded-full" style={{ backgroundColor: BLUE }} /><span style={{ color: t.textSec }}>Premium</span></span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-1 rounded-full" style={{ backgroundColor: GREEN }} /><span style={{ color: t.textSec }}>Mittelklasse</span></span>
          <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-1 rounded-full" style={{ backgroundColor: '#c084fc' }} /><span style={{ color: t.textSec }}>Kompakt</span></span>
        </div>
      </motion.div>

      {/* Brand Share */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`lg:col-span-4 ${surface('p-6')}`}>
        <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Markenanteil</h3>
        <p className="text-xs mb-3" style={{ color: t.textMut }}>Verteilung nach Listings</p>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={brandShare} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
                {brandShare.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<ThemedTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1.5 mt-2">
          {brandShare.map(b => (
            <div key={b.name} className="flex items-center justify-between text-xs px-1">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} /><span style={{ color: t.textSec }}>{b.name}</span></span>
              <span className="font-semibold" style={{ color: t.text }}>{b.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Region Table */}
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={surface('p-6')}>
      <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Regionale Analyse</h3>
      <p className="text-xs mb-4" style={{ color: t.textMut }}>Durchschnittspreise und Angebot nach Bundesland</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid var(--d-border)` }}>
              <th className="text-left py-2.5 px-3 font-medium text-xs" style={{ color: t.textMut }}>Region</th>
              <th className="text-right py-2.5 px-3 font-medium text-xs" style={{ color: t.textMut }}>Ø Preis</th>
              <th className="text-right py-2.5 px-3 font-medium text-xs" style={{ color: t.textMut }}>Listings</th>
              <th className="text-right py-2.5 px-3 font-medium text-xs" style={{ color: t.textMut }}>vs. Durchschnitt</th>
            </tr>
          </thead>
          <tbody>
            {regionData.map((r, i) => {
              const avgAll = 30500;
              const diff = ((r.avg - avgAll) / avgAll * 100).toFixed(1);
              const isAbove = r.avg > avgAll;
              return (
                <tr key={r.region} data-testid={`region-row-${i}`} style={{ borderBottom: `1px solid var(--d-border-sub)` }}>
                  <td className="py-2.5 px-3 font-medium" style={{ color: t.text }}>
                    <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" style={{ color: t.textMut }} />{r.region}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold font-['Orbitron'] text-xs" style={{ color: t.text }}>{fmt(r.avg)}</td>
                  <td className="py-2.5 px-3 text-right" style={{ color: t.textSec }}>{r.listings.toLocaleString('de-DE')}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="flex items-center justify-end gap-1" style={{ color: isAbove ? '#f87171' : '#22c55e' }}>
                      {isAbove ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-xs font-semibold">{isAbove ? '+' : ''}{diff}%</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  </>
);
