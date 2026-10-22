// Telefonda saklanan kayıt: kaldığı bölüm ve her bölümün en iyi yıldızı.
// Kemal, 22 Ekim: "kaldığın bölüm ve yıldızlar telefonda saklanır".
// Saklama çalışmazsa (tarayıcı izin vermezse) oyun yine açılır: kayıt
// yalnız bu açılış boyunca bellekte durur, oyun Bölüm 1'den başlar.

import { BOLUM_SAYISI } from './ayarlar';

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
