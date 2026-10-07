# Backend headless WordPress + ACF (gratuito) per Alètheia

Plugin: `wordpress/aletheia-headless/` (da copiare in `wp-content/plugins/`). Richiede solo **Advanced Custom Fields FREE** (WP Engine): campi semplici, **nessun repeater, blocco o Options Page**. Stesso modello usato per PromoSan.

Obiettivo: ogni contenuto del sito modificabile da WordPress, con **anteprima live nell'editor** e **pubblicazione istantanea** sul frontend Next.

## 1. Architettura

```
WordPress (editor)                         Next.js (frontend)
┌──────────────────────────┐   postMessage  ┌──────────────────────────┐
│ Form ACF / editor        │ ─────────────▶ │ iframe /…?live=1         │
│  + pannello "Anteprima"  │ ◀───────────── │ (Preview Mode + listener)│
└───────────┬──────────────┘     ready      └──────────▲───────────────┘
            │ POST /aletheia/v1/preview-fields         │ fetch REST (ISR)
            ▼ (formatta i valori non salvati)          │
   /wp/v2/<tipo> (con "acf") + /aletheia/v1/{page,routes,options} ─┘
            │ al salvataggio: POST /api/revalidate (x-aletheia-secret)
            └──────────────────────────────────────────▶ ISR on-demand
```

- **Live (non salvato):** `assets/live-preview.js` legge i valori del form ACF, titolo e contenuto (Gutenberg o classico), li fa formattare a `/preview-fields` e li invia all'iframe via `postMessage`. Debounce 300 ms.
- **Pubblicato:** `inc/revalidate.php` chiama `/api/revalidate` con i percorsi toccati (`scope: all` per opzioni, FAQ e partner).
- **Bozze:** il pulsante "Anteprima" di WP e l'iframe usano un token HMAC a scadenza (`post_id|exp`, firmato col secret condiviso). Il secret non arriva mai al browser.

## 2. Installazione

1. Attiva **Advanced Custom Fields** (free) e copia/attiva il plugin `aletheia-headless`. All'attivazione crea la pagina **Opzioni Globali** (slug `opzioni-globali`).
2. `wp-config.php`:
   ```php
   define( 'ALETHEIA_FRONTEND_URL', 'https://www.aletheiasrl.it' );
   define( 'ALETHEIA_SHARED_SECRET', '<stringa casuale lunga>' );
   ```
