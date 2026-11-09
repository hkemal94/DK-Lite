// Para, mağaza, rozetler ve sayaçlar (tasarım belgesi 0.39). Telefonda saklanır.
import { KOSTUMLER, TEMALAR, type Kostum, type Tema } from './ayarlar';

const ANAHTAR = 'dk-lite-koleksiyon';

interface KoleksiyonKaydi {
  para: number;
  temalar: Tema[]; // alınan temalar
  tema: Tema; // seçili tema
  kostumler: Kostum[]; // alınan kostümler
  kostum: Kostum; // dondurmacının giydiği
  rozetler: string[]; // alınan rozetler
  musteri: number; // toplam hizmet edilen müşteri
  enUzunSeri: number;
  gunlukSeri: number; // art arda alınan günlük ödül (en çok)
  eskiYildizParasi: boolean;
  kartlar: number[]; // açılan lokasyon kartları (ödülü verildi) // para gelmeden önce toplanan yıldızların parası verildi mi
}

let bellek: KoleksiyonKaydi | null = null;

export function koleksiyon(): KoleksiyonKaydi {
  if (bellek) return bellek;
  const k: KoleksiyonKaydi = { para: 0, temalar: ['mor'], tema: 'mor', kostumler: ['klasik'], kostum: 'klasik', rozetler: [], musteri: 0, enUzunSeri: 0, gunlukSeri: 0, eskiYildizParasi: false, kartlar: [] };
  try {
    const h = JSON.parse(window.localStorage.getItem(ANAHTAR) ?? 'null') as Partial<KoleksiyonKaydi> | null;
    if (h) {
      if (Number.isFinite(h.para)) k.para = Math.max(0, Math.floor(h.para!));
      if (Array.isArray(h.temalar)) k.temalar = h.temalar.filter((t): t is Tema => (TEMALAR as readonly string[]).includes(t));
      if (!k.temalar.includes('mor')) k.temalar.unshift('mor');
      if (h.tema && k.temalar.includes(h.tema)) k.tema = h.tema;
      if (Array.isArray(h.kostumler)) k.kostumler = h.kostumler.filter((x): x is Kostum => (KOSTUMLER as readonly string[]).includes(x));
      if (!k.kostumler.includes('klasik')) k.kostumler.unshift('klasik');
      if (h.kostum && k.kostumler.includes(h.kostum)) k.kostum = h.kostum;
      if (Array.isArray(h.rozetler)) k.rozetler = h.rozetler.filter((r) => typeof r === 'string');
      if (Number.isFinite(h.musteri)) k.musteri = Math.max(0, Math.floor(h.musteri!));
      if (Number.isFinite(h.enUzunSeri)) k.enUzunSeri = Math.max(0, Math.floor(h.enUzunSeri!));
      if (Array.isArray(h.kartlar)) k.kartlar = h.kartlar.filter((x) => Number.isInteger(x));
      if (h.eskiYildizParasi === true) k.eskiYildizParasi = true;
      if (Number.isFinite(h.gunlukSeri)) k.gunlukSeri = Math.max(0, Math.floor(h.gunlukSeri!));
    }
  } catch {
    // Okunamadı; baştan başlar.
  }
  bellek = k;
  return k;
}

export function kaydet(): void {
  try {
    window.localStorage.setItem(ANAHTAR, JSON.stringify(koleksiyon()));
  } catch {
    // Saklanamadı; bellekte kalır.
  }
}

export function paraEkle(n: number): void {
  koleksiyon().para += Math.max(0, Math.round(n));
  kaydet();
}

export function paraHarca(n: number): boolean {
  const k = koleksiyon();
  if (k.para < n) return false;
  k.para -= n;
  kaydet();
  return true;
}
