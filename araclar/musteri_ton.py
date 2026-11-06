# Müşteri tonlarını eşitleme (Kemal, 6 Kasım 2026: "Müşteri tonları tutmuyor",
# seçimi "önce eşitle"). Çizimler değişmez; yalnız her kişinin beyaz noktası
# (beyaz bölgelerin ortalama rengi), genel parlaklığı ve renk canlılığı ortak bir
# hedefe çekilir. Saydam kenarlar (alfa) olduğu gibi kalır.
#
# Düzeltme her kişinin ASIL resminden (musteri-NN.webp) ölçülür ve aynı düzeltme
# o kişinin bütün çeşitlerine (renk ve desen; musteri-NN-*.webp) uygulanır; böylece
# çeşitler asıl resimle aynı tonda kalır.
#
# Tekrar çalıştırmak güvenlidir: eşitlenen her dosyanın parmak izi ve kişinin düzeltme
# ayarı araclar/musteri_ton_kayit.json'a yazılır; kayıttaki dosyaya ikinci kez
# dokunulmaz (düzeltme üst üste binmez). Yeni bir kişi ya da Canva'dan yenilenen bir
# asıl resim eklenince yalnız o kişi (ve çeşitleri) eşitlenir. Çeşitler eşitlenmiş asıl
# resimden yeniden üretilirse (musteri_renk.py, musteri_desen.py) zaten eşittir;
# bu araç onlara dokunmaz.
#
# Çalıştırma:
#   python3 araclar/musteri_ton.py olc      # yalnız ölçer, tablo basar
#   python3 araclar/musteri_ton.py esitle   # ölçer, düzeltir, sonrasını ölçer
# Orijinaller git geçmişinde durur.
import glob
import hashlib
import json
import os
import sys

import numpy as np
from PIL import Image

KLASOR = os.path.join(os.path.dirname(__file__), '..', 'public', 'gorseller', 'musteriler')
KAYIT = os.path.join(os.path.dirname(__file__), 'musteri_ton_kayit.json')

# Ortak hedef (ölçüm birimi CIELAB; L 0-100 parlaklık, C renk canlılığı).
# Sayılar ilk ölçümden (6 Kasım 2026, 21 kişi) seçildi; tekrar çalıştırınca hedef
# kaymasın diye sabit yazıldı.
# Beyaz noktası: kar beyazı ile krem arası, hafif sıcak kırık beyaz.
HEDEF_BEYAZ = (94.0, 0.5, 4.0)   # L, a, b
HEDEF_SIYAH = 3.0                 # çizgilerin parlaklığı (en koyu %3); ilk ölçümün ortancası
HEDEF_PARLAKLIK = 51.9            # ortalama L; ilk ölçümün ortancası
HEDEF_CANLILIK = 36.2             # ortalama C; ilk ölçümün ortancası
# Ortalama parlaklık ve canlılık kıyafet ve ten rengine de bağlı (siyah tişört,
# açık mavi elbise, gri yelek). Tam eşitlemek çizimi bozar; bu yüzden bu ikisi
# hedefe doğru çekilir ama sınır içinde kalır:
GAMMA_SINIR = (0.92, 1.08)        # parlaklık eğrisi
CANLILIK_SINIR = (0.92, 1.10)     # renk canlılığı katsayısı
BEYAZ_SINIR = 8.0                 # beyaz noktası kaydırması en çok bu kadar (a, b)


# --- renk dönüşümleri (sRGB <-> CIELAB, D65) ---
def _lin(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def _gam(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


_M = np.array([[0.4124564, 0.3575761, 0.1804375],
               [0.2126729, 0.7151522, 0.0721750],
               [0.0193339, 0.1191920, 0.9503041]])
_MI = np.linalg.inv(_M)
_W = np.array([0.95047, 1.0, 1.08883])


def rgb_lab(rgb):
    xyz = _lin(rgb / 255.0) @ _M.T / _W
    f = np.where(xyz > (6 / 29) ** 3, np.cbrt(xyz), xyz / (3 * (6 / 29) ** 2) + 4 / 29)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)


def lab_rgb(lab):
    fy = (lab[..., 0] + 16) / 116
    fx = fy + lab[..., 1] / 500
    fz = fy - lab[..., 2] / 200
    f = np.stack([fx, fy, fz], -1)
    xyz = np.where(f > 6 / 29, f ** 3, 3 * (6 / 29) ** 2 * (f - 4 / 29)) * _W
    return np.round(_gam(xyz @ _MI.T) * 255).astype(np.uint8)


def de2000(l1, l2):
    """CIEDE2000 renk farkı (iki Lab üçlüsü)."""
    L1, a1, b1 = l1
    L2, a2, b2 = l2
    C1, C2 = np.hypot(a1, b1), np.hypot(a2, b2)
    Cm = (C1 + C2) / 2
    G = 0.5 * (1 - np.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1p = np.degrees(np.arctan2(b1, a1p)) % 360
    h2p = np.degrees(np.arctan2(b2, a2p)) % 360
    dLp, dCp = L2 - L1, C2p - C1p
    dh = h2p - h1p
    if C1p * C2p == 0:
        dh = 0
    elif dh > 180:
        dh -= 360
    elif dh < -180:
        dh += 360
    dHp = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dh / 2))
    Lm, Cmp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0:
        hm = h1p + h2p
    elif abs(h1p - h2p) <= 180:
        hm = (h1p + h2p) / 2
    else:
        hm = (h1p + h2p + 360) / 2 if h1p + h2p < 360 else (h1p + h2p - 360) / 2
    T = (1 - 0.17 * np.cos(np.radians(hm - 30)) + 0.24 * np.cos(np.radians(2 * hm))
         + 0.32 * np.cos(np.radians(3 * hm + 6)) - 0.20 * np.cos(np.radians(4 * hm - 63)))
    dth = 30 * np.exp(-(((hm - 275) / 25) ** 2))
    Rc = 2 * np.sqrt(Cmp ** 7 / (Cmp ** 7 + 25 ** 7))
    Sl = 1 + 0.015 * (Lm - 50) ** 2 / np.sqrt(20 + (Lm - 50) ** 2)
    Sc = 1 + 0.045 * Cmp
    Sh = 1 + 0.015 * Cmp * T
    Rt = -np.sin(np.radians(2 * dth)) * Rc
    return float(np.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh)))


