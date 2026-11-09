// Pagine di categoria del catalogo (/corsi/<categoria>), vecchio filtro ?categoria= e anti-collisione con gli slug dei corsi.
// Le sei pagine sono file statici in pages/corsi/ (precedenza sulla route dinamica [slug]): se uno slug di corso coincidesse con uno di
// categoria, la scheda del corso sparirebbe senza errori. Qui lo si impedisce.
import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import categorie from '../../data/categorie-corsi.js';
import raw from '../../data/coursesRaw.js';
import famiglie from '../../data/courseFamilies.js';

const { CATEGORIE_CORSI, DESTINAZIONE_CATEGORIA } = categorie;
const radice = path.resolve(import.meta.dirname, '..', '..');
const slugCategorie = Object.keys(CATEGORIE_CORSI);
const famigliaDeiCorsi = famiglie.buildCourseFamilies(raw.coursesData, {}, { quiet: true });

test('nessuno slug di corso coincide con una categoria @rapido', () => {
  const slugCorsi = new Set(famigliaDeiCorsi.flatMap((f) => [f.slug, ...f.varianti.map((v) => v.slug)]));
  expect(slugCategorie.filter((s) => slugCorsi.has(s))).toEqual([]);
});

test('ogni categoria ha il suo file in pages/corsi e nessuna pagina in più @rapido', () => {
  const file = fs.readdirSync(path.join(radice, 'pages', 'corsi')).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, ''));
  for (const s of slugCategorie) expect(file, s).toContain(s);
  expect(file.filter((f) => !['index', '[slug]', ...slugCategorie].includes(f))).toEqual([]);
});

test('le descrizioni delle categorie hanno 140-160 caratteri e il titolo termina con "- Alètheia Srl" @rapido', () => {
  for (const c of Object.values(CATEGORIE_CORSI)) {
    expect(c.description.length, c.slug).toBeGreaterThanOrEqual(140);
    expect(c.description.length, c.slug).toBeLessThanOrEqual(160);
    expect(c.title.endsWith(' - Alètheia Srl'), c.slug).toBe(true);
  }
});

for (const c of Object.values(CATEGORIE_CORSI)) {
  test(`/corsi/${c.slug}: 200, un solo H1, canonical, description e i corsi della categoria @rapido`, async ({ request, page }) => {
    const attese = famigliaDeiCorsi.filter((f) => f.subKey === c.subKey).map((f) => f.slug).sort();
    const r = await request.get(`/corsi/${c.slug}`);
    expect(r.status()).toBe(200);
    const html = await r.text();
    expect((html.match(/<h1[\s>]/g) || []).length).toBe(1);
    expect(html).toContain(`<link rel="canonical" href="https://www.aletheiasrl.it/corsi/${c.slug}"`);
    expect(html).toContain(`<meta name="description" content="${c.description}"`);
    expect(html).toMatch(new RegExp(`<title[^>]*>${c.title}</title>`));
    await page.goto(`/corsi/${c.slug}`, { waitUntil: 'domcontentloaded' });
    const trovate = await page.locator('main a[href^="/corsi/"]').evaluateAll((els) => Array.from(new Set(els.map((e) => e.getAttribute('href').split('?')[0].replace('/corsi/', '')))).sort());
    expect(trovate).toEqual(attese);
  });
}

for (const prefisso of ['/corsi', '/all-courses']) {
  test(`${prefisso}?categoria=<chiave>: 301 diretto alla destinazione finale, senza query @rapido`, async ({ request, baseURL }) => {
    const errori = [];
    for (const [chiave, destinazione] of Object.entries(DESTINAZIONE_CATEGORIA)) {
      const r = await request.get(`${prefisso}?categoria=${chiave}`, { maxRedirects: 0 });
      const loc = r.headers()['location'];
      const atteso = new URL(destinazione, baseURL).toString();
      if (r.status() !== 301 || !loc || new URL(loc, baseURL).toString() !== atteso) errori.push(`${chiave} -> ${r.status()} ${loc}`);
      const fine = await request.get(destinazione, { maxRedirects: 0 });
      if (fine.status() !== 200) errori.push(`${destinazione} risponde ${fine.status()}`);
    }
    expect(errori).toEqual([]);
  });
}

test('/all-courses?categoria=sconosciuta va a /corsi in un solo salto @rapido', async ({ request, baseURL }) => {
  const r = await request.get('/all-courses?categoria=zzz', { maxRedirects: 0 });
  expect([r.status(), new URL(r.headers()['location'], baseURL).pathname + new URL(r.headers()['location'], baseURL).search]).toEqual([301, '/corsi']);
});
