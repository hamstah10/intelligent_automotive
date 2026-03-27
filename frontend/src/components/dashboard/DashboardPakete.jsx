import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Zap, Crown, Building2, Rocket, Plus, ShoppingCart,
  Car, Search, BarChart3, Cpu, Globe, Users, Shield, Headphones,
  TrendingUp, Bell, FileText, Database, ArrowRight, Star, Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { t, surface, surfaceAlt } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

/* ── Plans ── */
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    sub: 'Perfekt für Einsteiger',
    price: 49,
    icon: Rocket,
    color: 'rgba(255,255,255,0.3)',
    popular: false,
    cta: 'Jetzt starten',
    ctaIcon: ArrowRight,
    features: [
      'Market Intelligence Zugang',
      '1.000 Listings/Monat',
      'Basic Deal Score',
      '3 Suchprofile',
      'E-Mail Alerts',
      'Standard Support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    sub: 'Für professionelle Händler',
    price: 99,
    icon: Zap,
    color: BLUE,
    popular: false,
    cta: 'Jetzt starten',
    ctaIcon: Zap,
    features: [
      'Alles aus Basic',
      '10.000 Listings/Monat',
      'Advanced Deal Score',
      'Unbegrenzte Suchprofile',
      'Real-time Alerts',
      'API Zugang',
      'Priority Support',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    sub: 'Maximale Power',
    price: 199,
    icon: Crown,
    color: BLUE,
    popular: false,
    cta: 'Kontakt aufnehmen',
    ctaIcon: Headphones,
    features: [
      'Alles aus Pro',
      'Unbegrenzte Listings',
      'Konkurrenz-Monitoring',
      'Custom Alerts',
      'Dedicated Account Manager',
      'White-Label Reports',
    ],
  },
  {
    id: 'combined',
    name: 'Combined',
    sub: 'Market + Tuning Intelligence',
    price: 299,
    icon: Star,
    color: GREEN,
    popular: true,
    cta: 'Demo buchen',
    ctaIcon: Sparkles,
    features: [
      'Vollständiger Market Zugang',
      'Vollständiger Tuning Zugang',
      'ECU/TCU Datenbank',
      'Tool Matrix & Protokolle',
      'Cross-Platform Insights',
      'Enterprise Support',
      'Custom Integrationen',
    ],
  },
];

/* ── Addons ── */
const addons = [
  { id: 'mobile-api', name: 'mobile.de API', desc: 'Live-Anbindung an mobile.de Listings', price: 29, icon: Globe, color: BLUE, tag: 'Beliebt' },
  { id: 'autoscout-api', name: 'AutoScout24 API', desc: 'Zusätzliche Datenquelle für Marktanalyse', price: 29, icon: Globe, color: BLUE, tag: null },
  { id: 'tuning-module', name: 'Tuning Intelligence', desc: 'ECU-Datenbank, Tuning-Empfehlungen & Prognosen', price: 49, icon: Cpu, color: GREEN, tag: 'Pro' },
  { id: 'reports', name: 'Erweiterte Reports', desc: 'Automatische PDF-Reports + White-Label', price: 19, icon: FileText, color: '#facc15', tag: null },
  { id: 'fleet', name: 'Flotten-Erweiterung', desc: 'Erweiterte Flotte, Kostenkalkulation, Wartungsplaner', price: 39, icon: Car, color: '#c084fc', tag: null },
  { id: 'alerts-pro', name: 'Alerts Pro', desc: 'Unbegrenzte Alerts + Telegram/WhatsApp Push', price: 15, icon: Bell, color: '#f87171', tag: 'Neu' },
  { id: 'multi-tenant', name: 'Multi-Standort', desc: 'Mehrere Standorte separat verwalten', price: 59, icon: Building2, color: BLUE, tag: 'Enterprise' },
  { id: 'db-export', name: 'Daten-Export', desc: 'CSV/Excel/API Export aller Daten', price: 9, icon: Database, color: GREEN, tag: null },
];

