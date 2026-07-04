import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BAG_PHOTO, BAG_CLOSED, HOME_PHOTO, useImageExists } from '../hooks/useHomePhoto.js';
import { hotspots } from './PhotoHero.jsx';
import './BagHero.css';

/**
 * עמוד בית קולנועי: שקית "הפינה המתוקה" סגורה שרועדת מרוב ציפייה,
 * ואז הגלידות מתגלות מתוכה בתנועה קפיצית — עם פרץ ניצוצות, ברק,
 * הטיה תלת-ממדית לפי העכבר וכפתור הפעלה מחדש.
 *
 * הטריק: אותה תמונה בשתי שכבות — שכבה קדמית חתוכה לצורת השקית
 * (סטטית), ושכבה אחורית שנחשפת כלפי מעלה עם clip-path מונפש.
 */

const BURST_COLORS = ['#e0245e', '#f7c948', '#2e86e0', '#f6a9bc', '#ffffff'];
const BURST_EMOJI = ['🍦', '🍫', '🍓', '✨', '💗', '🍪'];

/* פרץ ניצוצות מפתח השקית */
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
  // אם צילום השקית הסגורה קיים — הוא מוצג ראשון ונמוג ברגע הפתיחה
  const closedExists = useImageExists(BAG_CLOSED);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    // פרצי ניצוצות מתוזמנים לרגע הפתיחה
    const t1 = setTimeout(() => burst(scene, 0.46, 18), 1050);
    const t2 = setTimeout(() => burst(scene, 0.42, 10), 1500);

    // הטיה תלת-ממדית לפי העכבר
    function onMove(e) {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      scene.style.transform = `rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 12}deg) scale(1.015)`;
    }
    function onLeave() {
      scene.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
    };
  }, [seed]);

  const homeBg = useImageExists(HOME_PHOTO);

  const sceneInner = (
    <div className="bag-scene" ref={sceneRef}>
      {/* שכבה אחורית — נחשפת כלפי מעלה */}
      <img src={BAG_PHOTO} alt="שקית הפינה המתוקה מלאה בגלידות ומתוקים" className="bag-back" />
      {/* שכבה קדמית — השקית עצמה, חתוכה לצורתה */}
      <img src={BAG_PHOTO} alt="" aria-hidden="true" className="bag-front" />
      {/* צילום השקית הסגורה — מכסה הכל עד רגע הפתיחה */}
      {closedExists === true && (
        <img src={BAG_CLOSED} alt="" aria-hidden="true" className="bag-closed" />
      )}
      <div className="bag-glow" aria-hidden="true" />
      <div className="bag-shine" aria-hidden="true" />
      <span className="bag-twinkle t1" aria-hidden="true">✦</span>
      <span className="bag-twinkle t2" aria-hidden="true">✦</span>
      <span className="bag-twinkle t3" aria-hidden="true">✦</span>
    </div>
  );

  // מצב משולב: עיצוב הרוחב המלא כרקע, והשקית הנפתחת במרכז במקום הכיתוב
  if (homeBg === true) {
    return (
      <section className="combo-hero" key={seed}>
        <div className="combo-frame" ref={stageRef}>
          <img src={HOME_PHOTO} alt="הפינה המתוקה — טעם של קיץ בכל כפית" className="combo-bg" />
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
          <div className="combo-stage">
            <div className="bag-float">{sceneInner}</div>
          </div>
          <button className="bag-replay combo-replay" onClick={() => setSeed((s) => s + 1)}>
            🔁 עוד פעם!
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bag-hero" key={seed}>
      <div className="splash splash-blue" />
      <div className="splash splash-pink" />

      <div className="container bag-grid">
        {/* טקסט */}
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

        {/* הבמה התלת-ממדית */}
        <div className="bag-stage" ref={stageRef}>
          <div className="bag-float">{sceneInner}</div>
          <div className="bag-shadow" aria-hidden="true" />
          <button className="bag-replay" onClick={() => setSeed((s) => s + 1)}>
            🔁 עוד פעם!
          </button>
        </div>
      </div>
    </section>
  );
}
