import { chromium } from 'playwright-core';
const EXE = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:3003/all-courses';
const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function test(name) {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(400);
  const beforeY = await page.evaluate(() => window.scrollY);
  // click in-page (no Playwright auto-scroll) + record footer visibility every frame
  const result = await page.evaluate((name) => new Promise((resolve) => {
    let foot = false, max = 0;
    const onScroll = () => {
      const f = document.querySelector('footer');
      if (f && f.getBoundingClientRect().top < window.innerHeight) foot = true;
      if (window.scrollY > max) max = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const li = [...document.querySelectorAll('aside li')].find(el => el.textContent.includes(name));
    li.click();
    let n = 0;
    const tick = () => { onScroll(); if (++n < 60) requestAnimationFrame(tick); else resolve({ y: window.scrollY, foot, max: Math.round(max) }); };
    requestAnimationFrame(tick);
  }), name);
  console.log(`[${name}] beforeY=${beforeY} footerEverVisible=${result.foot} maxScrollSeen=${result.max} finalY=${result.y} => ${(!result.foot && result.y===0)?'PASS':'FAIL'}`);
}
await test('Settore Agricolo');
await test('Programma GOL');
await test('Formazione Obbligatoria');
await browser.close();
