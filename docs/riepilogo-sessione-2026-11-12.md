# Riepilogo della sessione del 12 novembre 2026

Documento di lavoro. Non sostituisce MIGRAZIONE.md: i punti ancora aperti vanno riportati nella sezione «Stato al rientro» quando si fa la Fase 1 (`pulizia-documenti`).

## Stato di `master`

- `master` è a `b8749a1`, **9 commit avanti a `origin/master`, NON pushato**. Nessun push senza l'ok del committente.
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
- ASACOM: **strada B**. Titolo nuovo («ASACOM - Assistente specialistico all'autonomia e alla comunicazione»), indirizzo storico invariato (`/corsi/asacom-assistente-alla-comunicazione`), nessun redirect.
- Il foglio Google «Corsi» (letto in sola lettura) non contiene `—` né `–` nelle celle: niente da correggere lì.
- Checklist prima dei DNS (da riportare in MIGRAZIONE.md): suite completa verde su `master`; `audit-segnaposto` e `audit-dati-schede` senza risultati nuovi; elenco degli URL del catalogo congelato, e da lì ogni cambio di slug richiede un redirect permanente dal vecchio indirizzo (308, come `next.config.js` fa per tutti i `/corsi/*`; solo `/all-courses/…` risponde 301).

## Cosa è emerso

- **Regressione già su `origin/master`.** Il commit `e0db6b0` (titolo ASACOM) cambiava lo slug di famiglia: la scheda perdeva contenuto, foto e moduli («Contenuto dettagliato in arrivo»), perché le chiavi di `data/content`, `courseImages` e `coursesDetails` erano quelle del vecchio slug. È corretta in `bc0f8c4`, ma finché `master` non è pushato la regressione può essere online. Non verificato sul sito pubblico.
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
