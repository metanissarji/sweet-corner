import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery.js';
import './IntroOverlay.css';

const DESKTOP_VIDEO = '/videos/home-intro.mp4';          // אנימציית הפתיחה למחשב (16:9, ~4ש')
const MOBILE_VIDEO = '/videos/home-intro-mobile.mp4';    // אנימציית הפתיחה לטלפון (9:16, ~4ש')
const DESKTOP_POSTER = '/images/home-hero-pc.jpg';       // מוצג עד שהווידאו נטען
const MOBILE_POSTER = '/images/home-hero.jpg';
const MAX_HOLD = 9000; // חגורת ביטחון — אם הווידאו נתקע/לא נטען, ממשיכים בכל מקרה

/**
 * מסך פתיחה: מנגן את וידאו האנימציה של עמוד הבית (ללא קול), וכשמסתיים נמוג.
 * במובייל autoplay מותר רק כשהווידאו באמת מושתק — לכן מסמנים muted מיד עם יצירת
 * האלמנט (callback ref) ולא רק כ-prop של React (שלא תמיד מסומן כתכונת-HTML).
 */
export default function IntroOverlay({ onDone }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef(null);
  const leftRef = useRef(false);
  const blockedRef = useRef(false);

  function leave() {
    if (leftRef.current) return;
    leftRef.current = true;
    setLeaving(true);
    setTimeout(() => onDone && onDone(), 700);
  }

  // callback ref — מסמן muted ברגע שהאלמנט נוצר, לפני שהדפדפן בודק autoplay
  function attachVideo(node) {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.setAttribute('muted', '');
    }
  }

  function playVideo() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.then) {
      p.then(() => { blockedRef.current = false; }).catch(() => { blockedRef.current = true; });
    }
  }

  useEffect(() => {
    playVideo();
    // אם ה-autoplay נחסם (למשל מצב חיסכון בסוללה ב-iPhone) — לא נשארים תקועים על פריים קפוא
    const blockCheck = setTimeout(() => { if (blockedRef.current) leave(); }, 1600);
    const safety = setTimeout(leave, MAX_HOLD);
    return () => { clearTimeout(blockCheck); clearTimeout(safety); };
  }, []);

  return (
    <div className={`intro-overlay ${leaving ? 'intro-leaving' : ''}`}>
      <video
        ref={attachVideo}
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
