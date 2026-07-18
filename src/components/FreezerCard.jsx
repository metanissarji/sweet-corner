import { Link } from 'react-router-dom';
import '../pages/FreezerDeals.css';

/* חזית המקפיא הממותגת — אותה תמונה לכל המבצעים (הבראד של החנות) */
export const FREEZER_FRONT = '/images/freezer-front.jpg';

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

      {/* חלון הזכוכית — חזית הבראד הממותגת */}
      <div className="freezer-glass">
        <img src={FREEZER_FRONT} alt="" decoding="async" className="freezer-front-img" />
        {/* מדבקת המחיר על הזכוכית */}
        <span className="freezer-glass-badge">
          {deal.qty} ב־₪{deal.price}
        </span>
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
