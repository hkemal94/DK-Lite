// Ekran denetimi (Kemal, 6 Kasım 2026: "Böyle optimizasyon problemlerini kökten düzelt").
// Bütün ekranları ve pencereleri iki telefon boyutunda (360x640, 390x844) açar; her birinde
// şunlara bakar ve bulduklarını yazar:
//   - sayfanın yana taşması,
//   - ekrandan taşan düğme ve yazılar,
//   - kesilen yazılar,
//   - üst üste binen düğme / yazı / başlık,
//   - ışık halesinin pencere başlığına binmesi.
// Her durumun ekran görüntüsü denetim-ciktisi/<boyut>/ klasörüne kaydedilir.
//
// Çalıştırma (oyun derlenmiş ve önizleme açık olmalı):
//   npm run build && npx vite preview --port 4173 &
//   node araclar/ekran-denetimi.cjs            (sorun varsa çıkış kodu 1)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ADRES = process.env.ADRES || 'http://localhost:4173/?denetim';
const CIKTI = path.join(__dirname, '..', 'denetim-ciktisi');
// Her durum iki dilde de denetlenir (Türkçe, İngilizce; 9 Kasım).
const DILLER = ['tr', 'en'];
const BOYUTLAR = [
  { ad: '360x640', width: 360, height: 640 },
  { ad: '390x844', width: 390, height: 844 },
];

