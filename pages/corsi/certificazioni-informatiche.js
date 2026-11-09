import CatalogoCorsi from '../../components/CatalogoCorsi';
import { CATEGORIE_CORSI } from '../../data/categorie-corsi';
import { getCoursesRaw } from '../../lib/wp-corsi';
import { isrOptions } from '../../lib/wp';
import { withSiteOptions } from '../../lib/wp-site';

// Pagina di categoria del catalogo: testi e filtro in data/categorie-corsi.js. Questo file ESISTE apposta: un file statico ha la
// precedenza su pages/corsi/[slug].js. Per aggiungere una categoria: voce in data/categorie-corsi.js + un file come questo.
const categoria = CATEGORIE_CORSI['certificazioni-informatiche'];

export default function Pagina({ coursesRaw }) {
  return <CatalogoCorsi coursesRaw={coursesRaw} categoria={categoria} />;
}

async function getPageStaticProps() {
  return { props: { coursesRaw: await getCoursesRaw() }, ...isrOptions() };
}
export const getStaticProps = withSiteOptions(getPageStaticProps);
