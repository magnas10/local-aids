import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Login() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    // Validate form
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Basic email validation
    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setFormError('');
    
    try {
      // Login the user with API
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        // Redirect to home on success
        navigate('/');
      } else {
        setFormError(result.error || 'Login failed. Please try again.');
        // Ensure loading is turned off if login fails
        setLoading(false);
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setFormError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Local Aid</p>
          
          <form onSubmit={handleSubmit} className="auth-form" aria-label="Login form">
            {formError && (
              <div className="form-error" role="alert">
                {formError}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input 
                id="login-email"
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
              <label htmlFor="login-password">Password</label>
              <input 
                id="login-password"
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required 
                autoComplete="current-password"
                aria-required="true"
                disabled={loading}
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" id="remember-me" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider" aria-hidden="true">
            <span>or continue with</span>
          </div>

          <div className="social-auth" role="group" aria-label="Social login options">
            <button className="social-btn google" aria-label="Sign in with Google">Google</button>
            <button className="social-btn facebook" aria-label="Sign in with Facebook">Facebook</button>
          </div>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
