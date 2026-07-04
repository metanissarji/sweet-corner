import { branches } from '../data/products.js';

export default function Branches() {
  return (
    <>
      <header className="page-header">
        <h1>הסניפים שלנו 📍</h1>
        <p>שישה סניפים ברחבי הארץ — תמיד יש פינה מתוקה קרובה אליכם</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="card-grid">
            {branches.map((b) => (
              <article className="card" key={b.id} style={{ padding: '1.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--pink)' }}>
                  {b.city}
                </h3>
                <p style={{ marginTop: '0.4rem', fontWeight: 600 }}>📍 {b.address}</p>
                <p style={{ marginTop: '0.3rem' }}>
                  📞 <a href={`tel:${b.phone.replace(/-/g, '')}`}>{b.phone}</a>
                </p>
                <p style={{ marginTop: '0.3rem', color: 'var(--brown-light)', fontSize: '0.95rem' }}>
                  🕙 {b.hours}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
