# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Landing page + Dashboard for an Automotive SaaS platform with two specialized products:
- **Market Intelligence**: Fahrzeugmarkt analysieren, Preise verstehen, Deals erkennen, Konkurrenz ueberwachen
- **Tuning Intelligence**: ECU/TCU/Tools verstehen, Protokolle & Methoden tracken, Support-Matrix aufbauen

## User Personas
1. **Automotive Haendler**: Benoetigen schnelle Marktuebersicht und Deal-Erkennung
2. **Tuning-Spezialisten**: Suchen technische ECU/TCU Informationen und Tool-Kompatibilitaet
3. **Automotive Geschaeftsfuehrer**: Wollen Konkurrenz-Monitoring und Business Intelligence

## Core Requirements
- Dark Theme Design (#050505 background, #111111 cards)
- German Language UI
- Space Grotesk Typography
- 8px border-radius buttons, rounded-2xl cards
- Framer Motion Animations
- No modals for main flows (dedicated pages instead)
- Accent colors: Cyan (#00E5FF) for Market, Yellow-Green (#CCFF00) for Tuning
- Noise texture overlay on pages

## What's Been Implemented

### Landing Page (/)
- [x] Navigation (sticky glass header, mobile menu, Products dropdown)
- [x] Hero Section (parallax background image, CTAs, stats)
- [x] Live Deal Ticker (animated feed between Hero & Features)
- [x] Market Intelligence Features (5 Bento-Grid cards)
- [x] ROI Calculator (interactive sliders, German currency formatting)
- [x] Tuning Intelligence Features (6 Bento-Grid cards)
- [x] ECU Visualizer (interactive brand/model selection, ECU/TCU/tools display)
- [x] How It Works (4-step workflow)
- [x] Pricing (4 plans)
- [x] Testimonials, FAQ, Footer

### Customer Dashboard (/dashboard) - NEW
- [x] Sidebar Navigation (AutoIntel logo, 7 nav items with badges, Plan Status card)
- [x] Header with search bar, Filter button, filter pills
- [x] KPI Cards (Neue Listings, Top-Deals, Aktive Alerts, Tuning Updates)
- [x] Marktbewegung Line Chart (7-day, recharts, Live badge)
- [x] Alert-Zentrale (4 alert types with count badges)
- [x] Tab Bar (Market/Tuning/Management)
- [x] Tuning Change Feed (3 items with risk badges)
- [x] Update-Frequenz Bar Chart (7-day, recharts)
- [x] Design matches website aesthetic (#050505, #111111, rounded-2xl, noise overlay)

### Storytelling Subpages
- [x] Market Intelligence (/market)
- [x] Tuning Intelligence (/tuning)

### Auth & Booking Pages
- [x] Login (/login), Register (/register)
- [x] Demo Booking (/demo) with .ics download + confetti

### Utility Pages
- [x] Support Page (/support)
- [x] System Status (/system-status)

## Routes
- `/` - Landing Page
- `/market` - Market Intelligence Storytelling
- `/tuning` - Tuning Intelligence Storytelling
- `/login` - Login Page
- `/register` - Register Page
- `/demo` - Demo Booking
- `/support` - Support/Help Center
- `/system-status` - System Status
- `/dashboard` - Customer Dashboard
- `/dashboard/*` - Dashboard sub-routes

## Prioritized Backlog

### P0 - Critical (Next Phase)
- [ ] Backend API Implementation (FastAPI + MongoDB)
- [ ] Connect Frontend to Backend API (replace mocked data)
- [ ] User Authentication System (JWT)

### P1 - High Priority
- [ ] Dashboard sub-pages (Market detail, Tuning detail, Alerts list)
- [ ] Market Intelligence real data integration
- [ ] Tuning Intelligence ECU Finder (real data)

### P2 - Medium Priority
- [ ] Crawler System (Python Pipeline)
- [ ] Deal Score Algorithm
- [ ] Alert System with real notifications

### P3 - Nice to Have
- [ ] Admin Panel (Tenants, Crawl Jobs, Logs)
- [ ] Multi-tenant database separation
- [ ] Multi-Language Support (EN)

## Project Health
- **Broken**: None
- **Mocked**: All data, Auth, API endpoints, Dashboard KPIs, Charts, Alerts, Feed
- **3rd Party Integrations**: None yet
