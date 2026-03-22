import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock, 
  Server, Database, Cpu, Globe, Activity, RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  { 
    name: 'API', 
    description: 'REST API Endpoints',
    icon: Server,
    status: 'operational',
    uptime: '99.99%',
    responseTime: '45ms'
  },
  { 
    name: 'Datenbank', 
    description: 'PostgreSQL Cluster',
    icon: Database,
    status: 'operational',
    uptime: '99.95%',
    responseTime: '12ms'
  },
  { 
    name: 'Market Crawler', 
    description: 'Fahrzeug-Listings',
    icon: Globe,
    status: 'operational',
    uptime: '99.90%',
    responseTime: '2.3s'
  },
  { 
    name: 'Tuning Crawler', 
    description: 'ECU/Tool Updates',
    icon: Cpu,
    status: 'operational',
    uptime: '99.85%',
    responseTime: '1.8s'
  },
  { 
    name: 'Deal Score Engine', 
    description: 'Bewertungs-Algorithmus',
    icon: Activity,
    status: 'operational',
    uptime: '99.99%',
    responseTime: '89ms'
  },
];

const incidents = [
  {
    date: '2024-01-15',
    title: 'Erhöhte API-Latenz',
    status: 'resolved',
    duration: '23 Minuten',
    description: 'Kurzzeitig erhöhte Response-Zeiten durch Traffic-Spike.'
  },
  {
    date: '2024-01-08',
    title: 'Crawler Wartung',
    status: 'resolved',
    duration: '45 Minuten',
    description: 'Geplante Wartung der Crawler-Infrastruktur.'
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'operational': return 'text-green-400 bg-green-500/10 border-green-500/20';
    case 'degraded': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    case 'outage': return 'text-red-400 bg-red-500/10 border-red-500/20';
    default: return 'text-white/40 bg-white/5 border-white/10';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'operational': return CheckCircle;
    case 'degraded': return AlertTriangle;
    case 'outage': return XCircle;
    default: return Clock;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'operational': return 'Operational';
    case 'degraded': return 'Degraded';
    case 'outage': return 'Outage';
    case 'resolved': return 'Behoben';
    default: return 'Unknown';
  }
};

export const StatusPage = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allOperational = services.every(s => s.status === 'operational');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" 
              alt="intelligent automotive"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-sm">intelligent</span>
              <span className="text-[#CCFF00] font-bold text-sm">automotive</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-white/60 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Aktualisieren
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        {/* Overall Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border mb-8 ${
            allOperational 
              ? 'bg-green-500/5 border-green-500/20' 
              : 'bg-yellow-500/5 border-yellow-500/20'
          }`}
        >
          <div className="flex items-center gap-4">
            {allOperational ? (
              <CheckCircle className="w-10 h-10 text-green-400" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-yellow-400" />
            )}
            <div>
              <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                {allOperational ? 'Alle Systeme operational' : 'Teilweise Einschränkungen'}
              </h1>
              <p className="text-white/60">
                Letztes Update: {lastUpdate.toLocaleTimeString('de-DE')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-6">
            Services
          </h2>
          <div className="space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              const StatusIcon = getStatusIcon(service.status);
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-[#111111] border border-white/10 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{service.name}</div>
                      <div className="text-white/40 text-sm">{service.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-white/60 text-sm">{service.uptime} uptime</div>
                      <div className="text-white/40 text-xs">{service.responseTime} avg</div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getStatusColor(service.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{getStatusText(service.status)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Uptime Chart Placeholder */}
        <div className="mb-12">
          <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-6">
            Uptime der letzten 90 Tage
          </h2>
          <div className="p-6 bg-[#111111] border border-white/10 rounded-xl">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 90 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 rounded-sm ${
                    Math.random() > 0.02 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  title={`Tag ${90 - i}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-white/40 text-xs">
              <span>90 Tage</span>
              <span>Heute</span>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-green-500" />
                <span className="text-white/60 text-sm">100% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-yellow-500" />
                <span className="text-white/60 text-sm">Einschränkungen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-500" />
                <span className="text-white/60 text-sm">Ausfall</span>
              </div>
            </div>
          </div>
        </div>

        {/* Past Incidents */}
        <div>
          <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-6">
            Vergangene Vorfälle
          </h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-[#111111] border border-white/10 rounded-xl"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-medium">{incident.title}</div>
                    <div className="text-white/40 text-sm">{incident.date} • {incident.duration}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(incident.status)}`}>
                    {getStatusText(incident.status)}
                  </span>
                </div>
                <p className="text-white/60 text-sm">{incident.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 mt-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" 
              alt="intelligent automotive"
              className="w-8 h-8 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-xs">intelligent</span>
              <span className="text-[#CCFF00] font-bold text-xs">automotive</span>
            </div>
          </Link>
          <p className="text-white/40 text-sm">© 2024 intelligent-automotive. Status Page.</p>
        </div>
      </footer>
    </div>
  );
};
