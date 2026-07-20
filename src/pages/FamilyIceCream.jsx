import AddToCart from '../components/AddToCart.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { familyItems } from '../data/products.js';
import './Showcase.css';

/**
 * גלידה משפחתית — אריזות ליטר וחצי לכל המשפחה.
 * מוצר עם price === null מוצג "זמין בסניף" עד שהמחיר יעודכן.
 */
export default function FamilyIceCream() {
  const { t } = useLang();
  const hasUnpriced = familyItems.some((f) => f.price == null);

  return (
    <>
      <header className="page-header">
        <h1>{t('family.title')}</h1>
        <p>{t('family.sub')}</p>
      </header>

      <section className="page-section">
        <div className="container">
          {hasUnpriced && <p className="show-note">{t('common.priceNote')}</p>}

          <div className="show-grid">
            {familyItems.map((f) => (
              <article className="show-card" key={f.id}>
                <div className="show-card-photo">
                  <img src={f.image} alt={t('family.alt')} loading="lazy" />
                  <span className="show-card-tag">{t('family.tag')}</span>
                  {f.price != null && <span className="price-flag">₪{f.price}</span>}
                </div>
                <div className="show-card-body">
                  {f.price != null ? (
                    <AddToCart
                      product={{
                        key: `family-${f.id}`,
                        name: t('family.itemName', { p: f.price }),
                        price: f.price,
                        emoji: '',
                        image: f.image,
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
