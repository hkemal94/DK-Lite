// Telefonda saklanan kayıt: kaldığı bölüm ve her bölümün en iyi yıldızı.
// Kemal, 22 Ekim: "kaldığın bölüm ve yıldızlar telefonda saklanır".
// Saklama çalışmazsa (tarayıcı izin vermezse) oyun yine açılır: kayıt
// yalnız bu açılış boyunca bellekte durur, oyun Bölüm 1'den başlar.

import { BOLUM_SAYISI, sonsuzKatsayi } from './ayarlar';

const ANAHTAR = 'dk-lite-kayit';

export interface Kayit {
  acik: number; // açılan en ileri bölüm (1'den); kaldığı bölüm budur
  yildizlar: number[]; // yildizlar[no - 1]: o bölümde kazanılan en iyi yıldız (0: kazanılmadı)
}

function bosKayit(): Kayit {
  return { acik: 1, yildizlar: new Array(BOLUM_SAYISI).fill(0) };
}

// Okunan kaydı denetler; bozuksa ya da yoksa boş kayıt.
function duzelt(ham: unknown): Kayit {
  const k = bosKayit();
  if (!ham || typeof ham !== 'object') return k;
  const h = ham as { acik?: unknown; yildizlar?: unknown };
  if (typeof h.acik === 'number' && Number.isFinite(h.acik)) {
    k.acik = Math.min(BOLUM_SAYISI, Math.max(1, Math.floor(h.acik)));
  }
  if (Array.isArray(h.yildizlar)) {
    for (let i = 0; i < BOLUM_SAYISI; i++) {
      const y = h.yildizlar[i];
      if (typeof y === 'number' && Number.isFinite(y)) k.yildizlar[i] = Math.min(3, Math.max(0, Math.floor(y)));
    }
  }
  // Eski kayıt uyumu (29 Ekim 2026, bölüm sayısı 10'dan 30'a çıktı): son açık bölüm
  // zaten kazanılmışsa bir sonraki de açılır. Örn. 10 bölümün hepsini bitirmiş
  // kayıtta 11. bölüm kilitli kalmasın. Döngü en çok BOLUM_SAYISI kez döner.
  while (k.acik < BOLUM_SAYISI && k.yildizlar[k.acik - 1] > 0) k.acik++;
  return k;
}

export function kayitOku(): Kayit {
  try {
    const metin = window.localStorage.getItem(ANAHTAR);
    if (!metin) return bosKayit();
    return duzelt(JSON.parse(metin));
  } catch {
    return bosKayit();
  }
}

export function kayitYaz(k: Kayit): void {
  try {
    window.localStorage.setItem(ANAHTAR, JSON.stringify(k));
  } catch {
    // Saklanamadı; oyun bellekteki kayıtla sürer.
  }
}

// Bir bölüm kazanılınca: en iyi yıldız saklanır, sonraki bölüm açılır.
export function bolumKazanildi(k: Kayit, no: number, yildiz: number): Kayit {
  const yeni: Kayit = { acik: k.acik, yildizlar: k.yildizlar.slice() };
  yeni.yildizlar[no - 1] = Math.max(yeni.yildizlar[no - 1] ?? 0, yildiz);
  if (no + 1 <= BOLUM_SAYISI) yeni.acik = Math.max(yeni.acik, no + 1);
  kayitYaz(yeni);
  return yeni;
}

// Bütün bölümler bitti mi: son bölüm kazanıldı (bölümler sırayla açıldığı için
// son bölüme gelen öncekileri de geçmiştir).
export function hepsiBitti(k: Kayit): boolean {
  return (k.yildizlar[BOLUM_SAYISI - 1] ?? 0) > 0;
}

// ---------- Ayarlar ----------
// Kemal, 30 Ekim: ayarlar ekranı "Şimdi, basit"; içinde erime seçimi ve titreşim.
// Ayarlar da telefonda saklanır (kayıttan ayrı). Saklama çalışmazsa varsayılanlar.

const AYAR_ANAHTARI = 'dk-lite-ayarlar';

export interface Ayarlar {
  erime: number; // ERIME_BICIMLERI içindeki sıra
  titresim: boolean; // sütuna dokununca telefon hafifçe titresin mi
}

export function ayarOku(varsayilanErime: number, bicimSayisi: number): Ayarlar {
  const a: Ayarlar = { erime: varsayilanErime, titresim: true };
  try {
    const h = JSON.parse(window.localStorage.getItem(AYAR_ANAHTARI) ?? 'null') as Partial<Ayarlar> | null;
    if (h && typeof h.erime === 'number' && h.erime >= 0 && h.erime < bicimSayisi) a.erime = Math.floor(h.erime);
    if (h && typeof h.titresim === 'boolean') a.titresim = h.titresim;
  } catch {
    // Okunamadı; varsayılanlar.
  }
  return a;
}

