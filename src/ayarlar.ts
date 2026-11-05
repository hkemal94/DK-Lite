// Öneri oyununun bütün ayarları bu dosyada.
// Buradaki sayıların hepsi DENEME DEĞERİDİR; karar değildir.
// Kemal oynayıp karar verecek. Aralıklar tasarım belgesi 7.1'den.

// ---------- Numaralı bölümler ----------

// Kaç bölüm var. Kemal'in kararı (22 Ekim): ilk sürüm 10 bölüm.
// Kemal, 29 Ekim 2026: "bölümleri 30'a çıkarabilirsin" (ileride yaklaşık 500 bölüm).
// Sayı yalnız burada değişir; harita, kayıt ve zorluk kendiliğinden uyar.
// Kemal, 5 Kasım 2026 gecesi: "kaç adet yeni ürünümüz varsa ona göre onluk sistemde yeni
// bölüm hazırla" → 15 hediye ürün, her 10 bölümde bir; "150 bölüm". Bunun önünde 0. bölüm
// (ipuçlu başlangıç bölümü) var; o BOLUM_SAYISI'na girmez.
export const BOLUM_SAYISI = 150;

// Bir bölümün zorluk ayarları.
export interface BolumZorlugu {
  sutun: number; // alttaki sütun sayısı (önerilen aralık 3–5)
  urunler: string[]; // bölümde gelen ürünler (URUNLER'deki id); kaç tane olduğu çeşit sayısıdır
  musteri: number; // bölümdeki toplam müşteri (sırayla gelirler)
  istekEnAz: number; // bir müşterinin istediği adet: en az
  istekEnCok: number; // bir müşterinin istediği adet: en çok
  bantYeri: number; // bantta kaç yer var
  ikiCesitOrani: number; // müşterilerin ne kadarı iki çeşit ister (0: hiçbiri, 0.5: yarısı)
  cesit?: number; // kuralla kurulan bölümde çeşit sayısı (ürünler sonra seçilir)
}

// Zorluk tablosu: sıra bölüm numarasıdır (ilk satır Bölüm 1).
// Kemal, 22 Ekim: "bölümlerde zorluk daha yavaş artsın". Artış adımı eskisinin
// yaklaşık yarısı: her bölümde yalnız bir şey biraz zorlaşır. Bölüm 1 aynı kaldı.
// Bölüm 1'den 10'a toplam artış: müşteri 8 → 12 (eskiden 16), çeşit 3 → 4 (eskiden 5),
// sütun 4'te kalır (eskiden 5'e çıkıyordu), istek 2–3 → 3–4, bant yeri 12 → 10 (eskiden 9).
// Son bölüm eski tablonun 4.–5. bölümü kadar zor.
// Sayılar DENEME DEĞERİDİR; Kemal oynayıp karar verecek.
// Tablo 1–10. bölümdür; 11. bölümden sonrası aşağıdaki bolumZorlugu'nda kuralla gelir.
//
// Ürünler (Kemal, 29 Ekim: "zorlaştıkça çeşitler eklensin"): çeşit SAYISI eski
// tablodaki gibi (3, sonra 4) kalır ki zorluk değişmesin; bölüm ilerledikçe
// yeni türler gelir: 1–2 yalnız dondurma, 3'ten tatlılar, 6'dan içecekler.
// Her bölümde en az iki dondurma çeşidi var. Hangi bölümde hangi ürün: DENEME.
// İki çeşit isteyen müşteri (Kemal, 29 Ekim: "Ortalardan itibaren"): 6. bölümden;
// oranı DENEME DEĞERİDİR.
// Bölüm uzunluğu (Kemal, 30 Ekim: bölümler "Kısa geldi"; "İkisi birden, az az";
// "Biraz (1,5 kat)"): müşteri sayısı yaklaşık 1,25 kat, müşteri başına istenen
// adet yaklaşık 1,2 kat; bölüm toplamda yaklaşık 1,5 kat uzun (2–3 dakika).
// Çeşit sayısı, bant yeri ve iki çeşit oranı değişmedi. Sayılar DENEME DEĞERİDİR.
export const BOLUM_ZORLUKLARI: BolumZorlugu[] = [
  { sutun: 4, urunler: ['cikolata', 'cilek', 'limon'], musteri: 10, istekEnAz: 2, istekEnCok: 4, bantYeri: 12, ikiCesitOrani: 0 }, // 1
  { sutun: 4, urunler: ['cikolata', 'cilek', 'fistik'], musteri: 11, istekEnAz: 2, istekEnCok: 4, bantYeri: 12, ikiCesitOrani: 0 }, // 2: müşteri +1
  { sutun: 4, urunler: ['limon', 'vanilya', 'pasta'], musteri: 11, istekEnAz: 3, istekEnCok: 4, bantYeri: 12, ikiCesitOrani: 0 }, // 3: istek en az 3; ilk tatlı
  { sutun: 4, urunler: ['cilek', 'fistik', 'kek'], musteri: 13, istekEnAz: 3, istekEnCok: 4, bantYeri: 12, ikiCesitOrani: 0 }, // 4: müşteri +2
  { sutun: 4, urunler: ['cikolata', 'vanilya', 'meyve'], musteri: 14, istekEnAz: 3, istekEnCok: 4, bantYeri: 12, ikiCesitOrani: 0 }, // 5: müşteri +1
  { sutun: 4, urunler: ['cilek', 'limon', 'pasta', 'limonata'], musteri: 14, istekEnAz: 3, istekEnCok: 4, bantYeri: 12, ikiCesitOrani: 0.3 }, // 6: 4. çeşit; ilk içecek; iki çeşit isteyenler
  { sutun: 4, urunler: ['cikolata', 'fistik', 'kek', 'gazoz'], musteri: 14, istekEnAz: 3, istekEnCok: 4, bantYeri: 11, ikiCesitOrani: 0.3 }, // 7: bant yeri −1
  { sutun: 4, urunler: ['vanilya', 'cilek', 'meyve', 'gazoz'], musteri: 15, istekEnAz: 3, istekEnCok: 4, bantYeri: 11, ikiCesitOrani: 0.4 }, // 8: müşteri +1
  { sutun: 4, urunler: ['limon', 'cikolata', 'pasta', 'limonata'], musteri: 15, istekEnAz: 3, istekEnCok: 5, bantYeri: 10, ikiCesitOrani: 0.4 }, // 9: bant yeri −1; istek en çok 5
  { sutun: 4, urunler: ['fistik', 'vanilya', 'kek', 'limonata'], musteri: 15, istekEnAz: 3, istekEnCok: 5, bantYeri: 10, ikiCesitOrani: 0.5 }, // 10
];

