// Famiglie dell'archivio: gruppi di bandi con una pagina panoramica (/archivio/<chiave>) e un accordion in /archivio.
// `sottovoci` = elenco e ordine della panoramica per le voci locali (titolo esteso con le ore); le voci aggiunte da
// WordPress con la stessa `famiglia` si accodano (vedi lib/wp-archivio.ts).
export const FAMIGLIE = [
  {
    "chiave": "misura-psr-1-1",
    "titolo": "Misura PSR 1.1",
    "panoramica": "Panoramica Misura PSR 1.1",
    "sezione": "Corsi e workshop",
    "sottovoci": [
      {
        "slug": "conduttore-impresa-agricola",
        "titolo": "Conduttore d’impresa agricola (200 ore)"
      },
      {
        "slug": "ammodernamento-aziende-agricole",
        "titolo": "Ammodernamento aziende agricole (20 ore)"
      },
      {
        "slug": "nuove-strategie-sviluppo-investimento",
        "titolo": "Nuove strategie di sviluppo e investimento (48 ore)"
      },
      {
        "slug": "workshop-strategie-marketing",
        "titolo": "Workshop | Strategie di marketing per le aziende agricole (8 ore)"
      },
      {
        "slug": "workshop-funzione-innovativa",
        "titolo": "Workshop | La funzione innovativa nelle aziende agricole (8 ore)"
      },
      {
        "slug": "workshop-agricoltura-multifunzionalita",
        "titolo": "Workshop | Agricoltura, multifunzionalità e diversificazione (8 ore)"
      },
      {
        "slug": "workshop-conduttore-impresa-agricola",
        "titolo": "Workshop | Il conduttore di impresa agricola (8 ore)"
      }
    ]
  },
  {
    "chiave": "avviso-2-2018",
    "titolo": "Avviso 2/2018",
    "panoramica": "Panoramica Avviso 2/2018",
    "sezione": "Corsi",
    "sottovoci": [
      {
        "slug": "corso-di-cucina",
        "titolo": "Corso di Cucina (576 ore)"
      },
      {
        "slug": "operatore-informatico-risorse-web",
        "titolo": "Operatore Informatico di risorse Web (544 ore)"
      },
      {
        "slug": "addetto-panificatore-pasticciere",
        "titolo": "Addetto panificatore e pasticciere (644 ore)"
      }
    ]
  }
];
