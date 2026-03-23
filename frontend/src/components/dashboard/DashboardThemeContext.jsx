import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = ['dark', 'light', 'gradient'];
const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, nextTheme: () => {} });

export const DashboardThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('dash-theme');
      return THEMES.includes(saved) ? saved : 'dark';
    } catch { return 'dark'; }
  });

  useEffect(() => {
    try { localStorage.setItem('dash-theme', theme); } catch {}
  }, [theme]);

  const setTheme = (t) => { if (THEMES.includes(t)) setThemeState(t); };
  const nextTheme = () => {
    const idx = THEMES.indexOf(theme);
    setThemeState(THEMES[(idx + 1) % THEMES.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, nextTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDashTheme = () => useContext(ThemeContext);
export { THEMES };
