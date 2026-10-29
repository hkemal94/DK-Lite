// Oyunun kendisi. Diziliş (Kemal, 29 Ekim: "Resimdeki gibi"; tasarım belgesi 0.14):
// üstte mor-sarı tente ve dükkândan dışarısı; müşteriler tezgâhın arkasında;
// ortada tezgâh, ortasında dondurmacı, çevresinde dönen bant; tezgâhın önünde
// mor-sarı çizgiler ve dükkânın logosu; altta sütunlar.
// Görseller (7. paket; Kemal, 30 Ekim: "Parlak cizgi film iyi"): müşteriler,
// dondurmacı, ürünler ve arka plan parlak çizgi film tarzında el çizimi (Canva).
// Tente, bant ve tezgâh aynı tarzda: canlı renkler, koyu kahverengi kalın hat.

import {
  AYNI_ANDA_MUSTERI,
  BANT_TUR_SANIYE,
  BASTA_MUSTERI,
  BOLUM_SAYISI,
  URUNLER,
  ERIME_BICIMLERI,
  ERIME_MS,
  ERIME_VARSAYILAN,
  GEC_TOP_PUAN_ORANI,
  GEC_TOP_SOLUKLUK,
  GEC_TOP_TURU,
  GONDERME_BICIMI,
  HIZ_KATI,
  KACAN_EN_COK,
  SABIR_KIRMIZI,
  SABIR_SARI,
  SABIR_SN,
  SERI_BASLANGIC,
  SERI_EK_PUAN,
  MUSTERI_GELIS_ARALIGI_SN,
  SUTUNDA_GORUNEN_TOP,
  TOP_PUANI,
  TUTMA_MS,
  YILDIZ_ESIKLERI,
} from './ayarlar';
import { bolumKur, gidecekTopSayisi, istekAdedi, type Bolum } from './bolum';
import { urunSimgesi } from './urunSimgesi';
import { ayarOku, ayarYaz, bolumKazanildi, hepsiBitti, kayitOku, type Ayarlar, type Kayit } from './kayit';
import { haritaCiz } from './harita';

// Müşteriler: 10 farklı kişi, belden yukarısı (Canva, parlak çizgi film). Kaynak: docs/lisanslar.md.
const MUSTERI_RESIMLERI = Array.from({ length: 10 }, (_, i) =>
  `gorseller/musteriler/musteri-${String(i + 1).padStart(2, '0')}.webp`);
// Tezgâhın üstü: ortada dondurmacı (dükkân renkleri: sarı tişört, mor önlük, mor kasket),
// iki yanında tezgâhta duran ürünler.
// Bar (Kemal, 30 Ekim: "bantın ortasını bir bar gibi tasarla"; "Ahşap kafe barı";
// yan ürünler "Raflara gitsin"): arkada iki ahşap raf, rafların iki yanında kafe
// eşyaları ve tatlılar; ortada dondurmacı; önde ahşap bar tezgâhı.
const RAF_UST = {
  sol: ['bar/kahve-makinesi', 'bar/bardaklar', 'bar/seker-kavanozu'],
  sag: ['bar/kulah-yigini', 'bar/saksi', 'bar/kase'],
};
const RAF_ALT = {
  sol: ['urunler/meyve', 'urunler/pasta', 'bar/surup-kirmizi'],
  sag: ['bar/surup-sari', 'urunler/kek', 'urunler/limonata'],
};
const DONDURMACI_RESMI = 'gorseller/tezgah/dondurmaci.webp';
const SEVINEN_DONDURMACI_RESMI = 'gorseller/tezgah/dondurmaci-seviniyor.webp';
const LOGO_RESMI = 'gorseller/logo-yazi.webp';
// Arkada dükkândan dışarısı: deniz, iskele, deniz feneri, zeytin ağaçları (Canva, parlak çizgi film).
const ARKA_PLAN_RESMI = 'gorseller/arka-plan.webp';
// Bantta dondurma topunun altındaki külah (Canva, parlak çizgi film).
const KULAH_RESMI = 'gorseller/kulah.webp';
// Müşteri kartındaki kişi resminin boyu (px).
const KISI_BOY = 64;
// Müşterinin alt kısmı tezgâhın (bandın) arkasında kalır: bu kadarı görünmez (px).
const KISI_ORTUSME = 22;

// Bant köşeleri yuvarlatılmış bir dikdörtgen (Kemal, 30 Ekim: "Insanlar barin arkasina
// sığmıyor"): üst düz kenarı uzun olsun ki müşterilerin hepsi barın arkasında dursun.
// Bandın orta çizgisinin köşe yarıçapı, bandın yüksekliğine göre.
function koseYaricapi(bh: number): number {
  return Math.min(bh / 2, Math.max(24, bh * 0.3));
}

// Bandın orta çizgisinin çevresi (köşeleri yuvarlatılmış dikdörtgen).
function bantCevresi(bg: number, bh: number): number {
  const rk = koseYaricapi(bh);
  return 2 * (bg - 2 * rk) + 2 * (bh - 2 * rk) + 2 * Math.PI * rk;
}
// Müşterinin balonunun altındaki sabır çubuğunun kalınlığı (px).
const SABIR_BOY = 6;
// Uçan yazıların (puan, seri, kalp) ekranda kalma süresi (ms).
const UCAN_MS = 900;
// İsteği tamamlanan müşterinin başında çıkan kalp ve sabrı biten müşterinin
// üzgün yüzü (çizgi film tarzı, kalın hat).
// Ayarlar düğmesindeki dişli.
const DISLI_SVG =
  '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 4.7.1-1.2-.1-1.2 2-1.6-2-3.4-2.4 1a8 8 0 0 0-2-1.2L15.5 3h-4l-.4 2.6a8 8 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6-.1 1.2.1 1.2-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6Z" fill="currentColor"/></svg>';
const KALP_SVG =
  '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 21 C5 15 2 12 2 8 C2 5 4.5 3 7 3 C9 3 11 4.5 12 6 C13 4.5 15 3 17 3 C19.5 3 22 5 22 8 C22 12 19 15 12 21 Z" fill="#e2475b" stroke="#5a3a22" stroke-width="2" stroke-linejoin="round"/></svg>';
const UZGUN_SVG =
  '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#9fc3e6" stroke="#5a3a22" stroke-width="2"/><circle cx="8.5" cy="10" r="1.4" fill="#5a3a22"/><circle cx="15.5" cy="10" r="1.4" fill="#5a3a22"/><path d="M8 17 Q12 13.5 16 17" fill="none" stroke="#5a3a22" stroke-width="2" stroke-linecap="round"/></svg>';
// Tezgâhın önündeki mor-sarı çizgili yüzün bandın altından görünen boyu (px).
const ONU_BOY = 40;
// Bandın üç boyutlu görünen koyu yan yüzünün kalınlığı (px; stil.css'teki .bant gölgesiyle aynı).
const BANT_YAN = 15;

const UCUS_MS = 220; // sütundan banda uçuş
const ALIS_MS = 320; // banttan müşteriye uçuş
const GIDIS_MS = 600; // işi biten müşterinin yerine yenisinin gelmesi
const KAYMA_MS = 200; // top gidince sütundakilerin yukarı kayması

interface Nokta {
  x: number;
  y: number;
}

interface Top {
  el: HTMLDivElement;
  cesit: number;
  durum: 'ucuyor' | 'bantta' | 'aliniyor' | 'eriyor';
  yuva: number; // banttaki yeri
  baslangic: number; // uçuşun (ya da erimenin) başladığı an
  tur: number; // bantta alınmadan geçirdiği tur (1 = bant bir kez döndü)
  gec: boolean; // GEC_TOP_TURU'nu geçti: alınırsa puanı düşük
  nereden: Nokta;
  musteri: number; // alınıyorsa hangi müşteri yerine
}

interface MusteriYeri {
  parcalar: { cesit: number; kalan: number }[]; // bir ya da iki çeşit; her birinden kalan adet
  durum: 'bekliyor' | 'bitti' | 'gitti'; // gitti: sabrı bitti, istediğini alamadan gitti
  bittigiAn: number;
  gelisAn: number; // geldiği an (oyunun saatiyle); sabır buradan sayılır
  resim: string; // müşterinin görünüşü (kişi resmi)
}

interface Yerlesim {
  genislik: number;
  yukseklik: number;
  bantX: number; // bant orta çizgisinin sol üst köşesi
  bantY: number;
  bantG: number;
  bantY2: number; // bant orta çizgisinin yüksekliği
  bantKalinlik: number;
  cevre: number;
  topBoyu: number;
  musteriNoktalari: Nokta[];
  musteriYolu: number[]; // her müşterinin banttaki alma noktası
  sutunlarUst: number;
  sutunlarAlt: number;
  sutunGenislik: number;
  sutunTopBoyu: number;
  kartG: number; // müşteri kartının eni
  kartUst: number; // müşteri kartlarının üst kenarı
  istekBoy: number; // istek balonundaki topun boyu
}

type Sonuc = 'kazandin' | 'doldu' | 'kalmadi' | 'kacti';
// Haritada "Geri" nereye döner.
type HaritaDonus = 'giris' | 'duraklat' | 'yerinde';

// Giriş ekranında oyunun adı: "Dondurmacı Kızlar Lite" şimdilik çalışma adı
// (Kemal, 29 Ekim: "Şimdilik çalışma adı"; son ad sonra). Dükkânın logosu ve "Lite".
const OYUN_ADI = 'Dondurmacı Kızlar Lite';

