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

- Aşama: Tasarım kararları verildi (Kemal, 21 Ekim 2026). Kod yok.
- Son biten: tasarım belgesi ve yol haritası Kemal'in cevaplarıyla son hâlini aldı.
- Kararlar: DK Lite, Dondurmacı Kızlar'ın hafif sürümü; el çizimi 2D; mor-sarı; oynanış dönen bant ve sütunlar; bölüm haritası Düzada; ilk sürümde yalnız bölümler, yıldız ve harita.
- Sıradaki: 1. paket (öneri oyunu) başlayabilir.
- Yayın: tarih yok, acele yok.

## Nasıl ilerler (tek kişilik ekip için)

KKM dosyasındaki ilk risk "motivasyon düşer". Bunun için:
- Her paket küçük; tek oturumda anlatılıp tek PR'la gelir.
- Her paketin sonunda Kemal telefonda açıp oynayabileceği bir şey vardır.
- Bir paket bitmeden öbürüne geçilmez; yarım iş birikmez.
- Bir paket beğenilmezse geri dönmek kolaydır, çünkü küçüktür.
- Önce "eğlenceli mi?", sonra "güzel mi?": çizim ve ses oynanış oturduktan sonra gelir.

## İlk sürüm: paketler (sırayla)

İlk sürümde yalnız bölümler, yıldız ve harita var (Kemal, 21 Ekim).

### 1. Öneri oyunu (oynanabilir en küçük deneme)

- Ekran: tek ekran, dik.
- Oynanış: dönen bant ve sütunlar (Seçenek A). Altta sütunlar, ortada dönen bant, üstte müşteriler ve her birinin istediği. Sütuna dokunup tutunca en üstteki aynı çeşitler banda gider; istediği çeşit önünden geçen müşteri onu alır.
- Bölüm: tek bölüm. Bütün müşteriler karşılanınca "kazandın", bant dolarsa "baştan".
- Sütun ve müşteri sayısı: tasarım belgesi 7.1'deki önerilen aralıktan seçilir; karar değil, denerken değişir.
- Görsel: çizim yok; düz renkli kutular ve harfler. Renkler mor-sarı.
- Yok: erime, yıldız, harita, ses, kayıt.
- Nasıl denenir: Kemal telefonda bir bağlantıdan açar, birkaç kez oynar, "doğru his mi?" der.
- Kimde: Oyun Geliştiricisi; deneme Oyun Kontrolörü.

### 2. Erime kuralı

- İçerik: banda giden dondurma alınmazsa erir. Erimenin birkaç biçimi seçilebilir olur (ör. bir bant turu sonra); Kemal oynayıp seçer (Dondurmacı Kızlar'daki "öneri oyunu üzerinden konuşalım" kararı).
- Nasıl denenir: oyun içinde küçük bir düğmeyle biçimler arasında geçilir.
- Kimde: Oyun Geliştiricisi.

### 3. Sayaçlar ve bölüm sonu

- İçerik: üstte iki sayaç (karşılanan müşteri, bant doluluğu); bölüm sonunda yıldız ekranı, Tekrar oyna ve Devam et.
- Yıldızın ölçüsü Kemal'in kararına göre (açık soru).
- Kimde: Oyun Geliştiricisi.

### 4. Numaralı bölümler

- İçerik: elle hazırlanmış bölümler, her biri biraz daha zor; kaldığı bölüm ve yıldızlar telefonda saklanır. Bölüm sayısı Kemal'in kararı (açık soru).
- Nasıl denenir: Kemal baştan sona oynar, zorluk artışını söyler.
- Kimde: Oyun Geliştiricisi; bölüm denemesi Oyun Kontrolörü.

### 5. Bölüm haritası (çizimsiz)

- İçerik: Düzada'nın kaba biçimi üstünde kıvrılan yol, numaralı bölüm noktaları, kilitli olanlar, kazanılan yıldızlar, Git / Oyna.
- Yolun geçtiği mahalleler Kemal'in kararına göre (açık soru). Yalnız künyedeki yerler; künyede olmayan yer adı yazılmaz.
- Yok: can, altın, seviye, sandık, lig, festival, hediyeler.
- Kimde: Oyun Geliştiricisi.

### 6. Görsel dil denemesi

- İçerik: el çizimi 2D ve mor-sarı ile tek bir ekranın görsel denemesi: tezgâh, bir müşteri, bir sütun.
- Örnek oyunun görselleri, karakterleri ve adı kullanılmaz.
- Kimde: Asset Hazırlayıcı; oyuna yerleştirme Oyun Geliştiricisi.

### 7. Görsellerin oyuna girmesi

- İçerik: 6. pakette beğenilen dille oyun ekranı, bölüm sonu ve harita çizilir, kutuların yerine geçer.
- Harita Düzada'ya göre çizilir: zeytinlik, maki, kayalık, koylar, Ada Tepesi; yanardağ ve palmiye yok. Dükkân kanondaki yerinde (Liman, iskelenin yakını).
- Kimde: Asset Hazırlayıcı ve Oyun Geliştiricisi.

### 8. Ses

- İçerik: dokunma, gönderme, sipariş tamam sesleri; geçici lo-fi müzik. Kemal'in müziği gelince yerine geçer.
- Kimde: Asset Hazırlayıcı.

## Sonra (ilk sürümde yok; sırası Kemal'le)

- Can sistemi ve can bitince ne olacağı (Kemal'in can kararı Dondurmacı Kızlar deposunda; para modeli yayın döneminde).
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

## Bilinen eksikler

- Örnek oyunun ekran görüntüsü depoda yok; tarif yazılı anlatımdan.

## Yayından önce

- Can sistemi ve can bitince ne olacağı (para modeli; yayın döneminde konuşulacak).
- Oyunun son adı ("DK Lite" yayın adı mı, çalışma adı mı: [Kemal]).
- Denemeye özel kolaylıklar (erime biçimi düğmesi gibi) kalkar.
- Örnek oyuna benzerlik denetimi: görsel, karakter, ad, ekran düzeni birebir kopya değil.
- Bütün yazıların ve haritanın kanon ve marka denetimi (kanonda olmayan Düzada bilgisi yok).
- Mağaza ve dil seçenekleri: [Kemal].

## Kemal'in kararını bekleyenler

- Bölüm yolunun haritada geçtiği mahalleler.
- İlk sürümdeki bölüm sayısı.
- Yıldız ölçüsü.
- Erime biçimi (2. pakette oynayıp seçilir).
- Hangi sezon.
- Açıklama, fikir notları, karakter adları, ürün adları.
- Müzik.

## Kemal'e sorular

1. DK Lite: 1. paket (çizimsiz öneri oyunu) başlasın mı? Seçenekler: (a) evet, şimdi, (b) önce harita ve bölüm sorularını cevaplayayım.
2. DK Lite: Paketlerin sırası uygun mu: önce çizimsiz oynanış ve harita (1–5), sonra görsel ve ses (6–8)? Seçenekler: (a) uygun, (b) harita daha önce gelsin, (c) başka bir sıra.
