import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './AdminPages.css';

function AdminContent() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(null);

  const contentSections = [
    { id: 'events', title: 'Manage Events', icon: '📅', color: 'primary', link: '/events' },
    { id: 'gallery', title: 'Gallery Moderation', icon: '🖼️', color: 'info', link: '/gallery' },
    { id: 'announcements', title: 'Announcements', icon: '📢', color: 'success', link: null },
    { id: 'blog', title: 'Blog Posts', icon: '📰', color: 'warning', link: '/blog' },
    { id: 'guidelines', title: 'Community Guidelines', icon: '📋', color: 'secondary', link: '/community-guidelines' },
    { id: 'safety', title: 'Safety Resources', icon: '🔒', color: 'danger', link: '/safety-tips' }
  ];

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
          <div className="admin-badge" style={{ color: '#ffc107' }}>📝 CONTENT MANAGEMENT</div>
          <h1 className="admin-hero-title" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '800' }}>
            Content <span className="highlight" style={{ color: '#ffc107' }}>Management</span>
          </h1>
          <p className="admin-hero-subtitle" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
            Manage platform content, events, galleries, and announcements.
          </p>
        </div>
      </div>

      {/* Content Management Options */}
      <div className="quick-actions" style={{ margin: '30px', padding: '0 20px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2c3e50' }}>📝 Content Management</h3>
        <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {contentSections.map(section => (
            section.link ? (
              <Link 
                key={section.id}
                to={section.link}
                className={`action-btn ${section.color}`}
                style={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '20px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                <span className="action-icon" style={{ fontSize: '1.5rem' }}>{section.icon}</span>
                <span>{section.title}</span>
              </Link>
            ) : (
              <button 
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`action-btn ${section.color}`}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '20px',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <span className="action-icon" style={{ fontSize: '1.5rem' }}>{section.icon}</span>
                <span>{section.title}</span>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Announcements Section */}
      {activeSection === 'announcements' && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', margin: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>📢 Create Announcement</h3>
          <form style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Title:</label>
              <input 
                type="text" 
                placeholder="Enter announcement title"
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Content:</label>
              <textarea 
                placeholder="Enter announcement content"
                rows="6"
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Priority:</label>
              <select style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px' }}>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit"
                style={{ 
                  padding: '12px 30px', 
                  background: '#20b2aa', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Publish Announcement
              </button>
              <button 
                type="button"
                onClick={() => setActiveSection(null)}
                style={{ 
                  padding: '12px 30px', 
                  background: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminContent;