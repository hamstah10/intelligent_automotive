# AutoIntel — Automotive Intelligence SaaS Platform

## Problem Statement
Central Automotive Intelligence SaaS platform with three specialized products:
- **Market Intelligence** (#00E5FF) — AI-powered vehicle deal analysis, market trends, price tracking
- **Tuning Intelligence** (#CCFF00) — ECU knowledge base, performance tuning recommendations
- **Coding Intelligence** (#c084fc) — Vehicle coding database, ECU modules, byte/bit documentation

## Tech Stack
- Frontend: React, TailwindCSS, Framer Motion, Shadcn UI, Recharts, react-markdown
- Backend: FastAPI, Motor (Async MongoDB), emergentintegrations (OpenAI GPT-4o)
- Typography: Orbitron (Headings), Exo 2 (Body)
- Themes: 3-way system (Dark / Light / Black Gradient)

## Architecture
```
/app/
├── backend/ (server.py, ai_routes.py)
├── frontend/src/
│   ├── App.js, index.css
│   ├── components/
│   │   ├── landing/ (8 tool components, HeroCanvas, Navigation, FeaturesCoding, etc.)
│   │   ├── pages/ (MarketPage, TuningPage, CodingPage, LoginPage, etc.)
│   │   ├── dashboard/
│   │   │   ├── Layout, Sidebar, Page, ThemeContext, themeUtils
│   │   │   ├── DashboardCoding.jsx
│   │   │   ├── DashboardToolWrapper.jsx, DashboardEmpfehlungen.jsx
│   │   │   ├── DashboardPakete.jsx (with Coding addon), VehicleDetailView.jsx
│   │   │   ├── Beispiel: Vergleich, PreisTracker, Flotte, MarktReport, TuningShowcase, Widgets, Fahrzeugsuche
│   │   │   ├── 7 standard dashboard pages
```

## Implemented Features

### Products (3) — All visible on Landing Page
- **Market Intelligence** — Product page (/market) + Dashboard (/dashboard/market) + Landing Features Section
- **Tuning Intelligence** — Product page (/tuning) + Dashboard (/dashboard/tuning) + Landing Features Section
- **Coding Intelligence** — Product page (/coding) + Dashboard (/dashboard/coding) + Landing Features Section (NEW)

### Landing Page
- Hero with AI Neural Network animation, 3 product pills (Market, Tuning, Coding), 8 interactive tools
- Navigation with 3 products dropdown and color-fading "automotive" logo
- FeaturesCoding section with 6 purple-themed bento grid cards
- Pricing with Combined plan (Market + Tuning + Coding) at €349/Monat

### Dashboard
- Main Nav: Overview, Market, Tuning, Coding, Alerts, Reports, Pakete & Addons
- Tools Menu (7): Deal Analyzer, ROI Rechner, Marktwert-Check, Deal Quiz, Vorher/Nachher, Wettbewerb-Radar, Markt-Heatmap
- Beispiele Menu (7): Vergleich, Preis-Tracker, Flotte, Markt-Report, Tuning Showcase, Widgets, Fahrzeugsuche (with Detail View)
- Pakete & Addons: 4 Plans (Basic/Pro/Elite/Combined incl. Coding), 9 Addons (incl. Coding Intelligence), Feature Comparison Table with Coding rows
- Empfehlungen, ECU Knowledge Bot, 3-way theme

## Mocked Data
- All Dashboard + Beispiele data, Authentication, Vehicle listings, Coding database

## API Endpoints
- POST /api/ai/analyze-deal, /api/ai/ecu-knowledge, /api/ai/generate-report

## Backlog
### P0
- Connect Frontend to Backend API (replace mocked data)
- User Authentication (JWT login/register)
### P1
- Chat History Persistence (MongoDB)
- Autohändler-Pakete Backend (Stripe integration)
### P2
- Crawler System, Admin Panel
### P3
- Multi-tenant database separation