function bugun(fark = 0) {
  const d = new Date();
  d.setDate(d.getDate() + fark);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Kayıt: kaç bölüm açık, kaç yıldızlı; günlük ödül alınmış mı.
function kayitKur({ acik = 5, yildiz = 3, kadar = acik - 1, gunlukAlindi = true, seri = 0 } = {}) {
  const y = new Array(150).fill(0);
  for (let i = 0; i < kadar; i++) y[i] = yildiz;
  return {
    'dk-lite-ogretici': '1',
    'dk-lite-kayit': JSON.stringify({ acik, yildizlar: y }),
    'dk-lite-yardim': JSON.stringify({
      adet: { 'bant-bosalt': 1, karistir: 1, 'sabir-durdur': 1, 'fazla-bant': 1, 'ek-sutun': 1 },
      seri,
      gunlukSira: gunlukAlindi ? 2 : 1,
      gunlukTarih: gunlukAlindi ? bugun() : bugun(-1),
    }),
  };
}

// Denetlenecek durumlar: [ad, kayıt, yapılacak (sayfada çalışır), bekleme ms]
const DURUMLAR = [
  ['giris', kayitKur(), null, 600],
  ['gunluk-odul', kayitKur({ gunlukAlindi: false }), null, 800],
  ['ayarlar', kayitKur(), 'o.ayarlarAc()', 400],
  ['album', kayitKur({ acik: 25 }), 'o.albumAc()', 500],
  ['bolumler-liman', kayitKur({ acik: 31, yildiz: 2, kadar: 30 }), "o.listeAc('giris')", 600],
  ['bolumler-ileri-kilit', kayitKur({ acik: 121, yildiz: 2, kadar: 120 }), "o.listeAc('giris')", 600],
  ['mahalle-kilit', kayitKur({ acik: 31, yildiz: 2, kadar: 30 }), 'o.mahalleKilitPenceresi(1)', 500],
  ['oyun-1', kayitKur(), 'o.bolumBaslat(1)', 2500],
  ['oyun-23-coklu-istek', kayitKur({ acik: 23, kadar: 22 }), 'o.bolumBaslat(23)', 2500],
  ['oyun-91-aceleci', kayitKur({ acik: 91, kadar: 90 }), "o.bolumBaslat(91); document.querySelector('#tanitim .odul-tamam')?.click()", 4000],
  ['tanitim-121', kayitKur({ acik: 121, kadar: 120 }), 'o.bolumBaslat(121)', 900],
  ['duraklat', kayitKur(), 'o.bolumBaslat(1); o.duraklat()', 900],
  ['birak-onay', kayitKur(), 'o.bolumBaslat(1); o.anaSayfayaDonSor()', 900],
  ['sonuc-kazandi', kayitKur({ seri: 2 }), "o.bolumBaslat(4); o.bitir('kazandin'); document.querySelectorAll('.odul-ortu').forEach(e => e.remove())", 2500],
  ['sonuc-kaybetti', kayitKur(), "o.bolumBaslat(4); o.bitir('kacti')", 1800],
  ['sandik', kayitKur({ acik: 10, kadar: 9 }), "o.bolumBaslat(10); o.bitir('kazandin')", 4500],
  ['yeni-urun', kayitKur({ acik: 10, kadar: 9 }), "o.bolumBaslat(10); o.bitir('kazandin'); setTimeout(() => document.querySelector('#sandik .odul-tamam')?.click(), 100)", 4500],
  ['seri-odulu', kayitKur(), "o.odulSirasi([() => o.yardimciPenceresi('Seri ödülü!', 'karistir')], false, o.kok)", 900],
  ['gunluk-can', kayitKur(), "o.odulSirasi([() => o.canOdulPenceresi('+1 can', '+1')], false, o.kok)", 900],
  ['can-yok', kayitKur(), 'o.canYokGoster()', 500],
  ['album-rozet', { ...kayitKur({ acik: 40, kadar: 39 }), 'dk-lite-koleksiyon': JSON.stringify({ para: 640, rozetler: ['ilk-adim', 'seri-5', 'urun-10'] }) }, "o.albumAc('rozet')", 500],
  ['rozet-bilgi', { ...kayitKur({ acik: 40, kadar: 39 }), 'dk-lite-koleksiyon': JSON.stringify({ rozetler: ['ilk-adim'] }) }, "o.albumAc('rozet'); document.querySelector('[data-rozet=\"musteri-1000\"]').click()", 600],
  ['album-kart', kayitKur({ acik: 70, kadar: 69 }), "o.albumAc('kart')", 500],
  ['album-kart-altin', kayitKur({ acik: 100, yildiz: 3, kadar: 99 }), "o.albumAc('kart')", 500],
  ['kart-odul', kayitKur({ acik: 40, kadar: 39 }), "o.odulSirasi([() => o.kartPenceresi(0)], false, o.kok)", 900],
  ['oyun-tema-kis', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ temalar: ['mor', 'kis'], tema: 'kis', kostumler: ['klasik', 'kislik'], kostum: 'kislik' }) }, 'o.bolumBaslat(1)', 2500],
  ['magaza-kostum-yeni', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ para: 900, kostumler: ['klasik', 'yazlik'], kostum: 'yazlik' }) }, "o.magazaAc('kostum'); document.querySelector('#magaza .album-izgara').scrollTop = 999", 500],
  ['magaza-tema', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ para: 640, temalar: ['mor', 'gece'], tema: 'gece' }) }, "o.magazaAc('tema')", 500],
  ['magaza-kostum', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ para: 900, kostumler: ['klasik', 'maras'], kostum: 'maras' }) }, "o.magazaAc('kostum')", 500],
  ['oyun-kostum-maras', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ kostumler: ['klasik', 'maras'], kostum: 'maras' }) }, 'o.bolumBaslat(1)', 2500],
  ['magaza-yardim', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ para: 640 }) }, "o.magazaAc('yardim')", 500],
  ['rozet-odul', kayitKur(), "o.odulSirasi([() => o.rozetPenceresi('musteri-1000')], false, o.kok)", 900],
  ['oyun-tema-gece', { ...kayitKur(), 'dk-lite-koleksiyon': JSON.stringify({ temalar: ['mor', 'gece'], tema: 'gece' }) }, 'o.bolumBaslat(1)', 2500],
  ['hamle-bitti', kayitKur({ acik: 12, kadar: 11 }), 'o.bolumBaslat(12); o.hamleBittiGoster()', 700],
];

