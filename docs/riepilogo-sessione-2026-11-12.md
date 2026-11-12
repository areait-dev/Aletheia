# Riepilogo della sessione del 12 novembre 2026

Documento di lavoro. Non sostituisce MIGRAZIONE.md: i punti ancora aperti vanno riportati nella sezione «Stato al rientro» quando si fa la Fase 1 (`pulizia-documenti`).

## Stato di `master`

- (Storico, superato: vedi «Esito».) `master` locale era a `9478f44`, **11 commit avanti e 9 indietro rispetto a `origin/master`, NON pushato**. Il push è stato rifiutato (non fast-forward): `origin/master` ha 9 commit del 10 novembre che questa sessione non conosceva (partita da `1f182b7`, riferimento remoto vecchio). Nessun push senza l'ok del committente. Vedi «Prossimo passo».
- Ai 9 commit elencati sotto si aggiungono `0fe4d03` (questo documento) e il merge `9478f44`.
- **Suite completa (`npx playwright test`, 1 worker, build di test di `master`): 393 passati, 0 falliti** (17,8 min). La suite rapida sul branch prima del merge: 331 passati, 0 falliti.
- Commit locali, in ordine:
  - `b3ae8ad` testi: trattino lungo e medio sostituiti con il trattino corto (51 file);
  - `d6e3216` ripristinato il segnaposto «—» dove significa «dato mancante» (report Lighthouse, colonna Note del censimento cookie);
  - `eaa295d` regex di `addressLocality` (JSON-LD degli eventi) accetta `—`, `–` e `-`;
  - `8b83bfd` riferimenti aggiornati (37 `metadata` e la traccia di «Corsi in partenza»);
  - `7a62436` merge di `testi-trattini`;
  - `bc0f8c4` slug ASACOM fissato a quello storico (`SLUG_FAMIGLIA_FISSATI` in `data/courseFamilies.js`);
  - `b66d49a` test `slug-asacom.spec.mjs`;
  - `a2f4f4d` riferimenti aggiornati (5 `metadata`);
  - `b8749a1` merge di `fix-slug-asacom`.
- `next-env.d.ts` risulta modificato: lo rigenera `next dev`, non va committato. `AGENTS.md` va invece committato (decisione del committente).

## Decisioni del committente prese in sessione

