import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Signup() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user types
    if (formError) setFormError('');
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Validate phone number (exactly 10 digits)
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setFormError('Phone number must be exactly 10 digits');
      return;
    }
    
    // Validate password (exactly 8 numeric digits)
    if (!/^[0-9]{8}$/.test(formData.password)) {
      setFormError('Password must be exactly 8 numeric digits');
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    setFormError('');

    // Safety timeout: Reset loading state after 90s max (UI failsafe for Render cold starts)
    const safetyTimeout = setTimeout(() => {
      setLoading((currentLoading) => {
        if (currentLoading) {
           setFormError('Request timed out. The server might be waking up (can take ~60s). Please try again.');
           return false;
        }
        return currentLoading;
      });
    }, 90000);
    
    // Register the user with API
    try {
      const result = await register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      clearTimeout(safetyTimeout);
      setLoading(false);
      
      if (result.success) {
        // Redirect to home on success
        navigate('/');
      } else {
        setFormError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      clearTimeout(safetyTimeout);
      setLoading(false);
      setFormError('An unexpected error occurred.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Create Account</h1>
          <p>Join our community and make a difference</p>
          
          {/* Validation Requirements Info */}
          <div style={{
            background: '#e3f2fd',
            border: '1px solid #2196f3',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '0.9em'
          }}>
            <strong>📋 Registration Requirements:</strong>
            <ul style={{margin: '8px 0 0 20px', paddingLeft: '0'}}>
              <li>Password: Exactly 8 numeric digits (e.g., 12345678)</li>
              <li>Phone: Exactly 10 numeric digits (e.g., 9876543210)</li>
              <li>Name: 2-50 characters, letters and spaces only</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form" aria-label="Sign up form">
            {formError && (
              <div className="form-error" role="alert">
                {formError}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="signup-fullname">Full Name</label>
              <input 
                id="signup-fullname"
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required 
                autoComplete="name"
                aria-required="true"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input 
                id="signup-email"
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required 
                autoComplete="email"
                aria-required="true"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-phone">Phone Number</label>
              <input 
                id="signup-phone"
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number (e.g., 9876543210)"
                required 
                autoComplete="tel"
                aria-required="true"
                pattern="[0-9]{10}"
                maxLength="10"
                disabled={loading}
              />
              <small style={{color: '#666', fontSize: '0.85em'}}>Must be exactly 10 digits</small>
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password (8 Digits)</label>
              <input 
                id="signup-password"
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter 8-digit numeric password (e.g., 12345678)"
                required 
                autoComplete="new-password"
                aria-required="true"
                pattern="[0-9]{8}"
                maxLength="8"
                disabled={loading}
              />
              <small style={{color: '#666', fontSize: '0.85em'}}>Must be exactly 8 numeric digits</small>
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input 
                id="signup-confirm-password"
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your 8-digit password"
                required 
                autoComplete="new-password"
                aria-required="true"
                pattern="[0-9]{8}"
                maxLength="8"
                disabled={loading}
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" id="terms-checkbox" required aria-required="true" />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider" aria-hidden="true">
            <span>or continue with</span>
          </div>

          <div className="social-auth" role="group" aria-label="Social signup options">
            <button className="social-btn google" aria-label="Sign up with Google">Google</button>
            <button className="social-btn facebook" aria-label="Sign up with Facebook">Facebook</button>
          </div>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
