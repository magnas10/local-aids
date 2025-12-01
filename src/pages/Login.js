import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if there's a redirect path from ProtectedRoute
  const from = location.state?.from?.pathname || '/';
  const requireAdmin = location.state?.requireAdmin || false;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted', formData);
    setIsLoading(true);
    setError('');
    
    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      // Login the user and get the user data with role
      console.log('Calling login function');
      const userData = login({ name: 'User', email: formData.email });
      
      console.log('User logged in with role:', userData.role);
      
      // Simulate API delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check user role and redirect accordingly
      if (userData.role === 'admin') {
        console.log('Admin detected, redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      } else if (requireAdmin) {
        // User tried to access admin page but is not admin
        setError('You need admin privileges to access that page');
        setIsLoading(false);
        return;
      } else {
        // Regular user - redirect to original destination or home
        console.log('Redirecting to:', from);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Local AIDS</p>

          {error && (
            <div className="auth-error" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form" aria-label="Login form">
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" id="remember-me" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="btn-spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="auth-divider" aria-hidden="true">
            <span>or continue with</span>
          </div>

          <div className="social-auth" role="group" aria-label="Social login options">
            <button className="social-btn google" aria-label="Sign in with Google" disabled={isLoading}>Google</button>
            <button className="social-btn facebook" aria-label="Sign in with Facebook" disabled={isLoading}>Facebook</button>
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
