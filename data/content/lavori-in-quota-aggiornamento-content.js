
// Contenuti editoriali per famiglia "Lavori in Quota" - variante AGGIORNAMENTO (4 ore).
// Stessa livelloKey 'default' del corso base, quindi chiave interna 'livello-1' - stesso pattern di
// data/content/carrelli-elevatori-aggiornamento-content.js.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento Addetti ai Lavori in Quota e Utilizzo DPI Anticaduta (III Categoria)',
    durataOre: 4,
    modalita: ['Aula'],
    validita: 'Da ripetere periodicamente',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: 140,

    descrizione: `Questo è il corso di aggiornamento per addetti ai lavori in quota e utilizzo DPI anticaduta di III categoria, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale di 8 ore e deve rinnovarlo periodicamente, ai sensi del D.Lgs 81/2008 coordinato con il D.Lgs 106/2009, artt. 36, 37, 76 e 77.

L'aggiornamento periodico è obbligatorio perché l'uso dei DPI anticaduta richiede una pratica costante per restare efficace in una situazione reale di emergenza: le manovre di posizionamento, accesso e soccorso in quota si affinano con l'esercizio ripetuto, ed è per questo che la normativa richiede un richiamo periodico sia teorico sia pratico, distinto dalla formazione iniziale più estesa.

Il corso, articolato in un unico modulo di 4 ore (2 ore di teoria e 2 ore di pratica), richiama i contenuti principali del corso base: protezione individuale e scelta dei DPI, obblighi dei lavoratori, caratteristiche dei DPI per la protezione dalle cadute dall'alto, durata e manutenzione, sistemi di protezione (posizionamento, trattenuta e anticaduta), equipaggiamento e collegamento corretto dei DPI, posizionamento su struttura verticale, accesso su scala semplice e soccorso dell'operatore in quota.

Il corso è pensato per chi ha già l'attestato base in scadenza o scaduto da poco. Chi invece ha un'abilitazione scaduta da troppo tempo, o non l'ha mai conseguita, deve necessariamente frequentare il corso base completo di 8 ore, non l'aggiornamento.

Il corso si svolge in aula e in area pratica presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda o in cantiere.`,

    aChiERivolto: [
      'Lavoratori già formati (8 ore) con abilitazione in scadenza',
      'Addetti di cantiere e manutentori che usano DPI anticaduta di III categoria',
      'Datori di lavoro',
      'Nota bene: chi ha l\'attestato scaduto da troppo tempo deve rifare il percorso base completo'
    ],

    cosaImparerai: [
      'Richiamare le modalità di scelta e adeguatezza dei DPI',
      'Consolidare gli obblighi dei lavoratori',
      'Aggiornare le norme su durata, manutenzione e conservazione dei DPI',
      'Applicare le procedure di verifica e controllo dei DPI',
      'Esercitarsi in vestizione, collegamento e posizionamento su struttura verticale',
      'Consolidare le tecniche di soccorso'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovato?',
        risposta: 'Va ripetuto periodicamente per preservare la validità dell\'attestato e la sicurezza operativa.'
      },
      {
        domanda: 'Quanto dura l\'aggiornamento?',
        risposta: '4 ore complessive: 2 ore di richiamo teorico e 2 ore di prove pratiche.'
      },
      {
        domanda: 'Include esercitazioni pratiche?',
        risposta: 'Sì, la metà del corso prevede addestramento su equipaggiamento, collegamento DPI, struttura verticale, scala semplice e soccorso.'
      },
      {
        domanda: 'Cosa succede se l\'attestato è scaduto da tempo?',
        risposta: 'L\'aggiornamento da solo potrebbe non bastare: potrebbe essere necessario rifare il corso base da 8 ore. Contattaci per una verifica.'
      },
      {
        domanda: 'È organizzabile per tutta la squadra?',
        risposta: 'Sì, organizziamo sessioni su misura in azienda o direttamente in cantiere.'
      }
    ],

    moduli: [
      {
        titolo: 'MODULO UNICO - RICHIAMO TEORICO E ADDESTRAMENTO PRATICO',
        durataOreTeoria: 2,
        durataOrePratica: 2,
        argomenti: [
          'Richiamo teorico-normativo sui sistemi di protezione',
          'Verifica dei DPI',
          'Vestizione ed equipaggiamento',
          'Salita su scala semplice',
          'Simulazione di soccorso dell\'operatore in quota'
        ]
      }
    ],

    // Il corso base è uno switch sulla STESSA pagina (non una pagina separata): qui vanno linkati
    // solo corsi realmente esterni alla famiglia.
    corsiCorrelati: [
      'pimus-ponteggi',
      'antincendio-livello-2',
      'coordinatori-cantieri-cse-csp'
    ]
  }
};
