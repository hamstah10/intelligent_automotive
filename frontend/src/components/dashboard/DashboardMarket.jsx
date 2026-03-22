import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Car, TrendingDown, TrendingUp, MapPin, Calendar, Star, Eye, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const listings = [
  { id: 1, car: 'BMW 320d Touring', year: 2021, km: '45.000 km', price: 28900, marketPrice: 31200, score: 92, location: 'München', dealer: 'AutoHaus Süd', days: 3, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=120&fit=crop' },
  { id: 2, car: 'Audi A4 Avant 40 TDI', year: 2020, km: '62.000 km', price: 26500, marketPrice: 28400, score: 85, location: 'Hamburg', dealer: 'Premium Cars Nord', days: 7, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=120&fit=crop' },
  { id: 3, car: 'Mercedes C220d T-Modell', year: 2022, km: '31.000 km', price: 34900, marketPrice: 36100, score: 78, location: 'Berlin', dealer: 'Star Motors Berlin', days: 1, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=120&fit=crop' },
  { id: 4, car: 'VW Golf 8 GTI', year: 2021, km: '38.000 km', price: 29900, marketPrice: 33500, score: 95, location: 'Frankfurt', dealer: 'VW Zentrum FFM', days: 2, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&h=120&fit=crop' },
  { id: 5, car: 'Porsche Macan S', year: 2020, km: '55.000 km', price: 48500, marketPrice: 52800, score: 88, location: 'Stuttgart', dealer: 'Porsche Zentrum', days: 5, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=120&fit=crop' },
  { id: 6, car: 'BMW M340i xDrive', year: 2022, km: '22.000 km', price: 52900, marketPrice: 58700, score: 91, location: 'Köln', dealer: 'BMW Niederlassung', days: 1, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200&h=120&fit=crop' },
];

const priceHistory = [
  { month: 'Sep', avg: 31200 }, { month: 'Okt', avg: 30800 }, { month: 'Nov', avg: 30100 },
  { month: 'Dez', avg: 29500 }, { month: 'Jan', avg: 29800 }, { month: 'Feb', avg: 29200 }, { month: 'Mär', avg: 28900 },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-xs shadow-xl">
        <p className="text-white/40 mb-1">{label}</p>
        <p className="text-white font-semibold">€{payload[0].value.toLocaleString('de-DE')}</p>
      </div>
    );
  }
  return null;
};

const getScoreColor = (score) => {
  if (score >= 90) return 'text-green-400 bg-green-500/15';
  if (score >= 80) return 'text-[#CCFF00] bg-[#CCFF00]/15';
  return 'text-yellow-400 bg-yellow-500/15';
};

export const DashboardMarket = () => {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState('listings');

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-8">
        <div>
          <h1 data-testid="market-title" className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">Market Intelligence</h1>
          <p className="text-white/40 text-sm mt-1.5">Fahrzeug-Listings, Preisanalysen und Deal-Bewertungen.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <Input placeholder="Fahrzeug suchen ..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-[240px] bg-[#111111] border-white/10 text-white placeholder:text-white/25 rounded-lg h-10 text-sm" />
          </div>
          <Button className="bg-[#CCFF00] text-black hover:bg-[#b8e600] font-semibold rounded-lg h-10 px-5 text-sm gap-2">
            <SlidersHorizontal className="w-4 h-4" />Filter
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Gesamt Listings', value: '1.247', change: '+34 heute', up: true },
          { label: 'Ø Marktpreis', value: '€32.450', change: '-2,1% vs. Vorwoche', up: false },
          { label: 'Top-Deals', value: '23', change: 'Score > 85', up: true },
          { label: 'Watchlist', value: '8', change: '3 neue Treffer', up: true },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#111111] border border-white/10 rounded-2xl p-5">
            <div className="text-white/40 text-sm mb-1">{stat.label}</div>
            <div className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className={`text-xs mt-1 flex items-center gap-1 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
              {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price Trend Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-1">Preisentwicklung BMW 3er Touring</h3>
        <p className="text-white/30 text-xs mb-6">Durchschnittspreis der letzten 7 Monate</p>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 12 }} domain={['dataMin - 500', 'dataMax + 500']} tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="avg" stroke="#00E5FF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Listings as Cards */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Aktuelle Listings</h3>
        <span className="text-white/30 text-sm">{listings.length} Ergebnisse</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {listings.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
            className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#CCFF00]/20 transition-colors duration-200 cursor-pointer group">
            {/* Image */}
            <div className="relative">
              <img src={item.image} alt={item.car} className="w-full h-[160px] object-cover" />
              <div className={`absolute top-3 right-3 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm backdrop-blur-sm ${getScoreColor(item.score)}`}>
                {item.score}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>
            {/* Content */}
            <div className="p-4 pt-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm truncate">{item.car}</h4>
                <span className="text-white/30 text-xs shrink-0 ml-2">{item.year}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                <span>{item.km}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />vor {item.days}d</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <div className="font-['Space_Grotesk'] text-xl font-bold text-white">€{item.price.toLocaleString('de-DE')}</div>
                  <div className="text-[11px] text-white/25 line-through">Markt: €{item.marketPrice.toLocaleString('de-DE')}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold text-sm flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -€{(item.marketPrice - item.price).toLocaleString('de-DE')}
                  </div>
                  <div className="text-white/25 text-[11px]">{item.dealer}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
