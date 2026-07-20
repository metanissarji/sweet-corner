import { branches, PHONE, PHONE_LINK, INSTAGRAM, INSTAGRAM_HANDLE } from '../data/products.js';
import { useLang } from '../context/LanguageContext.jsx';

export default function Branches() {
  const { t } = useLang();

  return (
    <>
      <header className="page-header">
        <h1>{t('branches.title')}</h1>
        <p>{t('branches.sub')}</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="card-grid">
            {branches.map((b) => (
              <article className="card branch-card" key={b.id} style={{ padding: '1.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--pink)' }}>
                  {t(`branch.${b.id}`)}
                </h3>
                <p style={{ marginTop: '0.5rem' }}>
                  <a href={PHONE_LINK} style={{ fontWeight: 600 }}>{b.phone}</a>
                </p>
                <p style={{ marginTop: '0.3rem', color: 'var(--brown-light)', fontSize: '0.95rem' }}>
                  {t('footer.days')} · {t('footer.hoursVal')}
                </p>
              </article>
            ))}
          </div>

          {/* עקבו אחרינו + יצירת קשר */}
          <div className="branches-social">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="insta-btn">
              <span className="insta-icon" aria-hidden="true"></span>
              {t('branches.insta')} {INSTAGRAM_HANDLE}
            </a>
            <a href={PHONE_LINK} className="btn btn-outline phone-btn">
              {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
