import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from './DashboardOverview';
import { DashboardMarket } from './DashboardMarket';
import { DashboardTuning } from './DashboardTuning';
import { DashboardAlerts } from './DashboardAlerts';
import { DashboardReports } from './DashboardReports';
import { DashboardTeams } from './DashboardTeams';
import { DashboardTenants } from './DashboardTenants';
import { DashboardEmpfehlungen } from './DashboardEmpfehlungen';
import { DashboardToolWrapper } from './DashboardToolWrapper';
import { Brain, Calculator, Search, HelpCircle, ArrowLeftRight, Radar, Map } from 'lucide-react';

import { AIDealAnalyzer } from '../landing/AIDealAnalyzer';
import { ROICalculator } from '../landing/ROICalculator';
import { VehicleConfigurator } from '../landing/VehicleConfigurator';
import { DealQuiz } from '../landing/DealQuiz';
import { BeforeAfterSlider } from '../landing/BeforeAfterSlider';
import { CompetitorRadar } from '../landing/CompetitorRadar';
import { MarketHeatmap } from '../landing/MarketHeatmap';

import { BeispielVergleich } from './BeispielVergleich';
import { BeispielPreisTracker } from './BeispielPreisTracker';
import { BeispielFlotte } from './BeispielFlotte';
import { BeispielMarktReport } from './BeispielMarktReport';
import { BeispielTuningShowcase } from './BeispielTuningShowcase';
import { BeispielWidgets } from './BeispielWidgets';
import { BeispielFahrzeugsuche } from './BeispielFahrzeugsuche';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="market" element={<DashboardMarket />} />
        <Route path="tuning" element={<DashboardTuning />} />
        <Route path="alerts" element={<DashboardAlerts />} />
        <Route path="reports" element={<DashboardReports />} />
        <Route path="teams" element={<DashboardTeams />} />
        <Route path="tenants" element={<DashboardTenants />} />
        <Route path="empfehlungen" element={<DashboardEmpfehlungen />} />

        {/* Tools */}
        <Route path="tools/deal-analyzer" element={
          <DashboardToolWrapper title="Deal Analyzer" description="KI-gestützte Fahrzeug-Deal-Analyse mit Marktvergleich" icon={Brain} accentColor="#00E5FF">
            <AIDealAnalyzer />
          </DashboardToolWrapper>
        } />
        <Route path="tools/roi-rechner" element={
          <DashboardToolWrapper title="ROI Rechner" description="Berechne dein Einsparpotenzial mit AutoIntel" icon={Calculator} accentColor="#CCFF00">
            <ROICalculator />
          </DashboardToolWrapper>
        } />
        <Route path="tools/marktwert" element={
          <DashboardToolWrapper title="Marktwert-Check" description="Sofort den geschätzten Marktwert ermitteln" icon={Search} accentColor="#00E5FF">
            <VehicleConfigurator />
          </DashboardToolWrapper>
        } />
        <Route path="tools/deal-quiz" element={
          <DashboardToolWrapper title="Deal Quiz" description="Finde das perfekte Fahrzeug in wenigen Schritten" icon={HelpCircle} accentColor="#CCFF00">
            <DealQuiz />
          </DashboardToolWrapper>
        } />
        <Route path="tools/vorher-nachher" element={
          <DashboardToolWrapper title="Vorher / Nachher" description="Vergleiche manuellen Aufwand mit AutoIntel-Automatisierung" icon={ArrowLeftRight} accentColor="#00E5FF">
            <BeforeAfterSlider />
          </DashboardToolWrapper>
        } />
        <Route path="tools/radar" element={
          <DashboardToolWrapper title="Wettbewerb-Radar" description="AutoIntel vs. manuelle Methoden im Direktvergleich" icon={Radar} accentColor="#CCFF00">
            <CompetitorRadar />
          </DashboardToolWrapper>
        } />
        <Route path="tools/heatmap" element={
          <DashboardToolWrapper title="Markt-Heatmap" description="Deal-Hotspots in Deutschland in Echtzeit" icon={Map} accentColor="#00E5FF">
            <MarketHeatmap />
          </DashboardToolWrapper>
        } />

        {/* Beispiele */}
        <Route path="beispiele/vergleich" element={<BeispielVergleich />} />
        <Route path="beispiele/preis-tracker" element={<BeispielPreisTracker />} />
        <Route path="beispiele/flotte" element={<BeispielFlotte />} />
        <Route path="beispiele/markt-report" element={<BeispielMarktReport />} />
        <Route path="beispiele/tuning-showcase" element={<BeispielTuningShowcase />} />
        <Route path="beispiele/widgets" element={<BeispielWidgets />} />
        <Route path="beispiele/fahrzeugsuche" element={<BeispielFahrzeugsuche />} />
      </Routes>
    </DashboardLayout>
  );
}
