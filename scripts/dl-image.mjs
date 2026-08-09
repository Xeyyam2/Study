// Script: download Unsplash photo, convert to WebP (max 1600px, q=85), save locally.
// Usage: node scripts/dl-image.mjs <unsplashPhotoId> <outPath> [width]
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const [photoId, outPath, widthRaw] = process.argv.slice(2);
if (!photoId || !outPath) {
  console.error('Usage: node scripts/dl-image.mjs <photoId> <outPath> [width]');
  process.exit(1);
}
const width = Number(widthRaw) || 1600;

const url = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=2000&q=85`;
const res = await fetch(url);
if (!res.ok) {
  console.error(`Fetch failed: ${res.status} ${url}`);
  process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());

const outAbs = resolve(outPath);
mkdirSync(dirname(outAbs), { recursive: true });

const webp = await sharp(buf)
  .resize({ width, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toBuffer();

writeFileSync(outAbs, webp);
const kb = Math.round(webp.length / 1024);
console.log(`✓ ${outPath} (${kb} KB, ${width}px)`);
