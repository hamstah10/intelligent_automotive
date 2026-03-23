# AutoIntel — Automotive Intelligence SaaS Platform

## Problem Statement
Central Automotive Intelligence SaaS platform with two specialized products:
- **Market Intelligence**: AI-powered vehicle deal analysis, market trends, price tracking
- **Tuning Intelligence**: ECU knowledge base, performance tuning recommendations

## Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion, Shadcn UI, Recharts, react-markdown
- **Backend**: FastAPI, Motor (Async MongoDB), emergentintegrations (OpenAI GPT-4o)
- **Typography**: Orbitron (Headings), Exo 2 (Body)
- **Themes**: 3-way system (Dark / Light / Black Gradient) via CSS variables

## Color System
- Market Intelligence: `#00E5FF` (Cyan/Blue)
- Tuning Intelligence: `#CCFF00` (Lime/Yellow-Green)

## Architecture
```
/app/
├── backend/
│   ├── server.py (FastAPI app)
│   ├── ai_routes.py (AI endpoints)
├── frontend/src/
│   ├── App.js (Routing + ThemeProvider)
│   ├── index.css (Tailwind, CSS Variables, Fonts)
│   ├── components/
│   │   ├── landing/ (HeroCanvas, AIResponseRenderer, 8 tool components)
│   │   ├── pages/ (MarketPage, TuningPage, LoginPage, etc.)
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout, DashboardSidebar, DashboardPage
│   │   │   ├── DashboardThemeContext, themeUtils.js
│   │   │   ├── DashboardToolWrapper.jsx (generic tool container)
│   │   │   ├── DashboardEmpfehlungen.jsx
│   │   │   ├── BeispielVergleich, BeispielPreisTracker, BeispielFlotte
│   │   │   ├── BeispielMarktReport, BeispielTuningShowcase
│   │   │   ├── 7 standard dashboard pages
```

## Implemented Features

### Landing Page (DONE)
- Hero section with AI Neural Network canvas animation
- 8 interactive tools: AIDealAnalyzer, ROICalculator, VehicleConfigurator, DealQuiz, BeforeAfterSlider, CompetitorRadar, MarketHeatmap, ECUVisualizer
- AIResponseRenderer for markdown-formatted AI outputs
- Live ticker, pricing, testimonials, FAQ, integration showcase

### Dashboard (DONE)
- 7-page layout: Overview, Market, Tuning, Alerts, Reports, Teams, Tenants
- **Tools Menu** (7 tools from landing page embedded via DashboardToolWrapper):
  - Deal Analyzer, ROI Rechner, Marktwert-Check, Deal Quiz, Vorher/Nachher, Wettbewerb-Radar, Markt-Heatmap
- **Beispiele Menu** (5 interactive demo pages):
  - Fahrzeug-Vergleich (`/dashboard/beispiele/vergleich`) — Side-by-side comparison with RadarChart
  - Preis-Tracker (`/dashboard/beispiele/preis-tracker`) — Multi-vehicle price history with AreaCharts
  - Flotten-Übersicht (`/dashboard/beispiele/flotte`) — Fleet management with KPIs, cost analysis, vehicle cards
  - Markt-Report (`/dashboard/beispiele/markt-report`) — Complete market analysis report with charts + tables
  - Tuning Showcase (`/dashboard/beispiele/tuning-showcase`) — Stage 1/2 performance gains with animated gauges
- **Empfehlungen** page with AI tuning recommendations
- Collapsible sidebar menus (Tools + Beispiele) with AnimatePresence
- 3-way theme system (Dark/Light/Gradient) across all pages
- ECU Knowledge Bot

### Product Pages (DONE)
- Market Intelligence page with hero + large 'A' logo background
- Tuning Intelligence page with hero + large 'A' logo background

### Styling (DONE)
- Global font change: Orbitron (headings) + Exo 2 (body)
- Responsive font sizing
- 3-way theme toggle across entire site

## Mocked Data
- All Dashboard data (overview stats, market listings, tuning entries, alerts, reports)
- All Beispiele pages (vehicle comparison, fleet, price tracker, reports, tuning showcase)
- Authentication (login/register pages exist but not connected)

## API Endpoints
- `POST /api/ai/analyze-deal` — AI deal analysis
- `POST /api/ai/ecu-knowledge` — ECU knowledge queries
- `POST /api/ai/generate-report` — Report generation

## Backlog (Prioritized)

### P0 — Next
- Connect Frontend to Backend API (replace mocked dashboard data)
- User Authentication (JWT login/register flow)

### P1
- Chat History Persistence (store AI chats in MongoDB)

### P2
- Crawler System (Spider → Parser → Normalizer → API for live listings)
- Admin Panel (Tenants, Crawl Jobs, Logs)

### P3
- Multi-tenant database separation (tenant_id filtering)
