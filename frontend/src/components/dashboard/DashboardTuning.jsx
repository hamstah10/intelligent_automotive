import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Cpu, Wrench, Check, X, Clock, Shield, Zap } from 'lucide-react';
import { Input } from '../ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ECUKnowledgeBot } from './ECUKnowledgeBot';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const brandLogos = {
  BMW: 'https://static.prod-images.emergentagent.com/jobs/75c63187-f714-4297-8bd0-b3bae932661f/images/180bbe474591d40156ff9ca850911c777640e049637418cbcd1245695206ac72.png',
  Audi: 'https://static.prod-images.emergentagent.com/jobs/75c63187-f714-4297-8bd0-b3bae932661f/images/5e6c139b20069d400e137b86483d1e995c0c15c21977fa96e4dd7fc3c92bc6c6.png',
};
const brandColors = { BMW: 'from-blue-500 to-blue-700', Audi: 'from-gray-400 to-gray-600', Mercedes: 'from-gray-300 to-gray-500', VW: 'from-blue-600 to-blue-800', Porsche: 'from-red-600 to-red-800' };

const BrandBadge = ({ brand }) => {
  if (brandLogos[brand]) return (<div className="w-7 h-7 rounded-md bg-white flex items-center justify-center p-0.5 shrink-0"><img src={brandLogos[brand]} alt={brand} className="w-full h-full object-contain" /></div>);
  return (<div className={`w-7 h-7 rounded-md bg-gradient-to-br ${brandColors[brand] || 'from-gray-500 to-gray-700'} flex items-center justify-center shrink-0`}><span className="text-white text-[9px] font-bold">{brand === 'Mercedes' ? 'MB' : brand}</span></div>);
};

const ecuDatabase = [
  { id: 1, brand: 'BMW', model: '320d (G20)', ecu: 'Bosch EDC17C50', tcu: 'ZF 8HP50', tools: ['Autotuner', 'KESSv3', 'KTAG'], methods: ['OBD', 'Bench'], risk: 'Niedrig', lastUpdate: 'vor 2d' },
  { id: 2, brand: 'BMW', model: 'M340i (G20)', ecu: 'Bosch MG1CS201', tcu: 'ZF 8HP51', tools: ['Autotuner'], methods: ['Bench'], risk: 'Mittel', lastUpdate: 'vor 5d' },
  { id: 3, brand: 'Audi', model: 'RS3 (8Y)', ecu: 'Bosch MED17.1.62', tcu: 'DQ500', tools: ['Autotuner', 'KESSv3'], methods: ['OBD', 'Boot'], risk: 'Hoch', lastUpdate: 'vor 1d' },
  { id: 4, brand: 'Mercedes', model: 'C220d (W206)', ecu: 'Bosch EDC17CP57', tcu: '9G-Tronic', tools: ['Autotuner', 'KESSv3', 'KTAG'], methods: ['OBD', 'Bench'], risk: 'Niedrig', lastUpdate: 'vor 3d' },
  { id: 5, brand: 'VW', model: 'Golf GTI (Mk8)', ecu: 'Bosch MED17.5.2', tcu: 'DQ381', tools: ['KESSv3', 'KTAG', 'CMD'], methods: ['OBD', 'Bench', 'Boot'], risk: 'Niedrig', lastUpdate: 'vor 1d' },
  { id: 6, brand: 'Porsche', model: 'Macan S', ecu: 'Bosch MED17.1.1', tcu: 'PDK', tools: ['Autotuner'], methods: ['Bench'], risk: 'Hoch', lastUpdate: 'vor 8d' },
  { id: 7, brand: 'BMW', model: 'M3 (G80)', ecu: 'Bosch MG1CS003', tcu: 'ZF 8HP76', tools: ['Autotuner', 'KESSv3'], methods: ['Bench', 'Boot'], risk: 'Mittel', lastUpdate: 'vor 4d' },
  { id: 8, brand: 'Audi', model: 'A4 45 TFSI', ecu: 'Bosch MED17.1', tcu: 'DL501', tools: ['KESSv3', 'KTAG', 'CMD'], methods: ['OBD', 'Bench'], risk: 'Niedrig', lastUpdate: 'vor 2d' },
];

const toolMatrix = [
  { tool: 'Autotuner', obd: true, bench: true, boot: false, ecus: 342 },
  { tool: 'KESSv3', obd: true, bench: true, boot: true, ecus: 518 },
  { tool: 'KTAG', obd: false, bench: true, boot: true, ecus: 421 },
  { tool: 'CMD Flash', obd: true, bench: true, boot: true, ecus: 385 },
  { tool: 'FLEX', obd: false, bench: true, boot: false, ecus: 198 },
];

const coverageData = [
  { brand: 'BMW', count: 87 }, { brand: 'Audi', count: 72 }, { brand: 'MB', count: 65 },
  { brand: 'VW', count: 91 }, { brand: 'Porsche', count: 34 },
];

