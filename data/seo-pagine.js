/**
 * SEO delle pagine statiche del sito: UN solo posto per titolo e descrizione (lo legge components/SeoCentrale.tsx, montato in _app.js).
 * Le pagine dinamiche (schede corso, news, archivio, aiuti di Stato) passano `seo` tra le props di getStaticProps (vedi lib/seo.ts).
 *
 *  - nome:        nome della pagina; il <title> è "<nome> - Alètheia Srl" (lib/seo.ts → titoloPagina);
 *  - descrizione: 140-160 caratteri, unica per pagina (la controlla tests/regressione/seo.spec.mjs).
 * Se la pagina riceve titolo/descrizione da WordPress (`pagina.seo`), quelli hanno la precedenza.
 */
const SEO_PAGINE = {
  '/': {
    nome: 'Formazione professionale e lavoro',
    descrizione: 'Alètheia Srl, ente di formazione accreditato e Agenzia per il Lavoro a Vittoria (RG): corsi obbligatori e finanziati, certificazioni e inserimento lavorativo.',
  },
  '/chi-siamo': {
    nome: 'Chi Siamo',
    descrizione: 'Alètheia Srl: mission, vision e valori di un ente di formazione e Agenzia per il Lavoro attivo dal 2005 a Vittoria (RG), parte del gruppo Promotergroup.',
  },
  '/contatti': {
    nome: 'Contatti',
    descrizione: 'Contatta Alètheia Srl: sedi a Vittoria, Ragusa, Pozzallo e Acate, telefono +39 0932 862613, email info@aletheiasrl.it. Formazione e lavoro in Sicilia.',
  },
  '/calendario-corsi': {
    nome: 'Calendario corsi',
    descrizione: 'Date dei prossimi corsi in partenza di Alètheia Srl: sicurezza sul lavoro, formazione obbligatoria e finanziata. Filtra per mese o categoria e prenota il posto.',
  },
  '/corsi': {
    nome: 'Corsi di formazione',
    descrizione: 'Catalogo dei corsi Alètheia Srl a Vittoria (RG): sicurezza sul lavoro, decreto attrezzature, fitosanitario, certificazioni ICDL e corsi qualificati.',
  },
  '/agenzia-per-il-lavoro': {
    nome: 'Agenzia per il Lavoro',
    descrizione: 'Alètheia Srl, Agenzia per il Lavoro autorizzata: somministrazione, ricerca e selezione, outplacement e formazione per persone e imprese in Sicilia.',
  },
  '/agenzia-per-il-lavoro/servizi-alla-persona': {
    nome: 'Servizi alla Persona',
    descrizione: 'Servizi alla persona di Alètheia Srl: ricerca del lavoro, orientamento professionale, Programma G.O.L., Garanzia Giovani e outplacement in Sicilia.',
  },
  '/agenzia-per-il-lavoro/servizi-alle-imprese': {
    nome: 'Servizi alle Imprese',
    descrizione: 'Consulenza HR integrata di Alètheia Srl per le imprese: somministrazione, ricerca e selezione, formazione aziendale e intermediazione lavoro in Sicilia.',
  },
  '/programma-gol': {
    nome: 'Programma G.O.L.',
    descrizione: 'Alètheia Srl è operatore accreditato del Programma G.O.L. (Garanzia di Occupabilità dei Lavoratori): percorsi gratuiti di orientamento e formazione in Sicilia.',
  },
  '/formazione/obbligatoria': {
    nome: 'Formazione obbligatoria sicurezza sul lavoro',
    descrizione: 'Corsi obbligatori D.Lgs. 81/08 a Vittoria (RG): lavoratori, preposti, antincendio, primo soccorso, attrezzature e fitosanitario. Attestati validi in Italia.',
  },
  '/formazione/regionale': {
    nome: 'Formazione regionale',
    descrizione: 'Formazione regionale finanziata dalla Regione Siciliana: FSE+, POC Sicilia, Garanzia Giovani e Programma G.O.L. Percorsi spesso gratuiti per i partecipanti.',
  },
  '/formazione/regionale-fse': {
    nome: 'Formazione finanziata in Sicilia',
    descrizione: 'Corsi gratuiti in Sicilia finanziati da Regione Siciliana, Fondi Interprofessionali e Fondo Nuove Competenze. Alètheia Srl è ente di formazione accreditato.',
  },
  '/formazione/fondi-interprofessionali': {
    nome: 'Fondi Interprofessionali per aziende',
    descrizione: 'Trasforma i contributi INPS che la tua azienda già versa in formazione gratuita per i dipendenti con i Fondi Interprofessionali. Alètheia gestisce la pratica.',
  },
  '/formazione/fondo-nuove-competenze': {
    nome: 'Fondo Nuove Competenze',
    descrizione: 'Con il Fondo Nuove Competenze le imprese destinano ore di lavoro alla formazione e ottengono il rimborso del costo. Alètheia ti accompagna in ogni fase.',
  },
  '/formazione/professionale-specialistica': {
    nome: 'Formazione professionale e specialistica',
    descrizione: 'Corsi qualificati, certificazioni ICDL, corsi ECM e formazione per la Pubblica Amministrazione. Alètheia: ente accreditato Regione Siciliana, Test Center AICA.',
  },
  '/formazione/ecm': {
    nome: 'Corsi ECM per professionisti sanitari',
    descrizione: 'Corsi ECM accreditati per medici, infermieri, fisioterapisti e OSS in Sicilia, in aula e in FAD. Alètheia Srl è provider ECM della Regione Siciliana.',
  },
  '/formazione/corsi-pa': {
    nome: 'Formazione per la Pubblica Amministrazione',
    descrizione: 'Formazione per Comuni, enti locali e aziende pubbliche, attivabile tramite MEPA. Alètheia: ente accreditato Regione Siciliana, oltre 20 anni di esperienza.',
  },
  '/formazione/avviso-1-2026-poc': {
    nome: 'Avviso 1/2026 POC Sicilia',
    descrizione: 'Avviso pubblico 1/2026 POC Sicilia 2014/2020: catalogo regionale di percorsi formativi di qualificazione per disoccupati, inoccupati e inattivi. Alètheia Srl.',
  },
  '/news': {
    nome: 'News',
    descrizione: 'Notizie e aggiornamenti di Alètheia Srl su formazione, sicurezza sul lavoro, bandi e opportunità professionali in Sicilia: il blog dell’ente di formazione.',
  },
  '/archivio': {
    nome: 'Archivio avvisi e bandi',
    descrizione: 'Archivio storico di Alètheia Srl: avvisi pubblici, bandi di selezione di allievi e docenti, esiti e documenti dei corsi finanziati realizzati negli anni.',
  },
  '/aiuti-di-stato/2023': {
    nome: 'Aiuti di Stato 2023',
    descrizione: 'Obblighi di pubblicazione di Alètheia Srl per i beneficiari di contributi pubblici nel 2023: elenco degli aiuti di Stato ricevuti, come previsto dalla legge.',
  },
  '/aiuti-di-stato/2024': {
    nome: 'Aiuti di Stato 2024',
    descrizione: 'Obblighi di pubblicazione di Alètheia Srl per i beneficiari di contributi pubblici nel 2024: elenco degli aiuti di Stato ricevuti, come previsto dalla legge.',
  },
  '/reclami-proposte': {
    nome: 'Reclami e proposte',
    descrizione: 'Invia un reclamo o una proposta ad Alètheia Srl: compila il modulo, anche in forma anonima, e ti rispondiamo per migliorare il servizio di formazione.',
  },
  '/privacy-cookie': {
    nome: 'Privacy e Cookie Policy',
    descrizione: 'Informativa privacy e cookie policy del sito di Alètheia Srl, Vittoria (RG): come trattiamo i dati personali e i cookie, aggiornata ai sensi del GDPR.',
  },
  '/richiedi-preventivo': {
    nome: 'Richiedi un preventivo',
    descrizione: 'Richiedi un preventivo gratuito per i corsi di formazione Alètheia Srl: indica corso, partecipanti e modalità e ti rispondiamo entro 24 ore lavorative.',
  },
  '/iscrizione': {
    nome: 'Iscrizione al corso',
    descrizione: 'Iscriviti a un corso Alètheia Srl a partenza differita (OSS, ASACOM, Conduttore d’Impresa Agricola, BLSD): nessun pagamento anticipato, ti contattiamo noi.',
  },
  '/pre-iscrizione': {
    nome: 'Pre-iscrizione al corso',
    descrizione: 'Pre-iscriviti a un corso finanziato Alètheia Srl (avvisi pubblici): senza impegno e senza pagamento; la pre-iscrizione non garantisce il posto.',
  },
};

/** Pagine di servizio: raggiungibili dal sito ma fuori dalla sitemap (sono moduli o strumenti, non contenuti da posizionare). */
const PAGINE_SERVIZIO = ['/richiedi-preventivo', '/iscrizione', '/pre-iscrizione', '/diagnostica', '/diagnostica-b', '/diagnostica-c'];

module.exports = { SEO_PAGINE, PAGINE_SERVIZIO };
