import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BAG_PHOTO, BAG_CLOSED, HOME_PHOTO, useImageExists } from '../hooks/useHomePhoto.js';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './BagHero.css';

/**
 * עמוד בית קולנועי — בלי אף תמונה "קופצת":
 * השקית שבתוך עיצוב הרקע רועדת בציפייה, מתפרצת בהבזק וקרני אור,
 * ופינוקים אמיתיים עפים ממנה, נוחתים סביבה ונשארים מרחפים.
 * כפתור קריאה לפעולה צץ מתחת לשקית, והשקית עצמה לחיצה אל הטעמים.
 * במובייל מוצגת גרסת פורטרט נקייה עם כותרת וכפתורים.
 */

/* מלבן השקית הסגורה בתוך עיצוב הרקע (באחוזים, תמונה 1536×1024) */
const BAG_RECT = { left: 33.5, top: 27, width: 32, height: 48.5 };
/* פתח השקית — מקור ההתפרצות */
const MOUTH = { x: 49.5, y: 37.5 };

/* אזורי לחיצה מעל התפריט המצויר שבתמונת הפוסטר (אחוזים מתוך 863×1823) */
const POSTER_NAV = [
  { to: '/', label: 'דף הבית', left: 88, top: 9, width: 11, height: 3.4 },
  { to: '/flavors', label: 'הטעמים שלנו', left: 66, top: 9, width: 18.5, height: 3.4 },
  { to: '/deals', label: 'מבצעים', left: 53.5, top: 9, width: 11, height: 3.4 },
  { to: '/packages', label: 'מארזים', left: 43.5, top: 9, width: 10, height: 3.4 },
  { to: '/about', label: 'אודות', left: 33.5, top: 9, width: 8.5, height: 3.4 },
  { to: '/contact', label: 'צור קשר', left: 14, top: 9, width: 14, height: 3.4 },
  { to: '/branches', label: 'סניפים', left: 12.5, top: 2.3, width: 17, height: 4.8 },
  { to: '/', label: 'לוגו — דף הבית', left: 41.5, top: 0.8, width: 17, height: 8 },
];

const BURST_COLORS = ['#e0245e', '#f7c948', '#2e86e0', '#f6a9bc', '#ffffff'];
const BURST_EMOJI = ['🍦', '🍫', '🍓', '✨', '💗', '🍪', '🍬'];

/* הפינוקים שנוחתים סביב השקית ונשארים מרחפים */
const TREATS = [
  { x: 27, y: 31, emoji: '🍦', rot: -14 },
  { x: 71.5, y: 28, emoji: '🍨', rot: 11 },
  { x: 25, y: 57, emoji: '🍭', rot: -8 },
  { x: 74, y: 55, emoji: '🍫', rot: 15 },
  { x: 49.5, y: 17, emoji: '🍓', rot: 6 },
];

/* במובייל התמונה חתוכה למרכזה — הפינוקים צמודים יותר לשקית כדי להישאר בפריים */
const TREATS_MOBILE = [
  { x: 36, y: 30, emoji: '🍦', rot: -14 },
  { x: 64, y: 27, emoji: '🍨', rot: 11 },
  { x: 34.5, y: 56, emoji: '🍭', rot: -8 },
  { x: 65.5, y: 54, emoji: '🍫', rot: 15 },
  { x: 50, y: 16, emoji: '🍓', rot: 6 },
];