/* ── Comparison Table ── */
const comparisonCategories = [
  {
    name: 'Kernfunktionen',
    rows: [
      { feature: 'Listings/Monat', basic: '1.000', pro: '10.000', elite: 'Unbegrenzt', combined: 'Unbegrenzt' },
      { feature: 'Deal Score', basic: 'Basic', pro: 'Advanced', elite: 'Advanced', combined: 'Advanced' },
      { feature: 'Suchprofile', basic: '3', pro: 'Unbegrenzt', elite: 'Unbegrenzt', combined: 'Unbegrenzt' },
      { feature: 'Tuning Zugang', basic: '-', pro: '-', elite: '-', combined: 'Vollständig' },
    ],
  },
  {
    name: 'Daten & API',
    rows: [
      { feature: 'API Zugang', basic: '-', pro: 'Ja', elite: 'Ja', combined: 'Ja' },
      { feature: 'White-Label Reports', basic: '-', pro: '-', elite: 'Ja', combined: 'Ja' },
      { feature: 'ECU/TCU Datenbank', basic: '-', pro: '-', elite: '-', combined: 'Ja' },
      { feature: 'Custom Integrationen', basic: '-', pro: '-', elite: '-', combined: 'Ja' },
    ],
  },
  {
    name: 'Support & SLA',
    rows: [
      { feature: 'Support-Kanal', basic: 'Standard', pro: 'Priority', elite: 'Dedicated', combined: 'Enterprise' },
      { feature: 'Account Manager', basic: '-', pro: '-', elite: 'Ja', combined: 'Ja' },
      { feature: 'Alerts', basic: 'E-Mail', pro: 'Real-time', elite: 'Custom', combined: 'Custom' },
      { feature: 'Konkurrenz-Monitoring', basic: '-', pro: '-', elite: 'Ja', combined: 'Ja' },
    ],
  },
];

