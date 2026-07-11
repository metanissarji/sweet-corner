import { useState, useRef, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext.jsx';
import './Admin.css';

const ADMIN_PIN = '1234';

/* ====================================================================
   LOGIN SCREEN
   ==================================================================== */
function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const refs = [useRef(), useRef(), useRef(), useRef()];

  function handleChange(idx, value) {
    if (!/^\d*$/.test(value)) return;
    const next = [...pin];
    next[idx] = value.slice(-1);
    setPin(next);
    setError(false);
    if (value && idx < 3) refs[idx + 1].current?.focus();
  }

  function handleKeyDown(idx, e) {
    if (e.key === 'Backspace' && !pin[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const code = pin.join('');
    if (code.length < 4) {
      setError(true);
      setErrorMsg('הזינו 4 ספרות');
      return;
    }
    if (code === ADMIN_PIN) {
      onLogin();
    } else {
      setError(true);
      setErrorMsg('קוד שגוי — נסו שוב');
      setPin(['', '', '', '']);
      refs[0].current?.focus();
    }
  }

  useEffect(() => {
    refs[0].current?.focus();
  }, []);

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <span className="login-emoji"></span>
        <h1>לוח ניהול</h1>
        <p>הזינו את קוד הגישה בן 4 ספרות</p>

        <div className="pin-input-row">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              className={error ? 'pin-error' : ''}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoComplete="off"
            />
          ))}
        </div>

        <button type="submit" className="admin-login-btn">
          כניסה
        </button>

        {errorMsg && error && <p className="login-error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
}

/* ====================================================================
   EDIT / ADD MODAL
   ==================================================================== */
