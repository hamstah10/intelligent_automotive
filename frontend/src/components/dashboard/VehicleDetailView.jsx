import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Star, StarOff, ChevronLeft, ChevronRight, MapPin, Calendar,
  Gauge, Car, Euro, Clock, TrendingDown, TrendingUp, Fuel, Palette,
  Settings2, Shield, Phone, Mail, Globe, ExternalLink, Share2, Heart,
  CheckCircle2, Info, Zap, ThermometerSun, Navigation, Armchair, Wifi
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import { t, surface, surfaceAlt, ThemedTooltip } from './themeUtils';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

/* ── Gallery images per vehicle (simulated different angles) ── */
const galleryImages = {
  'ML-001': [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&h=520&fit=crop',
  ],
  'ML-002': [
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=900&h=520&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&h=520&fit=crop',
  ],
};

const defaultGallery = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&h=520&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=520&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&h=520&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&h=520&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&h=520&fit=crop',
];

/* ── Extended specs per vehicle ── */
const extendedSpecs = (v) => ({
  motor: [
    { label: 'Motortyp', value: v.fuel === 'Diesel' ? 'Turbodiesel' : v.fuel === 'Hybrid' ? 'Plug-in Hybrid' : 'Turbobenzin', icon: Fuel },
    { label: 'Leistung', value: `${v.ps} PS`, icon: Zap },
    { label: 'Getriebe', value: v.transmission, icon: Settings2 },
    { label: 'Hubraum', value: v.ps > 300 ? '2.998 cm³' : v.ps > 200 ? '1.984 cm³' : '1.995 cm³', icon: Gauge },
    { label: 'Antrieb', value: v.ps > 300 ? 'Allrad' : v.fuel === 'Diesel' ? 'Hinterrad' : 'Frontantrieb', icon: Navigation },
    { label: '0-100 km/h', value: v.ps > 350 ? '4.2s' : v.ps > 250 ? '5.4s' : v.ps > 200 ? '6.8s' : '7.5s', icon: Gauge },
  ],
  details: [
    { label: 'Erstzulassung', value: `${['03', '06', '09', '11'][v.year % 4]}/${v.year}`, icon: Calendar },
    { label: 'Kilometerstand', value: `${v.km.toLocaleString('de-DE')} km`, icon: Gauge },
    { label: 'Farbe', value: v.color, icon: Palette },
    { label: 'Kraftstoff', value: v.fuel, icon: Fuel },
    { label: 'HU/AU', value: `${['03', '06', '09', '12'][v.year % 4]}/2026`, icon: Shield },
    { label: 'Unfallschäden', value: 'Nein', icon: CheckCircle2 },
  ],
  equipment: [
    'LED-Scheinwerfer', 'Navigationssystem', 'Sitzheizung', 'Einparkhilfe vorne & hinten',
    'Tempomat', 'Bluetooth', 'Apple CarPlay / Android Auto', 'Rückfahrkamera',
    'Klimaautomatik 2-Zonen', 'Sportfahrwerk', 'Panoramadach',
    v.ps > 300 ? 'M Sportpaket' : 'Sportpaket',
    'Adaptives Fahrwerk', 'Head-Up Display', 'Keyless Entry', 'Ambiente-Beleuchtung',
  ],
});

/* ── Price History ── */
const generatePriceHistory = (v) => {
  const base = v.marketPrice;
  return [
    { m: 'Aug', preis: Math.round(base * 1.04), markt: Math.round(base * 1.02) },
    { m: 'Sep', preis: Math.round(base * 1.02), markt: Math.round(base * 1.01) },
    { m: 'Okt', preis: Math.round(base * 1.01), markt: base },
    { m: 'Nov', preis: Math.round(base * 0.99), markt: Math.round(base * 0.99) },
    { m: 'Dez', preis: Math.round(base * 0.98), markt: Math.round(base * 0.98) },
    { m: 'Jan', preis: Math.round(base * 0.97), markt: Math.round(base * 0.97) },
    { m: 'Feb', preis: v.price, markt: v.marketPrice },
  ];
};

