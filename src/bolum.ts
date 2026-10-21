// Bölümü kurar: müşterilerin isteklerini ve sütunlardaki topları.
// Sütunlardaki toplar, müşterilerin istediği toplamla birebir aynıdır.
// Kurulan her bölüm, basit bir çözücüyle "kazanılabilir mi" diye denenir;
// kazanılamıyorsa yeniden kurulur.

import {
  AYNI_ANDA_MUSTERI,
  BANT_YERI,
  CESIT_SAYISI,
  ISTEK_EN_AZ,
  ISTEK_EN_COK,
  OBEK_EN_COK,
  SUTUN_SAYISI,
  TEK_SEFERDE_TOP,
  TOPLAM_MUSTERI,
} from './ayarlar';

export interface Istek {
  cesit: number; // çeşidin sırası (0'dan)
  adet: number;
}

export interface Bolum {
  musteriler: Istek[]; // geliş sırasıyla
  sutunlar: number[][]; // her sütun alttan üste çeşit sırası; son eleman en üstte
}

function rastgeleTam(enAz: number, enCok: number): number {
  return enAz + Math.floor(Math.random() * (enCok - enAz + 1));
}

function karistir<T>(dizi: T[]): T[] {
  for (let i = dizi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dizi[i], dizi[j]] = [dizi[j], dizi[i]];
  }
  return dizi;
}

function bolumTaslagi(): Bolum {
  // Müşteriler: art arda gelen iki müşteri aynı çeşidi istemez.
  const musteriler: Istek[] = [];
  for (let i = 0; i < TOPLAM_MUSTERI; i++) {
    let cesit = rastgeleTam(0, CESIT_SAYISI - 1);
    while (i > 0 && CESIT_SAYISI > 1 && cesit === musteriler[i - 1].cesit) {
      cesit = rastgeleTam(0, CESIT_SAYISI - 1);
    }
    musteriler.push({ cesit, adet: rastgeleTam(ISTEK_EN_AZ, ISTEK_EN_COK) });
  }

  // Her çeşidin toplamı küçük öbeklere bölünür.
  const toplamlar = new Array(CESIT_SAYISI).fill(0);
  for (const m of musteriler) toplamlar[m.cesit] += m.adet;
  const obekler: number[][] = [];
  toplamlar.forEach((toplam, cesit) => {
    let kalan = toplam;
    while (kalan > 0) {
      const boy = Math.min(kalan, rastgeleTam(1, OBEK_EN_COK));
      obekler.push(new Array(boy).fill(cesit));
      kalan -= boy;
    }
  });
  karistir(obekler);

  // Öbekler sütunlara dağıtılır; her seferinde en kısa sütunlardan birine.
  const sutunlar: number[][] = Array.from({ length: SUTUN_SAYISI }, () => []);
  for (const obek of obekler) {
    const enKisa = Math.min(...sutunlar.map((s) => s.length));
    const adaylar = sutunlar.filter((s) => s.length <= enKisa + 1);
    adaylar[Math.floor(Math.random() * adaylar.length)].push(...obek);
  }
  return { musteriler, sutunlar };
}

// En üstteki aynı çeşitlerin sayısı.
export function ustObekBoyu(sutun: number[]): number {
  if (sutun.length === 0) return 0;
  const ust = sutun[sutun.length - 1];
  let n = 0;
  for (let i = sutun.length - 1; i >= 0 && sutun[i] === ust; i--) n++;
  return n;
}

// Bir gönderişte bu sütundan banda gidecek top sayısı (bantta yer varsa).
// En üstteki aynı çeşitlerden en çok TEK_SEFERDE_TOP kadarı gider.
export function gidecekTopSayisi(sutun: number[]): number {
  return Math.min(ustObekBoyu(sutun), Math.max(1, TEK_SEFERDE_TOP));
}

// Basit çözücü: bant bir torba gibi düşünülür; bantta istenen çeşit varsa
// görünen müşteri hemen alır. Oyuncunun her hamlesi denenir.
export function kazanilabilirMi(bolum: Bolum): boolean {
  const gorulen = new Set<string>();
  const { musteriler } = bolum;

  function ara(
    sutunBoylari: number[],
    bant: number[],
    gorunen: { cesit: number; kalan: number }[],
    siradaki: number,
  ): boolean {
    // Bantta olanı müşterilere ver; biten gider, sıradaki gelir.
    bant = bant.slice();
    gorunen = gorunen.map((g) => ({ ...g }));
    let degisti = true;
    while (degisti) {
      degisti = false;
      for (const g of gorunen) {
        const al = Math.min(g.kalan, bant[g.cesit]);
        if (al > 0) {
          g.kalan -= al;
          bant[g.cesit] -= al;
          degisti = true;
        }
      }
      const kalanlar = gorunen.filter((g) => g.kalan > 0);
      while (kalanlar.length < AYNI_ANDA_MUSTERI && siradaki < musteriler.length) {
        const m = musteriler[siradaki++];
        kalanlar.push({ cesit: m.cesit, kalan: m.adet });
        degisti = true;
      }
      gorunen = kalanlar;
    }
    if (gorunen.length === 0) return true;

    const anahtar = sutunBoylari.join(',') + '|' + bant.join(',') + '|' +
      gorunen.map((g) => g.cesit + ':' + g.kalan).join(',') + '|' + siradaki;
    if (gorulen.has(anahtar)) return false;
    gorulen.add(anahtar);

    const bantta = bant.reduce((a, b) => a + b, 0);
    const bos = BANT_YERI - bantta;
    if (bos <= 0) return false;

    for (let s = 0; s < sutunBoylari.length; s++) {
      if (sutunBoylari[s] === 0) continue;
      const sutun = bolum.sutunlar[s].slice(0, sutunBoylari[s]);
      const giden = Math.min(gidecekTopSayisi(sutun), bos);
      const yeniBoylar = sutunBoylari.slice();
      yeniBoylar[s] -= giden;
      const yeniBant = bant.slice();
      yeniBant[sutun[sutun.length - 1]] += giden;
      if (ara(yeniBoylar, yeniBant, gorunen, siradaki)) return true;
    }
    return false;
  }

  return ara(
    bolum.sutunlar.map((s) => s.length),
    new Array(CESIT_SAYISI).fill(0),
    [],
    0,
  );
}

// Kazanılabilir bir bölüm kurar; kazanılabilir olana kadar yeniden dener.
export function bolumKur(): Bolum {
  for (;;) {
    const b = bolumTaslagi();
    if (kazanilabilirMi(b)) return b;
  }
}
