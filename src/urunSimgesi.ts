// Ürün simgeleri: dondurma topları, tatlılar ve içecekler (çizimsiz paket için
// düz, sade şekiller; el çizimi görseller gelince yerine geçer).
// Hepsi 100x100'lük bir karede çizilir; topun yuvarlak yerine oturur.

import { URUNLER } from './ayarlar';

// Rengi koyulaştırır ya da açar (oran -1..1).
function ton(hex: string, oran: number): string {
  const n = parseInt(hex.slice(1), 16);
  const kanal = (k: number) => {
    const v = (n >> k) & 255;
    const h = oran < 0 ? v * (1 + oran) : v + (255 - v) * oran;
    return Math.round(Math.max(0, Math.min(255, h)));
  };
  return `rgb(${kanal(16)},${kanal(8)},${kanal(0)})`;
}

// Dondurma topu: alttan dalgalı kenarlı yuvarlak, sol üstte parlaklık,
// çeşide göre küçük benekler.
function dondurma(id: string, renk: string): string {
  const koyu = ton(renk, -0.22);
  const benek: Record<string, string> = {
    cikolata: '#4a2a17',
    cilek: '#d9465f',
    limon: '#fff7c2',
    fistik: '#6f9a3a',
    vanilya: '#6b4a2a',
  };
  const b = benek[id] ?? koyu;
  const benekler = [
    [34, 44, 3.2], [58, 36, 2.8], [66, 56, 3], [44, 62, 2.6], [52, 50, 2.2], [28, 58, 2.4],
  ]
    .map(([x, y, r]) =>
      id === 'cilek'
        ? `<ellipse cx="${x}" cy="${y}" rx="${r * 0.7}" ry="${r}" fill="${b}"/>`
        : `<circle cx="${x}" cy="${y}" r="${id === 'vanilya' ? r * 0.5 : r}" fill="${b}"/>`,
    )
    .join('');
  return `
    <path d="M10 56 C10 26 30 10 50 10 C70 10 90 26 90 56
             C90 62 86 66 82 64 C78 72 70 72 66 66 C60 74 50 74 46 67
             C40 74 30 73 28 66 C22 71 13 67 14 60 C11 60 10 58 10 56 Z"
          fill="${renk}" stroke="${koyu}" stroke-width="3"/>
    <path d="M14 60 C22 71 30 73 28 66 C30 73 40 74 46 67 C50 74 60 74 66 66 C70 72 78 72 82 64"
          fill="none" stroke="${koyu}" stroke-width="3"/>
    ${benekler}
    <ellipse cx="34" cy="28" rx="11" ry="7" fill="#fff" opacity="0.55" transform="rotate(-25 34 28)"/>`;
}

// Tatlı ve içeceklerin altındaki tabak gibi açık renk daire.
const TABAK = `<circle cx="50" cy="50" r="46" fill="#fffaf0" stroke="#e8d6c0" stroke-width="3"/>`;

