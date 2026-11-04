# Aggiornamento di Next (Pages Router) – ex "Migrazione ad App Router"

Branch di lavoro: `migrazione-app-router` (creato da `master`). Il ramo principale del repository si chiama **`master`**, non `main`: non si fa merge né push su `master`. Si pusha solo il branch.

**Decisione del 2 novembre 2026: la migrazione all'App Router è SOSPESA.** Si fa solo la **Fase 1b**: aggiornare Next da 13.4.0 a 16 restando in Pages Router. Le Fasi 2–5 sono "rimandate" (vedi la sezione dedicata in fondo, con le note per riprenderle).

## Invio dei moduli via email (4 novembre 2026) – branch `invio-moduli`

**Stato.** Fino a questo branch **nessun modulo del sito inviava niente**: tutti mostravano "inviato" dopo un `setTimeout` e i dati restavano nel browser. Ora i sette moduli (preventivo, contatti, candidatura con CV, azienda, formazione obbligatoria, corsi PA, reclami e proposte) passano da `pages/api/moduli/<tipo>.ts` e, con le variabili d'ambiente giuste, arrivano a `info@aletheiasrl.it` tramite **Resend** (REST con `fetch`, nessuna dipendenza nuova). **Senza `RESEND_API_KEY` non si simula l'invio**: il modulo dice che l'invio non è attivo, offre l'email già compilata (mailto verso `info@aletheiasrl.it`) e il telefono, e il server lo annota nei log (`[moduli] <tipo>: RESEND_API_KEY non impostata, richiesta NON inviata`). Finché le variabili non sono su Vercel, **dopo il merge in produzione si vedrà questo stato**: è voluto, è la verità.

**Dove sta il codice.** Regole, campi, oggetti e mailto in `lib/moduli.ts` (usato identico da browser e server); invio, antispam e Resend in `lib/moduli-server.ts`; hook del browser `lib/use-invio-modulo.ts`; riquadro degli stati `components/EsitoModulo.tsx`; honeypot `components/CampoTrappola.tsx`. Oggetti: `[Sito] Preventivo: <corso>`, `[Sito] Contatto: <motivo>`, `[Sito] Candidatura: <servizio>`, `[Sito] Azienda: <ragione sociale>`, `[Sito] Formazione obbligatoria: <ragione sociale>`, `[Sito] Corsi PA: <ente>`, `[Sito] Reclamo/Proposta: <tipologia>`. Reply-To = email di chi scrive (nei reclami nome ed email sono facoltativi: una segnalazione anonima parte senza Reply-To). Allegati: massimo 4 MB, CV in PDF/DOC/DOCX, reclami anche JPG/PNG; il server controlla estensione **e** contenuto (firma del file). Oltre il limite: messaggio che rimanda a `info@aletheiasrl.it`.

