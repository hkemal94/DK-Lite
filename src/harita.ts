// Bölüm seçme ekranı: sahil yolu (Kemal, 30 Ekim: "Sahil yolu çizimi";
// bölüm sayısı için "Uzayabilir yol"). Ada haritasının (5. paket) yerine geldi.
// Arkada çizilmiş sahil manzarası (deniz solda, zeytinlik ve evler sağda);
// üstünde aşağıdan yukarı kıvrılan bir yol ve numaralı bölüm noktaları.
// 1. bölüm en altta, dükkânın önünde; yol yukarı kaydırıldıkça uzar. Bölüm
// sayısı artınca yalnız BOLUM_SAYISI değişir, yol kendiliğinden uzar.

import { BOLUM_SAYISI, YILDIZ_ESIKLERI } from './ayarlar';
import type { Kayit } from './kayit';

const NS = 'http://www.w3.org/2000/svg';

// Yolun mantıksal genişliği ve iki bölüm noktası arasındaki dikey aralık
// (ekranın enine göre ölçeklenir; birim yalnız yerleşim için).
const GENISLIK = 400;
const ADIM = 120;
const UST_BOSLUK = 110; // son noktanın üstünde kalan yol
const ALT_BOSLUK = 120; // ilk noktanın altında dükkân yazısına yer
// Arka plan resminin en/boy oranı (public/gorseller/sahil-yolu.webp: Canva'daki
// 896x1776'lık manzara (altta) ve üstünde onun aynadaki hâli; böylece alt alta tekrar
// ederken dikiş görünmez).
const ARKA_PLAN_ORAN = 896 / (1776 * 2);
const ARKA_PLAN_RESMI = 'gorseller/sahil-yolu.webp';
// Resim yokken görünen yedek zemin: solda deniz, ortada kum, sağda çimen.
const YEDEK_ZEMIN = 'linear-gradient(90deg, #7cc4e4 0%, #9fd4e6 22%, #f3e2b8 34%, #b9dc8c 46%, #8fcf8a 100%)';

// Oyun açılırken harita resmi önceden indirilir; "Bölümler"e basıldığında hazır olsun.
export function haritaResminiOnYukle(): void {
  const r = new Image();
  r.src = ARKA_PLAN_RESMI;
}

function svgOge<K extends keyof SVGElementTagNameMap>(ad: K, nitelik: Record<string, string | number>) {
  const o = document.createElementNS(NS, ad);
  for (const [k, v] of Object.entries(nitelik)) o.setAttribute(k, String(v));
  return o;
}

// Bölüm noktalarının yeri: aşağıdan yukarı, sağa sola yumuşak kıvrılarak.
// Deniz solda olduğu için yol ortanın biraz sağında salınır.
function noktalar(adet: number, yukseklik: number): [number, number][] {
  const n: [number, number][] = [];
  for (let k = 0; k < adet; k++) {
    const x = GENISLIK * (0.56 + 0.2 * Math.sin(k * 1.15));
    const y = yukseklik - ALT_BOSLUK - k * ADIM;
    n.push([x, y]);
  }
  return n;
}

// Noktalardan geçen yumuşak yol (her iki nokta arası dikey teğetli bir eğri).
function yolYazisi(n: [number, number][], uzat: boolean): string {
  if (n.length === 0) return '';
  const p = n.slice();
  if (uzat) {
    // Yolun başı dükkânın önünden, sonu ekranın üstüne doğru biraz uzar.
    p.unshift([p[0][0], p[0][1] + ALT_BOSLUK * 0.6]);
    const son = p[p.length - 1];
    p.push([GENISLIK * 0.5, son[1] - UST_BOSLUK * 0.9]);
  }
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const orta = (y0 + y1) / 2;
    d += ` C${x0} ${orta} ${x1} ${orta} ${x1} ${y1}`;
  }
  return d;
}

export interface HaritaSecenekleri {
  bolumSec: (no: number) => void;
  geri: () => void;
  bittiYazisi: string | null; // bütün bölümler bittiyse gösterilen yazı
}

