import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, Car, MapPin, Calendar, Gauge, Euro,
  Eye, Star, StarOff, ChevronDown, ExternalLink, Clock, TrendingDown,
  TrendingUp, Filter, X, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { t, surface, surfaceAlt } from './themeUtils';
import { VehicleDetailView } from './VehicleDetailView';

const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

/* ── API Sources ── */
const apiSources = [
  { id: 'mobile', name: 'mobile.de', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mobile.de_logo.svg/320px-Mobile.de_logo.svg.png', active: true },
  { id: 'autoscout', name: 'AutoScout24', logo: null, active: false },
  { id: 'ebay', name: 'eBay Kleinanzeigen', logo: null, active: false },
  { id: 'heycar', name: 'heycar', logo: null, active: false },
];

/* ── Filter Options ── */
const brands = ['Alle', 'BMW', 'Audi', 'Mercedes', 'VW', 'Porsche', 'Opel'];
const priceRanges = ['Alle', 'Bis €15.000', '€15.000 – €30.000', '€30.000 – €50.000', '€50.000+'];
const yearRanges = ['Alle', '2024+', '2022 – 2023', '2020 – 2021', '2018 – 2019', 'Älter'];
const kmRanges = ['Alle', 'Bis 25.000', '25.000 – 50.000', '50.000 – 100.000', '100.000+'];

/* ── Mock Listings ── */
const mockListings = [
  { id: 'ML-001', brand: 'BMW', model: '320d Touring M Sport', year: 2022, km: 34200, price: 32900, marketPrice: 35200, fuel: 'Diesel', ps: 190, transmission: 'Automatik', location: 'München', dealer: 'AutoHaus Süd GmbH', daysOnline: 3, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=260&fit=crop', color: 'Mineralweiß' },
  { id: 'ML-002', brand: 'Audi', model: 'A4 Avant 40 TDI S-Line', year: 2021, km: 52800, price: 29500, marketPrice: 31800, fuel: 'Diesel', ps: 204, transmission: 'S tronic', location: 'Hamburg', dealer: 'Premium Cars Nord', daysOnline: 7, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=260&fit=crop', color: 'Navarrablau' },
  { id: 'ML-003', brand: 'Mercedes', model: 'C 220 d T-Modell AMG-Line', year: 2023, km: 18500, price: 42900, marketPrice: 44100, fuel: 'Diesel', ps: 200, transmission: 'Automatik', location: 'Berlin', dealer: 'Star Motors Berlin', daysOnline: 1, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=260&fit=crop', color: 'Obsidianschwarz' },
  { id: 'ML-004', brand: 'VW', model: 'Golf 8 GTI DSG', year: 2022, km: 28400, price: 31900, marketPrice: 34500, fuel: 'Benzin', ps: 245, transmission: 'DSG', location: 'Frankfurt', dealer: 'VW Zentrum FFM', daysOnline: 2, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=260&fit=crop', color: 'Königsblau' },
  { id: 'ML-005', brand: 'Porsche', model: 'Macan S PDK', year: 2021, km: 42100, price: 54900, marketPrice: 58200, fuel: 'Benzin', ps: 380, transmission: 'PDK', location: 'Stuttgart', dealer: 'Porsche Zentrum Stuttgart', daysOnline: 5, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=260&fit=crop', color: 'Vulkangrau' },
  { id: 'ML-006', brand: 'BMW', model: 'M340i xDrive Touring', year: 2023, km: 12800, price: 58900, marketPrice: 62400, fuel: 'Benzin', ps: 374, transmission: 'Steptronic', location: 'Köln', dealer: 'BMW Niederlassung Köln', daysOnline: 1, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=260&fit=crop', color: 'Tanzaniteblau' },
  { id: 'ML-007', brand: 'Audi', model: 'RS3 Sportback', year: 2022, km: 21300, price: 56500, marketPrice: 59800, fuel: 'Benzin', ps: 400, transmission: 'S tronic', location: 'Düsseldorf', dealer: 'Audi Zentrum Düsseldorf', daysOnline: 4, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&h=260&fit=crop', color: 'Nardograu' },
  { id: 'ML-008', brand: 'Mercedes', model: 'AMG A 35 4MATIC', year: 2022, km: 38900, price: 39900, marketPrice: 42100, fuel: 'Benzin', ps: 306, transmission: 'AMG SPEEDSHIFT', location: 'Leipzig', dealer: 'Star Motors Leipzig', daysOnline: 6, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=260&fit=crop', color: 'Kosmoswarz' },
  { id: 'ML-009', brand: 'VW', model: 'Tiguan R-Line 2.0 TDI', year: 2023, km: 15200, price: 38500, marketPrice: 40200, fuel: 'Diesel', ps: 200, transmission: 'DSG', location: 'Hannover', dealer: 'Autohaus Leinetal', daysOnline: 3, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=260&fit=crop', color: 'Oryx-Weiß' },
  { id: 'ML-010', brand: 'Opel', model: 'Astra Sports Tourer GS', year: 2024, km: 8400, price: 28900, marketPrice: 30500, fuel: 'Hybrid', ps: 180, transmission: 'Automatik', location: 'Bochum', dealer: 'Opel Autohaus Ruhr', daysOnline: 2, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=260&fit=crop', color: 'Quarz-Silber' },
  { id: 'ML-011', brand: 'BMW', model: '520d xDrive Touring', year: 2021, km: 67800, price: 34900, marketPrice: 37500, fuel: 'Diesel', ps: 190, transmission: 'Steptronic', location: 'Nürnberg', dealer: 'BMW Euler Nürnberg', daysOnline: 9, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=260&fit=crop', color: 'Saphirschwarz' },
  { id: 'ML-012', brand: 'Porsche', model: 'Cayenne Coupé', year: 2022, km: 31500, price: 82900, marketPrice: 87400, fuel: 'Benzin', ps: 340, transmission: 'Tiptronic', location: 'München', dealer: 'Porsche Zentrum München', daysOnline: 4, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=260&fit=crop', color: 'Kreide' },
];

const fmt = (n) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtKm = (n) => `${n.toLocaleString('de-DE')} km`;

const DealBadge = ({ price, market }) => {
  const diff = ((market - price) / market * 100).toFixed(1);
  const isGood = price < market;
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold"
      style={{ backgroundColor: isGood ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)', color: isGood ? '#22c55e' : '#f87171', border: `1px solid ${isGood ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
      {isGood ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
      {isGood ? `-${diff}%` : `+${Math.abs(diff)}%`} vs. Markt
    </span>
  );
};

const Select = ({ value, onChange, options, label, testId }) => (
  <div className="relative">
    <label className="block text-[10px] font-medium mb-1" style={{ color: t.textDim }}>{label}</label>
    <select data-testid={testId} value={value} onChange={e => onChange(e.target.value)}
      className="w-full h-9 px-3 pr-8 rounded-lg text-xs font-medium appearance-none cursor-pointer transition-colors focus:outline-none"
      style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border)', color: t.text }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-2.5 bottom-2.5 w-3.5 h-3.5 pointer-events-none" style={{ color: t.textMut }} />
  </div>
);

export const BeispielFahrzeugsuche = () => {
  const [source, setSource] = useState('mobile');
  const [searchText, setSearchText] = useState('');
  const [brand, setBrand] = useState('Alle');
  const [priceRange, setPriceRange] = useState('Alle');
  const [yearRange, setYearRange] = useState('Alle');
  const [kmRange, setKmRange] = useState('Alle');
  const [tracked, setTracked] = useState(new Set());
  const [tab, setTab] = useState('search');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const toggle = (id) => setTracked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const filtered = useMemo(() => {
    let items = mockListings;
    if (searchText) {
      const q = searchText.toLowerCase();
      items = items.filter(l => `${l.brand} ${l.model} ${l.location} ${l.dealer}`.toLowerCase().includes(q));
    }
    if (brand !== 'Alle') items = items.filter(l => l.brand === brand);
    if (priceRange !== 'Alle') {
      if (priceRange.includes('Bis')) items = items.filter(l => l.price <= 15000);
      else if (priceRange.includes('15.000 –')) items = items.filter(l => l.price >= 15000 && l.price <= 30000);
      else if (priceRange.includes('30.000 –')) items = items.filter(l => l.price >= 30000 && l.price <= 50000);
      else items = items.filter(l => l.price >= 50000);
    }
    if (yearRange !== 'Alle') {
      if (yearRange === '2024+') items = items.filter(l => l.year >= 2024);
      else if (yearRange.includes('2022')) items = items.filter(l => l.year >= 2022 && l.year <= 2023);
      else if (yearRange.includes('2020')) items = items.filter(l => l.year >= 2020 && l.year <= 2021);
      else if (yearRange.includes('2018')) items = items.filter(l => l.year >= 2018 && l.year <= 2019);
      else items = items.filter(l => l.year < 2018);
    }
    if (kmRange !== 'Alle') {
      if (kmRange.includes('Bis')) items = items.filter(l => l.km <= 25000);
      else if (kmRange.includes('25.000 –')) items = items.filter(l => l.km >= 25000 && l.km <= 50000);
      else if (kmRange.includes('50.000 –')) items = items.filter(l => l.km >= 50000 && l.km <= 100000);
      else items = items.filter(l => l.km >= 100000);
    }
    return items;
  }, [searchText, brand, priceRange, yearRange, kmRange]);

  const trackedList = mockListings.filter(l => tracked.has(l.id));
  const activeSource = apiSources.find(s => s.id === source);

  const VehicleCard = ({ v, i }) => {
    const isTracked = tracked.has(v.id);
    return (
      <motion.div key={v.id} data-testid={`listing-card-${v.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
        className={surface('overflow-hidden group cursor-pointer')} onClick={() => setSelectedVehicle(v)}>
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img src={v.image} alt={v.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Days badge */}
          <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: v.daysOnline <= 2 ? GREEN : 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Clock className="w-3 h-3" />{v.daysOnline === 1 ? 'Heute' : `vor ${v.daysOnline} Tagen`}
          </span>
          {/* Track Button */}
          <button data-testid={`track-btn-${v.id}`} onClick={(e) => { e.stopPropagation(); toggle(v.id); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all"
            style={{ backgroundColor: isTracked ? 'rgba(204,255,0,0.2)' : 'rgba(0,0,0,0.5)', border: `1px solid ${isTracked ? 'rgba(204,255,0,0.4)' : 'rgba(255,255,255,0.1)'}` }}>
            {isTracked ? <Star className="w-4 h-4 fill-[#CCFF00] text-[#CCFF00]" /> : <StarOff className="w-4 h-4 text-white/60" />}
          </button>
          {/* Price */}
          <div className="absolute bottom-2.5 left-2.5">
            <div className="font-['Orbitron'] text-lg font-bold text-white">{fmt(v.price)}</div>
          </div>
          <div className="absolute bottom-3 right-2.5">
            <DealBadge price={v.price} market={v.marketPrice} />
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-0.5 truncate" style={{ color: t.text }}>{v.brand} {v.model}</h3>
          <div className="text-[10px] font-mono mb-3" style={{ color: t.textDim }}>{v.id} · {v.color}</div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
            {[
              { icon: Calendar, label: `EZ ${v.year}` },
              { icon: Gauge, label: fmtKm(v.km) },
              { icon: Car, label: `${v.ps} PS · ${v.fuel}` },
              { icon: SlidersHorizontal, label: v.transmission },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[11px]" style={{ color: t.textSec }}>
                <Icon className="w-3 h-3 shrink-0" style={{ color: t.textMut }} />{label}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--d-border-sub)' }}>
            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: t.textDim }}>
              <MapPin className="w-3 h-3" />{v.location}
            </div>
            <span className="text-[10px] truncate max-w-[120px]" style={{ color: t.textDim }}>{v.dealer}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  /* ── Detail View ── */
  if (selectedVehicle) {
    return (
      <VehicleDetailView
        vehicle={selectedVehicle}
        onBack={() => setSelectedVehicle(null)}
        isTracked={tracked.has(selectedVehicle.id)}
        onToggleTrack={toggle}
        allListings={mockListings}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 data-testid="fahrzeugsuche-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Fahrzeugsuche</h1>
          <p className="text-sm mt-1" style={{ color: t.textSec }}>Fahrzeuge über externe Marktplätze suchen und zum Tracking hinzufügen</p>
        </div>
      </div>

      {/* API Source Selector */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`${surface('p-4')} mb-5`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: t.textMut }}>Datenquelle</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>API verbunden</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap" data-testid="api-source-selector">
          {apiSources.map(s => (
            <button key={s.id} data-testid={`api-source-${s.id}`} onClick={() => s.active && setSource(s.id)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={source === s.id
                ? { backgroundColor: `${BLUE}15`, border: `1px solid ${BLUE}40`, color: t.text }
                : s.active
                  ? { backgroundColor: 'transparent', border: '1px solid var(--d-border)', color: t.textSec, cursor: 'pointer' }
                  : { backgroundColor: 'transparent', border: '1px solid var(--d-border-sub)', color: t.textDim, cursor: 'not-allowed', opacity: 0.5 }
              }>
              {s.id === 'mobile' && source === s.id && (
                <img src={s.logo} alt={s.name} className="h-4 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
              )}
              {!(s.id === 'mobile' && source === s.id) && <span>{s.name}</span>}
              {s.id === 'mobile' && source === s.id && <span>{s.name}</span>}
              {!s.active && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--d-surface-alt)', color: t.textDim }}>Bald</span>}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search + Tabs */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMut }} />
          <Input data-testid="vehicle-search" placeholder="Marke, Modell, Ort oder Händler suchen..." value={searchText} onChange={e => setSearchText(e.target.value)}
            className="pl-10 h-10 rounded-lg text-sm" style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }} />
        </div>
        <Button data-testid="toggle-filters-btn" variant="outline" onClick={() => setShowFilters(!showFilters)}
          className="h-10 gap-2 text-xs rounded-lg" style={{ borderColor: t.border, color: t.textSec }}>
          <Filter className="w-3.5 h-3.5" />{showFilters ? 'Filter ausblenden' : 'Filter'}
        </Button>
        <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--d-border)' }}>
          {[
            { id: 'search', label: 'Suche', count: filtered.length },
            { id: 'tracked', label: 'Tracking', count: tracked.size },
          ].map(tb => (
            <button key={tb.id} data-testid={`tab-${tb.id}`} onClick={() => setTab(tb.id)}
              className="px-4 py-2 text-xs font-medium transition-all flex items-center gap-2"
              style={tab === tb.id ? { backgroundColor: BLUE, color: '#000' } : { backgroundColor: 'var(--d-surface)', color: t.textSec }}>
              {tb.label}
              <span className="min-w-[20px] h-[18px] flex items-center justify-center rounded text-[10px] font-bold"
                style={tab === tb.id ? { backgroundColor: 'rgba(0,0,0,0.15)' } : { backgroundColor: 'var(--d-hover)' }}>
                {tb.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && tab === 'search' && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden mb-5">
            <div className={`${surface('p-4')} grid grid-cols-2 md:grid-cols-4 gap-3`} data-testid="filter-panel">
              <Select value={brand} onChange={setBrand} options={brands} label="Marke" testId="filter-brand" />
              <Select value={priceRange} onChange={setPriceRange} options={priceRanges} label="Preis" testId="filter-price" />
              <Select value={yearRange} onChange={setYearRange} options={yearRanges} label="Baujahr" testId="filter-year" />
              <Select value={kmRange} onChange={setKmRange} options={kmRanges} label="Kilometerstand" testId="filter-km" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results / Tracked */}
      {tab === 'search' ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: t.textMut }}>
              <span className="font-semibold" style={{ color: t.text }}>{filtered.length}</span> Ergebnisse via <span style={{ color: BLUE }}>{activeSource.name}</span>
            </span>
            {(brand !== 'Alle' || priceRange !== 'Alle' || yearRange !== 'Alle' || kmRange !== 'Alle') && (
              <button data-testid="clear-filters" onClick={() => { setBrand('Alle'); setPriceRange('Alle'); setYearRange('Alle'); setKmRange('Alle'); }}
                className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg transition-colors"
                style={{ color: '#f87171', backgroundColor: 'rgba(248,113,113,0.08)' }}>
                <X className="w-3 h-3" /> Filter zurücksetzen
              </button>
            )}
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((v, i) => <VehicleCard key={v.id} v={v} i={i} />)}
            </div>
          ) : (
            <div className={`${surface('p-12')} text-center`}>
              <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: t.textMut }} />
              <p className="text-sm font-medium" style={{ color: t.textSec }}>Keine Ergebnisse gefunden</p>
              <p className="text-xs mt-1" style={{ color: t.textDim }}>Versuche andere Filtereinstellungen</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-3">
            <span className="text-xs" style={{ color: t.textMut }}>
              <span className="font-semibold" style={{ color: t.text }}>{trackedList.length}</span> Fahrzeuge im Tracking
            </span>
          </div>
          {trackedList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {trackedList.map((v, i) => <VehicleCard key={v.id} v={v} i={i} />)}
            </div>
          ) : (
            <div className={`${surface('p-12')} text-center`}>
              <StarOff className="w-10 h-10 mx-auto mb-3" style={{ color: t.textMut }} />
              <p className="text-sm font-medium" style={{ color: t.textSec }}>Noch keine Fahrzeuge im Tracking</p>
              <p className="text-xs mt-1" style={{ color: t.textDim }}>Klicke auf den Stern bei einem Fahrzeug um es zu tracken</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
