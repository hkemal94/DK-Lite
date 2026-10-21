# DK Lite — Oyun Tasarım Belgesi

**Proje:** DK Lite (Kems Company)
**Aşama:** Tasarım kararları verildi (Kemal, 21 Ekim 2026). Kod yok.
**Depo:** `hkemal94/DK-Lite`
**Yazan:** Oyun Şefi (Kems Ajans). Onay Kemal'in.
**Yol haritası:** `docs/yol-haritasi.md`

Ne istendi (21 Ekim 2026): belgeyi Kemal'in panodaki üç cevabıyla son hâline
getirmek. Kod yok.

Bakılan kaynaklar:
- Kemal'in panodaki cevapları (21 Ekim 2026; CEO iletti)
- Kems-Ajans deposunda `isler/dk-lite/kkm-oyun-dosyasi-21-10-2026.pdf` ve `isler/dk-lite/is-tarifi.md` (ilk taslakta okundu)
- KKM: `docs/02-marka-kiti.md`, `docs/03-duzada-kunyesi.md`
- Dondurmacı Kızlar deposu: `CLAUDE.md`, `docs/tasarim-belgesi.md` (yalnız okundu)
- Kemal'in taslak ekranları: `docs/gorseller/kemal-taslak/`

Ulaşılamayan: örnek oyunun (Tasty Travels) ekran görüntüsü depoda yok;
yalnız iş tarifindeki yazılı anlatım kullanıldı.

Okuma kuralı: "[Kemal]" yazan yer Kemal'in dolduracağı boş alandır. "Öneri"
yazan her şey seçenektir, karar değildir. Hiçbir ad, slogan ya da hikâye
yazılmadı. Dondurmacı Kızlar oyununun ayarları (fiyat, süre, oran) buraya
taşınmadı. Bölüm 0 belgenin geri kalanıyla çelişirse bölüm 0 geçerlidir.

---

## 0. Kararlar

En yeni karar en üstte. Çelişen yerde 0.4 geçerlidir.

### 0.4 Tasarım kararları (Kemal, 21 Ekim 2026; panodaki soru turu)

Kemal'in cevapları kesin. Önceki taslakta "Kemal onaylarsa" diye duran
maddeler bununla kesinleşti.

- **Oyun:** DK Lite, Dondurmacı Kızlar'ın hafif sürümüdür. ("Evet, hepsi kesin.")
- **Görsel stil:** el çizimi 2D. Düşük poligon değil. KKM dosyasındaki "Düşük poligon 2D" satırı geçersiz.
- **Palet:** dükkânın mor ve sarı renkleri (kanondaki logo renkleri; tonlar taslak).
- **Oynanış:** Seçenek A — dönen bant ve sütunlar (bölüm 3).
- **Bölüm haritası:** Düzada'ya uyarlanır (Kemal: "Ege: zeytin, kayalık, koylar"). Taslak ekrandaki yanardağ ve palmiyeler çıkar. Haritada yalnız künyede yazan gerçek yerler, künyede yazdığı kadarıyla kullanılır; künyede olmayan yer adı uydurulmaz, gerekirse [Kemal]. Ayrıntı bölüm 2.3.
- **İlk sürüm:** yalnız bölümler, yıldız ve harita (Kemal: "gerisi sonra"). Can, lig, festival, sandık, market, altın ve deneyim ilk sürümde yok; "Sonra" listesine taşındı (bölüm 4.1).

Bu kararlardan çıkanlar (şefin notu; yeni karar değil, kararların sonucu):
- **Mekân:** DK Lite Dondurmacı Kızlar'ın hafif sürümü olduğu için "tek bir mekân" Dondurmacı Kızlar dükkânıdır. Kanondaki yeri Liman Mahallesi, iskelenin yakını. Taslak ana ekrandaki "sahilde ahşap dükkân" kanona göre çizilir.
- **Ana oyunla ortak görseller:** 0.2'deki "görseller ana oyunla ortak" maddesi bu kararla daralır. Ana oyun 3B düşük poligon, DK Lite el çizimi 2D; ana oyunun modelleri doğrudan kullanılamaz. Ortak kalan: dükkân, mor-sarı renkler ve kanon.
- **Palet ve marka:** KKM dosyasındaki "marka paleti (lacivert, kiremit, krem)" oyunun ağırlıklı rengi değil. Yazı tipi önerisi Poppins sürüyor (bölüm 6).

