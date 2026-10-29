// Ürün simgeleri: dondurma topları, tatlılar ve içecekler.
// 7. paket (Kemal, 30 Ekim: "Parlak cizgi film iyi"; tasarım belgesi 0.16):
// parlak çizgi film tarzında el çizimi resimler, Canva ile çizildi
// (public/gorseller/urunler/, kaynak: docs/lisanslar.md).

import { URUNLER } from './ayarlar';

// Ürün sırasına (URUNLER) göre simge (yazı olarak; topun yuvarlak yerine oturur).
export function urunSimgesi(cesit: number): string {
  const u = URUNLER[cesit];
  return `<img src="gorseller/urunler/${u.id}.webp" alt="" draggable="false">`;
}
