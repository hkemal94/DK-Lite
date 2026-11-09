// Dil seçimi (Kemal, 9 Kasım 2026: "ayarlar kısmına İngilizce de eklemek istiyorum";
// seçim "Ayarlarda dil seçimi: Türkçe / English"). Telefonun dili Türkçe değilse ilk
// açılışta İngilizce gelir; seçim telefonda saklanır. Çeviriler ekibin; Kemal görür.
// Yer adları (Liman, Stadyum ...) özel ad olduğu için çevrilmez.

export type Dil = 'tr' | 'en';
const ANAHTAR = 'dk-lite-dil';

function dilOku(): Dil {
  try {
    const d = window.localStorage.getItem(ANAHTAR);
    if (d === 'tr' || d === 'en') return d;
  } catch {
    // okunamadı
  }
  const tel = (typeof navigator !== 'undefined' && navigator.language) || 'tr';
  return tel.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

let dil: Dil = typeof window !== 'undefined' ? dilOku() : 'tr';

export function dilAl(): Dil {
  return dil;
}

// Dil değişince oyun yeniden açılır (bütün yazılar yeni dilde kurulur).
export function dilSec(d: Dil): void {
  dil = d;
  try {
    window.localStorage.setItem(ANAHTAR, d);
  } catch {
    // saklanamadı
  }
  if (typeof location !== 'undefined') location.reload();
}

// Türkçe metni seçili dile çevirir; {0}, {1} yerine verilen değerler gelir.
export function t(tr: string, ...degerler: (string | number)[]): string {
  let s = dil === 'en' ? EN[tr] ?? tr : tr;
  degerler.forEach((d, i) => {
    s = s.split(`{${i}}`).join(String(d));
  });
  return s;
}

const EN: Record<string, string> = {
  // Genel
  'Başla': 'Play',
  'Bölümler': 'Levels',
  'Albüm': 'Album',
  'Mağaza': 'Shop',
  'Ayarlar': 'Settings',
  'Ana sayfa': 'Home',
  'Devam et': 'Continue',
  'Tekrar oyna': 'Play again',
  'Baştan başla': 'Restart',
  'Duraklatıldı': 'Paused',
  'Duraklat': 'Pause',
  'Hızlandır': 'Speed up',
  'Kapat': 'Close',
  'Geri': 'Back',
  'Tamam': 'OK',
  'Al': 'Claim',
  'Vazgeç': 'Cancel',
  'Bitir': 'End',
  'Seç': 'Select',
  'Seçili': 'Selected',
  'Açık': 'On',
  'Kapalı': 'Off',
  'Titreşim': 'Vibration',
  'Dil': 'Language',
  'Önceki sayfa': 'Previous page',
  'Sonraki sayfa': 'Next page',
  'Bölüm {0}': 'Level {0}',
  'Bütün bölümler bitti': 'All levels complete',
  // Bozulma
  'Bozulma': 'Spoiling',
  'Yok': 'Off',
  '1 tur sonra': 'After 1 lap',
  '2 tur sonra': 'After 2 laps',
  'Bozulma yok': 'No spoiling',
  'Bozulma: 1 tur': 'Spoil: 1 lap',
  'Bozulma: 2 tur': 'Spoil: 2 laps',
  // Sayaçlar
  'Müşteri': 'Customers',
  'Puan': 'Score',
  'Hamle': 'Moves',
  'Bant': 'Belt',
  'Can': 'Lives',
  'Para': 'Coins',
  'Dolu': 'Full',
  'Son {0}': 'Last {0}',
  // Bölüm sonu
  'Bölüm tamamlandı': 'Level complete',
  'Bant doldu': 'Belt full',
  'Top kalmadı': 'Out of scoops',
  'Müşteriler gitti': 'Customers left',
  'Hamle bitti': 'Out of moves',
  'Hizmet edilen müşteri': 'Customers served',
  'Giden müşteri': 'Customers lost',
  'Boşa giden top': 'Wasted scoops',
  'Galibiyet serisi': 'Win streak',
  '−1 (kalan {0})': '−1 ({0} left)',
  'gitmedi (sınırsız)': 'not lost (unlimited)',
  'Yeni: {0}': 'New: {0}',
  'Seri ×{0} +{1}': 'Streak ×{0} +{1}',
  // Ödüller
  'Yeni ürün!': 'New product!',
  'Sonraki bölümde gelir': 'Arrives next level',
  'Sandık!': 'Chest!',
  'Sandık': 'Chest',
  '+1 can': '+1 life',
  'Canlar doldu': 'Lives refilled',
  '{0} saat sınırsız can': '{0} hour(s) of unlimited lives',
  '{0} dakika sınırsız can': '{0} minutes of unlimited lives',
  '{0} dk ∞': '{0} min ∞',
  'Seri ödülü!': 'Streak reward!',
  'Günlük ödül': 'Daily reward',
  '{0}. gün': 'Day {0}',
  'Yardımcı': 'Helper',
  'Yardımcı: {0}': 'Helper: {0}',
  'Her gün gir, ödül büyüsün. Bir gün atlarsan 1. güne dönülür.': 'Come back every day for bigger rewards. Miss a day and you start again from day 1.',
  'Can yok': 'No lives',
  'Her {0} dakikada 1 can dolar': 'One life refills every {0} minutes',
  'Rozet!': 'Badge!',
  // Yeni öğeler
  'Yeni!': 'New!',
  'Buzlu topa iki kez dokun: buz çözülür, sonra gönderebilirsin.': 'Tap an icy scoop twice: the ice melts, then you can send it.',
  'Bu topun ne olduğu sütunun en üstüne gelince görünür.': 'You will see what this scoop is when it reaches the top of its column.',
  'Şimşekli müşterinin acelesi var: sabrı kısa, ama ek puan verir.': 'Customers with a lightning bolt are in a hurry: less patience, but bonus points.',
  'Kilitli sütun {0} müşteri karşılanınca açılır.': 'The locked column opens after {0} customer(s) are served.',
  // Seri, hamle
  'Galibiyet serisi {0}': 'Win streak {0}',
  '+{0} bant yeri': '+{0} belt slots',
  'sabır {0} sn durur': 'patience paused {0} s',
  '+{0} hamle': '+{0} moves',
  '"+{0} hamle" yardımcısıyla devam edebilirsin (elinde {1}).': 'Continue with the "+{0} moves" helper (you have {1}).',
  'Hamlen kalmadı. Bölümü bitirirsen 1 can gider.': 'You are out of moves. Ending the level costs 1 life.',
  // Bırakma, mahalle kilidi
  'Bölümü bırak?': 'Leave level?',
  'Bölüm yarıda kalır: 1 can gider ve galibiyet serisi sıfırlanır.': 'The level ends here: you lose 1 life and your win streak resets.',
  'Bölüm yarıda kalır. Sınırsız canın var, can gitmez; galibiyet serisi sıfırlanır.': 'The level ends here. You have unlimited lives, so no life is lost; your win streak resets.',
  'Mahalle kilitli': 'Area locked',
  'Sonraki mahalle: ?': 'Next area: ?',
  '{0} mahallesinde {1} yıldız daha topla. Yıldızı az olan bölümleri yeniden oyna:': 'Collect {1} more stars in {0}. Replay levels with few stars:',
  'Lokasyon {0}': 'Location {0}',
  // Albüm, mağaza
  'Ürünler': 'Products',
  'Rozetler': 'Badges',
  'Kartlar': 'Cards',
  'Temalar': 'Themes',
  'Yardım': 'Helpers',
  'Dondurmacı': 'Ice cream seller',
  'Kostüm': 'Outfits',
  'Dükkân önlüğü': 'Shop apron',
  'Maraş dondurmacısı': 'Maraş ice cream seller',
  'Denizci': 'Sailor',
  'Aşçı': 'Chef',
  // Ürünler
  'Çikolata': 'Chocolate',
  'Çilek': 'Strawberry',
  'Limon': 'Lemon',
  'Fıstık': 'Pistachio',
  'Vanilya': 'Vanilla',
  'Dilim pasta': 'Cake slice',
  'Küçük kek': 'Cupcake',
  'Kâsede meyve': 'Fruit bowl',
  'Limonata': 'Lemonade',
  'Gazoz': 'Soda',
  'Türk kahvesi': 'Turkish coffee',
  'Çay': 'Tea',
  'Sakızlı': 'Mastic',
  'Baklava': 'Baklava',
  'Muzlu süt': 'Banana milk',
  'Sütlaç': 'Rice pudding',
  'Lokma': 'Lokma',
  'Profiterol': 'Profiterole',
  'Karadut': 'Black mulberry',
  'Kavun': 'Melon',
  'Vişne suyu': 'Sour cherry juice',
  'Buzlu kahve': 'Iced coffee',
  'Kazandibi': 'Kazandibi',
  'Künefe': 'Künefe',
  'Ayva tatlısı': 'Quince dessert',
  'Waffle': 'Waffle',
  // Yardımcılar
  'Bandı boşalt': 'Clear belt',
  'Sütunları karıştır': 'Shuffle columns',
  'Sabrı durdur': 'Pause patience',
  'Fazla bant yeri': 'Extra belt slots',
  '+1 sütun': '+1 column',
  '+5 hamle': '+5 moves',
  // Temalar
  'Dükkân': 'Classic',
  'Gece': 'Night',
  'Sonbahar': 'Autumn',
  'Deniz': 'Sea',
  'Pamuk şeker': 'Cotton candy',
  // Rozetler
  '0. bölümü bitir': 'Finish level 0',
  '100 müşteriye hizmet': 'Serve 100 customers',
  '1000 müşteriye hizmet': 'Serve 1000 customers',
  '10 bölüm 3 yıldız': '3 stars on 10 levels',
  '50 bölüm 3 yıldız': '3 stars on 50 levels',
  '5 bölüm üst üste': '5 wins in a row',
  '10 bölüm üst üste': '10 wins in a row',
  'Bir lokasyonda bütün yıldızlar': 'All stars in one area',
  '10 ürün aç': 'Unlock 10 products',
  'Bütün ürünleri aç': 'Unlock all products',
  '7 gün art arda': '7 days in a row',
  'Boşa top göndermeden bitir': 'Finish without wasting a scoop',
};
