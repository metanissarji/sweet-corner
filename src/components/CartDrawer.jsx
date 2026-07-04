import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import './CartDrawer.css';

const FREE_DELIVERY = 60;
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
    piece
      .animate(
        [
          { transform: 'translateY(-20px) rotate(0deg)', opacity: 1 },
          {
            transform: `translateY(${300 + Math.random() * 300}px) translateX(${(Math.random() - 0.5) * 160}px) rotate(${360 + Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        { duration: 1400 + Math.random() * 1200, easing: 'cubic-bezier(.2,.7,.4,1)', delay: Math.random() * 350 }
      )
      .addEventListener('finish', () => piece.remove());
  }
}

export default function CartDrawer() {
  const { list, count, total, add, remove, clear, drawerOpen, setDrawerOpen } = useCart();
  const [ordered, setOrdered] = useState(false);
  const [fabPop, setFabPop] = useState(false);
  const confettiRef = useRef(null);
  const prevCount = useRef(count);

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

  function handleOrder() {
    setOrdered(true);
    burstConfetti(confettiRef.current);
    clear();
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => setOrdered(false), 400);
  }

  const progress = Math.min(100, Math.round((total / FREE_DELIVERY) * 100));
  const remaining = Math.max(0, FREE_DELIVERY - total);

  return (
    <>
      {/* כפתור סל צף */}
      <button
        className={`cart-fab ${fabPop ? 'fab-pop' : ''}`}
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-label={`סל הקניות — ${count} פריטים`}
      >
        🛒
        {count > 0 && <span className="fab-badge" key={count}>{count}</span>}
      </button>

      {/* רקע כהה */}
      {drawerOpen && <div className="cart-backdrop" onClick={closeDrawer} />}

      {/* המגירה */}
      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-label="סל הקניות">
        <div className="confetti-layer" ref={confettiRef} aria-hidden="true" />

        <header className="cart-header">
          <h2>הסל שלי 🍦</h2>
          <button className="cart-close" onClick={closeDrawer} aria-label="סגירת הסל">✕</button>
        </header>

        {ordered ? (
          <div className="cart-success">
            <span className="success-icecream" aria-hidden="true">🍦</span>
            <h3>ההזמנה התקבלה!</h3>
            <p>מתחילים להקפיא את החבילה שלכם ❄️</p>
            <p className="success-number">מס׳ הזמנה: #{Math.floor(1000 + Math.random() * 9000)}</p>
            <button className="btn btn-pink" onClick={closeDrawer}>סגירה</button>
          </div>
        ) : list.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-cone" aria-hidden="true">🍦</span>
            <p>הסל עדיין ריק...</p>
            <p className="empty-hint">לחצו +1 על כל פינוק שבא לכם 😋</p>
          </div>
        ) : (
          <>
            {/* פס התקדמות למשלוח חינם */}
            <div className="delivery-progress">
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
              <div className="cart-total">
                <span>סה״כ לתשלום:</span>
                <strong>₪{total}</strong>
              </div>
              <button className="btn btn-pink order-btn" onClick={handleOrder}>
                השלמת הזמנה 🎉
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
