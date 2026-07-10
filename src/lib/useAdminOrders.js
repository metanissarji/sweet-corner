import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase.js';

/* ממיר שורת DB למבנה שהממשק מצפה לו */
function mapRow(r) {
  return {
    id: r.id,
    number: r.order_number,
    status: r.status,
    createdAt: r.created_at,
    items: Array.isArray(r.items) ? r.items : [],
    customer: r.customer || {},
    payment: r.payment,
    total: r.total,
  };
}

/**
 * הזמנות למנהל — נקראות מ-Supabase (מכל המכשירים) עם עדכון חי (Realtime).
 * מחייב התחברות: מדיניות ה-RLS מתירה קריאה/עדכון/מחיקה רק ל-authenticated.
 */
export function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else { setOrders((data || []).map(mapRow)); setError(''); }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    refetch();
    // עדכון חי: כל הזמנה חדשה / שינוי סטטוס / מחיקה מכל מכשיר משתקפים מיד
    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (p) => {
        setOrders((prev) => (prev.some((o) => o.id === p.new.id) ? prev : [mapRow(p.new), ...prev]));
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (p) => {
        setOrders((prev) => prev.map((o) => (o.id === p.new.id ? mapRow(p.new) : o)));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'orders' }, (p) => {
        setOrders((prev) => prev.filter((o) => o.id !== p.old.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [refetch]);

  const setStatus = useCallback(async (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))); // אופטימי
    if (supabase) await supabase.from('orders').update({ status }).eq('id', id);
  }, []);

  const remove = useCallback(async (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    if (supabase) await supabase.from('orders').delete().eq('id', id);
  }, []);

  const clearAll = useCallback(async () => {
    if (!supabase) { setOrders([]); return; }
    const { data } = await supabase.from('orders').select('id');
    setOrders([]);
    const ids = (data || []).map((r) => r.id);
    if (ids.length) await supabase.from('orders').delete().in('id', ids);
  }, []);

  return { orders, loading, error, setStatus, remove, clearAll, refetch };
}
