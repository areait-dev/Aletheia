import { PARTNER } from '../data/partner';
import { acfOf, getCptPosts, imageUrl, titleOf } from './wp-cpt';

/**
 * Loghi partner (CPT `partner`, campo `gruppo`) con ripiego sui dati locali (`data/partner.js`).
 * Stesso formato dei dati locali: `{ name, src }` (+ `srcDark` e `url` se presenti in WordPress).
 * SOLO lato server (getStaticProps).
 */

export type Partner = { name: string; src: string; srcDark?: string; url?: string };
export type GruppoPartner = 'ecosistema' | 'clienti' | 'certificazioni' | 'enti';

export async function getPartners(gruppo: GruppoPartner): Promise<Partner[]> {
  const local = ((PARTNER as Record<string, Partner[]>)[gruppo] ?? []) as Partner[];
  const posts = await getCptPosts('partner');
  if (!posts) return local;
  const partners = posts
    .filter((p) => acfOf(p).gruppo === gruppo)
    .map((p) => {
      const a = acfOf(p);
      const partner: Partner = { name: titleOf(p), src: imageUrl(a.logo) };
      const dark = imageUrl(a.logo_scuro);
      if (dark) partner.srcDark = dark;
      if (typeof a.url === 'string' && a.url) partner.url = a.url;
      return partner;
    })
    .filter((p) => p.name && p.src);
  return partners.length > 0 ? partners : local;
}
