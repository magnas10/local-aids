import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Pages.css';

function VolunteerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeEvents: 12,
    hoursVolunteered: 45,
    peopleHelped: 28,
    upcomingEvents: 5
  });
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'event_joined',
      title: 'Community Food Drive',
      date: '2024-12-14',
      status: 'completed'
    },
    {
      id: 2,
      type: 'help_provided',
      title: 'Elderly Care Assistance',
      date: '2024-12-13',
      status: 'completed'
    },
    {
      id: 3,
      type: 'event_registered',
      title: 'Health Workshop',
      date: '2024-12-15',
      status: 'upcoming'
    }
  ]);
  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: 1,
      title: 'Health Workshop Setup',
      date: '2024-12-16',
      time: '9:00 AM',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Community Garden Cleanup',
      date: '2024-12-18',
      time: '2:00 PM',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Food Bank Sorting',
      date: '2024-12-20',
      time: '10:00 AM',
      priority: 'low'
    }
  ]);

  if (!user || user.role !== 'volunteer') {
    return (
      <div className="dashboard-container">
        <div className="access-denied">
          <h1>Access Restricted</h1>
          <p>This dashboard is only available for volunteers.</p>
          <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>🌟 Volunteer Dashboard</h1>
          <p>Welcome back, {user.name}! Here's your volunteer activity overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeEvents}</div>
            <div className="stat-label">Active Events</div>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-number">{stats.hoursVolunteered}</div>
            <div className="stat-label">Hours This Month</div>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.peopleHelped}</div>
            <div className="stat-label">People Helped</div>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <div className="stat-number">{stats.upcomingEvents}</div>
            <div className="stat-label">Upcoming Events</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>🕒 Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.status}`}>
                <div className="activity-icon">
                  {activity.type === 'event_joined' && '✅'}
                  {activity.type === 'help_provided' && '🤝'}
                  {activity.type === 'event_registered' && '📝'}
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-date">{new Date(activity.date).toLocaleDateString()}</div>
                </div>
                <div className={`activity-status ${activity.status}`}>
                  {activity.status === 'completed' ? 'Completed' : 'Upcoming'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>📋 Upcoming Tasks</h3>
          </div>
          <div className="tasks-list">
            {upcomingTasks.map(task => (
              <div key={task.id} className={`task-item priority-${task.priority}`}>
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  <div className="task-datetime">
                    📅 {new Date(task.date).toLocaleDateString()} at {task.time}
                  </div>
                </div>
                <div className={`task-priority ${task.priority}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/events" className="action-btn primary">
            <span className="action-icon">📅</span>
            <span>Browse Events</span>
          </Link>
          <Link to="/my-requests" className="action-btn success">
            <span className="action-icon">📝</span>
            <span>My Applications</span>
          </Link>
          <Link to="/profile" className="action-btn info">
            <span className="action-icon">👤</span>
            <span>Update Profile</span>
          </Link>
          <Link to="/help-center" className="action-btn secondary">
            <span className="action-icon">❓</span>
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;