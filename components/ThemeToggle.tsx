import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  color?: string;
}

/** Interruttore dark/light animato (icona Sole/Luna con rotazione + crossfade). Stato persistito via ThemeContext (localStorage). */
export default function ThemeToggle({ color = '#FFFFFF' }: ThemeToggleProps) {
  const themeCtx = useTheme();
  const theme = themeCtx?.theme;
  const toggleTheme = themeCtx?.toggleTheme || (() => {});

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Passa a Light Mode' : 'Passa a Dark Mode'}
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.i
          key={theme}
          className={`far ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ fontSize: '1.1rem', color, position: 'absolute' }}
        />
      </AnimatePresence>
    </button>
  );
}