# --- ölçüm ---
def beyaz_maske(a):
    """Beyaz bölge: açık, az renkli; krem de beyaz sayılır, açık mavi ve pembe sayılmaz."""
    lab = rgb_lab(a[..., :3].astype(np.float64))
    return ((a[..., 3] > 200) & (lab[..., 0] > 82) & (np.hypot(lab[..., 1], lab[..., 2]) < 16)
            & (lab[..., 1] > -4) & (lab[..., 1] < 5) & (lab[..., 2] > -7))


def olc(a, maske=None):
    """a: RGBA dizi. Dönüş: beyaz (L,a,b), parlaklık (ort. L), canlılık (ort. C),
    siyah noktası (en koyu %3'ün ortalama L'si)."""
    gor = a[..., 3] > 200          # yarı saydam kenarlar ölçüme girmez
    tum = rgb_lab(a[..., :3].astype(np.float64))
    lab = tum[gor]
    C = np.hypot(lab[:, 1], lab[:, 2])
    # beyaz bölge; düzeltme sırasında hep aynı pikseller (asıl resimden) ölçülür
    bey = beyaz_maske(a) if maske is None else maske
    beyaz = tum[bey].mean(0) if bey.sum() > 30 else np.array([np.nan] * 3)
    siyah = float(lab[lab[:, 0] <= np.percentile(lab[:, 0], 3), 0].mean())
    return beyaz, float(lab[:, 0].mean()), float(C.mean()), siyah


# --- düzeltme ---
def uygula(a, p):
    """p = (gamma, canlılık katsayısı, da, db, L ölçeği, siyah noktası). Alfa değişmez."""
    g, k, da, db, ls, sk = p
    lab = rgb_lab(a[..., :3].astype(np.float64))
    L = np.clip(lab[..., 0], 0, 100)
    # 1) parlaklık: uçları sabit eğri (siyah çizgi siyah, beyaz beyaz kalır)
    L = 100 * (L / 100) ** g
    # 2) siyah noktası: soluk (açık kahve) çizgiler hedef koyuluğa iner. Yalnız koyu
    #    tonlar değişir (L 50'nin üstü, yani ten, kıyafet ve beyaz yerinde kalır).
    L = np.interp(L, [0, sk, 50, 100], [0, HEDEF_SIYAH, 50, 100])
    # 3) beyaz parlaklığı: yalnız açık tonlara etki eden ölçek
    w = np.clip((L - 60) / 30, 0, 1)
    L = np.clip(L * (1 + (ls - 1) * w), 0, 100)
    # 4) canlılık: renk uzaklığını ölçekle
    A, B = lab[..., 1] * k, lab[..., 2] * k
    # 5) beyaz noktası: açık tonlarda renk kaydırması (koyu çizgiler etkilenmez)
    #    Doygun renkler (kırmızı tişört, turuncu gömlek) kaymasın diye yalnız az renkli
    #    tonlara etki eder.
    w2 = np.clip((L - 35) / 50, 0, 1) * np.clip(1 - np.hypot(A, B) / 35, 0, 1)
    A, B = A + da * w2, B + db * w2
    rgb = lab_rgb(np.stack([L, A, B], -1))
    return np.dstack([rgb, a[..., 3]])


