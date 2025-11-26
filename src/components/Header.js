import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs for focus management
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key to close dropdowns
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'match',
      title: 'New Volunteer Match!',
      message: 'You\'ve been matched with "Emergency Food Bank" event near you.',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'status',
      title: 'Task Status Updated',
      message: 'Your registration for "Community Health Workshop" has been approved.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Upcoming Event Reminder',
      message: 'Don\'t forget! "Volunteer Training Session" starts tomorrow at 9:00 AM.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 4,
      type: 'match',
      title: 'New Opportunity Available',
      message: 'A new urgent care request is available 3km from your location.',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 5,
      type: 'status',
      title: 'Hours Logged',
      message: 'Your 4 volunteer hours have been verified and added to your profile.',
      time: 'Yesterday',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'match': return '🤝';
      case 'status': return '✅';
      case 'reminder': return '⏰';
      default: return '🔔';
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const closeAllDropdowns = () => {
    setShowDropdown(false);
    setShowNotifications(false);
    setShowSearch(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="header" role="banner">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav className="nav" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="logo" aria-label="Local AIDS Home">
          <div className="logo-icon">🤝</div>
          <span>Local AIDS</span>
        </Link>

        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          aria-current={location.pathname === '/' ? 'page' : undefined}
        >
          <span>Home</span>
        </Link>
        <Link 
          to="/events" 
          className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
          aria-current={location.pathname === '/events' ? 'page' : undefined}
        >
          <span>Events</span>
        </Link>
        <Link 
          to="/about" 
          className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          aria-current={location.pathname === '/about' ? 'page' : undefined}
        >
          <span>About Us</span>
        </Link>
        <Link 
          to="/donate" 
          className={`nav-link ${location.pathname === '/donate' ? 'active' : ''}`}
          aria-current={location.pathname === '/donate' ? 'page' : undefined}
        >
          <span>Donation</span>
        </Link>
        <Link 
          to="/gallery" 
          className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
          aria-current={location.pathname === '/gallery' ? 'page' : undefined}
        >
          <span>Gallery</span>
        </Link>
        <Link 
          to="/contact" 
          className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          aria-current={location.pathname === '/contact' ? 'page' : undefined}
        >
          <span>Contact</span>
        </Link>
        
        {/* Only show Messages when logged in */}
        {isLoggedIn && (
          <Link 
            to="/messages" 
            className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}
            aria-current={location.pathname === '/messages' ? 'page' : undefined}
            aria-label="Messages, 3 unread"
          >
            <span>Messages</span>
            <span className="notification-badge" aria-hidden="true">3</span>
          </Link>
        )}

        <div className="auth-buttons">
          {/* Search Button */}
          <div className="search-dropdown-container" ref={searchRef}>
            <button 
              className="search-btn"
              onClick={() => {
                setShowSearch(!showSearch);
                setShowNotifications(false);
                setShowDropdown(false);
              }}
              aria-label="Search"
              aria-expanded={showSearch}
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">🔍</span>
            </button>
            {showSearch && (
              <div 
                className="search-dropdown" 
                role="dialog" 
                aria-label="Search events and volunteers"
              >
                <form onSubmit={handleSearch} role="search">
                  <label htmlFor="search-input" className="visually-hidden">
                    Search events and volunteers
                  </label>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search events, volunteers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    aria-label="Search query"
                  />
                  <button type="submit" className="search-submit-btn">Search</button>
                </form>
                <div className="search-suggestions" role="menu" aria-label="Quick links">
                  <p className="search-label" id="quick-links-label">Quick Links</p>
                  <Link to="/events" onClick={closeAllDropdowns} role="menuitem">
                    <span aria-hidden="true">🎯</span> Browse Events
                  </Link>
                  <Link to="/events?type=urgent" onClick={closeAllDropdowns} role="menuitem">
                    <span aria-hidden="true">🚨</span> Urgent Requests
                  </Link>
                  <Link to="/events?type=volunteer" onClick={closeAllDropdowns} role="menuitem">
                    <span aria-hidden="true">🤝</span> Volunteer Opportunities
                  </Link>
                  <Link to="/events?type=workshop" onClick={closeAllDropdowns} role="menuitem">
                    <span aria-hidden="true">📚</span> Workshops & Training
                  </Link>
                </div>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <>
              {/* Notifications Bell */}
              <div className="notification-dropdown-container" ref={notificationRef}>
                <button 
                  className="notification-bell-btn"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowDropdown(false);
                  }}
                  aria-label={`Notifications, ${unreadCount} unread`}
                  aria-expanded={showNotifications}
                  aria-haspopup="true"
                >
                  <span aria-hidden="true">🔔</span>
                  {unreadCount > 0 && (
                    <span className="notification-count" aria-hidden="true">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <div 
                    className="notification-dropdown" 
                    role="dialog" 
                    aria-label="Notifications"
                  >
                    <div className="notification-header">
                      <h4 id="notifications-title">Notifications</h4>
                      <button 
                        className="mark-all-read"
                        aria-label="Mark all notifications as read"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div 
                      className="notification-list" 
                      role="list" 
                      aria-labelledby="notifications-title"
                    >
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${notification.unread ? 'unread' : ''}`}
                          role="listitem"
                          tabIndex={0}
                          aria-label={`${notification.unread ? 'Unread: ' : ''}${notification.title}. ${notification.message}. ${notification.time}`}
                        >
                          <span className="notification-icon" aria-hidden="true">
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div className="notification-content">
                            <h5>{notification.title}</h5>
                            <p>{notification.message}</p>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                          {notification.unread && <span className="unread-dot" aria-hidden="true"></span>}
                        </div>
                      ))}
                    </div>
                    <div className="notification-footer">
                      <Link to="/notifications" onClick={closeAllDropdowns}>
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container" ref={profileRef}>
                <button 
                  className="profile-icon-btn" 
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                    setShowNotifications(false);
                  }}
                  aria-label="User menu"
                  aria-expanded={showDropdown}
                  aria-haspopup="menu"
                >
                  <span aria-hidden="true">👤</span>
                </button>
                {showDropdown && (
                  <div 
                    className="profile-dropdown" 
                    role="menu" 
                    aria-label="User menu"
                  >
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      <span aria-hidden="true">👤</span> Profile
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="dropdown-item"
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      <span aria-hidden="true">📊</span> Dashboard
                    </Link>
                    <div className="dropdown-divider" role="separator"></div>
                    <button 
                      className="dropdown-item logout" 
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <span aria-hidden="true">🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="login-btn" aria-label="Log in to your account">Login</button>
              </Link>
              <Link to="/signup">
                <button className="signin-btn" aria-label="Create a new account">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
