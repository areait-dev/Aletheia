---
name: ottimizzazione-mobile-nextjs
description: Ottimizza un sito Next.js per mobile (velocità LCP/CLS/INP, peso JS, immagini, usabilità touch) senza cambiarne l'aspetto, misurando prima e dopo e con commit separati per ogni intervento.
---

# Ottimizzazione mobile di un sito Next.js

Obiettivo: rendere il sito più veloce e più comodo da telefono **senza cambiare ciò che il visitatore vede**, salvo modifiche approvate esplicitamente. Ogni intervento deve essere misurato prima e dopo, isolato in un commit e reversibile.

Contesto predefinito (verificalo nel progetto e adattati se diverso): Next.js 16 in Pages Router, build con `--webpack`, styled-jsx, framer-motion, `next/font/google` (Nunito, Viga), deploy su Vercel, test di regressione Playwright (`npm run test:rapido`, suite completa) e Lighthouse in `tests/lighthouse/`, diario di lavoro in `MIGRAZIONE.md` con sezione "Stato al rientro".

## Problemi mobile già noti in questo progetto

Da verificare per primi nella Fase 1 e includere nel report:
- elementi `sticky` con stile inline senza breakpoint, che su mobile restano attaccati e coprono contenuti;
- la sidebar dei corsi (`/all-courses`) che su mobile si sovrappone all'elenco;
- il menu hamburger e il controllo a 768 px lasciati aperti in `MIGRAZIONE.md`;
- l'elemento LCP delle pagine corso su mobile è il banner cookie, che compare solo dopo l'idratazione;
- il controllo manuale mobile (390 e 768 px) ancora in sospeso.

## Regole

1. **Branch dedicato** (es. `ottimizzazione-mobile`), mai lavoro diretto su `master`, nessun push su `master` senza via libera esplicito.
2. **Nessun redesign.** Markup, testi, colori, spaziature, ordine e comportamento restano identici. Se un intervento richiede di cambiare qualcosa di visibile (es. il banner cookie, la sidebar, gli sticky), fermati, descrivi la modifica con uno screenshot prima/dopo e aspetta l'approvazione.
3. **Un intervento per commit**, con messaggio in italiano che dica cosa cambia e quale metrica o problema risolve.
4. **Misure con dati, non ipotesi.** Lighthouse mobile ha molta dispersione: usa sempre la mediana di almeno 3 passate (5 se le differenze sono piccole) e confronta solo misure fatte con la stessa procedura, sulla stessa macchina scarica. Un singolo valore non dimostra nulla.
5. **Test di regressione verdi** dopo ogni intervento (`test:rapido`). Se un test fallisce, correggi l'intervento, non il test. Non rigenerare riferimenti senza autorizzazione; quando una modifica visibile è approvata, rigenera solo i riferimenti delle pagine interessate e dillo.
6. **Risorse limitate**: un solo worker per test e Lighthouse, nessun render o build pesante in parallelo; chiudi i processi che avvii.
7. **Punti di STOP** indicati sotto: riassumi e aspetta l'approvazione.
8. Aggiorna `MIGRAZIONE.md` a ogni passo concluso.

## Fase 1 – Misura di partenza e controllo mobile

1. Pagine rappresentative: home, `/all-courses`, `/all-courses?categoria=sicurezza-lavoro`, una pagina corso con livelli (es. `/all-courses/antincendio`), una news, `/contatti`, `/calendario-corsi`, `/chi-siamo`, la 404.
2. Per ognuna, Lighthouse **mobile** (mediana di 3-5 passate): Performance, LCP, CLS, TBT, peso del JS trasferito, elemento LCP individuato.
3. Se disponibili, dati di utenti reali (PageSpeed Insights "esperienza dei tuoi utenti reali", Vercel Speed Insights): hanno la precedenza sulle misure di laboratorio.
4. Controllo visivo e di usabilità a 390 e 768 px (screenshot + ispezione): overflow orizzontale, elementi sovrapposti o coperti (sidebar, sticky, chat, banner), testi sotto 16 px negli input (iOS fa zoom), aree cliccabili sotto 48x48 px o troppo vicine, `100vh` che taglia contenuti, interazioni che funzionano solo con hover, menu hamburger (apertura, chiusura, sottomenu, scroll bloccato sotto il menu).
5. Salva la base (es. `tests/riferimenti/lighthouse/mobile-base.json`) e scrivi un report: per ogni pagina i problemi trovati con screenshot, la causa dimostrata dai dati e l'intervento proposto con impatto stimato, segnando quali interventi cambiano l'aspetto.

⏸ STOP: mostra il report e l'elenco ordinato degli interventi (prima quelli a basso rischio e alto impatto).

