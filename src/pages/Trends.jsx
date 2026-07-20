import { useState } from 'react';
import AddToCart from '../components/AddToCart.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { trendItems } from '../data/products.js';
import './Showcase.css';

/* קבוצות מחיר לסינון מהיר — נוח במיוחד במובייל */
const FILTERS = [
  { key: 'trends.filterAll', test: () => true },
  { key: 'trends.filterTo15', test: (p) => p <= 15 },
  { key: 'trends.filter16to30', test: (p) => p >= 16 && p <= 30 },
  { key: 'trends.filter31up', test: (p) => p >= 31 },
];

/**
 * עמוד הטרנדים — כל התמונות מתיקיית trend, כל תיקייה = מחיר.
 * כרטיסים עם דגל מחיר צהוב והוספה מהירה לסל.
 */
export default function Trends() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const shown = trendItems.filter((it) => FILTERS[active].test(it.price));

  return (
    <>
      <header className="page-header">
        <h1>{t('trends.title')}</h1>
        <p>{t('trends.sub')}</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="chip-row">
            {FILTERS.map((f, i) => (
              <button
                key={f.key}
                className={`chip ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {t(f.key)}
              </button>
            ))}
          </div>
          <p className="trend-count">{t('trends.count', { n: shown.length })}</p>

          <div className="show-grid">
            {shown.map((it) => (
              <article className="show-card" key={it.id}>
                <div className="show-card-photo">
                  <img src={it.image} alt={t('trends.itemAlt', { p: it.price })} loading="lazy" />
                  <span className="show-card-tag">{t('trends.tag')}</span>
                  <span className="price-flag">₪{it.price}</span>
                </div>
                <div className="show-card-body">
                  <AddToCart
                    product={{
                      key: `trend-${it.id}`,
                      name: t('trends.itemName', { p: it.price }),
                      price: it.price,
                      emoji: '',
                      image: it.image,
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
