// Ayar dosyası denetimi (src/veri/oyun-ayarlari.json). KKM'deki panel bu dosyayı değiştirir;
// yanlış bir değer oyunu bozmasın diye derlemeden önce burada denetlenir (npm run build bunu
// önce çalıştırır; sorun varsa derleme durur, oyun yayına çıkmaz).
// Çalıştırma: node araclar/ayar-denetimi.mjs   (sorun yoksa "Ayar dosyası temiz" yazar)
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOSYA = join(KOK, 'src/veri/oyun-ayarlari.json');
const sorunlar = [];
const sorun = (yer, yazi) => sorunlar.push(`${yer}: ${yazi}`);

let a;
try {
  a = JSON.parse(readFileSync(DOSYA, 'utf8'));
} catch (e) {
  console.error('Ayar dosyası okunamadı (biçim bozuk):', e.message);
  process.exit(1);
}

const tamSayi = (x) => Number.isInteger(x);
const pozitif = (x) => tamSayi(x) && x > 0;
const oran = (x) => typeof x === 'number' && x >= 0 && x <= 1;
const renk = (x) => typeof x === 'string' && /^#[0-9a-fA-F]{6}$/.test(x);
const dosyaVar = (yol) => existsSync(join(KOK, 'public', yol));
const css = readFileSync(join(KOK, 'src/stil.css'), 'utf8');

// Bölüm sayısı ve lokasyonlar
if (!pozitif(a.bolumSayisi)) sorun('bolumSayisi', 'pozitif tam sayı olmalı');
const lok = a.lokasyon ?? {};
if (!pozitif(lok.bolumSayisi)) sorun('lokasyon.bolumSayisi', 'pozitif tam sayı olmalı');
if (!pozitif(lok.acmaYildizi)) sorun('lokasyon.acmaYildizi', 'pozitif tam sayı olmalı');
else if (pozitif(lok.bolumSayisi) && lok.acmaYildizi > lok.bolumSayisi * 3)
  sorun('lokasyon.acmaYildizi', `bir lokasyonda en çok ${lok.bolumSayisi * 3} yıldız var; ${lok.acmaYildizi} toplanamaz`);
const gerekenLokasyon = Math.ceil((a.bolumSayisi || 0) / (lok.bolumSayisi || 1));
if (!Array.isArray(lok.liste) || lok.liste.length < gerekenLokasyon)
  sorun('lokasyon.liste', `${gerekenLokasyon} lokasyon gerekiyor (bölüm sayısı ÷ lokasyondaki bölüm), ${lok.liste?.length ?? 0} var`);
(lok.liste ?? []).forEach((l, i) => {
  if (!l.ad || typeof l.ad !== 'string') sorun(`lokasyon.liste[${i}]`, 'adı boş');
  if (!renk(l.renk)) sorun(`lokasyon.liste[${i}] (${l.ad})`, `renk "#rrggbb" biçiminde olmalı ("${l.renk}")`);
  if (l.resim && !dosyaVar(l.resim)) sorun(`lokasyon.liste[${i}] (${l.ad})`, `resim yok: public/${l.resim}`);
});

// Ürünler
const urunId = new Set();
(a.urunler ?? []).forEach((u, i) => {
  const yer = `urunler[${i}] (${u.id})`;
  if (!u.id || !/^[a-z0-9-]+$/.test(u.id)) sorun(yer, 'id yalnız küçük harf, rakam ve "-" olmalı');
  if (urunId.has(u.id)) sorun(yer, 'aynı id iki kez');
  urunId.add(u.id);
  if (!u.ad) sorun(yer, 'adı boş');
  if (!['dondurma', 'tatli', 'icecek'].includes(u.tur)) sorun(yer, 'tür "dondurma", "tatli" ya da "icecek" olmalı');
  if (!renk(u.renk)) sorun(yer, 'renk "#rrggbb" biçiminde olmalı');
  if (!dosyaVar(`gorseller/urunler/${u.id}.webp`)) sorun(yer, `resmi yok: public/gorseller/urunler/${u.id}.webp`);
});
const urun = (id) => (a.urunler ?? []).find((u) => u.id === id);

// Başlangıç ürünleri ve hediyeler
const bas = a.baslangicUrunleri ?? [];
bas.forEach((id) => { if (!urunId.has(id)) sorun('baslangicUrunleri', `"${id}" ürünlerde yok`); });
if (bas.filter((id) => urun(id)?.tur === 'dondurma').length < 2) sorun('baslangicUrunleri', 'en az iki dondurma olmalı');
const hediyeBolumu = new Map();
let onceki = -1;
(a.hediyeler ?? []).forEach((h, i) => {
  const yer = `hediyeler[${i}] (${h.urun})`;
  if (!urunId.has(h.urun)) sorun(yer, 'ürünlerde yok');
  if (bas.includes(h.urun)) sorun(yer, 'başlangıç ürünü hediye olamaz');
  if (hediyeBolumu.has(h.urun)) sorun(yer, 'aynı ürün iki kez hediye');
  if (!tamSayi(h.bolum) || h.bolum < 0 || h.bolum >= a.bolumSayisi) sorun(yer, `bölüm 0 ile ${a.bolumSayisi - 1} arasında olmalı`);
  if (h.bolum <= onceki) sorun(yer, 'hediye bölümleri artan sırada olmalı (aynı bölüme iki hediye olmaz)');
  onceki = h.bolum;
  hediyeBolumu.set(h.urun, h.bolum);
});
for (const id of urunId) if (!bas.includes(id) && !hediyeBolumu.has(id)) sorun(`urunler (${id})`, 'ne başlangıçta ne hediyede; oyunda hiç gelmez');
const acikMi = (id, no) => bas.includes(id) || (hediyeBolumu.has(id) && no > hediyeBolumu.get(id));
if (!pozitif(a.yeniUrun?.sayi)) sorun('yeniUrun.sayi', 'pozitif tam sayı olmalı');
if (!pozitif(a.yeniUrun?.sure)) sorun('yeniUrun.sure', 'pozitif tam sayı olmalı');

