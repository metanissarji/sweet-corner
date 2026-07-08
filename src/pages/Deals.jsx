import FreezerCard from '../components/FreezerCard.jsx';
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
              <FreezerCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
