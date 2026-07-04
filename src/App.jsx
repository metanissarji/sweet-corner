import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useHomePhoto from './hooks/useHomePhoto.js';
import { CartProvider } from './context/CartContext.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Flavors from './pages/Flavors.jsx';
import Deals from './pages/Deals.jsx';
import Packages from './pages/Packages.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Branches from './pages/Branches.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const homePhotoExists = useHomePhoto();
  // כשעיצוב הרוחב המלא משמש כרקע עמוד הבית (עם תפריט בתוך התמונה) —
  // התפריט הרגיל מוצג רק במסכים צרים
  const photoHome = homePhotoExists === true && pathname === '/';

  return (
    <CartProvider>
      <ScrollToTop />
      {/* בעמוד הבית עם תמונת העיצוב — התפריט כבר בתוך התמונה, לכן
          התפריט הרגיל מוצג רק במסכים צרים שבהם קשה ללחוץ על התמונה */}
      <div className={photoHome ? 'navbar-mobile-only' : undefined}>
        <Navbar />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/branches" element={<Branches />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
