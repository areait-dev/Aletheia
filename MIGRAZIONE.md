# Migrazione Pages Router → App Router

Branch di lavoro: `migrazione-app-router` (creato da `master`). Il ramo principale del repository si chiama **`master`**, non `main`: non si fa merge né push su `master`.

## Stato

| Fase | Stato |
|---|---|
| 0 – Analisi | **fatta, in attesa di approvazione** |
| 1 – Rete di sicurezza (Playwright) | da fare |
| 2 – Struttura base `app/` | da fare |
| 3 – Pagine | da fare |
| 4 – Pulizia | da fare |
| 5 – Verifica finale | da fare |

---

## Fase 0 – Report di analisi

### 1. Versioni
- Next.js **13.4.0 esatto** (senza `^`), React e React-DOM 18.2.0, TypeScript 5.9 (progetto misto `.js` / `.ts` / `.tsx`), Node locale 24.16. Nessun campo `engines`.
- 13.4.0 è la **prima versione in cui l'App Router è stabile**: la soglia "sotto 13.4" non scatta, ma siamo sulla release più acerba. Non è Next 15: `params` e `searchParams` sono sincroni e la cache di `fetch` non è una questione, perché il progetto legge i dati con axios/cheerio e non con `fetch`. La rivalidazione passa dalle opzioni di segmento (`export const revalidate`).
- Limiti noti di 13.4.0 che toccano questo lavoro: vedi D1 e D2.

### 2. Inventario pagine (`pages/`)

| File | URL | Tipo | Dati | revalidate | `next/router` | Head |
|---|---|---|---|---|---|---|
| `index.js` | `/` | statica | getStaticProps | `isrOptions()` | no | Head + SeoHead |
| `chi-siamo.js` | `/chi-siamo` | statica | getStaticProps | `isrOptions()` | no | Head + SeoHead |
| `contatti.js` | `/contatti` | statica | getStaticProps | `isrOptions()` | no | Head + SeoHead |
| `agenzia-per-il-lavoro.js` | `/agenzia-per-il-lavoro` | statica | getStaticProps | `isrOptions()` (300 s) | no | Head + SeoHead |
| `agenzia-per-il-lavoro/servizi-alla-persona.js` | `/agenzia-per-il-lavoro/servizi-alla-persona` | statica | getStaticProps | `isrOptions()` | no | Head |
| `agenzia-per-il-lavoro/servizi-alle-imprese.js` | `/agenzia-per-il-lavoro/servizi-alle-imprese` | statica | getStaticProps | `isrOptions()` | no | Head |
| `calendario-corsi.js` | `/calendario-corsi` | statica | getStaticProps | `isrOptions()` | no | Head |
| `programma-gol.js` | `/programma-gol` | statica | getStaticProps | `isrOptions()` | no | Head |
| `privacy-cookie.js` | `/privacy-cookie` | statica | getStaticProps | `isrOptions()` | no | Head |
| `reclami-proposte.js` | `/reclami-proposte` | statica | getStaticProps | `isrOptions()` | no | Head |
| `formazione/{corsi-pa, ecm, fondi-interprofessionali, fondo-nuove-competenze, obbligatoria, professionale-specialistica, regionale, regionale-fse}.js` | `/formazione/…` (8) | statiche | getStaticProps | `isrOptions()` | no | Head |
| `formazione/avviso-1-2026-poc.js` | `/formazione/avviso-1-2026-poc` | statica | getStaticProps | `isrOptions()` | no | via `ArchivioShell` |
| `news/index.js` | `/news` | statica | getStaticProps | `isrOptions()` | no | Head |
| `news/[slug].js` | `/news/:slug` | dinamica | getStaticProps + getStaticPaths, `fallback` = `isWpEnabled() ? 'blocking' : false`; **preview mode** | `isrOptions()`, 60 s sul 404 | no | Head |
| `all-courses/index.js` | `/all-courses` (+ `?categoria=`) | statica con query | getStaticProps | `isrOptions()` | **sì** (`query`, `replace` shallow) | Head |
| `all-courses/[slug].js` | `/all-courses/:slug` (+ `?livello=`) | dinamica | getStaticProps + getStaticPaths, **`fallback: 'blocking'`** | `isrOptions()` | **sì** (`query`, `replace` shallow) | Head |
| `aiuti-di-stato/[anno].js` | `/aiuti-di-stato/:anno` | dinamica | getStaticProps + getStaticPaths, `fallback` = `isWpEnabled()` | `isrOptions()`, 60 s sul 404 | no | Head |
| `archivio/index.js` | `/archivio` | statica | getStaticProps | `isrOptions()` | no | via `ArchivioShell` |
| `archivio/[...slug].js` | `/archivio/*` | catch-all | getStaticProps + getStaticPaths, `fallback` = `isWpEnabled()` | `isrOptions()` | no | via `ArchivioShell` |

