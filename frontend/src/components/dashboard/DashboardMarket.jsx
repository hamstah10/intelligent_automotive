import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Car, TrendingDown, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { t, surface, ThemedTooltip } from './themeUtils';

const brandLogos = {
  BMW: 'https://static.prod-images.emergentagent.com/jobs/75c63187-f714-4297-8bd0-b3bae932661f/images/180bbe474591d40156ff9ca850911c777640e049637418cbcd1245695206ac72.png',
  Audi: 'https://static.prod-images.emergentagent.com/jobs/75c63187-f714-4297-8bd0-b3bae932661f/images/5e6c139b20069d400e137b86483d1e995c0c15c21977fa96e4dd7fc3c92bc6c6.png',
};
const brandColors = {
  BMW: 'from-blue-500 to-blue-700', Audi: 'from-gray-400 to-gray-600',
  Mercedes: 'from-gray-300 to-gray-500', VW: 'from-blue-600 to-blue-800', Porsche: 'from-red-600 to-red-800',
};

const BrandBadge = ({ brand }) => {
  if (brandLogos[brand]) {
    return (
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1 shadow-lg">
        <img src={brandLogos[brand]} alt={brand} className="w-full h-full object-contain" />
      </div>
    );
  }
  const initials = brand === 'Mercedes' ? 'MB' : brand;
  return (
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${brandColors[brand]} flex items-center justify-center shadow-lg`}>
      <span className="text-white text-[10px] font-bold">{initials}</span>
    </div>
  );
};

const listings = [
  { id: 1, brand: 'BMW', car: 'BMW 320d Touring', year: 2021, km: '45.000 km', price: 28900, marketPrice: 31200, score: 92, location: 'München', dealer: 'AutoHaus Süd', days: 3, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=240&fit=crop' },
  { id: 2, brand: 'Audi', car: 'Audi A4 Avant 40 TDI', year: 2020, km: '62.000 km', price: 26500, marketPrice: 28400, score: 85, location: 'Hamburg', dealer: 'Premium Cars Nord', days: 7, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=240&fit=crop' },
  { id: 3, brand: 'Mercedes', car: 'Mercedes C220d T-Modell', year: 2022, km: '31.000 km', price: 34900, marketPrice: 36100, score: 78, location: 'Berlin', dealer: 'Star Motors Berlin', days: 1, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=240&fit=crop' },
  { id: 4, brand: 'VW', car: 'VW Golf 8 GTI', year: 2021, km: '38.000 km', price: 29900, marketPrice: 33500, score: 95, location: 'Frankfurt', dealer: 'VW Zentrum FFM', days: 2, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=240&fit=crop' },
  { id: 5, brand: 'Porsche', car: 'Porsche Macan S', year: 2020, km: '55.000 km', price: 48500, marketPrice: 52800, score: 88, location: 'Stuttgart', dealer: 'Porsche Zentrum', days: 5, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=240&fit=crop' },
  { id: 6, brand: 'BMW', car: 'BMW M340i xDrive', year: 2022, km: '22.000 km', price: 52900, marketPrice: 58700, score: 91, location: 'Köln', dealer: 'BMW Niederlassung', days: 1, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=240&fit=crop' },
  { id: 7, brand: 'Audi', car: 'Audi RS3 Sportback', year: 2022, km: '18.000 km', price: 54900, marketPrice: 59200, score: 89, location: 'Düsseldorf', dealer: 'Audi Zentrum', days: 4, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&h=240&fit=crop' },
  { id: 8, brand: 'Mercedes', car: 'Mercedes AMG A35', year: 2021, km: '42.000 km', price: 38900, marketPrice: 41500, score: 83, location: 'Leipzig', dealer: 'Star Motors Leipzig', days: 6, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=240&fit=crop' },
];

const priceHistory = [
  { month: 'Sep', avg: 31200 }, { month: 'Okt', avg: 30800 }, { month: 'Nov', avg: 30100 },
  { month: 'Dez', avg: 29500 }, { month: 'Jan', avg: 29800 }, { month: 'Feb', avg: 29200 }, { month: 'Mär', avg: 28900 },
];

const PriceTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-2.5 text-xs rounded-xl" style={{ backgroundColor: t.tooltipBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <p className="mb-1" style={{ color: t.textSec }}>{label}</p>
        <p className="font-semibold" style={{ color: t.text }}>€{payload[0].value.toLocaleString('de-DE')}</p>
      </div>
    );
  }
  return null;
};

const getScoreColor = (score) => {
  if (score >= 90) return { bg: 'rgba(0,229,255,0.2)', color: '#00E5FF' };
  if (score >= 80) return { bg: 'rgba(0,229,255,0.15)', color: '#00E5FF' };
  return { bg: 'rgba(250,204,21,0.15)', color: '#facc15' };
};

export const DashboardMarket = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="market-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Market Intelligence</h1>
          <p className="text-sm mt-1.5" style={{ color: t.textSec }}>Fahrzeug-Listings, Preisanalysen und Deal-Bewertungen.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMut }} />
            <Input placeholder="Fahrzeug suchen ..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-[240px] rounded-lg h-10 text-sm" style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }} />
          </div>
          <Button className="bg-[#00E5FF] text-black hover:bg-[#00c8e0] font-semibold rounded-lg h-10 px-5 text-sm gap-2">
            <SlidersHorizontal className="w-4 h-4" />Filter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Gesamt Listings', value: '1.247', change: '+34 heute', up: true },
          { label: 'Ø Marktpreis', value: '€32.450', change: '-2,1% vs. Vorwoche', up: false },
          { label: 'Top-Deals', value: '23', change: 'Score > 85', up: true },
          { label: 'Watchlist', value: '8', change: '3 neue Treffer', up: true },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`${surface()} p-5`}>
            <div className="text-sm mb-1" style={{ color: t.textSec }}>{stat.label}</div>
            <div className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>{stat.value}</div>
            <div className={`text-xs mt-1 flex items-center gap-1 ${stat.up ? 'text-[#00E5FF]' : 'text-red-400'}`}>
              {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${surface()} p-6 mb-6`}>
        <h3 className="font-['Orbitron'] text-sm font-bold mb-1" style={{ color: t.text }}>Preisentwicklung BMW 3er Touring</h3>
        <p className="text-xs mb-6" style={{ color: t.textMut }}>Durchschnittspreis der letzten 7 Monate</p>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--d-chart-grid)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--d-chart-tick)', fontSize: 12 }} domain={['dataMin - 500', 'dataMax + 500']} tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<PriceTooltip />} />
              <Line type="monotone" dataKey="avg" stroke="#00E5FF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Listings */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>Aktuelle Listings</h3>
        <span className="text-sm" style={{ color: t.textMut }}>{listings.length} Ergebnisse</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {listings.map((item, i) => {
          const sc = getScoreColor(item.score);
          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
              className={`${surface()} overflow-hidden cursor-pointer group`}>
              <div className="relative">
                <img src={item.image} alt={item.car} className="w-full h-[140px] object-cover" />
                <div className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs backdrop-blur-sm"
                  style={{ backgroundColor: sc.bg, color: sc.color }}>{item.score}</div>
                <div className="absolute top-3 left-3"><BrandBadge brand={item.brand} /></div>
                <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: `linear-gradient(to top, var(--d-surface), transparent)` }} />
              </div>
              <div className="p-3.5 pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-semibold text-[13px] truncate" style={{ color: t.text }}>{item.car}</h4>
                  <span className="text-xs shrink-0 ml-2" style={{ color: t.textMut }}>{item.year}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] mb-3" style={{ color: t.textSec }}>
                  <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{item.location}</span>
                  <span>{item.km}</span>
                  <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />vor {item.days}d</span>
                </div>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--d-border-sub)' }}>
                  <div>
                    <div className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>€{item.price.toLocaleString('de-DE')}</div>
                    <div className="text-[10px] line-through" style={{ color: t.textDim }}>Markt: €{item.marketPrice.toLocaleString('de-DE')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#00E5FF] font-semibold text-xs flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />-€{(item.marketPrice - item.price).toLocaleString('de-DE')}
                    </div>
                    <div className="text-[10px] truncate max-w-[90px]" style={{ color: t.textDim }}>{item.dealer}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
