const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('\n⚠️  WARNING: MONGODB_URI environment variable is missing in .env file!');
  console.warn('Backend will attempt to run, but database operations will fail.');
  console.warn('Please check the README.md or .env file for setup instructions.\n');
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully.'))
    .catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.warn('Please verify your connection string in .env and check your internet connection.\n');
    });
}

// Basic Landing / API status route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Premium SaaS Website API',
    status: 'online',
    version: '1.0.0',
    documentation: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me (Protected)',
      },
      contact: {
        submit: 'POST /api/contact',
      },
      admin: {
        users: 'GET /api/admin/users (Admin-only)',
        deleteUser: 'DELETE /api/admin/users/:id (Admin-only)',
        contacts: 'GET /api/admin/contacts (Admin-only)',
        updateContact: 'PUT /api/admin/contacts/:id/read (Admin-only)',
        deleteContact: 'DELETE /api/admin/contacts/:id (Admin-only)',
      }
    }
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}`);
});
