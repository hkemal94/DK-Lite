# Müşteri kıyafet çeşitleri, 2. adım (Kemal, 5 Kasım 2026 gecesi: "Desenler ve renkler";
# soru turunda desenler: "çizgili, puantiyeli, çiçekli, ekose"; parça parça renk).
# Her müşteri resminde kıyafetin bazı parçaları (renk aralığı ve boy aralığıyla seçilir)
# yeni bir renge boyanır ya da desen giydirilir; gölge ve çizgiler korunur.
# Yüz, saç, ten ve öbür kısımlar değişmez.
# Çıktı: public/gorseller/musteriler/musteri-NN-dK.webp ve src/musteriCesitleri.ts
# Çalıştırma: python3 araclar/musteri_desen.py
import os
import numpy as np
from PIL import Image

KOK = os.path.join(os.path.dirname(__file__), '..')
KLASOR = os.path.join(KOK, 'public', 'gorseller', 'musteriler')

RENK = {
    'kirmizi': (224, 72, 62), 'turuncu': (240, 138, 44), 'sari': (244, 196, 48),
    'yesil': (76, 175, 80), 'turkuaz': (43, 179, 177), 'mavi': (59, 111, 216),
    'mor': (142, 79, 200), 'pembe': (239, 106, 166), 'lacivert': (44, 62, 122),
    'krem': (243, 230, 200), 'beyaz': (247, 247, 242), 'bordo': (140, 36, 52),
}

# Parça: (renk açısı aralığı, en az doygunluk, boy aralığı [0-1, üstten]).
MAVI = (180, 265)
KISILER = {
    1: {'ust': (MAVI, 0.18, (0.0, 0.36)), 'alt': (MAVI, 0.18, (0.36, 1.0))},
    2: {'ust': ((38, 64), 0.28, (0.15, 0.50))},
    3: {'ust': (MAVI, 0.18, (0.0, 0.50)), 'alt': (MAVI, 0.18, (0.50, 1.0))},
    4: {'alt': (MAVI, 0.18, (0.0, 1.0))},
    5: {'ust': ((48, 80), 0.3, (0.15, 0.6)), 'alt': (MAVI, 0.18, (0.45, 1.0))},
    7: {'alt': (MAVI, 0.18, (0.0, 1.0))},
    8: {'ust': (MAVI, 0.18, (0.0, 0.45)), 'alt': ((28, 62), 0.8, (0.28, 0.95))},
    10: {'ust': (MAVI, 0.18, (0.0, 0.55)), 'alt': (MAVI, 0.18, (0.55, 1.0))},
}

# Çeşitler: parça -> düz renk ya da (desen, ana renk, ikinci renk). Desen yalnız
# geniş düz parçaya (etek, şort, pantolon, gömlek) giydirilir.
CESITLER = {
    1: [{'ust': 'kirmizi', 'alt': 'krem'}, {'ust': 'sari', 'alt': 'lacivert'}, {'ust': 'turkuaz', 'alt': ('puantiye', 'pembe', 'beyaz')},
        {'ust': 'mor', 'alt': ('ekose', 'kirmizi', 'krem')}],
    2: [{'ust': ('cizgili', 'mavi', 'beyaz')}, {'ust': ('cicekli', 'turkuaz', 'beyaz')}, {'ust': 'pembe'}, {'ust': ('ekose', 'yesil', 'krem')}],
    3: [{'ust': 'kirmizi', 'alt': 'sari'}, {'ust': 'yesil', 'alt': ('ekose', 'lacivert', 'kirmizi')}, {'ust': 'turuncu', 'alt': ('cizgili', 'turkuaz', 'beyaz')},
        {'ust': 'mor', 'alt': 'krem'}],
    4: [{'alt': ('puantiye', 'kirmizi', 'beyaz')}, {'alt': ('cicekli', 'sari', 'beyaz')}, {'alt': ('cizgili', 'pembe', 'beyaz')}, {'alt': ('ekose', 'turkuaz', 'beyaz')}],
    5: [{'ust': 'bordo', 'alt': 'krem'}, {'ust': ('ekose', 'kirmizi', 'lacivert'), 'alt': 'lacivert'}, {'ust': 'turuncu', 'alt': 'mavi'},
        {'ust': ('cizgili', 'mavi', 'beyaz'), 'alt': 'krem'}],
    7: [{'alt': ('ekose', 'kirmizi', 'krem')}, {'alt': ('puantiye', 'lacivert', 'beyaz')}, {'alt': ('cicekli', 'pembe', 'beyaz')}, {'alt': ('cizgili', 'sari', 'beyaz')}],
    8: [{'ust': 'kirmizi', 'alt': 'mavi'}, {'ust': 'yesil', 'alt': 'kirmizi'}, {'ust': 'mor', 'alt': 'turkuaz'}, {'alt': 'pembe', 'ust': 'lacivert'}],
    10: [{'ust': 'kirmizi', 'alt': 'krem'}, {'ust': 'yesil', 'alt': ('ekose', 'lacivert', 'yesil')}, {'ust': 'sari', 'alt': 'mavi'}, {'ust': 'turuncu', 'alt': 'lacivert'}],
}


