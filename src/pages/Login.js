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
    
    // Validate password (exactly 8 numeric digits)
    if (!/^[0-9]{8}$/.test(formData.password)) {
      setFormError('Password must be exactly 8 numeric digits');
      return;
    }
    
    setLoading(true);
    setFormError('');

    // Safety timeout: Reset loading state after 90s max (UI failsafe for Render cold starts)
    // Render free tier can take 60s+ to wake up
    const safetyTimeout = setTimeout(() => {
        setLoading((currentLoading) => {
            if (currentLoading) {
                setFormError('Request timed out. The server might be waking up (can take ~60s). Please try again.');
                return false;
            }
            return currentLoading;
        });
    }, 90000); // Increased to 90s
    
    try {
      // Login the user with API
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      clearTimeout(safetyTimeout);
      
      if (result.success) {
        // Redirect to home on success
        navigate('/');
      } else {
        setFormError(result.error || 'Login failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      clearTimeout(safetyTimeout);
      console.error('Unexpected login error:', err);
      // Only set error if not already handled by safety timeout
      if (loading) {
          setFormError('An unexpected error occurred. Please try again.');
          setLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Local Aid</p>
          
          {/* Password Format Reminder */}
          <div style={{
            background: '#fff3e0',
            border: '1px solid #ff9800',
            borderRadius: '8px',
            padding: '10px 16px',
            marginBottom: '20px',
            fontSize: '0.9em'
          }}>
            <strong>🔑 Password Format:</strong> Your password is exactly 8 numeric digits
          </div>
          
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
              <label htmlFor="login-password">Password (8 Digits)</label>
              <input 
                id="login-password"
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your 8-digit numeric password"
                required 
                autoComplete="current-password"
                aria-required="true"
                pattern="[0-9]{8}"
                maxLength="8"
                disabled={loading}
              />
              <small style={{color: '#666', fontSize: '0.85em'}}>Password must be exactly 8 numeric digits</small>
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
