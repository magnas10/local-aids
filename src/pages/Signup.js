import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Sign up and log in the user
    login({ name: formData.fullName, email: formData.email });
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card" role="main">
          <h1>Create Account</h1>
          <p>Join our community and make a difference</p>
          
          <form onSubmit={handleSubmit} className="auth-form" aria-label="Sign up form">
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
                placeholder="Create a password"
                required 
                autoComplete="new-password"
                aria-required="true"
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
              />
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" id="terms-checkbox" required aria-required="true" />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>
            <button type="submit" className="auth-btn">Create Account</button>
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
