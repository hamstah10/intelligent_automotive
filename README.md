# AutoIntel — Automotive Intelligence SaaS Platform

> Die zentrale KI-Plattform fur Fahrzeug-Marktanalyse, ECU-Tuning und Fahrzeug-Codierung.

---

## Inhaltsverzeichnis

- [Uberblick](#uberblick)
- [Tech Stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Seiten & Bereiche](#seiten--bereiche)
  - [Landing Page](#1-landing-page-)
  - [Produktseiten](#2-produktseiten)
  - [Dashboard](#3-dashboard)
  - [Weitere Seiten](#4-weitere-seiten)
- [Backend API](#backend-api)
- [Theming & Design](#theming--design)
- [Datenmodell](#datenmodell)
- [Roadmap](#roadmap)

---

## Uberblick

AutoIntel vereint drei spezialisierte Produkte unter einer Premium-Oberflaeche:

| Produkt | Farbe | Beschreibung |
|---------|-------|-------------|
| **Market Intelligence** | Cyan `#00E5FF` | KI-gestuetzte Fahrzeug-Deal-Analyse, Markttrends, Preisverfolgung |
| **Tuning Intelligence** | Lime `#CCFF00` | ECU-Wissensdatenbank, Leistungstuning-Empfehlungen |
| **Coding Intelligence** | Purple `#c084fc` | Fahrzeug-Codierungsdatenbank, ECU-Module, Byte/Bit-Dokumentation |

---

## Tech Stack

| Bereich | Technologie |
|---------|-------------|
| Frontend | React, TailwindCSS, Framer Motion, Shadcn UI, Recharts |
| Backend | FastAPI (Python), Motor (Async MongoDB) |
| KI-Integration | OpenAI GPT-4o via Emergent LLM Key (`emergentintegrations`) |
| Schriften | Orbitron (Ueberschriften), Exo 2 (Fliesstext) |
| Themes | Dark / Light / Black Gradient (3-Wege-System) |

---

## Projektstruktur

```
/app/
├── backend/
│   ├── server.py              # FastAPI Hauptserver, MongoDB-Anbindung
│   ├── ai_routes.py           # KI-Endpunkte (Deal Analyzer, ECU Bot, Coding Assistant)
│   ├── requirements.txt
│   └── .env                   # MONGO_URL, DB_NAME, EMERGENT_LLM_KEY
│
├── frontend/src/
│   ├── App.js                 # Routing (React Router)
│   ├── index.css              # Globale Styles & CSS-Variablen
│   ├── App.css                # App-spezifische Styles
│   │
│   ├── components/
│   │   ├── landing/           # 20+ Landing-Page-Sektionen
│   │   ├── dashboard/         # 25+ Dashboard-Komponenten
│   │   ├── pages/             # 9 eigenstaendige Seiten
│   │   ├── modals/            # Modale Dialoge
│   │   └── ui/                # Shadcn UI Basis-Komponenten
│   │
│   ├── hooks/                 # Custom React Hooks
│   └── lib/                   # Utility-Funktionen
│
└── memory/
    └── PRD.md                 # Product Requirements Document
```

---

## Seiten & Bereiche

### 1. Landing Page (`/`)

Die Startseite besteht aus ueber 20 interaktiven Sektionen:

| Sektion | Komponente | Beschreibung |
|---------|-----------|-------------|
| Navigation | `Navigation.jsx` | Sticky-Header mit Produkt-Links und CTA-Buttons |
| Hero | `HeroSection.jsx` | SEO-Headline mit 3-Farben-Gradient: *"Analysiere Maerkte. Tune Steuergeraete. Codiere Fahrzeuge."* |
| Integration Showcase | `IntegrationShowcase.jsx` | Partner- und Tool-Integrationen |
| Live Ticker | `LiveTicker.jsx` | Echtzeit-Marktdaten-Animation |
| Realtime Counter | `RealtimeCounter.jsx` | Live-Zaehler (Analysen, Nutzer, Deals) |
| Features Market | `FeaturesMarket.jsx` | Market Intelligence Produktvorstellung |
| Markt-Heatmap | `MarketHeatmap.jsx` | Interaktive Deutschland-Karte mit Preisdaten |
| Parallax Data Wall | `ParallaxDataWall.jsx` | Scrollbare Daten-Visualisierung |
| ROI Calculator | `ROICalculator.jsx` | Interaktiver ROI-Rechner fuer Haendler |
| Vehicle Configurator | `VehicleConfigurator.jsx` | Fahrzeug-Konfiguration mit Live-Analyse |
| Deal Quiz | `DealQuiz.jsx` | Interaktives Quiz: *"Ist das ein guter Deal?"* |
| Features Tuning | `FeaturesTuning.jsx` | Tuning Intelligence Produktvorstellung |
| Features Coding | `FeaturesCoding.jsx` | Coding Intelligence Produktvorstellung |
| ECU Visualizer | `ECUVisualizer.jsx` | 3D-aehnliche Steuergeraet-Visualisierung |
| AI Deal Analyzer | `AIDealAnalyzer.jsx` | Live-Demo der KI-Deal-Analyse |
| Before/After Slider | `BeforeAfterSlider.jsx` | Vorher/Nachher-Vergleich (Tuning-Ergebnisse) |
| Competitor Radar | `CompetitorRadar.jsx` | Wettbewerber-Vergleich als Radar-Chart |
| How It Works | `HowItWorks.jsx` | 3-Schritte-Erklaerung |
| Pricing | `Pricing.jsx` | 4 Tarife (Starter, Pro, Enterprise, Alles-Paket) inkl. Coding |
| Testimonials | `Testimonials.jsx` | Kundenstimmen-Karussell |
| FAQ | `FAQ.jsx` | Haeufig gestellte Fragen (Accordion) |
| Footer | `Footer.jsx` | Sitemap, Social Links, Copyright 2026 |

---

### 2. Produktseiten

| Route | Seite | Komponente | Beschreibung |
|-------|-------|-----------|-------------|
| `/market` | Market Intelligence | `MarketPage.jsx` | Produktseite mit Features, USPs und CTA |
| `/tuning` | Tuning Intelligence | `TuningPage.jsx` | ECU-Tuning Produktseite mit KI-Demo |
| `/coding` | Coding Intelligence | `CodingPage.jsx` | Coding-Produktseite mit AI Berater Demo |
| `/coding/demo` | Live Coding Demo | `CodingDemoPage.jsx` | Interaktive Schritt-fuer-Schritt-Demo: E-Mail-Gate -> Fahrzeug -> ECU -> Byte/Bit -> Apply-Simulation |

---

### 3. Dashboard

Das Dashboard (`/dashboard/*`) ist der Kern der Plattform mit einer festen Sidebar-Navigation.

#### Layout & Navigation

| Komponente | Beschreibung |
|-----------|-------------|
| `DashboardPage.jsx` | Haupt-Layout mit Routing fuer alle Unterseiten |
| `DashboardLayout.jsx` | Wrapper mit Sidebar + Content-Area |
| `DashboardSidebar.jsx` | Linke Navigation mit 4 Sektionen: Haupt, Tools, Beispiele, Verwaltung |
| `DashboardThemeContext.jsx` | Theme-Provider (Dark/Light/Gradient) |
| `themeUtils.js` | CSS-Variablen fuer jedes Theme |

#### Hauptbereiche

| Route | Seite | Komponente | Funktionen |
|-------|-------|-----------|-----------|
| `/dashboard` | Uebersicht | `DashboardOverview.jsx` | KPIs, Charts, Aktivitaetsfeed, Quick Actions |
| `/dashboard/market` | Market | `DashboardMarket.jsx` | Marktdaten, Preistrends, Fahrzeuglisten |
| `/dashboard/tuning` | Tuning | `DashboardTuning.jsx` | ECU-Daten, Tuning-Auftraege, `ECUKnowledgeBot` |
| `/dashboard/coding` | Coding | `DashboardCoding.jsx` | Premium AI Coding Assistant, Module-Grid |
| `/dashboard/alerts` | Alerts | `DashboardAlerts.jsx` | Benachrichtigungen, KI-Muster-Erkennung |
| `/dashboard/reports` | Reports | `DashboardReports.jsx` | KI-generierte Marktberichte |
| `/dashboard/pakete` | Pakete & Addons | `DashboardPakete.jsx` | 4 Tarife + 9 Addons, Checkout-Vorbereitung |
| `/dashboard/emails` | E-Mail Templates | `DashboardEmails.jsx` | 15 HTML-E-Mail-Vorlagen (s. Details unten) |
| `/dashboard/garage` | Meine Garage | `DashboardGarage.jsx` | Fahrzeugverwaltung (CRUD), localStorage |
| `/dashboard/profil` | Mein Profil | `DashboardProfil.jsx` | Account-Verwaltung, Sicherheit, Abo-Info |

#### Coding Intelligence (Premium)

| Komponente | Beschreibung |
|-----------|-------------|
| `CodingAssistant.jsx` | Premium AI Coding Assistant mit: |
| | - Standard- und Experten-Modus |
| | - Strukturierte JSON-Antworten (Byte, Bit, Modul, Tool) |
| | - Confidence Score mit Farbanzeige |
| | - Quick Actions: Codierungsliste, Favoriten, Verlauf (lokale Panels) |
| | - Smart Suggestions basierend auf AI-Antwort |
| | - Chat-Verlauf pro Sitzung |
| `CodingUploads.jsx` | Upload-Bereich fuer Codierungsdateien und Diagnose-Logs |

#### KI-Tools (7 Stueck)

| Route | Tool | Beschreibung |
|-------|------|-------------|
| `/dashboard/tools/deal-analyzer` | Deal Analyzer | KI-Bewertung einzelner Fahrzeugangebote |
| `/dashboard/tools/roi-rechner` | ROI Rechner | Return-on-Investment-Kalkulation |
| `/dashboard/tools/marktwert` | Marktwert-Check | Schnelle Marktpreis-Einschaetzung |
| `/dashboard/tools/deal-quiz` | Deal Quiz | Interaktives Quiz-Format |
| `/dashboard/tools/vorher-nachher` | Vorher/Nachher | Vergleichs-Slider |
| `/dashboard/tools/radar` | Wettbewerb-Radar | Radar-Chart fuer Wettbewerber |
| `/dashboard/tools/heatmap` | Markt-Heatmap | Regionale Preisuebersicht |

#### Beispiele (7 Stueck)

| Route | Beispiel | Beschreibung |
|-------|----------|-------------|
| `/dashboard/beispiele/vergleich` | Fahrzeug-Vergleich | Side-by-Side Vergleich |
| `/dashboard/beispiele/preis-tracker` | Preis-Tracker | Preisentwicklung ueber Zeit |
| `/dashboard/beispiele/flotte` | Flotten-Uebersicht | Multi-Fahrzeug-Management |
| `/dashboard/beispiele/markt-report` | Markt-Report | Detaillierter Bericht |
| `/dashboard/beispiele/tuning-showcase` | Tuning Showcase | Tuning-Vorher/Nachher |
| `/dashboard/beispiele/widgets` | Dashboard Widgets | Wiederverwendbare UI-Module |
| `/dashboard/beispiele/fahrzeugsuche` | Fahrzeugsuche | Such- und Filteransicht mit Detail-View (`VehicleDetailView.jsx`) |

#### Verwaltung

| Route | Seite | Beschreibung |
|-------|-------|-------------|
| `/dashboard/empfehlungen` | Empfehlungen | KI-basierte Vorschlaege |
| `/dashboard/teams` | Teams | Team-Verwaltung |
| `/dashboard/tenants` | Tenants | Mandanten-Verwaltung |

#### E-Mail Templates (15 Stueck)

In `DashboardEmails.jsx` befinden sich fertige HTML-Vorlagen fuer:

| Nr. | Template | Typ |
|-----|----------|-----|
| 1 | Willkommen | Transaktional |
| 2 | E-Mail Bestaetigung | Transaktional |
| 3 | Passwort zuruecksetzen | Transaktional |
| 4 | Zahlungsbestaetigung | Transaktional |
| 5 | Rechnung | Transaktional |
| 6 | Zahlung ueberfaellig | Transaktional |
| 7 | Abo-Upgrade | Transaktional |
| 8 | Kuendigung | Transaktional |
| 9 | Neues Feature | Marketing |
| 10 | Woechentlicher Report | Marketing |
| 11 | Preis-Alert | Alert |
| 12 | Sicherheitswarnung | Alert |
| 13 | Team-Einladung | Transaktional |
| 14 | Fahrzeug-Match | Alert |
| 15 | Feedback-Anfrage | Marketing |

#### Meine Garage

Fahrzeugverwaltung mit folgenden Funktionen:
- Fahrzeuge anlegen (Marke, Modell, Baujahr, Plattform, FIN, Kennzeichen)
- Fahrzeuge bearbeiten und loeschen
- Suchfunktion nach allen Feldern
- Direktlink zur Codierung pro Fahrzeug
- Persistenz via localStorage (Backend-Migration vorbereitet)

#### Mein Profil

Account-Verwaltung mit Tabs:
- **Persoenliche Daten** — Name, E-Mail, Telefon, Firma
- **Sicherheit** — Passwort aendern, 2FA-Einstellung
- **Benachrichtigungen** — E-Mail/Push Praeferenzen
- **Mein Plan** — Aktueller Tarif, Verbrauch, Upgrade-Option
- **Garage-Vorschau** — Schnellzugriff auf gespeicherte Fahrzeuge
- **Nutzungsstatistik** — API-Calls, Analysen, Reports

---

### 4. Weitere Seiten

| Route | Seite | Komponente | Beschreibung |
|-------|-------|-----------|-------------|
| `/login` | Login | `LoginPage.jsx` | Anmeldeformular (UI ready, Auth noch nicht verbunden) |
| `/register` | Registrierung | `RegisterPage.jsx` | Registrierungsformular |
| `/demo` | Demo buchen | `DemoPage.jsx` | Terminbuchung fuer 4 Produkte (Market, Tuning, Coding, Alle) |
| `/support` | Support | `SupportPage.jsx` | Hilfe-Center, API-Dokumentation, Coding-Docs |
| `/system-status` | System-Status | `StatusPage.jsx` | Service-Verfuegbarkeit und Latenzen |

---

## Backend API

### Basis-Endpunkte

| Methode | Route | Beschreibung |
|---------|-------|-------------|
| GET | `/api/` | Health Check |
| POST | `/api/status` | Status-Check erstellen |
| GET | `/api/status` | Alle Status-Checks abrufen |

### KI-Endpunkte (`/api/ai/`)

| Methode | Route | Request | Beschreibung |
|---------|-------|---------|-------------|
| POST | `/api/ai/deal-analyzer` | `{brand, model, year, km, price, location}` | KI-Deal-Analyse mit Score (0-100), Empfehlung, Preisprognose |
| POST | `/api/ai/market-report` | `{focus}` | Marktbericht-Generierung (general, premium, compact, suv, electric) |
| POST | `/api/ai/smart-alerts` | `{alerts: [...]}` | KI-Mustererkennung in Alert-Daten |
| POST | `/api/ai/ecu-chat` | `{message, session_id}` | ECU-Tuning-Experte Chat (session-basiert) |
| POST | `/api/ai/coding-assistant` | `{query, expert_mode, session_id}` | Premium Coding Assistant — JSON-Antwort mit Byte/Bit-Daten, Confidence Score |

---

## Theming & Design

Das Dashboard unterstuetzt drei Themes, steuerbar ueber die Sidebar:

| Theme | Beschreibung |
|-------|-------------|
| **Dark** | Dunkler Hintergrund, helle Akzente (Standard) |
| **Light** | Heller Hintergrund, dunkle Texte |
| **Gradient** | Schwarzer Gradient mit Glow-Effekten |

Die drei Produktlinien haben eigene Farbcodes:
- Market Intelligence: `#00E5FF` (Cyan)
- Tuning Intelligence: `#CCFF00` (Lime)
- Coding Intelligence: `#c084fc` (Purple)

---

## Datenmodell

### Aktueller Stand

| Bereich | Speicherung | Status |
|---------|-------------|--------|
| Dashboard-Statistiken | Mock-Daten (Frontend) | Mocked |
| Fahrzeuglisten | Mock-Arrays (Frontend) | Mocked |
| Meine Garage | localStorage | Funktional, Migration geplant |
| Mein Profil | localStorage | Funktional, Migration geplant |
| Chat-Verlaeufe | React State (Session) | Nicht persistiert |
| Auth (Login/Register) | UI vorhanden | Nicht verbunden |
| Pricing/Checkout | UI vorhanden | Nicht verbunden |

### Geplante MongoDB-Collections

```
users          — Nutzerkonten, Rollen, Abonnements
vehicles       — Gespeicherte Fahrzeuge (Garage)
chat_sessions  — KI-Chat-Verlaeufe (ECU Bot, Coding Assistant)
reports        — Generierte Marktberichte
alerts         — Nutzer-Alerts und Benachrichtigungen
```

---

## Roadmap

### P0 — Naechste Schritte
- [ ] User Authentication (JWT Login/Register)
- [ ] Frontend mit Backend-API verbinden (Mock-Daten ersetzen)

### P1 — Kurzfristig
- [ ] Chat-Verlauf in MongoDB persistieren
- [ ] Stripe-Integration fuer Pakete/Checkout
- [ ] Progressive Web App (PWA)

### P2 — Mittelfristig
- [ ] E-Mail-Versand (SendGrid/Resend) fuer die 15 Templates
- [ ] Crawler-System (Python) fuer Marktdaten
- [ ] Admin Panel

### P3 — Langfristig
- [ ] Multi-Tenant Datenbank-Trennung
- [ ] API Rate Limiting & Usage Tracking
- [ ] Mobile App (React Native)

---

## Lokale Entwicklung

```bash
# Backend
cd /app/backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend
cd /app/frontend
yarn install
yarn start   # Port 3000
```

### Umgebungsvariablen

**Backend** (`/app/backend/.env`):
- `MONGO_URL` — MongoDB Connection String
- `DB_NAME` — Datenbankname
- `EMERGENT_LLM_KEY` — KI-Schluessel fuer OpenAI GPT-4o

**Frontend** (`/app/frontend/.env`):
- `REACT_APP_BACKEND_URL` — Backend API URL

---

> **AutoIntel** — Analysiere Maerkte. Tune Steuergeraete. Codiere Fahrzeuge.
