const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  console.log('Protect middleware - Headers:', req.headers.authorization);
  
  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded, user ID:', decoded.id);

    // Get user from token
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    console.log('User found:', req.user?.email, 'Role:', req.user?.role, 'Active:', req.user?.isActive);

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!req.user.isActive) {
      return res.status(401).json({ message: 'User account is deactivated' });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

// Admin only middleware
const admin = (req, res, next) => {
  console.log('Admin middleware - User:', req.user?.email, 'Role:', req.user?.role);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.log('Access denied - User role is not admin');
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// Admin or moderator middleware
const adminOrModerator = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'moderator')) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin or moderator only.' });
  }
};

// Optional auth - sets user if token exists, but doesn't require it
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.auithorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      // Token invalid, but continue without user
      req.user = null;
    }
  }

  next();
};

module.exports = { protect, admin, adminOrModerator, optionalAuth };
