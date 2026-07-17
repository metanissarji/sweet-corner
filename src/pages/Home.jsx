import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import LabelTag from '../components/LabelTag.jsx';
import WaveDivider from '../components/WaveDivider.jsx';
import FeatureStrip from '../components/FeatureStrip.jsx';
import PhotoHero from '../components/PhotoHero.jsx';
import BagHero from '../components/BagHero.jsx';
import IntroOverlay from '../components/IntroOverlay.jsx';
import FreezerCard from '../components/FreezerCard.jsx';
import AddToCart from '../components/AddToCart.jsx';
import useHomePhoto, { useImageExists, BAG_PHOTO } from '../hooks/useHomePhoto.js';
import { useProducts } from '../context/ProductsContext.jsx';
import './Home.css';

export default function Home() {
  const bag = useImageExists(BAG_PHOTO);
  const photo = useHomePhoto();
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem('introSeen') === '1');

  if (bag === 'loading' || photo === 'loading') return null;

  // עמוד הבית: מסך פתיחה (~5ש') ואז חושף את המבצעים + הכי נמכרים.
  // התפריט העליון נשאר קבוע (App מציג Navbar), כך שהניווט תמיד זמין.
  if (bag === true || photo === true) {
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
        <HomeFreezers />
        <FlavorsPreview />
        <FeatureStrip />
      </>
    );
  }

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="splash splash-blue" />
        <div className="splash splash-pink" />

        <div className="container hero-grid">
          {/* עמודה ימנית (RTL: ראשונה) — מוצרים */}
          <div className="hero-side hero-side-right">
            <div className="hero-product tilt-left">
              <ProductImage src="/images/hero-choc-bar.png" alt="שלגון שוקולד" emoji="" />
            </div>
            <LabelTag top="מועדים" bottom="שמנצחים" flip className="tag-top-right" />
            <div className="hero-product tilt-right small">
              <ProductImage src="/images/hero-cookie-pop.png" alt="שלגון עוגיות" emoji="" />
            </div>
            <div className="hero-product tilt-left small">
              <ProductImage src="/images/hero-raspberry.png" alt="שלגון פטל כפול" emoji="" />
            </div>
            <LabelTag top="טעמים" bottom="מיוחדים" className="tag-bottom-right" />
          </div>

          {/* מרכז — כותרת */}
          <div className="hero-center">
            <div className="hero-doodle" aria-hidden="true"> </div>
            <h1 className="hero-title">
              <span className="title-pink">הפינה</span>
              <span className="title-brown">המתוקה</span>
            </h1>
            <p className="hero-banner">טעם של קיץ בכל כפית</p>
            <p className="hero-sub">
              גלידות, אייסים, מארזים ופינוקים
              <br />
              בטעמים שאהובים על כולם
            </p>
            <div className="hero-ctas">
              <Link to="/flavors" className="btn btn-pink">לכל הטעמים ←</Link>
              <Link to="/contact" className="btn btn-outline">הזמינו עכשיו </Link>
            </div>
          </div>

          {/* עמודה שמאלית — מוצרים */}
          <div className="hero-side hero-side-left">
            <div className="hero-product tilt-right">
              <ProductImage src="/images/hero-cookie-sandwich.png" alt="סנדוויץ׳ עוגיות" emoji="" />
            </div>
            <LabelTag top="קלאסיקות" bottom="שאהובים" className="tag-top-left" />
            <div className="hero-product tilt-left small">
              <ProductImage src="/images/hero-manbake.png" alt="קוביות מן-בייק" emoji="" />
            </div>
            <div className="hero-product tilt-right small">
              <ProductImage src="/images/hero-nougat-crunch.png" alt="שלגון נוגט קראנצ׳י" emoji="" />
            </div>
            <LabelTag top="קרונצ׳י" bottom="פריך וממכר" flip className="tag-bottom-left" />
          </div>
        </div>

        <WaveDivider color="#ffffff" />
      </section>

      <HomeFreezers />
      <FlavorsPreview />

      {/* ===== Feature strip ===== */}
      <FeatureStrip />
    </>
  );
}

function FlavorsPreview() {
  const { flavors, favorites } = useProducts();
  const rowRef = useRef(null);
  
  // מציגים את המועדפים קודם, ואז שאר הטעמים
  const items = [...(favorites || []), ...(flavors || [])].filter(
    (f, i, arr) => arr.findIndex((x) => x.name === f.name) === i
  );

  function slide(dir) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <section className="bestsellers blue-bg-section">
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
          {items.map((f) => (
            <article className="bs-card" key={f.id + f.name}>
              <div className="bs-card-img">
                <ProductImage src={f.image} alt={f.name} emoji={f.emoji} />
              </div>
              <div className="bs-card-body">
                <span className="card-badge">{f.tag}</span>
                <h3>{f.name}</h3>
                <div className="card-buy-row">
                  <p className="price">₪{f.price}</p>
                  <AddToCart product={{ key: `bs-${f.id}`, name: f.name, price: f.price, emoji: f.emoji, image: f.image }} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center home-more">
          <Link to="/flavors" className="btn btn-pink">לכל הטעמים ←</Link>
        </div>
      </div>
    </section>
  );
}

/* כל המבצעים (מקפיאים) — נגלל לצד כמו שהיה לטעמים */
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
    <section className="bestsellers blue-bg-section">
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
