import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import useHomePhoto from './hooks/useHomePhoto.js';
import { CartProvider } from './context/CartContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Flavors from './pages/Flavors.jsx';
import Deals from './pages/Deals.jsx';
import CatalogProducts from './pages/CatalogProducts.jsx';
import FreezerCatalog from './pages/FreezerCatalog.jsx';
import Packages from './pages/Packages.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Branches from './pages/Branches.jsx';
/* עמודי הניהול נטענים רק כשנכנסים אליהם — לא מעכבים את הלקוחות */
const Admin = lazy(() => import('./pages/Admin.jsx'));
const OrdersPanel = lazy(() => import('./pages/OrdersPanel.jsx'));
import Trends from './pages/Trends.jsx';
import FamilyIceCream from './pages/FamilyIceCream.jsx';

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
  const isBackoffice = pathname === '/admin' || pathname === '/orders-panel';
  // בעמוד הבית מוצג הפוסטר המלא עם התפריט המצויר שבתוכו (עם אזורי לחיצה),
  // לכן מסתירים את התפריט הרגיל שם כדי שלא יופיע תפריט כפול.
  const posterHome = pathname === '/' && homePhotoExists === true;

  useEffect(() => {
    const pcBgPages = ['/flavors', '/deals', '/packages', '/about', '/contact', '/branches', '/trends', '/family'];
    // התאמה גם לעמודי משנה (למשל /deals/freezer/3) — שהמעבר בין עמודים ירגיש אחיד
    if (pcBgPages.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
      document.body.classList.add('page-bg-sections');
    } else {
      document.body.classList.remove('page-bg-sections');
    }
  }, [pathname]);

  return (
    <ProductsProvider>
      <OrdersProvider>
      <CartProvider>
        <ScrollToTop />
        {!isBackoffice && <Navbar />}
        <main>
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavors" element={<Flavors />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/family" element={<FamilyIceCream />} />
            <Route path="/deals/catalog/:id" element={<CatalogProducts />} />
            <Route path="/deals/freezer/:id" element={<FreezerCatalog />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders-panel" element={<OrdersPanel />} />
          </Routes>
          </Suspense>
        </main>
        {!isBackoffice && <Footer />}
        {!isBackoffice && <CartDrawer />}
      </CartProvider>
      </OrdersProvider>
    </ProductsProvider>
  );
}
