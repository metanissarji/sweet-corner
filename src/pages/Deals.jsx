import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import './FreezerDeals.css';

/**
 * עמוד המבצעים: כל מבצע מוצג כמקפיא (בראד) —
 * חלון זכוכית עם תמונת הגלידות של המבצע, כמות ומחיר גדולים,
 * וכפתור הוספה לסל. התמונות: public/images/mivtza-XX.png
 */
export default function Deals() {
  const { freezerDeals } = useProducts();

  return (
    <>
      <header className="page-header">
        <h1>מבצעים חמים 🔥</h1>
        <p>פותחים את המקפיא — בוחרים מבצע ומוסיפים לסל 🧊</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="freezer-grid">
            {(freezerDeals || []).map((deal) => (
              <article className="freezer" key={deal.id}>
                <span className="freezer-ribbon">מבצע</span>
                <span className="freezer-flake" aria-hidden="true">❄</span>

                {/* חלון הזכוכית עם גלידות המבצע */}
                <div className="freezer-glass">
                  <ProductImage
                    src={deal.image}
                    alt={`מבצע ${deal.qty} ב-${deal.price} שקלים`}
                    emoji="🍦"
                  />
                  <span className="freezer-shine" aria-hidden="true" />
                </div>

                {/* ידית המקפיא */}
                <div className="freezer-handle" aria-hidden="true" />

                {/* גוף המקפיא: המספרים הגדולים והקנייה */}
                <div className="freezer-body">
                  <p className="freezer-deal">
                    <span className="freezer-qty">{deal.qty}</span>
                    <span className="freezer-be">ב־</span>
                    <span className="freezer-price">₪{deal.price}</span>
                  </p>
                  <p className="freezer-units">{deal.qty} יחידות במבצע</p>
                  <div className="freezer-buy">
                    <AddToCart
                      product={{
                        key: `freezer-${deal.id}`,
                        name: `מבצע ${deal.qty} ב־₪${deal.price}`,
                        price: deal.price,
                        emoji: '🍦',
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center freezer-note">
            * המחיר בסל הוא למבצע שלם ({`כמות × מחיר`} כפי שמופיע על כל מקפיא)
          </p>
        </div>
      </section>
    </>
  );
}
