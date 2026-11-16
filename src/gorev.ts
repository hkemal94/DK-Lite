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
