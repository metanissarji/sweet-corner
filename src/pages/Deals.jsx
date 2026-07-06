import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import './FreezerDeals.css';

/**
 * עמוד המבצעים: כל מבצע הוא מקפיא (בראד) לחיץ —
 * לחיצה פותחת את עמוד המקפיא עם כל הגלידות שנכללות במבצע.
 */
export default function Deals() {
  const { freezerDeals } = useProducts();

  return (
    <>
      <header className="page-header">
        <h1>מבצעים חמים 🔥</h1>
        <p>לוחצים על מקפיא כדי לפתוח אותו ולראות את כל הגלידות שבמבצע 🧊</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="freezer-grid">
            {(freezerDeals || []).map((deal) => (
              <Link
                to={`/deals/freezer/${deal.id}`}
                className="freezer freezer-link"
                key={deal.id}
                aria-label={`פתיחת מבצע ${deal.qty} ב-${deal.price} שקלים`}
              >
                <span className="freezer-ribbon">מבצע</span>
                <span className="freezer-flake" aria-hidden="true">❄</span>

                {/* חלון הזכוכית עם גלידות המבצע */}
                <div className="freezer-glass">
                  <ProductImage
                    src={deal.image}
                    alt=""
                    emoji="🍦"
                  />
                  <span className="freezer-shine" aria-hidden="true" />
                </div>

                {/* ידית המקפיא */}
                <div className="freezer-handle" aria-hidden="true" />

                {/* גוף המקפיא */}
                <div className="freezer-body">
                  <p className="freezer-deal">
                    <span className="freezer-qty">{deal.qty}</span>
                    <span className="freezer-be">ב־</span>
                    <span className="freezer-price">₪{deal.price}</span>
                  </p>
                  <p className="freezer-units">{deal.qty} יחידות במבצע</p>
                  <span className="freezer-open-hint">פתחו את המקפיא ←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
