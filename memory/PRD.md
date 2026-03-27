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

## Implemented Features

### Landing Page
- Hero with 3 product pills, Navigation with color-fading logo
- FeaturesCoding section, Pricing with Combined plan (Market + Tuning + Coding)
- Footer with 2026 copyright

### Coding Intelligence Live-Demo (/coding/demo)
- Email gate → Vehicle → ECU → Byte/Bit Visualization → Apply simulation

### Coding Intelligence Dashboard (PREMIUM AI UPGRADE)
- **AI Assistant**: Structured responses (Summary + Confidence badge + Coding Cards + Evidence)
- **Quick Actions**: Details anzeigen, Ähnliche Codings, Anderes Tool, Risiko anzeigen — all inline panels, no re-query
- **Smart Suggestions**: Clickable related coding pills
- **Expert Mode Toggle**: Standard/Expert with different AI prompts
- **History Panel**: Last 10 queries, clickable to re-run
- **Favorites/Bookmarks**: Save codings with star icon
- **Coding Highlight Cards**: Labels (Beliebt/Risiko/Empfohlen) on category items
- **Upload & Analyse**: Screenshot + Document dropzones (preparation, "Bald verfügbar")
- **Module Visualization**: 10 ECU module cards with counts
- **Loading/Thinking State**: "AI analysiert..." with skeleton loaders

### Dashboard General
- Overview, Market, Tuning, Coding, Alerts, Reports, Pakete & Addons
- 7 AI Tools, 7 Beispiele, Fahrzeugsuche with detail view, Pakete with Coding addon

### Other Pages
- Demo buchen: 4 products (Market, Tuning, Coding, Alle)
- Support: Coding help articles, API docs, Coding documentation section

## API Endpoints
- POST /api/ai/coding-assistant (structured JSON with codings, confidence, evidence, suggestions)
- POST /api/ai/analyze-deal, /api/ai/ecu-knowledge, /api/ai/generate-report

## Mocked Data
- Dashboard stats, Vehicle listings, Pricing checkouts, Auth

## Backlog
### P0
- Connect Frontend to Backend API (replace mocked data)
- User Authentication (JWT login/register)
### P1
- Chat History Persistence (MongoDB)
- Stripe integration for Pakete
- PWA App for customers
### P2
- Crawler System, Admin Panel
### P3
- Multi-tenant database separation
