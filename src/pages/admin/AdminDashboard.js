import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './AdminPages.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeVolunteers: 89,
    pendingRequests: 23,
    completedRequests: 156,
    totalDonations: 12450,
    activeEvents: 8
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'user_registered',
      message: 'New volunteer registered',
      timestamp: '2 hours ago',
      user: 'John Smith'
    },
    {
      id: 2,
      type: 'donation_received',
      message: 'Donation received: $250',
      timestamp: '5 hours ago',
      user: 'Anonymous'
    },
    {
      id: 3,
      type: 'event_created',
      message: 'New event: Health Workshop',
      timestamp: '1 day ago',
      user: 'Admin'
    },
    {
      id: 4,
      type: 'request_completed',
      message: 'Help request completed',
      timestamp: '2 days ago',
      user: 'Sarah Wilson'
    },
    {
      id: 5,
      type: 'story_shared',
      message: 'New community story shared',
      timestamp: '3 days ago',
      user: 'Mike Johnson'
    }
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'High number of pending help requests',
      action: 'Review pending requests'
    },
    {
      id: 2,
      type: 'info',
      message: 'Monthly report ready for download',
      action: 'Download report'
    }
  ]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-error">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this admin dashboard.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-welcome">
          <h1>🛠️ Admin Dashboard</h1>
          <p>Welcome back, {user.name}! Here's your platform overview.</p>
        </div>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="system-alerts">
          {systemAlerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
              <div className="alert-content">
                <span className="alert-message">{alert.message}</span>
                <button className="alert-action">{alert.action}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card users">
          <div className="stat-header">
            <span className="stat-title">Total Users</span>
            <span className="stat-icon">👥</span>
          </div>
          <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
          <div className="stat-change positive">+12% from last month</div>
        </div>

        <div className="admin-stat-card volunteers">
          <div className="stat-header">
            <span className="stat-title">Active Volunteers</span>
            <span className="stat-icon">🙋‍♂️</span>
          </div>
          <div className="stat-value">{stats.activeVolunteers}</div>
          <div className="stat-change positive">+8% from last month</div>
        </div>

        <div className="admin-stat-card requests">
          <div className="stat-header">
            <span className="stat-title">Pending Requests</span>
            <span className="stat-icon">📋</span>
          </div>
          <div className="stat-value">{stats.pendingRequests}</div>
          <div className="stat-change negative">+5 from yesterday</div>
        </div>

        <div className="admin-stat-card completed">
          <div className="stat-header">
            <span className="stat-title">Completed Requests</span>
            <span className="stat-icon">✅</span>
          </div>
          <div className="stat-value">{stats.completedRequests}</div>
          <div className="stat-change positive">+15% from last month</div>
        </div>

        <div className="admin-stat-card donations">
          <div className="stat-header">
            <span className="stat-title">Total Donations</span>
            <span className="stat-icon">💰</span>
          </div>
          <div className="stat-value">${stats.totalDonations.toLocaleString()}</div>
          <div className="stat-change positive">+22% from last month</div>
        </div>

        <div className="admin-stat-card events">
          <div className="stat-header">
            <span className="stat-title">Active Events</span>
            <span className="stat-icon">📅</span>
          </div>
          <div className="stat-value">{stats.activeEvents}</div>
          <div className="stat-change neutral">No change</div>
        </div>
      </div>

      <div className="admin-dashboard-content">
        {/* Recent Activity */}
        <div className="admin-section">
          <div className="section-header">
            <h3>📊 Recent Activity</h3>
            <button className="btn btn-sm btn-outline">View All</button>
          </div>
          <div className="activity-feed">
            {recentActivity.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.type === 'user_registered' && '👤'}
                  {activity.type === 'donation_received' && '💰'}
                  {activity.type === 'event_created' && '📅'}
                  {activity.type === 'request_completed' && '✅'}
                  {activity.type === 'story_shared' && '📖'}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-details">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="admin-section">
          <div className="section-header">
            <h3>📈 Platform Health</h3>
          </div>
          <div className="health-metrics">
            <div className="metric">
              <span className="metric-label">System Status</span>
              <span className="metric-value status-good">🟢 Operational</span>
            </div>
            <div className="metric">
              <span className="metric-label">Response Time</span>
              <span className="metric-value">125ms</span>
            </div>
            <div className="metric">
              <span className="metric-label">User Satisfaction</span>
              <span className="metric-value">4.8/5.0 ⭐</span>
            </div>
            <div className="metric">
              <span className="metric-label">Active Sessions</span>
              <span className="metric-value">342</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Admin Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/admin/users" className="action-btn primary">
            <span className="action-icon">👥</span>
            <span>Manage Users</span>
          </Link>
          <Link to="/admin/requests" className="action-btn warning">
            <span className="action-icon">📋</span>
            <span>Review Requests</span>
          </Link>
          <Link to="/admin/content" className="action-btn info">
            <span className="action-icon">📝</span>
            <span>Content Management</span>
          </Link>
          <Link to="/admin/reports" className="action-btn success">
            <span className="action-icon">📊</span>
            <span>View Reports</span>
          </Link>
          <Link to="/admin/settings" className="action-btn secondary">
            <span className="action-icon">⚙️</span>
            <span>System Settings</span>
          </Link>
          <Link to="/admin/notifications" className="action-btn danger">
            <span className="action-icon">🔔</span>
            <span>Send Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;