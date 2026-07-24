# Design System — Alètheia Srl

> Documento estratto automaticamente da `styles/globals.css`, `tailwind.config.js`, `pages/**` e `components/**`.
> Mockup Next.js 13 + Tailwind CSS, ispirato al tema iTeach. Strategia dark mode: classe `dark` su `<html>`.
>
> Brand color principale: **`#008C95`** (turchese) — invariato tra light e dark.
> In dark mode il verde brand `#10B981` sostituisce spesso il turchese per accenti/testo.

---

## 1. Tipografia

### Font family
| Ruolo | Font | Sorgente | Note |
|---|---|---|---|
| Corpo / UI | **Nunito** | Google Fonts (pesi 300–900) | `font-family: 'Nunito', sans-serif` |
| Titoli (h1–h6) | **Viga** | `next/font/google`, var `--font-viga` | unico peso 400; `text-transform: uppercase`; `font-synthesis: none` |
| Fallback Tailwind | `font-sans` → Nunito · `font-heading`/`font-viga` → Viga | `tailwind.config.js` | |

> ⚠️ Regola globale: `h1,h2,h3,h4,h5,h6 { font-weight: 400 !important }`. Tutte le utility/inline di peso elevato sui titoli (es. `font-extrabold`, `font-weight:800`) vengono **forzate a 400** per evitare il faux-bold su Viga.

### Heading e testo — CSS globale (`globals.css`)
| Elemento | Dimensione | Peso (effettivo) | Interlinea | Colore light | Colore dark |
|---|---|---|---|---|---|
| `.hero h1` | 3.5rem | 400 (decl. 800) | 1.15 | `#FFFFFF` | `#FFFFFF` |
| `.hero h1 span` | eredita | 400 | 1.15 | `#10B981` (secondary) | idem |
| `.page-hero h1` | 3rem | 400 (decl. 800) | — | `#FFFFFF` | idem |
| `.section-title` | 2rem | 400 (decl. 800) | — | `#374151` | `#F8FAFC` |
| `.section-subtitle` | 1.05rem | regular | 1.6 | `#4B5563` | `#CBD5E1` |
| `.certifications h2` | 2rem | 400 (decl. 800) | — | `#374151` | `#F8FAFC` |
| `.service-card h3` | 1.2rem | 700→400 | — | `#374151` | `#F8FAFC` |
| `.service-kind-card h3` | 1.2rem | 700→400 | — | `#374151` | `#f1f5f9` |
| `.category-card h3` | 1.25rem | 700→400 | — | `#374151` | `#F8FAFC` |
| `.course-overlay h3` | 1.25rem | 700→400 | 1.3 | `#FFFFFF` | idem |
| `.premium-card-title` | 1.5rem | 700→400 | 1.3 | `#FFFFFF` | idem |
| `.elearning h2` | 2rem | 400 (decl. 800) | — | `#374151` | `#F8FAFC` |
| `.mega-col-info h3` | 22px | 700→400 | — | `#0F172A` | `#FFFFFF` |
| `body` (paragrafo base) | 1rem | 400 | 1.6 | `#374151` | `#F8FAFC` |
| `.hero p` | 1.2rem | 400 | 1.7 | `rgba(255,255,255,0.85)` | idem |
| `.page-hero p` | 1.15rem | 400 | — | `rgba(255,255,255,0.8)` | idem |
| `.service-card p` | 0.95rem | 400 | 1.6 | `#4B5563` | `#CBD5E1` |
| `.category-card p` | 0.95rem | 400 | 1.6 | `#4B5563` | `#CBD5E1` |
| `.elearning p` | 1.1rem | 400 | 1.7 | `#4B5563` | `#CBD5E1` |
| `.accordion-content p` | 0.9rem | 400 | 1.7 | `#4B5563` | `#CBD5E1` |
| `.mega-col-info p` | 14px | 400 | 1.6 | `#64748B` | `#9CA3AF` |
| `.about-tab-list li` | 1.05rem | 400 | 1.7 | `#4B5563` | `#CBD5E1` |

