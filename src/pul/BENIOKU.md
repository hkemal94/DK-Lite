# src/pul: pul koleksiyonu (yalnız kayıt yapısı)

Kems'in bütün oyunlarında ortak olan pul koleksiyonunun (Kemal, 15–16 Kasım 2026; tasarım
belgesi 0.49) DK Lite'taki yeri. Ortak standart: Kems Ajans deposunda `docs/pul-koleksiyonu.md`.
Düzen kart oyunundaki `src/pul/` klasöründen alındı.

- `seri.ts`: 3+1 hesabı (kart oyunundakiyle birebir aynı). Girdi: kazanılan aylar (`"YYYY-AA"`
  listesi) ve bugün. Saf; ekrana dokunmaz.
- `pullar.ts`: görsel kaydı. Anahtar `"YYYY-AA"` (aylık pul) ya da `"YYYY-Q1"`..`"YYYY-Q4"`
  (büyük pul). DK Lite'ın onaylı pulu henüz yok; kayıt boş.

Henüz yok (sonraki işler, sırası Kemal'le):

- Ayın görevi (0.49): bitince o ayın "kazanılan aylar" listesine girmesi. Sayılar [Kemal].
- Pul çerçevesi ve koleksiyon sayfası. Kart oyunundaki `Pul.tsx` ve `KoleksiyonSayfasi.tsx`
  React ile yazılı; DK Lite React kullanmadığı için taşınırken yeniden yazılır.

KKM → Ürünler → Pullar bu klasörü okumaz; bütün oyunların pul kaydı Kems Ajans deposundaki
`kkm/pullar.json`'da (DK Lite satırı `dk-lite`).
