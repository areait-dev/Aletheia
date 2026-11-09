import CatalogoCorsi from '../../components/CatalogoCorsi';
import { getCoursesRaw } from '../../lib/wp-corsi';
import { isrOptions } from '../../lib/wp';
import { getPagina } from '../../lib/wp-pagine';
import { withSiteOptions } from '../../lib/wp-site';

/* Catalogo: WordPress se WP_URL è impostato, altrimenti dati locali (vedi lib/wp-corsi.ts). */
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('corsi'), coursesRaw: await getCoursesRaw() }, ...isrOptions() };
}

export default function Corsi(props) {
  return <CatalogoCorsi {...props} />;
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