// Son bölüm de kazanılınca görünen basit durum yazısı (kurgu metni değil).
const HEPSI_BITTI_YAZISI = 'Bütün bölümler bitti';

// Bölüm sonu fişinin altındaki teşekkür satırı: yazı Kemal'in (boş yer tutucu).
const FIS_TESEKKUR = '[Kemal]';

// Bölüm sonunda görünen basit durum yazısı (kurgu metni değil).
const SONUC_YAZISI: Record<Sonuc, string> = {
  kazandin: 'Bölüm tamamlandı',
  doldu: 'Bant doldu',
  kalmadi: 'Top kalmadı',
  kacti: 'Müşteriler gitti',
};

function rastgeleArasi(enAz: number, enCok: number): number {
  return enAz + Math.random() * (enCok - enAz);
}

// Bir müşteri yeri boşalınca yenisinin gelmesine kadar geçen süre (ms).
function gelisBeklemesi(): number {
  return rastgeleArasi(MUSTERI_GELIS_ARALIGI_SN.enAz, MUSTERI_GELIS_ARALIGI_SN.enCok) * 1000;
}

export class Oyun {
  private kok: HTMLElement;
  private sahne!: HTMLDivElement;
  private bantEl!: HTMLDivElement;
  private yuvaEller: HTMLDivElement[] = [];
  private musteriEller: HTMLDivElement[] = [];
  private sutunEller: HTMLDivElement[] = [];
  private ustEl!: HTMLDivElement; // üst şerit: erime düğmesi ve sayaçlar
  private karsilananEl!: HTMLSpanElement;
  private puanEl!: HTMLSpanElement;
  private doluEl!: HTMLDivElement; // bant doluluğu çubuğunun dolu kısmı
  private doluKutuEl!: HTMLDivElement;
  private sonEl!: HTMLDivElement;
  private erimeEl!: HTMLButtonElement;
  private bolumNoEl!: HTMLButtonElement; // üst şeritte "Bölüm 3"; dokununca bölüm haritası
  private listeEl!: HTMLDivElement; // bölüm haritası ("Bölümler"; 5. paket)
  private girisEl!: HTMLDivElement; // giriş ekranı (oyun açılınca ilk o gelir)
  private duraklatEl!: HTMLButtonElement; // köşedeki duraklatma düğmesi
  private hizEl!: HTMLButtonElement; // hızlandırma düğmesi (basınca HIZ_KATI kat, tekrar basınca normal)
  private duraklatMenuEl!: HTMLDivElement; // duraklatınca çıkan seçenekler

  // Telefonda saklanan kayıt: kaldığı bölüm ve yıldızlar.
  private kayit: Kayit = kayitOku();
  private listeAcik = false;
  // Haritada "Geri"ye basınca nereye dönülür: giriş ekranı, duraklatma
  // seçenekleri ya da haritanın açıldığı yer (oyun ya da bölüm sonu).
  private haritaDonus: HaritaDonus = 'yerinde';
  private girisAcik = false;
  private duraklatildi = false;
  // Hızlandırma açık mı. Bölüm değişince de kalır; sayfa yenilenince normale döner.
  private hizli = false;
  // Oyunun kendi saati (milisaniye). Yalnız oyun akarken ilerler; duraklatınca,
  // giriş ekranında ve bölüm haritasında durur. Uçuşlar, erime, müşteri
  // gelişleri hep bu saate göre; böylece duraklatınca hiçbir şey kaçmaz.
  private oyunAn = 0;

  private bolum!: Bolum;
  private sutunlar: number[][] = [];
  // Ortak saklı sıradan bir sonraki gelecek topun yeri (sıra bölüm verisinde, sabit).
  private sakliSira = 0;
  private musteriYerleri: (MusteriYeri | null)[] = [];
  private manzaraEl!: HTMLDivElement;
  private onuEl!: HTMLDivElement;
  private resimSirasi = 0; // art arda gelen müşteriler farklı görünsün
  // Boş müşteri yerine yenisinin geleceği an (dolu yerde kullanılmaz).
  private gelisAnlari: number[] = [];
  // Seçili erime biçiminin sırası; bölüm değişince de kalır.
  private erimeSirasi = ERIME_VARSAYILAN; // ayarlardan okunur (kurucuda)
  private siradaki = 0;
  private karsilanan = 0; // işi biten müşteri sayısı
  private kacan = 0; // sabrı bitip giden müşteri sayısı
  private satilan: number[] = []; // her üründen kaç tane satıldı (bölüm sonu fişi için)
  private seri = 0; // art arda doğru gönderim sayısı
  private seriPuani = 0; // seriden gelen ek puan (yıldız hesabına girmez)
  private puan = 0;
  private ayarlar!: Ayarlar;
  private dondurmaciEl!: HTMLImageElement;
  private sabirEller: (HTMLDivElement | null)[] = [];
  private ayarlarEl!: HTMLDivElement;
  private yuvalar: (Top | null)[] = [];
  private toplar: Top[] = [];
  private kayma = 0; // bandın dönüşü (çevre boyunca)
  private sonAn = 0;
  private bitti: Sonuc | null = null;
  private y!: Yerlesim;
  private tutmaZamanlayici: number | null = null;

  constructor(kok: HTMLElement) {
    this.kok = kok;
    this.ayarlar = ayarOku(ERIME_VARSAYILAN, ERIME_BICIMLERI.length);
    this.erimeSirasi = this.ayarlar.erime;
    this.iskeletKur();
    // Oyun açılınca önce giriş ekranı gelir (Kemal, 22 Ekim). Arkada kaldığı
    // bölüm hazır durur ama başlamaz; "Başla" ile başlar.
    this.yenidenBasla(this.kayit.acik);
    this.girisAc();
    window.addEventListener('resize', () => {
      this.yerlesimHesapla();
      this.sabitleriCiz();
    });
    requestAnimationFrame((an) => this.kare(an));
  }

  // ---------- kurulum ----------

