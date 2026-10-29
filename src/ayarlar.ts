// Öneri oyununun bütün ayarları bu dosyada.
// Buradaki sayıların hepsi DENEME DEĞERİDİR; karar değildir.
// Kemal oynayıp karar verecek. Aralıklar tasarım belgesi 7.1'den.

// ---------- Numaralı bölümler ----------

// Kaç bölüm var. Kemal'in kararı (22 Ekim): ilk sürüm 10 bölüm.
export const BOLUM_SAYISI = 10;

// Bir bölümün zorluk ayarları.
export interface BolumZorlugu {
  sutun: number; // alttaki sütun sayısı (önerilen aralık 3–5)
  urunler: string[]; // bölümde gelen ürünler (URUNLER'deki id); kaç tane olduğu çeşit sayısıdır
  musteri: number; // bölümdeki toplam müşteri (sırayla gelirler)
  istekEnAz: number; // bir müşterinin istediği adet: en az
  istekEnCok: number; // bir müşterinin istediği adet: en çok
  bantYeri: number; // bantta kaç yer var
  ikiCesitOrani: number; // müşterilerin ne kadarı iki çeşit ister (0: hiçbiri, 0.5: yarısı)
}

// Zorluk tablosu: sıra bölüm numarasıdır (ilk satır Bölüm 1).
// Kemal, 22 Ekim: "bölümlerde zorluk daha yavaş artsın". Artış adımı eskisinin
// yaklaşık yarısı: her bölümde yalnız bir şey biraz zorlaşır. Bölüm 1 aynı kaldı.
// Bölüm 1'den 10'a toplam artış: müşteri 8 → 12 (eskiden 16), çeşit 3 → 4 (eskiden 5),
// sütun 4'te kalır (eskiden 5'e çıkıyordu), istek 2–3 → 3–4, bant yeri 12 → 10 (eskiden 9).
// Son bölüm eski tablonun 4.–5. bölümü kadar zor.
// Sayılar DENEME DEĞERİDİR; Kemal oynayıp karar verecek.
// Satır sayısı BOLUM_SAYISI'ndan azsa son satır sonraki bölümlerde de kullanılır.
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
  { sutun: 4, urunler: ['vanilya', 'cilek', 'meyve', 'kahve'], musteri: 15, istekEnAz: 3, istekEnCok: 4, bantYeri: 11, ikiCesitOrani: 0.4 }, // 8: müşteri +1
  { sutun: 4, urunler: ['limon', 'cikolata', 'pasta', 'cay'], musteri: 15, istekEnAz: 3, istekEnCok: 5, bantYeri: 10, ikiCesitOrani: 0.4 }, // 9: bant yeri −1; istek en çok 5
  { sutun: 4, urunler: ['fistik', 'vanilya', 'kek', 'limonata'], musteri: 15, istekEnAz: 3, istekEnCok: 5, bantYeri: 10, ikiCesitOrani: 0.5 }, // 10
];

// Bölüm numarasına (1'den) göre zorluk.
export function bolumZorlugu(no: number): BolumZorlugu {
  const i = Math.min(Math.max(1, no), BOLUM_ZORLUKLARI.length) - 1;
  return BOLUM_ZORLUKLARI[i];
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
  { id: 'kahve', ad: 'Kahve', tur: 'icecek', renk: '#5b3a24' },
  { id: 'cay', ad: 'Çay', tur: 'icecek', renk: '#b8401f' },
];

// Ürünün URUNLER içindeki sırası (oyun içinde ürünler bu sırayla tutulur).
export function urunSirasi(id: string): number {
  const i = URUNLER.findIndex((u) => u.id === id);
  if (i < 0) throw new Error(`Bilinmeyen ürün: ${id}`);
  return i;
}
