import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { deals } from '../data/products.js';

export default function Deals() {
  return (
    <>
      <header className="page-header">
        <h1>מבצעים חמים 🔥</h1>
        <p>הכי מתוק זה לחסוך — המבצעים שלנו מתחדשים כל שבוע</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="card-grid">
            {deals.map((d) => (
              <article className="card" key={d.id}>
                <div style={{ aspectRatio: '4 / 3' }}>
                  <ProductImage src={d.image} alt={d.title} emoji={d.emoji} />
                </div>
                <div className="card-body">
                  <span className="card-badge badge-pink">{d.badge}</span>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  <div className="card-buy-row">
                    <p className="price">
                      ₪{d.price}
                      <span className="old-price">₪{d.oldPrice}</span>
                    </p>
                    <AddToCart product={{ key: `deal-${d.id}`, name: d.title, price: d.price, emoji: d.emoji }} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center" style={{ marginTop: '2.5rem', color: 'var(--brown-light)' }}>
            * המבצעים בתוקף עד גמר המלאי. אין כפל מבצעים.
          </p>
        </div>
      </section>
    </>
  );
}
