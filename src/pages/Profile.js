import React, { useState } from 'react';
import './Pages.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+61 412 345 678',
    location: 'Melbourne, Victoria, Australia',
    joinDate: 'January 2024',
    role: 'Senior Volunteer',
    title: 'Community Health Advocate',
    bio: 'Passionate about making a difference in my community. Active volunteer and advocate for health awareness. Dedicated to supporting individuals affected by HIV/AIDS through compassionate care and education.',
    website: 'www.johndoe-volunteer.com',
    linkedin: 'linkedin.com/in/johndoe',
    verified: true,
    badges: ['Top Volunteer', 'Community Leader', 'First Responder', '100+ Hours'],
    skills: ['Health Education', 'Patient Support', 'Event Planning', 'Counseling', 'First Aid', 'Transport'],
    languages: ['English', 'Spanish'],
    availability: 'Weekends & Evenings',
    stats: {
      eventsAttended: 47,
      hoursVolunteered: 156,
      donations: 12,
      peopleHelped: 89,
      rating: 4.9,
      reviews: 23
    },
    recentActivity: [
      { type: 'event', title: 'Community Health Workshop', date: 'Nov 20, 2025', icon: '📚' },
      { type: 'volunteer', title: 'Transport to Medical Appointment', date: 'Nov 18, 2025', icon: '🚗' },
      { type: 'donation', title: 'Donated $50 to Food Bank', date: 'Nov 15, 2025', icon: '💚' },
      { type: 'event', title: 'Volunteer Training Session', date: 'Nov 10, 2025', icon: '🎓' },
    ],
    certifications: [
      { name: 'First Aid Certificate', issuer: 'Red Cross Australia', date: 'Valid until Dec 2026' },
      { name: 'Mental Health First Aid', issuer: 'MHFA Australia', date: 'Valid until Mar 2026' },
      { name: 'Community Support Training', issuer: 'Local AIDS', date: 'Completed Jan 2024' },
    ]
  };

  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="profile-cover">
        <div className="cover-overlay"></div>
        <button className="cover-edit-btn" aria-label="Edit cover photo">
          📷 Edit Cover
        </button>
      </div>

      {/* Profile Header */}
      <div className="profile-header-section">
        <div className="profile-header-container">
          <div className="profile-avatar-large">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt={user.name} />
            <button className="avatar-edit-btn" aria-label="Edit profile photo">📷</button>
            {user.verified && <span className="verified-badge" title="Verified Volunteer">✓</span>}
          </div>
          <div className="profile-header-info">
            <div className="profile-name-row">
              <h1>{user.name}</h1>
              <span className="profile-status online">● Online</span>
            </div>
            <p className="profile-title">{user.title}</p>
            <p className="profile-location">📍 {user.location}</p>
            <div className="profile-badges">
              {user.badges.map((badge, index) => (
                <span key={index} className="badge-tag">{badge}</span>
              ))}
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn-primary">Edit Profile</button>
            <button className="btn-secondary">Share Profile</button>
            <button className="btn-icon" aria-label="Settings">⚙️</button>
          </div>
        </div>
      </div>

      {/* Profile Stats Bar */}
      <div className="profile-stats-bar">
        <div className="stats-bar-container">
          <div className="stat-box">
            <span className="stat-value">{user.stats.eventsAttended}</span>
            <span className="stat-title">Events</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{user.stats.hoursVolunteered}</span>
            <span className="stat-title">Hours</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{user.stats.peopleHelped}</span>
            <span className="stat-title">People Helped</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">${user.stats.donations * 50}</span>
            <span className="stat-title">Donated</span>
          </div>
          <div className="stat-box highlight">
            <span className="stat-value">⭐ {user.stats.rating}</span>
            <span className="stat-title">{user.stats.reviews} Reviews</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-main-content">
        {activeTab === 'overview' && (
          <div className="profile-grid">
            {/* Left Column */}
            <div className="profile-left-column">
              {/* About Card */}
              <div className="profile-card-section">
                <h3>About</h3>
                <p className="about-text">{user.bio}</p>
              </div>

              {/* Contact Card */}
              <div className="profile-card-section">
                <h3>Contact Information</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <div>
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <div>
                      <label>Phone</label>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🌐</span>
                    <div>
                      <label>Website</label>
                      <p>{user.website}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">💼</span>
                    <div>
                      <label>LinkedIn</label>
                      <p>{user.linkedin}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="profile-card-section">
                <h3>Skills & Expertise</h3>
                <div className="skills-list">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Languages Card */}
              <div className="profile-card-section">
                <h3>Languages</h3>
                <div className="languages-list">
                  {user.languages.map((lang, index) => (
                    <span key={index} className="language-tag">🌍 {lang}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="profile-right-column">
              {/* Quick Info Card */}
              <div className="profile-card-section">
                <h3>Quick Info</h3>
                <div className="quick-info-list">
                  <div className="quick-info-item">
                    <span className="info-label">Role</span>
                    <span className="info-value role-badge">{user.role}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">{user.joinDate}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="info-label">Availability</span>
                    <span className="info-value">{user.availability}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="profile-card-section">
                <h3>Recent Activity</h3>
                <div className="activity-timeline">
                  {user.recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <span className="activity-icon">{activity.icon}</span>
                      <div className="activity-content">
                        <p className="activity-title">{activity.title}</p>
                        <span className="activity-date">{activity.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">View All Activity →</button>
              </div>

              {/* Impact Summary */}
              <div className="profile-card-section impact-card">
                <h3>🏆 Impact Summary</h3>
                <div className="impact-stats">
                  <div className="impact-item">
                    <span className="impact-number">{user.stats.peopleHelped}</span>
                    <span className="impact-label">Lives Touched</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">{user.stats.hoursVolunteered}</span>
                    <span className="impact-label">Hours Given</span>
                  </div>
                </div>
                <p className="impact-message">Thank you for making a difference!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-full-list">
            <h2>All Activity</h2>
            <div className="activity-timeline-full">
              {user.recentActivity.concat(user.recentActivity).map((activity, index) => (
                <div key={index} className="activity-item-full">
                  <span className="activity-icon-full">{activity.icon}</span>
                  <div className="activity-content-full">
                    <p className="activity-title-full">{activity.title}</p>
                    <span className="activity-date-full">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="certifications-section">
            <h2>Certifications & Training</h2>
            <div className="certifications-grid">
              {user.certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="cert-icon">🎖️</div>
                  <h4>{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              ))}
              <div className="certification-card add-cert">
                <div className="cert-icon">➕</div>
                <h4>Add Certification</h4>
                <p className="cert-issuer">Upload your credentials</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Profile Settings</h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h4>🔔 Notifications</h4>
                <p>Manage your notification preferences</p>
                <button className="settings-btn">Configure</button>
              </div>
              <div className="settings-card">
                <h4>🔒 Privacy</h4>
                <p>Control who can see your profile</p>
                <button className="settings-btn">Configure</button>
              </div>
              <div className="settings-card">
                <h4>🔑 Security</h4>
                <p>Password and authentication</p>
                <button className="settings-btn">Configure</button>
              </div>
              <div className="settings-card">
                <h4>📧 Email Preferences</h4>
                <p>Manage email subscriptions</p>
                <button className="settings-btn">Configure</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
