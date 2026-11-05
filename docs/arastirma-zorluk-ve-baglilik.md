# DK Lite · Araştırma: zorluk ve oyuncuyu tutan yapılar

Yazan: Oyun Tasarımcısı (Kems Ajans). Tarih: 5 Kasım 2026. Bu bir araştırma
notu ve öneridir; karar Kemal'in.

Ne istendi (Kemal, 5 Kasım akşamı): "Bölümleri de 50'ye getir şu an için. Ama
hani nasıl zorlaştıracağız, nasıl zorluk olacak bilmiyorum. Bu tarz oyunları
araştır, bul. ... Oyun oynayan oyuncuları nasıl bu oyunların içinde tutuyor? O
yapıları birazcık öğrenelim. Kendimize göre kurmayı deneyelim."

Kural: başka oyunların adı, görseli, karakteri alınmaz; yalnız yapı (nasıl
çalıştığı) öğrenilir. Aşağıda adı geçen oyunlar yalnız kaynakta örnek olarak
geçtiği için yazıldı.

## 1. Bulunanlar

### Zorluk nasıl artıyor

- **Testere dişi:** Zorluk düz bir çizgiyle artmıyor; birkaç bölüm yavaşça
  yükseliyor, sonra bir zor bölüm geliyor, ardından rahatlatan bir bölüm. Bir
  bulmaca oyunu üzerine yapılan çalışmada bölüm üretici bilerek testere dişi
  biçiminde bir zorluk çizgisi kuruyor; bin kadar oyuncunun oyunu bunu
  doğruluyor ([ELIMINATION çalışması](https://arxiv.org/pdf/2107.03305v1)).
- **Düz artış sorunlu:** Hep yükselen bir çizgide ileri bölümler o kadar
  zorlaşıyor ki oyuncu bırakıyor ([match-3 zorluk çalışması](https://koreascience.kr/article/CFKO201920461758328.pdf)).
  Çok kolay sıkar, çok zor kızdırır.
- **Zor bölüm sıklığı:** Çoğu oyunda kabaca **5 bölümde 1** zor bölüm var;
  sık olanında 4'te 1, seyrek olanında 8'de 1. İlk zor bölüm genelde ilk
  10 bölüm civarında başlıyor. Zor bölümler haritada **renkle işaretleniyor**
  (incelenen 500 oyunun %64'ünde); bazıları başlangıç penceresinde "zor"
  yazıyor ([Playliner özeti, wnhub](https://wnhub.io/news/game-design/item-14053)).
- **Yeni öğe:** İleri bölümlerde zorluk yalnız sayılarla değil, yeni engel ve
  öğelerle de artıyor (bölüm karmaşıklığı zamanla büyüyor; [Aalto tezi](https://aaltodoc.aalto.fi/items/40973f30-ade7-4412-98d4-8ea34a0b0d55)).
- **Uyarı:** Oyuncu yorumlarında "zor" ve "çok zor" bölümlerin her oturumda
  gelmesinden ve parayla geçilecek kadar zor bölümlerden şikâyet var
  ([mağaza yorumları](https://apps.apple.com/app/1577533842)). DK Lite "sakin
  oyuncu" için; zor bölüm seyrek olmalı.

### Oyuncuyu ne tutuyor

- **Günlük ödül:** En çok satan rahat oyunların hepsinde var; art arda
  girdikçe ödülün büyüdüğü takvim kısa vadeli bir hedef veriyor
  ([GameRefinery, wnhub](https://wnhub.io/news/analytics/item-2240)).
  Bir çalışmada oyuncuların geri dönme nedeni olarak en çok "günlük seri
  ödülü" söylenmiş ([Mobidictum](https://mobidictum.com/?p=202388)).
- **Galibiyet serisi:** Art arda kazandıkça büyüyen küçük ödül (başlangıçta
  yardım ya da puan katı). Birkaç büyük bulmaca oyununda gelire belirgin
  etkisi raporlanmış ([Liquid & Grit](https://www.liquidandgrit.com/category/casual-reports/)).
- **Basit oyun + zengin "üst katman":** Başarılı olanlar oynanışı basit
  tutup çevresine koleksiyon, ödül sandığı, günlük ödül gibi bir katman
  sarıyor ([App Annie, PocketGamer](https://www.pocketgamer.biz/app-annie-reveals-the-top-10-retention-tactics-which-turn-first-time-users-into-repeat-players)).
- **Sıralama oyunları için önerilen üst katmanlar:** hikâye, günlük/haftalık
  görev, galibiyet serisi, tema açma, sıralama tablosu, koleksiyon,
  dükkân/oda süsleme, kişisel istatistik ([Costcenter](https://costcenter.net/post/metagame-mechanics-for-sort-puzzles)).
- **Ne kadar rahat, o kadar zor tutmak:** Oyun ne kadar rahatsa öğrenmesi o
  kadar kolay ama oyuncuyu tutmak o kadar zor ([ironSource](https://medium.com/ironsource-levelup/retention-framework-keep-your-players-forever-43fa60298abf)).

Not: Bazı sayfalardaki yüzdeler kaynağı belirsiz olduğu için buraya alınmadı.

## 2. DK Lite'ta bugün olanlar

- Yıldız (puana göre), yeni ürün açılır, can (5; 15 dakikada 1 dolar),
  10 bölümde bir sandık.
- Zorluk "kolları" (oyunda zaten var, `src/ayarlar.ts`): müşteri sayısı, bir
  müşterinin istediği adet, çeşit sayısı, bant yeri, iki çeşit isteyenlerin
  oranı, sabır süresi, fazla top oranı.
- 50 bölüm var; ama 35. bölümden sonra kural her şeyi en üst sınıra
  vurduğu için **35–50 arası aynı zorlukta** (düz çizgi). Bu değişmeli.
- Dükkânı süsleme Kemal'in kararıyla yok (5 Kasım: "Dükkan kısmını sevmedim.
  Onu koymayalım hiç").

## 3. Bize göre öneri (karar Kemal'in)

### Zorluk: 10'luk dilimlerde testere dişi

Her 10 bölüm bir "dilim":
- 1.–4. bölüm: yavaş artış (bugünkü gibi her adımda bir şey biraz zorlaşır).
- 5. bölüm: **zor** (kutusu Bölümler ekranında farklı renk ve "Zor" yazısı).
- 6. bölüm: rahatlatan bölüm (bir önceki normal bölümden biraz kolay).
- 7.–9. bölüm: yavaş artış.
- 10. bölüm: **çok zor** (farklı renk, "Çok zor"); kazanınca sandık (zaten var).
- Sonraki dilim bir önceki dilimin ortasından başlar, ondan biraz zor; böylece
  genel çizgi yavaşça yükselir ama her dilimde nefes alınır.
- Sıklık 5'te 1 zor bölüm (araştırmadaki ortalama). İlk zor bölüm 5. değil,
  10. bölüm olabilir (yeni oyuncu alışsın diye): [Kemal].

### Yeni öğe: her 10 bölümde bir yeni şey

Sayılar bir yerde tavana vuruyor; ondan sonra zorluk yeni öğelerle gelir. Her
dilimin başında bir yeni öğe tanıtılır (önce kolay bir bölümde, sonra
zorlarda). DK Lite'ın oynanışına uyan öneriler (adları Kemal'in; aşağıdakiler
yalnız ne olduğunu anlatır):
- **Buzlu top:** sütunda buz içinde top; iki dokunuşta çözülür, sonra gider.
- **Gizli top:** sütunda rengi görünmeyen top; en üste gelince açılır.
- **Aceleci müşteri:** sabrı kısa, ama karşılanınca ek puan.
- **Kilitli sütun:** bir müşteri karşılanınca açılan sütun.
- **Çok isteyen müşteri:** çok adet ister, karşılanınca ek puan.

### Oyuncuyu tutmak: sıradaki adaylar

1. **Galibiyet serisi:** art arda kazanılan bölümlerde küçük yardım (ör. bant
   yeri bir fazla); kaybedince seri sıfırlanır. Kurallar ve sayılar [Kemal].
2. **Günlük ödül:** her gün girince küçük ödül; art arda günlerde büyür
   (ör. 7. gün sandık).
3. **Yardımcılar:** bir bölümde bir kez kullanılan yardım (ör. bandı boşalt,
   bir sütunu karıştır). Sandıktan ya da seriden kazanılır. Galibiyet serisi ve
   günlük ödül için ödül olarak da gerekir.
4. **Koleksiyon albümü:** açılan ürünler ve müşteriler bir albümde görünür.

Her biri ayrı küçük paket; önce Kemal görür. Para modeli (bir şeyin parayla
alınması) yayın döneminde.
