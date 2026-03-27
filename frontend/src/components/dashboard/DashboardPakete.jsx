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
    id: 'starter',
    name: 'Starter',
    sub: 'Für Einzelhändler',
    price: 49,
    icon: Rocket,
    color: BLUE,
    popular: false,
    features: [
      { text: 'Bis zu 50 Fahrzeuge', included: true },
      { text: 'Deal Analyzer (10/Monat)', included: true },
      { text: 'Marktwert-Check', included: true },
      { text: 'Basic Alerts (5 aktive)', included: true },
      { text: 'Dashboard Übersicht', included: true },
      { text: 'Email Support', included: true },
      { text: 'Preis-Tracker', included: false },
      { text: 'Flotten-Management', included: false },
      { text: 'API-Zugang', included: false },
      { text: 'Markt-Reports', included: false },
      { text: 'Tuning Intelligence', included: false },
      { text: 'Dedicated Support', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    sub: 'Für mittelgroße Händler',
    price: 149,
    icon: Zap,
    color: GREEN,
    popular: true,
    features: [
      { text: 'Bis zu 500 Fahrzeuge', included: true },
      { text: 'Deal Analyzer (unbegrenzt)', included: true },
      { text: 'Marktwert-Check', included: true },
      { text: 'Smart Alerts (50 aktive)', included: true },
      { text: 'Vollständiges Dashboard', included: true },
      { text: 'Priority Email Support', included: true },
      { text: 'Preis-Tracker (20 Fahrzeuge)', included: true },
      { text: 'Flotten-Management (Basic)', included: true },
      { text: 'API-Zugang (1.000 Calls/Tag)', included: true },
      { text: 'Markt-Reports (5/Monat)', included: true },
      { text: 'Tuning Intelligence', included: false },
      { text: 'Dedicated Support', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    sub: 'Für Großhändler & Ketten',
    price: null,
    icon: Crown,
    color: '#c084fc',
    popular: false,
    features: [
      { text: 'Unbegrenzte Fahrzeuge', included: true },
      { text: 'Deal Analyzer (unbegrenzt)', included: true },
      { text: 'Marktwert-Check', included: true },
      { text: 'Smart Alerts (unbegrenzt)', included: true },
      { text: 'Vollständiges Dashboard', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Preis-Tracker (unbegrenzt)', included: true },
      { text: 'Flotten-Management (Erweitert)', included: true },
      { text: 'API-Zugang (unbegrenzt)', included: true },
      { text: 'Markt-Reports (unbegrenzt)', included: true },
      { text: 'Tuning Intelligence (Full)', included: true },
      { text: 'Dedicated Support + SLA', included: true },
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
      { feature: 'Fahrzeug-Listings', starter: '50', pro: '500', enterprise: 'Unbegrenzt' },
      { feature: 'Deal Analyzer', starter: '10/Mo.', pro: 'Unbegrenzt', enterprise: 'Unbegrenzt' },
      { feature: 'Aktive Alerts', starter: '5', pro: '50', enterprise: 'Unbegrenzt' },
      { feature: 'Dashboard-Module', starter: 'Basic', pro: 'Alle', enterprise: 'Alle + Custom' },
    ],
  },
  {
    name: 'Daten & API',
    rows: [
      { feature: 'API-Calls/Tag', starter: '-', pro: '1.000', enterprise: 'Unbegrenzt' },
      { feature: 'Preis-Tracker', starter: '-', pro: '20 Fahrzeuge', enterprise: 'Unbegrenzt' },
      { feature: 'Markt-Reports', starter: '-', pro: '5/Mo.', enterprise: 'Unbegrenzt' },
      { feature: 'Daten-Export', starter: '-', pro: 'CSV', enterprise: 'CSV/Excel/API' },
    ],
  },
  {
    name: 'Support & SLA',
    rows: [
      { feature: 'Support-Kanal', starter: 'Email', pro: 'Priority Email', enterprise: 'Dedicated Manager' },
      { feature: 'Response Time', starter: '48h', pro: '12h', enterprise: '2h SLA' },
      { feature: 'Onboarding', starter: 'Self-Service', pro: 'Guided Setup', enterprise: 'White-Glove' },
      { feature: 'Uptime SLA', starter: '99%', pro: '99.5%', enterprise: '99.9%' },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan, i) => {
          const Icon = plan.icon;
          const displayPrice = plan.price ? getPrice(plan.price) : null;
          return (
            <motion.div key={plan.id} data-testid={`plan-card-${plan.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`${surface()} overflow-hidden relative ${plan.popular ? 'ring-1' : ''}`}
              style={plan.popular ? { borderColor: GREEN, boxShadow: `0 0 20px ${GREEN}10` } : {}}>
              {plan.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold" style={{ backgroundColor: GREEN, color: '#000' }}>
                  Beliebt
                </div>
              )}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${plan.color}12` }}>
                    <Icon className="w-5 h-5" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>{plan.name}</h3>
                    <p className="text-[10px]" style={{ color: t.textDim }}>{plan.sub}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  {displayPrice ? (
                    <div className="flex items-end gap-1">
                      <span className="font-['Orbitron'] text-3xl font-bold" style={{ color: t.text }}>€{displayPrice}</span>
                      <span className="text-xs mb-1" style={{ color: t.textMut }}>/ Monat</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-['Orbitron'] text-lg font-bold" style={{ color: t.text }}>Individuell</span>
                      <p className="text-[10px] mt-0.5" style={{ color: t.textDim }}>Kontaktiere uns für ein Angebot</p>
                    </div>
                  )}
                  {billing === 'yearly' && displayPrice && (
                    <p className="text-[10px] mt-1" style={{ color: GREEN }}>Spare €{(plan.price - displayPrice) * 12}/Jahr</p>
                  )}
                </div>

                {/* CTA */}
                <Button data-testid={`plan-cta-${plan.id}`}
                  className="w-full h-10 text-xs font-semibold rounded-xl mb-5 gap-2"
                  style={plan.popular
                    ? { backgroundColor: GREEN, color: '#000' }
                    : plan.price === null
                      ? { backgroundColor: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}30` }
                      : { backgroundColor: `${BLUE}15`, color: BLUE, border: `1px solid ${BLUE}30` }
                  }>
                  {plan.price === null ? (
                    <><Headphones className="w-3.5 h-3.5" /> Kontakt aufnehmen</>
                  ) : plan.popular ? (
                    <><Zap className="w-3.5 h-3.5" /> Jetzt starten</>
                  ) : (
                    <><ArrowRight className="w-3.5 h-3.5" /> Auswählen</>
                  )}
                </Button>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2.5 text-xs">
                      {f.included ? (
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: plan.color }} />
                      ) : (
                        <X className="w-3.5 h-3.5 shrink-0" style={{ color: t.textDim }} />
                      )}
                      <span style={{ color: f.included ? t.textSec : t.textDim }}>{f.text}</span>
                    </div>
                  ))}
                </div>
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
                            <th className="text-left py-2 px-3 font-medium w-[200px]" style={{ color: t.textDim }}>Feature</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: BLUE }}>Starter</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: GREEN }}>Professional</th>
                            <th className="text-center py-2 px-3 font-medium" style={{ color: '#c084fc' }}>Enterprise</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cat.rows.map((row, ri) => (
                            <tr key={row.feature} data-testid={`comparison-row-${ci}-${ri}`}
                              style={{ borderTop: '1px solid var(--d-border-sub)' }}>
                              <td className="py-2.5 px-3 font-medium" style={{ color: t.textSec }}>{row.feature}</td>
                              <td className="py-2.5 px-3 text-center" style={{ color: row.starter === '-' ? t.textDim : t.text }}>{row.starter}</td>
                              <td className="py-2.5 px-3 text-center font-medium" style={{ color: t.text }}>{row.pro}</td>
                              <td className="py-2.5 px-3 text-center font-medium" style={{ color: t.text }}>{row.enterprise}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
