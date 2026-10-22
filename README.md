# DK Lite

Dondurmacı Kızlar'ın küçük, sade bulmaca sürümü (Kems Company).
Aşama: 3. paket, sayaçlar ve bölüm sonu (22 Ekim 2026; çizimsiz öneri oyunu üstüne).

- Tasarım belgesi: `docs/tasarim-belgesi.md`
- Yol haritası: `docs/yol-haritasi.md`
- Kemal'in taslak ekranları: `docs/gorseller/kemal-taslak/`

KKM'de oyunun künyesine depo olarak `hkemal94/DK-Lite` yazılınca bu iki
belge oyun sayfasında canlı okunur.

## Nasıl denenir

Telefonda şu bağlantıyı aç: https://hkemal94.github.io/DK-Lite/

- Üstte müşteriler (aynı anda en çok 5) ve her birinin istediği çeşit (harf) ve adet.
  Bölüm birkaç müşteriyle başlar, ötekiler arayla gelir; giden müşterinin
  yerine yenisi birkaç saniye sonra gelir.
- Ortada dönen bant; altta sütunlar.
- Her sütunda yalnız üstteki birkaç top görünür; gerisi gizlidir. Sıradaki
  top sütunun banda yakın ucunda parlak durur, altındakiler soluktur.
- Bir sütuna dokun: o sütunun en üstteki tek topu banda gider. Kalanlar
  yukarı kayar, alttan gizli bir top gelir. İstediği harf önünden geçen
  müşteri onu alır.
- Sütunlarda müşterilerin istediğinden fazla top var; hata yapma payı.
- En üstte sade bir şerit: solda erime düğmesi, sağda sayaçlar.
  "Müşteri" karşılanan / toplam müşteriyi (ör. "3 / 12"), "Puan" toplanan
  puanı, "Bant" ince çubukla bantın ne kadar dolu olduğunu gösterir.
- Puan: müşterinin aldığı her top puan getirir. Bantta 1 turdan uzun kalan
  top hafif soluklaşır ve alttan biraz erimiş görünür; o top alınırsa puanın
  yarısını getirir.
- Erime düğmesi her dokunuşta değişir: "Erime yok", "1 tur sonra",
  "2 tur sonra" (başlangıç). Bantta kimsenin almadığı top, bant o kadar tur
  dönünce yavaşça solup kaybolur ve yeri açılır. Puan kuralı her biçimde
  aynıdır. Seçim bölüm değişince de kalır; sayfa yenilenince başlangıca döner.
- Bütün müşteriler karşılanınca "Bölüm tamamlandı": yıldızlar (en çok 3),
  puan, "Tekrar oyna" (aynı bölüm baştan) ve "Devam et" (yeni bir bölüm).
  Yıldız şimdilik puana göre bir denemedir; ölçüsüne Kemal karar verecek.
- Toplar eriyip kalanlar istekleri karşılayamazsa "Top kalmadı". "Erime
  yok" seçiliyken bant dolar ve bantta kimsenin istemediği toplar kalırsa
  "Bant doldu". Bu ikisinde yıldız yok, yalnız "Tekrar oyna" var.
- "Devam et"te yeni bir dizilim gelir; her dizilim kazanılabilir. Numaralı
  bölümler sonraki pakette.

Bağlantı, bu değişiklik ana dala birleştirildikten birkaç dakika sonra
çalışır. Sayılar (sütun, müşteri, bant hızı, puan, yıldız eşikleri…) deneme değeridir;
`src/ayarlar.ts` dosyasında durur, Kemal oynadıktan sonra değişir.

### Kemal'in bir kez yapması gereken ayar

Bağlantının çalışması için GitHub'da bir kez şu ayar yapılır:

1. GitHub'da `DK-Lite` deposunu aç.
2. Üstte **Settings** (Ayarlar) sekmesine gir.
3. Soldaki listede **Pages**'e tıkla.
4. **Source** yazan kutuda **GitHub Actions**'ı seç.

Bu kadar. Sonra her birleştirmede oyun kendiliğinden yenilenir.
