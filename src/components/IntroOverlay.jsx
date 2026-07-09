import { useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './IntroOverlay.css';

const DESKTOP_IMG = '/images/home-hero-pc.jpg';
const MOBILE_IMG = '/images/home-hero.jpg';
const HOLD = 5000;   // כמה זמן ה-home page מוצג

/**
 * מסך פתיחה: מציג את ה-home page ~5 שניות עם דמות שעפה ונוחתת על השקית,
 * ואז נמוג בעדינות וחושף את התוכן שמתחת. (ללא מוזיקה)
 */
export default function IntroOverlay({ onDone }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveT = setTimeout(() => setLeaving(true), HOLD);
    const doneT = setTimeout(() => onDone && onDone(), HOLD + 700);
    return () => {
      clearTimeout(leaveT); clearTimeout(doneT);
    };
  }, [onDone]);

  function skip() {
    setLeaving(true);
    setTimeout(() => onDone && onDone(), 600);
  }

  return (
    <div className={`intro-overlay ${leaving ? 'intro-leaving' : ''}`}>
      <img src={isMobile ? MOBILE_IMG : DESKTOP_IMG} className="intro-poster" alt="הפינה המתוקה" />
      <div className="intro-flash" aria-hidden="true" />
      <img src="/images/character.png" className="intro-character" alt="" aria-hidden="true" />
      <button className="intro-skip" onClick={skip}>דלג ←</button>
    </div>
  );
}
