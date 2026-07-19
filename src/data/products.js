/* גרסת הנתונים הסטטיים — עדכנו את התאריך בכל ייבוא תמונות/נתונים חדש.
   שורות ב-Supabase שנשמרו לפני תאריך זה נחשבות מיושנות והקוד מנצח אותן. */
export const STATIC_DATA_VERSION = '2026-07-18T12:00:00.000Z';

// נתוני דוגמה — ערכו חופשי. תמונות נטענות מ-public/images (ראו README שם).

export const flavors = [
  { id: 1, name: 'שלגון שוקולד קראנץ׳', category: 'אייסים', tag: 'הכי נמכר', emoji: '', image: '/images/flavor-crunch-bar.png', desc: 'ציפוי שוקולד פריך עם שברי אגוזים', price: 10 },
  { id: 2, name: 'קסטה וניל עוגיות', category: 'גלידות', tag: 'קלאסיקה', emoji: '', image: '/images/flavor-cookies-cassata.png', desc: 'וניל עשיר עם שברי עוגיות שוקולד', price: 10 },
  { id: 3, name: 'שלגון פטל כפול', category: 'אייסים', tag: 'טעם מיוחד', emoji: '', image: '/images/flavor-double-raspberry.png', desc: 'פטל חמצמץ בציפוי שוקולד מריר', price: 10 },
  { id: 4, name: 'סנדוויץ׳ גלידה קוקולידה', category: 'גלידות', tag: 'אהוב על ילדים', emoji: '', image: '/images/flavor-cookie-sandwich.png', desc: 'גלידת וניל בין שתי עוגיות שוקולד', price: 10 },
  { id: 5, name: 'קוביות מן-בייק שוקולד', category: 'חטיפים', tag: 'חדש!', emoji: '', image: '/images/flavor-manbake-cubes.png', desc: 'מרלנג מצופה שוקולד חלב — 30 יחידות', price: 10 },
  { id: 6, name: 'שלגון נוגט קראנצ׳י', category: 'אייסים', tag: 'קרונצ׳י', emoji: '', image: '/images/flavor-nougat-crunch.png', desc: 'נוגט קרמי בציפוי שוקולד ופצפוצים', price: 10 },
  { id: 7, name: 'גלידת שוקולד בלגי', category: 'גלידות', tag: 'פרימיום', emoji: '', image: '/images/flavor-belgian-choc.png', desc: 'שוקולד בלגי אמיתי, מרקם קטיפתי', price: 10 },
  { id: 8, name: 'ארטיק לימון בננה', category: 'אייסים', tag: 'קיצי', emoji: '', image: '/images/flavor-lemon-banana.png', desc: 'הקלאסיקה של הקיץ הישראלי', price: 10 },
  { id: 9, name: 'חטיף וופל בלגי', category: 'חטיפים', tag: 'מתוק במיוחד', emoji: '', image: '/images/flavor-waffle-snack.png', desc: 'וופל פריך עם שוקולד ואגוזי לוז', price: 10 },
];

export const favorites = [
  { id: 1, name: 'שלגון שוקולד קראנץ׳', category: 'אייסים', tag: 'מומלץ השף', emoji: '', image: '/images/flavor-crunch-bar.png', desc: 'ציפוי שוקולד פריך עם שברי אגוזים', price: 10 },
  { id: 2, name: 'קסטה וניל עוגיות', category: 'גלידות', tag: 'קלאסיקה', emoji: '', image: '/images/flavor-cookies-cassata.png', desc: 'וניל עשיר עם שברי עוגיות שוקולד', price: 10 },
  { id: 3, name: 'שלגון פטל כפול', category: 'אייסים', tag: 'טעם מיוחד', emoji: '', image: '/images/flavor-double-raspberry.png', desc: 'פטל חמצמץ בציפוי שוקולד מריר', price: 10 }
];

export const dealCatalogs = [
  {
    id: 1,
    title: 'מבצעי קיץ חמים',
    emoji: '',
    badge: 'קטלוג מבצעים',
    desc: 'כל המבצעים הכי שווים לעונה החמה',
    image: '/images/deal-one-plus-one.png',
  },
  {
    id: 2,
    title: 'מבצעים למשפחה',
    emoji: '‍‍‍',
    badge: 'קטלוג מבצעים',
    desc: 'מארזים ושלגונים שכל המשפחה תאהב',
    image: '/images/deal-family-pack.png',
  },
  {
    id: 3,
    title: 'פינוקי סוף שבוע',
    emoji: '',
    badge: 'קטלוג מבצעים',
    desc: 'לסגור את השבוע עם משהו מתוק',
    image: '/images/deal-cassata-weekend.png',
  }
];

