import { createContext, useContext, useEffect, useState } from 'react';

const OrdersContext = createContext(null);
const STORAGE_KEY = 'sweet-corner-orders';

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

let nextOrderId = Date.now();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  /** Place a new order from the storefront checkout */
  function placeOrder({ items, customer, payment, total }) {
    const order = {
      id: nextOrderId++,
      number: Math.floor(1000 + Math.random() * 9000),
      status: 'pending',           // pending | accepted | declined
      createdAt: new Date().toISOString(),
      items,                       // [{ name, price, qty, emoji }]
      customer,                    // { firstName, lastName, phone, email, address }
      payment,                     // 'cash' | 'visa' | 'apple-pay'
      total,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  function acceptOrder(id) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'accepted' } : o))
    );
  }

  function declineOrder(id) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'declined' } : o))
    );
  }

  function deleteOrder(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  function clearAllOrders() {
    setOrders([]);
  }

  const pending = orders.filter((o) => o.status === 'pending');
  const accepted = orders.filter((o) => o.status === 'accepted');
  const declined = orders.filter((o) => o.status === 'declined');

  return (
    <OrdersContext.Provider
      value={{
        orders,
        pending,
        accepted,
        declined,
        placeOrder,
        acceptOrder,
        declineOrder,
        deleteOrder,
        clearAllOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
