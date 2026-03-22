import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, ChevronRight, Euro, Gauge } from 'lucide-react';

const brands = {
  BMW: { models: ['320d Touring', '330i', 'M340i xDrive', 'X3 xDrive30d', 'M3 Competition'], prices: [29800, 38500, 54900, 48200, 78500] },
  Audi: { models: ['A4 Avant 40 TDI', 'A6 Avant 50 TDI', 'RS3 Sportback', 'Q5 45 TFSI', 'RS6 Avant'], prices: [32400, 48900, 56200, 44800, 98500] },
  Mercedes: { models: ['C220d T-Modell', 'E300 T-Modell', 'AMG A35', 'GLC 300d', 'AMG C43'], prices: [34200, 52100, 41800, 49500, 62300] },
  VW: { models: ['Golf 8 GTI', 'Golf R', 'Tiguan R-Line', 'Passat Variant', 'Arteon R'], prices: [29900, 38400, 39800, 31200, 44500] },
  Porsche: { models: ['Macan S', 'Cayenne', '911 Carrera', 'Taycan', 'Panamera'], prices: [52800, 78900, 112000, 88500, 94200] },
};

const brandColors = {
  BMW: '#00E5FF',
  Audi: '#c084fc',
  Mercedes: '#f0f0f0',
  VW: '#00E5FF',
  Porsche: '#CCFF00',
};

export const VehicleConfigurator = () => {
  const [brand, setBrand] = useState(null);
  const [modelIdx, setModelIdx] = useState(null);

  const selectedBrand = brand ? brands[brand] : null;
  const price = selectedBrand && modelIdx !== null ? selectedBrand.prices[modelIdx] : null;
  const model = selectedBrand && modelIdx !== null ? selectedBrand.models[modelIdx] : null;

  return (
    <section data-testid="vehicle-configurator" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full mb-6">
            <Gauge className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Live Marktwert</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white mb-4">Marktwert-Check</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">Wähle Marke und Modell — sieh sofort den geschätzten Marktwert.</p>
        </motion.div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
          {/* Brand Selection */}
          <div className="flex justify-center gap-3 mb-8">
            {Object.keys(brands).map((b) => (
              <button key={b} onClick={() => { setBrand(b); setModelIdx(null); }}
                className={`px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  brand === b ? 'text-black border-transparent' : 'text-white/50 border-white/10 bg-[#0A0A0A] hover:border-white/20'
                }`}
                style={brand === b ? { backgroundColor: brandColors[b], color: '#000' } : {}}>
                {b}
              </button>
            ))}
          </div>

          {/* Model Selection */}
          <AnimatePresence mode="wait">
            {selectedBrand && (
              <motion.div key={brand} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                  {selectedBrand.models.map((m, i) => (
                    <button key={m} onClick={() => setModelIdx(i)}
                      className={`p-3 rounded-xl text-sm border transition-all text-center ${
                        modelIdx === i ? 'border-[#00E5FF]/40 bg-[#00E5FF]/10 text-white' : 'border-white/5 bg-[#0A0A0A] text-white/50 hover:border-white/15'
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {price !== null && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-[#0A0A0A] border border-[#00E5FF]/20 rounded-2xl p-8 text-center">
                <p className="text-white/40 text-sm mb-2">Geschätzter Marktwert für <span className="text-white font-medium">{brand} {model}</span></p>
                <motion.div key={price} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="font-['Space_Grotesk'] text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-3">
                  €{price.toLocaleString('de-DE')}
                </motion.div>
                <p className="text-[#00E5FF] text-sm font-medium">Basierend auf aktuellen Marktdaten · Ø 2022-2023 · Deutschland</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
