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

  // מחיר "מלא" — כל יחידה לפי מחירה הבודד, בלי הנחות מבצע
  const fullTotal = list.reduce((sum, it) => sum + it.qty * it.price, 0);

  // מחיר בפועל — יחידות של אותו מבצע נצברות יחד (מכל טעם שהוא): {dealQty}
  // גלידות כלשהן מהמבצע במחיר המבצע (פעם אחת), וכל יחידה נוספת במחיר הבודד.
  const dealGroups = {};
  let total = 0;
  for (const it of list) {
    if (it.dealId != null && it.dealQty && it.dealPrice != null) {
      const g = dealGroups[it.dealId] || (dealGroups[it.dealId] = { qty: 0, dealQty: it.dealQty, dealPrice: it.dealPrice, single: it.price });
      g.qty += it.qty;
    } else {
      total += it.qty * it.price;
    }
  }
  for (const id in dealGroups) {
    const g = dealGroups[id];
    total += g.qty >= g.dealQty
      ? g.dealPrice + (g.qty - g.dealQty) * g.single
      : g.qty * g.single;
  }

  const dealSavings = Math.max(0, fullTotal - total);

  return (
    <CartContext.Provider
      value={{ items, list, count, total, fullTotal, dealSavings, add, remove, clear, drawerOpen, setDrawerOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
