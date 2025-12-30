import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createNotification, updateUserProfile } from '../../services/api';
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
  
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: '30',
    loginAttempts: '5'
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

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate passwords
      if (securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }

      if (securityData.newPassword && securityData.newPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      // Update password if provided
      if (securityData.currentPassword && securityData.newPassword) {
        await updateUserProfile(user.id, {
          currentPassword: securityData.currentPassword,
          password: securityData.newPassword
        });
        
        setSuccess('Password updated successfully');
        setSecurityData({
          ...securityData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setSuccess('Security settings updated successfully');
      }

      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError(error.message || 'Failed to update security settings');
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
      <div className="admin-hero" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}>
        <div className="admin-hero-content">
          <div className="admin-badge" style={{ color: '#ffc107' }}>⚙️ SYSTEM SETTINGS</div>
          <h1 className="admin-hero-title" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '800' }}>
            System <span className="highlight" style={{ color: '#ffc107' }}>Settings</span>
          </h1>
          <p className="admin-hero-subtitle" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
            Configure platform settings, security, and system parameters.
          </p>
        </div>
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
      {activeSection === 'security' && (
        <div className="settings-section" style={{ background: 'white', padding: '30px', borderRadius: '12px', marginTop: '20px' }}>
          <div className="section-header">
            <h3>🔐 Security Settings</h3>
            <p>Manage password, authentication, and security parameters.</p>
          </div>

          <form onSubmit={handleSecurityUpdate} className="security-form" style={{ maxWidth: '600px' }}>
            <div className="form-section" style={{ marginBottom: '30px' }}>
              <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Change Password</h4>
              
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                  className="form-control"
                  placeholder="Enter current password"
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                  className="form-control"
                  placeholder="Enter new password (min 6 characters)"
                  minLength="6"
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                  className="form-control"
                  placeholder="Confirm new password"
                  minLength="6"
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                />
              </div>
            </div>

            <div className="form-section" style={{ marginBottom: '30px' }}>
              <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Security Options</h4>
              
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="sessionTimeout">Session Timeout (minutes):</label>
                <input
                  type="number"
                  id="sessionTimeout"
                  value={securityData.sessionTimeout}
                  onChange={(e) => setSecurityData({...securityData, sessionTimeout: e.target.value})}
                  className="form-control"
                  min="5"
                  max="120"
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                />
                <small style={{ color: '#6c757d' }}>Auto-logout after inactivity</small>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="loginAttempts">Max Login Attempts:</label>
                <input
                  type="number"
                  id="loginAttempts"
                  value={securityData.loginAttempts}
                  onChange={(e) => setSecurityData({...securityData, loginAttempts: e.target.value})}
                  className="form-control"
                  min="3"
                  max="10"
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                />
                <small style={{ color: '#6c757d' }}>Block account after failed attempts</small>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={securityData.twoFactorEnabled}
                    onChange={(e) => setSecurityData({...securityData, twoFactorEnabled: e.target.checked})}
                    style={{ marginRight: '10px', width: '18px', height: '18px' }}
                  />
                  <span>Enable Two-Factor Authentication (2FA)</span>
                </label>
                <small style={{ color: '#6c757d', marginLeft: '28px' }}>Require verification code on login</small>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ 
                padding: '12px 30px', 
                fontSize: '16px',
                background: '#20b2aa',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Updating...' : 'Update Security Settings'}
            </button>
          </form>
        </div>
      )}

      {activeSection && activeSection !== 'notifications' && activeSection !== 'security' && (
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