// Sayfada çalışan ölçüm: sorunların listesini verir.
function olc() {
  const sorunlar = [];
  const vw = innerWidth;
  const vh = innerHeight;
  const ad = (el) => {
    const id = el.id ? '#' + el.id : '';
    const sinif = typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    const yazi = (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 24).replace(/\s+/g, ' ');
    return `${el.tagName.toLowerCase()}${id}${sinif}${yazi ? ` "${yazi}"` : ''}`;
  };
  const s0 = (el) => getComputedStyle(el);
  const gorunur = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < 0.05) return false;
    }
    return true;
  };
  const kaydirmali = (el) => {
    for (let e = el.parentElement; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (/(auto|scroll)/.test(s.overflowY + s.overflowX) && e.scrollHeight > e.clientHeight + 1) return true;
    }
    return false;
  };
  // Görünen kutu: kaydırılan ya da kesilen kapların dışında kalan kısım sayılmaz
  // (ör. Bölümler'de kayan kutular alttaki şeridin arkasına girer; bu sorun değil).
  const kutuAl = (el) => {
    let r = el.getBoundingClientRect();
    let x0 = r.left, y0 = r.top, x1 = r.right, y1 = r.bottom;
    for (let e = el.parentElement; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (/(auto|scroll|hidden|clip)/.test(s.overflowX + s.overflowY)) {
        const q = e.getBoundingClientRect();
        x0 = Math.max(x0, q.left); y0 = Math.max(y0, q.top); x1 = Math.min(x1, q.right); y1 = Math.min(y1, q.bottom);
      }
    }
    return { left: x0, top: y0, right: x1, bottom: y1, width: x1 - x0, height: y1 - y0 };
  };
  if (document.documentElement.scrollWidth > vw + 1) sorunlar.push(`sayfa yana taşıyor (${document.documentElement.scrollWidth} > ${vw})`);

  // Üstteki pencere(ler): en üstteki ödül/onay penceresi, yoksa açık sonuç / menü / ayarlar.
  const ortular = [...document.querySelectorAll('.odul-ortu')].filter(gorunur);
  let kapsamlar = ortular.length ? [ortular[ortular.length - 1]] : [...document.querySelectorAll('.son:not(.gizli) .pencere, .harita-ekran:not(.gizli), .giris:not(.gizli)')].filter(gorunur);
  if (!kapsamlar.length) kapsamlar = [document.querySelector('.sahne')];

  const SECICI = 'button, .pencere-baslik, .odul-ad, .odul-not, .son-baslik, .sonuc-bilgi > div, .sonuc-puan, .gunluk-gun, .album-urun, .mahalle-cubuk, .istek, .sutun, .yardim-dugme, .can-gosterge, .sayac, .bolum-no, .erime-dugme, .liste-baslik, .durak-ilerleme, .sayfa-yazi, .ok-sayac, .seri-afis';
  for (const kap of kapsamlar) {
    const els = [...kap.querySelectorAll(SECICI)].filter(gorunur);
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (!kaydirmali(el) && (r.left < -1 || r.right > vw + 1 || r.top < -1 || r.bottom > vh + 1)) {
        sorunlar.push(`ekrandan taşıyor: ${ad(el)} [${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}]`);
      }
      // Düğme yazısı iki satıra bölünmesin (tek satırlık düğmeler).
      if (el.tagName === 'BUTTON' && el.innerText.trim() && !el.innerText.includes('\n')) {
        const lh = parseFloat(s0(el).lineHeight) || parseFloat(s0(el).fontSize) * 1.3;
        const ic = el.clientHeight - parseFloat(s0(el).paddingTop) - parseFloat(s0(el).paddingBottom);
        if (el.classList.contains('dugme') && ic > lh * 1.8) sorunlar.push(`düğme yazısı bölünüyor: ${ad(el)}`);
      }
      // Kesilen yazı: yazının kendi kutusuna sığmaması.
      const s = getComputedStyle(el);
      if ((s.overflow === 'hidden' || s.textOverflow === 'ellipsis' || s.whiteSpace === 'nowrap') && el.scrollWidth > el.clientWidth + 2 && el.innerText.trim()) {
        sorunlar.push(`yazı sığmıyor: ${ad(el)} (${el.scrollWidth} > ${el.clientWidth})`);
      }
    }
    // Üst üste binme: iç içe olmayan iki öğe.
    for (let i = 0; i < els.length; i++) {
      for (let j = i + 1; j < els.length; j++) {
        const a = els[i], b = els[j];
        if (a.contains(b) || b.contains(a)) continue;
        const ra = kutuAl(a), rb = kutuAl(b);
        if (ra.width <= 0 || ra.height <= 0 || rb.width <= 0 || rb.height <= 0) continue;
        const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
        const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        if (w > 2 && h > 2) sorunlar.push(`üst üste: ${ad(a)} ↔ ${ad(b)} (${Math.round(w)}x${Math.round(h)})`);
      }
    }
    // Işık halesi başlığa binmesin: hale görünen kısmı (daire) ile başlık kutusu.
    const basliklar = [...kap.querySelectorAll('.pencere-baslik')].filter(gorunur);
    const haleler = [...kap.querySelectorAll('.odul-isik, .sandik-isik')].filter(gorunur);
    for (const h of haleler) {
      const r = h.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2, yc = Math.min(r.width, r.height) / 2;
      for (const t of basliklar) {
        const q = t.getBoundingClientRect();
        const nx = Math.max(q.left, Math.min(cx, q.right)), ny = Math.max(q.top, Math.min(cy, q.bottom));
        if ((nx - cx) ** 2 + (ny - cy) ** 2 < (yc * 0.85) ** 2) sorunlar.push(`ışık halesi başlığa biniyor: ${ad(h)} ↔ ${ad(t)}`);
      }
    }
  }
  return [...new Set(sorunlar)];
}

