import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  color?: string;
}

/**
 * Interruttore dark/light animato (icona Sole/Luna con rotazione + crossfade via CSS puro).
 * Stato persistito via ThemeContext (localStorage).
 *
 * Niente framer-motion qui volutamente: questo componente vive dentro Header, incluso in
 * ogni pagina del sito. AnimatePresence causava un crash SSR ("Cannot read properties of
 * null (reading 'useContext')") in fase di build su Vercel per pagine che non usano affatto
 * framer-motion, semplicemente perché ne importavano il modulo transitivamente tramite Header.
 */
export default function ThemeToggle({ color = '#FFFFFF' }: ThemeToggleProps) {
  const themeCtx = useTheme();
  const theme = themeCtx?.theme;
  const toggleTheme = themeCtx?.toggleTheme || (() => {});
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? 'Passa a Light Mode' : 'Passa a Dark Mode'}
      aria-label="Attiva/disattiva dark mode"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <i
        className="far fa-moon"
        style={{
          fontSize: '1.1rem',
          color,
          position: 'absolute',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
        }}
      />
      <i
        className="far fa-sun"
        style={{
          fontSize: '1.1rem',
          color,
          position: 'absolute',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
        }}
      />
    </button>
  );
}
