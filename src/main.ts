// Giriş noktası: oyunu sayfaya kurar.
import './stil.css';
import { Oyun } from './oyun';
import { haritaResminiOnYukle } from './harita';

const kok = document.getElementById('kok');
if (kok) new Oyun(kok);
haritaResminiOnYukle();
// iPhone'da düğmenin basılı görünümü (:active) ancak sayfada bir dokunma dinleyicisi
// varsa çalışır; bu boş dinleyici yalnız onu açar, hiçbir şey yapmaz.
document.addEventListener('touchstart', () => {}, { passive: true });
