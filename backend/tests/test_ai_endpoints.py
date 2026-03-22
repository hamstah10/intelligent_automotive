"""
AI Endpoints Test Suite for Automotive Intelligence SaaS Platform
Tests all 4 AI features:
1. AI Deal Analyzer - /api/ai/deal-analyzer
2. AI Market Report - /api/ai/market-report
3. Smart Alert Engine - /api/ai/smart-alerts
4. ECU Knowledge Bot - /api/ai/ecu-chat
"""

import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# AI endpoints require longer timeout due to OpenAI API calls
AI_TIMEOUT = 45


class TestAIDealAnalyzer:
    """AI Deal Analyzer endpoint tests - POST /api/ai/deal-analyzer"""
    
    def test_deal_analyzer_success(self):
        """Test successful deal analysis with valid vehicle data"""
        payload = {
            "brand": "BMW",
            "model": "320d Touring",
            "year": 2021,
            "km": 45000,
            "price": 28900,
            "location": "München"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/ai/deal-analyzer",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "analysis" in data
        assert "session_id" in data
        
        # Verify analysis content (should be in German)
        analysis = data["analysis"]
        assert len(analysis) > 100  # Should have substantial content
        assert isinstance(analysis, str)
        
        # Session ID should be generated
        assert data["session_id"].startswith("deal-")
    
    def test_deal_analyzer_minimal_data(self):
        """Test deal analysis with minimal required fields"""
        payload = {
            "brand": "VW",
            "model": "Golf GTI",
            "year": 2022,
            "km": 22000,
            "price": 29900
        }
        
        response = requests.post(
            f"{BASE_URL}/api/ai/deal-analyzer",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "analysis" in data
        assert len(data["analysis"]) > 50
    
    def test_deal_analyzer_missing_required_field(self):
        """Test deal analysis with missing required field"""
        payload = {
            "brand": "BMW",
            # Missing "model" field
            "year": 2021,
            "km": 45000,
            "price": 28900
        }
        
        response = requests.post(
            f"{BASE_URL}/api/ai/deal-analyzer",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        # Should return 422 for validation error
        assert response.status_code == 422


class TestAIMarketReport:
    """AI Market Report endpoint tests - POST /api/ai/market-report"""
    
    def test_market_report_general(self):
        """Test market report generation with general focus"""
        payload = {"focus": "general"}
        
        response = requests.post(
            f"{BASE_URL}/api/ai/market-report",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "report" in data
        
        # Verify report content
        report = data["report"]
        assert len(report) > 200  # Should have substantial content
        assert isinstance(report, str)
    
    def test_market_report_premium_focus(self):
        """Test market report with premium segment focus"""
        payload = {"focus": "premium"}
        
        response = requests.post(
            f"{BASE_URL}/api/ai/market-report",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "report" in data
        assert len(data["report"]) > 100
    
    def test_market_report_default_focus(self):
        """Test market report with empty payload (default focus)"""
        payload = {}
        
        response = requests.post(
            f"{BASE_URL}/api/ai/market-report",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "report" in data


class TestSmartAlertEngine:
    """Smart Alert Engine endpoint tests - POST /api/ai/smart-alerts"""
    
    def test_smart_alerts_analysis(self):
        """Test smart alert pattern analysis"""
        payload = {
            "alerts": [
                {"title": "BMW 320d Touring unter Marktwert", "desc": "Preis: €28.900 — Marktwert: €31.200 (−7,4%)", "severity": "high", "type": "price"},
                {"title": "Neues ECU-Release: Continental SID212", "desc": "Bench-Support jetzt verfügbar via FLEX", "severity": "medium", "type": "ecu"},
                {"title": "Porsche Macan S Preisdrop −8,1%", "desc": "Preis: €48.500 — Marktwert: €52.800", "severity": "high", "type": "price"}
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/ai/smart-alerts",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "analysis" in data
        
        # Verify analysis content
        analysis = data["analysis"]
        assert len(analysis) > 100  # Should have substantial content
        assert isinstance(analysis, str)
    
    def test_smart_alerts_empty_list(self):
        """Test smart alerts with empty alerts list"""
        payload = {"alerts": []}
        
        response = requests.post(
            f"{BASE_URL}/api/ai/smart-alerts",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "analysis" in data


class TestECUKnowledgeBot:
    """ECU Knowledge Bot endpoint tests - POST /api/ai/ecu-chat"""
    
    def test_ecu_chat_new_session(self):
        """Test ECU chat with new session"""
        payload = {
            "message": "Kann ich den Bosch MED17 per OBD flashen?",
            "session_id": None
        }
        
        response = requests.post(
            f"{BASE_URL}/api/ai/ecu-chat",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "response" in data
        assert "session_id" in data
        
        # Verify response content
        bot_response = data["response"]
        assert len(bot_response) > 50  # Should have substantial content
        assert isinstance(bot_response, str)
        
        # Session ID should be generated
        assert data["session_id"].startswith("ecu-")
    
    def test_ecu_chat_existing_session(self):
        """Test ECU chat with existing session (multi-turn conversation)"""
        # First message to create session
        payload1 = {
            "message": "Welches Tool für BMW B58 Motor?",
            "session_id": None
        }
        
        response1 = requests.post(
            f"{BASE_URL}/api/ai/ecu-chat",
            json=payload1,
            timeout=AI_TIMEOUT
        )
        
        assert response1.status_code == 200
        session_id = response1.json()["session_id"]
        
        # Second message with same session
        payload2 = {
            "message": "Und welche Risiken gibt es dabei?",
            "session_id": session_id
        }
        
        response2 = requests.post(
            f"{BASE_URL}/api/ai/ecu-chat",
            json=payload2,
            timeout=AI_TIMEOUT
        )
        
        assert response2.status_code == 200
        data2 = response2.json()
        assert "response" in data2
        assert data2["session_id"] == session_id
    
    def test_ecu_chat_missing_message(self):
        """Test ECU chat with missing message field"""
        payload = {"session_id": None}
        
        response = requests.post(
            f"{BASE_URL}/api/ai/ecu-chat",
            json=payload,
            timeout=AI_TIMEOUT
        )
        
        # Should return 422 for validation error
        assert response.status_code == 422


class TestHealthEndpoints:
    """Basic health check endpoints"""
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        response = requests.get(f"{BASE_URL}/api/", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