// 11. bölümden sonrası: tablo yerine kural (Kemal, 29 Ekim 2026: 30 bölüm; ileride
// yaklaşık 500). Satır satır yazmak yerine kural, ki bölüm sayısı arttıkça kendiliğinden uzasın.
// Bütün sayılar DENEME DEĞERİDİR, Kemal oynayıp karar verecek.
// İlke (Kemal, 22 Ekim): zorluk yavaş artsın, her adımda yalnız bir şey biraz zorlaşsın.
// Bu yüzden aşağıdaki artışlar farklı bölümlere düşer (11, 14, 15, 16, 18, 19, 22, 23, 25, 26, 27).
// Başlangıç 10. bölümün değerleri: sütun 4, çeşit 4, müşteri 15, istek 3–5, bant yeri 10, iki çeşit 0.5.

// Müşteri: her 4 bölümde bir müşteri daha (yavaş uzasın diye); 30. bölümde 20.
// En çok 22 (bölüm çok uzayıp yormasın diye).
function kuralMusteri(no: number): number {
  return Math.min(22, 15 + Math.ceil((no - 10) / 4));
}
// Çeşit sayısı: 16. bölümden 5, 25. bölümden 6. En çok 6 (sütun 4 iken daha fazlası
// sütunları tıkar).
function kuralCesit(no: number): number {
  return Math.min(6, no >= 25 ? 6 : no >= 16 ? 5 : 4);
}
// Bant yeri: 14. bölümden 9, 22. bölümden 8. En az 7 (bant çok daralırsa
// oyuncu hamle yapamaz hâle gelir).
function kuralBantYeri(no: number): number {
  return Math.max(7, no >= 22 ? 8 : no >= 14 ? 9 : 10);
}
// İki çeşit isteyen müşteri oranı: 18. bölümden 0.6, 26. bölümden 0.7.
// En çok 0.7 (her müşteri iki çeşit isterse çeşitler arasındaki fark kaybolur).
function kuralIkiCesit(no: number): number {
  return Math.min(0.7, no >= 26 ? 0.7 : no >= 18 ? 0.6 : 0.5);
}
// Ürünler: yalnız URUNLER'deki mevcut ürünler. Her bölümde iki dondurma çeşidi;
// kalan yerler tatlı ve içecekten dönüşümlü. Seçim bölüm numarasından çıkar,
// aynı bölüm her açılışta aynı ürünleri verir. Hangi bölümde hangi ürün: DENEME.
// ---------- Ürün düzeni: başlangıç ve hediyeler (Kemal, 5 Kasım 2026 gecesi) ----------
// Başlangıçta yalnız üç dondurma. Geri kalan bütün ürünler hediye: 0. bölümde ve sonra her
// 10 bölümde bir (10, 20 ... 140), birer birer (Kemal: "1'er 1'er"): içecek, dondurma, tatlı
// sırayla. Hediye o bölüm ilk kez kazanılınca açılır; ürün sonraki bölümde ilk kez gelir.
// "İlk onda başka hediye istemiyorum": ilk bölümlerdeki ürünler de bu sıraya taşındı.
export const BASLANGIC_URUNLERI = ['cikolata', 'cilek', 'limon'];
export const HEDIYE_SIRASI = [
  'limonata', 'fistik', 'pasta', 'gazoz', 'vanilya', 'kek', 'cay', 'sakizli',
  'meyve', 'kahve', 'sutlac', 'muzlu-sut', 'lokma', 'profiterol', 'baklava',
];
export const HEDIYE_ARALIGI = 10;
// Ürünün hediye olarak verildiği bölüm (başlangıç ürünleri için -1).
export function hediyeBolumu(id: string): number {
  const i = HEDIYE_SIRASI.indexOf(id);
  return i < 0 ? -1 : i * HEDIYE_ARALIGI;
}
// Bu bölüm ilk kez kazanılınca açılan hediye ürün (yoksa null).
export function bolumHediyesi(no: number): string | null {
  if (no < 0 || no % HEDIYE_ARALIGI !== 0) return null;
  return HEDIYE_SIRASI[no / HEDIYE_ARALIGI] ?? null;
}
function urunIzinli(id: string, no: number): boolean {
  return no > hediyeBolumu(id);
}