### Heading e testo — utility Tailwind (pagine)
| Elemento | Classi | Light | Dark |
|---|---|---|---|
| Titolo sezione (H2) | `text-3xl md:text-4xl font-extrabold` (→400 su Viga) | `text-slate-900` | `dark:text-white` |
| Sottotitolo sezione | `text-lg` | `text-slate-500` | `dark:text-gray-300` |
| Card title H3 (corsi) | `text-base`/`text-xl`/`text-2xl font-bold` | `text-slate-900` | `dark:text-white` |
| Paragrafo card | `text-sm leading-relaxed` | `text-slate-600` / `text-slate-500` | `dark:text-gray-300` |
| Meta/data | `text-xs font-medium` | `text-slate-400` | `dark:text-gray-500` |
| Testo muted | `text-xs`/`text-sm` | `text-slate-400` / `text-gray-400` | `dark:text-gray-400` |

### Badge / Label
| Tipo | Stile | Colore testo | Sfondo |
|---|---|---|---|
| `.hero-badge` / `.page-hero-badge` | 0.85rem, weight 600, pill 50px, blur | `#FFFFFF` | `rgba(255,255,255,0.12)` + bordo `rgba(255,255,255,0.15)` |
| `.about-label` / `.services-kindergarten-label` | 0.85rem, weight 700, uppercase, letter-spacing 0.05em | `#008C95` (primary) | `rgba(0,140,149,0.1)` |
| Badge "I nostri corsi"/"News" (Tailwind) | `text-xs font-bold uppercase tracking-widest`, pill | `text-[#008C95]` / dark `text-[#10B981]` | `bg-[#008C95]/10` / dark `bg-[#008C95]/20` |
| Badge categoria card (inline) | 0.68rem, weight 800, uppercase, letter-spacing 0.07em, pill 999px | colore dinamico (`badgeColor`) | `${badgeColor}18` (12% alpha) |
| `.course-badge` | 0.7rem, weight 700, uppercase, pill 50px | `#FFFFFF` | `var(--primary)` `#17c9b2` |
| `.premium-card-badge` | 0.7rem, weight 700, uppercase, blur | `#FFFFFF` | `rgba(0,140,149,0.95)` |
| `.category-count` | 0.8rem, weight 700, uppercase, pill | `#006B73` (hover `#0F172A`) | `#E0F7F6` (hover `#17c9b2`) |
| Badge "Obbligatorio"/"FSE+"/"Professionale" | 0.63rem, weight 800, uppercase, pill 999px | `#008C95` | `rgba(0,140,149,0.08)` |
| `.badge-count` | 0.8rem, weight 600, pill | `#4B5563` / dark `#9ca3af` | `#F1F5F9` / dark `#374151` |
| Hero badge formazione (`.hero-badge` inline pagine) | 0.7rem, weight 800, uppercase, letter-spacing 0.1em | `#6EE7B7` | bordo `rgba(16,185,129,0.25)`, bg `rgba(16,185,129,0.12)` |

### Link
| Tipo | Stile | Light | Dark / hover |
|---|---|---|---|
| Base `a` | `text-decoration:none; color:inherit` | eredita | — |
| Navbar `.navbar a` | 0.9rem, weight 500, letter-spacing 0.02em, underline animato | `rgba(255,255,255,0.85)` | hover `#FFFFFF`; scrolled `#0F172A`→hover `#008C95` |
| `.accordion-link` / `.service-kind-link` | 0.85–0.9rem, weight 600/700 | `#17c9b2` | hover `#0fa891`, gap aumenta |
| Link "Vedi tutte le notizie" (Tailwind) | `text-sm font-semibold` | `text-[#008C95]` | `dark:text-[#10B981]`, hover `#006B73`/`#059669` |
| `.footer-col a` | 0.95rem | `#D1D5DB` | hover `#10B981` |
| `.sub-dropdown-menu a` | 14px | `#374151` | dark `#9CA3AF`; hover `#006B73`/`#FFFFFF` su `rgba(0,140,149,0.08)` |
| `.mega-calendar-btn` | 15px, weight 600, pill 9999px | testo `#fff` su `#008C95` | hover `#006B73` |

---

## 2. Bottoni

