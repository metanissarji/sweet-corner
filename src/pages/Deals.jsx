import FreezerCard from '../components/FreezerCard.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import './FreezerDeals.css';

/**
 * עמוד המבצעים: כל מבצע הוא מקפיא (בראד) לחיץ —
 * לחיצה פותחת את עמוד המקפיא עם כל הגלידות שנכללות במבצע.
 */
export default function Deals() {
  const { freezerDeals } = useProducts();
  const { t } = useLang();

  return (
    <>
      <header className="page-header">
        <h1>{t('deals.title')}</h1>
        <p>{t('deals.sub')}</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="freezer-grid">
            {(freezerDeals || []).map((deal) => (
              <FreezerCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
