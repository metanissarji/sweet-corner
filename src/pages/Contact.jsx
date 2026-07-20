import { useState } from 'react';
import { PHONE, PHONE_LINK, INSTAGRAM, INSTAGRAM_HANDLE } from '../data/products.js';
import { useLang } from '../context/LanguageContext.jsx';

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <header className="page-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.sub')}</p>
      </header>

      <section className="page-section">
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            maxWidth: '900px',
          }}
        >
          <div className="card" style={{ padding: '2rem' }}>
            {sent ? (
              <div className="text-center" style={{ padding: '2rem 0' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--pink)' }}>
                  {t('contact.sentTitle')}
                </h3>
                <p style={{ color: 'var(--brown-light)', marginTop: '0.5rem' }}>
                  {t('contact.sentSub')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input id="name" type="text" required placeholder={t('contact.namePh')} />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">{t('contact.phone')}</label>
                  <input id="phone" type="tel" required placeholder="050-0000000" />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">{t('contact.subject')}</label>
                  <select id="subject" defaultValue={t('contact.subj1')}>
                    <option>{t('contact.subj1')}</option>
                    <option>{t('contact.subj2')}</option>
                    <option>{t('contact.subj3')}</option>
                    <option>{t('contact.subj4')}</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea id="message" rows="4" required placeholder={t('contact.messagePh')} />
                </div>
                <button type="submit" className="btn btn-pink" style={{ width: '100%', justifyContent: 'center' }}>
                  {t('contact.send')}
                </button>
              </form>
            )}
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem' }}>
              {t('contact.moreWays')}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '1.05rem' }}>
              <li><a href={PHONE_LINK} style={{ fontWeight: 600 }}>{PHONE}</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>{INSTAGRAM_HANDLE}</a></li>
              <li>{t('contact.branches10')}</li>
              <li>{t('footer.days')} · {t('footer.hoursVal')}</li>
            </ul>
            <p style={{ marginTop: '1.5rem', color: 'var(--brown-light)' }}>
              {t('contact.eventsNote')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
