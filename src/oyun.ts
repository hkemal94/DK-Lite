// Oyunun kendisi: müşteriler (üstte), dönen bant (ortada), sütunlar (altta).
// Çizim yok; düz renkli daireler ve kutular.

import {
  AYNI_ANDA_MUSTERI,
  BANT_TUR_SANIYE,
  BANT_YERI,
  BASTA_MUSTERI,
  CESITLER,
  ERIME_BICIMLERI,
  ERIME_MS,
  ERIME_VARSAYILAN,
  GEC_TOP_PUAN_ORANI,
  GEC_TOP_SOLUKLUK,
  GEC_TOP_TURU,
  GONDERME_BICIMI,
  MUSTERI_GELIS_ARALIGI_SN,
  SUTUNDA_GORUNEN_TOP,
  TOP_PUANI,
  TUTMA_MS,
  YILDIZ_ESIKLERI,
} from './ayarlar';
import { bolumKur, gidecekTopSayisi, type Bolum } from './bolum';

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

  private bolum!: Bolum;
  private sutunlar: number[][] = [];
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
    this.yenidenBasla();
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

    for (let i = 0; i < BANT_YERI; i++) {
      const y = document.createElement('div');
      y.className = 'yuva';
      this.sahne.appendChild(y);
      this.yuvaEller.push(y);
    }

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
    this.ustEl.append(this.erimeEl, sayaclar);
    this.erimeYazisi();

    this.sonEl = document.createElement('div');
    this.sonEl.className = 'son gizli';
    this.sonEl.id = 'son';
    this.kok.appendChild(this.sonEl);
  }

  // Yeni bölüm kurar. `ayniBolum` verilirse aynı dizilim baştan oynanır (Tekrar oyna).
  yenidenBasla(ayniBolum?: Bolum) {
    this.bolum = ayniBolum ?? bolumKur();
    this.sutunlar = this.bolum.sutunlar.map((s) => s.slice());
    this.siradaki = 0;
    this.karsilanan = 0;
    this.puan = 0;
    // Bölüm birkaç müşteriyle başlar (rastgele yerlerde); ötekiler teker teker gelir.
    const an = performance.now();
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
    this.yuvalar = new Array(BANT_YERI).fill(null);
    this.bitti = null;
    this.sonEl.className = 'son gizli';
    this.sonEl.innerHTML = '';

    for (const el of this.sutunEller) el.remove();
    this.sutunEller = this.sutunlar.map((_, i) => this.sutunElKur(i));

    this.yerlesimHesapla();
    this.sabitleriCiz();
    this.sayaclariCiz();
  }

  // Bölümün en yüksek olası puanı: her istenen top tam puanla alınırsa.
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
    this.doluEl.style.width = `${(100 * dolu) / BANT_YERI}%`;
    this.doluKutuEl.dataset.dolu = String(dolu);
    this.doluKutuEl.dataset.yer = String(BANT_YERI);
    this.doluKutuEl.classList.toggle('dolu', dolu >= BANT_YERI);
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
      topBoyu: Math.min(kalinlik - 8, (cevre / BANT_YERI) * 0.8),
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

  // Her sütunda yalnız üstten SUTUNDA_GORUNEN_TOP kadar top çizilir; kalanı gizli.
  // kayanSutun: o sütundan az önce `giden` kadar top gitti; kalanlar yukarı kayar,
  // gizliden görünür olan alttan belirerek gelir.
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
    if (this.bitti) return;
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
    const aralik = this.y.cevre / BANT_YERI;
    const uzaklik = (i: number) => {
      const s = (((this.kayma + i * aralik - giris) % this.y.cevre) + this.y.cevre) % this.y.cevre;
      return Math.min(s, this.y.cevre - s);
    };
    bosYuvalar.sort((a, b) => uzaklik(a) - uzaklik(b));

    const an = performance.now();
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
    this.sutunlariCiz(sutunNo, giden, obek);
    this.sayaclariCiz();
  }

  private kare(an: number) {
    const dt = this.sonAn ? Math.min(0.05, (an - this.sonAn) / 1000) : 0;
    this.sonAn = an;
    this.ilerlet(dt, an);
    this.topCiz(an);
    requestAnimationFrame((a) => this.kare(a));
  }

  private ilerlet(dt: number, an: number) {
    if (this.bitti) return;
    const y = this.y;
    const aralik = y.cevre / BANT_YERI;
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
      } else if (!t.gec && t.tur >= GEC_TOP_TURU) {
        // 1 turu geçti: artık yarım puanlı; hafif solup biraz erimiş görünür.
        t.gec = true;
        t.el.classList.add('gec');
        t.el.style.opacity = String(GEC_TOP_SOLUKLUK);
      }
    }

    // İstediği çeşit önünden geçen müşteri onu alır.
    if (adim > 0) {
      for (let i = 0; i < BANT_YERI; i++) {
        const t = this.yuvalar[i];
        if (!t || t.durum !== 'bantta') continue;
        const sOnce = once + i * aralik;
        for (let m = 0; m < this.musteriYerleri.length; m++) {
          const my = this.musteriYerleri[m];
          if (!my || my.durum !== 'bekliyor' || my.cesit !== t.cesit || my.kalan <= 0) continue;
          const fark = (((y.musteriYolu[m] - sOnce) % y.cevre) + y.cevre) % y.cevre;
          if (fark < adim) {
            my.kalan--;
            // Puan: tam puan; bantta 1 turdan uzun kaldıysa yarısı (Kemal, 22 Ekim).
            this.puan += t.tur >= GEC_TOP_TURU ? TOP_PUANI * GEC_TOP_PUAN_ORANI : TOP_PUANI;
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

  // Sütunda ve bantta kalan toplar kalan istekleri karşılayabiliyor mu?
  private toplarYetiyorMu(): boolean {
    const eldeki: number[] = new Array(CESITLER.length).fill(0);
    for (const s of this.sutunlar) for (const c of s) eldeki[c]++;
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
    const ayni = this.bolum;
    if (sonuc === 'kazandin') {
      // Yıldızlar (0–3) ve puan. Kaybedince ikisi de yok.
      const yildiz = this.yildizSayisi();
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
      dugmeler.append(
        dugme('Tekrar oyna', 'tekrar', () => this.yenidenBasla(ayni)),
        // Numaralı bölümler 4. pakette; şimdilik yeni rastgele bir bölüm.
        dugme('Devam et', 'devam', () => this.yenidenBasla()),
      );
    } else {
      dugmeler.append(dugme('Tekrar oyna', 'tekrar', () => this.yenidenBasla(ayni)));
    }
    kutu.appendChild(dugmeler);
    this.sonEl.appendChild(kutu);
  }

  private topCiz(an: number) {
    const y = this.y;
    const aralik = y.cevre / BANT_YERI;
    for (let i = 0; i < BANT_YERI; i++) {
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
