import { NavLink } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';
import './Navbar.css';

const LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/flavors', key: 'nav.specials' },
  { to: '/deals', key: 'nav.deals' },
  { to: '/trends', key: 'nav.trends' },
  { to: '/family', key: 'nav.family' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Navbar() {
  const { t, toggleLang } = useLang();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {t(l.key)}
          </NavLink>
        ))}
        <NavLink
          to="/branches"
          className={({ isActive }) => (isActive ? 'nav-link nav-link-wide active' : 'nav-link nav-link-wide')}
        >
          {t('nav.branches')}
        </NavLink>
        {/* מעבר שפה עברית ↔ ערבית */}
        <button type="button" className="lang-toggle" onClick={toggleLang}>
          {t('lang.switch')}
        </button>
      </div>
      {/* סוכך הדוכן — החתימה הוויזואלית, מופיע בכל עמוד */}
      <div className="awning" aria-hidden="true" />
    </header>
  );
}
