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
│   │   ├── landing/ (8 tool components, HeroCanvas, Navigation, etc.)
│   │   ├── pages/ (MarketPage, TuningPage, CodingPage, LoginPage, etc.)
│   │   ├── dashboard/
│   │   │   ├── Layout, Sidebar, Page, ThemeContext, themeUtils
│   │   │   ├── DashboardCoding.jsx (NEW)
│   │   │   ├── DashboardToolWrapper.jsx, DashboardEmpfehlungen.jsx
│   │   │   ├── DashboardPakete.jsx, VehicleDetailView.jsx
│   │   │   ├── Beispiel: Vergleich, PreisTracker, Flotte, MarktReport, TuningShowcase, Widgets, Fahrzeugsuche
│   │   │   ├── 7 standard dashboard pages
```

## Implemented Features

### Products (3)
- **Market Intelligence** — Product page (/market) + Dashboard (/dashboard/market)
- **Tuning Intelligence** — Product page (/tuning) + Dashboard (/dashboard/tuning)
- **Coding Intelligence** — Product page (/coding) + Dashboard (/dashboard/coding)
  - KPIs, Quick Finder, 10 Steuergeräte-Module, 4 Coding Kategorien, Coverage Chart, Activity Feed

### Dashboard
- Main Nav: Overview, Market, Tuning, Coding, Alerts, Reports, Pakete & Addons
- Tools Menu (7): Deal Analyzer, ROI Rechner, Marktwert-Check, Deal Quiz, Vorher/Nachher, Wettbewerb-Radar, Markt-Heatmap
- Beispiele Menu (7): Vergleich, Preis-Tracker, Flotte, Markt-Report, Tuning Showcase, Widgets, Fahrzeugsuche (with Detail View)
- Pakete & Addons: 4 Plans (Basic/Pro/Elite/Combined), 8 Addons, Feature Comparison Table
- Empfehlungen, ECU Knowledge Bot, 3-way theme

### Landing Page
- Hero with AI Neural Network animation, 8 interactive tools, Navigation with 3 products dropdown

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
