// Slug delle schede corso fissati (SLUG_FAMIGLIE in data/courseFamilies.js): l'URL di /corsi/<slug> non nasce dal titolo,
// quindi un ritocco al titolo non può cambiarlo. Test a livello di dati, senza browser né build.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { buildCourseFamilies } = require('../../data/courseFamilies.js');
const { coursesData } = require('../../data/coursesRaw.js');

const famiglie = () => buildCourseFamilies(coursesData, {}, { quiet: true });
const urls = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'urls.json'), 'utf8')).urls.map((u) => u.url);

test('slug fissi: ogni famiglia ha uno slug nella mappa e ogni voce della mappa è una famiglia @rapido', () => {
  const sorgente = fs.readFileSync(path.join(import.meta.dirname, '..', '..', 'data', 'courseFamilies.js'), 'utf8');
  const blocco = sorgente.match(/const SLUG_FAMIGLIE = \{([\s\S]*?)\n\};/)[1];
  const valoriMappa = [...blocco.matchAll(/^\s*'[^']+': '([^']+)',/gm)].map((m) => m[1]).sort();
  const slugFamiglie = famiglie().map((f) => f.slug).sort();
  expect(valoriMappa).toEqual(slugFamiglie);
  expect(new Set(valoriMappa).size).toBe(valoriMappa.length); // nessuno slug assegnato a due famiglie
});

test('slug fissi: ritoccare il titolo di una famiglia non cambia il suo URL, la build fallisce con un errore chiaro @rapido', () => {
  const ritoccati = JSON.parse(JSON.stringify(coursesData));
  for (const c of ritoccati) if (/^Lavori in quota/i.test(c.title)) c.title = c.title.replace('Lavori in quota', 'Lavori in quota e altezza');
  expect(() => buildCourseFamilies(ritoccati, {}, { quiet: true })).toThrow(/Nessuno slug fissato per la famiglia "Lavori in quota e altezza"/);
});

test('slug fissi: gli URL storici ASACOM e carriponti non dipendono dal titolo @rapido', () => {
  const slug = famiglie().map((f) => f.slug);
  expect(slug).toContain('asacom-assistente-alla-comunicazione');
  expect(slug).toContain('addetti-alla-conduzione-di-carriponti-pensile-cabina');
  expect(slug).not.toContain('asacom-assistente-specialistico-all-autonomia-e-alla-comunicazione');
});

test('slug fissi: ogni scheda famiglia ha il suo indirizzo in urls.json @rapido', () => {
  const mancanti = famiglie().map((f) => `/corsi/${f.slug}`).filter((u) => !urls.includes(u));
  expect(mancanti).toEqual([]);
});
