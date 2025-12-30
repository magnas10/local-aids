/**
 * LOGIN ATTEMPTS MIDDLEWARE - COLLEGE PROJECT
 * Security Feature: Prevents brute force attacks
 * 
 * Functionality:
 * - Tracks failed login attempts per email
 * - Locks account after 5 failed attempts
 * - Automatically unlocks after 15 minutes
 */

// In-memory storage for login attempts (for academic purposes)
// Production Note: Use Redis or database for distributed systems
const loginAttempts = new Map();

// Configuration constants
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Track Failed Login Attempt
 * Increments failed attempt counter for given email
 */
const recordFailedAttempt = (email) => {
  const normalizedEmail = email.toLowerCase();
  
  if (!loginAttempts.has(normalizedEmail)) {
    // First failed attempt - initialize tracking
    loginAttempts.set(normalizedEmail, {
      attempts: 1,
      lockedUntil: null,
      lastAttempt: new Date()
    });
  } else {
    // Increment existing counter
    const record = loginAttempts.get(normalizedEmail);
    record.attempts += 1;
    record.lastAttempt = new Date();
    
    // Lock account if max attempts reached
    if (record.attempts >= MAX_ATTEMPTS) {
      record.lockedUntil = new Date(Date.now() + LOCK_TIME);
      console.log(`Account locked for ${email} until ${record.lockedUntil}`);
    }
  }
};

/**
 * Reset Login Attempts
 * Clears failed attempt counter after successful login
 */
const resetAttempts = (email) => {
  const normalizedEmail = email.toLowerCase();
  loginAttempts.delete(normalizedEmail);
  console.log(`Login attempts reset for ${email}`);
};

/**
 * Check if Account is Locked
 * Returns true if account is currently locked
 */
const isAccountLocked = (email) => {
  const normalizedEmail = email.toLowerCase();
  const record = loginAttempts.get(normalizedEmail);
  
  if (!record) {
    return false; // No failed attempts
  }
  
  // Check if lock time has expired
  if (record.lockedUntil && new Date() < record.lockedUntil) {
    return true; // Account is still locked
  }
  
  // Lock time expired - reset attempts
  if (record.lockedUntil && new Date() >= record.lockedUntil) {
    loginAttempts.delete(normalizedEmail);
    console.log(`Lock expired for ${email}, attempts reset`);
    return false;
  }
  
  return false;
};

/**
 * Get Remaining Attempts
 * Returns number of attempts left before lockout
 */
const getRemainingAttempts = (email) => {
  const normalizedEmail = email.toLowerCase();
  const record = loginAttempts.get(normalizedEmail);
  
  if (!record) {
    return MAX_ATTEMPTS;
  }
  
  return Math.max(0, MAX_ATTEMPTS - record.attempts);
};

/**
 * Get Lock Time Remaining
 * Returns minutes until account unlocks
 */
const getLockTimeRemaining = (email) => {
  const normalizedEmail = email.toLowerCase();
  const record = loginAttempts.get(normalizedEmail);
  
  if (!record || !record.lockedUntil) {
    return 0;
  }
  
  const remaining = record.lockedUntil - new Date();
  return Math.ceil(remaining / (60 * 1000)); // Convert to minutes
};

/**
 * Middleware: Check Login Attempts Before Processing
 * Blocks login if account is locked
 */
const checkLoginAttempts = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }
  
  // Check if account is locked
  if (isAccountLocked(email)) {
    const minutesRemaining = getLockTimeRemaining(email);
    
    return res.status(429).json({
      success: false,
      message: `Account locked due to too many failed login attempts. Please try again in ${minutesRemaining} minutes.`,
      lockedUntil: minutesRemaining
    });
  }
  
  next();
};

/**
 * Cleanup Old Records (Optional Enhancement)
 * Removes records older than 24 hours to prevent memory leak
 */
const cleanupOldRecords = () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  for (const [email, record] of loginAttempts.entries()) {
    if (record.lastAttempt < twentyFourHoursAgo && !record.lockedUntil) {
      loginAttempts.delete(email);
    }
  }
};

// Run cleanup every hour
setInterval(cleanupOldRecords, 60 * 60 * 1000);

module.exports = {
  recordFailedAttempt,
  resetAttempts,
  isAccountLocked,
  getRemainingAttempts,
  getLockTimeRemaining,
  checkLoginAttempts,
  MAX_ATTEMPTS
};
