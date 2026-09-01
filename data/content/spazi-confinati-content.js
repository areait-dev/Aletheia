
// Contenuti editoriali per famiglia "Spazi Confinati" (ex pagina isolata pages/all-courses/spazi-confinati.js).
// Famiglia a variante unica (livelloKey 'default'): un solo livello posizionale 'livello-1' condiviso da
// corso e aggiornamento (vedi spazi-confinati-aggiornamento-content.js), stesso pattern di
// carrelli-elevatori-content.js. Chiave di primo livello = family.id ("spazi-confinati").

module.exports = {
  'spazi-confinati': {
    'livello-1': {
      titolo: 'Corso Spazi Confinati o Sospetti di Inquinamento',
      durataOre: 12,
      modalita: ['Aula'],
      validita: 'Aggiornamento ogni 5 anni ai sensi del D.P.R. 177/2011',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 280,

      descrizione: `Il Corso di Formazione per Lavoratori, Datori di Lavoro e Lavoratori Autonomi che Operano in Ambienti Sospetti di Inquinamento o Confinati, della durata di 12 ore, è obbligatorio ai sensi degli artt. 37, 66 e 121 del D.Lgs 81/2008, dell'art. 2, lett. d), del D.P.R. n. 177 del 14 settembre 2011 e dell'Accordo Stato Regioni del 17 aprile 2025.

Gli ambienti confinati o sospetti di inquinamento - come cisterne, silos, pozzi, fogne, vasche, serbatoi e vani interrati - sono tra i contesti di lavoro più pericolosi in assoluto: atmosfere con difetto o eccesso di ossigeno, presenza di agenti chimici pericolosi per asfissia o intossicazione, rischio di esplosione e incendio, seppellimento e cadute dall'alto rendono necessaria una formazione approfondita.

Il corso si articola in due moduli: il Modulo I teorico (4 ore), focalizzato su normativa, identificazione dei rischi e procedure di ingresso; il Modulo II pratico (8 ore), con simulazioni reali su dispositivi e strumentazione (DPI, APVR, imbracature, tripode, rilevatori di gas, misuratori di esplosività) e procedure di recupero infortunato.`,

      aChiERivolto: [
        'Lavoratori che accedono a cisterne, silos, pozzi, fogne, vasche o serbatoi',
        'Datori di lavoro che operano personalmente in ambienti sospetti di inquinamento o confinati',
        'Lavoratori autonomi che svolgono attività in spazi confinati',
        'Addetti di aziende agricole, industriali, edili e di manutenzione'
      ],

      cosaImparerai: [
        'Applicare la normativa di riferimento in materia di ambienti confinati (D.P.R. 177/2011)',
        'Identificare correttamente i rischi specifici (atmosfere pericolose, anossia, esplosioni)',
        'Utilizzare correttamente DPI specifici, APVR, imbracature di sicurezza e tripode di recupero',
        'Utilizzare rilevatori di gas e misuratori di esplosività per il monitoraggio ambientale statico e dinamico'
      ],

      faq: [
        { domanda: 'Cosa si intende per ambiente confinato o sospetto di inquinamento?', risposta: 'Sono spazi con aperture limitate di accesso e uscita, ventilazione naturale sfavorevole, non progettati per la permanenza continuativa (es. cisterne, silos, pozzi, fogne).' },
        { domanda: 'Quanto dura il corso spazi confinati?', risposta: 'Il corso dura 12 ore complessive: 4 ore di modulo teorico sulla normativa e sui rischi specifici, e 8 ore di modulo pratico con simulazioni.' }
      ],

      moduli: [
        { titolo: 'MODULO I - TEORICO', durataOre: 4, argomenti: ['Normativa di riferimento (D.P.R. 177/2011, artt. 37, 66 e 121 D.Lgs 81/2008)', 'Identificazione e classificazione dei rischi negli ambienti confinati', 'Procedure di ingresso e permessi di lavoro'] },
        { titolo: 'MODULO II - PRATICO', durataOre: 8, argomenti: ['Simulazioni con DPI, APVR, imbracature e tripode di recupero', 'Utilizzo di rilevatori di gas e misuratori di esplosività', 'Monitoraggio ambientale statico e dinamico', 'Procedure di recupero infortunato'] }
      ],

      corsiCorrelati: [
        'lavori-in-quota',
        'formazione-dei-lavoratori-rischio-alto',
        'coordinatori-cantieri-cse-csp'
      ]
    }
  }
};
