# DK Lite · Ayar dosyası (KKM paneli için)

Kemal, 9 Kasım 2026: KKM'de "bölümler, arka planlar şu bu değiştirebileceğim; hediyeleri, yeni açılacak
şeyleri ... sürükle bırakla bir şeyleri bir yerlere koyabileceğim" bir panel. Seçimleri: panel **KKM'de,
Oyunlar ekranında**; ilk etapta **hediyeler ve sırası, lokasyonlar, mağaza, bölüm ayarları**.

Bu belge panelin düzenleyeceği dosyayı anlatır. Panelin kendisi KKM deposunda yapılır (ayrı iş).

## Dosya ve akış

- Dosya: `src/veri/oyun-ayarlari.json` (DK Lite deposu, `hkemal94/dk-lite`).
- Panel dosyayı okur; Kemal değiştirip "Kaydet" deyince panel **ayrı dalda** (`ajans/panel-<kısa-konu>`)
  dosyanın yeni hâlini yazar ve ana dala **öneri (PR)** açar. Birleştiren Kemal; ana dala doğrudan yazılmaz.
- Derleme önce `node araclar/ayar-denetimi.mjs` çalıştırır. Dosyada yanlış değer varsa derleme durur,
  oyun yayına çıkmaz; hatalar Türkçe listelenir (ör. "hediye bölümleri artan sırada olmalı").
  Panel aynı denetimi kaydetmeden önce kendi içinde de yapmalı (kurallar aşağıda).
- Yazı düzeni: 2 boşluk girinti, Türkçe karakterler olduğu gibi (UTF-8). Alanların sırası korunur.
- Değişiklik ekranı değiştiriyorsa PR'da yol haritasına bir satır eklenir (`docs/yol-haritasi.md`).

## Alanlar

### `bolumSayisi`
Toplam bölüm (0. bölüm hariç). Şu an 390. Lokasyon sayısı × lokasyondaki bölümden fazla olamaz.

### `lokasyon`
- `bolumSayisi`: bir lokasyonda kaç bölüm (30).
- `acmaYildizi`: her lokasyon için gereken yıldız (75). m. lokasyon toplam `m × acmaYildizi` yıldızla açılır.
  Bir lokasyondaki en çok yıldızdan (bölüm × 3) büyük olamaz.
- `liste`: sırayla lokasyonlar. Her biri:
  - `ad`: görünen ad (adlar Kemal'in). "Lokasyon 11" gibi adlar İngilizcede "Location 11" olur; yer adları çevrilmez.
  - `renk`: `#rrggbb`. Bölümler ekranının zemini ve albümdeki kartın rengi; açık ve koyu tonlar oyunda türetilir.
  - `resim` (isteğe bağlı): zemine konacak resim, `public/` altındaki yol (ör. `gorseller/lokasyon/liman.webp`).
    Resim dosyası depoda olmalı; panel resmi yüklüyorsa aynı PR'a koyar.

### `urunler`
Oyundaki bütün ürünler. Her biri `id` (küçük harf, rakam, `-`), `ad`, `tur` (`dondurma` | `tatli` | `icecek`),
`renk` (`#rrggbb`, simgenin ana rengi). Resmi `public/gorseller/urunler/<id>.webp` olmalı (Canva çizimi;
kaynağı `docs/lisanslar.md`'ye yazılır). Panel yeni ürünü ancak resmiyle birlikte ekleyebilir.

### `baslangicUrunleri`
Oyunun başında açık ürünler (en az iki dondurma).

### `hediyeler` (sürükle bırak)
Sırayla `{ "urun": id, "bolum": n }`. Ürün, `bolum` ilk kez kazanılınca açılır ve sonraki bölümde mutlaka gelir.
- Bölümler **artan** sırada, her bölümde en çok bir hediye; 0 ile `bolumSayisi − 1` arasında.
- Başlangıç ürünü hediye olamaz; bir ürün bir kez hediye olur.
- Her ürün ya başlangıçta ya hediyede olmalı (yoksa oyunda hiç gelmez).
- Sürükle bırakta önerilen davranış: ürünlerin **sırası** değişir, bölüm numaraları yerinde kalır
  (yani "5. bölümün hediyesi şu olsun"). Bölüm numarası ayrıca elle değiştirilebilir.

### `yeniUrun`
`sayi`: son açılan kaç ürün sık gelir (3). `sure`: bir ürün açıldıktan sonra kaç bölüm "yeni" sayılır (30).

### `para`
`yildiz` (yeni yıldız başına), `sandik` ([en az, en çok]), `gunluk`, `gunluk7` (7. gün ayrıca), `kart`
(lokasyon kartı açılınca). Hepsi DENEME.

### `magaza`
- `yardimciFiyati`, `canFiyati`, `temaFiyati`, `kostumFiyati`: pozitif tam sayı.
- `temalar`: `{ id, ad }`; ilki başta açık. **Yeni tema** için oyunun stil dosyasında o temanın görünüşü
  gerekir (`#kok[data-tema="<id>"]`); panel yalnız ad ve sırayı değiştirebilir, yeni temayı ekip ekler.
- `kostumler`: `{ id, ad }`; ilki başta açık (resmi `gorseller/tezgah/dondurmaci.webp`), ötekilerin resmi
  `gorseller/tezgah/dondurmaci-<id>.webp`. Yeni kostüm resmiyle birlikte eklenir.

### `bolumler`
- `ilkBolumler`: 1–10. bölüm, satır satır: `sutun`, `cesit` (kaç çeşit ürün), `musteri`, `istekEnAz`,
  `istekEnCok`, `bantYeri`, `ikiCesitOrani` (0–1). Hangi ürünlerin geleceğini oyun seçer; çeşit o bölümde
  açılmış ürün sayısını geçemez.
- `kural`: 11. bölümden sonrası.
  - `musteri`: `baslangic` + her `herKacBolumdeBir` bölümde 1 artar, en çok `enCok`.
  - `cesit`, `bantYeri`, `ikiCesitOrani`: "şu bölümden itibaren şu değer" satırları (`bolumden` artan sırada).
  - `istekEnAz`, `istekEnCok`, `sutun`: sabit.
- `zor` (her 10'luk dilimin 5. bölümü), `cokZor` (10. bölümü, sandıklı): `musteri` fazla, `bantEksik`,
  `ikiCesit` artışı. `rahatGeri`: 6. bölüm kaç bölüm önceki kadar kolay. `bantEnAz`, `ikiCesitEnCok`: sınırlar.
- `yeniOgeler`: `buzluTop`, `gizliTop`, `aceleciMusteri` (`bolum`: ilk geldiği bölüm, o bölümde "Yeni!"
  penceresiyle tanıtılır; `oran`: 0–1), `kilitliSutun` (`bolum`).

## Panelin yapamayacakları (ekip yapar)

- Yeni çizim (ürün, kostüm, lokasyon resmi) üretmek: Canva'da çizilir, sonra panelden seçilir/yüklenir.
- Yeni tema görünüşü, yeni zorluk öğesi, yeni rozet: kod gerektirir.

## Denetim

- `npm run ayar-denetimi`: yalnız dosyayı denetler.
- `npm run build`: denetim + derleme.
- Bütün bölümlerin kazanılabilir kurulduğu ve ekranların bozulmadığı ekip araçlarıyla denenir
  (`araclar/ekran-denetimi.cjs`); panelden gelen büyük değişikliklerde (bölüm sayısı, hediye düzeni) ekip PR'ı
  birleşmeden önce dener.
