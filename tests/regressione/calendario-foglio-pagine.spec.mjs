// Calendario dal foglio, sulle pagine vere. Due build separate di produzione (cartelle .next-test-calendario-*, fuori dalla build principale)
// con un foglio di prova al posto di Google (CALENDARIO_FOGLIO_FILE): una con edizioni (pubblicate, bozza, aziendali, passate, in corso, righe
// non valide) e una senza nessuna data pubblicata futura. "Oggi" è congelato a 6 novembre 2026. Tag @calendario (non @rapido: due build, ~4 minuti):
//   npx playwright test --grep @calendario --workers=1
import { test, expect } from '@playwright/test';
import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';

const radice = path.resolve(import.meta.dirname, '..', '..');
const fixture = (n) => path.join(radice, 'tests', 'riferimenti', 'calendario', n);
const next = path.join(radice, 'node_modules', 'next', 'dist', 'bin', 'next');

async function avvia(nome, fileFoglio, porta) {
  const env = {
    ...process.env,
    NEXT_DIST_DIR: `.next-test-calendario-${nome}`,
    CALENDARIO_FOGLIO_FILE: fileFoglio,
    DATA_FISSA_TEST: '2026-11-06',
    JOBS_API_URL: process.env.JOBS_API_URL,
  };
  delete env.CALENDARIO_FONTE;
  const b = spawnSync(process.execPath, [next, 'build', '--webpack'], { cwd: radice, env, encoding: 'utf8', timeout: 420_000 });
  if (b.status !== 0) throw new Error(`build fallita (${nome}): ${(b.stdout || '').slice(-600)}${(b.stderr || '').slice(-400)}`);
  const server = spawn(process.execPath, [next, 'start', '-p', String(porta), '-H', '127.0.0.1'], { cwd: radice, env, stdio: 'ignore' });
  const base = `http://127.0.0.1:${porta}`;
  for (let i = 0; i < 60; i += 1) {
    try { if ((await fetch(base + '/')).ok) return { server, base, avvisiBuild: `${b.stdout}\n${b.stderr}` }; } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('server non partito');
}
const ferma = (s) => { try { spawnSync('taskkill', ['/pid', String(s.pid), '/T', '/F']); } catch { s.kill(); } };

test.describe.serial('foglio con edizioni @calendario', () => {
  let s;
  test.beforeAll(async () => { test.setTimeout(540_000); s = await avvia('a', fixture('foglio-con-edizioni.json'), 3102); });
  test.afterAll(() => s && ferma(s.server));

  test('la build segnala le righe scartate e non stampa dati interni @calendario', () => {
    expect(s.avvisiBuild).toMatch(/riga 9: il corso "Corso Che Non Esiste" non è nel catalogo/);
    expect(s.avvisiBuild).toMatch(/riga 10: data_inizio "17\/11\/206" non valida/);
    expect(s.avvisiBuild).not.toContain('nota interna NON PUBBLICA');
  });

  test('calendario: solo edizioni pubblicate, Multiaziendali e non concluse; posti non indicati senza "esaurito" @calendario', async ({ page }) => {
    await page.goto(s.base + '/calendario-corsi');
    await expect(page.getByText('5 corsi in programma').first()).toBeVisible(); // Antincendio, OSA, Lavoratori + 2 già iniziate (Trattori, RSPP); la passata, le bozze e le altre no
    await page.getByRole('button', { name: /Novembre 2026/ }).click();
    const html = await page.locator('main').innerText();
    expect(html).toContain('Antincendio — Rischio medio Livello 2 (8 ore)');
    expect(html).toContain('Vittoria, Via del Carrubo');
    expect(html).toContain('9:00-13:00');
    expect(html).toContain('12/11/2026, 16/11/2026, 17/11/2026');
    expect(html).toContain('Personale Alimentarista OSA — Nuovo (12 ore)');
    expect(html).toContain('Trattori Agricoli o Forestali — Su ruote e cingoli (13 ore)'); // già iniziata: resta fino a data_fine (9 novembre)
    expect(html).toContain('RSPP - Datore Di Lavoro — IN CORSO OBBLIGATORIA');
    // etichetta "In corso": solo sulle due edizioni già iniziate, non sulle altre
    await expect(page.locator('.in-corso-badge')).toHaveCount(2);
    await expect(page.locator('div', { hasText: 'Trattori Agricoli o Forestali — Su ruote e cingoli (13 ore)' }).last()).toContainText('In corso');
    await expect(page.locator('div', { hasText: 'Antincendio — Rischio medio Livello 2 (8 ore)' }).last()).not.toContainText('In corso');
    for (const vietato of ['RISERVATO', 'BOZZA NON VISIBILE', 'NON A CATALOGO', 'DATA IMPOSSIBILE', 'Aggiornamento (4 ore)', 'nota interna', 'NON PUBBLICA']) expect(html, vietato).not.toContain(vietato);
    // OSA (FAD, senza sede e senza posti): niente riga posti, niente "esaurito" né lista d'attesa; Lavoratori con posti 0: lista d'attesa
    const osa = page.locator('div', { hasText: 'Personale Alimentarista OSA — Nuovo (12 ore)' }).last();
    await expect(osa).not.toContainText(/posti|esauriti/i);
    await expect(page.getByText('Posti esauriti')).toHaveCount(1);
    await expect(page.getByText('Lista d\'attesa')).toHaveCount(1);
    await expect(page.getByText('Nuove date in arrivo')).toHaveCount(0);
  });

  test('home "Corsi in partenza": i giorni delle edizioni valide, nient\'altro @calendario', async ({ page }) => {
    await page.goto(s.base + '/');
    const tabs = page.locator('.cal-tab');
    await expect(tabs).toHaveCount(3); // 12, 13, 19 novembre: le edizioni già iniziate (4 e 5 novembre) non sono "in partenza"
    const html = await page.locator('#calendario-heading').locator('xpath=ancestor::section').innerText();
    for (const vietato of ['RISERVATO', 'BOZZA NON VISIBILE', 'NON A CATALOGO', 'DATA IMPOSSIBILE', 'IN CORSO OBBLIGATORIA', 'Su ruote e cingoli']) expect(html, vietato).not.toContain(vietato);
    await tabs.nth(0).click();
    await expect(page.getByText('Antincendio — Rischio medio Livello 2 (8 ore)')).toBeVisible();
    await expect(page.getByText('Nuove date in arrivo')).toHaveCount(0);
  });

  test('Formazione obbligatoria: le edizioni della categoria, stessa regola @calendario', async ({ page }) => {
    await page.goto(s.base + '/formazione/obbligatoria');
    const html = await page.locator('#form-contatto').innerText();
    expect(html).toContain('Antincendio — Rischio medio Livello 2 (8 ore)');
    expect(html).toContain('Personale Alimentarista OSA — Nuovo (12 ore)');
    expect(html).toContain('FAD'); // OSA non ha sede: mostra la modalità
    for (const vietato of ['RISERVATO', 'BOZZA NON VISIBILE', 'NON A CATALOGO', 'DATA IMPOSSIBILE', 'IN CORSO OBBLIGATORIA']) expect(html, vietato).not.toContain(vietato); // l'edizione già iniziata non è "in partenza"
    await expect(page.getByText('Nuove date in arrivo')).toHaveCount(0);
  });

  test('schede corso: "Prossima edizione" solo con una data futura nel foglio, altrimenti come prima @calendario', async ({ page }) => {
    await page.goto(s.base + '/corsi/antincendio');
    await expect(page.getByText('Prossima edizione: 12 novembre 2026, Vittoria, Via del Carrubo')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await page.goto(s.base + '/corsi/personale-alimentarista-osa');
    await expect(page.getByText('Prossima edizione: 13 novembre 2026, FAD')).toBeVisible(); // senza sede: la modalità
    // Trattori: l'edizione in corso è iniziata il 5 novembre (passata) e l'altra il 3: nessuna "prossima"
    await page.goto(s.base + '/corsi/trattori-agricoli-o-forestali');
    await expect(page.getByText(/Prossima edizione/)).toHaveCount(0);
    // corso senza nessuna edizione (la sua è una bozza) e corso non in calendario
    for (const slug of ['lavori-in-quota', 'rls', 'icdl-base']) {
      await page.goto(`${s.base}/corsi/${slug}`);
      await expect(page.getByText(/Prossima edizione/), slug).toHaveCount(0);
      await expect(page.locator('h1'), slug).toHaveCount(1);
    }
  });
});

test.describe.serial('foglio senza date pubblicate future @calendario', () => {
  let s;
  test.beforeAll(async () => { test.setTimeout(540_000); s = await avvia('b', fixture('foglio-senza-date-pubblicate.json'), 3103); });
  test.afterAll(() => s && ferma(s.server));

  test('home, calendario e Formazione obbligatoria: "Nuove date in arrivo", niente righe né errori @calendario', async ({ page }) => {
    const errori = [];
    page.on('pageerror', (e) => errori.push(e.message));
    for (const url of ['/', '/calendario-corsi', '/formazione/obbligatoria']) {
      await page.goto(s.base + url);
      await expect(page.getByText('Nuove date in arrivo'), url).toBeVisible();
      await expect(page.locator('h1'), url).toHaveCount(1);
    }
    await page.goto(s.base + '/');
    await expect(page.locator('.cal-tab')).toHaveCount(0);
    await page.goto(s.base + '/calendario-corsi');
    await expect(page.getByText('0 corsi in programma').first()).toBeVisible();
    await page.goto(s.base + '/formazione/obbligatoria');
    await expect(page.getByText('Corsi in partenza')).toHaveCount(0); // il blocco con i filtri per data non compare
    expect(errori).toEqual([]);
  });

  test('schede corso: nessuna "Prossima edizione" (comportamento di prima) @calendario', async ({ page }) => {
    for (const slug of ['antincendio', 'lavori-in-quota']) {
      await page.goto(`${s.base}/corsi/${slug}`);
      await expect(page.getByText(/Prossima edizione/), slug).toHaveCount(0);
      await expect(page.locator('h1'), slug).toHaveCount(1);
    }
  });
});
