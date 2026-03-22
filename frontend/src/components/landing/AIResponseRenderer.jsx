import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Shield, Target, Zap, Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const extractScore = (text) => {
  if (!text) return null;
  const patterns = [
    /Deal[\s-]*Score[:\s]*(\d{1,3})\s*(?:\/\s*100|von\s*100)?/i,
    /Score[:\s]*(\d{1,3})\s*(?:\/\s*100|von\s*100)?/i,
    /(\d{1,3})\s*\/\s*100/,
    /Bewertung[:\s]*(\d{1,3})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m && parseInt(m[1]) <= 100) return parseInt(m[1]);
  }
  return null;
};

const extractRecommendation = (text) => {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (lower.includes('kaufen') || lower.includes('zuschlagen') || lower.includes('top-deal')) return { label: 'Kaufen', type: 'positive' };
  if (lower.includes('finger weg') || lower.includes('nicht empfohlen') || lower.includes('abraten')) return { label: 'Finger weg', type: 'negative' };
  if (lower.includes('abwarten') || lower.includes('verhandeln') || lower.includes('beobachten')) return { label: 'Abwarten', type: 'neutral' };
  return null;
};

const ScoreBadge = ({ score, accentColor = '#00E5FF' }) => {
  const getScoreConfig = (s) => {
    if (s >= 80) return { label: 'Sehr gut', color: '#22c55e', icon: TrendingUp, bg: 'rgba(34,197,94,0.12)' };
    if (s >= 60) return { label: 'Gut', color: '#00E5FF', icon: CheckCircle2, bg: 'rgba(0,229,255,0.12)' };
    if (s >= 40) return { label: 'Mittel', color: '#facc15', icon: AlertTriangle, bg: 'rgba(250,204,21,0.12)' };
    return { label: 'Schwach', color: '#f87171', icon: TrendingDown, bg: 'rgba(248,113,113,0.12)' };
  };

  const config = getScoreConfig(score);
  const Icon = config.icon;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4 p-4 bg-[#0A0A0A] border border-white/10 rounded-2xl" data-testid="ai-score-badge">
      <div className="relative w-20 h-20 shrink-0">
        <svg width="80" height="80" className="-rotate-90">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
          <circle cx="40" cy="40" r="36" fill="none" stroke={config.color} strokeWidth="5"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-['Orbitron'] text-base font-bold text-white">{score}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4" style={{ color: config.color }} />
          <span className="font-['Orbitron'] text-sm font-bold" style={{ color: config.color }}>{config.label}</span>
        </div>
        <span className="text-white/40 text-xs">Deal Score</span>
      </div>
    </div>
  );
};

const RecommendationBadge = ({ rec }) => {
  const configs = {
    positive: { icon: ThumbsUp, color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)' },
    negative: { icon: ThumbsDown, color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.25)' },
    neutral: { icon: Minus, color: '#facc15', bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.25)' },
  };
  const c = configs[rec.type];
  const Icon = c.icon;

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium"
      style={{ backgroundColor: c.bg, borderColor: c.border, color: c.color }}
      data-testid="ai-recommendation-badge">
      <Icon className="w-4 h-4" />
      <span>{rec.label}</span>
    </div>
  );
};

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="font-['Orbitron'] text-base font-bold text-white mt-5 mb-2 flex items-center gap-2">
      <Star className="w-5 h-5 text-[#CCFF00] shrink-0" />
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-['Orbitron'] text-base font-bold text-white mt-4 mb-2 flex items-center gap-2">
      <Zap className="w-4 h-4 text-[#00E5FF] shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-['Orbitron'] text-sm font-bold text-white/90 mt-3 mb-1.5 flex items-center gap-2">
      <Target className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-['Orbitron'] text-sm font-semibold text-white/80 mt-2 mb-1">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-white/60 text-sm leading-relaxed mb-2">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-[#00E5FF] not-italic font-medium">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 my-2 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 my-2 ml-1 counter-reset-list">{children}</ol>
  ),
  li: ({ children, ordered, index }) => (
    <li className="flex items-start gap-2 text-sm text-white/60">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0" />
      <span className="leading-relaxed">{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#CCFF00]/40 pl-4 my-3 bg-[#CCFF00]/5 rounded-r-xl py-2 pr-3">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 bg-white/10 border border-white/5 rounded-md text-[#CCFF00] text-xs font-mono">
          {children}
        </code>
      );
    }
    return (
      <pre className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 my-3 overflow-x-auto">
        <code className="text-[#CCFF00] text-xs font-mono">{children}</code>
      </pre>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-3 rounded-xl border border-white/10">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/5">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-white/70 font-semibold text-xs border-b border-white/10">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-white/50 text-xs border-b border-white/5">{children}</td>
  ),
  hr: () => (
    <hr className="border-white/10 my-4" />
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-[#00E5FF] hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

export const AIResponseRenderer = ({ content, showScore = true, showRecommendation = true, accentColor = '#00E5FF' }) => {
  if (!content) return null;

  const score = showScore ? extractScore(content) : null;
  const recommendation = showRecommendation ? extractRecommendation(content) : null;

  return (
    <div data-testid="ai-response-renderer">
      {/* Score + Recommendation Badges */}
      {(score || recommendation) && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {score && <ScoreBadge score={score} accentColor={accentColor} />}
          {recommendation && <RecommendationBadge rec={recommendation} />}
        </div>
      )}

      {/* Rendered Markdown */}
      <div className="ai-markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export const AIChatBubbleRenderer = ({ content }) => {
  if (!content) return null;

  const chatComponents = {
    ...markdownComponents,
    p: ({ children }) => (
      <p className="text-white/70 text-sm leading-relaxed mb-1.5 last:mb-0">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="font-['Orbitron'] text-sm font-bold text-white mt-2 mb-1 flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-['Orbitron'] text-sm font-bold text-white/90 mt-2 mb-1 flex items-center gap-1.5">
        <Target className="w-3 h-3 text-[#CCFF00] shrink-0" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-['Orbitron'] text-xs font-bold text-white/80 mt-1.5 mb-1">{children}</h3>
    ),
    ul: ({ children }) => (
      <ul className="space-y-1 my-1 ml-1">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-1.5 text-xs text-white/60">
        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#CCFF00] shrink-0" />
        <span className="leading-relaxed">{children}</span>
      </li>
    ),
  };

  return (
    <div className="ai-chat-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={chatComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
