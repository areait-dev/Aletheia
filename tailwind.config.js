const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...fontFamily.sans],
        heading: ['var(--font-viga)', ...fontFamily.sans],
        viga: ['var(--font-viga)', ...fontFamily.sans],
      },
      // ── Tipografia Design System ufficiale ────────────────
      fontSize: {
        'ds-h1':   ['56px', { lineHeight: '67.2px' }],
        'ds-h2':   ['36px', { lineHeight: '57.6px' }],
        'ds-h3':   ['18px', { lineHeight: '21.6px' }],
        'ds-deco': ['48px', { lineHeight: '57.6px' }],
        'ds-p1':   ['20px', { lineHeight: '24px' }],
        'ds-p2':   ['14px', { lineHeight: '16.8px' }],
        'ds-span': ['12px', { lineHeight: '14.4px' }],
      },
      maxWidth: {
        'ds-container': '1680px', // DS max-width contenitore (viewport 1920 − 120px/lato)
      },
      colors: {
        // ── Palette Design System ufficiale ────────────────
        primary: {
          DEFAULT: '#008C95',
          dark: '#004D52',
        },
        // Green scale ufficiale
        brand: {
          100: '#CCE8EA',
          200: '#99D1D5',
          300: '#4DAFB5',
          400: '#008C95', // primario
          500: '#006970',
          600: '#004D52', // primario scuro
          700: '#003134',
          800: '#002527',
        },
        // Grey scale ufficiale
        grey: {
          0:   '#FFFFFF',
          50:  '#F2F2F2',
          100: '#C5C8C6',
          200: '#999E9B',
          300: '#6C7370',
          400: '#404845',
          500: '#161C1A',
          600: '#000503',
        },
        // Sfondi DS — nomi senza prefisso "bg-" per evitare la classe doppia (bg-bg-*)
        light: '#F2F2F2',   // → classe bg-light
        dark: '#161C1A',    // → classe bg-dark
        // Bottoni DS
        'btn-primary': '#016A71',
        'btn-secondary': '#9AD2D6',

        // Sfondo dark mode — pagina = DS background dark, card/pannelli = brand
        'dark-bg': '#161C1A',
        'dark-card': '#004d52',

        // WCAG AA compliant text colors (mantenuti per compatibilità)
        'text-primary-light': '#374151',
        'text-muted-light': '#4B5563',
        'text-placeholder-light': '#6B7280',
        'text-primary-dark': '#F8FAFC',
        'text-muted-dark': '#CBD5E1',
        'text-placeholder-dark': '#9CA3AF',
      },
    },
  },
  plugins: [],
}

