import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import LabelTag from '../components/LabelTag.jsx';
import WaveDivider from '../components/WaveDivider.jsx';
import FeatureStrip from '../components/FeatureStrip.jsx';
import PhotoHero from '../components/PhotoHero.jsx';
import BagHero from '../components/BagHero.jsx';
import AddToCart from '../components/AddToCart.jsx';
import useHomePhoto, { useImageExists, BAG_PHOTO } from '../hooks/useHomePhoto.js';
import { useProducts } from '../context/ProductsContext.jsx';
import './Home.css';

export default function Home() {
  const bag = useImageExists(BAG_PHOTO);
  const photo = useHomePhoto();

  if (bag === 'loading' || photo === 'loading') return null;

  // עדיפות ראשונה: שקית הקסם התלת-ממדית (bag-hero.jpg)
  if (bag === true) {
    return (
      <>
        <BagHero />
        <FlavorsPreview />
      </>
    );
  }

  // עדיפות שנייה: תמונת העיצוב המלאה (home-hero.jpg) עם אזורי לחיצה
  if (photo === true) {
    return (
      <>
        <PhotoHero />
        <FlavorsPreview />
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
              <ProductImage src="/images/hero-choc-bar.png" alt="שלגון שוקולד" emoji="🍫" />
            </div>
            <LabelTag top="מועדים" bottom="שמנצחים" flip className="tag-top-right" />
            <div className="hero-product tilt-right small">
              <ProductImage src="/images/hero-cookie-pop.png" alt="שלגון עוגיות" emoji="🍪" />
            </div>
            <div className="hero-product tilt-left small">
              <ProductImage src="/images/hero-raspberry.png" alt="שלגון פטל כפול" emoji="🍓" />
            </div>
            <LabelTag top="טעמים" bottom="מיוחדים" className="tag-bottom-right" />
          </div>

          {/* מרכז — כותרת */}
          <div className="hero-center">
            <div className="hero-doodle" aria-hidden="true">💗 ✦</div>
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
              <Link to="/contact" className="btn btn-outline">הזמינו עכשיו 🍦</Link>
            </div>
          </div>

          {/* עמודה שמאלית — מוצרים */}
          <div className="hero-side hero-side-left">
            <div className="hero-product tilt-right">
              <ProductImage src="/images/hero-cookie-sandwich.png" alt="סנדוויץ׳ עוגיות" emoji="🍪" />
            </div>
            <LabelTag top="קלאסיקות" bottom="שאהובים" className="tag-top-left" />
            <div className="hero-product tilt-left small">
              <ProductImage src="/images/hero-manbake.png" alt="קוביות מן-בייק" emoji="🍬" />
            </div>
            <div className="hero-product tilt-right small">
              <ProductImage src="/images/hero-nougat-crunch.png" alt="שלגון נוגט קראנצ׳י" emoji="🥜" />
            </div>
            <LabelTag top="קרונצ׳י" bottom="פריך וממכר" flip className="tag-bottom-left" />
          </div>
        </div>

        <WaveDivider color="#ffffff" />
      </section>

      {/* ===== Feature strip ===== */}
      <FeatureStrip />

      <FlavorsPreview />
    </>
  );
}

function FlavorsPreview() {
  const { favorites } = useProducts();
  return (
    <section className="page-section">
      <div className="container">
        <h2 className="section-title">
          הטעמים <span className="highlight">שכולם אוהבים</span>
        </h2>
        <p className="text-center home-section-sub">טעימה קטנה ממה שמחכה לכם אצלנו</p>

        <div className="card-grid home-flavors">
          {favorites.map((f) => (
            <article className="card" key={f.id}>
              <div className="card-image">
                <ProductImage src={f.image} alt={f.name} emoji={f.emoji} />
              </div>
              <div className="card-body">
                <span className="card-badge">{f.tag}</span>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
                <div className="card-buy-row">
                  <p className="price">₪{f.price}</p>
                  <AddToCart product={{ key: `favorite-${f.id}`, name: f.name, price: f.price, emoji: f.emoji }} />
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
