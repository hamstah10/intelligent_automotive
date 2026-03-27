import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Eye, Copy, Check, Calendar, UserPlus, Code, Bell, Newspaper,
  CreditCard, ChevronRight, Sparkles, X, Download, Edit3
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { t, surface, surfaceAlt } from './themeUtils';

const PURPLE = '#c084fc';
const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

/* ── Template Data ── */
const templates = [
  {
    id: 'demo-booking',
    name: 'Demo-Buchung Bestätigung',
    category: 'Transaktional',
    icon: Calendar,
    color: GREEN,
    subject: 'Deine Demo ist gebucht — wir freuen uns auf dich!',
    description: 'Wird nach einer Demo-Anfrage automatisch versendet.',
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a">
  <div style="background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);padding:40px 32px;text-align:center;border-bottom:1px solid #1a1a1a">
    <div style="display:inline-block;background:#CCFF0020;border:1px solid #CCFF0040;border-radius:12px;padding:12px 16px;margin-bottom:20px">
      <span style="color:#CCFF00;font-size:24px">A</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px">Deine Demo ist gebucht!</h1>
    <p style="color:#999;font-size:14px;margin:0">Wir freuen uns, dir AutoIntel persönlich zu zeigen.</p>
  </div>
  <div style="padding:32px">
    <div style="background:#111;border:1px solid #1a1a1a;border-radius:12px;padding:20px;margin-bottom:24px">
      <p style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">DEMO DETAILS</p>
      <table style="width:100%">
        <tr><td style="color:#999;font-size:13px;padding:6px 0">Datum</td><td style="color:#fff;font-size:13px;text-align:right;font-weight:600">{{datum}}</td></tr>
        <tr><td style="color:#999;font-size:13px;padding:6px 0">Uhrzeit</td><td style="color:#fff;font-size:13px;text-align:right;font-weight:600">{{uhrzeit}}</td></tr>
        <tr><td style="color:#999;font-size:13px;padding:6px 0">Produkt</td><td style="color:#CCFF00;font-size:13px;text-align:right;font-weight:600">{{produkt}}</td></tr>
        <tr><td style="color:#999;font-size:13px;padding:6px 0">Dauer</td><td style="color:#fff;font-size:13px;text-align:right">ca. 30 Min.</td></tr>
      </table>
    </div>
    <p style="color:#999;font-size:13px;line-height:1.7;margin:0 0 24px">Ein Mitglied unseres Teams wird sich vorab per E-Mail bei dir melden, um die Agenda abzustimmen.</p>
    <a href="#" style="display:block;background:#CCFF00;color:#000;text-align:center;padding:14px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Zum Kalender hinzufügen</a>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #1a1a1a;text-align:center">
    <p style="color:#555;font-size:11px;margin:0">© 2026 intelligent-automotive · <a href="#" style="color:#666;text-decoration:none">Abmelden</a></p>
  </div>
</div>`,
  },
  {
    id: 'welcome',
    name: 'Willkommen — Registrierung',
    category: 'Transaktional',
    icon: UserPlus,
    color: BLUE,
    subject: 'Willkommen bei AutoIntel — dein Account ist bereit!',
    description: 'Wird nach erfolgreicher Registrierung versendet.',
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a">
  <div style="background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);padding:40px 32px;text-align:center;border-bottom:1px solid #1a1a1a">
    <div style="display:inline-block;background:#00E5FF20;border:1px solid #00E5FF40;border-radius:12px;padding:12px 16px;margin-bottom:20px">
      <span style="color:#00E5FF;font-size:24px">A</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px">Willkommen, {{name}}!</h1>
    <p style="color:#999;font-size:14px;margin:0">Dein AutoIntel Account ist bereit.</p>
  </div>
  <div style="padding:32px">
    <p style="color:#ccc;font-size:14px;line-height:1.7;margin:0 0 24px">Du hast jetzt Zugang zu allen Funktionen deines <span style="color:#00E5FF;font-weight:600">{{plan}}</span> Plans. Hier sind deine ersten Schritte:</p>
    <div style="margin-bottom:24px">
      <div style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:16px;margin-bottom:8px;display:flex;align-items:center">
        <span style="background:#00E5FF20;color:#00E5FF;border-radius:8px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;margin-right:14px">1</span>
        <span style="color:#ccc;font-size:13px">Dashboard erkunden & erste Suche starten</span>
      </div>
      <div style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:16px;margin-bottom:8px;display:flex;align-items:center">
        <span style="background:#CCFF0020;color:#CCFF00;border-radius:8px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;margin-right:14px">2</span>
        <span style="color:#ccc;font-size:13px">Alerts konfigurieren für Deals unter Marktwert</span>
      </div>
      <div style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:16px;display:flex;align-items:center">
        <span style="background:#c084fc20;color:#c084fc;border-radius:8px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;margin-right:14px">3</span>
        <span style="color:#ccc;font-size:13px">AI Coding-Berater ausprobieren</span>
      </div>
    </div>
    <a href="#" style="display:block;background:#00E5FF;color:#000;text-align:center;padding:14px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Dashboard öffnen</a>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #1a1a1a;text-align:center">
    <p style="color:#555;font-size:11px;margin:0">© 2026 intelligent-automotive · <a href="#" style="color:#666;text-decoration:none">Abmelden</a></p>
  </div>
</div>`,
  },
  {
    id: 'coding-demo',
    name: 'Coding Demo — Freischaltung',
    category: 'Lead-Generierung',
    icon: Code,
    color: PURPLE,
    subject: 'Deine Coding Demo ist freigeschaltet!',
    description: 'Wird nach E-Mail-Eingabe im Coding Demo Gate versendet.',
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a">
  <div style="background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);padding:40px 32px;text-align:center;border-bottom:1px solid #1a1a1a">
    <div style="display:inline-block;background:#c084fc20;border:1px solid #c084fc40;border-radius:12px;padding:12px 16px;margin-bottom:20px">
      <span style="color:#c084fc;font-size:24px">&lt;/&gt;</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px">Coding Demo freigeschaltet!</h1>
    <p style="color:#999;font-size:14px;margin:0">Erlebe die Codierungs-Datenbank interaktiv.</p>
  </div>
  <div style="padding:32px">
    <p style="color:#ccc;font-size:14px;line-height:1.7;margin:0 0 24px">Du kannst jetzt die interaktive Coding-Demo nutzen. Wähle ein Fahrzeug, ein Steuergerät und simuliere eine echte Codierung — Byte für Byte.</p>
    <div style="background:#111;border:1px solid #c084fc30;border-radius:12px;padding:20px;margin-bottom:24px">
      <p style="color:#c084fc;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">WAS DICH ERWARTET</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 6px">✓ 5 Fahrzeuge (VW, Audi, Skoda, SEAT)</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 6px">✓ 4 Steuergeräte mit echten Codierungen</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 6px">✓ Byte/Bit Visualisierung in Echtzeit</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0">✓ Risikobewertung pro Codierung</p>
    </div>
    <a href="#" style="display:block;background:#c084fc;color:#000;text-align:center;padding:14px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Demo jetzt starten</a>
    <p style="color:#666;font-size:12px;text-align:center;margin:16px 0 0">Die vollständige Datenbank mit 2.800+ Codierungen gibt es im Dashboard.</p>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #1a1a1a;text-align:center">
    <p style="color:#555;font-size:11px;margin:0">© 2026 intelligent-automotive · <a href="#" style="color:#666;text-decoration:none">Abmelden</a></p>
  </div>
</div>`,
  },
  {
    id: 'new-codings',
    name: 'Neue Codierungen Alert',
    category: 'Benachrichtigung',
    icon: Bell,
    color: '#facc15',
    subject: '38 neue Codierungen diese Woche — darunter 5 für dein Fahrzeug',
    description: 'Wöchentliche Benachrichtigung über neue Codierungen.',
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a">
  <div style="padding:32px;text-align:center;border-bottom:1px solid #1a1a1a">
    <h1 style="font-size:20px;font-weight:700;margin:0 0 8px">38 neue Codierungen</h1>
    <p style="color:#999;font-size:13px;margin:0">KW 12 · 17.–23. März 2026</p>
  </div>
  <div style="padding:32px">
    <p style="color:#facc15;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;font-weight:600">FÜR DEIN FAHRZEUG</p>
    <div style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:14px;margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><span style="color:#fff;font-size:13px;font-weight:600">Ambiente 30 Farben</span><br><span style="color:#666;font-size:11px">VW Golf 8 · MIB / 5F</span></div>
        <span style="background:#22c55e20;color:#22c55e;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px">Niedrig</span>
      </div>
    </div>
    <div style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:14px;margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><span style="color:#fff;font-size:13px;font-weight:600">Dynamische Bremsleuchte</span><br><span style="color:#666;font-size:11px">VW Golf 8 · ABS / 03</span></div>
        <span style="background:#22c55e20;color:#22c55e;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px">Niedrig</span>
      </div>
    </div>
    <div style="background:#111;border:1px solid #1a1a1a;border-radius:10px;padding:14px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><span style="color:#fff;font-size:13px;font-weight:600">ESC Sport Erweiterung</span><br><span style="color:#666;font-size:11px">VW Golf 8 · ABS / 03</span></div>
        <span style="background:#ef444420;color:#ef4444;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px">Hoch</span>
      </div>
    </div>
    <a href="#" style="display:block;background:#facc15;color:#000;text-align:center;padding:14px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Alle 38 Codierungen ansehen</a>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #1a1a1a;text-align:center">
    <p style="color:#555;font-size:11px;margin:0">© 2026 intelligent-automotive · <a href="#" style="color:#666;text-decoration:none">Abmelden</a></p>
  </div>
</div>`,
  },
  {
    id: 'newsletter',
    name: 'Wöchentlicher Digest',
    category: 'Marketing',
    icon: Newspaper,
    color: BLUE,
    subject: 'AutoIntel Weekly — Markt-Update, neue Features & Deals der Woche',
    description: 'Wöchentlicher Newsletter mit Highlights.',
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a">
  <div style="padding:32px;border-bottom:1px solid #1a1a1a">
    <p style="color:#00E5FF;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;font-weight:600">WEEKLY DIGEST · KW 12</p>
    <h1 style="font-size:24px;font-weight:700;margin:0;line-height:1.3">Markt-Update, neue Features<br>& Top-Deals der Woche</h1>
  </div>
  <div style="padding:32px">
    <div style="margin-bottom:28px">
      <p style="color:#00E5FF;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600">MARKT HIGHLIGHTS</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 8px">• BMW 3er Preise fallen um <span style="color:#22c55e;font-weight:600">-4.2%</span> — beste Einstiegspreise seit Q3/2025</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0 0 8px">• Mercedes C-Klasse Nachfrage <span style="color:#ef4444;font-weight:600">+12%</span> im Vergleich zur Vorwoche</p>
      <p style="color:#ccc;font-size:13px;line-height:1.7;margin:0">• 847 neue Deals unter Marktwert identifiziert</p>
    </div>
    <div style="margin-bottom:28px">
      <p style="color:#c084fc;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600">NEUE FEATURES</p>
      <div style="background:#111;border:1px solid #c084fc30;border-radius:10px;padding:16px;margin-bottom:8px">
        <span style="color:#c084fc;font-weight:600;font-size:13px">Coding AI Assistant</span>
        <p style="color:#999;font-size:12px;margin:4px 0 0">Strukturierte Codierungs-Empfehlungen mit Confidence Score und Risikobewertung.</p>
      </div>
    </div>
    <a href="#" style="display:block;background:#00E5FF;color:#000;text-align:center;padding:14px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none">Dashboard öffnen</a>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #1a1a1a;text-align:center">
    <p style="color:#555;font-size:11px;margin:0">© 2026 intelligent-automotive · <a href="#" style="color:#666;text-decoration:none">Abmelden</a></p>
  </div>
</div>`,
  },
  {
    id: 'upgrade',
    name: 'Upgrade-Angebot',
    category: 'Marketing',
    icon: CreditCard,
    color: GREEN,
    subject: 'Upgrade auf Combined — 20% Rabatt für bestehende Kunden',
    description: 'Upgrade-Kampagne für bestehende Nutzer.',
    html: `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a">
  <div style="background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);padding:40px 32px;text-align:center;border-bottom:1px solid #1a1a1a">
    <p style="color:#CCFF00;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;font-weight:600">EXKLUSIVES ANGEBOT</p>
    <h1 style="font-size:28px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px">20% auf Combined</h1>
    <p style="color:#999;font-size:14px;margin:0">Market + Tuning + Coding in einem Plan</p>
  </div>
  <div style="padding:32px">
    <div style="display:flex;gap:12px;margin-bottom:24px">
      <div style="flex:1;background:#111;border:1px solid #00E5FF30;border-radius:10px;padding:16px;text-align:center">
        <span style="color:#00E5FF;font-size:22px;font-weight:700">Market</span><p style="color:#666;font-size:11px;margin:4px 0 0">Marktanalyse</p>
      </div>
      <div style="flex:1;background:#111;border:1px solid #CCFF0030;border-radius:10px;padding:16px;text-align:center">
        <span style="color:#CCFF00;font-size:22px;font-weight:700">Tuning</span><p style="color:#666;font-size:11px;margin:4px 0 0">ECU Daten</p>
      </div>
      <div style="flex:1;background:#111;border:1px solid #c084fc30;border-radius:10px;padding:16px;text-align:center">
        <span style="color:#c084fc;font-size:22px;font-weight:700">Coding</span><p style="color:#666;font-size:11px;margin:4px 0 0">2.800+ Codes</p>
      </div>
    </div>
    <div style="text-align:center;margin-bottom:24px">
      <span style="color:#666;font-size:16px;text-decoration:line-through">349 €/Monat</span>
      <span style="color:#CCFF00;font-size:32px;font-weight:700;margin-left:12px">279 €</span>
      <span style="color:#999;font-size:14px">/Monat</span>
    </div>
    <a href="#" style="display:block;background:#CCFF00;color:#000;text-align:center;padding:16px;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none">Jetzt upgraden — 20% sparen</a>
    <p style="color:#666;font-size:11px;text-align:center;margin:12px 0 0">Angebot gültig bis {{ablauf}}. Monatlich kündbar.</p>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #1a1a1a;text-align:center">
    <p style="color:#555;font-size:11px;margin:0">© 2026 intelligent-automotive · <a href="#" style="color:#666;text-decoration:none">Abmelden</a></p>
  </div>
</div>`,
  },
];

const categories = ['Alle', 'Transaktional', 'Lead-Generierung', 'Benachrichtigung', 'Marketing'];

export const DashboardEmails = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [copied, setCopied] = useState(null);

  const filtered = activeCategory === 'Alle' ? templates : templates.filter(t => t.category === activeCategory);

  const copyHtml = (tmpl) => {
    navigator.clipboard.writeText(tmpl.html);
    setCopied(tmpl.id);
    toast.success('HTML kopiert!');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 data-testid="emails-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>E-Mail Templates</h1>
          <p className="text-sm mt-1" style={{ color: t.textSec }}>{templates.length} Templates für alle Touchpoints — vom Onboarding bis zum Upgrade.</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} data-testid={`email-cat-${cat.toLowerCase()}`}
            className="text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: activeCategory === cat ? `${PURPLE}15` : 'transparent',
              color: activeCategory === cat ? PURPLE : t.textMut,
              border: `1px solid ${activeCategory === cat ? `${PURPLE}40` : 'var(--d-border-sub)'}`,
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {filtered.map((tmpl, i) => {
          const Icon = tmpl.icon;
          return (
            <motion.div key={tmpl.id} data-testid={`email-template-${tmpl.id}`}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={`${surface('p-5')} cursor-pointer group`}
              onClick={() => setSelectedTemplate(tmpl)}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${tmpl.color}12` }}>
                  <Icon className="w-5 h-5" style={{ color: tmpl.color }} />
                </div>
                <span className="text-[9px] font-medium px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: `${tmpl.color}12`, color: tmpl.color }}>{tmpl.category}</span>
              </div>
              <h3 className="text-sm font-semibold mb-1.5 group-hover:text-[#c084fc] transition-colors" style={{ color: t.text }}>{tmpl.name}</h3>
              <p className="text-[11px] mb-3 leading-relaxed" style={{ color: t.textDim }}>{tmpl.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono truncate max-w-[200px]" style={{ color: t.textMut }}>Betreff: {tmpl.subject.substring(0, 40)}...</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={(e) => { e.stopPropagation(); copyHtml(tmpl); }} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" data-testid={`copy-${tmpl.id}`}>
                    {copied === tmpl.id ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" style={{ color: t.textMut }} />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedTemplate(tmpl); }} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" data-testid={`preview-${tmpl.id}`}>
                    <Eye className="w-3.5 h-3.5" style={{ color: t.textMut }} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setSelectedTemplate(null)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--d-bg)', border: '1px solid var(--d-border)' }}
              onClick={e => e.stopPropagation()}
              data-testid="email-preview-modal">

              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 shrink-0" style={{ borderBottom: '1px solid var(--d-border)' }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {(() => { const Icon = selectedTemplate.icon; return <Icon className="w-4 h-4" style={{ color: selectedTemplate.color }} />; })()}
                    <h3 className="text-sm font-bold" style={{ color: t.text }}>{selectedTemplate.name}</h3>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md" style={{ backgroundColor: `${selectedTemplate.color}12`, color: selectedTemplate.color }}>{selectedTemplate.category}</span>
                  </div>
                  <p className="text-[11px]" style={{ color: t.textDim }}>Betreff: {selectedTemplate.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => copyHtml(selectedTemplate)} size="sm" variant="outline"
                    className="h-8 px-3 rounded-lg text-[10px] font-semibold gap-1.5" style={{ borderColor: 'var(--d-border)', color: t.textSec }}
                    data-testid="modal-copy-btn">
                    {copied === selectedTemplate.id ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />} HTML kopieren
                  </Button>
                  <button onClick={() => setSelectedTemplate(null)} className="p-2 rounded-lg hover:bg-white/5">
                    <X className="w-4 h-4" style={{ color: t.textMut }} />
                  </button>
                </div>
              </div>

              {/* Rendered Preview */}
              <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="mx-auto" style={{ maxWidth: 600 }}
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.html }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
