import { useState } from 'react';
import ProductImage from '../components/ProductImage.jsx';
import AddToCart from '../components/AddToCart.jsx';
import { useProducts } from '../context/ProductsContext.jsx';

const categories = ['הכל', 'גלידות', 'אייסים', 'חטיפים'];

export default function Flavors() {
  const { flavors } = useProducts();
  const [active, setActive] = useState('הכל');
  const shown = active === 'הכל' ? flavors : flavors.filter((f) => f.category === active);

  return (
    <>
      <header className="page-header">
        <h1>מיוחדים שלנו</h1>
        <p>קלאסיקות שאהובים, טעמים מיוחדים וכל מה שביניהם — בואו לטעום 🍦</p>
      </header>

      <section className="page-section">
        <div className="container">
          <div className="chip-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="card-grid">
            {shown.map((f) => (
              <article className="card" key={f.id}>
                <div style={{ aspectRatio: '4 / 3' }}>
                  <ProductImage src={f.image} alt={f.name} emoji={f.emoji} />
                </div>
                <div className="card-body">
                  <span className="card-badge">{f.tag}</span>
                  <h3>{f.name}</h3>
                  <p>{f.desc}</p>
                  <div className="card-buy-row">
                    <p className="price">₪{f.price}</p>
                    <AddToCart product={{ key: `flavor-${f.id}`, name: f.name, price: f.price, emoji: f.emoji }} />
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
