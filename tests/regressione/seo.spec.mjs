// SEO di tutte le pagine (HTML pre-renderizzato, senza JavaScript): canonical assoluto verso sé stessa, description unica di 140-160 caratteri,
// titolo "... - Alètheia Srl", Open Graph/Twitter coerenti, Organization con le quattro sedi. Esclusa la 404 (noindex, senza canonical).
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import { urls } from './util.mjs';
import { ALL_NEWS } from '../../lib/newsData.js';

const BASE = 'https://www.aletheiasrl.it';
const PAGINE = urls.map((u) => u.url).filter((u) => !u.includes('?') && u !== '/url-inesistente-404');
const SERVIZIO = ['/diagnostica', '/diagnostica-b', '/diagnostica-c'];
const TITOLI_SEO = Object.fromEntries(ALL_NEWS.filter((n) => n.titoloSeo).map((n) => [`/news/${n.slug}`, n.titoloSeo]));

async function leggi(request, url) {
  const r = await request.get(url);
  expect(r.status(), url).toBe(200);
  return cheerio.load(await r.text());
}

test('ogni pagina ha canonical assoluto verso sé stessa, og:url uguale e metadati completi @rapido', async ({ request }) => {
  const errori = [];
  const descrizioni = new Map();
  for (const url of PAGINE) {
    if (SERVIZIO.includes(url)) continue;
    const $ = await leggi(request, url);
    const atteso = url === '/' ? `${BASE}/` : `${BASE}${url}`;
    const canonical = $('link[rel="canonical"]');
    if (canonical.length !== 1) errori.push(`${url}: ${canonical.length} canonical`);
    else if (canonical.attr('href') !== atteso) errori.push(`${url}: canonical ${canonical.attr('href')}`);
    if ($('meta[property="og:url"]').attr('content') !== atteso) errori.push(`${url}: og:url diverso dal canonical`);
    const desc = $('meta[name="description"]').attr('content') || '';
    if (desc.length < 140 || desc.length > 160) errori.push(`${url}: description di ${desc.length} caratteri`);
    if (descrizioni.has(desc)) errori.push(`${url}: description uguale a quella di ${descrizioni.get(desc)}`);
    descrizioni.set(desc, url);
    const titolo = $('title').first().text();
    // eccezione voluta: le news con `titoloSeo` hanno il titolo breve (sotto i 60 caratteri) senza suffisso
    const conTitoloSeo = TITOLI_SEO[url];
    if (conTitoloSeo ? titolo !== conTitoloSeo || titolo.length >= 60 : !/ - Alètheia Srl$/.test(titolo)) errori.push(`${url}: titolo "${titolo}"`);
    if ($('title').length !== 1) errori.push(`${url}: ${$('title').length} tag title`);
    if ($('meta[property="og:title"]').attr('content') !== titolo) errori.push(`${url}: og:title diverso dal title`);
    if ($('meta[property="og:description"]').attr('content') !== desc) errori.push(`${url}: og:description diversa`);
    if ($('meta[name="twitter:title"]').attr('content') !== titolo) errori.push(`${url}: twitter:title diverso`);
    const img = $('meta[property="og:image"]').attr('content') || '';
    if (!img.startsWith(`${BASE}/`) && !/^https:\/\//.test(img)) errori.push(`${url}: og:image "${img}"`);
    if ($('meta[property="og:image"]').length !== 1) errori.push(`${url}: ${$('meta[property="og:image"]').length} og:image`);
    for (const nome of ['link[rel="canonical"]', 'meta[name="description"]']) if ($(nome).length > 1) errori.push(`${url}: ${nome} duplicato`);
    if (/vercel\.app/.test($.html())) errori.push(`${url}: contiene vercel.app`);
  }
  expect(errori).toEqual([]);
});

test('Organization in ogni pagina: sedi, telefono, email, orari e social @rapido', async ({ request }) => {
  for (const url of ['/', '/chi-siamo', '/corsi/antincendio', '/news']) {
    const $ = await leggi(request, url);
    const org = $('script[type="application/ld+json"]').map((_, e) => JSON.parse($(e).text())).get().find((d) => [].concat(d['@type']).includes('EducationalOrganization'));
    expect(org, url).toBeTruthy();
    expect(org.location.map((l) => l.address.addressLocality), url).toEqual(['Vittoria', 'Ragusa', 'Pozzallo', 'Acate']);
    expect(org.location[0].address.streetAddress).toBe('Via del Carrubo, snc');
    expect(org.telephone).toBe('+39 0932 862613');
    expect(org.email).toBe('info@aletheiasrl.it');
    expect(org.openingHoursSpecification.length).toBeGreaterThan(0);
    expect(org.sameAs.length).toBeGreaterThanOrEqual(4);
    expect(org.url).toBe(BASE);
  }
});

test('la 404 non ha canonical e ha noindex @rapido', async ({ request }) => {
  const r = await request.get('/url-inesistente-404');
  expect(r.status()).toBe(404);
  const $ = cheerio.load(await r.text());
  expect($('link[rel="canonical"]')).toHaveLength(0);
  expect($('meta[name="robots"]').attr('content')).toMatch(/noindex/);
});

const jsonLd = ($) => $('script[type="application/ld+json"]').map((_, e) => JSON.parse($(e).text())).get();
const tipo = (d, t) => [].concat(d['@type']).includes(t);

test('schede corso: titolo "Corso ... a Vittoria (RG) - Alètheia Srl" se resta entro 65 caratteri, Course con provider @rapido', async ({ request }) => {
  const errori = [];
  const schede = urls.map((u) => u.url).filter((u) => /^\/corsi\/[^?/]+$/.test(u) && !['sicurezza-lavoro', 'decreto-attrezzature', 'certificazioni-informatiche', 'corsi-qualificati'].includes(u.replace('/corsi/', '')));
  expect(schede.length).toBeGreaterThan(30);
  for (const url of schede) {
    const $ = await leggi(request, url);
    const titolo = $('title').first().text();
    const base = titolo.replace(/ a Vittoria \(RG\)(?= - Alètheia Srl$)/, '').replace(/ - Alètheia Srl$/, '');
    if (!/^Corso /.test(titolo)) errori.push(`${url}: titolo senza "Corso": ${titolo}`);
    const conLuogo = `${base} a Vittoria (RG) - Alètheia Srl`;
    if (conLuogo.length <= 65 && titolo !== conLuogo) errori.push(`${url}: avrebbe dovuto avere la località: ${titolo}`);
    if (conLuogo.length > 65 && titolo.includes('Vittoria')) errori.push(`${url}: località con titolo oltre 65 caratteri: ${titolo}`);
    const corso = jsonLd($).find((d) => tipo(d, 'Course'));
    if (!corso || !corso.name || !corso.description || corso.provider?.name !== 'Alètheia Srl') errori.push(`${url}: Course incompleto`);
  }
  expect(errori).toEqual([]);
});

test('news: NewsArticle con headline, date, immagine, autore e publisher; og:type article @rapido', async ({ request }) => {
  const news = urls.map((u) => u.url).filter((u) => /^\/news\/[^?/]+$/.test(u));
  expect(news.length).toBeGreaterThan(10);
  for (const url of news) {
    const $ = await leggi(request, url);
    const art = jsonLd($).find((d) => tipo(d, 'NewsArticle'));
    expect(art, url).toBeTruthy();
    for (const k of ['headline', 'datePublished', 'dateModified']) expect(art[k], `${url} ${k}`).toBeTruthy();
    expect(art.image[0], url).toMatch(/^https:\/\//);
    expect(art.author?.name, url).toBeTruthy();
    expect(art.publisher?.name, url).toBe('Alètheia Srl');
    expect($('meta[property="og:type"]').attr('content'), url).toBe('article');
  }
});

test('BreadcrumbList solo dove le briciole sono visibili, e uguali a quelle mostrate @rapido', async ({ request }) => {
  const casi = { '/programma-gol': ['Home', 'Agenzia per il Lavoro', 'Servizi alla Persona', 'Programma G.O.L.'], '/archivio': ['Home', 'Archivio'] };
  for (const [url, attese] of Object.entries(casi)) {
    const $ = await leggi(request, url);
    const b = jsonLd($).find((d) => tipo(d, 'BreadcrumbList'));
    expect(b.itemListElement.map((i) => i.name), url).toEqual(attese);
    const visibile = $('nav.breadcrumb, nav[aria-label="Breadcrumb"]').first().text().replace(/›/g, '|').split('|').map((x) => x.trim()).filter(Boolean);
    expect(visibile, `${url}: briciole visibili`).toEqual(attese);
  }
  // pagine senza briciole visibili: nessun BreadcrumbList
  for (const url of ['/chi-siamo', '/news']) expect(jsonLd(await leggi(request, url)).some((d) => tipo(d, 'BreadcrumbList')), url).toBe(false);
});