const riskColor = (risk) => {
  if (risk === 'Niedrig') return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: 'rgba(34,197,94,0.2)' };
  if (risk === 'Mittel') return { bg: 'rgba(250,204,21,0.15)', color: '#eab308', border: 'rgba(250,204,21,0.2)' };
  return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.2)' };
};

export const DashboardTuning = () => {
  const [search, setSearch] = useState('');
  const filtered = ecuDatabase.filter(e =>
    !search || e.brand.toLowerCase().includes(search.toLowerCase()) ||
    e.model.toLowerCase().includes(search.toLowerCase()) ||
    e.ecu.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="tuning-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Tuning Intelligence</h1>
          <p className="text-sm mt-1.5" style={{ color: t.textSec }}>ECU-Datenbank, Tool-Matrix und Support-Übersicht.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMut }} />
          <Input placeholder="ECU, Modell, Marke suchen ..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-[280px] rounded-lg h-10 text-sm" style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'ECU-Einträge', value: '10.248', icon: Cpu },
          { label: 'Unterstützte Tools', value: '5', icon: Wrench },
          { label: 'Updates diese Woche', value: '17', icon: Clock },
          { label: 'Abdeckungsrate', value: '94%', icon: Shield },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`${surface()} p-5 flex items-start justify-between`}>
              <div>
                <div className="text-sm mb-1" style={{ color: t.textSec }}>{s.label}</div>
                <div className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>{s.value}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#CCFF00]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tool Matrix + Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`lg:col-span-3 ${surface()} p-6`}>
          <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Tool-Matrix</h3>
          <p className="text-xs mb-5" style={{ color: t.textMut }}>Verfügbare Methoden pro Tool</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--d-border)' }}>
                  <th className="text-left font-medium pb-3 pr-4" style={{ color: t.textSec }}>Tool</th>
                  <th className="text-center font-medium pb-3 px-3" style={{ color: t.textSec }}>OBD</th>
                  <th className="text-center font-medium pb-3 px-3" style={{ color: t.textSec }}>Bench</th>
                  <th className="text-center font-medium pb-3 px-3" style={{ color: t.textSec }}>Boot</th>
                  <th className="text-right font-medium pb-3 pl-3" style={{ color: t.textSec }}>ECUs</th>
                </tr>
              </thead>
              <tbody>
                {toolMatrix.map((tm) => (
                  <tr key={tm.tool} style={{ borderBottom: '1px solid var(--d-border-sub)' }}>
                    <td className="py-3 pr-4 font-medium" style={{ color: t.text }}>{tm.tool}</td>
                    <td className="py-3 px-3 text-center">{tm.obd ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 mx-auto" style={{ color: t.textDim }} />}</td>
                    <td className="py-3 px-3 text-center">{tm.bench ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 mx-auto" style={{ color: t.textDim }} />}</td>
                    <td className="py-3 px-3 text-center">{tm.boot ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 mx-auto" style={{ color: t.textDim }} />}</td>
                    <td className="py-3 pl-3 text-right" style={{ color: t.textSec }}>{tm.ecus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={`lg:col-span-2 ${surface()} p-6`}>
          <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>ECU-Abdeckung</h3>
          <p className="text-xs mb-5" style={{ color: t.textMut }}>Einträge pro Marke</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 12 }} />
                <YAxis type="category" dataKey="brand" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 12 }} width={50} />
                <Tooltip content={<ThemedTooltip />} />
                <Bar dataKey="count" fill="#CCFF00" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ECU DB + Bot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`lg:col-span-8 ${surface()} p-6`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>ECU-Datenbank</h3>
              <p className="text-xs mt-0.5" style={{ color: t.textMut }}>{filtered.length} Einträge</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {filtered.map((ecu, i) => {
              const rc = riskColor(ecu.risk);
              return (
                <motion.div key={ecu.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.03 }}
                  className={`p-4 ${surfaceAlt()} cursor-pointer`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <BrandBadge brand={ecu.brand} />
                      <span className="font-semibold text-sm" style={{ color: t.text }}>{ecu.brand} {ecu.model}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>Risiko: {ecu.risk}</span>
                    </div>
                    <span className="text-xs flex items-center gap-1" style={{ color: t.textDim }}><Clock className="w-3 h-3" />{ecu.lastUpdate}</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs">
                    <span style={{ color: t.textSec }}><span className="text-[#CCFF00]">ECU:</span> {ecu.ecu}</span>
                    <span style={{ color: t.textSec }}><span className="text-[#00E5FF]">TCU:</span> {ecu.tcu}</span>
                    <div className="flex items-center gap-1.5">
                      {ecu.tools.map(tl => <span key={tl} className="px-2 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)', border: '1px solid var(--d-border)' }}>{tl}</span>)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {ecu.methods.map(m => <span key={m} className="px-2 py-0.5 bg-[#CCFF00]/10 rounded text-[#CCFF00]/70 border border-[#CCFF00]/15 text-[11px]">{m}</span>)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div className="lg:col-span-4"><ECUKnowledgeBot /></div>
      </div>
    </>
  );
};
