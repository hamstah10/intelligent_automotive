import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, TrendingDown, Cpu, AlertTriangle, Eye, Clock, Brain, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const allAlerts = [
  { id: 1, type: 'price', title: 'BMW 320d Touring unter Marktwert', desc: 'Preis: €28.900 — Marktwert: €31.200 (−7,4%)', time: 'vor 12 Min', read: false, severity: 'high', score: 92, trend: [40, 55, 48, 62, 58, 72, 92] },
  { id: 2, type: 'ecu', title: 'Neues ECU-Release: Continental SID212', desc: 'Bench-Support jetzt verfügbar via FLEX', time: 'vor 34 Min', read: false, severity: 'medium', score: 68, trend: [30, 35, 42, 50, 55, 60, 68] },
  { id: 3, type: 'price', title: 'Porsche Macan S Preisdrop −8,1%', desc: 'Preis: €48.500 — Marktwert: €52.800', time: 'vor 1h', read: false, severity: 'high', score: 88, trend: [45, 52, 60, 55, 70, 78, 88] },
  { id: 4, type: 'watchlist', title: 'Watchlist-Treffer: Audi RS3 8Y', desc: 'Neues Listing in Hamburg, Score 88', time: 'vor 1h', read: true, severity: 'medium', score: 74, trend: [60, 55, 65, 70, 68, 72, 74] },
  { id: 5, type: 'issue', title: 'KESSv3: OBD instabil bei W206', desc: 'Community-Bericht, Workaround verfügbar', time: 'vor 2h', read: true, severity: 'low', score: 31, trend: [80, 72, 60, 55, 45, 38, 31] },
  { id: 6, type: 'price', title: 'VW Golf GTI unter €30.000', desc: 'Preis: €29.900 — Deal Score: 95', time: 'vor 2h', read: false, severity: 'high', score: 95, trend: [50, 60, 72, 78, 85, 90, 95] },
  { id: 7, type: 'ecu', title: 'Bosch MG1CS031 Unlock-Hinweis', desc: 'Neuer OBD/Patch-Pfad entdeckt', time: 'vor 4h', read: true, severity: 'medium', score: 56, trend: [20, 28, 35, 40, 45, 50, 56] },
  { id: 8, type: 'watchlist', title: 'BMW M340i unter Marktwert', desc: 'Köln — Preis: €52.900 / Markt: €58.700', time: 'vor 5h', read: true, severity: 'high', score: 91, trend: [55, 62, 70, 75, 82, 88, 91] },
  { id: 9, type: 'price', title: 'Mercedes C220d neues Listing', desc: 'Berlin, 31.000km, €34.900 — Score 78', time: 'vor 6h', read: true, severity: 'medium', score: 78, trend: [50, 58, 62, 68, 72, 75, 78] },
  { id: 10, type: 'ecu', title: 'ZF8HP Support Matrix erweitert', desc: 'KESS3 + Bench jetzt unterstützt', time: 'vor 7h', read: true, severity: 'low', score: 42, trend: [25, 28, 30, 34, 36, 40, 42] },
  { id: 11, type: 'issue', title: 'Autotuner-Firmware v4.2.1 Bug', desc: 'Boot-Mode bei Bosch MED17 fehlerhaft', time: 'vor 8h', read: true, severity: 'high', score: 18, trend: [65, 55, 48, 40, 32, 25, 18] },
  { id: 12, type: 'watchlist', title: 'Audi A4 Avant Preisdrop', desc: 'Hamburg — €26.500 / Markt: €28.400', time: 'vor 10h', read: true, severity: 'medium', score: 72, trend: [40, 48, 55, 60, 65, 68, 72] },
];

