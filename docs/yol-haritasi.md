# DK Lite · Yol haritası

Yazan: Oyun Şefi (Kems Ajans). Onay Kemal'in. KKM'nin oyun sayfası bu
dosyayı okur. Kararların ayrıntısı tasarım belgesinde: `docs/tasarim-belgesi.md`.

Ne istendi (21 Ekim 2026): yol haritasını Kemal'in panodaki üç cevabına göre
düzeltmek. Bakılan kaynaklar: Kemal'in cevapları (CEO iletti), tasarım
belgesi, KKM `docs/03-duzada-kunyesi.md`, Dondurmacı Kızlar deposunun
`CLAUDE.md` dosyası. Ulaşılamayan kaynak yok.

Tarih ve süre yazılmadı (KKM'de takvim: belirsiz). Sıra önerisi Oyun
Şefi'nin; Kemal "şimdi" demedikçe işler bu sırayla gider.

## Neredeyiz

- 6 Kasım akşamı (öneri; `ajans/ton-dugme-balon`; tasarım belgesi 0.37): Kemal'in telefonda gördüğü üç düzeltme. Müşteri tonları eşitlendi (çizimler aynı; beyazlar, çizgiler, parlaklık ve canlılık ortak hedefe; `araclar/musteri_ton.py`). Alttaki yardımcı düğmeleri ince tek şerit (yarı boy, dokunma alanı 44 px); kazanılan yerle sütunlardaki dondurmalar büyüdü. İki siparişli müşterinin siparişleri balonda yan yana; balon herkeste aynı boy, müşteriler aynı boyda. Kemal'in görmesi bekleniyor; gerçek telefonda denenmedi.

5 Kasım 2026'da Kemal'in isteğiyle yol haritası oyunun bölümlerine göre
düzenlendi ("Yol haritasını değiştir, onu bölüm bölüm ilerlet"; sohbette
"Oyunun bölümlerine göre"). Eski uzun "Neredeyiz" notları silinmedi, en
alttaki "Geçmiş notlar" bölümüne taşındı.

- 5 Kasım gecesi (öneri; tasarım belgesi 0.32): **150 bölüm** ve 0. bölüm (öğretici, el işaretli, kaybedilmez). 5 mahalle × 30 bölüm: Liman, Stadyum, Çiftlik, İskele, Merkez; her biri kendi renginde. 15 hediye ürün birer birer: 0. bölümden sonra limonata, sonra her 10 bölümde bir (son: 140. bölümde baklava); sandık hediyeyle birlikte. Yeni öğeler yapıldı (öneri; tasarım belgesi 0.33): 31 buzlu top, 61 gizli top, 91 aceleci müşteri, 121 kilitli sütun; adları [Kemal]. Yardımcılar, galibiyet serisi, günlük ödül ve albüm yapıldı (öneri; tasarım belgesi 0.34). Müşteri desenleri ve 10 yeni kişi yapıldı (tasarım belgesi 0.35). Bu turdaki işlerin hepsi bitti. 6 Kasım listesi yapıldı (öneri; tasarım belgesi 0.36): ana sayfa düğmesi, "Bozulma", mahalle kilidi (75 yıldız), sıcak içecekte buz yok, yaşa göre istekler, görünüm denetimi aracı, etiketli gazoz, hediye can 6, fularlı kadın ve nene. Kemal'in telefonda denemesi bekleniyor.
- (Eski not) Oyunda **50 bölüm** var (5 Kasım'da 30'dan 50'ye), hepsi oynanabilir. Bölüm 1–10 elle yazılmış bir
  tabloyla, 11–30 bir kuralla kuruluyor. Bölümlerdeki bütün sayılar **deneme
  değeri**; Kemal oynayıp söyleyince kesinleşir.
- Şimdi: yeni arayüz. İlk adım (düğmeler, giriş, Poppins) PR #27 ile ana
  dala girdi. Bütün ekranlar, külahlı logo ve desenli mor zemin ikinci
  öneride (`ajans/arayuz-tamami`); bölümlere ve sayılara dokunmuyor.
  Kemal'in telefonda denemesi bekleniyor.
- Sıradaki (sıra Oyun Şefi'nin önerisi): Kemal bölümleri **gruba göre**
  oynar, her grup için "kolay / zor / tamam" der: önce 1–10, sonra 11–20,
  sonra 21–30. Bir grup oturmadan sonrakinin sayıları değiştirilmez.
  Ardından 31. bölümden sonrası için Kemal'in kararı (aşağıda).
- Bölüm seçme ekranı (5 Kasım 2026 akşamı, öneri; `ajans/kutulu-bolumler`): sahil yolu kalktı; bölümler sabit desenli mor zeminin üstünde numaralı kutular (satırda 4), geçilen mor ve yıldızlı, sıradaki sarı, kilitli soluk ve kilitli. Kemal: "kutulu olarak bölümleri koy sabit arka zeminde". Ekran görüntüleri: `docs/ekran/kutulu-bolumler/`. Telefonda denenmedi.
- Kazanç (5 Kasım 2026 akşamı; Kemal: "bölümleri geçtikçe bir kazancı yok", dört türe "Hepsi güzel", sıra "Bu sırayla"). Sıra: 1) yeni ürün açılır, 2) ödül sandığı, 3) dükkânı süsleme, 4) para ve market; her biri ayrı küçük paket.
  - 1) Yeni ürün açılır: yapıldı, öneri (`ajans/yeni-urun`; kutulu bölümler dalının üstünde). Bölüm ilk kez kazanılınca, sonraki bölümde ilk gelen ürün için "Yeni ürün!" penceresi; Bölümler ekranında ürünün geleceği kutunun köşesinde küçük resmi. Ürünler 9. bölüme kadar bitiyor; 10–30 için kazanç sandık ve süsle gelecek. Ekran görüntüleri: `docs/ekran/yeni-urun/`. Telefonda denenmedi.
  - 2) Can ve ödül sandığı: yapıldı, öneri (`ajans/can-sandik`; yeni ürün dalının üstünde). Kemal: "can barı olması lazım"; 5 can, yalnız kaybedince (ya da yarıda bırakınca) gider, 30 dakikada 1 can dolar; 10 bölümde bir sandık: +1 can, canlar dolar ya da 1 saat sınırsız can (eşit şans, deneme). Tasarım belgesi 0.26; ekran görüntüleri: `docs/ekran/can-sandik/`. Telefonda denenmedi.
  - 3) Dükkânı süsleme: **çıkarıldı** (Kemal, 5 Kasım: "Dükkan kısmını sevmedim. Onu koymayalım hiç").
  - 4) Para ve market: para modeli konuşulunca.
- Geri bildirim ve zorluk (5 Kasım 2026 akşamı, öneri; `ajans/can-sandik` dalında devam): düğmelerde beyaz çizgi kalktı; kapalı bölümde sürpriz ürün "?"; can 15 dakikada dolar; 50 bölüm; araştırma (`docs/arastirma-zorluk-ve-baglilik.md`) ve Kemal'in seçtiği 10'luk dilim zorluk (5. bölüm zor, 6. rahat, 10. çok zor; işaretli); fiş yerine sonuç penceresi. Tasarım belgesi 0.27; ekran görüntüleri `docs/ekran/sonuc-penceresi/`. Telefonda denenmedi.
- Kemal'in kararları (5 Kasım gecesi; tasarım belgesi 0.28; öneri `ajans/kararlar`): ilk zor bölüm 10. bölüm; sandıkta sınırsız can nadir (%15); sandık Canva'da çizilir; Bölümler ekranı 20'li sayfalar; yıldız puana göre; mevsim şimdilik yaz (sonra aylık temalar, etkinlikler); oyunun yayın adı [Kemal].
- Müşteri renk çeşitleri (5 Kasım gecesi, öneri; `ajans/musteri-renk`): 10 kişiden 46 görünüş (kıyafetin mavisi kırmızı/mor/yeşil/pembe); sırada parça parça kombinasyon (desenler ve renkler) ve Canva'da yeni kişiler (farklı kökenler, saçlar) (Kemal: "Hepsi"; "Desenler ve renkler ayrıca etnik kökenler ve saçlar falan etkili olabilir"). Tasarım belgesi 0.29. Devir raporu: `docs/devir-raporu-05-11-2026.md`.
- Sırada (Kemal: hepsi uygun): yeni öğeler (buzlu top 11., gizli top 21., aceleci müşteri 31., kilitli sütun 41. bölümde), sonra yardımcılar, galibiyet serisi, günlük ödül, koleksiyon albümü; her biri ayrı paket.
- Yayın: tarih yok, acele yok. Ses ve nasıl oynanır gösterimi yayına yakın.