// Bölümün ürünleri: o bölüme kadar açılmış ürünlerden, bölüm numarasına göre dönüşümlü
// (aynı bölüm her açılışta aynı). En az iki dondurma; kalanı tatlı ve içecekten. Bir önceki
// bölümde açılan hediye bu bölümde mutlaka gelir. Hangi bölümde hangi ürün: DENEME.
function bolumUrunleri(no: number, cesit: number): string[] {
  const havuz = URUNLER.map((u) => u.id).filter((id) => urunIzinli(id, no));
  const tur = (id: string) => URUNLER.find((u) => u.id === id)?.tur;
  const dondurma = havuz.filter((id) => tur(id) === 'dondurma');
  const tatli = havuz.filter((id) => tur(id) === 'tatli');
  const icecek = havuz.filter((id) => tur(id) === 'icecek');
  cesit = Math.min(cesit, havuz.length);
  const secim: string[] = [];
  const ekle = (id: string | undefined) => {
    if (id && !secim.includes(id) && secim.length < cesit) secim.push(id);
  };
  ekle(bolumHediyesi(no - 1) ?? undefined);
  const dondurmaSayisi = Math.min(dondurma.length, Math.max(2, cesit - tatli.length - icecek.length));
  for (let k = 0; secim.filter((id) => tur(id) === 'dondurma').length < dondurmaSayisi && k < dondurma.length; k++) {
    ekle(dondurma[(no + 2 * k) % dondurma.length]);
  }
  let t = 0;
  let c = 0;
  for (let k = 0; secim.length < cesit && k < 40; k++) {
    const tatliSirasi = (k + no) % 2 === 0;
    if (tatliSirasi && t < tatli.length) ekle(tatli[(no + t++) % tatli.length]);
    else if (c < icecek.length) ekle(icecek[(no + c++) % icecek.length]);
    else if (t < tatli.length) ekle(tatli[(no + t++) % tatli.length]);
    else ekle(dondurma[(no + k) % dondurma.length]);
  }
  return secim;
}


// ---------- 10'luk dilimlerde testere dişi zorluk (Kemal, 5 Kasım 2026: "10'luk dilim") ----------
// Araştırma: docs/arastirma-zorluk-ve-baglilik.md. Her 10 bölüm bir dilim:
// 5. bölüm "Zor", 6. bölüm rahatlatan, 10. bölüm "Çok zor" (kazanınca sandık),
// öbürleri yavaş artar. Ürünler her bölümün kendi ürünleri kalır; yalnız sayılar değişir.
// Zor ve çok zor bölümlerdeki artışlar ve rahat bölümün ne kadar kolay olduğu DENEME DEĞERİDİR.
export type BolumTuru = 'normal' | 'zor' | 'cok-zor' | 'rahat';
// İlk dilimde (1–10) yalnız 10. bölüm çok zor; 5. ve 6. normal (Kemal, 5 Kasım:
// ilk zor bölüm "10. bölüm", yeni oyuncu alışsın diye).
export function bolumTuru(no: number): BolumTuru {
  no = Math.max(1, Math.floor(no));
  const p = ((no - 1) % 10) + 1;
  if (p === 10) return 'cok-zor';
  if (no <= 10) return 'normal';
  return p === 5 ? 'zor' : p === 6 ? 'rahat' : 'normal';
}
// Zor bölüm: 2 müşteri fazla, bantta 1 yer az, iki çeşit isteyen biraz fazla.
const ZOR_EK = { musteri: 2, bantEksik: 1, ikiCesit: 0.1 };
// Çok zor bölüm: 3 müşteri fazla, bantta 2 yer az, iki çeşit isteyen daha fazla.
const COK_ZOR_EK = { musteri: 3, bantEksik: 2, ikiCesit: 0.15 };
// Rahat bölüm: sayıları 3 bölüm öncekinin sayıları kadar (ürünleri kendi ürünleri).
const RAHAT_GERI = 3;
// Bant hiçbir bölümde bundan dar olmaz; iki çeşit oranı bundan fazla olmaz.
const BANT_EN_AZ = 6;
const IKI_CESIT_EN_COK = 0.8;

