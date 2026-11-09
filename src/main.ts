// Giriş noktası: oyunu sayfaya kurar.
// Yazı tipi: Poppins (açık lisanslı, OFL; Kemal 5 Kasım 2026: "ilk adımla" eklensin).
// Yalnız Latin ve Türkçe harfler; kullanılan kalınlıklar.
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-ext-400.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-ext-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/poppins/latin-ext-700.css';
import '@fontsource/poppins/latin-800.css';
import '@fontsource/poppins/latin-ext-800.css';
import './stil.css';
import { Oyun } from './oyun';
import { dilAl } from './dil';

document.documentElement.lang = dilAl();

const kok = document.getElementById('kok');
if (kok) {
  const oyun = new Oyun(kok);
  // Ekran denetimi (araclar/ekran-denetimi.cjs) yalnız "?denetim" adresinde oyuna erişir.
  if (location.search.includes('denetim')) (window as unknown as { dkLite: Oyun }).dkLite = oyun;
}
// iPhone'da düğmenin basılı görünümü (:active) ancak sayfada bir dokunma dinleyicisi
// varsa çalışır; bu boş dinleyici yalnız onu açar, hiçbir şey yapmaz.
document.addEventListener('touchstart', () => {}, { passive: true });

// iPhone Safari "yakınlaştırma kapalı" ayarını dinlemiyor (Kemal, 9 Kasım: kardeşinin iPhone'unda
// 2. bölümde oyun büyüdü, ekran kaydı). İki parmakla büyütme ve hızlı çift dokunuşla büyütme kapatılır.
for (const ad of ['gesturestart', 'gesturechange', 'gestureend']) {
  document.addEventListener(ad, (e) => e.preventDefault(), { passive: false });
}
let sonDokunus = 0;
document.addEventListener(
  'touchend',
  (e) => {
    const simdi = e.timeStamp;
    if (simdi - sonDokunus < 350 && e.touches.length === 0) {
      // Çift dokunuşun ikincisi: büyütmeyi engelle. Engellenince tarayıcı "tıklama" üretmez;
      // düğmeye hızlı ikinci dokunuş boşa gitmesin diye tıklama elle verilir.
      e.preventDefault();
      const hedef = e.target as HTMLElement | null;
      hedef?.closest<HTMLElement>('button, [role="button"], a')?.click();
    }
    sonDokunus = simdi;
  },
  { passive: false },
);
document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
