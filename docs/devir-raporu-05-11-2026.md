# DK Lite · Devir raporu (5 Kasım 2026)

Yazan: Kems Ajans oyun departmanı (yan oturum). Kime: Kemal ve Kems (CEO
oturumu). Kemal (5 Kasım gecesi): "Onu bana bir rapor yazarsın, en son ajans
halleder ya da burayı komple Kems Ajans'a devredip konuşmayı silersin işimiz
bitince."

## 1. Ana dala girmeyi bekleyen dallar (ajansın yapacağı)

Bu oturumda GitHub'da öneri sayfası (PR) açan araç koptu; dallar gönderildi
ama PR açılamadı. Kemal'in izni var ("PR açman gerekirse açabilirsin").

| Dal | İçinde | Durum |
|---|---|---|
| `ajans/kararlar` | İlk zor bölüm 10. bölüm; sandıkta sınırsız can nadir (%50 / %35 / %15); sandık Canva çizimi; Bölümler 20'li sayfalar; kararlar belgelere (tasarım belgesi 0.28) | PR açılmadı |
| `ajans/musteri-renk` | `ajans/kararlar`'ın üstünde: müşteri renk çeşitleri (10 kişiden 46 görünüş; 0.29) ve bu rapor | PR açılmadı |

Yapılacak: `ajans/musteri-renk` → `main` tek PR (ikisini birden içerir).
Bağlantı: https://github.com/hkemal94/DK-Lite/compare/main...ajans/musteri-renk
Her ikisinde `npm run build` temiz; telefon boyutunda (390x844, 360x640)
denendi; gerçek telefonda denenmedi.

Silinecek eski dallar (içerikleri ana dalda; bu oturumdan silme GitHub 403
verdi): `ajans/arayuz-dili`, `ajans/yol-haritasi-bolum`, `ajans/arayuz-tamami`.
Bunlar da birleşince silinebilir: `ajans/kutulu-bolumler`, `ajans/yeni-urun`,
`ajans/can-sandik`, `ajans/kararlar`.

## 2. Bugün ana dala girenler (5 Kasım)

PR #27, #28, #29: yeni arayüz (desenli mor zemin, külahlı logo, şişkin
düğmeler, pencereler, simgeli sayaçlar, Poppins), bölüm bölüm yol haritası,
kutulu Bölümler ekranı, yeni ürün açılır, can (5 can, 15 dakikada 1) ve 10
bölümde bir sandık, 50 bölüm, 10'luk dilim testere dişi zorluk, fiş yerine
sonuç penceresi, araştırma notu (`docs/arastirma-zorluk-ve-baglilik.md`).
Ayrıntı: tasarım belgesi 0.23–0.27.

## 3. Sırada (Kemal hepsine "evet" dedi)

1. Müşteri çeşitliliği, 2. adım: parça parça kombinasyon (gömlek, pantolon,
   şapka ayrı renk). Kemal (5 Kasım gecesi): "Desenler ve renkler, ayrıca
   etnik kökenler ve saçlar falan etkili olabilir": kıyafet desenleri (çizgili,
   çiçekli, puantiyeli gibi), renk kombinasyonları.
2. Müşteri çeşitliliği, 3. adım: Canva'da aynı tarzda yeni kişiler; farklı
   kökenler, ten renkleri, saç biçimleri ve renkleri, yaşlar (Kemal'in notu
   yukarıda). Canva'ya "DK Lite çalışma" tasarımı kaydetme izni var.
3. Yeni öğeler: buzlu top (11. bölüm), gizli top (21.), aceleci müşteri
   (31.), kilitli sütun (41.). Adları [Kemal].
4. Oyuncuyu tutanlar: yardımcılar (önce), galibiyet serisi, günlük ödül,
   koleksiyon albümü. Sayılar ve kurallar Kemal'e sorulacak.

## 4. Kemal'in kararını bekleyenler

- Oyunun yayın adı (kısa, DK ile ilgili bir şey; "şu anda düşünmedim").
- Zor bölümlerin zorluğu: Kemal telefonda oynayıp söyleyecek.
- Yukarıdaki yeni öğelerin adları.

## 5. Bilinen eksikler

- Hiçbir paket gerçek telefonda denenmedi.
- Uygulama bölüm ortasında kapatılırsa can gitmez (yarıda bırakma sayılmaz).
- Kullanılmayan resimler depoda duruyor: `arka-plan.webp`, `sahil-yolu.webp`.
