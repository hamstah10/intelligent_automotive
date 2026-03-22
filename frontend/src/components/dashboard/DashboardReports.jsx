import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Clock, Sparkles, Loader2, Brain } from 'lucide-react';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AIResponseRenderer } from '../landing/AIResponseRenderer';
import { t, surface, ThemedTooltip } from './themeUtils';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const monthlyData = [
  { month: 'Okt', listings: 890, deals: 34, alerts: 120 },
  { month: 'Nov', listings: 1020, deals: 41, alerts: 98 },
  { month: 'Dez', listings: 780, deals: 28, alerts: 145 },
  { month: 'Jan', listings: 1150, deals: 52, alerts: 110 },
  { month: 'Feb', listings: 1340, deals: 48, alerts: 132 },
  { month: 'Mär', listings: 1247, deals: 23, alerts: 61 },
];

const reports = [
  { id: 1, title: 'Monatsbericht März 2026', desc: 'Komplettübersicht: Market + Tuning', date: '22.03.2026', type: 'monthly', status: 'ready' },
  { id: 2, title: 'Deal-Analyse Q1 2026', desc: 'Top-Deals, Preisentwicklung, ROI', date: '15.03.2026', type: 'quarterly', status: 'ready' },
  { id: 3, title: 'ECU-Abdeckungsreport', desc: 'Tool-Matrix, neue Releases, Coverage', date: '10.03.2026', type: 'tuning', status: 'ready' },
  { id: 4, title: 'Konkurrenz-Monitoring', desc: 'Händlervergleich, Preispositionierung', date: '05.03.2026', type: 'competitive', status: 'ready' },
  { id: 5, title: 'Monatsbericht April 2026', desc: 'Wird automatisch generiert', date: '01.04.2026', type: 'monthly', status: 'scheduled' },
];

const kpis = [
  { label: 'Reports erstellt', value: '24', sub: 'In den letzten 90 Tagen', icon: FileText },
  { label: 'Ø Deal Score', value: '82', sub: '+4 vs. Vormonat', icon: TrendingUp },
  { label: 'Datenqualität', value: '96%', sub: 'Crawler Accuracy', icon: BarChart3 },
  { label: 'API-Aufrufe', value: '12.4K', sub: 'Diesen Monat', icon: PieChart },
];

const typeColors = {
  monthly: { bg: 'rgba(0,229,255,0.15)', color: '#00E5FF' },
  quarterly: { bg: 'rgba(204,255,0,0.15)', color: '#CCFF00' },
  tuning: { bg: 'rgba(168,85,247,0.15)', color: '#a855f7' },
  competitive: { bg: 'rgba(249,115,22,0.15)', color: '#f97316' },
};
const typeLabels = { monthly: 'Monatlich', quarterly: 'Quartal', tuning: 'Tuning', competitive: 'Konkurrenz' };