## Bölüm bölüm

Her bölümde aynı olanlar (deneme değerleri, `src/ayarlar.ts`): 4 sütun,
sütunda görünen 4 top, ekranda aynı anda en çok 5 müşteri, müşteri sabrı
90 saniye, bant bir turu 12 saniyede döner, fazla top oranı 0,5. Tablolar
koddan okundu; elle yazılmadı.

Zorluk 10'luk dilimlerde testere dişi (Kemal, 5 Kasım 2026: "10'luk dilim";
araştırma `docs/arastirma-zorluk-ve-baglilik.md`): her dilimde 5. bölüm
**Zor**, 6. bölüm **Rahat**, 10. bölüm **Çok zor** (kazanınca sandık);
öbürleri yavaş artar. Zor bölümler Bölümler ekranında kırmızı ve etiketli.
Tablolardaki "İlk gelen": o bölümde ilk kez gelen ürün (bir önceki bölüm ilk
kez kazanılınca "Yeni ürün!" olarak açılır).

### Bölüm 1–10

- Durum: oynanabilir. Bölüm 1–4 elle yazılmış tablodan; 5, 6 ve 10 dilim kuralıyla ayarlandı.
- Kemal oynayınca söyleyecekleri: 5. bölümün zorluğu ilk zor bölüm için uygun mu (araştırmada ilk zor bölüm çoğu oyunda 10. bölüm civarında; [Kemal]); bölümler uzun mu kısa mı; sabır ve seri ek puanı nasıl.

| Bölüm | Tür | Müşteri | İstek (adet) | Çeşit | Bant yeri | İki çeşit oranı | Ürünler | İlk gelen |
|---|---|---|---|---|---|---|---|---|
| 1 |  | 10 | 2–4 | 3 | 12 | 0 | Çikolata, Çilek, Limon |  |
| 2 |  | 11 | 2–4 | 3 | 12 | 0 | Çikolata, Çilek, Fıstık | Fıstık |
| 3 |  | 11 | 3–4 | 3 | 12 | 0 | Limon, Vanilya, Dilim pasta | Vanilya, Dilim pasta |
| 4 |  | 13 | 3–4 | 3 | 12 | 0 | Çilek, Fıstık, Küçük kek | Küçük kek |
| 5 | Zor | 16 | 3–4 | 3 | 11 | 0 | Çikolata, Vanilya, Kâsede meyve | Kâsede meyve |
| 6 | Rahat | 11 | 3–4 | 4 | 12 | 0,3 | Çilek, Limon, Dilim pasta, Limonata | Limonata |
| 7 |  | 14 | 3–4 | 4 | 11 | 0,3 | Çikolata, Fıstık, Küçük kek, Gazoz | Gazoz |
| 8 |  | 15 | 3–4 | 4 | 11 | 0,4 | Vanilya, Çilek, Kâsede meyve, Kahve | Kahve |
| 9 |  | 15 | 3–5 | 4 | 10 | 0,4 | Limon, Çikolata, Dilim pasta, Çay | Çay |
| 10 | Çok zor | 18 | 3–5 | 4 | 8 | 0,65 | Fıstık, Vanilya, Küçük kek, Limonata |  |

### Bölüm 11–20

- Durum: oynanabilir; taban kural (29 Ekim) üstüne dilim ayarı. 16. bölümde 5. çeşit.
- Sırada: 11. bölümde yeni öğe "buzlu top" tanıtılacak (öneri, henüz yok).

| Bölüm | Tür | Müşteri | İstek (adet) | Çeşit | Bant yeri | İki çeşit oranı | Ürünler | İlk gelen |
|---|---|---|---|---|---|---|---|---|
| 11 |  | 16 | 3–5 | 4 | 10 | 0,5 | Çilek, Fıstık, Çay, Kâsede meyve |  |
| 12 |  | 16 | 3–5 | 4 | 10 | 0,5 | Limon, Vanilya, Dilim pasta, Limonata |  |
| 13 |  | 16 | 3–5 | 4 | 10 | 0,5 | Fıstık, Çikolata, Gazoz, Küçük kek |  |
| 14 |  | 16 | 3–5 | 4 | 9 | 0,5 | Vanilya, Çilek, Kâsede meyve, Kahve |  |
| 15 | Zor | 19 | 3–5 | 4 | 8 | 0,6 | Çikolata, Limon, Çay, Dilim pasta |  |
| 16 | Rahat | 16 | 3–5 | 5 | 10 | 0,5 | Çilek, Fıstık, Küçük kek, Limonata, Kâsede meyve |  |
| 17 |  | 17 | 3–5 | 5 | 9 | 0,5 | Limon, Vanilya, Gazoz, Kâsede meyve, Kahve |  |
| 18 |  | 17 | 3–5 | 5 | 9 | 0,6 | Fıstık, Çikolata, Dilim pasta, Kahve, Küçük kek |  |
| 19 |  | 18 | 3–5 | 5 | 9 | 0,6 | Vanilya, Çilek, Çay, Küçük kek, Limonata |  |
| 20 | Çok zor | 21 | 3–5 | 5 | 7 | 0,75 | Çikolata, Limon, Kâsede meyve, Limonata, Dilim pasta |  |

### Bölüm 21–30

- Durum: oynanabilir. 25. bölümde 6. çeşit. 20. ve 30. bölüm çok zor (sandık).
- Sırada: 21. bölümde yeni öğe "gizli top" (öneri, henüz yok).

| Bölüm | Tür | Müşteri | İstek (adet) | Çeşit | Bant yeri | İki çeşit oranı | Ürünler | İlk gelen |
|---|---|---|---|---|---|---|---|---|
| 21 |  | 18 | 3–5 | 5 | 9 | 0,6 | Çilek, Fıstık, Gazoz, Dilim pasta, Kahve |  |
| 22 |  | 18 | 3–5 | 5 | 8 | 0,6 | Limon, Vanilya, Küçük kek, Kahve, Kâsede meyve |  |
| 23 |  | 19 | 3–5 | 5 | 8 | 0,6 | Fıstık, Çikolata, Çay, Kâsede meyve, Limonata |  |
| 24 |  | 19 | 3–5 | 5 | 8 | 0,6 | Vanilya, Çilek, Dilim pasta, Limonata, Küçük kek |  |
| 25 | Zor | 21 | 3–5 | 6 | 7 | 0,7 | Çikolata, Limon, Gazoz, Küçük kek, Kahve, Kâsede meyve |  |
| 26 | Rahat | 19 | 3–5 | 6 | 8 | 0,6 | Çilek, Fıstık, Kâsede meyve, Kahve, Dilim pasta, Çay |  |
| 27 |  | 20 | 3–5 | 6 | 8 | 0,7 | Limon, Vanilya, Çay, Dilim pasta, Limonata, Küçük kek |  |
| 28 |  | 20 | 3–5 | 6 | 8 | 0,7 | Fıstık, Çikolata, Küçük kek, Limonata, Kâsede meyve, Gazoz |  |
| 29 |  | 20 | 3–5 | 6 | 8 | 0,7 | Vanilya, Çilek, Gazoz, Kâsede meyve, Kahve, Dilim pasta |  |
| 30 | Çok zor | 23 | 3–5 | 6 | 6 | 0,8 | Çikolata, Limon, Dilim pasta, Kahve, Küçük kek, Çay |  |

