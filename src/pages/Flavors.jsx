import AddToCart from '../components/AddToCart.jsx';
import { specialItems } from '../data/products.js';
import './Showcase.css';

/**
 * מיוחדים שלנו — רק התמונות האמיתיות מהסניף, בפריסה מלאה על כל העמוד.
 * מוצר עם מחיר מקבל כפתור הוספה לסל; בלי מחיר — "זמין בסניף".
 */
export default function Flavors() {
  return (
    <>
      <header className="page-header">
        <h1>מיוחדים שלנו</h1>
        <p>הטעמים המיוחדים שרק אצלנו תמצאו — בואו לטעום </p>
      </header>

      <section className="page-section">
        <div className="container">
          {specialItems.some((sp) => sp.price == null) && (
            <p className="show-note">המחירים באתר יעודכנו ממש בקרוב — בינתיים אפשר לראות הכל כאן, ולטעום בסניף!</p>
          )}
          <div className="show-grid">
            {specialItems.map((sp) => (
              <article className="show-card" key={sp.id}>
                <div className="show-card-photo">
                  <img src={sp.image} alt="מיוחד של הפינה המתוקה" loading="lazy" />
                  <span className="show-card-tag">מיוחד</span>
                  {sp.price != null && <span className="price-flag">₪{sp.price}</span>}
                </div>
                <div className="show-card-body">
                  {sp.price != null ? (
                    <AddToCart
                      product={{
                        key: `special-${sp.id}`,
                        name: `מיוחד שלנו · ₪${sp.price}`,
                        price: sp.price,
                        emoji: '',
                        image: sp.image,
                      }}
                    />
                  ) : (
                    <span className="show-card-instore">זמין בסניף</span>
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
