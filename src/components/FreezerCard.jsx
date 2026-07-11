import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import '../pages/FreezerDeals.css';

/**
 * כרטיס מקפיא (בראד) לחיץ — לחיצה פותחת את עמוד המבצע.
 * משמש גם בעמוד המבצעים וגם ברשת המבצעים שבעמוד הבית.
 */
export default function FreezerCard({ deal }) {
  return (
    <Link
      to={`/deals/freezer/${deal.id}`}
      className="freezer freezer-link"
      aria-label={`פתיחת מבצע ${deal.qty} ב-${deal.price} שקלים`}
    >
      <span className="freezer-ribbon">מבצע</span>
      <span className="freezer-flake" aria-hidden="true"></span>

      {/* חלון הזכוכית עם גלידות המבצע */}
      <div className="freezer-glass">
        <ProductImage src={deal.image} alt="" emoji="" />
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
  );
}
