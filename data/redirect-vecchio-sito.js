/**
 * Redirect 301 dal vecchio sito Joomla/K2 (www.aletheiasrl.it/index.php/...) al nuovo sito Next.js.
 *
 * Fonte: GA4 "Aletheia" (proprietà 487425595), report Pagine e schermate, 4 nov 2025 – 3 nov 2026
 * (37.716 visualizzazioni, 427 URL). Le regole sono in ordine: Next.js usa la PRIMA che corrisponde,
 * quindi prima le pagine specifiche, poi le schede per ID K2, poi le sezioni, infine il ripiego.
 *
 * Le schede K2 (corsi, news, offerte) si riconoscono dall'ID numerico iniziale ("157-formazione-..."):
 * lo stesso ID compare a volte con slug diversi, e l'ID è unico in tutto il vecchio sito.
 */

/** Una scheda K2 con questo ID, in qualunque sezione del vecchio sito. */
const k2 = (id, destination) => ({
  source: `/index.php/:sezione*/item/:scheda(${id}-[^/]*)`,
  destination,
  permanent: true,
});

const r = (source, destination) => ({ source, destination, permanent: true });

const OLD = '/index.php';

const redirectVecchioSito = [
  // ── Pagine principali ──────────────────────────────────────────────────────────
  r(`${OLD}`, '/'),
  r(`${OLD}/chi-siamo`, '/chi-siamo'),
  r(`${OLD}/contattaci`, '/contatti'),
  r(`${OLD}/contattaci/privacy-e-cookie`, '/privacy-cookie'),
  r(`${OLD}/contattaci/reclami-e-proposte`, '/reclami-proposte'),
  r(`${OLD}/news`, '/news'),
  r(`${OLD}/coordinatore-della-sicurezza`, '/all-courses/coordinatori-cantieri-cse-csp'),
  r(`${OLD}/online-essentials-mod-2`, '/all-courses?categoria=icdl'),

  // ── Corsi: pagine di sezione ───────────────────────────────────────────────────
  r(`${OLD}/i-nostri-corsi`, '/all-courses'),
  r(`${OLD}/i-nostri-corsi/calendario-corsi-fad/:resto*`, '/calendario-corsi'),
  r(`${OLD}/i-nostri-corsi/programma-gol`, '/programma-gol'),
  r(`${OLD}/i-nostri-corsi/formazione-obbligatoria`, '/formazione/obbligatoria'),
  r(`${OLD}/i-nostri-corsi/formazione-obbligatoria/sicurezza-sul-lavoro`, '/all-courses?categoria=sicurezza-lavoro'),
  r(`${OLD}/i-nostri-corsi/formazione-obbligatoria/decreto-attrezzature`, '/all-courses?categoria=decreto-attrezzature'),
  r(`${OLD}/i-nostri-corsi/formazione-obbligatoria/formazione-covid`, '/formazione/obbligatoria'),
  r(`${OLD}/i-nostri-corsi/obblighi-di-pubblicazione-per-i-beneficiari-di-contributi-2022`, '/aiuti-di-stato/2023'), // DA VERIFICARE

  // ── Formazione professionale (avvisi regionali) e archivio ─────────────────────
  r(`${OLD}/i-nostri-corsi/formazione-professionale`, '/formazione/regionale'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/avviso-n-1-2026-poc-sicilia-2014-2020`, '/formazione/avviso-1-2026-poc'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/avviso-7-2023-2a-finestra`, '/archivio/avviso-7-2023'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/avviso-20-2024-fse`, '/archivio/avviso-20-2024-fse'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/misura-psr-1-2`, '/archivio'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/archivio`, '/archivio'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/archivio/avviso-7-2023`, '/archivio/avviso-7-2023'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/archivio/avviso-29-2019`, '/archivio/avviso-29-2019'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/archivio/primo-soccorso-pediatrico`, '/archivio/primo-soccorso-pediatrico'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/archivio/avviso-2-2018/corso-di-cucina-500-ore`, '/archivio/avviso-2-2018/corso-di-cucina'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/archivio/misura-psr/conduttore-d-impresa-agricola-200-ore`, '/all-courses/conduttore-d-impresa-agricola'),

  // ── ICDL ───────────────────────────────────────────────────────────────────────
  r(`${OLD}/i-nostri-corsi/ecdl-icdl`, '/all-courses?categoria=icdl'),
  r(`${OLD}/i-nostri-corsi/ecdl-icdl/ecdl-icdl`, '/all-courses/icdl-base'),
  r(`${OLD}/i-nostri-corsi/ecdl-icdl/icdl-digcomp2-2`, '/all-courses/icdl-digcomp-2-2'),
  r(`${OLD}/i-nostri-corsi/ecdl-icdl/ecdl-standard`, '/all-courses/icdl-standard'),
  r(`${OLD}/i-nostri-corsi/ecdl-icdl/ecdl-update`, '/all-courses/icdl-update'),

  // ── Schede corso K2 (per ID) ───────────────────────────────────────────────────
  k2(157, '/all-courses/formazione-dei-lavoratori'),
  k2(153, '/all-courses/antincendio'),
  k2(155, '/all-courses/primo-soccorso-aziendale'),
  k2(161, '/all-courses/pes-pav-lavori-elettrici'),
  k2(158, '/all-courses/formazione-del-preposto'),
  k2(156, '/all-courses/patentino-fitosanitario'),
  k2(154, '/all-courses/personale-alimentarista-osa'),
  k2(150, '/all-courses/macchine-movimento-terra'),
  k2(146, '/all-courses/trattori-agricoli-o-forestali'),
  k2(145, '/all-courses/carrelli-elevatori-semoventi-con-conduttore-a-bordo'),
  k2(164, '/all-courses/lavori-in-quota'),
  k2(159, '/all-courses/rls'),
  k2(149, '/all-courses/ple-piattaforme-di-lavoro-mobili-elevabili'),
  k2(163, '/all-courses/pimus-ponteggi'),
  k2(152, '/all-courses/rspp-datore-di-lavoro'),
  k2(151, '/all-courses/pompe-per-calcestruzzo'),
  k2(228, '/all-courses/spazi-confinati'),
  k2(162, '/all-courses/dpi-3-categoria'),
  k2(148, '/all-courses/operatore-di-gru-per-autocarro'),
  k2(123, '/all-courses?categoria=sicurezza-lavoro'),

  // ── News K2 che esistono anche sul sito nuovo (per ID) ─────────────────────────
  k2(543, '/news/bonus-giovani-under-35-aprile-2026'),
  k2(536, '/news/priorita-lavoratori-2026-workforce-trends'),
  k2(513, '/news/empowerment-femminile-retribuzioni-eque'),
  k2(521, '/news/domanda-lavoro-italia-vocazioni-professionali-2025'),
  k2(520, '/news/formazione-frontiere-lavoro-cambiamento'),
  k2(515, '/news/lavoratori-stranieri-alloggi-ddl-semplificazioni'),
  k2(514, '/news/stress-lavoro-salute-mentale-italiani'),
  k2(502, '/news/accordo-stato-regioni-formazione-sicurezza-2025'),
  k2(496, '/news/intelligenza-artificiale-obbligo-formazione-2025'),
  k2(511, '/news/credito-imposta-formazione-agricola-2024'),
  k2(509, '/news/smart-working-inclusione-sicurezza-futuro'),
  k2(505, '/news/piccole-imprese-assumere-profili-mancanti'),
  k2(444, '/news/corsi-gratuiti-progetto-gol-sicilia'),

  // ── News K2 dei corsi PSR, ora in archivio (per ID) ────────────────────────────
  k2(188, '/all-courses/conduttore-d-impresa-agricola'),
  k2(183, '/archivio/misura-psr-1-1/workshop-agricoltura-multifunzionalita'),
  k2(184, '/archivio/misura-psr-1-1/workshop-funzione-innovativa'),
  k2(185, '/archivio/misura-psr-1-1/workshop-strategie-marketing'),
  k2(186, '/archivio/misura-psr-1-1/nuove-strategie-sviluppo-investimento'),
  k2(187, '/archivio/misura-psr-1-1/ammodernamento-aziende-agricole'),
  k2(204, '/archivio/misura-psr-1-1/workshop-conduttore-impresa-agricola'),
  k2(222, '/all-courses/ple-piattaforme-di-lavoro-mobili-elevabili'),

  // ── Agenzia per il lavoro ──────────────────────────────────────────────────────
  // Le offerte ora sono su aletheia4job.it e compaiono dentro /agenzia-per-il-lavoro.
  r(`${OLD}/apl-lavoro`, '/agenzia-per-il-lavoro'),
  r(`${OLD}/apl-lavoro/offerte-di-lavoro/:resto*`, '/agenzia-per-il-lavoro'),
  r(`${OLD}/apl-lavoro/garanzia-giovani-2/:resto*`, '/agenzia-per-il-lavoro/servizi-alla-persona'),

  // ── Ripieghi per sezione (tutto ciò che non è stato mappato sopra) ────────────
  r(`${OLD}/news/:resto*`, '/news'),
  r(`${OLD}/i-nostri-corsi/formazione-professionale/:resto*`, '/archivio'),
  r(`${OLD}/i-nostri-corsi/ecdl-icdl/:resto*`, '/all-courses?categoria=icdl'),
  r(`${OLD}/i-nostri-corsi/formazione-obbligatoria/decreto-attrezzature/:resto*`, '/all-courses?categoria=decreto-attrezzature'),
  r(`${OLD}/i-nostri-corsi/formazione-obbligatoria/:resto*`, '/all-courses?categoria=sicurezza-lavoro'),
  r(`${OLD}/i-nostri-corsi/:resto*`, '/all-courses'),
  r(`${OLD}/apl-lavoro/:resto*`, '/agenzia-per-il-lavoro'),
  r(`${OLD}/contattaci/:resto*`, '/contatti'),
  r(`${OLD}/:resto*`, '/'),
];

module.exports = { redirectVecchioSito };
