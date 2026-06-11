const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_123456789_development_only', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user is already registered with this email address'
      });
    }

    // Determine target role (default to 'user')
    const finalRole = role === 'admin' ? 'admin' : 'user';

    const user = await User.create({
      name,
      email,
      password,
      role: finalRole,
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  const { email, password, loginAsAdmin } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Enforce role-based authentication check
    if (loginAsAdmin) {
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied: This account does not have Admin privileges.'
        });
      }
    } else {
      if (user.role !== 'user') {
        return res.status(403).json({
          success: false,
          message: "Access denied: This account is registered as an Admin. Please check 'Login as Admin' to sign in."
        });
      }
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
