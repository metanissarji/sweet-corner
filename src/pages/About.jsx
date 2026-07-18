import { Link } from 'react-router-dom';
import FeatureStrip from '../components/FeatureStrip.jsx';
import WaveDivider from '../components/WaveDivider.jsx';

export default function About() {
  return (
    <>
      <header className="page-header">
        <h1>הסיפור שלנו </h1>
        <p>איך פינה קטנה בשכונה הפכה לפינה הכי מתוקה בעיר</p>
      </header>

      <section className="page-section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>
            הכל התחיל בקיץ אחד חם במיוחד, עם מקפיא אחד קטן ואהבה גדולה לגלידה.
            פתחנו פינה קטנה בשכונה, מילאנו אותה בטעמים שאנחנו הכי אוהבים —
            והשאר היסטוריה מתוקה.
          </p>
          <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>
            היום, עם עשרה סניפים ברחבי הגליל, אנחנו עדיין אותה פינה מתוקה:
            בוחרים בקפידה כל מוצר, מקפידים על שרשרת קירור מושלמת, ומאמינים
            שגלידה טובה יכולה לשפר כל יום — גם את הרגילים ביותר.
          </p>
          <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            תמצאו אצלנו את כל הקלאסיקות שגדלתם עליהן, לצד טעמים מיוחדים
            שמתחדשים כל עונה, מארזים לכל אירוע ומחירים שעושים חשק לחזור.
            כי בסוף, זה מה שאנחנו — טעם של קיץ בכל כפית. 
          </p>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <Link to="/branches" className="btn btn-pink">מצאו סניף קרוב ←</Link>
          </div>
        </div>
        <WaveDivider color="#ffffff" />
      </section>

      <FeatureStrip />
    </>
  );
}
