import './FeatureStrip.css';

const features = [
  {
    icon: '✓',
    color: 'feature-pink',
    title: 'מחירים נוחים',
    text: 'טעמים מעולים במחירים שווים',
  },
  {
    icon: '❄',
    color: 'feature-blue',
    title: 'מוצרים קפואים טריים',
    text: 'איכות ללא פשרות',
  },
  {
    icon: '🍦',
    color: 'feature-rose',
    title: 'מגוון טעמים',
    text: 'קלאסיים ומיוחדים',
  },
  {
    icon: '♥',
    color: 'feature-yellow',
    title: 'שירות עם חיוך',
    text: 'והמון אהבה',
  },
];

export default function FeatureStrip() {
  return (
    <section className="feature-strip">
      <div className="container feature-grid">
        {features.map((f) => (
          <div className="feature" key={f.title}>
            <span className={`feature-icon ${f.color}`} aria-hidden="true">{f.icon}</span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
