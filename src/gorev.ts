// Ayın görevi bağlantısı (tasarım belgesi 0.49 ve 0.50). Ayın büyük görevi henüz kodda yok; görev
// paketi gelince "bölüm kazan" sayımını buradan alır. Bilgi tek yerden gelir:
// - numaralı bölüm yalnız ilk kez kazanılınca 1 sayılır (tekrar oynanan sayılmaz; Kemal, 16 Kasım);
// - kazanılan her sonsuz bölüm yeni bir bölümdür, 1 sayılır (Kemal, S4);
// - 0. bölüm (ipuçlu başlangıç) ve kaybedilen bölüm sayılmaz; kaybetmek görevden bir şey düşürmez.

export type KazanilanBolum =
  | { tur: 'numarali'; no: number; ilkKez: boolean }
  | { tur: 'sonsuz'; asama: number };

// "Bölüm kazan" görevine bu kazancın katkısı (0 ya da 1).
export function gorevBolumSayisi(b: KazanilanBolum): number {
  if (b.tur === 'sonsuz') return 1;
  return b.no > 0 && b.ilkKez ? 1 : 0;
}

// ---------- "Bölüm kazan" sayacı (Kemal, 19 Kasım 2026 teyit: Sürekli Mod bölümleri sayılır) ----------
// Görev paketi henüz yok; bu sayaç yalnız gün gün kaç bölümün "bölüm kazan"a sayıldığını telefonda
// saklar. "Ay"ın takvim ayı mı olduğu açık soru (belge 7. bölüm); gün gün saklandığı için hangi karar
// gelirse gelsin ay toplamı buradan çıkar. Hedef sayı, ödül, ekran yok (görev paketi gelince).
const GOREV_ANAHTAR = 'dk-lite-gorev-bolum';

// Anahtar: telefonun yerel günü, "YYYY-AA-GG"; değer: o gün "bölüm kazan"a sayılan bölüm.
export type GunlukSayac = Record<string, number>;

function gunAnahtari(t: Date): string {
  const iki = (n: number) => String(n).padStart(2, '0');
  return `${t.getFullYear()}-${iki(t.getMonth() + 1)}-${iki(t.getDate())}`;
}

export function gorevSayaciOku(): GunlukSayac {
  const s: GunlukSayac = {};
  try {
    const h = JSON.parse(window.localStorage.getItem(GOREV_ANAHTAR) ?? 'null') as Record<string, unknown> | null;
    if (h && typeof h === 'object') {
      for (const [gun, deger] of Object.entries(h)) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(gun) && typeof deger === 'number' && Number.isFinite(deger) && deger > 0) {
          s[gun] = Math.floor(deger);
        }
      }
    }
  } catch {
    // Okunamadı; sayaç boş başlar.
  }
  return s;
}

// Bölüm bitince çağrılır: katkı (gorevBolumSayisi) 0'dan büyükse o günün sayısına eklenir.
// Kaybedilen ya da tekrar oynanan bölüm 0 getirir, hiçbir şey yazılmaz (görev cezasız).
export function gorevBolumEkle(katki: number, simdi: Date = new Date()): void {
  if (!(katki > 0)) return;
  const s = gorevSayaciOku();
  const gun = gunAnahtari(simdi);
  s[gun] = (s[gun] ?? 0) + katki;
  try {
    window.localStorage.setItem(GOREV_ANAHTAR, JSON.stringify(s));
  } catch {
    // Saklanamadı; görev cezasız olduğu için oyun sürer.
  }
}