- Nessuna pagina usa `getServerSideProps`. Non esistono `pages/404.js` né `pages/500.js`: oggi vale la pagina 404 predefinita di Next.
- `isrOptions()` (`lib/wp.ts`) restituisce `{ revalidate: 300 }` **solo se `WP_URL` è impostato**, altrimenti nulla (pagine puramente statiche).

### 3. Struttura globale (`_app.js` + `_document.js`)
- **`_document`**: `<Html lang="it">`. Nel `<head>`: preconnect a fonts.googleapis.com, fonts.gstatic.com e cdnjs.cloudflare.com; foglio Google Fonts (Nunito + Viga, `display=swap`); Font Awesome 6.4.0 con `integrity`. Nessun attributo su `<body>`.
- **`_app`**: CSS globali (`styles/globals.css`, poi `lenis/dist/lenis.css`); `ThemeProvider`; `SiteOptionsProvider`; wrapper `<div style="--font-viga …; display: contents">`; `Chatbot` con `dynamic(..., { ssr: false })`; `CookieConsent`; `initLenis()` / `destroyLenis()` in `useEffect`; script inline anti-flash del tema (legge `localStorage`) **nel body**; JSON-LD `Organization` globale; `<meta google-site-verification>`, `<meta robots noindex>` (da `pagina.seo.noindex`) e `<meta description>` predefinita, tutti letti da `pageProps` (`siteOptions`, `pagina`).
- Nessun analytics, nessun `next/script`, nessun `next/font`.

### 4. Route API (`pages/api/`) – restano dove sono
`chatbot-ai.js` (Gemini), `chatbot-unanswered.js` (log domande), `preview.js` e `exit-preview.js` (preview mode di WordPress), `revalidate.js` (webhook WordPress → `res.revalidate`).

### 5. Configurazione
- `next.config.js`: `reactStrictMode`, `env.NEXT_PUBLIC_WP_ORIGIN`, `images.domains` (aletheiasrl.it, unsplash, pexels, host di `WP_URL`) e **`redirects()`**: circa 51 redirect 301 generati dal catalogo (`/all-courses/<variante>` → `/all-courses/<famiglia>?livello=N`), 2 per gli aiuti di Stato, 1 per l'archivio. Nessun rewrite, header, `basePath`, `trailingSlash`, middleware.
- **`i18n`: assente** → nessun blocco.
- Variabili d'ambiente: `WP_URL`, `WP_SHARED_SECRET`, `NEXT_PUBLIC_WP_ORIGIN`, `GEMINI_API_KEY`. Senza `WP_URL` il sito è interamente statico e usa i dati locali.
- Esiste già una cartella `app/` alla radice, **vuota**.

### 6. SEO
- Per pagina: `<Head>` con `<title>` e, nella maggior parte dei casi, `SeoHead` (description, canonical, Open Graph, Twitter; `SITE_URL = https://www.aletheiasrl.it`). Le pagine dell'archivio ricevono i meta da `ArchivioShell`.
- Globali (da `_app`): JSON-LD Organization, verifica Google, noindex condizionale, description predefinita.
- `public/robots.txt` statico (`Disallow: /checkout`, `/carrello`); **nessuna sitemap**; favicon `public/favicon.png`; nessun manifest.

