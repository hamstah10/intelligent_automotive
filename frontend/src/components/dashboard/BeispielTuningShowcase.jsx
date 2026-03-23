import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gauge, Flame, Wind, Cpu, ChevronRight, ArrowRight, Settings2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const showcaseVehicles = [
  {
    name: 'BMW M340i xDrive', engine: 'B58B30O1', ecu: 'Bosch MG1CS024',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=240&fit=crop',
    stages: [
      { name: 'Serie', ps: 374, nm: 500, accel: 4.4, color: 'rgba(255,255,255,0.2)' },
      { name: 'Stage 1', ps: 440, nm: 600, accel: 3.9, color: GREEN },
      { name: 'Stage 2', ps: 510, nm: 680, accel: 3.5, color: '#f87171' },
    ],
  },
  {
    name: 'Audi RS3 Sportback', engine: 'DAZA (2.5 TFSI)', ecu: 'Bosch MED17.1.62',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&h=240&fit=crop',
    stages: [
      { name: 'Serie', ps: 400, nm: 500, accel: 3.8, color: 'rgba(255,255,255,0.2)' },
      { name: 'Stage 1', ps: 460, nm: 570, accel: 3.4, color: GREEN },
      { name: 'Stage 2', ps: 530, nm: 650, accel: 3.1, color: '#f87171' },
    ],
  },
  {
    name: 'VW Golf 8 R', engine: 'EA888 Gen4', ecu: 'Bosch MG1CS111',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=240&fit=crop',
    stages: [
      { name: 'Serie', ps: 333, nm: 420, accel: 4.7, color: 'rgba(255,255,255,0.2)' },
      { name: 'Stage 1', ps: 395, nm: 500, accel: 4.1, color: GREEN },
      { name: 'Stage 2', ps: 460, nm: 570, accel: 3.7, color: '#f87171' },
    ],
  },
  {
    name: 'Mercedes AMG A35', engine: 'M260', ecu: 'Bosch MED17.7.2',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=240&fit=crop',
    stages: [
      { name: 'Serie', ps: 306, nm: 400, accel: 4.7, color: 'rgba(255,255,255,0.2)' },
      { name: 'Stage 1', ps: 370, nm: 480, accel: 4.1, color: GREEN },
      { name: 'Stage 2', ps: 420, nm: 530, accel: 3.7, color: '#f87171' },
    ],
  },
];

const GaugeBar = ({ label, value, max, color, unit, delay = 0 }) => {
  const pct = (value / max) * 100;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs" style={{ color: t.textSec }}>{label}</span>
        <span className="text-xs font-semibold font-['Orbitron']" style={{ color }}>{value} {unit}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--d-border-sub)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export const BeispielTuningShowcase = () => {
  const [selected, setSelected] = useState(0);
  const v = showcaseVehicles[selected];

  const chartData = v.stages.map(s => ({ name: s.name, PS: s.ps, Nm: s.nm }));

  return (
    <>
      <div className="mb-6">
        <h1 data-testid="beispiel-tuning-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Tuning Showcase</h1>
        <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Performance-Steigerungen im Überblick — Serie vs. Stage 1 vs. Stage 2</p>
      </div>

      {/* Vehicle Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {showcaseVehicles.map((sv, i) => (
          <motion.button key={sv.name} data-testid={`showcase-select-${i}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(i)}
            className={`${surface('overflow-hidden text-left')} ${selected === i ? 'ring-1 ring-[#CCFF00]' : ''}`}>
            <img src={sv.image} alt={sv.name} className="w-full h-24 object-cover" />
            <div className="p-3">
              <div className="text-xs font-semibold truncate" style={{ color: selected === i ? GREEN : t.text }}>{sv.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: t.textDim }}>{sv.engine}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail View */}
      <AnimatePresence mode="wait">
        <motion.div key={v.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
            {/* Stage Cards */}
            <div className="lg:col-span-5 space-y-3">
              {v.stages.map((stage, i) => (
                <motion.div key={stage.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  data-testid={`stage-card-${i}`} className={surface('p-5')}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="font-['Orbitron'] text-xs font-bold" style={{ color: stage.color === 'rgba(255,255,255,0.2)' ? t.textSec : stage.color }}>{stage.name}</span>
                    {i > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-lg font-medium ml-auto"
                        style={{ backgroundColor: `${GREEN}15`, color: GREEN, border: `1px solid ${GREEN}25` }}>
                        +{stage.ps - v.stages[0].ps} PS
                      </span>
                    )}
                  </div>
                  <GaugeBar label="Leistung" value={stage.ps} max={600} color={stage.color === 'rgba(255,255,255,0.2)' ? 'rgba(255,255,255,0.3)' : stage.color} unit="PS" delay={i * 0.15} />
                  <GaugeBar label="Drehmoment" value={stage.nm} max={750} color={stage.color === 'rgba(255,255,255,0.2)' ? 'rgba(255,255,255,0.3)' : stage.color} unit="Nm" delay={i * 0.15 + 0.05} />
                  <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: '1px solid var(--d-border-sub)' }}>
                    <span className="text-xs" style={{ color: t.textMut }}>0-100 km/h</span>
                    <span className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>{stage.accel}s</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart + Info */}
            <div className="lg:col-span-7 space-y-4">
              {/* Bar Chart */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={surface('p-6')}>
                <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Leistungsvergleich</h3>
                <p className="text-xs mb-4" style={{ color: t.textMut }}>{v.name} — alle Stufen</p>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" horizontal={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 11 }} width={60} />
                      <Tooltip content={<ThemedTooltip />} />
                      <Bar dataKey="PS" barSize={16} radius={[0, 6, 6, 0]} name="PS">
                        {chartData.map((_, i) => <Cell key={i} fill={v.stages[i].color === 'rgba(255,255,255,0.2)' ? 'rgba(255,255,255,0.25)' : v.stages[i].color} />)}
                      </Bar>
                      <Bar dataKey="Nm" barSize={16} radius={[0, 6, 6, 0]} name="Nm">
                        {chartData.map((_, i) => <Cell key={i} fill={v.stages[i].color === 'rgba(255,255,255,0.2)' ? 'rgba(255,255,255,0.12)' : `${v.stages[i].color}60`} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Technical Info */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={surface('p-5')}>
                <h3 className="font-['Orbitron'] text-xs font-bold mb-3" style={{ color: t.text }}>Technische Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Cpu, label: 'ECU', value: v.ecu },
                    { icon: Flame, label: 'Motor', value: v.engine },
                    { icon: Zap, label: 'Max. Gain', value: `+${v.stages[2].ps - v.stages[0].ps} PS` },
                    { icon: Settings2, label: 'Methode', value: 'OBD Flash' },
                  ].map((info, i) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${surfaceAlt()}`}>
                        <Icon className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
                        <div>
                          <div className="text-[10px]" style={{ color: t.textDim }}>{info.label}</div>
                          <div className="text-xs font-medium" style={{ color: t.text }}>{info.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