const fmt = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const VehicleDetailView = ({ vehicle: v, onBack, isTracked, onToggleTrack, allListings }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const images = galleryImages[v.id]
    ? [v.image.replace('w=400&h=260', 'w=900&h=520'), ...galleryImages[v.id]]
    : [v.image.replace('w=400&h=260', 'w=900&h=520'), ...defaultGallery];
  const specs = extendedSpecs(v);
  const priceHistory = generatePriceHistory(v);
  const diff = ((v.marketPrice - v.price) / v.marketPrice * 100).toFixed(1);
  const isGoodDeal = v.price < v.marketPrice;

  const similar = allListings.filter(l => l.id !== v.id && l.brand === v.brand).slice(0, 3);
  if (similar.length < 3) {
    const others = allListings.filter(l => l.id !== v.id && l.brand !== v.brand && Math.abs(l.price - v.price) < 15000).slice(0, 3 - similar.length);
    similar.push(...others);
  }

  const prev = () => setImgIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx(i => (i + 1) % images.length);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="vehicle-detail-view">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button data-testid="detail-back-btn" onClick={onBack} className="flex items-center gap-2 text-xs font-medium transition-colors"
          style={{ color: t.textSec }}
          onMouseEnter={e => e.currentTarget.style.color = BLUE} onMouseLeave={e => e.currentTarget.style.color = t.textSec}>
          <ArrowLeft className="w-4 h-4" /> Zurück zur Suche
        </button>
        <div className="flex items-center gap-2">
          <Button data-testid="detail-share-btn" variant="outline" className="h-8 gap-1.5 text-xs rounded-lg" style={{ borderColor: t.border, color: t.textSec }}>
            <Share2 className="w-3.5 h-3.5" /> Teilen
          </Button>
          <Button data-testid="detail-track-btn" onClick={() => onToggleTrack(v.id)}
            className="h-8 gap-1.5 text-xs rounded-lg"
            style={isTracked
              ? { backgroundColor: `${GREEN}15`, color: GREEN, border: `1px solid ${GREEN}30` }
              : { backgroundColor: 'var(--d-surface-alt)', color: t.textSec, border: '1px solid var(--d-border)' }}>
            {isTracked ? <Star className="w-3.5 h-3.5 fill-current" /> : <StarOff className="w-3.5 h-3.5" />}
            {isTracked ? 'Wird getrackt' : 'Tracken'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column — Gallery + Specs */}
        <div className="lg:col-span-8 space-y-4">
          {/* Image Gallery */}
          <div className={surface('overflow-hidden')} data-testid="image-gallery">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.img key={imgIdx} src={images[imgIdx]} alt={`${v.brand} ${v.model}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  className="w-full h-[340px] lg:h-[400px] object-cover" />
              </AnimatePresence>
              {/* Nav arrows */}
              <button data-testid="gallery-prev" onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button data-testid="gallery-next" onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              {/* Counter */}
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium backdrop-blur-md"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                {imgIdx + 1} / {images.length}
              </span>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-1.5 p-3 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} data-testid={`thumb-${i}`} onClick={() => setImgIdx(i)}
                  className="shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all"
                  style={{ opacity: i === imgIdx ? 1 : 0.5, border: i === imgIdx ? `2px solid ${BLUE}` : '2px solid transparent' }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Motor & Technische Daten */}
          <div className={surface('p-5')}>
            <h3 className="font-['Orbitron'] text-xs font-bold mb-4" style={{ color: t.text }}>Motor & Technik</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specs.motor.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className={`flex items-center gap-2.5 p-3 rounded-xl ${surfaceAlt()}`}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: BLUE }} />
                    <div>
                      <div className="text-[10px]" style={{ color: t.textDim }}>{s.label}</div>
                      <div className="text-xs font-semibold" style={{ color: t.text }}>{s.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fahrzeugdetails */}
          <div className={surface('p-5')}>
            <h3 className="font-['Orbitron'] text-xs font-bold mb-4" style={{ color: t.text }}>Fahrzeugdetails</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specs.details.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className={`flex items-center gap-2.5 p-3 rounded-xl ${surfaceAlt()}`}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
                    <div>
                      <div className="text-[10px]" style={{ color: t.textDim }}>{s.label}</div>
                      <div className="text-xs font-semibold" style={{ color: t.text }}>{s.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ausstattung */}
          <div className={surface('p-5')}>
            <h3 className="font-['Orbitron'] text-xs font-bold mb-4" style={{ color: t.text }}>Ausstattung</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {specs.equipment.map((eq, i) => (
                <motion.div key={eq} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 * i }}
                  className="flex items-center gap-2 text-xs py-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />
                  <span style={{ color: t.textSec }}>{eq}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Preisentwicklung */}
          <div className={surface('p-5')} data-testid="price-chart">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>Preisentwicklung</h3>
                <p className="text-[10px] mt-0.5" style={{ color: t.textDim }}>Angebotspreis vs. Marktwert der letzten 7 Monate</p>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-1 rounded-full" style={{ backgroundColor: BLUE }} /><span style={{ color: t.textSec }}>Angebot</span></span>
                <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-1 rounded-full" style={{ backgroundColor: GREEN }} /><span style={{ color: t.textSec }}>Marktwert</span></span>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory}>
                  <defs>
                    <linearGradient id="gprice" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={BLUE} stopOpacity={0.15} /><stop offset="95%" stopColor={BLUE} stopOpacity={0} /></linearGradient>
                    <linearGradient id="gmarket" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={GREEN} stopOpacity={0.1} /><stop offset="95%" stopColor={GREEN} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip content={<ThemedTooltip />} />
                  <Area type="monotone" dataKey="preis" stroke={BLUE} strokeWidth={2} fill="url(#gprice)" name="Angebot" dot={{ r: 3, fill: BLUE }} />
                  <Area type="monotone" dataKey="markt" stroke={GREEN} strokeWidth={1.5} fill="url(#gmarket)" name="Marktwert" strokeDasharray="4 4" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column — Price, Dealer, Actions */}
        <div className="lg:col-span-4 space-y-4">
          {/* Vehicle Title Card */}
          <div className={surface('p-5')}>
            <div className="text-[10px] font-mono mb-1" style={{ color: t.textDim }}>{v.id} · via mobile.de</div>
            <h2 className="font-['Orbitron'] text-base font-bold mb-0.5" style={{ color: t.text }}>{v.brand} {v.model}</h2>
            <p className="text-xs mb-4" style={{ color: t.textSec }}>{v.color} · EZ {v.year} · {v.km.toLocaleString('de-DE')} km</p>

            {/* Price */}
            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--d-surface-alt)' }}>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="text-[10px] mb-0.5" style={{ color: t.textDim }}>Angebotspreis</div>
                  <div className="font-['Orbitron'] text-2xl font-bold" style={{ color: t.text }}>{fmt(v.price)}</div>
                </div>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: isGoodDeal ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)', color: isGoodDeal ? '#22c55e' : '#f87171', border: `1px solid ${isGoodDeal ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
                  {isGoodDeal ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                  {isGoodDeal ? `-${diff}%` : `+${Math.abs(parseFloat(diff))}%`}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs" style={{ color: t.textMut }}>
                <span>Marktwert: <span className="font-semibold" style={{ color: t.textSec }}>{fmt(v.marketPrice)}</span></span>
                <span>Ersparnis: <span className="font-semibold" style={{ color: '#22c55e' }}>{fmt(v.marketPrice - v.price)}</span></span>
              </div>
            </div>

            {/* Deal Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: t.textSec }}>Deal Score</span>
                <span className="text-xs font-bold font-['Orbitron']" style={{ color: isGoodDeal ? '#22c55e' : '#f87171' }}>
                  {isGoodDeal ? (parseFloat(diff) > 5 ? 'TOP DEAL' : 'Guter Deal') : 'Über Markt'}
                </span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--d-border-sub)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(parseFloat(diff) * 10 + 50, 95)}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: isGoodDeal ? '#22c55e' : '#f87171' }} />
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Online seit', value: v.daysOnline === 1 ? 'Heute' : `${v.daysOnline} Tage`, icon: Clock, accent: v.daysOnline <= 2 ? GREEN : t.textSec },
                { label: 'Standort', value: v.location, icon: MapPin, accent: t.textSec },
                { label: 'Leistung', value: `${v.ps} PS`, icon: Zap, accent: BLUE },
                { label: 'Getriebe', value: v.transmission, icon: Settings2, accent: t.textSec },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className={`p-2.5 rounded-xl ${surfaceAlt()}`}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon className="w-3 h-3" style={{ color: f.accent }} />
                      <span className="text-[9px]" style={{ color: t.textDim }}>{f.label}</span>
                    </div>
                    <div className="text-xs font-semibold" style={{ color: t.text }}>{f.value}</div>
                  </div>
                );
              })}
            </div>

            <Button data-testid="detail-contact-btn" className="w-full h-10 text-xs font-semibold rounded-xl gap-2 bg-[#00E5FF] text-black hover:bg-[#00c8e0]">
              <Phone className="w-3.5 h-3.5" /> Händler kontaktieren
            </Button>
          </div>

          {/* Dealer Card */}
          <div className={surface('p-5')} data-testid="dealer-card">
            <h3 className="font-['Orbitron'] text-xs font-bold mb-3" style={{ color: t.text }}>Händler</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${BLUE}12`, color: BLUE }}>
                {v.dealer.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: t.text }}>{v.dealer}</div>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: t.textDim }}>
                  <MapPin className="w-3 h-3" />{v.location}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: Phone, label: '+49 (0) 89 123 456 78' },
                { icon: Mail, label: `info@${v.dealer.toLowerCase().replace(/[\s&]/g, '-').replace(/[^\w-]/g, '')}.de` },
                { icon: Globe, label: 'Website besuchen' },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-2.5 text-xs" style={{ color: t.textSec }}>
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: t.textMut }} />
                    <span>{c.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Similar Vehicles */}
          {similar.length > 0 && (
            <div className={surface('p-5')} data-testid="similar-vehicles">
              <h3 className="font-['Orbitron'] text-xs font-bold mb-3" style={{ color: t.text }}>Ähnliche Fahrzeuge</h3>
              <div className="space-y-2.5">
                {similar.map(s => {
                  const sDiff = ((s.marketPrice - s.price) / s.marketPrice * 100).toFixed(1);
                  const sGood = s.price < s.marketPrice;
                  return (
                    <div key={s.id} data-testid={`similar-${s.id}`} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer ${surfaceAlt()}`}>
                      <img src={s.image} alt={s.model} className="w-16 h-11 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium truncate" style={{ color: t.text }}>{s.brand} {s.model}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold font-['Orbitron']" style={{ color: t.text }}>{fmt(s.price)}</span>
                          <span className="text-[9px] font-semibold" style={{ color: sGood ? '#22c55e' : '#f87171' }}>
                            {sGood ? `-${sDiff}%` : `+${Math.abs(parseFloat(sDiff))}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
