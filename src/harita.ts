// Bölüm haritası (5. paket, çizimsiz). Kemal, 22 Ekim: harita Düzada'ya
// uyarlanır; yol dükkânın olduğu Liman'dan başlar, Sahil Yolu boyunca öbür
// mahallelere gider. Basit şekiller ve renkler; yalnız künyedeki adlar.
// Adanın kaba biçimi KKM'deki haritadan üretildi (src/haritaVerisi.ts).

import { BOLUM_SAYISI, YILDIZ_ESIKLERI } from './ayarlar';
import { HARITA } from './haritaVerisi';
import type { Kayit } from './kayit';

type Nokta = readonly [number, number];

const NS = 'http://www.w3.org/2000/svg';

function svgOge<K extends keyof SVGElementTagNameMap>(ad: K, nitelik: Record<string, string | number>) {
  const o = document.createElementNS(NS, ad);
  for (const [k, v] of Object.entries(nitelik)) o.setAttribute(k, String(v));
  return o;
}

const yolYazisi = (n: readonly Nokta[], kapali: boolean) =>
  n.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ') + (kapali ? ' Z' : '');

// Yol boyunca eşit aralıklı `adet` nokta: ilki yolun başı (Dondurmacı Kızlar),
// sonuncusu yolun sonu (İskele).
function esitAralikli(yol: readonly Nokta[], adet: number): [number, number][] {
  const parca: number[] = [];
  let toplam = 0;
  for (let i = 1; i < yol.length; i++) {
    const u = Math.hypot(yol[i][0] - yol[i - 1][0], yol[i][1] - yol[i - 1][1]);
    parca.push(u);
    toplam += u;
  }
  const sonuc: [number, number][] = [];
  for (let k = 0; k < adet; k++) {
    let kalan = (toplam * k) / Math.max(1, adet - 1);
    let i = 0;
    while (i < parca.length - 1 && kalan > parca[i]) {
      kalan -= parca[i];
      i++;
    }
    const t = parca[i] ? Math.min(1, kalan / parca[i]) : 0;
    sonuc.push([
      yol[i][0] + (yol[i + 1][0] - yol[i][0]) * t,
      yol[i][1] + (yol[i + 1][1] - yol[i][1]) * t,
    ]);
  }
  return sonuc;
}

// Mahalle adlarının yeri: ortaları bölüm noktalarına ya da başka bir yazıya
// denk gelmesin diye elle biraz kaydırıldı (yalnız yerleşim; birim 100 m).
const AD_YERI: Record<string, readonly [number, number]> = {
  yer_stadyum: [146, 42],
  yer_ciftlik: [150, 86],
  yer_iskele: [86, 106],
};

// Bölüm noktalarının haritadaki yeri (her açılışta aynı).
const BOLUM_NOKTALARI = esitAralikli(HARITA.sahilYolu, BOLUM_SAYISI);

// Yolun açılan en ileri bölüme kadarki kısmı (o kısım koyu çizilir).
function yolunKismi(son: number): [number, number][] {
  const hedef = BOLUM_NOKTALARI[son - 1];
  const yol = HARITA.sahilYolu;
  let enIyi = 0;
  let enIyiUzaklik = Infinity;
  // Hedef noktanın düştüğü parçayı bul, oraya kadar al.
  for (let i = 1; i < yol.length; i++) {
    const [a, b] = [yol[i - 1], yol[i]];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const u2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((hedef[0] - a[0]) * dx + (hedef[1] - a[1]) * dy) / u2));
    const d = Math.hypot(a[0] + dx * t - hedef[0], a[1] + dy * t - hedef[1]);
    if (d < enIyiUzaklik - 1e-6) {
      enIyiUzaklik = d;
      enIyi = i;
    }
  }
  return [...yol.slice(0, enIyi).map((p) => [p[0], p[1]] as [number, number]), hedef];
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
  kutu.className = 'harita-kutu';

  // Üstte: geri düğmesi ve başlık.
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

  // Harita: adanın kaba biçimi, mahalleler, Sahil Yolu, bölüm noktaları.
  const alan = document.createElement('div');
  alan.className = 'harita-alan';
  alan.style.aspectRatio = `${HARITA.genislik} / ${HARITA.yukseklik}`;
  const svg = svgOge('svg', {
    viewBox: `0 0 ${HARITA.genislik} ${HARITA.yukseklik}`,
    class: 'harita-svg',
    'aria-hidden': 'true',
  });
  svg.appendChild(svgOge('path', { d: yolYazisi(HARITA.ada, true), class: 'harita-ada' }));
  for (const m of HARITA.mahalleler) {
    svg.appendChild(svgOge('path', { d: yolYazisi(m.sinir, true), class: 'harita-mahalle', 'data-id': m.id }));
  }
  // Ada Tepesi: küçük üçgen (künyede en yüksek nokta).
  const [tx, ty] = HARITA.adaTepesi;
  svg.appendChild(svgOge('path', { d: `M${tx} ${ty - 4} L${tx + 4} ${ty + 3} L${tx - 4} ${ty + 3} Z`, class: 'harita-tepe' }));
  const tepeAdi = svgOge('text', { x: tx + 6, y: ty + 2.5, class: 'harita-kucuk-ad sola' });
  tepeAdi.textContent = 'Ada Tepesi';
  svg.appendChild(tepeAdi);
  // Mahalle adları (künyedeki gibi).
  for (const m of HARITA.mahalleler) {
    const [ax, ay] = AD_YERI[m.id] ?? m.orta;
    const t = svgOge('text', { x: ax, y: ay, class: 'harita-ad' });
    t.textContent = m.ad;
    svg.appendChild(t);
  }
  // Sahil Yolu: bütün yol açık renkte, açılan bölüme kadarki kısmı koyu.
  svg.appendChild(svgOge('path', { d: yolYazisi(HARITA.sahilYolu, false), class: 'harita-yol' }));
  svg.appendChild(svgOge('path', { d: yolYazisi(yolunKismi(kayit.acik), false), class: 'harita-yol gecilen' }));
  // Dondurmacı Kızlar: yolun başı (1. bölüm noktası dükkânın önünde); adı altta.
  const [dx, dy] = BOLUM_NOKTALARI[0];
  const dukkanAdi = svgOge('text', { x: dx, y: dy + 21, class: 'harita-kucuk-ad' });
  dukkanAdi.textContent = 'Dondurmacı Kızlar';
  svg.appendChild(dukkanAdi);
  alan.appendChild(svg);

  // Bölüm noktaları: dokunulabilir düğmeler, haritanın üstünde.
  for (let no = 1; no <= BOLUM_SAYISI; no++) {
    const [x, y] = BOLUM_NOKTALARI[no - 1];
    const kilitli = no > kayit.acik;
    const yildiz = kayit.yildizlar[no - 1] ?? 0;
    const siradaki = !kilitli && yildiz === 0;
    const d = document.createElement('button');
    d.className = 'harita-nokta' + (kilitli ? ' kilitli' : siradaki ? ' siradaki' : ' gecildi');
    d.dataset.no = String(no);
    d.dataset.yildiz = String(yildiz);
    d.style.left = `${(x / HARITA.genislik) * 100}%`;
    d.style.top = `${(y / HARITA.yukseklik) * 100}%`;
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
    alan.appendChild(d);
  }
  kutu.appendChild(alan);
  return kutu;
}
