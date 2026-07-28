
// Contenuti editoriali per famiglia "Lavori in Quota" - corso base (8 ore).
// Entrambe le varianti (corso/aggiornamento) condividono livelloKey 'default' (nessun descrittore nel
// titolo raw), quindi la chiave interna è sempre 'livello-1' - stesso pattern di
// data/content/carrelli-elevatori-content.js.

module.exports = {
  'lavori-in-quota': {
    'livello-1': {
      titolo: 'Corso Addetti ai Lavori in Quota e Utilizzo DPI Anticaduta (III Categoria)',
      durataOre: 8,
      modalita: ['Aula'],
      validita: 'Aggiornamento periodico previsto dalla normativa',
      attestato: 'Attestato valido in tutta Italia',
      partecipantiMax: 30,
      prezzo: 250,

      descrizione: `Il Corso per Addetti ai Lavori in Quota e Utilizzo DPI Anticaduta di III Categoria, della durata di 8 ore, è obbligatorio ai sensi del D.Lgs 81/2008 coordinato con il D.Lgs 106/2009, artt. 36, 37, 76 e 77, che disciplinano la formazione per chi opera in quota utilizzando dispositivi di protezione individuale anticaduta.

Il lavoro in quota è tra le attività più rischiose in assoluto: la caduta dall'alto rappresenta una delle principali cause di infortunio grave e mortale sul lavoro, in particolare nei cantieri edili, nella manutenzione di coperture, facciate, tralicci e impianti, e in tutte le situazioni in cui non è possibile installare protezioni collettive come parapetti o reti. In questi casi, l'unica misura di protezione disponibile è l'uso corretto dei DPI anticaduta di III categoria, che richiedono una formazione specifica per essere utilizzati in sicurezza.

Il corso si articola in quattro moduli: due moduli teorici (4 ore complessive) su rischio di caduta dall'alto, normativa di riferimento, caratteristiche e scelta dei DPI, sistemi di ancoraggio e fattore di caduta; e due moduli pratici (4 ore complessive) con esercitazioni reali di equipaggiamento e collegamento dei DPI, posizionamento su strutture verticali, accessi verticali e orizzontali con doppio cordino anticaduta, e tecniche di soccorso dell'operatore in quota.

La parte pratica è particolarmente importante in questo corso: i partecipanti indossano realmente i DPI anticaduta e si esercitano nelle manovre di accesso, posizionamento e soccorso sotto la supervisione di un istruttore qualificato.

Il corso si svolge in aula e in area pratica presso la sede Alètheia di Vittoria (RG), con possibilità di organizzarlo anche in azienda o in cantiere utilizzando le attrezzature già in dotazione al cliente.`,

      aChiERivolto: [
        'Lavoratori che operano in quota su coperture, facciate, tralicci o impianti privi di protezioni collettive',
        'Addetti di cantiere che utilizzano DPI anticaduta di III categoria',
        'Manutentori di impianti e strutture con accesso in quota',
        'Neoassunti',
        'Datori di lavoro (artt. 36, 37, 76, 77 D.Lgs 81/2008)'
      ],

      cosaImparerai: [
        'Valutare il rischio di caduta dall\'alto e applicare le contromisure',
        'Scegliere i DPI idonei e rispettare gli obblighi d\'uso',
        'Eseguire manutenzione, conservazione e verifica periodica dei DPI',
        'Utilizzare sistemi di accesso e posizionamento con funi',
        'Riconoscere punti e sistemi di ancoraggio sicuro',
        'Comprendere il fattore di caduta e il tirante d\'aria',
        'Applicare le tecniche di accesso con doppio cordino e di soccorso dell\'operatore in quota'
      ],

      faq: [
        {
          domanda: 'Cosa sono i DPI di III categoria?',
          risposta: 'Sono dispositivi salvavita contro rischi gravi e irreversibili come le cadute dall\'alto, che richiedono una formazione teorico-pratica obbligatoria per essere utilizzati.'
        },
        {
          domanda: 'Quanto dura il corso?',
          risposta: '8 ore totali: 4 ore di formazione teorica normativa e 4 ore di esercitazioni pratiche.'
        },
        {
          domanda: 'Include esercitazioni pratiche?',
          risposta: 'Sì, la metà delle ore è dedicata a prove sul campo di equipaggiamento, collegamento, posizionamento e soccorso.'
        },
        {
          domanda: 'Ha una scadenza?',
          risposta: 'Sì, la formazione va rinnovata periodicamente con un corso di aggiornamento dedicato da 4 ore.'
        },
        {
          domanda: 'È organizzabile in cantiere o in azienda?',
          risposta: 'Sì, è organizzabile in sede usando le attrezzature e i DPI già in dotazione al cliente.'
        }
      ],

      moduli: [
        {
          titolo: 'MODULI TEORICI',
          durataOre: 4,
          argomenti: [
            'Rischio di caduta dall\'alto',
            'Quadro normativo di riferimento',
            'Caratteristiche e criteri di scelta dei DPI',
            'Sistemi di ancoraggio',
            'Dinamica del fattore di caduta e tirante d\'aria'
          ]
        },
        {
          titolo: 'MODULI PRATICI',
          durataOre: 4,
          argomenti: [
            'Esercitazioni reali di vestizione, equipaggiamento e collegamento DPI',
            'Tecniche di posizionamento su struttura verticale',
            'Accesso verticale e orizzontale con doppio cordino',
            'Procedure operative di soccorso dell\'operatore in quota'
          ]
        }
      ],

      corsiCorrelati: [
        'pimus-ponteggi',
        'antincendio-livello-2',
        'coordinatori-cantieri-cse-csp'
      ]
    }
  }
};
