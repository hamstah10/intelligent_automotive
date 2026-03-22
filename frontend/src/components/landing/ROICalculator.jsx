import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Car, TrendingUp, Euro, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const ROICalculator = () => {
  const [vehiclesPerMonth, setVehiclesPerMonth] = useState(10);
  const [avgVehiclePrice, setAvgVehiclePrice] = useState(25000);

  const calculations = useMemo(() => {
    const avgSavingsPercent = 0.08; // 8% average savings
    const savingsPerVehicle = avgVehiclePrice * avgSavingsPercent;
    const monthlySavings = savingsPerVehicle * vehiclesPerMonth;
    const yearlySavings = monthlySavings * 12;
    const timesSavedHours = vehiclesPerMonth * 2; // 2 hours saved per vehicle
    
    return {
      savingsPerVehicle: Math.round(savingsPerVehicle),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      timesSavedHours,
    };
  }, [vehiclesPerMonth, avgVehiclePrice]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section className="py-24 lg:py-32 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111111] border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-[#CCFF00]" />
              </div>
              <div>
                <h3 className="font-['Orbitron'] text-base font-bold text-white">ROI Rechner</h3>
                <p className="text-white/50 text-sm">Berechne dein Einsparpotenzial</p>
              </div>
            </div>

            {/* Vehicles per Month */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white/80 text-sm">Fahrzeuge pro Monat</label>
                <span className="text-[#CCFF00] font-semibold">{vehiclesPerMonth}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={vehiclesPerMonth}
                onChange={(e) => setVehiclesPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                style={{
                  background: `linear-gradient(to right, #CCFF00 0%, #CCFF00 ${vehiclesPerMonth}%, #1a1a1a ${vehiclesPerMonth}%, #1a1a1a 100%)`
                }}
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>1</span>
                <span>100</span>
              </div>
            </div>

            {/* Average Vehicle Price */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white/80 text-sm">Ø Fahrzeugpreis</label>
                <span className="text-[#CCFF00] font-semibold">{formatCurrency(avgVehiclePrice)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={avgVehiclePrice}
                onChange={(e) => setAvgVehiclePrice(Number(e.target.value))}
                className="w-full h-2 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                style={{
                  background: `linear-gradient(to right, #CCFF00 0%, #CCFF00 ${((avgVehiclePrice - 5000) / 95000) * 100}%, #1a1a1a ${((avgVehiclePrice - 5000) / 95000) * 100}%, #1a1a1a 100%)`
                }}
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>€5.000</span>
                <span>€100.000</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#0A0A0A] rounded-xl">
                <div className="text-white/50 text-xs mb-1">Pro Fahrzeug</div>
                <div className="text-white font-bold text-lg">{formatCurrency(calculations.savingsPerVehicle)}</div>
              </div>
              <div className="p-4 bg-[#0A0A0A] rounded-xl">
                <div className="text-white/50 text-xs mb-1">Pro Monat</div>
                <div className="text-white font-bold text-lg">{formatCurrency(calculations.monthlySavings)}</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Results Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
              Dein Einsparpotenzial
            </span>
            
            <div className="mb-6">
              <motion.div 
                key={calculations.yearlySavings}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-['Orbitron'] text-4xl lg:text-6xl font-bold text-white tracking-tighter"
              >
                {formatCurrency(calculations.yearlySavings)}
              </motion.div>
              <div className="text-white/50 text-lg mt-2">pro Jahr</div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white/80">~8% Ersparnis pro Deal</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-[#00E5FF]" />
                <span className="text-white/80">{calculations.timesSavedHours}h Zeit gespart/Monat</span>
              </div>
            </div>

            <Link to="/demo">
              <Button className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-8 py-6 rounded-lg group">
                Jetzt starten
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
