import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Cpu, Wrench, Check, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const carBrands = ['BMW', 'Audi', 'Mercedes', 'VW', 'Porsche'];
const carModels = {
  'BMW': ['320d', '330i', 'M340i', 'M3', 'X3'],
  'Audi': ['A4', 'A6', 'RS3', 'S4', 'Q5'],
  'Mercedes': ['C220d', 'C300', 'E300', 'AMG A35', 'GLC'],
  'VW': ['Golf GTI', 'Golf R', 'Passat', 'Tiguan', 'Arteon'],
  'Porsche': ['Macan', 'Cayenne', '911', 'Panamera', 'Taycan'],
};

const ecuData = {
  'BMW-320d': { ecu: 'Bosch EDC17C50', tcu: 'ZF 8HP', tools: ['Autotuner', 'KESSv3', 'KTAG'] },
  'BMW-330i': { ecu: 'Bosch MG1CS003', tcu: 'ZF 8HP', tools: ['Autotuner', 'KESSv3'] },
  'BMW-M340i': { ecu: 'Bosch MG1CS201', tcu: 'ZF 8HP', tools: ['Autotuner'] },
  'Audi-A4': { ecu: 'Bosch MED17.1', tcu: 'DL501', tools: ['KESSv3', 'KTAG', 'CMD'] },
  'Audi-RS3': { ecu: 'Bosch MED17.1.62', tcu: 'DQ500', tools: ['Autotuner', 'KESSv3'] },
  'Mercedes-C220d': { ecu: 'Bosch EDC17CP57', tcu: '9G-Tronic', tools: ['Autotuner', 'KESSv3', 'KTAG'] },
  'VW-Golf GTI': { ecu: 'Bosch MED17.5.2', tcu: 'DQ381', tools: ['KESSv3', 'KTAG', 'CMD'] },
  'Porsche-Macan': { ecu: 'Bosch MED17.1.1', tcu: 'PDK', tools: ['Autotuner'] },
};

export const ECUVisualizer = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setShowResult(false);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setShowResult(true);
  };

  const ecuKey = `${selectedBrand}-${selectedModel}`;
  const result = ecuData[ecuKey] || ecuData['BMW-320d'];

  return (
    <section className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em] mb-4 block">
            Interaktive Demo
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            ECU Finder ausprobieren
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Wähle ein Fahrzeug und sieh sofort welche Steuergeräte verbaut sind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left - Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111111] border border-white/10 rounded-2xl p-6"
          >
            {/* Brand Selection */}
            <div className="mb-6">
              <label className="text-white/60 text-sm mb-3 block">1. Marke wählen</label>
              <div className="flex flex-wrap gap-2">
                {carBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedBrand === brand
                        ? 'bg-[#CCFF00] text-black'
                        : 'bg-[#0A0A0A] text-white/70 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            <AnimatePresence>
              {selectedBrand && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <label className="text-white/60 text-sm mb-3 block">2. Modell wählen</label>
                  <div className="flex flex-wrap gap-2">
                    {carModels[selectedBrand]?.map((model) => (
                      <button
                        key={model}
                        onClick={() => handleModelSelect(model)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedModel === model
                            ? 'bg-[#00E5FF] text-black'
                            : 'bg-[#0A0A0A] text-white/70 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected Vehicle Display */}
            {selectedBrand && selectedModel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-[#0A0A0A] rounded-xl border border-[#CCFF00]/20"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-[#CCFF00]" />
                  <span className="text-white font-medium">{selectedBrand} {selectedModel}</span>
                  <Check className="w-4 h-4 text-green-400 ml-auto" />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right - ECU Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#111111] border border-white/10 rounded-2xl p-6"
                >
                  {/* ECU Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-[#0A0A0A] rounded-xl border border-[#CCFF00]/20 mb-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-[#CCFF00]" />
                      </div>
                      <div>
                        <span className="text-[#CCFF00] text-xs font-mono">ECU</span>
                        <div className="text-white font-semibold">{result.ecu}</div>
                      </div>
                    </div>
                    <div className="h-2 bg-[#111111] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#CCFF00] to-[#00E5FF]"
                      />
                    </div>
                  </motion.div>

                  {/* TCU Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-[#0A0A0A] rounded-xl border border-[#00E5FF]/20 mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <div>
                        <span className="text-[#00E5FF] text-xs font-mono">TCU</span>
                        <div className="text-white font-semibold">{result.tcu}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Supported Tools */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-white/50" />
                      <span className="text-white/60 text-sm">Unterstützte Tools</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.tools.map((tool, index) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-sm border border-green-500/20"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#111111] border border-white/10 rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Cpu className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40">Wähle ein Fahrzeug um die ECU-Daten zu sehen</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-center"
              >
                <Button
                  asChild
                  variant="outline"
                  className="border-[#CCFF00]/30 text-[#CCFF00] hover:bg-[#CCFF00]/10 rounded-lg"
                >
                  <a href="/tuning">
                    Vollständige Datenbank erkunden
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
