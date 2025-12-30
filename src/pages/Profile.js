import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { uploadAvatar, deleteAvatar } from '../services/avatarAPI';
import AvatarUpload from '../components/AvatarUpload';
import './Pages.css';
import './ProfessionalProfile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsType, setSettingsType] = useState('');
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);
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
      avatar: user.profileImage || user.avatar || null,
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

  // Handle opening settings modal
  const handleOpenSettings = (type) => {
    setSettingsType(type);
    setShowSettingsModal(true);
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
    <div className="professional-profile-page">
      {/* Professional Header */}
      <div className="profile-professional-header">
        <div className="profile-container">
          <div className="profile-main-info">
            <div className="profile-avatar-section">
              <AvatarUpload 
                user={user} 
                updateUser={updateUser} 
                profileData={profileData} 
              />
              <div className="profile-verification">
                {profileData.verified && <span className="verified-badge">✓ Verified</span>}
              </div>
            </div>
            
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-name">{profileData.name}</h1>
                <span className="profile-role">{profileData.role}</span>
                <div className="profile-status-indicator">
                  <span className="status-dot active"></span>
                  <span className="status-text">Active Member</span>
                </div>
              </div>
              
              <div className="profile-meta">
                <div className="meta-item">
                  <i className="icon-location">📍</i>
                  <span>{profileData.location}</span>
                </div>
                <div className="meta-item">
                  <i className="icon-calendar">📅</i>
                  <span>Member since {profileData.joinDate}</span>
                </div>
                <div className="meta-item">
                  <i className="icon-email">📧</i>
                  <span>{profileData.email}</span>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn-primary-pro" onClick={handleEditProfile}>
                <i className="icon-edit">✏️</i>
                Edit Profile
              </button>
              <button className="btn-secondary-pro">
                <i className="icon-share">📤</i>
                Share
              </button>
              <button className="btn-tertiary-pro">
                <i className="icon-download">⬇️</i>
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Stats */}
      <div className="profile-professional-stats">
        <div className="profile-container">
          <div className="stats-grid-professional">
            <div className="stat-card-pro">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>{profileData.stats.eventsAttended}</h3>
                <p>Events Attended</p>
              </div>
            </div>
            <div className="stat-card-pro">
              <div className="stat-icon">⏰</div>
              <div className="stat-content">
                <h3>{profileData.stats.hoursVolunteered}</h3>
                <p>Hours Contributed</p>
              </div>
            </div>
            <div className="stat-card-pro">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{profileData.stats.peopleHelped}</h3>
                <p>People Helped</p>
              </div>
            </div>
            <div className="stat-card-pro">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>${profileData.stats.donations * 50}</h3>
                <p>Total Contributions</p>
              </div>
            </div>
            <div className="stat-card-pro featured">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>{profileData.stats.rating}</h3>
                <p>Community Rating</p>
                <small>{profileData.stats.reviews} reviews</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Navigation */}
      <div className="profile-navigation-pro">
        <div className="profile-container">
          <nav className="nav-tabs-pro">
            <button 
              className={`nav-tab-pro ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="tab-icon">📊</i>
              Overview
            </button>
            <button 
              className={`nav-tab-pro ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <i className="tab-icon">📈</i>
              Activity
            </button>
            <button 
              className={`nav-tab-pro ${activeTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              <i className="tab-icon">🏆</i>
              Achievements
            </button>
            <button 
              className={`nav-tab-pro ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="tab-icon">⚙️</i>
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Professional Content */}
      <div className="profile-content-professional">
        <div className="profile-container">
          {activeTab === 'overview' && (
            <div className="overview-professional">
              <div className="content-grid-pro">
                {/* Left Column */}
                <div className="content-main-pro">
                  {/* About Section */}
                  <div className="card-professional">
                    <div className="card-header-pro">
                      <h3>About</h3>
                      <button className="edit-section-btn">✏️</button>
                    </div>
                    <div className="card-content-pro">
                      <p className="about-description">{profileData.bio}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="card-professional">
                    <div className="card-header-pro">
                      <h3>Contact Information</h3>
                      <button className="edit-section-btn">✏️</button>
                    </div>
                    <div className="card-content-pro">
                      <div className="contact-grid-pro">
                        <div className="contact-item-pro">
                          <div className="contact-icon-pro">📧</div>
                          <div className="contact-details">
                            <label>Email Address</label>
                            <span>{profileData.email}</span>
                          </div>
                        </div>
                        <div className="contact-item-pro">
                          <div className="contact-icon-pro">📱</div>
                          <div className="contact-details">
                            <label>Phone Number</label>
                            <span>{profileData.phone}</span>
                          </div>
                        </div>
                        <div className="contact-item-pro">
                          <div className="contact-icon-pro">🌐</div>
                          <div className="contact-details">
                            <label>Website</label>
                            <span>{profileData.website || 'Not provided'}</span>
                          </div>
                        </div>
                        <div className="contact-item-pro">
                          <div className="contact-icon-pro">💼</div>
                          <div className="contact-details">
                            <label>LinkedIn</label>
                            <span>{profileData.linkedin || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Expertise */}
                  <div className="card-professional">
                    <div className="card-header-pro">
                      <h3>Skills & Expertise</h3>
                      <button className="add-skill-btn">+ Add Skill</button>
                    </div>
                    <div className="card-content-pro">
                      <div className="skills-grid-pro">
                        {profileData.skills.length > 0 ? (
                          profileData.skills.map((skill, index) => (
                            <span key={index} className="skill-badge-pro">{skill}</span>
                          ))
                        ) : (
                          <p className="empty-state">No skills added yet. Add your first skill to showcase your expertise.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="content-sidebar-pro">
                  {/* Quick Overview */}
                  <div className="card-professional">
                    <div className="card-header-pro">
                      <h3>Profile Overview</h3>
                    </div>
                    <div className="card-content-pro">
                      <div className="overview-items">
                        <div className="overview-item">
                          <span className="overview-label">Role</span>
                          <span className="overview-value role-badge-pro">{profileData.role}</span>
                        </div>
                        <div className="overview-item">
                          <span className="overview-label">Availability</span>
                          <span className="overview-value">{profileData.availability}</span>
                        </div>
                        <div className="overview-item">
                          <span className="overview-label">Languages</span>
                          <div className="languages-pro">
                            {profileData.languages.map((lang, index) => (
                              <span key={index} className="language-badge-pro">{lang}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="card-professional">
                    <div className="card-header-pro">
                      <h3>Recent Activity</h3>
                      <button className="view-all-btn-pro">View All</button>
                    </div>
                    <div className="card-content-pro">
                      <div className="activity-list-pro">
                        {profileData.recentActivity.length > 0 ? (
                          profileData.recentActivity.slice(0, 5).map((activity, index) => (
                            <div key={index} className="activity-item-pro">
                              <div className="activity-icon-pro">{activity.icon}</div>
                              <div className="activity-details">
                                <p className="activity-title-pro">{activity.title}</p>
                                <span className="activity-date-pro">{activity.date}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="empty-activity">
                            <p>No recent activity</p>
                            <small>Start volunteering to see your impact here!</small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="card-professional impact-card-pro">
                    <div className="card-header-pro">
                      <h3>🌟 Impact Summary</h3>
                    </div>
                    <div className="card-content-pro">
                      <div className="impact-metrics">
                        <div className="impact-metric">
                          <span className="impact-number">{profileData.stats.peopleHelped}</span>
                          <span className="impact-label">Lives Touched</span>
                        </div>
                        <div className="impact-metric">
                          <span className="impact-number">{profileData.stats.hoursVolunteered}</span>
                          <span className="impact-label">Hours Contributed</span>
                        </div>
                      </div>
                      <p className="impact-message">Thank you for making a meaningful difference in our community!</p>
                    </div>
                  </div>
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
                <button className="settings-btn" onClick={() => handleOpenSettings('notifications')}>Configure</button>
              </div>
              <div className="settings-card">
                <h4>🔒 Privacy</h4>
                <p>Control who can see your profile</p>
                <button className="settings-btn" onClick={() => handleOpenSettings('privacy')}>Configure</button>
              </div>
              <div className="settings-card">
                <h4>🔑 Security</h4>
                <p>Password and authentication</p>
                <button className="settings-btn" onClick={() => handleOpenSettings('security')}>Configure</button>
              </div>
              <div className="settings-card">
                <h4>📧 Email Preferences</h4>
                <p>Manage email subscriptions</p>
                <button className="settings-btn" onClick={() => handleOpenSettings('email')}>Configure</button>
              </div>
            </div>
          </div>
        )}
      </div>
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

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {settingsType === 'notifications' && '🔔 Notification Settings'}
                {settingsType === 'privacy' && '🔒 Privacy Settings'}
                {settingsType === 'security' && '🔑 Security Settings'}
                {settingsType === 'email' && '📧 Email Preferences'}
              </h3>
              <button className="modal-close-btn" onClick={() => setShowSettingsModal(false)}>×</button>
            </div>
            
            <div className="settings-modal-content">
              {settingsType === 'notifications' && (
                <div className="settings-form">
                  <h4>Notification Preferences</h4>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications for new messages</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Event reminders</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Weekly activity summary</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      <span>Push notifications</span>
                    </label>
                  </div>
                </div>
              )}

              {settingsType === 'privacy' && (
                <div className="settings-form">
                  <h4>Privacy Controls</h4>
                  <div className="setting-item">
                    <label>Profile Visibility</label>
                    <select className="form-control">
                      <option value="public">Public - Anyone can view</option>
                      <option value="members">Members Only</option>
                      <option value="private">Private - Only you</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Show my activity on my profile</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Allow others to message me</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      <span>Show my email on my profile</span>
                    </label>
                  </div>
                </div>
              )}

              {settingsType === 'security' && (
                <div className="settings-form">
                  <h4>Security Settings</h4>
                  <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <input type="password" id="current-password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" id="new-password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" className="form-control" />
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      <span>Enable two-factor authentication</span>
                    </label>
                  </div>
                </div>
              )}

              {settingsType === 'email' && (
                <div className="settings-form">
                  <h4>Email Subscriptions</h4>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Newsletter and updates</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Event announcements</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Community stories</span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      <span>Partner offers and promotions</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Email Frequency</label>
                    <select className="form-control">
                      <option value="daily">Daily</option>
                      <option value="weekly" selected>Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowSettingsModal(false)}>Cancel</button>
                <button type="button" className="btn-primary" onClick={() => {
                  alert('Settings saved successfully!');
                  setShowSettingsModal(false);
                }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
