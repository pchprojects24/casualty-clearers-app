// Drives the built app in a real browser and fails on the kinds of breakage
// that lint, the content validator and a successful build all miss: a page
// that does not render, a layout that overflows the viewport, a touch target
// too small to hit, or a runtime error.
//
// Usage: npm run build && npm run test:smoke
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { categories, topics } from '../src/data/content.js';

const PORT = Number(process.env.SMOKE_PORT || 4178);
// Environments that ship their own Chromium (rather than one downloaded by
// `playwright install`) can point at it instead.
const EXECUTABLE = process.env.SMOKE_CHROMIUM || undefined;
const BASE = `http://127.0.0.1:${PORT}/`;
// The two widths that have actually caught layout breaks here, plus the
// narrowest supported phone and a wide desktop.
const WIDTHS = [320, 390, 768, 1400];
const MIN_TOUCH = 44;

const routes = [
  '#/home', '#/explore', '#/glossary', '#/saved', '#/recent',
  ...categories.map((category) => `#/category/${category.id}`),
  ...topics.map((topic) => `#/topic/${topic.id}`),
];

const failures = [];
const fail = (message) => failures.push(message);

const startServer = () => new Promise((resolve, reject) => {
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], { stdio: 'ignore' });
  server.on('error', reject);
  const deadline = Date.now() + 60_000;
  const poll = async () => {
    try {
      const response = await fetch(BASE);
      if (response.ok) return resolve(server);
    } catch { /* not listening yet */ }
    if (Date.now() > deadline) return reject(new Error('vite preview did not start'));
    return setTimeout(poll, 250);
  };
  poll();
});

const server = await startServer();
const browser = await chromium.launch(EXECUTABLE ? { executablePath: EXECUTABLE } : {});

try {
  // 1. Every route renders, with no runtime errors.
  const desktop = await browser.newContext({ viewport: { width: 1400, height: 950 } });
  const page = await desktop.newPage();
  page.on('pageerror', (error) => fail(`runtime error: ${error.message}`));
  page.on('console', (message) => {
    const text = message.text();
    if (message.type() === 'error' && !text.includes('ERR_') && !text.includes('fonts.g')) fail(`console error: ${text}`);
  });

  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(40);
    const rendered = await page.evaluate(() => (document.getElementById('root')?.innerHTML.length || 0) > 500);
    if (!rendered) fail(`${route} rendered an empty page`);
  }

  for (const topic of topics) {
    await page.goto(BASE + `#/topic/${topic.id}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(40);
    const shape = await page.evaluate(() => ({
      heading: !!document.querySelector('.article-header h1'),
      blocks: document.querySelectorAll('.reference-content > *').length,
    }));
    if (!shape.heading) fail(`topic ${topic.id} has no heading`);
    if (!shape.blocks) fail(`topic ${topic.id} rendered no content`);
  }
  await desktop.close();

  // 2. No route overflows its viewport at any supported width.
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const sized = await context.newPage();
    for (const route of routes) {
      await sized.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      await sized.waitForTimeout(35);
      const overflow = await sized.evaluate(() => {
        const client = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth <= client + 1) return null;
        const culprits = [...document.querySelectorAll('body *')]
          .filter((element) => element.getBoundingClientRect().right > client + 1)
          .map((element) => (typeof element.className === 'string' && element.className.trim() ? element.className.trim().split(/\s+/)[0] : element.tagName.toLowerCase()));
        return { width: document.documentElement.scrollWidth, client, culprits: [...new Set(culprits)].slice(0, 3) };
      });
      if (overflow) fail(`${route} overflows at ${width}px (${overflow.width} > ${overflow.client}) via ${overflow.culprits.join(', ')}`);
    }
    await context.close();
  }

  // 3. Touch targets stay reachable on a phone.
  for (const width of [320, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 844 } });
    const phone = await context.newPage();
    for (const route of ['#/home', '#/explore', '#/glossary', '#/topic/marche', '#/topic/secondary-survey', '#/topic/bleeding-overview', '#/category/equipment']) {
      await phone.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      await phone.waitForTimeout(120);
      const small = await phone.evaluate((min) => [...document.querySelectorAll('button, a')]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { label: (element.getAttribute('aria-label') || element.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 30), w: Math.round(rect.width), h: Math.round(rect.height) };
        })
        .filter((box) => box.w > 0 && box.h > 0 && (box.w < min || box.h < min)), MIN_TOUCH);
      for (const box of small) fail(`${route} at ${width}px: "${box.label}" is ${box.w}x${box.h}, under ${MIN_TOUCH}px`);
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.kill();
}

const unique = [...new Set(failures)];
if (unique.length) {
  console.error(`Smoke test failed with ${unique.length} problem${unique.length === 1 ? '' : 's'}:`);
  for (const message of unique) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Smoke test passed: ${routes.length} routes rendered, no overflow at ${WIDTHS.join('/')}px, no touch target under ${MIN_TOUCH}px, no runtime errors.`);
