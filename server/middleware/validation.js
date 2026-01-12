/**
 * VALIDATION MIDDLEWARE FOR COLLEGE PROJECT
 * ICT / Software Engineering Coursework
 * 
 * Purpose: Validates user input for registration and login
 * Security: Prevents injection attacks and ensures data integrity
 */

const { body, validationResult } = require('express-validator');

/**
 * Password Validation Rules
 * - EXACTLY 8 digits (no more, no less)
 * - Numeric only (0-9)
 * - No letters, special characters, or spaces
 */
const passwordValidation = () => {
  return body('password')
    .trim()
    .isLength({ min: 8, max: 8 })
    .withMessage('Password must be exactly 8 digits')
    .isNumeric()
    .withMessage('Password must contain only numbers (0-9)')
    .matches(/^[0-9]{8}$/)
    .withMessage('Password must be exactly 8 numeric digits');
};

/**
 * Mobile Number Validation Rules
 * - EXACTLY 10 digits
 * - Numeric only
 * - No spaces, country codes, or special characters
 */
const mobileValidation = () => {
  return body('phone')
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be exactly 10 digits')
    .isNumeric()
    .withMessage('Mobile number must contain only numbers')
    .matches(/^[0-9]{10}$/)
    .withMessage('Mobile number must be exactly 10 numeric digits');
};

/**
 * Confirm Password Validation
 * Ensures password and confirmPassword fields match
 */
const confirmPasswordValidation = () => {
  return body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    });
};

/**
 * Email Validation
 * Ensures valid email format
 */
const emailValidation = () => {
  return body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(); // Sanitize email
};

/**
 * Name Validation
 * Ensures name is provided and contains only letters and spaces
 */
const nameValidation = () => {
  return body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only letters and spaces');
};

/**
 * Role Validation
 * Ensures role is one of the allowed values
 */
const roleValidation = () => {
  return body('role')
    .optional()
    .isIn(['user', 'admin', 'volunteer'])
    .withMessage('Invalid role specified');
};

/**
 * Validation Error Handler
 * Formats and returns validation errors in user-friendly format
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Format errors for user-friendly display
    const formattedErrors = errors.array().map(error => ({
      field: error.param,
      message: error.msg
    }));
    
    // Get the first error message for simple display
    const firstError = formattedErrors[0];
    
    return res.status(400).json({
      success: false,
      message: firstError.message || 'Validation failed',
      errors: formattedErrors
    });
  }
  
  return next();
};

/**
 * Registration Validation Chain
 * Combines all validation rules for user registration
 */
const registrationValidation = [
  nameValidation(),
  emailValidation(),
  passwordValidation(),
  confirmPasswordValidation(),
  mobileValidation(),
  roleValidation(),
  handleValidationErrors
];

/**
 * Login Validation Chain
 * Validation rules for user login
 * Note: Password format not enforced during login (only check if provided)
 */
const loginValidation = [
  emailValidation(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

/**
 * Input Sanitization Function
 * Prevents XSS and SQL injection attacks
 * Best Practice: Always sanitize user inputs before processing
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove common XSS characters
    .substring(0, 500); // Limit length to prevent buffer overflow
};

module.exports = {
  passwordValidation,
  mobileValidation,
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  roleValidation,
  handleValidationErrors,
  registrationValidation,
  loginValidation,
  sanitizeInput
};
