import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './IntroOverlay.css';

const DESKTOP_VIDEO = '/videos/home-intro.mp4';          // אנימציית הפתיחה למחשב (16:9, ~4ש')
const MOBILE_VIDEO = '/videos/home-intro-mobile.mp4';    // אנימציית הפתיחה לטלפון (9:16, ~4ש')
const DESKTOP_POSTER = '/images/home-hero-pc.jpg';       // מוצג עד שהווידאו נטען
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

  // הפעלת הווידאו — במובייל autoplay מותר רק כשהווידאו באמת מושתק.
  // React לא תמיד מסמן muted כתכונת-HTML, לכן מכריחים אותה דרך ה-ref.
  function playVideo() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }

  useEffect(() => {
    playVideo();
    const safety = setTimeout(leave, MAX_HOLD);
    return () => clearTimeout(safety);
  }, []);

  return (
    <div className={`intro-overlay ${leaving ? 'intro-leaving' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
        poster={isMobile ? MOBILE_POSTER : DESKTOP_POSTER}
        muted
        autoPlay
        playsInline
        preload="auto"
        onLoadedData={playVideo}
        onCanPlay={playVideo}
        onEnded={leave}
        onError={leave}
      />
      <button className="intro-skip" onClick={leave}>דלג ←</button>
    </div>
  );
}
