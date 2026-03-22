# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Landing page + Full Dashboard for an Automotive SaaS platform with two specialized products:
- **Market Intelligence**: Fahrzeugmarkt analysieren, Preise verstehen, Deals erkennen, Konkurrenz ueberwachen
- **Tuning Intelligence**: ECU/TCU/Tools verstehen, Protokolle & Methoden tracken, Support-Matrix aufbauen

## Core Requirements
- Dark Theme Design (#050505 background, #111111 cards)
- German Language UI
- Space Grotesk Typography
- rounded-2xl cards, border-white/10
- Framer Motion Animations + Noise Overlay
- No modals for main flows (dedicated pages)
- Accent colors: Cyan (#00E5FF) for Market, Yellow-Green (#CCFF00) for Tuning

## What's Been Implemented

### Landing Page (/)
- [x] Navigation, Hero, LiveTicker, FeaturesMarket, ROI Calculator
- [x] FeaturesTuning, ECU Visualizer, HowItWorks, Pricing, Testimonials, FAQ, Footer

### Customer Dashboard (/dashboard/*)
- [x] **Übersicht** (/dashboard) - KPIs, Marktbewegung Chart, Alert-Zentrale, Tabs, Tuning Feed, Update-Frequenz
- [x] **Market** (/dashboard/market) - Stats, Preisentwicklung Chart, 6 Fahrzeug-Listings mit Bildern und Deal-Scores
- [x] **Tuning** (/dashboard/tuning) - ECU-Stats, Tool-Matrix Tabelle, Coverage Chart, 8 ECU-Datenbank-Eintraege
- [x] **Alerts** (/dashboard/alerts) - Filter-Tabs, 4 Summary Cards, 12 Alert Items mit Severity-Badges
- [x] **Reports** (/dashboard/reports) - KPIs, 6-Monats Activity Chart, 5 Reports mit Download
- [x] **Teams** (/dashboard/teams) - 4 Rollen-Cards, 6 Team-Mitglieder mit Avataren und Status
- [x] **Tenants** (/dashboard/tenants) - Stats, 6 Mandanten mit Plan-Badges und Nutzungsbalken
- [x] **Sidebar** - Logo, 7 Nav-Items mit Badges, Plan Status Card (78%)

### Storytelling Subpages
- [x] Market (/market), Tuning (/tuning)

### Auth & Booking
- [x] Login (/login), Register (/register), Demo (/demo) mit Konfetti + .ics

### Utility
- [x] Support (/support), System Status (/system-status)

## Prioritized Backlog

### P0 - Critical
- [ ] Backend API (FastAPI + MongoDB)
- [ ] Frontend mit Backend verbinden
- [ ] User Authentication (JWT)

### P1 - High
- [ ] Dashboard mit echten Daten fuellen
- [ ] ECU Finder mit echten Daten

### P2 - Medium
- [ ] Crawler System (Python Pipeline)
- [ ] Deal Score Algorithmus
- [ ] Alert System mit Notifications

### P3 - Nice to Have
- [ ] Admin Panel
- [ ] Multi-Tenant DB Trennung
- [ ] Multi-Language (EN)

## Project Health
- **Broken**: None
- **Mocked**: ALL data (Listings, ECUs, Alerts, Teams, Tenants, KPIs, Charts)
- **3rd Party Integrations**: None
