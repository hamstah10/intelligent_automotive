import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Search, Book, Code, HelpCircle, FileText, 
  ChevronRight, ExternalLink, MessageCircle, Mail, Zap,
  Database, Lock, Webhook, Terminal, Copy, Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const supportCategories = [
  {
    id: 'hilfe',
    name: 'Hilfe Center',
    icon: HelpCircle,
    description: 'Antworten auf häufige Fragen',
    color: '#00E5FF',
  },
  {
    id: 'doku',
    name: 'Dokumentation',
    icon: Book,
    description: 'Anleitungen und Guides',
    color: '#CCFF00',
  },
  {
    id: 'api',
    name: 'API Dokumentation',
    icon: Code,
    description: 'Technische Referenz',
    color: '#FF6B6B',
  },
];

const helpArticles = [
  { title: 'Erste Schritte mit Market Intelligence', category: 'Getting Started', views: '2.4k' },
  { title: 'Deal Score verstehen und nutzen', category: 'Features', views: '1.8k' },
  { title: 'Suchprofile erstellen und verwalten', category: 'Features', views: '1.2k' },
  { title: 'Alerts konfigurieren', category: 'Features', views: '980' },
  { title: 'Account und Billing verwalten', category: 'Account', views: '756' },
  { title: 'ECU Finder Tutorial', category: 'Tuning', views: '1.5k' },
];

const docSections = [
  { 
    title: 'Schnellstart', 
    icon: Zap, 
    articles: ['Einführung', 'Installation', 'Erste Suche', 'Dashboard Overview'] 
  },
  { 
    title: 'Market Intelligence', 
    icon: Database, 
    articles: ['Listings durchsuchen', 'Deal Score', 'Preisanalyse', 'Konkurrenz-Monitoring'] 
  },
  { 
    title: 'Tuning Intelligence', 
    icon: Terminal, 
    articles: ['ECU Finder', 'Tool Matrix', 'Protokolle', 'Support Matrix'] 
  },
  { 
    title: 'Account & Sicherheit', 
    icon: Lock, 
    articles: ['Profil verwalten', 'Zwei-Faktor-Auth', 'API Keys', 'Team-Verwaltung'] 
  },
];

const apiEndpoints = [
  { method: 'GET', path: '/api/v1/listings', description: 'Alle Listings abrufen' },
  { method: 'GET', path: '/api/v1/listings/{id}', description: 'Einzelnes Listing abrufen' },
  { method: 'POST', path: '/api/v1/search', description: 'Suche durchführen' },
  { method: 'GET', path: '/api/v1/ecus', description: 'ECU Datenbank abfragen' },
  { method: 'GET', path: '/api/v1/tools', description: 'Tool Matrix abrufen' },
  { method: 'POST', path: '/api/v1/alerts', description: 'Alert erstellen' },
];

