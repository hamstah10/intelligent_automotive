import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Cpu, Wrench, Check, X, Clock, ChevronRight, Shield, Zap } from 'lucide-react';
import { Input } from '../ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ECUKnowledgeBot } from './ECUKnowledgeBot';

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
  { tool: 'Autotuner', obd: true, bench: true, boot: false, ecus: 342, lastRelease: '2026-03-15' },
  { tool: 'KESSv3', obd: true, bench: true, boot: true, ecus: 518, lastRelease: '2026-03-10' },
  { tool: 'KTAG', obd: false, bench: true, boot: true, ecus: 421, lastRelease: '2026-02-28' },
  { tool: 'CMD Flash', obd: true, bench: true, boot: true, ecus: 385, lastRelease: '2026-03-18' },
  { tool: 'FLEX', obd: false, bench: true, boot: false, ecus: 198, lastRelease: '2026-03-01' },
];

const coverageData = [
  { brand: 'BMW', count: 87 }, { brand: 'Audi', count: 72 }, { brand: 'MB', count: 65 },
  { brand: 'VW', count: 91 }, { brand: 'Porsche', count: 34 },
];

const riskColor = (risk) => {
  if (risk === 'Niedrig') return 'bg-green-500/15 text-green-300 border-green-500/20';
  if (risk === 'Mittel') return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20';
  return 'bg-red-500/15 text-red-300 border-red-500/20';
};

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-xs shadow-xl">
        <p className="text-white/40 mb-1">{label}</p>
        <p className="text-white font-semibold">{payload[0].value} ECUs</p>
      </div>
    );
  }
  return null;
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
          <h1 data-testid="tuning-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Tuning Intelligence</h1>
          <p className="text-white/40 text-sm mt-1.5">ECU-Datenbank, Tool-Matrix und Support-Übersicht.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <Input placeholder="ECU, Modell, Marke suchen ..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-[280px] bg-[#111111] border-white/10 text-white placeholder:text-white/25 rounded-lg h-10 text-sm" />
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
              className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex items-start justify-between">
              <div>
                <div className="text-white/40 text-sm mb-1">{s.label}</div>
                <div className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">{s.value}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#CCFF00]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ECU Knowledge Bot + Tool Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Tool Matrix */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3 bg-[#111111] border border-white/10 rounded-2xl p-6">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-1">Tool-Matrix</h3>
          <p className="text-white/30 text-xs mb-5">Verfügbare Methoden pro Tool</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-medium pb-3 pr-4">Tool</th>
                  <th className="text-center text-white/40 font-medium pb-3 px-3">OBD</th>
                  <th className="text-center text-white/40 font-medium pb-3 px-3">Bench</th>
                  <th className="text-center text-white/40 font-medium pb-3 px-3">Boot</th>
                  <th className="text-right text-white/40 font-medium pb-3 pl-3">ECUs</th>
                </tr>
              </thead>
              <tbody>
                {toolMatrix.map((t) => (
                  <tr key={t.tool} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 text-white font-medium">{t.tool}</td>
                    <td className="py-3 px-3 text-center">{t.obd ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-white/15 mx-auto" />}</td>
                    <td className="py-3 px-3 text-center">{t.bench ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-white/15 mx-auto" />}</td>
                    <td className="py-3 px-3 text-center">{t.boot ? <Check className="w-4 h-4 text-green-400 mx-auto" /> : <X className="w-4 h-4 text-white/15 mx-auto" />}</td>
                    <td className="py-3 pl-3 text-right text-white/60">{t.ecus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Coverage Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-2xl p-6">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-1">ECU-Abdeckung</h3>
          <p className="text-white/30 text-xs mb-5">Einträge pro Marke</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 12 }} />
                <YAxis type="category" dataKey="brand" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} width={50} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" fill="#CCFF00" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ECU Knowledge Bot */}
      <div className="mb-6">
        <ECUKnowledgeBot />
      </div>

      {/* ECU Database Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#111111] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">ECU-Datenbank</h3>
            <p className="text-white/30 text-xs mt-0.5">{filtered.length} Einträge</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {filtered.map((ecu, i) => (
            <motion.div key={ecu.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.03 }}
              className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5 hover:border-[#CCFF00]/15 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold text-sm">{ecu.brand} {ecu.model}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${riskColor(ecu.risk)}`}>Risiko: {ecu.risk}</span>
                </div>
                <span className="text-white/25 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{ecu.lastUpdate}</span>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <span className="text-white/50"><span className="text-[#CCFF00]">ECU:</span> {ecu.ecu}</span>
                <span className="text-white/50"><span className="text-[#00E5FF]">TCU:</span> {ecu.tcu}</span>
                <div className="flex items-center gap-1.5">
                  {ecu.tools.map(t => <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-white/50 border border-white/10">{t}</span>)}
                </div>
                <div className="flex items-center gap-1.5">
                  {ecu.methods.map(m => <span key={m} className="px-2 py-0.5 bg-[#CCFF00]/10 rounded text-[#CCFF00]/70 border border-[#CCFF00]/15">{m}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
