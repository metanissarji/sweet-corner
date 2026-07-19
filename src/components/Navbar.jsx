import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'דף הבית' },
  { to: '/flavors', label: 'מיוחדים שלנו' },
  { to: '/deals', label: 'מבצעים' },
  { to: '/trends', label: 'טרנדים' },
  { to: '/family', label: 'גלידה משפחתית' },
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
        <NavLink to="/trends" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          טרנדים
        </NavLink>
        <NavLink to="/family" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          גלידה משפחתית
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          צור קשר
        </NavLink>
        <NavLink to="/branches" className={({ isActive }) => (isActive ? 'nav-link nav-link-wide active' : 'nav-link nav-link-wide')}>
          סניפים
        </NavLink>
      </div>
      {/* סוכך הדוכן — החתימה הוויזואלית, מופיע בכל עמוד */}
      <div className="awning" aria-hidden="true" />
    </header>
  );
}
