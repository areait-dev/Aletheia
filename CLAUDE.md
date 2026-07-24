CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Project Overview
Alètheia Srl is a Next.js mockup project demonstrating how Alètheia's business content (training services and job agency) would integrate with the iTeach WordPress theme. This is a static site mockup — not a functional WordPress theme or production deployment. It uses Next.js 13 with Tailwind CSS for styling and is designed to be presented to the iTeach theme owner as a proof-of-concept for content integration.
Common Development Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm start        # Run production build locally
npm run lint     # Run Next.js linting
```
Project Structure
```
pages/                  # Next.js route pages
  index.js             # Home page (hero, services, featured courses, elearning)
  _app.js              # App wrapper, imports globals.css and Chatbot component
  chi-siamo.js         # About Us page (mission, vision, values, team)
  contatti.js          # Contact page
  agenzia-per-il-lavoro.js          # Job agency overview page
  agenzia-per-il-lavoro/            # Job agency sub-pages
  formazione/                       # Training course category pages
  all-courses/                      # Course listing and detail pages
  news/                             # News listing and detail pages

components/            # React components
  Header.js           # Navigation header with responsive menu, dropdown for Formazione
  Chatbot.js          # Chat widget component
  NumberCounter.js    # Animated number counter (used for stats)
  FormCandidato.js    # Candidate application form
  FormAzienda.js      # Company job posting form

styles/               # Styling
  globals.css         # CSS variables (color, shadow, radius), base styles, iTeach-inspired design

tailwind.config.js    # Tailwind CSS configuration
postcss.config.js     # PostCSS config for Tailwind
package.json          # Dependencies (Next.js 13, React 18, Tailwind, Framer Motion)
```
Key Architectural Patterns
CSS & Styling Approach
CSS Variables (`--primary`, `--text-dark`, `--shadow-md`, etc.) defined in `globals.css` for consistency and theming
Tailwind CSS via `@tailwind` directives in globals.css
Inline styles used in components for dynamic, data-driven styling (e.g., badge colors, hover states)
Font: Plus Jakarta Sans from Google Fonts
Icon library: Font Awesome 6.4.0 (via CDN in `_app.js`)
Component Architecture
Most components are stateless or manage minimal UI state (e.g., hover, menu toggle)
Header manages navigation state (`menuOpen`, `formazioneOpen`, `dropdownOpen`) and scroll detection
Components rely on inline JSX styling (React inline objects) for responsive/dynamic styling
No component library (Shadcn, MUI, etc.) — design is custom CSS + Tailwind
Page Structure
Pages are static content (no dynamic data fetching in most cases)
Some pages use [slug].js dynamic routes (e.g., `all-courses/[slug].js`, `news/[slug].js`)
Pages import the `Header` component and manage their own page-specific styling
No API routes or backend logic
Design Language
iTeach-inspired theme with soft shadows, rounded corners, and a teal/green primary color (`#008C95`)
Color palette includes secondary accent colors (`#10B981`, `#F59E0B`, `#6366F1`) for categories/badges
Responsive design using CSS media queries and flexbox/grid
Hover states and transitions for interactivity
Important Notes
This is a mockup, not production-ready: No database, authentication, real course data, or backend
Font Awesome icons are loaded via CDN in `_app.js` (no local icon files)
Logo is expected at `/public/logo.png`
No environment variables currently in use
No testing framework set up
No build optimizations (image compression, code splitting beyond Next.js defaults)
When Adding New Pages or Features
New pages: Create under `pages/` following Next.js conventions (or subdirectories for grouping)
New components: Add to `components/` if reusable across pages; otherwise keep page-specific styles inline
New colors/styles: Add to CSS variables in `globals.css` for consistency
Responsive behavior: Use CSS media queries in `globals.css` or inline media query support (e.g., via Tailwind utilities)


Navigation updates: Edit link arrays in `Header.js` to add new menu items
Stile di Lavoro
Prima di modificare qualsiasi file, leggi l'intero file per capire il pattern esistente
Quando un problema esiste su più file, risolvi la causa radice — non correggere file per file
Se la homepage funziona correttamente, usala come riferimento esatto e replica il pattern sugli altri file
Prima di scrivere codice, spiega brevemente l'approccio che intendi seguire e perché
Se noti ambiguità o più modi per risolvere un problema, elenca le opzioni e chiedi conferma prima di procedere
Dopo ogni modifica significativa, verifica che non abbia introdotto regressioni in altri componenti
Documenta ogni colore o token aggiunto con un commento che ne spiega il contesto (es. `// WCAG AA 4.5:1`)
Dark Mode — Regole Obbligatorie
Il sito usa Tailwind CSS con la strategia `class` per la dark mode (classe `dark` sul tag `html`).
Token colore standard da usare su tutto il sito:
Ruolo	Light	Dark
Sfondo pagina	`bg-white`	`dark:bg-gray-900` (`#111827`)
Sfondo sezioni alternate	`bg-gray-50`	`dark:bg-gray-900`
Sfondo card / pannelli	`bg-white`	`dark:bg-gray-800` (`#1f2937`)
Sfondo input	`bg-white`	`dark:bg-gray-700` (`#374151`)
Testo primario	`text-gray-900`	`dark:text-gray-50` (`#F8FAFC`)
Testo secondario	`text-gray-600`	`dark:text-gray-300` (`#CBD5E1`)
Testo muted	`text-gray-400`	`dark:text-gray-400` (`#9CA3AF`)
Bordi e separatori	`border-gray-200`	`dark:border-gray-700` (`#374151`)
Placeholder input	`placeholder-gray-400`	`dark:placeholder-gray-500`
Regole:
Mai colori hardcodati inline senza la corrispettiva variante dark
Mai `bg-white` senza `dark:bg-gray-800` (o equivalente)
Mai `text-gray-900` senza `dark:text-gray-50` (o equivalente)
Il colore brand turchese `#008C95` rimane invariato in entrambi i temi
Contrasto minimo WCAG AA: 4.5:1 per testo normale, 3:1 per testo grande (>18px bold o >24px regular)
La homepage (`index.js`) è il riferimento corretto — se un componente non sa come implementare la dark mode, guarda lì