// Öneri oyununun bütün ayarları bu dosyada.
// Buradaki sayıların hepsi DENEME DEĞERİDİR; karar değildir.
// Kemal oynayıp karar verecek. Aralıklar tasarım belgesi 7.1'den.

// Alttaki sütun sayısı. Önerilen aralık 3–5.
// Deneme değeri, Kemal oynayıp karar verecek.
export const SUTUN_SAYISI = 4;

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

// Bölümdeki toplam müşteri sayısı (sırayla gelirler).
// Bölüm süresi önerisi 1–3 dakika.
// 21 Ekim: 8'den 12'ye çıktı; müşteri çoğalsın ve sütunlar derinleşsin ki
// sütunda gizli toplar olsun (Kemal: "müşteriler çoğalınca").
// Deneme değeri, Kemal oynayıp karar verecek.
export const TOPLAM_MUSTERI = 12;

// Kaç farklı çeşit var. Ekranda harfle ayrılır (adlar Kemal'in).
// Deneme değeri, Kemal oynayıp karar verecek.
export const CESIT_SAYISI = 4;

// Bir müşterinin istediği adet: en az / en çok.
// Deneme değeri, Kemal oynayıp karar verecek.
export const ISTEK_EN_AZ = 2;
export const ISTEK_EN_COK = 4;

// Sütunlara müşterilerin istediğinden fazla top konur ki hata yapma payı olsun.
// Kemal, 22 Ekim: "Erime kurali gelirse cok daha fazla top koyulmali ki
// insanlarin hata yapma luksu olsun".
// 0.5: istenen toplamın yarısı kadar fazla top. Fazlalar çeşitlere dengeli dağılır.
// Deneme değeri, Kemal oynayıp karar verecek.
export const FAZLA_TOP_ORANI = 0.5;

// Sütunlarda aynı çeşitten üst üste duran en uzun öbek.
// Deneme değeri, Kemal oynayıp karar verecek.
export const OBEK_EN_COK = 3;

// Bantta kaç yer var. Hepsi dolar ve kimse bantta olanı istemezse "Bant doldu".
// Deneme değeri, Kemal oynayıp karar verecek.
export const BANT_YERI = 12;

// Bant bir turu kaç saniyede döner (büyüdükçe yavaşlar; sakin oyuncu için yavaş).
// Deneme değeri, Kemal oynayıp karar verecek.
export const BANT_TUR_SANIYE = 12;

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

// Her sütunda üstten kaç top görünür. Geri kalanı gizlidir (çizilmez);
// üstteki top gidince kalanlar yukarı kayar, alttan gizlilerden biri gelir.
// Kemal, 21 Ekim: "bütün gelecekleri görmemem lazım ... alttan gelmeye devam etmesi lazım".
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
// Varsayılan biçimin sırası (1: "1 tur sonra").
export const ERIME_VARSAYILAN = 1;

// Eriyen topun yavaşça solup küçülerek kaybolma süresi (milisaniye).
// Deneme değeri, Kemal oynayıp karar verecek.
export const ERIME_MS = 1500;

// Çeşitlerin harfleri ve renkleri (mor-sarı ağırlıklı; tonlar taslak).
// Harfler yalnız ayırt etmek için; çeşit adları [Kemal].
export const CESITLER = [
  { harf: 'A', renk: '#F2C94C', yazi: '#3B2560' }, // sarı
  { harf: 'B', renk: '#6E46A8', yazi: '#FFF6DC' }, // mor
  { harf: 'C', renk: '#C9B2E6', yazi: '#3B2560' }, // lila
  { harf: 'D', renk: '#FFF3D1', yazi: '#3B2560' }, // açık sarı
  { harf: 'E', renk: '#B88A1E', yazi: '#FFF6DC' }, // koyu sarı (5. çeşit gerekirse)
];
