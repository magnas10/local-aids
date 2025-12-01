import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute - Route guard that only allows admin users
 * Blocks all non-admin users and redirects them appropriately
 */
function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Checking authorization...</p>
      </div>
    );
  }

  // Not logged in - redirect to login with return path
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location, requireAdmin: true }} replace />;
  }

  // Logged in but not admin - redirect to access denied
  if (!isAdmin()) {
    return <Navigate to="/access-denied" replace />;
  }

  // Admin user - allow access
  return children;
}

export default AdminRoute;
