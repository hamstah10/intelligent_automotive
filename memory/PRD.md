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
- [x] **8 New Interactive Components** (IntegrationShowcase, RealtimeCounter, ParallaxDataWall, DealQuiz, VehicleConfigurator, BeforeAfterSlider, CompetitorRadar, MarketHeatmap)

### Customer Dashboard (/dashboard/*)
- [x] **Dark/Light Theme System** with animated toggle switch (persists in localStorage)
- [x] CSS Variables architecture (--d-bg, --d-surface, --d-text, etc.)
- [x] Uebersicht — KPIs, Charts, Alert-Zentrale, Tabs, Feed
- [x] Market — Listings, Preistrend, Deal Scores
- [x] Tuning — Tool-Matrix, ECU DB, **ECU Knowledge Bot** (AI Chat)
- [x] Alerts — Filter, Summary Cards, **Smart Alert Engine** (AI)
- [x] Reports — KPIs, Chart, Report Liste, **AI Market Report Generator**
- [x] Teams — Rollen, Mitglieder
- [x] Tenants — Mandanten-Verwaltung
- [x] Sidebar — Nav, Badges, Plan Status, Theme Toggle

### AI Features (GPT-4o via Emergent LLM Key)
- [x] **AI Deal Analyzer** — Score badges, recommendation badges, styled markdown
- [x] **AI Market Reports** — Styled markdown output
- [x] **Smart Alert Engine** — Styled markdown output
- [x] **ECU Knowledge Bot** — Chat bubbles with markdown rendering

### AI Output Formatting
- [x] Score Badge with circular ring animation (extracts score from AI text)
- [x] Recommendation Badge (Kaufen/Abwarten/Finger weg)
- [x] Markdown rendering with styled headings (icons), lists, blockquotes, tables
- [x] AIChatBubbleRenderer for compact chat messages

## API Endpoints
- POST /api/ai/deal-analyzer — AI Deal-Bewertung
- POST /api/ai/market-report — AI Marktbericht
- POST /api/ai/smart-alerts — AI Alert-Muster-Analyse
- POST /api/ai/ecu-chat — ECU Knowledge Bot

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