3. **ACF → Field Groups → "Sync available" → Sync** su tutti i gruppi (arrivano da `aletheia-headless/acf-json/`; dopo il primo import li puoi modificare dall'interfaccia ACF e le modifiche si riscrivono in quella cartella: versionale).
4. Crea le pagine WP con gli **slug esatti** delle rotte Next (`home`, `chi-siamo`, `contatti`, `agenzia-per-il-lavoro`, figlie di `formazione`, ecc.). Il contenuto "Extra Home" compare solo sulla pagina con slug `home`.
5. `.env.local` (Next): `WP_URL=https://cms.aletheiasrl.it`, `WP_SHARED_SECRET=<stessa stringa>`.

Per rigenerare i gruppi da zero: `node wordpress/build-acf-json.mjs` (sovrascrive `acf-json/`).

## 3. Inventario: dove va ogni contenuto

| Contenuto attuale | Dove vive ora | Backend WP |
|---|---|---|
| Hero, intro, sezioni 1-8, numeri, CTA di ogni pagina | JSX in `pages/*.js` | Gruppi **Pagina - Hero / Sezioni** su ogni pagina WP |
| Chip ricerca, limiti corsi/news, titoli sezioni home | `pages/index.js` | Gruppo **Pagina - Extra Home** (solo `home`) |
| Catalogo corsi | `data/coursesRaw.js` | CPT `corso` + tassonomia `categoria_corso` (con campi icona, immagine, colore, pagina; le sotto-categorie sono termini figli) |
| Famiglie/varianti | `data/courseFamilies.js` (calcolate) | tassonomia `famiglia_corso` + campi `tipo`, `livello` |
| Scheda editoriale del corso | `coursesDetails`, `EDITORIAL_CONTENT`, `data/content/*` | contenuto del post (descrizione) + campi `corso` (moduli, a chi è rivolto, cosa imparerai, correlati, prezzi…); FAQ del corso = CPT `faq` col campo "Corso collegato" |
| Calendario | `data/calendario.ts` | CPT `edizione_corso` |
| News | `lib/newsData.js` | CPT `news` + `tag_news` (corpo = editor, immagine = in evidenza) |
| Offerte di lavoro | `data/offerte.js` | CPT `offerta_lavoro` |
| Archivio dei bandi (`/archivio`) | `public/pdf/archivio/*.json` + 177 PDF | CPT `archivio` (campi: famiglia, descrizione, destinatari, documenti `sezione|Titolo|URL`, titoli per elenco/panoramica) |
| Aiuti di Stato | `data/content/aiuti-di-stato/*.js` | CPT `aiuto_stato`: **una riga = un post** (campi anno, ente, data, importo, CUP); il frontend raggruppa |
| FAQ sparse | JSX | CPT `faq` (titolo = domanda, contenuto = risposta, campo `pagina`) |
| Loghi clienti / ecosistema / certificazioni | `index.js`, `chi-siamo.js`, `Footer.tsx` | CPT `partner` (campo `gruppo`) |
| Sedi | `pages/contatti.js` | CPT `sede` (indirizzo, CAP, mappa, orari…) |
| Liste di card con testo/immagine (avvisi regionali, misure GOL, servizi alla persona/imprese, aree, vantaggi, "perché noi") | array in `pages/*.js` | CPT `scheda` + tassonomia `lista_schede` (un termine per lista, ordine = Attributi pagina) |
| Testi e opzioni dei moduli (servizi, settori, privacy, successo) | `FormCandidato.tsx`, `FormAzienda.tsx` | Opzioni Globali → tab Moduli |
| Menu e mega-menu (voci, gruppi Formazione, riquadro calendario, pulsanti lavoro/e-learning) | `Header.tsx` | Opzioni Globali → tab Menu |
| Footer (indirizzo, link legali, link rapidi, catalogo PDF, accreditamenti, barra inferiore, credits) | `Footer.tsx` | Opzioni Globali → tab Footer; loghi certificazioni = CPT `partner` (con variante per tema scuro) |
| Contatti, chatbot, SEO globale, cookie/privacy | `contatti.js`, `Chatbot.tsx`, `SeoHead.tsx`, `CookieConsent.tsx` | Opzioni Globali (tab dedicate) |
| SEO per pagina | `SeoHead.tsx` | Gruppo **SEO** (`seo_titolo`, `seo_descrizione`, `seo_og_image`, `seo_noindex`) |

Restano nel codice (non sono contenuto): logica dei form, animazioni, dark mode, design token, **layout e ordine delle sezioni**.

## 4. Formato delle liste (niente repeater)

Una voce per riga, colonne separate da `|`. Esempi:

| Campo | Formato | Esempio |
|---|---|---|
| `sN_elenco` (card; immagini nei campi "Immagine card N", stesso ordine) | `Icona\|Titolo\|Testo\|URL` (ultime colonne facoltative) | `fa-solid fa-shield\|Sicurezza\|Corsi D.Lgs 81/08\|/formazione/obbligatoria` |
| `numeri` | `Valore\|Suffisso\|Etichetta` | `20\|+\|Anni di esperienza` |
| `prezzi_variante` | `Etichetta\|Importo` | `Aula\|80` |
| `moduli` (corso) | `Titolo\|Ore teoria\|Ore pratica\|Argomenti separati da ;` | `Modulo A\|12\|4\|Normativa; Rischi` |
| `menu_voci`, `home_chips`, `footer_link_legali` | `Etichetta\|URL` | `Chi siamo\|/chi-siamo` |
| `social` | `Icona\|URL\|Nome` | `fa-brands fa-facebook\|https://…\|Facebook` |
| `menu_formazione` | `# Titolo gruppo\|URL` poi `Etichetta\|URL` | `# Formazione Obbligatoria\|/formazione/obbligatoria` |
| `footer_colonne` | `# Titolo colonna`, `## Sottotitolo` (facoltativo), poi `Etichetta\|URL` | `## Formazione` |

Il parsing si scrive una volta sola in Next (`lib/wp-lists.ts`: `lines(text)` → `split('\n')` → `split('|')`).

## 4b. Mappa pagina per pagina

Ogni pagina ha: Hero (con badge a icone, bottoni, immagine) + Intro + 8 sezioni (badge, titolo, testo, card/elenco, immagini, pulsante, ancora) + Numeri + Modulo (badge/titolo/sottotitolo per `FormAzienda`/`FormCandidato`) + CTA finale + SEO.

| Pagina | Come si compone |
|---|---|
| `home` | Hero + chip ricerca · sez. 1 calendario · sez. 2 percorsi (3 card con immagine) · Numeri · sez. 3 "cosa facciamo" (2 card con immagine) · sez. 4 gruppo (+ `partner` gruppo ecosistema) · sez. 5 news · sez. 6 clienti (+ `partner` clienti) · CTA finale |
| `chi-siamo` | Hero · sez. 1 storia (timeline = card) · sez. 2-4 Missione/Visione/Valori (una tab = una sezione: titolo, sottotitolo, punti) · sez. 5 certificazioni (+ `partner`) · sez. 6 ecosistema (+ `partner`) |
| `agenzia-per-il-lavoro` | Hero (H1 anche solo semantico) · sez. 1 pannello Candidati · sez. 2 pannello Aziende · sez. 3+ blocchi extra; offerte = CPT `offerta_lavoro` |
| `servizi-alla-persona`, `servizi-alle-imprese` | Hero · elenco servizi = `scheda` (liste `servizi-persona`, `servizi-imprese`, `perche-noi`) · Modulo |
| `formazione/obbligatoria` | Hero · sez. "obbligo di legge" · sez. perché noi (`scheda` `perche-noi`) · sez. aree (`scheda` `aree-obbligatoria`) · sez. come lavoriamo (`scheda` `step`) · FAQ (`faq` con `pagina`) · Modulo |
| `formazione/regionale`, `regionale-fse`, `ecm`, `corsi-pa`, `fondo-nuove-competenze`, `fondi-interprofessionali`, `professionale-specialistica` | Hero · sezioni testo/card · elenchi ricchi = `scheda` (avvisi, requisiti, vantaggi, target, servizi, verticali) · FAQ · Modulo · elenco corsi per `categoria_corso` |
| `programma-gol` | Hero · sezioni · misure GOL = `scheda` (lista `gol-misure`, dati: misura, target) |
| `calendario-corsi`, `all-courses`, `news` | Hero + testi; contenuti da `edizione_corso`, `corso`, `news` |
| `contatti` | Hero · sez. info (da Opzioni: telefono, email, orari) · sedi = CPT `sede` · motivi = Opzioni → Contatti |
| `reclami-proposte`, `privacy-cookie` | Hero · testo lungo nell'**editor della pagina** (contenuto) |
| `aiuti-di-stato/[anno]` | `aiuto_stato` raggruppati per `anno` ed `ente` |
| `archivio/*` | pagine WP normali |

Non coperto dai campi (resta nel codice): etichette dei campi dei moduli, testi di errore/validazione, `aria-label`, etichette dei bottoni dei componenti (es. "Vedi tutti i corsi →"), testi fallback del template corso.

## 5. Aggiungere un corso nuovo

Sì, da WordPress, senza toccare il codice (a frontend collegato):

1. **Corsi → Aggiungi corso**. Titolo = nome del corso; contenuto = descrizione; immagine in evidenza = immagine della card.
2. Assegna **Categoria corso** (e sotto-categoria, termine figlio) e, se è una variante di un corso esistente (livello, aggiornamento, rischio…), la stessa **Famiglia corso**: compare nel selettore varianti della pagina.
3. Compila **Scheda corso**: badge, tipo (corso/aggiornamento), livello, ore, prezzo o prezzi per modalità, modalità, validità, attestato, moduli, a chi è rivolto, cosa imparerai, corsi correlati.
4. FAQ del corso: **FAQ → Aggiungi**, campo "Corso collegato".
5. Date: **Calendario corsi → Aggiungi edizione**, scegli il corso, data, sede, posti.
6. Pubblica: la pagina `/all-courses/<slug>` nasce da sola (`/routes` + `getStaticPaths`) e le liste (catalogo, home, calendario, pagine di categoria) si aggiornano via revalidazione.

Stato: **il catalogo (`/all-courses`) e il calendario sono già collegati** (con `WP_URL` impostato un corso o un'edizione creati in WP compaiono senza toccare il codice). Restano nel codice i testi editoriali del dettaglio (`EDITORIAL_CONTENT`, `data/content/*`: un corso nuovo usa il template generico) e le pagine di categoria con elenchi scritti a mano (es. `formazione/obbligatoria.js`), che dovrebbero passare a elenchi per `categoria_corso`.

## 5b. Archiviare un nuovo bando

1. **Archivio bandi → Aggiungi voce**. Titolo = titolo della pagina (e slug = ultimo pezzo dell'URL).
2. **Famiglia**: vuota per una voce singola (compare nell'elenco di `/archivio`); *Misura PSR 1.1* o *Avviso 2/2018* per una voce di quella famiglia (compare nel suo accordion e nella sua panoramica; URL `/archivio/<famiglia>/<slug>`).
3. **Descrizione** e **Destinatari e requisiti**: testo semplice, paragrafi separati da una riga vuota, elenchi puntati con `- ` a inizio riga.
4. **Documenti**: carica i PDF in *Media*, poi una riga per file nel formato `sezione|Titolo del documento|URL` (sezioni: `bandi-docenti`, `bandi-tutor`, `bandi-allievi`, `altri`).
5. Facoltativi: *Titolo nell'elenco* e *Titolo nella panoramica* (se diversi dal titolo).
6. Pubblica: la pagina nasce da sola (`getStaticPaths` con `fallback: 'blocking'`) e indice/panoramica si aggiornano via revalidazione. Una voce WP con lo stesso percorso di una locale la sostituisce (la migrazione ha già caricato le 18 storiche).

I PDF storici restano nel frontend (`public/pdf/archivio`, 87 MB): le voci migrate puntano a `/pdf/archivio/...`; quelli nuovi stanno nella libreria Media di WordPress.

## 6. Endpoint

| Endpoint | Uso in Next |
|---|---|
| `GET /wp-json/wp/v2/<tipo>?per_page=100` (`corso`, `edizione_corso`, `news`, `offerta_lavoro`, `aiuto_stato`, `faq`, `partner`, `sede`) | liste e aggregazioni; i campi ACF sono in `acf` |
| `GET /aletheia/v1/page?path=formazione/obbligatoria` | pagina per percorso gerarchico (vuoto = `home`); `&type=corso&path=rls` per i CPT |
| `GET /aletheia/v1/page?preview_id=&exp=&token=` | Preview Mode (bozze) |
| `GET /aletheia/v1/routes` | `getStaticPaths`, sitemap |
| `GET /aletheia/v1/options` | header, footer, sedi, chatbot, SEO globale (in `_app`) |
| `POST /aletheia/v1/preview-fields` | solo editor WP (richiede login) |

Risposta di `/page`: `{ id, type, slug, path, title, content, image, terms, acf }`.

## 7. Contratto frontend

### Stato di implementazione lato Next

Il frontend è predisposto **prima** che WordPress esista: senza `WP_URL` il sito usa i dati locali (`data/*`, `lib/newsData.js`) e funziona identico a prima; con `WP_URL` impostato legge da WordPress e, se non risponde o non ha contenuti, **ripiega sui dati locali** (avviso `[wp]` nel log) così il build non si rompe.

| Pezzo | Stato | File |
|---|---|---|
| Client REST con timeout, paginazione, ISR | fatto | `lib/wp.ts` |
| Verifica token HMAC e secret del webhook (tempo costante) | fatto | `lib/wp-auth.ts` |
| `/api/preview`, `/api/exit-preview`, `/api/revalidate` | fatto | `pages/api/*` |
| **News** (elenco, articolo, bozze in anteprima, `fallback: 'blocking'`) | fatto | `lib/wp-news.ts`, `pages/news/*` |
| **Calendario corsi** (CPT `edizione_corso`): home "Corsi in partenza", `/calendario-corsi`, `/formazione/obbligatoria` | fatto | `lib/wp-calendario.ts` |
| **Catalogo corsi** (CPT `corso` + `categoria_corso`): elenco e pagine `/all-courses/*` | fatto (solo catalogo: vedi limiti) | `lib/wp-corsi.ts`, `pages/all-courses/*` |
| **Aiuti di Stato** (CPT `aiuto_stato`) | fatto | `lib/wp-aiuti.ts`, `pages/aiuti-di-stato/[anno].js` |
| **Anteprima live** nell'editor (`postMessage`, solo origine di WP) | fatto per le news; si estende con `useLivePayload` | `lib/live-preview.ts` |
| **Migrazione** dei contenuti locali verso WordPress | fatto (simulazione + `--apply`, idempotente) | `wordpress/migrate-local-to-wp.mjs` |
| Host di WordPress tra i domini di `next/image` e origine per l'anteprima (da `WP_URL`) | fatto | `next.config.js` |
| Offerte di lavoro | **non serve**: arrivano da aletheia4job.it, `data/offerte.js` non è usato | — |
| **Sedi** (CPT `sede`): `/contatti` | fatto | `lib/wp-sedi.ts`, `data/sedi.js` |
| **FAQ** (CPT `faq`, campo `pagina`): ecm, regionale, corsi-pa, fondo-nuove-competenze, fondi-interprofessionali, obbligatoria | fatto | `lib/wp-faq.ts`, `data/faq.js` |
| **FAQ del chatbot** (CPT `faq`, `pagina` = `chatbot-formazione` / `chatbot-lavoro` / `chatbot-generale`; titolo = domanda, contenuto = risposta, ordine = ordine di pagina). Sono sia le domande rapide sia il testo in cui il chatbot cerca la risposta; gruppo vuoto in WP = testi locali; con WordPress spento il chatbot usa i suoi testi e le props delle pagine non cambiano | fatto | `lib/wp-faq.ts` (`getChatbotFaqs`), `lib/wp-site.ts` (`chatbot.faq`), `data/chatbot-faq.js`, `components/Chatbot.tsx` |
| **Partner/loghi** (CPT `partner`, gruppo `ecosistema`): home e `/chi-siamo` | fatto (non i loghi certificazioni del Footer: richiedono le opzioni globali) | `lib/wp-partner.ts`, `data/partner.js` |
| `pages/agenzia-per-il-lavoro.js` (news con tag `apl`) | fatto | `lib/wp-news.ts` |
| **Opzioni globali: identità, Header (menu, mega-menu Formazione, pulsanti), Footer (indirizzo, link, colonne, accreditamenti, certificazioni, copyright)**: tutte le pagine | fatto | `lib/wp-site.ts`, `lib/wp-lists.ts`, `context/SiteOptionsContext.js`, `data/site-options.js` |
| **Opzioni globali: tab Contatti (motivi), Moduli (elenchi, consenso, messaggi di successo), Chatbot (nome, saluto, segnaposto, messaggio di ripiego, email, on/off), Cookie (banner e pulsanti), SEO (verifica Google)** | fatto | `lib/wp-site.ts`, `components/LinkText.tsx` |
| **Schede** (CPT `scheda` + `lista_schede`): 18 liste in 13 pagine (home, servizi alla persona/imprese, programma GOL, formazione obbligatoria/regionale/regionale-fse/ECM/corsi-pa/fondi/FNC/professionale) | fatto (mapping a due vie in `lib/wp-schede-map.ts`, dati in `data/schede.js`) | `lib/wp-schede.ts` |
| **Archivio dei bandi** (CPT `archivio`): indice `/archivio`, voci `/archivio/<slug>` e `/archivio/<famiglia>/<slug>`, panoramiche di famiglia; una voce nuova in WP ha la sua pagina senza toccare il codice | fatto (rotta unica `pages/archivio/[...slug].js`; anche `avviso-1-2026-poc` e `avviso-20-2024-fse` ora passano da lì con il **layout a scheda**: campo "Layout della pagina" = A scheda + campi `scheda_*`, `fuori_elenco`, `meta_*`; HTML identico a prima, verificato) | `lib/wp-archivio.ts`, `components/ArchivioScheda.js`, `data/archivio-famiglie.js`, `data/archivio-schede.js` |
| **Testi delle pagine** (hero: eyebrow, titolo con `*parola*` evidenziata, sottotitolo, 2 bottoni; prima sezione = `intro_*` e `s1..s8_*`: badge, titolo, paragrafi; CTA finale `cta_*`; SEO `seo_titolo`/`seo_descrizione`) per 14 pagine: formazione (ecm, corsi-pa, fondi, FNC, obbligatoria, professionale, regionale, regionale-fse), programma GOL, servizi alla persona/imprese, all-courses, chi-siamo, contatti, **home** (hero, calendario, percorsi, cosa facciamo, gruppo, news, CTA) ed elenco **news** (hero), **reclami-proposte** (hero, intro con link, messaggio di successo dalle opzioni Moduli, consenso privacy) e **privacy-cookie** (hero e SEO; il testo lungo = **contenuto della pagina WP**, reso con `.legal-content`; se la pagina WP è vuota o WP è spento resta il testo attuale) | fatto (solo le parole; layout, stili, ordine e comportamenti restano nel codice) | `lib/wp-pagine.ts`, `components/HeroTitle.tsx`, `data/pagine.js` |
| **Non collegato**: `entiLoghi`/`clientiLoghi` (segnaposto); sezioni con markup nei paragrafi, home: barra di ricerca/chip, card "cosa facciamo", titolo con `<br>`; news: `[slug]`, filtri; altre immagini delle sezioni (collegate solo quelle elencate nella riga "Immagini e numeri"), `form_*` | **aperto** | — |
| Non collegati dei campi opzioni: `form_email_*` (i moduli non inviano nulla), informativa/cookie policy (`legale_privacy`, `legale_cookie`: le pagine sono JSX), template titolo (`sito_seo_template`) | **aperto** | — |
| **Immagine OG e description predefinite** (opzioni globali → SEO): l'immagine arriva a `SeoHead` dalle pagine (`pagina.seo.ogImage \|\| useSiteOptions().seo.ogImage`, i figli di `next/head` sono fuori dal provider); la description predefinita è emessa da `_app.js` e la sostituisce il `description` proprio di ogni pagina. In locale entrambe sono vuote: HTML invariato | fatto | `pages/_app.js`, `components/SeoHead.tsx`, 5 pagine con `SeoHead` |
| **Immagini e numeri**: tipo di valore `{ src, alt }` in `data/pagine.js` (campo ACF immagine, l'alt del media sostituisce quello locale; campo vuoto = immagine locale). Collegati: **home** `s3_img_1` / `s3_img_2` (foto delle due card "Cosa facciamo") e `numeri` (4 contatori, righe `Valore|Suffisso|Etichetta`, la prima è il numero grande); **agenzia-per-il-lavoro** `s1_img_1` / `s1_img_2` (sfondi dello split, decorativi) e `s2_immagine` (foto "Chi siamo"). Rimossi da ACF `hero_immagine`, `hero_immagine_alt` e `hero_badges`: nessuna pagina li usava. La migrazione (`--with-images`) carica le immagini in Media con il loro alt e scrive `numeri` come righe di testo | fatto (verificato su WP simulato; HTML locale identico) | `lib/wp-pagine.ts`, `data/pagine.js`, `pages/index.js`, `pages/agenzia-per-il-lavoro.js` |
| **Liste con icone SVG o testo con grassetto** (schede, 3 liste nuove): `fnc-vantaggi` e `fnc-servizi` (Fondo Nuove Competenze) con icone disegnate scelte per **nome** dal catalogo `data/icone-svg.js` (nel campo "Icona" della scheda si scrive es. `fulmine`; nome sconosciuto = nessuna icona; "Dato 1" = `in evidenza` mette la card in primo piano); `obbligatoria-punti` (punti di forza della formazione obbligatoria) con testo in grassetto: il contenuto della scheda passa per `inlineHtml()` che tiene solo `<strong>`/`<em>` e `components/RichText` lo disegna senza interpretare altro HTML. HTML locale identico (verificato; l'unica differenza è una classe CSS di scoping sul `<path>`, senza effetti) | fatto (verificato su WP simulato) | `lib/wp-schede.ts`, `lib/wp-schede-map.ts`, `data/schede.js`, `data/icone-svg.js`, `components/RichText.tsx` |
| **Noindex per pagina** (campo SEO "Nascondi ai motori di ricerca"): `pages/_app.js` aggiunge `<meta name="robots" content="noindex, nofollow">` quando la pagina riceve `pagina.seo.noindex`; in locale non emette nulla. Vale per le pagine collegate con `getPagina`; i singoli corsi, le news e le offerte hanno lo stesso campo in ACF ma le loro pagine non leggono ancora il SEO da WordPress | fatto (valore verificato su WP simulato; il tag in pagina non provato con WP attivo) | `pages/_app.js`, `lib/wp-pagine.ts` |
| **Chi siamo** (tutta la pagina): intestazioni di sezione in `pagina.testi` (`s1`…`s7`, `cta_*`: badge, titolo con `*parola*` evidenziata, testo) e 6 liste di schede: `chi-storia` (anno nel badge), `chi-tabs` (nome della tab nel badge, titolo, sottotitolo, testo), `chi-punti-forza` (il reticolo — larghezza e bordi della cella — segue la posizione), `chi-expertise` (numero e colore dalla posizione), `chi-accreditamenti` (logo = immagine in evidenza, estremi nel badge), `chi-certificazioni` (descrizione = paragrafo, vantaggi = elenco puntato, PDF = link, fino a 2 link extra in Dato 1/2 come `Etichetta|URL`). Una scheda ora può avere paragrafo **e** elenco puntato nel contenuto (`testo` esclude le liste). Restano nel codice: indirizzo, orari e link mappa della sezione sede, i loghi dell'ecosistema (partner, già collegati) | fatto (HTML identico verificato; liste provate su WP simulato) | `pages/chi-siamo.js`, `data/pagine.js`, `data/schede.js`, `lib/wp-schede-map.ts` |
| **Sicurezza import**: costante `ALETHEIA_DISABLE_REVALIDATE` in `wp-config.php` sospende le rigenerazioni durante l'importazione di massa (FAQ, partner e schede fanno rigenerare tutto a ogni salvataggio); a fine import rimuoverla e fare una sola chiamata `POST /api/revalidate` con `{"scope":"all"}` | fatto (PHP mai eseguito) | `inc/revalidate.php` |

I tipi "semplici" (faq, sede, partner) usano l'helper `lib/wp-cpt.ts` (`getCptPosts`, memo + ripiego).

**Opzioni globali**: ogni pagina esporta `getStaticProps = withSiteOptions(...)`, che aggiunge `siteOptions` alle props; `_app.js` le passa a `SiteOptionsProvider` e `Header`/`Footer`/JSON-LD le leggono con `useSiteOptions()`. Un campo vuoto in WP ripiega sul valore di `data/site-options.js`. Una pagina nuova con Header/Footer deve usare lo stesso wrapper (`export const getStaticProps = withSiteOptions();` se non ha altro). Le voci di menu con URL vuoto aprono il mega-menu; `##` da solo nel footer = gruppo senza sottotitolo; il PDF del catalogo caricato in WP sostituisce il link `/pdf/catalogo.pdf`. Il campo `footer_catalogo_pdf` e le tab Contatti/Moduli/Chatbot/SEO/Cookie non sono ancora collegati ai componenti.

**Testi delle pagine**: ogni pagina esporta `pagina` (`{ testi, seo }`) da `getPagina('percorso')`; i valori locali stanno in `data/pagine.js`, le chiavi sono quelle dei campi ACF della pagina WP con lo stesso percorso (`formazione/ecm` = pagina figlia `ecm` di `formazione`). Il tipo di valore si deduce dal locale: stringa = testo, array = paragrafi (campo wysiwyg, un `<p>` per voce), `{ label, href }` = campo link. Un campo vuoto in WP ripiega sul locale. Nei titoli `*parola*` è la parola evidenziata (`HeroTitle`); la parola resta resa dal JSX della pagina (`renderHighlight`) perché lo stile è spesso una regola styled-jsx scoped. Di alcuni bottoni (quelli con `onClick` o ad ancora) si usa solo l'etichetta. `<title>` e description arrivano da `seo_titolo`/`seo_descrizione` (se vuoti, il testo locale).

**Home**: le ultime 3 notizie arrivano da WordPress solo con `WP_URL` attivo; senza, resta la copia storica `data/home-news.js` (era già diversa dalle notizie reali: la terza card è del 2025) così il sito non cambia. Il path della home è `home` nel codice e `path=` (vuoto) nella richiesta. Con WP attivo e nessuna notizia pubblicata la home usa le notizie locali di `lib/newsData.js`.

**Privacy e cookie policy**: il corpo della pagina WP `privacy-cookie` (editor classico) è reso in `<div class="legal-content">` (stili in `styles/globals.css`, con tema scuro): titoli h2/h3, paragrafi, elenchi, tabelle e citazioni. L'HTML arriva da WordPress già filtrato per i permessi dell'utente; lo si inserisce con `dangerouslySetInnerHTML`, quindi i contenuti vanno affidati solo a editor fidati. La migrazione (`--only=pagine`) carica il testo attuale, generato da `wordpress/privacy-html.mjs` con le tabelle di `data/privacy.js`. I campi `legale_privacy` e `legale_cookie` delle opzioni NON sono usati (si usa la pagina).

**Schede**: ogni lista è un termine di `lista_schede` (slug = nome della lista in `data/schede.js`), l'ordine è `menu_order`, l'immagine è l'immagine in evidenza (se manca si usa quella della scheda locale con lo stesso titolo). Campi usati: titolo, contenuto (testo), `icona`, `badge`, `sottotitolo`, `link`, `meta_1`, `meta_2`, `immagine_alt`; il significato di `meta_*` per lista è in `wp-schede-map.ts`. Il colore dell'accento delle card servizi alterna per posizione; i bullets delle card (`bullets`) sono un elenco `<ul><li>` nel contenuto; stringhe semplici (es. `fondi-vantaggi`) sono il solo titolo della scheda.

**Schema per collegare un nuovo tipo** (ripetere quanto fatto per le news): 1) `lib/wp-<tipo>.ts` con `getAll…()`, adattatore verso il formato attuale della pagina e ripiego sui dati locali; 2) la pagina passa a `getStaticProps` con `...isrOptions()`; 3) se ha pagine singole, `getStaticPaths` con `fallback: isWpEnabled() ? 'blocking' : false`.

### Attivazione quando il dominio WordPress sarà pronto

1. Installa il plugin e ACF Free e sincronizza i gruppi (§2); in `wp-config.php` imposta `ALETHEIA_FRONTEND_URL` e `ALETHEIA_SHARED_SECRET`.
2. Nel progetto Next (`.env.local` o variabili dell'hosting) imposta `WP_URL` e `WP_SHARED_SECRET` (**uguale** a `ALETHEIA_SHARED_SECRET`). Vedi `.env.example`.
3. **Migra i contenuti** (vedi "Migrazione dei contenuti" qui sotto). Finché un tipo non ha contenuti pubblicati in WordPress il sito continua a mostrare quelli locali; per questo, prima di andare in produzione, migra news, corsi, calendario e aiuti di Stato.
4. Verifica: link "Anteprima" di una bozza (si apre `/news/<id>` con il banner "Anteprima bozza"), modifica di una news nell'editor (il pannello live aggiorna il sito senza salvare) e modifica di un contenuto già pubblicato (compare entro pochi secondi grazie al webhook).

### Migrazione dei contenuti

`wordpress/migrate-local-to-wp.mjs` copia in WordPress ciò che oggi vive nel codice: **102 corsi** (con categorie e sotto-categorie), **47 edizioni** del calendario, **15 news** (con tag, corpo convertito in HTML) **17 righe** di aiuti di Stato, **4 sedi**, **29 FAQ** (6 pagine di formazione) **11 loghi** partner (gruppo ecosistema e certificazioni del Footer, con variante per tema scuro) **75 schede** (18 liste), i testi di **16 pagine**, **18 bandi** dell'archivio e la pagina **opzioni-globali** (identità, menu, footer) (con `--with-images` i loghi si caricano da `public/`; gli SVG richiedono un plugin tipo Safe SVG).

```bash
node wordpress/migrate-local-to-wp.mjs                 # simulazione: elenca cosa farebbe, non scrive nulla
WP_URL=https://cms… WP_USER=… WP_APP_PASSWORD=… node wordpress/migrate-local-to-wp.mjs --apply
# opzioni: --only=corsi,edizioni,news,aiuti,sedi,faq,partner,schede,pagine,archivio,opzioni   --limit=5   --with-images (scarica e carica le immagini)
```

- **Idempotente**: cerca per slug e aggiorna invece di duplicare; si può rieseguire dopo ogni correzione.
- **Ordine**: corsi → edizioni → news → aiuti → sedi → faq → partner → opzioni (le edizioni puntano ai corsi: se un corso manca, l'edizione è segnalata come errore).
- Le edizioni il cui slug locale è quello di una *famiglia* (es. `antincendio`) si agganciano alla prima variante della famiglia; il link del calendario passa poi dal redirect 301 di `next.config.js`.
- **Testato solo contro un WordPress simulato** (mock che riproduce autenticazione, ACF, tassonomie, `_embed`, paginazione e `wptexturize`), non contro un WordPress reale. `--with-images` non è stato provato.
- Dopo la prima esecuzione controlla in WP: categorie corso, un corso, un'edizione e una news.

**Campi ACF aggiunti per il catalogo reale** (rigenerati con `node wordpress/build-acf-json.mjs`, poi *Sync* in ACF): `corso.meta_card` (righe `Icona|Testo`), badge del corso con 9 valori (Obbligatoria, Finanziato, Professionale, Agricolo, GOL, Digitale, Regionale, ECM, FSE) e `edizione_corso.categoria` (obbligatoria / regionale-fse / professionale / ecm; se vuota si deduce dalla categoria del corso).

**Differenze note tra i dati locali e quelli letti da WordPress**
- WordPress rende gli apostrofi dei titoli tipografici (`'` → `’`, `wptexturize`): è il comportamento standard di WP e non altera l'impaginazione.
- `subKey` dei corsi che in locale lo avevano `null` diventa uguale a `categoryKey` (7 corsi): non cambia i filtri del catalogo.
- Titolo e slug delle edizioni nel calendario sono quelli del *corso* WP (titolo come nel catalogo, slug della variante) e non quelli della famiglia.
- Dei dati di una pagina di aiuti di Stato, i **paragrafi finali** restano nel codice (non hanno un campo in WP).

**Limiti del catalogo**: il contenuto editoriale del dettaglio corso (`data/content/*`, `coursesDetails`, `EDITORIAL_CONTENT` in `pages/all-courses/[slug].js`, 60 file) resta nel codice, indicizzato per slug di famiglia. Un corso creato solo in WordPress compare nel catalogo e ha la sua pagina con il template generico (senza i testi editoriali); i redirect 301 dei vecchi slug in `next.config.js` sono generati dai dati locali.

### Contratto

1. **`pages/api/preview.js`** — verifica `hmac_sha256(id|exp, WP_SHARED_SECRET) === token` e `exp > now`; `res.setPreviewData({ id, exp, token })`; redirect a `path` (+`?live=1` se presente). Il `path` è validato (niente redirect aperti) e accettato anche se doppiamente codificato. Le bozze non hanno slug: il plugin le raggiunge come `/news/<id>`.
2. **`pages/api/revalidate.js`** — header `x-aletheia-secret`; `paths[]` → `res.revalidate(path)`; `scope: 'all'` → ciclo su `/routes`. Accetta solo percorsi interni sicuri; risponde `{ revalidated, failed }`.
3. **Pagine** — `getStaticProps` legge `/page` + `/options`; i componenti ricevono `acf` come props. Le sezioni vuote non si disegnano.
4. **Listener live** — implementato in `lib/live-preview.ts` (`useLivePayload`, `useLiveNews`); ascolta solo `NEXT_PUBLIC_WP_ORIGIN` (di default l'origine di `WP_URL`). Pagina news fatta; per le altre pagine si usa lo stesso hook. Dettaglio del contratto: (solo con `live=1` e Preview Mode) su mount `parent.postMessage({source:'aletheia-next', type:'ready'}, WP_ORIGIN)`; su `message` con `origin === WP_ORIGIN` e `source:'aletheia-wp'`: se `kind === 'content'` sostituire `acf`/`title`/`content` della pagina; se `kind === 'options'` sostituire le opzioni globali. L'H1 resta uno solo.
5. `revalidate` lungo (3600, `WP_REVALIDATE_SECONDS`) come rete di sicurezza: il resto lo fa il webhook.

## 8. Limiti e punti aperti

- **Stato dei test.** Verificato in un WordPress reale (WordPress Playground + ACF 6.8.10) e in Chrome: caricamento dei 15 gruppi e 266 campi da `acf-json/`, CPT e tassonomie, regole di location dinamiche (Home / pagine / Opzioni), `/page`, `/routes`, `/options`, `/wp/v2/*` con `acf`, token di anteprima (valido, manomesso, scaduto, di un altro post, assente → 403), `/preview-fields` (formato immagini/link, 401 da anonimo), webhook di revalidazione (cosa invia, e quando NON invia), pannello live nell'editor (aggiornamento a ogni modifica di campo, titolo e corpo, debounce, viewport, origine non fidata ignorata, pagina Opzioni e CPT). **Non verificato**: l'import manuale con "Sync available" dall'interfaccia ACF (i gruppi qui vengono letti direttamente da `acf-json/`), il salvataggio di un gruppo dall'admin ACF, il frontend Next con un WordPress **reale** (le API route, le pagine collegate, la migrazione e il listener live sono invece testati contro un WordPress simulato che parla come il plugin: 24 controlli su API/news/anteprima/webhook/ripiego, 21 di **andata e ritorno** — migrazione locale→WP→Next confrontata con i dati originali —, 11 sull'anteprima live in un browser reale con origine fidata e non fidata, e 15 in modalità senza WordPress, dove i dati risultano identici agli originali); la modifica PHP che fa usare l'ID alle bozze senza slug (`aletheia_frontend_path()`) non è stata eseguita perché qui non c'è PHP, le versioni di WordPress/ACF diverse dalle testate.
- **Editor classico.** Per i tipi gestiti dal frontend Gutenberg è disattivato (`use_block_editor_for_post_type`): in Gutenberg i gruppi ACF finiscono nel cassetto chiuso "Meta Boxes" in fondo alla pagina. Con l'editor classico i campi stanno sotto il titolo e il corpo è HTML pulito. Vale per **tutte** le pagine WP del sito.
- **Nessun page builder**: le sezioni di una pagina sono fisse (hero, intro, 8 sezioni, numeri, CTA); si cambiano contenuti, non l'ordine né il numero. Se serve riordinare/aggiungere sezioni → ACF PRO (flexible content) o SCF.
- **Schema pagine generico**: "Sezione 1-6" è un contenitore comune; il mapping preciso sezione→pagina si affina scrivendo i componenti Next. Pagine molto lunghe (es. `formazione/obbligatoria.js`, 1121 righe) possono richiedere campi dedicati o più sezioni.
- Convenzione titoli: nel campo `hero_titolo` le parole tra asterischi (`*formazione*`) sono quelle evidenziate (oggi `<span>` nell'H1).
- Caricare SVG in Media (loghi del gruppo, certificazioni) richiede un plugin che li consenta (es. Safe SVG): WP li blocca di default.
- Le schermate di modifica dei **termini** (categorie) non hanno anteprima live: valgono salvataggio e revalidazione.
- Immagini multiple (gallerie, loghi) non possibili senza repeater/gallery: loghi e partner sono CPT; le gallerie vanno modellate come CPT o come immagine singola per sezione.
- Le regole di location `page == ID` sono impostate a runtime (`inc/acf-json.php`): se le pagine `home` o `opzioni-globali` vengono create dopo, ricaricare l'admin.
- Le rotte Next sono fisse (`aletheia_frontend_path()` in `helpers.php`): consigliata una rotta catch-all `[...slug].js` per nuove pagine WP.
- Migrazione dei contenuti esistenti da `data/` non inclusa (passo successivo).
