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
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setFormError('');
    
    // Register the user with API
    const result = await register({
      name: formData.fullName,
      email: formData.email,
      password: formData.password
    });
    
    setLoading(false);
    
    if (result.success) {
      // Redirect to home on success
      navigate('/');
    } else {
      setFormError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Create Account</h1>
          <p>Join our community and make a difference</p>
          
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
              <label htmlFor="signup-password">Password</label>
              <input 
                id="signup-password"
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
                required 
                autoComplete="new-password"
                aria-required="true"
                minLength="6"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input 
                id="signup-confirm-password"
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required 
                autoComplete="new-password"
                aria-required="true"
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
