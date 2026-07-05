import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BAG_PHOTO, BAG_CLOSED, HOME_PHOTO, useImageExists } from '../hooks/useHomePhoto.js';
import { hotspots } from './PhotoHero.jsx';
import './BagHero.css';

/**
 * עמוד בית קולנועי על גבי עיצוב הרקע המלא (שכולל את השקית הסגורה במרכז):
 * 1. עותק גזור של אזור השקית מתוך הרקע מתנדנד בציפייה גוברת
 * 2. רגע הפתיחה: הבזק, קרני אור מפתח השקית, מזרקת גלידות וסוכריות,
 *    ורעידת מסך קלה
 * 3. כרטיס השקית הפתוחה מזנק מתוך השקית הסגורה בקפיצה קפיצית,
 *    צף ומוטה בתלת-ממד לפי העכבר — ולחיצה עליו מובילה לכל הטעמים
 */

/* מלבן השקית הסגורה בתוך עיצוב הרקע (באחוזים, תמונה 1536×1024) */
const BAG_RECT = { left: 33.5, top: 27, width: 32, height: 48.5 };
/* פתח השקית — מקור ההתפרצות */
const MOUTH = { x: 49.5, y: 37.5 };

const NAV_LABELS = ['דף הבית', 'הטעמים שלנו', 'מארזים', 'מבצעים', 'אודות', 'צור קשר', 'סניפים'];
const navSpots = hotspots.filter((h) => NAV_LABELS.includes(h.label));

const BURST_COLORS = ['#e0245e', '#f7c948', '#2e86e0', '#f6a9bc', '#ffffff'];
const BURST_EMOJI = ['🍦', '🍫', '🍓', '✨', '💗', '🍪', '🍬'];

/* מזרקת פינוקים מפתח השקית — קשתות עם "כוח כבידה" */
function fountain(frame) {
  if (!frame) return;
  const r = frame.getBoundingClientRect();
  const originX = r.width * (MOUTH.x / 100);
  const originY = r.height * (MOUTH.y / 100);
  const scaleFactor = r.width / 1535;

  for (let i = 0; i < 34; i++) {
    const isEmoji = i < 14;
    const p = document.createElement('span');
    p.className = isEmoji ? 'bag-spark bag-spark-emoji' : 'bag-spark';
    if (isEmoji) {
      p.textContent = BURST_EMOJI[i % BURST_EMOJI.length];
    } else {
      p.style.background = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
    }
    p.style.left = `${originX}px`;
    p.style.top = `${originY}px`;
    frame.appendChild(p);

    const dx = (Math.random() - 0.5) * 560 * scaleFactor;
    const rise = (150 + Math.random() * 260) * scaleFactor;
    const rot = Math.random() * 540 - 270;
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
      { duration: 950 + Math.random() * 550, easing: 'cubic-bezier(.3,.6,.5,1)', delay: Math.random() * 180 }
    ).addEventListener('finish', () => p.remove());
  }
}

/* פרץ ניצוצות פשוט — למצב הגיבוי בלבד */
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
    p.animate(
      [
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
        {
          transform: `translate(${(Math.random() - 0.5) * 220}px, ${-90 - Math.random() * 200}px) rotate(${Math.random() * 540 - 270}deg) scale(${0.3 + Math.random() * 0.5})`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 700, easing: 'cubic-bezier(.2,.8,.4,1)' }
    ).addEventListener('finish', () => p.remove());
  }
}

