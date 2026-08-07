const { chromium } = require('@playwright/test');
const fs = require('fs');
const routes = ['/en','/en/about','/en/programs','/en/blog','/en/contact','/en/universities','/en/universities/bahcesehir-university'];
(async () => {
  const out = [];
  try {
    const browser = await chromium.launch({ headless: true });
    for (const p of routes) {
      const page = await browser.newPage();
      try {
        await page.goto('http://localhost:3000' + p, { waitUntil: 'networkidle', timeout: 120000 });
        await page.waitForTimeout(1500);
        const title = await page.title();
        const h1s = await page.locator('h1').allTextContents();
        const nf = await page.getByText('Page not found').count();
        out.push(p + ' | title=' + JSON.stringify(title) + ' | h1s=' + JSON.stringify(h1s) + ' | notfound=' + nf);
      } catch (e) { out.push(p + ' | ERR: ' + e.message); }
      await page.close();
    }
    await browser.close();
  } catch (e) { out.push('FATAL: ' + e.message); }
  fs.writeFileSync('routes-test-result.txt', out.join('\n'));
})();
