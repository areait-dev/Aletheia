
// Contenuti editoriali per la famiglia "addetti-macchina-raccogli-frutta-crf" (corso base, 8 ore),
// tratti dal programma corso ufficiale Alètheia "FORMAZIONE TEORICO-PRATICO PER LAVORATORI ADDETTI
// ALLA CONDUZIONE DI MACCHINA AGRICOLA RACCOGLIFRUTTA (CRF) [8 ORE]" ai sensi del D.Lgs. 81/2008
// art. 73 e dell'Accordo Stato-Regioni del 17/04/2025.
// Famiglia a variante unica (family.varianti ha un solo elemento, tipo 'corso', livelloKey 'default'),
// quindi qui c'è una sola chiave 'livello-1' (vedi editorialLivelloKey in pages/all-courses/[slug].js).
// NOTA: la famiglia "addetti-macchina-raccogli-frutta-aggiornamento" è una famiglia SEPARATA (non una
// variante "aggiornamento" di questa) - non è coperta da questo file, in attesa del relativo programma.

module.exports = {
  'addetti-macchina-raccogli-frutta-crf': {
    'livello-1': {
      titolo: 'Corso Addetti Macchina Agricola Raccoglifrutta (CRF)',
      durataOre: 8,
      modalita: ['Aula', 'Pratica in campo'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Patentino Nazionale',
      partecipantiMax: 30,
      prezzo: null,

      descrizione: `Il corso Teorico/Pratico per Lavoratori Addetti alla Conduzione di Macchina Agricola Raccoglifrutta (CRF), della durata di 8 ore, è obbligatorio ai sensi dell'art. 73 del D.Lgs. 81/2008 e dell'Accordo Stato-Regioni del 17 aprile 2025, per chi conduce questa tipologia di attrezzatura agricola.

Il percorso forma l'operatore sulle categorie e caratteristiche delle CRF, sui componenti strutturali e sui dispositivi di comando e di sicurezza, sulle condizioni di equilibrio e sui fattori che influenzano la stabilità della macchina, oltre che sui controlli e sulle manutenzioni da effettuare (verifiche giornaliere e periodiche, controlli visivi e funzionali prima dell'utilizzo).

Il corso si articola in due moduli: il Modulo I teorico-tecnico (4 ore), su normativa, caratteristiche delle CRF, rischi ricorrenti e procedure di sicurezza durante movimentazione e stazionamento; il Modulo II pratico (4 ore), con esercitazioni operative su individuazione dei componenti, pianificazione del percorso, movimentazione e posizionamento del mezzo e manovre di emergenza.`,

      aChiERivolto: [
        'Lavoratori addetti alla conduzione di macchine agricole raccoglifrutta (CRF)',
        "Operatori agricoli che devono conseguire l'abilitazione ai sensi dell'art. 73 del D.Lgs. 81/2008",
        'Datori di lavoro che devono garantire la formazione dei propri addetti alla conduzione di CRF',
      ],

      cosaImparerai: [
        'Riconoscere categorie e caratteristiche generali/specifiche delle macchine raccoglifrutta',
        'Identificare i componenti strutturali e i dispositivi di comando e di sicurezza',
        'Valutare le condizioni di equilibrio e i fattori che influenzano la stabilità del mezzo',
        'Eseguire controlli e manutenzioni, verifiche giornaliere e periodiche',
        'Applicare le procedure di sicurezza durante movimentazione e stazionamento',
        'Pianificare il percorso considerando pendenze, ostacoli e condizioni del terreno',
        'Gestire le procedure operative di salvataggio e le manovre di emergenza',
        'Ottenere il patentino nazionale valido su tutto il territorio italiano',
      ],

      faq: [
        {
          domanda: 'Chi deve seguire il corso per macchina raccoglifrutta (CRF)?',
          risposta: "Il corso è obbligatorio per tutti i lavoratori addetti alla conduzione di macchine agricole raccoglifrutta, ai sensi dell'art. 73 del D.Lgs. 81/2008.",
        },
        {
          domanda: 'Quanto dura il corso e come si articola?',
          risposta: 'Il corso dura 8 ore complessive, suddivise in due moduli: teorico-tecnico (4 ore) e pratico (4 ore) con esercitazioni operative su macchina.',
        },
        {
          domanda: 'Cosa rilascia il corso al termine?',
          risposta: 'Al termine del corso viene rilasciato il Patentino Nazionale, valido su tutto il territorio italiano.',
        },
      ],

      moduli: [
        {
          titolo: 'MODULO I - TEORICO/TECNICO',
          durataOre: 4,
          argomenti: [
            'Categorie e caratteristiche delle macchine raccoglifrutta (CRF)',
            'Nozioni elementari di fisica e componenti strutturali',
            'Dispositivi di comando e di sicurezza',
            'Condizioni di equilibrio: fattori che influenzano la stabilità',
            'Controlli e manutenzioni: verifiche giornaliere e periodiche',
            'Modalità di utilizzo in sicurezza e analisi dei rischi ricorrenti',
            'Procedure di sicurezza durante movimentazione e stazionamento del mezzo',
            'Nozioni di guida, circolazione, movimentazione dei carichi e stoccaggio',
            'Procedure operative di salvataggio: modalità di discesa in emergenza',
          ],
        },
        {
          titolo: 'MODULO II - PRATICO',
          durataOre: 4,
          argomenti: [
            'Individuazione dei componenti strutturali del CRF',
            'Identificazione dei dispositivi di comando e di sicurezza e relativo funzionamento',
            'Manutenzione, verifiche di legge e controlli pre-utilizzo',
            'Pianificazione del percorso: pendenze, accesso, ostacoli e condizioni del terreno',
            'Esercitazioni di movimentazione e posizionamento del CRF',
            'Manovre di emergenza e messa a riposo del mezzo a fine lavoro',
          ],
        },
      ],

      corsiCorrelati: [
        'trattori-agricoli-o-forestali',
      ],
    },
  },
};
