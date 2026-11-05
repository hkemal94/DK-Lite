// Oyunun kendisi. Diziliş (Kemal, 29 Ekim: "Resimdeki gibi"; tasarım belgesi 0.14):
// üstte mor-sarı tente ve dükkândan dışarısı; müşteriler tezgâhın arkasında;
// ortada tezgâh, ortasında dondurmacı, çevresinde dönen bant; tezgâhın önünde
// mor-sarı çizgiler ve dükkânın logosu; altta sütunlar.
// Görseller (7. paket; Kemal, 30 Ekim: "Parlak cizgi film iyi"): müşteriler,
// dondurmacı, ürünler ve arka plan parlak çizgi film tarzında el çizimi (Canva).
// Tente, bant ve tezgâh aynı tarzda: canlı renkler, koyu kahverengi kalın hat.

import {
  ACELECI_EK_PUAN_ORANI,
  ACELECI_SABIR_ORANI,
  KILIT_ACAN_MUSTERI,
  bolumdeTanitilanOge,
  type YeniOge,
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
import { bolumKur, gidecekTopSayisi, istekAdedi, type Bolum, type TopOzel } from './bolum';
import { urunSimgesi } from './urunSimgesi';
import { ayarOku, ayarYaz, bolumKazanildi, hepsiBitti, kayitOku, ogreticiBitti, ogreticiBittiMi, type Ayarlar, type Kayit } from './kayit';
import { haritaCiz } from './harita';
import { bolumdeYeniUrunler, bolumTuru, CAN_DOLUM_DK, CAN_EN_COK, SANDIK_ARALIGI, sandikOdulSec, SINIRSIZ_CAN_DK, type SandikOdulu } from './ayarlar';
import {
  canDurumu,
  canEkle,
  canKaybet,
  canlariDoldur,
  canVar,
  sinirsizVer,
  sonrakiCanaKalan,
  sureYazisi,
} from './can';

// Müşteriler: 10 farklı kişi, belden yukarısı (Canva, parlak çizgi film). Kaynak: docs/lisanslar.md.
// Renk çeşitleri (Kemal, 5 Kasım 2026: "daha da çeşitlenme imkanı var mı? ... renkler"):
// her kişinin kıyafetinin mavi kısımları kırmızı, mor, yeşil ve pembe olan hâlleri
// (araclar/musteri_renk.py üretir). 2. müşteride mavi yok, onun çeşidi yok.
// Gelen müşterinin görünüşü bunlardan rastgele seçilir; ekranda olan kişi bir daha gelmez.
const MUSTERI_RENKLERI = ['', 'kirmizi', 'mor', 'yesil', 'pembe'];
const RENKSIZ_MUSTERILER = [2];
const MUSTERI_RESIMLERI = MUSTERI_RENKLERI.flatMap((renk) =>
  Array.from({ length: 10 }, (_, i) => i + 1)
    .filter((no) => renk === '' || !RENKSIZ_MUSTERILER.includes(no))
    .map((no) => `gorseller/musteriler/musteri-${String(no).padStart(2, '0')}${renk ? '-' + renk : ''}.webp`),
);
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
// Külahlı logo (Kemal'in logosu; Dondurmacı Kızlar deposundan, 14 Ekim). Kemal, 5 Kasım:
// "Logoyu da külahlı logo yap". Giriş ekranında ve bölüm sonu fişinde.
const LOGO_KULAHLI_RESMI = 'gorseller/logo-kulahli.webp';
// Arka planlar artık resim değil, desenli mor zemin (Kemal, 5 Kasım: "Desenli mor zemin");
// desen stil.css'te (.desenli).
// Bantta dondurma topunun altındaki külah (Canva, parlak çizgi film).
const KULAH_RESMI = 'gorseller/kulah.webp';
// Müşteri kartındaki kişi resminin boyu (px). Kemal, 30 Ekim: "Musteriler boyunlarindan
// yukari gorunuyor boylari daha cok gorunmeli": resim büyüdü, barın arkasında kalan kısmı azaldı.
// Ekran yüksekliğine göre: tam boy resimle (aşağıda) büyük telefonda 110 piksele kadar;
// kısa ekranda (360x640) bar sıkışmasın diye 64.
function kisiBoyu(ekranYuksekligi: number): number {
  return Math.round(Math.min(110, Math.max(64, 64 + (ekranYuksekligi - 640) * 0.2)));
}
// Müşterinin alt kısmı tezgâhın (bandın) arkasında kalır: bu kadarı görünmez (px).
const KISI_ORTUSME = 10;
// Müşteriler tam boy çizili (Kemal, 30 Ekim: "insanlari tam boy olarak ciz"): resmin
// üstten bu kadarı barın üstünde görünür, gerisi (bacaklar) barın arkasında kalır.
// Bandın yuvarlak köşesinde kalan boşlukta artık kesik gövde değil bacaklar görünür.
const KISI_GORUNEN_ORAN = 0.62;

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
// Üst şeritteki sayaçların simgeleri (yuvarlak, dolu, kalın; arayüz dili 5 Kasım).
const MUSTERI_SIMGE_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4.2" fill="currentColor"/><path d="M4.5 21c0-4.4 3.4-7.5 7.5-7.5s7.5 3.1 7.5 7.5Z" fill="currentColor"/></svg>';
const PUAN_SIMGE_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8Z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>';
const BANT_SIMGE_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="5" fill="currentColor"/><path d="M7.2 11.5h9.6L12 22Z" fill="currentColor" opacity="0.75"/></svg>';
// Pencere köşesindeki kapat işareti ve düğmelerdeki küçük ikonlar.
const KAPAT_SVG =
  '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/></svg>';
const TEKRAR_SVG =
  '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M19.5 3.5v5h-5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
const ILERI_SVG =
  '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12h12M12 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// Aceleci müşterinin şimşeği ve kilitli sütunun kilidi (ekibin basit çizimleri).
const SIMSEK_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M13.5 2 4.5 13.5h6L9.5 22l9-11.5h-6z" fill="#ffd23f" stroke="#4a2a12" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const KILIT_SVG =
  '<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="#4a2a12" stroke-width="2.6"/><rect x="4.5" y="10.5" width="15" height="11" rx="3" fill="#ffc83d" stroke="#4a2a12" stroke-width="1.8"/><circle cx="12" cy="15.5" r="1.8" fill="#4a2a12"/></svg>';
// Yeni öğe pencerelerinde ne yaptığını anlatan tek satır (ad değil; adlar [Kemal]).
const TANITIM_YAZISI: Record<YeniOge, string> = {
  buzlu: 'Buzlu topa iki kez dokun: buz çözülür, sonra gönderebilirsin.',
  gizli: 'Bu topun ne olduğu sütunun en üstüne gelince görünür.',
  aceleci: 'Şimşekli müşterinin acelesi var: sabrı kısa, ama ek puan verir.',
  kilitli: `Kilitli sütun ${KILIT_ACAN_MUSTERI} müşteri karşılanınca açılır.`,
};
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
  parcalar: { cesit: number; kalan: number; ilk: number }[]; // bir ya da iki çeşit; her birinden kalan adet (ilk: istediği adet)
  durum: 'bekliyor' | 'bitti' | 'gitti'; // gitti: sabrı bitti, istediğini alamadan gitti
  bittigiAn: number;
  gelisAn: number; // geldiği an (oyunun saatiyle); sabır buradan sayılır
  resim: string; // müşterinin görünüşü (kişi resmi)
  aceleci: boolean; // sabrı kısa, karşılanınca ek puan (91. bölümden)
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
  kisiBoy: number; // müşteri resminin boyu
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
  // Sütunlardaki topların buzu ve gizliliği (sutunlar ile aynı biçimde).
  private ozel: TopOzel[][] = [];
  private musteriYerleri: (MusteriYeri | null)[] = [];
  private manzaraEl!: HTMLDivElement;
  private onuEl!: HTMLDivElement;
  private sonResim = ''; // en son gelen müşterinin görünüşü (art arda aynı kişi gelmesin)
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
  // Oyuncu bu bölüme kendi başladı mı (can için: kaybedince ya da yarıda
  // bırakınca 1 can gider). Açılışta arkada hazır duran bölüm sayılmaz.
  private basladi = false;
  private ipucuEl!: HTMLDivElement;

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
    // Can göstergeleri her saniye yenilenir (dolum süresi, sınırsız can süresi).
    this.canCiz();
    window.setInterval(() => this.canCiz(), 1000);
    // 0. bölümde ipucu eli: hangi sütuna dokunulacağını gösterir.
    this.ipucuEl = document.createElement('div');
    this.ipucuEl.className = 'ipucu-el gizli';
    this.ipucuEl.innerHTML = EL_SVG;
    this.sahne.appendChild(this.ipucuEl);
    window.setInterval(() => this.ipucuGuncelle(), 300);
  }

  // 0. bölüm (Kemal: "İpuçlu kolay bölüm"): bir müşterinin istediği ürün hangi sütunun
  // en üstündeyse el işareti o sütunu gösterir. Başka bölümde görünmez.
  private ipucuGuncelle() {
    const el = this.ipucuEl;
    if (!this.bolum || this.bolum.no !== 0 || !this.oynuyor()) {
      el.classList.add('gizli');
      return;
    }
    const ihtiyac = new Map<number, number>();
    for (const m of this.musteriYerleri) {
      if (!m || m.durum !== 'bekliyor') continue;
      for (const p of m.parcalar) ihtiyac.set(p.cesit, (ihtiyac.get(p.cesit) ?? 0) + p.kalan);
    }
    for (const t of this.toplar) {
      if (t.durum === 'bantta' || t.durum === 'ucuyor') ihtiyac.set(t.cesit, (ihtiyac.get(t.cesit) ?? 0) - 1);
    }
    const hedef = this.sutunlar.findIndex((s) => s.length > 0 && (ihtiyac.get(s[s.length - 1]) ?? 0) > 0);
    if (hedef < 0) {
      el.classList.add('gizli');
      return;
    }
    const s = this.sutunEller[hedef];
    el.style.left = `${s.offsetLeft + s.offsetWidth / 2}px`;
    el.style.top = `${s.offsetTop + 8}px`;
    el.classList.remove('gizli');
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
    // Her sayaç bir hap: solda dışa taşan yuvarlak simge, sağda değer (arayüz dili,
    // 5 Kasım). Eski küçük yazı etiketi ("Müşteri", "Puan", "Bant") ekranda değil,
    // yalnız ekran okuyucu için.
    const sayac = (etiket: string, id: string, simge: string) => {
      const k = document.createElement('div');
      k.className = 'sayac';
      k.id = id;
      k.setAttribute('aria-label', etiket);
      k.title = etiket;
      const s = document.createElement('span');
      s.className = 'sayac-simge';
      s.innerHTML = simge;
      k.appendChild(s);
      sayaclar.appendChild(k);
      return k;
    };
    this.karsilananEl = document.createElement('span');
    this.karsilananEl.className = 'sayac-deger';
    sayac('Müşteri', 'sayac-musteri', MUSTERI_SIMGE_SVG).appendChild(this.karsilananEl);
    this.puanEl = document.createElement('span');
    this.puanEl.className = 'sayac-deger';
    sayac('Puan', 'sayac-puan', PUAN_SIMGE_SVG).appendChild(this.puanEl);
    this.doluKutuEl = sayac('Bant', 'sayac-bant', BANT_SIMGE_SVG) as HTMLDivElement;
    const cubuk = document.createElement('div');
    cubuk.className = 'cubuk';
    this.doluEl = document.createElement('div');
    this.doluEl.className = 'cubuk-dolu';
    cubuk.appendChild(this.doluEl);
    this.doluKutuEl.appendChild(cubuk);

    // Arkada dükkândan dışarısı (gök ve deniz), en üstte mor-sarı tente.
    this.manzaraEl = document.createElement('div');
    this.manzaraEl.className = 'manzara desenli';
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
    // Bölüm numarasının yanında can (Kemal, 5 Kasım: "can barı olması lazım").
    const solUst = document.createElement('div');
    solUst.className = 'ust-sol-ust';
    solUst.append(this.bolumNoEl, canGostergesi(true));
    sol.append(solUst, this.erimeEl);
    // Sağ köşede duraklatma düğmesi (iki dik çizgi). Basınca oyun durur, seçenekler çıkar.
    this.duraklatEl = document.createElement('button');
    this.duraklatEl.className = 'kose-dugme duraklat-dugme yuvarlak mor';
    this.duraklatEl.id = 'duraklat';
    this.duraklatEl.setAttribute('aria-label', 'Duraklat');
    this.duraklatEl.append(document.createElement('span'), document.createElement('span'));
    this.duraklatEl.addEventListener('click', () => this.duraklat());
    // Hızlandırma düğmesi: basınca oyun HIZ_KATI kat hızlanır, tekrar basınca normale döner.
    this.hizEl = document.createElement('button');
    this.hizEl.className = 'kose-dugme hiz-dugme yuvarlak mor';
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
    this.listeEl.className = 'liste harita-ekran desenli gizli';
    this.listeEl.id = 'liste';
    this.kok.appendChild(this.listeEl);

    // Duraklatma seçenekleri: Devam et, Baştan başla, Bölümler.
    this.duraklatMenuEl = document.createElement('div');
    this.duraklatMenuEl.className = 'son gizli';
    this.duraklatMenuEl.id = 'duraklat-menu';
    const menuKutu = document.createElement('div');
    menuKutu.className = 'son-kutu duraklat-kutu pencere';
    menuKutu.append(
      pencereBaslik('Duraklatıldı'),
      kapatDugme('menu-kapat', () => this.devamEt()),
    );
    const menuDugme = (yazi: string, sinif: string, id: string, is: () => void) => {
      const d = document.createElement('button');
      d.className = 'dugme ' + sinif;
      d.id = id;
      d.textContent = yazi;
      d.addEventListener('click', is);
      return d;
    };
    menuKutu.append(
      menuDugme('Devam et', 'yesil', 'menu-devam', () => this.devamEt()),
      menuDugme('Baştan başla', 'krem', 'menu-bastan', () => this.bolumBaslat(this.bolum.no)),
      menuDugme('Bölümler', 'krem', 'menu-bolumler', () => {
        this.duraklatMenuKapat();
        this.listeAc('duraklat');
      }),
    );
    this.duraklatMenuEl.appendChild(menuKutu);
    this.kok.appendChild(this.duraklatMenuEl);

    // Giriş ekranı: oyunun adı yerine yer tutucu (ad Kemal'in), "Başla" ve "Bölümler".
    this.girisEl = document.createElement('div');
    this.girisEl.className = 'giris desenli gizli';
    this.girisEl.id = 'giris';
    const girisKutu = document.createElement('div');
    girisKutu.className = 'giris-kutu';
    const ad = document.createElement('div');
    ad.className = 'giris-ad';
    ad.setAttribute('aria-label', OYUN_ADI);
    const adLogo = document.createElement('img');
    adLogo.src = LOGO_KULAHLI_RESMI;
    adLogo.alt = '';
    adLogo.draggable = false;
    const lite = document.createElement('span');
    lite.className = 'giris-lite';
    lite.textContent = 'Lite';
    ad.append(adLogo, lite);
    const basla = document.createElement('button');
    basla.className = 'dugme yesil';
    basla.id = 'giris-basla';
    basla.textContent = 'Başla';
    // Kaldığı bölüm (açılan en ileri bölüm) baştan başlar; bütün bölümler
    // bittiyse bölüm haritası açılır.
    basla.addEventListener('click', () => {
      if (hepsiBitti(this.kayit)) this.listeAc('giris');
      else this.bolumBaslat(ogreticiBittiMi() ? this.kayit.acik : 0);
    });
    const bolumler = document.createElement('button');
    bolumler.className = 'dugme krem';
    bolumler.id = 'giris-bolumler';
    bolumler.textContent = 'Bölümler';
    bolumler.addEventListener('click', () => this.listeAc('giris'));
    girisKutu.append(ad, basla, bolumler);
    this.girisEl.appendChild(girisKutu);
    // Sağ üstte ayarlar dişlisi (Kemal, 30 Ekim: ayarlar "Şimdi, basit").
    const disli = document.createElement('button');
    disli.className = 'kose-dugme ayar-dugme yuvarlak mor';
    disli.id = 'ayarlar-ac';
    disli.setAttribute('aria-label', 'Ayarlar');
    disli.innerHTML = DISLI_SVG;
    disli.addEventListener('click', () => this.ayarlarAc());
    this.girisEl.appendChild(disli);
    // Sol üstte can ve sonraki canın süresi.
    const girisCan = canGostergesi(false);
    girisCan.classList.add('giris-can');
    this.girisEl.appendChild(girisCan);
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
    kutu.className = 'son-kutu ayar-kutu pencere';
    const kapat = () => {
      this.ayarlarEl.className = 'son ayarlar gizli';
      this.ayarlarEl.innerHTML = '';
    };
    // Başlık şeridi ve köşede kırmızı ✕ (Kemal, 5 Kasım: "Köşede ✕"); alttaki "Kapat" kalktı.
    kutu.append(pencereBaslik('Ayarlar'), kapatDugme('ayarlar-kapat', kapat));
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
    this.girisEl.className = 'giris desenli';
  }

  private girisKapat() {
    this.girisAcik = false;
    this.girisEl.className = 'giris desenli gizli';
  }

  // Oyuncunun başlattığı bölüm (Başla, Bölümler, Tekrar oyna, Devam et, Baştan başla).
  // Can: bölüm yarıda bırakılıyorsa 1 can gider; can yoksa bölüm başlamaz,
  // "Can yok" penceresi çıkar (Kemal, 5 Kasım).
  private bolumBaslat(no: number) {
    if (no < 0 || no > BOLUM_SAYISI || no > this.kayit.acik) return;
    if (this.basladi && !this.bitti) {
      canKaybet();
      this.basladi = false;
      this.canCiz();
      if (!canVar()) {
        // Yarıda bırakılan bölüm biter; giriş ekranına dönülür.
        this.listeKapat();
        this.duraklatMenuKapat();
        this.duraklatildi = false;
        this.girisAc();
      }
    }
    // 0. bölüm can istemez ve can harcatmaz.
    if (no > 0 && !canVar()) {
      this.canYokGoster();
      return;
    }
    this.yenidenBasla(no);
    this.basladi = no > 0;
    // Mahallenin ilk bölümü: yeni öğe "Yeni!" penceresiyle tanıtılır (bölüm henüz geçilmediyse).
    const oge = bolumdeTanitilanOge(no);
    if (oge && (this.kayit.yildizlar[no - 1] ?? 0) === 0) this.tanitimGoster(oge);
  }

  // Yeni öğe tanıtımı: oyun durur, öğenin küçük resmi ve ne yaptığı; "Tamam" ile sürer.
  // Öğelerin adı [Kemal]; pencerede ad yok, yalnız ne yaptığı yazar.
  private tanitimGoster(oge: YeniOge) {
    this.duraklatildi = true;
    const ort = odulOrtusu('tanitim', 'Yeni!');
    ort.dataset.oge = oge;
    const kutu = ort.firstElementChild as HTMLDivElement;
    const sahne = document.createElement('div');
    sahne.className = 'tanitim-sahne';
    const boy = 84;
    const ilk = this.bolum.urunler[0];
    if (oge === 'buzlu') {
      const t = this.topElKur(ilk, boy);
      t.classList.add('buzlu');
      const buz = document.createElement('span');
      buz.className = 'buz';
      t.appendChild(buz);
      sahne.appendChild(t);
    } else if (oge === 'gizli') {
      sahne.appendChild(this.gizliTopElKur(boy));
    } else if (oge === 'aceleci') {
      const balon = document.createElement('div');
      balon.className = 'istek tanitim-balon';
      const satir = document.createElement('div');
      satir.className = 'istek-satir';
      satir.appendChild(this.topElKur(ilk, 40));
      const adet = document.createElement('span');
      adet.className = 'adet';
      adet.textContent = '×3';
      satir.appendChild(adet);
      const rozet = document.createElement('span');
      rozet.className = 'aceleci-rozet';
      rozet.innerHTML = SIMSEK_SVG;
      balon.append(satir, rozet);
      sahne.appendChild(balon);
    } else {
      const k = document.createElement('div');
      k.className = 'sutun-kilit tanitim-kilit';
      k.innerHTML = `${KILIT_SVG}<span>${KILIT_ACAN_MUSTERI}</span>`;
      sahne.appendChild(k);
    }
    const not = document.createElement('div');
    not.className = 'odul-not tanitim-not';
    not.textContent = TANITIM_YAZISI[oge];
    const tamam = odulTamam();
    tamam.addEventListener('click', () => {
      ort.remove();
      this.duraklatildi = false;
    });
    kutu.append(sahne, not, tamam);
    this.kok.appendChild(ort);
  }

  // Numaralı bölümü baştan kurar. Aynı numara her zaman aynı dizilimi getirir
  // (Tekrar oyna da budur). Kilitli bölüm başlamaz.
  yenidenBasla(no: number) {
    if (no < 0 || no > BOLUM_SAYISI || no > this.kayit.acik) return;
    this.listeKapat();
    this.girisKapat();
    this.duraklatildi = false;
    this.duraklatMenuKapat();
    this.bolum = bolumKur(no);
    this.bolumNoEl.textContent = `Bölüm ${no}`;
    this.bolumNoEl.dataset.no = String(no);
    this.sutunlar = this.bolum.sutunlar.map((s) => s.slice());
    this.ozel = this.bolum.sutunOzel.map((s) => s.map((t) => ({ ...t })));
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
    this.kilitGuncelle();

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
    const aceleci = this.bolum.aceleci[this.siradaki] ?? false;
    const m = this.bolum.musteriler[this.siradaki++];
    // Rastgele bir görünüş; ekranda şu an olan kişiler (rengi ne olursa olsun) gelmez.
    const kisi = (yol: string) => yol.match(/musteri-(\d+)/)?.[1] ?? yol;
    const ekranda = new Set(this.musteriYerleri.filter((y) => y !== null).map((y) => kisi(y!.resim)));
    if (this.sonResim) ekranda.add(kisi(this.sonResim));
    const adaylar = MUSTERI_RESIMLERI.filter((r) => !ekranda.has(kisi(r)));
    const havuz = adaylar.length > 0 ? adaylar : MUSTERI_RESIMLERI;
    const resim = havuz[Math.floor(Math.random() * havuz.length)];
    this.sonResim = resim;
    const parcalar = m.parcalar.map((p) => ({ cesit: p.cesit, kalan: p.adet, ilk: p.adet }));
    return { parcalar, durum: 'bekliyor', bittigiAn: 0, gelisAn: this.oyunAn, resim, aceleci };
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
      // Dokunuş görünsün: sütunda kısa bir sarı parıltı (yalnız görünüm, 4 Kasım 2026).
      el.classList.remove('dokunuldu');
      void el.offsetWidth;
      el.classList.add('dokunuldu');
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
    const kisiBoy = kisiBoyu(h);
    const kartYuk = satir * istekBoy + (satir - 1) * 2 + (dar ? 8 : 12) + 4 + SABIR_BOY + 3 + kisiBoy;
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
      kisiBoy,
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
    // İç alan (bar) bandın iç köşesi kadar yuvarlak: dış köşe eksi bant kalınlığı.
    b.setProperty('--ic-kose', `${Math.max(6, disKose - y.bantKalinlik)}px`);

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
      el.className = 'musteri' + dar + (m.durum === 'bitti' ? ' bitti' : m.durum === 'gitti' ? ' gitti' : '') + (m.aceleci ? ' aceleci' : '');
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
      // Tam boy resim: kartta kisiBoy kadar yer kaplar, kalanı aşağı, barın arkasına uzar.
      const tamBoy = Math.round(y.kisiBoy / KISI_GORUNEN_ORAN);
      kisi.style.height = `${tamBoy}px`;
      kisi.style.marginBottom = `${y.kisiBoy - tamBoy}px`;
      // Sabır çubuğu: yavaşça azalır, yeşilden sarıya, sonra kırmızıya döner (her karede güncellenir).
      const sabir = document.createElement('div');
      sabir.className = 'sabir';
      sabir.style.height = `${SABIR_BOY}px`;
      const dolu = document.createElement('div');
      dolu.className = 'sabir-dolu';
      sabir.appendChild(dolu);
      if (m.durum === 'bekliyor') this.sabirEller[i] = dolu;
      else sabir.style.visibility = 'hidden';
      if (m.aceleci) {
        // Aceleci müşteri: balonun köşesinde küçük şimşek.
        const rozet = document.createElement('span');
        rozet.className = 'aceleci-rozet';
        rozet.innerHTML = SIMSEK_SVG;
        istek.appendChild(rozet);
      }
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
      const ustBoy = Math.max(Math.min(1, sutun.length), this.gidecek(i)); // yalnız gidecek top öne çıkar
      const gorunen = Math.min(sutun.length, SUTUNDA_GORUNEN_TOP);
      const ozel = this.ozel[i];
      for (let k = 0; k < gorunen; k++) {
        const o = ozel[ozel.length - 1 - k];
        // Gizli top en üste gelince açılır; buzlu top buzuyla çizilir.
        const gizli = o.gizli && k > 0;
        const t = gizli ? this.gizliTopElKur(boy) : this.topElKur(sutun[sutun.length - 1 - k], boy);
        if (o.buz > 0 && !gizli) {
          t.classList.add('buzlu');
          t.dataset.buz = String(o.buz);
          const buz = document.createElement('span');
          buz.className = 'buz';
          t.appendChild(buz);
        }
        const p = this.sutunTopNoktasi(i, k);
        t.style.left = `${p.x - solX - boy / 2}px`;
        t.style.top = `${p.y - y.sutunlarUst - boy / 2}px`;
        if (k < ustBoy) t.classList.add('ustte');
        el.appendChild(t);
        if (i === kayanSutun && giden > 0) this.kaydir(t, k, giden, oncekiUst);
      }
    });
    this.kilitGuncelle();
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

  // Bir dokunuşta bu sütundan gidecek top sayısı: üstteki aynı çeşitler, ama
  // buzlu topa gelince durur (buzlu top önce çözülmeli).
  private gidecek(sutunNo: number): number {
    const sutun = this.sutunlar[sutunNo];
    const ozel = this.ozel[sutunNo];
    let acik = 0;
    for (let k = ozel.length - 1; k >= 0 && ozel[k].buz === 0; k--) acik++;
    return Math.min(gidecekTopSayisi(sutun), acik);
  }

  private kilitliMi(sutunNo: number): boolean {
    return sutunNo === this.bolum.kilitliSutun && this.karsilanan < KILIT_ACAN_MUSTERI;
  }

  // Kilitli sütunun görünüşü: kilit ve kaç müşteri kaldığı; açılınca kilit uçar.
  private kilitGuncelle() {
    this.sutunEller.forEach((el, i) => {
      const kilitli = this.kilitliMi(i);
      const vardi = el.classList.contains('kilitli-sutun');
      if (kilitli) {
        el.classList.add('kilitli-sutun');
        let k = el.querySelector<HTMLDivElement>('.sutun-kilit');
        if (!k) {
          k = document.createElement('div');
          k.className = 'sutun-kilit';
          el.appendChild(k);
        }
        k.innerHTML = `${KILIT_SVG}<span>${KILIT_ACAN_MUSTERI - this.karsilanan}</span>`;
      } else if (vardi) {
        el.classList.remove('kilitli-sutun');
        const k = el.querySelector('.sutun-kilit');
        k?.classList.add('acildi');
        window.setTimeout(() => k?.remove(), 700);
      }
    });
  }

  private gizliTopElKur(boy: number): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'top gizli-top';
    el.style.width = el.style.height = `${boy}px`;
    el.style.fontSize = `${Math.round(boy * 0.55)}px`;
    el.innerHTML = '<span>?</span>';
    return el;
  }

  // ---------- oynanış ----------

  private gonder(sutunNo: number) {
    if (!this.oynuyor()) return;
    const sutun = this.sutunlar[sutunNo];
    const ozel = this.ozel[sutunNo];
    if (sutun.length === 0) return;
    // Kilitli sütun: açılana dek sallanır.
    if (this.kilitliMi(sutunNo)) {
      this.sutunEller[sutunNo].classList.remove('sars');
      void this.sutunEller[sutunNo].offsetWidth;
      this.sutunEller[sutunNo].classList.add('sars');
      return;
    }
    // En üstteki top buzluysa dokunuş buzu kırar (BUZ_DOKUNUS dokunuşta çözülür).
    const ust = ozel[ozel.length - 1];
    if (ust.buz > 0) {
      ust.buz--;
      ust.gizli = false;
      this.sutunlariCiz(sutunNo);
      const t = this.sutunEller[sutunNo].querySelector('.top');
      t?.classList.add(ust.buz > 0 ? 'catladi' : 'cozuldu');
      return;
    }
    const obek = this.gidecek(sutunNo);
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
      ozel.pop();
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
      ozel.unshift({ ...this.bolum.sakliOzel[this.sakliSira] });
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
              // Aceleci müşteri ek puan getirir (yıldız hesabına girmez, seri ek puanı gibi).
              if (my.aceleci) {
                const adet = my.parcalar.reduce((a, p) => a + p.ilk, 0);
                const ek = Math.round(adet * TOP_PUANI * ACELECI_EK_PUAN_ORANI);
                this.puan += ek;
                this.seriPuani += ek;
                this.ucanYazi(mp.x, mp.y - 30, `${SIMSEK_SVG}+${ek}`, 'ucan-seri ucan-aceleci');
              }
              this.kilitGuncelle();
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
      const sabir = SABIR_SN * (my.aceleci ? ACELECI_SABIR_ORANI : 1);
      const oran = 1 - (an - my.gelisAn) / (sabir * 1000);
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
    // 0. bölüm kaybedilmez: kaybederse sonuç penceresi çıkmadan sessizce yeniden başlar.
    if (no === 0 && !kazandi) {
      this.sonEl.className = 'son gizli';
      this.yenidenBasla(0);
      return;
    }
    const ogreticiIlkKez = no === 0 && kazandi && !ogreticiBittiMi();
    if (no === 0 && kazandi) ogreticiBitti();
    const yildiz = kazandi ? this.yildizSayisi() : 0;
    // Kayıt: en iyi yıldız saklanır, sonraki bölüm açılır.
    // Yeni ürün (kazanç, 5 Kasım): bu bölüm ilk kez kazanılıyorsa ve sonraki
    // bölümde ilk kez gelen ürün varsa, fişten önce "Yeni ürün!" penceresi çıkar.
    const ilkKez = no === 0 ? ogreticiIlkKez : kazandi && this.kayit.acik < no + 1 && no + 1 <= BOLUM_SAYISI;
    const yeniUrunler = ilkKez ? bolumdeYeniUrunler(no + 1) : [];
    // Sandık (5 Kasım): 10., 20., 30. ... bölüm ilk kez kazanılınca.
    const ilkKazanma = kazandi && no > 0 && (this.kayit.yildizlar[no - 1] ?? 0) === 0;
    const sandik: SandikOdulu | null =
      ilkKazanma && no % SANDIK_ARALIGI === 0
        ? sandikOdulSec(Math.random())
        : null;
    if (sandik === 'bir-can') canEkle(1);
    else if (sandik === 'canlar-dolu') canlariDoldur();
    else if (sandik === 'sinirsiz') sinirsizVer(SINIRSIZ_CAN_DK);
    // Can: kaybedince 1 can gider (sınırsızken gitmez).
    let canGitti = false;
    if (!kazandi && this.basladi) canGitti = canKaybet();
    this.basladi = false;
    this.canCiz();
    if (kazandi && no > 0) this.kayit = bolumKazanildi(this.kayit, no, yildiz);

    // Sonuç penceresi (Kemal, 5 Kasım akşamı: fiş "olmamış"; "Sonuç penceresi"):
    // ayarlar gibi krem pencere, üstte mor şeritte bölüm numarası; büyük yıldızlar,
    // sonuç yazısı, puan, satılan ürünler tek sıra, müşteri sayıları, kazanılanlar.
    const kutu = document.createElement('div');
    kutu.className = 'son-kutu pencere sonuc-kutu' + (kazandi ? ' kazandi' : ' kaybetti');
    kutu.appendChild(pencereBaslik(`Bölüm ${no}`));
    if (kazandi) {
      const sevinen = document.createElement('img');
      sevinen.className = 'son-dondurmaci';
      sevinen.src = SEVINEN_DONDURMACI_RESMI;
      sevinen.alt = '';
      sevinen.draggable = false;
      kutu.appendChild(sevinen);
      const yildizlar = document.createElement('div');
      yildizlar.className = 'yildizlar sonuc-yildizlar';
      yildizlar.dataset.yildiz = String(yildiz);
      for (let k = 0; k < YILDIZ_ESIKLERI.length; k++) {
        const y = yildizCiz(k < yildiz);
        y.style.animationDelay = `${0.25 + k * 0.35}s`;
        yildizlar.appendChild(y);
      }
      kutu.appendChild(yildizlar);
    }
    const baslik = document.createElement('div');
    baslik.className = 'son-baslik sonuc-yazi';
    baslik.textContent = SONUC_YAZISI[sonuc];
    kutu.appendChild(baslik);
    // Puan: içe gömük kutuda büyük.
    const puanKutu = document.createElement('div');
    puanKutu.className = 'sonuc-puan';
    puanKutu.dataset.puan = String(this.puan);
    puanKutu.dataset.enYuksek = String(this.enYuksekPuan());
    const puanEtiket = document.createElement('span');
    puanEtiket.className = 'sonuc-etiket';
    puanEtiket.textContent = 'Puan';
    const puanDeger = document.createElement('span');
    puanDeger.className = 'sonuc-puan-deger';
    puanDeger.textContent = String(Math.round(this.puan * 10) / 10);
    puanKutu.append(puanEtiket, puanDeger);
    kutu.appendChild(puanKutu);
    // Satılan ürünler: simge ve adet, tek sıra.
    const urunler = document.createElement('div');
    urunler.className = 'sonuc-urunler';
    for (const c of this.bolum.urunler) {
      const u = document.createElement('span');
      u.className = 'sonuc-urun';
      u.title = URUNLER[c].ad;
      const simge = document.createElement('span');
      simge.className = 'sonuc-simge';
      simge.innerHTML = urunSimgesi(c);
      const adet = document.createElement('span');
      adet.textContent = `×${this.satilan[c] ?? 0}`;
      u.append(simge, adet);
      urunler.appendChild(u);
    }
    kutu.appendChild(urunler);
    // Müşteri sayıları ve (kaybedince) can.
    const bilgi = document.createElement('div');
    bilgi.className = 'sonuc-bilgi';
    const bilgiSatir = (sol: string, sag: string, sinif = '') => {
      const d = document.createElement('div');
      d.className = 'sonuc-satir ' + sinif;
      const a = document.createElement('span');
      a.textContent = sol;
      const b = document.createElement('span');
      b.className = 'sonuc-sag';
      b.textContent = sag;
      d.append(a, b);
      bilgi.appendChild(d);
    };
    bilgiSatir('Hizmet edilen müşteri', `${this.karsilanan} / ${this.bolum.musteriler.length}`);
    bilgiSatir('Giden müşteri', String(this.kacan), this.kacan > 0 ? 'uyari' : '');
    if (!kazandi) {
      const kalan = canDurumu().can;
      if (canGitti) bilgiSatir('Can', `−1 (kalan ${kalan})`, 'uyari can-satir');
      else bilgiSatir('Can', 'gitmedi (sınırsız)', 'can-satir');
    }
    kutu.appendChild(bilgi);
    // Kazanılanlar: yeni ürün ve sandık (ayrıca kendi pencereleriyle de gösterilir).
    if (sandik || yeniUrunler.length > 0) {
      const kaz = document.createElement('div');
      kaz.className = 'sonuc-kazanilan';
      if (sandik) {
        const k = document.createElement('span');
        k.className = 'sonuc-kazanc';
        k.innerHTML = KALP_BUYUK_SVG;
        k.append(sandik === 'bir-can' ? '+1 can' : sandik === 'canlar-dolu' ? 'Canlar doldu' : `${SINIRSIZ_CAN_DK / 60} saat sınırsız can`);
        kaz.appendChild(k);
      }
      for (const id of yeniUrunler) {
        const u = URUNLER.find((x) => x.id === id);
        if (!u) continue;
        const k = document.createElement('span');
        k.className = 'sonuc-kazanc';
        k.innerHTML = `<img src="gorseller/urunler/${u.id}.webp" alt="" draggable="false">`;
        k.append(`Yeni: ${u.ad}`);
        kaz.appendChild(k);
      }
      kutu.appendChild(kaz);
    }
    if (kazandi && no >= BOLUM_SAYISI) {
      const durum = document.createElement('div');
      durum.className = 'son-durum';
      durum.textContent = HEPSI_BITTI_YAZISI;
      kutu.appendChild(durum);
    }

    // Düğmeler yazının yanında küçük ikonla: Tekrar oyna ↻, Devam et → (arayüz dili).
    const dugme = (yazi: string, sinif: string, is: () => void, ikon = '') => {
      const d = document.createElement('button');
      d.className = 'dugme ikonlu ' + sinif;
      d.innerHTML = ikon;
      d.append(yazi);
      d.addEventListener('click', is);
      return d;
    };
    const dugmeler = document.createElement('div');
    dugmeler.className = 'son-dugmeler';
    if (kazandi) {
      const sonBolum = no >= BOLUM_SAYISI;
      dugmeler.append(
        dugme('Tekrar oyna', 'krem', () => this.bolumBaslat(no), TEKRAR_SVG),
        // Sonraki bölüm; son bölümdeyse bölüm haritası.
        dugme('Devam et', 'yesil', () => (sonBolum ? this.listeAc('yerinde') : this.bolumBaslat(no + 1)), ILERI_SVG),
      );
    } else {
      dugmeler.append(dugme('Tekrar oyna', 'yesil', () => this.bolumBaslat(no), TEKRAR_SVG));
    }
    kutu.appendChild(dugmeler);
    // Bölüm haritasına dönüş için küçük bir yol.
    const listeYolu = document.createElement('button');
    listeYolu.className = 'dugme krem kucuk liste-yolu';
    listeYolu.textContent = 'Bölümler';
    listeYolu.addEventListener('click', () => this.listeAc('yerinde'));
    kutu.appendChild(listeYolu);
    this.sonEl.appendChild(kutu);
    if (kazandi) this.konfeti();
    const oduller: (() => HTMLDivElement)[] = [];
    if (sandik) oduller.push(() => this.sandikPenceresi(sandik));
    if (yeniUrunler.length > 0) oduller.push(() => this.yeniUrunPenceresi(yeniUrunler));
    this.odulSirasi(oduller, true);
  }

  // Ödül pencereleri sırayla: "Tamam" deyince sıradaki gelir. İlki yıldızlardan sonra açılır.
  private odulSirasi(adimlar: (() => HTMLDivElement)[], gecikmeli: boolean) {
    const ilk = adimlar.shift();
    if (!ilk) return;
    const ort = ilk();
    if (gecikmeli) ort.classList.add('gecikmeli');
    const tamam = ort.querySelector<HTMLButtonElement>('.odul-tamam');
    tamam?.addEventListener('click', () => {
      ort.remove();
      this.odulSirasi(adimlar, false);
    });
    this.sonEl.appendChild(ort);
  }

  // Sandık penceresi: sandık açılır, içinden çıkan ödül görünür (ödül zaten verildi).
  private sandikPenceresi(odul: SandikOdulu): HTMLDivElement {
    const yazi =
      odul === 'bir-can' ? '+1 can' : odul === 'canlar-dolu' ? 'Canlar doldu' : `${SINIRSIZ_CAN_DK / 60} saat sınırsız can`;
    const simge = odul === 'sinirsiz' ? '∞' : odul === 'bir-can' ? '+1' : String(CAN_EN_COK);
    const ort = odulOrtusu('sandik', 'Sandık!');
    ort.dataset.odul = odul;
    const kutu = ort.firstElementChild as HTMLDivElement;
    const sahne = document.createElement('div');
    sahne.className = 'sandik-sahne';
    // Sandık "ışıklar içinde, hediye gibi" gelir ve açılır (Kemal, 5 Kasım gecesi: "açılmıyor,
    // duruyor"): düşerek gelir, sallanır, ışık patlamasıyla açık hâline geçer, ödül içinden
    // yükselir. Kapalı ve açık resim Canva ile çizildi; kaynak docs/lisanslar.md.
    const isik = document.createElement('div');
    isik.className = 'sandik-isik';
    const kapali = document.createElement('img');
    kapali.className = 'sandik sandik-kapali';
    kapali.src = SANDIK_RESMI;
    const acik = document.createElement('img');
    acik.className = 'sandik sandik-acik';
    acik.src = SANDIK_ACIK_RESMI;
    for (const r of [kapali, acik]) {
      r.alt = '';
      r.draggable = false;
    }
    const parlama = document.createElement('div');
    parlama.className = 'sandik-parlama';
    const parilti = document.createElement('div');
    parilti.className = 'sandik-parilti';
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('i');
      p.style.setProperty('--a', `${i * 36}deg`);
      parilti.appendChild(p);
    }
    sahne.append(isik, kapali, acik, parlama, parilti);
    const kalp = document.createElement('div');
    kalp.className = 'sandik-kalp';
    kalp.innerHTML = KALP_BUYUK_SVG;
    const sayi = document.createElement('span');
    sayi.textContent = simge;
    kalp.appendChild(sayi);
    sahne.appendChild(kalp);
    const ad = document.createElement('div');
    ad.className = 'odul-ad';
    ad.textContent = yazi;
    kutu.append(sahne, ad, odulTamam());
    return ort;
  }

  // "Can yok" penceresi: sonraki canın dolmasına kalan süre.
  private canYokGoster() {
    const ort = odulOrtusu('can-yok', 'Can yok');
    ort.classList.add('can-yok-ortu');
    const kutu = ort.firstElementChild as HTMLDivElement;
    const g = canGostergesi(false);
    g.classList.add('can-yok-gosterge');
    const not = document.createElement('div');
    not.className = 'odul-not';
    not.textContent = `Her ${CAN_DOLUM_DK_YAZI} dakikada 1 can dolar`;
    const tamam = odulTamam();
    tamam.addEventListener('click', () => ort.remove());
    kutu.append(g, not, tamam);
    this.kok.appendChild(ort);
    this.canCiz();
  }

  // Bütün can göstergelerini günceller (üst şerit, giriş, harita, "Can yok").
  private canCiz() {
    const d = canDurumu();
    const simdi = Date.now();
    const sinirsiz = d.sinirsizBitis > simdi;
    const kalan = sonrakiCanaKalan(simdi);
    for (const el of this.kok.querySelectorAll<HTMLElement>('.can-gosterge')) {
      const sayi = el.querySelector('.can-sayi');
      const sure = el.querySelector('.can-sure');
      if (sayi) sayi.textContent = sinirsiz ? '∞' : String(d.can);
      if (sure) sure.textContent = sinirsiz ? sureYazisi(d.sinirsizBitis - simdi) : kalan > 0 ? sureYazisi(kalan) : 'Dolu';
      el.dataset.can = String(d.can);
      el.classList.toggle('sinirsiz', sinirsiz);
      el.classList.toggle('bos', !sinirsiz && d.can === 0);
    }
  }

  // "Yeni ürün!" penceresi: arkasında dönen ışık, ortada ürün(ler), "Sonraki bölümde gelir".
  private yeniUrunPenceresi(idler: string[]): HTMLDivElement {
    const ort = odulOrtusu('yeni-urun', 'Yeni ürün!');
    ort.dataset.urunler = idler.join(',');
    const kutu = ort.firstElementChild as HTMLDivElement;
    const liste = document.createElement('div');
    liste.className = 'odul-liste';
    for (const id of idler) {
      const u = URUNLER.find((x) => x.id === id);
      if (!u) continue;
      const kalem = document.createElement('div');
      kalem.className = 'odul-urun';
      const isik = document.createElement('span');
      isik.className = 'odul-isik';
      const resim = document.createElement('img');
      resim.src = `gorseller/urunler/${u.id}.webp`;
      resim.alt = '';
      resim.draggable = false;
      const ad = document.createElement('span');
      ad.className = 'odul-ad';
      ad.textContent = u.ad;
      kalem.append(isik, resim, ad);
      liste.appendChild(kalem);
    }
    const not = document.createElement('div');
    not.className = 'odul-not';
    not.textContent = 'Sonraki bölümde gelir';
    kutu.append(liste, not, odulTamam());
    return ort;
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
    this.listeEl.className = 'liste harita-ekran desenli';
    this.listeEl.innerHTML = '';
    this.listeEl.appendChild(
      haritaCiz(this.kayit, yildizCiz, {
        bolumSec: (no) => this.bolumBaslat(no),
        geri: () => this.haritaGeri(),
        bittiYazisi: hepsiBitti(this.kayit) ? HEPSI_BITTI_YAZISI : null,
      }),
    );
    // Bölümler ekranının sağ üstünde can.
    const ust = this.listeEl.querySelector('.harita-ust');
    if (ust) {
      const g = canGostergesi(false);
      g.classList.add('harita-can');
      ust.appendChild(g);
      this.canCiz();
    }
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
    this.listeEl.className = 'liste harita-ekran desenli gizli';
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

// Pencerenin üst kenarına binen mor başlık şeridi (arayüz dili, 5 Kasım 2026).
function pencereBaslik(yazi: string): HTMLDivElement {
  const b = document.createElement('div');
  b.className = 'pencere-baslik';
  b.textContent = yazi;
  return b;
}

// Pencerenin sağ üst köşesinde kırmızı yuvarlak ✕ (Kemal, 5 Kasım: "Köşede ✕").
function kapatDugme(id: string, is: () => void): HTMLButtonElement {
  const d = document.createElement('button');
  d.className = 'kose-dugme yuvarlak kirmizi kapat-x';
  d.id = id;
  d.setAttribute('aria-label', 'Kapat');
  d.innerHTML = KAPAT_SVG;
  d.addEventListener('click', is);
  return d;
}

const CAN_DOLUM_DK_YAZI = String(CAN_DOLUM_DK);

// Ödül penceresinin örtüsü ve kutusu (başlık şeridiyle).
function odulOrtusu(id: string, baslik: string): HTMLDivElement {
  const ort = document.createElement('div');
  ort.className = 'odul-ortu';
  ort.id = id;
  const kutu = document.createElement('div');
  kutu.className = 'son-kutu pencere odul-kutu';
  kutu.appendChild(pencereBaslik(baslik));
  ort.appendChild(kutu);
  return ort;
}

function odulTamam(): HTMLButtonElement {
  const d = document.createElement('button');
  d.className = 'dugme yesil odul-tamam';
  d.textContent = 'Tamam';
  return d;
}

// Can göstergesi: kalbin içinde can sayısı; büyük olanında yanında sonraki canın süresi.
function canGostergesi(kucuk: boolean): HTMLDivElement {
  const g = document.createElement('div');
  g.className = 'can-gosterge' + (kucuk ? ' kucuk' : '');
  g.setAttribute('aria-label', 'Can');
  const kalp = document.createElement('span');
  kalp.className = 'can-kalp';
  kalp.innerHTML = KALP_BUYUK_SVG;
  const sayi = document.createElement('span');
  sayi.className = 'can-sayi';
  kalp.appendChild(sayi);
  g.appendChild(kalp);
  if (!kucuk) {
    const sure = document.createElement('span');
    sure.className = 'can-sure';
    g.appendChild(sure);
  }
  return g;
}

// Kalp (can) çizimi: ekibin basit şekli, çizgi film hattıyla. Sandık: Canva resmi.
const KALP_BUYUK_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.5C5.2 16 2 12.6 2 8.6 2 5.6 4.4 3.3 7.2 3.3c1.9 0 3.6 1 4.8 2.6 1.2-1.6 2.9-2.6 4.8-2.6 2.8 0 5.2 2.3 5.2 5.3 0 4-3.2 7.4-10 12.9Z" fill="#e0483f" stroke="#5a3a22" stroke-width="1.8" stroke-linejoin="round"/><path d="M6.2 6.6c.8-.9 2-1.2 3-.9" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="1.6" stroke-linecap="round"/></svg>';
const SANDIK_RESMI = 'gorseller/sandik.webp';
const SANDIK_ACIK_RESMI = 'gorseller/sandik-acik.webp';

// 0. bölümdeki ipucu eli (işaret parmağı aşağıyı gösterir; ekibin basit çizimi).
const EL_SVG =
  '<svg viewBox="0 0 48 56" aria-hidden="true"><path d="M20 4c3 0 5 2 5 5v17l2-1c2-1 5 0 6 2l1 1 2-1c2-1 5 0 6 2l1 2c2-1 4 0 5 2 1 4 0 10-2 14-3 6-8 9-14 9h-6c-5 0-8-3-11-7L6 34c-2-2-2-5 0-7 2-1 5-1 7 1l2 3V9c0-3 2-5 5-5Z" fill="#fff" stroke="#5a3a22" stroke-width="3" stroke-linejoin="round" transform="rotate(180 24 28)"/></svg>';
