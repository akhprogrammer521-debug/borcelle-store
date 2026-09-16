import { chromium } from 'file:///C:/Users/VICTUS/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const mode = process.argv[2] ?? 'baseline';
const base = mode === 'baseline' ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:4174';
const routes = ['/', '/login', '/register', '/verification', '/payment', '/profile', '/profile/term&condition', '/profile/contact-us', '/products', '/products/product-details', '/cart'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
async function capture(page) {
  return page.evaluate(() => {
    const path = e => { const parts = []; while (e && e !== document.body) { parts.unshift(Array.from(e.parentElement.children).indexOf(e)); e = e.parentElement } return parts.join('.') };
    return Array.from(document.body.querySelectorAll('*')).filter(e => e.checkVisibility() && !e.closest('.cart-modal-drawer:not(.active)')).map(e => {
      const s = getComputedStyle(e), r = e.getBoundingClientRect();
      return { key: path(e), tag: e.tagName, classes: typeof e.className === 'string' ? e.className : e.className.baseVal, text: e.children.length === 0 ? e.textContent.slice(0, 80) : '', style: { color: s.color, backgroundColor: s.backgroundColor, borderColor: s.borderWidth === '0px' ? null : s.borderColor, borderWidth: s.borderWidth, fontSize: s.fontSize, fontWeight: s.fontWeight, filter: s.filter }, rect: { x: r.x, y: r.y, width: r.width, height: r.height } };
    });
  });
}
for (const [size, viewport] of Object.entries({ desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } })) {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport, colorScheme: theme });
    const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForFunction(theme => document.documentElement.dataset.bsTheme === theme, theme);
      const data = { size, theme, route, elements: await capture(page), errors: errors.splice(0) };
      results.push(data); console.log(mode, size, theme, route, data.elements.length);
    }
    await page.goto(base + '/verification', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Resend Code', exact: true }).hover();
    results.push({ size, theme, route: '/verification:hover-resend', elements: await capture(page), errors: [] });
    await context.close();
  }
}
await browser.close();
await fs.writeFile(`.tmp/theme-${mode}.json`, JSON.stringify(results));
if (mode !== 'baseline') {
  const baseline = JSON.parse(await fs.readFile('.tmp/theme-baseline.json', 'utf8')); const diffs = [];
  for (const after of results) {
    const before = baseline.find(b => b.size === after.size && b.theme === after.theme && b.route === after.route);
    if (!before) { diffs.push({ type: 'missingBaseline', size: after.size, theme: after.theme, route: after.route }); continue; }
    for (const next of after.elements) {
      const prev = before.elements.find(e => e.key === next.key); if (!prev) { diffs.push({ type: 'newElement', size: after.size, theme: after.theme, route: after.route, element: next }); continue; }
      const changes = {}; for (const property of Object.keys(next.style)) if (next.style[property] !== prev.style[property]) changes[property] = { before: prev.style[property], after: next.style[property] };
      for (const property of Object.keys(next.rect)) if (Math.abs(next.rect[property] - prev.rect[property]) > .1) changes['rect.' + property] = { before: prev.rect[property], after: next.rect[property] };
      if (Object.keys(changes).length) diffs.push({ size: after.size, theme: after.theme, route: after.route, key: next.key, tag: next.tag, classes: next.classes, text: next.text, changes });
    }
    if (after.errors.length) diffs.push({ type: 'pageerrors', size: after.size, theme: after.theme, route: after.route, errors: after.errors });
  }
  await fs.writeFile('.tmp/theme-diff.json', JSON.stringify(diffs, null, 2));
  const grouped = {}; for (const d of diffs) { const key = d.size + ' ' + d.theme + ' ' + d.route; grouped[key] = (grouped[key] ?? 0) + 1 }
  console.log('DIFF SUMMARY', JSON.stringify({ count: diffs.length, grouped }));
}
