import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import {
  flavors as defaultFlavors,
  favorites as defaultFavorites,
  dealCatalogs as defaultDealCatalogs,
  deals as defaultDeals,
  packages as defaultPackages,
  freezerDeals as defaultFreezerDeals,
  STATIC_DATA_VERSION,
} from '../data/products.js';

const ProductsContext = createContext(null);
const STORAGE_KEY = 'sweet-corner-products';

const DEFAULT_DATA = {
  flavors: defaultFlavors,
  favorites: defaultFavorites,
  dealCatalogs: defaultDealCatalogs,
  deals: defaultDeals,
  packages: defaultPackages,
  freezerDeals: defaultFreezerDeals,
};

const CATEGORIES = ['flavors', 'favorites', 'dealCatalogs', 'deals', 'packages', 'freezerDeals'];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function ProductsProvider({ children }) {
  const [data, setData] = useState(() => loadFromStorage() ?? DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false); // true once Supabase data arrives
  const saveTimer = useRef(null);

  /* ── 1. Load from Supabase on mount ── */
  useEffect(() => {
    if (!supabase) { setLoaded(true); return; }

    supabase
      .from('products_catalog')
      .select('id, data, updated_at')
      .then(({ data: rows, error }) => {
        // תמיד ממזגים מחדש מעל ברירות המחדל — כך לקוח עם localStorage ישן
        // לא נתקע עם נתונים מיושנים כשאין (או חסרה) שורה ב-Supabase.
        if (error) { setLoaded(true); return; }
        const merged = { ...DEFAULT_DATA };
        (rows || []).forEach((row) => {
          if (merged[row.id] === undefined) return;
          // שורה ישנה מגרסת הנתונים שבקוד (ייבוא תמונות וכו') — הקוד מנצח.
          // עריכה של האדמין אחרי הדיפלוי תמיד חדשה יותר ולכן תנצח.
          if (row.updated_at && new Date(row.updated_at) < new Date(STATIC_DATA_VERSION)) return;
          merged[row.id] = row.data;
        });
        setData(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        setLoaded(true);
      });

    /* ── 2. Realtime: admin changes → all customers see update immediately ── */
    const channel = supabase
      .channel('products-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products_catalog' }, (payload) => {
        const { id, data: newData } = payload.new || {};
        if (!id || !newData) return;
        setData((prev) => {
          const next = { ...prev, [id]: newData };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  /* ── 3. Persist to localStorage whenever data changes ── */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  /* ── 4. Cross-tab sync (same computer, different tabs) ── */
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY) {
        const saved = loadFromStorage();
        if (saved) setData(saved);
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /* ── 5. Debounced save to Supabase ── */
  const saveToSupabase = useCallback((category, value) => {
    if (!supabase) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await supabase.from('products_catalog').upsert({ id: category, data: value, updated_at: new Date().toISOString() });
    }, 600); // wait 600ms after last change before saving
  }, []);

  /* ── Helpers ── */
  function updateProduct(category, id, updates) {
    setData((prev) => {
      const next = { ...prev, [category]: prev[category].map((item) => item.id === id ? { ...item, ...updates } : item) };
      saveToSupabase(category, next[category]);
      return next;
    });
  }

  function addProduct(category, product) {
    setData((prev) => {
      const maxId = prev[category].reduce((max, p) => Math.max(max, p.id), 0);
      const next = { ...prev, [category]: [...prev[category], { ...product, id: maxId + 1 }] };
      saveToSupabase(category, next[category]);
      return next;
    });
  }

  function deleteProduct(category, id) {
    setData((prev) => {
      const next = { ...prev, [category]: prev[category].filter((item) => item.id !== id) };
      saveToSupabase(category, next[category]);
      return next;
    });
  }

  function moveProduct(category, id, direction, catalogId = null) {
    setData((prev) => {
      const arr = prev[category];
      const viewArr = catalogId ? arr.filter(item => item.catalogId === catalogId) : [...arr];
      const indexInView = viewArr.findIndex(item => item.id === id);
      if (indexInView === -1) return prev;
      const item = viewArr.splice(indexInView, 1)[0];
      if (direction === 'up') viewArr.splice(Math.max(0, indexInView - 1), 0, item);
      else if (direction === 'down') viewArr.splice(Math.min(viewArr.length, indexInView + 1), 0, item);
      else if (direction === 'top') viewArr.unshift(item);
      else if (direction === 'bottom') viewArr.push(item);

      let newCategoryArr;
      if (catalogId) {
        const viewIndices = arr.map((it, idx) => it.catalogId === catalogId ? idx : -1).filter(idx => idx !== -1);
        newCategoryArr = [...arr];
        for (let i = 0; i < viewIndices.length; i++) newCategoryArr[viewIndices[i]] = viewArr[i];
      } else {
        newCategoryArr = viewArr;
      }
      const next = { ...prev, [category]: newCategoryArr };
      saveToSupabase(category, next[category]);
      return next;
    });
  }

  function resetToDefaults() {
    setData(DEFAULT_DATA);
    CATEGORIES.forEach((cat) => saveToSupabase(cat, DEFAULT_DATA[cat]));
  }

  function addFreezerProduct(freezerId, product) {
    setData((prev) => {
      const next = {
        ...prev,
        freezerDeals: prev.freezerDeals.map((fd) => {
          if (fd.id !== freezerId) return fd;
          const maxId = fd.products.reduce((max, p) => Math.max(max, p.id || 0), 0);
          return { ...fd, products: [...(fd.products || []), { ...product, id: maxId + 1 }] };
        }),
      };
      saveToSupabase('freezerDeals', next.freezerDeals);
      return next;
    });
  }

  function updateFreezerProduct(freezerId, productId, updates) {
    setData((prev) => {
      const next = {
        ...prev,
        freezerDeals: prev.freezerDeals.map((fd) => {
          if (fd.id !== freezerId) return fd;
          return { ...fd, products: (fd.products || []).map((p) => p.id === productId ? { ...p, ...updates } : p) };
        }),
      };
      saveToSupabase('freezerDeals', next.freezerDeals);
      return next;
    });
  }

  function deleteFreezerProduct(freezerId, productId) {
    setData((prev) => {
      const next = {
        ...prev,
        freezerDeals: prev.freezerDeals.map((fd) => {
          if (fd.id !== freezerId) return fd;
          return { ...fd, products: (fd.products || []).filter((p) => p.id !== productId) };
        }),
      };
      saveToSupabase('freezerDeals', next.freezerDeals);
      return next;
    });
  }

  function moveFreezerProduct(freezerId, productId, direction) {
    setData((prev) => {
      const fdIndex = prev.freezerDeals.findIndex(fd => fd.id === freezerId);
      if (fdIndex === -1) return prev;
      const fd = prev.freezerDeals[fdIndex];
      const arr = [...(fd.products || [])];
      const index = arr.findIndex(p => p.id === productId);
      if (index === -1) return prev;
      const item = arr.splice(index, 1)[0];
      if (direction === 'up') arr.splice(Math.max(0, index - 1), 0, item);
      else if (direction === 'down') arr.splice(Math.min(arr.length, index + 1), 0, item);
      else if (direction === 'top') arr.unshift(item);
      else if (direction === 'bottom') arr.push(item);
      const nextFreezers = [...prev.freezerDeals];
      nextFreezers[fdIndex] = { ...fd, products: arr };
      const next = { ...prev, freezerDeals: nextFreezers };
      saveToSupabase('freezerDeals', next.freezerDeals);
      return next;
    });
  }

  return (
    <ProductsContext.Provider
      value={{
        ...data,
        loaded,
        updateProduct,
        addProduct,
        deleteProduct,
        moveProduct,
        addFreezerProduct,
        updateFreezerProduct,
        deleteFreezerProduct,
        moveFreezerProduct,
        resetToDefaults,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
