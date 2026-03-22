import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from './DashboardOverview';
import { DashboardMarket } from './DashboardMarket';
import { DashboardTuning } from './DashboardTuning';
import { DashboardAlerts } from './DashboardAlerts';
import { DashboardReports } from './DashboardReports';
import { DashboardTeams } from './DashboardTeams';
import { DashboardTenants } from './DashboardTenants';

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
      </Routes>
    </DashboardLayout>
  );
}