export default function BagHero() {
  const [seed, setSeed] = useState(0); // מפתח להפעלה מחדש של כל הרצף
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const homeBg = useImageExists(HOME_PHOTO);
  const closedExists = useImageExists(BAG_CLOSED);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const timers = [];
    if (homeBg === true) {
      // מזרקה מפתח השקית ברגע ההתפרצות + גל שני קטן
      timers.push(setTimeout(() => fountain(stage), 1150));
      timers.push(setTimeout(() => fountain(stage), 1750));
    } else {
      timers.push(setTimeout(() => burst(scene, 0.46, 18), 1050));
      timers.push(setTimeout(() => burst(scene, 0.42, 10), 1500));
    }

    // הטיה תלת-ממדית לפי העכבר
    function onMove(e) {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      scene.style.transform = `rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 12}deg)`;
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
    };
  }, [seed, homeBg]);

  // ===== מצב ראשי: עיצוב הרקע עם השקית המשולבת =====
  if (homeBg === true) {
    return (
      <section className="combo-hero" key={seed}>
        <div className="combo-frame" ref={stageRef}>
          <img src={HOME_PHOTO} alt="הפינה המתוקה — טעם של קיץ בכל כפית" className="combo-bg" />

          {/* אזורי לחיצה על תפריט העיצוב */}
          {navSpots.map((h) => (
            <Link
              key={h.label + h.to}
              to={h.to}
              aria-label={h.label}
              title={h.label}
              className="photo-hotspot"
              style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${h.width}%`, height: `${h.height}%` }}
            />
          ))}

          {/* הלוגו האמיתי — מעל הלוגו המודפס שבעיצוב */}
          <Link to="/" className="overlay-logo" aria-label="הפינה המתוקה — דף הבית">
            <img src="/images/logo.png" alt="" />
          </Link>

          {/* עותק גזור של השקית הסגורה — מתנדנד בציפייה */}
          <div
            className="bag-cutout"
            aria-hidden="true"
            style={{
              left: `${BAG_RECT.left}%`,
              top: `${BAG_RECT.top}%`,
              width: `${BAG_RECT.width}%`,
              height: `${BAG_RECT.height}%`,
            }}
          >
            <img
              src={HOME_PHOTO}
              alt=""
              style={{
                width: `${(100 / BAG_RECT.width) * 100}%`,
                transform: `translate(-${BAG_RECT.left}%, -${BAG_RECT.top}%)`,
              }}
            />
          </div>

          {/* קרני אור מפתח השקית */}
          <div className="burst-rays" aria-hidden="true" style={{ left: `${MOUTH.x}%`, top: `${MOUTH.y}%` }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} style={{ transform: `rotate(${-54 + i * 18}deg)` }} />
            ))}
          </div>

          {/* הבזק ברגע הפתיחה */}
          <div className="burst-flash" aria-hidden="true" style={{ '--mx': `${MOUTH.x}%`, '--my': `${MOUTH.y}%` }} />

          {/* כרטיס השקית הפתוחה — מזנק מתוך השקית */}
          <div
            className="open-card-wrap"
            style={{
              left: `${BAG_RECT.left}%`,
              top: `${BAG_RECT.top}%`,
              width: `${BAG_RECT.width}%`,
              height: `${BAG_RECT.height}%`,
            }}
          >
            <Link to="/flavors" className="open-card" ref={sceneRef} aria-label="השקית נפתחה — לכל הטעמים">
              <img src={BAG_PHOTO} alt="" className="open-card-img" />
              <div className="bag-shine" aria-hidden="true" />
            </Link>
            <span className="bag-twinkle t1" aria-hidden="true">✦</span>
            <span className="bag-twinkle t2" aria-hidden="true">✦</span>
            <span className="bag-twinkle t3" aria-hidden="true">✦</span>
          </div>

          <button className="bag-replay combo-replay" onClick={() => setSeed((s) => s + 1)}>
            🔁 עוד פעם!
          </button>
        </div>
      </section>
    );
  }

  // ===== מצב גיבוי: השקית לבדה עם טקסט (כשאין תמונת רקע) =====
  return (
    <section className="bag-hero" key={seed}>
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
          <button className="bag-replay" onClick={() => setSeed((s) => s + 1)}>
            🔁 עוד פעם!
          </button>
        </div>
      </div>
    </section>
  );
}
