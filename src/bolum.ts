// Numaralı bölümleri kurar: müşterilerin isteklerini, sütunlardaki görünen
// topları ve ortak saklı sırayı.
//
// Numaralı bölümler (4. paket; Kemal, 22 Ekim: "numaralı bölümler (her biri
// biraz daha zor; kaldığın bölüm ve yıldızlar telefonda saklanır)"):
// - Her bölüm kendi numarasından çıkan sabit bir tohumla kurulur; aynı numara
//   her açılışta aynı dizilimi verir ("elle hazırlanmış" gibi tekrar eder).
// - Zorluk bölüm numarasına göre `ayarlar.ts`'teki tablodan gelir.
// - Kurulan dizilim kazanılabilirlik denetiminden geçmezse aynı tohumun
//   devamından bir sonraki deneme kurulur; o da her açılışta aynıdır.
//
// Ortak saklı yer (Kemal, 22 Ekim: "Saklı toplar ortak bir yerde dursun; bir
// sütun azaldıkça alttan ona gelsin."):
// Bölüm başında her sütunda yalnız görünen kadar top (SUTUNDA_GORUNEN_TOP) durur.
// Geri kalan bütün toplar (fazla toplar dahil) tek bir ortak sırada saklıdır.
// Bir sütundan top gidince ortak sıradaki sıradaki top o sütunun en altına gelir.
// Ortak sıra bitince sütunlar kısalır.
//
// Karıştırma (Kemal, 22 Ekim: "Toplar tek tek karıştırılsın; art arda aynı
// çeşit daha az gelsin"): bütün toplar öbek olmadan tek tek karıştırılır; aynı
// çeşit art arda en çok ORTAK_SIRA_ART_ARDA_EN_COK kez gelir. Sütunlara dizilen
// ilk toplar da bu tek sıranın başıdır (bir kural, bir sıra).
//
// Sütunlarda müşterilerin istediğinden fazla top vardır (FAZLA_TOP_ORANI);
// fazlalar çeşitlere dengeli dağılır. Kazanmak için bütün müşteriler
// karşılanır; artan top kalması sorun değildir.
// Çözücü erimeyi bilmez (erime yokmuş gibi dener).
//
// Ürünler ve iki çeşit isteyen müşteri (Kemal, 29 Ekim soru turu; tasarım
// belgesi 0.14): bölümün ürünleri zorluk tablosundan gelir (dondurma, tatlı,
// içecek). "Çeşit" sayısı URUNLER içindeki sıradır. Tablodaki orana göre bazı
// müşteriler iki farklı çeşit ister; istediği toplam adet iki çeşide bölünür.

import {
  AYNI_ANDA_MUSTERI,
  BOLUM_SAYISI,
  FAZLA_TOP_ORANI,
  ORTAK_SIRA_ART_ARDA_EN_COK,
  SUTUNDA_GORUNEN_TOP,
  TEK_SEFERDE_TOP,
  URUNLER,
  bolumZorlugu,
  urunSirasi,
} from './ayarlar';

export interface IstekParcasi {
  cesit: number; // ürünün URUNLER içindeki sırası
  adet: number;
}

// Bir müşterinin isteği: bir ya da iki çeşit, her birinden birkaç tane.
export interface Istek {
  parcalar: IstekParcasi[];
}

// İsteğin toplam adedi.
export function istekAdedi(m: Istek): number {
  return m.parcalar.reduce((a, p) => a + p.adet, 0);
}

export interface Bolum {
  no: number; // bölüm numarası (1'den)
  urunler: number[]; // bölümde gelen ürünler (URUNLER içindeki sıra)
  bantYeri: number;
  musteriler: Istek[]; // geliş sırasıyla
  // Bölüm başında sütunlarda görünen toplar: her sütun alttan üste çeşit sırası;
  // son eleman en üstte (ilk gidecek top). Her sütunda en çok SUTUNDA_GORUNEN_TOP.
  sutunlar: number[][];
  // Ortak saklı sıra: ilk eleman, bir sütundan top gidince ilk gelecek top.
  sakli: number[];
  deneme: number; // kaçıncı denemede kazanılabilir çıktı (1'den)
}

// Tohumlu rastgele sayı üreteci: aynı tohum her zaman aynı sayıları verir.
type Uretec = () => number; // [0, 1)