- Trattini: la sostituzione vale anche per il trattino medio `–`, comprese le denominazioni degli avvisi regionali e i codici CIP/CUP in `/aiuti-di-stato/*`. Confermato «così».
- JSON-LD `hasCourseInstance[].location.name` e link «Richiedi preventivo» (parametro `edizione=`) con il trattino corto: accettati.
- `/corsi/macchine-movimento-terra` più bassa di 25 px (il testo «Da definire - aggiornamento disponibile (4 ore)» sta su una riga): accettato.
- ASACOM: **strada B**. Titolo nuovo («ASACOM - Assistente specialistico all'autonomia e alla comunicazione»), indirizzo storico invariato (`/corsi/asacom-assistente-alla-comunicazione`), nessun redirect. (Il meccanismo `SLUG_FAMIGLIA_FISSATI` di questa sessione sarà tolto: vale la riga già online, vedi «Prossimo passo».)
- Il foglio Google «Corsi» (letto in sola lettura) non contiene `—` né `–` nelle celle: niente da correggere lì.
- Checklist prima dei DNS (da riportare in MIGRAZIONE.md): suite completa verde su `master`; `audit-segnaposto` e `audit-dati-schede` senza risultati nuovi; elenco degli URL del catalogo congelato, e da lì ogni cambio di slug richiede un redirect permanente dal vecchio indirizzo (308, come `next.config.js` fa per tutti i `/corsi/*`; solo `/all-courses/…` risponde 301).

## Cosa è emerso

- **Regressione ASACOM (`e0db6b0`): già corretta online.** Il commit `e0db6b0` (titolo ASACOM) cambiava lo slug di famiglia: la scheda perdeva contenuto, foto e moduli («Contenuto dettagliato in arrivo»), perché le chiavi di `data/content`, `courseImages` e `coursesDetails` erano quelle del vecchio slug. Il fix `bb4a504` («ASACOM: ripristinato lo slug storico dopo il cambio titolo», 10/11, una riga nella mappa di `data/courseFamilies.js`) è su `origin/master` e **in produzione dal deploy del 10/11** (`733c2b5`). Verificato in sola lettura il 12/11: `/corsi/asacom-assistente-alla-comunicazione` risponde 200 con FAQ completa e foto, senza il segnaposto; lo slug ricavato dal titolo risponde 404. Questa sessione ha rifatto la stessa correzione (`bc0f8c4`, `SLUG_FAMIGLIA_FISSATI`) senza saperlo: si tiene quella già online (vedi «Prossimo passo»). Il lavoro del 10/11 è dello stesso autore git (`areait-dev`) e non era noto a questa sessione.
- **Riferimenti visivi vecchi.** Erano stati generati dal codice di inizio novembre e non coprivano i commit di layout successivi: foto di «Formazione dei lavoratori» (`f294bd5`), titoli e tag in sentence case, immagine a tutta larghezza in `/formazione/regionale` (`1f182b7`), due news portate dal vecchio sito (`7a112c1`) con il nuovo ordine, titolo ASACOM. Rigenerati solo i test che fallivano, dopo aver aperto le immagini di differenza.
- **Screenshot di riferimento (non versionati, solo su questo computer).** Rigenerati oggi: `aiuti-di-stato-2023-1440-chiaro`, `corsi-macchine-movimento-terra-1440-chiaro`, `home-corsi-in-partenza-390/768/1440`, `corsi-1440-chiaro`, `corsi-antincendio-1440-chiaro`, `corsi-sicurezza-lavoro-1440-chiaro` e 16 a 1440 px non rapidi (chiaro e scuro: agenzia, aiuti 2024, corsi, antincendio e `?livello=2`, macchine, sicurezza, regionale, news). La cartella `tests/riferimenti/immagini/` non è in Git: farne una copia di sicurezza.
- `lib/seo.ts:66` ha ancora un `–` in una regex di pulizia della description: non toccato.

## Da annotare per la Fase 2 (stabilità dei test)

- **Test di scorrimento rimandato.** `scorrimento.spec.mjs` («clic su un corso 150ms dopo la rotellina») è instabile: ha fallito una volta nella suite completa con 5 fotogrammi di scorrimento contro un massimo di 4, mentre è passato in tutte le altre corse (rapide e completa finale). Da studiare con più esecuzioni e con la causa (tempi del `Reveal`, Lenis, caricamento delle immagini).
- **`/aiuti-di-stato/2023` chiaro**: nella corsa completa è fallito con 4.467 px diversi, poi è passato più volte. La differenza reale (trattino corto nelle celle) sta vicino alla soglia di tolleranza dello 0,1%: va reso robusto, non allargata la soglia.
- Il filtro `-g` di Playwright con un titolo che inizia per `/` viene riscritto da Git Bash (`C:/Program Files/Git/...`): usare uno spazio o `MSYS_NO_PATHCONV=1`.

## Cosa resta per `slug-fissi` (non iniziato)

Obiettivo del committente: nessun URL cambia mai per un ritocco al titolo.

1. Mappa unica in `data/` con lo slug di ogni famiglia, generata dagli slug calcolati oggi (40 famiglie). `SLUG_FAMIGLIA_FISSATI` sparisce: ASACOM diventa una voce come le altre.
2. `slugify` non si usa più per gli URL delle schede. Una famiglia senza slug nella mappa fa fallire la build (o un test).
3. Test: cambiare il titolo di una famiglia non cambia il suo URL; ogni URL in `urls.json` corrisponde a una voce della mappa e viceversa.
4. Prova che le 44 pagine `/corsi/*` e i 365 redirect sono identici prima e dopo (HTML normalizzato e `routes-manifest`).
5. Regola in CLAUDE.md: lo slug di un corso non cambia mai; se deve cambiare serve un redirect permanente dal vecchio indirizzo e l'ok del committente.
6. Da verificare prima: se altri punti del codice ricavano slug dai titoli (`ALIAS_TO_DETAILS`, `resolveRelatedCourse`, chiavi di `coursesDetails`/`courseImages`).

**Stima: circa 2-2,5 ore di lavoro, con due build di test e la suite rapida finale (circa 12 min ciascuna) incluse.** Voci principali: mappa e uso nel codice 40 min; test 30 min; prova prima/dopo 40 min; CLAUDE.md 5 min; verifica finale 25 min. L'incognita è il punto 6: se gli slug calcolati si ritrovano in altri moduli, +30-45 min. Un solo STOP: prima del merge.

## Altre cose ancora da fare

- Fase 1 (`pulizia-documenti`): MIGRAZIONE.md unificato, cartella principale (tabella già approvata), `.gitignore` (`Claude outputs/`, `/*.png`, `/.next-*/`, `scripts/tmp/`), `docs/diario/2026-11.md`, `docs/test-regressione.md`, CLAUDE.md (hover senza stili inline, nessun `<style>` nei componenti nuovi, soglia di ~300 righe, percorso leggero e completo, `scripts/tmp/`, regola degli slug, regola «chi cambia qualcosa di visibile aggiorna i riferimenti nello stesso branch, con l'ok del committente; niente merge in `master` con test rossi»), `AGENTS.md` committato. Stop prima del commit.
- Fasi 2, 3 e 4 come da piano del committente.
- Prova su un iPad vero e controllo dei contenuti dei corsi da chiedere al reparto formazione: vedi MIGRAZIONE.md.

## Esito: integrazione di `origin/master` in `master` (12/11, completata)

**Fatto e in produzione** (`master` `f8733c3`, deploy Vercel riuscito, https://aletheiasrl.vercel.app).

- Merge `ee9301a` (niente rebase). 5 conflitti: `data/courseFamilies.js` risolto tenendo `SLUG_STORICI` (`bb4a504`) e togliendo `SLUG_FAMIGLIA_FISSATI` (il file è identico a `origin/master`); i 4 `metadata` presi da origin e poi rigenerati.
- Rigenerazione dei riferimenti, tutta per effetto di due commit remoti del 10/11 arrivati dopo l'ultimo aggiornamento dei riferimenti: footer «Powered by Promo Communication» (`733c2b5`, +30 caratteri di testo in tutte le pagine) e rimozione del catalogo PDF dal footer (`4eee1fd`, 09/11, voluta: il catalogo non esiste). **Su `origin/master` questi test erano già rossi.**
  - 111 `metadata` rigenerati (cambiano solo `testoLunghezza` e `testoSha1`);
  - `interazioni/404.json` (solo il testo «Powered by»);
  - screenshot non versionati `calendario-corsi-1440-chiaro` e `-scuro` (solo il footer; la data non c'entra: la build di test congela «oggi» a 2026-08-10).
- Suite completa dopo il merge: 392 passati, 3 falliti (404 e i due screenshot, tutti per il footer). Rigenerati quei 3 e rilanciati solo loro: 3/3 verdi. La suite completa non è stata rieseguita dopo la rigenerazione (decisione del committente: gli altri 392 erano passati sullo stesso codice).
- Controllo online dopo il deploy: `/corsi/asacom-assistente-alla-comunicazione` 200, titolo «ASACOM - Assistente specialistico all'autonomia e alla comunicazione», senza segnaposto; lo slug ricavato dal titolo 404. `/corsi/addetti-alla-conduzione-di-carriponti-pensile-cabina` 200, «carriponte» nel titolo; lo slug dal titolo (`carriponte`) 404. Footer con «Powered by» e senza catalogo.
- `slug-fissi` può partire ora, sulla base unita.
- Gli screenshot di riferimento restano non versionati: fare una copia di sicurezza di `tests/riferimenti/immagini/` (due sono stati rigenerati oggi).

## Sessione del pomeriggio (12/11): pulizia, privacy, verifica dei punti aperti

**In `master`** (merge `0c38ac1` e `546e2a6`; suite completa 395/395 verde, 19,1 min; push al momento della scrittura in attesa dell'accesso a GitHub, vedi sotto).
- **Branch `contatti-corso`:** la precompilazione di `/contatti` da `?corso=` **era già fatta dal 4/11** (`1f592c9`, con test in `moduli-ui.spec.mjs`). Corretta solo la nota vecchia in `MIGRAZIONE.md`. Resta: i link del calendario aggiungono `&intento=lista-attesa`, che il form non legge.
- **Branch `pulizia-codice`:** rimossi `components/CourseHero.tsx`, `iside-bold.svg`, `promesys-rebranding.png` (verificato con grep su codice, dati e test: nessun uso). `images.domains` era **già** `remotePatterns` (restava un commento, aggiornato). `lib/seo.ts:66`: il trattino medio nella regex di `accorcia()` **resta di proposito** (i testi da WordPress possono averlo), con un commento che lo spiega.

**Branch `privacy-resend-bozza` (`fbe2876`) — NON UNITO, da rivedere.** Nuova riga nella tabella delle finalità (moduli), oggetto `trattamentoModuliResend` in `data/privacy.js` (responsabile art. 28, regione EU, conservazione, DPA, trasferimenti extra UE), richiamato in `pages/privacy-cookie.js` (sezioni 1.3 e 1.4) e riga «Rev. 02 (BOZZA)». Le voci in `[DA VERIFICARE]` vanno confermate sul DPA e sull'account Resend. Non fatta la copia in `wordpress/privacy-html.mjs` (duplica 1.3 e 1.4). Il branch sta nel worktree `..letheia-privacy` (togliere con `git worktree remove` quando non serve).

**Verifica nel codice dei punti aperti (12/11):**

| Punto | Stato |
|---|---|
| `?corso=` in `/contatti` | **Già risolto** (4/11) |
| `images.domains` | **Già risolto** |
| `CourseHero.tsx`, due asset | **Risolti oggi** |
| Foto «Lunch atop a Skyscraper» | **Già sostituita** il 10/11 (`f294bd5`); resta da verificare la licenza della nuova foto (rapporto aggiornato, modifica **non ancora committata**) |
| Sitemap | **Esiste** (`pages/sitemap.xml.js`); la nota «nessuna sitemap» in MIGRAZIONE.md è vecchia |
| Reveal, regole di sicurezza | **Ancora da fare**: `components/Reveal.tsx` non ha fail-open, né rete di sicurezza senza `IntersectionObserver`, né timer, né `<noscript>` |
| `/diagnostica`, `-b`, `-c` + `diagnostica.spec.mjs` | **Ancora da togliere** prima dei DNS (i file ci sono) |
| «Prossimamente» in `/formazione/regionale` | **Ancora aperto** (`pages/formazione/regionale.js:79`), da decidere se è stato reale |
| Loghi clienti in home | **Ancora disattivati** (`{false && …}`, `pages/index.js:801`), serve il consenso dei clienti |
| «Da definire» (Macchine movimento terra, 6 varianti) | **Ancora aperto**, in attesa del reparto formazione |
| `slug-fissi` | **Non iniziato** (`slugify` ancora usato, solo `SLUG_STORICI` con le voci ASACOM e carriponti) |
| `CLAUDE.md` «No testing framework set up» | **Vecchio**: c'è la suite Playwright |

**Per domani, in quest'ordine.**
1. `slug-fissi` (2-2,5 h). Parte dalla base unita: `SLUG_STORICI` diventa la mappa completa delle 40 famiglie.
2. Immagini che oggi vengono dal vecchio sito (news e avvisi, circa 19 più 3), da scaricare in `public/images` **prima** dei DNS.
3. Togliere `/diagnostica*` e rilanciare la suite.
4. Revisione della bozza privacy (titolare o consulente) e, solo dopo, merge.
5. Reveal (regola di sicurezza, in attesa di ok) e decisione su «Prossimamente».
6. Per i DNS, a carico del committente: Resend e record DNS, variabili su Vercel, prove dei moduli, record della posta, redirect da apex a `www`.

## Piano di integrazione (storico, eseguito)

**Stato.** `master` locale è 11 commit avanti e 9 indietro rispetto a `origin/master`. Il push del 12/11 è stato rifiutato e **non è stato forzato**. Non è stato pubblicato niente.

**I 9 commit presenti solo su `origin/master`** (10/11, autore `areait-dev`, già in produzione fino a `733c2b5`): BreadcrumbList generato dal componente delle briciole; `titoloSeo` sotto i 60 caratteri per le news e test sui title; fonte della news «full remote»; «carriponte» in tutti i titoli (slug invariati); virgola in «apposizione, integrazione e rimozione della segnaletica stradale»; slug «carriponti» storico per carriponti pensile/cabina; **`bb4a504` ASACOM: slug storico ripristinato**; riferimenti `metadata` aggiornati; footer «Powered by Promo Communication». In tutto 110 file toccati. Nota sull'origine: la richiesta del committente lasciava in bianco chi ha fatto questo lavoro (modello non compilato); qui è indicato solo l'autore git.

**Conflitti attesi** (simulazione con `git merge-tree`, nessuna modifica all'albero): 5.
1. `data/courseFamilies.js` (due correzioni di ASACOM)
2. `tests/riferimenti/dati/metadata/corsi.json`
3. `tests/riferimenti/dati/metadata/corsi_addetti-alla-conduzione-di-carriponti-pensile-cabina.json`
4. `tests/riferimenti/dati/metadata/corsi_asacom-assistente-alla-comunicazione.json`
5. `tests/riferimenti/dati/metadata/corsi_oss-operatore-socio-sanitario.json`

Si uniscono da soli, tra gli altri: `pages/corsi/[slug].js`, `lib/newsData.js`, `pages/formazione/regionale.js`, `styles/globals.css`, `tests/regressione/ereditarieta.spec.mjs` e gli altri JSON di `metadata`.

**Decisioni del committente (12/11).**
- **Merge** di `origin/master` in `master`, **niente rebase**.
- **ASACOM:** si tiene `bb4a504` (riga nella mappa in `data/courseFamilies.js`) e si **toglie `SLUG_FAMIGLIA_FISSATI`**, con il suo commento e l'uso accanto a `slugify`. Il test `tests/regressione/slug-asacom.spec.mjs` resta valido (verifica 200 allo slug storico, 404 allo slug dal titolo).
- **I 4 file `metadata` in conflitto non si risolvono a mano:** dopo il merge si prende una versione qualsiasi (non conta) e si **rigenerano** con la suite, solo per quei test, aprendo prima le differenze.
- Poi **suite completa** (`npx playwright test`, 1 worker) tutta verde, poi **push** (solo con l'ok del committente), poi si controlla il deploy e le pagine toccate online.
- **`slug-fissi` solo dopo**, perché tocca lo stesso file (`courseFamilies.js`) e va rifatto sulla base unita.

**Cose da ricontrollare dopo il merge.**
- Gli screenshot di riferimento non versionati (solo su questo computer) sono stati rigenerati su una base senza i commit del 10/11 (footer, breadcrumb, titoli carriponte): è probabile che alcuni falliscano e vadano rigenerati, sempre dopo aver aperto le immagini di differenza.
- I 37 JSON `metadata` rigenerati con i trattini non conoscono il `titoloSeo` e il BreadcrumbList del 10/11: possibili altri scarti oltre ai 4 in conflitto.
- Per il passaggio in produzione vale la checklist DNS (sezione «Decisioni del committente»).
