# DK Lite — Oyun Tasarım Belgesi

**Proje:** DK Lite (Kems Company)
**Aşama:** Tasarım kararları verildi (Kemal, 21 Ekim 2026). 1.–5. paket (çizimsiz deneme oyunu, erime kuralı, sayaçlar ve bölüm sonu, numaralı bölümler, çizimsiz bölüm haritası) ve gece işleri (renk, giriş ekranı, duraklatma, hızlandırma, 10 bölüm ve daha yavaş zorluk; 0.10) bitti, ana dala birleşti. Kemal'in 22 Ekim akşamı harita ve hız cevapları işlendi (0.12; 28 Ekim 2026, öneri). Oyun ekranına Dondurmacı Kızlar görselleri kondu (0.13; 29 Ekim 2026). Oyun ekranının yeni hâli için soru turu yapıldı (0.14; 29 Ekim 2026).
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

### 0.20 Müşteriler barın arkasında, üç boyutlu bant ve bar, saydam arka plan (öneri; 30 Ekim 2026)

Kemal'in isteği (telefondan iki ekran görüntüsüyle): "Insanlar barin arkasina sığmıyor bant ve bar da biraz uc boyutlu olsun ayrica arkaplan gorseli biraz daha seffaf ve tum sayfaya yayilsin".

Öneri oyununda böyle yapıldı:
- Bant artık yuvarlak uçlu değil, köşeleri yuvarlatılmış bir dikdörtgen; üst kenarı uzadı. Müşteriler bandın dış eni boyunca dizilir, hepsi barın arkasında durur (eskiden ekranın enine dizilip kenardakiler barın dışında kalıyordu). Toplar bandın yeni biçimi üstünde döner.
- Müşteri resmi biraz büyüdü; belden aşağısı barın arkasında kalır.
- Üç boyut: bandın altında koyu mor bir yan yüz ve yere düşen gölge; bandın üstü üstten ışık alır gibi; iç kenarda içe doğru gölge. Bar: arka duvar kenarlara doğru koyulaşır, rafların altında gölge, bar tezgâhında ışık alan üst yüz ve öne bakan ahşap yüz. Tezgâhın önündeki mor-sarı çizgiler aşağı doğru koyulaşır.
- Arka plan resmi (dükkândan dışarısı) bütün sayfaya yayılır ve biraz saydamdır (yarıdan biraz fazla görünür); sütunlar da onun üstünde durur.
- Kurallar ve sayılar değişmedi.
- Ekran görüntüleri: `docs/ekran/bar-3b/`.
- Müşteri boyu (Kemal, 30 Ekim: "Musteriler boyunlarindan yukari gorunuyor boylari daha cok gorunmeli"): müşteri resmi büyüdü (büyük telefonda 86 piksel; kısa ekranda bar sıkışmasın diye ekran yüksekliğine göre küçülür, en az 60), barın arkasında kalan kısmı azaldı; müşteriler belden yukarı görünür. Ekran görüntüleri: `docs/ekran/musteri-boyu/`.

### 0.19 Büyük paket: bar, sabır, fiş, ayarlar, sahil yolu (öneri; 30 Ekim 2026)

