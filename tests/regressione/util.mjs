import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as cheerio from 'cheerio';
import { expect } from '@playwright/test';

export const radice = path.resolve(import.meta.dirname, '..', '..');
export const cartellaDati = path.join(radice, 'tests', 'riferimenti', 'dati');
export const { urls, redirect } = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'urls.json'), 'utf8'));
// Screenshot automatici solo a 1440 px: a 390 e 768 px restavano instabili (vedi MIGRAZIONE.md, "Stato al rientro"). Mobile = controllo manuale
// sull'anteprima. Per riprovare tutte le larghezze: LARGHEZZE_COMPLETE=1.
export const LARGHEZZE = process.env.LARGHEZZE_COMPLETE ? [390, 768, 1440] : [1440];
export const TEMI = ['chiaro', 'scuro'];

export const nomeFile = (url) => (url === '/' ? 'home' : url.replace(/^\//, '').replace(/[/?=&]/g, '_'));

/**
 * Confronta un valore con il riferimento salvato in tests/riferimenti/dati/<nome>.json.
 * Con AGGIORNA_RIFERIMENTI=1 lo (ri)scrive: farlo SOLO per generare i riferimenti, mai per "far passare" un test.
 */
export function confronta(nome, valore) {
  const file = path.join(cartellaDati, `${nome}.json`);
  const testo = JSON.stringify(valore, null, 2);
  if (process.env.AGGIORNA_RIFERIMENTI === '1') {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, testo + '\n');
    return;
  }
  if (!fs.existsSync(file)) throw new Error(`Riferimento mancante: ${path.relative(radice, file)}`);
  expect(JSON.parse(testo)).toEqual(JSON.parse(fs.readFileSync(file, 'utf8')));
}

const sha = (s) => crypto.createHash('sha1').update(s).digest('hex');

/** Estrae da HTML grezzo (senza JavaScript) tutto ciò che conta per SEO e contenuti. */
export function estraiMetadata(html, status) {
  const $ = cheerio.load(html);
  const meta = (sel) => $(sel).map((_, e) => $(e).attr('content')).get();
  const og = {};
  $('meta[property^="og:"]').each((_, e) => { (og[$(e).attr('property')] ||= []).push($(e).attr('content')); });
  const tw = {};
  $('meta[name^="twitter:"]').each((_, e) => { (tw[$(e).attr('name')] ||= []).push($(e).attr('content')); });
  const jsonld = $('script[type="application/ld+json"]').map((_, e) => { try { return JSON.parse($(e).text()); } catch { return $(e).text(); } }).get();
  const link = (rel) => $(`head link[rel="${rel}"]`).map((_, e) => $(e).attr('href')).get();

  // Testo visibile pre-renderizzato: senza script/stile (la data "di oggi" è congelata dalla build di test).
  const $t = cheerio.load(html);
  $t('script, style, noscript, template').remove();
  const testo = $t('body').text().replace(/\s+/g, ' ').trim();
  const links = Array.from(new Set($('a[href]').map((_, e) => $(e).attr('href')).get().filter((h) => h.startsWith('/') || h.includes('aletheiasrl')))).sort();
  const immagini = $('img').map((_, e) => $(e).attr('alt') ?? '').get();

  return {
    status,
    lang: $('html').attr('lang') ?? null,
    classeHtml: $('html').attr('class') ?? null,
    classeBody: $('body').attr('class') ?? null,
    title: $('title').first().text(),
    description: meta('meta[name="description"]'),
    robots: meta('meta[name="robots"]'),
    googleVerification: meta('meta[name="google-site-verification"]'),
    viewport: meta('meta[name="viewport"]'),
    canonical: link('canonical'),
    icon: link('icon'),
    og,
    twitter: tw,
    jsonld,
    preconnect: link('preconnect'),
    stylesheetEsterni: $('head link[rel="stylesheet"]').map((_, e) => $(e).attr('href')).get().filter((h) => /^https?:/.test(h)),
    h1: $t('h1').map((_, e) => $t(e).text().replace(/\s+/g, ' ').trim()).get(),
    intestazioni: $t('h2, h3').length,
    testoLunghezza: testo.length,
    testoSha1: sha(testo),
    testoInizio: testo.slice(0, 160),
    link: links,
    immaginiConAlt: immagini.length,
    immaginiAlt: sha(immagini.join('|')),
  };
}
