// Bölümü kurar: müşterilerin isteklerini, sütunlardaki görünen topları ve
// ortak saklı sırayı.
// Kemal, 22 Ekim: "Saklı toplar ortak bir yerde dursun; bir sütun azaldıkça
// alttan ona gelsin. Böylece sütunların içi baştan belli olmaz."
// Bölüm başında her sütunda yalnız görünen kadar top (SUTUNDA_GORUNEN_TOP) durur.
// Geri kalan bütün toplar (fazla toplar dahil) tek bir ortak sırada saklıdır;
// sıra bölüm kurulurken karıştırılır ve sabittir ("Tekrar oyna" aynı sırayı getirir).
// Bir sütundan top gidince ortak sıradaki sıradaki top o sütunun en altına gelir.
// Ortak sıra bitince sütunlar kısalır.
// Sütunlarda müşterilerin istediğinden fazla top vardır (FAZLA_TOP_ORANI);
// fazlalar çeşitlere dengeli dağılır. Kazanmak için bütün müşteriler
// karşılanır; artan top kalması sorun değildir.
// Kurulan her bölüm, basit bir çözücüyle "kazanılabilir mi" diye denenir;
// kazanılamıyorsa yeniden kurulur. Çözücü erimeyi bilmez (erime yokmuş gibi dener).

import {
  AYNI_ANDA_MUSTERI,
  BANT_YERI,
  CESIT_SAYISI,
  FAZLA_TOP_ORANI,
  ISTEK_EN_AZ,
  ISTEK_EN_COK,
  OBEK_EN_COK,
  SUTUN_SAYISI,
  SUTUNDA_GORUNEN_TOP,
  TEK_SEFERDE_TOP,
  TOPLAM_MUSTERI,
} from './ayarlar';

export interface Istek {
  cesit: number; // çeşidin sırası (0'dan)
  adet: number;
}

export interface Bolum {
  musteriler: Istek[]; // geliş sırasıyla
  // Bölüm başında sütunlarda görünen toplar: her sütun alttan üste çeşit sırası;
  // son eleman en üstte (ilk gidecek top). Her sütunda en çok SUTUNDA_GORUNEN_TOP.
  sutunlar: number[][];
  // Ortak saklı sıra: ilk eleman, bir sütundan top gidince ilk gelecek top.
  sakli: number[];
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
  // Fazla toplar: istenen toplamın FAZLA_TOP_ORANI kadarı, çeşitlere eşit;
  // eşit bölünmeyen artık rastgele çeşitlere birer birer.
  const istenenToplam = toplamlar.reduce((a, b) => a + b, 0);
  const fazla = Math.round(istenenToplam * Math.max(0, FAZLA_TOP_ORANI));
  const fazlaSiralama = karistir(Array.from({ length: CESIT_SAYISI }, (_, i) => i));
  for (let k = 0; k < fazla; k++) toplamlar[fazlaSiralama[k % CESIT_SAYISI]]++;
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

  // Öbekler karıştırılmış sırayla tek bir diziye dizilir. Baştan her sütuna
  // görünen kadar top verilir (öbekler sütunda üst üste durur); kalanı ortak
  // saklı sıradır. Böylece sıra karışıktır ama sabittir.
  const dizi = obekler.flat();
  const sutunlar: number[][] = [];
  let k = 0;
  for (let s = 0; s < SUTUN_SAYISI; s++) {
    const boy = Math.min(Math.max(1, SUTUNDA_GORUNEN_TOP), dizi.length - k);
    sutunlar.push(dizi.slice(k, k + boy));
    k += boy;
  }
  return { musteriler, sutunlar, sakli: dizi.slice(k) };
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

// Çözücünün bir bölümde en çok kaç durum deneyeceği. Aşılırsa bölüm
// "kazanılamaz" sayılır ve yenisi kurulur (bölüm kurma hızlı kalsın diye).
const COZUCU_SINIRI = 20000;

// Basit çözücü: bant bir torba gibi düşünülür; bantta istenen çeşit varsa
// görünen müşteri hemen alır. Oyuncunun her hamlesi denenir.
// Ortak saklı sıra sabit olduğu için her gönderişte sıradaki saklı top o
// sütunun en altına girer; çözücü de böyle dener.
// Kazanma: bütün müşteriler karşılandı (bantta ya da sütunda artan top olabilir).
// Ekranda müşteri yerleri hep dolu sayılır: erime yokken oyuncu bekleyerek
// yerlerin dolmasını sağlayabilir, bu yüzden bu varsayım oyuncunun elindedir.
export function kazanilabilirMi(bolum: Bolum): boolean {
  const gorulen = new Set<string>();
  const { musteriler, sakli } = bolum;
  let denenen = 0;

  function ara(
    sutunlar: number[][],
    sakliSira: number, // ortak sıradan sıradaki topun yeri
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

    const anahtar = sutunlar.map((s) => s.join('')).join(',') + '|' + sakliSira + '|' +
      bant.join(',') + '|' + gorunen.map((g) => g.cesit + ':' + g.kalan).join(',') + '|' + siradaki;
    if (gorulen.has(anahtar)) return false;
    gorulen.add(anahtar);
    if (++denenen > COZUCU_SINIRI) return false;

    const bantta = bant.reduce((a, b) => a + b, 0);
    const bos = BANT_YERI - bantta;
    if (bos <= 0) return false;

    // Önce görünen müşterilerin istediği üst topları dener (yalnız hız için;
    // her hamle yine denenir).
    const ihtiyac = new Array(bant.length).fill(0);
    for (const g of gorunen) ihtiyac[g.cesit] += g.kalan;
    const sira = sutunlar
      .map((s, i) => ({ i, puan: s.length ? ihtiyac[s[s.length - 1]] : -1 }))
      .filter((x) => x.puan >= 0)
      .sort((a, b) => b.puan - a.puan);

    for (const { i: s } of sira) {
      const sutun = sutunlar[s];
      const giden = Math.min(gidecekTopSayisi(sutun), bos);
      const yeniSutun = sutun.slice(0, sutun.length - giden);
      const yeniBant = bant.slice();
      yeniBant[sutun[sutun.length - 1]] += giden;
      // Giden her topun yerine ortak sıradan biri alta girer (sıra bittiyse sütun kısalır).
      let yeniSira = sakliSira;
      const gelen: number[] = [];
      for (let k = 0; k < giden && yeniSira < sakli.length; k++) gelen.push(sakli[yeniSira++]);
      const yeniSutunlar = sutunlar.slice();
      yeniSutunlar[s] = gelen.reverse().concat(yeniSutun);
      if (ara(yeniSutunlar, yeniSira, yeniBant, gorunen, siradaki)) return true;
    }
    return false;
  }

  return ara(
    bolum.sutunlar.map((s) => s.slice()),
    0,
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