// Bölüm numarasına (1'den) göre zorluk: önce düz artan taban, sonra bölümün türüne göre ayar.
export function bolumZorlugu(no: number): BolumZorlugu {
  no = Math.max(0, Math.floor(no));
  if (no === 0) return OGRETICI_BOLUM;
  const z = sayilarlaZorluk(no);
  return { ...z, urunler: bolumUrunleri(no, z.urunler.length || z.cesit || 3) };
}

// 0. bölüm (Kemal: "0. Bölüm yap istersen tutorial gibi"; "İpuçlu kolay bölüm"): üç müşteri,
// başlangıçtaki üç dondurma, geniş bant. Kaybedilmez (kaybederse sessizce yeniden başlar).
const OGRETICI_BOLUM: BolumZorlugu = {
  sutun: 4, urunler: BASLANGIC_URUNLERI, musteri: 3, istekEnAz: 2, istekEnCok: 2, bantYeri: 12, ikiCesitOrani: 0,
};

function sayilarlaZorluk(no: number): BolumZorlugu & { cesit?: number } {
  const t = tabanZorluk(no);
  const tur = bolumTuru(no);
  const yuvarla = (x: number) => Math.round(x * 100) / 100;
  if (tur === 'zor' || tur === 'cok-zor') {
    const ek = tur === 'zor' ? ZOR_EK : COK_ZOR_EK;
    return {
      ...t,
      musteri: t.musteri + ek.musteri,
      bantYeri: Math.max(BANT_EN_AZ, t.bantYeri - ek.bantEksik),
      ikiCesitOrani: t.ikiCesitOrani > 0 ? yuvarla(Math.min(IKI_CESIT_EN_COK, t.ikiCesitOrani + ek.ikiCesit)) : 0,
    };
  }
  if (tur === 'rahat') {
    const k = tabanZorluk(Math.max(1, no - RAHAT_GERI));
    return {
      ...t,
      musteri: Math.min(t.musteri, k.musteri),
      istekEnAz: Math.min(t.istekEnAz, k.istekEnAz),
      istekEnCok: Math.min(t.istekEnCok, k.istekEnCok),
      bantYeri: Math.max(t.bantYeri, k.bantYeri),
      ikiCesitOrani: Math.min(t.ikiCesitOrani, Math.max(k.ikiCesitOrani, t.ikiCesitOrani > 0 ? 0.3 : 0)),
    };
  }
  return t;
}

// Düz artan taban: 1–10 tablo, sonrası kural (29 Ekim'den beri).
function tabanZorluk(no: number): BolumZorlugu {
  if (no <= BOLUM_ZORLUKLARI.length) return BOLUM_ZORLUKLARI[no - 1];
  const cesit = kuralCesit(no);
  return {
    sutun: 4, // sabit (Kemal'in 22 Ekim kararıyla tabloda da 4'te kaldı)
    urunler: [], // bolumZorlugu'nda bolumUrunleri ile dolar
    cesit,
    musteri: kuralMusteri(no),
    istekEnAz: 3, // sabit: istek 3–5, 10. bölümdeki gibi
    istekEnCok: 5,
    bantYeri: kuralBantYeri(no),
    ikiCesitOrani: kuralIkiCesit(no),
  };
}

// Müşterinin sabrı (Kemal, 30 Ekim: "Sabir bitince gider ama cok hizli bitmesin sabir";
// "Uzun: 60 saniye"): bir müşteri bu kadar saniye bekler; başının üstündeki çubuk
// yavaşça azalır (yeşil → sarı → kırmızı). Bitince müşteri gider, onun puanı alınamaz.
// Kemal, 30 Ekim: "sabirlar biraz daha uzun olsun" (bant ürünü önünden ilk geçen
// müşteriye verir, bu böyle kalır; sondakiler daha uzun bekleyebilsin): 60'tan 90'a.
// 90 deneme değeridir; Kemal oynayıp onaylayınca kesinleşir.
export const SABIR_SN = 90;
// Bir bölümde bu kadar müşteri sabrı bitip giderse bölüm kaybedilir
// (Kemal, 30 Ekim: "Üç kaçırma bölümü bitirir" ve "Yalnız puan gitsin" birlikte).
export const KACAN_EN_COK = 3;
// Çubuk bu orandan az kalınca sarı, bundan az kalınca kırmızı olur. Deneme değeri.
export const SABIR_SARI = 0.5;
export const SABIR_KIRMIZI = 0.25;

