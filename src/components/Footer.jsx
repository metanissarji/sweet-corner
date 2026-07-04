import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <h3 className="footer-logo">
            <span>הפינה</span> המתוקה
          </h3>
          <p>טעם של קיץ בכל כפית 🍦</p>
          <p>גלידות, אייסים, מארזים ופינוקים בטעמים שאהובים על כולם.</p>
        </div>

        <div className="footer-col">
          <h4>ניווט מהיר</h4>
          <ul>
            <li><Link to="/flavors">הטעמים שלנו</Link></li>
            <li><Link to="/deals">מבצעים</Link></li>
            <li><Link to="/packages">מארזים</Link></li>
            <li><Link to="/branches">סניפים</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>שירות לקוחות</h4>
          <ul>
            <li><Link to="/contact">צור קשר</Link></li>
            <li><Link to="/about">אודות</Link></li>
            <li><a href="tel:039999999">03-9999999</a></li>
            <li><a href="mailto:hello@sweet-corner.co.il">hello@sweet-corner.co.il</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>שעות פעילות</h4>
          <ul>
            <li>א׳–ה׳: 10:00–22:00</li>
            <li>ו׳ וערבי חג: 9:00–15:00</li>
            <li>מוצ״ש: שעה לאחר צאת השבת</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} הפינה המתוקה — כל הזכויות שמורות 💗</p>
      </div>
    </footer>
  );
}
