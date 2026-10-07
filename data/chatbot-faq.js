// FAQ del chatbot, per gruppo di pagine (formazione, agenzia per il lavoro, resto del sito). Sorgente locale: con WP_URL
// attivo prevale il CPT `faq` (campo `pagina` = `chatbot-<gruppo>`, es. `chatbot-formazione`), vedi lib/wp-faq.ts.
// Stesso formato delle FAQ di pagina (data/faq.js); il chatbot le usa sia come domande rapide sia per cercare la risposta.
export const CHATBOT_FAQ = {
  formazione: [
    { domanda: "Come mi iscrivo a un corso?", risposta: "Puoi iscriverti direttamente dal nostro sito nella sezione 'Tutti i corsi', oppure contattarci al +39 0932 862613 o via email a info@aletheiasrl.it." },
    { domanda: "I corsi sono in presenza o online?", risposta: "Offriamo entrambe le modalità: corsi in presenza presso la nostra sede di Vittoria (RG) e corsi FAD (Formazione a Distanza) sulla nostra piattaforma e-learning." },
    { domanda: "Ci sono corsi gratuiti disponibili?", risposta: "Sì! Gestiamo corsi finanziati attraverso il Programma G.O.L., l'Avviso FSE+ e altri bandi regionali. Contattaci per scoprire se hai i requisiti per accedere gratuitamente." },
    { domanda: "Rilasciate attestati e certificazioni?", risposta: "Sì, al termine di ogni corso rilasciamo attestati riconosciuti. Per i corsi ECDL/ICDL siamo Test Center AICA accreditato. Per i corsi sulla sicurezza rilasciamo attestati conformi alla normativa vigente." },
    { domanda: "Quanto durano i corsi?", risposta: "La durata varia in base al corso: dai corsi sulla sicurezza di poche ore, ai corsi professionalizzanti di centinaia di ore. Ogni corso ha la durata indicata nella sua scheda." },
    { domanda: "Dove si trova la vostra sede?", risposta: "La nostra sede è in Via del Carrubo, snc - 97019 Vittoria (RG). Siamo aperti dal lunedì al venerdì, 9:00-13:00 / 14:00-18:00." },
    { domanda: "Cos'è il corso ECDL/ICDL?", risposta: "È la certificazione informatica più diffusa al mondo, riconosciuta a livello internazionale. Siamo Test Center AICA accreditato e offriamo percorsi Base, Standard, Full Standard e DigComp 2.2." },
    { domanda: "Come posso pagare un corso?", risposta: "Contattaci direttamente per conoscere le modalità di pagamento disponibili: bonifico bancario, rateizzazione o finanziamenti agevolati. Chiamaci al +39 0932 862613." },
  ],
  lavoro: [
    { domanda: "Come posso candidarmi a un'offerta di lavoro?", risposta: "Puoi consultare le offerte attive nella sezione 'Offerte di Lavoro' e candidarti online, oppure inviarci il tuo CV a info@aletheiasrl.it specificando il ruolo di interesse." },
    { domanda: "Cos'è il Programma G.O.L.?", risposta: "Il Programma Garanzia Occupabilità Lavoratori (G.O.L.) è un piano nazionale per il reinserimento lavorativo. Offre percorsi personalizzati di formazione e riqualificazione professionale completamente finanziati." },
    { domanda: "Cosa si intende per Garanzia Giovani?", risposta: "È un programma rivolto ai giovani NEET (under 30 non occupati e non in formazione) che offre orientamento, formazione e tirocinio finanziati dalla Regione Siciliana." },
    { domanda: "Offrite supporto per la stesura del CV?", risposta: "Sì, nell'ambito dei nostri servizi alla persona offriamo supporto nella stesura del CV, preparazione al colloquio e orientamento professionale personalizzato." },
    { domanda: "Siete un'agenzia per il lavoro autorizzata?", risposta: "Sì, Alètheia S.r.l. è Agenzia per il Lavoro autorizzata dal Ministero del Lavoro con decreto DDS Nr. 1.100/2019, iscritta all'Albo Nazionale delle Agenzie per il Lavoro." },
    { domanda: "Quali servizi offrite alle aziende?", risposta: "Offriamo somministrazione di lavoro, ricerca e selezione del personale, consulenza HR, formazione aziendale e intermediazione lavoro. Contattaci per una consulenza gratuita." },
    { domanda: "Come funziona la somministrazione di lavoro?", risposta: "Forniamo personale qualificato tramite contratti di somministrazione a tempo determinato e indeterminato, garantendo piena conformità normativa e riducendo i costi amministrativi per la tua azienda." },
    { domanda: "Dove si trova la vostra sede?", risposta: "La nostra sede è in Via del Carrubo, snc - 97019 Vittoria (RG). Puoi contattarci al +39 0932 862613 o via email a info@aletheiasrl.it." },
  ],
  generale: [
    { domanda: "Chi è Alètheia S.r.l.?", risposta: "Alètheia S.r.l. è un ente di formazione professionale e agenzia per il lavoro con sede a Vittoria (RG), operativo dal 2005 in Sicilia. Facciamo parte del gruppo PromoterGroup S.p.A." },
    { domanda: "Quali servizi offrite?", risposta: "Offriamo formazione professionale (corsi obbligatori, ECDL/ICDL, corsi finanziati), servizi di agenzia per il lavoro (ricerca personale, somministrazione, orientamento) e supporto alle imprese." },
    { domanda: "Avete corsi sulla sicurezza sul lavoro?", risposta: "Sì, siamo specializzati in formazione obbligatoria sulla sicurezza: corsi per lavoratori, preposti, dirigenti e datori di lavoro, conformi all'Accordo Stato-Regioni." },
    { domanda: "Come posso contattarvi?", risposta: "Puoi chiamarci al +39 0932 862613, scriverci a info@aletheiasrl.it, o visitarci in Via del Carrubo, snc - Vittoria (RG). Siamo disponibili dal lunedì al venerdì, 9:00-13:00 / 14:00-18:00." },
    { domanda: "Dove si trova la vostra sede?", risposta: "La nostra sede è in Via del Carrubo, snc - 97019 Vittoria (RG), in Sicilia." },
    { domanda: "Siete accreditati dalla Regione Siciliana?", risposta: "Sì, siamo accreditati dalla Regione Siciliana per la formazione professionale (DDG n 78/2017) e autorizzati come Agenzia per il Lavoro (DDS Nr. 1.100/2019)." },
    { domanda: "Cosa sono i corsi FSE+?", risposta: "Sono corsi professionalizzanti co-finanziati dal Fondo Sociale Europeo, spesso gratuiti per i partecipanti. Gestiamo diversi avvisi FSE+ per la Regione Siciliana." },
  ],
};