// Art arda doğru gönderim (Kemal, 30 Ekim: "Ek puan"): görünen bir müşterinin
// istediği (bantta olanlar düşüldükten sonra) bir şeyi göndermek "doğru" sayılır.
// Art arda SERI_BASLANGIC. doğru gönderimden itibaren her doğru gönderim
// SERI_EK_PUAN ek puan getirir; yanlış gönderim seriyi sıfırlar. DENEME DEĞERİ.
export const SERI_BASLANGIC = 3;
export const SERI_EK_PUAN = 2;

// Ekrandaki müşteri yeri sayısı (aynı anda en çok bu kadar müşteri görünür).
// Kemal, 22 Ekim: "Maksimum 5 ama her saniye maksimum musteri olmak zorunda degil".
// Yerler her an dolu değildir: bkz. MUSTERI_GELIS_ARALIGI_SN ve BASTA_MUSTERI.
export const AYNI_ANDA_MUSTERI = 5;

// Bir müşteri gidince yerine yenisi hemen değil, bu aralıkta rastgele
// bir bekleyişten sonra gelir (saniye): en az / en çok.
// Deneme değeri, Kemal oynayıp karar verecek.
export const MUSTERI_GELIS_ARALIGI_SN = { enAz: 1, enCok: 5 };

// Bölüm başında kaç müşteriyle başlanır: en az / en çok.
// Ötekiler yukarıdaki aralıkla teker teker gelir.
// Deneme değeri, Kemal oynayıp karar verecek.
export const BASTA_MUSTERI = { enAz: 2, enCok: 3 };

// Sütunlara müşterilerin istediğinden fazla top konur ki hata yapma payı olsun.
// Kemal, 22 Ekim: "Erime kurali gelirse cok daha fazla top koyulmali ki
// insanlarin hata yapma luksu olsun".
// 0.5: istenen toplamın yarısı kadar fazla top. Fazlalar çeşitlere dengeli dağılır.
// Kemal'in kararı (22 Ekim, "Şimdiki gibi, istenenin yarısı kadar fazla");
// her bölümde aynı.
export const FAZLA_TOP_ORANI = 0.5;

// Ortak saklı sıra (ve bölüm başında sütunlara dizilen toplar) tek tek karıştırılır;
// öbek yoktur. Aynı çeşit art arda en çok bu kadar gelir.
// Kemal, 22 Ekim: "Toplar tek tek karıştırılsın; art arda aynı çeşit daha az gelsin".
// Deneme değeri, Kemal oynayıp karar verecek.
export const ORTAK_SIRA_ART_ARDA_EN_COK = 2;

// Bant bir turu kaç saniyede döner (büyüdükçe yavaşlar; sakin oyuncu için yavaş).
// Deneme değeri, Kemal oynayıp karar verecek.
export const BANT_TUR_SANIYE = 12;

// Hızlandırma düğmesine basınca oyun bu kadar kat hızlı akar (bant, erime,
// müşteri gelişi, uçuşlar). Tekrar basınca normale döner.
// Kemal'in kararı (22 Ekim): 2 kat.
export const HIZ_KATI = 2;

// Sütundan gönderme biçimi:
//  'dokun' : sütuna dokununca hemen gider.
//  'tut'   : sütuna basılı tutunca (TUTMA_MS kadar) gider.
// Deneme değeri, Kemal oynayıp karar verecek.
export const GONDERME_BICIMI: 'dokun' | 'tut' = 'dokun';
export const TUTMA_MS = 300;

// Bir gönderişte (dokunuş ya da basılı tutuş) sütunun üstünden banda kaç top gider.
// 1: her seferinde yalnız en üstteki top gider (Kemal, 21 Ekim: "tek tek gitsin, toplu değil").
// Üstteki aynı çeşitler bu sayıdan fazlaysa kalanlar sütunda bekler.
// Deneme değeri, Kemal oynayıp karar verecek.
export const TEK_SEFERDE_TOP = 1;

