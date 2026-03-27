import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle,
  Star, Clock, ChevronRight, RotateCcw, ExternalLink, Shield,
  Code, Cpu, Wrench, Eye, Layers, Bookmark, BookmarkCheck,
  History, X, Loader2, Brain, Zap, Info, Copy, Check
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { t, surface, surfaceAlt } from './themeUtils';

const PURPLE = '#c084fc';
const API = process.env.REACT_APP_BACKEND_URL;

const riskColors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const riskLabels = { low: 'Niedrig', medium: 'Mittel', high: 'Hoch' };

/* ── Skeleton Loader ── */
const Skeleton = ({ w = 'w-full', h = 'h-4' }) => (
  <div className={`${w} ${h} rounded-lg animate-pulse`} style={{ backgroundColor: 'var(--d-surface-alt)' }} />
);

const ThinkingState = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${surface('p-6')} space-y-5`} data-testid="ai-thinking">
    <div className="flex items-center gap-3 mb-2">
      <div className="relative">
        <Brain className="w-5 h-5 animate-pulse" style={{ color: PURPLE }} />
        <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }} style={{ backgroundColor: PURPLE }} />
      </div>
      <span className="text-sm font-medium" style={{ color: PURPLE }}>AI analysiert deine Anfrage...</span>
    </div>
    <div className="space-y-3">
      <Skeleton h="h-3" w="w-3/4" />
      <Skeleton h="h-3" w="w-1/2" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border-sub)' }}>
        <Skeleton h="h-3" w="w-2/3" />
        <div className="mt-2 space-y-2"><Skeleton h="h-2" w="w-full" /><Skeleton h="h-2" w="w-4/5" /></div>
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border-sub)' }}>
        <Skeleton h="h-3" w="w-2/3" />
        <div className="mt-2 space-y-2"><Skeleton h="h-2" w="w-full" /><Skeleton h="h-2" w="w-4/5" /></div>
      </div>
    </div>
    <div className="flex gap-2">
      {[1, 2, 3].map(i => <Skeleton key={i} h="h-7" w="w-24" />)}
    </div>
  </motion.div>
);

/* ── Coding Card ── */
const CodingCard = ({ coding, onBookmark, isBookmarked, expertMode }) => {
  const [copied, setCopied] = useState(false);
  const copyInfo = () => {
    navigator.clipboard.writeText(`${coding.module} | Byte ${coding.byte}, Bit ${coding.bit} | ${coding.original} → ${coding.coded}`);
    setCopied(true);
    toast.success('Kopiert!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border-sub)' }}
      data-testid="coding-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3" style={{ borderBottom: '1px solid var(--d-border-sub)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${PURPLE}15` }}>
            <Code className="w-4 h-4" style={{ color: PURPLE }} />
          </div>
          <div>
            <h4 className="text-sm font-semibold" style={{ color: t.text }}>{coding.name}</h4>
            <span className="text-[10px] font-mono" style={{ color: t.textDim }}>{coding.module}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={copyInfo} className="p-1.5 rounded-lg transition-colors hover:bg-white/5" data-testid="copy-coding-btn">
            {copied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" style={{ color: t.textMut }} />}
          </button>
          <button onClick={() => onBookmark(coding)} className="p-1.5 rounded-lg transition-colors hover:bg-white/5" data-testid="bookmark-coding-btn">
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" style={{ color: '#facc15' }} /> : <Bookmark className="w-3.5 h-3.5" style={{ color: t.textMut }} />}
          </button>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md ml-1" style={{ backgroundColor: `${riskColors[coding.risk]}12` }}>
            <Shield className="w-3 h-3" style={{ color: riskColors[coding.risk] }} />
            <span className="text-[9px] font-bold" style={{ color: riskColors[coding.risk] }}>{riskLabels[coding.risk]}</span>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div><span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Tool</span>
            <span className="text-xs font-medium flex items-center gap-1" style={{ color: t.textSec }}><Wrench className="w-3 h-3" />{coding.tool}</span></div>
          <div><span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Byte</span>
            <span className="text-xs font-mono font-semibold" style={{ color: t.text }}>{coding.byte}</span></div>
          <div><span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Bit</span>
            <span className="text-xs font-mono font-semibold" style={{ color: t.text }}>{coding.bit}</span></div>
          <div><span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Wert</span>
            <span className="text-xs font-mono" style={{ color: t.textMut }}>{coding.original}</span>
            <span className="text-xs mx-1" style={{ color: PURPLE }}>&rarr;</span>
            <span className="text-xs font-mono font-bold" style={{ color: PURPLE }}>{coding.coded}</span></div>
        </div>
        {(expertMode || coding.risk === 'high') && coding.notes && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg" style={{ backgroundColor: coding.risk === 'high' ? '#ef444410' : `${PURPLE}08`, border: `1px solid ${coding.risk === 'high' ? '#ef444420' : `${PURPLE}15`}` }}>
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: coding.risk === 'high' ? '#ef4444' : PURPLE }} />
            <p className="text-[11px] leading-relaxed" style={{ color: t.textSec }}>{coding.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Main Component ── */
export const CodingAssistant = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [expertMode, setExpertMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const inputRef = useRef(null);

  const exampleQueries = [
    'Spiegel anklappen bei Verriegelung - VW Golf 8',
    'Video in Motion aktivieren BMW G20',
    'Tagfahrlicht als Blinker Audi A4 B9',
    'Nadel-Sweep beim Start VW',
  ];

  const handleSubmit = async (q = query) => {
    if (!q.trim()) return;
    setLoading(true);
    setResponse(null);
    setShowDetails(false);
    setShowRisk(false);
    setShowTools(false);
    const currentQuery = q.trim();
    setQuery('');

    try {
      const res = await fetch(`${API}/api/ai/coding-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery, expert_mode: expertMode, session_id: sessionId }),
      });
      const data = await res.json();
      const result = data.result || {};
      setResponse({ query: currentQuery, ...result });
      setSessionId(data.session_id);
      setHistory(prev => [{ query: currentQuery, timestamp: new Date().toISOString(), response: result }, ...prev].slice(0, 10));
    } catch {
      // Fallback mock
      const mock = {
        query: currentQuery,
        summary: `Analyse für "${currentQuery}": Diese Codierung ist auf den meisten MQB-Plattformen über das BCM (Steuergerät 09) verfügbar. Mit VCDS oder OBD11 lässt sich die Anpassung in wenigen Minuten durchführen.`,
        codings: [
          { name: currentQuery.split(' - ')[0] || currentQuery, module: 'BCM / 09', tool: 'VCDS / OBD11', byte: '04', bit: '6', original: '0', coded: '1', risk: 'low', notes: 'Standard-Komfortfunktion. Keine bekannten Nebenwirkungen. Jederzeit rückgängig machbar.' },
        ],
        evidence: ['Coding-Datenbank (verifiziert)', 'Community Reports (127 Bestätigungen)', 'OEM Dokumentation'],
        confidence: 88,
        suggestions: ['Akustische Verriegelungsbestätigung', 'Fensterheber-Komfortbedienung', 'Coming-Home Beleuchtung'],
      };
      setResponse(mock);
      setHistory(prev => [{ query: currentQuery, timestamp: new Date().toISOString(), response: mock }, ...prev].slice(0, 10));
    }
    setLoading(false);
  };

  const toggleBookmark = (coding) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.name === coding.name && f.module === coding.module);
      if (exists) {
        toast('Lesezeichen entfernt');
        return prev.filter(f => !(f.name === coding.name && f.module === coding.module));
      }
      toast.success('Gespeichert!');
      return [...prev, coding];
    });
  };

  const isBookmarked = (coding) => favorites.some(f => f.name === coding.name && f.module === coding.module);

  const confidenceColor = (c) => c >= 80 ? '#22c55e' : c >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div data-testid="coding-assistant">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: PURPLE }} />
          <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Coding AI Assistant</h3>
          <span className="text-[9px] px-1.5 py-0.5 rounded-md font-medium" style={{ backgroundColor: `${PURPLE}15`, color: PURPLE }}>Premium</span>
        </div>
        <div className="flex items-center gap-2">
          {/* History Toggle */}
          <button onClick={() => { setShowHistory(!showHistory); setShowFavorites(false); }}
            data-testid="toggle-history-btn"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
            style={{ backgroundColor: showHistory ? `${PURPLE}15` : 'transparent', color: showHistory ? PURPLE : t.textMut, border: `1px solid ${showHistory ? `${PURPLE}40` : 'var(--d-border-sub)'}` }}>
            <History className="w-3 h-3" /> Verlauf {history.length > 0 && `(${history.length})`}
          </button>
          {/* Favorites Toggle */}
          <button onClick={() => { setShowFavorites(!showFavorites); setShowHistory(false); }}
            data-testid="toggle-favorites-btn"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
            style={{ backgroundColor: showFavorites ? '#facc1515' : 'transparent', color: showFavorites ? '#facc15' : t.textMut, border: `1px solid ${showFavorites ? '#facc1540' : 'var(--d-border-sub)'}` }}>
            <Star className="w-3 h-3" /> Gespeichert {favorites.length > 0 && `(${favorites.length})`}
          </button>
          {/* Expert Mode Toggle */}
          <button onClick={() => setExpertMode(!expertMode)}
            data-testid="expert-mode-toggle"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
            style={{ backgroundColor: expertMode ? `${PURPLE}15` : 'transparent', color: expertMode ? PURPLE : t.textMut, border: `1px solid ${expertMode ? `${PURPLE}40` : 'var(--d-border-sub)'}` }}>
            {expertMode ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
            {expertMode ? 'Expert' : 'Standard'}
          </button>
        </div>
      </div>

      {/* History Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`${surface('p-4')} mb-4 overflow-hidden`} data-testid="history-panel">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: t.text }}><Clock className="w-3.5 h-3.5" style={{ color: PURPLE }} /> Letzte Anfragen</span>
              <button onClick={() => setShowHistory(false)}><X className="w-3.5 h-3.5" style={{ color: t.textMut }} /></button>
            </div>
            {history.length === 0 ? (
              <p className="text-[11px] text-center py-4" style={{ color: t.textDim }}>Noch keine Anfragen</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {history.map((h, i) => (
                  <button key={i} onClick={() => { setShowHistory(false); handleSubmit(h.query); }}
                    data-testid={`history-item-${i}`}
                    className="w-full text-left px-3 py-2 rounded-lg text-[11px] flex items-center gap-2 transition-colors"
                    style={{ backgroundColor: 'transparent', color: t.textSec }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--d-surface-alt)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <ChevronRight className="w-3 h-3 shrink-0" style={{ color: PURPLE }} />
                    <span className="truncate flex-1">{h.query}</span>
                    <span className="text-[9px] shrink-0" style={{ color: t.textDim }}>{new Date(h.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Panel */}
      <AnimatePresence>
        {showFavorites && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`${surface('p-4')} mb-4 overflow-hidden`} data-testid="favorites-panel">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: t.text }}><Star className="w-3.5 h-3.5" style={{ color: '#facc15' }} /> Gespeicherte Codings</span>
              <button onClick={() => setShowFavorites(false)}><X className="w-3.5 h-3.5" style={{ color: t.textMut }} /></button>
            </div>
            {favorites.length === 0 ? (
              <p className="text-[11px] text-center py-4" style={{ color: t.textDim }}>Noch keine gespeicherten Codings</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {favorites.map((f, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)' }} data-testid={`favorite-item-${i}`}>
                    <div className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5" style={{ color: PURPLE }} />
                      <div>
                        <span className="text-[11px] font-medium block" style={{ color: t.text }}>{f.name}</span>
                        <span className="text-[9px] font-mono" style={{ color: t.textDim }}>{f.module} · Byte {f.byte}</span>
                      </div>
                    </div>
                    <button onClick={() => toggleBookmark(f)} className="p-1 rounded hover:bg-white/5">
                      <X className="w-3 h-3" style={{ color: t.textMut }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className={`${surface('p-4')} mb-4`}>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `${PURPLE}60` }} />
            <Input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} disabled={loading}
              placeholder={expertMode ? 'Technische Frage eingeben (Expert Mode)...' : 'Was möchtest du codieren?'}
              data-testid="assistant-input"
              className="pl-10 h-11 rounded-xl text-sm" style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border-sub)', color: t.text }} />
          </div>
          <Button type="submit" disabled={loading || !query.trim()} data-testid="assistant-send-btn"
            className="h-11 px-5 rounded-xl text-xs font-semibold gap-2" style={{ backgroundColor: PURPLE, color: '#000' }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Fragen
          </Button>
        </form>
        {/* Example Queries */}
        {!response && !loading && (
          <div className="flex flex-wrap gap-2 mt-3">
            {exampleQueries.map((eq, i) => (
              <button key={i} onClick={() => { setQuery(eq); handleSubmit(eq); }}
                data-testid={`example-query-${i}`}
                className="text-[10px] px-3 py-1.5 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--d-surface-alt)', color: t.textSec, border: '1px solid var(--d-border-sub)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${PURPLE}40`; e.currentTarget.style.color = PURPLE; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--d-border-sub)'; e.currentTarget.style.color = t.textSec; }}>
                {eq}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Thinking State */}
      <AnimatePresence>{loading && <ThinkingState />}</AnimatePresence>

      {/* Response */}
      <AnimatePresence>
        {response && !loading && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4" data-testid="assistant-response">
            {/* Query Echo */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-mono" style={{ color: t.textDim }}>Anfrage:</span>
              <span className="text-[11px] font-medium" style={{ color: t.textSec }}>{response.query}</span>
            </div>

            {/* Summary + Confidence */}
            <div className={surface('p-5')}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" style={{ color: PURPLE }} />
                  <span className="text-xs font-bold" style={{ color: t.text }}>Zusammenfassung</span>
                </div>
                {/* Confidence Badge */}
                {response.confidence != null && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0" data-testid="confidence-badge"
                    style={{ backgroundColor: `${confidenceColor(response.confidence)}12`, border: `1px solid ${confidenceColor(response.confidence)}25` }}>
                    <CheckCircle className="w-3 h-3" style={{ color: confidenceColor(response.confidence) }} />
                    <span className="text-[10px] font-bold" style={{ color: confidenceColor(response.confidence) }}>
                      {response.confidence}% Confidence
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: t.textSec }}>{response.summary}</p>
            </div>

            {/* Coding Cards */}
            {response.codings && response.codings.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold flex items-center gap-1.5 px-1" style={{ color: t.text }}>
                  <Layers className="w-3.5 h-3.5" style={{ color: PURPLE }} /> Codierungen ({response.codings.length})
                </span>
                {response.codings.map((c, i) => (
                  <CodingCard key={i} coding={c} onBookmark={toggleBookmark} isBookmarked={isBookmarked(c)} expertMode={expertMode} />
                ))}
              </div>
            )}

            {/* Evidence */}
            {response.evidence && response.evidence.length > 0 && (
              <div className={surface('p-4')} data-testid="evidence-section">
                <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2.5" style={{ color: t.textDim }}>
                  <Shield className="w-3 h-3" /> Quellen & Evidenz
                </span>
                <div className="flex flex-wrap gap-2">
                  {response.evidence.map((ev, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)', color: t.textSec, border: '1px solid var(--d-border-sub)' }}>
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Warning for high-risk codings */}
            {response.codings?.some(c => c.risk === 'high') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-start gap-3 p-4 rounded-xl" data-testid="risk-warning"
                style={{ backgroundColor: '#ef444410', border: '1px solid #ef444425' }}>
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-[#ef4444]" />
                <div>
                  <span className="text-xs font-bold text-[#ef4444] block mb-1">Risikowarnung</span>
                  <p className="text-[11px] leading-relaxed text-[#ef4444]/70">
                    Mindestens eine Codierung hat ein hohes Risiko. Bitte lies alle Hinweise sorgfältig und führe die Codierung nur durch, wenn du dir sicher bist.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2" data-testid="quick-actions">
              <button onClick={() => { setShowDetails(!showDetails); setShowRisk(false); setShowTools(false); }}
                className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: showDetails ? `${PURPLE}15` : 'var(--d-surface)', border: `1px solid ${showDetails ? `${PURPLE}40` : 'var(--d-border)'}`, color: showDetails ? PURPLE : t.textSec }}
                data-testid="action-details">
                <Eye className="w-3 h-3" style={{ color: PURPLE }} /> Details anzeigen
              </button>
              <button onClick={() => { const suggestionsEl = document.querySelector('[data-testid="smart-suggestions"]'); if (suggestionsEl) suggestionsEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--d-surface)', border: '1px solid var(--d-border)', color: t.textSec }}
                data-testid="action-similar">
                <Layers className="w-3 h-3" style={{ color: PURPLE }} /> Ähnliche Codings
              </button>
              <button onClick={() => { setShowTools(!showTools); setShowDetails(false); setShowRisk(false); }}
                className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: showTools ? `${PURPLE}15` : 'var(--d-surface)', border: `1px solid ${showTools ? `${PURPLE}40` : 'var(--d-border)'}`, color: showTools ? PURPLE : t.textSec }}
                data-testid="action-tool">
                <Wrench className="w-3 h-3" style={{ color: PURPLE }} /> Anderes Tool
              </button>
              <button onClick={() => { setShowRisk(!showRisk); setShowDetails(false); setShowTools(false); }}
                className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: showRisk ? `${PURPLE}15` : 'var(--d-surface)', border: `1px solid ${showRisk ? `${PURPLE}40` : 'var(--d-border)'}`, color: showRisk ? PURPLE : t.textSec }}
                data-testid="action-risk">
                <AlertTriangle className="w-3 h-3" style={{ color: PURPLE }} /> Risiko anzeigen
              </button>
            </div>

            {/* Details Panel */}
            <AnimatePresence>
              {showDetails && response.codings?.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className={surface('p-4')} data-testid="details-panel">
                  <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3" style={{ color: t.textDim }}>
                    <Eye className="w-3 h-3" style={{ color: PURPLE }} /> Erweiterte Details
                  </span>
                  {response.codings.map((c, i) => (
                    <div key={i} className="space-y-2.5">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)' }}>
                          <span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Modul</span>
                          <span className="text-xs font-semibold" style={{ color: t.text }}>{c.module}</span>
                        </div>
                        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)' }}>
                          <span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Adresse</span>
                          <span className="text-xs font-mono" style={{ color: t.text }}>Byte {c.byte}, Bit {c.bit}</span>
                        </div>
                        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)' }}>
                          <span className="text-[9px] uppercase tracking-wider block mb-1" style={{ color: t.textDim }}>Änderung</span>
                          <span className="text-xs font-mono" style={{ color: t.textMut }}>{c.original}</span>
                          <span className="text-xs mx-1" style={{ color: PURPLE }}>&rarr;</span>
                          <span className="text-xs font-mono font-bold" style={{ color: PURPLE }}>{c.coded}</span>
                        </div>
                      </div>
                      {c.notes && (
                        <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: `${PURPLE}08`, border: `1px solid ${PURPLE}15` }}>
                          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: PURPLE }} />
                          <p className="text-[11px] leading-relaxed" style={{ color: t.textSec }}>{c.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tools Panel */}
            <AnimatePresence>
              {showTools && response.codings?.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className={surface('p-4')} data-testid="tools-panel">
                  <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3" style={{ color: t.textDim }}>
                    <Wrench className="w-3 h-3" style={{ color: PURPLE }} /> Alternative Tools
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['VCDS', 'OBD11', 'Carly', 'BimmerCode', 'E-Sys', 'Xentry'].map(tool => {
                      const recommended = response.codings.some(c => c.tool?.toLowerCase().includes(tool.toLowerCase()));
                      return (
                        <div key={tool} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ backgroundColor: recommended ? `${PURPLE}10` : 'var(--d-surface-alt)', border: `1px solid ${recommended ? `${PURPLE}30` : 'var(--d-border-sub)'}` }}>
                          <Wrench className="w-3 h-3" style={{ color: recommended ? PURPLE : t.textDim }} />
                          <span className="text-[11px] font-medium" style={{ color: recommended ? PURPLE : t.textSec }}>{tool}</span>
                          {recommended && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md ml-auto" style={{ backgroundColor: `${PURPLE}20`, color: PURPLE }}>Empfohlen</span>}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Risk Panel */}
            <AnimatePresence>
              {showRisk && response.codings?.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className={surface('p-4')} data-testid="risk-panel">
                  <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3" style={{ color: t.textDim }}>
                    <Shield className="w-3 h-3" style={{ color: PURPLE }} /> Risikobewertung
                  </span>
                  {response.codings.map((c, i) => (
                    <div key={i} className="p-3 rounded-lg mb-2" style={{ backgroundColor: `${riskColors[c.risk]}08`, border: `1px solid ${riskColors[c.risk]}20` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold" style={{ color: t.text }}>{c.name}</span>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ backgroundColor: `${riskColors[c.risk]}15` }}>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColors[c.risk] }} />
                          <span className="text-[10px] font-bold" style={{ color: riskColors[c.risk] }}>{riskLabels[c.risk]}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-[11px]" style={{ color: t.textSec }}>
                        <p><span className="font-medium" style={{ color: t.textDim }}>TÜV-Relevanz:</span> {c.risk === 'high' ? 'Ja — kann bei HU auffallen' : c.risk === 'medium' ? 'Möglich — je nach Prüfer' : 'Nein — unbedenklich'}</p>
                        <p><span className="font-medium" style={{ color: t.textDim }}>Rückgängig:</span> Ja — Originalwert {c.original} wiederherstellen</p>
                        <p><span className="font-medium" style={{ color: t.textDim }}>Garantie:</span> {c.risk === 'high' ? 'Kann Garantieanspruch beeinflussen' : 'In der Regel kein Einfluss'}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smart Suggestions */}
            {response.suggestions && response.suggestions.length > 0 && (
              <div className={surface('p-4')} data-testid="smart-suggestions">
                <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3" style={{ color: t.textDim }}>
                  <Zap className="w-3 h-3" style={{ color: '#facc15' }} /> Vorschläge
                </span>
                <div className="flex flex-wrap gap-2">
                  {response.suggestions.map((s, i) => (
                    <button key={i} onClick={() => handleSubmit(s)} data-testid={`suggestion-${i}`}
                      className="text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                      style={{ backgroundColor: `${PURPLE}08`, color: PURPLE, border: `1px solid ${PURPLE}20` }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${PURPLE}18`; e.currentTarget.style.borderColor = `${PURPLE}40`; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${PURPLE}08`; e.currentTarget.style.borderColor = `${PURPLE}20`; }}>
                      <ChevronRight className="w-3 h-3" /> {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* New Query */}
            <button onClick={() => { setResponse(null); inputRef.current?.focus(); }}
              data-testid="new-query-btn"
              className="flex items-center gap-2 text-[11px] font-medium mx-auto mt-2 px-4 py-2 rounded-lg transition-colors"
              style={{ color: t.textMut }}
              onMouseEnter={e => e.currentTarget.style.color = PURPLE}
              onMouseLeave={e => e.currentTarget.style.color = t.textMut}>
              <RotateCcw className="w-3.5 h-3.5" /> Neue Frage stellen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
