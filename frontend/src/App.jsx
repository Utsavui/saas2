import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected admin route wrapper
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Verifying access rights...</p>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppContent = () => {
  const [theme, setTheme] = useState(localStorage.getItem('saasify_theme') || 'light');

  useEffect(() => {
    // Update theme attribute on root HTML element
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('saasify_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
