// Card del calendario -> scheda corso già sulla variante giusta (livello, tipo, edizione) e preventivo precompilato.
// Le funzioni sono quelle di lib/parametri-scheda.ts, provate sulle famiglie vere del catalogo; la scheda è provata sul server di test.
import { test, expect } from '@playwright/test';
import { hrefEdizione, riconosciVariante } from '../../lib/parametri-scheda.ts';
import raw from '../../data/coursesRaw.js';
import famiglie from '../../data/courseFamilies.js';

const FAMIGLIE = famiglie.buildCourseFamilies(raw.coursesData, {}, { quiet: true });
const fam = (slug) => FAMIGLIE.find((f) => f.slug === slug);
const ed = (slug, variante = '', titolo = '') => ({ slug, titolo: titolo || fam(slug).titolo, variante, data: '2026-11-12' });

test('Antincendio: la variante della riga sceglie livello e tipo @rapido', () => {
  const casi = [
    ['Rischio medio Livello 2 (8 ore)', '/corsi/antincendio?livello=2&edizione=2026-11-12'],
    ['Livello 3', '/corsi/antincendio?livello=3&edizione=2026-11-12'],
    ['Rischio basso Livello 1 (4 ore)', '/corsi/antincendio?livello=1&edizione=2026-11-12'],
    ['Aggiornamento rischio medio Livello 2 (5 ore)', '/corsi/antincendio?livello=2&tipo=aggiornamento&edizione=2026-11-12'],
    ['', '/corsi/antincendio?edizione=2026-11-12'], // nessuna indicazione: si apre sul primo livello, come prima
  ];
  for (const [variante, atteso] of casi) expect(hrefEdizione(ed('antincendio', variante), fam('antincendio')), variante || '(vuota)').toBe(atteso);
});

test('corsi a livello unico non aggiungono ?livello= e senza famiglia il link resta semplice @rapido', () => {
  expect(hrefEdizione(ed('patentino-fitosanitario'), fam('patentino-fitosanitario'))).toBe('/corsi/patentino-fitosanitario?edizione=2026-11-12');
  // riga senza variante: se un solo livello ha quel tipo di variante è quello (Dirigente: il corso è il livello 1, l'aggiornamento il 2)
  expect(hrefEdizione(ed('formazione-dirigente'), fam('formazione-dirigente'))).toBe('/corsi/formazione-dirigente?livello=1&edizione=2026-11-12');
  expect(hrefEdizione(ed('formazione-dirigente', 'Aggiornamento'), fam('formazione-dirigente'))).toBe('/corsi/formazione-dirigente?livello=2&tipo=aggiornamento&edizione=2026-11-12');
  expect(hrefEdizione({ slug: 'corso-sconosciuto', titolo: 'X', data: '2026-11-12' }, undefined)).toBe('/corsi/corso-sconosciuto?edizione=2026-11-12');
});

test('ogni livello e ogni aggiornamento del catalogo si riconosce dalla propria etichetta @rapido', () => {
  const errori = [];
  for (const f of FAMIGLIE) {
    const livelli = Array.from(new Set(f.varianti.map((v) => v.livelloKey)));
    if (livelli.length < 2) continue;
    for (const v of f.varianti) {
      const r = riconosciVariante({ slug: f.slug, titolo: f.titolo, variante: `${v.tipo === 'aggiornamento' ? 'Aggiornamento ' : ''}${v.label}`, data: '2026-11-12' }, f);
      if (r.livello !== livelli.indexOf(v.livelloKey) + 1 || r.aggiornamento !== (v.tipo === 'aggiornamento')) errori.push(`${f.slug}: "${v.label}" (${v.tipo}) -> livello ${r.livello}`);
    }
  }
  expect(errori).toEqual([]);
});

test('scheda: ?livello=2&tipo=aggiornamento apre il livello giusto e il preventivo porta corso e variante @rapido', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'accepted'); } catch {} });
  await page.goto('/corsi/antincendio?livello=2&tipo=aggiornamento', { waitUntil: 'networkidle' });
  const cta = page.locator('.cp-info-area a', { hasText: /Richiedi un preventivo/i });
  await expect(cta).toHaveCount(1);
  const href = decodeURIComponent(await cta.getAttribute('href'));
  expect(href).toContain('/richiedi-preventivo?corso=Antincendio');
  expect(href).toMatch(/Livello 2/i);
  expect(href).toContain('aggiornamento');
  await expect(page.getByText('Gratuito e senza impegno: ti inviamo quota e date entro 24 ore')).toBeVisible();
});
