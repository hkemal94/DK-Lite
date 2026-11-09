// Bölüm seçme ekranı: kutulu bölümler, sabit arka zemin (Kemal, 5 Kasım 2026:
// "Bu yolu beğenmediğimden bahsediyordum, kutulu olarak bölümleri koy, sabit arka
// zeminde"). Sahil yolu çiziminin (30 Ekim) yerine geldi.
// Arkada desenli mor zemin durur, kaymaz; üstünde numaralı bölüm kutuları satır
// satır dizilir ve yalnız kutular kayar. 1. bölüm en üstte solda. Bölüm sayısı
// artınca yalnız BOLUM_SAYISI değişir, kutular kendiliğinden çoğalır.

import { t } from './dil';
import { BOLUM_SAYISI, SAYFADA_BOLUM, YILDIZ_ESIKLERI, bolumdeYeniUrunler, bolumTuru, mahalleAcikMi, mahalleGereken, toplamYildiz } from './ayarlar';
import { ogreticiBittiMi, type Kayit } from './kayit';

const NS = 'http://www.w3.org/2000/svg';

// Düzada durakları (Kemal, 5 Kasım 2026 gecesi: Bölümler ekranı "Düzada durakları"):
// her sayfa (20 bölüm) adanın bir yeri; her yerin kendi renginde desenli zemin (Kemal:
// sahne çizimleri "görsel dilimize uygun değil ... renkler olsun arka plan olarak"). Sıra Sahil
// Yolu'nun sırası (tasarım belgesi 2.3, 0.11): Liman → Stadyum → Çiftlik → İskele.
// Yer adları yalnız künyeden (KKM docs/03-duzada-kunyesi.md). Sayfa sayısı durak
// sayısını geçerse duraklar baştan tekrar eder.
// 150 bölüm = 5 mahalle × 30 (Kemal: "Künyedeki yerleri kullan, bir mahalleye de 30'ar bölüm").
// 6–10: adları sonra (Kemal, 9 Kasım: "şimdilik isimleri lokasyon 6, lokasyon 7 gibi ilerlet").
const DURAKLAR = [
  { ad: 'Liman' }, { ad: 'Stadyum' }, { ad: 'Çiftlik' }, { ad: 'İskele' }, { ad: 'Merkez' },
  { ad: t('Lokasyon {0}', 6) }, { ad: t('Lokasyon {0}', 7) }, { ad: t('Lokasyon {0}', 8) }, { ad: t('Lokasyon {0}', 9) }, { ad: t('Lokasyon {0}', 10) },
  { ad: t('Lokasyon {0}', 11) }, { ad: t('Lokasyon {0}', 12) }, { ad: t('Lokasyon {0}', 13) },
];
// Kaldığın bölümün üstünde dondurmacının başı.
const DONDURMACI_BAS = 'gorseller/dondurmaci-bas.webp';


function svgOge<K extends keyof SVGElementTagNameMap>(ad: K, nitelik: Record<string, string | number>) {
  const o = document.createElementNS(NS, ad);
  for (const [k, v] of Object.entries(nitelik)) o.setAttribute(k, String(v));
  return o;
}

// Kilitli kutudaki küçük kilit (yuvarlak, kalın; arayüz dili).
const KILIT_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor"/></svg>';

// Ana sayfa (ev) simgesi; oyun.ts de kullanır. Çatı ve gövde tek parça, aynı renk (Kemal, 9 Kasım).
export const EV_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2 2.6 11.4h2.9V20a1 1 0 0 0 1 1H10v-5.6h4V21h3.5a1 1 0 0 0 1-1v-8.6h2.9Z" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';