/* מזרקת פינוקים מפתח השקית — קשתות עם "כוח כבידה" */
function fountain(host) {
  if (!host) return;
  const r = host.getBoundingClientRect();
  const originX = r.width * (MOUTH.x / 100);
  const originY = r.height * (MOUTH.y / 100);
  const scaleFactor = r.width / 1536;

  for (let i = 0; i < 30; i++) {
    const isEmoji = i < 12;
    const p = document.createElement('span');
    p.className = isEmoji ? 'bag-spark bag-spark-emoji' : 'bag-spark';
    if (isEmoji) {
      p.textContent = BURST_EMOJI[i % BURST_EMOJI.length];
    } else {
      p.style.background = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    }
    p.style.left = `${originX}px`;
    p.style.top = `${originY}px`;
    host.appendChild(p);

    const dx = (Math.random() - 0.5) * 560 * scaleFactor;
    const rise = (150 + Math.random() * 260) * scaleFactor;
    const rot = Math.random() * 540 - 270;
    const duration = 950 + Math.random() * 550;
    const delay = Math.random() * 180;
    p.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.3)', opacity: 0 },
        {
          transform: `translate(calc(-50% + ${dx * 0.55}px), calc(-50% - ${rise}px)) scale(${isEmoji ? 1.25 : 1}) rotate(${rot * 0.6}deg)`,
          opacity: 1,
          offset: 0.42,
        },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% - ${rise * 0.2}px)) scale(0.5) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      { duration, delay, easing: 'cubic-bezier(.3,.6,.5,1)', fill: 'both' }
    );
    // הסרה בטיימר — אירועי finish לא אמינים בכל הדפדפנים
    setTimeout(() => p.remove(), duration + delay + 60);
  }
}

/* הפינוקים הגדולים: עפים מהפתח, נוחתים בקפיצה ונשארים מרחפים */
function spawnTreats(host, treats) {
  if (!host) return;
  const r = host.getBoundingClientRect();
  treats.forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'hero-treat';
    el.textContent = t.emoji;
    el.style.left = `${t.x}%`;
    el.style.top = `${t.y}%`;
    el.style.setProperty('--rot', `${t.rot}deg`);
    host.appendChild(el);

    const dx = ((MOUTH.x - t.x) / 100) * r.width;
    const dy = ((MOUTH.y - t.y) / 100) * r.height;
    const duration = 950;
    const delay = i * 95;
    el.animate(
      [
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.1) rotate(0deg)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        {
          transform: `translate(calc(-50% + ${dx * 0.3}px), calc(-50% + ${dy * 0.3 - r.height * 0.09}px)) scale(1.3) rotate(var(--rot))`,
          offset: 0.6,
        },
        { transform: 'translate(-50%, -50%) scale(0.92) rotate(var(--rot))', offset: 0.85 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(var(--rot))', opacity: 1 },
      ],
      { duration, delay, easing: 'cubic-bezier(.3,1.15,.4,1)', fill: 'backwards' }
    );
    // מעבר לריחוף מתמשך בטיימר — אירועי finish לא אמינים בכל הדפדפנים
    setTimeout(() => el.classList.add('bobbing'), duration + delay + 30);
  });
}

/* פרץ ניצוצות פשוט — לגרסת המובייל/גיבוי */
function burst(scene, yPct, strength) {
  if (!scene) return;
  const { width, height } = scene.getBoundingClientRect();
  for (let i = 0; i < strength; i++) {
    const p = document.createElement('span');
    const isEmoji = i % 4 === 0;
    p.className = isEmoji ? 'bag-spark bag-spark-emoji' : 'bag-spark';
    if (isEmoji) {
      p.textContent = BURST_EMOJI[Math.floor(Math.random() * BURST_EMOJI.length)];
    } else {
      p.style.background = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    }
    p.style.left = `${width * (0.15 + Math.random() * 0.7)}px`;
    p.style.top = `${height * yPct}px`;
    scene.appendChild(p);
    const duration = 900 + Math.random() * 700;
    p.animate(
      [
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
        {
          transform: `translate(${(Math.random() - 0.5) * 220}px, ${-90 - Math.random() * 200}px) rotate(${Math.random() * 540 - 270}deg) scale(${0.3 + Math.random() * 0.5})`,
          opacity: 0,
        },
      ],
      { duration, easing: 'cubic-bezier(.2,.8,.4,1)', fill: 'both' }
    );
    setTimeout(() => p.remove(), duration + 60);
  }
}