export function ayarYaz(a: Ayarlar): void {
  try {
    window.localStorage.setItem(AYAR_ANAHTARI, JSON.stringify(a));
  } catch {
    // Saklanamadı; ayar bu açılış boyunca bellekte kalır.
  }
}

// ---------- 0. bölüm (ipuçlu başlangıç; Kemal, 5 Kasım 2026 gecesi) ----------
// Oynanıp kazanıldı mı; telefonda saklanır. Kazanılınca ilk hediye verilir.
const OGRETICI_ANAHTAR = 'dk-lite-ogretici';
let ogreticiBellek: boolean | null = null;
export function ogreticiBittiMi(): boolean {
  if (ogreticiBellek !== null) return ogreticiBellek;
  try {
    ogreticiBellek = window.localStorage.getItem(OGRETICI_ANAHTAR) === '1';
  } catch {
    ogreticiBellek = false;
  }
  return ogreticiBellek;
}
export function ogreticiBitti(): void {
  ogreticiBellek = true;
  try {
    window.localStorage.setItem(OGRETICI_ANAHTAR, '1');
  } catch {
    // Saklanamadı; bu açılış boyunca bellekte kalır.
  }
}

// ---------- Sonsuz bölümler (tasarım belgesi 0.50; Kemal, 16 Kasım 2026) ----------
// Numaralı bölümlerin kaydından ayrı anahtarla saklanır; numaralı bölümlerin yıldızları ve kaldığı
// bölüm değişmez. Uygulamayı kapatmak kaybetmek değildir: seri kaldığı aşamadan sürer (öneri).
const SONSUZ_ANAHTAR = 'dk-lite-sonsuz';

export interface SonsuzKayit {
  asama: number; // oynanacak aşama (1'den); seri sürüyorsa kazanılan aşama sayısı + 1
  seriPuani: number; // bu serinin birikmiş puanı
  seriTohumu: number; // serinin dizilim tohumu (her seri yeni)
  enIyiSeri: number; // bir seride kazanılan en çok aşama
  enIyiPuan: number; // en yüksek seri puanı
}

let sonsuzBellek: SonsuzKayit | null = null;

function yeniTohum(): number {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}

function sayi(x: unknown, enAz: number): number | null {
  return typeof x === 'number' && Number.isFinite(x) ? Math.max(enAz, Math.floor(x)) : null;
}

export function sonsuzOku(): SonsuzKayit {
  if (sonsuzBellek) return sonsuzBellek;
  const k: SonsuzKayit = { asama: 1, seriPuani: 0, seriTohumu: 0, enIyiSeri: 0, enIyiPuan: 0 };
  let tohumVar = false;
  try {
    const h = JSON.parse(window.localStorage.getItem(SONSUZ_ANAHTAR) ?? 'null') as Partial<Record<keyof SonsuzKayit, unknown>> | null;
    if (h) {
      k.asama = sayi(h.asama, 1) ?? 1;
      k.seriPuani = sayi(h.seriPuani, 0) ?? 0;
      k.enIyiSeri = sayi(h.enIyiSeri, 0) ?? 0;
      k.enIyiPuan = sayi(h.enIyiPuan, 0) ?? 0;
      const t = sayi(h.seriTohumu, 0);
      if (t !== null) {
        k.seriTohumu = t >>> 0;
        tohumVar = true;
      }
    }
  } catch {
    // Okunamadı; seri baştan başlar.
  }
  sonsuzBellek = k;
  // İlk seri: tohum hemen saklanır ki uygulama kapanıp açılınca aynı aşama aynı dizilimle gelsin.
  if (!tohumVar) {
    k.seriTohumu = yeniTohum();
    sonsuzYaz(k);
  }
  return k;
}

function sonsuzYaz(k: SonsuzKayit): void {
  sonsuzBellek = k;
  try {
    window.localStorage.setItem(SONSUZ_ANAHTAR, JSON.stringify(k));
  } catch {
    // Saklanamadı; bu açılış boyunca bellekte kalır.
  }
}

// Sonsuz bölüm kazanılınca: bölümün puanı aşama katsayısıyla seri puanına eklenir, aşama bir artar,
// en iyi seri ve en iyi puan güncellenir. Eklenen puanı verir.
export function sonsuzKazanildi(puan: number): number {
  const k = { ...sonsuzOku() };
  const eklenen = Math.round(Math.max(0, puan) * sonsuzKatsayi(k.asama));
  k.seriPuani += eklenen;
  k.enIyiSeri = Math.max(k.enIyiSeri, k.asama);
  k.enIyiPuan = Math.max(k.enIyiPuan, k.seriPuani);
  k.asama += 1;
  sonsuzYaz(k);
  return eklenen;
}

// Kaybedince ya da yarıda bırakınca seri biter: Aşama 1, puan sıfır, yeni dizilim.
export function sonsuzSeriBitti(): void {
  const k = { ...sonsuzOku() };
  k.asama = 1;
  k.seriPuani = 0;
  k.seriTohumu = yeniTohum();
  sonsuzYaz(k);
}
