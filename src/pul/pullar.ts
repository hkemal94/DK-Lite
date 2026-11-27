// Pul görsellerinin kaydı (kart oyunundaki src/pul/pullar.ts ile aynı biçim). Anahtar oyundan
// bağımsız: "YYYY-AA" aylık pul, "YYYY-Q1".."YYYY-Q4" çeyreğin büyük pulu. Değer görselin yolu
// (public/ altından, ör. "pullar/2026-01.png") ya da null. Kayıtta olmayan ya da null olan pul
// yer tutucu çerçeveyle çizilecek (pul ekranı henüz yok).
//
// DK Lite'ın onaylı pulu henüz yok; kayıt bilerek boş. Her pul ayrı tasarlanır (tasarım belgesi
// 0.49). Kemal bir pulu onaylayınca yalnız buraya bir satır eklenir, ör. "2026-12": "pullar/2026-12.png";
// görselin kaynağı ve lisansı docs/lisanslar.md'ye yazılır.

export const PUL_GORSELLERI: Record<string, string | null> = {};

export const pulGorseli = (anahtar: string): string | null => PUL_GORSELLERI[anahtar] ?? null;