  private iskeletKur() {
    this.sahne = document.createElement('div');
    this.sahne.className = 'sahne';
    this.kok.appendChild(this.sahne);

    // Üst şerit: solda erime düğmesi, sağda sayaçlar (karşılanan müşteri, puan, bant).
    this.ustEl = document.createElement('div');
    this.ustEl.className = 'ust';
    this.sahne.appendChild(this.ustEl);
    const sayaclar = document.createElement('div');
    sayaclar.className = 'sayaclar';
    const sayac = (etiket: string, id: string) => {
      const k = document.createElement('div');
      k.className = 'sayac';
      k.id = id;
      const e = document.createElement('span');
      e.className = 'sayac-etiket';
      e.textContent = etiket;
      k.appendChild(e);
      sayaclar.appendChild(k);
      return k;
    };
    this.karsilananEl = document.createElement('span');
    this.karsilananEl.className = 'sayac-deger';
    sayac('Müşteri', 'sayac-musteri').appendChild(this.karsilananEl);
    this.puanEl = document.createElement('span');
    this.puanEl.className = 'sayac-deger';
    sayac('Puan', 'sayac-puan').appendChild(this.puanEl);
    this.doluKutuEl = sayac('Bant', 'sayac-bant') as HTMLDivElement;
    const cubuk = document.createElement('div');
    cubuk.className = 'cubuk';
    this.doluEl = document.createElement('div');
    this.doluEl.className = 'cubuk-dolu';
    cubuk.appendChild(this.doluEl);
    this.doluKutuEl.appendChild(cubuk);

    // Arkada dükkândan dışarısı (gök ve deniz), en üstte mor-sarı tente.
    this.manzaraEl = document.createElement('div');
    this.manzaraEl.className = 'manzara';
    this.manzaraEl.style.backgroundImage = `url('${ARKA_PLAN_RESMI}')`;
    this.sahne.prepend(this.manzaraEl);
    const tente = document.createElement('div');
    tente.className = 'tente';
    this.sahne.prepend(tente);

    // Tezgâhın önü: mor-sarı çizgiler, ortada dükkânın logosu. Bandın altında kalır.
    this.onuEl = document.createElement('div');
    this.onuEl.className = 'tezgah-onu';
    const logo = document.createElement('img');
    logo.src = LOGO_RESMI;
    logo.alt = 'Dondurmacı Kızlar';
    logo.draggable = false;
    this.onuEl.appendChild(logo);
    this.sahne.appendChild(this.onuEl);

    this.bantEl = document.createElement('div');
    this.bantEl.className = 'bant';
    this.sahne.appendChild(this.bantEl);
    // Bandın ortası ahşap kafe barı: arkada raflar, ortada dondurmacı, önde bar tezgâhı.
    const resim = (yol: string, sinif = '') => {
      const r = document.createElement('img');
      r.src = yol;
      r.alt = '';
      r.draggable = false;
      if (sinif) r.className = sinif;
      return r;
    };
    const bar = document.createElement('div');
    bar.className = 'bar';
    for (const [sinif, raf] of [['raf raf-ust', RAF_UST], ['raf raf-alt', RAF_ALT]] as const) {
      const r = document.createElement('div');
      r.className = sinif;
      for (const yan of ['sol', 'sag'] as const) {
        const grup = document.createElement('div');
        grup.className = 'raf-yan';
        for (const ad of raf[yan]) grup.appendChild(resim(`gorseller/${ad}.webp`));
        r.appendChild(grup);
      }
      bar.appendChild(r);
    }
    this.dondurmaciEl = resim(DONDURMACI_RESMI, 'dondurmaci');
    bar.appendChild(this.dondurmaciEl);
    const barTezgah = document.createElement('div');
    barTezgah.className = 'bar-tezgah';
    bar.appendChild(barTezgah);
    this.bantEl.appendChild(bar);

    for (let i = 0; i < AYNI_ANDA_MUSTERI; i++) {
      const m = document.createElement('div');
      m.className = 'musteri';
      this.sahne.appendChild(m);
      this.musteriEller.push(m);
    }

    // Erime biçimi düğmesi: küçük, köşede; dokundukça sıradaki biçime geçer.
    this.erimeEl = document.createElement('button');
    this.erimeEl.className = 'erime-dugme';
    this.erimeEl.id = 'erime';
    this.erimeEl.addEventListener('click', () => {
      this.erimeSec((this.erimeSirasi + 1) % ERIME_BICIMLERI.length);
    });
    // Bölüm numarası (ad yok). Dokununca bölüm haritası açılır.
    this.bolumNoEl = document.createElement('button');
    this.bolumNoEl.className = 'bolum-no';
    this.bolumNoEl.id = 'bolum-no';
    this.bolumNoEl.addEventListener('click', () => this.listeAc('yerinde'));
    const sol = document.createElement('div');
    sol.className = 'ust-sol';
    sol.append(this.bolumNoEl, this.erimeEl);
    // Sağ köşede duraklatma düğmesi (iki dik çizgi). Basınca oyun durur, seçenekler çıkar.
    this.duraklatEl = document.createElement('button');
    this.duraklatEl.className = 'kose-dugme duraklat-dugme';
    this.duraklatEl.id = 'duraklat';
    this.duraklatEl.setAttribute('aria-label', 'Duraklat');
    this.duraklatEl.append(document.createElement('span'), document.createElement('span'));
    this.duraklatEl.addEventListener('click', () => this.duraklat());
    // Hızlandırma düğmesi: basınca oyun HIZ_KATI kat hızlanır, tekrar basınca normale döner.
    this.hizEl = document.createElement('button');
    this.hizEl.className = 'kose-dugme hiz-dugme';
    this.hizEl.id = 'hiz';
    this.hizEl.setAttribute('aria-label', 'Hızlandır');
    this.hizEl.textContent = `${HIZ_KATI}×`;
    this.hizEl.addEventListener('click', () => {
      this.hizli = !this.hizli;
      this.hizYazisi();
    });
    this.hizYazisi();
    const sag = document.createElement('div');
    sag.className = 'ust-sag';
    sag.append(sayaclar, this.hizEl, this.duraklatEl);
    this.ustEl.append(sol, sag);
    this.erimeYazisi();

    this.sonEl = document.createElement('div');
    this.sonEl.className = 'son gizli';
    this.sonEl.id = 'son';
    this.kok.appendChild(this.sonEl);

    this.listeEl = document.createElement('div');
    this.listeEl.className = 'liste harita-ekran gizli';
    this.listeEl.id = 'liste';
    this.kok.appendChild(this.listeEl);

    // Duraklatma seçenekleri: Devam et, Baştan başla, Bölümler.
    this.duraklatMenuEl = document.createElement('div');
    this.duraklatMenuEl.className = 'son gizli';
    this.duraklatMenuEl.id = 'duraklat-menu';
    const menuKutu = document.createElement('div');
    menuKutu.className = 'son-kutu duraklat-kutu';
    const menuDugme = (yazi: string, sinif: string, id: string, is: () => void) => {
      const d = document.createElement('button');
      d.className = 'dugme ' + sinif;
      d.id = id;
      d.textContent = yazi;
      d.addEventListener('click', is);
      return d;
    };
    menuKutu.append(
      menuDugme('Devam et', 'devam', 'menu-devam', () => this.devamEt()),
      menuDugme('Baştan başla', 'tekrar', 'menu-bastan', () => this.yenidenBasla(this.bolum.no)),
      menuDugme('Bölümler', 'tekrar', 'menu-bolumler', () => {
        this.duraklatMenuKapat();
        this.listeAc('duraklat');
      }),
    );
    this.duraklatMenuEl.appendChild(menuKutu);
    this.kok.appendChild(this.duraklatMenuEl);

    // Giriş ekranı: oyunun adı yerine yer tutucu (ad Kemal'in), "Başla" ve "Bölümler".
    this.girisEl = document.createElement('div');
    this.girisEl.className = 'giris gizli';
    this.girisEl.id = 'giris';
    const girisKutu = document.createElement('div');
    girisKutu.className = 'giris-kutu';
    this.girisEl.style.backgroundImage = `url('${ARKA_PLAN_RESMI}')`;
    const ad = document.createElement('div');
    ad.className = 'giris-ad';
    ad.setAttribute('aria-label', OYUN_ADI);
    const adLogo = document.createElement('img');
    adLogo.src = LOGO_RESMI;
    adLogo.alt = '';
    adLogo.draggable = false;
    const lite = document.createElement('span');
    lite.className = 'giris-lite';
    lite.textContent = 'Lite';
    ad.append(adLogo, lite);
    const basla = document.createElement('button');
    basla.className = 'dugme';
    basla.id = 'giris-basla';
    basla.textContent = 'Başla';
    // Kaldığı bölüm (açılan en ileri bölüm) baştan başlar; bütün bölümler
    // bittiyse bölüm haritası açılır.
    basla.addEventListener('click', () => {
      if (hepsiBitti(this.kayit)) this.listeAc('giris');
      else this.yenidenBasla(this.kayit.acik);
    });
    const bolumler = document.createElement('button');
    bolumler.className = 'dugme tekrar';
    bolumler.id = 'giris-bolumler';
    bolumler.textContent = 'Bölümler';
    bolumler.addEventListener('click', () => this.listeAc('giris'));
    girisKutu.append(ad, basla, bolumler);
    this.girisEl.appendChild(girisKutu);
    // Sağ üstte ayarlar dişlisi (Kemal, 30 Ekim: ayarlar "Şimdi, basit").
    const disli = document.createElement('button');
    disli.className = 'kose-dugme ayar-dugme';
    disli.id = 'ayarlar-ac';
    disli.setAttribute('aria-label', 'Ayarlar');
    disli.innerHTML = DISLI_SVG;
    disli.addEventListener('click', () => this.ayarlarAc());
    this.girisEl.appendChild(disli);
    this.kok.appendChild(this.girisEl);

    this.ayarlarEl = document.createElement('div');
    this.ayarlarEl.className = 'son ayarlar gizli';
    this.ayarlarEl.id = 'ayarlar';
    this.kok.appendChild(this.ayarlarEl);
  }

  // Ayarlar: erime seçimi ve titreşim (Kemal, 30 Ekim). Seçimler telefonda saklanır.
  private ayarlarAc() {
    this.ayarlarEl.className = 'son ayarlar';
    this.ayarlarEl.innerHTML = '';
    const kutu = document.createElement('div');
    kutu.className = 'son-kutu ayar-kutu';
    const baslik = document.createElement('div');
    baslik.className = 'son-baslik';
    baslik.textContent = 'Ayarlar';
    kutu.appendChild(baslik);
    const grup = (ad: string, secenekler: string[], secili: number, sec: (i: number) => void) => {
      const g = document.createElement('div');
      g.className = 'ayar-grup';
      const etiket = document.createElement('div');
      etiket.className = 'ayar-etiket';
      etiket.textContent = ad;
      const sira = document.createElement('div');
      sira.className = 'ayar-secenekler';
      secenekler.forEach((yazi, i) => {
        const d = document.createElement('button');
        d.className = 'ayar-secenek' + (i === secili ? ' secili' : '');
        d.textContent = yazi;
        d.addEventListener('click', () => {
          sec(i);
          this.ayarlarAc(); // seçimi göstermek için yeniden çizilir
        });
        sira.appendChild(d);
      });
      g.append(etiket, sira);
      return g;
    };
    kutu.append(
      grup('Erime', ERIME_BICIMLERI.map((b) => b.yazi), this.erimeSirasi, (i) => this.erimeSec(i)),
      grup('Titreşim', ['Açık', 'Kapalı'], this.ayarlar.titresim ? 0 : 1, (i) => {
        this.ayarlar.titresim = i === 0;
        ayarYaz(this.ayarlar);
      }),
    );
    const kapat = document.createElement('button');
    kapat.className = 'dugme';
    kapat.id = 'ayarlar-kapat';
    kapat.textContent = 'Kapat';
    kapat.addEventListener('click', () => {
      this.ayarlarEl.className = 'son ayarlar gizli';
      this.ayarlarEl.innerHTML = '';
    });
    kutu.appendChild(kapat);
    this.ayarlarEl.appendChild(kutu);
  }

  // Hızlıyken düğme sarı dolu görünür.
  private hizYazisi() {
    this.hizEl.classList.toggle('acik', this.hizli);
    this.hizEl.setAttribute('aria-pressed', String(this.hizli));
    this.hizEl.dataset.kat = String(this.hizli ? HIZ_KATI : 1);
  }

  // Oyun sırasında duraklatır; bölüm bittiyse ya da üstte başka ekran varsa bir şey yapmaz.
  private duraklat() {
    if (!this.oynuyor()) return;
    this.duraklatildi = true;
    this.duraklatMenuEl.className = 'son';
  }

  private devamEt() {
    this.duraklatildi = false;
    this.duraklatMenuKapat();
  }

  private duraklatMenuKapat() {
    this.duraklatMenuEl.className = 'son gizli';
  }

  private girisAc() {
    this.girisAcik = true;
    this.girisEl.className = 'giris';
  }

  private girisKapat() {
    this.girisAcik = false;
    this.girisEl.className = 'giris gizli';
  }