const fmt = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const DashboardPakete = () => {
  const [billing, setBilling] = useState('monthly');
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const toggleAddon = (id) => setSelectedAddons(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const yearDiscount = 0.8;
  const getPrice = (p) => billing === 'yearly' ? Math.round(p * yearDiscount) : p;
  const addonTotal = [...selectedAddons].reduce((sum, id) => sum + (addons.find(a => a.id === id)?.price || 0), 0);

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 data-testid="pakete-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Pakete & Addons</h1>
        <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Wähle das passende Paket für deinen Betrieb — jederzeit skalierbar</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--d-border)' }} data-testid="billing-toggle">
          {[
            { id: 'monthly', label: 'Monatlich' },
            { id: 'yearly', label: 'Jährlich', badge: '-20%' },
          ].map(b => (
            <button key={b.id} data-testid={`billing-${b.id}`} onClick={() => setBilling(b.id)}
              className="px-5 py-2.5 text-xs font-medium transition-all flex items-center gap-2"
              style={billing === b.id ? { backgroundColor: GREEN, color: '#000' } : { backgroundColor: 'var(--d-surface)', color: t.textSec }}>
              {b.label}
              {b.badge && <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={billing === b.id ? { backgroundColor: 'rgba(0,0,0,0.15)' } : { backgroundColor: `${GREEN}15`, color: GREEN }}>{b.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {plans.map((plan, i) => {
          const Icon = plan.icon;
          const CtaIcon = plan.ctaIcon;
          const displayPrice = getPrice(plan.price);
          return (
            <motion.div key={plan.id} data-testid={`plan-card-${plan.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`${surface()} overflow-hidden relative ${plan.popular ? 'ring-1' : plan.color === BLUE ? 'ring-1' : ''}`}
              style={plan.popular ? { borderColor: GREEN, boxShadow: `0 0 20px ${GREEN}10` } : plan.color === BLUE && plan.id === 'pro' ? { borderColor: `${BLUE}40` } : {}}>
              {plan.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold flex items-center gap-1" style={{ backgroundColor: GREEN, color: '#000' }}>
                  <Zap className="w-3 h-3" /> Beliebt
                </div>
              )}
              <div className="p-6">
                {/* Header */}
                <div className="mb-1">
                  <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>{plan.name}</h3>
                  <p className="text-[10px] mt-0.5" style={{ color: t.textDim }}>{plan.sub}</p>
                </div>

                {/* Price */}
                <div className="mb-5 mt-4">
                  <div className="flex items-end gap-1">
                    <span className="font-['Orbitron'] text-3xl font-bold" style={{ color: t.text }}>€{displayPrice}</span>
                    <span className="text-xs mb-1" style={{ color: t.textMut }}>/Monat</span>
                  </div>
                  {billing === 'yearly' && (
                    <p className="text-[10px] mt-1" style={{ color: GREEN }}>Spare €{(plan.price - displayPrice) * 12}/Jahr</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2.5 text-xs">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: plan.popular ? GREEN : plan.color === BLUE ? BLUE : 'rgba(255,255,255,0.4)' }} />
                      <span style={{ color: t.textSec }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button data-testid={`plan-cta-${plan.id}`}
                  className="w-full h-10 text-xs font-semibold rounded-xl gap-2"
                  style={plan.popular
                    ? { backgroundColor: GREEN, color: '#000' }
                    : plan.id === 'pro'
                      ? { backgroundColor: `${BLUE}15`, color: BLUE, border: `1px solid ${BLUE}30` }
                      : plan.id === 'elite'
                        ? { backgroundColor: `${BLUE}10`, color: BLUE, border: `1px solid ${BLUE}20` }
                        : { backgroundColor: 'var(--d-surface-alt)', color: t.textSec, border: '1px solid var(--d-border)' }
                  }>
                  <CtaIcon className="w-3.5 h-3.5" /> {plan.cta}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Addons Section */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>Addons</h2>
            <p className="text-xs mt-0.5" style={{ color: t.textMut }}>Erweitere dein Paket mit zusätzlichen Modulen</p>
          </div>
          {selectedAddons.size > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ backgroundColor: `${GREEN}10`, border: `1px solid ${GREEN}25` }}>
              <ShoppingCart className="w-3.5 h-3.5" style={{ color: GREEN }} />
              <span className="text-xs font-semibold" style={{ color: GREEN }}>{selectedAddons.size} Addons · +{fmt(getPrice(addonTotal))}/Mo.</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" data-testid="addons-grid">
          {addons.map((addon, i) => {
            const Icon = addon.icon;
            const isSelected = selectedAddons.has(addon.id);
            return (
              <motion.button key={addon.id} data-testid={`addon-${addon.id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.04 }}
                onClick={() => toggleAddon(addon.id)}
                className={`${surface('p-4 text-left w-full')} ${isSelected ? 'ring-1' : ''}`}
                style={isSelected ? { borderColor: addon.color, boxShadow: `0 0 12px ${addon.color}10` } : {}}>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${addon.color}12` }}>
                    <Icon className="w-4 h-4" style={{ color: addon.color }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {addon.tag && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: `${addon.color}15`, color: addon.color }}>{addon.tag}</span>
                    )}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${isSelected ? '' : ''}`}
                      style={isSelected ? { backgroundColor: addon.color } : { border: '1px solid var(--d-border)', backgroundColor: 'transparent' }}>
                      {isSelected && <Check className="w-3 h-3 text-black" />}
                    </div>
                  </div>
                </div>
                <h4 className="text-xs font-semibold mb-0.5" style={{ color: isSelected ? addon.color : t.text }}>{addon.name}</h4>
                <p className="text-[10px] mb-2 leading-relaxed" style={{ color: t.textDim }}>{addon.desc}</p>
                <div className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>
                  +€{getPrice(addon.price)}<span className="text-[10px] font-normal" style={{ color: t.textMut }}>/Mo.</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Comparison Table Toggle */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <button data-testid="toggle-comparison" onClick={() => setShowComparison(!showComparison)}
          className={`w-full ${surface('p-4')} flex items-center justify-between cursor-pointer`}>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" style={{ color: BLUE }} />
            <span className="text-sm font-semibold" style={{ color: t.text }}>Feature-Vergleichstabelle</span>
          </div>
          <motion.div animate={{ rotate: showComparison ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className="w-4 h-4" style={{ color: t.textMut }} />
          </motion.div>
        </button>

        <AnimatePresence>
          {showComparison && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
              className="overflow-hidden">
              <div className={surface('p-5 mt-1')} data-testid="comparison-table">
                {comparisonCategories.map((cat, ci) => (
                  <div key={cat.name} className={ci > 0 ? 'mt-5' : ''}>
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: t.textMut }}>{cat.name}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr>
                            <th className="text-left py-2 px-3 font-medium w-[180px]" style={{ color: t.textDim }}>Feature</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: t.textSec }}>Basic</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: BLUE }}>Pro</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: BLUE }}>Elite</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: GREEN }}>Combined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cat.rows.map((row, ri) => (
                            <tr key={row.feature} data-testid={`comparison-row-${ci}-${ri}`}
                              style={{ borderTop: '1px solid var(--d-border-sub)' }}>
                              <td className="py-2.5 px-3 font-medium" style={{ color: t.textSec }}>{row.feature}</td>
                              <td className="py-2.5 px-3 text-center" style={{ color: row.basic === '-' ? t.textDim : t.text }}>{row.basic}</td>
                              <td className="py-2.5 px-3 text-center font-medium" style={{ color: row.pro === '-' ? t.textDim : t.text }}>{row.pro}</td>
                              <td className="py-2.5 px-3 text-center font-medium" style={{ color: row.elite === '-' ? t.textDim : t.text }}>{row.elite}</td>
                              <td className="py-2.5 px-3 text-center font-medium" style={{ color: row.combined === '-' ? t.textDim : t.text }}>{row.combined}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Footer Note */}
                <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid var(--d-border-sub)' }}>
                  <p className="text-[11px]" style={{ color: t.textDim }}>
                    Alle Preise zzgl. MwSt. · Monatlich kündbar · 14 Tage Geld-zurück-Garantie
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
