import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const { user, isLoggedIn, updateUser } = useAuth();
  const navigate = useNavigate();

  // Use actual user data from context with fallback values - memoized to update when user changes
  const profileData = useMemo(() => {
    if (!user) return null;
    return {
      name: user.name || 'User',
      email: user.email || '',
      phone: user.phone || 'Not provided',
      location: user.address ? `${user.address.city || ''}, ${user.address.state || ''}, ${user.address.country || ''}`.replace(/^,\s*|,\s*$/g, '') || 'Location not provided' : 'Location not provided',
      joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently joined',
      role: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member',
      title: user.bio || 'Community Member',
      bio: user.bio || 'No bio provided yet. Update your profile to tell others about yourself.',
      website: user.website || '',
      linkedin: user.linkedin || '',
      verified: user.isVerified || false,
      badges: user.badges || [],
      skills: user.skills || [],
      languages: user.languages || ['English'],
      availability: user.availability || 'Not specified',
      avatar: user.avatar || null,
      stats: {
        eventsAttended: 0,
        hoursVolunteered: 0,
        donations: 0,
        peopleHelped: 0,
        rating: 5.0,
        reviews: 0
      },
      recentActivity: [],
      certifications: []
    };
  }, [user]); // This will recalculate when user changes

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
    }
  }, [isLoggedIn, user, navigate]);

  // Don't render if not logged in or if profileData is not ready
  if (!isLoggedIn || !user || !profileData) {
    return <div>Loading...</div>;
  }

  // Initialize edit form data when modal opens
  const handleEditProfile = () => {
    console.log('Opening edit modal with user data:', user);
    setEditFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      address: {
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        country: user?.address?.country || ''
      }
    });
    setShowEditModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setEditFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      console.log('Sending profile update with data:', editFormData);
      
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        console.log('Profile update successful:', data);
        
        // Update user in context - this will trigger profileData to recalculate
        if (updateUser && data.user) {
          updateUser(data.user);
          console.log('Updated user in context:', data.user);
        } else {
          // Fallback: update localStorage and reload
          localStorage.setItem('user', JSON.stringify(data.user || editFormData));
          window.location.reload();
        }
        
        setShowEditModal(false);
        alert('Profile updated successfully!');
      } else {
        console.error('Profile update failed:', data);
        // Show the specific error message from the server
        const errorMessage = data.message || data.errors?.[0]?.msg || 'Failed to update profile';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Network error updating profile:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="profile-cover">
        <div className="cover-overlay"></div>
        <button className="cover-edit-btn" aria-label="Edit cover photo">
          Edit Cover
        </button>
      </div>

      {/* Profile Header */}
      <div className="profile-header-section">
        <div className="profile-header-container">
          <div className="profile-avatar-large">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt={profileData.name} />
            <button className="avatar-edit-btn" aria-label="Edit profile photo">📷</button>
            {profileData.verified && <span className="verified-badge" title="Verified Volunteer">✓</span>}
          </div>
          <div className="profile-header-info">
            <div className="profile-name-row">
              <h1>{profileData.name}</h1>
              <span className="profile-status online">● Online</span>
            </div>
            <p className="profile-title">{profileData.title}</p>
            <p className="profile-location">📍 {profileData.location}</p>
            <div className="profile-badges">
              {profileData.badges.map((badge, index) => (
                <span key={index} className="badge-tag">{badge}</span>
              ))}
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn-primary" onClick={handleEditProfile}>Edit Profile</button>
            <button className="btn-secondary">Share Profile</button>
            <button className="btn-icon" aria-label="Settings">⚙</button>
          </div>
        </div>
      </div>

      {/* Profile Stats Bar */}
      <div className="profile-stats-bar">
        <div className="stats-bar-container">
          <div className="stat-box">
            <span className="stat-value">{profileData.stats.eventsAttended}</span>
            <span className="stat-title">Events</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{profileData.stats.hoursVolunteered}</span>
            <span className="stat-title">Hours</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{profileData.stats.peopleHelped}</span>
            <span className="stat-title">People Helped</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">${profileData.stats.donations * 50}</span>
            <span className="stat-title">Donated</span>
          </div>
          <div className="stat-box highlight">
            <span className="stat-value">⭐ {profileData.stats.rating}</span>
            <span className="stat-title">{profileData.stats.reviews} Reviews</span>
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
                <p className="about-text">{profileData.bio}</p>
              </div>

              {/* Contact Card */}
              <div className="profile-card-section">
                <h3>Contact Information</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="contact-icon">@</span>
                    <div>
                      <label>Email</label>
                      <p>{profileData.email}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">•</span>
                    <div>
                      <label>Phone</label>
                      <p>{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">•</span>
                    <div>
                      <label>Website</label>
                      <p>{profileData.website || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">•</span>
                    <div>
                      <label>LinkedIn</label>
                      <p>{profileData.linkedin || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="profile-card-section">
                <h3>Skills & Expertise</h3>
                <div className="skills-list">
                  {profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))
                  ) : (
                    <p>No skills added yet. Edit your profile to add skills.</p>
                  )}
                </div>
              </div>

              {/* Languages Card */}
              <div className="profile-card-section">
                <h3>Languages</h3>
                <div className="languages-list">
                  {profileData.languages.map((lang, index) => (
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
                    <span className="info-value role-badge">{profileData.role}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">{profileData.joinDate}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="info-label">Availability</span>
                    <span className="info-value">{profileData.availability}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="profile-card-section">
                <h3>Recent Activity</h3>
                <div className="activity-timeline">
                  {profileData.recentActivity.length > 0 ? (
                    profileData.recentActivity.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <span className="activity-icon">{activity.icon}</span>
                        <div className="activity-content">
                          <p className="activity-title">{activity.title}</p>
                          <span className="activity-date">{activity.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent activity. Start volunteering to see your activity here!</p>
                  )}
                </div>
                <button className="view-all-btn">View All Activity →</button>
              </div>

              {/* Impact Summary */}
              <div className="profile-card-section impact-card">
                <h3>🏆 Impact Summary</h3>
                <div className="impact-stats">
                  <div className="impact-item">
                    <span className="impact-number">{profileData.stats.peopleHelped}</span>
                    <span className="impact-label">Lives Touched</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">{profileData.stats.hoursVolunteered}</span>
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
              {profileData.recentActivity.length > 0 ? (
                profileData.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item-full">
                    <span className="activity-icon-full">{activity.icon}</span>
                    <div className="activity-content-full">
                      <p className="activity-title-full">{activity.title}</p>
                      <span className="activity-date-full">{activity.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No activity recorded yet. Start volunteering to see your activity here!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="certifications-section">
            <h2>Certifications & Training</h2>
            <div className="certifications-grid">
              {profileData.certifications.length > 0 ? (
                profileData.certifications.map((cert, index) => (
                  <div key={index} className="certification-card">
                    <div className="cert-icon">🏆</div>
                    <h4>{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                ))
              ) : (
                <div className="no-certifications">
                  <p>No certifications added yet.</p>
                  <button className="btn-primary">Add Certification</button>
                </div>
              )}
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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="edit-profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editFormData.phone || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editFormData.bio || ''}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell others about yourself..."
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="address.city"
                    value={editFormData.address?.city || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="address.state"
                    value={editFormData.address?.state || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="address.country"
                  value={editFormData.address?.country || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