| Bottone | Sfondo | Testo | Padding | Radius | Hover |
|---|---|---|---|---|---|
| `.cta-nav-btn` (Piattaforma) | `#17c9b2` | `#0F172A`, weight 700, 0.85rem | 0.55rem 1.5rem | 50px | bg `#0fa891`, `translateY(-1px)`, shadow turchese |
| `.hero-btn-primary` | `#17c9b2` | `#0F172A`, weight 700 | 0.9rem 2.25rem | 9999px | bg `#0fa891`, `translateY(-3px)`, shadow |
| `.hero-btn-outline` | `rgba(255,255,255,0.1)` + blur | `#FFFFFF`, weight 700 | 0.9rem 2.25rem | 9999px | bg `rgba(255,255,255,0.2)`, bordo più chiaro, `translateY(-3px)` |
| `.search-cta` | `#17c9b2` | `#0F172A`, weight 700, 0.9rem | 0.75rem 1rem | `--radius-sm` (8px) | bg `#0fa891`, `translateY(-2px)`, shadow |
| `.form-submit-btn` | `#17c9b2` | `#0F172A`, weight 700, 1rem | 0.85rem | 9999px | bg `#0fa891`, `translateY(-2px)`, shadow |
| `.course-btn` | `#17c9b2` | `#0F172A`, weight 600, 0.85rem | 0.6rem 1.25rem | 9999px | bg `#0fa891`, `translateY(-2px)` |
| `.cta-btn` / `.premium-card-btn` | `#17c9b2` | `#0F172A`, weight 700/600 | 0.85rem 2rem / 0.65rem 1.25rem | 9999px | bg `#0fa891`, `translateY(-2px)` |
| Hero CTA primario (Tailwind) | `bg-[#008C95]` | `text-white font-bold` | `px-8 py-4` | `rounded-full` | `bg-[#006B73]`, `shadow-xl`, `-translate-y-0.5` |
| Hero CTA outline (Tailwind) | `bg-white/10` + blur, bordo `border-white/30` | `text-white font-bold` | `px-8 py-4` | `rounded-full` | `bg-white/20`, bordo `border-white/50` |
| Bottone "Cerca" (HeroSearch) | `bg-[#008C95]` / dark `bg-[#10B981]` | `text-white font-bold` | `px-8 py-2.5` | `rounded-full` | `bg-[#006B73]` / dark `bg-[#059669]` |
| Opzione dropdown HeroSearch | trasparente / selez. `bg-[#008C95]/10` | `text-gray-700` / dark `text-gray-200`; selez. `#008C95`/`#10B981` | `px-4 py-2.5` | `rounded-xl` | `hover:bg-gray-100` / dark `hover:bg-white/5` |
| Carrello — "Procedi all'ordine" | gradient `90deg, #008C95, #10B981` | `#fff` weight 700 | 0.85rem | 9999px | — |
| Carrello — "Svuota carrello" | trasparente, bordo `gray-200`/dark `gray-600` | `gray-600`/dark `gray-300` | 0.75rem | 9999px | — |
| Carrello — controlli qty `+/−` | `bg-slate-50`/dark `bg-dark-card`, bordo | `slate-700`/dark `gray-200` | 26×26px | 9999px | — |
| Chatbot — toggle FAB | gradient `135deg, #008C95,#10B981` (dark `#10B981,#34D399`) | icona `#fff` | 56×56px | 50% | `scale(1.08)`, shadow brand |
| Chatbot — chip FAQ | `#fff`/dark `#374151`; hover `#F0FDFA`/dark `#1e3a3a` | `#0F172A`/dark `#E2E8F0`; hover `#10B981` | 0.6rem 1rem | 999px | bordo `#10B981` |
| `.mega-calendar-btn` | `#008C95` | `#fff` weight 600 | 12px 22px | 9999px | `#006B73` |
| Theme toggle / Cart (header) | trasparente | icona `#0F172A` (scrolled) / `#FFFFFF` | 40px / 0.5rem | 50% | `translateY(-2px)`, shadow |

---

## 3. Palette colori

### Brand / Primari
| Hex | Nome | Uso |
|---|---|---|
| `#008C95` | Brand turchese | Colore principale, accenti, link, badge, bottoni (Tailwind), invariato light/dark |
| `#006B73` | Turchese scuro | Hover di `#008C95`, testo accessibile su sfondo chiaro (5.2:1) |
| `#17c9b2` | Primary (`--primary`) | Bottoni CTA pillola, accenti CSS |
| `#0fa891` | Primary hover (`--primary-hover`) | Hover bottoni `#17c9b2` |
| `#10B981` | Secondary / verde | Accento dark mode, gradient, "Gratuito", `hero h1 span` |
| `#059669` | Verde scuro | Hover verde in dark mode |
| `#34d399` / `#34D399` | Verde brillante | `.number-value`, gradient FAB chatbot dark |
| `#5EEAD4` | Teal chiaro | Stato attivo tab/label in dark (4.6:1) |
| `#6EE7B7` | Verde menta | Testo hero-badge pagine formazione |
| `#E0F7F6` | Teal pastello | Sfondo `.category-count` |
| `#F0FDFA` | Teal-50 | Hover chip chatbot (light) |

