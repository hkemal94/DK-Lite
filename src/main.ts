// Giriş noktası: oyunu sayfaya kurar.
import './stil.css';
import { Oyun } from './oyun';

const kok = document.getElementById('kok');
if (kok) new Oyun(kok);