def maske(a, hsv, parca):
    (h0, h1), smin, (y0, y1) = parca
    h = hsv[..., 0] * 360 / 255
    s = hsv[..., 1] / 255
    yy = np.arange(a.shape[0])[:, None] / a.shape[0]
    return (h >= h0) & (h <= h1) & (s > smin) & (a[..., 3] > 12) & (yy >= y0) & (yy < y1)


def desen(ad, w, h):
    # Resmin kendi pikselinde desen: True = ikinci renk.
    y, x = np.mgrid[0:h, 0:w]
    if ad == 'cizgili':
        return (y // 5) % 2 == 0
    if ad == 'puantiye':
        gx, gy = x % 9, (y + (x // 9 % 2) * 4) % 9
        return (gx - 4) ** 2 + (gy - 4) ** 2 <= 4
    if ad == 'ekose':
        return ((x // 6) % 2 == 0) ^ ((y // 6) % 2 == 0) | ((x % 12) == 0) | ((y % 12) == 0)
    if ad == 'cicekli':
        gx, gy = x % 12, (y + (x // 12 % 2) * 6) % 12
        d = (gx - 6) ** 2 + (gy - 6) ** 2
        yaprak = ((np.abs(gx - 6) <= 1) & (np.abs(gy - 6) <= 4)) | ((np.abs(gy - 6) <= 1) & (np.abs(gx - 6) <= 4))
        return yaprak & (d > 1)
    raise ValueError(ad)


def boya(im, cesit, parcalar):
    a = np.array(im.convert('RGBA'))
    rgb = a[..., :3].astype(np.float32)
    hsv = np.array(Image.fromarray(a[..., :3]).convert('HSV')).astype(np.int32)
    v = hsv[..., 2].astype(np.float32)
    for ad, hedef in cesit.items():
        m = maske(a, hsv, parcalar[ad])
        if m.sum() == 0:
            continue
        # Gölge: parçanın açık kısmına göre oran (çizgiler koyu kalır).
        ref = np.percentile(v[m], 80)
        golge = np.clip(v / max(ref, 1), 0, 1.15)[..., None]
        if isinstance(hedef, str):
            renk = np.broadcast_to(np.array(RENK[hedef], np.float32), rgb.shape)
        else:
            d, r1, r2 = hedef
            p = desen(d, a.shape[1], a.shape[0])[..., None]
            renk = np.where(p, np.array(RENK[r2], np.float32), np.array(RENK[r1], np.float32))
        rgb = np.where(m[..., None], np.clip(renk * golge, 0, 255), rgb)
    return Image.fromarray(np.dstack([rgb.astype(np.uint8), a[..., 3]]), 'RGBA')


dosyalar = []
for no, cesitler in CESITLER.items():
    kaynak = os.path.join(KLASOR, f'musteri-{no:02d}.webp')
    im = Image.open(kaynak)
    for k, cesit in enumerate(cesitler, 1):
        ad = f'musteri-{no:02d}-d{k}.webp'
        boya(im, cesit, KISILER[no]).save(os.path.join(KLASOR, ad), quality=88, method=6)
        dosyalar.append(ad)
        print(ad, cesit)

with open(os.path.join(KOK, 'src', 'musteriCesitleri.ts'), 'w') as f:
    f.write('// araclar/musteri_desen.py üretir; elle değiştirme.\n')
    f.write('// Müşteri kıyafet çeşitleri, 2. adım: parça parça renk ve desenler.\n')
    f.write('export const DESENLI_MUSTERILER = [\n')
    for d in dosyalar:
        f.write(f"  '{d}',\n")
    f.write('];\n')
