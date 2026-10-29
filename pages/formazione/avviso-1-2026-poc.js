import ArchivioScheda from '../../components/ArchivioScheda';
import { getVoce } from '../../lib/wp-archivio';
import { isrOptions } from '../../lib/wp';
import { withSiteOptions } from '../../lib/wp-site';

/**
 * Avviso 1/2026 POC Sicilia: è un avviso ancora attivo, quindi vive sotto /formazione e non in /archivio.
 * Stesso layout a scheda delle altre voci (components/ArchivioScheda.js); i contenuti arrivano dalla voce
 * `avviso-1-2026-poc` (data/archivio-schede.js o WordPress). Il vecchio indirizzo /archivio/avviso-1-2026-poc
 * reindirizza qui (next.config.js).
 */
async function getPageStaticProps() {
  const voce = await getVoce('avviso-1-2026-poc');
  if (!voce || !voce.scheda) return { notFound: true, ...isrOptions() };
  return { props: { voce }, ...isrOptions() };
}

export default function Avviso12026Poc({ voce }) {
  return <ArchivioScheda voce={voce} />;
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