### Neutri (CSS variables)
| Hex | Variabile | Uso |
|---|---|---|
| `#FFFFFF` | `--white` | Sfondo base light, testo su scuro |
| `#F8FAFC` | `--bg-light` / `--text-light` | Sfondo sezioni chiare, testo su dark |
| `#F1F5F9` | `--gray-100` | Sfondi tenui, badge |
| `#E2E8F0` | `--gray-200` | Bordi light, separatori |
| `#CBD5E1` | `--gray-300` / `--text-muted-dark` | Testo secondario in dark (7:1) |
| `#9ca3af`/`#9CA3AF` | `--gray-400` / `--text-placeholder-dark` | Testo muted / placeholder dark |
| `#6b7280`/`#6B7280` | `--gray-500` / `--text-placeholder` | Placeholder light (4.6:1) |
| `#4b5563`/`#4B5563` | `--gray-600` / `--text-muted` | Testo secondario light (5.9:1) |
| `#374151` | `--gray-700` / `--text-dark` | Testo primario light (7:1), footer bg |
| `#1F2937` | `--gray-800` | Token legacy (non più usato per le card) |
| `#003134` | `--gray-900` / `--bg-dark` | **Sfondo pagina dark (verde brand scuro)** |

### Dark mode (brand)
| Hex / valore | Variabile | Uso |
|---|---|---|
| `#003134` | `--bg-dark` | Sfondo pagina/sezioni in dark (`dark:bg-dark-bg`) |
| `#004d52` | `--bg-card-dark` | Sfondo card/pannelli/dropdown in dark (`dark:bg-dark-card`) |
| `rgba(255,255,255,0.08)` | `--border-dark` | Bordi e separatori in dark (`dark:border-[rgba(255,255,255,0.08)]`) |
| `#374151` | — | Sfondo input in dark (`dark:bg-gray-700`) |
| `#4B5563` | — | Bordi input/elementi in dark (`dark:border-gray-600`) |

### Accenti / categorie / stati
| Hex | Nome | Uso |
|---|---|---|
| `#0F172A` | Slate-900 / navy | Testo su bottoni chiari, gradient hero, icone header light, prezzi (legacy) |
| `#0a4f54` | Teal scuro | Tappa intermedia gradient hero |
| `#134E4A` | Teal profondo | Gradient sezioni scure (news/CTA) |
| `#1E293B` | `--topbar-bg` | Topbar (token) |
| `#1e3a3a` | — | Hover chip chatbot in dark |
| `#2D3748` | — | `.accordion-title` |
| `#334155` | Slate-700 | Testo risposte chatbot (light) |
| `#64748B` | Slate-500 | Testo mega-menu / chatbot muted (light) |
| `#94A3B8` | Slate-400 | Testo footer chatbot |
| `#D1D5DB` | Gray-300 | Testo footer sito (5.8:1) |
| `#F3F4F6` | Gray-100 | Bordo item carrello |
| `#F59E0B` | Amber | Badge "Obbligatorio per legge", `.premium-card-status` |
| `#6366F1` | Indigo | Badge "Certificazioni internazionali" |
| `#EF4444` | Red | Pallino notifica chatbot |
| `#888888` | Grigio | Icona toggle sub-dropdown (light) |
| `#eaeaea` / `#eeeeee` | Grigi tenui | Bordi mega-menu (light) |

---

## 4. Card & Layout

