// Öneri oyununun bütün ayarları bu dosyada.
// Buradaki sayıların hepsi DENEME DEĞERİDİR; karar değildir.
// Kemal oynayıp karar verecek. Aralıklar tasarım belgesi 7.1'den.

// Alttaki sütun sayısı. Önerilen aralık 3–5.
// Deneme değeri, Kemal oynayıp karar verecek.
export const SUTUN_SAYISI = 4;

// Aynı anda bekleyen (görünen) müşteri sayısı. Önerilen aralık 2–4.
// Deneme değeri, Kemal oynayıp karar verecek.
export const AYNI_ANDA_MUSTERI = 3;

// Bölümdeki toplam müşteri sayısı (sırayla gelirler).
// Bölüm süresi önerisi 1–3 dakika; bu sayı ona göre seçildi.
// Deneme değeri, Kemal oynayıp karar verecek.
export const TOPLAM_MUSTERI = 8;

// Kaç farklı çeşit var. Ekranda harfle ayrılır (adlar Kemal'in).
// Deneme değeri, Kemal oynayıp karar verecek.
export const CESIT_SAYISI = 4;

// Bir müşterinin istediği adet: en az / en çok.
// Deneme değeri, Kemal oynayıp karar verecek.
export const ISTEK_EN_AZ = 2;
export const ISTEK_EN_COK = 4;

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

// Çeşitlerin harfleri ve renkleri (mor-sarı ağırlıklı; tonlar taslak).
// Harfler yalnız ayırt etmek için; çeşit adları [Kemal].
export const CESITLER = [
  { harf: 'A', renk: '#F2C94C', yazi: '#3B2560' }, // sarı
  { harf: 'B', renk: '#6E46A8', yazi: '#FFF6DC' }, // mor
  { harf: 'C', renk: '#C9B2E6', yazi: '#3B2560' }, // lila
  { harf: 'D', renk: '#FFF3D1', yazi: '#3B2560' }, // açık sarı
  { harf: 'E', renk: '#B88A1E', yazi: '#FFF6DC' }, // koyu sarı (5. çeşit gerekirse)
];
