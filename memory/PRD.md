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
│   │   ├── landing/ (Navigation, HeroCanvas, HeroSection, FeaturesMarket, FeaturesTuning, FeaturesCoding, Pricing, Footer, etc.)
│   │   ├── pages/ (MarketPage, TuningPage, CodingPage, CodingDemoPage, DemoPage, LoginPage, SupportPage, etc.)
│   │   ├── dashboard/ (Layout, Sidebar, Page, Pakete, Coding, Tools, Beispiele, etc.)
```

## Implemented Features

### Products (3) — All visible across entire platform
- **Market Intelligence** — Landing + Product page + Dashboard + Demo + Support + Footer
- **Tuning Intelligence** — Landing + Product page + Dashboard + Demo + Support + Footer
- **Coding Intelligence** — Landing + Product page + Dashboard + Demo + Support + Footer + Interactive Live-Demo

### Landing Page
- Hero with 3 product pills (Market, Tuning, Coding)
- Navigation with 3 products dropdown and color-fading "automotive" logo
- FeaturesCoding section (purple bento grid, 6 cards)
- Pricing with Combined plan (Market + Tuning + Coding) at 349/Mo

### Coding Intelligence Live-Demo (/coding/demo)
- Email gate for lead generation
- Fahrzeug → Steuergerät → Codierung → Byte/Bit Visualisierung → Anwenden-Simulation
- Realistic VW/Audi MQB data (BCM, MIB, IC, ABS ECUs)
- Risk levels (low/medium/high) with warnings
- Teaser section on /coding product page

### Demo buchen (/demo)
- 4 product options: Market, Tuning, Coding, Alle Produkte
- Calendar + time slot picker + contact form + ICS download

### Support (/support)
- Hilfe Center with Coding articles
- Dokumentation with Coding Intelligence section
- API Doku with Coding endpoints (/codings, /codings/{ecu}, /modules)

### Dashboard
- Overview, Market, Tuning, Coding, Alerts, Reports, Pakete & Addons
- 7 AI Tools, 7 Beispiele pages, Fahrzeugsuche with detail view
- Pakete: 4 Plans (Basic/Pro/Elite/Combined incl. Coding), 9 Addons (incl. Coding Intelligence)
- Comparison table with Coding Zugang + Coding-Datenbank rows

### Footer
- Year: 2026
- Coding Intelligence in Produkt links

## Mocked Data
- All Dashboard + Beispiele data, Authentication, Vehicle listings, Coding database, Demo booking

## API Endpoints
- POST /api/ai/analyze-deal, /api/ai/ecu-knowledge, /api/ai/generate-report

## Backlog
### P0
- Connect Frontend to Backend API (replace mocked data)
- User Authentication (JWT login/register)
### P1
- Chat History Persistence (MongoDB)
- Stripe integration for Pakete
### P2
- Crawler System, Admin Panel
### P3
- Multi-tenant database separation
