# AutoIntel — Automotive Intelligence SaaS Platform

## Problem Statement
Central Automotive Intelligence SaaS platform with three specialized products:
- **Market Intelligence** (#00E5FF) — AI-powered vehicle deal analysis, market trends, price tracking
- **Tuning Intelligence** (#CCFF00) — ECU knowledge base, performance tuning recommendations
- **Coding Intelligence** (#c084fc) — Vehicle coding database, ECU modules, byte/bit documentation

## Tech Stack
- Frontend: React, TailwindCSS, Framer Motion, Shadcn UI, Recharts
- Backend: FastAPI, Motor (Async MongoDB), emergentintegrations (OpenAI GPT-4o)
- Typography: Orbitron (Headings), Exo 2 (Body)
- Themes: 3-way system (Dark / Light / Black Gradient)

## Implemented Features

### Landing Page
- Hero with SEO headline ("Analysiere Märkte. Tune Steuergeräte. Codiere Fahrzeuge.")
- 3 product pills, color-fading logo, FeaturesCoding section
- Pricing with Combined plan (Market + Tuning + Coding), Footer 2026

### Coding Intelligence
- Product page with AI Berater Demo + Interactive Live-Demo teaser
- Live-Demo (/coding/demo): Email gate → Vehicle → ECU → Byte/Bit → Apply simulation
- Dashboard: Premium AI Assistant, Smart Suggestions, Quick Actions (inline panels), Expert Mode, History, Favorites, Highlight Labels, Upload areas, Module grid

### Dashboard Pages
- Overview, Market, Tuning, Coding, Alerts, Reports
- Pakete & Addons (4 plans + 9 addons incl. Coding)
- E-Mail Templates (15 templates: transactional, marketing, alerts)
- **Meine Garage** — Add/edit/delete vehicles, localStorage persistence, search, quick coding link
- **Mein Profil** — Personal data, security, notifications, plan info, garage preview, usage stats
- 7 AI Tools, 7 Beispiele, Fahrzeugsuche with detail view

### Other
- Demo buchen: 4 products (Market, Tuning, Coding, Alle)
- Support: Help center, API docs, Coding documentation

## API Endpoints
- POST /api/ai/coding-assistant, /api/ai/analyze-deal, /api/ai/ecu-knowledge, /api/ai/generate-report

## Mocked Data
- Dashboard stats, Vehicle listings, Auth, Pricing checkouts
- Profile + Garage stored in localStorage (prepared for backend API)

## Backlog
### P0
- Connect Frontend to Backend API (replace mocked data)
- User Authentication (JWT login/register)
### P1
- Chat History Persistence (MongoDB), Stripe, PWA App
### P2
- Crawler System, Admin Panel, E-Mail Versand (SendGrid/Resend)
### P3
- Multi-tenant database separation
