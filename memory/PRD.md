# AutoIntel - Automotive SaaS Platform PRD

## Original Problem Statement
Landing page für eine Automotive SaaS Plattform mit zwei spezialisierten Produkten:
- **Market Intelligence**: Fahrzeugmarkt analysieren, Preise verstehen, Deals erkennen, Konkurrenz überwachen
- **Tuning Intelligence**: ECU/TCU/Tools verstehen, Protokolle & Methoden tracken, Support-Matrix aufbauen

## User Personas
1. **Automotive Händler**: Benötigen schnelle Marktübersicht und Deal-Erkennung
2. **Tuning-Spezialisten**: Suchen technische ECU/TCU Informationen und Tool-Kompatibilität
3. **Automotive Geschäftsführer**: Wollen Konkurrenz-Monitoring und Business Intelligence

## Core Requirements (Static)
- Dark Theme Design
- German Language
- Modern Tech-focused UI mit Animationen
- Responsive Design (Mobile + Desktop)
- Alle CTAs: Waitlist, Demo buchen, Login

## What's Been Implemented (January 2025)

### Landing Page (/)
- [x] Navigation (sticky glass header, mobile menu, Products dropdown)
- [x] Hero Section (background image, CTAs, stats)
- [x] Market Intelligence Features (5 Bento-Grid cards) + "Mehr erfahren" Link
- [x] Tuning Intelligence Features (6 Bento-Grid cards) + "Mehr erfahren" Link
- [x] How It Works (4-step workflow)
- [x] Pricing (4 Pläne: Basic €49, Pro €99, Elite €199, Combined €299)
- [x] Testimonials (3 cards)
- [x] FAQ (8 Fragen mit Accordion)
- [x] Footer (Newsletter, Links, Social Media)

### Market Intelligence Subpage (/market) - NEW
- [x] Immersive Hero with scroll progress indicator
- [x] Problem Statement Section (3 cards)
- [x] "Stell dir vor..." Solution Intro
- [x] Deal Score Feature Deep-Dive (animated score cards)
- [x] Real-time Alerts Feature (notification mockup)
- [x] Competitor Monitoring Feature (dealer cards)
- [x] Stats Section (50K+ Fahrzeuge, €2.3M Ersparnis)
- [x] CTA Section with Demo booking

### Tuning Intelligence Subpage (/tuning) - NEW
- [x] Immersive Hero with circuit pattern background
- [x] Problem Statement Section (3 cards)
- [x] "Eine Quelle der Wahrheit" Solution Intro
- [x] ECU Finder Feature Deep-Dive (animated search mockup)
- [x] Tool Matrix Feature (Bench/OBD/Boot table)
- [x] Protocol Tracking Feature (update feed)
- [x] Typical Workflow Section (5 steps)
- [x] Stats Section (10K+ ECU-Typen)
- [x] CTA Section with Demo booking

### Technical Implementation
- React + Tailwind CSS + React Router
- Framer Motion für Animationen
- Shadcn/UI Komponenten
- Scroll-based animations & progress indicators
- Fully responsive design

## Prioritized Backlog

### P0 - Critical (Next Phase)
- [ ] User Authentication System (Login/Register)
- [ ] Database Integration für Newsletter Subscribers
- [ ] Demo Booking System Integration

### P1 - High Priority
- [ ] Market Intelligence Dashboard MVP
- [ ] Tuning Intelligence ECU Finder
- [ ] User Dashboard

### P2 - Medium Priority
- [ ] API Integration für Crawler-Daten
- [ ] Deal Score Algorithmus
- [ ] Alert System für neue Fahrzeuge

### P3 - Nice to Have
- [ ] Multi-Language Support (EN)
- [ ] Dark/Light Theme Toggle
- [ ] Advanced Analytics Dashboard

## Routes
- `/` - Landing Page
- `/market` - Market Intelligence Storytelling Page
- `/tuning` - Tuning Intelligence Storytelling Page

## Next Tasks
1. Backend API für Newsletter-Anmeldungen implementieren
2. User Authentication mit JWT oder OAuth
3. Demo-Buchungs-Integration (Calendly/Cal.com)
