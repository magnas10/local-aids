import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminPages.css';

function AdminContent() {
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
        <h1>📝 Content Management</h1>
        <p>Manage platform content, events, galleries, and announcements.</p>
      </div>

      {/* Coming Soon Message */}
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', marginBottom: '30px' }}>
        <h2 style={{ color: '#6c757d', marginBottom: '20px' }}>🚧 Under Development</h2>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Content management features are currently being developed.
          <br />This will include event management, gallery moderation, and announcement systems.
        </p>
      </div>

      {/* Content Management Options */}
      <div className="quick-actions">
        <h3>📝 Content Management</h3>
        <div className="actions-grid">
          <button className="action-btn primary">
            <span className="action-icon">📅</span>
            <span>Manage Events</span>
          </button>
          <button className="action-btn info">
            <span className="action-icon">🖼️</span>
            <span>Gallery Moderation</span>
          </button>
          <button className="action-btn success">
            <span className="action-icon">📢</span>
            <span>Announcements</span>
          </button>
          <button className="action-btn warning">
            <span className="action-icon">📰</span>
            <span>Blog Posts</span>
          </button>
          <button className="action-btn secondary">
            <span className="action-icon">📋</span>
            <span>Community Guidelines</span>
          </button>
          <button className="action-btn danger">
            <span className="action-icon">🔒</span>
            <span>Safety Resources</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminContent;