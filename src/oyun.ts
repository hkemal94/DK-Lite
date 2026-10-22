// Oyunun kendisi: müşteriler (üstte), dönen bant (ortada), sütunlar (altta).
// Çizim yok; düz renkli daireler ve kutular.

import {
  AYNI_ANDA_MUSTERI,
  BANT_TUR_SANIYE,
  BASTA_MUSTERI,
  BOLUM_SAYISI,
  CESITLER,
  ERIME_BICIMLERI,
  ERIME_MS,
  ERIME_VARSAYILAN,
  GEC_TOP_PUAN_ORANI,
  GEC_TOP_SOLUKLUK,
  GEC_TOP_TURU,
  GONDERME_BICIMI,
  HIZ_KATI,
  MUSTERI_GELIS_ARALIGI_SN,
  SUTUNDA_GORUNEN_TOP,
  TOP_PUANI,
  TUTMA_MS,
  YILDIZ_ESIKLERI,
} from './ayarlar';
import { bolumKur, gidecekTopSayisi, type Bolum } from './bolum';
import { bolumKazanildi, hepsiBitti, kayitOku, type Kayit } from './kayit';
import { haritaCiz } from './harita';

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
  cesit: number;
  kalan: number;
  durum: 'bekliyor' | 'bitti';
  bittigiAn: number;
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

type Sonuc = 'kazandin' | 'doldu' | 'kalmadi';
// Haritada "Geri" nereye döner.
type HaritaDonus = 'giris' | 'duraklat' | 'yerinde';

// Giriş ekranında oyunun adı yerine duran yer tutucu. Ad Kemal'in.
const OYUN_ADI_YER_TUTUCU = '[Kemal]';

// Son bölüm de kazanılınca görünen basit durum yazısı (kurgu metni değil).
const HEPSI_BITTI_YAZISI = 'Bütün bölümler bitti';

// Bölüm sonunda görünen basit durum yazısı (kurgu metni değil).
const SONUC_YAZISI: Record<Sonuc, string> = {
  kazandin: 'Bölüm tamamlandı',
  doldu: 'Bant doldu',
  kalmadi: 'Top kalmadı',
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
  // Boş müşteri yerine yenisinin geleceği an (dolu yerde kullanılmaz).
  private gelisAnlari: number[] = [];
  // Seçili erime biçiminin sırası; bölüm değişince de kalır.
  private erimeSirasi = ERIME_VARSAYILAN;
  private siradaki = 0;
  private karsilanan = 0; // işi biten müşteri sayısı
  private puan = 0;
  private yuvalar: (Top | null)[] = [];
  private toplar: Top[] = [];
  private kayma = 0; // bandın dönüşü (çevre boyunca)
  private sonAn = 0;
  private bitti: Sonuc | null = null;
  private y!: Yerlesim;
  private tutmaZamanlayici: number | null = null;

  constructor(kok: HTMLElement) {
    this.kok = kok;
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

    this.bantEl = document.createElement('div');
    this.bantEl.className = 'bant';
    this.sahne.appendChild(this.bantEl);

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
      this.erimeSirasi = (this.erimeSirasi + 1) % ERIME_BICIMLERI.length;
      this.erimeYazisi();
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
    const ad = document.createElement('div');
    ad.className = 'giris-ad';
    ad.textContent = OYUN_ADI_YER_TUTUCU;
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
    this.kok.appendChild(this.girisEl);
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
    return this.bolum.musteriler.reduce((a, m) => a + m.adet, 0) * TOP_PUANI;
  }

  // Kazanınca yıldız sayısı (deneme ölçüsü; Kemal karar verecek).
  private yildizSayisi(): number {
    const oran = this.puan / Math.max(1, this.enYuksekPuan());
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
    return { cesit: m.cesit, kalan: m.adet, durum: 'bekliyor', bittigiAn: 0 };
  }

  private erimeTuru(): number {
    return ERIME_BICIMLERI[this.erimeSirasi].tur;
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

    const ustAlt = this.ustEl.offsetHeight;
    const kartG = Math.min(110, (g - 24) / AYNI_ANDA_MUSTERI - 8);
    const dar = kartG < 72;
    const istekBoy = Math.max(20, Math.min(34, Math.floor(kartG - 46)));
    // Kart: istek balonu (top + iç boşluk) + aralık + kişi kutusu (44).
    const kartYuk = istekBoy + (dar ? 8 : 12) + 6 + 44;
    const kartUst = ustAlt + 6;
    const kartAlt = kartUst + kartYuk;

    const bantY = Math.max(h * 0.25, kartAlt + 12 + kalinlik / 2);
    // Sütunlara en az bu kadar yer kalsın: görünen toplar için 36 px'lik yer.
    const sutunEnAz = SUTUNDA_GORUNEN_TOP * 36 + 20;
    const bantY2 = Math.max(
      40,
      Math.min(h * 0.24, bantG * 0.62, h - 16 - sutunEnAz - 24 - kalinlik / 2 - bantY),
    );
    const r = bantY2 / 2;
    const duz = bantG - bantY2;
    const cevre = 2 * duz + 2 * Math.PI * r;

    // Müşteriler bandın üstünde, ekran genişliğince eşit aralıkla
    // (dört kart dar ekranda da birbirine binmesin diye bandın değil ekranın eni).
    const musteriNoktalari: Nokta[] = [];
    const musteriYolu: number[] = [];
    for (let i = 0; i < AYNI_ANDA_MUSTERI; i++) {
      const x = 12 + ((g - 24) * (i + 0.5)) / AYNI_ANDA_MUSTERI;
      musteriNoktalari.push({ x, y: kartUst + istekBoy / 2 + 4 });
      musteriYolu.push(this.enYakinYol({ x, y: bantY - 40 }, bantX, bantY, bantG, bantY2));
    }

    const sutunlarUst = bantY + bantY2 + kalinlik / 2 + 24;
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
  private yoldakiNokta(s: number, bx = this.y.bantX, by = this.y.bantY, bg = this.y.bantG, bh = this.y.bantY2): Nokta {
    const r = bh / 2;
    const duz = bg - bh;
    const yay = Math.PI * r;
    const cevre = 2 * duz + 2 * yay;
    s = ((s % cevre) + cevre) % cevre;
    if (s < duz) return { x: bx + r + s, y: by };
    s -= duz;
    if (s < yay) {
      const a = -Math.PI / 2 + s / r;
      return { x: bx + r + duz + r * Math.cos(a), y: by + r + r * Math.sin(a) };
    }
    s -= yay;
    if (s < duz) return { x: bx + r + duz - s, y: by + bh };
    s -= duz;
    const a = Math.PI / 2 + s / r;
    return { x: bx + r + r * Math.cos(a), y: by + r + r * Math.sin(a) };
  }

  private enYakinYol(p: Nokta, bx: number, by: number, bg: number, bh: number): number {
    const r = bh / 2;
    const cevre = 2 * (bg - bh) + 2 * Math.PI * r;
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
    const c = CESITLER[cesit];
    el.style.background = c.renk;
    el.style.color = c.yazi;
    el.style.width = el.style.height = `${boy}px`;
    el.style.fontSize = `${Math.round(boy * 0.45)}px`;
    el.textContent = c.harf;
    el.dataset.cesit = String(cesit);
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
    b.borderRadius = `${(y.bantY2 + y.bantKalinlik) / 2}px`;

    for (const el of this.yuvaEller) {
      el.style.width = el.style.height = `${y.topBoyu}px`;
    }
    for (const t of this.toplar) {
      t.el.style.width = t.el.style.height = `${y.topBoyu}px`;
      t.el.style.fontSize = `${Math.round(y.topBoyu * 0.45)}px`;
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
      if (!m) {
        el.className = 'musteri bos' + dar;
        delete el.dataset.cesit;
        delete el.dataset.kalan;
        return;
      }
      el.className = 'musteri' + dar + (m.durum === 'bitti' ? ' bitti' : '');
      el.dataset.cesit = String(m.cesit);
      el.dataset.kalan = String(m.kalan);
      const istek = document.createElement('div');
      istek.className = 'istek';
      istek.appendChild(this.topElKur(m.cesit, istekBoy));
      const adet = document.createElement('span');
      adet.className = 'adet';
      adet.textContent = m.durum === 'bitti' ? '✓' : `×${m.kalan}`;
      istek.appendChild(adet);
      const kisi = document.createElement('div');
      kisi.className = 'kisi';
      el.append(istek, kisi);
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
    for (let k = 0; k < giden; k++) {
      const cesit = sutun.pop()!;
      const nereden = this.sutunTopNoktasi(sutunNo, k); // sütundaki yerinden kalkar
      const el = this.topElKur(cesit, this.y.topBoyu);
      el.classList.add('bantta');
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
          if (!my || my.durum !== 'bekliyor' || my.cesit !== t.cesit || my.kalan <= 0) continue;
          const fark = (((y.musteriYolu[m] - sOnce) % y.cevre) + y.cevre) % y.cevre;
          if (fark < adim) {
            my.kalan--;
            // Puan: tam puan; erime açıkken bantta 1 turdan uzun kaldıysa yarısı (Kemal, 22 Ekim).
            // "Erime yok"ta her top tam puan.
            const yarim = erimeTuru > 0 && t.tur >= GEC_TOP_TURU;
            this.puan += yarim ? TOP_PUANI * GEC_TOP_PUAN_ORANI : TOP_PUANI;
            if (my.kalan === 0) {
              my.durum = 'bitti';
              my.bittigiAn = an;
              this.karsilanan++;
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

    // İşi biten müşteri gider; yeri boş kalır, yenisi rastgele bir bekleyişten sonra gelir.
    for (let m = 0; m < this.musteriYerleri.length; m++) {
      const my = this.musteriYerleri[m];
      if (my && my.durum === 'bitti' && an - my.bittigiAn >= GIDIS_MS) {
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
    const eldeki: number[] = new Array(CESITLER.length).fill(0);
    for (const s of this.sutunlar) for (const c of s) eldeki[c]++;
    for (let i = this.sakliSira; i < this.bolum.sakli.length; i++) eldeki[this.bolum.sakli[i]]++;
    for (const t of this.toplar) if (t.durum === 'ucuyor' || t.durum === 'bantta') eldeki[t.cesit]++;
    const istek: number[] = new Array(CESITLER.length).fill(0);
    for (const m of this.musteriYerleri) if (m && m.durum === 'bekliyor') istek[m.cesit] += m.kalan;
    for (let i = this.siradaki; i < this.bolum.musteriler.length; i++) {
      const m = this.bolum.musteriler[i];
      istek[m.cesit] += m.adet;
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
    if (this.musteriYerleri.some((m) => m && m.durum === 'bitti')) return;
    // Boş bir müşteri yerine yenisi gelecekse beklenir (o, bantta olanı isteyebilir).
    if (this.musteriYerleri.some((m) => !m) && this.siradaki < this.bolum.musteriler.length) return;
    const istenen = new Set(
      this.musteriYerleri.filter((m): m is MusteriYeri => !!m).map((m) => m.cesit),
    );
    if (this.yuvalar.some((t) => t && istenen.has(t.cesit))) return;
    this.bitir('doldu');
  }

  private bitir(sonuc: Sonuc) {
    this.bitti = sonuc;
    this.sayaclariCiz();
    this.sonEl.className = 'son';
    this.sonEl.dataset.sonuc = sonuc;
    this.sonEl.innerHTML = '';
    const kutu = document.createElement('div');
    kutu.className = 'son-kutu';
    const baslik = document.createElement('div');
    baslik.className = 'son-baslik';
    baslik.textContent = SONUC_YAZISI[sonuc];
    kutu.appendChild(baslik);

    const dugme = (yazi: string, sinif: string, is: () => void) => {
      const d = document.createElement('button');
      d.className = 'dugme ' + sinif;
      d.textContent = yazi;
      d.addEventListener('click', is);
      return d;
    };
    const dugmeler = document.createElement('div');
    dugmeler.className = 'son-dugmeler';
    const no = this.bolum.no;
    if (sonuc === 'kazandin') {
      // Yıldızlar (0–3) ve puan. Kaybedince ikisi de yok.
      const yildiz = this.yildizSayisi();
      // Kayıt: en iyi yıldız saklanır, sonraki bölüm açılır.
      this.kayit = bolumKazanildi(this.kayit, no, yildiz);
      const yildizlar = document.createElement('div');
      yildizlar.className = 'yildizlar';
      yildizlar.dataset.yildiz = String(yildiz);
      for (let k = 0; k < YILDIZ_ESIKLERI.length; k++) {
        yildizlar.appendChild(yildizCiz(k < yildiz));
      }
      const puan = document.createElement('div');
      puan.className = 'son-puan';
      puan.dataset.puan = String(this.puan);
      puan.dataset.enYuksek = String(this.enYuksekPuan());
      puan.textContent = `Puan ${Math.round(this.puan * 10) / 10}`;
      kutu.append(yildizlar, puan);
      const sonBolum = no >= BOLUM_SAYISI;
      if (sonBolum) {
        const durum = document.createElement('div');
        durum.className = 'son-durum';
        durum.textContent = HEPSI_BITTI_YAZISI;
        kutu.appendChild(durum);
      }
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
