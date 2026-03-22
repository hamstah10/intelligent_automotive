import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, TrendingDown, Cpu, AlertTriangle, Eye, Clock, Check, Filter, ChevronDown } from 'lucide-react';

const allAlerts = [
  { id: 1, type: 'price', title: 'BMW 320d Touring unter Marktwert', desc: 'Preis: €28.900 — Marktwert: €31.200 (−7,4%)', time: 'vor 12 Min', read: false, severity: 'high' },
  { id: 2, type: 'ecu', title: 'Neues ECU-Release: Continental SID212', desc: 'Bench-Support jetzt verfügbar via FLEX', time: 'vor 34 Min', read: false, severity: 'medium' },
  { id: 3, type: 'price', title: 'Porsche Macan S Preisdrop −8,1%', desc: 'Preis: €48.500 — Marktwert: €52.800', time: 'vor 1h', read: false, severity: 'high' },
  { id: 4, type: 'watchlist', title: 'Watchlist-Treffer: Audi RS3 8Y', desc: 'Neues Listing in Hamburg, Score 88', time: 'vor 1h', read: true, severity: 'medium' },
  { id: 5, type: 'issue', title: 'KESSv3: OBD-Verbindung instabil bei W206', desc: 'Community-Bericht, Workaround verfügbar', time: 'vor 2h', read: true, severity: 'low' },
  { id: 6, type: 'price', title: 'VW Golf GTI unter €30.000', desc: 'Preis: €29.900 — Deal Score: 95', time: 'vor 2h', read: false, severity: 'high' },
  { id: 7, type: 'ecu', title: 'Bosch MG1CS031 Unlock-Hinweis', desc: 'Neuer OBD/Patch-Pfad entdeckt', time: 'vor 4h', read: true, severity: 'medium' },
  { id: 8, type: 'watchlist', title: 'BMW M340i unter Marktwert in Köln', desc: 'Preis: €52.900 — Marktwert: €58.700', time: 'vor 5h', read: true, severity: 'high' },
  { id: 9, type: 'price', title: 'Mercedes C220d neues Listing', desc: 'Berlin, 31.000km, €34.900 — Score 78', time: 'vor 6h', read: true, severity: 'medium' },
  { id: 10, type: 'ecu', title: 'ZF8HP Support Matrix erweitert', desc: 'KESS3 + Bench jetzt unterstützt', time: 'vor 7h', read: true, severity: 'low' },
  { id: 11, type: 'issue', title: 'Autotuner-Firmware v4.2.1 bekannter Bug', desc: 'Boot-Mode bei Bosch MED17 fehlerhaft', time: 'vor 8h', read: true, severity: 'high' },
  { id: 12, type: 'watchlist', title: 'Audi A4 Avant Preisdrop in Hamburg', desc: 'Preis: €26.500 — Marktwert: €28.400', time: 'vor 10h', read: true, severity: 'medium' },
];

const typeConfig = {
  price: { icon: TrendingDown, label: 'Preisdrop', color: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/10' },
  ecu: { icon: Cpu, label: 'ECU Release', color: 'text-[#CCFF00]', bg: 'bg-[#CCFF00]/10' },
  issue: { icon: AlertTriangle, label: 'Known Issue', color: 'text-red-400', bg: 'bg-red-500/10' },
  watchlist: { icon: Eye, label: 'Watchlist', color: 'text-purple-400', bg: 'bg-purple-500/10' },
};

const severityColor = {
  high: 'bg-red-500/15 text-red-300',
  medium: 'bg-yellow-500/15 text-yellow-300',
  low: 'bg-white/5 text-white/40',
};

export const DashboardAlerts = () => {
  const [filter, setFilter] = useState('all');
  const [showRead, setShowRead] = useState(true);

  const types = ['all', 'price', 'ecu', 'watchlist', 'issue'];
  const filtered = allAlerts.filter(a => {
    if (filter !== 'all' && a.type !== filter) return false;
    if (!showRead && a.read) return false;
    return true;
  });

  const unread = allAlerts.filter(a => !a.read).length;

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="alerts-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Alerts</h1>
          <p className="text-white/40 text-sm mt-1.5">{unread} ungelesene Benachrichtigungen</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowRead(!showRead)}
            className={`h-10 px-4 rounded-lg text-sm font-medium border transition-colors ${!showRead ? 'bg-[#CCFF00] text-black border-[#CCFF00]' : 'bg-[#111111] text-white/50 border-white/10 hover:border-white/20'}`}>
            {showRead ? 'Nur ungelesene' : 'Alle anzeigen'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-[#111111] border border-white/10 rounded-xl p-1 w-fit">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === t ? 'bg-[#CCFF00] text-black' : 'text-white/40 hover:text-white/70'}`}>
            {t === 'all' ? 'Alle' : typeConfig[t]?.label}
            {t === 'all' && <span className="ml-1.5 text-xs opacity-70">({allAlerts.length})</span>}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(typeConfig).map(([key, cfg], i) => {
          const Icon = cfg.icon;
          const count = allAlerts.filter(a => a.type === key).length;
          return (
            <motion.div key={key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setFilter(key)}
              className={`bg-[#111111] border rounded-2xl p-5 cursor-pointer transition-colors ${filter === key ? 'border-[#CCFF00]/30' : 'border-white/10 hover:border-white/20'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center`}><Icon className={`w-4 h-4 ${cfg.color}`} /></div>
                <span className="font-['Space_Grotesk'] text-2xl font-bold text-white">{count}</span>
              </div>
              <div className="text-white/50 text-sm">{cfg.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Alert List */}
      <div className="space-y-2.5">
        {filtered.map((alert, i) => {
          const cfg = typeConfig[alert.type];
          const Icon = cfg.icon;
          return (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.03 }}
              className={`p-4 bg-[#111111] rounded-2xl border transition-colors cursor-pointer ${!alert.read ? 'border-[#CCFF00]/20 bg-[#CCFF00]/[0.02]' : 'border-white/10 hover:border-white/20'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}><Icon className={`w-5 h-5 ${cfg.color}`} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{alert.title}</span>
                    {!alert.read && <span className="w-2 h-2 rounded-full bg-[#CCFF00] shrink-0" />}
                  </div>
                  <p className="text-white/40 text-xs mb-2">{alert.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${severityColor[alert.severity]}`}>{alert.severity === 'high' ? 'Hoch' : alert.severity === 'medium' ? 'Mittel' : 'Niedrig'}</span>
                    <span className="text-white/25 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{alert.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
