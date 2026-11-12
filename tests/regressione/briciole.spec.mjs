// BreadcrumbList: ogni pagina che mostra le briciole a video ha il JSON-LD con le STESSE voci (stesso testo, stesso ordine, URL assoluti
// su https://www.aletheiasrl.it), e viceversa. Le briciole e il JSON-LD nascono dallo stesso componente (components/Briciole.tsx):
// il test fallisce se una pagina disegna le briciole a mano (nav senza JSON-LD) o se le due versioni divergono.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import { urls } from './util.mjs';

const BASE = 'https://www.aletheiasrl.it';
const PAGINE = urls.map((u) => u.url).filter((u) => !u.includes('?') && u !== '/url-inesistente-404');

// Le nav "vere" delle briciole: tutte le nav della pagina tranne il menu del sito e quelle del footer.
function navBriciole($) {
  return $('nav').filter((_, n) => {
    const el = $(n);
    if (el.attr('id') === 'mainNav' || el.hasClass('navbar') || el.closest('header, footer, .navbar').length) return false;
    const etichetta = (el.attr('aria-label') || '').toLowerCase();
    // briciole = etichettata "Breadcrumb", oppure con separatori › o / tra i suoi elementi
    return etichetta === 'breadcrumb' || el.hasClass('breadcrumb') || /›/.test(el.text()) || el.find('span').toArray().some((s) => $(s).children().length === 0 && $(s).text().trim() === '/');
  });
}

// Voci visibili in ordine: testo + href dei link; i separatori (› e /) sono scartati.
function vociVisibili($, nav) {
  return nav.find('a, span').toArray()
    .filter((e) => $(e).children().length === 0)
    .map((e) => ({ nome: $(e).text().trim(), href: e.tagName === 'a' ? $(e).attr('href') : undefined }))
    .filter((v) => v.nome && v.nome !== '›' && v.nome !== '/');
}

function breadcrumbLd($) {
  const liste = [];
  $('script[type="application/ld+json"]').each((_, s) => {
    try {
      const d = JSON.parse($(s).text());
      for (const x of Array.isArray(d) ? d : [d]) if (x['@type'] === 'BreadcrumbList') liste.push(x);
    } catch {}
  });
  return liste;
}

test('BreadcrumbList presente e identico alle briciole visibili, in tutte le pagine @rapido', async ({ request }) => {
  const errori = [];
  let conBriciole = 0;
  let schede = 0;
  for (const url of PAGINE) {
    const r = await request.get(url);
    if (r.status() !== 200) continue;
    const $ = cheerio.load(await r.text());
    const navs = navBriciole($);
    const liste = breadcrumbLd($);
    if (navs.length === 0) {
      if (liste.length) errori.push(`${url}: BreadcrumbList senza briciole visibili`);
      continue;
    }
    conBriciole++;
    if (/^\/corsi\/[^/]+$/.test(url) && !/^\/corsi\/(sicurezza-lavoro|corsi-qualificati|decreto-attrezzature|certificazioni-informatiche)$/.test(url)) schede++;
    if (navs.length !== 1) { errori.push(`${url}: ${navs.length} nav di briciole`); continue; }
    if (liste.length !== 1) { errori.push(`${url}: ${liste.length} BreadcrumbList (ne serve 1)`); continue; }
    const visibili = vociVisibili($, navs.first());
    const voci = liste[0].itemListElement || [];
    if (JSON.stringify(visibili.map((v) => v.nome)) !== JSON.stringify(voci.map((v) => v.name))) {
      errori.push(`${url}: voci diverse. A video: ${visibili.map((v) => v.nome).join(' > ')} | JSON-LD: ${voci.map((v) => v.name).join(' > ')}`);
      continue;
    }
    voci.forEach((v, i) => {
      if (v.position !== i + 1) errori.push(`${url}: position ${v.position} al posto ${i + 1}`);
      if (v.item && !v.item.startsWith(`${BASE}/`) && v.item !== BASE) errori.push(`${url}: item non assoluto su ${BASE}: ${v.item}`);
      // una voce con link a video deve avere lo stesso indirizzo nel JSON-LD
      const href = visibili[i].href;
      if (href && v.item !== (href === '/' ? `${BASE}/` : `${BASE}${href}`)) errori.push(`${url}: "${v.name}" punta a ${v.item}, a video a ${href}`);
      if (!href && i < voci.length - 1) errori.push(`${url}: "${v.name}" non è l'ultima ma non ha link a video`);
    });
  }
  expect(conBriciole, 'pagine con briciole trovate').toBeGreaterThan(40);
  expect(schede, 'schede corso con briciole').toBeGreaterThanOrEqual(40);
  expect(errori, errori.join('\n')).toEqual([]);
});
