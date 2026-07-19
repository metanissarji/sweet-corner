import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import FeatureStrip from '../components/FeatureStrip.jsx';
import IntroOverlay from '../components/IntroOverlay.jsx';
import FreezerCard from '../components/FreezerCard.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { bestSellers } from '../data/products.js';
import './Home.css';

export default function Home() {
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem('introSeen') === '1');

  return (
    <>
      {!introDone && (
        <IntroOverlay
          onDone={() => {
            sessionStorage.setItem('introSeen', '1');
            setIntroDone(true);
          }}
        />
      )}
      <SummerHero />
      <HomeFreezers />
      <FlavorsPreview />
      <FeatureStrip />
    </>
  );
}

/* ===== Hero — דוכן הקיץ: כותרת גדולה, הלוגו, ושורת אמון ===== */
function SummerHero() {
  return (
    <section className="summer-hero">
      <div className="sun-glow" aria-hidden="true" />
      <div className="container summer-hero-grid">
        <div className="summer-hero-text">
          <p className="hero-kicker">גלידריה של הגליל · מאז ומתמיד</p>
          <h1 className="hero-title">
            <span className="title-line-a">טעם של קיץ</span>
            <span className="title-line-b">בכל כפית</span>
          </h1>
          <p className="hero-value">
            גלידות איכות מהמותגים הכי אהובים —
            <strong> במחירים של שכונה</strong>
          </p>
          <div className="hero-ctas">
            <Link to="/deals" className="btn btn-pink hero-cta-main">לכל המבצעים</Link>
            <Link to="/trends" className="btn btn-outline">מה חדש וטרנדי</Link>
          </div>
          <ul className="hero-trust" aria-label="למה אצלנו">
            <li>מגיע קפוא — בוקס + שקית קרח</li>
            <li>10 סניפים בגליל</li>
            <li>מבצעי מקפיא כל השנה</li>
          </ul>
        </div>
        <div className="summer-hero-art">
          <img src="/images/logo-hero2.webp" alt="" className="hero-logo" decoding="async" />
          <p className="hero-shop-name" aria-hidden="true">
            <span>הפינה</span> המתוקה
          </p>
          <span className="sticker hero-sticker" aria-hidden="true">
            <span className="sticker-top">מבצעים</span>
            <span className="sticker-bottom">מ־₪10</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ===== כל המבצעים (מקפיאים) — רצועת קרם חמה ===== */
function HomeFreezers() {
  const { freezerDeals } = useProducts();
  const rowRef = useRef(null);

  if (!freezerDeals || freezerDeals.length === 0) return null;

  function slide(dir) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <section className="bestsellers band-cream">
      <div className="container">
        <div className="bestsellers-head">
          <div style={{ textAlign: 'right' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              כל <span className="highlight">המבצעים</span>
            </h2>
            <p className="home-section-sub" style={{ marginTop: '0.2rem', marginBottom: 0 }}>
              לוחצים על מקפיא ורואים אילו גלידות יש בפנים
            </p>
          </div>
          <div className="bestsellers-arrows">
            <button className="bs-arrow" onClick={() => slide(1)} aria-label="הצג עוד">‹</button>
            <button className="bs-arrow" onClick={() => slide(-1)} aria-label="חזרה">›</button>
          </div>
        </div>

        <div className="bestsellers-row" ref={rowRef}>
          {freezerDeals.map((deal) => (
            <div className="deal-card-wrapper" key={deal.id}>
              <FreezerCard deal={deal} />
            </div>
          ))}
        </div>

        <div className="text-center home-more">
          <Link to="/deals" className="btn btn-pink">לכל המבצעים ←</Link>
        </div>
      </div>
    </section>
  );
}

/* ===== הכי נמכרים — הפרימיום הכבדים ממבצעי המקפיא, בסדר אקראי =====
   כל כרטיס הוא מוצר אמיתי מתוך מבצע: הוספה לסל נספרת יחד עם עמוד המקפיא
   ומקבלת את תמחור המבצע אוטומטית. */
function FlavorsPreview() {
  const { freezerDeals } = useProducts();
  const rowRef = useRef(null);
  // ערבוב פעם אחת בכל טעינה — סדר אחר לכל ביקור
  const [shuffled] = useState(() => [...bestSellers].sort(() => Math.random() - 0.5));

  const items = shuffled
    .map((b) => {
      const deal = (freezerDeals || []).find((d) => d.id === b.dealId);
      return deal ? { ...b, deal } : null;
    })
    .filter(Boolean);

  if (items.length === 0) return null;

  function slide(dir) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <section className="bestsellers">
      <div className="container">
        <div className="bestsellers-head">
          <div style={{ textAlign: 'right' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              הכי <span className="highlight">נמכרים</span>
            </h2>
          </div>
          <div className="bestsellers-arrows">
            <button className="bs-arrow" onClick={() => slide(1)} aria-label="הצג עוד">‹</button>
            <button className="bs-arrow" onClick={() => slide(-1)} aria-label="חזרה">›</button>
          </div>
        </div>

        <div className="bestsellers-row" ref={rowRef}>
          {items.map(({ deal, productId, image }) => (
            <article className="bs-card" key={`${deal.id}-${productId}`}>
              <div className="bs-card-img">
                <ProductImage src={image} alt={`גלידה ${productId} — מבצע ${deal.qty} ב־₪${deal.price}`} emoji="" />
              </div>
              <div className="bs-card-body">
                <span className="card-badge">מבצע {deal.qty} ב־₪{deal.price}</span>
                <div className="card-buy-row">
                  <p className="price">₪{deal.single}</p>
                  <AddToCart
                    product={{
                      key: `fz-${deal.id}-${productId}`,
                      name: `גלידה ${productId} · מבצע ${deal.qty} ב־₪${deal.price}`,
                      price: deal.single,
                      emoji: '',
                      image,
                      dealId: deal.id,
                      dealQty: deal.qty,
                      dealPrice: deal.price,
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center home-more">
          <Link to="/deals" className="btn btn-pink">לכל המבצעים ←</Link>
        </div>
      </div>
    </section>
  );
}