**Antispam.** Campo-trappola `contatto_alternativo` (compilato → risposta "ok" finta e nessuna email); tempo minimo di compilazione 3 s (misurato dal browser, non dall'orologio); **3 invii ogni 10 minuti per IP**. Il limite è **in memoria**: su Vercel ogni istanza serverless ha il suo registro, quindi è un freno parziale. Un invio fallito per colpa nostra (Resend, configurazione) non consuma il limite di chi scrive. **Se arriva spam: aggiungere Cloudflare Turnstile oppure un limite persistente** (Upstash/Vercel KV).

### Checklist lancio moduli

Prima del lancio le variabili **non** vanno messe in nessun file del repository: solo nelle impostazioni di Vercel (e in `.env.local` per provare in locale; `.env.local` non si committa).

1. **Creare l'account Resend** (resend.com) con un indirizzo dell'azienda, non personale. Verificare il piano: l'offerta gratuita ha un tetto giornaliero e mensile di email, sufficiente per i moduli di un sito di questa dimensione ma da controllare sulla pagina dei prezzi. Scegliere la regione **EU** quando si aggiunge il dominio (dati in Europa).
2. **Verificare il dominio `aletheiasrl.it`**: Resend → Domains → Add Domain → `aletheiasrl.it`. Resend mostra i record da creare nel DNS del dominio (dove sono gestiti oggi i DNS, da chiedere a chi ha registrato il dominio). Struttura **fissa**:

   | Tipo | Nome (host) | Valore | Note |
   |---|---|---|---|
   | TXT | `resend._domainkey` | `p=MIGf…` (chiave DKIM lunga) | **Il valore è unico per questo dominio e lo genera Resend: copiarlo dalla schermata, non esiste altrove** |
   | MX | `send` | `feedback-smtp.<regione>.amazonses.com`, priorità 10 | il valore esatto (regione compresa) è nella schermata di Resend |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` | SPF del sottodominio `send`: **non** tocca l'SPF della posta normale sul dominio principale |
   | TXT | `_dmarc` | `v=DMARC1; p=none;` | consigliato; se esiste già un record DMARC non crearne un secondo |

   Resend usa il sottodominio `send` proprio per non interferire con le caselle di posta già attive. Dopo aver aggiunto i record premere **Verify** in Resend (da pochi minuti a qualche ora): stato "Verified". Se il dominio punta ancora al vecchio sito, i record si aggiungono comunque: non influiscono sul sito.
3. **Creare la chiave API**: Resend → API Keys → Create → permesso **Sending access**, limitata al dominio `aletheiasrl.it`. La chiave si vede una volta sola.
4. **Variabili su Vercel** (Project → Settings → Environment Variables), per **Preview e Production**:
   - `RESEND_API_KEY` = la chiave del punto 3
   - `MAIL_FROM` = `Alètheia Srl <sito@aletheiasrl.it>` (qualunque indirizzo del dominio verificato)
   - `MAIL_TO` = `info@aletheiasrl.it` (facoltativa: è il valore predefinito; più indirizzi separati da virgola)
   - **Non** impostare `RESEND_API_URL` (serve solo ai test e in produzione viene ignorata).
   Le variabili valgono solo per i **nuovi** deploy: dopo averle inserite rifare il deploy (Redeploy).
5. **Prove da fare, prima in anteprima (Preview) e poi in produzione:**
   - **Preventivo**: da una scheda corso → "Richiedi un preventivo" → compilare con un indirizzo proprio → arriva a `info@` con oggetto `[Sito] Preventivo: <corso>` e tutti i campi.
   - **Contatto**: `/contatti` → oggetto `[Sito] Contatto: <motivo>`. Ripetere con **candidatura + CV** (PDF di prova: il file deve essere allegato all'email) e con un reclamo.
   - **Rispondi**: dalla casella di `info@` premere "Rispondi": il destinatario deve essere l'email scritta nel modulo (Reply-To), non il mittente tecnico.
   - **Spam**: inviare 4 moduli di fila dallo stesso computer → il quarto deve essere rifiutato ("più richieste di recente"); inviare un modulo in meno di 3 secondi (o via script) → rifiutato. Il campo-trappola si prova solo da strumenti per sviluppatori.
   - **Errore con chiave sbagliata**: in Preview inserire per prova una chiave non valida → il modulo deve mostrare "Non siamo riusciti a inviare la richiesta" con telefono ed email, **senza** conferma; poi rimettere la chiave giusta e rifare il deploy.
   - **Errore senza chiave**: in una Preview senza `RESEND_API_KEY` (o in locale senza `.env.local`) → "L'invio dal sito non è ancora attivo" con il pulsante "Apri l'email già compilata", e nei log di Vercel la riga `RESEND_API_KEY non impostata`.
   - Controllare che le email non finiscano in spam (provare un indirizzo Gmail e uno aziendale).
6. **Aggiornare la privacy policy (`data/privacy.js`, pagina `/privacy-cookie`) PRIMA di attivare l'invio**: citare **Resend come responsabile del trattamento** (fornitore che trasmette le email con i dati dei moduli: nome, contatti, messaggio, eventuale CV o allegato), con la finalità (rispondere alla richiesta), il periodo di conservazione, e il luogo del trattamento (regione EU scelta al punto 1; verificare se Resend, società statunitense, comporta un trasferimento extra-UE e il relativo accordo sul trattamento dei dati, il DPA, da accettare nella dashboard). I moduli rimandano già alla Privacy Policy con una casella non preselezionata; sotto il modulo contatti c'è la frase «I tuoi dati sono usati solo per rispondere alla tua richiesta, come descritto nella Privacy Policy»: il testo della policy deve rendere vera questa frase. Il testo legale lo valuta il titolare del trattamento, non il codice.
7. **Test automatici**: `moduli-server.spec.mjs` (14 test: validazione, invio con Resend finto, errore di Resend, senza chiave, antispam, allegati) e `moduli-ui.spec.mjs` (i tre stati nel browser). Nessuna email vera: Resend è un server finto locale, le rotte nel browser sono simulate. Con `URL_BASE` lo scenario "senza chiave" si salta (sull'anteprima la chiave potrebbe esserci e l'invio sarebbe reale).

**Blocchi da risolvere prima di spostare i DNS (decisi il 4 novembre 2026, ognuno in un branch separato dopo questo):**
- **`EnrollmentProgress`** (corsi OSS, ASACOM, Conduttore d'Impresa Agricola): il pulsante "Iscriviti" incrementa solo un contatore in `localStorage` e **non avvisa nessuno**, benché i commenti in `pages/all-courses/[slug].js` dicano che al raggiungimento di 15 iscrizioni lo staff viene avvisato. Va reso funzionante (un vero modulo di pre-iscrizione con la stessa logica) **o tolto** prima dei DNS.
- **`/api/chatbot-unanswered`** scrive le domande senza risposta in `data/chatbot-log/unanswered.jsonl` con `fs.appendFileSync`: su Vercel il disco è in sola lettura, quindi la rotta con ogni probabilità risponde 500 in produzione. Da correggere (per esempio con lo stesso invio email).
- Prova su un **iPad vero** (ancora da fare).
- Il form della pagina contatti non legge `?corso=` (i corsi finanziati rimandano a `/contatti?corso=…`): il corso non viene precompilato. Non è un blocco, ma conviene.

## Ottimizzazione mobile – Fase 1 (4 novembre 2026) – misura e controllo, nessun intervento applicato

Branch `ottimizzazione-mobile` da `master` (`022ae44`, Next 16.4.4 già unito, skill in `.claude/skills/ottimizzazione-mobile-nextjs/`). Il lavoro sul sito della sessione precedente (preventivo, immagini, ricerca, sidebar mobile…) sta in 5 commit su `contenuti-immagini-preventivo`, **non** in `master`: quindi le misure sotto sono sulla base pulita. Report completo con screenshot: `Desktop\ottimizzazione-mobile-fase1\REPORT-fase1.md` (fuori dal repository).

- **Base Lighthouse mobile** (mediana di 3 passate, `tests/riferimenti/lighthouse/mobile-base.json`): home 97, contatti 97, calendario 98, chi-siamo 95, 404 95, antincendio 88, news 81, **/all-courses 71 e ?categoria= 68**. CLS 0 ovunque. `tests/lighthouse/lighthouse.mjs` ora accetta `PAGINE` e `FORME` da ambiente (il comportamento predefinito è invariato).
- **LCP, cause dimostrate:** su /all-courses, ?categoria= e pagine corso è il **paragrafo del banner cookie** (render delay ≈ 2,3 s; LCP bimodale ≈ 2 s / ≈ 5 s); sulla news è l'**immagine di testata con `loading="lazy"`**; su tutte c'è **CSS bloccante ≈ 1,1 s** (Font Awesome da cdnjs).
- **Mobile 390/768 px (Chromium):** nessun overflow orizzontale. Menu hamburger: nessun blocco dello scroll (+547 px dietro il menu) e Escape non lo chiude. Input < 16 px (contatti, ricerca corsi, chat). 34–49 aree cliccabili < 44 px per pagina. Il solo sticky dannoso è la sidebar di `/all-courses` (copre le card sotto i 1024 px).
- **iPad Mini (WebKit 26.5 contro Chromium di controllo, 768×1024 e 1024×768):** i due motori danno gli stessi numeri, zero errori JS. **Difetto di larghezza:** tra ~992 e ~1170 px il pulsante "Piattaforma" dell'header è fuori schermo e non toccabile (tagliato di 118 px a 1024, di 9 px a 1133). Sidebar sovrapposta alle card anche su iPad verticale. Le cause solo-Safari (chiusura dei menu con `mousedown`, zoom al focus, `100vh`, versione di iPadOS) sono **ipotesi dal codice**, non riproducibili con Playwright: serve una prova su un iPad vero e sapere modello e versione di iPadOS (Next 16 assume Safari ≥ 16.4).
- **Prossimo passo:** STOP, aspetto l'approvazione dell'elenco ordinato degli interventi (report §4). Strumenti usati (script di ispezione) in `Desktop\ottimizzazione-mobile-fase1\`; WebKit scaricato in `%LOCALAPPDATA%\ms-playwright\webkit-2311`.

## Bug font Nunito in produzione (4 novembre 2026) – branch `fix-font-nunito`

**Sintomo (iPad, Chrome/WebKit, `https://aletheiasrl.vercel.app`):** navbar, sottotitoli, pulsanti e tutto il testo che eredita da `body` nel font predefinito del browser invece che in Nunito; i titoli (Viga) a posto.

**Causa dimostrata.** In produzione `--font-nunito` è **non definita** su `<html>`, `<body>` e sul contenitore di `_app`: la classe `.variable` di Nunito messa nella pagina (`__variable_e34b07`) non è quella che il CSS emesso definisce (`.__variable_b93571{--font-nunito:…}`); per Viga coincidono (`__variable_7c6f4d`). Senza la variabile `body { font-family: var(--font-nunito), sans-serif }` è non valida in fase di calcolo e il testo ricade nel font predefinito del browser (sul PC di prova Chromium: "Times New Roman"; sull'iPad dipende dal browser); chi dichiara direttamente `var(--font-viga)` funziona. Non c'entrano né un Nunito installato nel sistema (non è installato su questo PC) né `font-family: 'Nunito'` per nome (il CSS usa solo `var(--font-nunito)` / `var(--font-viga)`).

**Perché due hash diversi, solo per Nunito.** Nel codice di `next/font` (Next 16.4.4, `next-font-loader`) il nome della classe è `sha1(css).slice(0, 6)` dove `css` è il CSS generato dal caricatore Google; **server e client compilano e scaricano per conto proprio** (la cache del caricatore Google, `cssCache`/`fontCache`, è in memoria del singolo processo). Misurato: alla **stessa richiesta Google Fonts risponde in due forme diverse per Nunito** (24 richieste → 22 volte la forma B `fonts.gstatic.com/s/nunito/v32/….woff2`, 2 volte la forma A `fonts.gstatic.com/l/font?kit=…&skey=…`; 14763 contro 12929 caratteri) e **sempre allo stesso modo per Viga** (24/24). Se la compilazione del server e quella del client ricevono forme diverse, ottengono hash e quindi classi diverse. Si è visto anche una volta in locale (una build da zero con `NEXT_DIST_DIR` diverso: server `9302a3`, CSS `a1624c`). In produzione l'identificativo di distribuzione (`dpl_6FLKwpe9…`) e i file di font sono coerenti tra HTML e CSS (nessuna cache vecchia), quindi la divergenza sta solo nel testo del CSS. In locale (Windows) le classi coincidevano nelle build normali, per questo nessun test se ne accorgeva.

**Rimedio applicato (`:root`, commit `9889fc6`):** `:where(:root) { --font-nunito: "Nunito", "Nunito Fallback"; --font-viga: "Viga", "Viga Fallback"; }` in `styles/globals.css`, specificità 0: se la classe di next/font coincide vince lei, altrimenti restano queste. **Non sono hash copiati dalla build**: sono i nomi semplici delle famiglie che next/font dichiara nei suoi `@font-face` (verificato su build locale e produzione) e coincidono con `nunito.style.fontFamily` / `viga.style.fontFamily` (`'Nunito', 'Nunito Fallback'` / `'Viga', 'Viga Fallback'`). Sono scritti a mano, non ricavati a runtime: per questo `tests/regressione/font.spec.mjs` controlla che coincidano con i `@font-face` (se una versione futura di Next cambiasse i nomi, il test fallisce).

**Test (`font.spec.mjs`, `font-comune.mjs`, `font-webkit.mjs`; `playwright.config.mjs` accetta `URL_BASE`):** in Chromium si chiede al motore quale font ha disegnato il testo (`CSS.getPlatformFontsForNode`: deve essere un **font web** Nunito/Viga, un Nunito installato nel sistema non passa); nessun elemento con font diverso da Nunito/Viga né `body` in un serif; WebKit in un processo separato (dentro il lanciatore di Playwright Test `webkit.launch()` si chiude subito su questo PC); rete di sicurezza auto-verificante e segnalazione del disallineamento delle classi. Provati: contro la produzione attuale falliscono con il sintomo esatto; sulla build locale passano; con il disallineamento simulato localmente passano **con** il rimedio e falliscono **senza**. Suite rapida: 151/151 (145 + 6).

**Correzione alla radice — NON applicata (decisione aperta).** Per rendere deterministico l'hash servirebbe togliere la variabilità di Google Fonts: (a) `next/font/local` con i file dei font nel repository (Nunito e Viga hanno licenza OFL): nessuna rete in build, stessi byte e stesso CSS per server e client, build riproducibili anche offline; costo: i file nel repository e il rifacimento della dichiarazione dei pesi/subset, da verificare con la suite visiva; (b) fissare le risposte di Google (`NEXT_FONT_GOOGLE_MOCKED_RESPONSES`, pensato per i test, non per la produzione). Finché non si decide, il rimedio sul `:root` basta (il font si vede correttamente anche con classi disallineate) e il test segnala il disallineamento senza far fallire.

**Da fare dopo il merge:** `URL_BASE=https://aletheiasrl.vercel.app npx playwright test tests/regressione/font.spec.mjs` contro la produzione. **La prova su iPad vero resta da fare** (prima del passaggio dei DNS).

## Ottimizzazione mobile – Fase 2 e 3 (4 novembre 2026): layout e touch per telefoni, tablet e laptop da 12-13"

Branch `ottimizzazione-mobile` (HEAD `0c57f25`), 12 commit sopra `master` `022ae44` (8 interventi sul sito, 4 di test e documentazione). Report con screenshot: `Desktop\ottimizzazione-mobile-fase1\REPORT-fase1.md`; confronto visivo prima/dopo a 390 e 768 px: `Desktop\confronto-mobile-ottimizzazione\index.html` (58 coppie, fuori dal repository).

**Interventi applicati (un commit ciascuno, tutti solo CSS/comportamento, nessun cambio di contenuto o SEO)**
1. `31a02cb` + `43b0e63` – **Header**: compatto tra 1024 e 1279 px e **hamburger fino a 1023 px** (era 768 px). Prima, tra 769 e 1170 px "Piattaforma" usciva dallo schermo (118 px a 1024, 312-326 px a 820-844): iPad Air/Pro 11" in verticale, iPad mini/Pro 12.9" in orizzontale, telefoni in orizzontale. *Errore corretto lungo il percorso:* nel primo commit avevo supposto che sotto i 993 px ci fosse già l'hamburger; la verifica a tappeto (24 dimensioni x 7 pagine) ha dimostrato il contrario.
2. `eed3013` – **/all-courses**: sidebar sticky solo da 1024 px con altezza massima e scorrimento interno (prima copriva le card su telefono e iPad verticale, e su schermi bassi il fondo era irraggiungibile); griglia a massimo 3 colonne larghe almeno 240 px (a 1024 e 1280 px: 2 colonne da ~330 px invece di 3 da ~210; a 390, 768 e da 1366 px identica a prima).
3. `edbbf34` – **Menu**: blocco dello scroll sotto il menu (anche Lenis, che muove la pagina con scroll programmatico), chiusura con Escape col focus all'hamburger, `pointerdown` al posto di `mousedown` per chiudere mega-menu, "Piattaforma" e dropdown della ricerca toccando fuori (iOS non genera `mousedown` sui tocchi su elementi non interattivi).
4. `ced2cc2` – **Menu mobile**: link "Scopri tutti i corsi" (come nel mega-menu desktop; stesso codice di `contenuti-immagini-preventivo`) e margine in fondo di 12 rem: il banner cookie copriva gli ultimi link del pannello.
5. `5b6e172` + `7b28c9c` – **Touch** (`@media (pointer: coarse)`, il mouse non cambia): campi a 16 px (niente zoom di iOS), token `--btn-height-sm/md/lg` a 44/48/52 px, tema/frecce/schede/opzioni/chat a 44 px, area cliccabile dei link in elenco ampliata con `::after` trasparente. *Errore corretto:* la prima versione (`min-height: 44px` sui link del footer) allungava ogni pagina di ~400 px a 390 px; ora 0-25 px (misurato con e senza puntatore "coarse").
6. `c7b2ced` – **Riferimenti dei test** aggiornati per il solo link "Scopri tutti i corsi": verificato su 113 URL (1 identico, 112 diversi solo per +21 caratteri di testo visibile, in 70 anche `/all-courses` nell'elenco link; status, lang, title, description, robots, canonical, OG, Twitter, JSON-LD, H1, immagini invariati).

**Provato e annullato:** `priority` sull'immagine di testata delle news. Resource load delay 307 → 24 ms ma LCP 4841 → 4796 ms, Performance 81 → 79 (rumore): il tempo è tutto nell'*element render delay* (0,4 s oppure 2,3 s a seconda della passata), non nel caricamento pigro. Misura in `tests/riferimenti/lighthouse/mobile-news-priority.json`. Causa da indagare con l'LCP osservato (non simulato) e col costo di idratazione.

**Verifiche finali**
- Suite rapida: 145/145 sul codice prima del ritocco touch; sull'ultimo (`7b28c9c`) **144/145** nella corsa completa, l'unico fallimento è un `page.goto` in timeout (`net::ERR_ABORTED`, 120 s) sulla pagina della news, **non** una differenza visiva; lo stesso test, rilanciato due volte sullo stesso build, passa in 3,7 s.
- Verifica a tappeto 24 dimensioni (telefoni 320-932 px, iPad mini/Air/Pro in entrambe le orientazioni, laptop 1152-1536 px) x 7 pagine: **0 anomalie** (overflow orizzontale, header fuori schermo, sidebar sovrapposta). Menu provato in WebKit (WebKit 26.5 di Playwright) e Chromium: apertura, Formazione, "Scopri tutti i corsi", Escape, "Piattaforma" al tocco.
- Misurato a 390 px: campi sotto i 16 px da 1-7 a 0 per pagina; aree sotto i 44 px da 35-44 a ~10-17; scroll dietro il menu aperto da +547 a 0 px.
- **Lighthouse mobile, mediana di 3 passate, base → finale** (`mobile-base.json` → `mobile-finale.json`, stessa macchina e procedura; codice finale poi ritoccato solo con CSS sotto `pointer: coarse`): JS KB, CLS (0) e Accessibilità **identici su tutte le pagine**; Performance e LCP dentro la dispersione (es. `/all-courses` 71 → 83 solo perché la mediana ha pescato due passate "veloci" di ~2 s invece di due "lente" di ~5 s: le singole passate sono le stesse due modalità). Home 97 → 96, contatti 97 → 99, calendario 98 → 94 (TBT 73 → 140), news 81 → 77 (3 passate su 3 più basse: 72/77/79 contro 80/82/81; TBT 89 → 197): non dimostrato come regressione né spiegato, **da ricontrollare con 5 passate** sull'anteprima. Lighthouse desktop **non** rifatto in questa fase (a 1440 px gli screenshot sono identici e sopra i 1280 px il CSS non cambia).

**Verifica iPad in WebKit prima del merge (4 novembre 2026)** — WebKit 26.5 di Playwright (profilo iPad con touch e DPR 2), build di produzione dello stesso codice dell'anteprima (`9b6dedf`; dopo di esso solo documentazione e test). 12 misure x 7 pagine (home, `/all-courses` con e senza `?categoria=`, `/all-courses/antincendio`, `/calendario-corsi`, `/contatti`, una news) = 84 caricamenti, più le prove di tocco su `/all-courses` per ogni misura. **Zero problemi su tutte le righe.** Controlli per riga: nessun overflow orizzontale; header completo dentro lo schermo con "Piattaforma" visibile e toccabile (il punto centrale colpisce il pulsante); sidebar che non copre le card; la chat non si sovrappone al banner né copre elementi cliccabili (a 4 posizioni di scroll); menu al tocco funzionante. Screenshot: `Desktop\ottimizzazione-mobile-fase1\ipad-finale\<larghezza>x<altezza>-all-courses.png` (più `-menu-aperto`/`-mega-menu`/`-piattaforma`).

| Misura (px) | Header | Menu al tocco | Spazio libero tra menu e pulsanti | Sidebar | Screenshot |
|---|---|---|---|---|---|
| iPad mini 6 verticale 744x1133 | hamburger | apre, Formazione, Escape e pulsante chiudono, scroll bloccato | – | non sticky, non copre | `744x1133-all-courses.png` |
| iPad mini 6 orizzontale 1133x744 | desktop compatto | mega-menu e "Piattaforma" aprono, si chiudono toccando fuori | 111 px | sticky, non copre | `1133x744-all-courses.png` |
| iPad 9,7"/mini 5 verticale 768x1024 | hamburger | come sopra | – | non sticky, non copre | `768x1024-all-courses.png` |
| iPad 9,7"/mini 5 orizzontale 1024x768 | desktop compatto | come sopra | **26 px** | sticky, non copre | `1024x768-all-courses.png` |
| iPad Air verticale 820x1180 | hamburger | come sopra | – | non sticky, non copre | `820x1180-all-courses.png` |
| iPad Air orizzontale 1180x820 | desktop compatto | come sopra | 158 px | sticky, non copre | `1180x820-all-courses.png` |
| iPad Pro 11" verticale 834x1194 | hamburger | come sopra | – | non sticky, non copre | `834x1194-all-courses.png` |
| iPad Pro 11" orizzontale 1194x834 | desktop compatto | come sopra | 172 px | sticky, non copre | `1194x834-all-courses.png` |
| iPad Pro 12,9" verticale 1024x1366 | desktop compatto | come sopra | **26 px** | sticky, non copre | `1024x1366-all-courses.png` |
| iPad Pro 12,9" orizzontale 1366x1024 | desktop | come sopra | 188 px | sticky, non copre | `1366x1024-all-courses.png` |
| iPad Pro 13" verticale 1032x1376 | desktop compatto | come sopra | **34 px** | sticky, non copre | `1032x1376-all-courses.png` |
| iPad Pro 13" orizzontale 1376x1032 | desktop | come sopra | 198 px | sticky, non copre | `1376x1032-all-courses.png` |

Banner cookie: alto 6-10% dello schermo su tutte le misure. Resta, fino alla scelta, **un solo elemento cliccabile sotto il banner a fine pagina** (il link in fondo al footer): comportamento del banner fisso, non toccato in questa fase. Lo scroll bloccato è verificato con il tasto Fine (che con il menu chiuso scorre la pagina: la prova "sente" lo scroll).

*Header a 1024 e 1032 px (iPad da 13" in verticale e iPad mini 5 in orizzontale), misurato in WebKit:* margine destro 16 px; logo→menu 20 px; **ultimo link→icona tema 26 px a 1024 e 34 px a 1032**; tema→"Sei un docente? Candidati" e questo→"Piattaforma" 8 px (12 px da 1040 px); l'icona del tema sta in un riquadro da 44 px, quindi a vista il distacco da "Contatti" è maggiore dei 26 px. **Giudizio: sta, non è al limite** (nessuna sovrapposizione, nessun elemento tagliato, tutto toccabile), ma senza molta riserva. Il punto più stretto in assoluto non è 1024 ma **1040 px (18 px liberi)**, dove la compattazione cambia livello. Non ho alzato la soglia dell'hamburger (1023 px): lo si farebbe solo se si prevede di aggiungere voci al menu o di allungare le etichette (una voce in più, ~70-90 px, farebbe uscire il gruppo di destra fino a circa 1100-1130 px). Alzarla a 1099 px darebbe l'hamburger a iPad mini 5 e Pro 12,9"/13" in verticale e a iPad 10,2" in orizzontale (1080 px): si perde l'header desktop su quei dispositivi. **Decisione del committente (4 novembre 2026): la soglia resta a 1023 px.** **Promemoria per chi modifica il menu:** se si aggiungono voci al menu o si allungano le etichette (compresi "Sei un docente? Candidati" e "Piattaforma"), **ricontrollare l'header tra 1024 e 1130 px**, in WebKit e in Chromium, prima di pubblicare: oggi lo spazio libero è 26 px a 1024 px, 34 px a 1032 px e 18 px a 1040 px, e una voce in più farebbe uscire il gruppo di destra dallo schermo.

**Non fatto / da decidere**
- **Banner cookie come elemento LCP** (causa dimostrata del 2,3 s su `/all-courses` e pagine corso): **approvato, ma su un branch separato** (vedi "Decisioni del 4 novembre" qui sotto).
- Font Awesome da cdnjs bloccante (~1,1 s stimati), `LazyMotion` per la griglia dei corsi (JS 192 KB, TBT 305-469 ms), logo servito a 640 px: non toccati.
- Soglia delle aree cliccabili: la skill dice 48 px, ho usato 44 px (Apple) e per i link in elenco ~32 px senza allungare il footer. **Scelta confermata** (vedi sotto).
- **Safari/iPadOS reale — ANCORA DA FARE, prima del passaggio dei DNS** (il dominio reale non punta ancora a Vercel): il WebKit di Playwright non riproduce alcuni comportamenti di iOS; la chiusura dei menu al tocco fuori (`pointerdown`), lo zoom al focus e `100vh` vanno provati su un iPad vero, in verticale e in orizzontale. Modello di iPad e versione di iPadOS ancora da comunicare (Next 16 assume Safari ≥ 16.4). Esito: *da compilare* (modello ____, iPadOS ____, verticale ____, orizzontale ____). Il merge in `master` è stato autorizzato prima di questa prova perché il sito reale non è ancora esposto.

**Decisioni del 4 novembre 2026**
1. **Pubblicazione:** si pubblica solo il branch `ottimizzazione-mobile` (mai `master`), per la prova su iPad su anteprima Vercel. **Il merge in `master` aspetta l'ok del committente dopo quella prova** (modello di iPad e versione di iPadOS da comunicare: Next 16 assume Safari ≥ 16.4).
2. **Aree cliccabili — scelta di progetto, non un difetto:** pulsanti a **44 px**, link in elenco a circa **32 px** (area ampliata con `::after`, senza sovrapposizioni). **Niente 48 px: il footer non deve crescere.** Questo si discosta dalla soglia di 48 px della skill ed è voluto.
3. **Banner cookie come elemento LCP — approvato su un branch separato** `banner-cookie-lcp`, creato da `master` **dopo** il merge di `ottimizzazione-mobile`. Vincoli: nessun lampeggio all'apertura; comportamento di consenso identico (scelta memorizzata come oggi, il banner non ricompare dopo la scelta); pulsanti Accetta e Rifiuta con lo stesso risalto; nessun cookie non tecnico prima del consenso. Misura LCP prima/dopo con **5 passate** su `/all-courses`, su una pagina corso e su una news.
4. **Test instabile noto:** `visivo.spec.mjs` › `/news/bonus-giovani-under-35-aprile-2026 1440px chiaro` è andato una volta in timeout di navigazione (`page.goto`, `net::ERR_ABORTED`, 120 s) in una corsa completa, ed è poi passato due volte su tre da solo (3,7 s) con lo stesso build. È un fallimento intermittente dell'infrastruttura, non una regressione; non richiede interventi.
5. **`contenuti-immagini-preventivo` non va unito:** il committente vuole prima rivederlo (riepilogo dei suoi 5 commit preparato a parte).

**Merge e rollback**
- Conflitti attesi tra `ottimizzazione-mobile` e `contenuti-immagini-preventivo` (prova con `git merge-tree`): un solo file, `pages/all-courses/index.js` (la sidebar). `components/Header.tsx`, `pages/index.js` e `styles/globals.css` si uniscono da soli, compreso il link "Scopri tutti i corsi" (identico nei due branch). Risolvere `all-courses/index.js` a favore di `ottimizzazione-mobile` (sticky solo da 1024 px + scorrimento interno, classe `catalog-sidebar`) e verificare che la griglia usi `catalog-grid`.
- Dopo l'unione dei due branch rigenerare i riferimenti di metadata con le stesse verifiche di `c7b2ced` (HTML prima/dopo su tutti gli URL, poi aggiornamento con motivazione): `contenuti-immagini-preventivo` cambia pagine e testi alternativi, e non ha aggiornato i riferimenti.
- Rollback: `git revert -m 1 <commit di merge>` e push (o su Vercel: Deployments → deployment precedente → Promote to Production). Ogni intervento è un commit separato e si può annullare da solo (`git revert <hash>`).

## Stato al rientro (3 novembre 2026, sera) – da leggere per primo

**Aggiornamento di fine giornata (3 novembre 2026, 17:30)**
- **Push fatto:** `migrazione-app-router` (HEAD `b97a741`, con `--webpack`, next/font e diagnosi LCP) → anteprima Vercel (build riuscita): https://aletheia-lzkg6hik8-areait-dev.vercel.app . `master` e `migrazione-app-router-backup` mai pushati. Eventuali commit successivi di sola documentazione restano locali finché non si pusha di nuovo.
- **Confronto mobile per il controllo manuale** (fuori dal repository, test e riferimenti non toccati): `C:\Users\VSCODE\Desktop\confronto-mobile\index.html`: 8 pagine a 390 px, tema chiaro, pagina intera, prima (Next 13.4.0, tag `riferimenti-next-13.4.0`) e dopo (Next 16.4.4, webpack), con coppia affiancata e immagine delle differenze. Pixel diversi: home 0,13%, news-bonus-giovani 0,03%, contatti 0,01%, tutte le altre 0,00%; altezze identiche. Nessuna pagina sopra l'1%. Nota di metodo: per la base i file dei font (`fonts.gstatic.com`, woff2 di oggi) sono stati scaricati dalla rete reale perché le copie locali erano di una versione precedente; il resto è servito dalle copie locali.
- Prossimo passo domattina: guardare a occhio `confronto-mobile/index.html` e l'anteprima Vercel, poi decidere la correzione dell'LCP (banner cookie, vedi sotto).

**Diagnosi dell'LCP di `/all-courses/antincendio` (fatta con Lighthouse mobile, 3 passate per caso, stesse condizioni, base 13.4.0 rifatta da un worktree del tag)**
- **Non c'è un peggioramento reale dell'LCP.** Rimisurato nelle stesse condizioni, `/all-courses/antincendio`: base mediana **3294 ms** (singole passate 1915 / 3294 / 4871), ora **3475 ms** (5288 / 3475 / 3473). `macchine-movimento-terra`: base 3502 (5066 / 2054 / 3502), ora 3549 (5297 / 3476 / 3549). Il "2112 → 4076" della tabella precedente era un confronto tra due estrazioni diverse di una distribuzione molto dispersa (la base del 2 novembre aveva avuto una passata fortunata): valgono per **tutte le pagine corso**, non solo antincendio. FCP uguale (~1,9 s) in tutti i casi; TBT migliore ora.
- **Perché l'LCP è così variabile (1,9 s – 5,3 s, sia sulla base sia ora):** l'elemento LCP **non è il contenuto del corso ma il paragrafo del banner cookie** ("Utilizziamo cookie tecnici e, previo consenso, …", `components/CookieConsent.tsx`), che compare solo dopo l'idratazione (`useEffect` → `setVisible`). Lighthouse parte senza consenso salvato; l'istante in cui il banner appare dipende dalla fine dell'idratazione sotto CPU rallentata 4x (task lunghi di 100–180 ms attorno a 0,8 s e 2,5–3,8 s), quindi l'LCP "salta" tra i due-tre valori. Reveal e CSS bloccante non sono la causa: il "render delay" dell'elemento è 360–1280 ms, il TTFB 8–26 ms. (Nei test automatici il banner è nascosto perché `cookie-consent` è già accettato.)
- **Bundler:** la build attuale usava **Turbopack** (`Next.js 16.4.4 (Turbopack)`).
- **Da dove vengono i +95–104 KB di JavaScript (trasferiti, antincendio mobile: 211 → 315 KB):**
  - chunk della pagina: invariato (102,6 → 99,9 KB);
  - runtime (React-DOM 19 + Next 16): `framework` 44,7 KB → `0z-r5z7i5p1ms.js` 73,4 KB (≈ +29 KB), `main` 26,6 → ~14–19 KB;
  - **chunk aggiuntivi di Turbopack**: `3yhizvc89nfj0.js` 39,9 KB (contiene framer-motion `MotionConfig` e scheduler), `0g4t-29geem8h.js` 17,0 KB, `0jo86oyqcvu1z.js` 13,2 KB (Chatbot, caricato con `dynamic`), più altri piccoli: circa +60 KB.
  - **Prova di controllo:** stessa build con `--webpack`: **253 KB** invece di 315 (base 211): il bundler spiega circa 62 dei +104 KB; i restanti ~42 KB sono il runtime di React 19/Next 16.

**Modifica applicata (solo configurazione, commit separato):** `next build --webpack` (script `build` in `package.json` e `tests/regressione/build-test.mjs`). Verifica: suite rapida **32/32 non-metadata passati** (screenshot, interazioni, chat identici); i 113 riferimenti di metadata cambiano solo per il nome di classe generato da `next/font` (dipende dal bundler), rigenerati e controllati riga per riga. Lighthouse home (3 passate): mobile LCP **1928 ms** (base 1943), CLS **0**, JS 153 KB (Turbopack 161; base 123); desktop LCP **682 ms** (base 775), CLS 0; antincendio mobile JS **253 KB** (Turbopack 315). Nota: `--webpack` è il ripiego previsto da Next 16 (Turbopack è il predefinito): ricontrollare a ogni aggiornamento maggiore se resta disponibile.

**Correzione proposta per domattina (non applicata, tocca il markup/comportamento):** rendere l'LCP stabile non dipendente dal banner cookie, in ordine di preferenza: (1) mostrare il banner senza che sia il candidato LCP più grande (testo più piccolo del contenuto principale, o `position: fixed` con dimensioni contenute) oppure renderlo già nell'HTML del server con un flag in `localStorage` letto prima del paint; (2) ridurre il lavoro di idratazione (lazy `dynamic()` di framer-motion/`ThemeToggle`, `Chatbot` più tardi). Prima di toccare il markup serve misurare l'effetto con Lighthouse (3 passate) e confermare l'aspetto con la suite rapida. Il confronto "base vs ora" per l'LCP va fatto sempre con più passate e sulle mediane, mai con una passata sola.

**Altro rimasto aperto:** controllo manuale mobile (390/768 px) sull'anteprima; `JavaScript +` residuo con webpack (home +30 KB, antincendio +42 KB) dovuto al runtime di React 19/Next 16.

## Stato al rientro (3 novembre 2026)

**Passo 4 – Font con `next/font/google` (3 novembre 2026, commit `ecb3267`)**
- Nunito (300–900, normale) e Viga (400), `display: swap`, self-hosted da `next/font/google` (`lib/fonts.js`); via i link a Google Fonts da `_document`. Variabili `--font-nunito`/`--font-viga` su `<html>` (`_document`) **e** sul wrapper di `_app` (l'import in `_app` è necessario: solo in `_document` il CSS dei font non entra nel bundle e il testo usciva in serif). `globals.css` e `tailwind.config.js` usano `var(--font-nunito)`. `next/font/google` scarica i font da Google **durante la build** (ok su Vercel; una build senza rete fallirebbe).
- Suite rapida: screenshot a 1440 px, interazioni e chat **identici**; cambiano solo i 113 riferimenti di metadata (link font rimossi, classe sull'`<html>`), rigenerati dopo aver controllato il diff riga per riga.
- **Lighthouse base (Next 13.4.0) → Next 16.4.4 con next/font** (mediana di 3 passate):

| Forma | Pagina | Perf | A11y | BP | SEO | LCP ms | TBT ms | CLS | JS KB |
|---|---|---|---|---|---|---|---|---|---|
| mobile | / | 91 → 97 | 97 → 97 | 100 → 100 | 100 → 100 | 1943 → 1915 | 218 → 110 | 0 → 0 | 123 → 161 |
| mobile | /calendario-corsi | 93 → 97 | 96 → 96 | 100 → 100 | 100 → 100 | 2002 → 1833 | 133 → 68 | 0 → 0 | 119 → 154 |
| mobile | /chi-siamo | 97 → 96 | 97 → 97 | 100 → 100 | 100 → 100 | 1956 → 2015 | 35 → 79 | 0.006 → 0 | 121 → 159 |
| mobile | /all-courses/antincendio | 89 → 85 | 97 → 97 | 100 → 100 | 92 → 92 | 2112 → 4076 | 278 → 80 | 0 → 0 | 220 → 315 |
| desktop | / | 99 → 99 | 97 → 97 | 100 → 100 | 100 → 100 | 775 → 690 | 0 → 0 | 0.004 → 0 | 123 → 161 |
| desktop | /calendario-corsi | 100 → 100 | 96 → 96 | 100 → 100 | 100 → 100 | 657 → 657 | 0 → 0 | 0.002 → 0 | 119 → 154 |
| desktop | /chi-siamo | 99 → 99 | 97 → 97 | 100 → 100 | 100 → 100 | 801 → 707 | 0 → 0 | 0.003 → 0 | 121 → 159 |
| desktop | /all-courses/antincendio | 97 → 97 | 97 → 97 | 100 → 100 | 92 → 92 | 1187 → 1201 | 0 → 0 | 0.001 → 0 | 220 → 315 |

- **Home:** LCP mobile 1943 → 1915 ms, CLS mobile 0 → 0 (era 0,111 prima del cambio font); desktop LCP 775 → 690 ms, CLS 0,004 → 0. Tornano alla base o migliorano.
- **Ancora peggio della base, spiegazione parziale:** `/all-courses/antincendio` mobile LCP 2112 → 4076 ms (Perf 89 → 85): il cambio font **non** lo risolve, quindi la causa NON era (solo) il font; da indagare (elemento LCP = paragrafo di testo; ipotesi non verificate). JavaScript trasferito +30% (123 → 161 KB; 220 → 315 KB) con Next 16/React 19, non scomposto. Migliorano TBT e Perf di calendario e home mobile.

**Passo 3 – Next 16.4.4: suite completa e Lighthouse (3 novembre 2026)**
- **Suite completa** (`npm run test:regressione`, 1 worker, screenshot solo a 1440 px): **199/199 passati** (13,3 min).
- **Lighthouse, base (Next 13.4.0) → finale (Next 16.4.4)**, stessa macchina, mediana di 3 passate:

| Forma | Pagina | Perf | A11y | BP | SEO | LCP ms | TBT ms | CLS | JS KB |
|---|---|---|---|---|---|---|---|---|---|
| mobile | / | 91 → 93 | 97 → 97 | 100 → 100 | 100 → 100 | 1943 → 1902 | 218 → 80 | 0 → 0.111 | 123 → 161 |
| mobile | /calendario-corsi | 93 → 98 | 96 → 96 | 100 → 100 | 100 → 100 | 2002 → 1826 | 133 → 56 | 0 → 0.001 | 119 → 154 |
| mobile | /chi-siamo | 97 → 93 | 97 → 97 | 100 → 100 | 100 → 100 | 1956 → 2400 | 35 → 123 | 0.006 → 0 | 121 → 159 |
| mobile | /all-courses/antincendio | 89 → 83 | 97 → 97 | 100 → 100 | 92 → 92 | 2112 → 4338 | 278 → 115 | 0 → 0.021 | 220 → 315 |
| desktop | / | 99 → 99 | 97 → 97 | 100 → 100 | 100 → 100 | 775 → 728 | 0 → 0 | 0.004 → 0.003 | 123 → 161 |
| desktop | /calendario-corsi | 100 → 100 | 96 → 96 | 100 → 100 | 100 → 100 | 657 → 676 | 0 → 0 | 0.002 → 0.001 | 119 → 154 |
| desktop | /chi-siamo | 99 → 99 | 97 → 97 | 100 → 100 | 100 → 100 | 801 → 717 | 0 → 0 | 0.003 → 0.002 | 121 → 159 |
| desktop | /all-courses/antincendio | 97 → 96 | 97 → 97 | 100 → 100 | 92 → 92 | 1187 → 1295 | 0 → 0 | 0.001 → 0.001 | 220 → 315 |

- **Peggioramenti e spiegazione** (non nascosti):
  1. **Foglio Google Fonts non più incorporato nell'HTML** (Next ≤14 lo incorporava in build, da 15 no). Lighthouse lo segnala come risorsa che blocca il rendering (circa 870 ms stimati, più Font Awesome da cdnjs ~1,2 s, già presente prima). Spiega con buona probabilità: LCP mobile di `/all-courses/antincendio` 2112 → 4338 ms (Perf 89 → 83; l'elemento LCP è un paragrafo di testo, quindi dipende dal font), `/chi-siamo` mobile 1956 → 2400 ms (Perf 97 → 93) e il **CLS della home mobile 0 → 0,111** (spostamento dell'elemento `section.hero > div > div.container > div.relative`, coerente con lo scambio del font; il legame col font è un'ipotesi, non provato con una prova di controllo).
  2. **JavaScript trasferito +30%** (123 → 161 KB, 219/220 → 315 KB): runtime di React 19 + Next 16 più grande; non scomposto chunk per chunk.
  - Migliorano: TBT (home mobile 218 → 80 ms, calendario 133 → 56 ms, antincendio 278 → 115 ms), Perf calendario mobile 93 → 98.
  - Desktop: nessuna variazione significativa (Perf 96–100).
- **Rimedi possibili, NON applicati (cambiano l'architettura dei font, da decidere):** (a) `next/font/google` (self-hosting, niente richiesta a Google: probabile ritorno alla base; richiede di rivedere `--font-viga`/`_document`); (b) incorporare a mano nello `<head>` il CSS del foglio font (come faceva Next ≤14), con il rischio di URL dei file da aggiornare a mano.

**Passo 2 – Fase 1b**
- **13.4.0 → 13.5.11** (React 18.2): suite rapida 144/145 passati. Unica differenza: la pagina 404 predefinita di Next (altezza di riga diversa: divisore verticale più alto, testo spostato di pochi pixel; stesso testo, status 404). Cambio dovuto a Next, non al sito: riferimento `url-inesistente-404-1440-chiaro.png` aggiornato (gli altri riferimenti non toccati). Se si vuole la 404 identica alla 13.4 serve un `pages/404.js` che riproduca il markup vecchio (non fatto).

- **13.5.11 → 14.2.35**: suite rapida 145/145 passati, nessuna correzione.

- **14.2.35 → 15.5.28 + React 19.3.1** (codemod ufficiale `@next/codemod upgrade`; tipi 19 con `overrides`; build con controllo dei tipi senza errori; il codemod dei tipi non ha modificato file). Tolte dal risultato del codemod le aggiunte non volute: `eslint`, `eslint-config-next`, `eslint.config.mjs`, `--turbopack` nello script `dev`. Suite rapida 145/145 dopo queste correzioni:
  - **Regressione trovata e corretta:** con React 19 un `<title>` con più figli (`{course.title} - Alètheia Srl`) esce **vuoto** (57 URL: `/all-courses/*`, `/news/*`, `/aiuti-di-stato/*`). Corretto con un'unica stringa (template literal) in `pages/all-courses/[slug].js`, `pages/news/[slug].js`, `pages/aiuti-di-stato/[anno].js`. Il testo del titolo è identico a prima.
  - **Cambio di comportamento di Next 15 (da ricontrollare con Lighthouse):** Next ≤14 *incorporava* nell'HTML il CSS di Google Fonts durante la build (e aggiungeva un secondo `preconnect` a `fonts.gstatic.com`); da 15 questa ottimizzazione non c'è più, quindi il browser richiede il foglio `fonts.googleapis.com/css2?…` a runtime. Aspetto identico, ma una richiesta in più sul percorso di rendering (possibile effetto su LCP/FCP). Alternativa se peggiora: `next/font/google` (self-hosting), che però cambia l'architettura dei font: da decidere, non fatta.
  - Riferimenti di metadata rigenerati (113 JSON): solo `preconnect`/link font e titoli senza i marcatori `<!-- -->` dei commenti React. Copie di rete: aggiunta quella del foglio font (`tests/riferimenti/rete/`); `rete.mjs` con `AGGIORNA_RETE=1` registra ora solo le copie mancanti (`RETE_SOVRASCRIVI=1` per rifare tutte).

- **15.5.28 → 16.4.4** (Pages Router, Turbopack predefinito, nessun `--webpack` necessario: CSS e aspetto invariati). Fatto come concordato: script `lint` rimosso (e riga in `CLAUDE.md`), `images.domains` → `remotePatterns` con gli stessi tre domini (+ host di `WP_URL`), `data-scroll-behavior="smooth"` su `<Html>` in `_document`, `engines.node >=20.9.0` (Vercel: Node 24.x verificato). `tsconfig.json` aggiornato in automatico da Next (`jsx: react-jsx`, `moduleResolution: bundler`).
  - **Cartella `app/` vuota rimossa** (non era tracciata da Git, quindi non esiste su Vercel): con Next 16 la sola presenza di `app/` fa gestire gli URL inesistenti all'App Router, che salta `_app` (niente chat né JSON-LD sulla 404) e mostra un'altra 404.
  - **`pages/404.js` aggiunto**: riproduce esattamente la 404 predefinita di Next 13.4 (markup/stili/testo ripresi dal pacchetto 13.4.0) e passa da `_app` come prima. Riporta anche l'aspetto al look originale (quello di 13.5 aveva altezza di riga diversa): riferimento `url-inesistente-404-1440-chiaro.png` rigenerato con questo look. Se un giorno si vuole una 404 in stile del sito, si cambia solo questo file.
  - Suite rapida: 145/145 dopo queste correzioni.

**Passo 1 – stabilizzazione screenshot (in corso, quasi chiuso)**
- Applicato in `tests/regressione/pagina.mjs`: immagini forzate `loading="eager"` con `naturalWidth > 0` (decode con limite 5 s), `<Reveal>` forzati visibili, attesa dell'idratazione, scatto dopo due letture uguali dell'altezza a 500 ms, 2 worker (default in `playwright.config.mjs`).
- **Causa principale trovata:** l'HTML del server serializza lo stile dei `<Reveal>` senza spazi (`opacity:0`), il selettore e l'attesa cercavano la forma con spazi: se lo scatto partiva prima dell'idratazione i `<Reveal>` restavano invisibili. Corretto.
- Riferimenti rigenerati dal codice del tag (identico al branch salvo `package.json`). Primo confronto dopo la rigenerazione: 221 passati, 9 falliti, tutti a 390/768 px (7) o su `/all-courses…` (1 a 1440 scuro); **tutti i 1440 chiaro verdi**. Il secondo confronto è stato interrotto dal sistema per memoria.
- **Decisione per la regola concordata:** 390 e 768 px restano instabili (soprattutto `/all-courses`, pagina lenta) → screenshot automatici **solo a 1440 px** (`LARGHEZZE` in `tests/regressione/util.mjs`; `LARGHEZZE_COMPLETE=1` per riprovare tutte). **Mobile (390/768): controllo manuale sull'anteprima Vercel**, da fare a fine aggiornamento.
- **Esito finale del passo 1:** due confronti consecutivi a 1440 px (82 test, 1 worker): 79 e 80 passati. Due fallimenti identici in entrambi erano un **riferimento sbagliato** (un'immagine non caricata nel PNG di riferimento: `/all-courses?categoria=sicurezza-lavoro` scuro, `/all-courses/antincendio?livello=2` chiaro), rigenerati. Resta un'intermittenza reale: nelle pagine `/all-courses/*` l'immagine della card "Formazione Dei Lavoratori" a volte non si carica nel browser di test (alt text al posto della foto): i test ora ritentano fino a 3 volte le immagini rotte prima dello scatto (5 ripetizioni su 5 verdi). Da tenere d'occhio come possibile flake (non verificato se dipende dall'ottimizzatore `/_next/image` sotto carico).
- Nota: le esecuzioni con più worker o in parallelo con altri programmi possono essere fermate dal sistema per memoria; il server di test lasciato sulla porta 3101 va chiuso prima di rilanciare.

## Stato al rientro precedente (2 novembre 2026, sera)

**Cosa è stato fatto oggi**
- Fase 0: analisi (report più sotto).
- Fase 1: rete di sicurezza (Playwright) sul codice di `master` (`f25d7fd`) con Next 13.4.0: 113 URL, 75 redirect, 37 URL con screenshot × 3 larghezze × 2 temi = 222 screenshot, 11 tracce di interazione, test chat, rete simulata (copie locali di font e immagini esterne). Dettagli in "Infrastruttura di test".
- Lighthouse di base su Next 13.4.0 (risultati in `tests/riferimenti/lighthouse/base.json`, tabella qui sotto).
- Commit separati: infrastruttura di test; `DATA_FISSA_TEST` in `pages/index.js` (da solo); riferimenti (JSON, copie di rete, Lighthouse); `MIGRAZIONE.md`. **Gli screenshot PNG non sono mai stati committati nel branch** (cronologia riscritta prima di qualsiasi push; copia di sicurezza del branch originale: `migrazione-app-router-backup`).
- **Non** è stato toccato nulla di `package.json` (a parte lo strumento di test già committato), `node_modules` né la versione di Next. Nessun push.

**Esito dei due confronti consecutivi (stesso codice, nessuna modifica nel mezzo)** — NON verdi
- Esecuzione 1: 317 passati, 30 falliti (45 min). Esecuzione 2: 317 passati, 30 falliti (48 min).
- **Tutti i 60 fallimenti sono screenshot.** Metadata e HTML grezzo (115 test), interazioni (11 tracce), chat (2 test), 404 e redirect sono verdi in entrambe le esecuzioni: la parte SEO/contenuti/comportamento è stabile.
- 16 screenshot falliscono in entrambe le esecuzioni, altri 14 per esecuzione solo in una (instabilità casuale). Per larghezza (somma delle due esecuzioni): 390px → 23, 768px → 31, 1440px → 6.
- Falliscono in entrambe le esecuzioni: `/` 390 chiaro; `/` 768 scuro; `/agenzia-per-il-lavoro/servizi-alla-persona` 768 scuro; `/aiuti-di-stato/2024` 768 chiaro; `/all-courses` 390 chiaro, 390 scuro e 768 chiaro; `/all-courses/antincendio` 390 chiaro e 768 scuro; `/formazione/avviso-1-2026-poc` 390 chiaro; `/formazione/regionale` 390 chiaro; `/all-courses?categoria=sicurezza-lavoro` 768 chiaro, 390 scuro, 768 scuro e 1440 scuro; `/all-courses/antincendio?livello=2` 390 scuro.
- A 1440px i fallimenti sono 6 su 120 test-esecuzioni; in tema chiaro: `/all-courses?categoria=sicurezza-lavoro`, `/archivio/avviso-7-2023`, `/all-courses/antincendio?livello=2` (una volta ciascuno).

**Cause osservate (analisi delle immagini di differenza, non ancora corrette)**
1. **Loghi di certificazione ISO del footer** presenti in uno scatto e assenti nell'altro (regione di circa 87×87 px per logo, in fondo alla pagina): immagini sotto la piega non ancora arrivate o non ancora scambiate (varianti chiaro/scuro) al momento dello scatto.
2. **Card o sezioni intere mancanti** (es. la card "Formazione professionale" della home a 390px nel riferimento, le liste di `/all-courses`): contenuto non ancora reso/rivelato quando parte lo scatto. Anche **alcuni riferimenti** sono stati catturati in questo stato.
3. **Altezza di pagina diversa di decine di pixel** (es. `/archivio/avviso-7-2023` 4140 vs 4169 px): layout che si assesta dopo lo scatto (font/immagini).
4. Il carico della CPU con 3 worker peggiora tutto (le esecuzioni isolate sono più stabili).

**Problemi aperti**
- Stabilizzare gli screenshot **prima** di usarli come criterio di accettazione (proposte sotto, in "Primo passo di domani").
- **Suite rapida creata e provata una volta** (`npm run test:rapido`: build di test + `playwright test --grep @rapido`; 145 test = 115 metadata/HTML, 20 screenshot a 1440 px chiaro, 8 interazioni, 2 chat). Tempo misurato: **6 min 17 s** (377 s) build inclusa (stima iniziale: 10-12 min). Esito: **143 passati, 2 falliti**, entrambi screenshot a 1440 px chiaro: `/news` (circa 3,3% dei pixel diversi, regione di circa 400 px di altezza a metà pagina) e `/all-courses?categoria=sicurezza-lavoro` (circa 2,7%, stessa natura; già instabile nei due confronti completi). Nessuna copia di rete mancante. Stessa causa delle altre instabilità (contenuto non ancora reso allo scatto): niente è stato corretto né rigenerato.
- Da fare con calma: ridurre le attese fisse (i 5 s di "rete ferma" in `pagina.mjs`), solo se la suite resta stabile su due passaggi.
- Su Vercel, da confermare nel pannello (Settings → Build → Node.js Version) che sia Node 20.9 o superiore; il lockfile va committato e aggiornato prima del push.

**Verifica di fine giornata del diff tra `master` (`f25d7fd`) e il branch** (escludendo `tests/`, `MIGRAZIONE.md`, `.gitattributes`, `package.json`, `package-lock.json`)
- Le modifiche a `data/pagine.js` (riga 220, "Tutti i *Corsi*") e a `pages/all-courses/index.js` (`HeroTitle`) **sono già in `master`** (ultimo commit che le tocca: `f25d7fd`); sui due file il diff `master..branch` è vuoto.
- **Non torna con l'aspettativa** "solo `next.config.js` e `pages/index.js`": il diff contiene anche tre file di infrastruttura di test, nessuno dei quali cambia il comportamento del sito: `playwright.config.mjs` (nuovo, 59 righe), `.gitignore` (+5 righe: `.next-test/`, `test-results/`, `playwright-report/`) e `tsconfig.json` (+1 riga: `.next-test/types/**/*.ts`, aggiunta in automatico da `next build` quando si usa `NEXT_DIST_DIR`). Il codice del sito resta quindi solo `next.config.js` (+3 righe, `distDir`) e `pages/index.js` (`DATA_FISSA_TEST`). Nulla è stato corretto.
- `git status`: pulito a parte `pages/formazione/avviso-1-2026-poc.js` (solo fine riga, nessuna differenza di contenuto) e i file non tracciati che abbiamo deciso di non committare (`verify-*.mjs`, `Claude outputs/`, `public/images/courses/immagini corsi/`, `Thumbs.db`).
- Il comando in background chiuso per ultimo (`next lint --quiet`) conteneva anche due `sed` su quei file: erano già stati applicati e committati in `master` prima, quindi non hanno lasciato modifiche.

**Primo passo esatto da cui ripartire domattina**
1. *(prima di toccare Next)* Stabilizzare gli screenshot, senza cambiare i riferimenti dei test "buoni" senza autorizzazione. Proposte, in ordine: (a) in `tests/regressione/pagina.mjs`, prima dello scatto forzare via script `loading="eager"` su tutte le `<img>` e attendere `naturalWidth > 0` su ciascuna (non solo `complete`); (b) forzare visibili i `<Reveal>` con uno stile di prova (`[style*="will-change: opacity, transform"] { opacity: 1 !important; transform: none !important; }`); (c) scattare solo dopo due letture uguali dell'altezza a distanza di 500 ms; (d) provare con 2 worker (`WORKERS=2`). Dopo ogni modifica: rigenerare i riferimenti (con autorizzazione) e rifare due confronti.
2. `npm run test:rapido` esiste già (vedi "Problemi aperti"); va solo reso verde stabilizzando gli screenshot del punto 1: finché `/news` e `/all-courses?categoria=…` flakano, usarlo come segnale solo per metadata, HTML, interazioni e chat, e guardare gli screenshot a mano.
3. **Step 13.4.0 → 13.5.11**: `npm i next@13.5.11 --save-exact` (React 18.2 resta), poi `npm run build:test` e `npm run test:rapido`. Se passa senza correzioni, un commit e passo al 14.2.x (ultima patch), poi 15.x con React 19 (usare `npx @next/codemod@canary upgrade latest`), poi 16.x. Suite completa solo alla fine su Next 16, Lighthouse alla fine confrontato con la base (`node tests/lighthouse/lighthouse.mjs confronta base finale`).

**Lighthouse di base — Next 13.4.0** (Lighthouse 13.6.0, mediana di 3 passate, build di produzione locale su `127.0.0.1:3101`, Chromium di Playwright; 2026-11-02)

| Forma | Pagina | Perf | A11y | BP | SEO | LCP ms | TBT ms | CLS | JS KB |
|---|---|---|---|---|---|---|---|---|---|
| mobile | / | 91 | 97 | 100 | 100 | 1943 | 218 | 0 | 123 |
| mobile | /calendario-corsi | 93 | 96 | 100 | 100 | 2002 | 133 | 0 | 119 |
| mobile | /chi-siamo | 97 | 97 | 100 | 100 | 1956 | 35 | 0.006 | 121 |
| mobile | /all-courses/antincendio | 89 | 97 | 100 | 92 | 2112 | 278 | 0 | 220 |
| desktop | / | 99 | 97 | 100 | 100 | 775 | 0 | 0.004 | 123 |
| desktop | /calendario-corsi | 100 | 96 | 100 | 100 | 657 | 0 | 0.002 | 119 |
| desktop | /chi-siamo | 99 | 97 | 100 | 100 | 801 | 0 | 0.003 | 121 |
| desktop | /all-courses/antincendio | 97 | 97 | 100 | 92 | 1187 | 0 | 0.001 | 220 |

Note: SEO 92 su `/all-courses/antincendio` è già nella base (da indagare a parte, non è una regressione). Per il confronto finale: `node tests/lighthouse/lighthouse.mjs esegui finale` e poi `node tests/lighthouse/lighthouse.mjs confronta base finale`, sulla stessa macchina (font e icone di Google/cdnjs arrivano dalla rete reale).


## Fase 1b – Aggiornamento di Next restando in Pages Router (piano)

Step: 13.4.0 → 13.5.11 → 14.2.x → 15.x (React 19) → 16.x. Suite rapida dopo ogni step; se uno step la passa senza correzioni si prosegue subito; ci si ferma solo se qualcosa rompe aspetto o funzionamento in modo non risolvibile.

Dalle guide ufficiali di aggiornamento, ciò che riguarda questo progetto:
- **Requisiti:** Node ≥ 18.17 (14), ≥ 20.9 (16); TypeScript ≥ 5.1 (16). Locale: Node 24.16, TS 5.9. Impostare `engines.node` (≥ 20.9) in `package.json` al momento dell'aggiornamento a 16 e verificare Node su Vercel.
- **React 19:** con Pages Router è facoltativo già da Next 15; si adotta al passo 15 come da piano. Aggiornare anche `@types/react` e `@types/react-dom`; con i tipi 19 possono comparire errori di tipo (es. `useRef()` senza argomento, namespace `JSX`): `next build` esegue il controllo dei tipi.
- **`next lint` rimosso in 16:** nel progetto non c'è ESLint, quindi si toglie lo script `lint` da `package.json` e si aggiorna `CLAUDE.md` (che lo cita).
- **Turbopack è il bundler predefinito di `next build` in 16:** il progetto non ha configurazione webpack. Se gli screenshot cambiano (ordine del CSS, styled-jsx), usare `next build --webpack` come ripiego e **annotarlo qui come cosa da riprovare in futuro**.
- **`images.domains` deprecato:** convertire in `remotePatterns` con **gli stessi tre domini** (`www.aletheiasrl.it`, `images.unsplash.com`, `images.pexels.com`) più l'host di `WP_URL` se impostato; nessun dominio in più o in meno. Verificare che tutte le immagini esterne si carichino (script `tests/regressione/misura-rete.mjs`).
- **Altri default di `next/image` in 16:** `qualities` solo `[75]` (il codice non usa la prop `quality`), `minimumCacheTTL` 4 ore, `imageSizes` senza 16, query string su immagini locali richiedono `localPatterns` (non ce ne sono). `maximumRedirects` 3.
- **`scroll-behavior: smooth`** (CSS, righe 95 e 2423 di `globals.css`): da 16 Next non lo sovrascrive più durante le navigazioni. Per mantenere il comportamento attuale aggiungere `data-scroll-behavior="smooth"` su `<Html>` in `pages/_document.js`.
- **Output della build:** da 16 `next build` non mostra più "First Load JS"; per il peso del JavaScript si usa Lighthouse (voce `javascriptKB`).
- Nessun impatto: AMP, `serverRuntimeConfig` / `publicRuntimeConfig`, `next/legacy/image`, `@next/font`, middleware (non esiste), `getServerSideProps` (non usato).
- **Lockfile:** `package-lock.json` aggiornato e committato prima del push (altrimenti l'anteprima Vercel fallisce).

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
- **Immagini esterne** (misurate il 2 novembre 2026, con server di produzione locale, solo sulle 37 pagine campione): arrivano **tutte da `next/image`** (`/_next/image?url=…`, ottimizzatore lato server, config `images.domains`); nessuna immagine esterna è caricata direttamente dal browser. Domini e pagine: `images.unsplash.com` (`/`, `/agenzia-per-il-lavoro`, `/all-courses/icdl-base`, `/formazione/professionale-specialistica`, `/formazione/regionale`, `/formazione/regionale-fse`, `/all-courses?categoria=icdl`), `images.pexels.com` (`/agenzia-per-il-lavoro`), `www.aletheiasrl.it` (`/agenzia-per-il-lavoro`, `/news`, due articoli di news). Tempi di caricamento: a freddo (cache dell'ottimizzatore vuota) 180 ms in media per Unsplash (max 308), 234 ms Pexels, 280 ms aletheiasrl.it (max 553); a caldo 30–55 ms. Altre risorse esterne dirette: font e icone (`fonts.googleapis.com`, `fonts.gstatic.com`, `cdnjs.cloudflare.com`, 37 pagine su 37) e Google Maps in `/contatti`. I timeout di 2 minuti visti nei primi test (`/all-courses`) non sono dovuti alle immagini esterne e non si riproducono su una pagina alla volta: probabile carico della CPU con più worker in parallelo.
- Dopo gli aggiornamenti di Next, il comportamento di `next/image` può cambiare (vedi i default di Next 16 nel piano della Fase 1b): ricontrollare le immagini esterne con `tests/regressione/misura-rete.mjs`.
- `next build` con `NEXT_DIST_DIR=.next-test` fa aggiungere automaticamente a `tsconfig.json` la riga `.next-test/types/**/*.ts` (innocua).

## Infrastruttura di test (Fase 1)

Tutto sta in `tests/` e `playwright.config.mjs`; i test girano su una **build di produzione** in una cartella separata (`.next-test`), così non pestano `next dev`.

- **Build:** `npm run build:test` (usa `NEXT_DIST_DIR=.next-test` e `DATA_FISSA_TEST=2026-08-10`).
- **Esecuzione:** `npm run test:regressione` (avvia da sé `next start -p 3101` sulla build di test; `PORTA_TEST`, `WORKERS`, `CHROMIUM_PATH` configurabili). Chromium: usa quello già in `ms-playwright`.
- **Contenuto:**
  - `metadata.spec.mjs`: 113 URL (HTML grezzo senza JavaScript: status, lang, title, description, canonical, Open Graph, Twitter, JSON-LD, robots, H1, link interni, testo e immagini), `robots.txt` e i 75 redirect di `next.config.js` (status e `Location`).
  - `visivo.spec.mjs`: screenshot a pagina intera di 37 URL a 390, 768 e 1440 px, in tema chiaro e scuro. Per le famiglie di pagine (corsi, news, archivio, aiuti) si campionano alcune pagine per tipo di layout; tutte le altre sono coperte dal confronto del metadata. Pagine senza screenshot: gli altri 39 corsi (`/all-courses/*`), 13 news, 18 voci d'archivio e le restanti varianti `?categoria=` (45 + 18 + 13 URL elencati in `tests/regressione/urls.json`, campo `visivo: false`).
  - `interazioni.spec.mjs`: menu mobile, sottomenu Formazione (desktop e mobile), filtri e contatore di `/calendario-corsi`, filtri di `/all-courses` da query string (tutte e 12 le categorie, reset, `?livello=`), 404, campi dei form (senza inviare), sezione "Corsi in partenza" della home con data congelata.
  - `chatbot.spec.mjs`: il pulsante della chat è presente, abilitato, in basso a destra, e apre/chiude la finestra. Negli screenshot di pagina la chat (`.chatbot-root`) è nascosta.
- **Riferimenti.** Versionati in Git: `tests/riferimenti/dati/` (JSON di metadata e interazioni), `tests/riferimenti/rete/` (copie locali di font e immagini esterne), `tests/riferimenti/lighthouse/` e `tests/riferimenti/rete-misura.json`. **NON versionati:** gli screenshot PNG in `tests/riferimenti/immagini/` (228 file, circa 158 MB, cartella in `.gitignore`): vedi la sezione "Screenshot di riferimento (fuori da Git)" qui sotto. Non si rigenerano senza autorizzazione.
- **Test indipendenti dalla rete:** `tests/regressione/rete.mjs` serve da copia locale font, icone, immagini esterne (anche quelle passate da `/_next/image?url=https://…`, di cui si salva l'originale) e blocca Google Maps (l'iframe diventa vuoto: la mappa **non** è nel confronto). Con una copia mancante il test fallisce (non avvisa soltanto). Per registrare nuove copie: `AGGIORNA_RETE=1`.
- **Hook di test nel codice del sito (da riportare identici se si riscrive la home):** in `pages/index.js` la riga `const oggiISO = process.env.DATA_FISSA_TEST || new Date()…` congela "oggi" per la sezione "Corsi in partenza"; in produzione la variabile non esiste. Commit separato e documentato. `next.config.js` ha `distDir: process.env.NEXT_DIST_DIR || '.next'` (stesso valore di sempre senza variabile).
- **Lighthouse:** `tests/lighthouse/lighthouse.mjs` (nessuna dipendenza nel progetto, usa `npx lighthouse@13.6.0`); vedi "Stato al rientro".
- **Suite rapida (`npm run test:rapido`, creata il 2 novembre 2026; i test portano il tag `@rapido` nel titolo):** metadata di tutti gli URL, interazioni, chat e screenshot a 1440 px chiaro di queste 20 pagine: `/`, `/calendario-corsi`, `/all-courses`, `/all-courses?categoria=sicurezza-lavoro`, `/all-courses/antincendio`, `/all-courses/macchine-movimento-terra`, `/news`, `/news/bonus-giovani-under-35-aprile-2026`, `/formazione/obbligatoria`, `/formazione/ecm`, `/formazione/avviso-1-2026-poc`, `/chi-siamo`, `/contatti`, `/aiuti-di-stato/2023`, `/archivio`, `/archivio/avviso-7-2023`, `/agenzia-per-il-lavoro`, `/agenzia-per-il-lavoro/servizi-alla-persona`, `/privacy-cookie`, `/url-inesistente-404`. Tempo misurato: 6 min 17 s con la build (la stima era 10–12 minuti). Suite completa (un passaggio): circa 47 minuti.
- **Misura:** 229 test visivi + interazioni in 43,7 min con 3 worker; metadata di 115 test in 7 s.

## Screenshot di riferimento (fuori da Git)

- Stanno in `tests/riferimenti/immagini/` (228 PNG, circa 158 MB), ignorata da Git. Sono il riferimento visivo del sito su **Next 13.4.0** e vivono solo su questo computer: non cancellare la cartella.
- **Come rigenerarli** (solo con autorizzazione, e solo dal commit di partenza: rigenerarli da codice già aggiornato cancellerebbe il riferimento): `git checkout riferimenti-next-13.4.0` (tag sul commit di partenza, Next 13.4.0 + soli hook di test), `npm ci`, `npm run build:test`, poi `AGGIORNA_RIFERIMENTI=1 npx playwright test visivo interazioni --update-snapshots`. I test visivi non sono ancora del tutto stabili (vedi "Stato al rientro"): una rigenerazione non darà pixel identici.
- Con `npm run test:regressione` i test visivi confrontano con questa cartella; se manca, falliscono con "A snapshot doesn't exist".
- Copia di sicurezza della cronologia originale (con i PNG dentro): branch `migrazione-app-router-backup` (si può eliminare, con `git gc --prune=now`, quando non serve più).

## Fasi 2–5: rimandate

La migrazione all'App Router è sospesa. Note utili per riprenderla (decisioni già prese e punti critici, da rivedere alla luce di Next 16):
- **Prerequisito:** Next 16 in Pages Router (Fase 1b) e screenshot stabili.
- **D2 – preview delle news:** con Next 16 si usa `draftMode()`; `news/[slug]` va migrata per ultima adattando le route API di preview di WordPress; verificare che la preview funzioni come oggi.
- **D3 – `revalidate`:** non usare 300 a priori: controllare su Vercel (o chiedere) se `WP_URL` è impostato in produzione e usare esattamente il valore che oggi vale in produzione. Senza `WP_URL` le pagine sono statiche pure: cambia cosa significa "identico". Nota: in `app/` `revalidate` e `dynamicParams` devono essere letterali statici (oggi `isrOptions()` decide a runtime).
- **D4 – `fallback`:** `fallback: false` → `dynamicParams = false`; `blocking`/`true` → `dynamicParams = true` con `notFound()` per gli slug inesistenti; gli status HTTP devono restare quelli di oggi.
- **D5 – styled-jsx:** componenti client ammessi, ma `page.tsx` resta sempre Server Component (fetch dati ed export di `metadata`/`generateMetadata`) e renderizza un componente client (es. `XxxClient.tsx`) con il markup attuale; aggiungere il registry di styled-jsx nel layout (`useServerInsertedHTML`) e verificare nei test che non ci sia flash di pagina senza stili.
- **Query string** (`/all-courses`, `/all-courses/:slug`): l'HTML pre-renderizzato deve contenere gli stessi contenuti di oggi (la pagina statica è generata senza filtri, che si applicano lato client): il fallback di `<Suspense>` attorno a `useSearchParams` deve mostrare l'elenco completo non filtrato, non uno spazio vuoto; verificarlo confrontando l'HTML grezzo (test `metadata.spec.mjs`, campo `testoSha1`) prima e dopo.
- **404:** riprodurre identica quella attuale di default di Next, con screenshot e status 404 (riferimento: test `404` e `/url-inesistente-404`).
- **`DATA_FISSA_TEST`:** riportare identica la logica nella nuova home, altrimenti i test della home falliscono per il motivo sbagliato.
- **Altre decisioni minori:** approvate le proposte del report, salvo quelle che cambiano URL, status HTTP o aspetto (da chiedere).
- **Regole:** un commit per passo, `MIGRAZIONE.md` aggiornato, mai su `master`, nessun redesign né refactoring extra.
