// Генерация фавикона: светлая «Р» из дороги внутри охристой «С» из кирпичей.
// Запуск: node scripts/build-favicon.mjs
// Результат: public/favicon/{icon.svg,favicon.ico,apple-icon.png,icon-192.png,icon-512.png} и public/favicon.ico

import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const GREEN = '#1F3B2D';
const OCHRE = '#D9A441';

const LIGHT = '#F6F4EE';

const pt = (cx, cy, r, a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)].map((v) => v.toFixed(2));

// «С»: дуга с раскрытием вправо из n крупных кирпичей с зазорами между ними
function brickC(cx, cy, r, w, open, n, gap) {
  const span = (360 - 2 * open) / n;
  let out = '';
  for (let k = 0; k < n; k++) {
    const from = -open - k * span - (k ? gap / 2 : 0);
    const to = -open - (k + 1) * span + (k < n - 1 ? gap / 2 : 0);
    const p = pt(cx, cy, r, from);
    const q = pt(cx, cy, r, to);
    out += `<path d="M${p[0]} ${p[1]}A${r} ${r} 0 0 0 ${q[0]} ${q[1]}" fill="none" stroke="${OCHRE}" stroke-width="${w}"/>`;
  }
  return out;
}

// «Р»: светлое полотно дороги с прерывистой разметкой по центру
function roadP(d, w, dash) {
  return (
    `<path d="${d}" fill="none" stroke="${LIGHT}" stroke-width="${w}" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${GREEN}" stroke-width="${dash}" stroke-dasharray="${(dash * 2.4).toFixed(1)} ${(dash * 2).toFixed(1)}"/>`
  );
}

// «Р» не касается «С»: внутренний радиус дуги 19, дальний угол буквы — 17.7 от центра
const mark = brickC(32, 32, 23, 8, 38, 6, 7) + roadP('M28.5 45.5V20h6.5a6.5 6.5 0 0 1 0 13h-6.5', 7, 1.4);

// rounded — для вкладок браузера; square — для iOS/Android, они сами скругляют углы
const svg = (mark) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" rx="14" fill="${GREEN}"/>${mark}</svg>\n`;

// Для иконок приложений знак чуть меньше, чтобы не попадал под маску скругления
const svgPadded = (mark) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 80 80">` +
  `<rect x="-8" y="-8" width="80" height="80" fill="${GREEN}"/>${mark}</svg>`;

const png = (src, size) => sharp(Buffer.from(src), { density: 72 * (size / 64) * 2 }).resize(size, size).png().toBuffer();

// ICO с PNG внутри (поддерживается всеми современными браузерами)
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const dir = 'public/favicon';
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/icon.svg`, svg(mark));
writeFileSync(
  `${dir}/favicon.ico`,
  ico([
    { size: 16, data: await png(svg(mark), 16) },
    { size: 32, data: await png(svg(mark), 32) },
    { size: 48, data: await png(svg(mark), 48) },
  ]),
);
writeFileSync(`${dir}/apple-icon.png`, await png(svgPadded(mark), 180));
writeFileSync(`${dir}/icon-192.png`, await png(svgPadded(mark), 192));
writeFileSync(`${dir}/icon-512.png`, await png(svgPadded(mark), 512));

// /favicon.ico в корне браузеры запрашивают без ссылки
copyFileSync(`${dir}/favicon.ico`, 'public/favicon.ico');
console.log('Фавикон собран: public/favicon/*, public/favicon.ico');
