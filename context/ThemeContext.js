import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const applyTheme = (newTheme) => {
  const html = document.documentElement;
  if (newTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Default: light mode al primo accesso. L'utente può poi scegliere dark,
    // e la scelta viene ricordata tramite localStorage.
    const stored = localStorage.getItem('theme');
    const initial = stored === 'dark' ? 'dark' : 'light';

    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
