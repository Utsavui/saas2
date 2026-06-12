import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, User, LayoutDashboard, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <Zap size={24} fill="currentColor" />
          <span>saasflowzen</span>
        </Link>

        {/* Desktop Menu */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/features"
              className={`nav-link ${isActive('/features') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          
          {/* Mobile auth links */}
          
        </ul>

        {/* Desktop actions & Mobile controls */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {user.isAdmin && (
                <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  <LayoutDashboard size={16} />
                  <span>Admin</span>
                </Link>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-glow)', 
                    color: 'var(--primary)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: '600'
                  }}
                  title={user.name}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <button onClick={handleLogout} className="theme-toggle-btn" title="Logout" style={{ border: 'none' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="menu-btn"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
