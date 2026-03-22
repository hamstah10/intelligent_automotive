import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Car, MapPin, Gauge, Euro, Loader2, TrendingUp, TrendingDown, Shield, Target, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AIResponseRenderer } from './AIResponseRenderer';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AIDealAnalyzer = () => {
  const [formData, setFormData] = useState({ brand: '', model: '', year: 2022, km: 50000, price: 30000, location: '' });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.brand || !formData.model) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch(`${API_URL}/api/ai/deal-analyzer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, year: parseInt(formData.year), km: parseInt(formData.km), price: parseInt(formData.price) }),
      });
      if (!res.ok) throw new Error('Analyse fehlgeschlagen');
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Analyse konnte nicht durchgeführt werden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const quickExamples = [
    { brand: 'BMW', model: '320d Touring', year: 2021, km: 45000, price: 28900, location: 'München' },
    { brand: 'VW', model: 'Golf GTI', year: 2022, km: 22000, price: 29900, location: 'Frankfurt' },
    { brand: 'Porsche', model: 'Macan S', year: 2020, km: 55000, price: 48500, location: 'Stuttgart' },
  ];

  return (
    <section data-testid="ai-deal-analyzer" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-full mb-6">
            <Brain className="w-4 h-4 text-[#CCFF00]" />
            <span className="text-[#CCFF00] text-sm font-medium">AI-Powered</span>
          </div>
          <h2 className="font-['Orbitron'] text-2xl sm:text-3xl font-bold text-white mb-4">
            AI Deal Analyzer
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Gib ein Fahrzeugangebot ein und erhalte sofort eine KI-gestützte Bewertung mit Deal Score, Marktvergleich und Empfehlung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Marke</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input data-testid="deal-brand" placeholder="BMW" value={formData.brand} onChange={(e) => setFormData(p => ({ ...p, brand: e.target.value }))}
                      className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/20 rounded-lg h-10 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Modell</label>
                  <Input data-testid="deal-model" placeholder="320d Touring" value={formData.model} onChange={(e) => setFormData(p => ({ ...p, model: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/20 rounded-lg h-10 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Baujahr</label>
                  <Input data-testid="deal-year" type="number" value={formData.year} onChange={(e) => setFormData(p => ({ ...p, year: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white rounded-lg h-10 text-sm" />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">KM-Stand</label>
                  <Input data-testid="deal-km" type="number" value={formData.km} onChange={(e) => setFormData(p => ({ ...p, km: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white rounded-lg h-10 text-sm" />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Preis (€)</label>
                  <Input data-testid="deal-price" type="number" value={formData.price} onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white rounded-lg h-10 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1.5 block">Standort (optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input data-testid="deal-location" placeholder="z.B. München" value={formData.location} onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                    className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/20 rounded-lg h-10 text-sm" />
                </div>
              </div>
              <Button data-testid="deal-analyze-btn" type="submit" disabled={loading || !formData.brand || !formData.model}
                className="w-full bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-11 text-sm gap-2 disabled:opacity-50">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analysiere...</> : <><Sparkles className="w-4 h-4" />Deal analysieren</>}
              </Button>
            </form>

            {/* Quick Examples */}
            <div className="mt-5 pt-5 border-t border-white/5">
              <p className="text-white/30 text-xs mb-3">Schnellbeispiele:</p>
              <div className="flex flex-wrap gap-2">
                {quickExamples.map((ex, i) => (
                  <button key={i} onClick={() => setFormData(ex)} data-testid={`deal-example-${i}`}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 text-xs hover:border-[#CCFF00]/30 hover:text-white transition-colors">
                    {ex.brand} {ex.model}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 bg-[#111111] border border-white/10 rounded-2xl p-6 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {!analysis && !loading && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-[#CCFF00]/40" />
                    </div>
                    <p className="text-white/30 text-sm">Gib ein Fahrzeug ein und lass die AI den Deal bewerten.</p>
                    <p className="text-white/20 text-xs mt-1">Oder nutze ein Schnellbeispiel links.</p>
                  </div>
                </motion.div>
              )}
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#CCFF00] animate-spin mx-auto mb-4" />
                    <p className="text-white/50 text-sm">AI analysiert den Deal...</p>
                    <p className="text-white/25 text-xs mt-1">Marktdaten werden verglichen</p>
                  </div>
                </motion.div>
              )}
              {error && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center">
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}
              {analysis && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="max-h-[500px] overflow-y-auto custom-scrollbar">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#CCFF00]" />
                    <h3 className="font-['Orbitron'] text-sm font-bold text-white">AI-Analyse</h3>
                  </div>
                  <div data-testid="deal-analysis-result">
                    <AIResponseRenderer content={analysis} showScore={true} showRecommendation={true} accentColor="#CCFF00" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