export const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('hilfe');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(index);
    toast.success('In Zwischenablage kopiert!');
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="site-subpage min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white/70 hover:text-white">
                Anmelden
              </Button>
            </Link>
            <Link to="/demo">
              <Button className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold rounded-lg">
                Demo buchen
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Orbitron'] text-base lg:text-5xl font-bold text-white mb-4"
          >
            Wie können wir helfen?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg mb-8"
          >
            Finde Antworten, Anleitungen und technische Dokumentation.
          </motion.p>
          
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              placeholder="Suche in Hilfe, Doku & API..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg w-full"
              data-testid="support-search"
            />
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-6 border-b border-white/10 sticky top-0 bg-[#050505]/95 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          {supportCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                data-testid={`tab-${cat.id}`}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all ${
                  activeTab === cat.id
                    ? 'bg-white/10 border border-white/20'
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" style={{ color: activeTab === cat.id ? cat.color : 'rgba(255,255,255,0.5)' }} />
                <span className={activeTab === cat.id ? 'text-white font-medium' : 'text-white/60'}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hilfe Center */}
          {activeTab === 'hilfe' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key="hilfe"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-['Orbitron'] text-base font-bold text-white">
                  Beliebte Artikel
                </h2>
                <Button variant="ghost" className="text-[#00E5FF] hover:text-[#00E5FF]/80">
                  Alle anzeigen <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {helpArticles.map((article, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 bg-[#111111] border border-white/10 rounded-xl hover:border-[#00E5FF]/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[#00E5FF] text-xs font-mono uppercase">{article.category}</span>
                        <h3 className="text-white font-medium mt-1 group-hover:text-[#00E5FF] transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      <span className="text-white/30 text-xs">{article.views} views</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Contact Support */}
              <div className="p-8 bg-[#111111] border border-white/10 rounded-2xl">
                <h3 className="font-['Orbitron'] text-base font-bold text-white mb-4">
                  Keine Antwort gefunden?
                </h3>
                <p className="text-white/60 mb-6">
                  Unser Support-Team hilft dir gerne weiter.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-[#00E5FF] text-black hover:bg-[#00CDE6] font-semibold rounded-lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-lg">
                    <Mail className="w-4 h-4 mr-2" />
                    E-Mail senden
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dokumentation */}
          {activeTab === 'doku' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key="doku"
            >
              <h2 className="font-['Orbitron'] text-base font-bold text-white mb-8">
                Dokumentation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {docSections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-[#111111] border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#CCFF00]" />
                        </div>
                        <h3 className="text-white font-semibold">{section.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {section.articles.map((article, i) => (
                          <li key={i}>
                            <a 
                              href="#" 
                              className="flex items-center gap-2 text-white/60 hover:text-[#CCFF00] transition-colors py-1"
                            >
                              <FileText className="w-4 h-4" />
                              {article}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* API Dokumentation */}
          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key="api"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-['Orbitron'] text-base font-bold text-white">
                    API Referenz
                  </h2>
                  <p className="text-white/60 mt-1">Version 1.0 • RESTful API</p>
                </div>
                <Button className="bg-[#FF6B6B] text-white hover:bg-[#FF5252] font-semibold rounded-lg">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  OpenAPI Spec
                </Button>
              </div>

              {/* Base URL */}
              <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-xl mb-8 font-mono text-sm">
                <span className="text-white/50">Base URL: </span>
                <span className="text-[#CCFF00]">https://api.intelligent-automotive.com/v1</span>
              </div>

              {/* Authentication */}
              <div className="p-6 bg-[#111111] border border-white/10 rounded-xl mb-8">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#FF6B6B]" />
                  Authentifizierung
                </h3>
                <p className="text-white/60 mb-4">
                  Alle API-Anfragen erfordern einen API-Key im Header:
                </p>
                <div className="p-3 bg-[#0A0A0A] rounded-lg font-mono text-sm">
                  <span className="text-[#FF6B6B]">Authorization</span>
                  <span className="text-white">: Bearer </span>
                  <span className="text-[#CCFF00]">YOUR_API_KEY</span>
                </div>
              </div>

              {/* Endpoints */}
              <h3 className="text-white font-semibold mb-4">Endpoints</h3>
              <div className="space-y-3">
                {apiEndpoints.map((endpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-[#111111] border border-white/10 rounded-xl flex items-center justify-between group hover:border-[#FF6B6B]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${
                        endpoint.method === 'GET' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-white font-mono">{endpoint.path}</code>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/50 text-sm hidden sm:block">{endpoint.description}</span>
                      <button
                        onClick={() => copyToClipboard(endpoint.path, index)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {copiedEndpoint === index ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/40" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Rate Limits */}
              <div className="mt-8 p-6 bg-[#111111] border border-[#FF6B6B]/20 rounded-xl">
                <h3 className="text-white font-semibold mb-2">Rate Limits</h3>
                <p className="text-white/60 text-sm">
                  • Basic: 100 Requests/Minute<br />
                  • Pro: 1.000 Requests/Minute<br />
                  • Elite: 10.000 Requests/Minute
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
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
          <p className="text-white/40 text-sm">© 2024 intelligent-automotive. Support Center.</p>
        </div>
      </footer>
    </div>
  );
};