export const deals = [
  { id: 1, catalogId: 1, badge: '1+1 מתנה', title: 'שלגונים 1+1', desc: 'קונים שלגון פרימיום — מקבלים שני. בכל הסניפים.', price: 10, oldPrice: 28, emoji: '', image: '/images/deal-one-plus-one.png' },
  { id: 2, catalogId: 1, badge: 'מבצע קיץ', title: 'מארז משפחתי ב-25% הנחה', desc: '12 שלגונים במגוון טעמים במחיר מיוחד לקיץ.', price: 10, oldPrice: 60, emoji: '', image: '/images/deal-family-pack.png' },
  { id: 3, catalogId: 2, badge: 'סוף שבוע', title: 'קסטה שנייה ב-50%', desc: 'בכל קניית קסטה — השנייה בחצי מחיר. שישי-שבת בלבד.', price: 10, oldPrice: 20, emoji: '', image: '/images/deal-cassata-weekend.png' },
  { id: 4, catalogId: 3, badge: 'חדש!', title: 'מן-בייק במחיר השקה', desc: 'קוביות המרלנג החדשות במחיר היכרות מיוחד.', price: 10, oldPrice: 25, emoji: '', image: '/images/deal-manbake-launch.png' },
];

/* מבצעי המקפיאים — כמות × מחיר. תמונת הכריכה: public/images/mivtza-XX.png
   single — מחיר ליחידה בודדת (למי שקונה פחות מכמות המבצע).
   products — הגלידות שנכללות במבצע, מוצגות בעמוד המקפיא הפתוח.
   התמונות: public/images/mivtza/<כמות>x<מחיר>/NN.jpg. מבנה מוצר: { id, image } */
