# AUTHENTICATION SYSTEM - COLLEGE PROJECT DOCUMENTATION
## ICT / Software Engineering Coursework

**Student Name:** Sangam Devkota  
**Project:** LocalAid - Community Support Platform  
**Technology Stack:** Node.js, Express.js, PostgreSQL, React

---

## PROJECT OVERVIEW

This authentication system implements industry-standard security practices suitable for academic assessment in ICT and Software Engineering programs. The system demonstrates understanding of:

- User input validation
- Password security and hashing
- Session management
- Brute force attack prevention
- Role-based access control

---

## SYSTEM REQUIREMENTS IMPLEMENTATION

### 1. PASSWORD VALIDATION ✅

**Requirement:** Password must be EXACTLY 8 digits (numeric only)

**Implementation:**
- File: `server/middleware/validation.js`
- Validation rules:
  - Length: Exactly 8 characters
  - Type: Numeric only (0-9)
  - No letters, spaces, or special characters

```javascript
// Example valid passwords:
12345678 ✅
98765432 ✅

// Invalid passwords:
1234567  ❌ (too short)
123456789 ❌ (too long)
abc12345 ❌ (contains letters)
```

**Code Reference:**
```javascript
passwordValidation = () => {
  return body('password')
    .isLength({ min: 8, max: 8 })
    .isNumeric()
    .matches(/^[0-9]{8}$/);
};
```

---

### 2. MOBILE NUMBER VALIDATION ✅

**Requirement:** Mobile number must be EXACTLY 10 digits

**Implementation:**
- File: `server/middleware/validation.js`
- Validation rules:
  - Length: Exactly 10 digits
  - Type: Numeric only
  - No spaces, symbols, or country codes

```javascript
// Example valid mobile numbers:
9876543210 ✅
1234567890 ✅

// Invalid mobile numbers:
987654321  ❌ (too short)
+9876543210 ❌ (contains symbol)
98 765 432 10 ❌ (contains spaces)
```

---

### 3. REGISTRATION PROCESS ✅

**Features Implemented:**

1. **Password Confirmation**
   - User must enter password twice
   - System validates both match
   - Error message if mismatch

2. **Email Validation**
   - Proper email format required
   - Checks for existing email
   - Prevents duplicate accounts

3. **Input Sanitization**
   - Removes dangerous characters
   - Prevents XSS attacks
   - Limits input length

4. **User-Friendly Error Messages**
   ```json
   {
     "success": false,
     "message": "Validation failed",
     "errors": [
       {
         "field": "password",
         "message": "Password must be exactly 8 digits"
       }
     ]
   }
   ```

**File:** `server/routes/auth.js` - POST `/api/auth/register`

---

### 4. LOGIN SYSTEM ✅

**Features Implemented:**

1. **Credential Validation**
   - Verifies email exists
   - Compares password using bcrypt
   - Checks account status

2. **Failed Login Attempts Tracking**
   - Maximum: 5 attempts
   - Counter increments on each failure
   - Shows remaining attempts

3. **Account Lockout**
   - Locks after 5 failed attempts
   - Duration: 15 minutes
   - Auto-unlock after timeout

4. **Security Logging**
   - Logs all login attempts
   - Tracks success/failure
   - Records timestamps

**File:** `server/middleware/loginAttempts.js`

**Login Flow Diagram:**
```
User Enter Credentials
     ↓
Check if Account Locked → YES → Return Error (429)
     ↓ NO
Validate Input Format → FAIL → Return Error (400)
     ↓ PASS
Find User in Database → NOT FOUND → Record Fail + Return Error
     ↓ FOUND
Compare Password → INCORRECT → Record Fail + Return Error
     ↓ CORRECT
Reset Fail Counter
     ↓
Generate JWT Token
     ↓
Create Session (15 min)
     ↓
Return Success + Token
```

---

### 5. PASSWORD SECURITY ✅

**Implementation:**

1. **BCrypt Hashing**
   - Algorithm: bcrypt
   - Salt rounds: 10
   - One-way encryption

2. **No Plain-Text Storage**
   - Passwords always hashed before saving
   - Hash stored in database
   - Original password never stored

3. **Password Comparison**
   - Uses bcrypt.compare()
   - Secure timing to prevent timing attacks

**Code Example:**
```javascript
// During Registration (automatic via Sequelize hooks)
beforeSave: async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
}

// During Login
const isPasswordValid = await bcrypt.compare(
  inputPassword, 
  storedHashedPassword
);
```

**File:** `server/models/User.js`

---

### 6. SESSION MANAGEMENT ✅

**Features:**

1. **Session Creation**
   - Created on successful login
   - Stores: userId, token, timestamps
   - Timeout: 15 minutes

2. **Inactivity Timeout**
   - Auto-logout after 15 minutes of inactivity
   - Timer resets on each activity
   - Alerts user before expiry

3. **Activity Tracking**
   - Updates lastActivity on each request
   - Extends session timeout
   - Logs user actions

4. **Session Cleanup**
   - Removes expired sessions every 5 minutes
   - Prevents memory leaks
   - Maintains system performance

**File:** `server/middleware/sessionManager.js`

**Session Lifecycle:**
```
Login → Create Session (15 min timer)
  ↓
User Activity → Reset Timer (extend 15 min)
  ↓
No Activity for 15 min → Session Expires
  ↓
Next Request → 401 Error → Redirect to Login
```

---

