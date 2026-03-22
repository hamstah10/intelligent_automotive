# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Automotive Intelligence SaaS platform with Market Intelligence and Tuning Intelligence products. Features landing page, customer dashboard, and AI-powered analysis tools.

## Core Requirements
- Dark Theme (#050505 bg, #111111 cards), German UI
- **Typography: Orbitron (headlines), Exo 2 (body), JetBrains Mono (code)**
- Framer Motion animations, Noise overlay, rounded-2xl cards
- Accent: #CCFF00 (Tuning), #00E5FF (Market)
- No modals for main flows

## What's Been Implemented

### Landing Page (/)
- [x] Navigation, Hero, LiveTicker, FeaturesMarket, ROI Calculator
- [x] FeaturesTuning, ECU Visualizer
- [x] **AI Deal Analyzer** — Interactive form + AI-powered deal evaluation (GPT-4o)
- [x] HowItWorks, Pricing, Testimonials, FAQ, Footer
- [x] **8 New Interactive Components** (IntegrationShowcase, RealtimeCounter, ParallaxDataWall, DealQuiz, VehicleConfigurator, BeforeAfterSlider, CompetitorRadar, MarketHeatmap)

### Customer Dashboard (/dashboard/*)
- [x] **Dark/Light Theme System** with animated toggle switch (persists in localStorage)
- [x] CSS Variables architecture (--d-bg, --d-surface, --d-text, etc.)
- [x] Uebersicht, Market, Tuning, Alerts, Reports, Teams, Tenants
- [x] ECU Knowledge Bot (AI Chat)

### AI Features (GPT-4o via Emergent LLM Key)
- [x] AI Deal Analyzer with Score badges + styled markdown
- [x] AI Market Reports, Smart Alerts, ECU Knowledge Bot

### Typography
- [x] **Orbitron** — Futuristic geometric angular font for all headings (matches logo "A")
- [x] **Exo 2** — Clean futuristic body text
- [x] **JetBrains Mono** — Code/mono elements

## Tech Stack
- Frontend: React, TailwindCSS, Framer Motion, Shadcn UI, recharts, react-markdown
- Backend: FastAPI, MongoDB (Motor), emergentintegrations (LLM)
- AI: OpenAI GPT-4o via Emergent LLM Key

## Prioritized Backlog

### P0
- [ ] User Authentication (JWT)
- [ ] Connect Dashboard to real data via Backend API

### P1
- [ ] Market Intelligence real data pipeline
- [ ] ECU Database CRUD in MongoDB
- [ ] Chat History Persistence (MongoDB)

### P2
- [ ] Crawler System, Deal Score Algorithm
- [ ] Admin Panel for Tenants, Crawl Jobs, Logs

### P3
- [ ] Multi-Tenant database separation
- [ ] Multi-Language Support

## Project Health
- **Broken**: None
- **Real AI**: Deal Analyzer, Market Reports, Smart Alerts, ECU Bot (GPT-4o)
- **Mocked**: Dashboard data (Listings, Alerts, ECU DB, Teams, Tenants, KPIs)
