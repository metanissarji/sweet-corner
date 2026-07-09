import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './IntroOverlay.css';

const DESKTOP_IMG = '/images/home-hero-pc.jpg';
const MOBILE_IMG = '/images/home-hero.jpg';
const HOLD = 5000;   // כמה זמן ה-home page מוצג
const AUDIO_MS = 6000;

/**
 * מסך פתיחה: מציג את ה-home page ~5 שניות עם דמות שעפה ונוחתת על השקית,
 * מנגן 6 שניות מהשיר, ואז נמוג בעדינות וחושף את התוכן שמתחת.
 */
export default function IntroOverlay({ onDone }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [leaving, setLeaving] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      a.volume = 0.85;
      const tryPlay = () => a.play().catch(() => {});
      tryPlay(); // ניסיון ראשון (עשוי להיחסם עד אינטראקציה)
      const onGesture = () => tryPlay();
      window.addEventListener('pointerdown', onGesture, { once: true });
    }
    const stopAudio = setTimeout(() => { if (a) fade(a); }, AUDIO_MS - 700);
    const leaveT = setTimeout(() => setLeaving(true), HOLD);
    const doneT = setTimeout(() => onDone && onDone(), HOLD + 700);
    return () => {
      clearTimeout(stopAudio); clearTimeout(leaveT); clearTimeout(doneT);
      if (a) a.pause();
    };
  }, [onDone]);

  function fade(a) {
    const step = () => {
      if (a.volume > 0.06) { a.volume = Math.max(0, a.volume - 0.06); setTimeout(step, 45); }
      else a.pause();
    };
    step();
  }

  function skip() {
    setLeaving(true);
    setTimeout(() => onDone && onDone(), 600);
  }

  return (
    <div className={`intro-overlay ${leaving ? 'intro-leaving' : ''}`}>
      <img src={isMobile ? MOBILE_IMG : DESKTOP_IMG} className="intro-poster" alt="הפינה המתוקה" />
      <div className="intro-flash" aria-hidden="true" />
      <img src="/images/character.png" className="intro-character" alt="" aria-hidden="true" />
      <audio ref={audioRef} src="/audio/intro.mp3" preload="auto" />
      <button className="intro-skip" onClick={skip}>דלג ←</button>
    </div>
  );
}
