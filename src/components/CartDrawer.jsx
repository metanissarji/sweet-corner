import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import { ORDER_BRANCHES } from '../data/products.js';
import { useLang } from '../context/LanguageContext.jsx';
import { showCartToast } from './AddToCart.jsx';
import './CartDrawer.css';

const FREE_DELIVERY = 250;
const MIN_ORDER = 10;
const BOX_FEE = 10; // בוקס ממותג + שקית קרח — נוסף לכל הזמנה כדי שהגלידה תגיע קפואה
const CONFETTI = ['', '', '', '', '', ''];

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
  const { list, count, total, fullTotal, dealSavings, add, remove, clear, drawerOpen, setDrawerOpen } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const { t } = useLang();
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

  //  חגיגת משלוח חינם — ברגע שחוצים את הרף
  useEffect(() => {
    if (prevTotal.current < FREE_DELIVERY && total >= FREE_DELIVERY) {
      setFreeCelebrate(true);
      burstConfetti(confettiRef.current);
      showCartToast(t('cart.freeToast'), 2200);
      const timer = setTimeout(() => setFreeCelebrate(false), 2600);
      prevTotal.current = total;
      return () => clearTimeout(timer);
    }
    prevTotal.current = total;
  }, [total]);

  /* ניווט מהיר מתוך הסל — סוגר את המגירה ועובר לעמוד */
  function goTo(path) {
    setDrawerOpen(false);
    navigate(path);
  }

  function handleOrder(e) {
    e.preventDefault();
    const form = e.target;
    const branchInfo = ORDER_BRANCHES.find((b) => b.id === form.branch.value);
    const customer = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      email: form.email.value,
      address: form.address.value,
      branchId: branchInfo?.id || form.branch.value,
      branch: branchInfo?.label || form.branch.value,
    };
    const payment = form.payment.value;

    const order = placeOrder({
      items: list.map((it) => ({
        name: it.name,
        price: it.price,
        qty: it.qty,
        emoji: it.emoji,
        image: it.image,
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
        aria-label={t('cart.fabAria', { n: count })}
      >
        <img src="/images/cart-bag.png" alt="סל קניות" className="cart-bag-icon" />
        {count > 0 && <span className="fab-badge" key={count}>{count}</span>}
      </button>

      {/* שורת סל תחתונה — מובייל בלבד (אזור האגודל) */}
      {count > 0 && !drawerOpen && (
        <button className="cart-bar" onClick={() => setDrawerOpen(true)} aria-label={t('cart.barLabel')}>
          <span className="cart-bar-count"><img src="/images/cart-bag.png" alt="סל" className="cart-bag-icon-small" /> {count}</span>
          <span className="cart-bar-label">{t('cart.barLabel')}</span>
          <strong className="cart-bar-total">₪{grandTotal}</strong>
        </button>
      )}

      {/* רקע כהה */}
      {drawerOpen && <div className="cart-backdrop" onClick={closeDrawer} />}

      {/* המגירה */}
      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-label={t('cart.title')}>
        <div className="confetti-layer" ref={confettiRef} aria-hidden="true" />
        {freeCelebrate && (
          <div className="free-delivery-badge" aria-hidden="true">
            {t('cart.freeBadge')}
          </div>
        )}

        <header className="cart-header">
          <h2>{t('cart.title')}</h2>
          <button className="cart-close" onClick={closeDrawer} aria-label={t('cart.closeAria')}>✕</button>
        </header>

        {ordered ? (
          <div className="cart-success">
            <span className="success-icecream" aria-hidden="true"></span>
            <h3>{t('cart.successTitle')}</h3>
            <p>{t('cart.successSub')}</p>
            <p className="success-number">{t('cart.orderNo', { n: orderNumber })}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--brown-light)', marginBottom: '0.5rem' }}>
              {t('cart.successNote')}
            </p>
            <button className="btn btn-pink" onClick={closeDrawer}>{t('cart.close')}</button>
          </div>
        ) : checkout ? (
          <form className="checkout-form" onSubmit={handleOrder}>
            <h3>{t('cart.checkoutTitle')}</h3>
            <label className="checkout-branch-label">{t('cart.branchQ')}</label>
            <select name="branch" required defaultValue="" className="checkout-input checkout-branch-select">
              <option value="" disabled>{t('cart.branchPick')}</option>
              {ORDER_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>{t(`orderBranch.${b.id}`)}</option>
              ))}
            </select>
            <input name="firstName" type="text" placeholder={t('cart.firstName')} required className="checkout-input" autoComplete="given-name" />
            <input name="lastName" type="text" placeholder={t('cart.lastName')} required className="checkout-input" autoComplete="family-name" />
            <input name="phone" type="tel" placeholder={t('cart.phone')} required className="checkout-input" autoComplete="tel" inputMode="tel" />
            <input name="email" type="email" placeholder={t('cart.email')} className="checkout-input" autoComplete="email" inputMode="email" />
            <input name="address" type="text" placeholder={t('cart.address')} required className="checkout-input" autoComplete="street-address" />
            <select name="payment" required defaultValue="" className="checkout-input">
              <option value="" disabled>{t('cart.payPick')}</option>
              <option value="cash">{t('cart.payCash')}</option>
              <option value="visa">{t('cart.payVisa')}</option>
              <option value="apple-pay">{t('cart.payApple')}</option>
            </select>
            <div className="checkout-actions">
              <button type="button" className="btn btn-outline" onClick={() => setCheckout(false)}>{t('cart.back')}</button>
              <button type="submit" className="btn btn-pink">{t('cart.confirm', { t: grandTotal })}</button>
            </div>
          </form>
        ) : list.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-cone" aria-hidden="true"></span>
            <p>{t('cart.empty')}</p>
            <p className="empty-hint">{t('cart.emptyHint')}</p>
            <p className="empty-fee-note">{t('cart.emptyFee', { f: BOX_FEE })}</p>
            <div className="cart-quick-nav">
              <button type="button" className="cart-quick-link" onClick={() => goTo('/deals')}>
                {t('cart.quickDeals')}
              </button>
              <button type="button" className="cart-quick-link" onClick={() => goTo('/')}>
                {t('cart.quickHome')}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* פס התקדמות למשלוח חינם */}
            <div className={`delivery-progress ${freeCelebrate ? 'celebrate' : ''}`}>
              <p>
                {remaining > 0
                  ? <>{t('cart.freeLeft')} <strong>₪{remaining}</strong> {t('cart.freeLeft2')}</>
                  : <>{t('cart.freeGot')}</>}
              </p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
                <span className="progress-scooter" style={{ insetInlineStart: `calc(${progress}% - 14px)` }}></span>
              </div>
            </div>

            <ul className="cart-items">
              {list.map((it) => (
                <li className="cart-item" key={it.key}>
                  {it.image ? (
                    <img className="item-thumb" src={it.image} alt={it.name} loading="lazy" />
                  ) : (
                    <span className="item-emoji" aria-hidden="true">{it.emoji}</span>
                  )}
                  <div className="item-info">
                    <span className="item-name">{it.name}</span>
                    <span className="item-price">{t('cart.perUnit', { p: it.price })}</span>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => add(it)} aria-label={`+ ${it.name}`}>+</button>
                    <span key={it.qty} className="item-qty">{it.qty}</span>
                    <button onClick={() => remove(it.key)} aria-label={`− ${it.name}`}>−</button>
                  </div>
                  <span className="item-total">₪{it.qty * it.price}</span>
                </li>
              ))}
            </ul>

            <footer className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>{t('cart.products')}</span>
                  <span>₪{fullTotal}</span>
                </div>
                {dealSavings > 0 && (
                  <div className="summary-row summary-deal">
                    <span>{t('cart.dealDiscount')}</span>
                    <span>−₪{dealSavings}</span>
                  </div>
                )}
                <div className="summary-row summary-fee">
                  <span>{t('cart.boxFee')}</span>
                  <span>₪{BOX_FEE}</span>
                </div>
                <div className="summary-row summary-grand">
                  <span>{t('cart.total')}</span>
                  <strong>₪{grandTotal}</strong>
                </div>
              </div>
              {!meetsMinimum && (
                <p className="min-order-notice">
                  {t('cart.minNotice', { m: MIN_ORDER })}
                </p>
              )}
              <button
                className="btn btn-pink order-btn"
                onClick={() => setCheckout(true)}
                disabled={!meetsMinimum}
              >
                {t('cart.pay')}
              </button>
              <div className="cart-quick-nav">
                <button type="button" className="cart-quick-link" onClick={() => goTo('/deals')}>
                  {t('cart.quickDeals')}
                </button>
                <button type="button" className="cart-quick-link" onClick={() => goTo('/')}>
                  {t('cart.quickHome')}
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