// Para ve mağaza
const p = a.para ?? {};
for (const k of ['yildiz', 'gunluk', 'gunluk7', 'kart']) if (!tamSayi(p[k]) || p[k] < 0) sorun(`para.${k}`, '0 ya da pozitif tam sayı olmalı');
if (!Array.isArray(p.sandik) || p.sandik.length !== 2 || !(p.sandik[0] <= p.sandik[1])) sorun('para.sandik', '[en az, en çok] olmalı');
const m = a.magaza ?? {};
for (const k of ['yardimciFiyati', 'canFiyati', 'temaFiyati', 'kostumFiyati']) if (!pozitif(m[k])) sorun(`magaza.${k}`, 'pozitif tam sayı olmalı');
const tekId = (liste, yer) => {
  const g = new Set();
  (liste ?? []).forEach((x, i) => {
    if (!x.id || !x.ad) sorun(`${yer}[${i}]`, 'id ve ad dolu olmalı');
    if (g.has(x.id)) sorun(`${yer}[${i}]`, `"${x.id}" iki kez`);
    g.add(x.id);
  });
  if (!liste?.length) sorun(yer, 'en az bir tane olmalı');
};
tekId(m.temalar, 'magaza.temalar');
tekId(m.kostumler, 'magaza.kostumler');
(m.temalar ?? []).slice(1).forEach((x) => {
  if (!css.includes(`data-tema="${x.id}"`)) sorun(`magaza.temalar (${x.id})`, 'bu temanın görünüşü stil.css\'te yok (yeni tema için ekipten CSS gerekir)');
});
(m.kostumler ?? []).forEach((x, i) => {
  const resim = i === 0 ? 'gorseller/tezgah/dondurmaci.webp' : `gorseller/tezgah/dondurmaci-${x.id}.webp`;
  if (!dosyaVar(resim)) sorun(`magaza.kostumler (${x.id})`, `resmi yok: public/${resim}`);
});

// Bölüm ayarları
const b = a.bolumler ?? {};
(b.ilkBolumler ?? []).forEach((z, i) => {
  const no = i + 1;
  const yer = `bolumler.ilkBolumler[${i}] (bölüm ${no})`;
  for (const k of ['sutun', 'cesit', 'musteri', 'istekEnAz', 'istekEnCok', 'bantYeri']) if (!pozitif(z[k])) sorun(yer, `${k} pozitif tam sayı olmalı`);
  if (z.istekEnAz > z.istekEnCok) sorun(yer, 'istekEnAz, istekEnCok\'tan büyük olamaz');
  if (!oran(z.ikiCesitOrani)) sorun(yer, 'ikiCesitOrani 0 ile 1 arasında olmalı');
  // Bölümde o ana kadar açılmış çeşit sayısından fazlası istenemez.
  const acik = [...urunId].filter((id) => acikMi(id, no)).length;
  if (z.cesit > acik) sorun(yer, `çeşit ${z.cesit}, ama bu bölümde açılmış ürün ${acik}`);
});
const k = b.kural ?? {};
if (!(pozitif(k.musteri?.baslangic) && pozitif(k.musteri?.herKacBolumdeBir) && pozitif(k.musteri?.enCok))) sorun('bolumler.kural.musteri', 'baslangic, herKacBolumdeBir, enCok pozitif tam sayı olmalı');
for (const ad of ['cesit', 'bantYeri', 'ikiCesitOrani']) {
  const satir = k[ad];
  if (!Array.isArray(satir) || !satir.length) { sorun(`bolumler.kural.${ad}`, 'en az bir satır olmalı'); continue; }
  satir.forEach((s, i) => {
    if (i > 0 && s.bolumden <= satir[i - 1].bolumden) sorun(`bolumler.kural.${ad}[${i}]`, '"bolumden" artan sırada olmalı');
    if (ad === 'ikiCesitOrani' ? !oran(s.deger) : !pozitif(s.deger)) sorun(`bolumler.kural.${ad}[${i}]`, 'değer geçersiz');
  });
}
for (const ad of ['zor', 'cokZor']) if (!b[ad] || !tamSayi(b[ad].musteri) || !tamSayi(b[ad].bantEksik) || !oran(b[ad].ikiCesit)) sorun(`bolumler.${ad}`, 'musteri, bantEksik tam sayı; ikiCesit 0–1 olmalı');
const y = b.yeniOgeler ?? {};
for (const ad of ['buzluTop', 'gizliTop', 'aceleciMusteri', 'kilitliSutun']) {
  if (!y[ad] || !pozitif(y[ad].bolum) || y[ad].bolum > a.bolumSayisi) sorun(`bolumler.yeniOgeler.${ad}`, `bölüm 1 ile ${a.bolumSayisi} arasında olmalı`);
  if (ad !== 'kilitliSutun' && !oran(y[ad]?.oran)) sorun(`bolumler.yeniOgeler.${ad}`, 'oran 0 ile 1 arasında olmalı');
}

if (sorunlar.length) {
  console.error(`Ayar dosyasında ${sorunlar.length} sorun var (src/veri/oyun-ayarlari.json):`);
  for (const s of sorunlar) console.error('  - ' + s);
  process.exit(1);
}
console.log('Ayar dosyası temiz.');