### 0.1 Kemal'in KKM oyun dosyasında doldurdukları (21 Ekim 2026, olduğu gibi)

Künye ve konsept:
- Ad: DK Lite
- Tür: Bulmaca
- Platform: Mobil
- Hedef oyuncu: Sakin, rahat oynayan
- Oyuncu sayısı: Tek oyunculu
- Düzada'da nerede: Tek bir mekân
- Zaman aralığı: Tek bir sezon
- Kamera: 2D yandan
- Görsel stil: El çizimi 2D
- Oyun süresi: Sınırsız
- Takvim: Belirsiz
- Ekip: Tek kişi
- Özet: boş [Kemal]
- Açıklama: boş [Kemal]
- Tek cümlelik özet: Kaynak seçiminden sipariş karşılama

Karakterler:
- Oyuncu kim: Adsız, oyuncunun kendisi

Mekanikler ve notlar:
- Bir oturum: 5–10 dakika
- Zaman nasıl akar: Bölüm bölüm
- Ana mekanikler: Envanter
- Kontrol: Dokunmatik

İlerleme ve ödül:
- Oyuncu ne kazanır: Hikâye bölümleri açılır, Başarımlar, Koleksiyon
- Oyunun sonu: Sonu yok (açık uçlu)

Görsel dil:
- Görsel stil: El çizimi 2D
- Palet: Marka paleti (lacivert, kiremit, krem) — 0.4 ile mor-sarıya döndü
- Ayrı bir satırda: "Düşük poligon 2D" — 0.4 ile geçersiz

Ses:
- Müzik: Lo-fi
- Seslendirme: Kısmi

Riskler:
- Motivasyon düşer, Finansman

Boş bırakılanlar:
- Fikir notları: boş [Kemal]
- Yapım aşaması ve işler: boş [Kemal]

### 0.2 Dondurmacı Kızlar deposunda geçen DK Lite kararları (21 Ekim 2026)

Dondurmacı Kızlar deposunun açık işler soru turunda (belge bölüm 0.16)
Kemal'in verdiği cevaplar:

- Ayrı küçük oyun; kendi bağlantısı var, görseller ana oyunla ortak (0.4 ile daraldı, yukarıda).
- Dik ekran, 2B çizim.
- Numaralı bölümler; her bölüm biraz daha zor, yıldız var.
- Oynanış: "Raftan gönder"; örnek Tasty Travels (adı ve görselleri kanon değil).
- Dondurma erir: "eriyen dondurma bir tur sonra yok olur". Kuralı öneri oyunu üzerinden konuşulacak.
- Can sistemi var (ana oyundan farklı); sayıları o soru turunda yazılı. Denemede can yok; 0.4 ile ilk sürümde de yok.
- Can bitince ne olacağı (bekleme ya da reklam) yayın döneminde konuşulacak.
- Depo: açıldı (`hkemal94/DK-Lite`).

### 0.3 Kemal'in taslak ekranları (21 Ekim 2026 akşam)

Kemal dört taslak ekran paylaştı (`docs/gorseller/kemal-taslak/`). Bunlar
yön gösteren taslaklardır; içlerindeki sayılar (altın, puan, can, bölüm
sayısı) ve İngilizce etiketler karar değildir. 0.4'e göre ilk sürüme giren
ve girmeyen parçalar her ekranın altında yazılı.

- **Ana ekran:** "Dondurmacı Kızlar" yazısı, sahilde ahşap dükkân, mor-sarı
  çizgili tente, önde önlüklü dondurmacı kız; OYNA düğmesi; Dükkânım,
  Etkinlikler; altta Ayarlar, Bilgi/Galeri, Ekip, Market. Üstte gün ve saat,
  seviye, altın.
  - İlk sürümde: oyuna giriş (OYNA). Dükkân kanondaki yerine göre çizilir (Liman, iskelenin yakını).
  - Sonra: Dükkânım, Etkinlikler, Ekip, Market, Bilgi/Galeri, seviye, altın, gün ve saat.
