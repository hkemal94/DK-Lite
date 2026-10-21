# DK Lite · Yol haritası (taslak)

Taslağı yazan: Oyun Şefi (Kems Ajans), 21 Ekim 2026. Onay Kemal'in.
Kemal onaylayınca yeni oyun deposuna `docs/yol-haritasi.md` olarak taşınır;
KKM'nin oyun sayfası onu oradan okur. Kararların ayrıntısı tasarım belgesi
taslağında: `docs/tasarim-belgesi.md`.

Ne istendi: Dondurmacı Kızlar yol haritasının biçiminde, küçük ve sıralı
paketlerle bir yol haritası. Bakılan kaynaklar: Kemal'in KKM oyun dosyası
(21 Ekim, PDF), iş tarifi, Dondurmacı Kızlar deposunun `docs/yol-haritasi.md`
ve `docs/soru-cevap/acik-isler-1.md` dosyaları. Ulaşılamayan kaynak yok;
örnek oyunun ekran görüntüsü depoda olmadığı için yalnız yazılı tarifi
kullanıldı.

Tarih ve süre yazılmadı (KKM'de takvim: belirsiz). Sıra önerisi Oyun
Şefi'nin; Kemal "şimdi" demedikçe işler bu sırayla gider.

## Neredeyiz

- Aşama: Tasarım. Kod yok, depo yok.
- Son biten: Kemal'in KKM oyun dosyası (21 Ekim); bu iki taslak.
- Şu an: Kemal'in iki taslağa bakması ve üç sorunun cevabı bekleniyor.
- Sıradaki: Kemal yeni depoyu açar, taslaklar oraya taşınır, sonra 1. paket.
- Yayın: tarih yok, acele yok.

## Nasıl ilerler (tek kişilik ekip için)

KKM dosyasındaki ilk risk "motivasyon düşer". Bunun için:
- Her paket küçük; tek oturumda anlatılıp tek PR'la gelir.
- Her paketin sonunda Kemal telefonda açıp oynayabileceği bir şey vardır.
- Bir paket bitmeden öbürüne geçilmez; yarım iş birikmez.
- Bir paket beğenilmezse geri dönmek kolaydır, çünkü küçüktür.
- Çizim, ses ve hikâye en sona değil, oynanış oturduktan sonraya kalır: önce "eğlenceli mi?", sonra "güzel mi?".

## Paketler (sırayla)

### 1. Öneri oyunu (oynanabilir en küçük prototip)

- İçerik: tek ekran, dik. Altta 3 sütun, ortada gönderme alanı (Kemal'in seçtiği seçenek: A dönen bant ya da B envanter tepsisi; istenirse ikisi yan yana), üstte 2 müşteri ve istedikleri. Tek bölüm. Bitince "kazandın / baştan".
- Görsel: çizim yok; düz renkli kutular ve harfler. Renkler marka paletinden.
- Yok: erime, can, ses, kayıt, hikâye.
- Nasıl denenir: Kemal telefonda bir bağlantıdan açar, birkaç kez oynar, "doğru his mi?" der.
- Kimde: Oyun Geliştiricisi; deneme Oyun Kontrolörü.

### 2. Erime kuralı

- İçerik: erimenin iki biçimi seçilebilir olur: saatle (bir tur sonra) ve hamleyle (birkaç hamle sonra). Kemal ikisini oynayıp seçer (Dondurmacı Kızlar'daki "öneri oyunu üzerinden konuşalım" kararı).
- Nasıl denenir: oyun içinde küçük bir düğmeyle iki biçim arasında geçilir.
- Kimde: Oyun Geliştiricisi.

### 3. Sayaçlar ve bölüm sonu

- İçerik: üstte iki sayaç (tasarım belgesi 3.1), bölüm sonunda yıldız ekranı. Yıldızın ölçüsü Kemal'in kararına göre.
- Kimde: Oyun Geliştiricisi.

### 4. Numaralı bölümler

- İçerik: bölüm seçim ekranı; elle hazırlanmış birkaç bölüm (sayısı Kemal'le, öneri 3–10), her biri biraz daha zor; kaldığı bölüm telefonda saklanır.
- Nasıl denenir: Kemal baştan sona oynar, zorluk artışını söyler.
- Kimde: Oyun Geliştiricisi; bölüm denemesi Oyun Kontrolörü.

### 5. Görsel dil denemesi

- İçerik: Kemal'in cevabına göre (el çizimi 2D ya da düşük poligon 2D) tek bir ekranın görsel denemesi: tezgâh, bir müşteri, bir sütun. Palet kararı burada görünür.
- Örnek oyunun görselleri, karakterleri ve adı kullanılmaz.
- Kimde: Asset Hazırlayıcı; oyuna yerleştirme Oyun Geliştiricisi.

### 6. Görsellerin oyuna girmesi

- İçerik: 5. pakette beğenilen dille oyunun bütün parçaları çizilir ve kutuların yerine geçer.
- Kimde: Asset Hazırlayıcı ve Oyun Geliştiricisi.

### 7. Ses

- İçerik: dokunma, gönderme, sipariş tamam sesleri; geçici lo-fi müzik. Kemal'in müziği gelince yerine geçer.
- Kimde: Asset Hazırlayıcı.

### 8. Başarımlar ve koleksiyon

- İçerik: başarım ve koleksiyon sayfaları; Kemal'in seçtiği şeyler için boş yuvalar. Adlar ve içerik [Kemal].
- Kimde: Oyun Geliştiricisi.

### 9. Hikâye bölümleri

- İçerik: belirli bölümler geçilince açılan hikâye sayfası. Metinler Kemal'in; gelene kadar yer tutucu.
- Kimde: Oyun Geliştiricisi. Metin: Kemal.

### 10. Kısmi seslendirme

- İçerik: Kemal'in seçtiği satırlar seslendirilir. Hangi satırlar ve kim seslendirecek [Kemal].
- Kimde: Asset Hazırlayıcı.

### Sonra (sırası Kemal'le)

- "Sonu yok": elle yapılmış bölümler bitince ne olacağı.
- Can sistemi (denemede yok; Kemal'in kararı Dondurmacı Kızlar deposunda).
- Seçenek C (hazırla ve ver) yeni bir bölüm türü olarak.

## Bitenler

- Kemal'in KKM oyun dosyası (21 Ekim 2026).
- Tasarım belgesi ve yol haritası taslakları (bu iki dosya, 21 Ekim 2026). Kod yok.

## Bilinen eksikler

- Depo yok; Kemal açacak.
- Örnek oyunun ekran görüntüsü depoda yok; tarif yazılı anlatımdan.

## Yayından önce

- Can sistemi ve can bitince ne olacağı (para modeli; yayın döneminde konuşulacak).
- Oyunun son adı (KKM'de "DK Lite"; yayın adı mı, çalışma adı mı: [Kemal]).
- Denemeye özel kolaylıklar (erime biçimi düğmesi gibi) kalkar.
- Örnek oyuna benzerlik denetimi: görsel, karakter, ad, ekran düzeni birebir kopya değil.
- Bütün yazıların kanon ve marka denetimi (kanonda olmayan Düzada bilgisi yok).
- Mağaza ve dil seçenekleri: [Kemal].

## Kemal'in kararını bekleyenler

- "DK" Dondurmacı Kızlar mı; DK Lite onun hafif sürümü mü.
- Görsel stil: el çizimi 2D mi, düşük poligon 2D mi; palet: marka paleti mi, mor-sarı mı.
- İlk prototipte hangi oynanış seçeneği (A, B ya da ikisi yan yana).
- Hangi mekân, hangi sezon.
- Açıklama, fikir notları, mekânın adı, karakter adları, ürün adları, hikâye metinleri.
- Yıldız ölçüsü, hikâye bölümlerinin sıklığı, koleksiyon ve başarımların içeriği.
- Seslendirilecek satırlar; müzik.
- Deposu (Kemal açar).

## Kemal'e sorular

1. "DK" Dondurmacı Kızlar mı ve DK Lite onun hafif sürümü mü? Evetse "tek bir mekân" Liman'daki Dondurmacı Kızlar dükkânı mı?
2. Paketlerin sırası uygun mu: önce çizimsiz oynanış (1–4), sonra görsel ve ses (5–7), en son hikâye ve seslendirme (8–10)?
3. Yeni depoyu ne zaman açmayı düşünürsün; açılınca 1. paketle mi başlayalım?
