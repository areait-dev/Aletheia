import DiagnosticaPagina from '../components/DiagnosticaPagina';

// Pagina TEMPORANEA (noindex, non linkata): da togliere prima del passaggio dei DNS, vedi MIGRAZIONE.md. Variante A = meta viewport come tutte le altre pagine del sito.
export default function Diagnostica() {
  return (
    <DiagnosticaPagina
      nomeVariante="A (come il sito)"
      metaViewport="width=device-width, initial-scale=1"
      cosaGuardare="tocca «Prova 1», poi prova a trascinare la pagina verso destra. Lo scrollX deve restare 0 e la pagina non deve spostarsi. Fai uno screenshot prima e dopo."
    />
  );
}
