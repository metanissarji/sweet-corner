import { useState, useRef } from 'react';
import { useAdminOrders } from '../lib/useAdminOrders.js';
import './AdminOrders.css';

const PAYMENT_LABELS = { cash: '💵 מזומן', visa: '💳 ויזה / אשראי', 'apple-pay': '🍎 Apple Pay' };

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('he-IL') + ' ' + d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

/* ===== Receipt HTML for PDF / Print ===== */
function buildReceiptHTML(order) {
  const rows = order.items.map(
    (it) => `<tr><td>${it.emoji} ${it.name}</td><td>${it.qty}</td><td>₪${it.price}</td><td>₪${it.qty * it.price}</td></tr>`
  ).join('');
  return `
    <div style="font-family:'Rubik',sans-serif;direction:rtl;max-width:400px;margin:0 auto;padding:2rem;color:#333">
      <div style="text-align:center;margin-bottom:1rem">
        <div style="font-size:2.5rem">🍦</div>
        <h2 style="margin:0.3rem 0;font-size:1.4rem">הפינה המתוקה</h2>
        <p style="font-size:0.8rem;color:#888">קבלה מס׳ #${order.number}</p>
        <p style="font-size:0.8rem;color:#888">${formatDate(order.createdAt)}</p>
      </div>
      <hr style="border:none;border-top:2px dashed #ddd;margin:0.8rem 0">
      <p style="font-size:0.85rem;margin:0.2rem 0"><strong>לקוח:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
      <p style="font-size:0.85rem;margin:0.2rem 0"><strong>טלפון:</strong> ${order.customer.phone}</p>
      <p style="font-size:0.85rem;margin:0.2rem 0"><strong>כתובת:</strong> ${order.customer.address}</p>
      <p style="font-size:0.85rem;margin:0.2rem 0"><strong>תשלום:</strong> ${PAYMENT_LABELS[order.payment] || order.payment}</p>
      <hr style="border:none;border-top:2px dashed #ddd;margin:0.8rem 0">
      <table style="width:100%;border-collapse:collapse;margin:0.5rem 0">
        <thead><tr style="font-size:0.75rem;color:#888;border-bottom:1px solid #eee">
          <th style="text-align:right;padding:0.3rem 0">פריט</th>
          <th style="text-align:right;padding:0.3rem 0">כמות</th>
          <th style="text-align:right;padding:0.3rem 0">מחיר</th>
          <th style="text-align:right;padding:0.3rem 0">סה״כ</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <hr style="border:none;border-top:2px dashed #ddd;margin:0.8rem 0">
      <div style="display:flex;justify-content:space-between;font-size:1.2rem;font-weight:700;color:#e0245e">
        <span>סה״כ לתשלום</span><span>₪${order.total}</span>
      </div>
      <div style="text-align:center;margin-top:1.2rem;font-size:0.78rem;color:#aaa">
        <p>תודה שקניתם אצלנו! 🍦❤️</p>
        <p>הפינה המתוקה — טעם של קיץ בכל כפית</p>
      </div>
    </div>`;
}

