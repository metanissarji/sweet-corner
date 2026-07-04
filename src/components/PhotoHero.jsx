import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PHOTO } from '../hooks/useHomePhoto.js';
import './PhotoHero.css';

/**
 * מציג את תמונת העיצוב המקורית כעמוד בית "חי":
 * - הטיה תלת-ממדית שעוקבת אחרי העכבר + ברק אור
 * - סוכריות צבעוניות שנושרות מתחת לסמן
 * - כניסה קולנועית עם מסך אור בטעינה
 * אזורי הלחיצה ממוקמים באחוזים מתוך תמונה ביחס 1536×1024.
 */
export const hotspots = [
  { to: '/',         label: 'דף הבית',       left: 64.6, top: 4.4, width: 6.0,  height: 6.0 },
  { to: '/flavors',  label: 'הטעמים שלנו',   left: 54.2, top: 4.4, width: 8.8,  height: 6.0 },
  { to: '/packages', label: 'מארזים',        left: 46.7, top: 4.4, width: 5.9,  height: 6.0 },
  { to: '/deals',    label: 'מבצעים',        left: 40.2, top: 4.4, width: 5.7,  height: 6.0 },
  { to: '/about',    label: 'אודות',         left: 30.1, top: 4.4, width: 5.9,  height: 6.0 },
  { to: '/contact',  label: 'צור קשר',       left: 22.3, top: 4.4, width: 6.5,  height: 6.0 },
  { to: '/branches', label: 'סניפים',        left: 3.0,  top: 4.4, width: 10.0, height: 6.2 },
  { to: '/',         label: 'הפינה המתוקה — לוגו', left: 87.5, top: 1.5, width: 9.3, height: 10.0 },
  { to: '/flavors',  label: 'לכל הטעמים',    left: 34.5, top: 71.3, width: 13.4, height: 6.3 },
  { to: '/contact',  label: 'הזמינו עכשיו',  left: 48.4, top: 71.3, width: 14.0, height: 6.3 },
];

const SPRINKLE_COLORS = ['#e0245e', '#f7c948', '#2e86e0', '#f6a9bc', '#ffffff', '#5b3218'];
const SPRINKLE_EMOJI = ['🍦', '🍫', '🍓', '✨', '💗'];

function spawnSprinkle(x, y, counter) {
  const s = document.createElement('span');
  const isEmoji = counter % 8 === 0;
  s.className = isEmoji ? 'sprinkle sprinkle-emoji' : 'sprinkle';
  if (isEmoji) {
    s.textContent = SPRINKLE_EMOJI[Math.floor(Math.random() * SPRINKLE_EMOJI.length)];
  } else {
    s.style.background = SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)];
  }
  s.style.left = `${x + (Math.random() - 0.5) * 24}px`;
  s.style.top = `${y + (Math.random() - 0.5) * 10}px`;
  document.body.appendChild(s);
  s.animate(
    [
      { transform: `rotate(${Math.random() * 90 - 45}deg) scale(1)`, opacity: 1 },
      {
        transform: `translate(${(Math.random() - 0.5) * 70}px, ${70 + Math.random() * 90}px) rotate(${Math.random() * 360 - 180}deg) scale(0.4)`,
        opacity: 0,
      },
    ],
    { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(.3,.6,.5,1)' }
  ).addEventListener('finish', () => s.remove());
}

export default function PhotoHero() {
  const stageRef = useRef(null);
  const heroRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = stageRef.current;
    const hero = heroRef.current;
    const glare = glareRef.current;
    if (!stage || !hero) return;

    let lastSprinkle = 0;
    let sprinkleCount = 0;

    function onMove(e) {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      hero.style.transform = `rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 9}deg) scale(1.012)`;
      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 42%)`;
      }

      const now = performance.now();
      if (now - lastSprinkle > 55) {
        lastSprinkle = now;
        sprinkleCount += 1;
        spawnSprinkle(e.clientX, e.clientY, sprinkleCount);
      }
    }

    function onLeave() {
      hero.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      if (glare) glare.style.opacity = '0';
    }

    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="photo-hero-stage" ref={stageRef}>
      <section className="photo-hero" ref={heroRef} aria-label="הפינה המתוקה — עמוד הבית">
        <img src={HOME_PHOTO} alt="הפינה המתוקה — טעם של קיץ בכל כפית" className="photo-hero-img" />
        <div className="photo-glare" ref={glareRef} aria-hidden="true" />
        <div className="photo-sweep" aria-hidden="true" />
        {hotspots.map((h) => (
          <Link
            key={h.label + h.to}
            to={h.to}
            aria-label={h.label}
            title={h.label}
            className="photo-hotspot"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              width: `${h.width}%`,
              height: `${h.height}%`,
            }}
          />
        ))}
      </section>
    </div>
  );
}
