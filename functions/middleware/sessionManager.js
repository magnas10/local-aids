/**
 * SESSION MANAGEMENT MIDDLEWARE - COLLEGE PROJECT
 * Handles user sessions with automatic timeout after inactivity
 * 
 * Features:
 * - 15-minute inactivity timeout
 * - Automatic session cleanup
 * - Activity tracking
 */

// In-memory session storage (academic purposes)
// Production Note: Use Redis or express-session with database store
const activeSessions = new Map();

// Configuration
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Create New Session
 * Called after successful login
 */
const createSession = (userId, token) => {
  const sessionData = {
    userId,
    token,
    createdAt: new Date(),
    lastActivity: new Date(),
    expiresAt: new Date(Date.now() + SESSION_TIMEOUT)
  };
  
  activeSessions.set(token, sessionData);
  console.log(`Session created for user ${userId}`);
  
  return sessionData;
};

/**
 * Update Session Activity
 * Extends session timeout on user activity
 */
const updateActivity = (token) => {
  const session = activeSessions.get(token);
  
  if (session) {
    session.lastActivity = new Date();
    session.expiresAt = new Date(Date.now() + SESSION_TIMEOUT);
    activeSessions.set(token, session);
  }
};

/**
 * Check if Session is Valid
 * Returns true if session exists and hasn't expired
 */
const isSessionValid = (token) => {
  const session = activeSessions.get(token);
  
  if (!session) {
    return false;
  }
  
  // Check if session has expired
  if (new Date() > session.expiresAt) {
    activeSessions.delete(token);
    console.log(`Session expired for user ${session.userId}`);
    return false;
  }
  
  return true;
};

/**
 * Destroy Session
 * Called on logout or session expiry
 */
const destroySession = (token) => {
  const session = activeSessions.get(token);
  
  if (session) {
    console.log(`Session destroyed for user ${session.userId}`);
    activeSessions.delete(token);
    return true;
  }
  
  return false;
};

/**
 * Get Session Info
 * Returns session data if valid
 */
const getSession = (token) => {
  if (!isSessionValid(token)) {
    return null;
  }
  
  return activeSessions.get(token);
};

/**
 * Get Time Until Expiry
 * Returns minutes until session expires
 */
const getTimeUntilExpiry = (token) => {
  const session = activeSessions.get(token);
  
  if (!session) {
    return 0;
  }
  
  const remaining = session.expiresAt - new Date();
  return Math.ceil(remaining / (60 * 1000)); // Convert to minutes
};

/**
 * Middleware: Validate Session and Update Activity
 * Use this after JWT validation to track sessions
 */
const validateSession = (req, res, next) => {
  // Extract token from Authorization header
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No session token provided'
    });
  }
  
  // Check if session is valid
  if (!isSessionValid(token)) {
    return res.status(401).json({
      success: false,
      message: 'Session has expired due to inactivity. Please login again.',
      expired: true
    });
  }
  
  // Update activity timestamp
  updateActivity(token);
  
  // Attach session info to request
  req.session = getSession(token);
  
  next();
};

/**
 * Cleanup Expired Sessions
 * Removes expired sessions from memory
 */
const cleanupExpiredSessions = () => {
  const now = new Date();
  let cleaned = 0;
  
  for (const [token, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(token);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    console.log(`Cleaned up ${cleaned} expired sessions`);
  }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredSessions, 5 * 60 * 1000);

/**
 * Get Active Sessions Count
 * For monitoring/debugging purposes
 */
const getActiveSessionsCount = () => {
  return activeSessions.size;
};

/**
 * Get User Active Sessions
 * Returns all active sessions for a user
 */
const getUserSessions = (userId) => {
  const sessions = [];
  
  for (const [token, session] of activeSessions.entries()) {
    if (session.userId === userId) {
      sessions.push({
        token,
        createdAt: session.createdAt,
        lastActivity: session.lastActivity,
        expiresAt: session.expiresAt
      });
    }
  }
  
  return sessions;
};

/**
 * Destroy All User Sessions
 * Useful for "logout from all devices" feature
 */
const destroyAllUserSessions = (userId) => {
  let destroyed = 0;
  
  for (const [token, session] of activeSessions.entries()) {
    if (session.userId === userId) {
      activeSessions.delete(token);
      destroyed++;
    }
  }
  
  console.log(`Destroyed ${destroyed} sessions for user ${userId}`);
  return destroyed;
};

module.exports = {
  createSession,
  updateActivity,
  isSessionValid,
  destroySession,
  getSession,
  getTimeUntilExpiry,
  validateSession,
  cleanupExpiredSessions,
  getActiveSessionsCount,
  getUserSessions,
  destroyAllUserSessions,
  SESSION_TIMEOUT
};
