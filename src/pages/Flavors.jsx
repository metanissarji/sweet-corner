import AddToCart from '../components/AddToCart.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { specialItems } from '../data/products.js';
import './Showcase.css';

/**
 * מיוחדים שלנו — רק התמונות האמיתיות מהסניף, בפריסה מלאה על כל העמוד.
 * מוצר עם מחיר מקבל כפתור הוספה לסל; בלי מחיר — "זמין בסניף".
 */
export default function Flavors() {
  const { t } = useLang();

  return (
    <>
      <header className="page-header">
        <h1>{t('specials.title')}</h1>
        <p>{t('specials.sub')}</p>
      </header>

      <section className="page-section">
        <div className="container">
          {specialItems.some((sp) => sp.price == null) && (
            <p className="show-note">{t('common.priceNote')}</p>
          )}
          <div className="show-grid">
            {specialItems.map((sp) => (
              <article className="show-card" key={sp.id}>
                <div className="show-card-photo">
                  <img src={sp.image} alt={t('specials.alt')} loading="lazy" />
                  <span className="show-card-tag">{t('specials.tag')}</span>
                  {sp.price != null && <span className="price-flag">₪{sp.price}</span>}
                </div>
                <div className="show-card-body">
                  {sp.price != null ? (
                    <AddToCart
                      product={{
                        key: `special-${sp.id}`,
                        name: t('specials.itemName', { p: sp.price }),
                        price: sp.price,
                        emoji: '',
                        image: sp.image,
                      }}
                    />
                  ) : (
                    <span className="show-card-instore">{t('common.instore')}</span>
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
