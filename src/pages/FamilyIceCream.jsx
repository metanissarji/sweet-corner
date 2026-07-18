import AddToCart from '../components/AddToCart.jsx';
import { familyItems } from '../data/products.js';
import './Showcase.css';

/**
 * גלידה משפחתית — אריזות ליטר וחצי לכל המשפחה.
 * מוצר עם price === null מוצג "זמין בסניף" עד שהמחיר יעודכן.
 */
export default function FamilyIceCream() {
  const hasUnpriced = familyItems.some((f) => f.price == null);

  return (
    <>
      <header className="page-header">
        <h1>גלידה משפחתית 🏠</h1>
        <p>אריזות גדולות לחלוק עם כולם — הטעמים שכל המשפחה מחכה להם</p>
      </header>

      <section className="page-section">
        <div className="container">
          {hasUnpriced && (
            <p className="show-note">
              המחירים באתר יעודכנו ממש בקרוב 🍦 בינתיים אפשר לראות הכל כאן — ולטעום בסניף!
            </p>
          )}

          <div className="show-grid">
            {familyItems.map((f) => (
              <article className="show-card" key={f.id}>
                <div className="show-card-photo">
                  <img src={f.image} alt="גלידה משפחתית" loading="lazy" />
                  <span className="show-card-tag">🏠 משפחתי</span>
                  {f.price != null && <span className="price-flag">₪{f.price}</span>}
                </div>
                <div className="show-card-body">
                  {f.price != null ? (
                    <AddToCart
                      product={{
                        key: `family-${f.id}`,
                        name: `גלידה משפחתית · ₪${f.price}`,
                        price: f.price,
                        emoji: '',
                        image: f.image,
                      }}
                    />
                  ) : (
                    <span className="show-card-instore">זמין בסניף 🍨</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
