import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import FeatureStrip from '../components/FeatureStrip.jsx';
import IntroOverlay from '../components/IntroOverlay.jsx';
import FreezerCard from '../components/FreezerCard.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
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
  const { t } = useLang();
  return (
    <section className="summer-hero">
      <div className="sun-glow" aria-hidden="true" />
      {/* סוכריות מרחפות — נגיעת חיים עדינה ברקע, בלי עומס */}
      <div className="hero-sprinkles" aria-hidden="true">
        <i className="sp sp1" /><i className="sp sp2" /><i className="sp sp3" />
        <i className="sp sp4" /><i className="sp sp5" /><i className="sp sp6" />
      </div>
      <div className="container summer-hero-grid">
        <div className="summer-hero-text">
          <p className="hero-kicker">{t('hero.kicker')}</p>
          <h1 className="hero-title">
            <span className="title-line-a">{t('hero.title1')}</span>
            <span className="title-line-b">{t('hero.title2')}</span>
          </h1>
          <p className="hero-value">
            {t('hero.value')}
            <strong> {t('hero.valueStrong')}</strong>
          </p>
          <div className="hero-ctas">
            <Link to="/deals" className="btn btn-pink hero-cta-main">{t('hero.ctaDeals')}</Link>
            <Link to="/trends" className="btn btn-outline">{t('hero.ctaTrends')}</Link>
          </div>
          <ul className="hero-trust">
            <li>{t('hero.trust1')}</li>
            <li>{t('hero.trust2')}</li>
            <li>{t('hero.trust3')}</li>
          </ul>
        </div>
        <div className="summer-hero-art">
          <img src="/images/logo-hero2.webp" alt="" className="hero-logo" decoding="async" />
          <p className="hero-shop-name" aria-hidden="true">
            <span>הפינה</span> המתוקה
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===== כל המבצעים (מקפיאים) — רצועת קרם חמה ===== */
function HomeFreezers() {
  const { freezerDeals } = useProducts();
  const { t } = useLang();
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
              {t('home.dealsPre')} <span className="highlight">{t('home.dealsHl')}</span>
            </h2>
            <p className="home-section-sub" style={{ marginTop: '0.2rem', marginBottom: 0 }}>
              {t('home.dealsSub')}
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
          <Link to="/deals" className="btn btn-pink">{t('home.moreDeals')}</Link>
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
  const { t } = useLang();
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
              {t('home.bestPre')} <span className="highlight">{t('home.bestHl')}</span>
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
                <ProductImage src={image} alt={t('fz.itemAlt', { i: productId, q: deal.qty, p: deal.price })} emoji="" />
              </div>
              <div className="bs-card-body">
                <span className="card-badge">{t('badge.deal', { q: deal.qty, p: deal.price })}</span>
                <div className="card-buy-row">
                  <p className="price">₪{deal.single}</p>
                  <AddToCart
                    product={{
                      key: `fz-${deal.id}-${productId}`,
                      name: t('fz.itemName', { i: productId, q: deal.qty, p: deal.price }),
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
          <Link to="/deals" className="btn btn-pink">{t('home.moreDeals')}</Link>
        </div>
      </div>
    </section>
  );
}

