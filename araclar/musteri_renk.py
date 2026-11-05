# Müşteri renk çeşitleri (Kemal, 5 Kasım 2026: "insanlar çok güzel ... daha da
# çeşitlenme imkanı var mı? ... renkler ... işimize yarayabilir").
# Her müşteri resminde kıyafetin MAVİ kısımları başka renge çevrilir; yüz, saç,
# beyaz ve sarı kısımlar değişmez. Çıktı: public/gorseller/musteriler/musteri-NN-<renk>.webp
# Mavisi az olan resimden çeşit üretilmez (değişiklik görünmez).
# Çalıştırma: python3 araclar/musteri_renk.py
import glob, os
import numpy as np
from PIL import Image

KAYNAK = (180, 265)  # mavi tonların renk açısı aralığı (derece)
RENKLER = {'kirmizi': 0, 'mor': 290, 'yesil': 140, 'pembe': 330}
EN_AZ_MAVI = 0.04  # resmin görünen kısmının en az bu kadarı mavi olmalı

def degistir(im, hedef):
    a = np.array(im.convert('RGBA'))
    hsv = np.array(Image.fromarray(a[..., :3]).convert('HSV')).astype(np.int32)
    h = hsv[..., 0] * 360 / 255
    s = hsv[..., 1] / 255
    m = (h >= KAYNAK[0]) & (h <= KAYNAK[1]) & (s > 0.18) & (a[..., 3] > 12)
    kay = hedef - (KAYNAK[0] + KAYNAK[1]) / 2
    yeni = hsv.copy()
    yeni[..., 0] = np.where(m, (((h + kay) % 360) * 255 / 360).astype(np.int32), hsv[..., 0])
    rgb = np.array(Image.fromarray(yeni.astype(np.uint8), 'HSV').convert('RGB'))
    oran = m.sum() / max(1, (a[..., 3] > 12).sum())
    return Image.fromarray(np.dstack([rgb, a[..., 3]]), 'RGBA'), oran

kok = os.path.join(os.path.dirname(__file__), '..', 'public', 'gorseller', 'musteriler')
for f in sorted(glob.glob(os.path.join(kok, 'musteri-[0-9][0-9].webp'))):
    im = Image.open(f)
    ad = os.path.basename(f)[:-5]
    for renk, hedef in RENKLER.items():
        yeni, oran = degistir(im, hedef)
        hedef_dosya = os.path.join(kok, f'{ad}-{renk}.webp')
        if oran < EN_AZ_MAVI:
            if os.path.exists(hedef_dosya):
                os.remove(hedef_dosya)
            continue
        yeni.save(hedef_dosya, quality=88, method=6)
        print(ad, renk, f'mavi oranı {oran:.2f}')
