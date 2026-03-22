import { DashboardSidebar } from './DashboardSidebar';
import { DashboardThemeProvider, useDashTheme } from './DashboardThemeContext';

const DashboardInner = ({ children }) => {
  const { theme } = useDashTheme();

  return (
    <div data-dash-theme={theme} className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--d-bg)', color: 'var(--d-text)' }}>
      <div className="noise-overlay" />
      <DashboardSidebar />
      <main className="ml-[220px] p-8 relative z-10">
        {children}
      </main>
    </div>
  );
};

export const DashboardLayout = ({ children }) => {
  return (
    <DashboardThemeProvider>
      <DashboardInner>{children}</DashboardInner>
    </DashboardThemeProvider>
  );
};
