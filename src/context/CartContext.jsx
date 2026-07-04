import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'sweet-corner-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function add(product) {
    setItems((prev) => {
      const existing = prev[product.key];
      return {
        ...prev,
        [product.key]: { ...product, qty: (existing?.qty || 0) + 1 },
      };
    });
  }

  function remove(key) {
    setItems((prev) => {
      const existing = prev[key];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const { [key]: _gone, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: { ...existing, qty: existing.qty - 1 } };
    });
  }

  function clear() {
    setItems({});
  }

  const list = Object.values(items);
  const count = list.reduce((sum, it) => sum + it.qty, 0);
  const total = list.reduce((sum, it) => sum + it.qty * it.price, 0);

  return (
    <CartContext.Provider
      value={{ items, list, count, total, add, remove, clear, drawerOpen, setDrawerOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
