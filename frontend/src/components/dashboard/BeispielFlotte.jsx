import { motion } from 'framer-motion';
import { Truck, MapPin, Fuel, Wrench, AlertTriangle, CheckCircle2, Clock, TrendingUp, Euro, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const fleetStats = [
  { label: 'Gesamtflotte', value: 48, icon: Truck, accent: BLUE, sub: 'Aktive Fahrzeuge' },
  { label: 'Durchschnittswert', value: '€38.200', icon: Euro, accent: GREEN, sub: 'pro Fahrzeug' },
  { label: 'Nächste Wartung', value: 6, icon: Wrench, accent: '#facc15', sub: 'Fahrzeuge fällig' },
  { label: 'Flottenauslastung', value: '91%', icon: Activity, accent: '#c084fc', sub: 'aktive Nutzung' },
];

const statusData = [
  { name: 'Verfügbar', value: 32, color: '#22c55e' },
  { name: 'Im Einsatz', value: 10, color: BLUE },
  { name: 'Wartung', value: 4, color: '#facc15' },
  { name: 'Reserviert', value: 2, color: '#c084fc' },
];

const costData = [
  { m: 'Sep', versicherung: 4200, wartung: 1800, kraftstoff: 3500 },
  { m: 'Okt', versicherung: 4200, wartung: 2100, kraftstoff: 3200 },
  { m: 'Nov', versicherung: 4200, wartung: 1500, kraftstoff: 3800 },
  { m: 'Dez', versicherung: 4200, wartung: 3200, kraftstoff: 2900 },
  { m: 'Jan', versicherung: 4200, wartung: 1900, kraftstoff: 3600 },
  { m: 'Feb', versicherung: 4200, wartung: 2400, kraftstoff: 3100 },
];

const fleetVehicles = [
  { id: 'F-001', name: 'BMW 320d Touring', plate: 'M-AI 1001', km: 42500, status: 'Verfügbar', fuel: 68, nextService: '15.03.2026', location: 'München', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=120&fit=crop' },
  { id: 'F-002', name: 'VW Transporter T6.1', plate: 'M-AI 1002', km: 78200, status: 'Im Einsatz', fuel: 42, nextService: '22.02.2026', location: 'Stuttgart', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&h=120&fit=crop' },
  { id: 'F-003', name: 'Audi A6 Avant', plate: 'M-AI 1003', km: 31800, status: 'Verfügbar', fuel: 91, nextService: '08.04.2026', location: 'München', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=120&fit=crop' },
  { id: 'F-004', name: 'Mercedes Vito', plate: 'M-AI 1004', km: 95400, status: 'Wartung', fuel: 15, nextService: 'Heute', location: 'Werkstatt', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=120&fit=crop' },
  { id: 'F-005', name: 'BMW X3 xDrive30d', plate: 'M-AI 1005', km: 55100, status: 'Im Einsatz', fuel: 53, nextService: '01.03.2026', location: 'Berlin', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=120&fit=crop' },
  { id: 'F-006', name: 'Porsche Taycan', plate: 'M-AI 1006', km: 18200, status: 'Reserviert', fuel: 78, nextService: '20.05.2026', location: 'München', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200&h=120&fit=crop' },
];

const statusColor = { 'Verfügbar': '#22c55e', 'Im Einsatz': BLUE, 'Wartung': '#facc15', 'Reserviert': '#c084fc' };
const statusIcon = { 'Verfügbar': CheckCircle2, 'Im Einsatz': Truck, 'Wartung': Wrench, 'Reserviert': Clock };

export const BeispielFlotte = () => (
  <>
    <div className="mb-6">
      <h1 data-testid="beispiel-flotte-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Flotten-Übersicht</h1>
      <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Echtzeit-Status und Kostenanalyse deiner Fahrzeugflotte</p>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {fleetStats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            data-testid={`fleet-kpi-${i}`} className={surface('p-4')}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.accent}12` }}>
              <Icon className="w-4.5 h-4.5" style={{ color: s.accent }} />
            </div>
            <div className="text-xs mb-0.5" style={{ color: t.textSec }}>{s.label}</div>
            <div className="font-['Orbitron'] text-lg font-bold" style={{ color: t.text }}>{s.value}</div>
            <div className="text-[10px] mt-0.5" style={{ color: t.textDim }}>{s.sub}</div>
          </motion.div>
        );
      })}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* Cost Breakdown */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={`lg:col-span-8 ${surface('p-6')}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>Kostenanalyse</h3>
            <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Monatliche Flottenkosten nach Kategorie</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} /><span style={{ color: t.textSec }}>Versicherung</span></span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: GREEN }} /><span style={{ color: t.textSec }}>Wartung</span></span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f87171' }} /><span style={{ color: t.textSec }}>Kraftstoff</span></span>
          </div>
        </div>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ThemedTooltip />} />
              <Bar dataKey="versicherung" stackId="a" fill={BLUE} radius={[0, 0, 0, 0]} barSize={28} name="Versicherung" />
              <Bar dataKey="wartung" stackId="a" fill={GREEN} radius={[0, 0, 0, 0]} barSize={28} name="Wartung" />
              <Bar dataKey="kraftstoff" stackId="a" fill="#f87171" radius={[4, 4, 0, 0]} barSize={28} name="Kraftstoff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Status Pie */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`lg:col-span-4 ${surface('p-6')}`}>
        <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Fahrzeug-Status</h3>
        <p className="text-xs mb-3" style={{ color: t.textMut }}>Aktuelle Verteilung</p>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={4} dataKey="value" stroke="none">
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<ThemedTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1.5 mt-2">
          {statusData.map(s => (
            <div key={s.name} className="flex items-center justify-between text-xs px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span style={{ color: t.textSec }}>{s.name}</span>
              </span>
              <span className="font-semibold" style={{ color: t.text }}>{s.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Vehicle Cards */}
    <div>
      <h3 className="font-['Orbitron'] text-sm font-bold mb-3" style={{ color: t.text }}>Fahrzeuge</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {fleetVehicles.map((v, i) => {
          const sc = statusColor[v.status];
          const SIcon = statusIcon[v.status];
          return (
            <motion.div key={v.id} data-testid={`fleet-vehicle-${v.id}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
              className={surface('overflow-hidden')}>
              <img src={v.image} alt={v.name} className="w-full h-28 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: t.text }}>{v.name}</div>
                    <div className="text-[10px] font-mono" style={{ color: t.textDim }}>{v.id} · {v.plate}</div>
                  </div>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium"
                    style={{ backgroundColor: `${sc}15`, color: sc, border: `1px solid ${sc}25` }}>
                    <SIcon className="w-3 h-3" />{v.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div>
                    <div className="text-[10px]" style={{ color: t.textDim }}>KM-Stand</div>
                    <div className="text-xs font-semibold" style={{ color: t.text }}>{v.km.toLocaleString('de-DE')}</div>
                  </div>
                  <div>
                    <div className="text-[10px]" style={{ color: t.textDim }}>Tank</div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--d-border-sub)' }}>
                        <div className="h-full rounded-full" style={{ width: `${v.fuel}%`, backgroundColor: v.fuel > 50 ? '#22c55e' : v.fuel > 25 ? '#facc15' : '#f87171' }} />
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: t.textSec }}>{v.fuel}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px]" style={{ color: t.textDim }}>Service</div>
                    <div className="text-xs font-semibold" style={{ color: v.nextService === 'Heute' ? '#f87171' : t.text }}>{v.nextService}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[10px]" style={{ color: t.textDim }}>
                  <MapPin className="w-3 h-3" />{v.location}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </>
);
