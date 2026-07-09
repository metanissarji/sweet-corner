import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'דף הבית' },
  { to: '/flavors', label: 'הטעמים שלנו' },
  { to: '/deals', label: 'מבצעים' },
  { to: '/about', label: 'אודות' },
  { to: '/contact', label: 'צור קשר' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="הפינה המתוקה" className="logo-img" />
        </Link>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/branches" className="btn btn-pink branches-btn">
            <span aria-hidden="true">📍</span> סניפים
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
