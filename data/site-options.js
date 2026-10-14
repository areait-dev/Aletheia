// Contenuti globali (identità, Header, Footer) oggi hardcodati nei componenti. Sorgente locale: con WP_URL attivo
// prevalgono i campi della pagina WP "opzioni-globali" (vedi lib/wp-site.ts); un campo vuoto ripiega su questi valori.
export const SITE_OPTIONS = {
  identita: {
    telefono: '+39 0932 862613',
    email: 'info@aletheiasrl.it',
    orari: 'Lun - Ven · 9:00-13:00 / 14:00-18:00',
    social: [
      { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/aletheiasrl.it/?locale=it_IT', name: 'Facebook' },
      { icon: 'fab fa-instagram', href: 'https://www.instagram.com/aletheiasrl/', name: 'Instagram' },
      { icon: 'fab fa-linkedin-in', href: 'https://it.linkedin.com/company/al%C3%A9theia-srl', name: 'LinkedIn' },
      { icon: 'fab fa-telegram', href: 'https://t.me/alethiaapl', name: 'Telegram' },
    ],
  },
  header: {
    // href vuoto = voce che apre il mega-menu (Formazione)
    links: [
      { label: 'Home', href: '/' },
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'Formazione', href: '' },
      { label: 'Agenzia per il Lavoro', href: '/agenzia-per-il-lavoro' },
      { label: 'News', href: '/news' },
      { label: 'Contatti', href: '/contatti' },
    ],
    formazione: [
      {
        title: 'Formazione Finanziata',
        href: '/formazione/regionale-fse',
        items: [
          { label: 'Formazione Regionale', href: '/formazione/regionale' },
          { label: 'Fondi Interprofessionali', href: '/formazione/fondi-interprofessionali' },
          { label: 'Fondo Nuove Competenze', href: '/formazione/fondo-nuove-competenze' },
        ],
      },
      {
        title: 'Formazione Obbligatoria',
        href: '/formazione/obbligatoria',
        items: [
          { label: 'Sicurezza sui luoghi di lavoro', href: '/all-courses?categoria=sicurezza-lavoro' },
          { label: 'Decreto attrezzature', href: '/all-courses?categoria=decreto-attrezzature' },
          { label: 'Fitosanitario', href: '/all-courses?categoria=fitosanitario' },
          { label: 'Sicurezza alimentare', href: '/all-courses?categoria=sicurezza-alimentare' },
        ],
      },
      {
        title: 'Formazione Professionale e PA',
        href: '/formazione/professionale-specialistica',
        items: [
          { label: 'Certificazioni Informatiche', href: '/all-courses?categoria=certificazioni-informatiche' },
          { label: 'Corsi Qualificati', href: '/all-courses?categoria=certificazione' },
          { label: 'ECM', href: '/formazione/ecm' },
          { label: 'Corsi per la PA', href: '/formazione/corsi-pa' },
        ],
      },
    ],
    ctaLavoro: { label: 'Sei un docente? Candidati', href: 'https://aletheia4job.it/diventa-docente' },
    elearning: { label: 'Piattaforma E-learning', href: 'https://www.aletheiasrl.it/elearning2/' },
    megaCalendario: {
      titolo: 'Calendario Corsi',
      testo: 'Scopri le date dei prossimi corsi in partenza e pianifica la tua formazione.',
      btn: { label: 'Calendario Corsi', href: '/calendario-corsi' },
    },
    megaCorsiBtn: { label: 'Scopri tutti i corsi', href: '/all-courses' },
  },
  footer: {
    indirizzo: 'Via del Carrubo, snc - 97019 Vittoria (RG)',
    indirizzoLink: 'https://www.google.com/maps/search/?api=1&query=Via+del+Carrubo+Vittoria+RG',
    linkLegali: [
      { label: 'Privacy e Cookie', href: '/privacy-cookie' },
      { label: 'Reclami e Proposte', href: '/reclami-proposte' },
      { label: 'Obblighi di pubblicazione per i beneficiari di contributi 2023', href: '/aiuti-di-stato/2023' },
      { label: 'Obblighi di pubblicazione per i beneficiari di contributi 2024', href: '/aiuti-di-stato/2024' },
    ],
    colonne: [
      {
        titolo: 'Link rapidi',
        gruppi: [
          {
            sottotitolo: 'Formazione',
            links: [
              { label: 'Catalogo corsi (pdf scaricabile)', href: '/pdf/catalogo.pdf' },
              { label: 'Calendario corsi', href: '/calendario-corsi' },
              { label: 'Piattaforma e-learning', href: 'https://www.aletheiasrl.it/elearning2/' },
            ],
          },
          {
            sottotitolo: '',
            links: [
              { label: 'Agenzia per il lavoro', href: '/agenzia-per-il-lavoro' },
              { label: 'Chi siamo', href: '/chi-siamo' },
              { label: 'News', href: '/news' },
              { label: 'Archivio', href: '/archivio' },
              { label: 'Contatti', href: '/contatti' },
            ],
          },
        ],
      },
    ],
    accreditamentiTitolo: 'Accreditamenti e certificazioni',
    accreditamenti: [
      'Accreditamento APL D.D.S n. 1100 del 26/04/2019',
      'Test Center AICA n. AKHF0001',
      'UNI ISO 29992:2019',
      'UNI ISO 29993:2019',
    ],
    copyright: '© 2026 Alètheia S.r.l. · P.IVA 01524530894 · aletheiasrl@legalmail.it',
    creditsTesto: 'Ente della rete di imprese',
    creditsLink: { label: 'Promotergroup', href: 'https://www.promotergroup.eu' },
  },
  contatti: {
    motivi: [
      'Informazioni su un corso',
      'Candidatura / ricerca lavoro',
      'Servizi alle imprese',
      'Formazione obbligatoria',
      'Formazione finanziata',
      'Richiesta preventivo',
      'Altro',
    ],
  },
  moduli: {
    serviziCandidato: [
      'Ricerca Attiva del Lavoro',
      'Orientamento Professionale',
      'Supporto al Colloquio',
      'Programma G.O.L.',
      'Garanzia Giovani',
      'Outplacement',
      'Candidatura Spontanea',
    ],
    settoriAzienda: [
      'Agricoltura / Agroalimentare',
      'Commercio / Retail',
      'Edilizia / Costruzioni',
      'Industria / Manifatturiero',
      'Informatica / Tecnologia',
      'Pubblica Amministrazione',
      'Sanità / Assistenza',
      'Servizi / Consulenza',
      'Turismo / Ristorazione',
      'Altro',
    ],
    dipendentiAzienda: ['1-10', '11-50', '51-200', 'Oltre 200'],
    serviziAzienda: [
      'Somministrazione di Lavoro',
      'Ricerca e Selezione del Personale',
      'Consulenza HR',
      'Formazione Aziendale',
      'Intermediazione Lavoro',
      'Riqualificazione e Upskilling',
    ],
    // Testo del consenso: [etichetta](URL) = link
    privacyTesto: 'Ho letto e accetto la [Privacy Policy](/privacy-cookie) di Alètheia S.r.l.',
    // Messaggio di invio riuscito: titolo + testo, per i due moduli
    successoCandidato: { titolo: 'Candidatura inviata!', testo: 'Grazie per averci contattato. Uno dei nostri consulenti ti risponderà entro 24 ore lavorative.' },
    successoAzienda: { titolo: 'Richiesta inviata!', testo: 'Grazie per averci contattato. Un nostro consulente HR ti risponderà entro 24 ore lavorative.' },
    successoReclami: { titolo: 'Segnalazione inviata!', testo: 'Grazie per averci contattato. Valuteremo la tua segnalazione nel più breve tempo possibile.' },
  },
  chatbot: {
    attivo: true,
    nome: 'Assistente Alètheia',
    benvenuto: 'Rispondo subito alle tue domande',
    placeholder: 'Scrivi una domanda su corsi o lavoro...',
    fallback: 'Non ho trovato una risposta precisa a questa domanda. Puoi contattarci direttamente:',
    email: 'info@aletheiasrl.it',
  },
  seo: { ogImage: '', verificaGoogle: '', descrizione: '' },
  legale: {
    // [etichetta](URL) = link
    banner: "Utilizziamo cookie tecnici e, previo consenso, cookie non tecnici per migliorare l'esperienza sul sito. Consulta la nostra [Privacy e Cookie Policy](/privacy-cookie) per maggiori informazioni.",
    btnAccetta: 'Accetta',
    btnRifiuta: 'Rifiuta',
  },
};
