from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import os
import uuid
from emergentintegrations.llm.chat import LlmChat, UserMessage

router = APIRouter(prefix="/api/ai")

EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

# ─── Models ──────────────────────────────────────────

class DealAnalyzerRequest(BaseModel):
    brand: str
    model: str
    year: int
    km: int
    price: int
    location: Optional[str] = ""

class MarketReportRequest(BaseModel):
    focus: Optional[str] = "general"

class SmartAlertRequest(BaseModel):
    alerts: list[dict]

class ECUChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

# ─── AI Deal Analyzer ────────────────────────────────

@router.post("/deal-analyzer")
async def deal_analyzer(req: DealAnalyzerRequest):
    chat = LlmChat(
        api_key=EMERGENT_KEY,
        session_id=f"deal-{uuid.uuid4().hex[:8]}",
        system_message="""Du bist ein Automotive-Marktexperte und Deal-Analyst. 
Analysiere Fahrzeugangebote und bewerte sie. Antworte IMMER auf Deutsch.
Gib eine strukturierte Analyse mit:
1. Deal Score (0-100)
2. Marktpreis-Einschätzung (über/unter Marktwert, geschätzter Marktwert)
3. Stärken des Angebots
4. Risiken/Schwächen
5. Empfehlung (Kaufen/Abwarten/Finger weg)
6. Preisvorhersage (nächste 30 Tage)
Halte die Antwort kompakt aber informativ. Nutze Zahlen und Fakten."""
    ).with_model("openai", "gpt-4o")

    prompt = f"""Analysiere dieses Fahrzeugangebot:
- Marke/Modell: {req.brand} {req.model}
- Baujahr: {req.year}
- Kilometerstand: {req.km:,} km
- Angebotspreis: €{req.price:,}
- Standort: {req.location or 'Deutschland'}

Gib deine Expertenbewertung ab."""

    msg = UserMessage(text=prompt)
    response = await chat.send_message(msg)
    return {"analysis": response, "session_id": chat.session_id}


# ─── AI Market Report ────────────────────────────────

@router.post("/market-report")
async def market_report(req: MarketReportRequest):
    chat = LlmChat(
        api_key=EMERGENT_KEY,
        session_id=f"report-{uuid.uuid4().hex[:8]}",
        system_message="""Du bist ein Automotive Market Intelligence Analyst.
Erstelle professionelle Marktberichte auf Deutsch.
Struktur:
1. Executive Summary (2-3 Sätze)
2. Marktübersicht (Trends, Preisbewegungen)
3. Top-Deals der Woche (3-5 Beispiele mit Preisen)
4. Segment-Analyse (Kompakt, Mittelklasse, Premium, SUV)
5. Preisprognose (nächste 2-4 Wochen)
6. Empfehlungen für Händler
Nutze realistische Zahlen und Marktdaten für den deutschen Automarkt 2026."""
    ).with_model("openai", "gpt-4o")

    focus_text = {
        "general": "allgemeiner Marktüberblick",
        "premium": "Premium-Segment (BMW, Mercedes, Audi, Porsche)",
        "compact": "Kompaktklasse (Golf, A3, 1er, A-Klasse)",
        "suv": "SUV-Segment",
        "electric": "Elektrofahrzeuge"
    }.get(req.focus, "allgemeiner Marktüberblick")

    prompt = f"Erstelle einen aktuellen Marktbericht für den deutschen Automobilmarkt mit Fokus auf: {focus_text}. Kalenderwoche 12/2026."
    msg = UserMessage(text=prompt)
    response = await chat.send_message(msg)
    return {"report": response}


# ─── Smart Alert Engine ──────────────────────────────

@router.post("/smart-alerts")
async def smart_alerts(req: SmartAlertRequest):
    chat = LlmChat(
        api_key=EMERGENT_KEY,
        session_id=f"alert-{uuid.uuid4().hex[:8]}",
        system_message="""Du bist ein AI-Analyst für einen Automotive-Marktplatz.
Analysiere Alert-Daten und erkenne Muster. Antworte auf Deutsch.
Gib für jedes erkannte Muster:
1. Muster-Name
2. Beschreibung (1-2 Sätze)
3. Betroffene Fahrzeuge/Segmente
4. Dringlichkeit (Hoch/Mittel/Niedrig)
5. Empfohlene Aktion
Maximal 3-4 Muster. Kompakt und actionable."""
    ).with_model("openai", "gpt-4o")

    alert_summary = "\n".join([
        f"- {a.get('title', 'N/A')}: {a.get('desc', 'N/A')} (Severity: {a.get('severity', 'N/A')})"
        for a in req.alerts[:10]
    ])

    prompt = f"Analysiere diese Alerts und erkenne Muster:\n{alert_summary}"
    msg = UserMessage(text=prompt)
    response = await chat.send_message(msg)
    return {"analysis": response}


# ─── ECU Knowledge Bot ───────────────────────────────

@router.post("/ecu-chat")
async def ecu_chat(req: ECUChatRequest):
    session = req.session_id or f"ecu-{uuid.uuid4().hex[:8]}"
    
    chat = LlmChat(
        api_key=EMERGENT_KEY,
        session_id=session,
        system_message="""Du bist ein ECU/TCU-Tuning-Experte mit tiefem Wissen über Steuergeräte, 
Tuning-Tools und Protokolle. Antworte IMMER auf Deutsch.

Dein Wissen umfasst:
- ECU-Typen: Bosch (EDC17, MED17, MG1, MD1), Continental (SID, EMS), Delphi, Denso
- Tools: Autotuner, KESSv3, KTAG, CMD Flash, FLEX, Magic Motorsport
- Methoden: OBD, Bench, Boot, BDM, JTAG
- TCUs: ZF (6HP, 8HP), DQ (DQ200, DQ250, DQ381, DQ500), PDK, 9G-Tronic
- Risikobewertung für verschiedene Methoden

Gib technisch präzise Antworten mit:
- Tool-Empfehlungen
- Methoden-Vergleich
- Risikobewertung (Niedrig/Mittel/Hoch)
- Kompatibilitätsinfos
Halte Antworten kompakt und praxisnah."""
    ).with_model("openai", "gpt-4o")

    msg = UserMessage(text=req.message)
    response = await chat.send_message(msg)
    return {"response": response, "session_id": session}
