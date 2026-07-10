import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import AdminOrdersTab from './AdminOrdersTab.jsx';
import './Admin.css';

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  margin: '0.4rem 0',
  border: '2px solid #e5d5c8',
  borderRadius: 12,
  fontFamily: 'inherit',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

/* ====================================================================
   LOGIN SCREEN — התחברות מנהל דרך Supabase (אימייל + סיסמה)
   ==================================================================== */
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase) { setError('החיבור לשרת אינו זמין כרגע'); return; }
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setError('אימייל או סיסמה שגויים');
  }

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <span className="login-emoji">📋</span>
        <h1>לוח הזמנות</h1>
        <p>התחברות מנהל</p>

        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={inputStyle}
        />

        <button type="submit" className="admin-login-btn" disabled={busy}>
          {busy ? 'מתחבר…' : 'כניסה'}
        </button>

        {error && <p className="login-error-msg">{error}</p>}
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
  const [session, setSession] = useState(undefined); // undefined = טוען, null = לא מחובר
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  useEffect(() => {
    if (!supabase) { setSession(null); return; }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="admin-login-wrapper">
        <p style={{ color: '#fff', fontSize: '1.1rem' }}>טוען…</p>
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  return (
    <div className="admin-dashboard">
      <header className="admin-topbar">
        <div className="admin-topbar-title">
          <span>📋</span>
          לוח הזמנות — הפינה המתוקה
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-btn-ghost admin-btn-logout" onClick={() => supabase.auth.signOut()}>
            🚪 יציאה
          </button>
        </div>
      </header>

      <div className="admin-content" style={{ paddingTop: '2rem' }}>
        <AdminOrdersTab showToast={showToast} />
      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}
