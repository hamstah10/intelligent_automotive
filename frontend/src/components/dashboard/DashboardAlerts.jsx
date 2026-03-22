import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, TrendingDown, Cpu, AlertTriangle, Eye, Clock, Brain, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { AIResponseRenderer } from '../landing/AIResponseRenderer';
import { t, surface, surfaceAlt } from './themeUtils';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const categories = ['Alle', 'Preisdrops', 'ECU-Updates', 'Watchlist', 'System'];

const alerts = [
  { id: 1, type: 'price', title: 'BMW 320d Touring unter €27.000', desc: 'München · AutoHaus Süd · vor 23 Min', severity: 'high', cat: 'Preisdrops', score: 92, trend: [-5.2, -3.1, -1.8, -6.4], icon: TrendingDown, color: '#00E5FF' },
  { id: 2, type: 'ecu', title: 'Continental SID212 Bench-Support', desc: 'Autotuner Release v4.12 · vor 2h', severity: 'medium', cat: 'ECU-Updates', score: 78, trend: [2, 5, 3, 8], icon: Cpu, color: '#CCFF00' },
  { id: 3, type: 'system', title: 'Crawler Fehlerrate +3.2%', desc: 'mobile.de Parser · 3 Retries fehlgeschlagen', severity: 'critical', cat: 'System', score: 45, trend: [1.2, 2.1, 3.2, 3.2], icon: AlertTriangle, color: '#f87171' },
  { id: 4, type: 'watchlist', title: 'Audi RS3 unter €50.000 gefunden', desc: 'Düsseldorf · Premium Audi · vor 45 Min', severity: 'high', cat: 'Watchlist', score: 88, trend: [-2.1, -3.5, -4.2, -5.1], icon: Eye, color: '#c084fc' },
  { id: 5, type: 'ecu', title: 'Bosch MG1CS031 Unlock-Warnung', desc: 'KESS3 Community Report · vor 5h', severity: 'high', cat: 'ECU-Updates', score: 65, trend: [1, 3, 5, 7], icon: Cpu, color: '#CCFF00' },
  { id: 6, type: 'price', title: 'Mercedes C220d Preisanstieg +4.8%', desc: 'Bundesweiter Trend · letzte 7 Tage', severity: 'low', cat: 'Preisdrops', score: 71, trend: [1.2, 2.3, 3.1, 4.8], icon: TrendingDown, color: '#00E5FF' },
  { id: 7, type: 'watchlist', title: 'VW Golf GTI Match gefunden', desc: 'Frankfurt · VW Zentrum · vor 1h', severity: 'medium', cat: 'Watchlist', score: 84, trend: [-1.5, -2.8, -3.9, -4.5], icon: Eye, color: '#c084fc' },
  { id: 8, type: 'system', title: 'API Rate Limit Warning', desc: 'AutoScout24 Endpoint · 85% Nutzung', severity: 'medium', cat: 'System', score: 55, trend: [60, 70, 80, 85], icon: AlertTriangle, color: '#f87171' },
];

const summaryCards = [
  { label: 'Gesamt Alerts', value: '61', sub: '+9 heute', color: '#00E5FF' },
  { label: 'Kritisch', value: '3', sub: 'Sofortige Aktion nötig', color: '#f87171' },
  { label: 'Preisdrops', value: '14', sub: 'Ø -4.2% Drop', color: '#00E5FF' },
  { label: 'ECU-Updates', value: '9', sub: '3 neue Tools diese Woche', color: '#CCFF00' },
];

const MiniSparkline = ({ data, color, width = 48, height = 20 }) => {
  const max = Math.max(...data.map(Math.abs));
  const mid = height / 2;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = mid - (v / (max || 1)) * (mid - 2);
    return `${x},${y}`;
  }).join(' ');
  return (<svg width={width} height={height} className="shrink-0"><polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" /></svg>);
};

const ScoreRing = ({ score, color, size = 36 }) => {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--d-border-sub)" strokeWidth="3" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="50%" y="50%" fill={color} fontSize="9" fontWeight="700" textAnchor="middle" dominantBaseline="central" transform={`rotate(90 ${size/2} ${size/2})`}>{score}</text>
    </svg>
  );
};

