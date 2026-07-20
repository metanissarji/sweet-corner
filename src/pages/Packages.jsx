import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';

export default function Packages() {
  const { packages } = useProducts();
  const { t } = useLang();
  return (
    <>
      <header className="page-header">
        <h1>{t('packages.title')}</h1>
        <p>{t('packages.sub')}</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="card-grid">
            {packages.map((p) => (
              <article className="card" key={p.id}>
                <div className="product-photo" style={{ aspectRatio: '1 / 1' }}>
                  <ProductImage src={p.image} alt={p.title} emoji={p.emoji} />
                </div>
                <div className="card-body">
                  <span className="card-badge badge-blue">{p.items}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="card-buy-row">
                    <p className="price">₪{p.price}</p>
                    <AddToCart product={{ key: `package-${p.id}`, name: p.title, price: p.price, emoji: p.emoji, image: p.image }} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn-pink">להזמנת מארז מותאם אישית ←</Link>
          </div>
        </div>
      </section>
    </>
  );
}
