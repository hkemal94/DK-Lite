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

- Aşama: 4. paket (numaralı bölümler) öneri olarak geldi (22 Ekim). Deneme olarak 10 bölüm, her biri biraz daha zor; kaldığı bölüm ve yıldızlar telefonda saklanıyor; sade bir "Bölümler" listesi var. Ortak saklı sıra artık top top karışık; aynı çeşit art arda en çok 2 kez geliyor.
- Son biten: 3. paket ve üstüne ortak saklı yer düzeltmesi (saklı toplar ortak bir yerde; yarım puan yalnız erime açıkken; 22 Ekim).
- Kararlar: DK Lite, Dondurmacı Kızlar'ın hafif sürümü; el çizimi 2D; mor-sarı; oynanış dönen bant ve sütunlar; bölüm haritası Düzada; ilk sürümde yalnız bölümler, yıldız ve harita.
- Sıradaki: 5. paket (bölüm haritası, çizimsiz). Bölüm sayısı Kemal'in kararı; deneme oyununu oynadıktan sonra. Yıldız ölçüsü şimdilik böyle kalıyor (Kemal: "Sonra bakariz simdiki kalsin").
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

- Durum: öneri olarak geldi (22 Ekim 2026). Kemal: "4. paket: numaralı bölümler (her biri biraz daha zor; kaldığın bölüm ve yıldızlar telefonda saklanır)".
- İçerik: elle hazırlanmış bölümler, her biri biraz daha zor; kaldığı bölüm ve yıldızlar telefonda saklanır. Bölüm sayısı Kemal'in kararı (açık soru; Kemal: "Deneme oyununu oynadıktan sonra karar vereyim").
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
  - Yeni deneme değerleri (karar değil): bölüm sayısı 10; art arda aynı çeşit en çok 2; zorluk tablosu (bölüm: sütun / çeşit / müşteri / istek / bant yeri): 1: 4 / 3 / 8 / 2–3 / 12; 2: 4 / 3 / 10 / 2–3 / 12; 3: 4 / 4 / 10 / 2–4 / 12; 4: 4 / 4 / 12 / 2–4 / 12; 5: 4 / 4 / 13 / 2–4 / 11; 6: 4 / 4 / 14 / 2–4 / 11; 7: 4 / 4 / 14 / 3–4 / 10; 8: 5 / 5 / 14 / 2–4 / 10; 9: 5 / 5 / 15 / 3–4 / 10; 10: 5 / 5 / 16 / 3–4 / 9. Bant hızı, sütunda görünen top (4), aynı anda en çok 5 müşteri, erime ve puan kuralları her bölümde aynı. Hepsi `src/ayarlar.ts` dosyasında.

### Gece işleri (22 Ekim 2026)

- Durum: öneri olarak geldi (22 Ekim 2026 gecesi). Kemal panoda istedi; ayrıntı tasarım belgesi 0.10.
- Renk: mor-sarı tonlar Dondurmacı Kızlar'ınkiyle aynı oldu: koyu mor `#4e2470`, mor `#7a3fa8` (bant), sarı `#ffc928` (düğmeler, A çeşidi). Ekranın düzeni değişmedi.
- Giriş ekranı: oyun açılınca önce giriş ekranı gelir. Oyunun adının yerinde `[Kemal]` yer tutucusu, altında "Başla" (kaldığın bölüm başlar; hepsi bittiyse Bölümler listesi) ve "Bölümler". Eskiden kaldığı bölüm doğrudan başlıyordu.
- Duraklatma: oyun sırasında sağ üst köşede duraklatma düğmesi. Basınca oyun tamamen durur; "Devam et", "Baştan başla", "Bölümler" çıkar. Devam edince erime, müşteri gelişi ve bant kaldığı yerden sürer.

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
- 1. paket: çizimsiz öneri oyunu; tek tek gönderme ve sınırlı görünüm dahil (21 Ekim 2026).
- 2. paket: erime kuralı, fazla top, en çok 5 müşteri (22 Ekim 2026). Kemal'in seçimi: "2 tur sonra", 1. tur sonunda puan yarıya.
- 3. paket: sayaçlar, puan, bölüm sonu (yıldız, Tekrar oyna, Devam et) (22 Ekim 2026).
- Ortak saklı yer düzeltmesi: saklı toplar ortak bir yerde, bir sütun azaldıkça alttan ona gelir; yarım puan yalnız erime açıkken (22 Ekim 2026).

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
- İlk sürümdeki bölüm sayısı (öneri oyununda deneme olarak 10; Kemal: "Deneme oyununu oynadıktan sonra karar vereyim").
- Bölümlerin zorluk artışı (deneme tablosu `src/ayarlar.ts`'te; Kemal oynayıp söyler).
- Yıldız ölçüsü. Şimdilik deneme: puana göre (en yüksek olası puanın %70'i 2 yıldız, %90'ı 3 yıldız; kazanınca en az 1). Kemal (22 Ekim): "Sonra bakariz simdiki kalsin".
- Bir topun puanı (şimdilik deneme değeri 10; yalnız oranlar önemli olduğu için yıldızı etkilemez).
- Hangi sezon.
- Açıklama, fikir notları, karakter adları, ürün adları.
- Müzik.

## Kemal'e sorular

Soru yok. Yıldız sorusu ertelendi (Kemal, 22 Ekim: "Sonra bakariz simdiki kalsin"); "Kemal'in kararını bekleyenler"de duruyor.
