import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, Clock, Car } from 'lucide-react';

const fakeDealData = [
  { car: 'BMW 320d Touring', year: '2021', savings: '2.400', location: 'München' },
  { car: 'Audi A4 Avant', year: '2020', savings: '1.850', location: 'Hamburg' },
  { car: 'Mercedes C220d', year: '2022', savings: '3.100', location: 'Berlin' },
  { car: 'VW Golf 8 GTI', year: '2021', savings: '1.950', location: 'Frankfurt' },
  { car: 'Porsche Macan', year: '2020', savings: '4.200', location: 'Stuttgart' },
  { car: 'BMW M340i', year: '2022', savings: '5.800', location: 'Köln' },
  { car: 'Audi RS3', year: '2021', savings: '3.400', location: 'Düsseldorf' },
  { car: 'Mercedes AMG A35', year: '2022', savings: '2.900', location: 'Leipzig' },
];

export const LiveTicker = () => {
  const [deals, setDeals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Add initial deal
    addNewDeal();
    
    // Add new deal every 4 seconds
    const interval = setInterval(() => {
      addNewDeal();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const addNewDeal = () => {
    const deal = {
      ...fakeDealData[currentIndex % fakeDealData.length],
      id: Date.now(),
      time: 'Gerade eben',
    };
    
    setDeals(prev => [deal, ...prev].slice(0, 5));
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <section className="py-8 px-6 bg-[#0A0A0A] border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#CCFF00]"></span>
            </span>
            <span className="text-white/60 text-sm font-medium">Live Deals</span>
          </div>
        </div>
        
        <div className="relative h-[180px] overflow-hidden">
          <AnimatePresence>
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ 
                  opacity: index === 0 ? 1 : 0.5 - (index * 0.1),
                  y: index * 36,
                  scale: 1
                }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute left-0 right-0"
              >
                <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  index === 0 
                    ? 'bg-[#CCFF00]/10 border-[#CCFF00]/30' 
                    : 'bg-[#111111] border-white/5'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-[#CCFF00]/20' : 'bg-white/5'
                    }`}>
                      <Car className={`w-5 h-5 ${index === 0 ? 'text-[#CCFF00]' : 'text-white/40'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${index === 0 ? 'text-white' : 'text-white/60'}`}>
                          {deal.car}
                        </span>
                        <span className="text-white/40 text-sm">{deal.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-white/40">{deal.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-semibold">-€{deal.savings}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/30 text-xs">
                      <Clock className="w-3 h-3" />
                      {deal.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
