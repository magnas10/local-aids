import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminPages.css';

function AdminReports() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-error">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📊 Reports & Analytics</h1>
        <p>Generate comprehensive reports and analyze platform performance.</p>
      </div>

      {/* Coming Soon Message */}
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', marginBottom: '30px' }}>
        <h2 style={{ color: '#6c757d', marginBottom: '20px' }}>🚧 Under Development</h2>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Advanced reporting and analytics features are currently being developed.
          <br />This will include user activity reports, platform statistics, and performance metrics.
        </p>
      </div>

      {/* Quick Report Options */}
      <div className="quick-actions">
        <h3>📋 Available Reports</h3>
        <div className="actions-grid">
          <button className="action-btn info">
            <span className="action-icon">👥</span>
            <span>User Activity Report</span>
          </button>
          <button className="action-btn success">
            <span className="action-icon">📈</span>
            <span>Platform Statistics</span>
          </button>
          <button className="action-btn warning">
            <span className="action-icon">⚠️</span>
            <span>Issue Reports</span>
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📊</span>
            <span>Performance Metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;