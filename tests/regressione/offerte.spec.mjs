// Offerte di lavoro in /agenzia-per-il-lavoro ("Posizioni aperte"): devono stare nell'HTML pre-renderizzato, essere VISIBILI nel browser
// (con e senza riduzione del movimento) e non devono mostrare nessun contatore di posizioni aperte.
// Build e server di test usano un elenco fisso di 2 offerte (offerte-di-prova.mjs, JOBS_API_URL): nessuna rete, risultati stabili.
// Con URL_BASE (anteprima/produzione) le offerte sono quelle vere: si controlla la stessa struttura senza i titoli di prova; se non ce
// ne sono, deve comparire il messaggio "Al momento non ci sono posizioni aperte" con i due link, mai una sezione vuota.
// Storia: dopo l'aggiornamento a React 19 le schede restavano a opacity:0 perché Reveal perdeva il ref passato da AnimatePresence
// (popLayout); e l'HTML conteneva solo scheletri perché le offerte comparivano dopo un timer di 450ms nel browser.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';

const FISSE = !process.env.URL_BASE;
const TITOLI = ['Offerta di prova uno', 'Offerta di prova due'];
const LINK_OFFERTA = 'a[href^="https://aletheia4job.it/offerte-di-lavoro/"]';

test('offerte: nell\'HTML pre-renderizzato, senza scheletri e senza contatore @rapido', async ({ request }) => {
  const html = await (await request.get('/agenzia-per-il-lavoro')).text();
  const $ = cheerio.load(html);
  const sezione = $('section').filter((_, e) => /Posizioni aperte/.test($(e).text())).first();
  expect(sezione.length, 'sezione Posizioni aperte').toBe(1);
  const testo = sezione.text();
  const schede = sezione.find(LINK_OFFERTA).length;
  if (FISSE) {
    for (const t of TITOLI) expect(testo, `offerta "${t}" nell'HTML`).toContain(t);
    expect(schede, 'schede-offerta come link').toBe(2);
  } else if (schede === 0) {
    expect(testo, 'nessuna offerta: messaggio al posto della sezione vuota').toContain('Al momento non ci sono posizioni aperte');
    expect(sezione.find('a[href="https://aletheia4job.it/"]').length, 'link ad aletheia4job.it').toBeGreaterThan(0);
    expect(sezione.find('a[href*="contatta-candidato"]').length, 'pulsante candidatura spontanea').toBeGreaterThan(0);
  }
  expect(html, 'scheletri di caricamento nell\'HTML').not.toMatch(/animate-pulse/);
  // nessun contatore (un numero da solo accanto a "Posizioni aperte")
  const soloNumeri = sezione.find('span').filter((_, e) => /^\s*\d+\s*$/.test($(e).text()));
  expect(soloNumeri.length, 'contatore del numero di posizioni').toBe(0);
});

for (const movimento of ['reduce', 'no-preference']) {
  test(`offerte: le schede sono visibili nel browser (movimento: ${movimento}) @rapido`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: movimento });
    await page.goto('/agenzia-per-il-lavoro', { waitUntil: 'networkidle' });
    const sezione = page.locator('section', { hasText: 'Posizioni aperte' }).first();
    await sezione.scrollIntoViewIfNeeded();
    const schede = sezione.locator(LINK_OFFERTA);
    if (FISSE) await expect(schede).toHaveCount(2);
    const n = await schede.count();
    if (n === 0) { await expect(sezione.getByText(/Al momento non ci sono posizioni aperte/)).toBeVisible(); return; }
    for (let i = 0; i < n; i++) {
      await expect(schede.nth(i)).toBeVisible();
      // opacità effettiva (di tutti gli antenati) = 1: Playwright considera "visibile" anche opacity:0
      await expect.poll(async () => schede.nth(i).evaluate((a) => { let e = a, op = 1; while (e) { op *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; } return op; }), { timeout: 4000 }).toBeGreaterThan(0.99);
    }
    await expect(sezione.getByText(/Al momento non ci sono posizioni aperte/)).toHaveCount(0);
  });
}

test('offerte: nessun contatore di posizioni aperte nella home e nel menu @rapido', async ({ page }) => {
  for (const url of ['/', '/agenzia-per-il-lavoro']) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('header').getByText(/posizioni aperte|\d+ offerte/i)).toHaveCount(0);
    await expect(page.locator('main').getByText(/\b\d+\s+(posizioni|offerte)\b/i)).toHaveCount(0);
  }
});
