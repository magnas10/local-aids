import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminNavigation() {
  const location = useLocation();
  const { user } = useAuth();

  const adminRoutes = [
    { path: '/admin/dashboard', label: '📊 Dashboard' },
    { path: '/admin/users', label: '👥 Users' },
    { path: '/admin/requests', label: '🆘 Requests' },
    { path: '/admin/reports', label: '📋 Reports' },
    { path: '/admin/content', label: '📝 Content' },
    { path: '/admin/settings', label: '⚙️ Settings' }
  ];

  // Since this component is now only rendered within AdminRoute,
  // we know the user is already an admin, but keep the check for safety
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-nav">
      <div className="admin-nav-container">
        {adminRoutes.map(route => (
          <Link
            key={route.path}
            to={route.path}
            className={`admin-nav-item ${location.pathname === route.path ? 'active' : ''}`}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminNavigation;