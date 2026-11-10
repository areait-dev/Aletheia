// Ordine delle news: ovunque compaia un elenco (pagina /news, home, "Altre notizie", sitemap) è per data di pubblicazione decrescente, letta dal campo
// `date` dell'articolo e non dall'ordine dei dati; a parità di data, per titolo. Il test fallisce se un elenco non è in ordine.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import { ALL_NEWS } from '../../lib/newsData.js';

const DATA = Object.fromEntries(ALL_NEWS.map((n) => [n.slug, n.date]));
const TITOLO = Object.fromEntries(ALL_NEWS.map((n) => [n.slug, n.title]));
const slugDa = (href) => (/^\/news\/([^/?#]+)/.exec(href) || [])[1];
const unici = (a) => a.filter((x, i) => x && a.indexOf(x) === i);

function inOrdine(slugs) {
  const errori = [];
  for (let i = 1; i < slugs.length; i += 1) {
    const [a, b] = [slugs[i - 1], slugs[i]];
    const ok = DATA[a] > DATA[b] || (DATA[a] === DATA[b] && TITOLO[a].localeCompare(TITOLO[b], 'it') <= 0);
    if (!ok) errori.push(`${a} (${DATA[a]}) prima di ${b} (${DATA[b]})`);
  }
  return errori;
}

test('i dati non dipendono dall\'ordine in cui sono scritti: le due news più recenti e Bonus Giovani sono nell\'ordine giusto @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/news')).text());
  const slugs = unici($('main a[href^="/news/"]').map((_, e) => slugDa($(e).attr('href'))).get());
  expect(slugs.length).toBeGreaterThan(10);
  expect(slugs.slice(0, 4)).toEqual([
    'intelligenza-artificiale-e-formazione-la-sfida-e-colmare-il-divario-tra-adozione-e-competenze', // 6 ottobre 2026
    'il-full-remote-perde-terreno-come-cambiano-le-offerte-di-lavoro-delle-grandi-aziende', // 30 settembre 2026
    'bonus-giovani-under-35-aprile-2026', // 1 aprile 2026
    'priorita-lavoratori-2026-workforce-trends', // 15 marzo 2026
  ]);
});

test('/news: tutte le news in ordine di data decrescente @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/news')).text());
  const slugs = unici($('main a[href^="/news/"]').map((_, e) => slugDa($(e).attr('href'))).get());
  expect(slugs.length).toBe(ALL_NEWS.length);
  expect(inOrdine(slugs)).toEqual([]);
});

test('sitemap: le news seguono /news in ordine di data decrescente @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/sitemap.xml')).text(), { xmlMode: true });
  const slugs = $('url > loc').map((_, e) => slugDa($(e).text().replace('https://www.aletheiasrl.it', ''))).get().filter(Boolean);
  expect(slugs.length).toBe(ALL_NEWS.length);
  expect(inOrdine(slugs)).toEqual([]);
});

test('"Altre notizie" di un articolo: le più recenti prima, mai l\'articolo stesso @rapido', async ({ request }) => {
  for (const slug of ['bonus-giovani-under-35-aprile-2026', 'corsi-gratuiti-progetto-gol-sicilia']) {
    const $ = cheerio.load(await (await request.get(`/news/${slug}`)).text());
    const correlate = unici($('aside a[href^="/news/"]').map((_, e) => slugDa($(e).attr('href'))).get()).filter((s) => s !== slug);
    expect(correlate.length, slug).toBeGreaterThan(0);
    expect(inOrdine(correlate), slug).toEqual([]);
    expect($(`aside a[href="/news/${slug}"]`).length, slug).toBe(0);
  }
});

test('home: le 3 news più recenti non scadute, senza elenchi scritti a mano; Bonus Giovani (scaduto) non compare ma resta in /news e al suo indirizzo @rapido', async ({ request }) => {
  const $ = cheerio.load(await (await request.get('/')).text());
  const slugs = unici($('a[href^="/news/"]').map((_, e) => slugDa($(e).attr('href'))).get());
  expect(slugs).toEqual([
    'intelligenza-artificiale-e-formazione-la-sfida-e-colmare-il-divario-tra-adozione-e-competenze',
    'il-full-remote-perde-terreno-come-cambiano-le-offerte-di-lavoro-delle-grandi-aziende',
    'priorita-lavoratori-2026-workforce-trends', // 15 marzo 2026: la 1 aprile (Bonus Giovani) è scaduta il 30 aprile
  ]);
  const elenco = cheerio.load(await (await request.get('/news')).text());
  expect(elenco('a[href="/news/bonus-giovani-under-35-aprile-2026"]').length).toBeGreaterThan(0);
  expect((await request.get('/news/bonus-giovani-under-35-aprile-2026')).status()).toBe(200);
});

test('fonti: le news con il campo "fonti" le mostrano in fondo come "Fonte:", con link in una nuova scheda; le altre non hanno il blocco @rapido', async ({ request }) => {
  for (const n of ALL_NEWS) {
    const $ = cheerio.load(await (await request.get(`/news/${n.slug}`)).text());
    const blocco = $('article ~ p:contains("Fonte:")');
    if (!n.fonti?.length) { expect(blocco.length, n.slug).toBe(0); continue; }
    for (const f of n.fonti) {
      const a = blocco.find(`a[href="${f.url}"]`);
      expect(a.length, `${n.slug}: ${f.url}`).toBe(1);
      expect(a.attr('target')).toBe('_blank');
      expect(a.attr('rel')).toContain('noopener');
      expect(a.text()).toBe(f.titolo);
    }
  }
});

test('corsi collegati: la news sull\u2019intelligenza artificiale ha il riquadro con la pagina ICDL e le cinque schede; le altre news non lo hanno @rapido', async ({ request }) => {
  const slugIA = 'intelligenza-artificiale-e-formazione-la-sfida-e-colmare-il-divario-tra-adozione-e-competenze';
  const $ = cheerio.load(await (await request.get(`/news/${slugIA}`)).text());
  const sezione = $('section[aria-labelledby="corsi-collegati-titolo"]');
  expect(sezione.find('h2').text()).toBe('Corsi collegati');
  const href = sezione.find('a').map((_, e) => $(e).attr('href')).get();
  expect(href).toEqual(['/corsi/certificazioni-informatiche', '/corsi/icdl-base', '/corsi/icdl-standard', '/corsi/icdl-full-standard', '/corsi/icdl-digcomp-2-2', '/corsi/icdl-update']);
  for (const n of ALL_NEWS.filter((x) => x.slug !== slugIA)) {
    const altra = cheerio.load(await (await request.get(`/news/${n.slug}`)).text());
    expect(altra('section[aria-labelledby="corsi-collegati-titolo"]').length, n.slug).toBe(0);
  }
  // ogni collegamento porta a una pagina che esiste
  for (const h of href) expect((await request.get(h)).status(), h).toBe(200);
});
