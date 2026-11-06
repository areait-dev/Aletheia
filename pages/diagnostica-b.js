import DiagnosticaPagina from '../components/DiagnosticaPagina';

// Pagina TEMPORANEA (noindex, non linkata): da togliere prima del passaggio dei DNS, vedi MIGRAZIONE.md.
// Variante B = meta viewport SENZA initial-scale: serve a sapere se è initial-scale=1 a impedire al browser di far stare la pagina nello schermo.
export default function DiagnosticaB() {
  return (
    <DiagnosticaPagina
      nomeVariante="B (senza initial-scale)"
      metaViewport="width=device-width"
      cosaGuardare="apri questa pagina in una scheda NUOVA (il meta si legge solo al caricamento), con la modalità sito desktop e l'iPad in verticale. Guarda se la pagina appare già rimpicciolita e intera, senza scorrere a destra (visualViewport.scale sotto 1, scrollWidth uguale a innerWidth). Prova a trascinare verso destra e leggi lo scrollX. Screenshot."
    />
  );
}