const typeConfig = {
  price: { icon: TrendingDown, label: 'Preisdrop', color: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/10', accent: '#00E5FF' },
  ecu: { icon: Cpu, label: 'ECU Release', color: 'text-[#CCFF00]', bg: 'bg-[#CCFF00]/10', accent: '#CCFF00' },
  issue: { icon: AlertTriangle, label: 'Known Issue', color: 'text-red-400', bg: 'bg-red-500/10', accent: '#f87171' },
  watchlist: { icon: Eye, label: 'Watchlist', color: 'text-purple-400', bg: 'bg-purple-500/10', accent: '#c084fc' },
};

const severityConfig = {
  high: { label: 'Hoch', color: 'bg-red-500/15 text-red-300 border-red-500/20' },
  medium: { label: 'Mittel', color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20' },
  low: { label: 'Niedrig', color: 'bg-white/5 text-white/40 border-white/10' },
};

const MiniSparkline = ({ data, color, width = 80, height = 32 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const ScoreRing = ({ score, color, size = 44 }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">{score}</span>
    </div>
  );
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

  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const analyzeAlerts = async () => {
    setAiLoading(true);
    setAiAnalysis(null);
    try {
      const alertData = allAlerts.slice(0, 8).map(a => ({ title: a.title, desc: a.desc, severity: a.severity, type: a.type }));
      const res = await fetch(`${API_URL}/api/ai/smart-alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alerts: alertData }),
      });
      if (!res.ok) throw new Error('Fehler');
      const data = await res.json();
      setAiAnalysis(data.analysis);
    } catch {
      setAiAnalysis('Analyse konnte nicht durchgeführt werden.');
    } finally {
      setAiLoading(false);
    }
  };

  const unread = allAlerts.filter(a => !a.read).length;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="alerts-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Alerts</h1>
          <p className="text-white/40 text-sm mt-1.5">{unread} ungelesene Benachrichtigungen</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={analyzeAlerts} disabled={aiLoading} data-testid="smart-alert-btn"
            className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-10 px-5 text-sm gap-2 disabled:opacity-50">
            {aiLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Analysiere...</> : <><Brain className="w-4 h-4" />AI Muster-Analyse</>}
          </Button>
          <button onClick={() => setShowRead(!showRead)}
            className={`h-10 px-4 rounded-lg text-sm font-medium border transition-colors ${!showRead ? 'bg-[#CCFF00] text-black border-[#CCFF00]' : 'bg-[#111111] text-white/50 border-white/10 hover:border-white/20'}`}>
            {showRead ? 'Nur ungelesene' : 'Alle anzeigen'}
          </button>
        </div>
      </div>

      {/* AI Analysis */}
      <AnimatePresence>
        {(aiAnalysis || aiLoading) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-[#111111] border border-[#CCFF00]/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#CCFF00]" />
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">Smart Alert Analyse</h3>
            </div>
            {aiLoading ? (
              <div className="flex items-center gap-3 py-4 justify-center">
                <Loader2 className="w-5 h-5 text-[#CCFF00] animate-spin" />
                <span className="text-white/50 text-sm">AI erkennt Muster in deinen Alerts...</span>
              </div>
            ) : (
              <div data-testid="smart-alert-result" className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{aiAnalysis}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter + Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Filters */}
        <div className="lg:col-span-4 bg-[#111111] border border-white/10 rounded-2xl p-5">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white mb-3">Filter</h3>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                  filter === t ? 'bg-[#CCFF00] text-black border-[#CCFF00]' : 'text-white/40 border-white/10 hover:border-white/20 hover:text-white/70'
                }`}>
                {t === 'all' ? `Alle (${allAlerts.length})` : `${typeConfig[t]?.label} (${allAlerts.filter(a => a.type === t).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        {Object.entries(typeConfig).map(([key, cfg], i) => {
          const Icon = cfg.icon;
          const items = allAlerts.filter(a => a.type === key);
          const avgScore = Math.round(items.reduce((s, a) => s + a.score, 0) / items.length);
          return (
            <motion.div key={key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setFilter(key)}
              className={`lg:col-span-2 bg-[#111111] border rounded-2xl p-4 cursor-pointer transition-colors ${filter === key ? 'border-[#CCFF00]/30' : 'border-white/10 hover:border-white/20'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center`}><Icon className={`w-4 h-4 ${cfg.color}`} /></div>
                <ScoreRing score={avgScore} color={cfg.accent} size={38} />
              </div>
              <div className="text-white font-semibold text-lg font-['Space_Grotesk']">{items.length}</div>
              <div className="text-white/40 text-xs">{cfg.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((alert, i) => {
          const cfg = typeConfig[alert.type];
          const Icon = cfg.icon;
          const sev = severityConfig[alert.severity];
          return (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.03 }}
              data-testid={`alert-card-${alert.id}`}
              className={`bg-[#111111] rounded-2xl border overflow-hidden transition-colors cursor-pointer group ${
                !alert.read ? 'border-[#CCFF00]/20' : 'border-white/10 hover:border-white/20'
              }`}>
              <div className="p-4">
                {/* Top: Icon + Type + Time */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <span className={`text-[11px] font-medium ${cfg.color}`}>{cfg.label}</span>
                    {!alert.read && <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />}
                  </div>
                  <span className="text-white/20 text-[11px] flex items-center gap-1"><Clock className="w-3 h-3" />{alert.time}</span>
                </div>

                {/* Title + Desc */}
                <h4 className="text-white font-medium text-sm mb-1 leading-snug">{alert.title}</h4>
                <p className="text-white/35 text-xs mb-3 line-clamp-2">{alert.desc}</p>

                {/* Bottom: Score Ring + Sparkline + Severity */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <ScoreRing score={alert.score} color={cfg.accent} size={36} />
                    <MiniSparkline data={alert.trend} color={cfg.accent} width={70} height={28} />
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${sev.color}`}>{sev.label}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