  // Numaralı bölümü baştan kurar. Aynı numara her zaman aynı dizilimi getirir
  // (Tekrar oyna da budur). Kilitli bölüm başlamaz.
  yenidenBasla(no: number) {
    if (no < 1 || no > BOLUM_SAYISI || no > this.kayit.acik) return;
    this.listeKapat();
    this.girisKapat();
    this.duraklatildi = false;
    this.duraklatMenuKapat();
    this.bolum = bolumKur(no);
    this.bolumNoEl.textContent = `Bölüm ${no}`;
    this.bolumNoEl.dataset.no = String(no);
    this.sutunlar = this.bolum.sutunlar.map((s) => s.slice());
    this.sakliSira = 0;
    this.siradaki = 0;
    this.karsilanan = 0;
    this.kacan = 0;
    this.satilan = new Array(URUNLER.length).fill(0);
    this.seri = 0;
    this.seriPuani = 0;
    this.puan = 0;
    // Bölüm birkaç müşteriyle başlar (rastgele yerlerde); ötekiler teker teker gelir.
    const an = this.oyunAn;
    this.musteriYerleri = new Array(AYNI_ANDA_MUSTERI).fill(null);
    this.gelisAnlari = new Array(AYNI_ANDA_MUSTERI).fill(Infinity);
    const yerler = Array.from({ length: AYNI_ANDA_MUSTERI }, (_, i) => i);
    for (let i = yerler.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [yerler[i], yerler[j]] = [yerler[j], yerler[i]];
    }
    const basta = Math.min(
      AYNI_ANDA_MUSTERI,
      BASTA_MUSTERI.enAz + Math.floor(Math.random() * (BASTA_MUSTERI.enCok - BASTA_MUSTERI.enAz + 1)),
    );
    let sonraki = an;
    yerler.forEach((yer, k) => {
      if (k < basta) {
        this.musteriYerleri[yer] = this.siradakiMusteri();
      } else {
        sonraki += gelisBeklemesi();
        this.gelisAnlari[yer] = sonraki;
      }
    });
    for (const t of this.toplar) t.el.remove();
    this.toplar = [];
    this.yuvalar = new Array(this.bolum.bantYeri).fill(null);
    // Bant yerleri bölüme göre (zorluk tablosu).
    for (const el of this.yuvaEller) el.remove();
    this.yuvaEller = [];
    for (let i = 0; i < this.bolum.bantYeri; i++) {
      const y = document.createElement('div');
      y.className = 'yuva';
      this.bantEl.after(y);
      this.yuvaEller.push(y);
    }
    this.bitti = null;
    this.sonEl.className = 'son gizli';
    this.sonEl.innerHTML = '';

    for (const el of this.sutunEller) el.remove();
    this.sutunEller = this.sutunlar.map((_, i) => this.sutunElKur(i));

    this.yerlesimHesapla();
    this.sabitleriCiz();
    this.sayaclariCiz();
  }

  // Bölümün en yüksek olası puanı: her istenen top tam puanla alınırsa
  // (her erime biçiminde aynı; "Erime yok"ta her top zaten tam puan getirir).
  private enYuksekPuan(): number {
    return this.bolum.musteriler.reduce((a, m) => a + istekAdedi(m), 0) * TOP_PUANI;
  }

  // Kazanınca yıldız sayısı (deneme ölçüsü; Kemal karar verecek).
  private yildizSayisi(): number {
    // Seri ek puanı yıldızı kolaylaştırmasın: yıldız yalnız ürünlerden gelen puana göre.
    const oran = (this.puan - this.seriPuani) / Math.max(1, this.enYuksekPuan());
    return YILDIZ_ESIKLERI.filter((e) => oran >= e - 1e-9).length;
  }

  private sayaclariCiz() {
    const toplam = this.bolum.musteriler.length;
    this.karsilananEl.textContent = `${this.karsilanan} / ${toplam}`;
    this.karsilananEl.dataset.karsilanan = String(this.karsilanan);
    this.karsilananEl.dataset.toplam = String(toplam);
    this.puanEl.textContent = String(Math.round(this.puan * 10) / 10);
    this.puanEl.dataset.puan = String(this.puan);
    const dolu = this.yuvalar.filter((t) => t !== null).length;
    const yer = this.bolum.bantYeri;
    this.doluEl.style.width = `${(100 * dolu) / yer}%`;
    this.doluKutuEl.dataset.dolu = String(dolu);
    this.doluKutuEl.dataset.yer = String(yer);
    this.doluKutuEl.classList.toggle('dolu', dolu >= yer);
  }

  private siradakiMusteri(): MusteriYeri | null {
    if (this.siradaki >= this.bolum.musteriler.length) return null;
    const m = this.bolum.musteriler[this.siradaki++];
    const resim = MUSTERI_RESIMLERI[this.resimSirasi++ % MUSTERI_RESIMLERI.length];
    const parcalar = m.parcalar.map((p) => ({ cesit: p.cesit, kalan: p.adet }));
    return { parcalar, durum: 'bekliyor', bittigiAn: 0, gelisAn: this.oyunAn, resim };
  }

  private erimeTuru(): number {
    return ERIME_BICIMLERI[this.erimeSirasi].tur;
  }

  // Erime biçimini seçer: üst şeritteki düğme ve ayarlar aynı seçimi kullanır; telefonda saklanır.
  private erimeSec(sira: number) {
    this.erimeSirasi = sira;
    this.ayarlar.erime = sira;
    ayarYaz(this.ayarlar);
    this.erimeYazisi();
  }

  private erimeYazisi() {
    this.erimeEl.textContent = `Erime: ${ERIME_BICIMLERI[this.erimeSirasi].yazi}`;
    this.erimeEl.dataset.tur = String(this.erimeTuru());
  }

