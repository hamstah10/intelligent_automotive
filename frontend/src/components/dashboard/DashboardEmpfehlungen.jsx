import { motion } from 'framer-motion';
import { Sparkles, Clock, Cpu, TrendingUp, Wrench, Shield, AlertTriangle } from 'lucide-react';
import { t, surface } from './themeUtils';

const recommendations = [
  {
    id: 'r-001',
    stage: 'Stage 1',
    title: 'ECU Optimierung',
    vehicle: 'Volkswagen Golf 8 GTI',
    engine: 'DNUA',
    ecu: 'Bosch MG1CS111',
    ps: 300,
    psGain: 55,
    nm: 450,
    nmGain: 80,
    components: ['ECU-Remap', 'Ladedruck-Optimierung', 'Kennfeld-Anpassung'],
    description: 'Kennfeldoptimierung der Zündung, Ladedruck und Einspritzmenge. Seriennahe Abstimmung mit vollem Komforterhalt.',
    risk: 'Niedrig',
    timestamp: '22.3.2026, 18:28:17',
  },
  {
    id: 'r-002',
    stage: 'Stage 2',
    title: 'Performance Paket',
    vehicle: 'BMW 340i G20',
    engine: 'B58B30O1',
    ecu: 'Bosch MG1CS024',
    ps: 450,
    psGain: 76,
    nm: 600,
    nmGain: 100,
    components: ['ECU-Remap', 'Downpipe', 'Ladeluftkühler', 'Ölkühler'],
    description: 'Erweiterte Kennfeldoptimierung mit Downpipe und Ladeluftkühler-Upgrade. Höhere thermische Belastung – Ölkühler empfohlen.',
    risk: 'Mittel',
    timestamp: '22.3.2026, 15:08:17',
  },
  {
    id: 'r-003',
    stage: 'Stage 1',
    title: 'ECU Optimierung',
    vehicle: 'Audi RS3 Sportback (8Y)',
    engine: 'DAZA',
    ecu: 'Bosch MED17.1.62',
    ps: 440,
    psGain: 40,
    nm: 530,
    nmGain: 50,
    components: ['ECU-Remap', 'Ladedruck-Optimierung', 'Launch-Control Anpassung'],
    description: 'Stage 1 Optimierung des 2.5 TFSI mit angepasster Ladedruck-Kennlinie und Launch-Control Tuning. OPF-kompatibel.',
    risk: 'Niedrig',
    timestamp: '21.3.2026, 09:45:33',
  },
  {
    id: 'r-004',
    stage: 'Stage 2',
    title: 'Track Paket',
    vehicle: 'Mercedes-AMG A35',
    engine: 'M260',
    ecu: 'Bosch MED17.7.2',
    ps: 380,
    psGain: 74,
    nm: 480,
    nmGain: 80,
    components: ['ECU-Remap', 'Downpipe', 'Ansaugung', 'Getriebekalibrierung'],
    description: 'Erweiterte Kennfeldoptimierung mit Downpipe und High-Flow Ansaugung. Getriebe-Kalibrierung für schnellere Schaltvorgänge.',
    risk: 'Hoch',
    timestamp: '20.3.2026, 14:12:05',
  },
];

const riskConfig = {
  Niedrig: { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.2)', icon: Shield },
  Mittel: { color: '#facc15', bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.2)', icon: AlertTriangle },
  Hoch: { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.2)', icon: AlertTriangle },
};

export const DashboardEmpfehlungen = () => (
  <>
    {/* Header */}
    <div className="mb-8">
      <h1 data-testid="empfehlungen-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>
        Empfehlungen
      </h1>
      <p className="text-sm mt-1.5" style={{ color: t.textSec }}>
        AI-generierte Tuning-Empfehlungen – alle Werte sind fahrzeugspezifische Prognosen
      </p>
    </div>

    {/* Recommendation Cards */}
    <div className="space-y-5">
      {recommendations.map((rec, i) => {
        const risk = riskConfig[rec.risk];
        const RiskIcon = risk.icon;
        return (
          <motion.div
            key={rec.id}
            data-testid={`recommendation-card-${rec.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`${surface()} p-6`}
          >
            {/* Stage Title */}
            <div className="flex items-center gap-2.5 mb-3">
              <Sparkles className="w-5 h-5 text-[#CCFF00]" />
              <h2 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>
                {rec.stage} – {rec.title}
              </h2>
            </div>

            {/* Vehicle + ECU Info */}
            <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: t.textSec }}>
              <span>{rec.vehicle}</span>
              <span style={{ color: t.textDim }}>·</span>
              <span>{rec.engine}</span>
              <span style={{ color: t.textDim }}>·</span>
              <span>{rec.ecu}</span>
            </div>

            {/* Performance Data Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Prognose PS */}
              <div>
                <div className="text-sm font-medium mb-2" style={{ color: t.textSec }}>Prognose PS</div>
                <div className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>
                  {rec.ps}
                </div>
                <div className="text-sm font-semibold mt-1 text-[#22c55e]">+{rec.psGain} PS</div>
              </div>

              {/* Prognose Nm */}
              <div>
                <div className="text-sm font-medium mb-2" style={{ color: t.textSec }}>Prognose Nm</div>
                <div className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>
                  {rec.nm}
                </div>
                <div className="text-sm font-semibold mt-1 text-[#22c55e]">+{rec.nmGain} Nm</div>
              </div>

              {/* Komponenten */}
              <div>
                <div className="text-sm font-medium mb-2" style={{ color: t.textSec }}>Komponenten</div>
                <div className="flex flex-wrap gap-2">
                  {rec.components.map(comp => (
                    <span
                      key={comp}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-300"
                      style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border)', color: t.text }}
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-2" style={{ color: t.textSec }}>
              {rec.description}
            </p>

            {/* Disclaimer */}
            <p className="text-xs mb-4" style={{ color: t.textDim }}>
              Alle Werte sind fahrzeugspezifische Prognosen basierend auf Referenzmessungen vergleichbarer Fahrzeuge.
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--d-border-sub)' }}>
              <div className="flex items-center gap-4 text-xs" style={{ color: t.textDim }}>
                <span className="font-mono">{rec.id}</span>
                <span style={{ color: t.textDim }}>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rec.timestamp}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: risk.bg, color: risk.color, border: `1px solid ${risk.border}` }}
                >
                  <RiskIcon className="w-3 h-3" />
                  Risiko: {rec.risk}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </>
);
