const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (role && role !== 'user' && role !== 'admin') {
    errors.push({ field: 'role', message: 'Invalid user role selected' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!email || typeof email !== 'string' || !validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    errors.push({ field: 'message', message: 'Message is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateContact,
};