// Her sütunda kaç top görünür (bölüm başında her sütuna bu kadar top dizilir).
// Geri kalan bütün toplar tek bir ortak saklı sırada durur (çizilmez, sayısı yazmaz);
// bir sütundan top gidince kalanlar yukarı kayar, ortak sıradan sıradaki top
// o sütunun en altına gelir. Ortak sıra bitince sütunlar kısalır.
// Kemal, 21 Ekim: "bütün gelecekleri görmemem lazım ... alttan gelmeye devam etmesi lazım".
// Kemal, 22 Ekim: "Saklı toplar ortak bir yerde dursun; bir sütun azaldıkça alttan ona gelsin."
// Deneme değeri, Kemal oynayıp karar verecek.
export const SUTUNDA_GORUNEN_TOP = 4;

// Erime: bantta alınmayan top bu kadar tur sonra erir ve kaybolur (yeri açılır).
// Tur = bant bir kez döner (BANT_TUR_SANIYE). 0: erime yok.
// Oyun içindeki küçük düğmeyle biçimler arasında geçilir; Kemal oynayıp seçer.
// Seçilen biçim bölüm değişince de kalır; sayfa yenilenince varsayılana döner.
export const ERIME_BICIMLERI = [
  { tur: 0, yazi: 'Erime yok' },
  { tur: 1, yazi: '1 tur sonra' },
  { tur: 2, yazi: '2 tur sonra' },
];
// Varsayılan biçimin sırası (2: "2 tur sonra").
// Kemal, 22 Ekim: "2 tur olsun ama 1. turun sonunda kazanacağın puan %50'ye düşsün".
export const ERIME_VARSAYILAN = 2;

// Eriyen topun yavaşça solup küçülerek kaybolma süresi (milisaniye).
// Deneme değeri, Kemal oynayıp karar verecek.
export const ERIME_MS = 1500;

// ---------- Puan ve yıldız ----------

// Banttan müşteriye giden her top bu kadar puan kazandırır.
// Deneme değeri, Kemal oynayıp karar verecek.
export const TOP_PUANI = 10;

// Bantta bu kadar turdan uzun kalmış top alınırsa puanı düşer.
// Kemal, 22 Ekim: "1. turun sonunda kazanacağın puan %50'ye düşsün".
export const GEC_TOP_TURU = 1;

// Geç alınan topun puanı tam puanın bu oranıdır.
// Kemal'in kararı (22 Ekim, "%50"); deneme değeri değil.
// Yalnız erime açıkken ("1 tur sonra", "2 tur sonra"). "Erime yok"ta her top tam puan
// ve 1 turu geçen top soluklaşmaz (Kemal, 22 Ekim: "Hayır, yalnız erime açıkken").
export const GEC_TOP_PUAN_ORANI = 0.5;

// Geç kalmış (yarım puanlı) topun bantta solukluğu (1: hiç soluk değil).
// Deneme değeri, Kemal oynayıp karar verecek.
export const GEC_TOP_SOLUKLUK = 0.6;

// Yıldız eşikleri: bölümün en yüksek olası puanına (her top tam puanla alınırsa)
// oranla. Kazanınca en az 1 yıldız; oran 0.7 ve üstüyse 2, 0.9 ve üstüyse 3.
// Kaybedince yıldız yok.
// DENEME; Kemal karar verecek (yıldız ölçüsü açık soru).
export const YILDIZ_ESIKLERI = [0, 0.7, 0.9];

// Ürünler (Kemal, 29 Ekim soru turu; tasarım belgesi 0.14): harflerin yerine
// gerçek dondurma çeşitleri; bölümler ilerledikçe tatlılar ve içecekler de gelir.
// Adlar ve hangi ürünlerin olacağı Kemal'in seçimi. Renkler taslak.
// Sıra önemli değil; bölümler ürünü `id` ile seçer (BOLUM_ZORLUKLARI).
export type UrunTuru = 'dondurma' | 'tatli' | 'icecek';
export interface Urun {
  id: string;
  ad: string;
  tur: UrunTuru;
  renk: string; // dondurma topunun rengi (tatlı ve içecekte simgenin ana rengi)
}
export const URUNLER: Urun[] = [
  { id: 'cikolata', ad: 'Çikolata', tur: 'dondurma', renk: '#7b4a2d' },
  { id: 'cilek', ad: 'Çilek', tur: 'dondurma', renk: '#f39ab4' },
  { id: 'limon', ad: 'Limon', tur: 'dondurma', renk: '#ffd83d' },
  { id: 'fistik', ad: 'Fıstık', tur: 'dondurma', renk: '#a9cf6b' },
  { id: 'vanilya', ad: 'Vanilya', tur: 'dondurma', renk: '#fff3d6' },
  { id: 'pasta', ad: 'Dilim pasta', tur: 'tatli', renk: '#f7d9a8' },
  { id: 'kek', ad: 'Küçük kek', tur: 'tatli', renk: '#c98a4a' },
  { id: 'meyve', ad: 'Kâsede meyve', tur: 'tatli', renk: '#e2475b' },
  { id: 'limonata', ad: 'Limonata', tur: 'icecek', renk: '#ffe680' },
  { id: 'gazoz', ad: 'Gazoz', tur: 'icecek', renk: '#9fd8c4' },
  { id: 'kahve', ad: 'Türk kahvesi', tur: 'icecek', renk: '#5b3a24' },
  { id: 'cay', ad: 'Çay', tur: 'icecek', renk: '#b8401f' },
  // Hediye ürünler (Kemal, 5 Kasım gecesi: zor bölümlerde "?" hediye; "On bölümde bir yeni
  // ürün gelirse kurtarıyor"; türler "Türk kahvesi, Yeni dondurma çeşitleri, Ege tatlıları,
  // Soğuk içecekler"). Çizimler Canva; kaynak docs/lisanslar.md.
  { id: 'sakizli', ad: 'Sakızlı', tur: 'dondurma', renk: '#f3f5ea' },
  { id: 'baklava', ad: 'Baklava', tur: 'tatli', renk: '#d9a24a' },
  { id: 'muzlu-sut', ad: 'Muzlu süt', tur: 'icecek', renk: '#f6e7b8' }, // Kemal: ayran yerine, "biraz krem rengi"
  { id: 'sutlac', ad: 'Sütlaç', tur: 'tatli', renk: '#f3e3c2' }, // Kemal: "Biraz daha tatlı çizebilirsin"
  { id: 'lokma', ad: 'Lokma', tur: 'tatli', renk: '#d9953f' },
  { id: 'profiterol', ad: 'Profiterol', tur: 'tatli', renk: '#5a3420' },
];

