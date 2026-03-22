import { DashboardSidebar } from './DashboardSidebar';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="noise-overlay" />
      <DashboardSidebar />
      <main className="ml-[220px] p-8 relative z-10">
        {children}
      </main>
    </div>
  );
};
