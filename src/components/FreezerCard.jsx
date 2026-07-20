import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';
import '../pages/FreezerDeals.css';

/* חזית המקפיא הממותגת — אותה תמונה לכל המבצעים (הבראד של החנות) */
export const FREEZER_FRONT = '/images/freezer-front-v2.jpg';

/**
 * כרטיס מקפיא (בראד) לחיץ — לחיצה פותחת את עמוד המבצע.
 * משמש גם בעמוד המבצעים וגם ברשת המבצעים שבעמוד הבית.
 */
export default function FreezerCard({ deal }) {
  const { t } = useLang();

  return (
    <Link
      to={`/deals/freezer/${deal.id}`}
      className="freezer freezer-link"
      aria-label={t('freezer.aria', { q: deal.qty, p: deal.price })}
    >
      <span className="freezer-ribbon">{t('freezer.ribbon')}</span>
      <span className="freezer-flake" aria-hidden="true"></span>

      {/* חלון הזכוכית — חזית הבראד הממותגת */}
      <div className="freezer-glass">
        <img src={FREEZER_FRONT} alt="" decoding="async" className="freezer-front-img" />
        {/* מדבקת המחיר על הזכוכית */}
        <span className="freezer-glass-badge">
          {deal.qty} {t('freezer.be')}₪{deal.price}
        </span>
        <span className="freezer-shine" aria-hidden="true" />
      </div>

      {/* ידית המקפיא */}
      <div className="freezer-handle" aria-hidden="true" />

      {/* גוף המקפיא */}
      <div className="freezer-body">
        <p className="freezer-deal">
          <span className="freezer-qty">{deal.qty}</span>
          <span className="freezer-be">{t('freezer.be')}</span>
          <span className="freezer-price">₪{deal.price}</span>
        </p>
        <p className="freezer-units">{t('freezer.units', { q: deal.qty })}</p>
        <span className="freezer-open-hint">{t('freezer.open')}</span>
      </div>
    </Link>
  );
}