/* ===== Receipt Modal ===== */
function ReceiptModal({ order, onClose }) {
  const receiptRef = useRef(null);

  function handlePrint() {
    const html = buildReceiptHTML(order);
    const win = window.open('', '_blank', 'width=450,height=700');
    win.document.write(`<html><head><title>קבלה #${order.number}</title>
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap" rel="stylesheet">
      <style>body{margin:0;padding:0}@media print{body{margin:0}}</style></head>
      <body>${html}<script>setTimeout(()=>{window.print();},500)</script></body></html>`);
    win.document.close();
  }

  function handleSendPhone() {
    const phone = order.customer.phone.replace(/[^0-9]/g, '');
    const msg = `🍦 הפינה המתוקה — קבלה #${order.number}\n\n` +
      order.items.map((it) => `${it.emoji} ${it.name} x${it.qty} = ₪${it.qty * it.price}`).join('\n') +
      `\n\n💰 סה״כ: ₪${order.total}\n✅ ההזמנה אושרה!\nתודה רבה ❤️`;
    window.open(`https://wa.me/972${phone.startsWith('0') ? phone.slice(1) : phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function handleDownloadPDF() {
    const html = buildReceiptHTML(order);
    const win = window.open('', '_blank', 'width=450,height=700');
    win.document.write(`<html><head><title>קבלה #${order.number}</title>
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap" rel="stylesheet">
      <style>body{margin:0;padding:0}</style></head>
      <body>${html}<script>setTimeout(()=>{window.print();},500)</script></body></html>`);
    win.document.close();
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>📄 קבלה #{order.number}</h3>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body" style={{ padding: '1rem' }}>
          <div className="receipt-preview" ref={receiptRef}>
            <div className="receipt-header">
              <span className="receipt-logo">🍦</span>
              <h3 className="receipt-title">הפינה המתוקה</h3>
              <p className="receipt-subtitle">קבלה #{order.number} • {formatDate(order.createdAt)}</p>
            </div>
            <hr className="receipt-divider" />
            <p className="receipt-info"><strong>לקוח:</strong> {order.customer.firstName} {order.customer.lastName}</p>
            <p className="receipt-info"><strong>טלפון:</strong> {order.customer.phone}</p>
            <p className="receipt-info"><strong>כתובת:</strong> {order.customer.address}</p>
            <hr className="receipt-divider" />
            <table className="receipt-items">
              <thead><tr><th>פריט</th><th>כמות</th><th>מחיר</th><th>סה״כ</th></tr></thead>
              <tbody>
                {order.items.map((it, i) => (
                  <tr key={i}>
                    <td>{it.emoji} {it.name}</td>
                    <td>{it.qty}</td>
                    <td>₪{it.price}</td>
                    <td>₪{it.qty * it.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="receipt-divider" />
            <div className="receipt-total-line">
              <span>סה״כ לתשלום</span><span>₪{order.total}</span>
            </div>
            <div className="receipt-footer">
              <p>תודה שקניתם אצלנו! 🍦❤️</p>
            </div>
          </div>
        </div>
        <div className="admin-modal-footer" style={{ flexWrap: 'wrap' }}>
          <button type="button" className="admin-btn-cancel" onClick={onClose}>סגירה</button>
          <button type="button" className="admin-btn-save" style={{ background: 'linear-gradient(135deg, #1ec878, #149e5e)' }} onClick={handleSendPhone}>
            📱 שליחה בוואטסאפ
          </button>
          <button type="button" className="admin-btn-save" onClick={handlePrint}>
            🖨️ הדפסה
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Single Order Card ===== */
function OrderCard({ order, onAccept, onDecline, onDelete, onReceipt }) {
  const statusClass = order.status === 'pending' ? 'status-pending' : order.status === 'accepted' ? 'status-accepted' : 'status-declined';
  const statusLabel = order.status === 'pending' ? '⏳ ממתין' : order.status === 'accepted' ? '✅ אושר' : '❌ נדחה';

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-id-row">
          <span className="order-number">הזמנה #{order.number}</span>
          <span className="order-time">{formatDate(order.createdAt)}</span>
        </div>
        <span className={`order-status-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className="order-card-body">
        <div className="order-customer">
          <span className="order-customer-label">👤 לקוח</span>
          <span className="order-customer-value">{order.customer.firstName} {order.customer.lastName}</span>
          <span className="order-customer-label">📱 טלפון</span>
          <span className="order-customer-value">{order.customer.phone}</span>
          <span className="order-customer-label">📍 כתובת</span>
          <span className="order-customer-value">{order.customer.address}</span>
          <span className="order-customer-label">💳 תשלום</span>
          <span className="order-customer-value">{PAYMENT_LABELS[order.payment] || order.payment}</span>
        </div>

        <table className="order-items-table">
          <thead><tr><th></th><th>פריט</th><th>כמות</th><th>מחיר</th><th>סה״כ</th></tr></thead>
          <tbody>
            {order.items.map((it, i) => (
              <tr key={i}>
                <td className="item-emoji-cell">{it.emoji}</td>
                <td>{it.name}</td>
                <td>{it.qty}</td>
                <td>₪{it.price}</td>
                <td className="item-total-cell">₪{it.qty * it.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="order-total-row">
          <span>סה״כ</span>
          <strong>₪{order.total}</strong>
        </div>
      </div>

      <div className="order-card-actions">
        {order.status === 'pending' && (
          <>
            <button className="order-action-btn order-btn-accept" onClick={() => onAccept(order.id)}>✅ אישור</button>
            <button className="order-action-btn order-btn-decline" onClick={() => onDecline(order.id)}>❌ דחייה</button>
          </>
        )}
        {order.status === 'accepted' && (
          <>
            <button className="order-action-btn order-btn-receipt" onClick={() => onReceipt(order)}>📄 קבלה</button>
            <button className="order-action-btn order-btn-phone" onClick={() => {
              const p = order.customer.phone.replace(/[^0-9]/g, '');
              window.open(`https://wa.me/972${p.startsWith('0') ? p.slice(1) : p}?text=${encodeURIComponent(`שלום ${order.customer.firstName}! ✅ ההזמנה #${order.number} אושרה ובדרך אליך! 🍦`)}`, '_blank');
            }}>📱 הודעה ללקוח</button>
          </>
        )}
        <button className="order-action-btn order-btn-delete" onClick={() => onDelete(order.id)}>🗑️</button>
      </div>
    </div>
  );
}

/* ===== Orders Tab Main ===== */
export default function AdminOrdersTab({ showToast }) {
  const { orders, loading, setStatus, remove, clearAll } = useAdminOrders();
  const [filter, setFilter] = useState('all');
  const [receiptOrder, setReceiptOrder] = useState(null);

  const pending = orders.filter((o) => o.status === 'pending');
  const accepted = orders.filter((o) => o.status === 'accepted');
  const declined = orders.filter((o) => o.status === 'declined');

  const filtered = filter === 'all' ? orders
    : filter === 'pending' ? pending
    : filter === 'accepted' ? accepted
    : declined;

  function handleAccept(id) {
    setStatus(id, 'accepted');
    showToast('✅ ההזמנה אושרה');
  }

  function handleDecline(id) {
    setStatus(id, 'declined');
    showToast('❌ ההזמנה נדחתה');
  }

  function handleDelete(id) {
    remove(id);
    showToast('🗑️ ההזמנה נמחקה');
  }

  return (
    <>
      <div className="admin-section-header">
        <h2>הזמנות <span className="item-count">({orders.length} סה״כ)</span></h2>
        {orders.length > 0 && (
          <button className="admin-btn-add" style={{ background: 'linear-gradient(135deg, #ff4444, #cc0000)' }} onClick={clearAll}>
            🗑️ מחיקת הכל
          </button>
        )}
      </div>

      <div className="orders-filter-row">
        {[
          { key: 'all', label: 'הכל', count: orders.length },
          { key: 'pending', label: '⏳ ממתינות', count: pending.length },
          { key: 'accepted', label: '✅ אושרו', count: accepted.length },
          { key: 'declined', label: '❌ נדחו', count: declined.length },
        ].map((f) => (
          <button key={f.key} className={`orders-filter-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
            <span className="filter-count">{f.count}</span>
          </button>
        ))}
      </div>

      {loading && orders.length === 0 ? (
        <div className="orders-empty">
          <span className="empty-icon">⏳</span>
          <p>טוען הזמנות…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="orders-empty">
          <span className="empty-icon">📋</span>
          <p>{filter === 'all' ? 'אין הזמנות עדיין' : 'אין הזמנות בקטגוריה זו'}</p>
        </div>
      ) : (
        filtered.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onDelete={handleDelete}
            onReceipt={setReceiptOrder}
          />
        ))
      )}

      {receiptOrder && <ReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />}
    </>
  );
}
