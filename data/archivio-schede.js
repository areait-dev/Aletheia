// Voci dell'archivio con layout "a scheda" (hero con briciole e badge, requisiti, blocco extra, documenti, contatti).
// Sorgente locale: con WP_URL attivo una voce WordPress con lo stesso percorso le sostituisce (vedi lib/wp-archivio.ts;
// i campi corrispondono ai campi ACF del tipo `archivio`, gruppo "Layout a scheda").
// `fuoriElenco`: come prima della migrazione, non compaiono nell'elenco di /archivio (si arriva dai link delle pagine).
export const SCHEDE_ARCHIVIO = [
  {
    slug: 'avviso-1-2026-poc',
    titolo: 'Avviso pubblico n. 1/2026 POC Sicilia 2014-2020',
    metaTitolo: 'Avviso 1/2026 POC Sicilia - Alètheia Srl',
    metaDescrizione: "Avviso pubblico n. 1/2026 POC Sicilia 2014-2020: catalogo regionale dell'offerta formativa, percorsi di qualificazione gratuiti per disoccupati e inoccupati in Sicilia.",
    fuoriElenco: true,
    descrizione: "L'avviso promuove l'apprendimento permanente e il miglioramento del livello delle competenze, anticipando le nuove esigenze richieste dal mercato del lavoro e facilitando il riorientamento professionale. Sono previste 19 qualifiche professionali, con percorsi della durata variabile da 120 a 600 ore.",
    documenti: [
      { titoloLink: 'Catalogo completo dei corsi', percorsoLocale: 'https://www.aletheiasrl.it/images/AVVISO1-POC/catalogo_completo.pdf' },
      { titoloLink: 'Catalogo descrittivo dei corsi', percorsoLocale: 'https://www.aletheiasrl.it/images/AVVISO1-POC/catalogo_corsi_web.pdf' },
      { titoloLink: 'Bando selezione allievi', percorsoLocale: 'https://www.aletheiasrl.it/images/AVVISO1-POC/BANDO-ALLIEVI-avv.-1.26-POC-Sicilia_Aletheia.pdf' },
      { titoloLink: 'Domanda di iscrizione allievi', percorsoLocale: 'https://www.aletheiasrl.it/images/AVVISO1-POC/Domanda-di-iscrizione-ALLIEVI_Avv.1.26-POC-Sicilia.pdf' },
      { titoloLink: 'Bando selezione docenti', percorsoLocale: 'https://www.aletheiasrl.it/images/AVVISO1-POC/BANDO-DOCENTI-avv.-1.26-POC-Sicilia_Aletheia.pdf' },
      { titoloLink: 'Domanda di iscrizione docenti', percorsoLocale: 'https://www.aletheiasrl.it/images/AVVISO1-POC/allegati-bando-DOCENTI-avv.-1.26-POC-Sicilia_Aletheia.pdf' },
    ],
    scheda: {
      titoloBreve: 'Avviso 1/2026 POC',
      badge: 'Corsi con qualifica professionale',
      sottotitolo: "Costituzione del Catalogo Regionale dell'offerta formativa e realizzazione di percorsi di qualificazione mirati al rafforzamento dell'occupabilità in Sicilia.",
      requisitiIntro: 'Possono partecipare le persone non occupate (disoccupati, inoccupati, inattivi) in possesso dei seguenti requisiti:',
      requisiti: [
        'Residenza o domicilio in Sicilia',
        'Età lavorativa',
        'Titolo di studio minimo richiesto per il percorso scelto',
        'Per cittadini extra UE: regolare permesso di soggiorno valido',
      ],
      extraTitolo: 'Qualifiche disponibili (esempi)',
      extraTipo: 'chips',
      extra: [
        'Addetto Giardinaggio', 'Panificatore Pasticciere', 'Pizzaiolo', 'Acconciatore', 'Estetista',
        'Tecnico Laboratorio Educativo', 'Operatore Informatico', 'Sarto Confezionista', 'Addetto Elettrico',
        'Amministrativo', 'Contabilità', 'Magazzino e Logistica',
      ],
      avviso: 'Scadenza pre-iscrizioni: 13 aprile 2026, ore 16:00. Pre-iscrizione online su [corsi.aletheiasrl.it](https://corsi.aletheiasrl.it/).',
      contatti: false,
    },
  },
  {
    slug: 'avviso-20-2024-fse',
    titolo: 'Avviso 20/2024 FSE+ — Assistente Familiare',
    metaTitolo: 'Avviso 20/2024 FSE+ - Assistente Familiare - Alètheia Srl',
    metaDescrizione: 'Avviso 20/2024 FSE+: percorso gratuito per la qualifica di Assistente Familiare, rivolto a disoccupati e inoccupati in Sicilia. Alètheia Srl, ente accreditato.',
    fuoriElenco: true,
    descrizione: 'Il percorso mira a fornire e sviluppare competenze tecnico-professionali, relazionali, comunicative e socio-culturali nell\'ambito dell\'assistenza familiare, con il rilascio della qualifica di "Assistente Familiare" secondo il D.A. n. 5816 del 26 luglio 2017. La figura professionale assiste al domicilio persone con ridotta o nulla autosufficienza, fornendo prestazioni preventive, assistenziali e riabilitative.',
    documenti: [
      { titoloLink: 'Bando selezione allievi', percorsoLocale: 'https://www.aletheiasrl.it/images/avviso20_2024/BANDO_ALLIEVI_avv20_2024fse_Aletheia.pdf' },
      { titoloLink: 'Domanda di iscrizione allievi', percorsoLocale: 'https://www.aletheiasrl.it/images/avviso20_2024/Domanda_iscrizione_ALLIEVI_avv20_2024.pdf' },
      { titoloLink: 'Bando selezione docenti', percorsoLocale: 'https://www.aletheiasrl.it/images/avviso20_2024/BANDO_DOCENTI_avv20_2024fse_Aletheia.pdf' },
      { titoloLink: 'Domanda di iscrizione docenti', percorsoLocale: 'https://www.aletheiasrl.it/images/avviso20_2024/allegati_bando_DOCENTI_avv20_2024_Aletheia.pdf' },
    ],
    scheda: {
      titoloBreve: 'Avviso 20/2024 FSE+',
      badge: 'Assistente Familiare',
      sottotitolo: 'Percorso finanziato per la formazione della figura professionale di Assistente Familiare, rivolto a disoccupati e inoccupati in Sicilia. 300 ore tra formazione teorica, attività pratiche e stage.',
      requisitiIntro: '',
      requisiti: [
        'Persone non occupate (disoccupati, inoccupati, inattivi)',
        'Residenti o domiciliati in Sicilia',
        'Età compresa tra 18 e 64 anni',
        'Possesso del titolo di studio minimo richiesto',
        'Per cittadini extra UE: regolare permesso di soggiorno valido',
      ],
      extraTitolo: 'Sedi del corso',
      extraTipo: 'sedi',
      extra: [
        'Via del Carrubo snc, 97019 Vittoria (RG)',
        'Via Ginevra n. 9, 97016 Pozzallo (RG)',
        'Piazza Aldo Moro n. 7, 95040 Mirabella Imbaccari (CT)',
      ],
      avviso: '',
      contatti: true,
    },
  },
];
