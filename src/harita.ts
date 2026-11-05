// Bölüm seçme ekranı: kutulu bölümler, sabit arka zemin (Kemal, 5 Kasım 2026:
// "Bu yolu beğenmediğimden bahsediyordum, kutulu olarak bölümleri koy, sabit arka
// zeminde"). Sahil yolu çiziminin (30 Ekim) yerine geldi.
// Arkada desenli mor zemin durur, kaymaz; üstünde numaralı bölüm kutuları satır
// satır dizilir ve yalnız kutular kayar. 1. bölüm en üstte solda. Bölüm sayısı
// artınca yalnız BOLUM_SAYISI değişir, kutular kendiliğinden çoğalır.

import { BOLUM_SAYISI, YILDIZ_ESIKLERI, bolumdeYeniUrunler, bolumTuru } from './ayarlar';
import type { Kayit } from './kayit';

const NS = 'http://www.w3.org/2000/svg';

function svgOge<K extends keyof SVGElementTagNameMap>(ad: K, nitelik: Record<string, string | number>) {
  const o = document.createElementNS(NS, ad);
  for (const [k, v] of Object.entries(nitelik)) o.setAttribute(k, String(v));
  return o;
}

// Kilitli kutudaki küçük kilit (yuvarlak, kalın; arayüz dili).
const KILIT_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor"/></svg>';

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
  kutu.className = 'harita-kutu kutulu';

  // Üstte: geri düğmesi ve başlık (kaydırınca yerinde kalır).
  const ust = document.createElement('div');
  ust.className = 'harita-ust';
  const geri = document.createElement('button');
  geri.className = 'harita-geri kose-dugme yuvarlak mor';
  geri.id = 'harita-geri';
  geri.setAttribute('aria-label', 'Geri');
  const ok = svgOge('svg', { viewBox: '0 0 24 24', class: 'geri-ok' });
  ok.appendChild(svgOge('path', { d: 'M15 5 L8 12 L15 19' }));
  geri.append(ok);
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

  // Yalnız kutular kayar; arka zemin yerinde durur.
  const kaydir = document.createElement('div');
  kaydir.className = 'bolum-kaydir';
  const izgara = document.createElement('div');
  izgara.className = 'bolum-izgara';

  const acik = Math.min(kayit.acik, BOLUM_SAYISI);
  let simdiki: HTMLButtonElement | null = null;
  for (let no = 1; no <= BOLUM_SAYISI; no++) {
    const kilitli = no > kayit.acik;
    const yildiz = kayit.yildizlar[no - 1] ?? 0;
    const siradaki = !kilitli && yildiz === 0;
    const d = document.createElement('button');
    d.className = 'bolum-kutu' + (kilitli ? ' kilitli' : siradaki ? ' siradaki' : ' gecildi');
    // Zor ve çok zor bölümler kırmızı, altında etiket (10'luk dilim; Kemal, 5 Kasım).
    const tur = bolumTuru(no);
    if (tur === 'zor' || tur === 'cok-zor') {
      d.classList.add(tur);
      const etiket = document.createElement('span');
      etiket.className = 'bolum-kutu-etiket';
      etiket.textContent = tur === 'zor' ? 'Zor' : 'Çok zor';
      d.appendChild(etiket);
    }
    d.dataset.no = String(no);
    d.dataset.yildiz = String(yildiz);
    d.setAttribute('aria-label', `Bölüm ${no}` + (kilitli ? ', kilitli' : ''));
    if (kilitli) d.setAttribute('aria-disabled', 'true');
    const sayi = document.createElement('span');
    sayi.className = 'bolum-kutu-sayi';
    sayi.textContent = String(no);
    d.appendChild(sayi);
    if (kilitli) {
      const kilit = document.createElement('span');
      kilit.className = 'bolum-kutu-kilit';
      kilit.innerHTML = KILIT_SVG;
      d.appendChild(kilit);
    } else {
      const yildizlar = document.createElement('span');
      yildizlar.className = 'kucuk-yildizlar bolum-kutu-yildizlar';
      for (let k = 0; k < YILDIZ_ESIKLERI.length; k++) yildizlar.appendChild(yildizCiz(k < yildiz));
      d.appendChild(yildizlar);
    }
    // Yeni ürünün ilk geldiği bölümün köşesinde o ürünün küçük resmi (kazanç, 5 Kasım):
    // oyuncu ileride ne kazanacağını görür.
    const yeni = bolumdeYeniUrunler(no);
    if (yeni.length > 0) {
      const rozet = document.createElement('span');
      rozet.className = 'bolum-kutu-rozet';
      rozet.dataset.urun = yeni[0];
      if (kilitli) {
        // Kapalı bölümde ürün sürpriz: yalnız soru işareti (Kemal, 5 Kasım akşamı).
        rozet.classList.add('surpriz');
        rozet.textContent = '?';
      } else {
        const r = document.createElement('img');
        r.src = `gorseller/urunler/${yeni[0]}.webp`;
        r.alt = '';
        r.draggable = false;
        rozet.appendChild(r);
      }
      d.appendChild(rozet);
    }
    d.addEventListener('click', () => {
      if (no > kayit.acik) return; // kilitli: başlamaz
      s.bolumSec(no);
    });
    if (no === acik) simdiki = d;
    izgara.appendChild(d);
  }
  kaydir.appendChild(izgara);
  kutu.appendChild(kaydir);

  // Açılınca kaldığı bölüm ekranın ortasına gelsin (ekrana eklendikten sonra).
  requestAnimationFrame(() => {
    if (!simdiki) return;
    const hedef = simdiki.offsetTop - kaydir.clientHeight / 2 + simdiki.offsetHeight / 2;
    kaydir.scrollTop = Math.max(0, hedef);
  });
  return kutu;
}