### 7. WordPress headless
- Lettura REST in `lib/wp*.ts` (news, calendario, corsi, aiuti, archivio, pagine, partner, schede, sedi, faq, opzioni del sito) con ripiego sui dati locali se `WP_URL` è vuoto. Cache: ISR di pagina via `isrOptions()` + invalidazione on-demand con `/api/revalidate`. Anteprima: `pages/api/preview` + preview mode nelle sole news (`getNewsArticle(slug, { preview, previewData })`), con anteprima live in `lib/live-preview.ts`.

### 8. Componenti a rischio (→ `"use client"`)
- Hook / API del browser: `Header`, `Chatbot` (usa `router.pathname`), `CookieConsent`, `EnrollmentProgress`, `FormAzienda`, `FormCandidato`, `HeroParallax`, `JobOfferCard`, `NumberCounter`, `Reveal`, `ThemeToggle`, `context/ThemeContext`, `lib/live-preview`, `lib/lenis`.
- **Pagine intere**: quasi tutte usano `useState` / `useEffect` / framer-motion o **`<style jsx>` (21 file)** → vanno marcate `"use client"` per intero; styled-jsx non funziona nei Server Component.
- `next/router` in 3 file: `all-courses/index.js`, `all-courses/[slug].js`, `components/Chatbot.tsx`.

### 9. Elenco URL (circa 82 + 404)
- **Statiche (22)**: `/`, `/chi-siamo`, `/contatti`, `/calendario-corsi`, `/programma-gol`, `/privacy-cookie`, `/reclami-proposte`, `/news`, `/all-courses`, `/archivio`, `/agenzia-per-il-lavoro`, `/agenzia-per-il-lavoro/servizi-alla-persona`, `/agenzia-per-il-lavoro/servizi-alle-imprese`, e le 9 sotto `/formazione/` (corsi-pa, ecm, fondi-interprofessionali, fondo-nuove-competenze, obbligatoria, professionale-specialistica, regionale, regionale-fse, avviso-1-2026-poc).
- **`/all-courses/:slug`**: 39 famiglie (da 90 varianti grezze); le altre 51 varianti sono redirect 301.
- **`/news/:slug`**: 15 articoli locali.
- **`/aiuti-di-stato/:anno`**: 2023 e 2024 (più i redirect da `/aiuti-di-stato-2023` e `-2024`).
- **`/archivio/*`**: 2 famiglie + le voci locali `avviso-7-2023` e `avviso-20-2024-fse` (`avviso-1-2026-poc` è un redirect verso `/formazione/…`).
- **Varianti con query**: `/all-courses?categoria=<chiave>` (menu) e `/all-courses/:slug?livello=N` (redirect e selettore dei livelli).
- Da aggiungere ai test: pagina 404 (`/url-inesistente`), alcuni redirect, `/robots.txt`.
- La lista definitiva la genera lo script della Fase 1, dalle stesse fonti dei `getStaticPaths`.

### 10. Piano (dalla pagina più semplice alla più complessa)
1. `/reclami-proposte` (pilota: semplice, poco stato).
2. `/privacy-cookie`, `/programma-gol`, `/contatti`, `/chi-siamo`.
3. Le 9 pagine `formazione/*` e le 2 `agenzia-per-il-lavoro/servizi-*` (stesso schema: `HeroTitle`, `CtaFinale`, `<style jsx>`).
4. `/calendario-corsi`, **identica a oggi** (nota finale della richiesta).
5. `/news`, `/news/[slug]` (preview mode → D2), `/aiuti-di-stato/[anno]`, `/archivio` e `/archivio/[...slug]`.
6. `/agenzia-per-il-lavoro` e la **home** (la più pesante: parallasse, marquee, ticker, contatori).
7. `/all-courses` e `/all-courses/[slug]` per ultime (query string, `router.replace` shallow, `fallback: 'blocking'`, 39 famiglie + redirect).
8. `app/not-found.tsx` e `app/error.tsx`; poi Fase 4.

