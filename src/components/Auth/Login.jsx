import { useState } from 'react';
import { C, F, R } from '../Shared/designTokens';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('development');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mode }),
      });
      const data = await res.json();
      if (data.status && data.data) {
        localStorage.setItem('crm_access_token', data.data.accessToken);
        localStorage.setItem('crm_refresh_token', data.data.refreshToken);
        localStorage.setItem('crm_mode', mode);
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, fontFamily: F }}>
      <form onSubmit={handleSubmit} style={{ width: 380, background: C.w, borderRadius: R.lg, border: `1px solid ${C.g200}`, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#323338"/><path d="M7 8h10M7 12h7M7 16h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <h2 style={{ margin: '12px 0 4px', fontSize: 20, fontWeight: 800, color: C.g700 }}>Account Editor</h2>
          <div style={{ fontSize: 12, color: C.g400, textTransform: 'uppercase', letterSpacing: 1 }}>CRM</div>
        </div>
        {error && <div style={{ padding: '8px 12px', borderRadius: R.md, background: C.errL, color: C.err, fontSize: 12, marginBottom: 16 }}>{error}</div>}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.g500, marginBottom: 5 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.g200}`, borderRadius: R.md, fontSize: 13, fontFamily: F, outline: 'none', boxSizing: 'border-box' }} placeholder="admin@accounteditor.com" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.g500, marginBottom: 5 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.g200}`, borderRadius: R.md, fontSize: 13, fontFamily: F, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.g500, marginBottom: 8 }}>Environment</label>
          <div style={{ display: 'flex', gap: 12 }}>
            {['development', 'production'].map(m => (
              <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13 }}>
                <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} />
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', borderRadius: R.md, border: 'none', background: C.pri, color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: F, cursor: loading ? 'wait' : 'pointer' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