  private sutunElKur(i: number): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'sutun';
    el.dataset.sutun = String(i);
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (GONDERME_BICIMI === 'dokun') {
        this.gonder(i);
        return;
      }
      el.classList.add('basili');
      this.tutmaZamanlayici = window.setTimeout(() => {
        el.classList.remove('basili');
        this.tutmaZamanlayici = null;
        this.gonder(i);
      }, TUTMA_MS);
    });
    const birak = () => {
      el.classList.remove('basili');
      if (this.tutmaZamanlayici !== null) {
        clearTimeout(this.tutmaZamanlayici);
        this.tutmaZamanlayici = null;
      }
    };
    el.addEventListener('pointerup', birak);
    el.addEventListener('pointerleave', birak);
    el.addEventListener('pointercancel', birak);
    this.sahne.appendChild(el);
    return el;
  }

  // ---------- yerleşim ----------

  // Yukarıdan aşağı sırayla: üst şerit, müşteri kartları, bant, sütunlar.
  // Her parça bir öncekinin altından başlar; kısa ekranda (ör. 360x640) bant
  // basıklaşır ki sütunlara yer kalsın ve hiçbir şey birbirine binmesin.
  private yerlesimHesapla() {
    const g = this.sahne.clientWidth;
    const h = this.sahne.clientHeight;
    const kalinlik = Math.round(Math.min(48, g * 0.12));
    const bantX = 18 + kalinlik / 2;
    const bantG = g - 2 * bantX;

    const ustAlt = this.ustEl.offsetTop + this.ustEl.offsetHeight;
    // Kartlar bandın dış enine sığar (müşteriler barın arkasında durur).
    const kartG = Math.min(110, (bantG + kalinlik) / AYNI_ANDA_MUSTERI - 4);
    const dar = kartG < 72;
    const istekBoy = Math.max(20, Math.min(30, Math.floor(kartG - 46)));
    // Kart: istek balonu (bir ya da iki satır: top + iç boşluk) + aralık + kişi resmi.
    // İki çeşit isteyen müşterisi olan bölümde balona iki satırlık yer ayrılır.
    const satir = this.bolum.musteriler.some((m) => m.parcalar.length > 1) ? 2 : 1;
    // Balonun altında sabır çubuğu (SABIR_BOY + aralık).
    const kartYuk = satir * istekBoy + (satir - 1) * 2 + (dar ? 8 : 12) + 4 + SABIR_BOY + 3 + KISI_BOY;
    const kartUst = ustAlt + 4;
    const kartAlt = kartUst + kartYuk;

    // Müşterilerin alt kısmı tezgâhın arkasında kalır: bant onların üstüne biner.
    const bantY = kartAlt - KISI_ORTUSME + kalinlik / 2;
    // Sütunlara en az bu kadar yer kalsın: görünen toplar için 36 px'lik yer.
    const sutunEnAz = SUTUNDA_GORUNEN_TOP * 36 + 20;
    const bantY2 = Math.max(
      40,
      Math.min(h * 0.26, bantG * 0.62, h - 16 - sutunEnAz - 14 - BANT_YAN - ONU_BOY - kalinlik / 2 - bantY),
    );
    const cevre = bantCevresi(bantG, bantY2);

    // Müşteriler barın arkasında: bandın dış eni boyunca eşit aralıkla.
    const musteriNoktalari: Nokta[] = [];
    const musteriYolu: number[] = [];
    const disSol = bantX - kalinlik / 2;
    const disEn = bantG + kalinlik;
    for (let i = 0; i < AYNI_ANDA_MUSTERI; i++) {
      const x = disSol + (disEn * (i + 0.5)) / AYNI_ANDA_MUSTERI;
      musteriNoktalari.push({ x, y: kartUst + istekBoy / 2 + 4 });
      musteriYolu.push(this.enYakinYol({ x, y: bantY - 40 }, bantX, bantY, bantG, bantY2));
    }

    const sutunlarUst = bantY + bantY2 + kalinlik / 2 + BANT_YAN + ONU_BOY + 14;
    const sutunlarAlt = h - 16;
    const sutunGenislik = (g - 24) / this.sutunlar.length;
    // Top boyu sütunun boyuna değil, sütunda görünen top sayısına göre.
    const sutunTopBoyu = Math.min(
      sutunGenislik * 0.7,
      54,
      (sutunlarAlt - sutunlarUst - 12) / Math.max(1, SUTUNDA_GORUNEN_TOP),
    );

    this.y = {
      genislik: g,
      yukseklik: h,
      bantX,
      bantY,
      bantG,
      bantY2,
      bantKalinlik: kalinlik,
      cevre,
      topBoyu: Math.min(kalinlik - 8, (cevre / this.bolum.bantYeri) * 0.8),
      musteriNoktalari,
      musteriYolu,
      sutunlarUst,
      sutunlarAlt,
      sutunGenislik,
      sutunTopBoyu,
      kartG,
      kartUst,
      istekBoy,
    };
  }

  // Bandın orta çizgisinde, çevre boyunca s uzaklığındaki nokta.
  // s=0 üst düz kısmın sol ucu; saat yönünde ilerler.
  // Bant köşeleri yuvarlatılmış bir dikdörtgendir; s=0 üst düz kenarın sol ucu, saat yönünde.
  private yoldakiNokta(s: number, bx = this.y.bantX, by = this.y.bantY, bg = this.y.bantG, bh = this.y.bantY2): Nokta {
    const rk = koseYaricapi(bh);
    const yatay = bg - 2 * rk;
    const dikey = bh - 2 * rk;
    const yay = (Math.PI / 2) * rk;
    const cevre = bantCevresi(bg, bh);
    s = ((s % cevre) + cevre) % cevre;
    const kose = (cx: number, cy: number, bas: number, t: number): Nokta => {
      const a = bas + t / rk;
      return { x: cx + rk * Math.cos(a), y: cy + rk * Math.sin(a) };
    };
    if (s < yatay) return { x: bx + rk + s, y: by };
    s -= yatay;
    if (s < yay) return kose(bx + bg - rk, by + rk, -Math.PI / 2, s);
    s -= yay;
    if (s < dikey) return { x: bx + bg, y: by + rk + s };
    s -= dikey;
    if (s < yay) return kose(bx + bg - rk, by + bh - rk, 0, s);
    s -= yay;
    if (s < yatay) return { x: bx + bg - rk - s, y: by + bh };
    s -= yatay;
    if (s < yay) return kose(bx + rk, by + bh - rk, Math.PI / 2, s);
    s -= yay;
    if (s < dikey) return { x: bx, y: by + bh - rk - s };
    s -= dikey;
    return kose(bx + rk, by + rk, Math.PI, s);
  }

  private enYakinYol(p: Nokta, bx: number, by: number, bg: number, bh: number): number {
    const cevre = bantCevresi(bg, bh);
    let enIyi = 0;
    let enAz = Infinity;
    for (let i = 0; i < 400; i++) {
      const s = (cevre * i) / 400;
      const q = this.yoldakiNokta(s, bx, by, bg, bh);
      const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
      if (d < enAz) {
        enAz = d;
        enIyi = s;
      }
    }
    return enIyi;
  }

  // Sütunda görünen k'ıncı topun yeri; k=0 gidecek top, sütunun banda yakın üst ucunda.
  // Öbürleri onun altına sıralanır.
  private sutunTopNoktasi(sutun: number, k: number): Nokta {
    const { sutunGenislik, sutunlarUst, sutunTopBoyu } = this.y;
    return {
      x: 12 + sutunGenislik * (sutun + 0.5),
      y: sutunlarUst + 8 + sutunTopBoyu * (k + 0.5),
    };
  }

  // ---------- çizim ----------

  private topElKur(cesit: number, boy: number): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'top';
    el.style.width = el.style.height = `${boy}px`;
    el.innerHTML = urunSimgesi(cesit);
    el.dataset.cesit = String(cesit);
    el.dataset.tur = URUNLER[cesit].tur;
    el.title = URUNLER[cesit].ad;
    return el;
  }

  private sabitleriCiz() {
    const y = this.y;
    const b = this.bantEl.style;
    b.left = `${y.bantX - y.bantKalinlik / 2}px`;
    b.top = `${y.bantY - y.bantKalinlik / 2}px`;
    b.width = `${y.bantG + y.bantKalinlik}px`;
    b.height = `${y.bantY2 + y.bantKalinlik}px`;
    b.borderWidth = `${y.bantKalinlik}px`;
    b.setProperty('--bant-kalinlik', `${y.bantKalinlik}px`);
    // Dış köşe = orta çizginin köşesi + bandın yarı kalınlığı; iç köşe CSS'te kendiliğinden.
    const disKose = koseYaricapi(y.bantY2) + y.bantKalinlik / 2;
    b.borderRadius = `${disKose}px`;

    // Tezgâhın önü bandın alt düz kısmının altında (arka plan bütün sayfaya yayılır, CSS).
    const onu = this.onuEl.style;
    const r = disKose;
    const altKenar = y.bantY + y.bantY2 + y.bantKalinlik / 2;
    onu.left = `${y.bantX - y.bantKalinlik / 2 + r * 0.45}px`;
    onu.width = `${y.bantG + y.bantKalinlik - r * 0.9}px`;
    // Bandın altındaki koyu yan yüz (BANT_YAN, CSS'teki gölge) logoyu örtmesin.
    onu.top = `${altKenar - r}px`;
    onu.height = `${r + BANT_YAN + ONU_BOY}px`;
    onu.paddingTop = `${r + BANT_YAN}px`;

    for (const el of this.yuvaEller) {
      el.style.width = el.style.height = `${y.topBoyu}px`;
    }
    for (const t of this.toplar) {
      t.el.style.width = t.el.style.height = `${y.topBoyu}px`;
    }
    this.musterileriCiz();
    this.sutunlariCiz();
  }

  private musterileriCiz() {
    const y = this.y;
    const { kartG, istekBoy } = y;
    // Dar kartta (5 müşteri, 360 px) balonun iç boşluğu ve yazısı küçülür;
    // istek balonundaki top da küçülür ki "×4" yazısı taşmasın.
    const dar = kartG < 72 ? ' dar' : '';
    this.musteriYerleri.forEach((m, i) => {
      const el = this.musteriEller[i];
      const p = y.musteriNoktalari[i];
      el.style.left = `${p.x - kartG / 2}px`;
      el.style.top = `${y.kartUst}px`;
      el.style.width = `${kartG}px`;
      el.innerHTML = '';
      this.sabirEller[i] = null;
      if (!m) {
        el.className = 'musteri bos' + dar;
        delete el.dataset.istek;
        return;
      }
      el.className = 'musteri' + dar + (m.durum === 'bitti' ? ' bitti' : m.durum === 'gitti' ? ' gitti' : '');
      el.dataset.istek = m.parcalar.map((p) => `${URUNLER[p.cesit].id}:${p.kalan}`).join(',');
      // İstek balonu: her çeşit bir satır (simge ve kalan adet; biten çeşitte ✓).
      const istek = document.createElement('div');
      istek.className = 'istek';
      for (const p of m.parcalar) {
        const satir = document.createElement('div');
        satir.className = 'istek-satir' + (p.kalan === 0 ? ' tamam' : '');
        satir.appendChild(this.topElKur(p.cesit, istekBoy));
        const adet = document.createElement('span');
        adet.className = 'adet';
        adet.textContent = p.kalan === 0 ? '✓' : `×${p.kalan}`;
        satir.appendChild(adet);
        istek.appendChild(satir);
      }
      const kisi = document.createElement('img');
      kisi.className = 'kisi';
      kisi.src = m.resim;
      kisi.alt = '';
      kisi.draggable = false;
      kisi.style.width = kisi.style.height = `${KISI_BOY}px`;
      // Sabır çubuğu: yavaşça azalır, yeşilden sarıya, sonra kırmızıya döner (her karede güncellenir).
      const sabir = document.createElement('div');
      sabir.className = 'sabir';
      sabir.style.height = `${SABIR_BOY}px`;
      const dolu = document.createElement('div');
      dolu.className = 'sabir-dolu';
      sabir.appendChild(dolu);
      if (m.durum === 'bekliyor') this.sabirEller[i] = dolu;
      else sabir.style.visibility = 'hidden';
      el.append(istek, sabir, kisi);
    });
  }

  // Sütunda en çok SUTUNDA_GORUNEN_TOP kadar top durur, hepsi görünür; saklı toplar
  // ortak sıradadır. kayanSutun: o sütundan az önce `giden` kadar top gitti; kalanlar
  // yukarı kayar, ortak sıradan gelen alttan belirerek gelir.
  private sutunlariCiz(kayanSutun = -1, giden = 0, oncekiUst = 0) {
    const y = this.y;
    const boy = y.sutunTopBoyu - 4;
    this.sutunlar.forEach((sutun, i) => {
      if (kayanSutun >= 0 && i !== kayanSutun) return; // gönderişte yalnız o sütun yenilenir
      const el = this.sutunEller[i];
      const solX = 12 + y.sutunGenislik * i + 4;
      el.style.left = `${solX}px`;
      el.style.top = `${y.sutunlarUst}px`;
      el.style.width = `${y.sutunGenislik - 8}px`;
      el.style.height = `${y.sutunlarAlt - y.sutunlarUst}px`;
      el.innerHTML = '';
      const ustBoy = gidecekTopSayisi(sutun); // yalnız gidecek top öne çıkar
      const gorunen = Math.min(sutun.length, SUTUNDA_GORUNEN_TOP);
      for (let k = 0; k < gorunen; k++) {
        const t = this.topElKur(sutun[sutun.length - 1 - k], boy);
        const p = this.sutunTopNoktasi(i, k);
        t.style.left = `${p.x - solX - boy / 2}px`;
        t.style.top = `${p.y - y.sutunlarUst - boy / 2}px`;
        if (k < ustBoy) t.classList.add('ustte');
        el.appendChild(t);
        if (i === kayanSutun && giden > 0) this.kaydir(t, k, giden, oncekiUst);
      }
    });
  }

  // Top gidince kalanların bir önceki yerlerinden yukarı kayması (kısa, sakin).
  // oncekiUst: gönderişten önce sütunda öne çıkan (soluk olmayan) top sayısı.
  private kaydir(t: HTMLDivElement, k: number, giden: number, oncekiUst: number) {
    if (typeof t.animate !== 'function') return;
    // Konumla kaydırılır (transform değil): telefonda top katmanlara ayrılıp
    // komşu sütunlarda köşeli gölge bırakmasın diye.
    const yer = parseFloat(t.style.top);
    const asagi = `${yer + this.y.sutunTopBoyu * giden}px`;
    const hedef = getComputedStyle(t).opacity;
    // Önceden gizli olan (alttan gelen) belirerek gelir; öbürleri önceki solukluğuyla kayar.
    const once = k + giden; // bu topun gönderişten önceki yeri
    const baslangic = once >= SUTUNDA_GORUNEN_TOP ? '0'
      : once < oncekiUst ? '1'
      : getComputedStyle(document.documentElement).getPropertyValue('--soluk').trim() || hedef;
    t.animate(
      [
        { top: asagi, opacity: baslangic },
        { top: `${yer}px`, opacity: hedef },
      ],
      { duration: KAYMA_MS, easing: 'ease-out' },
    );
  }

  // ---------- oynanış ----------

  private gonder(sutunNo: number) {
    if (!this.oynuyor()) return;
    const sutun = this.sutunlar[sutunNo];
    const obek = gidecekTopSayisi(sutun);
    if (obek === 0) return;
    const bosYuvalar: number[] = [];
    this.yuvalar.forEach((t, i) => {
      if (!t) bosYuvalar.push(i);
    });
    const giden = Math.min(obek, bosYuvalar.length);
    if (giden === 0) {
      this.sutunEller[sutunNo].classList.remove('sars');
      void this.sutunEller[sutunNo].offsetWidth;
      this.sutunEller[sutunNo].classList.add('sars');
      return;
    }

    // Sütunun önüne en yakın boş yuvalar seçilir.
    const giris = this.enYakinYol(
      { x: this.sutunTopNoktasi(sutunNo, 0).x, y: this.y.bantY + this.y.bantY2 + 40 },
      this.y.bantX, this.y.bantY, this.y.bantG, this.y.bantY2,
    );
    const aralik = this.y.cevre / this.bolum.bantYeri;
    const uzaklik = (i: number) => {
      const s = (((this.kayma + i * aralik - giris) % this.y.cevre) + this.y.cevre) % this.y.cevre;
      return Math.min(s, this.y.cevre - s);
    };
    bosYuvalar.sort((a, b) => uzaklik(a) - uzaklik(b));

    const an = this.oyunAn;
    // Doğru mu: gönderilen şeyi görünen bir müşteri hâlâ istiyor mu (bantta ve
    // havada olanlar düşüldükten sonra)? Art arda doğrular ek puan getirir.
    const ilkCesit = sutun[sutun.length - 1];
    let ihtiyac = 0;
    for (const m of this.musteriYerleri) {
      if (m && m.durum === 'bekliyor') for (const p of m.parcalar) if (p.cesit === ilkCesit) ihtiyac += p.kalan;
    }
    for (const t of this.toplar) {
      if ((t.durum === 'bantta' || t.durum === 'ucuyor') && t.cesit === ilkCesit) ihtiyac--;
    }
    const sutunUstu = this.sutunTopNoktasi(sutunNo, 0);
    if (ihtiyac > 0) {
      this.seri++;
      if (this.seri >= SERI_BASLANGIC) {
        this.puan += SERI_EK_PUAN;
        this.seriPuani += SERI_EK_PUAN;
        this.ucanYazi(sutunUstu.x, sutunUstu.y - 20, `Seri ×${this.seri} +${SERI_EK_PUAN}`, 'ucan-seri');
      }
    } else {
      this.seri = 0;
    }
    // Dondurmacı kısa bir tepki verir; ayarlarda açıksa telefon hafifçe titrer.
    this.dondurmaciEl.classList.remove('tepki');
    void this.dondurmaciEl.offsetWidth;
    this.dondurmaciEl.classList.add('tepki');
    if (this.ayarlar.titresim && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Titreşim yoksa sessizce geçilir.
      }
    }
    for (let k = 0; k < giden; k++) {
      const cesit = sutun.pop()!;
      const nereden = this.sutunTopNoktasi(sutunNo, k); // sütundaki yerinden kalkar
      const el = this.topElKur(cesit, this.y.topBoyu);
      el.classList.add('bantta');
      // Bantta dondurma topu külahın üstünde döner (Kemal, 30 Ekim: "Bantta").
      // Sütunlarda ve istek balonunda çıplak top kalır.
      if (URUNLER[cesit].tur === 'dondurma') {
        el.classList.add('kulahli');
        const kulah = document.createElement('img');
        kulah.className = 'kulah';
        kulah.src = KULAH_RESMI;
        kulah.alt = '';
        kulah.draggable = false;
        el.prepend(kulah);
      }
      this.sahne.appendChild(el);
      const top: Top = {
        el,
        cesit,
        durum: 'ucuyor',
        yuva: bosYuvalar[k],
        baslangic: an,
        nereden,
        musteri: -1,
        tur: 0,
        gec: false,
      };
      this.yuvalar[top.yuva] = top;
      this.toplar.push(top);
    }
    // Giden her topun yerine ortak saklı sıradan sıradaki top bu sütunun en altına gelir.
    // Sıra bittiyse sütun kısalır.
    for (let k = 0; k < giden && this.sakliSira < this.bolum.sakli.length; k++) {
      sutun.unshift(this.bolum.sakli[this.sakliSira++]);
    }
    this.sutunlariCiz(sutunNo, giden, obek);
    this.sayaclariCiz();
  }

  // Ekranda kısa süre yukarı uçup kaybolan yazı ya da simge (puan, seri, kalp, üzgün yüz).
  private ucanYazi(x: number, y: number, icerik: string, sinif: string) {
    const el = document.createElement('div');
    el.className = 'ucan ' + sinif;
    el.innerHTML = icerik;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    this.sahne.appendChild(el);
    window.setTimeout(() => el.remove(), UCAN_MS);
  }

  // Oyun şu an akıyor mu (bölüm bitmedi, üstünde liste ya da giriş ekranı yok).
  private oynuyor(): boolean {
    return !this.bitti && !this.listeAcik && !this.girisAcik && !this.duraklatildi;
  }

  // Her karede oyunun saati, geçen gerçek süre kadar (hızlıyken HIZ_KATI katı) ilerler (duraklatınca,
  // giriş ekranında ve bölüm haritasında durur). Bölüm bitince de saat akar
  // ki havadaki toplar yerine varsın; oynanış (ilerlet) o zaman zaten durur.
  private kare(an: number) {
    const gercekDt = this.sonAn ? Math.min(0.05, (an - this.sonAn) / 1000) : 0;
    this.sonAn = an;
    const durdu = this.duraklatildi || this.girisAcik || this.listeAcik;
    const dt = durdu ? 0 : gercekDt * (this.hizli ? HIZ_KATI : 1);
    this.oyunAn += dt * 1000;
    this.ilerlet(dt, this.oyunAn);
    this.topCiz(this.oyunAn);
    requestAnimationFrame((a) => this.kare(a));
  }

  private ilerlet(dt: number, an: number) {
    if (!this.oynuyor()) return;
    const y = this.y;
    const aralik = y.cevre / this.bolum.bantYeri;
    const once = this.kayma;
    const adim = (y.cevre / BANT_TUR_SANIYE) * dt;
    this.kayma = (this.kayma + adim) % y.cevre;

    let musteriDegisti = false;

    // Uçuşu biten toplar banda oturur.
    for (const t of this.toplar) {
      if (t.durum === 'ucuyor' && an - t.baslangic >= UCUS_MS) t.durum = 'bantta';
    }

    // Erime: bantta alınmadan seçili tur sayısı kadar dönen top erimeye başlar.
    const erimeTuru = this.erimeTuru();
    for (const t of this.toplar) {
      if (t.durum !== 'bantta') continue;
      t.tur += adim / y.cevre;
      if (erimeTuru > 0 && t.tur >= erimeTuru) {
        t.durum = 'eriyor';
        t.baslangic = an;
        t.el.classList.add('eriyor');
      } else {
        // 1 turu geçti: artık yarım puanlı; hafif solup biraz erimiş görünür.
        // Yalnız erime açıkken (Kemal, 22 Ekim: "Hayır, yalnız erime açıkken").
        // Biçim oyun ortasında değişirse görünüm de ona uyar.
        const gec = erimeTuru > 0 && t.tur >= GEC_TOP_TURU;
        if (gec !== t.gec) {
          t.gec = gec;
          t.el.classList.toggle('gec', gec);
          t.el.style.opacity = gec ? String(GEC_TOP_SOLUKLUK) : '';
        }
      }
    }

    // İstediği çeşit önünden geçen müşteri onu alır.
    if (adim > 0) {
      for (let i = 0; i < this.bolum.bantYeri; i++) {
        const t = this.yuvalar[i];
        if (!t || t.durum !== 'bantta') continue;
        const sOnce = once + i * aralik;
        for (let m = 0; m < this.musteriYerleri.length; m++) {
          const my = this.musteriYerleri[m];
          if (!my || my.durum !== 'bekliyor') continue;
          const parca = my.parcalar.find((p) => p.cesit === t.cesit && p.kalan > 0);
          if (!parca) continue;
          const fark = (((y.musteriYolu[m] - sOnce) % y.cevre) + y.cevre) % y.cevre;
          if (fark < adim) {
            parca.kalan--;
            // Puan: tam puan; erime açıkken bantta 1 turdan uzun kaldıysa yarısı (Kemal, 22 Ekim).
            // "Erime yok"ta her top tam puan.
            const yarim = erimeTuru > 0 && t.tur >= GEC_TOP_TURU;
            const kazanilan = yarim ? TOP_PUANI * GEC_TOP_PUAN_ORANI : TOP_PUANI;
            this.puan += kazanilan;
            this.satilan[t.cesit]++;
            const mp = y.musteriNoktalari[m];
            // Kazanılan puan küçük bir yazıyla yukarı uçar (Kemal, 30 Ekim: "İkisi de").
            this.ucanYazi(mp.x, mp.y - 6, `+${kazanilan}`, 'ucan-puan');
            if (my.parcalar.every((p) => p.kalan === 0)) {
              my.durum = 'bitti';
              my.bittigiAn = an;
              this.karsilanan++;
              // İsteği tamam: başının üstünde kalp.
              this.ucanYazi(mp.x, mp.y + 24, KALP_SVG, 'ucan-kalp');
            }
            this.yuvalar[i] = null;
            t.durum = 'aliniyor';
            t.baslangic = an;
            t.nereden = this.yoldakiNokta(this.kayma + i * aralik);
            t.musteri = m;
            musteriDegisti = true;
            break;
          }
        }
      }
    }

    // Alınan toplar müşteriye varınca, eriyenler solup bitince kaybolur.
    let eridi = false;
    this.toplar = this.toplar.filter((t) => {
      if (t.durum === 'aliniyor' && an - t.baslangic >= ALIS_MS) {
        t.el.remove();
        return false;
      }
      if (t.durum === 'eriyor' && an - t.baslangic >= ERIME_MS) {
        if (this.yuvalar[t.yuva] === t) this.yuvalar[t.yuva] = null; // yeri açılır
        t.el.remove();
        eridi = true;
        return false;
      }
      return true;
    });

    // Sabır (Kemal, 30 Ekim): her bekleyen müşterinin çubuğu SABIR_SN içinde azalır;
    // bitince müşteri istediğini alamadan gider (puanı alınamaz), kaçan sayısı artar.
    for (let m = 0; m < this.musteriYerleri.length; m++) {
      const my = this.musteriYerleri[m];
      if (!my || my.durum !== 'bekliyor') continue;
      const oran = 1 - (an - my.gelisAn) / (SABIR_SN * 1000);
      const cubuk = this.sabirEller[m];
      if (cubuk) {
        cubuk.style.width = `${Math.max(0, oran) * 100}%`;
        cubuk.className = 'sabir-dolu' + (oran < SABIR_KIRMIZI ? ' kirmizi' : oran < SABIR_SARI ? ' sari' : '');
      }
      if (oran <= 0) {
        my.durum = 'gitti';
        my.bittigiAn = an;
        this.kacan++;
        const mp = y.musteriNoktalari[m];
        this.ucanYazi(mp.x, mp.y + 24, UZGUN_SVG, 'ucan-uzgun');
        musteriDegisti = true;
      }
    }

    // İşi biten müşteri gider; yeri boş kalır, yenisi rastgele bir bekleyişten sonra gelir.
    for (let m = 0; m < this.musteriYerleri.length; m++) {
      const my = this.musteriYerleri[m];
      if (my && (my.durum === 'bitti' || my.durum === 'gitti') && an - my.bittigiAn >= GIDIS_MS) {
        this.musteriYerleri[m] = null;
        this.gelisAnlari[m] = an + gelisBeklemesi();
        musteriDegisti = true;
      }
      if (!this.musteriYerleri[m] && an >= this.gelisAnlari[m]) {
        this.gelisAnlari[m] = Infinity;
        this.musteriYerleri[m] = this.siradakiMusteri();
        if (this.musteriYerleri[m]) musteriDegisti = true;
      }
    }
    if (musteriDegisti) this.musterileriCiz();
    if (musteriDegisti || eridi) this.sayaclariCiz();

    this.sonucBak(eridi);
  }

  // Sütunda, ortak saklı sırada ve bantta kalan toplar kalan istekleri karşılayabiliyor mu?
  private toplarYetiyorMu(): boolean {
    const eldeki: number[] = new Array(URUNLER.length).fill(0);
    for (const s of this.sutunlar) for (const c of s) eldeki[c]++;
    for (let i = this.sakliSira; i < this.bolum.sakli.length; i++) eldeki[this.bolum.sakli[i]]++;
    for (const t of this.toplar) if (t.durum === 'ucuyor' || t.durum === 'bantta') eldeki[t.cesit]++;
    const istek: number[] = new Array(URUNLER.length).fill(0);
    for (const m of this.musteriYerleri) {
      if (m && m.durum === 'bekliyor') for (const p of m.parcalar) istek[p.cesit] += p.kalan;
    }
    for (let i = this.siradaki; i < this.bolum.musteriler.length; i++) {
      for (const p of this.bolum.musteriler[i].parcalar) istek[p.cesit] += p.adet;
    }
    return istek.every((n, c) => eldeki[c] >= n);
  }

  private sonucBak(eridi: boolean) {
    // Kazanma: bütün müşteriler karşılandı; bantta ya da sütunda artan top kalabilir.
    const herkesGitti = this.musteriYerleri.every((m) => m === null) &&
      this.siradaki >= this.bolum.musteriler.length;
    if (herkesGitti && !this.toplar.some((t) => t.durum === 'aliniyor')) {
      this.bitir('kazandin');
      return;
    }

    // Bir bölümde KACAN_EN_COK müşteri sabrı bitip giderse bölüm kaybedilir.
    if (this.kacan >= KACAN_EN_COK) {
      this.bitir('kacti');
      return;
    }

    // Top kalmadı: bir top eridi ve kalanlar (sütun + bant) kalan istekleri artık karşılayamıyor.
    if (eridi && !this.toplarYetiyorMu()) {
      this.bitir('kalmadi');
      return;
    }

    // Bant doldu: bütün yerler dolu, hareket yok ve bantta olanı kimse istemiyor.
    // Erime açıkken bant kendiliğinden boşalır; o zaman bölüm bununla bitmez.
    if (this.erimeTuru() > 0) return;
    const dolu = this.yuvalar.every((t) => t !== null);
    if (!dolu) return;
    if (this.toplar.some((t) => t.durum !== 'bantta')) return;
    if (this.musteriYerleri.some((m) => m && m.durum !== 'bekliyor')) return;
    // Boş bir müşteri yerine yenisi gelecekse beklenir (o, bantta olanı isteyebilir).
    if (this.musteriYerleri.some((m) => !m) && this.siradaki < this.bolum.musteriler.length) return;
    const istenen = new Set(
      this.musteriYerleri
        .filter((m): m is MusteriYeri => !!m && m.durum === 'bekliyor')
        .flatMap((m) => m.parcalar.filter((p) => p.kalan > 0).map((p) => p.cesit)),
    );
    if (this.yuvalar.some((t) => t && istenen.has(t.cesit))) return;
    this.bitir('doldu');
  }

  // Bölüm sonu: dükkân fişi gibi (Kemal, 30 Ekim: "Bir receipt ekrani olabilir bolum sonu gibi").
  // Üstte logo ve bölüm numarası; satılan ürünler ve adetleri; hizmet edilen ve
  // giden müşteri; en altta toplam puan ve yıldızlar; teşekkür satırı [Kemal].
  // Kazanınca yıldızlar teker teker parlar, konfeti saçılır, dondurmacı sevinir.
  private bitir(sonuc: Sonuc) {
    this.bitti = sonuc;
    this.sayaclariCiz();
    this.sonEl.className = 'son';
    this.sonEl.dataset.sonuc = sonuc;
    this.sonEl.innerHTML = '';
    const kazandi = sonuc === 'kazandin';
    const no = this.bolum.no;
    const yildiz = kazandi ? this.yildizSayisi() : 0;
    // Kayıt: en iyi yıldız saklanır, sonraki bölüm açılır.
    if (kazandi) this.kayit = bolumKazanildi(this.kayit, no, yildiz);

    const kutu = document.createElement('div');
    kutu.className = 'son-kutu fisli';
    if (kazandi) {
      const sevinen = document.createElement('img');
      sevinen.className = 'son-dondurmaci';
      sevinen.src = SEVINEN_DONDURMACI_RESMI;
      sevinen.alt = '';
      sevinen.draggable = false;
      kutu.appendChild(sevinen);
    }

    const fis = document.createElement('div');
    fis.className = 'fis';
    const satir = (sol: string | Node, sag: string, sinif = '') => {
      const d = document.createElement('div');
      d.className = 'fis-satir ' + sinif;
      const a = document.createElement('span');
      a.className = 'fis-sol';
      a.append(sol);
      const b = document.createElement('span');
      b.className = 'fis-sag';
      b.textContent = sag;
      d.append(a, b);
      return d;
    };
    const cizgi = () => {
      const d = document.createElement('div');
      d.className = 'fis-cizgi';
      return d;
    };
    // Başlık: dükkânın logosu ve bölüm numarası.
    const logo = document.createElement('img');
    logo.className = 'fis-logo';
    logo.src = LOGO_RESMI;
    logo.alt = 'Dondurmacı Kızlar';
    logo.draggable = false;
    const bolumYazi = document.createElement('div');
    bolumYazi.className = 'fis-bolum';
    bolumYazi.textContent = `Bölüm ${no}`;
    const baslik = document.createElement('div');
    baslik.className = 'son-baslik';
    baslik.textContent = SONUC_YAZISI[sonuc];
    fis.append(logo, bolumYazi, cizgi(), baslik);
    // Satılan ürünler (bölümde gelen ürünler sırasıyla; satılmayan da 0 ile görünür).
    const urunler = document.createElement('div');
    urunler.className = 'fis-urunler';
    for (const c of this.bolum.urunler) {
      const ad = document.createElement('span');
      ad.className = 'fis-urun';
      const simge = document.createElement('span');
      simge.className = 'fis-simge';
      simge.innerHTML = urunSimgesi(c);
      ad.append(simge, URUNLER[c].ad);
      urunler.appendChild(satir(ad, `×${this.satilan[c] ?? 0}`));
    }
    fis.append(cizgi(), urunler, cizgi());
    fis.append(
      satir('Hizmet edilen müşteri', `${this.karsilanan} / ${this.bolum.musteriler.length}`),
      satir('Giden müşteri', String(this.kacan), this.kacan > 0 ? 'uyari' : ''),
      cizgi(),
    );
    const puanSatir = satir('TOPLAM PUAN', String(Math.round(this.puan * 10) / 10), 'toplam');
    puanSatir.dataset.puan = String(this.puan);
    puanSatir.dataset.enYuksek = String(this.enYuksekPuan());
    fis.appendChild(puanSatir);
    if (kazandi) {
      const yildizlar = document.createElement('div');
      yildizlar.className = 'yildizlar';
      yildizlar.dataset.yildiz = String(yildiz);
      for (let k = 0; k < YILDIZ_ESIKLERI.length; k++) {
        const y = yildizCiz(k < yildiz);
        y.style.animationDelay = `${0.25 + k * 0.35}s`;
        yildizlar.appendChild(y);
      }
      fis.appendChild(yildizlar);
    }
    if (kazandi && no >= BOLUM_SAYISI) {
      const durum = document.createElement('div');
      durum.className = 'son-durum';
      durum.textContent = HEPSI_BITTI_YAZISI;
      fis.appendChild(durum);
    }
    // Teşekkür satırı: yazı Kemal'in (Kemal, 30 Ekim: "Boş kalsın [Kemal]").
    const tesekkur = document.createElement('div');
    tesekkur.className = 'fis-tesekkur';
    tesekkur.textContent = FIS_TESEKKUR;
    fis.appendChild(tesekkur);
    kutu.appendChild(fis);

    const dugme = (yazi: string, sinif: string, is: () => void) => {
      const d = document.createElement('button');
      d.className = 'dugme ' + sinif;
      d.textContent = yazi;
      d.addEventListener('click', is);
      return d;
    };
    const dugmeler = document.createElement('div');
    dugmeler.className = 'son-dugmeler';
    if (kazandi) {
      const sonBolum = no >= BOLUM_SAYISI;
      dugmeler.append(
        dugme('Tekrar oyna', 'tekrar', () => this.yenidenBasla(no)),
        // Sonraki bölüm; son bölümdeyse bölüm haritası.
        dugme('Devam et', 'devam', () => (sonBolum ? this.listeAc('yerinde') : this.yenidenBasla(no + 1))),
      );
    } else {
      dugmeler.append(dugme('Tekrar oyna', 'tekrar', () => this.yenidenBasla(no)));
    }
    kutu.appendChild(dugmeler);
    // Bölüm haritasına dönüş için küçük bir yol.
    const listeYolu = document.createElement('button');
    listeYolu.className = 'liste-yolu';
    listeYolu.textContent = 'Bölümler';
    listeYolu.addEventListener('click', () => this.listeAc('yerinde'));
    kutu.appendChild(listeYolu);
    this.sonEl.appendChild(kutu);
    if (kazandi) this.konfeti();
  }

  // Kazanınca kısa bir renkli konfeti (yalnız görüntü).
  private konfeti() {
    const renkler = ['#7a3fa8', '#ffc928', '#e2475b', '#7cc4e4', '#a9cf6b', '#ffffff'];
    const alan = document.createElement('div');
    alan.className = 'konfeti';
    for (let k = 0; k < 40; k++) {
      const p = document.createElement('i');
      p.style.left = `${Math.random() * 100}%`;
      p.style.background = renkler[k % renkler.length];
      p.style.animationDelay = `${Math.random() * 0.6}s`;
      p.style.animationDuration = `${1.6 + Math.random() * 1.2}s`;
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      alan.appendChild(p);
    }
    this.sonEl.appendChild(alan);
    window.setTimeout(() => alan.remove(), 3200);
  }

  // ---------- Bölüm haritası ("Bölümler"; 5. paket) ----------
  // Düzada'nın kaba biçimi üstünde Sahil Yolu ve numaralı bölüm noktaları;
  // kilitli olanlar soluk ve dokununca başlamaz; açık olana dokununca başlar.
  // "Geri" haritanın açıldığı yere döner.

  listeAc(donus: HaritaDonus) {
    this.haritaDonus = donus;
    this.listeAcik = true;
    this.listeEl.className = 'liste harita-ekran';
    this.listeEl.innerHTML = '';
    this.listeEl.appendChild(
      haritaCiz(this.kayit, yildizCiz, {
        bolumSec: (no) => this.yenidenBasla(no),
        geri: () => this.haritaGeri(),
        bittiYazisi: hepsiBitti(this.kayit) ? HEPSI_BITTI_YAZISI : null,
      }),
    );
  }

  // Haritadan geri: giriş ekranı ve bölüm sonu haritanın altında açık durur;
  // duraklatmadan gelindiyse seçenekler yeniden çıkar (oyun duraklı kalır);
  // oyun sırasında açıldıysa oyun kaldığı yerden sürer.
  private haritaGeri() {
    this.listeKapat();
    if (this.haritaDonus === 'duraklat' && this.duraklatildi) this.duraklatMenuEl.className = 'son';
  }

  private listeKapat() {
    this.listeAcik = false;
    this.listeEl.className = 'liste harita-ekran gizli';
    this.listeEl.innerHTML = '';
  }

  private topCiz(an: number) {
    const y = this.y;
    const aralik = y.cevre / this.bolum.bantYeri;
    for (let i = 0; i < this.bolum.bantYeri; i++) {
      const p = this.yoldakiNokta(this.kayma + i * aralik);
      this.yuvaEller[i].style.transform =
        `translate(${p.x - y.topBoyu / 2}px, ${p.y - y.topBoyu / 2}px)`;
    }
    for (const t of this.toplar) {
      let p: Nokta;
      if (t.durum === 'bantta') {
        p = this.yoldakiNokta(this.kayma + t.yuva * aralik);
      } else if (t.durum === 'eriyor') {
        // Bantla dönmeye devam eder; yavaşça solup küçülür.
        p = this.yoldakiNokta(this.kayma + t.yuva * aralik);
        const k = Math.min(1, (an - t.baslangic) / ERIME_MS);
        t.el.style.opacity = String((t.gec ? GEC_TOP_SOLUKLUK : 1) * (1 - k));
        const olcek = 1 - 0.6 * k;
        t.el.style.transform =
          `translate(${p.x - y.topBoyu / 2}px, ${p.y - y.topBoyu / 2}px) scale(${olcek})`;
        continue;
      } else if (t.durum === 'ucuyor') {
        const hedef = this.yoldakiNokta(this.kayma + t.yuva * aralik);
        const k = Math.min(1, (an - t.baslangic) / UCUS_MS);
        p = {
          x: t.nereden.x + (hedef.x - t.nereden.x) * k,
          y: t.nereden.y + (hedef.y - t.nereden.y) * k,
        };
      } else {
        const hedef = y.musteriNoktalari[t.musteri];
        const k = Math.min(1, (an - t.baslangic) / ALIS_MS);
        p = {
          x: t.nereden.x + (hedef.x - t.nereden.x) * k,
          y: t.nereden.y + (hedef.y - t.nereden.y) * k,
        };
        t.el.style.opacity = String(1 - k * 0.7);
      }
      t.el.style.transform = `translate(${p.x - y.topBoyu / 2}px, ${p.y - y.topBoyu / 2}px)`;
    }
  }
}

// Basit çizimli beş köşeli yıldız; kazanılmışsa dolu, değilse yalnız çizgi.
function yildizCiz(dolu: boolean): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'yildiz' + (dolu ? ' kazanildi' : ''));
  const p = document.createElementNS(ns, 'polygon');
  const noktalar: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 10.5 : 4.6;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    noktalar.push(`${(12 + r * Math.cos(a)).toFixed(2)},${(12.6 + r * Math.sin(a)).toFixed(2)}`);
  }
  p.setAttribute('points', noktalar.join(' '));
  svg.appendChild(p);
  return svg;
}
