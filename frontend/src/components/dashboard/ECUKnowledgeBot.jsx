import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Loader2, Cpu, Sparkles, RotateCcw } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const suggestedQuestions = [
  'Kann ich den Bosch MED17 per OBD flashen?',
  'Welches Tool für BMW B58 Motor?',
  'ZF 8HP Tuning — welche Risiken?',
  'Continental SID212 Bench-Methode?',
  'Vergleich KESSv3 vs Autotuner',
];

export const ECUKnowledgeBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ai/ecu-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });
      if (!res.ok) throw new Error('Fehler');
      const data = await res.json();
      setSessionId(data.session_id);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Entschuldigung, es gab einen Fehler. Bitte versuche es erneut.' }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSessionId(null);
  };

  return (
    <div data-testid="ecu-knowledge-bot" className="bg-[#111111] border border-white/10 rounded-2xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#CCFF00]" />
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white">ECU Knowledge Bot</h3>
            <p className="text-white/30 text-[11px]">AI-Experte für Steuergeräte & Tuning</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={resetChat} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center mb-4">
              <Cpu className="w-7 h-7 text-[#CCFF00]/40" />
            </div>
            <p className="text-white/40 text-sm mb-1">Frag mich alles über ECUs, TCUs & Tools</p>
            <p className="text-white/20 text-xs mb-5">z.B. Methoden, Risiken, Kompatibilität</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-[400px]">
              {suggestedQuestions.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)} data-testid={`ecu-suggestion-${i}`}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 text-[11px] hover:border-[#CCFF00]/30 hover:text-white transition-colors text-left">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#CCFF00] text-black rounded-br-md'
                : 'bg-[#0A0A0A] border border-white/5 text-white/70 rounded-bl-md'
            }`}>
              <span className="whitespace-pre-wrap">{msg.content}</span>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-white/50" />
              </div>
            )}
          </motion.div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            </div>
            <div className="px-4 py-3 bg-[#0A0A0A] border border-white/5 rounded-2xl rounded-bl-md">
              <Loader2 className="w-4 h-4 text-[#CCFF00] animate-spin" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
          <Input data-testid="ecu-chat-input" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Frag mich etwas über ECUs, Tools oder Methoden..."
            className="flex-1 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/25 rounded-xl h-10 text-sm" disabled={loading} />
          <Button data-testid="ecu-chat-send" type="submit" disabled={!input.trim() || loading}
            className="bg-[#CCFF00] text-black hover:bg-[#b8e600] rounded-xl h-10 w-10 p-0 disabled:opacity-30">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
