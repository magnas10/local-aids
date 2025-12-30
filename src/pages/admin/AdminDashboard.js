import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { getAllUsers, getHelpRequests } from '../../services/api';
import './AdminPages.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeVolunteers: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalDonations: 12450,
    activeEvents: 8
  });

  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  const [systemAlerts, setSystemAlerts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching dashboard data...');
      console.log('Current token:', localStorage.getItem('token'));
      
      // Fetch users
      console.log('Fetching users...');
      const usersResponse = await getAllUsers();
      console.log('Users response:', usersResponse);
      const usersData = usersResponse.users || usersResponse || [];
      console.log('Users data:', usersData);
      
      // Fetch help requests
      console.log('Fetching help requests...');
      const requestsResponse = await getHelpRequests();
      console.log('Requests response:', requestsResponse);
      const requestsData = Array.isArray(requestsResponse) ? requestsResponse : requestsResponse.helpRequests || [];
      console.log('Requests data:', requestsData);
      
      // Calculate stats
      const volunteers = usersData.filter(u => u.role === 'volunteer');
      const activeVolunteers = volunteers.filter(u => u.isActive || u.status === 'active');
      const pending = requestsData.filter(r => r.status === 'pending');
      const completed = requestsData.filter(r => r.status === 'completed');
      
      const newStats = {
        totalUsers: usersData.length,
        activeVolunteers: activeVolunteers.length,
        pendingRequests: pending.length,
        completedRequests: completed.length,
        totalDonations: 12450,
        activeEvents: 8
      };
      console.log('Setting new stats:', newStats);
      setStats(newStats);
      
      // Set system alerts
      const alerts = [];
      if (pending.length > 5) {
        alerts.push({
          id: 1,
          type: 'warning',
          message: 'High number of pending help requests',
          action: 'Review pending requests'
        });
      }
      setSystemAlerts(alerts);
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

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
      <div className="admin-hero" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}>
        <div className="admin-hero-content">
          <div className="admin-badge" style={{ color: '#ffc107' }}>🔐 ADMIN CONTROL CENTER</div>
          <h1 className="admin-hero-title" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '800' }}>
            Platform <span className="highlight" style={{ color: '#ffc107' }}>Overview</span>
          </h1>
          <p className="admin-hero-subtitle" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
            Welcome back, {user.name}! Here's your platform performance.
          </p>
          <div className="admin-hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {stats.totalUsers.toLocaleString()}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>TOTAL USERS</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {stats.activeVolunteers}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>VOLUNTEERS</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {stats.completedRequests}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>REQUESTS COMPLETED</div>
            </div>
          </div>
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
            <span className="stat-icon"></span>
          </div>
          <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
          <div className="stat-change positive">+12% from last month</div>
        </div>

        <div className="admin-stat-card volunteers">
          <div className="stat-header">
            <span className="stat-title">Active Volunteers</span>
            <span className="stat-icon"></span>
          </div>
          <div className="stat-value">{stats.activeVolunteers}</div>
          <div className="stat-change positive">+8% from last month</div>
        </div>

        <div className="admin-stat-card requests">
          <div className="stat-header">
            <span className="stat-title">Pending Requests</span>
            <span className="stat-icon"></span>
          </div>
          <div className="stat-value">{stats.pendingRequests}</div>
          <div className="stat-change negative">+5 from yesterday</div>
        </div>

        <div className="admin-stat-card completed">
          <div className="stat-header">
            <span className="stat-title">Completed Requests</span>
            <span className="stat-icon"></span>
          </div>
          <div className="stat-value">{stats.completedRequests}</div>
          <div className="stat-change positive">+15% from last month</div>
        </div>

        <div className="admin-stat-card donations">
          <div className="stat-header">
            <span className="stat-title">Total Donations</span>
            <span className="stat-icon"></span>
          </div>
          <div className="stat-value">${stats.totalDonations.toLocaleString()}</div>
          <div className="stat-change positive">+22% from last month</div>
        </div>

        <div className="admin-stat-card events">
          <div className="stat-header">
            <span className="stat-title">Active Events</span>
            <span className="stat-icon"></span>
          </div>
          <div className="stat-value">{stats.activeEvents}</div>
          <div className="stat-change neutral">No change</div>
        </div>
      </div>

      <div className="admin-dashboard-content">
        {/* Recent Activity */}
        <div className="admin-section">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="btn btn-sm btn-outline">View All</button>
          </div>
          <div className="activity-feed">
            {recentActivity.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.type === 'user_registered' && ''}
                  {activity.type === 'donation_received' && ''}
                  {activity.type === 'event_created' && ''}
                  {activity.type === 'request_completed' && ''}
                  {activity.type === 'story_shared' && ''}
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
            <h3>Platform Health</h3>
          </div>
          <div className="health-metrics">
            <div className="metric">
              <span className="metric-label">System Status</span>
              <span className="metric-value status-good">Operational</span>
            </div>
            <div className="metric">
              <span className="metric-label">Response Time</span>
              <span className="metric-value">125ms</span>
            </div>
            <div className="metric">
              <span className="metric-label">User Satisfaction</span>
              <span className="metric-value">4.8/5.0</span>
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
        <h3>Admin Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/admin/users" className="action-btn primary">
            <span className="action-icon"></span>
            <span>Manage Users</span>
          </Link>
          <Link to="/admin/requests" className="action-btn warning">
            <span className="action-icon"></span>
            <span>Review Requests</span>
          </Link>
          <Link to="/admin/content" className="action-btn info">
            <span className="action-icon"></span>
            <span>Content Management</span>
          </Link>
          <Link to="/admin/reports" className="action-btn success">
            <span className="action-icon"></span>
            <span>View Reports</span>
          </Link>
          <Link to="/admin/settings" className="action-btn secondary">
            <span className="action-icon"></span>
            <span>System Settings</span>
          </Link>
          <Link to="/admin/notifications" className="action-btn danger">
            <span className="action-icon"></span>
            <span>Send Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;