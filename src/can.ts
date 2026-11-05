// Can (Kemal, 5 Kasım 2026): "oyunun oynanmasında can barı olması lazım yani bölüm
// bitmeyince yeniden oyna falan olması lazım". Kemal'in seçimleri:
// - en çok 5 can ("5 can");
// - can yalnız kaybedince gider: bölüm kaybedilince ya da yarıda bırakılınca 1 can
//   ("Yalnız kaybedince"); kazanınca gitmez;
// - can bitince zamanla dolar: her 30 dakikada 1 can, oyun kapalıyken de
//   ("Zamanla dolar, 30 dk"); can yokken bölüm başlamaz;
// - sınırsız can (sandıktan, 1 saat): bu sürede can gitmez.
// Canlar telefonda saklanır (kayıttan ayrı). Saklama çalışmazsa canlar bu açılış
// boyunca bellekte durur.

import { CAN_DOLUM_DK, CAN_EN_COK } from './ayarlar';

const ANAHTAR = 'dk-lite-can';
const DOLUM_MS = CAN_DOLUM_DK * 60 * 1000;

export interface CanDurumu {
  can: number; // şimdiki can (sandıktan gelen +1 ile en çoğu geçebilir)
  sonDolum: number; // dolum sayacının başladığı an (ms)
  sinirsizBitis: number; // sınırsız canın bittiği an (ms); 0: yok
}

let bellek: CanDurumu | null = null;

function oku(simdi: number): CanDurumu {
  if (bellek) return bellek;
  const d: CanDurumu = { can: CAN_EN_COK, sonDolum: simdi, sinirsizBitis: 0 };
  try {
    const h = JSON.parse(window.localStorage.getItem(ANAHTAR) ?? 'null') as Partial<CanDurumu> | null;
    if (h && typeof h.can === 'number' && Number.isFinite(h.can)) d.can = Math.max(0, Math.floor(h.can));
    if (h && typeof h.sonDolum === 'number' && Number.isFinite(h.sonDolum)) d.sonDolum = Math.min(simdi, h.sonDolum);
    if (h && typeof h.sinirsizBitis === 'number' && Number.isFinite(h.sinirsizBitis)) d.sinirsizBitis = h.sinirsizBitis;
  } catch {
    // Okunamadı; canlar dolu başlar.
  }
  bellek = d;
  return d;
}

function yaz(d: CanDurumu): void {
  bellek = d;
  try {
    window.localStorage.setItem(ANAHTAR, JSON.stringify(d));
  } catch {
    // Saklanamadı; bu açılış boyunca bellekte kalır.
  }
}

// Geçen süreye göre dolan canları ekler ve şimdiki durumu verir.
export function canDurumu(simdi = Date.now()): CanDurumu {
  const d = oku(simdi);
  if (d.can >= CAN_EN_COK) {
    d.sonDolum = simdi; // dolu: sayaç işlemez
  } else {
    const dolan = Math.floor((simdi - d.sonDolum) / DOLUM_MS);
    if (dolan > 0) {
      d.can = Math.min(CAN_EN_COK, d.can + dolan);
      d.sonDolum = d.can >= CAN_EN_COK ? simdi : d.sonDolum + dolan * DOLUM_MS;
    }
  }
  if (d.sinirsizBitis && d.sinirsizBitis <= simdi) d.sinirsizBitis = 0;
  yaz(d);
  return d;
}

export function sinirsizMi(simdi = Date.now()): boolean {
  return canDurumu(simdi).sinirsizBitis > simdi;
}

// Bölüme başlanabilir mi: en az 1 can ya da sınırsız can.
export function canVar(simdi = Date.now()): boolean {
  const d = canDurumu(simdi);
  return d.can > 0 || d.sinirsizBitis > simdi;
}

// Kaybedince ya da yarıda bırakınca: 1 can gider (sınırsızken gitmez).
// Gitti mi, onu verir.
export function canKaybet(simdi = Date.now()): boolean {
  const d = canDurumu(simdi);
  if (d.sinirsizBitis > simdi || d.can <= 0) return false;
  if (d.can >= CAN_EN_COK) d.sonDolum = simdi; // doluyken azalınca sayaç başlar
  d.can -= 1;
  yaz(d);
  return true;
}

// Sonraki canın dolmasına kalan süre (ms); dolu ise 0.
export function sonrakiCanaKalan(simdi = Date.now()): number {
  const d = canDurumu(simdi);
  if (d.can >= CAN_EN_COK) return 0;
  return Math.max(0, d.sonDolum + DOLUM_MS - simdi);
}

// Sandık ödülleri.
export function canEkle(adet: number, simdi = Date.now()): void {
  const d = canDurumu(simdi);
  d.can += adet;
  if (d.can >= CAN_EN_COK) d.sonDolum = simdi;
  yaz(d);
}
export function canlariDoldur(simdi = Date.now()): void {
  const d = canDurumu(simdi);
  d.can = Math.max(d.can, CAN_EN_COK);
  d.sonDolum = simdi;
  yaz(d);
}
export function sinirsizVer(dakika: number, simdi = Date.now()): void {
  const d = canDurumu(simdi);
  d.sinirsizBitis = Math.max(d.sinirsizBitis, simdi) + dakika * 60 * 1000;
  yaz(d);
}

// "12:34" ya da "1:02:03" biçiminde süre.
export function sureYazisi(ms: number): string {
  const s = Math.ceil(ms / 1000);
  const sa = Math.floor(s / 3600);
  const dk = Math.floor((s % 3600) / 60);
  const sn = s % 60;
  const iki = (n: number) => String(n).padStart(2, '0');
  return sa > 0 ? `${sa}:${iki(dk)}:${iki(sn)}` : `${dk}:${iki(sn)}`;
}
