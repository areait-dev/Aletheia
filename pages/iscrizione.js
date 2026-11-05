import ModuloIscrizione from '../components/ModuloIscrizione';
import { isrOptions } from '../lib/wp';
import { withSiteOptions } from '../lib/wp-site';

// Pagina statica sottile: il modulo vero è components/ModuloIscrizione.js (tipo `iscrizione`). Tenerla separata dall'altra
// dà a ogni indirizzo il proprio H1/title già nell'HTML pre-renderizzato. Le opzioni globali (Header/Footer/identità)
// passano da withSiteOptions.
async function getPageStaticProps() {
  return { props: {}, ...isrOptions() };
}

export default function Iscrizione() {
  return <ModuloIscrizione tipo="iscrizione" />;
}

export const getStaticProps = withSiteOptions(getPageStaticProps);