export const DashboardReports = () => {
  const [aiReport, setAiReport] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFocus, setAiFocus] = useState('general');

  const generateReport = async () => {
    setAiLoading(true); setAiReport(null);
    try {
      const res = await fetch(`${API_URL}/api/ai/market-report`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ focus: aiFocus }) });
      if (!res.ok) throw new Error('Fehler');
      const data = await res.json();
      setAiReport(data.report);
    } catch { setAiReport('Report konnte nicht generiert werden. Bitte versuche es erneut.'); }
    finally { setAiLoading(false); }
  };

  const focusOptions = [
    { id: 'general', label: 'Allgemein' }, { id: 'premium', label: 'Premium' },
    { id: 'compact', label: 'Kompakt' }, { id: 'suv', label: 'SUV' }, { id: 'electric', label: 'E-Autos' },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 data-testid="reports-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Reports</h1>
        <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Automatische Berichte und Analytics.</p>
      </div>

      {/* AI Report Generator */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 mb-6 transition-colors duration-300" style={{ backgroundColor: t.surface, border: `1px solid rgba(204,255,0,0.2)` }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center"><Brain className="w-5 h-5 text-[#CCFF00]" /></div>
          <div>
            <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>AI Market Report</h3>
            <p className="text-xs" style={{ color: t.textMut }}>Generiere einen AI-gestützten Marktbericht auf Knopfdruck</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 rounded-xl p-1" style={{ backgroundColor: t.surfaceAlt, border: `1px solid ${t.border}` }}>
            {focusOptions.map(f => (
              <button key={f.id} onClick={() => setAiFocus(f.id)} data-testid={`report-focus-${f.id}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={aiFocus === f.id ? { backgroundColor: '#CCFF00', color: '#000' } : { color: t.textSec }}>
                {f.label}
              </button>
            ))}
          </div>
          <Button onClick={generateReport} disabled={aiLoading} data-testid="generate-ai-report-btn"
            className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-9 px-5 text-sm gap-2 disabled:opacity-50">
            {aiLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Generiere...</> : <><Sparkles className="w-4 h-4" />Report generieren</>}
          </Button>
        </div>
        <AnimatePresence>
          {(aiReport || aiLoading) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="pt-4 mt-2" style={{ borderTop: `1px solid ${t.borderSub}` }}>
              {aiLoading ? (
                <div className="flex items-center gap-3 py-8 justify-center">
                  <Loader2 className="w-5 h-5 text-[#CCFF00] animate-spin" /><span className="text-sm" style={{ color: t.textSec }}>AI analysiert Marktdaten...</span>
                </div>
              ) : (
                <div data-testid="ai-report-result" className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <AIResponseRenderer content={aiReport} showScore={false} showRecommendation={false} accentColor="#00E5FF" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`${surface()} p-5 flex items-start justify-between`}>
              <div>
                <div className="text-sm mb-1" style={{ color: t.textSec }}>{kpi.label}</div>
                <div className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>{kpi.value}</div>
                <div className="text-xs mt-1" style={{ color: t.textDim }}>{kpi.sub}</div>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--d-hover)' }}><Icon className="w-5 h-5" style={{ color: t.textMut }} /></div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${surface()} p-6 mb-6`}>
        <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Aktivität der letzten 6 Monate</h3>
        <p className="text-xs mb-6" style={{ color: t.textMut }}>Listings, Deals und Alerts im Überblick</p>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 12 }} />
              <Tooltip content={<ThemedTooltip />} />
              <Bar dataKey="listings" fill="#CCFF00" radius={[4, 4, 0, 0]} barSize={18} name="Listings" />
              <Bar dataKey="deals" fill="#00E5FF" radius={[4, 4, 0, 0]} barSize={18} name="Deals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Reports List */}
      <h3 className="font-['Orbitron'] text-sm font-bold mb-4" style={{ color: t.text }}>Verfügbare Reports</h3>
      <div className="space-y-2.5">
        {reports.map((r, i) => {
          const tc = typeColors[r.type];
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.04 }}
              className={`p-4 ${surface()} flex items-center gap-4`}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--d-hover)' }}><FileText className="w-5 h-5" style={{ color: t.textMut }} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm" style={{ color: t.text }}>{r.title}</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: tc.bg, color: tc.color }}>{typeLabels[r.type]}</span>
                </div>
                <p className="text-xs" style={{ color: t.textMut }}>{r.desc}</p>
              </div>
              <div className="text-xs flex items-center gap-1 shrink-0" style={{ color: t.textDim }}><Calendar className="w-3 h-3" />{r.date}</div>
              {r.status === 'ready' ? (
                <Button variant="ghost" size="sm" className="text-[#CCFF00] hover:bg-[#CCFF00]/10 shrink-0"><Download className="w-4 h-4" /></Button>
              ) : (
                <span className="text-xs flex items-center gap-1 shrink-0" style={{ color: t.textDim }}><Clock className="w-3 h-3" />Geplant</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
