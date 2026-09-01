
// Contenuti editoriali per la variante "Aggiornamento" (4 ore) della famiglia dpi-3-categoria, tratti
// dal programma corso ufficiale Alètheia "AGGIORNAMENTO ALL'UTILIZZO DI DPI III CATEGORIA [4 ORE]"
// (D.Lgs. 9 aprile 2008 n. 81, artt. 76 e 77 e s.m.i.). La famiglia ha una sola livelloKey ('default'),
// quindi la chiave posizionale è 'livello-1' (vedi editorialLivelloKey in pages/all-courses/[slug].js).
// Il corso base (8 ore) non ha ancora un programma corso ufficiale fornito: solo "aggiornamento" è
// popolato in EDITORIAL_CONTENT.

module.exports = {
  'livello-1': {
    titolo: 'Aggiornamento DPI III Categoria',
    durataOre: 4,
    modalita: ['Aula', 'Pratica'],
    validita: 'Aggiornamento periodico previsto dalla normativa',
    attestato: 'Attestato valido in tutta Italia',
    partecipantiMax: 30,
    prezzo: null,

    descrizione: `Questo è il corso di aggiornamento all'utilizzo dei Dispositivi di Protezione Individuale (DPI) di III categoria, della durata di 4 ore, ai sensi degli artt. 76 e 77 del D.Lgs. 81/2008 e s.m.i. È rivolto a chi utilizza già DPI anticaduta di terza categoria e deve rinnovare periodicamente la propria formazione.

Il corso è composto da un Modulo I teorico (2 ore), che ripercorre le tipologie di DPI anticaduta di terza categoria, i criteri di individuazione dei sistemi più adeguati ai rischi specifici, la normativa e le caratteristiche tecniche, e un Modulo II pratico (2 ore), con esercitazioni di vestizione e svestizione con imbracature, cordini e DPI di III categoria in dotazione, oltre alla scelta di ancoraggi, sistemi di aggancio, linee vita e dispositivi di ancoraggio.

Si precisa che questo modulo di aggiornamento non assolve a quanto previsto dal comma 5 dell'art. 37 del D.Lgs. 81/2008.`,

    aChiERivolto: [
      'Lavoratori già formati all\'uso di DPI anticaduta di III categoria con formazione in scadenza',
      'Addetti che utilizzano imbracature, cordini e sistemi anticaduta nell\'attività lavorativa',
      'Datori di lavoro che devono garantire l\'aggiornamento periodico dei propri addetti',
    ],

    cosaImparerai: [
      'Aggiornare la conoscenza delle tipologie di DPI anticaduta di terza categoria',
      'Individuare i sistemi anticaduta più adeguati ai rischi del lavoro da svolgere',
      'Scegliere correttamente ancoraggi, dissipatori di energia e sistemi di aggancio',
      'Indossare e togliere correttamente un\'imbracatura anticaduta',
      'Utilizzare linee vita e dispositivi di ancoraggio flessibili orizzontali',
      'Eseguire le verifiche e la manutenzione dei DPI anticaduta',
    ],

    faq: [
      {
        domanda: 'Chi deve seguire questo aggiornamento sui DPI III categoria?',
        risposta: "Il corso è rivolto a chi utilizza già DPI anticaduta di terza categoria (imbracature, cordini, sistemi di ancoraggio) e deve rinnovare periodicamente la formazione ai sensi degli artt. 76 e 77 del D.Lgs. 81/2008.",
      },
      {
        domanda: 'Quanto dura e come si articola l\'aggiornamento?',
        risposta: 'Dura 4 ore complessive: un Modulo I teorico (2 ore) e un Modulo II pratico (2 ore) con esercitazioni di vestizione/svestizione e uso dei DPI anticaduta.',
      },
      {
        domanda: 'Questo corso sostituisce la formazione ex art. 37 comma 5?',
        risposta: 'No, il programma precisa espressamente che questo modulo di aggiornamento non assolve a quanto previsto dal comma 5 dell\'art. 37 del D.Lgs. 81/2008.',
      },
    ],

    moduli: [
      {
        titolo: 'MODULO I - TEORICO',
        durataOre: 2,
        argomenti: [
          'Tipologie dei DPI anticaduta di terza categoria',
          'Individuazione dei sistemi anticaduta più corretti e adeguati ai rischi del lavoro',
          'Normativa e caratteristiche tecniche',
          'Modalità per il corretto uso degli anticaduta in relazione alle problematiche operative',
          'Verifiche e manutenzione dei DPI',
        ],
      },
      {
        titolo: 'MODULO II - PRATICO',
        durataOre: 2,
        argomenti: [
          'Corretto metodo per indossare un\'imbracatura anticaduta',
          'Scelta dei DPI anticaduta e del casco di protezione',
          'Valutazione nella scelta dei dissipatori di energia',
          'Scelta dell\'ancoraggio e del sistema di aggancio',
          'Linee vita e linee di ancoraggio flessibili orizzontali',
          'Dispositivi di ancoraggio',
          'Esercitazioni pratiche di vestizione e svestizione con imbracature, cordino e DPI di III categoria',
        ],
      },
    ],

    corsiCorrelati: [
      'lavori-in-quota',
    ],
  },
};
