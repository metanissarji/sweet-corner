import { useState } from 'react';
import { PHONE, PHONE_LINK, INSTAGRAM, INSTAGRAM_HANDLE, HOURS } from '../data/products.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <header className="page-header">
        <h1>צור קשר 💌</h1>
        <p>שאלה? הזמנה מיוחדת? סתם בא לכם להגיד שלום? אנחנו כאן</p>
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
                <p style={{ fontSize: '3rem' }}>🍦</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--pink)' }}>
                  ההודעה נשלחה!
                </h3>
                <p style={{ color: 'var(--brown-light)', marginTop: '0.5rem' }}>
                  נחזור אליכם ממש בקרוב. בינתיים — מגיע לכם שלגון 😉
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">שם מלא</label>
                  <input id="name" type="text" required placeholder="ישראל ישראלי" />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">טלפון</label>
                  <input id="phone" type="tel" required placeholder="050-0000000" />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">נושא</label>
                  <select id="subject" defaultValue="שאלה כללית">
                    <option>שאלה כללית</option>
                    <option>הזמנת מארז</option>
                    <option>אירועים ומסיבות</option>
                    <option>שיתוף פעולה</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">הודעה</label>
                  <textarea id="message" rows="4" required placeholder="ספרו לנו הכל..." />
                </div>
                <button type="submit" className="btn btn-pink" style={{ width: '100%', justifyContent: 'center' }}>
                  שליחה 💗
                </button>
              </form>
            )}
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem' }}>
              דרכים נוספות להגיע אלינו
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '1.05rem' }}>
              <li>📞 <a href={PHONE_LINK} style={{ fontWeight: 600 }}>{PHONE}</a></li>
              <li>📸 <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>{INSTAGRAM_HANDLE}</a></li>
              <li>📍 שישה סניפים בגליל</li>
              <li>🕙 {HOURS}</li>
            </ul>
            <p style={{ marginTop: '1.5rem', color: 'var(--brown-light)' }}>
              להזמנות גדולות ואירועים מומלץ ליצור קשר לפחות 3 ימים מראש —
              כדי שנספיק להכין לכם משהו מתוק במיוחד.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
