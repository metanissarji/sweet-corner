import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import { showCartToast } from './AddToCart.jsx';
import './CartDrawer.css';

const FREE_DELIVERY = 250;
const MIN_ORDER = 10;
const BOX_FEE = 10; // בוקס ממותג + שקית קרח — נוסף לכל הזמנה כדי שהגלידה תגיע קפואה
const CONFETTI = ['🍦', '🍫', '🍓', '🍪', '💗', '✨'];

/* פיצוץ קונפטי בתוך המגירה בסיום הזמנה */
function burstConfetti(container) {
  if (!container) return;
  const { width } = container.getBoundingClientRect();
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    if (i % 3 === 0) {
      piece.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
    } else {
      piece.style.background = ['var(--pink)', 'var(--yellow)', 'var(--blue)', 'var(--pink-splash)'][i % 4];
    }
    piece.style.left = `${Math.random() * width}px`;
    container.appendChild(piece);
    const duration = 1400 + Math.random() * 1200;
    const delay = Math.random() * 350;
    piece.animate(
      [
        { transform: 'translateY(-20px) rotate(0deg)', opacity: 1 },
        {
          transform: `translateY(${300 + Math.random() * 300}px) translateX(${(Math.random() - 0.5) * 160}px) rotate(${360 + Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      { duration, delay, easing: 'cubic-bezier(.2,.7,.4,1)', fill: 'both' }
    );
    // הסרה בטיימר — אירועי finish לא אמינים בכל הדפדפנים
    setTimeout(() => piece.remove(), duration + delay + 60);
  }
}

export default function CartDrawer() {
  const { list, count, total, add, remove, clear, drawerOpen, setDrawerOpen } = useCart();
  const { placeOrder } = useOrders();
  const [ordered, setOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [fabPop, setFabPop] = useState(false);
  const [freeCelebrate, setFreeCelebrate] = useState(false);
  const confettiRef = useRef(null);
  const prevCount = useRef(count);
  const prevTotal = useRef(total);

  // קפיצת כפתור הסל בכל הוספה
  useEffect(() => {
    if (count > prevCount.current) {
      setFabPop(true);
      const t = setTimeout(() => setFabPop(false), 500);
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  // 🎉 חגיגת משלוח חינם — ברגע שחוצים את הרף
  useEffect(() => {
    if (prevTotal.current < FREE_DELIVERY && total >= FREE_DELIVERY) {
      setFreeCelebrate(true);
      burstConfetti(confettiRef.current);
      showCartToast('🎉 הרווחתם משלוח חינם! 🛵💨', 2200);
      const t = setTimeout(() => setFreeCelebrate(false), 2600);
      prevTotal.current = total;
      return () => clearTimeout(t);
    }
    prevTotal.current = total;
  }, [total]);

  function handleOrder(e) {
    e.preventDefault();
    const form = e.target;
    const customer = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      email: form.email.value,
      address: form.address.value,
    };
    const payment = form.payment.value;

    const order = placeOrder({
      items: list.map((it) => ({
        name: it.name,
        price: it.price,
        qty: it.qty,
        emoji: it.emoji,
        key: it.key,
      })),
      customer,
      payment,
      boxFee: BOX_FEE,
      total: total + BOX_FEE,
    });

    setOrderNumber(order.number);
    setOrdered(true);
    setCheckout(false);
    burstConfetti(confettiRef.current);
    clear();
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => {
      setOrdered(false);
      setCheckout(false);
    }, 400);
  }

  const progress = Math.min(100, Math.round((total / FREE_DELIVERY) * 100));
  const remaining = Math.max(0, FREE_DELIVERY - total);
  const meetsMinimum = total >= MIN_ORDER;
  const grandTotal = total + BOX_FEE; // סה״כ לתשלום כולל הבוקס + שקית הקרח

  return (
    <>
      {/* כפתור סל צף */}
      <button
        className={`cart-fab ${fabPop ? 'fab-pop' : ''} ${count > 0 ? 'has-items' : ''}`}
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label={`סל הקניות — ${count} פריטים`}
      >
        🛒
        {count > 0 && <span className="fab-badge" key={count}>{count}</span>}
      </button>

      {/* שורת סל תחתונה — מובייל בלבד (אזור האגודל) */}
      {count > 0 && !drawerOpen && (
        <button className="cart-bar" onClick={() => setDrawerOpen(true)} aria-label={`פתיחת הסל — ${count} פריטים בסך ₪${grandTotal}`}>
          <span className="cart-bar-count">🛒 {count}</span>
          <span className="cart-bar-label">לצפייה בסל ולתשלום</span>
          <strong className="cart-bar-total">₪{grandTotal}</strong>
        </button>
      )}

      {/* רקע כהה */}
      {drawerOpen && <div className="cart-backdrop" onClick={closeDrawer} />}

      {/* המגירה */}
      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-label="סל הקניות">
        <div className="confetti-layer" ref={confettiRef} aria-hidden="true" />
        {freeCelebrate && (
          <div className="free-delivery-badge" aria-hidden="true">
            🎉 משלוח חינם! 🛵💨
          </div>
        )}

        <header className="cart-header">
          <h2>הסל שלי 🍦</h2>
          <button className="cart-close" onClick={closeDrawer} aria-label="סגירת הסל">✕</button>
        </header>

        {ordered ? (
          <div className="cart-success">
            <span className="success-icecream" aria-hidden="true">🍦</span>
            <h3>ההזמנה התקבלה!</h3>
            <p>מתחילים להקפיא את החבילה שלכם ❄️</p>
            <p className="success-number">מס׳ הזמנה: #{orderNumber}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--brown-light)', marginBottom: '0.5rem' }}>
              ההזמנה נשלחה לחנות — תקבלו אישור בקרוב 📱
            </p>
            <button className="btn btn-pink" onClick={closeDrawer}>סגירה</button>
          </div>
        ) : checkout ? (
          <form className="checkout-form" onSubmit={handleOrder}>
            <h3>פרטי משלוח ותשלום</h3>
            <input name="firstName" type="text" placeholder="שם פרטי" required className="checkout-input" autoComplete="given-name" />
            <input name="lastName" type="text" placeholder="שם משפחה" required className="checkout-input" autoComplete="family-name" />
            <input name="phone" type="tel" placeholder="מספר טלפון" required className="checkout-input" autoComplete="tel" inputMode="tel" />
            <input name="email" type="email" placeholder="אימייל (רשות)" className="checkout-input" autoComplete="email" inputMode="email" />
            <input name="address" type="text" placeholder="כתובת מלאה למשלוח" required className="checkout-input" autoComplete="street-address" />
            <select name="payment" required defaultValue="" className="checkout-input">
              <option value="" disabled>בחירת אמצעי תשלום...</option>
              <option value="cash">מזומן לשליח</option>
              <option value="visa">ויזה / אשראי</option>
              <option value="apple-pay">Apple Pay</option>
            </select>
            <div className="checkout-actions">
              <button type="button" className="btn btn-outline" onClick={() => setCheckout(false)}>חזרה לסל</button>
              <button type="submit" className="btn btn-pink">אישור ותשלום ₪{grandTotal}</button>
            </div>
          </form>
        ) : list.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-cone" aria-hidden="true">🍦</span>
            <p>הסל עדיין ריק...</p>
            <p className="empty-hint">לחצו +1 על כל פינוק שבא לכם 😋</p>
            <p className="empty-fee-note">כל הזמנה יוצאת בבוקס עם שקית קרח ❄️ (₪{BOX_FEE})</p>
          </div>
        ) : (
          <>
            {/* פס התקדמות למשלוח חינם */}
            <div className={`delivery-progress ${freeCelebrate ? 'celebrate' : ''}`}>
              <p>
                {remaining > 0
                  ? <>עוד <strong>₪{remaining}</strong> למשלוח חינם 🛵</>
                  : <>יש לכם משלוח חינם! 🛵💨</>}
              </p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
                <span className="progress-scooter" style={{ insetInlineStart: `calc(${progress}% - 14px)` }}>🛵</span>
              </div>
            </div>

            <ul className="cart-items">
              {list.map((it) => (
                <li className="cart-item" key={it.key}>
                  <span className="item-emoji" aria-hidden="true">{it.emoji}</span>
                  <div className="item-info">
                    <span className="item-name">{it.name}</span>
                    <span className="item-price">₪{it.price} ליח׳</span>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => add(it)} aria-label={`עוד ${it.name}`}>+</button>
                    <span key={it.qty} className="item-qty">{it.qty}</span>
                    <button onClick={() => remove(it.key)} aria-label={`פחות ${it.name}`}>−</button>
                  </div>
                  <span className="item-total">₪{it.qty * it.price}</span>
                </li>
              ))}
            </ul>

            <footer className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>המוצרים שלכם</span>
                  <span>₪{total}</span>
                </div>
                <div className="summary-row summary-fee">
                  <span>בוקס + שקית קרח ❄️</span>
                  <span>₪{BOX_FEE}</span>
                </div>
                <div className="summary-row summary-grand">
                  <span>סה״כ לתשלום</span>
                  <strong>₪{grandTotal}</strong>
                </div>
              </div>
              {!meetsMinimum && (
                <p className="min-order-notice">
                  מינימום מוצרים להזמנה ₪{MIN_ORDER} — כדי שהמשלוח יצא בבוקס עם שקית קרח וישמור על הגלידה קפואה ❄️
                </p>
              )}
              <button
                className="btn btn-pink order-btn"
                onClick={() => setCheckout(true)}
                disabled={!meetsMinimum}
              >
                השלמת הזמנה 🎉
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
