const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');

// Import college project validation and security middleware
const { registrationValidation, loginValidation, sanitizeInput } = require('../middleware/validation');
const { checkLoginAttempts, recordFailedAttempt, resetAttempts, getRemainingAttempts } = require('../middleware/loginAttempts');
const { createSession, destroySession, getTimeUntilExpiry, destroyAllUserSessions } = require('../middleware/sessionManager');

/**
 * GENERATE JWT TOKEN
 * Purpose: Creates authentication token for user session
 * Expiry: 15 minutes to match session timeout
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15m' // 15-minute token to match session timeout
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with validation
 * @access  Public
 * 
 * COLLEGE PROJECT REQUIREMENTS:
 * - Password: Exactly 8 numeric digits
 * - Phone: Exactly 10 numeric digits
 * - Password hashing with bcrypt (security best practice)
 * - Input sanitization to prevent XSS/injection
 */
router.post('/register', registrationValidation, async (req, res) => {
  try {
    // Sanitize all inputs to prevent XSS attacks
    const { name, email, password, confirmPassword, phone, role } = req.body;
    
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      phone: sanitizeInput(phone),
      role: role || 'user'
    };

    console.log('Registration attempt:', { email: sanitizedData.email });

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { email: sanitizedData.email } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User with this email already exists',
        field: 'email'
      });
    }

    // Check if mobile number already exists
    const existingPhone = await User.findOne({ 
      where: { phone: sanitizedData.phone } 
    });
    
    if (existingPhone) {
      return res.status(400).json({ 
        success: false,
        message: 'This mobile number is already registered',
        field: 'phone'
      });
    }

    // Create new user
    // Note: Password hashing happens automatically in User model hooks
    const user = await User.create({
      name: sanitizedData.name,
      email: sanitizedData.email,
      password: password, // Will be hashed by model hook
      phone: sanitizedData.phone,
      role: sanitizedData.role
    });

    // Generate JWT token
    const token = generateToken(user.id);
    
    // Create session for the user
    createSession(user.id, token);

    // Return user data without password (security best practice)
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt
    };

    console.log('User registered successfully:', user.id);

    res.status(201).json({
      success: true,
      message: 'Registration successful! You are now logged in.',
      token,
      user: userResponse,
      sessionExpiry: 15 // minutes
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration. Please try again.' 
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 * 
 * COLLEGE PROJECT SECURITY FEATURES:
 * - Maximum 5 failed login attempts
 * - 15-minute account lockout after max attempts
 * - Session creation with auto-logout after 15 minutes inactivity
 * - Password verification using bcrypt
 */
router.post('/login', 
  checkLoginAttempts, // Check if account is locked before proceeding
  loginValidation,    // Validate input format
  async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email).toLowerCase();

      console.log('Login attempt for:', sanitizedEmail);

      // Find user by email
      const user = await User.findOne({ 
        where: { email: sanitizedEmail } 
      });

      // Check if user exists
      if (!user) {
        // Record failed attempt
        recordFailedAttempt(sanitizedEmail);
        const remaining = getRemainingAttempts(sanitizedEmail);
        
        return res.status(401).json({ 
          success: false,
          message: 'Invalid email or password',
          attemptsRemaining: remaining
        });
      }

      // Check if user account is active
      if (!user.isActive) {
        return res.status(401).json({ 
          success: false,
          message: 'Your account has been deactivated. Please contact support.'
        });
      }

      // Verify password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Record failed attempt
        recordFailedAttempt(sanitizedEmail);
        const remaining = getRemainingAttempts(sanitizedEmail);
        
        console.log(`Failed login attempt for ${sanitizedEmail}, ${remaining} attempts remaining`);
        
        return res.status(401).json({ 
          success: false,
          message: 'Invalid email or password',
          attemptsRemaining: remaining,
          warning: remaining <= 2 ? `Warning: Only ${remaining} attempts remaining before account lock` : undefined
        });
      }

      // ✅ LOGIN SUCCESSFUL
      
      // Reset failed login attempts
      resetAttempts(sanitizedEmail);
      
      // Generate new JWT token
      const token = generateToken(user.id);
      
      // Create new session (15-minute timeout)
      createSession(user.id, token);

      // Prepare user response (exclude password)
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      };

      console.log(`Login successful for user ${user.id}`);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: userResponse,
        sessionExpiry: 15, // minutes
        expiresAt: new Date(Date.now() + 15 * 60 * 1000)
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error during login. Please try again.' 
      });
    }
  }
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and destroy session
 * @access  Private (requires authentication)
 */
router.post('/logout', protect, async (req, res) => {
  try {
    // Extract token from header
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (token) {
      // Destroy the session
      destroySession(token);
      console.log(`User ${req.user.id} logged out`);
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error during logout' 
    });
  }
});

/**
 * @route   POST /api/auth/logout-all
 * @desc    Logout from all devices
 * @access  Private (requires authentication)
 */
router.post('/logout-all', protect, async (req, res) => {
  try {
    // Destroy all sessions for this user
    const destroyed = destroyAllUserSessions(req.user.id);
    
    console.log(`User ${req.user.id} logged out from all devices`);
    
    res.json({
      success: true,
      message: `Logged out from ${destroyed} device(s)`
    });
    
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error during logout' 
    });
  }
});

/**
 * @route   GET /api/auth/session-info
 * @desc    Get current session information
 * @access  Private
 */
router.get('/session-info', protect, async (req, res) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    const timeRemaining = getTimeUntilExpiry(token);
    
    res.json({
      success: true,
      session: {
        userId: req.user.id,
        email: req.user.email,
        role: req.user.role,
        expiresIn: timeRemaining,
        warning: timeRemaining < 5 ? 'Session expiring soon' : null
      }
    });
    
  } catch (error) {
    console.error('Session info error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching session info' 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/password
// @desc    Update password
// @access  Private
router.put('/password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findByPk(req.user.id);

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password (hooks will hash it)
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', protect, (req, res) => {
  // JWT is stateless, so logout is handled client-side by removing the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
