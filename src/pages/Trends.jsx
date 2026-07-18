import { useState } from 'react';
import AddToCart from '../components/AddToCart.jsx';
import { trendItems } from '../data/products.js';
import './Showcase.css';

/* קבוצות מחיר לסינון מהיר — נוח במיוחד במובייל */
const FILTERS = [
  { label: 'הכל', test: () => true },
  { label: 'עד ₪15', test: (p) => p <= 15 },
  { label: '₪16–₪30', test: (p) => p >= 16 && p <= 30 },
  { label: '₪31 ומעלה', test: (p) => p >= 31 },
];

/**
 * עמוד הטרנדים — כל התמונות מתיקיית trend, כל תיקייה = מחיר.
 * כרטיסים עם דגל מחיר צהוב והוספה מהירה לסל.
 */
export default function Trends() {
  const [active, setActive] = useState(0);
  const shown = trendItems.filter((t) => FILTERS[active].test(t.price));

  return (
    <>
      <header className="page-header">
        <h1>הטרנדים החמים</h1>
        <p>החדשים, המדוברים והכי נחטפים מהמקפיאים — תפסו לפני שנגמר</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="chip-row">
            {FILTERS.map((f, i) => (
              <button
                key={f.label}
                className={`chip ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="trend-count">{shown.length} פינוקים בטרנד</p>

          <div className="show-grid">
            {shown.map((t) => (
              <article className="show-card" key={t.id}>
                <div className="show-card-photo">
                  <img src={t.image} alt={`טרנד ב־₪${t.price}`} loading="lazy" />
                  <span className="show-card-tag">טרנד</span>
                  <span className="price-flag">₪{t.price}</span>
                </div>
                <div className="show-card-body">
                  <AddToCart
                    product={{
                      key: `trend-${t.id}`,
                      name: `טרנד · ₪${t.price}`,
                      price: t.price,
                      emoji: '',
                      image: t.image,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
