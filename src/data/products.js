// נתוני דוגמה — ערכו חופשי. תמונות נטענות מ-public/images (ראו README שם).

export const flavors = [
  { id: 1, name: 'שלגון שוקולד קראנץ׳', category: 'אייסים', tag: 'הכי נמכר', emoji: '🍫', image: '/images/flavor-crunch-bar.png', desc: 'ציפוי שוקולד פריך עם שברי אגוזים', price: 12 },
  { id: 2, name: 'קסטה וניל עוגיות', category: 'גלידות', tag: 'קלאסיקה', emoji: '🍦', image: '/images/flavor-cookies-cassata.png', desc: 'וניל עשיר עם שברי עוגיות שוקולד', price: 10 },
  { id: 3, name: 'שלגון פטל כפול', category: 'אייסים', tag: 'טעם מיוחד', emoji: '🍓', image: '/images/flavor-double-raspberry.png', desc: 'פטל חמצמץ בציפוי שוקולד מריר', price: 14 },
  { id: 4, name: 'סנדוויץ׳ גלידה קוקולידה', category: 'גלידות', tag: 'אהוב על ילדים', emoji: '🍪', image: '/images/flavor-cookie-sandwich.png', desc: 'גלידת וניל בין שתי עוגיות שוקולד', price: 9 },
  { id: 5, name: 'קוביות מן-בייק שוקולד', category: 'חטיפים', tag: 'חדש!', emoji: '🍬', image: '/images/flavor-manbake-cubes.png', desc: 'מרלנג מצופה שוקולד חלב — 30 יחידות', price: 25 },
  { id: 6, name: 'שלגון נוגט קראנצ׳י', category: 'אייסים', tag: 'קרונצ׳י', emoji: '🥜', image: '/images/flavor-nougat-crunch.png', desc: 'נוגט קרמי בציפוי שוקולד ופצפוצים', price: 13 },
  { id: 7, name: 'גלידת שוקולד בלגי', category: 'גלידות', tag: 'פרימיום', emoji: '🍨', image: '/images/flavor-belgian-choc.png', desc: 'שוקולד בלגי אמיתי, מרקם קטיפתי', price: 16 },
  { id: 8, name: 'ארטיק לימון בננה', category: 'אייסים', tag: 'קיצי', emoji: '🍋', image: '/images/flavor-lemon-banana.png', desc: 'הקלאסיקה של הקיץ הישראלי', price: 6 },
  { id: 9, name: 'חטיף וופל בלגי', category: 'חטיפים', tag: 'מתוק במיוחד', emoji: '🧇', image: '/images/flavor-waffle-snack.png', desc: 'וופל פריך עם שוקולד ואגוזי לוז', price: 11 },
];

export const deals = [
  { id: 1, badge: '1+1 מתנה', title: 'שלגונים 1+1', desc: 'קונים שלגון פרימיום — מקבלים שני. בכל הסניפים.', price: 14, oldPrice: 28, emoji: '🍫', image: '/images/deal-one-plus-one.png' },
  { id: 2, badge: 'מבצע קיץ', title: 'מארז משפחתי ב-25% הנחה', desc: '12 שלגונים במגוון טעמים במחיר מיוחד לקיץ.', price: 45, oldPrice: 60, emoji: '📦', image: '/images/deal-family-pack.png' },
  { id: 3, badge: 'סוף שבוע', title: 'קסטה שנייה ב-50%', desc: 'בכל קניית קסטה — השנייה בחצי מחיר. שישי-שבת בלבד.', price: 15, oldPrice: 20, emoji: '🍦', image: '/images/deal-cassata-weekend.png' },
  { id: 4, badge: 'חדש!', title: 'מן-בייק במחיר השקה', desc: 'קוביות המרלנג החדשות במחיר היכרות מיוחד.', price: 20, oldPrice: 25, emoji: '🍬', image: '/images/deal-manbake-launch.png' },
];

export const packages = [
  { id: 1, title: 'מארז המשפחה', desc: '12 שלגונים במגוון טעמים — לכל המשפחה', items: '12 יחידות', price: 60, emoji: '👨‍👩‍👧‍👦', image: '/images/package-family.png' },
  { id: 2, title: 'מארז יום הולדת', desc: '24 אייסים צבעוניים + הפתעות מתוקות', items: '24 יחידות', price: 99, emoji: '🎂', image: '/images/package-birthday.png' },
  { id: 3, title: 'מארז הפינוק', desc: 'מבחר פרימיום: שוקולד בלגי, נוגט ופטל', items: '8 יחידות', price: 75, emoji: '💝', image: '/images/package-premium.png' },
  { id: 4, title: 'מארז המשרד', desc: 'מקפיא מלא לצוות — כי מגיע לכם', items: '36 יחידות', price: 150, emoji: '💼', image: '/images/package-office.png' },
];

export const branches = [
  { id: 1, city: 'תל אביב', address: 'דיזנגוף 120', phone: '03-5551234', hours: 'א׳–ה׳ 10:00–23:00 · ו׳ 9:00–15:00' },
  { id: 2, city: 'ירושלים', address: 'יפו 45, מרכז העיר', phone: '02-5555678', hours: 'א׳–ה׳ 10:00–22:00 · ו׳ 9:00–14:00' },
  { id: 3, city: 'חיפה', address: 'שדרות מוריה 78', phone: '04-5559012', hours: 'א׳–ה׳ 10:00–22:00 · ו׳ 9:00–15:00' },
  { id: 4, city: 'באר שבע', address: 'קניון הנגב, קומה 1', phone: '08-5553456', hours: 'א׳–ש׳ לפי שעות הקניון' },
  { id: 5, city: 'נתניה', address: 'הרצל 33', phone: '09-5557890', hours: 'א׳–ה׳ 10:00–22:00 · ו׳ 9:00–15:00' },
  { id: 6, city: 'ראשון לציון', address: 'רוטשילד 15', phone: '03-5552468', hours: 'א׳–ה׳ 10:00–22:30 · ו׳ 9:00–15:00' },
];