// Ürünün URUNLER içindeki sırası (oyun içinde ürünler bu sırayla tutulur).
export function urunSirasi(id: string): number {
  const i = URUNLER.findIndex((u) => u.id === id);
  if (i < 0) throw new Error(`Bilinmeyen ürün: ${id}`);
  return i;
}

// ---------- Kazanç: yeni ürün açılır ----------
// Bu bölümde ilk kez gelen hediye ürün(ler) (bir önceki bölümün hediyesi). 5 Kasım gecesinden
// beri yalnız hediyeler "yeni ürün" sayılır (0, 10, 20 ... bölümlerin hediyesi).
export function bolumdeYeniUrunler(no: number): string[] {
  const h = bolumHediyesi(no - 1);
  return h ? [h] : [];
}

// ---------- Can ve ödül sandığı (Kemal, 5 Kasım 2026) ----------
// Kemal'in seçimleri: "5 can"; can "Yalnız kaybedince" gider; "Zamanla dolar, 30 dk";
// sonra (5 Kasım akşamı): "dakikayı yarım saatten 15 dakikaya düşür".
export const CAN_EN_COK = 5;
export const CAN_DOLUM_DK = 15;
// Sandık: "10 bölümde bir sandık açılsın ve bazen bir can versin bazen canı doldursun
// bazen 1 saat süresiz can versin". 10., 20., 30. ... bölüm ilk kez kazanılınca açılır.
export const SANDIK_ARALIGI = 10;
export const SINIRSIZ_CAN_DK = 60;
// Sandıktan hangisinin çıkacağı (Kemal, 5 Kasım: "Sınırsız can nadir"): +1 can sık,
// canlar dolar orta, 1 saat sınırsız can nadir. Şanslar ekibin DENEME değeri.
export type SandikOdulu = 'bir-can' | 'canlar-dolu' | 'sinirsiz';
export const SANDIK_SANSLARI: { odul: SandikOdulu; sans: number }[] = [
  { odul: 'bir-can', sans: 0.5 },
  { odul: 'canlar-dolu', sans: 0.35 },
  { odul: 'sinirsiz', sans: 0.15 },
];
export function sandikOdulSec(rastgele: number): SandikOdulu {
  let t = 0;
  for (const s of SANDIK_SANSLARI) {
    t += s.sans;
    if (rastgele < t) return s.odul;
  }
  return SANDIK_SANSLARI[0].odul;
}
// Bölümler ekranında bir sayfadaki bölüm sayısı (Kemal, 5 Kasım: "Daha küçük sayfalar
// mesela 20'li veya 12'li gibi"; 20 seçildi: satırda 4, 5 satır telefona sığar).
// 5 Kasım gecesi: 150 bölüm, künyedeki 5 mahalle; Kemal: "bir mahalleye de 30'ar bölüm koyabilirsin".
export const SAYFADA_BOLUM = 30;

// ---------- Yeni öğeler (Kemal, 5 Kasım 2026 gecesi: "Her mahallede bir") ----------
// Her mahallenin ilk bölümünde bir yeni öğe tanıtılır; o bölümden sonra bütün
// bölümlerde gelebilir. Adları [Kemal]; koddaki adlar yalnız ne olduğunu anlatır.
// Oranlar ve süreler DENEME.

