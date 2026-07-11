import { useParams, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import './FreezerDeals.css';

/**
 * עמוד המקפיא הפתוח: לחיצה על מקפיא בעמוד המבצעים מגיעה לכאן.
 * למעלה — המקפיא עם המכסה פתוח, המספרים הגדולים והוספה לסל;
 * למטה — קטלוג כל הגלידות שנכללות במבצע (deal.products).
 */
export default function FreezerCatalog() {
  const { id } = useParams();
  const { freezerDeals } = useProducts();
  const deal = (freezerDeals || []).find((d) => String(d.id) === id);

  if (!deal) {
    return (
      <div className="page-header">
        <h1>המקפיא לא נמצא </h1>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/deals" className="btn btn-pink">← חזרה למבצעים</Link>
        </p>
      </div>
    );
  }

  const products = deal.products || [];

  return (
    <>
      <header className="page-header">
        <h1>מבצע {deal.qty} ב־₪{deal.price} </h1>
        <p>בוחרים {deal.qty} מהגלידות שבמקפיא — ומשלמים ₪{deal.price} בלבד</p>
      </header>

      <section className="page-section">
        <div className="container">
          {/* המקפיא הפתוח */}
          <div className="open-freezer">
            <div className="open-freezer-lid" aria-hidden="true" />
            <div className="freezer-glass open-freezer-glass">
              <ProductImage
                src={deal.image}
                alt={`מבצע ${deal.qty} ב-${deal.price} שקלים`}
                emoji=""
              />
              <span className="freezer-shine" aria-hidden="true" />
            </div>
            <div className="open-freezer-info freezer">
              <p className="freezer-deal">
                <span className="freezer-qty">{deal.qty}</span>
                <span className="freezer-be">ב־</span>
                <span className="freezer-price">₪{deal.price}</span>
              </p>
              <p className="freezer-units">{deal.qty} יחידות לבחירה</p>
              <div className="freezer-buy">
                <AddToCart
                  product={{
                    key: `freezer-${deal.id}`,
                    name: `מבצע ${deal.qty} ב־₪${deal.price}`,
                    price: deal.price,
                    emoji: '',
                  }}
                />
              </div>
              <p className="freezer-units" style={{ opacity: 0.75 }}>ההוספה לסל היא למבצע שלם</p>
            </div>
          </div>

          {/* הגלידות שבמבצע */}
          <h2 className="section-title" style={{ marginTop: '3rem' }}>
            הגלידות <span className="highlight">שבמבצע</span>
          </h2>

          {products.length > 0 ? (
            <div className="card-grid" style={{ marginTop: '2rem' }}>
              {products.map((p) => (
                <article className="card" key={p.id}>
                  <div style={{ aspectRatio: '4 / 3' }}>
                    <ProductImage src={p.image} alt={p.name} emoji={p.emoji || ''} />
                  </div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="freezer-empty">
              <span aria-hidden="true"></span>
              <p>הגלידות של המקפיא הזה יתווספו ממש בקרוב!</p>
              <p className="freezer-empty-hint">כל גלידה שתופיע כאן נכנסת במבצע {deal.qty} ב־₪{deal.price}</p>
            </div>
          )}

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/deals" className="btn btn-outline">← חזרה לכל המקפיאים</Link>
          </div>
        </div>
      </section>
    </>
  );
}
