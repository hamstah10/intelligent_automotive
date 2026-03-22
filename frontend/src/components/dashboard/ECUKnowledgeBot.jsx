import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Loader2, Cpu, Sparkles, RotateCcw } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AIChatBubbleRenderer } from '../landing/AIResponseRenderer';
import { t, surface } from './themeUtils';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const suggestions = [
  'Was ist OBD-Tuning?',
  'Bosch MG1CS003 Infos',
  'Risiko Bench vs Boot',
  'ZF 8HP TCU Optionen',
];

export const ECUKnowledgeBot = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hallo! Ich bin der ECU Knowledge Bot. Frag mich alles über Steuergeräte, Tuning-Tools und Methoden.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/ai/ecu-chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), session_id: sessionId }),
      });
      if (!res.ok) throw new Error('Fehler');
      const data = await res.json();
      if (data.session_id) setSessionId(data.session_id);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Entschuldigung, ich konnte die Anfrage nicht verarbeiten.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="h-full flex flex-col rounded-2xl transition-colors duration-300" style={{ backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between shrink-0" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center"><Cpu className="w-[18px] h-[18px] text-[#CCFF00]" /></div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-sm font-bold" style={{ color: t.text }}>ECU Knowledge Bot</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px]" style={{ color: t.textMut }}>GPT-4o · Online</span>
            </div>
          </div>
        </div>
        <button onClick={() => { setMessages([{ role: 'assistant', content: 'Hallo! Ich bin der ECU Knowledge Bot. Frag mich alles über Steuergeräte, Tuning-Tools und Methoden.' }]); setSessionId(null); }}
          className="p-2 rounded-lg transition-colors" style={{ color: t.textMut }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--d-hover)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[350px] max-h-[450px] custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-[#CCFF00]" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#CCFF00] text-black rounded-br-md'
                  : 'rounded-bl-md'
              }`} style={msg.role === 'assistant' ? { backgroundColor: 'var(--d-surface-alt)', border: `1px solid ${t.borderSub}`, color: t.textSec } : {}}>
                {msg.role === 'assistant' ? (
                  <AIChatBubbleRenderer content={msg.content} />
                ) : (
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-[#00E5FF]" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center shrink-0"><Bot className="w-3.5 h-3.5 text-[#CCFF00]" /></div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2" style={{ backgroundColor: 'var(--d-surface-alt)', border: `1px solid ${t.borderSub}` }}>
              <Loader2 className="w-3.5 h-3.5 text-[#CCFF00] animate-spin" /><span className="text-xs" style={{ color: t.textMut }}>Denke nach...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {suggestions.map((s, i) => (
            <button key={i} data-testid={`ecu-suggestion-${i}`} onClick={() => sendMessage(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ backgroundColor: 'var(--d-hover)', color: 'var(--d-text-sec)', border: `1px solid ${t.border}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#CCFF00'; e.currentTarget.style.color = '#CCFF00'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = 'var(--d-text-sec)'; }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-3 flex items-center gap-2" style={{ borderTop: `1px solid ${t.border}` }}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Frag mich etwas über ECUs..."
          className="flex-1 rounded-lg h-10 text-sm transition-colors duration-300"
          style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: t.borderSub, color: t.text }}
          disabled={loading} />
        <Button type="submit" size="sm" disabled={loading || !input.trim()} className="bg-[#CCFF00] text-black hover:bg-[#b8e600] rounded-lg h-10 w-10 p-0 disabled:opacity-30">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
