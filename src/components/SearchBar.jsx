import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext.jsx';
import AddToCart from './AddToCart.jsx';
import './SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { flavors, deals, packages } = useProducts();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Combine all products for search
  const allProducts = [
    ...flavors.map(f => ({ ...f, type: 'flavor', searchTitle: f.name, navTo: '/flavors', searchStr: `${f.name} ${f.desc || ''} ${f.category || ''}` })),
    ...deals.map(d => ({ ...d, type: 'deal', searchTitle: d.title, navTo: `/deals/catalog/${d.catalogId}`, searchStr: `${d.title} ${d.desc || ''} מבצע` })),
    ...packages.map(p => ({ ...p, type: 'package', searchTitle: p.title, navTo: '/packages', searchStr: `${p.title} ${p.desc || ''} מארז` }))
  ];

  // Filter based on query
  const results = query.trim().length > 0 
    ? allProducts.filter(p => p.searchStr.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        if (query.trim().length === 0) {
          setIsExpanded(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNavigate(e, navTo) {
    // If they clicked the AddToCart button, don't navigate
    if (e.target.closest('.add-to-cart') || e.target.closest('button')) return;
    navigate(navTo);
    setIsOpen(false);
    setQuery('');
    setIsExpanded(false);
  }

  return (
    <div className={`search-bar-wrapper ${isExpanded ? 'expanded' : ''}`} ref={wrapperRef}>
      <div className="search-input-container">
        <button 
          className="search-icon-btn" 
          onClick={() => setIsExpanded(true)}
          aria-label="חיפוש"
        >
          🔍
        </button>
        <input 
          ref={inputRef}
          type="text" 
          className="search-input"
          placeholder="מה בא לך מתוק?..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); setIsOpen(false); inputRef.current?.focus(); }}>✕</button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="search-results-dropdown">
          {results.length === 0 ? (
            <div className="search-no-results">
              לא מצאנו תוצאות ל"{query}" 😕
            </div>
          ) : (
            <ul className="search-results-list">
              {results.map((product) => (
                <li key={`${product.type}-${product.id}`} className="search-result-item" onClick={(e) => handleNavigate(e, product.navTo)}>
                  <div className="search-result-info">
                    <span className="search-result-emoji">{product.emoji}</span>
                    <div className="search-result-text">
                      <span className="search-result-name">{product.searchTitle}</span>
                      {product.price !== undefined && <span className="search-result-price">₪{product.price}</span>}
                    </div>
                  </div>
                  <div className="search-result-action">
                    {product.price !== undefined && (
                      <AddToCart product={{ key: `${product.type}-${product.id}`, name: product.searchTitle, price: product.price, emoji: product.emoji }} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
