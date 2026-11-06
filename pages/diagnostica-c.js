import DiagnosticaPagina from '../components/DiagnosticaPagina';

// Pagina TEMPORANEA (noindex, non linkata): da togliere prima del passaggio dei DNS, vedi MIGRAZIONE.md.
// Variante C = meta viewport width=1024: serve a sapere se il browser rimpicciolisce una pagina che dichiara una larghezza fissa maggiore dello schermo.
export default function DiagnosticaC() {
  return (
    <DiagnosticaPagina
      nomeVariante="C (width=1024)"
      metaViewport="width=1024"
      cosaGuardare="apri questa pagina in una scheda NUOVA, con la modalità sito desktop e l'iPad in verticale. Guarda se la pagina appare rimpicciolita per stare nello schermo (visualViewport.scale circa 0,73) e se lo scrollX resta 0 trascinando verso destra. Screenshot."
    />
  );
}
