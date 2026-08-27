// Verifica di responsività su più breakpoint (stesso approccio "manuale" di
// verify-scroll.mjs / verify-chatbot.mjs / verify-contatti.mjs): apre il dev server
// locale già in esecuzione, naviga un set di pagine a diverse dimensioni di viewport,
// salva uno screenshot per ogni combinazione e fa controlli programmatici sui problemi
// di responsività più comuni. Non modifica alcun file: solo verifica + report.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'fs';

const EXE = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:3000';
const SHOT_ROOT = 'test-screenshots/responsive';

const BREAKPOINTS = [
  { key: 'mobile-small', width: 360, height: 800 },
  { key: 'mobile-large', width: 430, height: 932 },
  { key: 'tablet-portrait', width: 768, height: 1024 },
  { key: 'tablet-landscape', width: 1024, height: 768 },
  { key: 'desktop', width: 1440, height: 900 },
  { key: 'desktop-large', width: 1920, height: 1080 },
];

const PAGES = [
  { key: 'home', path: '/' },
  { key: 'chi-siamo', path: '/chi-siamo' },
  { key: 'contatti', path: '/contatti' },
  { key: 'all-courses', path: '/all-courses' },
  // pagina corso servita dal template dinamico pages/all-courses/[slug].js
  // (non da uno dei file statici pages/all-courses/<slug>.js)
  { key: 'corso-dinamico', path: '/all-courses/lavori-in-quota' },
  { key: 'agenzia-per-il-lavoro', path: '/agenzia-per-il-lavoro' },
];

const NAV_COLLAPSE_BREAKPOINT = 768; // da globals.css: @media (max-width: 768px)
const CONTATTI_STACK_MAX_WIDTH = 480; // soglia richiesta per il check form/mappa

// ── Diagnostiche eseguite nel browser ──────────────────────────────────────

function evalOverflowX() {
  const scrollWidth = document.documentElement.scrollWidth;
  const clientWidth = window.innerWidth;
  return { scrollWidth, clientWidth, diff: scrollWidth - clientWidth };
}

function evalOffscreenElements(vw) {
  const results = [];
  // Contenuti volutamente più larghi del contenitore e clippati via overflow:hidden
  // sul parent (marquee/ticker loghi, caroselli a scroll orizzontale): non sono bug.
  // Escludiamo l'intero sottoalbero (anche se la classe è solo sul contenitore, non
  // sui singoli figli) e allo stesso modo l'intero sottoalbero di un overlay
  // position:fixed (drawer carrello, pannello chatbot, ecc.), che è ancorato al
  // viewport e spesso traslato volutamente fuori schermo quando "chiuso"
  // (es. CartDrawer: transform: translateX(100%) sul contenitore fixed — i figli
  // hanno position statica ma ereditano comunque la posizione fuori schermo).
  // Nessuno dei due casi contribuisce all'overflow orizzontale reale del documento.
  const skipClassPattern = /(carousel|track|scroll|marquee)/i;
  // Include anche il caso "dropdown chiuso con opacity-0 sul contenitore": opacity
  // non è ereditata come computed style dei figli, va controllata sugli antenati.
  function isInSkippedSubtree(el) {
    let node = el;
    while (node && node !== document.body) {
      const cs2 = getComputedStyle(node);
      const cls = typeof node.className === 'string' ? node.className : '';
      if (cs2.position === 'fixed' || cs2.opacity === '0' || skipClassPattern.test(cls)) return true;
      node = node.parentElement;
    }
    return false;
  }
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.pointerEvents === 'none') continue;
    if (isInSkippedSubtree(el)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    const overflowRight = rect.right - vw;
    if (overflowRight > 2) {
      const cls = typeof el.className === 'string' ? el.className : '';
      results.push({
        tag: el.tagName.toLowerCase(),
        cls: cls.slice(0, 70),
        overflowRight: Math.round(overflowRight),
      });
    }
  }
  results.sort((a, b) => b.overflowRight - a.overflowRight);
  // dedup per tag+cls così non riempiamo il report con lo stesso offender ripetuto
  const seen = new Set();
  const deduped = [];
  for (const r of results) {
    const k = `${r.tag}|${r.cls}`;
    if (seen.has(k)) continue;
    seen.add(k);
    deduped.push(r);
    if (deduped.length >= 5) break;
  }
  return deduped;
}

