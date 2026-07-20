import { useParams, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { FREEZER_FRONT } from '../components/FreezerCard.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
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
  const { t } = useLang();
  const deal = (freezerDeals || []).find((d) => String(d.id) === id);

  if (!deal) {
    return (
      <div className="page-header">
        <h1>{t('fz.notFound')}</h1>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/deals" className="btn btn-pink">{t('fz.backDeals')}</Link>
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
        <Link to="/deals" className="freezer-back-top">{t('fz.backTop')}</Link>
        <h1>{t('fz.title', { q: deal.qty, p: deal.price })}</h1>
        <p>{t('fz.sub', { q: deal.qty, p: deal.price })}</p>
      </header>

      <section className="page-section">
        <div className="container">
          {/* המקפיא הפתוח */}
          <div className="open-freezer">
            <div className="open-freezer-lid" aria-hidden="true" />
            <div className="freezer-glass open-freezer-glass">
              <img
                src={FREEZER_FRONT}
                alt={t('fz.title', { q: deal.qty, p: deal.price })}
                className="freezer-front-img"
              />
              <span className="freezer-shine" aria-hidden="true" />
            </div>
            <div className="open-freezer-info freezer">
              <p className="freezer-deal">
                <span className="freezer-qty">{deal.qty}</span>
                <span className="freezer-be">{t('freezer.be')}</span>
                <span className="freezer-price">₪{deal.price}</span>
              </p>
              <p className="freezer-units">{t('fz.unitsPick', { q: deal.qty })}</p>
              {deal.single ? (
                <p className="freezer-single-note">
                  {t('fz.note1')} <strong>₪{deal.single}</strong>.
                  <br />
                  {t('fz.note2', { q: deal.qty })} <strong>₪{deal.price}</strong> {t('fz.note2b', { full: deal.qty * deal.single })}
                  <br />
                  {t('fz.note3', { q2: deal.qty * 2 })} <strong>₪{deal.price * 2}</strong>, {deal.qty * 3} = <strong>₪{deal.price * 3}</strong> {t('fz.note3b')}
                </p>
              ) : null}
            </div>
          </div>

          {/* הגלידות שבמבצע */}
          <h2 className="section-title" style={{ marginTop: '3rem' }}>
            {t('fz.includedPre')} <span className="highlight">{t('fz.includedHl')}</span>
          </h2>
          {deal.single ? (
            <p className="freezer-pick-hint">{t('fz.pickHint', { q: deal.qty, p: deal.price })}</p>
          ) : null}

          {/* חיווי התקדמות למבצע — נצבר מכל הטעמים יחד */}
          {deal.single && inCart > 0 ? (
            <div className={`freezer-deal-banner ${dealReached && inCart % deal.qty === 0 ? 'freezer-deal-banner-done' : ''}`}>
              {dealReached && inCart % deal.qty === 0
                ? t('fz.bannerDone', { n: bundles, c: inCart, t: bundles * deal.price, q: deal.qty, p: deal.price })
                : dealReached
                ? t('fz.bannerActive', { n: bundles, r: remainingToDeal })
                : t('fz.bannerProgress', { c: inCart, r: remainingToDeal, p: deal.price })}
            </div>
          ) : null}

          {products.length > 0 ? (
            <div className="card-grid" style={{ marginTop: '2rem' }}>
              {products.map((p, i) => {
                const qty = items[`fz-${deal.id}-${p.id}`]?.qty || 0;
                return (
                  <article className={`card ${qty > 0 ? 'freezer-card-active' : ''}`} key={p.id}>
                    <div className="product-photo" style={{ aspectRatio: '1 / 1' }}>
                      <ProductImage src={p.image} alt={t('fz.itemAlt', { i: i + 1, q: deal.qty, p: deal.price })} emoji="" />
                    </div>
                    <div className="card-body freezer-product-body">
                      {deal.single ? (
                        <p className="freezer-single-price">₪{deal.single} <span>{t('fz.perUnit')}</span></p>
                      ) : null}
                      <AddToCart
                        product={{
                          key: `fz-${deal.id}-${p.id}`,
                          name: t('fz.itemName', { i: i + 1, q: deal.qty, p: deal.price }),
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
              <p>{t('fz.empty1')}</p>
              <p className="freezer-empty-hint">{t('fz.empty2', { q: deal.qty, p: deal.price })}</p>
            </div>
          )}

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/deals" className="btn btn-outline">{t('fz.backBottom')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
