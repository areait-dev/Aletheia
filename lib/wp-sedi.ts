import { SEDI as LOCAL_SEDI } from '../data/sedi';
import { acfOf, getCptPosts, str, titleOf } from './wp-cpt';

/**
 * Sedi (CPT `sede`) per /contatti, con ripiego sui dati locali (`data/sedi.js`). Stesso formato dei dati locali:
 * titolo = città, `cap` + `citta` → riga "97019 Vittoria (RG)", `maps_href` → mapsHref, `mappa_embed` → mapsEmbed.
 * SOLO lato server (getStaticProps).
 */

export type Sede = { città: string; indirizzo: string; cap: string; mapsHref: string; mapsEmbed: string };

export async function getSedi(): Promise<Sede[]> {
  const posts = await getCptPosts('sede');
  if (!posts) return LOCAL_SEDI as Sede[];
  const sedi = posts
    .map((p) => {
      const a = acfOf(p);
      const sede: Sede = {
        città: titleOf(p),
        indirizzo: str(a.indirizzo),
        cap: [str(a.cap), str(a.citta)].filter(Boolean).join(' '),
        mapsHref: str(a.maps_href),
        mapsEmbed: str(a.mappa_embed),
      };
      return { sede, principale: a.principale === true };
    })
    .filter(({ sede }) => sede.città && sede.indirizzo && sede.mapsEmbed);
  if (sedi.length === 0) return LOCAL_SEDI as Sede[];
  // La sede principale per prima (la mappa iniziale), poi l'ordine di WordPress.
  return [...sedi.filter((s) => s.principale), ...sedi.filter((s) => !s.principale)].map((s) => s.sede);
}
