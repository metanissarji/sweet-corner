import { Link } from 'react-router-dom';
import { PHONE, PHONE_LINK, INSTAGRAM, INSTAGRAM_HANDLE } from '../data/products.js';
import { useLang } from '../context/LanguageContext.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <h3 className="footer-logo">
            <span>הפינה</span> המתוקה
          </h3>
          <p>{t('footer.tagline')}</p>
          <p>{t('footer.desc')}</p>
        </div>

        <div className="footer-col">
          <h4>{t('footer.nav')}</h4>
          <ul>
            <li><Link to="/flavors">{t('nav.specials')}</Link></li>
            <li><Link to="/deals">{t('nav.deals')}</Link></li>
            <li><Link to="/packages">{t('nav.packages')}</Link></li>
            <li><Link to="/branches">{t('nav.branches')}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.service')}</h4>
          <ul>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
            <li><a href={PHONE_LINK}>{PHONE}</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noreferrer">{INSTAGRAM_HANDLE}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.hours')}</h4>
          <ul>
            <li>{t('footer.days')}</li>
            <li>{t('footer.hoursVal')}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{new Date().getFullYear()} {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