export interface HaritaSecenekleri {
  bolumSec: (no: number) => void;
  geri: () => void;
  anaSayfa: () => void;
  kilitliMahalle: (m: number) => void; // kilitli sonraki mahalle okuna basınca
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
  geri.setAttribute('aria-label', t('Geri'));
  const ok = svgOge('svg', { viewBox: '0 0 24 24', class: 'geri-ok' });
  ok.appendChild(svgOge('path', { d: 'M15 5 L8 12 L15 19' }));
  geri.append(ok);
  geri.addEventListener('click', s.geri);
  const baslik = document.createElement('div');
  baslik.className = 'liste-baslik';
  baslik.textContent = t('Bölümler');
  // Başlığın altında sayfadaki ilerleme ("12/20" gibi: geçilen bölüm / sayfadaki bölüm).
  const ilerleme = document.createElement('div');
  ilerleme.className = 'durak-ilerleme';
  const baslikKutu = document.createElement('div');
  baslikKutu.className = 'durak-baslik';
  baslikKutu.append(baslik, ilerleme);
  // Geri okunun yanında ev: doğrudan giriş ekranına (Kemal, 6 Kasım).
  const ev = document.createElement('button');
  ev.className = 'harita-ev kose-dugme yuvarlak mor ev-dugme';
  ev.id = 'harita-ev';
  ev.setAttribute('aria-label', t('Ana sayfa'));
  ev.innerHTML = EV_SVG;
  ev.addEventListener('click', s.anaSayfa);
  ust.append(geri, ev, baslikKutu);
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
  // Sayfalar (Kemal, 5 Kasım: "Daha küçük sayfalar"): her sayfada SAYFADA_BOLUM bölüm;
  // açılınca kaldığın bölümün sayfası gelir. Altta önceki / sonraki sayfa düğmeleri.
  const sayfaSayisi = Math.ceil(BOLUM_SAYISI / SAYFADA_BOLUM);
  let sayfa = Math.floor((acik - 1) / SAYFADA_BOLUM);
  // Kaldığın bölümün mahallesi kilitliyse (yıldız yetmedi) açık son mahalleden açılır.
  while (sayfa > 0 && !mahalleAcikMi(kayit.yildizlar, sayfa)) sayfa--;
  const alt = document.createElement('div');
  alt.className = 'sayfa-alt';
  const okDugme = (yon: -1 | 1) => {
    const d = document.createElement('button');
    d.className = 'kose-dugme yuvarlak mor sayfa-ok';
    d.setAttribute('aria-label', yon < 0 ? 'Önceki sayfa' : t('Sonraki sayfa'));
    const o = svgOge('svg', { viewBox: '0 0 24 24', class: 'geri-ok' });
    o.appendChild(svgOge('path', { d: yon < 0 ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19' }));
    d.appendChild(o);
    d.addEventListener('click', () => {
      const yeni = sayfa + yon;
      if (yeni < 0 || yeni >= sayfaSayisi) return;
      if (yon > 0 && !mahalleAcikMi(kayit.yildizlar, yeni)) {
        s.kilitliMahalle(yeni);
        return;
      }
      sayfa = yeni;
      ciz();
      kaydir.scrollTop = 0;
    });
    return d;
  };
  const onceki = okDugme(-1);
  const sonraki = okDugme(1);
  const sayfaYazi = document.createElement('span');
  sayfaYazi.className = 'sayfa-yazi';
  // Kilitli okun kilidi ve altındaki yıldız sayacı.
  const kilit = document.createElement('span');
  kilit.className = 'ok-kilit';
  kilit.innerHTML = KILIT_SVG;
  sonraki.appendChild(kilit);
  const sonrakiSayac = document.createElement('span');
  sonrakiSayac.className = 'ok-sayac';
  const sonrakiKutu = document.createElement('span');
  sonrakiKutu.className = 'sonraki-kutu';
  sonrakiKutu.append(sonraki, sonrakiSayac);
  alt.append(onceki, sayfaYazi, sonrakiKutu);

  let simdiki: HTMLButtonElement | null = null;
  const ciz = () => {
  izgara.innerHTML = '';
  simdiki = null;
  const ilk = sayfa * SAYFADA_BOLUM + 1;
  const son = Math.min(BOLUM_SAYISI, ilk + SAYFADA_BOLUM - 1);
  sayfaYazi.textContent = `${ilk}–${son}`;
  const durak = DURAKLAR[sayfa % DURAKLAR.length];
  baslik.textContent = durak.ad;
  kutu.dataset.durak = String(sayfa % DURAKLAR.length);
  let gecilen = 0;
  for (let n = ilk; n <= son; n++) if ((kayit.yildizlar[n - 1] ?? 0) > 0) gecilen++;
  ilerleme.textContent = `${gecilen}/${son - ilk + 1}`;
  onceki.disabled = sayfa === 0;
  sonraki.disabled = sayfa >= sayfaSayisi - 1;
  // Sonraki mahalle kilitliyse: okta kilit ve altında yıldız sayacı (Kemal, 6 Kasım).
  const sonrakiKilitli = sayfa < sayfaSayisi - 1 && !mahalleAcikMi(kayit.yildizlar, sayfa + 1);
  sonraki.classList.toggle('kilitli-ok', sonrakiKilitli);
  sonrakiSayac.hidden = !sonrakiKilitli;
  sonrakiSayac.textContent = `★ ${toplamYildiz(kayit.yildizlar)}/${mahalleGereken(sayfa + 1)}`;
  alt.dataset.sayfa = String(sayfa + 1);
  // Liman'ın başında 0. bölüm (ipuçlu başlangıç): hep açık, tekrar oynanabilir.
  if (sayfa === 0) {
    const d = document.createElement('button');
    const bitti = ogreticiBittiMi();
    d.className = 'bolum-kutu ogretici ' + (bitti ? 'gecildi' : 'siradaki');
    d.dataset.no = '0';
    d.setAttribute('aria-label', 'Bölüm 0');
    const sayi = document.createElement('span');
    sayi.className = 'bolum-kutu-sayi';
    sayi.textContent = '0';
    d.appendChild(sayi);
    const hediye = bolumdeYeniUrunler(1)[0];
    if (hediye) {
      const rozet = document.createElement('span');
      rozet.className = 'bolum-kutu-rozet';
      if (bitti) {
        const r = document.createElement('img');
        r.src = `gorseller/urunler/${hediye}.webp`;
        r.alt = '';
        rozet.appendChild(r);
      } else {
        rozet.classList.add('surpriz');
        rozet.textContent = '?';
      }
      d.appendChild(rozet);
    }
    d.addEventListener('click', () => s.bolumSec(0));
    izgara.appendChild(d);
  }
  for (let no = ilk; no <= son; no++) {
    const kilitli = no > kayit.acik;
    const yildiz = kayit.yildizlar[no - 1] ?? 0;
    const siradaki = !kilitli && yildiz === 0;
    const d = document.createElement('button');
    d.className = 'bolum-kutu' + (kilitli ? ' kilitli' : siradaki ? ' siradaki' : ' gecildi');
    // Zor ve çok zor bölümler: yalnız yumuşak bir kırmızımsı ton; yazı, etiket yok,
    // ikisi aynı görünür (Kemal, 5 Kasım gecesi: "çok daha soft ... bir ton kırmızıya
    // yakınını zorluk ayırt etmeksizin hiçbir bilgi vermeden koyabilirsin").
    const tur = bolumTuru(no);
    if (tur === 'zor' || tur === 'cok-zor') d.classList.add('zorlu');
    d.dataset.no = String(no);
    d.dataset.yildiz = String(yildiz);
    d.setAttribute('aria-label', t('Bölüm {0}', no) + (kilitli ? ', kilitli' : ''));
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
    // Hediye: bu bölüm kazanılınca açılacak ürün kutunun köşesinde (kapalıyken "?").
    // Kemal (5 Kasım gecesi): zor bölüme "verilecek hediyeyi koyarız. O soru işaretini koyarız".
    // 0, 10, 20 ... 140. bölümler birer ürün verir (HEDIYE_SIRASI).
    const yeni = no < BOLUM_SAYISI ? bolumdeYeniUrunler(no + 1) : [];
    if (yeni.length > 0) {
      const rozet = document.createElement('span');
      rozet.className = 'bolum-kutu-rozet';
      rozet.dataset.urun = yeni[0];
      if (kilitli || yildiz === 0) {
        // Henüz kazanılmamış bölümde ürün sürpriz: yalnız soru işareti (Kemal, 5 Kasım akşamı).
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
    if (no === acik) {
      simdiki = d;
      // Kaldığın bölüm: üstünde dondurmacının başı.
      const bas = document.createElement('img');
      bas.className = 'bolum-kutu-bas';
      bas.src = DONDURMACI_BAS;
      bas.alt = '';
      bas.draggable = false;
      d.appendChild(bas);
    }
    izgara.appendChild(d);
  }
  };
  ciz();
  kaydir.appendChild(izgara);
  kutu.appendChild(kaydir);
  if (sayfaSayisi > 1) kutu.appendChild(alt);

  // Açılınca kaldığı bölüm ekranın ortasına gelsin (ekrana eklendikten sonra).
  requestAnimationFrame(() => {
    const k = simdiki as HTMLButtonElement | null;
    if (!k) return;
    const hedef = k.offsetTop - kaydir.clientHeight / 2 + k.offsetHeight / 2;
    kaydir.scrollTop = Math.max(0, hedef);
  });
  return kutu;
}
