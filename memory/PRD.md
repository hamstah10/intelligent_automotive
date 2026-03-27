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
│   ├── server.py, ai_routes.py
├── frontend/src/
│   ├── App.js, index.css
│   ├── components/
│   │   ├── landing/ (8 tool components + HeroCanvas etc.)
│   │   ├── pages/ (MarketPage, TuningPage, LoginPage, etc.)
│   │   ├── dashboard/
│   │   │   ├── Layout, Sidebar, Page, ThemeContext, themeUtils
│   │   │   ├── DashboardToolWrapper.jsx
│   │   │   ├── DashboardEmpfehlungen.jsx
│   │   │   ├── Beispiel: Vergleich, PreisTracker, Flotte, MarktReport, TuningShowcase, Widgets, Fahrzeugsuche
│   │   │   ├── 7 standard dashboard pages
```

## Implemented Features

### Landing Page (DONE)
- Hero with AI Neural Network animation, 8 interactive tools, Live ticker, Pricing, FAQ

### Dashboard (DONE)
- **Main Nav**: Overview, Market, Tuning, Alerts, Reports
- **Tools Menu** (7): Deal Analyzer, ROI Rechner, Marktwert-Check, Deal Quiz, Vorher/Nachher, Wettbewerb-Radar, Markt-Heatmap
- **Beispiele Menu** (7):
  - Fahrzeug-Vergleich — Radar-Chart + Specs
  - Preis-Tracker — Multi-vehicle AreaCharts
  - Flotten-Übersicht — KPIs, cost analysis, vehicle cards
  - Markt-Report — Segment trends, brand share, region table
  - Tuning Showcase — Stage 1/2 animated gauges
  - Dashboard Widgets — KPIs, charts, feed, heatmap, system monitoring
  - **Fahrzeugsuche** — mobile.de API source selector, search/filter, 12 listings, track/untrack, tracking tab
- **Empfehlungen** page, ECU Knowledge Bot
- 3-way theme system (Dark/Light/Gradient)

### Styling (DONE)
- Orbitron (headings) + Exo 2 (body), Responsive sizing, 3-way theme

## Mocked Data
- All Dashboard + Beispiele data, Authentication, Vehicle listings

## API Endpoints
- `POST /api/ai/analyze-deal`, `/api/ai/ecu-knowledge`, `/api/ai/generate-report`

## Backlog

### P0 — Next
- Autohändler-Pakete (Addon-System) — Pricing-Cards für verschiedene Händler-Pakete
- Connect Frontend to Backend API (replace mocked data)
- User Authentication (JWT login/register)

### P1
- Chat History Persistence (MongoDB)

### P2
- Crawler System, Admin Panel

### P3
- Multi-tenant database separation
