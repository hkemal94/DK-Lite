# DK Lite — Oyun Tasarım Belgesi

**Proje:** DK Lite (Kems Company)
**Aşama:** Tasarım kararları verildi (Kemal, 21 Ekim 2026). 1., 2. ve 3. paket (çizimsiz deneme oyunu, erime kuralı, sayaçlar ve bölüm sonu) ve ortak saklı yer düzeltmesi bitti; 4. paket (numaralı bölümler) öneri olarak geldi (22 Ekim 2026).
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

En yeni karar en üstte. Çelişen yerde en yeni karar geçerlidir.

### 0.10 Gece işleri: renk, giriş, duraklatma, hız, bölüm sayısı ve zorluk (Kemal, 22 Ekim 2026; panodaki istekler)

Kemal'in istekleri (CEO iletti):
- Renk: DK Lite'ın mor-sarı tonları Dondurmacı Kızlar'ınkine yaklaşsın.
- Giriş ekranı: oyun açılınca önce giriş ekranı gelsin (oyunun adı yerine yer tutucu, "Başla" ve "Bölümler").

Öneri oyununda böyle yapıldı:
- Renk: koyu mor `#4e2470` (yazılar, müşteri kutuları), mor `#7a3fa8` (bant ve B çeşidi), sarı `#ffc928` (düğmeler, A çeşidi, yıldız). Tonlar Dondurmacı Kızlar ile aynı; açık lila zemin ve öbür çeşit renkleri değişmedi, ekranın genel görünüşü aynı.
- Giriş ekranı: oyun açılınca ilk o gelir. Ortada oyunun adı yerine kesik çerçeveli `[Kemal]` yer tutucusu (ad Kemal'in), altında "Başla" ve "Bölümler". "Başla" kaldığı bölümü (açılan en ileri bölüm) baştan başlatır; bütün bölümler bittiyse Bölümler listesini açar. "Bölümler" listeyi açar. Giriş ekranı açıkken oyun akmaz. Eskiden oyun açılınca bölüm doğrudan başlıyordu.

### 0.9 Ortak sıra tek tek, numaralı bölümler (Kemal, 22 Ekim 2026; panodaki cevaplar)

Kemal'in cevapları, olduğu gibi:
- Ortak sıra: "Toplar tek tek karıştırılsın; art arda aynı çeşit daha az gelsin"
- Sıradaki: "4. paket: numaralı bölümler (her biri biraz daha zor; kaldığın bölüm ve yıldızlar telefonda saklanır)"

Önceki açık karar sürüyor: ilk sürümde kaç bölüm olacağı Kemal'in ("Deneme oyununu oynadıktan sonra karar vereyim"). Yıldız ölçüsü şimdiki gibi kalıyor (0.8).

Öneri oyununda böyle denendi (4. paket; sayılar deneme değeri):
- Ortak saklı sıra öbek olmadan, top top karıştırılır; aynı çeşit art arda en çok 2 kez gelir (deneme değeri). Bölüm başında sütunlara dizilen toplar da aynı sıranın başıdır; öbek kuralı kalktı.
- Numaralı bölümler: deneme olarak 10 bölüm (sayı Kemal'in kararı). Her bölüm kendi numarasından çıkan sabit bir dizilimle kurulur; aynı bölüm her açılışta aynı başlar. Kazanılabilirlik denetiminden geçmeyen dizilimin yerine yine her açılışta aynı olan bir sonraki dizilim gelir.
- Zorluk bölümden bölüme yavaşça artar (çeşit, müşteri, istek adedi artar; bant yeri azalır). Bölüm 1 3. paketteki oyundan biraz kolay, son bölüm biraz zor. Fazla top oranı (0,5; Kemal'in kararı) her bölümde aynı.
- Kayıt: kaldığı bölüm ve her bölümün en iyi yıldızı telefonda saklanır. Bir bölüm kazanılınca sonraki açılır. Saklama çalışmazsa oyun yine açılır, Bölüm 1'den.
- Ekranlar: harita 5. pakette; şimdilik sade bir "Bölümler" listesi. Üst şeritte "Bölüm 3" gibi yalnız numara (ad yok).

### 0.8 Ortak saklı yer, yarım puan, yıldız (Kemal, 22 Ekim 2026; panodaki cevaplar)

Kemal'in cevapları, olduğu gibi:
- Saklı toplar: önce yazdığı: "16 top gorunuyor ya hani baslangic guvertesinde kalan toplar bitene gore dagilsin mesela". Sonra seçeneklerden seçtiği: "Saklı toplar ortak bir yerde dursun; bir sütun azaldıkça alttan ona gelsin. Böylece sütunların içi baştan belli olmaz."
- "Erime yok" seçiliyken de 1 turu geçen top yarım puan getirsin mi: "Hayır, yalnız erime açıkken"
- Yıldız ölçüsü: "Sonra bakariz simdiki kalsin"

Öneri oyununda böyle denendi:
- Bölüm başında her sütunda yalnız görünen kadar top durur (sütunda görünen top 4, deneme değeri). Geri kalan bütün toplar (fazla toplar dahil) tek bir ortak sırada saklıdır; sayısı yazmaz (0.6 sürüyor).
- Bir sütundan top gidince kalanlar yukarı kayar, ortak sıradaki sıradaki top o sütunun en altına gelir. Ortak sıra bitince sütunlar kısalır.
- Ortak sıra bölüm kurulurken karıştırılır ve sabittir; "Tekrar oyna" aynı sırayı getirir. Kazanılabilirlik denetimi bu kurala göre yapılır.
- Yarım puan (0.7) yalnız erime açıkken ("1 tur sonra", "2 tur sonra"). "Erime yok"ta her top tam puan getirir, 1 turu geçen top soluklaşmaz. 0.7'deki "puan kuralı her erime biçiminde aynıdır" yorumu bununla değişti.
- Yıldız ölçüsü şimdiki deneme olarak kalır (0.7); soru ertelendi.

### 0.7 Erime biçimi, puan ve 3. paket (Kemal, 22 Ekim 2026; panodaki cevaplar)

Kemal'in cevapları, olduğu gibi:
- Erime biçimi: "2 tur olsun ama 1. turun sonunda kazanacağın puan %50'ye düşsün"
- Fazla top: "Şimdiki gibi, istenenin yarısı kadar fazla"
- Müşteri arası: "1–5 saniye (şu anki)"
- Sıradaki: "3. paket (sayaçlar ve bölüm sonu: yıldız ekranı, Tekrar oyna, Devam et) şimdi başlasın"

Öneri oyununda böyle denendi (3. paket):
- Bantta alınmayan top 2. turun sonunda erir; erime düğmesi denemede kalır, başlangıçta "2 tur sonra".
- Banttan müşteriye giden her top puan getirir (bir topun puanı deneme değeri). 1. turun sonunu geçmiş top alınırsa puanın %50'si. Böyle bir top bantta hafif soluk, alttan biraz erimiş görünür.
- Puan kuralı her erime biçiminde aynıdır (şefin yorumu; "Erime yok"ta da 1 turu geçen top yarım puan getirir, yalnız erimez). 0.8 ile değişti: yarım puan yalnız erime açıkken.
- Fazla top oranı 0,5 ve müşteri arası 1–5 saniye artık Kemal'in onayladığı değerlerdir.
- Üstte sayaçlar (karşılanan / toplam müşteri, puan, bant doluluğu); bölüm sonunda yıldız, puan, Tekrar oyna ve Devam et (kaybedince yalnız Tekrar oyna).
- Yıldız ölçüsü hâlâ Kemal'in kararı (bölüm 7). Denemede puana göre: en yüksek olası puanın %70'i 2, %90'ı 3 yıldız; kazanınca en az 1. Deneme değeri.

### 0.6 Müşteri sayısı, sütunda görünen top, fazla top (Kemal, 22 Ekim 2026; panodaki cevaplar)

Kemal'in cevapları, olduğu gibi:
- Müşteri sayısı: "Maksimum 5 ama her saniye maksimum musteri olmak zorunda degil"
- Sütunda görünen top: 4 kalsın. Saklı top sayısı: gösterilmesin.
- Sıradaki iş: "Erime kurali gelirse cok daha fazla top koyulmali ki insanlarin hata yapma luksu olsun"

Öneri oyununda böyle denendi (2. paket; sayılar deneme değeri):
- Ekranda en çok 5 müşteri yeri. Yerler her an dolu değil: bölüm birkaç müşteriyle (2–3) başlar, ötekiler arayla gelir; giden müşterinin yerine yenisi rastgele birkaç saniye (1–5) sonra gelir.
- Sütunda görünen top 4; gizli top sayısı yazmaz (0.5 sürüyor).
- Sütunlarda müşterilerin istediğinden fazla top var (istenenin yarısı kadar fazla); fazlalar çeşitlere eşit dağılır. Bütün müşteriler karşılanınca kazanılır; top artması sorun değil.
- Erime: bantta alınmayan top seçilen tur sayısından sonra solup kaybolur. Biçim oyun içindeki küçük düğmeyle seçilir ("Erime yok", "1 tur sonra", "2 tur sonra"); Kemal 0.7'de "2 tur" seçti.
- Toplar eriyip kalanlar kalan istekleri karşılayamazsa bölüm biter ("Top kalmadı"; basit durum yazısı).

### 0.5 Sınırlı görünüm (Kemal, 21 Ekim 2026; öneri oyununun ikinci denemesi)

Kemal'in cümlesi, olduğu gibi: "Önümüzde yolumuz var ya, bütün gelecekleri
görmemem lazım benim ve alttan gelmeye devam etmesi lazım; aynı zamanda
müşteriler çoğalınca yani maksimumda 4-5 taneyi görmem lazım ve ben
tıkladıkça alttan gelmeye devam etmesi lazım."

Şefin yorumu (öneri oyununda böyle denendi; sayılar deneme değeri):
- Sütunların tamamı baştan görünmez. Her sütunda yalnız üstten birkaç top görünür (deneme değeri 4); gerisi gizlidir, sayısı yazmaz.
- Oyuncu gönderdikçe kalanlar yukarı kayar, alttan gizli bir top gelir.
- Ekranda aynı anda en çok birkaç müşteri görünür (deneme değeri 4; Kemal "4-5" dedi).
- Önceki karar sürer: görünen alt toplar soluk; gönderme dokununca, tek tek.
- Bölüm 2.1'deki "sütunların en üstü her an görünür ama altı kapalıdır" kalıbıyla örtüşür.

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

Oyuncu bölümün nerede olduğunu üst şeritten görür (3. pakette denendi):
- Karşılanan müşteri / bölümdeki toplam müşteri
- Bant doluluğu (ince çubuk)
- Puan (0.7)

---

## 4. İlerleme ve ödül

İlk sürümde yalnız bölümler, yıldız ve harita var (Kemal, 21 Ekim).

- **Bölümler:** numaralı; her bölüm biraz daha zor. İlk sürümde kaç bölüm olacağı [Kemal] (bkz. Kemal'e sorular, 2). Öneri oyununda deneme olarak 10 bölüm (0.9).
- **Yıldız:** sayısı ve neye göre verildiği [Kemal] (bkz. Kemal'e sorular, 3). Öneri: kalan hamle ya da hiç erimeden bitirme gibi bir ölçü. Öneri oyununda deneme olarak üç yıldız, puana göre (0.7).
- **Harita:** bölüm geçildikçe yol üstünde bir sonraki bölüm açılır.
- **Kayıt:** oyuncunun kaldığı bölüm ve yıldızları telefonda saklanır (4. pakette denendi, 0.9).

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
- **Palet:** dükkânın mor ve sarısı (kanondaki logo renkleri). Tonlar Dondurmacı Kızlar ile aynı (Kemal, 22 Ekim; 0.10): koyu mor `#4e2470`, mor `#7a3fa8`, sarı `#ffc928`.
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
- Yıldız neye göre verilir? (Kemal'e sorular, 3) Öneri oyununda şimdilik puana göre deneme ölçüsü var (0.7). Kemal (0.8): "Sonra bakariz simdiki kalsin"; soru ertelendi.
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
- **Aynı anda bekleyen müşteri:** önerilen 2–4. Gerekçe: sakin oyuncu için ilk bölümlerde az. (0.6 ile en çok 5; yerler her an dolu değil.)
- İlk sürümdeki bölüm sayısı, yıldız ölçüsü, can sayısı ve dolma süresi: Kemal'in kararı; bu belge sayı önermez.

---

## 8. Yapım durumu

Uygulamada **olan**: depo, bu iki belge, 1. paket: çizimsiz deneme oyunu (dönen bant ve sütunlar, tek bölüm; ayarlar `src/ayarlar.ts`), 2. paket (erime, fazla top, en çok 5 müşteri), 3. paket (sayaçlar, puan, bölüm sonu ve yıldız) ve ortak saklı yer ile "yarım puan yalnız erime açıkken" (0.8). 4. paket (numaralı bölümler, kayıt, Bölümler listesi; 0.9) öneri olarak geldi.

Uygulamada **olmayan**: bu belgedeki her şey. Sıra yol haritasında; ilk
paket başlayabilir.

Yapım aşaması ve işler: [Kemal] (KKM'de boş; yol haritası onaylandıkça dolabilir).

---

## Kemal'e sorular

1. DK Lite: Bölüm haritasında yol hangi mahallelerden geçsin? Seçenekler: (a) dükkânın olduğu Liman'dan başlayıp Sahil Yolu boyunca öbür mahallelere, (b) Liman'dan başlayıp Ada Tepesi'ne çıkan, (c) başka bir sıra (sen söyle).
2. DK Lite: İlk sürümde kaç bölüm olsun? Seçenekler: (a) sayıyı sen ver, (b) öneri oyununu oynadıktan sonra karar ver.
3. DK Lite: Yıldız neye göre verilsin? Seçenekler: (a) şimdiki deneme gibi puana göre, oynayıp eşikleri söylerim, (b) hiç top eritmeden bitirme, (c) kalan bant yeri. Ertelendi (Kemal, 22 Ekim: "Sonra bakariz simdiki kalsin").
