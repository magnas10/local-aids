import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createNotification } from '../../services/api';
import './AdminPages.css';

function AdminSettings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(null);
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'normal',
    targetAudience: 'all',
    expiresAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
    setError('');
    setSuccess('');
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = {
        ...notificationData,
        expiresAt: notificationData.expiresAt || null
      };

      await createNotification(submitData);
      setSuccess('Notification sent successfully to all ' + 
        (notificationData.targetAudience === 'all' ? 'users' : notificationData.targetAudience) + '!');
      
      // Reset form
      setNotificationData({
        title: '',
        message: '',
        type: 'info',
        priority: 'normal',
        targetAudience: 'all',
        expiresAt: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError(error.message || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

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
        <h1>⚙️ System Settings</h1>
        <p>Configure platform settings, security, and system parameters.</p>
      </div>

      {/* Main Features Message */}
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', marginBottom: '30px' }}>
        <h2 style={{ color: '#28a745', marginBottom: '20px' }}>⚙️ System Settings</h2>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Configure notifications, security settings, and system parameters.
          <br />Click on any category below to access its features.
        </p>
      </div>

      {success && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Settings Categories */}
      <div className="quick-actions">
        <h3>⚙️ Settings Categories</h3>
        <div className="actions-grid">
          <button className="action-btn primary" onClick={() => handleSectionClick('security')}>
            <span className="action-icon">🔐</span>
            <span>Security Settings</span>
          </button>
          <button className="action-btn info" onClick={() => handleSectionClick('notifications')}>
            <span className="action-icon">🔔</span>
            <span>Notifications</span>
          </button>
          <button className="action-btn success" onClick={() => handleSectionClick('email')}>
            <span className="action-icon">📧</span>
            <span>Email Templates</span>
          </button>
          <button className="action-btn warning" onClick={() => handleSectionClick('platform')}>
            <span className="action-icon">🌐</span>
            <span>Platform Settings</span>
          </button>
          <button className="action-btn secondary" onClick={() => handleSectionClick('admin')}>
            <span className="action-icon">👨‍💼</span>
            <span>Admin Management</span>
          </button>
          <button className="action-btn danger" onClick={() => handleSectionClick('backup')}>
            <span className="action-icon">💾</span>
            <span>Backup & Recovery</span>
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      {activeSection === 'notifications' && (
        <div className="settings-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', marginTop: '20px' }}>
          <div className="section-header">
            <h3>🔔 Send Notification to Users</h3>
            <p>Send messages and announcements to users, volunteers, or everyone.</p>
          </div>

          <form onSubmit={handleNotificationSubmit} className="notification-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={notificationData.title}
                  onChange={(e) => setNotificationData({...notificationData, title: e.target.value})}
                  className="form-control"
                  placeholder="Enter notification title"
                  required
                  maxLength="200"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={notificationData.message}
                onChange={(e) => setNotificationData({...notificationData, message: e.target.value})}
                className="form-control"
                placeholder="Enter your message..."
                required
                rows="4"
                maxLength="1000"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select
                  id="type"
                  value={notificationData.type}
                  onChange={(e) => setNotificationData({...notificationData, type: e.target.value})}
                  className="form-control"
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  value={notificationData.priority}
                  onChange={(e) => setNotificationData({...notificationData, priority: e.target.value})}
                  className="form-control"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="targetAudience">Send To:</label>
                <select
                  id="targetAudience"
                  value={notificationData.targetAudience}
                  onChange={(e) => setNotificationData({...notificationData, targetAudience: e.target.value})}
                  className="form-control"
                >
                  <option value="all">All Users</option>
                  <option value="users">Regular Users Only</option>
                  <option value="volunteers">Volunteers Only</option>
                  <option value="admins">Admins Only</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="expiresAt">Expiration Date (Optional):</label>
              <input
                type="datetime-local"
                id="expiresAt"
                value={notificationData.expiresAt}
                onChange={(e) => setNotificationData({...notificationData, expiresAt: e.target.value})}
                className="form-control"
              />
              <small className="form-text">Leave empty for permanent notification</small>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Notification'}
            </button>
          </form>
        </div>
      )}

      {/* Other Sections - Under Development */}
      {activeSection && activeSection !== 'notifications' && (
        <div className="settings-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', marginTop: '20px' }}>
          <div className="section-header">
            <h3>🚧 {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</h3>
            <p>This section is currently under development and will be available soon.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Coming Soon</h4>
            <p>Advanced {activeSection} features are being developed.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
