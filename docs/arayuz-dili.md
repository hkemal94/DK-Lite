# DK Lite · Arayüz dili (öneri)

Yazan: Oyun Tasarımcısı (Kems Ajans). Onay Kemal'in. Bu not bir öneridir;
Kemal onaylayana kadar karar değildir. Renkler ve görsel tarz tasarım
belgesine bağlıdır (bölüm 6 ve 0.16): parlak çizgi film, kalın hat, mor-sarı.

Ne istendi (5 Kasım 2026, Kemal; CEO iletti): "Pinterest'te DK Lite için menü
ve asset görselleri yükledim, onlarca. Butonlar falan da var gölgeli böyle.
Yan bir konuşmada yeni arayüz hazırlığına gir."

Bakılan kaynaklar:
- Kemal'in herkese açık "Games" panosu, "DK Lite" bölümü
  (https://www.pinterest.com/hkemal94/games/dk-lite/). Panonun öbür iki bölümü
  ("Dondurmacı Kızlar", "The Imperial Kemsköy") yalnız göz atıldı, örnek alınmadı.
- Bu deponun tasarım belgesi ve yol haritası.
- Bugünkü oyun: telefon boyutunda (390x844) ekran görüntüleri,
  `docs/ekran/arayuz-dili/once-*.png`.

Ulaşılamayan / eksik:
- Panonun "DK Lite" bölümünde **9 görsel** göründü (Kemal "onlarca" demişti).
  Daha fazlası başka bir panoda ya da bölümdeyse bağlantısı gerekir.
- Ajans deposundaki Pinterest aracı (`araclar/pinterest.py`) bu oturumda
  açılamadı (depo eklenemedi); görseller panonun herkese açık sayfasından
  alındı, depoya girmedi.

## Kemal'in cevapları (5 Kasım 2026; sohbette soru turu)

- İlk adım: "Düğme + giriş (Önerilen)".
- Düğme renkleri: "Yeşil ve kırmızı da olsun" (önerilen yalnız mor-sarı-krem idi).
  Bu yüzden aşağıdaki 1. bölümdeki renk anlamı böyle düzeldi: **yeşil = oyna /
  ilerle**, **kırmızı = kapat / vazgeç**, krem = ikinci iş, sarı = tamam,
  mor = küçük yuvarlak düğmeler ve seçili seçenek.
- Yazı tipi: "Evet, ilk adımla" (Poppins oyuna eklendi).
- Pencerelerde kapatma: "Köşede ✕ (Önerilen)" (2. adımda gelecek).

## Kural

Panodaki görseller başka oyunların ve hazır çizim setlerinin ekranları. Onların
çizimi, logosu, karakteri, adı, yazıları DK Lite'a **alınmaz**. Buradan alınan
yalnız üslup: düğmenin nasıl bir "kalınlıkta" durduğu, pencerenin nasıl
düzenlendiği, renk ile yazının nasıl eşleştiği. Her parça DK Lite'ın kendi
renkleriyle ve kendi çizgi film hattıyla yeniden yapılır.

## Panoda ne var (kısaca, tür düzeyinde)

| # | Ne gösteriyor | DK Lite için ne işe yarar |
|---|---|---|
| 1–2 | Düz renkli zeminde bölüm sonu penceresi (iki kez yüklenmiş) | Sade bölüm sonu düzeni; büyük kare ikonlu düğmeler |
| 3 | Kırk kadar mobil oyunun açılış (yükleme) ekranı | Açılış düzeni: logo üstte, yükleme çubuğu altta |
| 4 | Ev sahnesinde ana menü | Ana menü düzeni: büyük oyna düğmesi altta ortada, yanlarda yuvarlak ikonlar |
| 5 | Bir çizim setinin pencereleri (mağaza, etkinlik, devam et) | Pencere iskeleti: şerit başlık, köşede kapat |
| 6 | Bölüm haritası | Yuvarlak, kalın tabanlı bölüm taşları; üstte yıldızlar |
| 7 | Hazır arayüz parçaları seti (şerit, düğme, kart) | Düğme ve şerit biçimleri |
| 8 | Hazır parçalar (parlak düğmeler, ikonlar) | Parlak, şişkin düğme yüzeyi |
| 9 | Krem çerçeveli renkli hap düğmeler ve yuvarlak ikon düğmeler | DK Lite'a en yakın: krem kenar + koyu yazı + sıcak renkler |
| 10 | Pencereler, madalyalar, sayaç hapları, küçük ikon düğmeler | Sayaç hapı, bölüm sonu kurdelesi |

## Arayüz dili

### 1. Düğme

Panonun neredeyse her görselinde aynı düğme: **şişkin, kalın tabanlı, parlak.**
DK Lite'ta bugün düğmeler düz sarı, kalın kahverengi hatlı, altında yarı saydam
kahverengi bir gölge var. Önerilen:

- **Biçim:** iki ucu tam yuvarlak "hap" (geniş düğmeler) ya da çok yuvarlak köşeli
  dikdörtgen. Yuvarlak düğmeler (ayarlar, duraklatma, geri) tam daire.
- **Kalınlık (gölge):** düğmenin altında, düğmenin **kendi renginin koyu tonunda**
  kalın bir taban (yaklaşık 5–6 piksel). Düğme kalın bir şekerleme gibi durur.
  Bugünkü kahverengi yarı saydam gölge yerine bu.
- **Parlaklık:** üst yarıda ince, açık renkli bir ışık şeridi (yüzey şişkin görünsün).
- **Hat:** dışta bugünkü koyu kahverengi kalın hat kalır (çizgi film tarzı, 0.16).
- **Basınca:** düğme tabanının içine iner (taban incelir), parmak kalkınca çıkar.
  Bugünkü basma hareketi aynı mantık, yalnız daha belirgin.
- **Renk anlamı:** her rengin tek işi olsun, oyuncu rengi okuyunca ne olacağını bilsin.
  - **Yeşil** (yazı beyaz): oyna / ilerle. Başla, Devam et. (Kemal, 5 Kasım: "Yeşil ve kırmızı da olsun".)
  - **Kırmızı** (yazı beyaz): kapat / vazgeç. Pencerenin köşesindeki ✕ (2. adım).
  - **Sarı** (`#ffc928`): tamam. Bugün ayarlardaki "Kapat"; seçili seçenek.
  - **Krem** (`#fffaf0`): ikinci iş. Bölümler, Tekrar oyna, Baştan başla.
  - **Mor** (`#7a3fa8`, yazı beyaz): küçük yuvarlak ikon düğmeler.
  - Yeşil ve kırmızının tonları taslak; ekranın ağırlığı yine mor-sarı. Mavi eklenmez.
- **Yazı:** kalın (Poppins kalın), koyu mor; mor düğmede beyaz. Büyük harf zorunlu değil.

### 2. Pencere (kutu)

Ayarlar, duraklatma ve (fiş dışında) bütün açılır kutular aynı iskeleti kullanır:

- Krem kart, kalın kahverengi hat, büyük yuvarlak köşe, altında kalın koyu taban
  (düğme gibi, kart da "kalın" durur).
- **Başlık şeridi:** kartın üst kenarına binen mor bir şerit (kurdele ya da hap);
  içinde başlık beyaz ve kalın ("Ayarlar", "Duraklatıldı" gibi; bugünkü yazılar).
- **Kapat:** sağ üst köşede, kartın kenarına taşan küçük kırmızı yuvarlak düğme (✕);
  alttaki "Kapat" düğmesi kalkar (Kemal, 5 Kasım: "Köşede ✕").
- İçerik bölmeleri: seçenek grupları açık zeminli, hafif içe gömük kutularda.
- Karartma: arka plan bugünkü gibi karartılır.

### 3. İkon

- Yuvarlak düğmenin içinde **tek renk, dolu, yuvarlak uçlu** basit şekil
  (dişli, iki çizgi, ok, ↻, ▶, ✕). Çizgi film hattıyla uyumlu kalın şekiller.
- İnce çizgili, gerçekçi ya da parlak üç boyutlu ikon yok.
- İkonlar elde çizilir (SVG); hazır set ya da başka oyunun ikonu kullanılmaz.

### 4. Sayaçlar (oyun içi üst şerit)

- Her sayaç bir **hap**: solunda hapın dışına biraz taşan yuvarlak simge
  (müşteri, puan, bant), sağında değer büyük ve kalın.
- Bugünkü çok küçük etiket yazıları ("Müşteri", "Puan", "Bant") simgeye dönüşür;
  okunurluk artar.

### 5. Menü düzeni

- **Giriş (ana menü):** logo üstte; altta ortada büyük sarı ana düğme
  (bugün "Başla"), altında daha küçük krem "Bölümler"; sağ üstte yuvarlak
  ayarlar düğmesi. Bugünkü düzen zaten buna yakın; değişen düğme yüzü.
  Ana düğmenin üstünde kaldığın bölüm ve yıldızlar: Canva'daki öneri (0.21),
  Kemal'in çizimi bekleniyor.
- İlk sürümde yan ikonlar (günlük ödül, mağaza gibi) ve alt sekme çubuğu
  **yok** (tasarım belgesi 4.1: sonra). Panoda görülen bu düzen ileride
  dükkânım / etkinlikler gelince düşünülür.
- **Açılış (yükleme) ekranı:** panoda çok örnek var; DK Lite'ta bugün yok.
  Gerekirse: logo ortada üstte, yükleme çubuğu alt üçte birde. Önerilmiyor,
  oyun hızlı açılıyor; [Kemal] isterse.

### 6. Bölüm sonu

- Kâğıt fiş kalır (Kemal'in seçimi, 0.18). Arayüz dilinden alınan yalnız:
  fişin altındaki düğmeler yeni düğme yüzünde; "Tekrar oyna" ve "Devam et"
  yazının yanında ↻ ve → ikonları.
- Yıldızlar büyük, hafif yay çizerek dizilir (ortadaki biraz yukarıda).

### 7. Bölüm haritası

- Bölüm noktaları: yuvarlak taş, altında kalın koyu taban (düğme gibi).
  Geçilmiş mor, sıradaki sarı ve hafif büyüyüp küçülür, kilitli soluk krem.
- Yıldızlar taşın üstünde küçük bir yay.
- Bugünkü harita bu yöne yakın; değişen taban kalınlığı ve sıradakinin işareti.

### 8. Yazı ve renk ilişkisi

- Yazı tipi: Poppins (tasarım belgesi 6). Bu nota kadar oyuna yüklenmiyordu,
  telefon kendi yazısını gösteriyordu; Kemal'in onayıyla 1. adımda oyunun içine
  eklendi (açık lisanslı; `docs/lisanslar.md`).
- Başlıklar kalın (700–800), düğme yazısı kalın (700), gövde yazısı orta (500–600).
- Koyu mor yazı krem ve sarı üstünde; beyaz yazı mor üstünde. Sarı üstüne
  beyaz yazı yazılmaz (okunmaz).

### 9. Geçişler

Panodaki görseller durağan; hareket onlardan okunamaz. Öneri (çizgi film tarzına uygun, kısa):
- Pencere açılırken küçükten biraz büyüyüp yerine oturur (zıplama), çok kısa.
- Kapanırken hızla küçülüp kaybolur.
- Bölüm sonu yıldızları bugünkü gibi sırayla.
- Ekranlar arası (giriş → oyun → harita) yumuşak kararma.

## Bugünkü arayüzle karşılaştırma

Ekran görüntüleri: `docs/ekran/arayuz-dili/once-*-390x844.png`.

| Ekran | Bugün | Arayüz diliyle |
|---|---|---|
| Giriş | Düz sarı "Başla", krem "Bölümler"; ayarlar dişlisi beyaz daire | Şişkin, kalın tabanlı hap düğmeler; mor yuvarlak ayarlar düğmesi |
| Ayarlar | Düz başlık, beyaz seçenekler, seçili sarı; altta "Kapat" | Mor şerit başlık, köşede ✕; seçili seçenek mor, beyaz yazı |
| Oyun içi üst şerit | Çok küçük etiketli yazı sayaçlar; beyaz yuvarlak 2× ve duraklatma | Simgeli sayaç hapları; mor yuvarlak ikon düğmeler |
| Duraklatma | Krem kutu, üç düğme, başlık yok | Mor şerit başlık; sarı "Devam et", krem öbürleri |
| Bölüm sonu | Fiş; altında sarı ve krem düğmeler, alt satırda "Bölümler" yazısı | Fiş aynı; düğmeler yeni yüzde, ↻ ve → ikonlu |
| Bölüm haritası | Krem üst şerit, "Geri" hap düğmesi, yuvarlak noktalar | Yuvarlak ← düğmesi, kalın tabanlı taşlar, sıradakinde işaret |

## Öneri planı (sırayla; her adım ayrı küçük PR)

Oynanış, sayılar ve yazılar hiçbir adımda değişmez; yalnız görünüm.

1. **Ortak düğme yüzü + giriş ekranı.** Bütün düğmeler tek bir ortak biçimden
   gelir (yeşil, kırmızı, sarı, krem, mor; hap ve yuvarlak). İlk görünen yer giriş ekranı.
   Öbür ekranlardaki düğmeler de aynı yüze kendiliğinden geçer.
   **Yapıldı (5 Kasım 2026, öneri PR'ı; Poppins da bu adımda).** Ekran görüntüleri:
   `docs/ekran/arayuz-dili/sonra-*.png`.
2. **Ortak pencere: ayarlar ve duraklatma.** Şerit başlık, köşede ✕, kalın taban.
3. **Oyun içi üst şerit.** Simgeli sayaç hapları, mor yuvarlak ikon düğmeler.
4. **Bölüm sonu.** Fişin düğmeleri ikonlu; yıldızlar yay.
5. **Bölüm haritası.** Kalın tabanlı taşlar, sıradakinin işareti, yuvarlak geri.
6. **Geçişler.** Pencere zıplayarak açılır, ekranlar arası kararma.
7. **Yazı tipi.** Poppins oyunun içine eklendi (Kemal: "ilk adımla"; 1. adımla birlikte yapıldı).

Giriş ekranının büyük değişikliği (dondurmacı, deniz, logo hareketi) Kemal'in
Canva çizimini bekliyor (0.21); bu plan yalnız düğme yüzünü değiştirir.
