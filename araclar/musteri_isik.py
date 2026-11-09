# Müşteri ışığını eşitler (Kemal, 9 Kasım 2026: "müşterilerin ışıklandırmaları vurguları bir değil
# birbirlerine"; seçim "Hepsine aynı ışık ayarı").
# 1) Hepsine aynı yönden ışık: üst biraz aydınlık, alt biraz gölgeli.
# 2) Gölge-ışık geçişi (yerel kontrast) zayıf olan çizimler ilk 10 kişinin ortalamasına çıkarılır.
# Asıl çizimler araclar/musteri-kaynak/ içinde durur; araç her seferinde onlardan başlar.
# En sonda kenardaki beyaz hâle temizlenir (kenar_temizle.py).
# Sonra renk ve desen çeşitleri yeniden üretilmeli: musteri_renk.py, musteri_desen.py.
# Çalıştırma: python3 araclar/musteri_isik.py
import glob, os
import numpy as np
from PIL import Image, ImageFilter
from kenar_temizle import temizle  # kenardaki beyaz hâle (9 Kasım)

KOK = os.path.dirname(__file__)
KAYNAK = os.path.join(KOK, 'musteri-kaynak')
HEDEF = os.path.join(KOK, '..', 'public', 'gorseller', 'musteriler')
UST, ALT = 1.05, 0.93  # yukarıdan ışık: üstte çarpan, altta çarpan

def yerel_kontrast(L, m):
    B = np.array(Image.fromarray(L.astype('uint8')).filter(ImageFilter.GaussianBlur(6))).astype(float)
    return np.abs(L - B)[m].mean(), B

def ic_maske(a):
    return np.array(Image.fromarray((a[..., 3] > 200).astype('uint8') * 255).filter(ImageFilter.MinFilter(7))) > 0

dosyalar = sorted(glob.glob(os.path.join(KAYNAK, 'musteri-[0-9][0-9].webp')))
olcu = {}
for f in dosyalar:
    a = np.array(Image.open(f).convert('RGBA')); L = np.array(Image.open(f).convert('L')).astype(float)
    olcu[f], _ = yerel_kontrast(L, ic_maske(a))
hedef = np.mean([olcu[f] for f in dosyalar[:10]])

for f in dosyalar:
    im = Image.open(f).convert('RGBA'); a = np.array(im).astype(float)
    rgb = a[..., :3]
    # 2) yerel kontrast: rgb + k * (rgb - bulanık)
    k = float(np.clip(hedef / max(olcu[f], 1) - 1, 0, 0.8))
    if k > 0:
        bul = np.array(im.convert('RGB').filter(ImageFilter.GaussianBlur(6))).astype(float)
        rgb = rgb + k * (rgb - bul)
    # 1) yukarıdan ışık
    H = a.shape[0]
    ys = np.where(a[..., 3] > 20)[0]
    y0, y1 = ys.min(), ys.max()
    t = np.clip((np.arange(H) - y0) / max(1, y1 - y0), 0, 1)[:, None, None]
    rgb = rgb * (UST + (ALT - UST) * t)
    a[..., :3] = np.clip(rgb, 0, 255)
    ad = os.path.basename(f)
    temizle(Image.fromarray(a.astype('uint8'), 'RGBA')).save(os.path.join(HEDEF, ad), quality=88, method=6)
    print(ad, f'yerel kontrast {olcu[f]:.1f} -> hedef {hedef:.1f}, k={k:.2f}')