### Rischi
- **R1 – `revalidate` condizionale.** Oggi `isrOptions()` decide a runtime (con o senza WordPress). In `app/`, `export const revalidate` e `dynamicParams` devono essere **letterali statici**: non si può scrivere `isWpEnabled() ? 300 : false`.
- **R2 – styled-jsx.** 21 file; funziona solo in componenti client e richiede il registry di styled-jsx, altrimenti gli stili mancano nell'HTML pre-renderizzato (flash non stilato).
- **R3 – Query string e pre-render.** `useSearchParams` in una pagina statica fa tornare il rendering lato client fino al `<Suspense>` più vicino: se la pagina è tutta client e senza Suspense, l'**HTML pre-renderizzato può svuotarsi** (SEO e un solo H1 nell'HTML). Va confrontato l'HTML di `/all-courses` e `/all-courses/:slug` con quello attuale.
- **R4 – Head.** `next/head` e `SeoHead` come figlio non esistono in `app/`: i meta passano a `metadata` / `generateMetadata` e devono reggere i dati che oggi arrivano dalle props (`pagina.seo`, `siteOptions`). JSON-LD e noindex per pagina vanno resi nel body o nei metadata.
- **R5 – 404 predefinita.** Oggi è quella di default di Next. `app/not-found.tsx` deve riprodurla (stesso testo e stessi stili) o l'aspetto cambia.
- **R6 – Tema.** Lo script anti-flash è nel body di `_app`: in `app/` va nel layout nello stesso punto, senza warning di idratazione su `<html class>`.
- **R7 – Ordine CSS.** `globals.css`, poi `lenis.css`, poi i `<style jsx>` per pagina: l'ordine di cascata nell'output può cambiare.
- **R8 – Playwright.** Nel progetto c'è solo `playwright-core` (devDependency) e i browser Chromium in `ms-playwright`; manca `@playwright/test`. Si risolve nella Fase 1.

### Decisioni da prendere
- **D1 – Versione di Next.** 13.4.0 è la prima release stabile dell'App Router, con bug noti sulle prime versioni. La regola 3 vieta di aggiornare senza tua conferma. Proposta: portare **solo Next** a 13.5.x (stesso major, stesso React 18.2) prima di iniziare; alternativa: restare a 13.4.0 accettando i rischi.
- **D2 – Preview delle news.** Il preview mode di Pages Router (`res.setPreviewData`) non è leggibile dalle pagine di `app/` in 13.4.0 (servirebbe `draftMode`, arrivato dopo). Opzioni: (a) lasciare `news/[slug]` in `pages/` fino alla fine (convivenza ammessa, mai lo stesso percorso in entrambe); (b) migrarla a `draftMode` dopo l'aggiornamento di D1.
- **D3 – `revalidate` condizionale.** (a) `revalidate = 300` sempre: senza WordPress le pagine si rigenerano ogni 5 minuti restituendo lo stesso HTML; (b) un letterale scelto da una variabile d'ambiente di build. Raccomandato (a): per i visitatori è identico.
- **D4 – `fallback` dinamico.** `dynamicParams` va statico. Con `isWpEnabled() ? 'blocking' : false` si imposta `true` e, se lo slug non esiste, `notFound()` dà 404 come oggi.
- **D5 – Pagine client.** Confermi che le pagine con hook o `<style jsx>` diventano `"use client"` per intero (un `page.tsx` server con `generateMetadata` e dati, che renderizza un componente client con gli stessi props)? È l'unica via senza toccare il markup.
- **D6 – Ramo principale.** Il repository usa `master`: la regola "mai su main" si applica a `master`.
- **D7 – File non committati.** `pages/formazione/avviso-1-2026-poc.js` risulta modificato solo nei fine riga; script `verify-*.mjs` e cartelle di immagini sono non tracciati. Restano fuori dai commit di migrazione.

## Da valutare dopo
- `CLAUDE.md` dice "Next.js 13" e "nessun testing framework": da aggiornare a migrazione finita.
- Nessuna sitemap né manifest.
- `SITE_URL` punta a `www.aletheiasrl.it`, il sito di prova è `aletheiasrl.vercel.app`: i canonical dell'anteprima puntano a un dominio diverso (comportamento attuale, non toccato).
- `images.domains` è deprecato a favore di `remotePatterns`.
- `components/CourseHero.tsx` non è usato da nessuna pagina.
- `iside-bold.svg` e `promesys-rebranding.png` non sono più referenziati.