def coz(a, hedef_L, hedef_C):
    """Üç hedefe ulaşan düzeltmeyi adım adım bulur."""
    p = [1.0, 1.0, 0.0, 0.0, 1.0, olc(a)[3]]
    maske = beyaz_maske(a)
    for _ in range(30):
        b, Lm, Cm, sm = olc(uygula(a, p), maske)
        p[0] = float(np.clip(p[0] * (np.log(hedef_L / 100) / np.log(max(Lm, 1) / 100)) ** 0.8, *GAMMA_SINIR))
        p[1] = float(np.clip(p[1] * (hedef_C / max(Cm, 0.1)) ** 0.8, *CANLILIK_SINIR))
        p[5] = float(np.clip(p[5] + (sm - HEDEF_SIYAH) * 0.8, 0.5, 40))
        if not np.isnan(b[0]):
            p[2] = float(np.clip(p[2] + (HEDEF_BEYAZ[1] - b[1]) * 0.8, -BEYAZ_SINIR, BEYAZ_SINIR))
            p[3] = float(np.clip(p[3] + (HEDEF_BEYAZ[2] - b[2]) * 0.8, -BEYAZ_SINIR, BEYAZ_SINIR))
            p[4] *= (HEDEF_BEYAZ[0] / b[0]) ** 0.8
    return p


def asillar():
    return sorted(glob.glob(os.path.join(KLASOR, 'musteri-[0-9][0-9].webp')))


def oku(f):
    return np.array(Image.open(f).convert('RGBA'))


def tablo(baslik, olcumler, hL, hC):
    print(f'\n{baslik}')
    print('| Kişi | Beyaz L | Beyaz a | Beyaz b | ΔE00 beyaz→hedef | Siyah L | Parlaklık (L) | Canlılık (C) |')
    print('|---|---|---|---|---|---|---|---|')
    for no, (b, L, C, k) in olcumler.items():
        de = de2000(tuple(HEDEF_BEYAZ), tuple(b)) if not np.isnan(b[0]) else float('nan')
        print(f'| {no} | {b[0]:.1f} | {b[1]:.1f} | {b[2]:.1f} | {de:.1f} | {k:.1f} | {L:.1f} | {C:.1f} |')
    bs = np.array([v[0] for v in olcumler.values()])
    Ls = np.array([v[1] for v in olcumler.values()])
    Cs = np.array([v[2] for v in olcumler.values()])
    des = [de2000(tuple(HEDEF_BEYAZ), tuple(b)) for b in bs if not np.isnan(b[0])]
    Ks = np.array([v[3] for v in olcumler.values()])
    print(f'| Hedef | {HEDEF_BEYAZ[0]:.1f} | {HEDEF_BEYAZ[1]:.1f} | {HEDEF_BEYAZ[2]:.1f} | 0 | {HEDEF_SIYAH:.1f} | {hL:.1f} | {hC:.1f} |')
    print(f'| Yayılma (en büyük - en küçük) | {np.nanmax(bs[:, 0]) - np.nanmin(bs[:, 0]):.1f} | '
          f'{np.nanmax(bs[:, 1]) - np.nanmin(bs[:, 1]):.1f} | {np.nanmax(bs[:, 2]) - np.nanmin(bs[:, 2]):.1f} | '
          f'en çok {max(des):.1f}, ortalama {np.mean(des):.1f} | {Ks.max() - Ks.min():.1f} | {Ls.max() - Ls.min():.1f} | {Cs.max() - Cs.min():.1f} |')


def iz(f):
    with open(f, 'rb') as d:
        return hashlib.sha1(d.read()).hexdigest()


def main():
    kip = sys.argv[1] if len(sys.argv) > 1 else 'olc'
    once = {os.path.basename(f)[8:10]: olc(oku(f)) for f in asillar()}
    hL, hC = HEDEF_PARLAKLIK, HEDEF_CANLILIK
    tablo('Ölçüm (şimdiki hâl)', once, hL, hC)
    if kip != 'esitle':
        return
    kayit = json.load(open(KAYIT)) if os.path.exists(KAYIT) else {'dosyalar': {}, 'ayarlar': {}}
    for f in asillar():
        no = os.path.basename(f)[8:10]
        ad = os.path.basename(f)
        if kayit['dosyalar'].get(ad) == iz(f):
            print(f'musteri-{no}: zaten eşit, dokunulmadı')
            continue
        p = coz(oku(f), hL, hC)
        print(f'musteri-{no}: siyah {once[no][3]:.1f}->{HEDEF_SIYAH}, gamma {p[0]:.3f}, canlılık x{p[1]:.3f}, '
              f'beyaz kaydırma a {p[2]:+.1f} b {p[3]:+.1f}, açık ton x{p[4]:.3f}')
        kayit['ayarlar'][no] = [round(float(x), 4) for x in p]
        for g in sorted(glob.glob(os.path.join(KLASOR, f'musteri-{no}.webp')) +
                        glob.glob(os.path.join(KLASOR, f'musteri-{no}-*.webp'))):
            Image.fromarray(uygula(oku(g), p), 'RGBA').save(g, quality=90, method=6, exact=True)
            kayit['dosyalar'][os.path.basename(g)] = iz(g)
    kayit['dosyalar'] = dict(sorted(kayit['dosyalar'].items()))
    kayit['ayarlar'] = dict(sorted(kayit['ayarlar'].items()))
    with open(KAYIT, 'w') as d:
        json.dump(kayit, d, ensure_ascii=False, indent=1)
        d.write('\n')
    sonra = {os.path.basename(f)[8:10]: olc(oku(f)) for f in asillar()}
    tablo('Ölçüm (eşitlemeden sonra)', sonra, hL, hC)


if __name__ == '__main__':
    main()
