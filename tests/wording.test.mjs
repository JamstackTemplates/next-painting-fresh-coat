import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outDir = join(root, 'out');

function collectHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

test('built HTML enforces enquiry wording (no booked/reserved; confirmed only in reply notice)', () => {
  if (!existsSync(outDir)) return;
  const htmlFiles = collectHtmlFiles(outDir);
  assert.ok(htmlFiles.length >= 4, 'expected built HTML pages in out/');

  const allowedConfirmedPhrase = /only confirmed once we(?:&#x27;|'|’)ve replied/gi;

  for (const file of htmlFiles) {
    const raw = readFileSync(file, 'utf8');
    // Strip Next.js RSC script payloads and inspect visible text + meta content
    const withoutScripts = raw
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
    const cleaned = withoutScripts.replace(allowedConfirmedPhrase, '');

    for (const forbidden of ['booked', 'confirmed', 'reserved']) {
      const re = new RegExp(`\\b${forbidden}\\b`, 'i');
      assert.equal(
        re.test(cleaned),
        false,
        `Forbidden term "${forbidden}" found in ${file}`,
      );
    }
  }

  const contactHtml = readFileSync(join(outDir, 'contact', 'index.html'), 'utf8');
  assert.match(
    contactHtml,
    /only confirmed once we(?:&#x27;|'|’)ve replied/i,
    'Contact page must state that a visit time is only confirmed once we have replied',
  );
});