export const freezerDeals = [
  { id: 1, qty: 2, price: 45, single: 27, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/2x45/01.jpg' }, { id: 2, image: '/images/mivtza/2x45/02.jpg' }, { id: 3, image: '/images/mivtza/2x45/03.jpg' }, { id: 4, image: '/images/mivtza/2x45/04.jpg' }, { id: 5, image: '/images/mivtza/2x45/05.jpg' }, { id: 6, image: '/images/mivtza/2x45/06.jpg' }, { id: 7, image: '/images/mivtza/2x45/07.jpg' }, { id: 8, image: '/images/mivtza/2x45/08.jpg' }, { id: 9, image: '/images/mivtza/2x45/09.jpg' }, { id: 10, image: '/images/mivtza/2x45/10.jpg' }, { id: 11, image: '/images/mivtza/2x45/11.jpg' }, { id: 12, image: '/images/mivtza/2x45/12.jpg' }, { id: 13, image: '/images/mivtza/2x45/13.jpg' }, { id: 14, image: '/images/mivtza/2x45/14.jpg' }, { id: 15, image: '/images/mivtza/2x45/15.jpg' }] },
  { id: 2, qty: 3, price: 13, single: 5, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x13/01.jpg' }, { id: 2, image: '/images/mivtza/3x13/02.jpg' }, { id: 3, image: '/images/mivtza/3x13/03.jpg' }, { id: 4, image: '/images/mivtza/3x13/04.jpg' }, { id: 5, image: '/images/mivtza/3x13/05.jpg' }, { id: 6, image: '/images/mivtza/3x13/06.jpg' }, { id: 7, image: '/images/mivtza/3x13/07.jpg' }, { id: 8, image: '/images/mivtza/3x13/08.jpg' }, { id: 9, image: '/images/mivtza/3x13/09.jpg' }, { id: 10, image: '/images/mivtza/3x13/10.jpg' }, { id: 11, image: '/images/mivtza/3x13/11.jpg' }, { id: 12, image: '/images/mivtza/3x13/12.jpg' }, { id: 13, image: '/images/mivtza/3x13/13.jpg' }, { id: 14, image: '/images/mivtza/3x13/14.jpg' }, { id: 15, image: '/images/mivtza/3x13/15.jpg' }, { id: 16, image: '/images/mivtza/3x13/16.jpg' }, { id: 17, image: '/images/mivtza/3x13/17.jpg' }, { id: 18, image: '/images/mivtza/3x13/18.jpg' }, { id: 19, image: '/images/mivtza/3x13/19.jpg' }, { id: 20, image: '/images/mivtza/3x13/20.jpg' }, { id: 21, image: '/images/mivtza/3x13/21.jpg' }, { id: 22, image: '/images/mivtza/3x13/22.jpg' }, { id: 23, image: '/images/mivtza/3x13/23.jpg' }, { id: 24, image: '/images/mivtza/3x13/24.jpg' }, { id: 25, image: '/images/mivtza/3x13/25.jpg' }, { id: 26, image: '/images/mivtza/3x13/26.jpg' }, { id: 27, image: '/images/mivtza/3x13/27.jpg' }, { id: 28, image: '/images/mivtza/3x13/28.jpg' }] },
  { id: 3, qty: 3, price: 14, single: 6, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x14/01.jpg' }, { id: 2, image: '/images/mivtza/3x14/02.jpg' }, { id: 3, image: '/images/mivtza/3x14/03.jpg' }, { id: 4, image: '/images/mivtza/3x14/04.jpg' }, { id: 5, image: '/images/mivtza/3x14/05.jpg' }, { id: 6, image: '/images/mivtza/3x14/06.jpg' }, { id: 7, image: '/images/mivtza/3x14/07.jpg' }, { id: 8, image: '/images/mivtza/3x14/08.jpg' }, { id: 9, image: '/images/mivtza/3x14/09.jpg' }, { id: 10, image: '/images/mivtza/3x14/10.jpg' }, { id: 11, image: '/images/mivtza/3x14/11.jpg' }, { id: 12, image: '/images/mivtza/3x14/12.jpg' }, { id: 13, image: '/images/mivtza/3x14/13.jpg' }, { id: 14, image: '/images/mivtza/3x14/14.jpg' }, { id: 15, image: '/images/mivtza/3x14/15.jpg' }, { id: 16, image: '/images/mivtza/3x14/16.jpg' }, { id: 17, image: '/images/mivtza/3x14/17.jpg' }, { id: 18, image: '/images/mivtza/3x14/18.jpg' }, { id: 19, image: '/images/mivtza/3x14/19.jpg' }, { id: 20, image: '/images/mivtza/3x14/20.jpg' }, { id: 21, image: '/images/mivtza/3x14/21.jpg' }, { id: 22, image: '/images/mivtza/3x14/22.jpg' }, { id: 23, image: '/images/mivtza/3x14/23.jpg' }, { id: 24, image: '/images/mivtza/3x14/24.jpg' }, { id: 25, image: '/images/mivtza/3x14/25.jpg' }] },
  { id: 4, qty: 3, price: 17, single: 7, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x17/01.jpg' }, { id: 2, image: '/images/mivtza/3x17/02.jpg' }, { id: 3, image: '/images/mivtza/3x17/03.jpg' }, { id: 4, image: '/images/mivtza/3x17/04.jpg' }, { id: 5, image: '/images/mivtza/3x17/05.jpg' }, { id: 6, image: '/images/mivtza/3x17/06.jpg' }, { id: 7, image: '/images/mivtza/3x17/07.jpg' }, { id: 8, image: '/images/mivtza/3x17/08.jpg' }, { id: 9, image: '/images/mivtza/3x17/09.jpg' }] },
  { id: 5, qty: 3, price: 18, single: 8, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x18/01.jpg' }, { id: 2, image: '/images/mivtza/3x18/02.jpg' }, { id: 3, image: '/images/mivtza/3x18/03.jpg' }, { id: 4, image: '/images/mivtza/3x18/04.jpg' }, { id: 5, image: '/images/mivtza/3x18/05.jpg' }, { id: 6, image: '/images/mivtza/3x18/06.jpg' }, { id: 7, image: '/images/mivtza/3x18/07.jpg' }] },
  { id: 6, qty: 3, price: 21, single: 9, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x21/01.jpg' }, { id: 2, image: '/images/mivtza/3x21/02.jpg' }, { id: 3, image: '/images/mivtza/3x21/03.jpg' }, { id: 4, image: '/images/mivtza/3x21/04.jpg' }, { id: 5, image: '/images/mivtza/3x21/05.jpg' }, { id: 6, image: '/images/mivtza/3x21/06.jpg' }, { id: 7, image: '/images/mivtza/3x21/07.jpg' }, { id: 8, image: '/images/mivtza/3x21/08.jpg' }, { id: 9, image: '/images/mivtza/3x21/09.jpg' }, { id: 10, image: '/images/mivtza/3x21/10.jpg' }, { id: 11, image: '/images/mivtza/3x21/11.jpg' }] },
  { id: 7, qty: 3, price: 24, single: 9, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x24/01.jpg' }, { id: 2, image: '/images/mivtza/3x24/02.jpg' }, { id: 3, image: '/images/mivtza/3x24/03.jpg' }, { id: 4, image: '/images/mivtza/3x24/04.jpg' }, { id: 5, image: '/images/mivtza/3x24/05.jpg' }, { id: 6, image: '/images/mivtza/3x24/06.jpg' }, { id: 7, image: '/images/mivtza/3x24/07.jpg' }, { id: 8, image: '/images/mivtza/3x24/08.jpg' }, { id: 9, image: '/images/mivtza/3x24/09.jpg' }, { id: 10, image: '/images/mivtza/3x24/10.jpg' }, { id: 11, image: '/images/mivtza/3x24/11.jpg' }, { id: 12, image: '/images/mivtza/3x24/12.jpg' }, { id: 13, image: '/images/mivtza/3x24/13.jpg' }, { id: 14, image: '/images/mivtza/3x24/14.jpg' }] },
  { id: 8, qty: 3, price: 26, single: 10, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x26/01.jpg' }, { id: 2, image: '/images/mivtza/3x26/02.jpg' }, { id: 3, image: '/images/mivtza/3x26/03.jpg' }, { id: 4, image: '/images/mivtza/3x26/04.jpg' }, { id: 5, image: '/images/mivtza/3x26/05.jpg' }, { id: 6, image: '/images/mivtza/3x26/06.jpg' }, { id: 7, image: '/images/mivtza/3x26/07.jpg' }, { id: 8, image: '/images/mivtza/3x26/08.jpg' }] },
  { id: 9, qty: 3, price: 27, single: 11, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/3x27/01.jpg' }, { id: 2, image: '/images/mivtza/3x27/02.jpg' }, { id: 3, image: '/images/mivtza/3x27/03.jpg' }, { id: 4, image: '/images/mivtza/3x27/04.jpg' }, { id: 5, image: '/images/mivtza/3x27/05.jpg' }, { id: 6, image: '/images/mivtza/3x27/06.jpg' }, { id: 7, image: '/images/mivtza/3x27/07.jpg' }, { id: 8, image: '/images/mivtza/3x27/08.jpg' }, { id: 9, image: '/images/mivtza/3x27/09.jpg' }, { id: 10, image: '/images/mivtza/3x27/10.jpg' }, { id: 11, image: '/images/mivtza/3x27/11.jpg' }, { id: 12, image: '/images/mivtza/3x27/12.jpg' }, { id: 13, image: '/images/mivtza/3x27/13.jpg' }, { id: 14, image: '/images/mivtza/3x27/14.jpg' }, { id: 15, image: '/images/mivtza/3x27/15.jpg' }, { id: 16, image: '/images/mivtza/3x27/16.jpg' }, { id: 17, image: '/images/mivtza/3x27/17.jpg' }, { id: 18, image: '/images/mivtza/3x27/18.jpg' }, { id: 19, image: '/images/mivtza/3x27/19.jpg' }, { id: 20, image: '/images/mivtza/3x27/20.jpg' }, { id: 21, image: '/images/mivtza/3x27/21.jpg' }, { id: 22, image: '/images/mivtza/3x27/22.jpg' }, { id: 23, image: '/images/mivtza/3x27/23.jpg' }, { id: 24, image: '/images/mivtza/3x27/24.jpg' }, { id: 25, image: '/images/mivtza/3x27/25.jpg' }, { id: 26, image: '/images/mivtza/3x27/26.jpg' }, { id: 27, image: '/images/mivtza/3x27/27.jpg' }, { id: 28, image: '/images/mivtza/3x27/28.jpg' }] },
  { id: 10, qty: 4, price: 11, single: 4, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/4x11/01.jpg' }, { id: 2, image: '/images/mivtza/4x11/02.jpg' }, { id: 3, image: '/images/mivtza/4x11/03.jpg' }, { id: 4, image: '/images/mivtza/4x11/04.jpg' }, { id: 5, image: '/images/mivtza/4x11/05.jpg' }, { id: 6, image: '/images/mivtza/4x11/06.jpg' }, { id: 7, image: '/images/mivtza/4x11/07.jpg' }, { id: 8, image: '/images/mivtza/4x11/08.jpg' }, { id: 9, image: '/images/mivtza/4x11/09.jpg' }, { id: 10, image: '/images/mivtza/4x11/10.jpg' }, { id: 11, image: '/images/mivtza/4x11/11.jpg' }, { id: 12, image: '/images/mivtza/4x11/12.jpg' }, { id: 13, image: '/images/mivtza/4x11/13.jpg' }, { id: 14, image: '/images/mivtza/4x11/14.jpg' }] },
  { id: 11, qty: 4, price: 13, single: 5, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/4x13/01.jpg' }, { id: 2, image: '/images/mivtza/4x13/02.jpg' }, { id: 3, image: '/images/mivtza/4x13/03.jpg' }, { id: 4, image: '/images/mivtza/4x13/04.jpg' }, { id: 5, image: '/images/mivtza/4x13/05.jpg' }, { id: 6, image: '/images/mivtza/4x13/06.jpg' }, { id: 7, image: '/images/mivtza/4x13/07.jpg' }, { id: 8, image: '/images/mivtza/4x13/08.jpg' }, { id: 9, image: '/images/mivtza/4x13/09.jpg' }, { id: 10, image: '/images/mivtza/4x13/10.jpg' }, { id: 11, image: '/images/mivtza/4x13/11.jpg' }, { id: 12, image: '/images/mivtza/4x13/12.jpg' }, { id: 13, image: '/images/mivtza/4x13/13.jpg' }, { id: 14, image: '/images/mivtza/4x13/14.jpg' }, { id: 15, image: '/images/mivtza/4x13/15.jpg' }, { id: 16, image: '/images/mivtza/4x13/16.jpg' }, { id: 17, image: '/images/mivtza/4x13/17.jpg' }, { id: 18, image: '/images/mivtza/4x13/18.jpg' }, { id: 19, image: '/images/mivtza/4x13/19.jpg' }, { id: 20, image: '/images/mivtza/4x13/20.jpg' }, { id: 21, image: '/images/mivtza/4x13/21.jpg' }] },
  { id: 12, qty: 4, price: 20, single: 6, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/4x20/01.jpg' }, { id: 2, image: '/images/mivtza/4x20/02.jpg' }, { id: 3, image: '/images/mivtza/4x20/03.jpg' }, { id: 4, image: '/images/mivtza/4x20/04.jpg' }, { id: 5, image: '/images/mivtza/4x20/05.jpg' }, { id: 6, image: '/images/mivtza/4x20/06.jpg' }, { id: 7, image: '/images/mivtza/4x20/07.jpg' }, { id: 8, image: '/images/mivtza/4x20/08.jpg' }, { id: 9, image: '/images/mivtza/4x20/09.jpg' }, { id: 10, image: '/images/mivtza/4x20/10.jpg' }, { id: 11, image: '/images/mivtza/4x20/11.jpg' }, { id: 12, image: '/images/mivtza/4x20/12.jpg' }] },
  { id: 13, qty: 5, price: 10, single: 3, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/5x10/01.jpg' }, { id: 2, image: '/images/mivtza/5x10/02.jpg' }, { id: 3, image: '/images/mivtza/5x10/03.jpg' }, { id: 4, image: '/images/mivtza/5x10/04.jpg' }, { id: 5, image: '/images/mivtza/5x10/05.jpg' }, { id: 6, image: '/images/mivtza/5x10/06.jpg' }, { id: 7, image: '/images/mivtza/5x10/07.jpg' }, { id: 8, image: '/images/mivtza/5x10/08.jpg' }, { id: 9, image: '/images/mivtza/5x10/09.jpg' }, { id: 10, image: '/images/mivtza/5x10/10.jpg' }, { id: 11, image: '/images/mivtza/5x10/11.jpg' }, { id: 12, image: '/images/mivtza/5x10/12.jpg' }] },
  { id: 14, qty: 5, price: 11, single: 3, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/5x11/01.jpg' }, { id: 2, image: '/images/mivtza/5x11/02.jpg' }, { id: 3, image: '/images/mivtza/5x11/03.jpg' }, { id: 4, image: '/images/mivtza/5x11/04.jpg' }, { id: 5, image: '/images/mivtza/5x11/05.jpg' }, { id: 6, image: '/images/mivtza/5x11/06.jpg' }, { id: 7, image: '/images/mivtza/5x11/07.jpg' }, { id: 8, image: '/images/mivtza/5x11/08.jpg' }, { id: 9, image: '/images/mivtza/5x11/09.jpg' }] },
  { id: 15, qty: 7, price: 10, single: 2, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/7x10/01.jpg' }, { id: 2, image: '/images/mivtza/7x10/02.jpg' }, { id: 3, image: '/images/mivtza/7x10/03.jpg' }, { id: 4, image: '/images/mivtza/7x10/04.jpg' }, { id: 5, image: '/images/mivtza/7x10/05.jpg' }, { id: 6, image: '/images/mivtza/7x10/06.jpg' }, { id: 7, image: '/images/mivtza/7x10/07.jpg' }, { id: 8, image: '/images/mivtza/7x10/08.jpg' }] },
  { id: 16, qty: 12, price: 10, single: 2, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/12x10/01.jpg' }, { id: 2, image: '/images/mivtza/12x10/02.jpg' }, { id: 3, image: '/images/mivtza/12x10/03.jpg' }, { id: 4, image: '/images/mivtza/12x10/04.jpg' }, { id: 5, image: '/images/mivtza/12x10/05.jpg' }, { id: 6, image: '/images/mivtza/12x10/06.jpg' }, { id: 7, image: '/images/mivtza/12x10/07.jpg' }, { id: 8, image: '/images/mivtza/12x10/08.jpg' }, { id: 9, image: '/images/mivtza/12x10/09.jpg' }, { id: 10, image: '/images/mivtza/12x10/10.jpg' }, { id: 11, image: '/images/mivtza/12x10/11.jpg' }, { id: 12, image: '/images/mivtza/12x10/12.jpg' }, { id: 13, image: '/images/mivtza/12x10/13.jpg' }, { id: 14, image: '/images/mivtza/12x10/14.jpg' }] },
  { id: 17, qty: 13, price: 10, single: 1, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/13x10/01.jpg' }, { id: 2, image: '/images/mivtza/13x10/02.jpg' }, { id: 3, image: '/images/mivtza/13x10/03.jpg' }, { id: 4, image: '/images/mivtza/13x10/04.jpg' }, { id: 5, image: '/images/mivtza/13x10/05.jpg' }, { id: 6, image: '/images/mivtza/13x10/06.jpg' }, { id: 7, image: '/images/mivtza/13x10/07.jpg' }, { id: 8, image: '/images/mivtza/13x10/08.jpg' }] },
  { id: 18, qty: 2, price: 12, single: 8, image: '/images/freezer-front-v2.jpg', products: [{ id: 1, image: '/images/mivtza/2x12/01.jpg' }, { id: 2, image: '/images/mivtza/2x12/02.jpg' }] },
];

/* הכי נמכרים בעמוד הבית — הפרימיום הכבדים (מגנום, סניקרס, טוויקס, מילקה...).
   כל פריט מפנה למוצר אמיתי בתוך מבצע מקפיא: אותו מפתח סל ואותו תמחור מבצע. */
export const bestSellers = [
  { dealId: 9, productId: 3, image: '/images/mivtza/3x27/03.jpg' },
  { dealId: 9, productId: 6, image: '/images/mivtza/3x27/06.jpg' },
  { dealId: 9, productId: 9, image: '/images/mivtza/3x27/09.jpg' },
  { dealId: 9, productId: 10, image: '/images/mivtza/3x27/10.jpg' },
  { dealId: 9, productId: 13, image: '/images/mivtza/3x27/13.jpg' },
  { dealId: 9, productId: 16, image: '/images/mivtza/3x27/16.jpg' },
  { dealId: 9, productId: 17, image: '/images/mivtza/3x27/17.jpg' },
  { dealId: 9, productId: 24, image: '/images/mivtza/3x27/24.jpg' },
  { dealId: 7, productId: 4, image: '/images/mivtza/3x24/04.jpg' },
  { dealId: 7, productId: 5, image: '/images/mivtza/3x24/05.jpg' },
  { dealId: 7, productId: 7, image: '/images/mivtza/3x24/07.jpg' },
  { dealId: 7, productId: 9, image: '/images/mivtza/3x24/09.jpg' },
];

export const packages = [
  { id: 1, title: 'מארז המשפחה', desc: '12 שלגונים במגוון טעמים — לכל המשפחה', items: '12 יחידות', price: 10, emoji: '‍‍‍', image: '/images/package-family.png' },
  { id: 2, title: 'מארז יום הולדת', desc: '24 אייסים צבעוניים + הפתעות מתוקות', items: '24 יחידות', price: 10, emoji: '', image: '/images/package-birthday.png' },
  { id: 3, title: 'מארז הפינוק', desc: 'מבחר פרימיום: שוקולד בלגי, נוגט ופטל', items: '8 יחידות', price: 10, emoji: '', image: '/images/package-premium.png' },
  { id: 4, title: 'מארז המשרד', desc: 'מקפיא מלא לצוות — כי מגיע לכם', items: '36 יחידות', price: 10, emoji: '', image: '/images/package-office.png' },
];

/* פרטי קשר אמיתיים של החנות */
export const PHONE = '04-9836313';
export const PHONE_LINK = 'tel:049836313';
export const INSTAGRAM = 'https://www.instagram.com/hapina.hamitoka/';
export const INSTAGRAM_HANDLE = '@hapina.hamitoka';
export const HOURS = 'כל יום: 10:00 בבוקר – 23:00 בלילה';

export const branches = [
  { id: 1, city: 'נצרת הוורדים', phone: PHONE, hours: HOURS },
  { id: 2, city: 'נצרת המעיין', phone: PHONE, hours: HOURS },
  { id: 3, city: 'נצרת דרך יפיע', phone: PHONE, hours: HOURS },
  { id: 4, city: 'יפיע', phone: PHONE, hours: HOURS },
  { id: 5, city: 'כפר כנא', phone: PHONE, hours: HOURS },
  { id: 6, city: 'עראבה', phone: PHONE, hours: HOURS },
  { id: 7, city: 'ביר אלמכסור', phone: PHONE, hours: HOURS },
  { id: 8, city: 'נוף הגליל רסקו', phone: PHONE, hours: HOURS },
  { id: 9, city: 'נוף הגליל דרומית', phone: PHONE, hours: HOURS },
  { id: 10, city: 'יוקנעם', phone: PHONE, hours: HOURS },
];

/* הסניפים שמקבלים הזמנות מהאתר — ההזמנה מגיעה רק לסניף שהלקוח בחר.
   «נצרת» באתר = סניף הוורדים. */
export const ORDER_BRANCHES = [
  { id: 'nazareth', label: 'נצרת (סניף הוורדים)', short: 'נצרת' },
  { id: 'yafia', label: 'יפיע', short: 'יפיע' },
  { id: 'kafr-kanna', label: 'כפר כנא', short: 'כפר כנא' },
];

/* טרנדים — כל תיקייה בדסקטופ = מחיר. { id, price, image } */
export const trendItems = [
  { id: 1, price: 7, image: '/images/trend/7-01.jpg' },
  { id: 2, price: 9, image: '/images/trend/9-01.jpg' },
  { id: 3, price: 9, image: '/images/trend/9-02.jpg' },
  { id: 4, price: 9, image: '/images/trend/9-03.jpg' },
  { id: 5, price: 9, image: '/images/trend/9-04.jpg' },
  { id: 6, price: 9, image: '/images/trend/9-05.jpg' },
  { id: 7, price: 9, image: '/images/trend/9-06.jpg' },
  { id: 8, price: 14, image: '/images/trend/14-01.jpg' },
  { id: 9, price: 14, image: '/images/trend/14-02.jpg' },
  { id: 10, price: 17, image: '/images/trend/17-01.jpg' },
  { id: 11, price: 17, image: '/images/trend/17-02.jpg' },
  { id: 12, price: 17, image: '/images/trend/17-03.jpg' },
  { id: 13, price: 17, image: '/images/trend/17-04.jpg' },
  { id: 14, price: 18, image: '/images/trend/18-01.jpg' },
  { id: 15, price: 18, image: '/images/trend/18-02.jpg' },
  { id: 16, price: 20, image: '/images/trend/20-01.jpg' },
  { id: 17, price: 20, image: '/images/trend/20-02.jpg' },
  { id: 18, price: 23, image: '/images/trend/23-01.jpg' },
  { id: 19, price: 23, image: '/images/trend/23-02.jpg' },
  { id: 20, price: 23, image: '/images/trend/23-03.jpg' },
  { id: 21, price: 23, image: '/images/trend/23-04.jpg' },
  { id: 22, price: 24, image: '/images/trend/24-01.jpg' },
  { id: 23, price: 24, image: '/images/trend/24-02.jpg' },
  { id: 24, price: 24, image: '/images/trend/24-03.jpg' },
  { id: 25, price: 24, image: '/images/trend/24-04.jpg' },
  { id: 26, price: 24, image: '/images/trend/24-05.jpg' },
  { id: 27, price: 24, image: '/images/trend/24-06.jpg' },
  { id: 28, price: 24, image: '/images/trend/24-07.jpg' },
  { id: 29, price: 24, image: '/images/trend/24-08.jpg' },
  { id: 30, price: 24, image: '/images/trend/24-09.jpg' },
  { id: 31, price: 24, image: '/images/trend/24-10.jpg' },
  { id: 32, price: 24, image: '/images/trend/24-11.jpg' },
  { id: 33, price: 26, image: '/images/trend/26-01.jpg' },
  { id: 34, price: 26, image: '/images/trend/26-02.jpg' },
  { id: 35, price: 26, image: '/images/trend/26-03.jpg' },
  { id: 36, price: 26, image: '/images/trend/26-04.jpg' },
  { id: 37, price: 26, image: '/images/trend/26-05.jpg' },
  { id: 38, price: 26, image: '/images/trend/26-06.jpg' },
  { id: 39, price: 26, image: '/images/trend/26-07.jpg' },
  { id: 40, price: 27, image: '/images/trend/27-01.jpg' },
  { id: 41, price: 27, image: '/images/trend/27-02.jpg' },
  { id: 42, price: 27, image: '/images/trend/27-03.jpg' },
  { id: 43, price: 27, image: '/images/trend/27-04.jpg' },
  { id: 44, price: 27, image: '/images/trend/27-05.jpg' },
  { id: 45, price: 27, image: '/images/trend/27-06.jpg' },
  { id: 46, price: 28, image: '/images/trend/28-01.jpg' },
  { id: 47, price: 29, image: '/images/trend/29-01.jpg' },
  { id: 48, price: 29, image: '/images/trend/29-02.jpg' },
  { id: 49, price: 29, image: '/images/trend/29-03.jpg' },
  { id: 50, price: 29, image: '/images/trend/29-04.jpg' },
  { id: 51, price: 29, image: '/images/trend/29-05.jpg' },
  { id: 52, price: 30, image: '/images/trend/30-01.jpg' },
  { id: 53, price: 30, image: '/images/trend/30-02.jpg' },
  { id: 54, price: 30, image: '/images/trend/30-03.jpg' },
  { id: 55, price: 30, image: '/images/trend/30-04.jpg' },
  { id: 56, price: 30, image: '/images/trend/30-05.jpg' },
  { id: 57, price: 30, image: '/images/trend/30-06.jpg' },
  { id: 58, price: 30, image: '/images/trend/30-07.jpg' },
  { id: 59, price: 31, image: '/images/trend/31-01.jpg' },
  { id: 60, price: 32, image: '/images/trend/32-01.jpg' },
  { id: 61, price: 32, image: '/images/trend/32-02.jpg' },
  { id: 62, price: 32, image: '/images/trend/32-03.jpg' },
  { id: 63, price: 32, image: '/images/trend/32-04.jpg' },
  { id: 64, price: 32, image: '/images/trend/32-05.jpg' },
  { id: 65, price: 34, image: '/images/trend/34-01.jpg' },
  { id: 66, price: 34, image: '/images/trend/34-02.jpg' },
  { id: 67, price: 34, image: '/images/trend/34-03.jpg' },
  { id: 68, price: 35, image: '/images/trend/35-01.jpg' },
  { id: 69, price: 35, image: '/images/trend/35-02.jpg' },
  { id: 70, price: 35, image: '/images/trend/35-03.jpg' },
  { id: 71, price: 35, image: '/images/trend/35-04.jpg' },
  { id: 72, price: 35, image: '/images/trend/35-05.jpg' },
  { id: 73, price: 43, image: '/images/trend/43-01.jpg' },
  { id: 74, price: 49, image: '/images/trend/49-01.jpg' },
];

/* גלידה משפחתית — אריזות גדולות. price: null = המחיר יעודכן בהמשך */
export const familyItems = [
  { id: 1, price: null, image: '/images/family/01.jpg' },
  { id: 2, price: null, image: '/images/family/02.jpg' },
  { id: 3, price: null, image: '/images/family/03.jpg' },
  { id: 4, price: null, image: '/images/family/04.jpg' },
  { id: 5, price: null, image: '/images/family/05.jpg' },
  { id: 6, price: null, image: '/images/family/06.jpg' },
  { id: 7, price: null, image: '/images/family/07.jpg' },
  { id: 8, price: null, image: '/images/family/08.jpg' },
  { id: 9, price: null, image: '/images/family/09.jpg' },
  { id: 10, price: null, image: '/images/family/10.jpg' },
];

/* המיוחדים שלנו — מוצרים מיוחדים בתמונות אמיתיות. price: null = המחיר יעודכן בהמשך */
export const specialItems = [
  { id: 1, price: null, image: '/images/special/01.jpg' },
  { id: 2, price: null, image: '/images/special/02.jpg' },
  { id: 3, price: null, image: '/images/special/03.jpg' },
  { id: 4, price: null, image: '/images/special/04.jpg' },
  { id: 5, price: null, image: '/images/special/05.jpg' },
];