- **Oyun ekranı:** üstte beş müşteri, her birinin konuşma balonunda istediği
  çeşitler ve adetleri; ortada dondurmacı kızın durduğu yuvarlak tezgâh ve
  çevresinde dönen bant; altta beş sütun, her sütunda külah üstünde aynı
  çeşit toplar, altlarında pasta ve başka tatlılar. İki sayaç (karşılanan /
  toplam ve bir ilerleme çubuğu). Köşede "Dondurmacı Kızlar Lite" simgesi.
  - Seçenek A'nın ekranı; ilk sürümün asıl ekranı.
- **Bölüm sonu:** "Bölüm tamamlandı", üç yıldız, kazanılanlar (altın ve
  yeni bir malzeme, ör. çilek sosu), deneyim çubuğu; Tekrar oyna, Devam et.
  - İlk sürümde: yıldız, Tekrar oyna, Devam et.
  - Sonra: altın, yeni malzeme, deneyim çubuğu.
- **Bölüm haritası:** adada yukarı kıvrılan yol üstünde numaralı bölümler,
  kilitli olanlar, sandıklar; üstte can, altın, seviye; yanda Lig ve
  Festival; altta Hediyeler, Dükkân, Git / Oyna.
  - İlk sürümde: Düzada haritası, kıvrılan yol, numaralı bölümler, kilitli olanlar, kazanılan yıldızlar, Git / Oyna.
  - Sonra: sandık, can, altın, seviye, Lig, Festival, Hediyeler, Dükkân.
  - **Düzada'ya uyarlanacak:** yanardağ ve palmiyeler çıkar; tropik bitkiler, şelale ve saz damlı kulübeler de künyede olmadığı için çıkar. Yerine bölüm 2.3'teki kanon doğası gelir.

![Ana ekran](gorseller/kemal-taslak/1-ana-ekran.jpg)

![Oyun ekranı](gorseller/kemal-taslak/2-oyun-ekrani.jpg)

![Bölüm sonu](gorseller/kemal-taslak/3-bolum-sonu.jpg)

![Bölüm haritası](gorseller/kemal-taslak/4-bolum-haritasi.jpg)

## 1. Oyunun özeti ve vizyonu

### 1.1 Tek cümlelik özet

