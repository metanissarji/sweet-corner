import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

export default function Deals() {
  const { dealCatalogs } = useProducts();

  return (
    <>
      <header className="page-header">
        <h1>מבצעים חמים 🔥</h1>
        <p>בחרו קטלוג כדי לראות את המבצעים שלנו</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="card-grid">
            {dealCatalogs.map((catalog) => (
              <article className="card" key={catalog.id}>
                <div style={{ aspectRatio: '4 / 3' }}>
                  <ProductImage src={catalog.image} alt={catalog.title} emoji={catalog.emoji} />
                </div>
                <div className="card-body">
                  <span className="card-badge badge-pink">{catalog.badge || 'קטלוג מבצעים'}</span>
                  <h3>{catalog.title}</h3>
                  <p>{catalog.desc}</p>
                  <div className="card-buy-row" style={{ marginTop: '1.5rem' }}>
                    <Link to={`/deals/catalog/${catalog.id}`} className="btn btn-pink" style={{ width: '100%', textAlign: 'center' }}>
                      לצפייה במוצרים ←
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