### 7. ROLE-BASED ACCESS CONTROL ✅

**Roles Implemented:**

1. **User** (default)
   - Request help
   - View events
   - Upload images (pending approval)

2. **Volunteer**
   - All user permissions
   - Accept help requests
   - View volunteer dashboard

3. **Admin**
   - All permissions
   - Manage users
   - Approve/reject content
   - View admin panel

**Middleware Implementation:**

```javascript
// Protect route - requires authentication
router.get('/protected', protect, (req, res) => {
  // Only authenticated users
});

// Admin only
router.get('/admin', protect, admin, (req, res) => {
  // Only admins
});

// Volunteer or Admin
router.get('/volunteer-area', protect, volunteerOrAdmin, (req, res) => {
  // Volunteers and admins
});
```

**File:** `server/middleware/auth.js`

---

## API ENDPOINTS REFERENCE

### Registration
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345678",
  "confirmPassword": "12345678",
  "phone": "9876543210",
  "role": "user"
}

Success Response (201):
{
  "success": true,
  "message": "Registration successful! You are now logged in.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user"
  },
  "sessionExpiry": 15
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "12345678"
}

Success Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... },
  "sessionExpiry": 15,
  "expiresAt": "2025-12-30T10:30:00.000Z"
}

Failed Response (401):
{
  "success": false,
  "message": "Invalid email or password",
  "attemptsRemaining": 4,
  "warning": "Warning: Only 2 attempts remaining before account lock"
}

Locked Response (429):
{
  "success": false,
  "message": "Account locked due to too many failed login attempts. Please try again in 14 minutes.",
  "lockedUntil": 14
}
```

### Logout
```
POST /api/auth/logout
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Session Info
```
GET /api/auth/session-info
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "session": {
    "userId": 1,
    "email": "john@example.com",
    "role": "user",
    "expiresIn": 12,
    "warning": null
  }
}
```

---

## SECURITY BEST PRACTICES IMPLEMENTED

### 1. Input Validation
- ✅ Server-side validation (never trust client)
- ✅ Regex pattern matching
- ✅ Length restrictions
- ✅ Type checking

### 2. Password Security
- ✅ Bcrypt hashing (industry standard)
- ✅ Salt rounds: 10
- ✅ No plain-text storage
- ✅ Secure comparison

### 3. Attack Prevention
- ✅ Brute force protection (5 attempts + lockout)
- ✅ XSS prevention (input sanitization)
- ✅ SQL injection prevention (Sequelize ORM)
- ✅ Rate limiting (login attempts)

### 4. Session Security
- ✅ JWT tokens with expiry
- ✅ Session timeout (15 minutes)
- ✅ Activity tracking
- ✅ Secure token storage

### 5. Error Handling
- ✅ User-friendly messages
- ✅ No sensitive info in errors
- ✅ Detailed server logs
- ✅ Proper HTTP status codes

---

## FILE STRUCTURE

```
server/
├── middleware/
│   ├── validation.js          # Input validation rules
│   ├── loginAttempts.js       # Failed login tracking & lockout
│   ├── sessionManager.js      # Session lifecycle management
│   └── auth.js               # JWT verification & role checking
├── models/
│   └── User.js               # User model with password hashing
├── routes/
│   └── auth.js               # Registration, login, logout endpoints
└── config/
    └── database.js           # Database connection
```

---

## TESTING GUIDE

### Test Case 1: Valid Registration
**Input:**
- Name: "Test User"
- Email: "test@example.com"
- Password: "12345678"
- Confirm Password: "12345678"
- Phone: "9876543210"

**Expected:** ✅ Success, user created, token returned

### Test Case 2: Invalid Password Format
**Input:**
- Password: "abc12345" (contains letters)

**Expected:** ❌ Error: "Password must contain only numbers (0-9)"

### Test Case 3: Password Mismatch
**Input:**
- Password: "12345678"
- Confirm Password: "87654321"

**Expected:** ❌ Error: "Passwords do not match"

### Test Case 4: Invalid Phone Number
**Input:**
- Phone: "987654321" (9 digits)

**Expected:** ❌ Error: "Mobile number must be exactly 10 digits"

### Test Case 5: Failed Login Attempts
**Test Steps:**
1. Attempt login with wrong password (5 times)
2. Verify account locks
3. Wait 15 minutes
4. Verify account unlocks

**Expected:** ✅ Account locks after 5 attempts, unlocks after 15 minutes

### Test Case 6: Session Expiry
**Test Steps:**
1. Login successfully
2. Wait 15 minutes without activity
3. Make authenticated request

**Expected:** ❌ 401 Error: "Session has expired due to inactivity"

---

## CONCLUSION

This authentication system demonstrates:

1. ✅ Complete input validation with specific format requirements
2. ✅ Industry-standard security practices (bcrypt, JWT)
3. ✅ Brute force attack prevention
4. ✅ Session management with timeout
5. ✅ Role-based access control
6. ✅ Clean, documented code suitable for academic assessment
7. ✅ User-friendly error handling

The system is designed for educational purposes and follows best practices taught in ICT and Software Engineering curricula.

---

## REFERENCES

- OWASP Authentication Cheat Sheet
- Node.js Security Best Practices
- Express.js Documentation
- Bcrypt Documentation
- JWT (JSON Web Tokens) RFC 7519

---

**Note for Assessors:** All code includes detailed comments explaining logic and security considerations. The system is not hosted (local development only) as per academic requirements.
