// Pul koleksiyonu: 3+1 pul serisinin saf hesabı (Kemal, 15 Kasım akşam). Oyundan bağımsız:
// girdi yalnız "kazanılan aylar" ("YYYY-AA" listesi) ve bugün; bu klasörde oyuna özgü hiçbir şey yok.
// Ortak kurallar: Kems Ajans docs/pul-koleksiyonu.md. Hesap kart oyunundaki src/pul/seri.ts ile aynı.
//
// - Her kazanılan ay bir pul.
// - Bir çeyreğin (Ocak–Mart, Nisan–Haziran, Temmuz–Eylül, Ekim–Aralık) üç aylık pulu toplanınca
//   daha büyük ve süslü 4. pul gelir.
// - Durumlar: kazanildi; eksik (ay geldi ya da geçti, henüz kazanılmadı; geçmiş ay sonradan da
//   kazanılabilir); gelecek (ay henüz gelmedi, kilitli).

export type PulDurumu = 'kazanildi' | 'eksik' | 'gelecek';
export type Ceyrek = 1 | 2 | 3 | 4;

export interface AyPulu {
  anahtar: string; // "2026-01"
  yil: number;
  ay: number; // 1–12
  durum: PulDurumu;
}

export interface CeyrekPullari {
  anahtar: string; // büyük pulun anahtarı: "2026-Q1"
  yil: number;
  ceyrek: Ceyrek;
  aylar: [AyPulu, AyPulu, AyPulu];
  buyuk: PulDurumu;
}

export interface YilPullari {
  yil: number;
  ceyrekler: CeyrekPullari[];
}

export interface PulKoleksiyonu {
  yillar: YilPullari[]; // eskiden yeniye
  ayPulu: number; // kazanılan aylık pul sayısı
  buyukPul: number; // kazanılan büyük pul sayısı
}

const iki = (n: number) => String(n).padStart(2, '0');
export const ayAnahtari = (yil: number, ay: number) => `${yil}-${iki(ay)}`;
export const ceyrekAnahtari = (yil: number, ceyrek: Ceyrek) => `${yil}-Q${ceyrek}`;
export const ayinCeyregi = (ay: number) => Math.ceil(ay / 3) as Ceyrek;
// Çeyreğin ayları: 1 → [1, 2, 3]
export const ceyreginAylari = (c: Ceyrek): [number, number, number] => [c * 3 - 2, c * 3 - 1, c * 3];

const AY_BICIMI = /^\d{4}-(0[1-9]|1[0-2])$/;

// Bugün "YYYY-AA-GG" ya da "YYYY-AA" olabilir; yalnız ayı kullanılır
const buAy = (bugun: string) => bugun.slice(0, 7);

function ayDurumu(anahtar: string, kazanilan: Set<string>, bugunAy: string): PulDurumu {
  if (kazanilan.has(anahtar)) return 'kazanildi';
  return anahtar > bugunAy ? 'gelecek' : 'eksik';
}

// Koleksiyonun bütün hâli: ilk yıldan (oyunun takvimi nereden başlıyorsa) bugünün yılına kadar her
// yıl, her yılda dört çeyrek. Gelecekteki bir ay kazanılmış görünmez (telefon saati geri alınsa da).
export function pulDurumu(kazanilanAylar: string[], bugun: string, ilkYil: number): PulKoleksiyonu {
  const bugunAy = buAy(bugun);
  const kazanilan = new Set(kazanilanAylar.filter((a) => AY_BICIMI.test(a) && a <= bugunAy));
  const sonYil = Math.max(ilkYil, Number(bugunAy.slice(0, 4)));
  const yillar: YilPullari[] = [];
  let ayPulu = 0;
  let buyukPul = 0;
  for (let yil = ilkYil; yil <= sonYil; yil++) {
    const ceyrekler = ([1, 2, 3, 4] as Ceyrek[]).map((ceyrek): CeyrekPullari => {
      const aylar = ceyreginAylari(ceyrek).map((ay) => {
        const anahtar = ayAnahtari(yil, ay);
        return { anahtar, yil, ay, durum: ayDurumu(anahtar, kazanilan, bugunAy) };
      }) as [AyPulu, AyPulu, AyPulu];
      const buyuk: PulDurumu = aylar.every((a) => a.durum === 'kazanildi')
        ? 'kazanildi'
        : aylar.some((a) => a.durum === 'gelecek')
          ? 'gelecek'
          : 'eksik';
      ayPulu += aylar.filter((a) => a.durum === 'kazanildi').length;
      if (buyuk === 'kazanildi') buyukPul++;
      return { anahtar: ceyrekAnahtari(yil, ceyrek), yil, ceyrek, aylar, buyuk };
    });
    yillar.push({ yil, ceyrekler });
  }
  return { yillar, ayPulu, buyukPul };
}

// Bir ay ("YYYY-AA") kazanılınca o ayın çeyreği de tamamlandı mı (büyük pul geldi mi)
export function ceyrekTamamMi(kazanilanAylar: string[], ay: string): boolean {
  if (!AY_BICIMI.test(ay)) return false;
  const yil = Number(ay.slice(0, 4));
  const kazanilan = new Set(kazanilanAylar);
  return ceyreginAylari(ayinCeyregi(Number(ay.slice(5, 7)))).every((a) => kazanilan.has(ayAnahtari(yil, a)));
}