| Card | Sfondo light | Sfondo dark | Bordo | Radius | Padding | Hover |
|---|---|---|---|---|---|---|
| `.service-card` | `#FFFFFF` (+overlay blur) | `#004d52` | — | `--radius-md` (14px) | 40px 30px | `translateY(-6px)`, `--shadow-lg`; overlay→`rgba(0,140,149,0.05)` |
| `.service-kind-card` | `#FFFFFF` | `#004d52` | `rgba(0,0,0,0.04)` / dark `--border-dark` | `--radius-md` | 2.5rem 2rem | `translateY(-6px)`, shadow, bordo turchese |
| `.category-card` | `#FFFFFF` (+overlay blur) | `#004d52` | — | `--radius-md` | 2.5rem 2rem | `translateY(-8px)`, shadow turchese; min-height 280px |
| `.course-card` | `#FFFFFF` | `#004d52` | — | `--radius-md` | 0 (immagine + overlay) | `translateY(-8px)`, `--shadow-lg` |
| `.premium-course-card` | immagine + overlay gradiente | idem | — | `--radius-md` | 1.75rem (contenuto) | `translateY(-8px)`, `--shadow-lg`, immagine `scale(1.06)` |
| `.accordion-item` | `#FFFFFF` | `#004d52` | `--gray-200` / dark `--border-dark` | `--radius-sm` (8px) | 1.1rem 1.25rem (header) | bordo `--primary`, shadow turchese |
| CourseCard formazione (Tailwind) | `bg-white` | `dark:bg-dark-card` | `border-slate-200` / `dark:border-[rgba(255,255,255,0.08)]` | 1.25rem | 1.5rem | `translateY(-4px)`, shadow, accent-bar gradient top |
| CategoriaCard home (Tailwind) | `bg-white` | `dark:bg-dark-card` | `border-slate-200`/`dark:border-[…0.08]` | `rounded-3xl` (1.5rem) | `p-8` | `translateY(-4px)`, shadow |
| CertCard (chi-siamo) | `bg-white` | `dark:bg-dark-card` | `border-slate-200`/dark `0.08` | `rounded-2xl` | `p-6` | `-translate-y-1`, `shadow-lg`, bordo `teal-500`/`#10B981` |
| News card (home/index) | `bg-white` | `dark:bg-dark-card` | `border-slate-100`/dark `0.08` | `rounded-2xl` | `p-5`–`p-10` | `shadow-xl`, immagine `scale-105`, titolo→turchese |
| Info card (contatti) | `bg-white` | `dark:bg-dark-card` | `border-slate-200`/dark `0.08` | (CSS dedicato) | — | — |
| Drawer carrello | `bg-white` | `dark:bg-dark-card` | bordo top/bottom `0.08` | 0 | 1.5rem | slide-in `translateX` |
| Finestra chatbot | `#fff` | `#004d52` | — | 1.25rem | — | scale + fade |
| Bolla domanda chat | `#008C95` / dark `#10B981` | — | — | `1rem 1rem 0.25rem 1rem` | 0.65rem 1rem | — |
| Bolla risposta chat | `#fff` / dark `#374151` | — | `#E2E8F0` / dark `#4B5563` | `1rem 1rem 1rem 0.25rem` | 0.75rem 1rem | — |
| `.cta-dropdown-menu` | `#FFFFFF` | `#004d52` | — | 0.75rem | 0.5rem | shadow `0 10px 40px` |
| `.mega-menu-dropdown` | `#FFFFFF` | `#004d52` | top `#eeeeee` / dark `--border-dark` | 0 (full-width) | 40px 0 | — |

---

## 5. Spaziature & Sezioni

### Padding verticale sezioni
| Sezione | Padding |
|---|---|
| `.hero` | `8rem 0 6rem` |
| `.page-hero` | `12rem 0 6rem` |
| `.services`, `.categories-section`, `.featured`, `.courses-premium-section`, `.elearning` | `5rem 0` |
| `.services-kindergarten` | `6rem 0` |
| `.numbers-section` | `3rem 0` |
| `.certifications` | `padding-top: 5rem` |
| `footer` | `4rem 0 2rem` (mobile `2rem 0 1rem`) |
| Sezioni Tailwind | `py-16 md:py-24` |
| Sezioni inline pagine | `padding: 4rem 0` / `5rem 0` |

### Larghezze massime
| Contesto | Valore |
|---|---|
| `.container` | `width: 90%; max-width: 1200px` |
| Wrapper Tailwind | `max-w-7xl` (80rem) `mx-auto px-4 sm:px-6 lg:px-8` |
| `.hero h1` | 800px · `.hero p` 650px · `.hero-search-wrapper` 600px |
| `.section-subtitle` | 600px · `.services-kindergarten-subtitle` 600px |
| `.elearning-content` | 700px · `.page-hero p` 550px |
| `.mega-menu-container` | 1200px |
| HeroSearch | `max-w-2xl` · sottotitoli `max-w-xl` |
| Drawer carrello | 400px (max 95vw) · Chatbot 360px (max calc(100vw-2rem)) |
| Modale CertCard | `max-w-lg w-[90%] max-h-[85vh]` |