function evalTruncatedText() {
  const results = [];
  const skipClassPattern = /(carousel|track|scroll|marquee)/i;
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    if (results.length >= 6) break;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const cls = typeof el.className === 'string' ? el.className : '';
    if (skipClassPattern.test(cls)) continue;
    // line-clamp e text-overflow:ellipsis sono troncamenti intenzionali (design), non bug
    if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') continue;
    if (cs.textOverflow === 'ellipsis') continue;
    // Elementi "visually-hidden" per l'accessibilità (es. il route-announcer di Next.js
    // per screen reader) sono clippati a 1x1px di proposito: non è testo troncato, va escluso.
    const rectVh = el.getBoundingClientRect();
    if (rectVh.width <= 1 && rectVh.height <= 1) continue;
    if (cs.whiteSpace === 'nowrap' && (cs.overflow === 'hidden' || cs.overflowX === 'hidden')) {
      if (el.scrollWidth > el.clientWidth + 2 && el.textContent && el.textContent.trim().length > 0) {
        results.push({
          tag: el.tagName.toLowerCase(),
          cls: cls.slice(0, 60),
          text: el.textContent.trim().slice(0, 45),
        });
      }
    }
  }
  return results;
}

function evalNav() {
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  if (!hamburger || !navbar) return { found: false };
  return {
    found: true,
    hamburgerVisible: getComputedStyle(hamburger).display !== 'none',
    navbarDisplay: getComputedStyle(navbar).display,
  };
}

