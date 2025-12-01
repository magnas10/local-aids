import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute - Route guard for authenticated users
 * Admins always have access, other users need to be logged in
 */
function ProtectedRoute({ children, requiredRoles = null }) {
  const { isLoggedIn, isAdmin, hasRole, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin always has access
  if (isAdmin()) {
    return children;
  }

  // Check for required roles if specified
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to="/access-denied" replace />;
  }

  // User is authenticated and has required role
  return children;
}

export default ProtectedRoute;
