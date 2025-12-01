import React, { useState } from 'react';
import './Pages.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('requests');

  const profileData = {
    user: {
      initials: 'SJ',
      name: 'Sarah Johnson',
      id: 'VOL-2025-001',
      memberSince: 'September 2024'
    },
    requests: [
      {
        id: 1,
        title: 'Grocery Shopping Help',
        date: '2025-01-10',
        status: 'open',
        priority: 'medium',
        volunteer: null
      },
      {
        id: 2,
        title: 'Transport to Doctor',
        date: '2025-01-08',
        status: 'accepted',
        priority: 'high',
        volunteer: 'Mike Chen'
      },
      {
        id: 3,
        title: 'Garden Maintenance',
        date: '2025-01-05',
        status: 'completed',
        priority: 'low',
        volunteer: 'Emma Wilson'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Help with Computer Setup',
        requester: 'Robert Brown',
        date: '2025-01-12',
        distance: '2.3km away',
        status: 'assigned',
        rating: null
      },
      {
        id: 2,
        title: 'Grocery Shopping Assistance',
        requester: 'Mary Davis',
        date: '2025-01-09',
        distance: '1.8km away',
        status: 'completed',
        rating: '5/5 rating received'
      },
      {
        id: 3,
        title: 'Transport to Medical Appointment',
        requester: 'John Smith',
        date: '2025-01-07',
        distance: '3.1km away',
        status: 'completed',
        rating: '5/5 rating received'
      }
    ],
    availability: {
      timePreferences: {
        morning: true,
        afternoon: true,
        evening: false
      },
      dayPreferences: {
        weekdays: true,
        weekends: true
      }
    },
    verification: {
      identity: {
        status: 'verified',
        date: '2024-09-15'
      },
      policeCheck: {
        status: 'review',
        date: '2024-12-20'
      },
      childrenCheck: {
        status: 'required'
      }
    },
    notifications: {
      newRequests: true,
      taskUpdates: true,
      eventReminders: true,
      weeklyDigest: false
    }
  };

  const renderRequests = () => (
    <div className="volunteer-requests-section">
      <div className="volunteer-section-header">
        <h2>My Requests</h2>
        <button className="new-request-btn">+ New Request</button>
      </div>
      <div className="volunteer-requests-list">
        {profileData.requests.map(request => (
          <div key={request.id} className="volunteer-request-card">
            <div className="request-main-info">
              <h3 className="request-title-volunteer">{request.title}</h3>
              <p className="request-date-volunteer">Posted on {request.date}</p>
              {request.volunteer && (
                <p className="request-volunteer-assigned">Volunteer: {request.volunteer}</p>
              )}
            </div>
            <div className="request-status-badges">
              <span className={`volunteer-status-badge status-${request.status}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
              <span className={`volunteer-priority-badge priority-${request.priority}`}>
                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="volunteer-requests-section">
      <div className="volunteer-section-header">
        <h2>My Tasks</h2>
      </div>
      <div className="volunteer-requests-list">
        {profileData.tasks.map(task => (
          <div key={task.id} className="volunteer-request-card">
            <div className="request-main-info">
              <h3 className="request-title-volunteer">{task.title}</h3>
              <p className="request-date-volunteer">Requester: {task.requester}</p>
              <p className="request-volunteer-assigned">{task.date} • {task.distance}</p>
              {task.rating && (
                <p className="task-rating">⭐ {task.rating}</p>
              )}
            </div>
            <div className="request-status-badges">
              <span className={`volunteer-status-badge status-${task.status}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAvailability = () => (
    <div className="volunteer-availability-section">
      <div className="availability-group">
        <h3>Time Preferences</h3>
        <div className="availability-options">
          <div className="volunteer-notification-item">
            <span>Morning (6AM - 12PM)</span>
            <label className="volunteer-toggle-switch">
              <input 
                type="checkbox" 
                checked={profileData.availability.timePreferences.morning}
                readOnly
              />
              <span className="volunteer-toggle-slider"></span>
            </label>
          </div>
          <div className="volunteer-notification-item">
            <span>Afternoon (12PM - 6PM)</span>
            <label className="volunteer-toggle-switch">
              <input 
                type="checkbox" 
                checked={profileData.availability.timePreferences.afternoon}
                readOnly
              />
              <span className="volunteer-toggle-slider"></span>
            </label>
          </div>
          <div className="volunteer-notification-item">
            <span>Evening (6PM - 10PM)</span>
            <label className="volunteer-toggle-switch">
              <input 
                type="checkbox" 
                checked={profileData.availability.timePreferences.evening}
                readOnly
              />
              <span className="volunteer-toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="availability-group">
        <h3>Day Preferences</h3>
        <div className="availability-options">
          <div className="volunteer-notification-item">
            <span>Weekdays (Mon - Fri)</span>
            <label className="volunteer-toggle-switch">
              <input 
                type="checkbox" 
                checked={profileData.availability.dayPreferences.weekdays}
                readOnly
              />
              <span className="volunteer-toggle-slider"></span>
            </label>
          </div>
          <div className="volunteer-notification-item">
            <span>Weekends (Sat - Sun)</span>
            <label className="volunteer-toggle-switch">
              <input 
                type="checkbox" 
                checked={profileData.availability.dayPreferences.weekends}
                readOnly
              />
              <span className="volunteer-toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="volunteer-verification-section">
      <div className="verification-group">
        <h3>Document Verification</h3>
        
        <div className="verification-item verified">
          <div className="verification-icon">✓</div>
          <div className="verification-details">
            <h4>Identity Verification</h4>
            <p>Verified on {profileData.verification.identity.date}</p>
          </div>
        </div>

        <div className="verification-item under-review">
          <div className="verification-icon">⏰</div>
          <div className="verification-details">
            <h4>Police Check</h4>
            <p>Submitted on {profileData.verification.policeCheck.date} - Under review</p>
          </div>
        </div>

        <div className="verification-item required">
          <div className="verification-icon">⚠️</div>
          <div className="verification-details">
            <h4>Working with Children Check</h4>
            <p>Required for activities involving minors</p>
          </div>
          <button className="upload-btn">📄 Upload</button>
        </div>
      </div>
    </div>
  );

  const renderNotificationPreferences = () => (
    <div className="volunteer-notification-preferences">
      <div className="volunteer-notification-header">
        <h3>🔔 Notification Preferences</h3>
      </div>
      <div className="volunteer-notification-options">
        <div className="volunteer-notification-item">
          <span>New volunteer requests in your area</span>
          <label className="volunteer-toggle-switch">
            <input 
              type="checkbox" 
              checked={profileData.notifications.newRequests}
              readOnly
            />
            <span className="volunteer-toggle-slider"></span>
          </label>
        </div>
        <div className="volunteer-notification-item">
          <span>Task updates and messages</span>
          <label className="volunteer-toggle-switch">
            <input 
              type="checkbox" 
              checked={profileData.notifications.taskUpdates}
              readOnly
            />
            <span className="volunteer-toggle-slider"></span>
          </label>
        </div>
        <div className="volunteer-notification-item">
          <span>Event reminders</span>
          <label className="volunteer-toggle-switch">
            <input 
              type="checkbox" 
              checked={profileData.notifications.eventReminders}
              readOnly
            />
            <span className="volunteer-toggle-slider"></span>
          </label>
        </div>
        <div className="volunteer-notification-item">
          <span>Weekly community digest</span>
          <label className="volunteer-toggle-switch">
            <input 
              type="checkbox" 
              checked={profileData.notifications.weeklyDigest}
              readOnly
            />
            <span className="volunteer-toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-page-volunteer">
      <div className="container">
        {/* Profile Header */}
        <div className="volunteer-profile-header">
          <div className="profile-avatar-volunteer">
            <div className="avatar-initials-volunteer">{profileData.user.initials}</div>
          </div>
          <div className="profile-info-volunteer">
            <h1 className="profile-name-volunteer">{profileData.user.name}</h1>
            <p className="profile-id-volunteer">ID: {profileData.user.id}</p>
            <p className="profile-member-since-volunteer">Member since {profileData.user.memberSince}</p>
          </div>
          <button className="edit-profile-btn-volunteer">
            ✏️ Edit Profile
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="volunteer-profile-tabs">
          <button 
            className={`volunteer-tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            My Requests
          </button>
          <button 
            className={`volunteer-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            My Tasks
          </button>
          <button 
            className={`volunteer-tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </button>
          <button 
            className={`volunteer-tab-btn ${activeTab === 'verification' ? 'active' : ''}`}
            onClick={() => setActiveTab('verification')}
          >
            Verification
          </button>
        </div>

        {/* Tab Content */}
        <div className="volunteer-tab-content">
          {activeTab === 'requests' && (
            <>
              {renderRequests()}
              {renderNotificationPreferences()}
            </>
          )}
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'availability' && renderAvailability()}
          {activeTab === 'verification' && renderVerification()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