(async () => {
  const tarayici = await chromium.launch();
  let toplam = 0;
  const rapor = [];
  for (const dil of DILLER) for (const boyut of BOYUTLAR) {
    const klasor = dil === 'tr' ? boyut.ad : `${boyut.ad}-${dil}`;
    fs.mkdirSync(path.join(CIKTI, klasor), { recursive: true });
    for (const [durum, kayit0, yap, bekle] of DURUMLAR) {
      const kayit = { ...kayit0, 'dk-lite-dil': dil };
      const sayfa = await tarayici.newPage({ viewport: { width: boyut.width, height: boyut.height }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      const hatalar = [];
      sayfa.on('pageerror', (e) => hatalar.push(e.message));
      await sayfa.goto(ADRES);
      await sayfa.evaluate((k) => {
        localStorage.clear();
        for (const [a, d] of Object.entries(k)) localStorage.setItem(a, d);
      }, kayit);
      await sayfa.reload();
      await sayfa.waitForTimeout(500);
      if (yap) await sayfa.evaluate(`(() => { const o = window.dkLite; ${yap}; })()`);
      await sayfa.waitForTimeout(bekle);
      const sorunlar = [...hatalar.map((h) => `sayfa hatası: ${h}`), ...(await sayfa.evaluate(olc))];
      await sayfa.screenshot({ path: path.join(CIKTI, klasor, `${durum}.png`) });
      toplam += sorunlar.length;
      rapor.push(`${klasor} ${durum}: ${sorunlar.length ? sorunlar.length + ' sorun' : 'temiz'}`);
      for (const s of sorunlar) rapor.push(`    - ${s}`);
      await sayfa.close();
    }
  }
  await tarayici.close();
  const yazi = rapor.join('\n') + `\n\nToplam sorun: ${toplam}\n`;
  fs.writeFileSync(path.join(CIKTI, 'rapor.txt'), yazi);
  console.log(yazi);
  process.exit(toplam > 0 ? 1 : 0);
})();
