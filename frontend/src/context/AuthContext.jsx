import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('saas_token'));
  const [loading, setLoading] = useState(true);

  // Get current user profile on load or token change
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.data);
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('saas_token', data.data.token);
      setToken(data.data.token);
      setUser({
        _id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        isAdmin: data.data.isAdmin,
      });
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  // Register handler
  const register = async (name, email, password, isAdmin = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, isAdmin }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('saas_token', data.data.token);
      setToken(data.data.token);
      setUser({
        _id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        isAdmin: data.data.isAdmin,
      });
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('saas_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    apiBaseUrl: API_BASE_URL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