function tatliIcecek(id: string): string {
  switch (id) {
    case 'pasta': // dilim pasta: kat kat üçgen, üstte krema ve kiraz
      return `${TABAK}
        <path d="M18 70 L82 70 L82 44 L18 58 Z" fill="#f7d9a8" stroke="#b07a3c" stroke-width="3" stroke-linejoin="round"/>
        <path d="M18 64 L82 64 L82 54 L18 64 Z" fill="#e88aa3"/>
        <path d="M18 58 L82 44 L82 38 Q70 34 58 40 Q44 38 30 48 Q20 50 18 58 Z" fill="#fff" stroke="#e0cbb4" stroke-width="2"/>
        <circle cx="66" cy="32" r="7" fill="#d9263c"/>
        <path d="M66 26 Q68 18 74 16" stroke="#4d7a2a" stroke-width="2.5" fill="none"/>`;
    case 'kek': // küçük kek: kâğıt kalıp, üstünde krema ve böğürtlen
      return `${TABAK}
        <path d="M28 52 L72 52 L66 82 L34 82 Z" fill="#c98a4a" stroke="#8a5a2a" stroke-width="3" stroke-linejoin="round"/>
        <path d="M40 54 L42 80 M50 54 L50 80 M60 54 L58 80" stroke="#8a5a2a" stroke-width="2"/>
        <path d="M24 54 Q22 40 36 38 Q38 24 50 26 Q62 24 64 38 Q78 40 76 54 Z" fill="#fff0f4" stroke="#e7b9c6" stroke-width="3"/>
        <circle cx="50" cy="24" r="7" fill="#5b3b8c"/>`;
    case 'meyve': // kâsede meyve: kâse, üstünde çilek ve kiraz
      return `${TABAK}
        <circle cx="38" cy="44" r="10" fill="#e2475b"/>
        <circle cx="56" cy="40" r="10" fill="#5b3b8c"/>
        <circle cx="66" cy="50" r="8" fill="#d9263c"/>
        <path d="M36 34 l3 -6 l3 6" fill="#4d7a2a"/>
        <path d="M18 50 L82 50 Q80 80 50 80 Q20 80 18 50 Z" fill="#ffffff" stroke="#b9c7d6" stroke-width="3"/>
        <path d="M24 60 L76 60" stroke="#d6e2ee" stroke-width="3"/>`;
    case 'limonata': // uzun bardakta limonata, kenarda limon dilimi, pipet
      return `${TABAK}
        <path d="M62 14 L54 40" stroke="#e2475b" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 26 L68 26 L64 84 L36 84 Z" fill="#ffe680" stroke="#c9a92c" stroke-width="3" stroke-linejoin="round"/>
        <path d="M33 36 L67 36" stroke="#fff6c4" stroke-width="3"/>
        <circle cx="34" cy="28" r="10" fill="#fff07a" stroke="#d6b81f" stroke-width="2.5"/>
        <path d="M34 20 L34 36 M26 28 L42 28" stroke="#d6b81f" stroke-width="1.5"/>`;
    case 'gazoz': // şişede gazoz
      return `${TABAK}
        <path d="M44 12 L56 12 L56 26 Q66 34 66 46 L66 82 Q66 86 62 86 L38 86 Q34 86 34 82 L34 46 Q34 34 44 26 Z"
              fill="#9fd8c4" stroke="#4f9a82" stroke-width="3" stroke-linejoin="round"/>
        <rect x="42" y="8" width="16" height="7" rx="2" fill="#e2475b"/>
        <rect x="36" y="52" width="28" height="18" rx="3" fill="#fff" opacity="0.85"/>
        <circle cx="44" cy="40" r="2.5" fill="#fff"/><circle cx="54" cy="34" r="2" fill="#fff"/>`;
    case 'kahve': // fincanda kahve, tabağıyla
      return `${TABAK}
        <ellipse cx="50" cy="74" rx="30" ry="8" fill="#f2ece4" stroke="#c9b9a6" stroke-width="2.5"/>
        <path d="M26 40 L74 40 Q72 72 50 72 Q28 72 26 40 Z" fill="#fff" stroke="#c9b9a6" stroke-width="3"/>
        <path d="M74 46 Q86 46 84 56 Q82 64 70 62" fill="none" stroke="#c9b9a6" stroke-width="4"/>
        <ellipse cx="50" cy="41" rx="23" ry="5" fill="#5b3a24"/>
        <path d="M42 30 Q38 24 44 18 M56 30 Q52 24 58 18" stroke="#c9b9a6" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    case 'cay': // ince belli bardakta çay, tabağıyla
      return `${TABAK}
        <ellipse cx="50" cy="80" rx="24" ry="6" fill="#f2ece4" stroke="#c9b9a6" stroke-width="2.5"/>
        <path d="M34 20 L66 20 Q62 34 56 44 Q66 58 62 78 L38 78 Q34 58 44 44 Q38 34 34 20 Z"
              fill="#b8401f" stroke="#8a2e14" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M34 20 L66 20 Q65 25 64 27 L36 27 Q35 25 34 20 Z" fill="#fff" opacity="0.7"/>
        <path d="M40 50 Q38 62 41 72" stroke="#fff" stroke-width="2.5" opacity="0.5" fill="none"/>`;
  }
  return TABAK;
}

// Ürün sırasına (URUNLER) göre SVG simgesi (yazı olarak).
export function urunSimgesi(cesit: number): string {
  const u = URUNLER[cesit];
  const ic = u.tur === 'dondurma' ? dondurma(u.id, u.renk) : tatliIcecek(u.id);
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">${ic}</svg>`;
}
