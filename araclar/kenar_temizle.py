# Karakterlerin kenarındaki beyaz hâleyi temizler (Kemal, 9 Kasım 2026: "Karakterlerin arkaplanlarını
# iyi temizle siyah arkaplanda beyaz beyaz görünüyor").
# Arka planı silinen çizimlerin kenarında yarı saydam, beyaza çalan bir şerit kalmıştı; açık zeminde
# görünmüyor, koyu zeminde (Gece teması) beyaz çizgi gibi duruyor. Yarı saydam kenar noktalarının
# rengi, hemen içerideki dolu noktaların renginden alınır (genelde koyu çizgi rengi); saydamlık aynı
# kalır. Bazı çizimlerde koyu dış çizginin dışında çıkartma gibi beyaz bir kenar da vardı; o silinir
# (çizim 1-3 nokta incelir, koyu çizgi kenar olur).
# Kullanım: musteri_isik.py bunu kendisi çağırır. Tek tek dosyalar için:
#   python3 araclar/kenar_temizle.py dosya1.webp dosya2.webp ...
import sys
import numpy as np
from PIL import Image

DOLU = 240  # bu saydamlığın üstü dolu sayılır


def _komsu_ortalama(rgb, m):
    # 3x3 komşulukta dolu noktaların renk ortalaması ve kaç dolu komşu olduğu.
    H, W = m.shape
    pm = np.pad(m.astype(float), 1)
    pr = np.pad(rgb * m[..., None], ((1, 1), (1, 1), (0, 0)))
    top = np.zeros_like(rgb)
    say = np.zeros((H, W))
    for dy in (0, 1, 2):
        for dx in (0, 1, 2):
            top += pr[dy:dy + H, dx:dx + W]
            say += pm[dy:dy + H, dx:dx + W]
    return top, say


def hale(a, adim=3):
    # Çizimin koyu dış çizgisinin dışında kalan açık şerit (bazı çizimlerde çıkartma gibi beyaz
    # kenar): saydam bölgeden içeri doğru yalnız açık noktalar üzerinden en çok `adim` adımda
    # ulaşılan noktalar. Koyu çizgide durulur; içerideki beyaz giysiye ulaşılmaz.
    al = a[..., 3]
    L = a[..., :3].mean(-1)
    sat = a[..., :3].max(-1) - a[..., :3].min(-1)
    acik = (al > 0) & (L > 125) & (sat < 70)
    ulasilan = al < 20
    H, W = al.shape
    for _ in range(adim):
        p = np.pad(ulasilan, 1)
        komsu = np.zeros_like(ulasilan)
        for dy in (0, 1, 2):
            for dx in (0, 1, 2):
                komsu |= p[dy:dy + H, dx:dx + W]
        ulasilan = ulasilan | (komsu & acik)
    return ulasilan & (al >= 20)


def temizle(im: Image.Image) -> Image.Image:
    a = np.array(im.convert('RGBA')).astype(float)
    # 1) Dış çizginin dışındaki açık şerit silinir.
    a[hale(a), 3] = 0
    rgb, al = a[..., :3].copy(), a[..., 3]
    dolu = al >= DOLU
    hedef = (al > 0) & ~dolu
    bilinen = dolu.copy()
    # İçeriden dışarıya doğru, her adımda bir nokta: kenarın rengi en yakın dolu noktalardan gelir.
    for _ in range(6):
        eksik = hedef & ~bilinen
        if not eksik.any():
            break
        top, say = _komsu_ortalama(rgb, bilinen)
        yeni = eksik & (say > 0)
        rgb[yeni] = top[yeni] / say[yeni][:, None]
        bilinen |= yeni
    a[..., :3] = rgb
    return Image.fromarray(np.clip(a, 0, 255).astype('uint8'), 'RGBA')


if __name__ == '__main__':
    for f in sys.argv[1:]:
        temizle(Image.open(f)).save(f, 'WEBP', quality=92, method=6)
        print('temizlendi:', f)
