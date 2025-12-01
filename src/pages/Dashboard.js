import React, { useState } from 'react';
import './Pages.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const personalData = {
    user: {
      name: 'Sarah Johnson',
      role: 'Active Volunteer',
      joinDate: 'March 2024',
      location: 'Melbourne, VIC',
      avatar: 'SJ'
    },
    stats: {
      volunteering: 45,
      peopleHelped: 128,
      hoursContributed: 156,
      eventsAttended: 12
    },
    recentActivities: [
      {
        type: 'volunteer',
        action: 'Helped at community food bank',
        date: '2 hours ago',
        location: 'Melbourne Food Bank',
        impact: '15 families fed'
      },
      {
        type: 'donation',
        action: 'Donated winter clothes',
        date: '1 day ago',
        location: 'St. Vincent de Paul',
        impact: '8 items donated'
      },
      {
        type: 'event',
        action: 'Attended elderly care workshop',
        date: '3 days ago',
        location: 'Community Center',
        impact: 'New skills learned'
      },
      {
        type: 'support',
        action: 'Provided transport assistance',
        date: '5 days ago',
        location: 'Local Hospital',
        impact: '3 seniors assisted'
      }
    ],
    upcomingOpportunities: [
      {
        title: 'Beach Cleanup Drive',
        date: 'Dec 5, 2025',
        time: '9:00 AM - 12:00 PM',
        location: 'Bondi Beach',
        type: 'Environment',
        urgency: 'medium'
      },
      {
        title: 'Christmas Food Distribution',
        date: 'Dec 8, 2025',
        time: '10:00 AM - 4:00 PM',
        location: 'Salvation Army',
        type: 'Food Security',
        urgency: 'high'
      },
      {
        title: 'Senior Reading Program',
        date: 'Dec 12, 2025',
        time: '2:00 PM - 4:00 PM',
        location: 'Aged Care Facility',
        type: 'Education',
        urgency: 'low'
      }
    ],
    achievements: [
      { title: 'First Month Volunteer', badge: '🎯', earned: 'March 2024' },
      { title: 'Community Helper', badge: '🤝', earned: 'June 2024' },
      { title: '100 Hours Milestone', badge: '⏰', earned: 'September 2024' },
      { title: 'Event Organizer', badge: '📅', earned: 'November 2024' }
    ]
  };

  return (
    <div className="personal-dashboard">
      <div className="dashboard-container">
        {/* Header Profile Section */}
        <div className="dashboard-profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">{personalData.user.avatar}</div>
          </div>
          <div className="profile-info">
            <h1>Welcome back, {personalData.user.name}!</h1>
            <p className="profile-subtitle">
              {personalData.user.role} • Member since {personalData.user.joinDate} • {personalData.user.location}
            </p>
          </div>
          <div className="profile-actions">
            <button className="btn-secondary-dashboard">Edit Profile</button>
            <button className="btn-primary-dashboard">Find Opportunities</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats-grid">
          <div className="stat-card">
            <div className="stat-icon volunteer-icon">🤝</div>
            <div className="stat-details">
              <span className="stat-number">{personalData.stats.volunteering}</span>
              <span className="stat-label">Volunteer Activities</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon people-icon">❤️</div>
            <div className="stat-details">
              <span className="stat-number">{personalData.stats.peopleHelped}</span>
              <span className="stat-label">People Helped</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon hours-icon">⏰</div>
            <div className="stat-details">
              <span className="stat-number">{personalData.stats.hoursContributed}</span>
              <span className="stat-label">Hours Contributed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon events-icon">📅</div>
            <div className="stat-details">
              <span className="stat-number">{personalData.stats.eventsAttended}</span>
              <span className="stat-label">Events Attended</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Recent Activity
          </button>
          <button 
            className={`tab-btn ${activeTab === 'opportunities' ? 'active' : ''}`}
            onClick={() => setActiveTab('opportunities')}
          >
            Upcoming Opportunities
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="activity-section">
              <div className="section-header">
                <h3>Your Recent Impact</h3>
                <p>See the difference you've made in your community</p>
              </div>
              <div className="activity-list">
                {personalData.recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'volunteer' && '🤝'}
                      {activity.type === 'donation' && '💝'}
                      {activity.type === 'event' && '📅'}
                      {activity.type === 'support' && '🚗'}
                    </div>
                    <div className="activity-details">
                      <h4>{activity.action}</h4>
                      <p className="activity-meta">{activity.location} • {activity.date}</p>
                      <span className="activity-impact">{activity.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="opportunities-section">
              <div className="section-header">
                <h3>Volunteer Opportunities Near You</h3>
                <p>Find ways to make a difference in your community</p>
              </div>
              <div className="opportunities-list">
                {personalData.upcomingOpportunities.map((opportunity, index) => (
                  <div key={index} className="opportunity-card">
                    <div className="opportunity-header">
                      <h4>{opportunity.title}</h4>
                      <span className={`urgency-badge ${opportunity.urgency}`}>
                        {opportunity.urgency} priority
                      </span>
                    </div>
                    <div className="opportunity-details">
                      <p className="opportunity-datetime">
                        📅 {opportunity.date} at {opportunity.time}
                      </p>
                      <p className="opportunity-location">📍 {opportunity.location}</p>
                      <p className="opportunity-type">🏷️ {opportunity.type}</p>
                    </div>
                    <button className="opportunity-btn">Join This Opportunity</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-section">
              <div className="section-header">
                <h3>Your Achievements</h3>
                <p>Celebrate your volunteer milestones and contributions</p>
              </div>
              <div className="achievements-grid">
                {personalData.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-badge">{achievement.badge}</div>
                    <h4>{achievement.title}</h4>
                    <p>Earned: {achievement.earned}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
