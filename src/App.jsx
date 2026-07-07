import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import Admin from './pages/Admin.jsx';
import OrdersPanel from './pages/OrdersPanel.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isBackoffice = pathname === '/admin' || pathname === '/orders-panel';

  return (
    <ProductsProvider>
      <OrdersProvider>
      <CartProvider>
        <ScrollToTop />
        {/* התפריט האמיתי מוצג בכל המסכים — הוא הניווט הפעיל של האתר.
            בעמוד הבית שרוֹת התפריט המצוירת שבעיצוב נחתכת (ראו BagHero) */}
        {!isBackoffice && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavors" element={<Flavors />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deals/catalog/:id" element={<CatalogProducts />} />
            <Route path="/deals/freezer/:id" element={<FreezerCatalog />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders-panel" element={<OrdersPanel />} />
          </Routes>
        </main>
        {!isBackoffice && <Footer />}
        {!isBackoffice && <CartDrawer />}
      </CartProvider>
      </OrdersProvider>
    </ProductsProvider>
  );
}
