import { useState, useRef, useEffect } from 'react';
import AdminOrdersTab from './AdminOrdersTab.jsx';
import './Admin.css';

const ORDERS_PIN = '1234';

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
    if (code === ORDERS_PIN) {
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
        <span className="login-emoji">📋</span>
        <h1>לוח הזמנות</h1>
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
   TOAST
   ==================================================================== */
function Toast({ message }) {
  return <div className="admin-toast">{message}</div>;
}

/* ====================================================================
   ORDERS PANEL
   ==================================================================== */
export default function OrdersPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
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
          <span>📋</span>
          לוח הזמנות — הפינה המתוקה
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-btn-ghost admin-btn-logout" onClick={() => setLoggedIn(false)}>
            🚪 יציאה
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content" style={{ paddingTop: '2rem' }}>
        <AdminOrdersTab showToast={showToast} />
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} />}
    </div>
  );
}
