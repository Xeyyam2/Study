// scripts/fix-metadata-locale.mjs
// next-intl v4 requires setRequestLocale() before getTranslations in
// generateMetadata. Add it to every marketing page's generateMetadata that
// lacks it.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const base = join(root, 'src', 'app', '[locale]', '(marketing)');

const pages = [
  'about/page.tsx',
  'apply/page.tsx',
  'blog/page.tsx',
  'blog/[slug]/page.tsx',
  'compare/page.tsx',
  'contact/page.tsx',
  'programs/page.tsx',
  'programs/[category]/page.tsx',
  'programs/[category]/[city]/page.tsx',
  'study-in-turkey-from/[country]/page.tsx',
  'universities/page.tsx',
  'universities/[slug]/page.tsx',
];

let changed = 0;
for (const rel of pages) {
  const f = join(base, rel);
  let src;
  try {
    src = readFileSync(f, 'utf8');
  } catch {
    continue;
  }
  // Locate the generateMetadata body: from "generateMetadata" to the first
  // "\n}" after "await params".
  const start = src.indexOf('export async function generateMetadata');
  if (start === -1) continue;
  const paramsIdx = src.indexOf('await params', start);
  if (paramsIdx === -1) continue;
  const end = src.indexOf('\n}', paramsIdx);
  if (end === -1) continue;
  const metaBlock = src.slice(start, end + 2);
  if (metaBlock.includes('setRequestLocale')) continue;

  // Insert after `const { locale } = await params;`
  const localeLine = /(const \{ locale \} = await params;\n)/.exec(metaBlock);
  if (!localeLine) continue;
  const fixed = metaBlock.replace(
    localeLine[1],
    localeLine[1] + '  setRequestLocale(locale);\n',
  );
  src = src.replace(metaBlock, fixed);

  // Ensure setRequestLocale is imported from next-intl/server.
  if (!/setRequestLocale/.test(src.replace(fixed, '')) && !src.slice(0, start).includes('setRequestLocale')) {
    src = src.replace(
      /import \{ ([^}]+) \} from 'next-intl\/server';/,
      (m, names) => {
        const set = new Set(names.split(',').map((s) => s.trim()));
        set.add('setRequestLocale');
        return `import { ${[...set].join(', ')} } from 'next-intl/server';`;
      },
    );
  }
  writeFileSync(f, src);
  console.log(`✓ ${rel}`);
  changed++;
}
console.log(`\n✓ updated ${changed} files`);
