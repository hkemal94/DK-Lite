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

const kok = document.getElementById('kok');
if (kok) new Oyun(kok);
// iPhone'da düğmenin basılı görünümü (:active) ancak sayfada bir dokunma dinleyicisi
// varsa çalışır; bu boş dinleyici yalnız onu açar, hiçbir şey yapmaz.
document.addEventListener('touchstart', () => {}, { passive: true });
