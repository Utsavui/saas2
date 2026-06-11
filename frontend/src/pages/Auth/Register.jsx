import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, ShieldAlert, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const user = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.isAdmin
      );
      
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMsg(error.message || 'Error occurred during registration.');
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
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(40px)',
        borderRadius: '50%',
        bottom: '10%',
        right: '10%'
      }}></div>

      <div className="card animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem 2rem' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create Account</h2>
          <p>Get started with your free 14-day trial</p>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem 1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <User size={14} /> Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Aditi Patel"
              required
            />
          </div>

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
              placeholder="aditi@company.com"
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
              placeholder="•••••••• (Min 6 chars)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Lock size={14} /> Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Test Admin Switch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--background)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--border-radius-sm)',
            marginBottom: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <input
              id="isAdmin"
              name="isAdmin"
              type="checkbox"
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            <label htmlFor="isAdmin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', margin: 0 }}>
              <ShieldAlert size={16} color="var(--primary)" />
              <span>Register as Admin (For Testing Dashboard)</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary glow-effect" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating Account...' : <>Sign Up <UserPlus size={16} /></>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <p>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