function uretecKur(tohum: number): Uretec {
  let a = tohum >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Bölüm numarasından tohum (sabit; değiştirilirse bütün bölümlerin dizilimi değişir).
function bolumTohumu(no: number): number {
  return (Math.imul(no, 2654435761) ^ 0x5d4b11e) >>> 0;
}

function rastgeleTam(r: Uretec, enAz: number, enCok: number): number {
  return enAz + Math.floor(r() * (enCok - enAz + 1));
}

function karistir<T>(r: Uretec, dizi: T[]): T[] {
  for (let i = dizi.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [dizi[i], dizi[j]] = [dizi[j], dizi[i]];
  }
  return dizi;
}

// Topları tek tek karıştırır: her adımda kalan toplardan biri, kalan sayısına
// göre ağırlıklı seçilir; aynı çeşit art arda en çok `enCok` kez gelir.
// Bir çeşit öbürlerine göre çok fazla kalırsa sırası öne alınır ki sonda
// art arda yığılmasın. Kural tutturulamazsa null (bir sonraki deneme kurulur).
function tekTekKaristir(r: Uretec, sayilar: number[], enCok: number): number[] | null {
  const kalan = sayilar.slice();
  let toplam = kalan.reduce((a, b) => a + b, 0);
  const dizi: number[] = [];
  let sonCesit = -1;
  let seri = 0;
  while (toplam > 0) {
    const yasak = seri >= enCok ? sonCesit : -1;
    const adaylar = kalan.map((n, c) => (c !== yasak && n > 0 ? c : -1)).filter((c) => c >= 0);
    if (adaylar.length === 0) return null;
    // Zorunlu: bir çeşit öbürlerinin araya giremeyeceği kadar çoksa önce o.
    let secilen = -1;
    for (const c of adaylar) {
      const obur = toplam - kalan[c];
      if (kalan[c] > enCok * obur) secilen = c;
    }
    if (secilen < 0) {
      const agirlik = adaylar.reduce((a, c) => a + kalan[c], 0);
      let x = r() * agirlik;
      secilen = adaylar[adaylar.length - 1];
      for (const c of adaylar) {
        x -= kalan[c];
        if (x < 0) {
          secilen = c;
          break;
        }
      }
    }
    dizi.push(secilen);
    kalan[secilen]--;
    toplam--;
    seri = secilen === sonCesit ? seri + 1 : 1;
    sonCesit = secilen;
  }
  return dizi;
}

function bolumTaslagi(no: number, r: Uretec): Omit<Bolum, 'deneme'> | null {
  const z = bolumZorlugu(no);
  const urunler = z.urunler.map(urunSirasi);
  const n = urunler.length;
  // Müşteriler: art arda gelen iki müşterinin ilk istediği çeşit aynı olmaz.
  const musteriler: Istek[] = [];
  for (let i = 0; i < z.musteri; i++) {
    let k = rastgeleTam(r, 0, n - 1);
    while (i > 0 && n > 1 && urunler[k] === musteriler[i - 1].parcalar[0].cesit) {
      k = rastgeleTam(r, 0, n - 1);
    }
    const adet = rastgeleTam(r, z.istekEnAz, z.istekEnCok);
    if (n > 1 && adet >= 2 && r() < z.ikiCesitOrani) {
      // İki çeşit: toplam adet ikiye bölünür, her birinden en az bir tane.
      let k2 = rastgeleTam(r, 0, n - 1);
      while (k2 === k) k2 = rastgeleTam(r, 0, n - 1);
      const ilk = rastgeleTam(r, 1, adet - 1);
      musteriler.push({ parcalar: [{ cesit: urunler[k], adet: ilk }, { cesit: urunler[k2], adet: adet - ilk }] });
    } else {
      musteriler.push({ parcalar: [{ cesit: urunler[k], adet }] });
    }
  }

  const toplamlar = new Array(URUNLER.length).fill(0);
  for (const m of musteriler) for (const p of m.parcalar) toplamlar[p.cesit] += p.adet;
  // Fazla toplar: istenen toplamın FAZLA_TOP_ORANI kadarı, çeşitlere eşit;
  // eşit bölünmeyen artık rastgele çeşitlere birer birer.
  const istenenToplam = toplamlar.reduce((a, b) => a + b, 0);
  const fazla = Math.round(istenenToplam * Math.max(0, FAZLA_TOP_ORANI));
  const fazlaSiralama = karistir(r, urunler.slice());
  for (let k = 0; k < fazla; k++) toplamlar[fazlaSiralama[k % n]]++;

  // Bütün toplar tek bir sıraya tek tek karıştırılır. Baştan her sütuna
  // görünen kadar top verilir; kalanı ortak saklı sıradır.
  const dizi = tekTekKaristir(r, toplamlar, Math.max(1, ORTAK_SIRA_ART_ARDA_EN_COK));
  if (!dizi) return null;
  const sutunlar: number[][] = [];
  let k = 0;
  for (let s = 0; s < z.sutun; s++) {
    const boy = Math.min(Math.max(1, SUTUNDA_GORUNEN_TOP), dizi.length - k);
    sutunlar.push(dizi.slice(k, k + boy));
    k += boy;
  }
  return { no, urunler, bantYeri: z.bantYeri, musteriler, sutunlar, sakli: dizi.slice(k) };
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

// Çözücünün bir bölümde en çok kaç durum deneyeceği. Aşılırsa dizilim
// "kazanılamaz" sayılır ve bir sonraki deneme kurulur (bölüm kurma hızlı kalsın diye).
// Saate bağlı değildir; her açılışta aynı sonucu verir.
const COZUCU_SINIRI = 20000;

// Basit çözücü: bant bir torba gibi düşünülür; bantta istenen çeşit varsa
// görünen müşteri hemen alır. Oyuncunun her hamlesi denenir.
// Ortak saklı sıra sabit olduğu için her gönderişte sıradaki saklı top o
// sütunun en altına girer; çözücü de böyle dener.
// Kazanma: bütün müşteriler karşılandı (bantta ya da sütunda artan top olabilir).
// Ekranda müşteri yerleri hep dolu sayılır: erime yokken oyuncu bekleyerek
// yerlerin dolmasını sağlayabilir, bu yüzden bu varsayım oyuncunun elindedir.
export function kazanilabilirMi(bolum: Omit<Bolum, 'deneme'>): boolean {
  const gorulen = new Set<string>();
  const { musteriler, sakli, bantYeri } = bolum;
  let denenen = 0;

  function ara(
    sutunlar: number[][],
    sakliSira: number, // ortak sıradan sıradaki topun yeri
    bant: number[],
    gorunen: { cesit: number; kalan: number }[][], // her müşterinin kalan istek parçaları
    siradaki: number,
  ): boolean {
    // Bantta olanı müşterilere ver; biten gider, sıradaki gelir.
    bant = bant.slice();
    gorunen = gorunen.map((m) => m.map((g) => ({ ...g })));
    let degisti = true;
    while (degisti) {
      degisti = false;
      for (const m of gorunen) {
        for (const g of m) {
          const al = Math.min(g.kalan, bant[g.cesit]);
          if (al > 0) {
            g.kalan -= al;
            bant[g.cesit] -= al;
            degisti = true;
          }
        }
      }
      const kalanlar = gorunen.filter((m) => m.some((g) => g.kalan > 0));
      while (kalanlar.length < AYNI_ANDA_MUSTERI && siradaki < musteriler.length) {
        const m = musteriler[siradaki++];
        kalanlar.push(m.parcalar.map((p) => ({ cesit: p.cesit, kalan: p.adet })));
        degisti = true;
      }
      gorunen = kalanlar;
    }
    if (gorunen.length === 0) return true;

    const anahtar = sutunlar.map((s) => s.join('.')).join(',') + '|' + sakliSira + '|' +
      bant.join(',') + '|' + gorunen.map((m) => m.map((g) => g.cesit + ':' + g.kalan).join('+')).join(',') + '|' + siradaki;
    if (gorulen.has(anahtar)) return false;
    gorulen.add(anahtar);
    if (++denenen > COZUCU_SINIRI) return false;

    const bantta = bant.reduce((a, b) => a + b, 0);
    const bos = bantYeri - bantta;
    if (bos <= 0) return false;

    // Önce görünen müşterilerin istediği üst topları dener (yalnız hız için;
    // her hamle yine denenir).
    const ihtiyac = new Array(bant.length).fill(0);
    for (const m of gorunen) for (const g of m) ihtiyac[g.cesit] += g.kalan;
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
    new Array(URUNLER.length).fill(0),
    [],
    0,
  );
}

// Kurulan bölümler bellekte tutulur (aynı bölüm ikinci kez hemen açılsın).
const kurulanlar = new Map<number, Bolum>();

// Bölüm numarasına göre kazanılabilir bölümü kurar. Aynı numara her zaman
// aynı dizilimi verir: tohum numaradan gelir, geçmeyen denemeden sonra aynı
// üretecin devamıyla bir sonraki deneme kurulur.
export function bolumKur(no: number): Bolum {
  no = Math.min(Math.max(1, Math.floor(no)), BOLUM_SAYISI);
  const hazir = kurulanlar.get(no);
  if (hazir) return hazir;
  const r = uretecKur(bolumTohumu(no));
  for (let deneme = 1; ; deneme++) {
    const b = bolumTaslagi(no, r);
    if (b && kazanilabilirMi(b)) {
      const bolum: Bolum = { ...b, deneme };
      kurulanlar.set(no, bolum);
      return bolum;
    }
  }
}