// Buzlu top (Stadyum, 31. bölümden): buz içindeki top iki dokunuşta çözülür, sonra gider.
export const BUZLU_TOP_BOLUMU = 31;
export const BUZLU_TOP_ORANI = 0.12; // DENEME: topların kabaca bu kadarı buzlu
export const BUZ_DOKUNUS = 2;

// Gizli top (Çiftlik, 61. bölümden): rengi görünmez ("?"); sütunun en üstüne gelince açılır.
export const GIZLI_TOP_BOLUMU = 61;
export const GIZLI_TOP_ORANI = 0.15; // DENEME

// Aceleci müşteri (İskele, 91. bölümden): sabrı kısa; karşılanınca ek puan.
export const ACELECI_BOLUMU = 91;
export const ACELECI_ORANI = 0.2; // DENEME: müşterilerin kabaca bu kadarı
export const ACELECI_SABIR_ORANI = 0.6; // DENEME: sabrı normalin bu kadarı
export const ACELECI_EK_PUAN_ORANI = 0.5; // DENEME: istediği topların puanının bu kadarı ek

// Kilitli sütun (Merkez, 121. bölümden): bir sütun kilitli başlar; bu kadar müşteri
// karşılanınca açılır.
export const KILITLI_SUTUN_BOLUMU = 121;
export const KILIT_ACAN_MUSTERI = 1;

// Mahallenin ilk bölümünde "Yeni!" penceresiyle tanıtılan öğe.
export type YeniOge = 'buzlu' | 'gizli' | 'aceleci' | 'kilitli';
export function bolumdeTanitilanOge(no: number): YeniOge | null {
  if (no === BUZLU_TOP_BOLUMU) return 'buzlu';
  if (no === GIZLI_TOP_BOLUMU) return 'gizli';
  if (no === ACELECI_BOLUMU) return 'aceleci';
  if (no === KILITLI_SUTUN_BOLUMU) return 'kilitli';
  return null;
}

// ---------- Yardımcılar, galibiyet serisi, günlük ödül (Kemal, 5 Kasım 2026 gecesi) ----------
// Kemal'in seçtikleri: beş yardımcı ("Bandı boşalt, Sütunları karıştır, Sabrı durdur,
// Fazla bant yeri, +1 sütun"); başlangıçta her birinden 1; sandıktan, günlük ödülden ve
// galibiyet serisinden kazanılır. Seri: "3 kazançta yardım". Günlük: "7 günlük takvim".
// Sayılar DENEME.
export const YARDIMCI_IDLERI = ['bant-bosalt', 'karistir', 'sabir-durdur', 'fazla-bant', 'ek-sutun'] as const;
export type Yardimci = (typeof YARDIMCI_IDLERI)[number];
// Yazılar ne yaptığını söyler (Kemal'in kendi sözleri); süs adı değil.
export const YARDIMCI_ADLARI: Record<Yardimci, string> = {
  'bant-bosalt': 'Bandı boşalt',
  karistir: 'Sütunları karıştır',
  'sabir-durdur': 'Sabrı durdur',
  'fazla-bant': 'Fazla bant yeri',
  'ek-sutun': '+1 sütun',
};
export const BASLANGIC_YARDIMCI = 1; // her birinden
export const SABIR_DURDUR_SN = 30; // DENEME
export const FAZLA_BANT_YERI = 2; // DENEME
export const BOLUMDE_YARDIMCI_EN_COK = 1; // DENEME: bir bölümde her yardımcıdan en çok bu kadar

// Galibiyet serisi: art arda kazanılan bölüm sayısına göre sonraki bölümde yardım.
// Kaybedince (ya da yarıda bırakınca) seri sıfırlanır. 0. bölüm sayılmaz.
export function seriYardimi(seri: number): { bant: number; sabir: boolean } {
  if (seri >= 3) return { bant: 2, sabir: true };
  if (seri === 2) return { bant: 1, sabir: true };
  if (seri === 1) return { bant: 1, sabir: false };
  return { bant: 0, sabir: false };
}
export const SERI_YARDIMCI_ARALIGI = 5; // DENEME: her 5 art arda kazançta 1 yardımcı

// Günlük ödül: 7 günlük takvim; bir gün atlanırsa 1. güne döner, 7. günden sonra yeniden 1.
export type GunlukOdul = 'bir-can' | 'yardimci' | 'sinirsiz' | 'sandik';
export const GUNLUK_ODULLER: GunlukOdul[] = ['bir-can', 'yardimci', 'bir-can', 'yardimci', 'sinirsiz', 'yardimci', 'sandik'];
export const GUNLUK_SINIRSIZ_DK = 30; // DENEME
