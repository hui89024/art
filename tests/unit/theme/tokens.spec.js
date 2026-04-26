import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindConfig from '../../../tailwind.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const css = fs.readFileSync(path.resolve(__dirname, '../../../src/assets/index.css'), 'utf8');

test('defines the global design tokens for the redesign', () => {
  const extend = tailwindConfig.theme?.extend ?? {};

  assert.equal(extend.colors?.['brand-red'], '#B4232A');
  assert.equal(extend.colors?.['ink-black'], '#111214');
  assert.equal(extend.colors?.['porcelain-white'], '#F7F5F2');
  assert.equal(extend.colors?.['jade-gray'], '#A3A8AC');
  assert.equal(extend.colors?.['gold-accent'], '#C8A86B');

  assert.equal(extend.spacing?.['18'], '4.5rem');
  assert.ok(extend.borderRadius?.['2xl']);
  assert.equal(extend.boxShadow?.glass?.includes('rgba'), true);

  assert.match(css, /--jy-color-brand:\s*#B4232A;/);
  assert.match(css, /--jy-color-bg:\s*#F7F5F2;/);
  assert.match(css, /--jy-color-text:\s*#111214;/);
  assert.match(css, /--jy-color-muted:\s*#A3A8AC;/);
  assert.match(css, /--jy-color-accent:\s*#C8A86B;/);
  assert.match(css, /body\s*\{[\s\S]*color:\s*var\(--jy-color-text\)/);
  assert.match(css, /\.jy-glass-card\s*\{/);
  assert.match(css, /\.jy-primary-btn\s*\{/);
  assert.match(css, /\.jy-primary-btn:hover\s*\{/);
});
