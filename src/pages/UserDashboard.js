import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getHelpRequests } from '../services/api';
import './Pages.css';

function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeRequests: 0,
    completedRequests: 0,
    volunteerConnections: 0,
    eventsAttended: 0
  });
  const [myRequests, setMyRequests] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'request_submitted',
      title: 'Shopping assistance request',
      date: '2024-12-14',
      status: 'pending'
    },
    {
      id: 2,
      type: 'help_received',
      title: 'Grocery delivery completed',
      date: '2024-12-10',
      status: 'completed'
    }
  ]);
  const [availableHelp, setAvailableHelp] = useState([
    {
      id: 1,
      title: 'Community Food Bank',
      description: 'Free groceries available every Tuesday',
      category: 'food',
      location: 'Sydney CBD'
    },
    {
      id: 2,
      title: 'Transportation Support',
      description: 'Free rides to medical appointments',
      category: 'transport',
      location: 'Melbourne'
    },
    {
      id: 3,
      title: 'Technology Help',
      description: 'Computer and phone assistance',
      category: 'technology',
      location: 'Brisbane'
    }
  ]);

  useEffect(() => {
    loadUserRequests();
  }, []);

  const loadUserRequests = async () => {
    try {
      const response = await getHelpRequests();
      const userRequests = response.filter(req => req.requesterEmail === user.email);
      setMyRequests(userRequests.slice(0, 3)); // Show latest 3
      
      // Update stats
      const active = userRequests.filter(req => req.status === 'pending' || req.status === 'in_progress').length;
      const completed = userRequests.filter(req => req.status === 'completed').length;
      
      setStats(prev => ({
        ...prev,
        activeRequests: active,
        completedRequests: completed
      }));
    } catch (error) {
      console.error('Failed to load user requests:', error);
    }
  };

  if (!user || user.role === 'admin') {
    return (
      <div className="dashboard-container">
        <div className="access-denied">
          <h1>Access Restricted</h1>
          <p>This dashboard is for community members seeking help.</p>
          <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Community Dashboard</h1>
          <p>Welcome, {user.name}! Here's your community support overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeRequests}</div>
            <div className="stat-label">Active Requests</div>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedRequests}</div>
            <div className="stat-label">Completed Requests</div>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.volunteerConnections}</div>
            <div className="stat-label">Volunteers Met</div>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.eventsAttended}</div>
            <div className="stat-label">Events Attended</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* My Recent Requests */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>My Recent Requests</h3>
            <Link to="/my-requests" className="view-all-link">View All</Link>
          </div>
          {myRequests.length > 0 ? (
            <div className="requests-list">
              {myRequests.map(request => (
                <div key={request._id} className={`request-item ${request.status}`}>
                  <div className="request-icon">
                    {request.helpType === 'shopping' && ''}
                    {request.helpType === 'transport' && ''}
                    {request.helpType === 'companionship' && ''}
                    {request.helpType === 'housing' && ''}
                    {request.helpType === 'meals' && ''}
                    {request.helpType === 'medical' && ''}
                    {request.helpType === 'technology' && ''}
                  </div>
                  <div className="request-content">
                    <div className="request-title">{request.description}</div>
                    <div className="request-details">
                      {request.location} • {new Date(request.preferredDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`request-status ${request.status}`}>
                    {request.status === 'pending' && 'Pending'}
                    {request.status === 'in_progress' && 'In Progress'}
                    {request.status === 'completed' && 'Completed'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't made any help requests yet.</p>
              <Link to="/request-help" className="btn btn-primary">Request Help</Link>
            </div>
          )}
        </div>

        {/* Available Community Help */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Available Community Help</h3>
          </div>
          <div className="help-list">
            {availableHelp.map(help => (
              <div key={help.id} className="help-item">
                <div className="help-icon">
                  {help.category === 'food' && ''}
                  {help.category === 'transport' && ''}
                  {help.category === 'technology' && ''}
                </div>
                <div className="help-content">
                  <div className="help-title">{help.title}</div>
                  <div className="help-description">{help.description}</div>
                  <div className="help-location">{help.location}</div>
                </div>
                <button className="btn btn-sm btn-outline">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/request-help" className="action-btn primary">
            <span className="action-icon"></span>
            <span>Request Help</span>
          </Link>
          <Link to="/events" className="action-btn success">
            <span className="action-icon"></span>
            <span>Community Events</span>
          </Link>
          
          <Link to="/contact" className="action-btn secondary">
            <span className="action-icon"></span>
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;