## Fase 2 – Interventi (uno per commit)

Per ogni intervento: applica, `test:rapido`, Lighthouse sulle pagine interessate (mediana), annota prima/dopo. Se non migliora in modo misurabile, annulla il commit e annotalo.

### A. Difetti di layout mobile (richiedono approvazione)
- Sticky inline senza breakpoint: sposta lo stile in una regola con media query, così su mobile l'elemento torna nel flusso (o resta sticky solo dove non copre contenuti).
- Sidebar dei corsi sovrapposta: su mobile va sopra l'elenco o in un pannello apribile, senza coprire i risultati; il filtro deve restare raggiungibile.
- Menu hamburger e 768 px: verifica e correggi apertura, chiusura, sottomenu, focus e blocco dello scroll.
- Screenshot prima/dopo a 390 e 768 px per ognuno.

### B. LCP (elemento principale che compare tardi)
- Il banner cookie non deve diventare l'elemento più grande: proponi (con STOP, perché tocca il markup) una versione più compatta o renderizzata nell'HTML iniziale e nascosta prima del paint a chi ha già scelto, senza lampeggiare e senza cambiare il comportamento privacy (consenso, rifiuto, memorizzazione della scelta).
- Contenuto sopra la piega nascosto da animazioni di comparsa (`opacity: 0` finché non idrata): deve essere visibile subito; l'animazione resta per gli elementi più in basso.
- Immagine LCP: `next/image` con `priority`, `sizes` corretto per mobile, nessun `loading="lazy"` sopra la piega.

### C. CLS (spostamenti del layout)
- Verifica che non restino `@import` o `<link>` a Google Fonts (si usa `next/font`).
- Dimensioni esplicite o `aspect-ratio` per immagini, iframe (mappa), embed e banner; spazio riservato per contenuti che arrivano dopo.

### D. TBT / INP (JavaScript che blocca il telefono)
- Analizza i chunk (bundle analyzer o elenco file con dimensioni): cosa pesa e su quali pagine.
- framer-motion: `LazyMotion` + `m` con `domAnimation` invece di `motion`, oppure componenti animati con `next/dynamic`.
- Componenti non necessari al primo paint (ThemeToggle, Chatbot, mappa): `next/dynamic` o caricamento al primo scroll/interazione, purché non servano all'HTML per la SEO.
- Script di terze parti (analytics, chat, cookie): `next/script` con `lazyOnload` o `afterInteractive`.
- Rispetta `prefers-reduced-motion`.

### E. Immagini
- Tutte con `next/image`, formati AVIF/WebP (`images.formats`), `sizes` che rispecchiano le larghezze reali su mobile.
- Immagini esterne lente: valuta di servirle dal dominio del sito; verifica `images.remotePatterns`.

### F. Usabilità touch (richiede approvazione se visibile)
- Aree cliccabili ≥ 48x48 px, input con font ≥ 16 px, nessun overflow orizzontale, `100dvh` dove serve, `env(safe-area-inset-*)` per elementi fissi, pulsante chat che non copre contenuti né il banner cookie.

⏸ STOP dopo il primo intervento con risultati; se approvato, prosegui fermandoti solo per quelli che cambiano l'aspetto.

## Fase 3 – Verifica finale

1. Suite completa di regressione verde (con i riferimenti aggiornati solo per le modifiche approvate).
2. Lighthouse mobile e desktop sulle pagine della base (mediane): tabella prima/dopo per Performance, LCP, CLS, TBT, peso JS. Nessun peggioramento non spiegato, anche su desktop.
3. Confronto visivo mobile prima/dopo a 390 e 768 px in una cartella fuori dal repository (es. Desktop/confronto-mobile-ottimizzazione), con `index.html` che mostra le coppie e la percentuale di pixel diversi.
4. Push del solo branch e link all'anteprima Vercel. Se l'anteprima è protetta, per PageSpeed Insights usa la chiave "Protection Bypass for Automation" (`?x-vercel-protection-bypass=CHIAVE&x-vercel-set-bypass-cookie=true`), senza mai scrivere la chiave in file o commit.
5. Checklist per il controllo manuale su un telefono reale: menu, filtri, sidebar corsi, form contatti, banner cookie (accetta/rifiuta e ricarica), chat, tema scuro, rotazione dello schermo.

⏸ STOP: report finale e attesa del via libera per il merge.

## Report finale
- Interventi applicati, ciascuno con commit e metrica o problema risolto.
- Interventi provati e annullati perché senza effetto.
- Tabella prima/dopo.
- Interventi rimandati o che richiedono una decisione.
- Istruzioni per il merge e per il rollback su Vercel.