Kaynak seçiminden sipariş karşılama. (Kemal'in cümlesi, olduğu gibi.)

Açıklama: [Kemal]

### 1.2 Temel tasarım sütunları (öneri, Kemal'in alanlarından çıkarıldı)

Yeni bilgi eklenmedi; Kemal'in doldurduğu alanlar üç başlıkta toplandı.

- **Sakin bulmaca:** hedef oyuncu "sakin, rahat oynayan". Zorluk acele etmekten değil, doğru sırayı düşünmekten gelir.
- **Kısa oturum:** bir oturum 5–10 dakika; oyun bölüm bölüm akar, her bölüm tek oturuma rahat sığar.
- **Biriktirme hissi:** sonu yok; ilk sürümde oyuncu yıldız biriktirir ve haritada ilerler. Hikâye bölümleri, başarımlar ve koleksiyon sonra gelir.

---

## 2. Ekranlar ve oynanış senaryoları

### 2.1 Örnek oyundaki kalıp (yalnız tür ve oynanış örneği)

Kemal'in paylaştığı örnek (Tasty Travels) şöyle çalışıyor. Görseli,
karakterleri ve adı DK Lite'a alınmaz; yalnız oynanış kalıbı örnektir.

- **Müşteriler (üstte):** tezgâhın çevresinde müşteriler. Her birinin üstünde istediği ürün ve kaç tane istediği yazar.
- **Bant (ortada):** tezgâhın önünde dönen bir bant. Oyuncunun gönderdiği malzemeler bantta döner; isteyen müşteri kendi istediğini banttan alır.
- **Sütunlar (altta):** dikey sütunlar; her sütunda malzemeler üst üste dizili. Oyuncu bir sütuna dokunup tutunca o sütunun en üstündeki aynı türden malzemeler birlikte banda gider.
- **Sayaçlar (en üstte):** iki sayaç. Ne saydıkları yazılı tariften kesin okunmuyor; tahmin: biri karşılanan sipariş, öbürü kalan malzeme ya da bant doluluğu.

Bulmacanın özü: sütunların en üstü her an görünür ama altı kapalıdır. Oyuncu
yanlış sütunu açarsa bant istenmeyen malzemeyle dolar. Sakin ama düşündüren
bir "hangi sırayla?" sorusu.

### 2.2 İlk sürümün ekranları

- **Bölüm haritası:** Düzada; yol üstünde numaralı bölümler sırayla açılır, her bölümde kazanılan yıldız görünür. Ayrıntı 2.3.
- **Oyun ekranı (dik):** üstte müşteriler ve sayaçlar, ortada tezgâh ve dönen bant, altta sütunlar. "2D yandan" kamera: tezgâh ve müşteriler yandan görünür.
- **Bölüm sonu:** kaç yıldız; Tekrar oyna, Devam et.

Sonra gelecek ekranlar (bölüm 4.1): koleksiyon ve başarımlar, hikâye
bölümleri, market, dükkânım, etkinlikler.

### 2.3 Bölüm haritası: Düzada

Harita Düzada'dır (Kemal, 21 Ekim). Haritada kullanılabilecekler yalnız
künyede yazanlardır (KKM `docs/03-duzada-kunyesi.md`), yazdığı kadarıyla:

- **Ada:** Ege'de, zeytin ağaçlarıyla çevrili. En yüksek noktası Ada Tepesi.
- **Mahalleler:** Merkez (adanın ortası; meydan, taş çeşme, yaşlı çınar), Liman (kuzeybatı ucu; Deniz Feneri, mendirek, Dondurmacı Kızlar iskelenin yakınında), İskele / Kemsköy (liman caddesi, otel, koy), Stadyum (Dirlik Stadı, Kuzey Plajı), Çiftlik (zeytinlikler, taş çiftlik evleri, şaraphaneler).
- **Zirveler ve burunlar:** Ada Tepesi, Kuzey Sırtı ve Çetmi Sırtı (Merkez); Fener Burnu (Liman); Güney Burnu (İskele).
- **Yol:** Sahil Yolu beş mahalleden geçer.
- **Doğa:** zeytinlik, maki, Ada Tepesi yamaçlarında çam ormanı, çıplak kayalık; İskele koyu, Stadyum kıyısı, gizli koylar.

Kurallar:
- Taslaktaki yanardağ, palmiye, tropik bitki, şelale ve saz damlı kulübe çizilmez.
- Künyede olmayan bir yer adı haritaya yazılmaz; gerekirse yer [Kemal] diye boş kalır.
- Bölüm yolunun hangi mahallelerden geçeceği, nereden başlayıp nerede biteceği: [Kemal] (bkz. Kemal'e sorular, 1).
- Bölüm noktalarına yer adı yazılır mı, yalnız numara mı: [Kemal]; ilk sürümde yalnız numara.

---

## 3. Ana mekanik: kaynak seçimi ve sipariş karşılama

### Seçenek A — Dönen bant ve sütunlar (seçildi, Kemal 21 Ekim 2026)

- Sütuna dokunup tut: en üstteki aynı çeşitler banda gider.
- Bant döner; istediği çeşit önünden geçen müşteri onu alır.
- Bantta yer sınırlı; bant dolunca bölüm zorlaşır ya da biter.
- Erime: banda gönderilen dondurma bir tur içinde alınmazsa erir ve kaybolur (Kemal'in "bir tur sonra yok olur" cümlesine en yakın biçim). Kesin kural öneri oyununda denenip seçilir (yol haritası, 2. paket).
- Dikkat: dönen bant sürekli hareket ister; "sakin oyuncu" için hızı yavaş tutmak gerekir.

### Seçenek B — Envanter tepsisi (seçilmedi)

Bant yerine gözlü bir tepsi; erime hamleyle. Seçilmedi.

### Seçenek C — Hazırla ve ver (seçilmedi; ileride bölüm türü olabilir)

Sütunlarda parçalar (külah, kap, top, sos gibi); müşteri bir bileşim ister.
İlk sürüm için seçilmedi. İleri bölümlerde A'nın üstüne eklenebilecek bir
bölüm türü olarak not edildi (bölüm 4.1).

### 3.1 Sayaçlar (öneri)

Oyuncu bölümün nerede olduğunu iki sayıdan görür:
- Karşılanan müşteri / bölümdeki toplam müşteri
- Bant doluluğu

---

## 4. İlerleme ve ödül

İlk sürümde yalnız bölümler, yıldız ve harita var (Kemal, 21 Ekim).

- **Bölümler:** numaralı; her bölüm biraz daha zor. İlk sürümde kaç bölüm olacağı [Kemal] (bkz. Kemal'e sorular, 2).
- **Yıldız:** sayısı ve neye göre verildiği [Kemal] (bkz. Kemal'e sorular, 3). Öneri: kalan hamle ya da hiç erimeden bitirme gibi bir ölçü.
- **Harita:** bölüm geçildikçe yol üstünde bir sonraki bölüm açılır.
- **Kayıt:** oyuncunun kaldığı bölüm ve yıldızları telefonda saklanır.

### 4.1 Sonra (ilk sürümde yok; sırası Kemal'le)

- Can sistemi (Dondurmacı Kızlar deposunda Kemal'in kararı var) ve can bitince ne olacağı (para modeli, yayın dönemi).
- Lig.
- Festival.
- Sandık.
- Market.
- Altın ve deneyim (seviye).
- Bölüm sonunda yeni malzeme kazanma.
- Hikâye bölümleri (KKM dosyasında ödül olarak seçili). Kaç bölümde bir açılacağı ve metinleri [Kemal].
- Başarımlar: neler olacağı ve adları [Kemal].
- Koleksiyon: ne toplanacağı [Kemal]. Biçim seçenekleri (adsız): dükkânın ürünleri, müşteri kartları, dükkâna eklenen süs eşyaları.
- Taslak ekranlardaki öbür düğmeler: Dükkânım, Etkinlikler, Ekip, Hediyeler, Bilgi/Galeri.
- Kısmi seslendirme.
- Seçenek C (hazırla ve ver) yeni bir bölüm türü olarak.
- "Sonu yok": elle yapılmış bölümler bitince ne olacağı.

---

## 5. Dünya ve kurgu

- **Yer:** Dondurmacı Kızlar dükkânı; kanonda Liman Mahallesi, iskelenin yakını; dükkân 2000 sonrası açıldı (0.4'ten çıkan).
- **Zaman:** tek bir sezon. Hangi sezon: [Kemal]. Kanonda Dondurmacı Kızlar kışın tatlıcı / kafe olur; tek sezon seçilirse bu ayrım oyunun dışında kalır.
- **Oyuncu:** adsız, oyuncunun kendisi (Kemal'in seçimi).
- **Karakterlerin adları (müşteriler, çalışanlar):** [Kemal]
- **Ürün adları (çeşitler):** [Kemal]
- **Hikâye bölümlerinin konusu ve metni:** [Kemal] (sonra)
- Kanondan yalnız tutarlılık için: Dondurmacı Kızlar'ın sahibi bir kadındır, adı yoktur; Sade Meyhane'nin de sahibidir. Bu belgede bu kişi hakkında başka bir şey yazılmadı.
- Kanon dışında Düzada bilgisi eklenmedi.

---

## 6. Görsel ve işitsel yönelim

- **Görsel stil:** el çizimi 2D, yumuşak hatlı (Kemal, 21 Ekim). Düşük poligon değil.
- **Kamera:** 2D yandan; dik ekran.
- **Palet:** dükkânın mor ve sarısı (kanondaki logo renkleri; tonlar taslak).
- **Harita:** Ege adası; zeytin, kayalık, koylar (bölüm 2.3). Yanardağ ve palmiye yok.
- **Yazı tipi:** öneri Poppins (marka kiti: her yerde Poppins). Kemal onaylar.
- **Örnek oyundan alınmayacaklar:** görseller, karakterler, ad, yerleşimin birebir kopyası. Yalnız "sütun → dönen bant → müşteri" kalıbı alınır.
- **Müzik:** lo-fi (Kemal). Parçalar Kemal'in seçimi; prototipte geçici sessizlik ya da geçici ezgi.
- **Seslendirme:** kısmi (Kemal); sonra. Hangi satırların seslendirileceği ve kimin seslendireceği [Kemal].

---

## 7. Açık sorular

Karar Kemal'in; karar verilince bölüm 0'a taşınır. 21 Ekim cevaplarıyla
kapananlar (DK'nın ne olduğu, görsel stil, palet, oynanış seçeneği,
haritanın Düzada olması, ilk sürümün kapsamı, depo, mekân) çıkarıldı.

İlk sürüm için:
- Bölüm yolu haritada hangi mahallelerden geçer; nereden başlar, nerede biter? (Kemal'e sorular, 1)
- İlk sürümde kaç bölüm olacak? (Kemal'e sorular, 2)
- Yıldız neye göre verilir? (Kemal'e sorular, 3)
- Erime kuralı: bir bant turu sonra mı, başka bir ölçüyle mi? Öneri oyununda denenip seçilir.
- Hangi sezon.

Sonrası için:
- Sonu yok: elle yapılmış bölümler bitince ne olur (kendiliğinden üretilen bölümler, günlük bölüm, ya da bekleme)?
- Can sistemi "sakin oyuncu" ile nasıl bağdaşır; can bitince ne olur (para modeli, yayın dönemi)?
- Hikâye bölümleri kaç bölümde bir açılır; metinleri ne zaman gelir?
- Koleksiyon ne toplar; başarımlar neler?
- Seslendirme hangi satırlarda?
- Oyunun son adı ("DK Lite" yayın adı mı, çalışma adı mı).

### 7.1 Önerilen aralıklar (geçici, Kemal onaylar)

Hiçbiri karar değil; gerekçesiyle yalnız başlangıç önerisi. Öneri oyununda
elle denenip değişir.

- **Bir bölümün süresi:** önerilen 1–3 dakika. Gerekçe: Kemal'in oturumu 5–10 dakika; bir oturuma birkaç bölüm sığarsa oyuncu her oturumda ilerleme görür.
- **Sütun sayısı:** önerilen 3–5 (ilk bölümlerde az, sonra artar). Gerekçe: dik telefon ekranında parmağın rahat dokunacağı genişlik.
- **Aynı anda bekleyen müşteri:** önerilen 2–4. Gerekçe: sakin oyuncu için ilk bölümlerde az.
- İlk sürümdeki bölüm sayısı, yıldız ölçüsü, can sayısı ve dolma süresi: Kemal'in kararı; bu belge sayı önermez.

---

## 8. Yapım durumu

Uygulamada **olan**: depo ve bu iki belge. Kod yok.

Uygulamada **olmayan**: bu belgedeki her şey. Sıra yol haritasında; ilk
paket başlayabilir.

Yapım aşaması ve işler: [Kemal] (KKM'de boş; yol haritası onaylandıkça dolabilir).

---

## Kemal'e sorular

1. DK Lite: Bölüm haritasında yol hangi mahallelerden geçsin? Seçenekler: (a) dükkânın olduğu Liman'dan başlayıp Sahil Yolu boyunca öbür mahallelere, (b) Liman'dan başlayıp Ada Tepesi'ne çıkan, (c) başka bir sıra (sen söyle).
2. DK Lite: İlk sürümde kaç bölüm olsun? Seçenekler: (a) sayıyı sen ver, (b) öneri oyununu oynadıktan sonra karar ver.
3. DK Lite: Yıldız neye göre verilsin? Seçenekler: (a) öneri oyununu oynadıktan sonra karar ver, (b) hiç erimeden bitirme, (c) kalan bant yeri.