export default function BagHero() {
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const homeBg = useImageExists(HOME_PHOTO);
  const closedExists = useImageExists(BAG_CLOSED);
  const isMobile = useMediaQuery('(max-width: 768px)');
  // עיצוב הרקע משמש בכל המסכים; במובייל הוא נחתך למרכזו (השקית) דרך CSS
  const comboMode = homeBg === true;

  useEffect(() => {
    // מצב הפוסטר (comboMode) הוא תמונה נקייה ורספונסיבית — האנימציה שלו ב-CSS.
    // אפקטי ההתפרצות רצים רק במצב הגיבוי (בלי תמונת עיצוב).
    if (comboMode) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const timers = [];
    timers.push(setTimeout(() => burst(scene, 0.46, 18), 1050));
    timers.push(setTimeout(() => burst(scene, 0.42, 10), 1500));

    function onMove(e) {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      scene.style.transform = `rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 11.2}deg)`;
    }
    function onLeave() {
      scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => {
      timers.forEach(clearTimeout);
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      scene.querySelectorAll('.hero-treat, .bag-spark').forEach((el) => el.remove());
    };
  }, [comboMode]);

  // ===== מצב ראשי: פוסטר העיצוב המלא (התמונה כ-reference), עם אזורי לחיצה =====
  if (comboMode) {
    return (
      <section className="poster-hero">
        <div className="poster-stage">
          <div className="poster-frame">
            <img
              src={HOME_PHOTO}
              alt="הפינה המתוקה — טעם של קיץ בכל כפית"
              className="poster-img"
            />
            {/* אזורי לחיצה שקופים מעל התפריט המצויר שבתמונה */}
            {POSTER_NAV.map((h) => (
              <Link
                key={h.label}
                to={h.to}
                aria-label={h.label}
                title={h.label}
                className="poster-nav-spot"
                style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${h.width}%`, height: `${h.height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="poster-cta-band">
          <Link to="/contact" className="btn btn-pink">הזמינו עכשיו 🍦</Link>
        </div>
      </section>
    );
  }

  // ===== גיבוי: פורטרט נקי עם כותרת, כפתורים והשקית הנפתחת =====
  return (
    <section className="bag-hero">
      <div className="splash splash-blue" />
      <div className="splash splash-pink" />

      <div className="container bag-grid">
        <div className="bag-copy">
          <h1 className="bag-title">
            <span className="bag-title-pink">הפינה</span>
            <span className="bag-title-brown">המתוקה</span>
          </h1>
          <p className="bag-banner">טעם של קיץ בכל כפית</p>
          <p className="bag-sub">
            שקית אחת, ים של פינוקים — גלידות, אייסים
            <br />
            ומתוקים בטעמים שאהובים על כולם
          </p>
          <div className="bag-ctas">
            <Link to="/flavors" className="btn btn-pink">לכל הטעמים ←</Link>
            <Link to="/contact" className="btn btn-outline">הזמינו עכשיו 🍦</Link>
          </div>
        </div>

        <div className="bag-stage" ref={stageRef}>
          <div className="bag-float">
            <div className="bag-scene" ref={sceneRef}>
              <img src={BAG_PHOTO} alt="שקית הפינה המתוקה מלאה בגלידות ומתוקים" className="bag-back" />
              <img src={BAG_PHOTO} alt="" aria-hidden="true" className="bag-front" />
              {closedExists === true && (
                <img src={BAG_CLOSED} alt="" aria-hidden="true" className="bag-closed" />
              )}
              <div className="bag-glow" aria-hidden="true" />
              <div className="bag-shine" aria-hidden="true" />
              <span className="bag-twinkle t1" aria-hidden="true">✦</span>
              <span className="bag-twinkle t2" aria-hidden="true">✦</span>
              <span className="bag-twinkle t3" aria-hidden="true">✦</span>
            </div>
          </div>
          <div className="bag-shadow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
