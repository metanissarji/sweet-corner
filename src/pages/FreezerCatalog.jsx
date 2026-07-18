import { useParams, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { FREEZER_FRONT } from '../components/FreezerCard.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import './FreezerDeals.css';

/**
 * עמוד המקפיא הפתוח: לחיצה על מקפיא בעמוד המבצעים מגיעה לכאן.
 * למעלה — המקפיא עם המכסה פתוח, המספרים הגדולים והוספה לסל;
 * למטה — קטלוג כל הגלידות שנכללות במבצע (deal.products).
 */
export default function FreezerCatalog() {
  const { id } = useParams();
  const { freezerDeals } = useProducts();
  const { items } = useCart();
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
  // כמה גלידות מהמבצע הזה כבר בסל (מכל הטעמים ביחד) — לצורך חיווי ההתקדמות
  const inCart = products.reduce((sum, p) => sum + (items[`fz-${deal.id}-${p.id}`]?.qty || 0), 0);
  // המבצע חוזר על עצמו ללא הגבלה — כל {deal.qty} יחידות = ₪{deal.price} שוב
  const bundles = Math.floor(inCart / deal.qty);
  const dealReached = bundles > 0;
  const remainingToDeal = deal.qty - (inCart % deal.qty);

  return (
    <>
      <header className="page-header">
        <Link to="/deals" className="freezer-back-top">← כל המקפיאים</Link>
        <h1>מבצע {deal.qty} ב־₪{deal.price} </h1>
        <p>בוחרים {deal.qty} מהגלידות שבמקפיא — ומשלמים ₪{deal.price} בלבד</p>
      </header>

      <section className="page-section">
        <div className="container">
          {/* המקפיא הפתוח */}
          <div className="open-freezer">
            <div className="open-freezer-lid" aria-hidden="true" />
            <div className="freezer-glass open-freezer-glass">
              <img
                src={FREEZER_FRONT}
                alt={`מבצע ${deal.qty} ב-${deal.price} שקלים`}
                className="freezer-front-img"
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
              {deal.single ? (
                <p className="freezer-single-note">
                  כל יחידה בודדת <strong>₪{deal.single}</strong>.
                  <br />
                  {deal.qty} גלידות כלשהן מהמבצע (גם מטעמים שונים) = <strong>₪{deal.price}</strong> בלבד (במקום ₪{deal.qty * deal.single}).
                  <br />
                  והמבצע חוזר בלי הגבלה — {deal.qty * 2} גלידות = <strong>₪{deal.price * 2}</strong>, {deal.qty * 3} = <strong>₪{deal.price * 3}</strong> וכן הלאה
                </p>
              ) : null}
            </div>
          </div>

          {/* הגלידות שבמבצע */}
          <h2 className="section-title" style={{ marginTop: '3rem' }}>
            הגלידות <span className="highlight">שבמבצע</span>
          </h2>
          {deal.single ? (
            <p className="freezer-pick-hint">בחרו {deal.qty} גלידות כלשהן (גם מטעמים שונים) ותקבלו את המבצע — ₪{deal.price}</p>
          ) : null}

          {/* חיווי התקדמות למבצע — נצבר מכל הטעמים יחד */}
          {deal.single && inCart > 0 ? (
            <div className={`freezer-deal-banner ${dealReached && inCart % deal.qty === 0 ? 'freezer-deal-banner-done' : ''}`}>
              {dealReached && inCart % deal.qty === 0
                ? <>המבצע הופעל ×{bundles}! {inCart} גלידות = ₪{bundles * deal.price} בלבד · אפשר להמשיך — כל {deal.qty} נוספות שוב ב-₪{deal.price}</>
                : dealReached
                ? <>המבצע פעיל ×{bundles} — עוד <strong>{remainingToDeal}</strong> גלידות והמבצע יחול שוב</>
                : <>בחרתם {inCart} — עוד <strong>{remainingToDeal}</strong> גלידות ותשלמו רק ₪{deal.price}</>}
            </div>
          ) : null}

          {products.length > 0 ? (
            <div className="card-grid" style={{ marginTop: '2rem' }}>
              {products.map((p, i) => {
                const qty = items[`fz-${deal.id}-${p.id}`]?.qty || 0;
                return (
                  <article className={`card ${qty > 0 ? 'freezer-card-active' : ''}`} key={p.id}>
                    <div style={{ aspectRatio: '4 / 3' }}>
                      <ProductImage src={p.image} alt={`גלידה ${i + 1} — מבצע ${deal.qty} ב־₪${deal.price}`} emoji="" />
                    </div>
                    <div className="card-body freezer-product-body">
                      {deal.single ? (
                        <p className="freezer-single-price">₪{deal.single} <span>ליחידה</span></p>
                      ) : null}
                      <AddToCart
                        product={{
                          key: `fz-${deal.id}-${p.id}`,
                          name: `גלידה ${i + 1} · מבצע ${deal.qty} ב־₪${deal.price}`,
                          price: deal.single || deal.price,
                          emoji: '',
                          image: p.image,
                          dealId: deal.id,
                          dealQty: deal.qty,
                          dealPrice: deal.price,
                        }}
                      />
                    </div>
                  </article>
                );
              })}
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
