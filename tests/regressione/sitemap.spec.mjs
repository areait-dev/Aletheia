// /sitemap.xml: valida, solo URL del dominio definitivo, tutte le pagine pubbliche, nessuna pagina di servizio, ogni URL risponde 200.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import { urls } from './util.mjs';

const BASE = 'https://www.aletheiasrl.it';
const SERVIZIO = ['/richiedi-preventivo', '/iscrizione', '/pre-iscrizione', '/diagnostica', '/diagnostica-b', '/diagnostica-c', '/url-inesistente-404'];

async function leggiSitemap(request) {
  const r = await request.get('/sitemap.xml');
  expect(r.status()).toBe(200);
  expect(r.headers()['content-type']).toMatch(/xml/);
  const testo = await r.text();
  expect(testo.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
  const $ = cheerio.load(testo, { xmlMode: true });
  expect($('urlset').attr('xmlns')).toBe('http://www.sitemaps.org/schemas/sitemap/0.9');
  return { testo, $ };
}

test('sitemap: XML valido, URL assoluti del dominio definitivo e senza duplicati @rapido', async ({ request }) => {
  const { testo, $ } = await leggiSitemap(request);
  const loc = $('url > loc').map((_, e) => $(e).text()).get();
  expect(loc.length).toBeGreaterThan(100);
  expect(new Set(loc).size).toBe(loc.length);
  for (const l of loc) {
    expect(l.startsWith(`${BASE}/`) || l === BASE, l).toBe(true);
    expect(l, l).not.toMatch(/[?#]/);
    if (l !== `${BASE}/`) expect(l, l).not.toMatch(/\/$/); // niente slash finale, tranne la home
  }
  expect(testo).not.toMatch(/vercel\.app/);
  $('url > lastmod').each((_, e) => expect($(e).text()).toMatch(/^\d{4}-\d{2}-\d{2}$/));
});

test('sitemap: contiene tutte le pagine pubbliche e nessuna pagina di servizio, di errore o con redirect @rapido', async ({ request }) => {
  const { $ } = await leggiSitemap(request);
  const percorsi = new Set($('url > loc').map((_, e) => $(e).text().replace(BASE, '') || '/').get());
  const pubbliche = urls.map((u) => u.url).filter((u) => !u.includes('?') && !SERVIZIO.includes(u));
  const mancanti = pubbliche.filter((u) => !percorsi.has(u));
  expect(mancanti).toEqual([]);
  for (const s of SERVIZIO) expect(percorsi.has(s), s).toBe(false);
  for (const u of percorsi) expect(u, u).not.toMatch(/^\/(all-courses|index\.php|api)/);
  expect(percorsi.has('/corsi')).toBe(true);
  for (const c of ['sicurezza-lavoro', 'decreto-attrezzature', 'certificazioni-informatiche', 'corsi-qualificati']) expect(percorsi.has(`/corsi/${c}`), c).toBe(true);
  expect([...percorsi].filter((p) => p.startsWith('/news/')).length).toBeGreaterThan(10);
});

test('sitemap: ogni URL risponde 200 senza redirect; le news hanno lastmod @rapido', async ({ request }) => {
  const { $ } = await leggiSitemap(request);
  const loc = $('url > loc').map((_, e) => $(e).text()).get();
  const errori = [];
  for (const l of loc) {
    const r = await request.get(l.replace(BASE, '') || '/', { maxRedirects: 0 });
    if (r.status() !== 200) errori.push(`${l} -> ${r.status()}`);
  }
  expect(errori).toEqual([]);
  const news = $('url').filter((_, e) => $(e).find('loc').text().includes('/news/')).get();
  expect(news.length).toBeGreaterThan(10);
  for (const e of news) expect($(e).find('lastmod').text(), $(e).find('loc').text()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});
