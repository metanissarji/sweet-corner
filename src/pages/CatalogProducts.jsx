import { useParams, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

export default function CatalogProducts() {
  const { id } = useParams();
  const { deals, dealCatalogs } = useProducts();
  const catalogId = parseInt(id, 10);
  
  const catalogInfo = dealCatalogs.find((c) => c.id === catalogId);
  
  if (!catalogInfo) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>הקטלוג לא נמצא 😕</h2>
        <Link to="/deals" className="btn btn-pink" style={{ marginTop: '1rem' }}>חזרה למבצעים</Link>
      </div>
    );
  }

  // Filter the deals that belong to this catalog
  const items = deals.filter(d => d.catalogId === catalogId);

  return (
    <>
      <header className="page-header">
        <h1>{catalogInfo.emoji} {catalogInfo.title}</h1>
        <p>{catalogInfo.desc}</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/deals" style={{ color: 'var(--pink)', textDecoration: 'none', fontWeight: 'bold' }}>
              &rarr; חזרה לקטלוגים
            </Link>
          </div>

          {items.length === 0 ? (
            <p className="text-center" style={{ padding: '2rem 0', color: 'var(--brown-light)' }}>
              אין מבצעים בקטלוג זה כרגע.
            </p>
          ) : (
            <div className="card-grid">
              {items.map((d) => (
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
                        {d.oldPrice > 0 && <span className="old-price">₪{d.oldPrice}</span>}
                      </p>
                      <AddToCart product={{ key: `deal-${d.id}`, name: d.title, price: d.price, emoji: d.emoji }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="text-center" style={{ marginTop: '2.5rem', color: 'var(--brown-light)' }}>
            * המבצעים בתוקף עד גמר המלאי. אין כפל מבצעים.
          </p>
        </div>
      </section>
    </>
  );
}
