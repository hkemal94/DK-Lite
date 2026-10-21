# DK Lite

Dondurmacı Kızlar'ın küçük, sade bulmaca sürümü (Kems Company).
Aşama: 1. paket, çizimsiz öneri oyunu (21 Ekim 2026; Kemal deneyecek).

- Tasarım belgesi: `docs/tasarim-belgesi.md`
- Yol haritası: `docs/yol-haritasi.md`
- Kemal'in taslak ekranları: `docs/gorseller/kemal-taslak/`

KKM'de oyunun künyesine depo olarak `hkemal94/DK-Lite` yazılınca bu iki
belge oyun sayfasında canlı okunur.

## Nasıl denenir

Telefonda şu bağlantıyı aç: https://hkemal94.github.io/DK-Lite/

- Üstte müşteriler ve her birinin istediği çeşit (harf) ve adet.
- Ortada dönen bant; altta sütunlar.
- Bir sütuna dokun: en üstteki aynı harfler banda gider. İstediği harf
  önünden geçen müşteri onu alır.
- Bütün müşteriler karşılanınca "Kazandın"; bant dolar ve bantta kimsenin
  istemediği toplar kalırsa "Bant doldu". İkisinde de "Baştan" düğmesi var.
- Her "Baştan"da yeni bir dizilim gelir; her dizilim kazanılabilir.

Bağlantı, bu değişiklik ana dala birleştirildikten birkaç dakika sonra
çalışır. Sayılar (sütun, müşteri, bant hızı…) deneme değeridir;
`src/ayarlar.ts` dosyasında durur, Kemal oynadıktan sonra değişir.

### Kemal'in bir kez yapması gereken ayar

Bağlantının çalışması için GitHub'da bir kez şu ayar yapılır:

1. GitHub'da `DK-Lite` deposunu aç.
2. Üstte **Settings** (Ayarlar) sekmesine gir.
3. Soldaki listede **Pages**'e tıkla.
4. **Source** yazan kutuda **GitHub Actions**'ı seç.

Bu kadar. Sonra her birleştirmede oyun kendiliğinden yenilenir.
