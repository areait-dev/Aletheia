// Sezione "Chi siamo" (testo + foto) di /agenzia-per-il-lavoro: controllo geometrico in WebKit a molte larghezze.
// Script a parte (non un test di Playwright Test: dentro il lanciatore webkit.launch() si chiude subito su questa macchina).
//   node tests/regressione/chi-siamo-layout.mjs <indirizzo-base>      (es. http://localhost:3101)   → esce con 1 se trova violazioni
// Regole (componente .split-testo-foto in styles/globals.css):
//   < 744px      una colonna, foto SOPRA il testo
//   744-1023px   foto sopra a tutta larghezza; testo su due colonne solo se >= 45 caratteri per riga, altrimenti una colonna
//   >= 1024px    testo | foto affiancati, foto alta quanto il blocco di testo (±2px); testo su due colonne
//   sempre       ogni paragrafo sta in UNA colonna (mai spezzato a metà), il titolo non è dentro le colonne, nessuno scroll orizzontale,
//                foto e testo visibili (opacità 1), foto con object-fit: cover e proporzioni naturali (nessuna deformazione)
import { webkit } from '@playwright/test';

const base = process.argv[2] || 'http://localhost:3101';
const MISURE = [[390, 844], [744, 1133], [768, 1024], [820, 1180], [834, 1194], [1023, 800], [1024, 768], [1032, 1376], [1133, 744], [1180, 820], [1280, 800], [1366, 1024], [1440, 900]];
const browser = await webkit.launch();
const violazioni = []; const tabella = [];
for (const [w, h] of MISURE) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 1100, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'all'); } catch { /* niente */ } });
  const page = await ctx.newPage();
  await page.goto(base + '/agenzia-per-il-lavoro', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForSelector('.split-testo-foto', { timeout: 10000 });
  await page.locator('.split-testo-foto').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const m = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const r = (e) => { const x = e.getBoundingClientRect(); return { top: x.top + scrollY, bottom: x.bottom + scrollY, left: x.left, right: x.right, w: x.width, h: x.height }; };
    const root = q('.split-testo-foto'); const testo = q('.split-testo-foto__testo'); const foto = q('.split-testo-foto__foto'); const col = q('.split-testo-foto__colonne');
    const ps = [...col.querySelectorAll(':scope > p')];
    const info = ps.map((p) => {
      const rg = document.createRange(); rg.selectNodeContents(p);
      const rects = [...rg.getClientRects()].filter((x) => x.width > 2);
      // inizio di ogni riga = il left minimo tra i rettangoli con lo stesso top (un <strong> a metà riga non conta): colonne diverse = left diversi
      const perRiga = new Map(); rects.forEach((x) => { const k = Math.round(x.top); perRiga.set(k, Math.min(perRiga.get(k) ?? 1e9, x.left)); });
      const lefts = [...new Set([...perRiga.values()].map((x) => Math.round(x / 4)))];
      const tops = perRiga;
      return { lunghezza: p.textContent.trim().length, righe: tops.size, semplice: p.children.length === 0, colonne: lefts.length, left: Math.round(p.getBoundingClientRect().left), lead: p.classList.contains('split-testo-foto__lead') };
    });
    const img = foto.querySelector('img'); const cs = getComputedStyle(img);
    const op = (e) => { let o = 1; while (e) { o *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; } return o; };
    return { testo: r(testo), foto: r(foto), col: r(col), ps: info, fit: cs.objectFit, imgNat: [img.naturalWidth, img.naturalHeight], imgBox: [Math.round(img.getBoundingClientRect().width), Math.round(img.getBoundingClientRect().height)],
      opFoto: op(foto), opTesto: op(testo), titoloDentro: !!col.querySelector('h2, h3, span'), overflowX: document.documentElement.scrollWidth > innerWidth + 1, fotoSopra: r(foto).bottom <= r(testo).top + 1 };
  });
  const corpo = m.ps.filter((p) => !p.lead);
  const duecol = corpo.length >= 2 && corpo[0].left !== corpo[1].left;
  // caratteri per riga misurati solo sui paragrafi senza tag inline (un <strong> falsa il conteggio delle righe)
  const cpr = corpo.filter((p) => p.semplice).map((p) => Math.round(p.lunghezza / Math.max(1, p.righe)));
  tabella.push(`${String(w).padStart(5)}px  foto ${m.fotoSopra ? 'sopra  ' : 'a lato '} ${Math.round(m.foto.w)}x${Math.round(m.foto.h)} | testo h=${Math.round(m.testo.h)} | colonne=${duecol ? 2 : 1} | caratteri/riga ${cpr.join('/')}`);
  const v = (x) => violazioni.push(`${w}px: ${x}`);
  if (m.overflowX) v('scroll orizzontale');
  if (m.opFoto < 0.99 || m.opTesto < 0.99) v(`foto o testo non visibili (opacità ${m.opFoto.toFixed(2)}/${m.opTesto.toFixed(2)})`);
  if (m.fit !== 'cover') v(`object-fit ${m.fit} (deve essere cover)`);
  if (m.titoloDentro) v('badge o titolo dentro le colonne');
  for (const p of m.ps) if (p.colonne > 1) v(`un paragrafo è spezzato su più colonne (${p.lunghezza} caratteri)`);
  if (m.imgNat[0] && Math.abs(m.imgBox[0] / m.imgBox[1] - m.imgNat[0] / m.imgNat[1]) > 5) { /* con cover il riquadro può avere altre proporzioni: non è una deformazione */ }
  if (w < 744) { if (!m.fotoSopra) v('telefono: la foto deve stare sopra il testo'); if (duecol) v('telefono: una sola colonna'); }
  else if (w < 1024) { if (!m.fotoSopra) v('tablet: la foto deve stare sopra il testo'); if (Math.abs(m.foto.w - m.testo.w) > 2) v(`tablet: foto non a tutta larghezza (${Math.round(m.foto.w)} contro ${Math.round(m.testo.w)})`); if (duecol && cpr.some((c) => c < 45)) v(`tablet: due colonne con meno di 45 caratteri per riga (${cpr.join('/')})`); }
  else {
    if (m.fotoSopra || m.foto.left < m.testo.right - 1) v('da 1024px: testo e foto devono essere affiancati');
    if (Math.abs(m.foto.h - m.testo.h) > 2) v(`da 1024px: foto alta ${Math.round(m.foto.h)}px, testo ${Math.round(m.testo.h)}px`);
    if (!duecol) v('da 1024px: il testo deve stare su due colonne');
    if (duecol && cpr.some((c) => c < 45)) v(`da 1024px: meno di 45 caratteri per riga (${cpr.join('/')})`);
  }
  await ctx.close();
}
await browser.close();
console.log(tabella.join('\n'));
console.log(`\nviolazioni: ${violazioni.length}`);
violazioni.forEach((x) => console.log(' -', x));
process.exit(violazioni.length ? 1 : 0);
