import { useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import './AddToCart.css';

/* אנימציית "טיסה לסל": האימוג'י של המוצר עף בקשת אל כפתור הסל */
function flyToCart(fromEl, emoji) {
  const fab = document.querySelector('.cart-fab');
  if (!fab || !fromEl) return;
  const s = fromEl.getBoundingClientRect();
  const t = fab.getBoundingClientRect();

  const fly = document.createElement('span');
  fly.className = 'fly-emoji';
  fly.textContent = emoji;
  fly.style.left = `${s.left + s.width / 2}px`;
  fly.style.top = `${s.top}px`;
  document.body.appendChild(fly);

  const dx = t.left + t.width / 2 - (s.left + s.width / 2);
  const dy = t.top + t.height / 2 - s.top;

  fly
    .animate(
      [
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.5 - 130}px) ) scale(1.6) rotate(170deg)`,
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2) rotate(360deg)`,
          opacity: 0.6,
        },
      ],
      { duration: 750, easing: 'cubic-bezier(.45,-.25,.6,1)' }
    )
    .addEventListener('finish', () => fly.remove());
}

/* פופ "+1" קטן שעולה מהכפתור */
function popPlusOne(fromEl) {
  if (!fromEl) return;
  const r = fromEl.getBoundingClientRect();
  const pop = document.createElement('span');
  pop.className = 'plus-one-pop';
  pop.textContent = '+1';
  pop.style.left = `${r.left + r.width / 2}px`;
  pop.style.top = `${r.top}px`;
  document.body.appendChild(pop);
  pop
    .animate(
      [
        { transform: 'translate(-50%, 0) scale(0.6)', opacity: 0 },
        { transform: 'translate(-50%, -22px) scale(1.25)', opacity: 1, offset: 0.35 },
        { transform: 'translate(-50%, -52px) scale(1)', opacity: 0 },
      ],
      { duration: 650, easing: 'ease-out' }
    )
    .addEventListener('finish', () => pop.remove());
}

/**
 * בקרת כמות למוצר: מינוס · מספר (מתחיל מ-0) · פלוס אחד.
 * product = { key, name, price, emoji }
 */
export default function AddToCart({ product }) {
  const { items, add, remove } = useCart();
  const plusRef = useRef(null);
  const qty = items[product.key]?.qty || 0;

  function handleAdd() {
    add(product);
    popPlusOne(plusRef.current);
    flyToCart(plusRef.current, product.emoji || '🍦');
  }

  return (
    <div className="add-to-cart" aria-label={`כמות עבור ${product.name}`}>
      <button ref={plusRef} className="qty-btn qty-plus" onClick={handleAdd} aria-label={`הוספת ${product.name} לסל`}>
        +1
      </button>
      <span className="qty-num" key={qty} aria-live="polite">{qty}</span>
      <button
        className="qty-btn qty-minus"
        onClick={() => remove(product.key)}
        disabled={qty === 0}
        aria-label={`הסרת ${product.name} מהסל`}
      >
        −
      </button>
    </div>
  );
}
