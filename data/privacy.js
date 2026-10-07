// Tabelle della pagina /privacy-cookie. Sorgente locale: se la pagina WordPress "privacy-cookie" ha un contenuto,
// prevale quello (vedi pages/privacy-cookie.js); queste tabelle servono anche alla migrazione (wordpress/privacy-html.mjs).

export const finalitaTrattamento = [
  {
    finalita: 'Riscontro a richieste inviate tramite sito, e-mail o recapiti pubblicati',
    dati: 'Dati identificativi, contatti, contenuto della richiesta',
    base: 'Esecuzione di misure precontrattuali o contrattuali; legittimo interesse al riscontro',
    conservazione: 'Per il tempo necessario al riscontro e, se rilevante, secondo i termini contrattuali/amministrativi applicabili.',
  },
  {
    finalita: 'Gestione iscrizioni, richieste informative, servizi formativi e rapporti con utenti/clienti',
    dati: 'Dati anagrafici, contatti, dati professionali, dati necessari all’erogazione del servizio',
    base: 'Contratto, misure precontrattuali, obbligo di legge',
    conservazione: 'Per la durata del rapporto e per i termini di legge applicabili.',
  },
  {
    finalita: 'Adempimenti amministrativi, fiscali e contabili',
    dati: 'Dati anagrafici, fiscali, contabili, documentazione amministrativa',
    base: 'Obbligo di legge',
    conservazione: 'Secondo i termini civilistici, fiscali e contabili applicabili.',
  },
  {
    finalita: 'Invio di comunicazioni promozionali/newsletter, ove attivo',
    dati: 'Nome, e-mail, preferenze, eventuale storico consenso',
    base: 'Consenso dell’interessato, revocabile in ogni momento',
    conservazione: 'Fino a revoca del consenso o disiscrizione.',
  },
  {
    finalita: 'Sicurezza del sito, prevenzione abusi e gestione tecnica',
    dati: 'Indirizzi IP, log tecnici, dati di navigazione strettamente necessari',
    base: 'Legittimo interesse alla sicurezza e al corretto funzionamento del sito; obbligo di legge ove applicabile',
    conservazione: 'Per tempi tecnici proporzionati, salvo necessità di accertamento illeciti.',
  },
  {
    finalita: 'Cookie e strumenti di tracciamento',
    dati: 'Identificativi online, preferenze cookie, dati di navigazione secondo le categorie indicate nella Cookie Policy',
    base: 'Cookie tecnici: legittimo interesse/funzionamento del sito; cookie non tecnici: consenso',
    conservazione: 'Secondo la durata indicata nella tabella cookie.',
  },
];

export const categorieCookie = [
  { nome: 'Cookie tecnici o strettamente necessari', nota: 'Non richiedono consenso' },
  { nome: 'Cookie di preferenza', nota: 'Richiedono consenso' },
  { nome: 'Cookie statistici/analytics', nota: 'Richiedono consenso' },
  { nome: 'Cookie di marketing/profilazione o social', nota: 'Richiedono consenso' },
  { nome: 'Contenuti incorporati (video, mappe, plugin)', nota: 'Richiedono consenso' },
];

export const censimentoCookie = [
  {
    categoria: 'Tecnico',
    nome: 'Cookie di sessione del CMS / sito — nome tecnico variabile',
    fornitore: 'Alètheia S.r.l. / piattaforma sito',
    finalita: 'Gestione della sessione, sicurezza e corretta navigazione del sito',
    durata: 'Sessione',
    base: 'Non richiede consenso',
    note: 'Da confermare con scansione tecnica (Joomla/index.php).',
  },
  {
    categoria: 'Tecnico',
    nome: 'Cookie di preferenza consenso cookie — nome tecnico variabile',
    fornitore: 'Alètheia S.r.l. / eventuale CMP o plugin',
    finalita: 'Memorizzazione delle preferenze cookie dell’utente e prova tecnica della scelta',
    durata: '6/12 mesi',
    base: 'Non richiede consenso',
    note: 'Necessario se sono presenti cookie non tecnici.',
  },
  {
    categoria: 'Tecnico / autenticazione',
    nome: 'Cookie di login area riservata, ove utilizzata',
    fornitore: 'Alètheia S.r.l. / piattaforma sito',
    finalita: 'Gestione accesso ad area riservata e mantenimento sessione',
    durata: 'Sessione',
    base: 'Non richiede consenso',
    note: 'Verificare pagine "Accedi", piattaforma e-learning e servizi collegati.',
  },
  {
    categoria: 'Statistico',
    nome: 'Analytics, se presente (es. Google Analytics, Matomo)',
    fornitore: 'Fornitore analytics da verificare',
    finalita: 'Statistiche di navigazione, performance sito',
    durata: 'Secondo configurazione',
    base: 'Consenso (salvo anonimizzazione completa)',
    note: '',
  },
  {
    categoria: 'Terze parti / contenuti incorporati',
    nome: 'Video, mappe, social plugin, contenuti embedded',
    fornitore: 'YouTube/Google, Meta, altri',
    finalita: 'Visualizzazione contenuti esterni, interazione con piattaforme terze',
    durata: 'Secondo policy del terzo fornitore',
    base: 'Consenso preventivo',
    note: '',
  },
  {
    categoria: 'Marketing/profilazione',
    nome: 'Cookie pubblicitari o retargeting',
    fornitore: 'Fornitori advertising da verificare',
    finalita: 'Pubblicità personalizzata, profilazione, retargeting',
    durata: 'Secondo policy',
    base: 'Richiede consenso preventivo',
    note: 'Se assenti indicare "non utilizzati".',
  },
  {
    categoria: 'Antispam / sicurezza moduli',
    nome: 'Servizi antispam o protezione form',
    fornitore: 'Fornitore da verificare',
    finalita: 'Prevenzione spam, sicurezza form contatti o commenti',
    durata: 'Secondo configurazione',
    base: 'Tecnico se strettamente necessario, altrimenti consenso',
    note: '',
  },
];

export const cronologiaRevisioni = [
  { rev: 'Rev. 00', data: '10/01/2022', descrizione: 'Versione pubblicata sul sito.' },
  { rev: 'Rev. 01', data: '30/04/2026', descrizione: 'Aggiornamento GDPR, Cookie Policy, consenso, tabella cookie e indicazioni operative.' },
];