### Gap griglie
| Griglia | Gap | Colonne |
|---|---|---|
| `.services-grid` / `.categories-grid` | 2rem | `auto-fit minmax(280px,1fr)` |
| `.courses-grid` | 2.5rem | `auto-fit minmax(320px,1fr)` |
| `.services-kindergarten-grid` | 2rem | `auto-fit minmax(280px,1fr)` |
| `.numbers-grid` | 0 | `auto-fit minmax(200px,1fr)` |
| `.footer-grid` | 3rem | `auto-fit minmax(250px,1fr)` |
| `.about-highlights` | 1.5rem | 3 col → 2 (≤992px) → 1 (≤640px) |
| `.courses-premium-track` | 1.5rem | slider orizzontale (card 360px) |
| `.mega-menu-container` | 40px | 4 col → 1 (≤992px) |
| `.courses-grid` formazione | 1.5rem | 3 → 2 (≤1024px) → 1 (≤600px) |
| Griglie Tailwind | `gap-6` / `gap-4` / `gap-2` | `grid-cols-1 sm:grid-cols-3` ecc. |

---

## 6. Animazioni & Transizioni

| Elemento | Proprietà animate | Durata / easing |
|---|---|---|
| `html` scroll | `scroll-behavior: smooth` + Lenis (smooth scroll JS) | — |
| `body`, sezioni | `background-color`, `color` | 0.3s ease (switch tema) |
| `.site-header` | `background`, `box-shadow`, `color` | 0.3s ease |
| `.navbar a::after` (underline) | `width` 0→100% | 0.3s ease |
| Bottoni CTA (hover) | `transform translateY`, `box-shadow`, `background` | 0.3s ease (Tailwind `duration-200`) |
| `.theme-toggle` (hover) | `transform`, `box-shadow` | 0.3s ease |
| Card (hover) | `transform translateY(-4…-8px)`, `box-shadow` | 0.3s ease / `cubic-bezier(0.4,0,0.2,1)` |
| `.service-card::before` overlay | `background`, `backdrop-filter` blur 8px→0 | 0.3s ease |
| `.service-icon-circle` / `.category-icon-wrapper` | `background`, `color`, `transform scale(1.1)` (+rotate 5deg) | 0.3s ease |
| Immagine card news/corso | `transform scale(1.05–1.08)` | 0.3s / 0.5s ease |
| `.accordion-panel` | `max-height` 0→800px | 0.35s ease |
| `.accordion-icon` | `transform rotate(45deg)` | 0.3s ease |
| `.sub-dropdown-menu` | `max-height` 0→400px | 0.05s ease-out |
| HeroSearch dropdown | `opacity` + `translateY(-2px→0)` (fade+slide), `transition-all` | `duration-200 ease-out` |
| HeroSearch chevron | `transform rotate(180deg)` | `duration-300` |
| CertCard modal | fade-in overlay + `backdrop-blur` | — |
| Drawer carrello | `transform translateX(100%→0)` | 0.3s ease |
| Chatbot finestra | `transform scale(0.85→1)` + `opacity` | 0.25s ease |
| Chatbot FAB (hover) | `transform scale(1.08)` | 0.2s ease |
| Chatbot chip | `all` (bg, bordo, colore) | 0.2s |
| Keyframe `fadeUp` (pagine formazione) | `opacity 0→1` + `translateY(18px→0)` | 0.55s ease-out (delay scaglionati .08/.18/.28s) |
| `NumberCounter` | conteggio numerico animato (JS) | — |

---

## 7. Z-index / Ordine di sovrapposizione