export function haritaCiz(
  kayit: Kayit,
  yildizCiz: (dolu: boolean) => SVGSVGElement,
  s: HaritaSecenekleri,
): HTMLDivElement {
  const kutu = document.createElement('div');
  kutu.className = 'harita-kutu sahil';

  // Üstte: geri düğmesi ve başlık (kaydırınca yerinde kalır).
  const ust = document.createElement('div');
  ust.className = 'harita-ust';
  const geri = document.createElement('button');
  geri.className = 'harita-geri';
  geri.id = 'harita-geri';
  geri.setAttribute('aria-label', 'Geri');
  const ok = svgOge('svg', { viewBox: '0 0 24 24', class: 'geri-ok' });
  ok.appendChild(svgOge('path', { d: 'M15 5 L8 12 L15 19' }));
  geri.append(ok, document.createTextNode('Geri'));
  geri.addEventListener('click', s.geri);
  const baslik = document.createElement('div');
  baslik.className = 'liste-baslik';
  baslik.textContent = 'Bölümler';
  ust.append(geri, baslik);
  kutu.appendChild(ust);

  if (s.bittiYazisi) {
    const durum = document.createElement('div');
    durum.className = 'liste-durum';
    durum.id = 'hepsi-bitti';
    durum.textContent = s.bittiYazisi;
    kutu.appendChild(durum);
  }

  // Kaydırılan alan: yol aşağıdan yukarı; uzunluğu bölüm sayısına göre.
  const kaydir = document.createElement('div');
  kaydir.className = 'sahil-kaydir';
  const yukseklik = ALT_BOSLUK + (BOLUM_SAYISI - 1) * ADIM + UST_BOSLUK;
  const alan = document.createElement('div');
  alan.className = 'sahil-alan';
  alan.style.aspectRatio = `${GENISLIK} / ${yukseklik}`;
  // Manzara resmi alt alta tekrar eder; enine sığar. Altında denizden kuma ve
  // çimene yumuşak bir geçiş var: resim geç gelirse (yavaş bağlantı) ya da hiç
  // gelmezse düz mavi yerine o görünür (29 Ekim 2026, "mavi düz ekran" önlemi).
  alan.style.backgroundImage = `url('${ARKA_PLAN_RESMI}'), ${YEDEK_ZEMIN}`;
  alan.style.backgroundSize = `100% ${((GENISLIK / ARKA_PLAN_ORAN) / yukseklik) * 100}%, 100% 100%`;
  alan.style.backgroundRepeat = 'repeat-y, no-repeat';
  alan.style.backgroundPosition = 'center bottom, center';

  const n = noktalar(BOLUM_SAYISI, yukseklik);
  const svg = svgOge('svg', { viewBox: `0 0 ${GENISLIK} ${yukseklik}`, class: 'sahil-svg', 'aria-hidden': 'true' });
  // Yol: koyu kenar, açık kum rengi yol, ortada kesik çizgi; açılan bölüme kadarki kısmı sarı.
  const tumYol = yolYazisi(n, true);
  svg.appendChild(svgOge('path', { d: tumYol, class: 'sahil-yol-kenar' }));
  svg.appendChild(svgOge('path', { d: tumYol, class: 'sahil-yol' }));
  svg.appendChild(svgOge('path', { d: tumYol, class: 'sahil-yol-cizgi' }));
  const acik = Math.min(kayit.acik, BOLUM_SAYISI);
  if (acik > 1) svg.appendChild(svgOge('path', { d: yolYazisi(n.slice(0, acik), false), class: 'sahil-yol-gecilen' }));
  alan.appendChild(svg);

  // Yolun başında dükkânın adı (künyedeki gibi).
  const dukkan = document.createElement('div');
  dukkan.className = 'sahil-dukkan';
  dukkan.textContent = 'Dondurmacı Kızlar';
  dukkan.style.left = `${(n[0][0] / GENISLIK) * 100}%`;
  dukkan.style.top = `${((n[0][1] + 56) / yukseklik) * 100}%`;
  alan.appendChild(dukkan);

  // Bölüm noktaları: dokunulabilir düğmeler.
  let simdiki: HTMLButtonElement | null = null;
  for (let no = 1; no <= BOLUM_SAYISI; no++) {
    const [x, y] = n[no - 1];
    const kilitli = no > kayit.acik;
    const yildiz = kayit.yildizlar[no - 1] ?? 0;
    const siradaki = !kilitli && yildiz === 0;
    const d = document.createElement('button');
    d.className = 'harita-nokta' + (kilitli ? ' kilitli' : siradaki ? ' siradaki' : ' gecildi');
    d.dataset.no = String(no);
    d.dataset.yildiz = String(yildiz);
    d.style.left = `${(x / GENISLIK) * 100}%`;
    d.style.top = `${(y / yukseklik) * 100}%`;
    d.setAttribute('aria-label', `Bölüm ${no}` + (kilitli ? ', kilitli' : ''));
    if (kilitli) d.setAttribute('aria-disabled', 'true');
    const sayi = document.createElement('span');
    sayi.className = 'harita-sayi';
    sayi.textContent = String(no);
    d.appendChild(sayi);
    if (!kilitli) {
      const yildizlar = document.createElement('span');
      yildizlar.className = 'kucuk-yildizlar harita-yildizlar';
      for (let k = 0; k < YILDIZ_ESIKLERI.length; k++) yildizlar.appendChild(yildizCiz(k < yildiz));
      d.appendChild(yildizlar);
    }
    d.addEventListener('click', () => {
      if (no > kayit.acik) return; // kilitli: başlamaz
      s.bolumSec(no);
    });
    if (no === acik) simdiki = d;
    alan.appendChild(d);
  }
  kaydir.appendChild(alan);
  kutu.appendChild(kaydir);

  // Açılınca kaldığı bölüm ekranın ortasına gelsin (ekrana eklendikten sonra).
  requestAnimationFrame(() => {
    if (!simdiki) return;
    const hedef = simdiki.offsetTop - kaydir.clientHeight / 2;
    kaydir.scrollTop = Math.max(0, hedef);
  });
  return kutu;
}
