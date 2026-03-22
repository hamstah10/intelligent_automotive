# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Automotive Intelligence SaaS platform with Market Intelligence and Tuning Intelligence products. Features landing page, customer dashboard, and AI-powered analysis tools.

## Core Requirements
- Dark Theme (#050505 bg, #111111 cards), German UI, Space Grotesk font
- Framer Motion animations, Noise overlay, rounded-2xl cards
- Accent: #CCFF00 (Tuning), #00E5FF (Market)
- No modals for main flows

## What's Been Implemented

### Landing Page (/)
- [x] Navigation, Hero, LiveTicker, FeaturesMarket, ROI Calculator
- [x] FeaturesTuning, ECU Visualizer
- [x] **AI Deal Analyzer** — Interactive form + AI-powered deal evaluation (GPT-4o)
- [x] HowItWorks, Pricing, Testimonials, FAQ, Footer

### Customer Dashboard (/dashboard/*)
- [x] Uebersicht — KPIs, Charts, Alert-Zentrale, Tabs, Feed
- [x] Market — Listings, Preistrend, Deal Scores
- [x] Tuning — Tool-Matrix, ECU DB, **ECU Knowledge Bot** (AI Chat)
- [x] Alerts — Filter, Summary Cards, **Smart Alert Engine** (AI Muster-Analyse)
- [x] Reports — KPIs, Chart, Report Liste, **AI Market Report Generator**
- [x] Teams — Rollen, Mitglieder
- [x] Tenants — Mandanten-Verwaltung
- [x] Sidebar — Nav, Badges, Plan Status

### AI Features (GPT-4o via Emergent LLM Key)
- [x] **AI Deal Analyzer** (Landing) — Fahrzeugdaten eingeben, AI-Bewertung erhalten
- [x] **AI Market Reports** (Dashboard) — Ein-Klick Report-Generierung mit Fokus-Auswahl
- [x] **Smart Alert Engine** (Dashboard) — AI erkennt Muster in Alerts
- [x] **ECU Knowledge Bot** (Dashboard) — Chat-Interface fuer ECU/Tuning-Fragen

### Other Pages
- [x] Market/Tuning Storytelling, Login, Register, Demo (Konfetti + .ics), Support, System Status

## API Endpoints
- POST /api/ai/deal-analyzer — AI Deal-Bewertung
- POST /api/ai/market-report — AI Marktbericht
- POST /api/ai/smart-alerts — AI Alert-Muster-Analyse
- POST /api/ai/ecu-chat — ECU Knowledge Bot

## Tech Stack
- Frontend: React, TailwindCSS, Framer Motion, Shadcn UI, recharts
- Backend: FastAPI, MongoDB (Motor), emergentintegrations (LLM)
- AI: OpenAI GPT-4o via Emergent LLM Key

## Prioritized Backlog

### P0
- [ ] User Authentication (JWT)
- [ ] Connect Dashboard to real data via Backend API

### P1
- [ ] Market Intelligence real data pipeline
- [ ] ECU Database CRUD in MongoDB

### P2
- [ ] Crawler System, Deal Score Algorithm
- [ ] Chat history persistence (MongoDB)

### P3
- [ ] Admin Panel, Multi-Tenant, Multi-Language

## Project Health
- **Broken**: None
- **Real AI**: Deal Analyzer, Market Reports, Smart Alerts, ECU Bot (GPT-4o)
- **Mocked**: Dashboard data (Listings, Alerts, ECU DB, Teams, Tenants, KPIs)
