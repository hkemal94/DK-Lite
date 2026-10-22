# DK Lite

Dondurmacı Kızlar'ın küçük, sade bulmaca sürümü (Kems Company).
Aşama: 4. paket (numaralı bölümler) öneri olarak geldi (22 Ekim 2026; çizimsiz öneri oyunu).

- Tasarım belgesi: `docs/tasarim-belgesi.md`
- Yol haritası: `docs/yol-haritasi.md`
- Kemal'in taslak ekranları: `docs/gorseller/kemal-taslak/`

KKM'de oyunun künyesine depo olarak `hkemal94/DK-Lite` yazılınca bu iki
belge oyun sayfasında canlı okunur.

## Nasıl denenir

Telefonda şu bağlantıyı aç: https://hkemal94.github.io/DK-Lite/

- Numaralı bölümler: oyun açılınca kaldığın bölüm doğrudan başlar (ilk
  açılışta Bölüm 1). Üst şeritte solda "Bölüm 3" gibi bölüm numarası yazar.
  Her bölüm biraz daha zor. Deneme olarak 10 bölüm var; sayı senin kararın.
- Aynı bölüm her açılışta aynı başlar (sütunlar ve saklı yerden gelen
  topların sırası aynı); müşterilerin hangi yere ve kaç saniye arayla
  geldiği yine değişir.
- Bir bölümü kazanınca sonraki açılır. Kaldığın bölüm ve her bölümde
  kazandığın en iyi yıldız telefonda saklanır; sayfayı kapatıp açınca
  kaldığın yerden sürer. Telefon saklamaya izin vermezse oyun yine açılır,
  Bölüm 1'den.
- "Bölüm 3" yazısına dokununca "Bölümler" listesi açılır: numaralar ve
  kazanılan yıldızlar. Kilitli bölümler soluk durur, dokununca başlamaz;
  açık olana dokununca o bölüm başlar.
- Üstte müşteriler (aynı anda en çok 5) ve her birinin istediği çeşit (harf) ve adet.
  Bölüm birkaç müşteriyle başlar, ötekiler arayla gelir; giden müşterinin
  yerine yenisi birkaç saniye sonra gelir.
- Ortada dönen bant; altta sütunlar.
- Bölüm başında her sütunda 4 top durur. Geri kalan bütün toplar tek bir
  ortak saklı yerde bekler; kaç tane kaldığı yazmaz. Toplar top top
  karışıktır; aynı çeşit art arda en çok 2 kez gelir. Sıradaki top sütunun
  banda yakın ucunda parlak durur, altındakiler soluktur.
- Bir sütuna dokun: o sütunun en üstteki tek topu banda gider. Kalanlar
  yukarı kayar, ortak saklı yerden sıradaki top o sütunun en altına gelir.
  Hangi sütuna dokunursan dokun, gelen top ortak sıranın sıradakidir; yani
  sütunların içi baştan belli değildir. Saklı yer boşalınca sütunlar
  kısalmaya başlar. İstediği harf önünden geçen müşteri onu alır.
- Sütunlarda müşterilerin istediğinden fazla top var; hata yapma payı.
- En üstte sade bir şerit: solda bölüm numarası ve erime düğmesi, sağda sayaçlar.
  "Müşteri" karşılanan / toplam müşteriyi (ör. "3 / 12"), "Puan" toplanan
  puanı, "Bant" ince çubukla bantın ne kadar dolu olduğunu gösterir.
- Puan: müşterinin aldığı her top puan getirir. Erime açıkken ("1 tur
  sonra", "2 tur sonra") bantta 1 turdan uzun kalan top hafif soluklaşır ve
  alttan biraz erimiş görünür; o top alınırsa puanın yarısını getirir.
  "Erime yok"ta her top tam puan getirir ve top soluklaşmaz.
- Erime düğmesi her dokunuşta değişir: "Erime yok", "1 tur sonra",
  "2 tur sonra" (başlangıç). Bantta kimsenin almadığı top, bant o kadar tur
  dönünce yavaşça solup kaybolur ve yeri açılır. Seçim bölüm değişince de
  kalır; sayfa yenilenince başlangıca döner.
- Bütün müşteriler karşılanınca "Bölüm tamamlandı": yıldızlar (en çok 3),
  puan, "Tekrar oyna" (aynı bölüm baştan; sütunlar ve saklı yerden gelen
  topların sırası aynı), "Devam et" (sonraki bölüm) ve altta küçük
  "Bölümler" (listeye dönüş). Son bölümde "Devam et" listeye döner; son
  bölüm de bitince "Bütün bölümler bitti" yazar.
  Yıldız şimdilik puana göre bir denemedir; Kemal "şimdiki kalsın" dedi.
- Toplar eriyip kalanlar istekleri karşılayamazsa "Top kalmadı". "Erime
  yok" seçiliyken bant dolar ve bantta kimsenin istemediği toplar kalırsa
  "Bant doldu". Bu ikisinde yıldız yok; "Tekrar oyna" ve "Bölümler" var.
- Her bölüm kazanılabilir (bölüm kurulurken denenir). Bölüm haritası
  sonraki pakette.
- Kaydı silip baştan denemek için: tarayıcının bu siteye ait verilerini
  temizle (ya da gizli sekmede aç).

Bağlantı, bu değişiklik ana dala birleştirildikten birkaç dakika sonra
çalışır. Sayılar (bölüm sayısı, her bölümün sütun, çeşit, müşteri ve bant yeri sayısı, bant hızı, puan, yıldız eşikleri…) deneme değeridir;
`src/ayarlar.ts` dosyasında durur, Kemal oynadıktan sonra değişir.

### Kemal'in bir kez yapması gereken ayar

Bağlantının çalışması için GitHub'da bir kez şu ayar yapılır:

1. GitHub'da `DK-Lite` deposunu aç.
2. Üstte **Settings** (Ayarlar) sekmesine gir.
3. Soldaki listede **Pages**'e tıkla.
4. **Source** yazan kutuda **GitHub Actions**'ı seç.

Bu kadar. Sonra her birleştirmede oyun kendiliğinden yenilenir.