| z-index | Elemento | Note |
|---|---|---|
| `0` | `.hero-deco`, `.service-card::before`, `.category-card::before` | decorazioni/overlay di fondo |
| `1` | contenuto interno card (`.service-icon-circle`, testo overlay), `.premium-card-overlay` | sopra l'overlay |
| `2` | `.hero .container`, `.premium-card-content`, `.numbers-grid` | crea stacking context nell'hero |
| `3` | `.premium-card-badge` | sopra overlay/immagine |
| `10` | `.courses-premium-nav`, `.course-badge` (Tailwind `z-10`) | frecce slider, badge "In evidenza" |
| `100` | `.site-header`, `.navbar` (mobile fullscreen) | header fisso |
| `101` | `.hamburger` (CSS) | sopra il menu |
| `200` | `.cta-dropdown-menu`, `.hamburger` (inline style) | dropdown header |
| `1000` | Modale CertCard (`z-[1000]`) | overlay schede certificazioni |
| `9998` | Overlay CartDrawer | sfondo scuro del drawer |
| `9999` | `.mega-menu-dropdown`, HeroSearch (wrapper + `<ul>`), CartDrawer, Chatbot | livello massimo UI |

---

## 8. Border radius

| Valore | Variabile / classe | Contesto |
|---|---|---|
| `8px` | `--radius-sm` | input, accordion-item, search-cta |
| `14px` | `--radius-md` | service/category/course/premium card |
| `20px` | `--radius-lg` | (token disponibile) |
| `4px` | inline | toggle/voci mega-menu (hover area) |
| `12px` | inline | box icona card formazione, theme-toggle icon |
| `0.5rem` (`rounded-lg`) | Tailwind/inline | input checkout, icone, immagini piccole |
| `0.75rem` (`rounded-xl`) | Tailwind | opzioni dropdown, chip, pannelli interni, `.cta-dropdown-menu` |
| `1rem` (`rounded-2xl`) | Tailwind/inline | card moderne, modale, drawer header, finestra chatbot (1.25rem) |
| `1.25rem` | inline | CourseCard formazione, finestra chatbot |
| `1.5rem` (`rounded-3xl`) | Tailwind | CategoriaCard home |
| `50px` | CSS | badge/label pill (hero-badge, about-label, course-badge) |
| `999px` | inline | badge categorie, chip chatbot, mini-badge |
| `9999px` (`rounded-full`) | CSS/Tailwind | bottoni CTA, barra ricerca capsula, controlli qty, badge contatori |
| `50%` | CSS/inline | cerchi (icone servizi, FAB chatbot, theme-toggle, avatar) |
| `1rem 1rem 0.25rem 1rem` | inline | bolla domanda chat (asimmetrica) |
| `1rem 1rem 1rem 0.25rem` | inline | bolla risposta chat (asimmetrica) |
| `3px 3px 0 0` | CSS | indicatore tab attivo `.about-tab-btn` |

---

## 9. Ombre (shadow tokens)

| Variabile | Valore | Uso |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.06)` | card a riposo, slider |
| `--shadow-md` | `0 4px 20px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.05)` | service/course card |
| `--shadow-lg` | `0 20px 50px rgba(0,0,0,0.10), 0 0 1px rgba(0,0,0,0.05)` | hover card |
| Tailwind | `shadow-sm` / `shadow-lg` / `shadow-xl` / `shadow-2xl` | card moderne, modali |
| Inline drawer | `-4px 0 24px rgba(0,0,0,0.12)` | CartDrawer |
| Inline chatbot | `0 20px 60px rgba(0,0,0,0.18)` (dark `0.4`) | finestra; FAB `0 4px 20px rgba(0,140,149,0.45)` |
| Hover brand | `0 4–12px rgba(23,201,178,0.3–0.4)` / `rgba(0,140,149,*)` | bottoni e card al hover |

---

## 10. Note di accessibilità (WCAG)

- Testo normale ≥ **4.5:1**, testo grande ≥ **3:1**.
- Colori testo commentati nel CSS con il rapporto di contrasto (es. `#374151` 7:1 su bianco, `#F8FAFC` 14:1 su `#003134`).
- `#006B73` usato al posto del turchese puro su sfondi chiari per garantire 5.2:1.
- Focus visibile: `.category-card:focus-visible { outline: 3px solid var(--primary) }`, e `focus-visible:outline-[#008C95]` sulle card news.
- Dark mode: ogni `bg-white` ha la controparte `dark:bg-dark-card`, ogni `text-slate-900` ha `dark:text-white`; brand `#008C95` invariato.

---

*Documento generato per documentazione interna del design system. Per modifiche ai token, aggiornare `styles/globals.css` (CSS variables) e `tailwind.config.js` (colori `dark-bg`, `dark-card`, testi WCAG).*
