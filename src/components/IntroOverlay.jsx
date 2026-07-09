import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './IntroOverlay.css';

const VIDEO_SRC = '/videos/home-intro.mp4';           // אנימציית הפתיחה (וידאו 16:9, ~4ש')
const DESKTOP_POSTER = '/images/home-hero-pc.jpg';    // מוצג עד שהווידאו נטען
const MOBILE_POSTER = '/images/home-hero.jpg';
const MAX_HOLD = 9000; // חגורת ביטחון — אם הווידאו נתקע/לא נטען, ממשיכים בכל מקרה

/**
 * מסך פתיחה: מנגן את וידאו האנימציה של עמוד הבית (ללא קול),
 * וכשהוא מסתיים — נמוג בעדינות וחושף את התוכן שמתחת.
 */
export default function IntroOverlay({ onDone }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef(null);
  const leftRef = useRef(false);

  function leave() {
    if (leftRef.current) return;
    leftRef.current = true;
    setLeaving(true);
    setTimeout(() => onDone && onDone(), 700);
  }

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {}); // autoplay מושתק — מותר בדפדפנים
    const safety = setTimeout(leave, MAX_HOLD);
    return () => clearTimeout(safety);
  }, []);

  return (
    <div className={`intro-overlay ${leaving ? 'intro-leaving' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src={VIDEO_SRC}
        poster={isMobile ? MOBILE_POSTER : DESKTOP_POSTER}
        muted
        autoPlay
        playsInline
        preload="auto"
        onEnded={leave}
        onError={leave}
      />
      <button className="intro-skip" onClick={leave}>דלג ←</button>
    </div>
  );
}