const severityConfig = {
  critical: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.2)', label: 'Kritisch' },
  high: { bg: 'rgba(250,204,21,0.12)', color: '#facc15', border: 'rgba(250,204,21,0.2)', label: 'Hoch' },
  medium: { bg: 'rgba(0,229,255,0.12)', color: '#00E5FF', border: 'rgba(0,229,255,0.2)', label: 'Mittel' },
  low: { bg: 'rgba(204,255,0,0.12)', color: '#CCFF00', border: 'rgba(204,255,0,0.2)', label: 'Niedrig' },
};

export const DashboardAlerts = () => {
  const [activeCat, setActiveCat] = useState('Alle');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = activeCat === 'Alle' ? alerts : alerts.filter(a => a.cat === activeCat);

  const analyzeAlerts = async () => {
    setAiLoading(true); setAiAnalysis(null);
    try {
      const res = await fetch(`${API_URL}/api/ai/smart-alerts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alerts: alerts.slice(0, 4).map(a => ({ title: a.title, type: a.type, severity: a.severity })) }) });
      if (!res.ok) throw new Error('Fehler');
      const data = await res.json();
      setAiAnalysis(data.analysis);
    } catch { setAiAnalysis('Analyse fehlgeschlagen. Bitte versuche es erneut.'); }
    finally { setAiLoading(false); }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="alerts-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight" style={{ color: t.text }}>Alerts</h1>
          <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Preisdrops, ECU-Updates, Watchlist-Treffer und System-Warnungen.</p>
        </div>
        <Button onClick={analyzeAlerts} disabled={aiLoading} data-testid="smart-alert-btn"
          className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-10 px-5 text-sm gap-2 disabled:opacity-50">
          {aiLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Analysiere...</> : <><Brain className="w-4 h-4" />AI Muster-Analyse</>}
        </Button>
      </div>

      {/* AI Analysis */}
      <AnimatePresence>
        {(aiAnalysis || aiLoading) && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl p-6 mb-6 transition-colors duration-300" style={{ backgroundColor: t.surface, border: '1px solid rgba(204,255,0,0.2)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center"><Sparkles className="w-5 h-5 text-[#CCFF00]" /></div>
              <div>
                <h3 className="font-['Space_Grotesk'] text-base font-bold" style={{ color: t.text }}>Smart Alert Engine</h3>
                <p className="text-xs" style={{ color: t.textMut }}>AI-basierte Muster-Erkennung</p>
              </div>
            </div>
            {aiLoading ? (
              <div className="flex items-center gap-3 py-6 justify-center">
                <Loader2 className="w-5 h-5 text-[#CCFF00] animate-spin" /><span className="text-sm" style={{ color: t.textSec }}>AI analysiert Alert-Muster...</span>
              </div>
            ) : (
              <div data-testid="smart-alert-result" className="max-h-[400px] overflow-y-auto custom-scrollbar">
                <AIResponseRenderer content={aiAnalysis} showScore={false} showRecommendation={false} accentColor="#CCFF00" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${surface()} p-5`}>
            <div className="text-sm mb-1" style={{ color: t.textSec }}>{card.label}</div>
            <div className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight" style={{ color: t.text }}>{card.value}</div>
            <div className="text-xs mt-1" style={{ color: card.color }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1 mb-6 p-1 w-fit rounded-xl transition-colors duration-300" style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={activeCat === cat ? { backgroundColor: '#CCFF00', color: '#000' } : { color: t.textSec }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((alert, i) => {
          const Icon = alert.icon;
          const sev = severityConfig[alert.severity];
          return (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
              className={`${surface()} p-4 cursor-pointer group`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${alert.color}15` }}>
                    <Icon className="w-[18px] h-[18px]" style={{ color: alert.color }} />
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ backgroundColor: sev.bg, color: sev.color, border: `1px solid ${sev.border}` }}>{sev.label}</span>
                </div>
                <ScoreRing score={alert.score} color={alert.color} />
              </div>
              <h4 className="font-medium text-sm mb-1 line-clamp-2 leading-snug" style={{ color: t.text }}>{alert.title}</h4>
              <p className="text-xs mb-3 flex items-center gap-1" style={{ color: t.textDim }}><Clock className="w-3 h-3" />{alert.desc}</p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${t.borderSub}` }}>
                <MiniSparkline data={alert.trend} color={alert.color} />
                <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)' }}>{alert.cat}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
