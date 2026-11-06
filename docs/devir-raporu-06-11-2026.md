# DK Lite · Devir raporu (6 Kasım 2026)

Yazan: Kems Ajans oyun departmanı (yan oturum). Kime: Kems (CEO oturumu) ve Kemal.
Kemal (6 Kasım): "İş bitti, devret." Bu rapor 5 Kasım raporunun yerine geçer.

## 1. Durum

Bekleyen öneri (PR) yok. Bu oturumdaki her şey ana dalda (PR #27–#35). Oyun
GitHub Pages'te: https://hkemal94.github.io/DK-Lite/. Hiçbir paket gerçek telefonda
denenmedi; hepsi bilgisayarda telefon boyutunda (360x640, 390x844) denendi.

## 2. Bu oturumda ana dala girenler

Ayrıntı tasarım belgesinde (0.23–0.36); ekran görüntüleri `docs/ekran/`.

- **Arayüz:** desenli mor zemin, külahlı logo, şişkin düğmeler, pencereler, Poppins.
- **Bölümler ekranı:** 5 mahalle × 30 bölüm (Liman, Stadyum, Çiftlik, İskele, Merkez),
  her biri kendi renginde; 0. bölüm (öğretici, el işaretli, kaybedilmez).
- **150 bölüm:** 10'luk dilim testere dişi zorluk; bütün bölümler kazanılabilir kuruluyor.
- **Kazanç:** 15 hediye ürün birer birer (0. bölümden sonra limonata, sonra her 10 bölümde
  bir); her 10 bölümde ışıkla açılan sandık; can (en çok 5, 15 dakikada 1; hediyeyle 6).
- **Yeni öğeler (her mahallede bir):** buzlu top (31; çay ve kahvede buz yok), gizli top (61),
  aceleci müşteri (91), kilitli sütun (121). Adları [Kemal].
- **Oyuncuyu tutanlar:** 5 yardımcı, galibiyet serisi, 7 günlük ödül, ürün albümü.
- **Mahalle kilidi:** sonraki mahalle o mahallede 75 yıldızla açılır.
- **Müşteriler:** 21 kişi, 88 görünüş (renk ve desen çeşitleri); yaşa göre istek eğilimi.
- **Diğer:** ana sayfa düğmesi; "Erime" yerine "Bozulma"; etiketli gazoz (Birlik Zeytin
  esinli, yazısız).

## 3. Çalışma kuralları (Kemal'in bu oturumda koyduğu)

- **Liste, sonra "tamam":** "Yazdıklarımı direkt yapma, ben sana tamam dediğimde toplu
  halledersin." İstekler listeye yazılır, tıklamalı sorularla netleşir; Kemal "tamam"
  deyince toplu yapılır, tek PR açılır, ekran görüntüleri toplu gönderilir.
- **Ekran denetimi:** her değişiklikten sonra `node araclar/ekran-denetimi.cjs` (önce
  `npm run build` ve `npx vite preview --port 4173`). 18 durum × 2 telefon boyutu;
  sorun 0 olmalı. Çıktı `denetim-ciktisi/` (depoya girmez).
- **Canva:** çizimler Kemal'in "DK Lite çalışma (7. paket görselleri)" tasarımına kaydedilir
  (izinli; son sayfa 21). Kaynaklar `docs/lisanslar.md`. Örnek resim vermek çoğu zaman
  bütün sayfayı yeniden çizdirir; yazıyla tarif daha iyi sonuç verdi.
- **Kemal'in tercihleri:** siyasi duruş çağrıştıran simge yok; görsel dil renkli ve sade.

## 4. Ajansın yapacakları

1. **Eski dalları sil** (bu oturumdan silme izni yok; GitHub 403). Hepsinin içeriği ana
   dalda: `ajans/` ile başlayan 38 dalın tamamı. Liste:
   150-bolum, arayuz-dili, arayuz-tamami, bantta-kulah, bar-3b-arka-plan, belge-tutarlilik,
   belgeler-son-hal, bolum-30-kiz-duzeltme, buyuk-paket-30-10, can-sandik, cevaplar-29-32,
   duzada-duraklari, ekran-goruntuleri, erime, fular-boyun, gece-22-10, gorsel-deneme-canva,
   gorsel-iyilestirme, ilk-belgeler, kararlar, kutulu-bolumler, musteri-boyu, musteri-renk,
   numarali-bolumler, ortak-sakli-toplar, oyun-arayuzu-dk-gorselleri, paket-1,
   paket-7-gorseller, sandik-zor, sayac-bolum-sonu, sinirli-gorunum, soru-turu-29-10,
   tam-boy-musteri, tek-tek-gonder, yeni-dizilis, yeni-liste, yeni-urun, yol-haritasi-bolum.
   Bu raporun dalı (`ajans/devir-raporu`) birleşince o da silinir.
2. **İş listesine yaz** (`kkm/isler.json`): aşağıdaki 5. bölümdeki kararlar Kemal'den
   beklenenler olarak.
3. **Kullanılmayan resimler:** `public/gorseller/arka-plan.webp`, `sahil-yolu.webp` kodda
   kullanılmıyor; Kemal onaylarsa silinir.

## 5. Kemal'in kararını bekleyenler

- Oyunun yayın adı (kısa, DK ile ilgili; "şu anda düşünmedim").
- Yeni öğelerin adları (buzlu top, gizli top, aceleci müşteri, kilitli sütun) ve yeni
  kişilerin adları (varsa).
- Zorluk: Kemal telefonda oynayıp söyleyecek (zor bölümler, 121'den sonrası; otomatik
  oyuncu 121'i kaybetti).
- Deneme sayıları: buzlu/gizli top oranları, aceleci sabrı, yaş eğilimi (2 kat), yardımcı
  süreleri, sandık şansları.
- "Biraz daha tatlı çizebilirsin": ekip "birkaç tatlı daha" diye anladı; "daha sevimli
  çiz" demekse dönülecek.
- Etiketli gazozdaki beyaz kabarcıklar küçük boyutta bayrağı andırırsa kaldırılacak.

## 6. Bilinen eksikler

- Gerçek telefonda denenmedi.
- Uygulama bölüm ortasında kapatılırsa can gitmez (yarıda bırakma sayılmaz).
- Para modeli ve ses yok (yayın dönemine).
