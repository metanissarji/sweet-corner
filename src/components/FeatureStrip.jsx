import { useEffect, useRef, useState } from 'react';
import './FeatureStrip.css';

/* פס נתונים מונפש: המספרים נספרים מ-0 כשהפס נכנס למסך (בהשראת עמודי מוצר מודרניים).
   כל המספרים אמיתיים — מינימום הזמנה, משלוח חינם, סניפים, מבצעי מקפיא. */
const stats = [
  { value: 10, prefix: '₪', title: 'מינימום הזמנה', text: 'כל משלוח יוצא בבוקס עם שקית קרח ' },
  { value: 250, prefix: '₪', title: 'משלוח חינם', text: 'בהזמנה מעל הסכום הזה' },
  { value: 6, prefix: '', title: 'סניפים בגליל', text: 'נצרת, נוף הגליל, יפיע ועוד' },
  { value: 15, prefix: '', title: 'מבצעי מקפיא', text: 'כמויות שוות במחיר מיוחד' },
];

const COUNT_MS = 1400;

export default function FeatureStrip() {
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
          <h2>משלוח קפוא עד הבית </h2>
          <p>
            כל הזמנה יוצאת אליכם <strong>בבוקס ממותג של הפינה המתוקה עם שקית קרח</strong>,
            כדי שהכל יגיע קפוא ומושלם — ולכן הזמנה מתחילה מ־<strong>₪10</strong> בלבד.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat" key={s.title} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="stat-value">
                {s.prefix && <span className="stat-currency">{s.prefix}</span>}
                {values[i]}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
