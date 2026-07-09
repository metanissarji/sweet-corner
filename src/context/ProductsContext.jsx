import { createContext, useContext, useEffect, useState } from 'react';
import { flavors as defaultFlavors, favorites as defaultFavorites, dealCatalogs as defaultDealCatalogs, deals as defaultDeals, packages as defaultPackages, freezerDeals as defaultFreezerDeals } from '../data/products.js';

const ProductsContext = createContext(null);

const STORAGE_KEY = 'sweet-corner-products';

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
  const [data, setData] = useState(() => {
    const saved = loadFromStorage();
    return {
      flavors: saved?.flavors ?? defaultFlavors,
      favorites: saved?.favorites ?? defaultFavorites,
      dealCatalogs: saved?.dealCatalogs ?? defaultDealCatalogs,
      deals: saved?.deals ?? defaultDeals,
      packages: saved?.packages ?? defaultPackages,
      freezerDeals: saved?.freezerDeals ?? defaultFreezerDeals,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  /* ---- helpers ---- */
  function updateProduct(category, id, updates) {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }

  function addProduct(category, product) {
    setData((prev) => {
      const maxId = prev[category].reduce((max, p) => Math.max(max, p.id), 0);
      return {
        ...prev,
        [category]: [...prev[category], { ...product, id: maxId + 1 }],
      };
    });
  }

  function deleteProduct(category, id) {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  }

  function moveProduct(category, id, direction, catalogId = null) {
    setData((prev) => {
      const arr = prev[category];
      
      // Get the items currently visible in the view
      const viewArr = catalogId ? arr.filter(item => item.catalogId === catalogId) : [...arr];
      const indexInView = viewArr.findIndex(item => item.id === id);
      
      if (indexInView === -1) return prev;
      
      // Remove the item from its current position
      const item = viewArr.splice(indexInView, 1)[0];
      
      // Insert it at the new position
      if (direction === 'up') {
        viewArr.splice(Math.max(0, indexInView - 1), 0, item);
      } else if (direction === 'down') {
        viewArr.splice(Math.min(viewArr.length, indexInView + 1), 0, item);
      } else if (direction === 'top') {
        viewArr.unshift(item);
      } else if (direction === 'bottom') {
        viewArr.push(item);
      }
      
      // Merge back into the main array preserving original slots of this category
      if (catalogId) {
        const viewIndices = arr
          .map((it, idx) => it.catalogId === catalogId ? idx : -1)
          .filter(idx => idx !== -1);
          
        const newArr = [...arr];
        for (let i = 0; i < viewIndices.length; i++) {
          newArr[viewIndices[i]] = viewArr[i];
        }
        return { ...prev, [category]: newArr };
      } else {
        return { ...prev, [category]: viewArr };
      }
    });
  }

  function resetToDefaults() {
    setData({
      flavors: defaultFlavors,
      favorites: defaultFavorites,
      dealCatalogs: defaultDealCatalogs,
      deals: defaultDeals,
      packages: defaultPackages,
      freezerDeals: defaultFreezerDeals,
    });
  }

  function addFreezerProduct(freezerId, product) {
    setData((prev) => ({
      ...prev,
      freezerDeals: prev.freezerDeals.map((fd) => {
        if (fd.id === freezerId) {
          const maxId = fd.products.reduce((max, p) => Math.max(max, p.id || 0), 0);
          return { ...fd, products: [...(fd.products || []), { ...product, id: maxId + 1 }] };
        }
        return fd;
      }),
    }));
  }

  function updateFreezerProduct(freezerId, productId, updates) {
    setData((prev) => ({
      ...prev,
      freezerDeals: prev.freezerDeals.map((fd) => {
        if (fd.id === freezerId) {
          return {
            ...fd,
            products: (fd.products || []).map((p) => (p.id === productId ? { ...p, ...updates } : p)),
          };
        }
        return fd;
      }),
    }));
  }

  function deleteFreezerProduct(freezerId, productId) {
    setData((prev) => ({
      ...prev,
      freezerDeals: prev.freezerDeals.map((fd) => {
        if (fd.id === freezerId) {
          return { ...fd, products: (fd.products || []).filter((p) => p.id !== productId) };
        }
        return fd;
      }),
    }));
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
      
      return { ...prev, freezerDeals: nextFreezers };
    });
  }

  return (
    <ProductsContext.Provider
      value={{
        ...data,
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
