// נתוני דוגמה — ערכו חופשי. תמונות נטענות מ-public/images (ראו README שם).

export const flavors = [
  { id: 1, name: 'שלגון שוקולד קראנץ׳', category: 'אייסים', tag: 'הכי נמכר', emoji: '🍫', image: '/images/flavor-crunch-bar.png', desc: 'ציפוי שוקולד פריך עם שברי אגוזים', price: 10 },
  { id: 2, name: 'קסטה וניל עוגיות', category: 'גלידות', tag: 'קלאסיקה', emoji: '🍦', image: '/images/flavor-cookies-cassata.png', desc: 'וניל עשיר עם שברי עוגיות שוקולד', price: 10 },
  { id: 3, name: 'שלגון פטל כפול', category: 'אייסים', tag: 'טעם מיוחד', emoji: '🍓', image: '/images/flavor-double-raspberry.png', desc: 'פטל חמצמץ בציפוי שוקולד מריר', price: 10 },
  { id: 4, name: 'סנדוויץ׳ גלידה קוקולידה', category: 'גלידות', tag: 'אהוב על ילדים', emoji: '🍪', image: '/images/flavor-cookie-sandwich.png', desc: 'גלידת וניל בין שתי עוגיות שוקולד', price: 10 },
  { id: 5, name: 'קוביות מן-בייק שוקולד', category: 'חטיפים', tag: 'חדש!', emoji: '🍬', image: '/images/flavor-manbake-cubes.png', desc: 'מרלנג מצופה שוקולד חלב — 30 יחידות', price: 10 },
  { id: 6, name: 'שלגון נוגט קראנצ׳י', category: 'אייסים', tag: 'קרונצ׳י', emoji: '🥜', image: '/images/flavor-nougat-crunch.png', desc: 'נוגט קרמי בציפוי שוקולד ופצפוצים', price: 10 },
  { id: 7, name: 'גלידת שוקולד בלגי', category: 'גלידות', tag: 'פרימיום', emoji: '🍨', image: '/images/flavor-belgian-choc.png', desc: 'שוקולד בלגי אמיתי, מרקם קטיפתי', price: 10 },
  { id: 8, name: 'ארטיק לימון בננה', category: 'אייסים', tag: 'קיצי', emoji: '🍋', image: '/images/flavor-lemon-banana.png', desc: 'הקלאסיקה של הקיץ הישראלי', price: 10 },
  { id: 9, name: 'חטיף וופל בלגי', category: 'חטיפים', tag: 'מתוק במיוחד', emoji: '🧇', image: '/images/flavor-waffle-snack.png', desc: 'וופל פריך עם שוקולד ואגוזי לוז', price: 10 },
];

export const favorites = [
  { id: 1, name: 'שלגון שוקולד קראנץ׳', category: 'אייסים', tag: 'מומלץ השף', emoji: '🍫', image: '/images/flavor-crunch-bar.png', desc: 'ציפוי שוקולד פריך עם שברי אגוזים', price: 10 },
  { id: 2, name: 'קסטה וניל עוגיות', category: 'גלידות', tag: 'קלאסיקה', emoji: '🍦', image: '/images/flavor-cookies-cassata.png', desc: 'וניל עשיר עם שברי עוגיות שוקולד', price: 10 },
  { id: 3, name: 'שלגון פטל כפול', category: 'אייסים', tag: 'טעם מיוחד', emoji: '🍓', image: '/images/flavor-double-raspberry.png', desc: 'פטל חמצמץ בציפוי שוקולד מריר', price: 10 }
];

export const dealCatalogs = [
  {
    id: 1,
    title: 'מבצעי קיץ חמים',
    emoji: '☀️',
    badge: 'קטלוג מבצעים',
    desc: 'כל המבצעים הכי שווים לעונה החמה',
    image: '/images/deal-one-plus-one.png',
  },
  {
    id: 2,
    title: 'מבצעים למשפחה',
    emoji: '👨‍👩‍👧‍👦',
    badge: 'קטלוג מבצעים',
    desc: 'מארזים ושלגונים שכל המשפחה תאהב',
    image: '/images/deal-family-pack.png',
  },
  {
    id: 3,
    title: 'פינוקי סוף שבוע',
    emoji: '🎉',
    badge: 'קטלוג מבצעים',
    desc: 'לסגור את השבוע עם משהו מתוק',
    image: '/images/deal-cassata-weekend.png',
  }
];

