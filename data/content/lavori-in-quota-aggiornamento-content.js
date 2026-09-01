
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

    descrizione: `Questo è il corso di Aggiornamento all'Utilizzo di DPI III Categoria, della durata di 4 ore, non il corso base: è riservato a chi possiede già l'attestato di formazione iniziale di 8 ore e deve rinnovarlo periodicamente, ai sensi degli artt. 76 e 77 del D.Lgs 81/2008 e s.m.i.

L'aggiornamento periodico è obbligatorio perché l'uso dei DPI anticaduta richiede una pratica costante per restare efficace in una situazione reale di emergenza: le manovre di vestizione, ancoraggio e aggancio si affinano con l'esercizio ripetuto, ed è per questo che la normativa richiede un richiamo periodico sia teorico sia pratico, distinto dalla formazione iniziale più estesa.

Il corso si articola in due moduli: il Modulo I teorico (2 ore), su tipologie di DPI anticaduta di terza categoria, individuazione dei sistemi più adeguati ai rischi, normativa, caratteristiche tecniche, corretto uso, verifiche e manutenzione; il Modulo II pratico (2 ore), con esercitazioni di vestizione e svestizione con imbracature, cordini e DPI di III categoria, scelta dell'ancoraggio e del sistema di aggancio, linee vita e linee di ancoraggio flessibili orizzontali.

Si precisa che questo modulo di aggiornamento non assolve a quanto previsto dal comma 5 dell'art. 37 del D.Lgs 81/2008.

Il corso è pensato per chi ha già l'attestato base in scadenza o scaduto da poco. Chi invece ha un'abilitazione scaduta da troppo tempo, o non l'ha mai conseguita, deve necessariamente frequentare il corso base completo di 8 ore, non l'aggiornamento.

Il corso si svolge in aula e in area pratica presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda o in cantiere.`,

    aChiERivolto: [
      'Lavoratori già formati (8 ore) con abilitazione in scadenza',
      'Addetti di cantiere e manutentori che usano DPI anticaduta di III categoria',
      'Datori di lavoro',
      'Nota bene: chi ha l\'attestato scaduto da troppo tempo deve rifare il percorso base completo'
    ],

    cosaImparerai: [
      'Riconoscere le tipologie dei DPI anticaduta di terza categoria',
      'Individuare i sistemi anticaduta più corretti e adeguati ai rischi connessi al lavoro da svolgere',
      'Aggiornare le conoscenze su normativa, caratteristiche tecniche, verifiche e manutenzione dei DPI',
      'Indossare correttamente un\'imbracatura anticaduta e scegliere casco e dissipatori di energia idonei',
      'Scegliere l\'ancoraggio e il sistema di aggancio più adatto, incluse le linee vita orizzontali flessibili',
      'Esercitarsi in vestizione e svestizione con DPI di III categoria specifici'
    ],

    faq: [
      {
        domanda: 'Ogni quanto va rinnovato?',
        risposta: 'Va ripetuto periodicamente per preservare la validità dell\'attestato e la sicurezza operativa.'
      },
      {
        domanda: 'Quanto dura l\'aggiornamento?',
        risposta: '4 ore complessive: 2 ore di modulo teorico e 2 ore di modulo pratico.'
      },
      {
        domanda: 'Questo aggiornamento sostituisce anche la formazione lavori in quota prevista dal comma 5 art. 37 D.Lgs 81/2008?',
        risposta: 'No, questo modulo di aggiornamento sui DPI di III categoria non assolve a quanto previsto dal comma 5 dell\'art. 37 del D.Lgs 81/2008.'
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
        titolo: 'MODULO I - MODULO TEORICO',
        durataOre: 2,
        argomenti: [
          'Le tipologie dei DPI anticaduta di terza categoria',
          'Individuazione dei sistemi anticaduta più corretti e adeguati ai rischi connessi al tipo di lavoro da svolgere',
          'Normativa e caratteristiche tecniche',
          'Definizione delle modalità per il corretto uso degli anticaduta in relazione alle problematiche operative',
          'Verifiche e manutenzione'
        ]
      },
      {
        titolo: 'MODULO II - MODULO PRATICO',
        durataOre: 2,
        argomenti: [
          'Corretto metodo per indossare un\'imbracatura anticaduta',
          'Scelta dei DPI anticaduta, del casco di protezione e dei dissipatori di energia',
          'Scelta dell\'ancoraggio e sistema di aggancio',
          'Linee vita e linee di ancoraggio flessibili orizzontali; dispositivi di ancoraggio',
          'Esercitazioni pratiche di vestizione e svestizione con DPI specifici (imbracature, cordino e DPI di III categoria previsti dall\'azienda)'
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
