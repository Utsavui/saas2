import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const user = await login(formData.email, formData.password);
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 9rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow effect background */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(40px)',
        borderRadius: '50%',
        top: '20%',
        left: '20%'
      }}></div>

      <div className="card animate-fade-in-up" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem 2rem' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p>Login to manage your SaaSify account</p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem 1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={14} /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Lock size={14} /> Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary glow-effect" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Logging in...' : <>Log In <LogIn size={16} /></>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <p>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create an account</Link>
          </p>
          <div style={{
            marginTop: '1.5rem',
            padding: '0.75rem',
            background: 'var(--background)',
            borderRadius: '6px',
            border: '1px solid var(--surface-border)',
            fontSize: '0.8rem',
            textAlign: 'left'
          }}>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>💡 Quick Test Info:</p>
            <p>You can create a test admin account by checking the "Register as Admin" switch during signup.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
