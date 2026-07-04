import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const links = [
  { to: '/', label: 'דף הבית' },
  { to: '/flavors', label: 'הטעמים שלנו' },
  { to: '/deals', label: 'מבצעים' },
  { to: '/packages', label: 'מארזים' },
  { to: '/about', label: 'אודות' },
  { to: '/contact', label: 'צור קשר' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="הפינה המתוקה" className="logo-img" />
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/branches" className="btn btn-pink branches-btn" onClick={() => setOpen(false)}>
            <span aria-hidden="true">📍</span> סניפים
          </NavLink>
        </nav>

        <button
          className="menu-toggle"
          aria-label="תפריט"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
