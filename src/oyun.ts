// Oyunun kendisi: müşteriler (üstte), dönen bant (ortada), sütunlar (altta).
// Çizim yok; düz renkli daireler ve kutular.

import {
  AYNI_ANDA_MUSTERI,
  BANT_TUR_SANIYE,
  BANT_YERI,
  CESITLER,
  GONDERME_BICIMI,
  TUTMA_MS,
} from './ayarlar';
import { bolumKur, ustObekBoyu, type Bolum } from './bolum';

const UCUS_MS = 220; // sütundan banda uçuş
const ALIS_MS = 320; // banttan müşteriye uçuş
const GIDIS_MS = 600; // işi biten müşterinin yerine yenisinin gelmesi

interface Nokta {
  x: number;
  y: number;
}

interface Top {
  el: HTMLDivElement;
  cesit: number;
  durum: 'ucuyor' | 'bantta' | 'aliniyor';
  yuva: number; // banttaki yeri
  baslangic: number; // uçuşun başladığı an
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
}

export class Oyun {
  private kok: HTMLElement;
  private sahne!: HTMLDivElement;
  private bantEl!: HTMLDivElement;
  private yuvaEller: HTMLDivElement[] = [];
  private musteriEller: HTMLDivElement[] = [];
  private sutunEller: HTMLDivElement[] = [];
  private siraEl!: HTMLDivElement;
  private sonEl!: HTMLDivElement;

  private bolum!: Bolum;
  private sutunlar: number[][] = [];
  private musteriYerleri: (MusteriYeri | null)[] = [];
  private siradaki = 0;
  private yuvalar: (Top | null)[] = [];
  private toplar: Top[] = [];
  private kayma = 0; // bandın dönüşü (çevre boyunca)
  private sonAn = 0;
  private bitti: 'kazandin' | 'doldu' | null = null;
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

    this.siraEl = document.createElement('div');
    this.siraEl.className = 'sira';
    this.sahne.appendChild(this.siraEl);

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

