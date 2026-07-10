import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const OrdersContext = createContext(null);
const STORAGE_KEY = 'sweet-corner-orders';

/** שומר הזמנה חדשה ב-Supabase (אם מוגדר). לא חוסם — נכשל בשקט ל-localStorage. */
async function saveOrderToSupabase(order) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from('orders').insert({
      order_number: order.number,
      status: order.status,
      items: order.items,
      customer: order.customer,
      payment: order.payment,
      box_fee: order.boxFee ?? null,
      total: order.total,
    });
    if (error) console.error('Supabase order insert failed:', error.message);
  } catch (e) {
    console.error('Supabase order insert error:', e);
  }
}

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

  // Sync state if another tab changes localStorage (e.g. a new order is placed)
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY) {
        setOrders(loadOrders());
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /** Place a new order from the storefront checkout */
  function placeOrder({ items, customer, payment, boxFee, total }) {
    const order = {
      id: nextOrderId++,
      number: Math.floor(1000 + Math.random() * 9000),
      status: 'pending',           // pending | accepted | declined
      createdAt: new Date().toISOString(),
      items,                       // [{ name, price, qty, emoji }]
      customer,                    // { firstName, lastName, phone, email, address }
      payment,                     // 'cash' | 'visa' | 'apple-pay'
      boxFee,                      // דמי בוקס + שקית קרח
      total,
    };
    setOrders((prev) => [order, ...prev]);
    saveOrderToSupabase(order);    // שמירה מקבילה ב-Supabase (לא חוסמת)
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
