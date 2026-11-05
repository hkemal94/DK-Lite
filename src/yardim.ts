// Yardımcılar, galibiyet serisi ve günlük ödül kaydı (tasarım belgesi 0.34).
// Telefonda saklanır (bölüm kaydından ayrı). Saklama çalışmazsa bu açılış boyunca
// bellekte durur.

import { BASLANGIC_YARDIMCI, GUNLUK_ODULLER, YARDIMCI_IDLERI, type Yardimci } from './ayarlar';

const ANAHTAR = 'dk-lite-yardim';

interface YardimKaydi {
  adet: Record<Yardimci, number>;
  seri: number; // art arda kazanılan bölüm
  gunlukSira: number; // en son alınan günlük ödülün sırası (0–6); -1: hiç alınmadı
  gunlukTarih: string; // en son alındığı gün (YYYY-AA-GG, telefonun saatine göre)
}

let bellek: YardimKaydi | null = null;

function oku(): YardimKaydi {
  if (bellek) return bellek;
  const adet = Object.fromEntries(YARDIMCI_IDLERI.map((y) => [y, BASLANGIC_YARDIMCI])) as Record<Yardimci, number>;
  const k: YardimKaydi = { adet, seri: 0, gunlukSira: -1, gunlukTarih: '' };
  try {
    const h = JSON.parse(window.localStorage.getItem(ANAHTAR) ?? 'null') as Partial<YardimKaydi> | null;
    if (h && h.adet) for (const y of YARDIMCI_IDLERI) if (Number.isFinite(h.adet[y])) adet[y] = Math.max(0, Math.floor(h.adet[y]));
    if (h && Number.isFinite(h.seri)) k.seri = Math.max(0, Math.floor(h.seri!));
    if (h && Number.isFinite(h.gunlukSira)) k.gunlukSira = Math.floor(h.gunlukSira!);
    if (h && typeof h.gunlukTarih === 'string') k.gunlukTarih = h.gunlukTarih;
  } catch {
    // Okunamadı; baştan başlar.
  }
  bellek = k;
  return k;
}

function yaz(): void {
  try {
    window.localStorage.setItem(ANAHTAR, JSON.stringify(oku()));
  } catch {
    // Saklanamadı; bellekte kalır.
  }
}

export function yardimciAdet(y: Yardimci): number {
  return oku().adet[y];
}

export function yardimciEkle(y: Yardimci, n = 1): void {
  oku().adet[y] += n;
  yaz();
}

// Bir yardımcıyı harcar; yoksa false.
export function yardimciHarca(y: Yardimci): boolean {
  const k = oku();
  if (k.adet[y] <= 0) return false;
  k.adet[y]--;
  yaz();
  return true;
}

export function rastgeleYardimci(r = Math.random()): Yardimci {
  return YARDIMCI_IDLERI[Math.min(YARDIMCI_IDLERI.length - 1, Math.floor(r * YARDIMCI_IDLERI.length))];
}

export function seriOku(): number {
  return oku().seri;
}

// Kazanınca seri bir artar, kaybedince sıfırlanır; yeni seriyi verir.
export function seriGuncelle(kazandi: boolean): number {
  const k = oku();
  k.seri = kazandi ? k.seri + 1 : 0;
  yaz();
  return k.seri;
}

function gunYazisi(d: Date): string {
  const a = String(d.getMonth() + 1).padStart(2, '0');
  const g = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${a}-${g}`;
}

// Bugünün günlük ödülü: alınacak sıra (0–6) ya da bugün alındıysa null.
export function gunlukBugun(simdi = new Date()): number | null {
  const k = oku();
  const bugun = gunYazisi(simdi);
  if (k.gunlukTarih === bugun) return null;
  const dun = new Date(simdi);
  dun.setDate(dun.getDate() - 1);
  // Dün alındıysa sıradaki gün; bir gün atlandıysa (ya da hiç alınmadıysa) 1. gün.
  if (k.gunlukTarih === gunYazisi(dun)) return (k.gunlukSira + 1) % GUNLUK_ODULLER.length;
  return 0;
}

export function gunlukAlindi(sira: number, simdi = new Date()): void {
  const k = oku();
  k.gunlukSira = sira;
  k.gunlukTarih = gunYazisi(simdi);
  yaz();
}