Kemal: "Başla" (0.18'deki iki soru turundan sonra). Öneri oyununda böyle yapıldı:

Bar ve dondurmacı:
- Bandın içi ahşap kafe barı: ahşap duvar, iki raf, önde ahşap bar tezgâhı. Üst rafta kahve makinesi, bardaklar, şeker kavanozu, külah yığını, saksı, kâse; alt rafta kâsede meyve, dilim pasta, kırmızı ve sarı şurup, küçük kek, limonata. Eşyalar Canva ile aynı tarzda çizildi.
- Dondurmacı tam ortada, orta boy, barın arkasında; belden aşağısı bar tezgâhının arkasında kalır. Yerinde hafifçe nefes alır gibi oynar; sütuna dokununca kısa bir zıplama yapar.
- Bandın altındaki mor-sarı çizgili ön yüz ve logo kaldı.

Bölüm uzunluğu (DENEME): müşteri sayısı 10–15 (eskiden 8–12), müşteri başına adet 2–4'ten 3–5'e kadar; bölümdeki toplam istek yaklaşık 1,5 kat (ör. Bölüm 1: 21 → 32). Çeşit sayısı, bant yeri, iki çeşit oranı aynı. Bütün bölümler kazanılabilir kuruldu.

Sabır:
- Her müşterinin balonunun altında sabır çubuğu: 60 saniyede biter (Kemal'in seçimi). Yarıdan azında sarı, dörtte birden azında kırmızı (eşikler deneme).
- Sabrı biten müşteri istediğini alamadan gider; başında küçük üzgün yüz çıkar, solar. Onun puanı alınamaz.
- Bir bölümde 3 müşteri giderse bölüm kaybedilir ("Müşteriler gitti").
- Oyunun saati durunca (duraklatma, harita, giriş) sabır da durur; hızlandırınca sabır da 2 kat hızlı akar.

Müşteri tepkileri ve seri:
- Müşteri bir şey alınca kazanılan puan ("+10") küçük yeşil bir yazıyla yukarı uçar; isteği tamamlanınca başında kalp çıkar.
- Seri (DENEME): görünen bir müşterinin hâlâ istediği (bantta olanlar düşüldükten sonra) bir şeyi göndermek "doğru" sayılır; art arda 3. doğru gönderimden itibaren her doğru gönderim +2 ek puan getirir ve sütunun üstünde "Seri ×3 +2" yazısı uçar. Yanlış gönderim seriyi sıfırlar.
- Yıldız eskisi gibi puana göre (Kemal: "Puana göre kalsın"); seri ek puanı yıldız hesabına girmez ki yıldız kolaylaşmasın (şefin yorumu).

Bölüm sonu fişi:
- Kâğıt fiş: üstte logo ve "Bölüm 3", sonuç yazısı; bölümün ürünleri simgeleriyle ve kaç tane satıldığı; hizmet edilen müşteri (11 / 14 gibi) ve giden müşteri (varsa kırmızı); "TOPLAM PUAN"; kazanınca yıldızlar; en altta teşekkür satırının yeri `[Kemal]`.
- Kazanınca: yıldızlar teker teker parlayarak gelir, konfeti dökülür, fişin üstünde sevinen dondurmacı (aynı karakter, kollar havada; Canva) sallanır.
- Kaybedince de fiş çıkar (sonuç: "Bant doldu", "Top kalmadı" ya da "Müşteriler gitti"); yalnız "Tekrar oyna".
- Duraklatma, bölüm sonu ve ayarlar kutuları çizgi film tarzında: krem zemin, kalın kahverengi hat, gölgeli düğmeler.

Ayarlar: giriş ekranının sağ üstünde dişli. İçinde "Erime" (Erime yok / 1 tur sonra / 2 tur sonra) ve "Titreşim" (Açık / Kapalı; açıkken sütuna dokununca telefon çok kısa titrer, telefon destekliyorsa). Seçimler telefonda saklanır; erime seçimi artık sayfa yenilenince de kalır. Üst şeritteki erime düğmesi de duruyor (Kemal: "Şimdilik kalsın"), ikisi aynı seçimi kullanır.

Bölüm seçme ekranı: sahil yolu. Arkada çizilmiş sahil manzarası (solda deniz ve tekneler, sağda zeytinlik, kayalar, beyaz evler; Canva). Üstünde aşağıdan yukarı kıvrılan kum rengi yol, ortasında kesik beyaz çizgi; açılan bölüme kadarki kısmı sarı. 1. bölüm en altta, altında "Dondurmacı Kızlar" yazısı. Ekran yukarı kaydırılır; açılınca kaldığın bölüm ortaya gelir. Bölüm sayısı artınca yol kendiliğinden uzar (manzara alt alta tekrar eder; dikiş görünmesin diye üst yarısı alt yarısının aynadaki hâli). Geçilmiş bölüm mor ve yıldızlı, sıradaki sarı, kilitli soluk; dokununca başlar. Eski ada haritası ve onu üreten araç kaldırıldı (`src/haritaVerisi.ts`, `araclar/haritaUret.mjs`).

Yapılmayanlar (Kemal'in kararıyla sonraya): sesler ve nasıl oynanır gösterimi yayına yakın.

Ekran görüntüleri: `docs/ekran/buyuk-paket/`.

### 0.18 İki soru turu: oynanış, ekranlar, bar (Kemal, 30 Ekim 2026; sohbette)

Kemal'in cevapları:
- Zorluk: bölümler "Kısa geldi". Nasıl uzasın: "İkisi birden, az az" (müşteri sayısı ve müşteri başına adet); ne kadar: "Biraz (1,5 kat)".
- Müşteri sabrı: "Sabir bitince gider ama cok hizli bitmesin sabir"; süre "Uzun: 60 saniye"; gidince "1 ve 2 beraber" (o müşterinin puanı alınamaz ve bir bölümde 3 müşteri giderse bölüm kaybedilir).
- Sabır nasıl anlaşılsın: "Çubuk renk değiştirsin", "Giderken el sallasın" (gidenin başında üzüntü işareti).
- Nasıl oynanır gösterimi: "Şimdi için değil yayına yakın yaparız".
- Erime düğmesi: "Şimdilik kalsın".
- Bölüm seçme ekranı: "Sahil yolu çizimi"; bölüm sayısı için "Uzayabilir yol".
- Bölüm sonu: "Parlak yıldızlar", "Konfeti", "Sevinen dondurmacı", "Kaçan müşteri sayısı" ve "Bir receipt ekrani olabilir bolum sonu gibi". Fişte: satılan ürünler, puan ve yıldız, müşteri sayıları, dükkân başlığı. Teşekkür satırı: "Boş kalsın [Kemal]".
- Kutular çizgi film tarzına: "Evet".
- Ayarlar: "Şimdi, basit"; içinde erime seçimi ve titreşim aç/kapa.
- Sesler: "Yayına yakın".
- Yıldız: "Puana göre kalsın".
- Sıra: "Hepsi bir arada".
- Telefonda: "Bağlantıdan açıyorum".
- Bar (Kemal'in isteği: "bantın ortasını bir bar gibi tasarla ve barmaid biraz daha ortalansin ve gorunur olsun"): "Ahşap kafe barı"; dondurmacı "Ortada, orta boy"; yan ürünler "Raflara gitsin"; hareket "İkisi de" (hafif sallansın ve dokununca tepki).
- Seri: "Ek puan". Müşteri isteğini alınca: "İkisi de" (kalp ve uçan puan). Tezgâh önü (logolu mor-sarı çizgili yüz): "Kalsın".

### 0.17 7. paket: görseller oyuna girdi (öneri; 30 Ekim 2026)

Kemal'in isteği: "Birleştirdim, başlayabilirsin" (30 Ekim) ve Canva hesabına "DK Lite çalışma" tasarımı kaydetme izni ("Evet, izin veriyorum"; yalnız 7. paket boyunca, yalnız ekibin açtığı çalışma tasarımı).

Öneri oyununda böyle yapıldı (tarz: parlak çizgi film, 0.16):
- Canva ile dört resim çizildi: ürünler (12), müşteriler (10), dondurmacı, arka plan; gazoz kolaya benzediği için ayrıca yeniden çizildi. Resimler tek tek kesilip oyuna kondu. Kaynaklar ve bağlantılar: `docs/lisanslar.md`.
- Ürünler: dondurma topları, tatlılar ve içecekler artık el çizimi resim (eski düz şekiller kalktı). Limon topu vanilyadan ayrılsın diye biraz daha sarı.
- Müşteriler: 10 farklı kişi, belden yukarısı; Dondurmacı Kızlar'dan alınan geçici 3B resimlerin yerine.
- Dondurmacı: sarı tişört, mor önlük, mor kasket, elinde dondurma kaşığı; tezgâhın ortasında. İki yanında tezgâhta kâsede meyve, dilim pasta, küçük kek, limonata.
- Arka plan: dükkânın açık kapısından deniz, taş iskele, deniz feneri (künyede Liman'da Deniz Feneri var), zeytin ağaçları, beyaz evler. Yer adı yok.
- Tente, bant, tezgâh önü ve sütunlar aynı tarzda: koyu kahverengi kalın hat; sütunlar ahşap raf gibi; sütunların arkası sıcak krem (eskiden açık lila). Üst şeridin arkasına okunsun diye yarı saydam açık zemin.
- Giriş ekranı: arkada aynı manzara; oyunun adı yerinde dükkânın logosu ve mor "Lite" (0.14: "Dondurmacı Kızlar Lite" şimdilik çalışma adı). `[Kemal]` yer tutucusu kalktı.
- Oyunun kuralları, sayılar, düğmeler değişmedi. Bölüm haritası ve bölüm sonu kutusu bu pakette değişmedi (haritanın çizimi sıradaki adım).
- Ekran görüntüleri: `docs/ekran/paket-7/`.
- Bantta külah (Kemal, 30 Ekim: "Itemleri banta attığımda top dondurmalar külahın üzerinde görünecek değil mi"; seçimi "Bantta"): banda giden dondurma topu külahın ağzında döner, müşteriye külahıyla gider. Sütunlarda ve istek balonunda çıplak top kalır. Tatlı ve içecek değişmedi. Külah Canva ile aynı tarzda çizildi (`public/gorseller/kulah.webp`). Kural değişmedi. Ekran görüntüsü: `docs/ekran/paket-7/5-bantta-kulah-390x844.png`.

### 0.16 Görsel tarzı: parlak çizgi film (Kemal, 30 Ekim 2026)

6. paketteki iki Canva denemesinden (`docs/gorseller/deneme-canva/`) Kemal'in seçimi, olduğu gibi: "Parlak cizgi film iyi".
- DK Lite'ın görsel tarzı: parlak çizgi film; kalın hatlar, canlı renkler, el çizimi 2D (0.4 sürer), Dondurmacı Kızlar teması (0.14).
- Örnek resim: https://www.canva.com/M/MAHZWRtI0gY (Kemal'in Canva hesabında). Resim birebir oyuna girmez; 7. pakette oyunun parçaları bu tarzda ayrı ayrı çizilir.
- Suluboya denemesi seçilmedi.

### 0.15 Yeni diziliş ve yeni kurallar, çizimsiz (öneri; 29 Ekim 2026 gecesi)

Kemal'in isteği: 0.14'teki soru turu ve "Yatıyorum, limitler dahilinde çalışabilirsin" (29 Ekim gecesi). Öneri oyununda böyle yapıldı:

Ekran (yukarıdan aşağı):
- En üstte mor-sarı çizgili tente, alt kenarı dalgalı.
- Arkada dükkândan dışarısı: açık mavi gök, altında deniz (bandın ortasına kadar). Yer adı yok.
- Üst şerit (bölüm, erime düğmesi, müşteri / puan / bant sayaçları, hız ve duraklatma) tentenin altında; eskisi gibi.
- Müşteriler tezgâhın arkasında: istek balonu başlarının üstünde, belden aşağısı tezgâhın (bandın) arkasında kalır.
- Ortada tezgâh: mor bant tezgâhın çevresinden döner (iç kenarında sarı çizgi). Tezgâhın üstünde ortada dondurmacı, iki yanında külahlar, sundae, krem şanti, yazar kasa.
- Dondurmacı: Dondurmacı Kızlar'ın dükkân üniforması (sarı tişört, mor önlük, mor kasket). Resim Dondurmacı Kızlar'daki çalışan modelinden bu iş için çekildi; adı yok. Geçici.
- Tezgâhın önü: bandın altından görünen mor-sarı dikey çizgiler, ortada dükkânın logosu (Dondurmacı Kızlar deposundaki logo).
- Altta sütunlar; dokununca gider (değişmedi).

Ürünler:
- Harfler kalktı. Dondurma çeşitleri yuvarlak, alttan dalgalı top: çikolata (kahverengi), çilek (pembe, kırmızı benekli), limon (sarı), fıstık (yeşil), vanilya (krem, ince benekli). Tatlılar ve içecekler açık renk bir tabağın üstünde sade simge: dilim pasta, küçük kek, kâsede meyve, limonata, gazoz, kahve, çay. Hepsi düz şekil (çizimsiz); çizimler gelince yerine geçer.
- Hangi bölümde hangi ürünler (DENEME): çeşit sayısı eski tablodaki gibi kaldı (1–5: 3 çeşit, 6–10: 4 çeşit) ki zorluk değişmesin; yalnız türler değişir. 1: çikolata, çilek, limon; 2: çikolata, çilek, fıstık; 3: limon, vanilya, dilim pasta (ilk tatlı); 4: çilek, fıstık, küçük kek; 5: çikolata, vanilya, kâsede meyve; 6: çilek, limon, dilim pasta, limonata (ilk içecek); 7: çikolata, fıstık, küçük kek, gazoz; 8: vanilya, çilek, kâsede meyve, kahve; 9: limon, çikolata, dilim pasta, çay; 10: fıstık, vanilya, küçük kek, limonata. Her bölümde en az iki dondurma çeşidi var.
- Tatlı ve içecek de bir "top" gibidir: sütunda bir yer, bantta bir yer kaplar, bir topun puanını getirir, erime kuralı ona da uyar (0.14'teki şef notu böyle uygulandı).
- Tatlılar ve içecekler sütunlarda dondurmalarla aynı karışık sırada gelir (0.9'daki karıştırma kuralı sürer).

İki çeşit isteyen müşteri:
- 6. bölümden başlar ("Ortalardan itibaren"). Oran (DENEME): 6–7. bölümde müşterilerin yaklaşık %30'u, 8–9'da %40'ı, 10'da %50'si.
- Müşterinin istediği toplam adet (tablodaki gibi, ör. 2–4) iki çeşide bölünür; her birinden en az bir tane. Balonda iki satır: her çeşidin simgesi ve kalan adedi. Bir çeşit bitince o satırda ✓ olur ve soluklaşır; ikisi de bitince müşteri gider.
- Bütün bölümler yeni kurallarla kazanılabilir kuruldu (denetim iki çeşidi de biliyor). 1., 6., 9. ve 10. bölüm baştan sona kendiliğinden oynatılıp kazanıldı.

Ekran görüntüleri: `docs/ekran/yeni-dizilis/` (1. bölüm 390x844; 6. bölüm 390x844, iki çeşit isteyen müşteri, dilim pasta ve limonata; 9. bölüm 360x640).

### 0.14 Oyun ekranının yeni hâli (Kemal, 29 Ekim 2026; sohbette soru turu)

Kemal bir örnek oyun ekranı paylaştı (`docs/gorseller/kemal-taslak/5-oyun-ekrani-29-10.jpg`; köşesinde "Dondurmacı Kızlar Lite" simgesi var) ve "Ekran mantığı olarak buna benzememesi normal mi?" diye sordu. Ardından uzun bir soru turu yapıldı. Kemal'in cevapları:

Ekranın dizilişi:
- Diziliş: "Resimdeki gibi". Tezgâh ortada büyük, bant tezgâhın çevresinden döner, müşteriler tezgâhın arkasında durur.
- Tezgâhın ortasında dondurmacı bir kız görünür: "Evet, ortada dursun". Adı ve hikâyesi yok, yalnız görüntü.
- Sayaçlar: "Şimdiki sayaçlar" (müşteri, puan, bant doluluğu); yalnız görünüşleri güzelleşir.
- Gönderme: "Dokununca gitsin" (şimdiki gibi; resimdeki "Oynamak için tutun" alınmaz).
- Bölüm başında sütunların üstü: "Karışık kalsın" (0.9 sürer).

Çeşitler ve yeni kurallar:
- Harflerin yerine gerçek dondurma çeşitleri: çikolata, çilek, limon, fıstık, vanilya.
- Bir müşteri kaç çeşit ister: "İleriki bölümlerde 2". İki çeşit isteyen müşteriler "Ortalardan itibaren" gelir (10 bölümün yarısından sonra; tam bölüm deneme değeri, Kemal oynayıp söyler).
- Sütunlarda tatlılar da olur: dilim pasta, küçük kek, kâsede meyve. Kemal: "İçecekler de; zorlaştıkça çeşitler eklensin işte". İçecekler: limonata, gazoz, kahve, çay. Hangi bölümde hangisinin geleceği deneme değeri.
- Tatlılar ve içecekler: "Resimdeki gibi"; aynı sütunlarda, dondurmaların altında karışık sırada gelir.
- Yeni kurallar (iki çeşit isteyen müşteri, tatlılar, içecekler) yeni dizilişle birlikte gelir.

Görünüş:
- Tarz: "Yakın ama Dondurmacı Kızlar temasında". Resimdeki el çizimi tarza yakın; resmin görselleri, karakterleri birebir alınmaz.
- Dondurmacı Kızlar teması: mor-sarı çizgili tente, dükkânın logosu, mor-sarı tezgâh (resimdeki gökkuşağı renkli tezgâh önü yerine), dondurmacının önlüğü ve saç bandı dükkân renklerinde.
- Arka plan: "Dükkândan dışarısı gibi" (dükkân Liman'da, iskelenin yakını; künyede olmayan yer adı yazılmaz).
- Oyunun adı: "Şimdilik çalışma adı". Ekranda "Dondurmacı Kızlar Lite" çalışma adı olarak kullanılır; son ad sonra belli olur.

Sıradaki iş:
- "İkisi birlikte": çizimsiz yeni diziliş (yeni kurallarla) ve 6. paket görsel denemesi, iki ayrı öneri olarak aynı anda.
- Görsel denemesi aracı: "Önce Canva ile" (Scenario sonra; 0.4'teki 22 Ekim kararı böyle daraldı).

Bunlardan çıkanlar (şefin notu):
- 0.13'teki geçici Dondurmacı Kızlar resimleri yeni dizilişte de kullanılabilir; çizimler gelince yerine geçer.
- 0.6'daki "en çok 5 müşteri" ve 0.7'deki fazla top oranı sürer. Tatlı ve içecek de bir "top" gibi sayılır (bir yer kaplar, bir puan getirir); kesin kural yeni dizilişin önerisinde Kemal'e gösterilir.

### 0.13 Oyun ekranına Dondurmacı Kızlar görselleri (Kemal, 29 Ekim 2026)

Kemal'in isteği, olduğu gibi: "Dondurmaci kizlar oyunundan ilgili assetleri cekip gameplay kismina bir arayuz hazirlayabilirsin basitce"

Öneri oyununda böyle yapıldı (geçici; el çizimi 2D görseller 6. ve 7. pakette gelince yerine geçer):
- Müşteriler: koyu mor kutuların yerine Dondurmacı Kızlar'daki müşteri karakterlerinin belden yukarısı (10 kişi). Art arda gelen müşteriler sırayla farklı görünür. Kişinin altında ince bir tezgâh çizgisi.
- Bandın ortası tezgâh oldu: Dondurmacı Kızlar'dan külahlar, iki sundae, ortada büyük külah figürü, krem şanti ve yazar kasa yan yana.
- Toplar dondurma topu gibi: sol üstte hafif parlaklık. Renkler ve harfler aynı.
- Oyunun kuralları, sayılar, düğmeler, giriş ekranı, harita değişmedi.
- Resimler Dondurmacı Kızlar deposundan alındı (oradaki hazır, ücretsiz kullanılabilen 3B paketlerden çekilmiş resimler); müşteri resimleri oradaki modellerden bu depo için çekildi. Liste ve lisans: `docs/lisanslar.md`. Dondurmacı Kızlar'ın oyun ayarları (fiyat, süre, oran) taşınmadı.
- 0.4 ile ilişkisi (şefin notu): 0.4'te görsel stil el çizimi 2D, ana oyunun 3B modelleri doğrudan kullanılamaz deniyordu. Bu resimler o modellerin düz resmi; Kemal istediği için geçici olarak kondu. Son görsel dil 6. pakette Kemal seçince belli olur.
- Ekran görüntüleri: `docs/ekran/oyun-arayuzu/` (390x844, 360x640).

### 0.12 Harita ve hız cevapları (Kemal, 22 Ekim 2026 akşamı; panodaki cevaplar)

Kemal'in cevapları, olduğu gibi:
- Hızlandırma katı: "2 kat (şimdi oyunda böyle)"
- Bölüm yolunun yönü: "Bunun cidden bir onemi yok"
- Haritada Merkez: "Belki yuzlerce bolum yapacagiz bunun onemi yok"
- Haritanın ekrandaki duruşu: "Cizim yapariz bunun icin harita olmak zorunda degil"

Bunlardan çıkanlar (şefin notu; oyunda ekranda hiçbir şey değişmedi):
- Hızlandırma 2 kat artık Kemal'in kararı, öneri değil (`src/ayarlar.ts`, `HIZ_KATI`; yalnız not değişti).
- Yolun yönü (saat yönünde, İskele'de biter) ve Merkez'in bölüm noktasız durması şimdiki gibi kalır; Kemal için önemli değil, soru kapandı. Bölüm sayısı ileride çok artabilir ("belki yüzlerce bölüm"); yolun nasıl uzayacağı o zaman konuşulur.
- Haritanın duruşu (kuzey yukarıda) şimdiki gibi kalır. Kemal'in cevabından şefin yorumu: 7. pakette harita ekranı çizimle yapılır; KKM haritasının biçimine birebir bağlı kalmak zorunlu değil. Künyedeki yer adları kuralı (2.3) sürer.

### 0.11 Bölüm haritası, çizimsiz (Kemal, 22 Ekim 2026; panodaki soru turu)

Kemal'in kararları (CEO iletti):
- Harita Düzada'ya uyarlanır: Ege; zeytin, kayalık, koylar; yanardağ ve palmiye yok.
- Yol dükkânın olduğu Liman'dan başlar, Sahil Yolu boyunca öbür mahallelere gider (Kemal'e sorular 1'in (a) seçeneği; soru kapandı).
- 5. paket çizimsiz: basit şekiller ve renklerle bölüm haritası. Bölüm noktaları, yol, mahalle adları künyedeki gibi. Yeni yer adı yazılmaz; adı olmayan yer adsız kalır.
- Kilitli ve açık bölümler, kazanılan yıldızlar görünür; bir bölüme dokununca o bölüm başlar.
- Giriş ekranındaki "Bölümler" ve duraklatmadaki "Bölümler" bu haritayı açar; haritada geri dönüş düğmesi olur.

Öneri oyununda böyle yapıldı:
- Eski "Bölümler" listesinin (numaralı kutular) yerine harita geldi. Her yerdeki "Bölümler" (giriş ekranı, duraklatma, üst şeritteki "Bölüm 3" yazısı, bölüm sonu) haritayı açar.
- Ekran: bütün zemin deniz rengi (açık mavi). Ortada Düzada'nın kaba biçimi, açık zeytin yeşiline çalan toprak rengi; mahalle sınırları beyaz kesik çizgi. Adanın biçimi, mahalle sınırları, Sahil Yolu, Ada Tepesi ve Dondurmacı Kızlar'ın yeri KKM'deki Düzada haritasından bir kez alınıp sadeleştirildi (`src/haritaVerisi.ts`, üreten `araclar/haritaUret.mjs`). Kuzey yukarıda.
- Yazılar yalnız künyedeki adlar: mahalleler "Liman", "Stadyum", "Çiftlik", "İskele / Kemsköy", "Merkez"; zirve "Ada Tepesi" (küçük üçgen); dükkân "Dondurmacı Kızlar". Başka yer adı yok; bölüm noktalarında yalnız numara.
- Yol: Sahil Yolu, 1. bölüm Dondurmacı Kızlar'ın önünde (Liman). Yol saat yönünde gider: Liman → Stadyum → Çiftlik → İskele; 10. bölüm İskele'de, The Imperial Kemsköy'ün yakınında biter (otelin adı haritada yazmaz). 10 nokta yol boyunca eşit aralıklı: 1–3 Liman, 4–5 Stadyum, 6–7 Çiftlik, 8–10 İskele tarafında. Yön Kemal için önemli değil; böyle kalır (0.12).
- Yolun açılan en ileri bölüme kadarki kısmı sarı, kalanı beyaz.
- Bölüm noktaları: yuvarlak, içinde numara. Geçilmiş bölüm koyu mor, altında kazanılan yıldızlar (3 küçük yıldız, kazanılanlar sarı). Sıradaki (açık ama henüz kazanılmamış) bölüm sarı, çevresinde hafif sarı hale. Kilitli bölüm soluk; yıldızı görünmez, dokununca başlamaz.
- Bir bölüme dokununca o bölüm baştan başlar, harita kapanır.
- Sol üstte "Geri" düğmesi (ok ve yazı). Harita nereden açıldıysa oraya döner: giriş ekranından açıldıysa giriş ekranına; duraklatmadan açıldıysa duraklatma seçeneklerine (oyun duraklı kalır); oyun sırasında üst şeritteki "Bölüm 3"ten açıldıysa oyun kaldığı yerden sürer (harita açıkken oyunun saati durur); bölüm sonundan açıldıysa bölüm sonu ekranına.
- Bütün bölümler bittiyse başlığın altında "Bütün bölümler bitti" yazar (eskisi gibi).
- Zeytinlik, kayalık, koylar ve çizim 7. pakette (görsellerin oyuna girmesi); bu pakette yalnız renk ve şekil.
- Ekran görüntüleri: `docs/ekran/paket-5/` (390x844: 4 bölüm açık; bütün bölümler bitmiş; 360x640 kısa ekran).

### 0.10 Gece işleri: renk, giriş, duraklatma, hız, bölüm sayısı ve zorluk (Kemal, 22 Ekim 2026; panodaki istekler)

Kemal'in istekleri (CEO iletti):
- Renk: DK Lite'ın mor-sarı tonları Dondurmacı Kızlar'ınkine yaklaşsın.
- Giriş ekranı: oyun açılınca önce giriş ekranı gelsin (oyunun adı yerine yer tutucu, "Başla" ve "Bölümler").
- Duraklatma: oyun sırasında köşede duraklatma düğmesi; basınca oyun durur, "Devam et", "Baştan başla", "Bölümler" seçenekleri çıkar.
- Hızlandırma: oyun sırasında bir hızlandırma düğmesi; basınca oyun 2 kat hızlanır, tekrar basınca normale döner. 2 kat öneri; Kemal onaylayınca kesinleşir.
- Bölüm sayısı: ilk sürüm 10 bölüm (Kemal'in 22 Ekim cevabı).
- Zorluk: bölümlerde zorluk daha yavaş artsın (Kemal'in 22 Ekim cevabı).

Öneri oyununda böyle yapıldı:
- Renk: koyu mor `#4e2470` (yazılar, müşteri kutuları), mor `#7a3fa8` (bant ve B çeşidi), sarı `#ffc928` (düğmeler, A çeşidi, yıldız). Tonlar Dondurmacı Kızlar ile aynı; açık lila zemin ve öbür çeşit renkleri değişmedi, ekranın genel görünüşü aynı.
- Giriş ekranı: oyun açılınca ilk o gelir. Ortada oyunun adı yerine kesik çerçeveli `[Kemal]` yer tutucusu (ad Kemal'in), altında "Başla" ve "Bölümler". "Başla" kaldığı bölümü (açılan en ileri bölüm) baştan başlatır; bütün bölümler bittiyse Bölümler listesini açar. "Bölümler" listeyi açar. Giriş ekranı açıkken oyun akmaz. Eskiden oyun açılınca bölüm doğrudan başlıyordu.
- Duraklatma: üst şeridin sağ köşesinde iki dik çizgili yuvarlak düğme. Basınca oyun tamamen durur (bant, erime, müşteri gelişi, havadaki toplar); üstüne "Devam et", "Baştan başla" (aynı bölüm baştan) ve "Bölümler" çıkar. Oyunun kendi saati var; duraklatınca, giriş ekranında ve Bölümler listesinde bu saat durur, devam edince her şey kaldığı yerden sürer.
- Hızlandırma: duraklatma düğmesinin solunda "2×" yazan yuvarlak düğme. Basınca oyunun bütün akışı (bant, erime, müşteri gelişi, uçuşlar) 2 kat hızlanır ve düğme sarı dolar; tekrar basınca normale döner. Seçim bölüm değişince de kalır, sayfa yenilenince normale döner. 2 kat Kemal'in kararı (0.12; `src/ayarlar.ts`, `HIZ_KATI`).
- Bölüm sayısı: ilk sürüm 10 bölüm; artık Kemal'in kararı, deneme değeri değil. Oyunda zaten 10 bölüm vardı; kodda yalnız not değişti. 0.9'daki "bölüm sayısı Kemal'in kararı" açık sorusu kapandı.
- Zorluk: artış adımı eskisinin yaklaşık yarısı; her bölümde yalnız bir şey biraz zorlaşır. Bölüm 1'den 10'a toplam artış: müşteri 8 → 12 (eskiden 16), çeşit 3 → 4 (eskiden 5), sütun 4'te kalır (eskiden 5'e çıkıyordu), istek 2–3 → 3–4, bant yeri 12 → 10 (eskiden 9). Son bölüm eski tablonun 4.–5. bölümü kadar zor. Bölüm 1 aynı kaldı; öbür bölümlerin dizilimi değişti. Yeni tablo (bölüm: sütun / çeşit / müşteri / istek / bant yeri): 1: 4 / 3 / 8 / 2–3 / 12; 2: 4 / 3 / 9 / 2–3 / 12; 3: 4 / 3 / 9 / 2–4 / 12; 4: 4 / 3 / 10 / 2–4 / 12; 5: 4 / 3 / 11 / 2–4 / 12; 6: 4 / 4 / 11 / 2–4 / 12; 7: 4 / 4 / 11 / 2–4 / 11; 8: 4 / 4 / 12 / 2–4 / 11; 9: 4 / 4 / 12 / 2–4 / 10; 10: 4 / 4 / 12 / 3–4 / 10. Sayılar deneme değeri; Kemal oynayıp söyler. Bütün bölümlerin kazanılabilir kurulduğu denendi.
- Üst şerit: sağ köşeye iki düğme sığsın diye erime düğmesi "Bölüm 3" yazısının altına indi.
- Ekran görüntüleri (telefon boyutu, 390x844): `docs/ekran/gece-22-10/` (giriş, oyun içi, duraklatma).

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
- Bölüm yolu (Kemal, 22 Ekim; 0.11): dükkânın olduğu Liman'dan başlar, Sahil Yolu boyunca öbür mahallelere gider. Yönü saat yönünde, İskele'de biter; Kemal için önemli değil (0.12).
- Sahil Yolu künyede beş mahalleden geçer; KKM haritasında halka Liman, Stadyum, Çiftlik ve İskele'den geçiyor, Merkez'in sınırına girmiyor. Haritada Merkez adıyla ortada durur, bölüm noktası yok; Kemal için önemli değil (0.12).
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

- **Bölümler:** numaralı; her bölüm biraz daha zor. İlk sürüm 10 bölüm (Kemal, 22 Ekim; 0.10).
- **Yıldız:** sayısı ve neye göre verildiği [Kemal] (bkz. Kemal'e sorular, 6). Öneri: kalan hamle ya da hiç erimeden bitirme gibi bir ölçü. Öneri oyununda deneme olarak üç yıldız, puana göre (0.7).
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
- Yıldız neye göre verilir? (Kemal'e sorular, 6) Öneri oyununda şimdilik puana göre deneme ölçüsü var (0.7). Kemal (0.8): "Sonra bakariz simdiki kalsin"; soru ertelendi.
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
- İlk sürümdeki bölüm sayısı: 10 (Kemal, 22 Ekim; 0.10). Yıldız ölçüsü, can sayısı ve dolma süresi: Kemal'in kararı; bu belge sayı önermez.

---

## 8. Yapım durumu

Uygulamada **olan**: depo, bu iki belge, 1. paket: çizimsiz deneme oyunu (dönen bant ve sütunlar, tek bölüm; ayarlar `src/ayarlar.ts`), 2. paket (erime, fazla top, en çok 5 müşteri), 3. paket (sayaçlar, puan, bölüm sonu ve yıldız) ve ortak saklı yer ile "yarım puan yalnız erime açıkken" (0.8). 4. paket (numaralı bölümler, kayıt, Bölümler listesi; 0.9), gece işleri (Dondurmacı Kızlar ile aynı mor-sarı tonlar, giriş ekranı, duraklatma, 2 kat hızlandırma, 10 bölüm ve daha yavaş artan zorluk; 0.10) ve 5. paket (çizimsiz bölüm haritası; 0.11).

Uygulamada **olmayan**: bu belgedeki her şey. Sıra yol haritasında; ilk
paket başlayabilir.

Yapım aşaması ve işler: [Kemal] (KKM'de boş; yol haritası onaylandıkça dolabilir).

---

## Kemal'e sorular

1. DK Lite: Bölüm haritasında yol hangi yönde gitsin? Kapandı (Kemal, 22 Ekim: "Bunun cidden bir onemi yok"; şimdiki gibi kalır, 0.12).
2. DK Lite: Haritada Merkez ne olsun? Kapandı (Kemal, 22 Ekim: "Belki yuzlerce bolum yapacagiz bunun onemi yok"; şimdiki gibi kalır, 0.12).
3. DK Lite: Harita ekranda nasıl dursun? Kapandı (Kemal, 22 Ekim: "Cizim yapariz bunun icin harita olmak zorunda degil"; şimdilik kuzey yukarıda, 7. pakette çizimle yapılır, 0.12).
4. DK Lite: Hızlandırma düğmesi kaç kat hızlandırsın? Kapandı (Kemal, 22 Ekim: 2 kat, 0.12).
5. DK Lite: İlk sürümde kaç bölüm olsun? Kapandı (Kemal, 22 Ekim: 10 bölüm).
6. DK Lite: Yıldız neye göre verilsin? Seçenekler: (a) şimdiki deneme gibi puana göre, oynayıp eşikleri söylerim, (b) hiç top eritmeden bitirme, (c) kalan bant yeri. Ertelendi (Kemal, 22 Ekim: "Sonra bakariz simdiki kalsin").