function evalChatbotOverlap() {
  const btn = document.querySelector(
    'button[aria-label="Apri assistente FAQ"], button[aria-label="Chiudi assistente"]'
  );
  if (!btn) return { present: false };
  const rect = btn.getBoundingClientRect();
  const overlaps = [];
  // Un dropdown "chiuso" spesso rende invisibile il contenuto con opacity-0 sul
  // contenitore (es. <ul> di un menu custom): opacity NON è ereditata come computed
  // style del figlio (il bottone risulta comunque opacity:1), quindi va controllata
  // camminando sugli antenati. pointer-events invece è ereditato correttamente ed è
  // un segnale altrettanto affidabile per lo stesso pattern (opacity-0 pointer-events-none).
  function isEffectivelyHidden(el) {
    let node = el;
    while (node && node !== document.body) {
      const cs2 = getComputedStyle(node);
      if (cs2.display === 'none' || cs2.visibility === 'hidden' || cs2.opacity === '0') return true;
      node = node.parentElement;
    }
    return false;
  }
  const interactive = document.querySelectorAll('a, button');
  for (const el of interactive) {
    if (el === btn) continue;
    const cs = getComputedStyle(el);
    if (cs.pointerEvents === 'none') continue;
    if (isEffectivelyHidden(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const intersects = !(r.right < rect.left || r.left > rect.right || r.bottom < rect.top || r.top > rect.bottom);
    if (intersects) {
      overlaps.push({
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40),
      });
    }
  }
  return {
    present: true,
    rect: { left: Math.round(rect.left), top: Math.round(rect.top), right: Math.round(rect.right), bottom: Math.round(rect.bottom) },
    overlaps: overlaps.slice(0, 5),
  };
}

function evalContattiOverlap() {
  const form = document.querySelector('form');
  const iframe = document.querySelector('iframe[title*="Sede"]');
  if (!form || !iframe) return { checked: false };
  const r1 = form.getBoundingClientRect();
  const r2 = iframe.getBoundingClientRect();
  const intersects = !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  const broken = r2.width < 10 || r2.height < 10; // mappa collassata a dimensione ~0
  return {
    checked: true,
    overlap: intersects,
    broken,
    formRect: { w: Math.round(r1.width), h: Math.round(r1.height) },
    mapRect: { w: Math.round(r2.width), h: Math.round(r2.height) },
  };
}

// ── Esecuzione ───────────────────────────────────────────────────────────

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage();

/** @type {{page: string, breakpoint: string, issues: string[]}[]} */
const report = [];

for (const p of PAGES) {
  mkdirSync(`${SHOT_ROOT}/${p.key}`, { recursive: true });

  for (const bp of BREAKPOINTS) {
    const issues = [];
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });
    // piccola attesa per idratazione/componenti client-only (es. chatbot con next/dynamic)
    await page.waitForTimeout(400);

    await page.screenshot({ path: `${SHOT_ROOT}/${p.key}/${bp.key}.png`, fullPage: true });

    // 1) Overflow orizzontale della pagina
    const overflow = await page.evaluate(evalOverflowX);
    if (overflow.diff > 2) {
      issues.push(`overflow orizzontale di ${overflow.diff}px (scrollWidth=${overflow.scrollWidth}, viewport=${overflow.clientWidth})`);
    }

    // 2) Elementi che escono dal viewport
    const offscreen = await page.evaluate(evalOffscreenElements, bp.width);
    for (const el of offscreen) {
      issues.push(`elemento <${el.tag} class="${el.cls}"> esce dal viewport di ${el.overflowRight}px`);
    }

    // 3) Testo potenzialmente troncato senza ellissi (clipping non intenzionale)
    const truncated = await page.evaluate(evalTruncatedText);
    for (const t of truncated) {
      issues.push(`possibile testo troncato in <${t.tag} class="${t.cls}">: "${t.text}"`);
    }

    // 4) Menu di navigazione: hamburger sotto NAV_COLLAPSE_BREAKPOINT, navbar sopra
    const nav = await page.evaluate(evalNav);
    if (!nav.found) {
      issues.push('elementi di navigazione (.hamburger / .navbar) non trovati nel DOM');
    } else {
      const shouldCollapse = bp.width <= NAV_COLLAPSE_BREAKPOINT;
      if (shouldCollapse && !nav.hamburgerVisible) {
        issues.push(`menu non collassato a hamburger a ${bp.width}px (hamburger nascosto)`);
      }
      if (!shouldCollapse && nav.hamburgerVisible) {
        issues.push(`hamburger visibile anche a ${bp.width}px (sopra la soglia di collasso ${NAV_COLLAPSE_BREAKPOINT}px)`);
      }
    }

    // 5) Contatti: form e mappa non devono sovrapporsi/rompersi sotto i 480px
    if (p.key === 'contatti' && bp.width < CONTATTI_STACK_MAX_WIDTH) {
      const contatti = await page.evaluate(evalContattiOverlap);
      if (!contatti.checked) {
        issues.push('impossibile verificare form/mappa: elementi non trovati');
      } else {
        if (contatti.overlap) issues.push('il form contatti e la mappa si sovrappongono');
        if (contatti.broken) issues.push(`mappa collassata a dimensioni troppo piccole (${contatti.mapRect.w}x${contatti.mapRect.h}px)`);
      }
    }

    // 6) Chatbot: il pulsante flottante non deve coprire contenuti/controlli importanti
    const chatbot = await page.evaluate(evalChatbotOverlap);
    if (chatbot.present && chatbot.overlaps.length > 0) {
      const labels = chatbot.overlaps.map((o) => `<${o.tag}> "${o.label}"`).join(', ');
      issues.push(`il pulsante chatbot si sovrappone a: ${labels}`);
    }

    report.push({ page: p.key, breakpoint: `${bp.key} (${bp.width}x${bp.height})`, issues });
  }
}

await browser.close();

// ── Report finale ───────────────────────────────────────────────────────

console.log('\n' + '='.repeat(70));
console.log('REPORT RESPONSIVITÀ');
console.log('='.repeat(70));

let totalIssues = 0;
for (const r of report) {
  const status = r.issues.length === 0 ? 'OK' : `${r.issues.length} PROBLEMA/I`;
  console.log(`\n[${r.page}] [${r.breakpoint}] => ${status}`);
  for (const issue of r.issues) {
    console.log(`   - ${issue}`);
    totalIssues++;
  }
}

console.log('\n' + '='.repeat(70));
console.log(`Combinazioni testate: ${report.length}  |  Problemi totali rilevati: ${totalIssues}`);
console.log(`Screenshot salvati in: ${SHOT_ROOT}/<pagina>/<breakpoint>.png`);
console.log('='.repeat(70));

process.exit(totalIssues === 0 ? 0 : 1);
