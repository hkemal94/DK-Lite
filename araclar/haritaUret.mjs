// Bölüm haritasının kaba biçimini KKM'deki Düzada haritasından bir kez üretir.
// Kullanım: node araclar/haritaUret.mjs <KKM>/src/data/duzadaGeo.ts > src/haritaVerisi.ts
// Yalnız ada kıyısı, mahalle sınırları, Sahil Yolu, Ada Tepesi ve Dondurmacı
// Kızlar'ın yeri alınır; hepsi sadeleştirilir. Yeni yer adı eklenmez.
import fs from 'fs';

const metin = fs.readFileSync(process.argv[2], 'utf8');
const fc = JSON.parse(JSON.parse(metin.match(/JSON\.parse\((".*?")\);/s)[1]));
const bul = (k) => fc.features.find(k);

const BATI = 25.748617, KUZEY = 39.653424, PAY = 0.7; // km
const KX = Math.cos((39.6 * Math.PI) / 180) * 111.32, KY = 110.57;
// Birim: 100 m. Kuzey yukarıda.
const yansit = ([b, e]) => [
  Math.round(((b - BATI) * KX + PAY) * 10),
  Math.round(((KUZEY - e) * KY + PAY) * 10),
];

// Douglas–Peucker sadeleştirme (eşik birim cinsinden).
function sadelestir(n, esik) {
  if (n.length < 3) return n;
  const [a, b] = [n[0], n[n.length - 1]];
  let en = 0, ei = 0;
  for (let i = 1; i < n.length - 1; i++) {
    const [x, y] = n[i];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const u = Math.hypot(dx, dy) || 1;
    const d = Math.abs(dy * x - dx * y + b[0] * a[1] - b[1] * a[0]) / u;
    if (d > en) { en = d; ei = i; }
  }
  if (en <= esik) return [a, b];
  return [...sadelestir(n.slice(0, ei + 1), esik).slice(0, -1), ...sadelestir(n.slice(ei), esik)];
}
const kapaliSadelestir = (n, esik) => {
  const yari = Math.floor(n.length / 2);
  return [...sadelestir(n.slice(0, yari + 1), esik).slice(0, -1), ...sadelestir(n.slice(yari), esik).slice(0, -1)];
};
const tekrarAt = (n) => n.filter((p, i) => i === 0 || p[0] !== n[i - 1][0] || p[1] !== n[i - 1][1]);

const ada = kapaliSadelestir(tekrarAt(bul((f) => f.properties.katman === 'ada').geometry.coordinates[0].map(yansit)), 1.5);
const MAH = { yer_liman: 'Liman', yer_stadyum: 'Stadyum', yer_ciftlik: 'Çiftlik', yer_iskele: 'İskele / Kemsköy', yer_merkez: 'Merkez' };
const mahalleler = fc.features
  .filter((f) => f.properties.katman === 'mahalle')
  .map((f) => {
    const n = tekrarAt(f.geometry.coordinates[0].map(yansit));
    const ort = n.reduce((t, p) => [t[0] + p[0] / n.length, t[1] + p[1] / n.length], [0, 0]).map(Math.round);
    return { id: f.properties.id, ad: MAH[f.properties.id], sinir: kapaliSadelestir(n, 1.5), orta: ort };
  });

// Sahil Yolu: Dondurmacı Kızlar'a en yakın noktadan başlar, saat yönünde
// (Liman → Stadyum → Çiftlik → İskele) gider.
const sahilHam = tekrarAt(bul((f) => f.properties.id === 'yol_sahil').geometry.coordinates.map(yansit));
const sahil = sahilHam.slice(0, -1);
const dk = yansit(bul((f) => f.properties.id === 'bina_liman_kafe').geometry.coordinates[0][0]);
let bas = 0;
sahil.forEach((p, i) => { if (Math.hypot(p[0] - dk[0], p[1] - dk[1]) < Math.hypot(sahil[bas][0] - dk[0], sahil[bas][1] - dk[1])) bas = i; });
const halka = [...sahil.slice(bas), ...sahil.slice(0, bas)];
// Saat yönü mü: ekranda y aşağı; ilerideki nokta doğudaysa saat yönü.
let yon = halka[5][0] > halka[0][0] ? halka : [halka[0], ...halka.slice(1).reverse()];
// Yol İskele'de, The Imperial Kemsköy'e en yakın noktada biter (halkayı kapatmaz).
const otel = yansit(bul((f) => f.properties.id === 'bina_imperial').geometry.coordinates[0][0]);
let son = 0;
yon.forEach((p, i) => { if (Math.hypot(p[0] - otel[0], p[1] - otel[1]) < Math.hypot(yon[son][0] - otel[0], yon[son][1] - otel[1])) son = i; });
yon = yon.slice(0, son + 1);
const tepe = yansit(bul((f) => f.properties.id === 'tepe_ana').geometry.coordinates);
const cikti = {
  genislik: Math.max(...ada.map((p) => p[0])) + PAY * 10,
  yukseklik: Math.max(...ada.map((p) => p[1])) + PAY * 10,
  ada,
  mahalleler,
  sahilYolu: sadelestir(yon, 0.8),
  dondurmaciKizlar: dk,
  adaTepesi: tepe,
};
process.stdout.write(
  `// Üretilmiş dosya, elle düzenlenmez: araclar/haritaUret.mjs (KKM'deki Düzada haritasından).\n` +
  `// Birim 100 m; kuzey yukarıda. Yalnız künyedeki adlar.\n` +
  `export const HARITA = ${JSON.stringify(cikti)} as const;\n`,
);