    this.sonEl = document.createElement('div');
    this.sonEl.className = 'son gizli';
    this.sonEl.id = 'son';
    this.kok.appendChild(this.sonEl);
  }

  yenidenBasla() {
    this.bolum = bolumKur();
    this.sutunlar = this.bolum.sutunlar.map((s) => s.slice());
    this.siradaki = 0;
    this.musteriYerleri = [];
    for (let i = 0; i < AYNI_ANDA_MUSTERI; i++) this.musteriYerleri.push(this.siradakiMusteri());
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
  }

  private siradakiMusteri(): MusteriYeri | null {
    if (this.siradaki >= this.bolum.musteriler.length) return null;
    const m = this.bolum.musteriler[this.siradaki++];
    return { cesit: m.cesit, kalan: m.adet, durum: 'bekliyor', bittigiAn: 0 };
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

  private yerlesimHesapla() {
    const g = this.sahne.clientWidth;
    const h = this.sahne.clientHeight;
    const kalinlik = Math.round(Math.min(48, g * 0.12));
    const bantX = 18 + kalinlik / 2;
    const bantG = g - 2 * bantX;
    const bantY = h * 0.25;
    const bantY2 = Math.min(h * 0.24, bantG * 0.62);
    const r = bantY2 / 2;
    const duz = bantG - bantY2;
    const cevre = 2 * duz + 2 * Math.PI * r;

    // Müşteriler bandın üstünde, eşit aralıkla.
    const musteriNoktalari: Nokta[] = [];
    const musteriYolu: number[] = [];
    for (let i = 0; i < AYNI_ANDA_MUSTERI; i++) {
      const x = bantX + (bantG * (i + 0.5)) / AYNI_ANDA_MUSTERI;
      musteriNoktalari.push({ x, y: h * 0.12 });
      musteriYolu.push(this.enYakinYol({ x, y: bantY - 40 }, bantX, bantY, bantG, bantY2));
    }

    const sutunlarUst = bantY + bantY2 + kalinlik / 2 + 24;
    const sutunlarAlt = h - 16;
    const sutunGenislik = (g - 24) / this.sutunlar.length;
    const enUzun = Math.max(1, ...this.bolum.sutunlar.map((s) => s.length));
    const sutunTopBoyu = Math.min(
      sutunGenislik * 0.7,
      54,
      (sutunlarAlt - sutunlarUst - 12) / enUzun,
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

  private sutunTopNoktasi(sutun: number, sira: number): Nokta {
    const { sutunGenislik, sutunlarAlt, sutunTopBoyu } = this.y;
    return {
      x: 12 + sutunGenislik * (sutun + 0.5),
      y: sutunlarAlt - 8 - sutunTopBoyu * (sira + 0.5),
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
    const kartG = Math.min(110, (y.genislik - 24) / AYNI_ANDA_MUSTERI - 10);
    this.musteriYerleri.forEach((m, i) => {
      const el = this.musteriEller[i];
      const p = y.musteriNoktalari[i];
      el.style.left = `${p.x - kartG / 2}px`;
      el.style.top = `${p.y - 55}px`;
      el.style.width = `${kartG}px`;
      el.innerHTML = '';
      if (!m) {
        el.className = 'musteri bos';
        delete el.dataset.cesit;
        delete el.dataset.kalan;
        return;
      }
      el.className = 'musteri' + (m.durum === 'bitti' ? ' bitti' : '');
      el.dataset.cesit = String(m.cesit);
      el.dataset.kalan = String(m.kalan);
      const istek = document.createElement('div');
      istek.className = 'istek';
      istek.appendChild(this.topElKur(m.cesit, 34));
      const adet = document.createElement('span');
      adet.className = 'adet';
      adet.textContent = m.durum === 'bitti' ? '✓' : `×${m.kalan}`;
      istek.appendChild(adet);
      const kisi = document.createElement('div');
      kisi.className = 'kisi';
      el.append(istek, kisi);
    });
    const sirada = this.bolum.musteriler.length - this.siradaki;
    this.siraEl.textContent = sirada > 0 ? `Sırada ${sirada}` : '';
  }

  private sutunlariCiz() {
    const y = this.y;
    this.sutunlar.forEach((sutun, i) => {
      const el = this.sutunEller[i];
      el.style.left = `${12 + y.sutunGenislik * i + 4}px`;
      el.style.top = `${y.sutunlarUst}px`;
      el.style.width = `${y.sutunGenislik - 8}px`;
      el.style.height = `${y.sutunlarAlt - y.sutunlarUst}px`;
      el.innerHTML = '';
      const ustBoy = ustObekBoyu(sutun);
      sutun.forEach((cesit, sira) => {
        const t = this.topElKur(cesit, y.sutunTopBoyu - 4);
        const p = this.sutunTopNoktasi(i, sira);
        t.style.left = `${p.x - (12 + y.sutunGenislik * i + 4) - (y.sutunTopBoyu - 4) / 2}px`;
        t.style.top = `${p.y - y.sutunlarUst - (y.sutunTopBoyu - 4) / 2}px`;
        if (sira >= sutun.length - ustBoy) t.classList.add('ustte');
        el.appendChild(t);
      });
    });
  }

  // ---------- oynanış ----------

  private gonder(sutunNo: number) {
    if (this.bitti) return;
    const sutun = this.sutunlar[sutunNo];
    const obek = ustObekBoyu(sutun);
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
      const sira = sutun.length - 1;
      const cesit = sutun.pop()!;
      const nereden = this.sutunTopNoktasi(sutunNo, sira); // sütundaki yerinden kalkar
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
      };
      this.yuvalar[top.yuva] = top;
      this.toplar.push(top);
    }
    this.sutunlariCiz();
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
            if (my.kalan === 0) {
              my.durum = 'bitti';
              my.bittigiAn = an;
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

    // Alınan toplar müşteriye varınca kaybolur.
    this.toplar = this.toplar.filter((t) => {
      if (t.durum === 'aliniyor' && an - t.baslangic >= ALIS_MS) {
        t.el.remove();
        return false;
      }
      return true;
    });

    // İşi biten müşterinin yerine sıradaki gelir.
    for (let m = 0; m < this.musteriYerleri.length; m++) {
      const my = this.musteriYerleri[m];
      if (my && my.durum === 'bitti' && an - my.bittigiAn >= GIDIS_MS) {
        this.musteriYerleri[m] = this.siradakiMusteri();
        musteriDegisti = true;
      }
    }
    if (musteriDegisti) this.musterileriCiz();

    this.sonucBak();
  }

  private sonucBak() {
    const herkesGitti = this.musteriYerleri.every((m) => m === null) &&
      this.siradaki >= this.bolum.musteriler.length;
    if (herkesGitti && this.toplar.length === 0) {
      this.bitir('kazandin');
      return;
    }

    // Bant doldu: bütün yerler dolu, hareket yok ve bantta olanı kimse istemiyor.
    const dolu = this.yuvalar.every((t) => t !== null);
    if (!dolu) return;
    if (this.toplar.some((t) => t.durum !== 'bantta')) return;
    if (this.musteriYerleri.some((m) => m && m.durum === 'bitti')) return;
    const istenen = new Set(
      this.musteriYerleri.filter((m): m is MusteriYeri => !!m).map((m) => m.cesit),
    );
    if (this.yuvalar.some((t) => t && istenen.has(t.cesit))) return;
    this.bitir('doldu');
  }

  private bitir(sonuc: 'kazandin' | 'doldu') {
    this.bitti = sonuc;
    this.sonEl.className = 'son';
    this.sonEl.dataset.sonuc = sonuc;
    this.sonEl.innerHTML = '';
    const kutu = document.createElement('div');
    kutu.className = 'son-kutu';
    const baslik = document.createElement('div');
    baslik.className = 'son-baslik';
    baslik.textContent = sonuc === 'kazandin' ? 'Kazandın' : 'Bant doldu';
    const dugme = document.createElement('button');
    dugme.className = 'dugme';
    dugme.textContent = 'Baştan';
    dugme.addEventListener('click', () => this.yenidenBasla());
    kutu.append(baslik, dugme);
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