export const deals = [
  { id: 1, catalogId: 1, badge: '1+1 מתנה', title: 'שלגונים 1+1', desc: 'קונים שלגון פרימיום — מקבלים שני. בכל הסניפים.', price: 10, oldPrice: 28, emoji: '🍫', image: '/images/deal-one-plus-one.png' },
  { id: 2, catalogId: 1, badge: 'מבצע קיץ', title: 'מארז משפחתי ב-25% הנחה', desc: '12 שלגונים במגוון טעמים במחיר מיוחד לקיץ.', price: 10, oldPrice: 60, emoji: '📦', image: '/images/deal-family-pack.png' },
  { id: 3, catalogId: 2, badge: 'סוף שבוע', title: 'קסטה שנייה ב-50%', desc: 'בכל קניית קסטה — השנייה בחצי מחיר. שישי-שבת בלבד.', price: 10, oldPrice: 20, emoji: '🍦', image: '/images/deal-cassata-weekend.png' },
  { id: 4, catalogId: 3, badge: 'חדש!', title: 'מן-בייק במחיר השקה', desc: 'קוביות המרלנג החדשות במחיר היכרות מיוחד.', price: 10, oldPrice: 25, emoji: '🍬', image: '/images/deal-manbake-launch.png' },
];

/* מבצעי המקפיאים — כמות × מחיר. התמונות: public/images/mivtza-XX.png
   לכל מבצע: products — הגלידות שנכללות בו (מוצגות בעמוד המקפיא הפתוח).
   מבנה מוצר: { id, name, image, emoji } */
export const freezerDeals = [
  { id: 1, qty: 4, price: 20, image: '/images/mivtza-01.png', products: [] },
  { id: 2, qty: 3, price: 21, image: '/images/mivtza-02.png', products: [] },
  { id: 3, qty: 3, price: 27, image: '/images/mivtza-03.png', products: [] },
  { id: 4, qty: 3, price: 18, image: '/images/mivtza-04.png', products: [] },
  { id: 5, qty: 10, price: 12, image: '/images/mivtza-05.png', products: [] },
  { id: 6, qty: 3, price: 14, image: '/images/mivtza-06.png', products: [] },
  { id: 7, qty: 3, price: 21, image: '/images/mivtza-07.png', products: [] },
  { id: 8, qty: 13, price: 10, image: '/images/mivtza-08.png', products: [] },
  { id: 9, qty: 3, price: 24, image: '/images/mivtza-09.png', products: [] },
  { id: 10, qty: 3, price: 13, image: '/images/mivtza-10.png', products: [] },
  { id: 11, qty: 5, price: 11, image: '/images/mivtza-11.png', products: [] },
  { id: 12, qty: 5, price: 10, image: '/images/mivtza-12.png', products: [] },
  { id: 13, qty: 4, price: 13, image: '/images/mivtza-13.png', products: [] },
  { id: 14, qty: 3, price: 26, image: '/images/mivtza-14.png', products: [] },
  { id: 15, qty: 3, price: 17, image: '/images/mivtza-15.png', products: [] },
];

export const packages = [
  { id: 1, title: 'מארז המשפחה', desc: '12 שלגונים במגוון טעמים — לכל המשפחה', items: '12 יחידות', price: 10, emoji: '👨‍👩‍👧‍👦', image: '/images/package-family.png' },
  { id: 2, title: 'מארז יום הולדת', desc: '24 אייסים צבעוניים + הפתעות מתוקות', items: '24 יחידות', price: 10, emoji: '🎂', image: '/images/package-birthday.png' },
  { id: 3, title: 'מארז הפינוק', desc: 'מבחר פרימיום: שוקולד בלגי, נוגט ופטל', items: '8 יחידות', price: 10, emoji: '💝', image: '/images/package-premium.png' },
  { id: 4, title: 'מארז המשרד', desc: 'מקפיא מלא לצוות — כי מגיע לכם', items: '36 יחידות', price: 10, emoji: '💼', image: '/images/package-office.png' },
];

/* פרטי קשר אמיתיים של החנות */
export const PHONE = '04-9836313';
export const PHONE_LINK = 'tel:049836313';
export const INSTAGRAM = 'https://www.instagram.com/hapina.hamitoka/';
export const INSTAGRAM_HANDLE = '@hapina.hamitoka';
export const HOURS = 'כל יום: 10:00 בבוקר – 23:00 בלילה';

export const branches = [
  { id: 1, city: 'נצרת', phone: PHONE, hours: HOURS },
  { id: 2, city: 'נוף הגליל', phone: PHONE, hours: HOURS },
  { id: 3, city: 'יפיע', phone: PHONE, hours: HOURS },
  { id: 4, city: 'כפר כנא', phone: PHONE, hours: HOURS },
  { id: 5, city: 'עראבה', phone: PHONE, hours: HOURS },
  { id: 6, city: 'ביר אלמכסור', phone: PHONE, hours: HOURS },
];
