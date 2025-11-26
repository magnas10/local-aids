import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login the user
    login({ name: 'User', email: formData.email });
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Local AIDS</p>
          
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
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" id="remember-me" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="auth-btn">Sign In</button>
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
