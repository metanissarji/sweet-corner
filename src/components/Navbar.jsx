import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'דף הבית' },
  { to: '/flavors', label: 'מיוחדים שלנו' },
  { to: '/deals', label: 'מבצעים' },
  { to: '/contact', label: 'צור קשר' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          דף הבית
        </NavLink>
        <NavLink to="/flavors" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          מיוחדים שלנו
        </NavLink>
        <NavLink to="/deals" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          מבצעים
        </NavLink>

        <Link to="/" className="logo">
          <img src="/images/character.png" alt="הפינה המתוקה" className="logo-img logo-character" />
        </Link>

        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          צור קשר
        </NavLink>
        <NavLink to="/branches" className="btn btn-pink branches-btn">
          <span aria-hidden="true">📍</span> סניפים
        </NavLink>
      </div>
    </header>
  );
}