function ProductModal({ mode, category, product, onSave, onClose, dealCatalogs, selectedCatalogId }) {
  const isFlavorCat = category === 'flavors';
  const isDealCat = category === 'deals';
  const isCatalogCat = category === 'dealCatalogs';
  const isFavoriteCat = category === 'favorites';
  const isFreezerCat = category === 'freezerDeals';
  const isFreezerProductCat = category === 'freezerProducts';

  const [form, setForm] = useState(() => {
    if (product) return { ...product };
    if (isFlavorCat || isFavoriteCat || isFreezerProductCat) {
      return { name: '', category: 'גלידות', tag: '', emoji: '', image: '', desc: '', price: 0 };
    }
    if (isDealCat) {
      return { badge: '', title: '', desc: '', price: 0, oldPrice: 0, emoji: '', image: '', catalogId: selectedCatalogId || dealCatalogs?.[0]?.id || 1 };
    }
    if (isCatalogCat) {
      return { badge: '', title: '', desc: '', emoji: '️', image: '' };
    }
    if (isFreezerCat) {
      return { qty: 0, price: 0, image: '', products: [] };
    }
    return { title: '', desc: '', items: '', price: 0, emoji: '', image: '' };
  });

  const [preview, setPreview] = useState(product?.image || '');

  function set(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      set('image', dataUrl);
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  const nameField = (isFlavorCat || isFavoriteCat || isFreezerProductCat) ? 'name' : 'title';

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{mode === 'edit' ? 'עריכת מוצר ️' : 'מוצר חדש '}</h3>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            {/* Photo Upload */}
            <div className="admin-form-group">
              <label>תמונה</label>
              <div className="admin-photo-upload">
                <input type="file" accept="image/*" onChange={handlePhoto} />
                <span className="upload-icon"></span>
                <p className="upload-text">
                  <strong>לחצו להעלאת תמונה</strong> או גררו לכאן
                </p>
              </div>
              {preview && (
                <div className="admin-photo-preview">
                  <img src={preview} alt="preview" />
                </div>
              )}
            </div>

            {/* Name */}
            {!isFreezerCat && (
              <div className="admin-form-group">
                <label>{isFlavorCat || isFreezerProductCat ? 'שם' : 'כותרת'}</label>
                <input
                  type="text"
                  value={form[nameField] || ''}
                  onChange={(e) => set(nameField, e.target.value)}
                  required
                />
              </div>
            )}

            {/* Qty (for freezers) */}
            {isFreezerCat && (
              <div className="admin-form-group">
                <label>כמות במבצע</label>
                <input
                  type="number"
                  min="1"
                  value={form.qty || 0}
                  onChange={(e) => set('qty', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            )}

            {/* Description */}
            {!isFreezerCat && (
              <div className="admin-form-group">
                <label>תיאור</label>
                <input
                  type="text"
                  value={form.desc || ''}
                  onChange={(e) => set('desc', e.target.value)}
                />
              </div>
            )}

            <div className="admin-form-row">
              {/* Price - Hidden for Catalogs */}
              {!isCatalogCat && (
                <div className="admin-form-group">
                  <label>מחיר (₪)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.price}
                    onChange={(e) => set('price', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
              )}

              {/* Old Price for deals */}
              {isDealCat && (
                <div className="admin-form-group">
                  <label>מחיר ישן (₪)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.oldPrice || 0}
                    onChange={(e) => set('oldPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
              )}

              {/* Emoji */}
              <div className="admin-form-group">
                <label>אימוג׳י</label>
                <input
                  type="text"
                  value={form.emoji || ''}
                  onChange={(e) => set('emoji', e.target.value)}
                />
              </div>
            </div>

            {/* Category — flavors only */}
            {isFlavorCat && (
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>קטגוריה</label>
                  <select value={form.category || ''} onChange={(e) => set('category', e.target.value)}>
                    <option value="גלידות">גלידות</option>
                    <option value="אייסים">אייסים</option>
                    <option value="חטיפים">חטיפים</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>תג</label>
                  <input
                    type="text"
                    value={form.tag || ''}
                    onChange={(e) => set('tag', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Badge — deals and catalogs */}
            {(isDealCat || isCatalogCat) && (
              <div className="admin-form-group">
                <label>תג</label>
                <input
                  type="text"
                  value={form.badge || ''}
                  onChange={(e) => set('badge', e.target.value)}
                />
              </div>
            )}

            {/* Catalog Assignment - Deals Only */}
            {isDealCat && dealCatalogs && (
              <div className="admin-form-group">
                <label>שיוך לקטלוג</label>
                <select 
                  value={form.catalogId || ''} 
                  onChange={(e) => set('catalogId', parseInt(e.target.value, 10))}
                  required
                >
                  <option value="" disabled>בחרו קטלוג</option>
                  {dealCatalogs.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.emoji} {cat.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Items — packages only */}
            {category === 'packages' && (
              <div className="admin-form-group">
                <label>כמות פריטים</label>
                <input
                  type="text"
                  value={form.items || ''}
                  onChange={(e) => set('items', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="admin-btn-cancel" onClick={onClose}>
              ביטול
            </button>
            <button type="submit" className="admin-btn-save">
              {mode === 'edit' ? ' שמירה' : ' הוספה'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ====================================================================
   DELETE CONFIRM MODAL
   ==================================================================== */
function DeleteModal({ product, category, onConfirm, onClose }) {
  const nameField = category === 'flavors' ? 'name' : 'title';
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>מחיקת מוצר</h3>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-modal-body">
          <div className="admin-delete-confirm">
            <span className="delete-emoji">️</span>
            <p>בטוחים שרוצים למחוק?</p>
            <p className="delete-name">{product[nameField]}</p>
          </div>
        </div>
        <div className="admin-modal-footer">
          <button type="button" className="admin-btn-cancel" onClick={onClose}>ביטול</button>
          <button
            type="button"
            className="admin-btn-save"
            style={{ background: 'linear-gradient(135deg, #ff4444, #cc0000)' }}
            onClick={onConfirm}
          >
            ️ מחיקה
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   PRODUCT CARD
   ==================================================================== */
function AdminCard({ product, category, index, isFirst, isLast, onEdit, onDelete, onEnterCatalog, onMoveUp, onMoveDown, onMoveTop, onMoveBottom }) {
  const nameField = (category === 'flavors' || category === 'favorites' || category === 'freezerProducts') ? 'name' : 'title';
  const isCatalog = category === 'dealCatalogs';
  const isFreezer = category === 'freezerDeals';
  
  const displayName = product[nameField] || (isFreezer ? `מקפיא מס' ${product.id} (${product.qty} ב-${product.price}₪)` : '');

  function handleMainClick() {
    if (isCatalog && onEnterCatalog) onEnterCatalog(product);
    else if (isFreezer && onEnterCatalog) onEnterCatalog(product);
    else onEdit(product);
  }

  return (
    <div className="admin-product-card">
      <div className="admin-card-image" onClick={handleMainClick} style={{ cursor: 'pointer' }}>
        <div className="admin-card-order-controls" onClick={(e) => e.stopPropagation()}>
          <button className="order-btn" title="העבר להתחלה" onClick={() => onMoveTop(product)} disabled={isFirst}>⇈</button>
          <button className="order-btn" title="העבר למעלה" onClick={() => onMoveUp(product)} disabled={isFirst}>↑</button>
          <button className="order-btn" title="העבר למטה" onClick={() => onMoveDown(product)} disabled={isLast}>↓</button>
          <button className="order-btn" title="העבר לסוף" onClick={() => onMoveBottom(product)} disabled={isLast}>⇊</button>
        </div>
        {product.image ? (
          <img src={product.image} alt={product[nameField]} />
        ) : (
          <span className="emoji-placeholder">{product.emoji}</span>
        )}
        <div className="admin-card-image-overlay">
          <span>{isCatalog ? ' כניסה לקטלוג' : '️ עריכה'}</span>
        </div>
      </div>
      <div className="admin-card-body">
        {(category === 'flavors' || category === 'favorites') && product.category && (
          <span className="admin-card-category">{product.category}</span>
        )}
        {category === 'deals' && product.badge && (
          <span className="admin-card-category">{product.badge}</span>
        )}
        {category === 'packages' && product.items && (
          <span className="admin-card-category">{product.items}</span>
        )}
        <h4 className="admin-card-name">{displayName}</h4>
        {product.desc && <p className="admin-card-desc">{product.desc}</p>}
        <p className="admin-card-price">
          {product.price !== undefined ? `₪${product.price}` : ''}
          {product.oldPrice != null && product.oldPrice > 0 && (
            <span className="old-price-admin">₪{product.oldPrice}</span>
          )}
        </p>
        <div className="admin-card-actions">
          {isCatalog && (
            <button className="admin-card-btn admin-card-btn-edit" onClick={() => onEnterCatalog(product)} style={{background: 'var(--blue)', color: 'white', borderColor: 'var(--blue)'}}>
               מוצרים
            </button>
          )}
          {isFreezer && (
            <button className="admin-card-btn admin-card-btn-edit" onClick={() => onEnterCatalog(product)} style={{background: 'var(--blue)', color: 'white', borderColor: 'var(--blue)'}}>
               גלידות בפנים
            </button>
          )}
          <button className="admin-card-btn admin-card-btn-edit" onClick={() => onEdit(product)}>
            ️ עריכה
          </button>
          <button className="admin-card-btn admin-card-btn-delete" onClick={() => onDelete(product)}>
            ️ מחיקה
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   TOAST
   ==================================================================== */
function Toast({ message }) {
  return <div className="admin-toast">{message}</div>;
}

/* ====================================================================
   ADMIN PAGE
   ==================================================================== */
const TABS = [
  { key: 'flavors', label: ' טעמים', title: 'טעמים' },
  { key: 'favorites', label: ' הכי נמכרים', title: 'הטעמים שכולם אוהבים' },
  { key: 'freezerDeals', label: ' כל המבצעים', title: 'מבצעי מקפיאים' },
  { key: 'dealCatalogs', label: '️ קטלוגים', title: 'קטלוגים' },
  { key: 'packages', label: ' מארזים', title: 'מארזים' },
];

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('flavors');
  const [selectedCatalogId, setSelectedCatalogId] = useState(null);
  const [editModal, setEditModal] = useState(null);   // { mode, product }
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState('');

  const { flavors, favorites, freezerDeals, dealCatalogs, deals, packages, updateProduct, addProduct, deleteProduct, moveProduct, addFreezerProduct, updateFreezerProduct, deleteFreezerProduct, moveFreezerProduct, resetToDefaults } =
    useProducts();

  const dataSets = { flavors, favorites, freezerDeals, dealCatalogs, deals, packages };
  
  let displayCategory = activeTab;
  let currentData = dataSets[activeTab] || [];
  
  // If we are viewing a specific catalog, show its deals instead
  if (activeTab === 'dealCatalogs' && selectedCatalogId) {
    displayCategory = 'deals';
    currentData = deals.filter(d => d.catalogId === selectedCatalogId);
  } else if (activeTab === 'freezerDeals' && selectedCatalogId) {
    displayCategory = 'freezerProducts';
    currentData = freezerDeals.find(f => f.id === selectedCatalogId)?.products || [];
  }

  const currentTab = TABS.find((t) => t.key === activeTab);

  function handleTabChange(key) {
    setActiveTab(key);
    setSelectedCatalogId(null);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  /* ---- Edit ---- */
  function openEdit(product) {
    setEditModal({ mode: 'edit', product });
  }

  function openAdd() {
    setEditModal({ mode: 'add', product: null });
  }

  function handleSave(form) {
    // If adding a deal inside a catalog, ensure catalogId is set to current catalog
    if (displayCategory === 'deals' && selectedCatalogId && !form.catalogId) {
      form.catalogId = selectedCatalogId;
    }

    if (editModal.mode === 'edit') {
      if (displayCategory === 'freezerProducts') {
        updateFreezerProduct(selectedCatalogId, editModal.product.id, form);
      } else {
        updateProduct(displayCategory, editModal.product.id, form);
      }
      showToast(' המוצר עודכן בהצלחה');
    } else {
      if (displayCategory === 'freezerProducts') {
        addFreezerProduct(selectedCatalogId, form);
      } else {
        addProduct(displayCategory, form);
      }
      showToast(' מוצר חדש נוסף');
    }
    setEditModal(null);
  }

  /* ---- Delete ---- */
  function openDelete(product) {
    setDeleteModal(product);
  }

  function handleDelete() {
    if (displayCategory === 'freezerProducts') {
      deleteFreezerProduct(selectedCatalogId, deleteModal.id);
    } else {
      deleteProduct(displayCategory, deleteModal.id);
    }
    showToast('️ המוצר נמחק');
    setDeleteModal(null);
  }

  function handleMoveUp(product) {
    if (displayCategory === 'freezerProducts') moveFreezerProduct(selectedCatalogId, product.id, 'up');
    else moveProduct(displayCategory, product.id, 'up', selectedCatalogId);
  }

  function handleMoveDown(product) {
    if (displayCategory === 'freezerProducts') moveFreezerProduct(selectedCatalogId, product.id, 'down');
    else moveProduct(displayCategory, product.id, 'down', selectedCatalogId);
  }

  function handleMoveTop(product) {
    if (displayCategory === 'freezerProducts') moveFreezerProduct(selectedCatalogId, product.id, 'top');
    else moveProduct(displayCategory, product.id, 'top', selectedCatalogId);
  }

  function handleMoveBottom(product) {
    if (displayCategory === 'freezerProducts') moveFreezerProduct(selectedCatalogId, product.id, 'bottom');
    else moveProduct(displayCategory, product.id, 'bottom', selectedCatalogId);
  }

  /* ---- Not logged in ---- */
  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="admin-dashboard">
      {/* Top bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-title">
          <span></span>
          לוח ניהול — הפינה המתוקה
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-btn-ghost" onClick={resetToDefaults}>
             איפוס
          </button>
          <button className="admin-btn-ghost admin-btn-logout" onClick={() => setLoggedIn(false)}>
             יציאה
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="admin-content">
        <div className="admin-stats">
          <div className="admin-stat-card">
            <span className="stat-emoji"></span>
            <div className="stat-value">{flavors.length}</div>
            <div className="stat-label">טעמים</div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-emoji">️</span>
            <div className="stat-value">{dealCatalogs.length}</div>
            <div className="stat-label">קטלוגים</div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-emoji"></span>
            <div className="stat-value">{deals.length}</div>
            <div className="stat-label">מבצעים</div>
          </div>
          <div className="admin-stat-card">
            <span className="stat-emoji"></span>
            <div className="stat-value">{packages.length}</div>
            <div className="stat-label">מארזים</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-actions-bar">
        {(activeTab === 'dealCatalogs' || activeTab === 'freezerDeals') && selectedCatalogId ? (
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button className="admin-btn-ghost" onClick={() => setSelectedCatalogId(null)}>
              ← חזרה לכל {activeTab === 'dealCatalogs' ? 'הקטלוגים' : 'המבצעים'}
            </button>
            <h2 className="admin-section-title">
              {activeTab === 'dealCatalogs' 
                ? `${dealCatalogs.find(c => c.id === selectedCatalogId)?.title} — מוצרים`
                : `מקפיא מס' ${selectedCatalogId} — גלידות בפנים`
              }
            </h2>
          </div>
        ) : (
          <h2 className="admin-section-title">{currentTab?.title}</h2>
        )}
        <button className="btn btn-pink admin-btn-add" onClick={openAdd}>
           הוספת {((activeTab === 'dealCatalogs' || activeTab === 'freezerDeals') && !selectedCatalogId) ? (activeTab === 'dealCatalogs' ? 'קטלוג' : 'מקפיא מבצע') : 'מוצר'}
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">

        <div className="admin-product-grid">
          {currentData.map((product, index) => (
            <AdminCard
              key={product.id}
              product={product}
              category={displayCategory}
              index={index}
              isFirst={index === 0}
              isLast={index === currentData.length - 1}
              onEdit={openEdit}
              onDelete={openDelete}
              onEnterCatalog={(catalog) => setSelectedCatalogId(catalog.id)}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onMoveTop={handleMoveTop}
              onMoveBottom={handleMoveBottom}
            />
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editModal && (
        <ProductModal
          mode={editModal.mode}
          category={displayCategory}
          product={editModal.product}
          dealCatalogs={dealCatalogs}
          selectedCatalogId={selectedCatalogId}
          onSave={handleSave}
          onClose={() => setEditModal(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <DeleteModal
          product={deleteModal}
          category={displayCategory}
          onConfirm={handleDelete}
          onClose={() => setDeleteModal(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} />}
    </div>
  );
}
