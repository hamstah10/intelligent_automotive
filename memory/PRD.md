# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Automotive Intelligence SaaS platform with Market Intelligence and Tuning Intelligence products.

## Core Design System
- **Typography**: Orbitron (headlines, reduced sizes), Exo 2 (body), JetBrains Mono (code)
- **3 Themes** (global, shared between website + dashboard):
  - **Dark**: #050505 bg, #111111 cards, noise overlay, neon accents
  - **Light**: #f4f5f9 bg, white cards, no noise, dark text
  - **Gradient**: #06060c bg, dark gradient surfaces (145deg), no noise, inset glow
- **Accents**: #CCFF00 (Tuning), #00E5FF (Market)
- **Theme Sync**: SharedContext (localStorage key 'dash-theme'), Nav toggle cycles, Dashboard sidebar 3-way switch

## What's Been Implemented

### Landing Page (/)
- [x] Hero with AI Neural Network Canvas Animation
- [x] 8 Interactive Components (IntegrationShowcase, RealtimeCounter, etc.)
- [x] AI Deal Analyzer (GPT-4o) with Score/Recommendation badges
- [x] All sections (Features, ROI, Pricing, FAQ, Footer)
- [x] Theme toggle in Navigation (Moon/Sun/Layers)

### Customer Dashboard (/dashboard/*)
- [x] 7 Pages: Overview, Market, Tuning, Alerts, Reports, Teams, Tenants
- [x] 3-Way Theme Switch in Sidebar (animated indicator)
- [x] 4 AI Features with styled markdown output
- [x] ECU Knowledge Bot with chat bubbles

### AI Features (GPT-4o)
- [x] AI Deal Analyzer, Market Reports, Smart Alerts, ECU Bot
- [x] Score badges, recommendation badges, styled markdown rendering

## Tech Stack
Frontend: React, TailwindCSS, Framer Motion, Shadcn UI, recharts, react-markdown
Backend: FastAPI, MongoDB (Motor), emergentintegrations (LLM)

## Prioritized Backlog
### P0
- [ ] User Authentication (JWT)
- [ ] Connect Dashboard to real backend data
### P1
- [ ] ECU DB CRUD in MongoDB, Chat History Persistence
### P2
- [ ] Crawler System, Deal Score Algorithm, Admin Panel
### P3
- [ ] Multi-Tenant, Multi-Language

## Project Health
- **Broken**: None
- **Real AI**: Deal Analyzer, Reports, Alerts, ECU Bot (GPT-4o)
- **Mocked**: All dashboard data
