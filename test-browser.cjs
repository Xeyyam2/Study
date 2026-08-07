const { chromium } = require('@playwright/test');
const fs = require('fs');
(async () => {
  const out = [];
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const cm = [], pe = [];
    page.on('console', m => cm.push(m.type()+': '+m.text()));
    page.on('pageerror', e => pe.push(String(e.message)));
    await page.goto('http://localhost:3000/en/universities', { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(2500);
    out.push('TITLE: ' + await page.title());
    out.push('H1s: ' + JSON.stringify(await page.locator('h1').allTextContents()));
    out.push('NOT_FOUND_COUNT: ' + await page.getByText('Page not found').count());
    out.push('EXPLORE_COUNT: ' + await page.getByText('Explore universities').count());
    out.push('UNI_CARD_LINKS: ' + await page.locator('a[href*="/universities/"]').count());
    out.push('BODY: ' + ((await page.locator('body').innerText()).replace(/\s+/g,' ')).slice(0,1200));
    out.push('CONSOLE: ' + JSON.stringify(cm.slice(0,30)));
    out.push('PAGE_ERRORS: ' + JSON.stringify(pe));
    await browser.close();
  } catch (e) { out.push('FATAL: ' + String(e.message)); }
  fs.writeFileSync('browser-test-result.txt', out.join('\n'));
})();