### Bölüm 31–40

- Durum: oynanabilir (5 Kasım'da eklendi). Sayılar burada tavana yakın; zorluk farkı yalnız zor ve çok zor bölümlerde. Bu yüzden yeni öğeler gerekli.
- Sırada: 31. bölümde yeni öğe "aceleci müşteri" (öneri, henüz yok).

| Bölüm | Tür | Müşteri | İstek (adet) | Çeşit | Bant yeri | İki çeşit oranı | Ürünler | İlk gelen |
|---|---|---|---|---|---|---|---|---|
| 31 |  | 21 | 3–5 | 6 | 8 | 0,7 | Çilek, Fıstık, Çay, Küçük kek, Limonata, Kâsede meyve |  |
| 32 |  | 21 | 3–5 | 6 | 8 | 0,7 | Limon, Vanilya, Kâsede meyve, Limonata, Dilim pasta, Gazoz |  |
| 33 |  | 21 | 3–5 | 6 | 8 | 0,7 | Fıstık, Çikolata, Gazoz, Dilim pasta, Kahve, Küçük kek |  |
| 34 |  | 21 | 3–5 | 6 | 8 | 0,7 | Vanilya, Çilek, Küçük kek, Kahve, Kâsede meyve, Çay |  |
| 35 | Zor | 24 | 3–5 | 6 | 7 | 0,8 | Çikolata, Limon, Çay, Kâsede meyve, Limonata, Dilim pasta |  |
| 36 | Rahat | 21 | 3–5 | 6 | 8 | 0,7 | Çilek, Fıstık, Dilim pasta, Limonata, Küçük kek, Gazoz |  |
| 37 |  | 22 | 3–5 | 6 | 8 | 0,7 | Limon, Vanilya, Gazoz, Küçük kek, Kahve, Kâsede meyve |  |
| 38 |  | 22 | 3–5 | 6 | 8 | 0,7 | Fıstık, Çikolata, Kâsede meyve, Kahve, Dilim pasta, Çay |  |
| 39 |  | 22 | 3–5 | 6 | 8 | 0,7 | Vanilya, Çilek, Çay, Dilim pasta, Limonata, Küçük kek |  |
| 40 | Çok zor | 25 | 3–5 | 6 | 6 | 0,8 | Çikolata, Limon, Küçük kek, Limonata, Kâsede meyve, Gazoz |  |

### Bölüm 41–50

- Durum: oynanabilir (5 Kasım'da eklendi). 50. bölüm kazanılınca "Bütün bölümler bitti".
- Sırada: 41. bölümde yeni öğe "kilitli sütun" (öneri, henüz yok).

| Bölüm | Tür | Müşteri | İstek (adet) | Çeşit | Bant yeri | İki çeşit oranı | Ürünler | İlk gelen |
|---|---|---|---|---|---|---|---|---|
| 41 |  | 22 | 3–5 | 6 | 8 | 0,7 | Çilek, Fıstık, Gazoz, Kâsede meyve, Kahve, Dilim pasta |  |
| 42 |  | 22 | 3–5 | 6 | 8 | 0,7 | Limon, Vanilya, Dilim pasta, Kahve, Küçük kek, Çay |  |
| 43 |  | 22 | 3–5 | 6 | 8 | 0,7 | Fıstık, Çikolata, Çay, Küçük kek, Limonata, Kâsede meyve |  |
| 44 |  | 22 | 3–5 | 6 | 8 | 0,7 | Vanilya, Çilek, Kâsede meyve, Limonata, Dilim pasta, Gazoz |  |
| 45 | Zor | 24 | 3–5 | 6 | 7 | 0,8 | Çikolata, Limon, Gazoz, Dilim pasta, Kahve, Küçük kek |  |
| 46 | Rahat | 22 | 3–5 | 6 | 8 | 0,7 | Çilek, Fıstık, Küçük kek, Kahve, Kâsede meyve, Çay |  |
| 47 |  | 22 | 3–5 | 6 | 8 | 0,7 | Limon, Vanilya, Çay, Kâsede meyve, Limonata, Dilim pasta |  |
| 48 |  | 22 | 3–5 | 6 | 8 | 0,7 | Fıstık, Çikolata, Dilim pasta, Limonata, Küçük kek, Gazoz |  |
| 49 |  | 22 | 3–5 | 6 | 8 | 0,7 | Vanilya, Çilek, Gazoz, Küçük kek, Kahve, Kâsede meyve |  |
| 50 | Çok zor | 25 | 3–5 | 6 | 6 | 0,8 | Çikolata, Limon, Kâsede meyve, Kahve, Dilim pasta, Çay |  |

### Bölüm 51 ve sonrası

- Durum: yok. Kemal (29 Ekim): ileride yaklaşık 500 bölüm; 5 Kasım: "şu an için" 50.
- Bölüm sayısı yalnız `BOLUM_SAYISI` ile artar; Bölümler ekranı, kayıt ve zorluk kendiliğinden uyar.
- Kemal'in kararı gereken: kaç bölüme çıkılacak; çok bölümde Bölümler ekranı sayfalara bölünsün mü (Kemal, 5 Kasım: "Bilmem, şu an oyun güzel"; bekliyor); elle yapılmış bölümler bitince ne olur.

## Nasıl ilerler (tek kişilik ekip için)

KKM dosyasındaki ilk risk "motivasyon düşer". Bunun için:
- Her paket küçük; tek oturumda anlatılıp tek PR'la gelir.
- Her paketin sonunda Kemal telefonda açıp oynayabileceği bir şey vardır.
- Bir paket bitmeden öbürüne geçilmez; yarım iş birikmez.
- Bir paket beğenilmezse geri dönmek kolaydır, çünkü küçüktür.
- Önce "eğlenceli mi?", sonra "güzel mi?": çizim ve ses oynanış oturduktan sonra gelir.
- Kemal'in isteği (6 Kasım): istekler önce listeye yazılır, soru turuyla netleşir; Kemal "tamam" deyince toplu yapılır.
- Her değişiklikten sonra `node araclar/ekran-denetimi.cjs` çalıştırılır (bütün ekranlar iki telefon boyutunda; sorun 0 olmalı).

## İlk sürüm: paketler (sırayla)

İlk sürümde yalnız bölümler, yıldız ve harita var (Kemal, 21 Ekim).

### 1. Öneri oyunu (oynanabilir en küçük deneme)

- Durum: bitti. Birleşti (21 Ekim 2026; son düzeltme sınırlı görünüm).
- Deneme değerleri (karar değil): 4 sütun, sütunda görünen 4 top, aynı anda 4 müşteri, bölümde 12 müşteri (21 Ekim ikinci denemeden sonra; önce 3 ve 8), 4 çeşit (A–D), bir müşteri 2–4 adet ister, bantta 12 yer, bant bir turu 12 saniyede döner, sütuna dokununca gider. Hepsi `src/ayarlar.ts` dosyasında.
- Ekran: tek ekran, dik.
- Oynanış: dönen bant ve sütunlar (Seçenek A). Altta sütunlar, ortada dönen bant, üstte müşteriler ve her birinin istediği. Sütuna dokununca en üstteki tek top banda gider (21 Ekim'den beri; önceden en üstteki aynı çeşitlerin hepsi gidiyordu); istediği çeşit önünden geçen müşteri onu alır.
- Bölüm: tek bölüm. Bütün müşteriler karşılanınca "kazandın", bant dolarsa "baştan".
- Sütun ve müşteri sayısı: tasarım belgesi 7.1'deki önerilen aralıktan seçilir; karar değil, denerken değişir.
- Görsel: çizim yok; düz renkli kutular ve harfler. Renkler mor-sarı.
- Yok: erime, yıldız, harita, ses, kayıt.
- Nasıl denenir: Kemal telefonda bir bağlantıdan açar, birkaç kez oynar, "doğru his mi?" der.
- Kimde: Oyun Geliştiricisi; deneme Oyun Kontrolörü.
- 21 Ekim: Kemal'in denemesinden sonra tek tek gönderme. Her dokunuşta (ya da basılı tutuşta) sütunun en üstündeki yalnız bir top banda gider; toplu gitmez. Bölüm kurulurken kazanılabilirlik bu kurala göre denenir. Ayar `src/ayarlar.ts` içinde "tek seferde kaç top gider: 1" (deneme değeri). Öbür ayarlar değişmedi.
- 21 Ekim: Kemal'in ikinci denemesinden sonra sınırlı görünüm. Kemal: "bütün gelecekleri görmemem lazım ... alttan gelmeye devam etmesi lazım; ... maksimumda 4-5 taneyi görmem lazım". Ne değişti:
  - Sütunun tamamı görünmez; her sütunda yalnız üstten 4 top görünür, gerisi gizlidir. Gizli top sayısı yazmaz.
  - Gidecek top sütunun banda yakın üst ucunda durur, öbür görünenler onun altında soluk durur. Top gidince kalanlar kısa ve sakin bir kaymayla yukarı çıkar, en alta gizlilerden biri belirerek gelir.
  - Toplar sütunun boyuna göre küçülmez; boyları görünen top sayısına göre.
  - Ekranda aynı anda 4 müşteri (önce 3); bölümde 12 müşteri (önce 8), sütunlar derinleşsin ve gizleme hissedilsin diye.
  - Bölüm kurulurken kazanılabilirlik denetimi aynen sürer (denetim gizli topları da bilir).
  - Yeni deneme değerleri (karar değil): sütunda görünen top 4, aynı anda 4 müşteri, bölümde 12 müşteri. Hepsi `src/ayarlar.ts` dosyasında.

### 2. Erime kuralı

- Durum: bitti. Birleşti (22 Ekim 2026). Kemal biçimi seçti: "2 tur olsun ama 1. turun sonunda kazanacağın puan %50'ye düşsün" (tasarım belgesi 0.7). Puan kısmı 3. pakette geldi.
- İçerik: banda giden dondurma alınmazsa erir. Erimenin birkaç biçimi seçilebilir olur (ör. bir bant turu sonra); Kemal oynayıp seçer (Dondurmacı Kızlar'daki "öneri oyunu üzerinden konuşalım" kararı).
- Nasıl denenir: oyun içinde küçük bir düğmeyle biçimler arasında geçilir.
- Kimde: Oyun Geliştiricisi.
- 22 Ekim: Kemal'in panodaki üç cevabına göre (tasarım belgesi 0.6) ne geldi:
  - Erime: bantta alınmayan top seçilen süre sonunda yavaşça solup küçülür ve kaybolur; yeri açılır. Sol üst köşedeki küçük düğmeye dokundukça biçim değişir: "Erime yok", "1 tur sonra", "2 tur sonra" (tur = bant bir kez döner). Başlangıçta "1 tur sonra". Seçilen biçim bölüm değişince de kalır; sayfa yenilenince başlangıca döner.
  - Fazla top: sütunlarda müşterilerin istediğinden fazla top var (hata yapma payı); fazlalar çeşitlere eşit dağılır. Bütün müşteriler karşılanınca kazanılır; sütunda ya da bantta top artması sorun değil.
  - Yeni bitiş: toplar eriyip kalanlar (sütun ve bant) kalan istekleri artık karşılayamazsa bölüm "Top kalmadı" ile biter. Erime açıkken bant kendiliğinden boşaldığı için "Bant doldu" yalnız "Erime yok"ta çıkar.
  - Müşteriler: ekranda en çok 5 müşteri yeri. Bölüm 2 ya da 3 müşteriyle başlar, ötekiler arayla gelir; bir müşteri gidince yerine yenisi birkaç saniye sonra gelir, yani yerler her an dolu değil. Bölümdeki toplam müşteri 12'de kaldı.
  - Sütunda görünen top 4'te kaldı; gizli top sayısı yazmaz.
  - Bölüm kurulurken kazanılabilirlik denetimi fazla toplarla yapılır; denetim erimeyi hesaba katmaz (erime yokmuş gibi dener).
  - Yeni deneme değerleri (karar değil): aynı anda en çok 5 müşteri, müşteri geliş arası 1–5 saniye, bölüm başında 2–3 müşteri, fazla top oranı 0.5 (istenenin yarısı kadar fazla), eriyen topun solma süresi 1,5 saniye, erime biçimleri 0 / 1 / 2 tur. Hepsi `src/ayarlar.ts` dosyasında.

### 3. Sayaçlar ve bölüm sonu

- Durum: bitti. Birleşti (22 Ekim 2026). Kemal: "3. paket ... şimdi başlasın".
- İçerik: üstte sayaçlar (karşılanan müşteri, bant doluluğu ve puan); bölüm sonunda yıldız ekranı, Tekrar oyna ve Devam et.
- Yıldızın ölçüsü Kemal'in kararına göre. Şimdilik puana göre deneme ölçüsü var; Kemal (22 Ekim): "Sonra bakariz simdiki kalsin".
- Kimde: Oyun Geliştiricisi.
- 22 Ekim: ne geldi:
  - Erime: başlangıçta "2 tur sonra" (Kemal'in seçimi). Düğme kaldı: "Erime yok", "1 tur sonra", "2 tur sonra".
  - Puan: banttan müşteriye giden her top puan getirir. Bantta 1 turdan uzun kalmış top alınırsa puanın yarısı (Kemal'in kararı, %50). 1 turu geçen top bantta hafif soluk ve alttan biraz erimiş görünür; oyuncu yarım puanlı olduğunu anlar. 2. turun sonunda eskisi gibi eriyip kaybolur. Puan kuralı her erime biçiminde aynıdır; "Erime yok"ta da 1 turu geçen top yarım puan getirir, yalnız erimez. (Aşağıdaki 22 Ekim düzeltmesiyle değişti: yarım puan yalnız erime açıkken.)
  - Sayaçlar: üst şeritte, sade. Solda erime düğmesi; sağda "Müşteri" (karşılanan / toplam, ör. "3 / 12"), "Puan" ve "Bant" (ince doluluk çubuğu; bant tam dolunca çubuk kiremit rengine döner). Eski "Sırada N" yazısı kalktı; yerini "Müşteri" sayacı aldı.
  - Yerleşim: üst şerit, müşteri kartları, bant ve sütunlar yukarıdan aşağı sırayla dizilir; kısa ekranda (ör. 360x640) bant biraz basıklaşır, hiçbir şey birbirine binmez (önceki pakette kısa ekranda kartlar erime düğmesine biniyordu).
  - Bölüm sonu: kazanınca "Bölüm tamamlandı", üç yıldızdan kazanılanlar dolu çizilir, puan yazar; "Tekrar oyna" (aynı dizilim baştan) ve "Devam et" (yeni bölüm; numaralı bölümler 4. pakette, şimdilik yeni rastgele bir bölüm). Kaybedince ("Bant doldu" ya da "Top kalmadı") yıldız ve puan yok, yalnız "Tekrar oyna". "Tekrar oyna"da sütunlar ve müşterilerin sırası aynıdır; müşterilerin hangi yere ve kaç saniye arayla geldiği yine rastgeledir.
  - Yıldız (deneme ölçüsü, Kemal karar verecek): bölümün en yüksek olası puanına (her top tam puanla alınırsa) oranla. Kazanınca en az 1 yıldız; %70 ve üstü 2; %90 ve üstü 3.
  - Yeni deneme değerleri (karar değil): bir top 10 puan, yıldız eşikleri 0 / 0,7 / 0,9, yarım puanlı topun solukluğu 0,6. Kemal'in kararı olan (deneme değil): yarım puan oranı 0,5, yarım puanın başladığı yer 1. tur sonu, başlangıç erime biçimi "2 tur sonra". Hepsi `src/ayarlar.ts` dosyasında.
- 22 Ekim: Kemal'in kararından sonra ortak saklı yer (tasarım belgesi 0.8). Bitti; birleşti (22 Ekim 2026). Kemal: "Saklı toplar ortak bir yerde dursun; bir sütun azaldıkça alttan ona gelsin. Böylece sütunların içi baştan belli olmaz." Ne değişti:
  - Bölüm başında her sütunda yalnız görünen kadar top durur (4 sütunda 4'er top). Geri kalan bütün toplar (fazla toplar dahil) tek bir ortak sırada saklıdır; sayısı yazmaz.
  - Bir sütundan top gidince kalanlar yukarı kayar; ortak sıradaki sıradaki top o sütunun en altına belirerek gelir. Hangi sütundan gönderirsen gönder, gelen top ortak sıranın sıradakidir.
  - Ortak sıra bölüm kurulurken karıştırılır ve sabittir: "Tekrar oyna" aynı başlangıcı ve aynı gelişleri getirir.
  - Ortak sıra bitince sütunlar kısalır.
  - Bölüm kurulurken kazanılabilirlik denetimi bu kurala göre yapılır (her gönderişte ortak sıradan sıradaki top o sütuna girer).
  - Yarım puan yalnız erime açıkken ("1 tur sonra", "2 tur sonra"). "Erime yok"ta her top tam puan getirir ve 1 turu geçen top soluklaşmaz (Kemal: "Hayır, yalnız erime açıkken"). Yıldız hesabı aynı kaldı.
  - Yeni sayı yok; sütunda görünen top 4'te kaldı.

### 4. Numaralı bölümler

- Durum: bitti (PR #9 birleşti). Kemal: "4. paket: numaralı bölümler (her biri biraz daha zor; kaldığın bölüm ve yıldızlar telefonda saklanır)".
- İçerik: elle hazırlanmış bölümler, her biri biraz daha zor; kaldığı bölüm ve yıldızlar telefonda saklanır. Bölüm sayısı: ilk sürüm 10 (Kemal, 22 Ekim).
- Nasıl denenir: Kemal baştan sona oynar, zorluk artışını söyler.
- Kimde: Oyun Geliştiricisi; bölüm denemesi Oyun Kontrolörü.
- 22 Ekim: ne geldi (tasarım belgesi 0.9):
  - Ortak saklı sıra top top karıştırılır, öbek yok (Kemal: "Toplar tek tek karıştırılsın; art arda aynı çeşit daha az gelsin"). Aynı çeşit art arda en çok 2 kez gelir. Bölüm başında sütunlara dizilen toplar da aynı sıranın başı; eskiden toplar öbek öbek (3'e kadar aynı çeşit bir arada) diziliyordu, artık aynı çeşit en çok 2 kez art arda. Gerekçe: tek kural, tek sıra; sütunlar da "daha az aynı çeşit" kuralına uyar.
  - Numaralı bölümler: her bölüm kendi numarasından çıkan sabit bir dizilimle kurulur; aynı bölüm her açılışta (ve her telefonda) aynı başlar, "elle hazırlanmış" gibi. Kazanılabilirlik denetimi aynen sürer; geçmeyen dizilimin yerine yine her açılışta aynı olan bir sonraki dizilim gelir. Müşterilerin hangi yere ve kaç saniye arayla geldiği eskisi gibi rastgele.
  - Zorluk: bölümden bölüme yavaşça artar. Bölüm 1 3. paketteki oyundan biraz kolay (3 çeşit, 8 müşteri); Bölüm 4 3. paketteki oyunun aynısı; son bölüm biraz zor (5 sütun, 5 çeşit, 16 müşteri, istek 3–4, bant 9 yer). Fazla top oranı 0,5 her bölümde aynı (Kemal'in kararı).
  - Kayıt: kaldığı bölüm ve her bölümün en iyi yıldızı telefonda saklanır. Bir bölüm kazanılınca sonraki açılır. Saklama çalışmazsa oyun yine açılır, Bölüm 1'den (kayıt o açılış boyunca durur).
  - Açılış: oyun açılınca kaldığı bölüm (açılan en ileri bölüm) doğrudan başlar. Bütün bölümler bittiyse "Bölümler" listesi açılır.
  - Üst şerit: solda "Bölüm 3" gibi bölüm numarası (ad yok) ve erime düğmesi; sağda sayaçlar. "Bölüm 3" yazısına dokununca "Bölümler" listesi açılır.
  - Bölümler listesi (harita 5. pakette): numaralı kutular, her birinde kazanılan yıldızlar; kilitli olanlar soluk ve dokununca başlamaz; açık olana dokununca o bölüm başlar.
  - Bölüm sonu: "Tekrar oyna" (aynı bölüm baştan), "Devam et" (sonraki bölüm; son bölümdeyse "Bölümler" listesi) ve altta küçük "Bölümler" yolu. Kaybedince "Tekrar oyna" ve "Bölümler". Son bölüm de kazanılınca "Bütün bölümler bitti" yazar (listede de).
  - Yeni deneme değerleri (karar değil; bölüm sayısı ve zorluk tablosu 22 Ekim gece işlerinde değişti, aşağıda): bölüm sayısı 10; art arda aynı çeşit en çok 2; zorluk tablosu (bölüm: sütun / çeşit / müşteri / istek / bant yeri): 1: 4 / 3 / 8 / 2–3 / 12; 2: 4 / 3 / 10 / 2–3 / 12; 3: 4 / 4 / 10 / 2–4 / 12; 4: 4 / 4 / 12 / 2–4 / 12; 5: 4 / 4 / 13 / 2–4 / 11; 6: 4 / 4 / 14 / 2–4 / 11; 7: 4 / 4 / 14 / 3–4 / 10; 8: 5 / 5 / 14 / 2–4 / 10; 9: 5 / 5 / 15 / 3–4 / 10; 10: 5 / 5 / 16 / 3–4 / 9. Bant hızı, sütunda görünen top (4), aynı anda en çok 5 müşteri, erime ve puan kuralları her bölümde aynı. Hepsi `src/ayarlar.ts` dosyasında.

### Gece işleri (22 Ekim 2026)

- Durum: bitti (PR #10 birleşti). Kemal panoda istedi; ayrıntı tasarım belgesi 0.10.
- Ekran görüntüleri (telefon boyutu, 390x844): `docs/ekran/gece-22-10/1-giris.png`, `2-oyun.png`, `3-duraklatma.png`.
- Kimde: Oyun Geliştiricisi.
- Renk: mor-sarı tonlar Dondurmacı Kızlar'ınkiyle aynı oldu: koyu mor `#4e2470`, mor `#7a3fa8` (bant), sarı `#ffc928` (düğmeler, A çeşidi). Ekranın düzeni değişmedi.
- Giriş ekranı: oyun açılınca önce giriş ekranı gelir. Oyunun adının yerinde `[Kemal]` yer tutucusu, altında "Başla" (kaldığın bölüm başlar; hepsi bittiyse Bölümler listesi) ve "Bölümler". Eskiden kaldığı bölüm doğrudan başlıyordu.
- Duraklatma: oyun sırasında sağ üst köşede duraklatma düğmesi. Basınca oyun tamamen durur; "Devam et", "Baştan başla", "Bölümler" çıkar. Devam edince erime, müşteri gelişi ve bant kaldığı yerden sürer.
- Hızlandırma: duraklatma düğmesinin yanında "2×" düğmesi. Basınca oyun 2 kat hızlanır (düğme sarı dolar), tekrar basınca normale döner. 2 kat Kemal'in kararı (22 Ekim; tasarım belgesi 0.12). Erime düğmesi sağa yer kalsın diye "Bölüm 3" yazısının altına indi.
- Bölüm sayısı: ilk sürüm 10 bölüm (Kemal'in kararı). Oyunda zaten 10 vardı; değişmedi. Sonra 30'a çıkarıldı (29 Ekim 2026, tasarım belgesi 0.22).
- Zorluk daha yavaş artıyor (Kemal'in kararı): artış adımı eskisinin yaklaşık yarısı, her bölümde yalnız bir şey biraz zorlaşır. Bölüm 10'da müşteri 12 (eskiden 16), çeşit 4 (eskiden 5), sütun 4 (eskiden 5), istek 3–4, bant yeri 10 (eskiden 9). Bölüm 1 aynı kaldı. Yeni tablo (bölüm: sütun / çeşit / müşteri / istek / bant yeri): 1: 4 / 3 / 8 / 2–3 / 12; 2: 4 / 3 / 9 / 2–3 / 12; 3: 4 / 3 / 9 / 2–4 / 12; 4: 4 / 3 / 10 / 2–4 / 12; 5: 4 / 3 / 11 / 2–4 / 12; 6: 4 / 4 / 11 / 2–4 / 12; 7: 4 / 4 / 11 / 2–4 / 11; 8: 4 / 4 / 12 / 2–4 / 11; 9: 4 / 4 / 12 / 2–4 / 10; 10: 4 / 4 / 12 / 3–4 / 10. Sayılar deneme değeri.

### 5. Bölüm haritası (çizimsiz)

- Durum: bitti (PR #11 birleşti). Kemal: "bu gece başlasın". Ayrıntı tasarım belgesi 0.11.
- İçerik: Düzada'nın kaba biçimi üstünde kıvrılan yol, numaralı bölüm noktaları, kilitli olanlar, kazanılan yıldızlar; bölüme dokununca başlar.
- Yolun geçtiği mahalleler (Kemal, 22 Ekim): Liman'dan başlar, Sahil Yolu boyunca öbür mahallelere gider. Yalnız künyedeki yerler; künyede olmayan yer adı yazılmaz.
- Yok: can, altın, seviye, sandık, lig, festival, hediyeler.
- Kimde: Oyun Geliştiricisi.
- Ekran görüntüleri (telefon boyutu): `docs/ekran/paket-5/1-harita.png` (390x844, 4 bölüm açık), `2-harita-hepsi-bitti.png` (390x844), `3-harita-360x640.png` (kısa ekran).
- 22 Ekim gecesi: ne geldi:
  - Eski "Bölümler" listesinin yerine harita. Giriş ekranındaki, duraklatmadaki, bölüm sonundaki "Bölümler" ve üst şeritteki "Bölüm 3" yazısı haritayı açar.
  - Bütün ekran deniz rengi; ortada Düzada'nın kaba biçimi (KKM'deki haritadan sadeleştirildi, kuzey yukarıda), mahalle sınırları kesik çizgi.
  - Yazılar yalnız künyedeki adlar: Liman, Stadyum, Çiftlik, İskele / Kemsköy, Merkez, Ada Tepesi (küçük üçgen), Dondurmacı Kızlar. Bölüm noktalarında yalnız numara.
  - Yol Sahil Yolu: 1. bölüm Dondurmacı Kızlar'ın önünde; saat yönünde Liman → Stadyum → Çiftlik → İskele; 10. bölüm İskele'de, otelin yakınında. Yön Kemal için önemli değil; böyle kalır (tasarım belgesi 0.12).
  - Geçilmiş bölüm koyu mor, altında kazanılan yıldızlar; sıradaki bölüm sarı; kilitli bölüm soluk, dokununca başlamaz. Yolun açılan bölüme kadarki kısmı sarı.
  - Sol üstte "Geri": harita nereden açıldıysa oraya döner (giriş ekranı, duraklatma seçenekleri, oyun ya da bölüm sonu).
  - Zeytinlik, kayalık, koylar ve çizim 7. pakette.
  - Yeni sayı yok.

### Oyun ekranına Dondurmacı Kızlar görselleri (29 Ekim 2026)

- Durum: bitti (PR #13 birleşti). Kemal: "Dondurmaci kizlar oyunundan ilgili assetleri cekip gameplay kismina bir arayuz hazirlayabilirsin basitce". Ayrıntı tasarım belgesi 0.13.
- Ne geldi: müşterilerin yerine Dondurmacı Kızlar'ın müşteri karakterleri (belden yukarısı, 10 kişi); bandın ortasında tezgâh (külahlar, sundae, külah figürü, krem şanti, yazar kasa); toplar dondurma topu gibi parlak. Kurallar ve sayılar aynı.
- Lisans: hepsi ücretsiz kullanılabilen (CC0) paketlerden; `docs/lisanslar.md`.
- Ekran görüntüleri: `docs/ekran/oyun-arayuzu/1-oyun-390x844.png`, `2-oyun-360x640.png`.
- Kimde: Oyun Geliştiricisi.

### Yeni diziliş ve yeni kurallar (çizimsiz)

- Durum: bitti (PR #15 birleşti). Kemal: "İkisi birlikte"; "Yatıyorum, limitler dahilinde çalışabilirsin". Ayrıntı tasarım belgesi 0.14 (kararlar) ve 0.15 (nasıl yapıldı).
- Ekran görüntüleri: `docs/ekran/yeni-dizilis/1-bolum1-390x844.png`, `2-bolum6-390x844.png`, `3-bolum9-360x640.png`.
- Diziliş: Kemal'in örnek ekranı gibi (`docs/gorseller/kemal-taslak/5-oyun-ekrani-29-10.jpg`): tezgâh ortada büyük, bant tezgâhın çevresinden döner, müşteriler tezgâhın arkasında, ortada dondurmacı. Sayaçlar şimdiki gibi; gönderme dokununca.
- Çeşitler: çikolata, çilek, limon, fıstık, vanilya (harflerin yerine).
- Yeni kurallar: 10 bölümün yarısından sonra iki çeşit isteyen müşteriler; sütunlarda dondurmaların altında tatlılar (dilim pasta, küçük kek, kâsede meyve) ve içecekler (limonata, gazoz, kahve, çay), zorluk arttıkça eklenir. Bölüm numaraları deneme değeri.
- Kimde: Oyun Geliştiricisi.

### 6. Görsel dil denemesi

- Durum: bitti; Kemal seçti (30 Ekim): "Parlak çizgi film iyi". Araç: önce Canva (Scenario sonra). İki tarz denendi: parlak çizgi film (seçildi) ve suluboya; bağlantılar ve önizlemeler `docs/gorseller/deneme-canva/README.md`. Seçilen tarzla 7. pakette parçalar çizilir.
- İçerik: yeni dizilişteki oyun ekranının el çizimi denemesi. Tarz Kemal'in örnek ekranına yakın ama Dondurmacı Kızlar temasında: mor-sarı çizgili tente, dükkânın logosu, mor-sarı tezgâh, dondurmacının önlüğü ve saç bandı dükkân renklerinde; arkada dükkândan dışarısı. Köşede "Dondurmacı Kızlar Lite" çalışma adı.
- Örnek oyunun görselleri, karakterleri ve adı kullanılmaz.
- Kimde: Asset Hazırlayıcı; oyuna yerleştirme Oyun Geliştiricisi.

### 7. Görsellerin oyuna girmesi

- Durum: oyun ekranı ve giriş ekranı geldi (30 Ekim, PR #17 birleşti; tasarım belgesi 0.17). Bantta dondurma külahın üstünde (Kemal, 30 Ekim: "Bantta"; öneri). Kemal: "Birleştirdim, başlayabilirsin". Kalan (bölüm haritasının çizimi, bölüm sonu kutusu) büyük pakette geldi (tasarım belgesi 0.19).
- Ekran görüntüleri: `docs/ekran/paket-7/1-bolum1-390x844.png`, `2-bolum7-390x844.png`, `3-bolum9-360x640.png`, `4-giris-390x844.png`.
- İçerik: 6. pakette beğenilen dille oyun ekranı, bölüm sonu ve harita çizilir, kutuların yerine geçer.
- Harita Düzada'ya göre çizilir: zeytinlik, maki, kayalık, koylar, Ada Tepesi; yanardağ ve palmiye yok. Dükkân kanondaki yerinde (Liman, iskelenin yakını).
- Kimde: Asset Hazırlayıcı ve Oyun Geliştiricisi.

### 8. Ses

- İçerik: dokunma, gönderme, sipariş tamam sesleri; geçici lo-fi müzik. Kemal'in müziği gelince yerine geçer.
- Kimde: Asset Hazırlayıcı.

## Sonra (ilk sürümde yok; sırası Kemal'le)

- Aylık temalar ve etkinlikler (Kemal, 5 Kasım: "ondan sonra aylık temalar falan yaparız etkinlikler olur").

Not (5 Kasım 2026): sandık, market, altın ve yeni malzeme kazanma artık "Neredeyiz"deki kazanç sırasında (tasarım belgesi 0.25).

- Can sistemi: geldi (5 Kasım 2026, tasarım belgesi 0.26). Canın parayla alınması gibi para modeli yayın döneminde.
- Lig.
- Festival.
- Sandık.
- Market.
- Altın ve deneyim (seviye).
- Bölüm sonunda yeni malzeme kazanma.
- Başarımlar ve koleksiyon (adlar ve içerik [Kemal]).
- Hikâye bölümleri (metinler Kemal'in).
- Kısmi seslendirme (satırlar ve kim seslendirecek [Kemal]).
- Taslak ekranlardaki öbür düğmeler: Dükkânım, Etkinlikler, Ekip, Hediyeler, Bilgi/Galeri.
- Seçenek C (hazırla ve ver) yeni bir bölüm türü olarak.
- "Sonu yok": elle yapılmış bölümler bitince ne olacağı.

## Bitenler

- Kemal'in KKM oyun dosyası (21 Ekim 2026).
- Depo açıldı; ilk belgeler girdi (21 Ekim 2026).
- Tasarım kararları ve belgelerin son hâli (21 Ekim 2026). Kod yok.
- 1. paket: çizimsiz öneri oyunu; tek tek gönderme ve sınırlı görünüm dahil (21 Ekim 2026).
- 2. paket: erime kuralı, fazla top, en çok 5 müşteri (22 Ekim 2026). Kemal'in seçimi: "2 tur sonra", 1. tur sonunda puan yarıya.
- 3. paket: sayaçlar, puan, bölüm sonu (yıldız, Tekrar oyna, Devam et) (22 Ekim 2026).
- Ortak saklı yer düzeltmesi: saklı toplar ortak bir yerde, bir sütun azaldıkça alttan ona gelir; yarım puan yalnız erime açıkken (22 Ekim 2026).
- Gece işleri: renk, giriş ekranı, duraklatma, hızlandırma, 10 bölüm, daha yavaş zorluk (22 Ekim 2026 gecesi).
- 5. paket: çizimsiz bölüm haritası, Geri düğmesi (22 Ekim 2026 gecesi).
- Kemal'in harita ve hız cevapları belgelere işlendi (öneri, Kemal birleştirince biter; 28 Ekim 2026).
- Bölüm sonunda dondurmacı fişin üstünde; 30 bölüm (11–30 zorluğu deneme); eski kayıt uyumu; harita resmi önceden yükleniyor (öneri, Kemal birleştirince biter; 29 Ekim 2026).
- Yayındaki oyundan gerçek ekran görüntüleri, `docs/ekran-goruntuleri/` (öneri, Kemal birleştirince biter; 3 Kasım 2026).
- Görsel iyileştirme, 1. küçük paket: düğmelerde ve sütunlarda dokunma geri bildirimi, üst şerit düğmeleri, Ayarlar seçenekleri, bölüm sonu "Bölümler" yazısı (öneri, Kemal birleştirince biter; 4 Kasım 2026).

## Bilinen eksikler

- Örnek oyunun ekran görüntüsü depoda yok; tarif yazılı anlatımdan.

## Yayından önce

- Can sistemi geldi (0.26). Canın parayla alınması gibi para modeli yayın döneminde konuşulacak.
- Oyunun son adı ("DK Lite" yayın adı mı, çalışma adı mı: [Kemal]).
- Denemeye özel kolaylıklar (erime biçimi düğmesi gibi) kalkar.
- Örnek oyuna benzerlik denetimi: görsel, karakter, ad, ekran düzeni birebir kopya değil.
- Bütün yazıların ve haritanın kanon ve marka denetimi (kanonda olmayan Düzada bilgisi yok).
- Mağaza ve dil seçenekleri: [Kemal].

## Kemal'in kararını bekleyenler

- Büyük paketin deneme sayıları: bölüm uzunluğu (müşteri sayısı, adet), sabır çubuğunun renk eşikleri, seri ek puanı (3. doğru gönderimden itibaren +2) (30 Ekim).
- Bölüm sonu fişindeki teşekkür satırının yazısı [Kemal] (30 Ekim).
- İki çeşit isteyen müşterilerin, tatlıların ve içeceklerin hangi bölümde başladığı: deneme değeri konacak, Kemal oynayıp söyler (29 Ekim).
- Oyunun son adı: "Dondurmacı Kızlar Lite" şimdilik çalışma adı (29 Ekim).
- Bölümlerin zorluk artışı: 22 Ekim'de yavaşlatıldı (adım yaklaşık yarıya indi); yeni tablo yine deneme, Kemal oynayıp söyler.
- Yıldız ölçüsü. Şimdilik deneme: puana göre (en yüksek olası puanın %70'i 2 yıldız, %90'ı 3 yıldız; kazanınca en az 1). Kemal (22 Ekim): "Sonra bakariz simdiki kalsin".
- Bir topun puanı (şimdilik deneme değeri 10; yalnız oranlar önemli olduğu için yıldızı etkilemez).
- Hangi sezon.
- Açıklama, fikir notları, karakter adları, ürün adları.
- Müzik.

## Kemal'e sorular

Açık soru yok. Yol yönü, Merkez, haritanın duruşu ve hızlandırma katı soruları kapandı (Kemal, 22 Ekim akşamı; tasarım belgesi 0.12).

Yıldız sorusu ertelendi (Kemal, 22 Ekim: "Sonra bakariz simdiki kalsin"); "Kemal'in kararını bekleyenler"de duruyor.

## Geçmiş notlar (eski "Neredeyiz")

5 Kasım 2026'ya kadar "Neredeyiz" bölümünde duran notlar, olduğu gibi.

- Arayüz dili: bütün arayüz (5 Kasım 2026, öneri; ilk adım PR #27 ile birleşti, kalanı `ajans/arayuz-tamami` önerisinde). Kemal Pinterest'teki DK Lite görselleriyle "yeni arayüz hazırlığına gir" dedi; ilk adımda yalnız düğmeler değişince "tüm arayüz için bir güncelleme bekliyordum", "logoyu da külahlı logo yap", arka planlar için "Desenli mor zemin" ve "Hepsi tek pakette" dedi. Ne değişti (oynanış, sayılar değişmedi): giriş ekranında Kemal'in külahlı logosu ve koyu mor desenli zemin; oyun ekranının arkası açık lila desenli zemin (deniz manzarası yerine); bütün düğmeler şişkin hap düğme (yeşil ilerle, krem ikinci iş, mor yuvarlak, kırmızı ✕); ayarlar ve duraklatma pencerelerinde mor başlık şeridi ve köşede kırmızı ✕; üst şeritte simgeli sayaçlar; kalın hatlı müşteri balonları ve sütunlar; bölüm sonu fişinde külahlı logo, büyük yıldızlar, ikonlu düğmeler; bölüm haritasında mor üst şerit ve kalın taşlar; pencereler zıplayarak açılır; Poppins yazı tipi oyunda. Not ve ekran ekran liste: `docs/arayuz-dili.md`; ekran görüntüleri: `docs/ekran/arayuz-dili/`. Telefonda denenmedi.
- Görsel iyileştirme, 1. küçük paket (4 Kasım 2026, öneri; Kemal: "sıradaki adım görsel iyileştirme"). Oynanış, sayılar ve yazılar değişmedi; yalnız görünüm. Ne değişti: bütün düğmeler (Başla, Bölümler, Devam et, Tekrar oyna, duraklatma menüsü, ayarlar seçenekleri, 2× ve duraklatma, Geri, haritadaki bölüm noktaları) basınca hafifçe aşağı iner, parmak kalkınca geri çıkar (önceden basınca hiçbir şey değişmiyordu); sütuna dokununca sütun kısa bir an sarı parlar ve hafifçe içe basılır (önceden yalnız ortadaki dondurmacı zıplıyordu); üst şeritteki 2× ve duraklatma düğmeleri öbür düğmeler gibi kalın kahverengi hatlı oldu; Ayarlar'da seçili seçenek artık kalınlaşıp iki satıra kaymıyor ("2 tur sonra" tek satır, üç seçenek aynı boyda); bölüm sonunda fişin altındaki "Bölümler" yazısı karartılmış zeminde daha okunur; telefonun üst çubuğu (Android) lila yerine tentedeki mor. Ekran görüntüleri: `docs/ekran-goruntuleri/gorsel-iyilestirme-04-11/`. Giriş ekranına dokunulmadı (Kemal Canva'da çizecek).
- Belge tutarlılığı (3 Kasım 2026, öneri): README ve tasarım belgesindeki eski bölüm sayıları düzeltildi; oyunda değişen yok (ürün resimlerine ad eklendi).
- Ekran görüntüleri (3 Kasım 2026, öneri): yayındaki oyundan gerçek ekran görüntüleri `docs/ekran-goruntuleri/` altında (telefon ve masaüstü; açılış, oynanış, bölüm sonu, bölüm haritası); liste `docs/ekran-goruntuleri/liste.json`. KKM'nin oyun sayfası bunları gösterecek. Oyunda değişen bir şey yok.
- Aşama: bölüm sonunda sevinen dondurmacı artık fişin üst kenarında duruyor, hiçbir ekran boyunda ekrandan taşmıyor ve logoyu kapatmıyor; bölüm sayısı 10'dan 30'a çıktı (Kemal: "bölümleri 30'a çıkarabilirsin"; 11–30. bölümlerin zorluğu DENEME); 10 bölümü bitirmiş eski kayıtlarda 11. bölüm açılıyor; bölüm haritası resmi önceden yükleniyor, resim gelmezse düz mavi yerine denizden çimene geçiş görünüyor (29 Ekim 2026, öneri; tasarım belgesi 0.22). Önceki: müşteriler tam boy çizildi, bacakları barın arkasında; müşteri sabrı 90 saniye (deneme); giriş ekranı için Kemal'in fikirlerini çizeceği Canva sayfası hazırlandı (https://canva.link/09dz2aegf2mlsc9) (30 Ekim, öneri; tasarım belgesi 0.21). Önceki: müşteriler belden yukarı görünüyor, barın arkası dikdörtgen (30 Ekim, PR #21 birleşti; tasarım belgesi 0.20). Önceki: müşteriler barın arkasına sığdı, bant ve bar üç boyutlu, arka plan bütün sayfaya yayıldı (30 Ekim, PR #20 birleşti; tasarım belgesi 0.20). Önceki: büyük paket öneri olarak geldi (30 Ekim; tasarım belgesi 0.18 cevaplar, 0.19 nasıl yapıldı): bandın içi ahşap kafe barı ve ortada hareketli dondurmacı; bölümler 1,5 kat uzun; müşteri sabrı (60 sn, 3 giden kaybettirir); kalp, uçan puan, seri ek puanı; fiş gibi bölüm sonu, konfeti, sevinen dondurmacı; çizgi film kutular; ayarlar (erime, titreşim); sahil yolu bölüm ekranı. Önceki: 7. paket öneri olarak geldi (30 Ekim; tasarım belgesi 0.17): ürünler, müşteriler, dondurmacı ve arka plan parlak çizgi film tarzında el çizimi; giriş ekranında logo ve "Lite". Önceki: görsel tarzı seçildi (Kemal, 30 Ekim: "Parlak çizgi film iyi"; tasarım belgesi 0.16): 6. paketteki Canva denemelerinden parlak çizgi film. Önceki: yeni diziliş ve yeni kurallar (29 Ekim gecesi, PR #15 birleşti; tasarım belgesi 0.15): tente, dükkândan dışarısı, müşteriler tezgâhın arkasında, ortada dondurmacı, tezgâh önünde logo; harflerin yerine dondurma çeşitleri, tatlılar ve içecekler; 6. bölümden iki çeşit isteyen müşteriler. Önceki: Kemal'le oyun ekranının yeni hâli için uzun soru turu yapıldı (29 Ekim; tasarım belgesi 0.14): örnek ekrandaki gibi diziliş, gerçek çeşitler, tatlılar ve içecekler, Dondurmacı Kızlar teması. Önceki: oyun ekranına Dondurmacı Kızlar görselleri kondu (29 Ekim, PR #13 birleşti; tasarım belgesi 0.13): müşteriler karakter resmi, bandın ortası tezgâh (külahlar, sundae, kasa), toplar dondurma topu gibi. Geçici; el çizimi görseller gelince değişir. Önceki: Kemal'in 22 Ekim akşamı harita ve hız cevapları belgelere işlendi (28 Ekim gecesi, öneri; oyunda ekran değişmedi): hızlandırma 2 kat kesin; yolun yönü, Merkez ve haritanın duruşu şimdiki gibi kalır. Önceki: 5. paket (çizimsiz bölüm haritası) ve gece işleri ana dala birleşti (PR #10, #11). Gece işleri (22 Ekim gecesi): Dondurmacı Kızlar ile aynı mor-sarı tonlar, giriş ekranı, duraklatma, 2 kat hızlandırma, ilk sürüm 10 bölüm ve daha yavaş artan zorluk. Önceki: 4. paket (numaralı bölümler; PR #9 birleşti, 22 Ekim). Deneme olarak 10 bölüm, her biri biraz daha zor; kaldığı bölüm ve yıldızlar telefonda saklanıyor; sade bir "Bölümler" listesi var. Ortak saklı sıra artık top top karışık; aynı çeşit art arda en çok 2 kez geliyor.
- Son biten: 5. paket (çizimsiz bölüm haritası) ve gece işleri (PR #10, #11 birleşti).
- Kararlar: DK Lite, Dondurmacı Kızlar'ın hafif sürümü; el çizimi 2D; mor-sarı; oynanış dönen bant ve sütunlar; bölüm haritası Düzada; ilk sürümde yalnız bölümler, yıldız ve harita.
- Sıradaki: Kemal giriş ekranı fikirlerini Canva sayfasına çizer; ekip ona göre giriş ekranını yapar. Kemal büyük paketi oynayıp söyler (bölüm uzunluğu, sabır, seri sayıları deneme). Sonra: ses ve nasıl oynanır gösterimi yayına yakın. İlk sürüm 10 bölüm (Kemal, 22 Ekim); 30'a çıkarıldı (29 Ekim 2026, tasarım belgesi 0.22). Kemal 11–30. bölümleri oynayıp zorluğu söyler. Yıldız ölçüsü şimdilik böyle kalıyor (Kemal: "Sonra bakariz simdiki kalsin").
- Yayın: tarih yok, acele yok.
