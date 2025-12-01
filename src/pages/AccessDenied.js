import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function AccessDenied() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="access-denied-page">
      <div className="access-denied-container">
        <div className="access-denied-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="80" height="80">
            <circle cx="12" cy="12" r="10"/>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          </svg>
        </div>
        <h1>Access Denied</h1>
        <p className="access-denied-message">
          Sorry, you don't have permission to access this page.
          {isLoggedIn && user && (
            <span> Your current role is <strong>{user.role}</strong>.</span>
          )}
        </p>
        <p className="access-denied-hint">
          If you believe this is an error, please contact an administrator.
        </p>
        <div className="access-denied-actions">
          <Link to="/" className="btn-primary">Go to Home</Link>
          {isLoggedIn ? (
            <Link to="/dashboard" className="btn-secondary">Go to Dashboard</Link>
          ) : (
            <Link to="/login" className="btn-secondary">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
