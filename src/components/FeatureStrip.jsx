import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';
import './FeatureStrip.css';

/* פס נתונים מונפש: המספרים נספרים מ-0 כשהפס נכנס למסך (בהשראת עמודי מוצר מודרניים).
   כל המספרים אמיתיים — מינימום הזמנה, משלוח חינם, סניפים, מבצעי מקפיא. */
const stats = [
  { value: 10, prefix: '₪', titleKey: 'fs.st1title', textKey: 'fs.st1text' },
  { value: 250, prefix: '₪', titleKey: 'fs.st2title', textKey: 'fs.st2text' },
  { value: 10, prefix: '', titleKey: 'fs.st3title', textKey: 'fs.st3text' },
  { value: 18, prefix: '', titleKey: 'fs.st4title', textKey: 'fs.st4text' },
];

const COUNT_MS = 1400;

export default function FeatureStrip() {
  const { t } = useLang();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setVisible(true);
        if (reduced) {
          setValues(stats.map((s) => s.value));
          return;
        }
        // ספירה מ-0 עם האטה בסוף (rAF — טיימרים, לא אירועי finish)
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / COUNT_MS);
          const eased = 1 - Math.pow(1 - p, 3);
          setValues(stats.map((s) => Math.round(s.value * eased)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`feature-strip ${visible ? 'stats-on' : ''}`} ref={ref}>
      <div className="container">
        <div className="stats-intro">
          <h2>{t('fs.title')}</h2>
          <p>
            {t('fs.textPre')} <strong>{t('fs.textStrong')}</strong>
            {t('fs.textMid')}<strong>₪10</strong> {t('fs.textEnd')}
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat" key={s.titleKey} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="stat-value">
                {s.prefix && <span className="stat-currency">{s.prefix}</span>}
                {values[i]}
              </div>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
