// scripts/fix-meta-locale2.mjs — insert setRequestLocale into generateMetadata
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const base = join(root, 'src', 'app', '[locale]', '(marketing)');

function walk(dir, out) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'page.tsx') out.push(p);
  }
  return out;
}

const files = walk(base, []);
let changed = 0;
for (const f of files) {
  let src = readFileSync(f, 'utf8');
  // Only the generateMetadata block: find it, check it has setRequestLocale.
  const metaStart = src.indexOf('export async function generateMetadata');
  if (metaStart === -1) continue;
  const paramsIdx = src.indexOf('await params', metaStart);
  if (paramsIdx === -1) continue;
  // End of generateMetadata = the closing "}" of the function; find the first
  // "\n}" that follows the params line AND is followed by an export or another
  // top-level construct. Simpler: find the next "\nexport " after metaStart.
  const nextExport = src.indexOf('\nexport ', metaStart + 10);
  const metaBlockEnd = nextExport === -1 ? src.length : nextExport;
  const metaBlock = src.slice(metaStart, metaBlockEnd);
  if (metaBlock.includes('setRequestLocale')) continue;

  const localeLine = /(  const \{ locale \} = await params;\n)/.exec(metaBlock);
  if (!localeLine) continue;
  const fixed = metaBlock.replace(
    localeLine[1],
    localeLine[1] + '  setRequestLocale(locale);\n',
  );
  src = src.replace(metaBlock, fixed);
  // Ensure import.
  const importRe = /import \{ ([^}]+) \} from 'next-intl\/server';/;
  if (!importRe.test(src) || !/setRequestLocale/.test(src.split('import')[0] + src.match(importRe)?.[0] ?? '')) {
    src = src.replace(importRe, (m, names) => {
      const set = new Set(names.split(',').map((s) => s.trim()));
      set.add('setRequestLocale');
      return `import { ${[...set].join(', ')} } from 'next-intl/server';`;
    });
  }
  writeFileSync(f, src);
  console.log(`✓ ${f.replace(root + '\\', '')}`);
  changed++;
}
console.log(`\n✓ updated ${changed} files`);
