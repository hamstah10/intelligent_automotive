# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Landing page for an Automotive SaaS platform with two specialized products:
- **Market Intelligence**: Fahrzeugmarkt analysieren, Preise verstehen, Deals erkennen, Konkurrenz ueberwachen
- **Tuning Intelligence**: ECU/TCU/Tools verstehen, Protokolle & Methoden tracken, Support-Matrix aufbauen

## User Personas
1. **Automotive Haendler**: Benoetigen schnelle Marktuebersicht und Deal-Erkennung
2. **Tuning-Spezialisten**: Suchen technische ECU/TCU Informationen und Tool-Kompatibilitaet
3. **Automotive Geschaeftsfuehrer**: Wollen Konkurrenz-Monitoring und Business Intelligence

## Core Requirements
- Dark Theme Design (#050505 background)
- German Language UI
- Space Grotesk Typography
- 8px border-radius buttons
- Framer Motion Animations
- No modals for main flows (dedicated pages instead)
- Accent colors: Cyan (#00E5FF) for Market, Yellow-Green (#CCFF00) for Tuning

## What's Been Implemented

### Landing Page (/)
- [x] Navigation (sticky glass header, mobile menu, Products dropdown)
- [x] Hero Section (parallax background image, CTAs, stats)
- [x] **Live Deal Ticker** (animated feed between Hero & Features)
- [x] Market Intelligence Features (5 Bento-Grid cards)
- [x] **ROI Calculator** (interactive sliders, German currency formatting)
- [x] Tuning Intelligence Features (6 Bento-Grid cards)
- [x] **ECU Visualizer** (interactive brand/model selection, ECU/TCU/tools display)
- [x] How It Works (4-step workflow)
- [x] Pricing (4 plans: Basic 49, Pro 99, Elite 199, Combined 299)
- [x] Testimonials (3 cards)
- [x] FAQ (8 questions with Accordion)
- [x] Footer (Newsletter, Links, Social Media, System Status link)

### Market Intelligence Subpage (/market)
- [x] Immersive Hero with scroll progress indicator
- [x] Problem Statement, Solution Intro, Deal Score, Alerts, Competitor Monitoring
- [x] Stats Section, CTA Section

### Tuning Intelligence Subpage (/tuning)
- [x] Immersive Hero with circuit pattern background
- [x] Problem Statement, Solution Intro, ECU Finder, Tool Matrix, Protocol Tracking
- [x] Typical Workflow, Stats Section, CTA Section

### Auth & Booking Pages
- [x] Login Page (/login)
- [x] Register Page (/register)
- [x] Demo Booking Page (/demo) with 4-step wizard, .ics calendar download, **confetti animation on success**

### Utility Pages
- [x] Support Page (/support) - Help, Docs, API Docs
- [x] **System Status Page** (/system-status) - Service monitoring, uptime chart, incidents

## Routes
- `/` - Landing Page
- `/market` - Market Intelligence Storytelling
- `/tuning` - Tuning Intelligence Storytelling
- `/login` - Login Page
- `/register` - Register Page
- `/demo` - Demo Booking
- `/support` - Support/Help Center
- `/system-status` - System Status Page

## Prioritized Backlog

### P0 - Critical (Next Phase)
- [ ] Backend API Implementation (FastAPI + MongoDB)
- [ ] Connect Frontend to Backend API (replace mocked data)
- [ ] User Authentication System (JWT)

### P1 - High Priority
- [ ] Market Intelligence Dashboard MVP
- [ ] Tuning Intelligence ECU Finder (real data)
- [ ] User Dashboard
- [ ] Newsletter subscription storage

### P2 - Medium Priority
- [ ] Crawler System (Python Pipeline: Spider, Parser, Normalizer, API)
- [ ] Deal Score Algorithm
- [ ] Alert System

### P3 - Nice to Have
- [ ] Admin Panel (Tenants, Crawl Jobs, Logs)
- [ ] Multi-tenant database separation
- [ ] Multi-Language Support (EN)
- [ ] Dark/Light Theme Toggle

## Project Health
- **Broken**: None
- **Mocked**: All data, Auth, API endpoints, Demo booking, Newsletter, Status services
- **3rd Party Integrations**: None yet
