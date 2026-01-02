import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNotifications, getUnreadNotificationCount, markNotificationAsRead } from '../services/api';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  
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
        setShowSearch(false);
        setShowNotifications(false);
        setShowDropdown(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Load notifications and unread count
  useEffect(() => {
    if (isLoggedIn) {
      loadUnreadCount();
      loadNotifications();
    }
  }, [isLoggedIn]);

  const loadUnreadCount = async () => {
    try {
      const response = await getUnreadNotificationCount();
      setUnreadCount(response.count || 0);
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await getNotifications({ limit: 10 });
      setNotifications(response.notifications || []);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markNotificationAsRead(notification._id);
        // Update local state
        setNotifications(prev => prev.map(n => 
          n._id === notification._id ? { ...n, isRead: true } : n
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      // Mark all notifications as read locally
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
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
        <Link to="/" className="logo" aria-label="Local Aid Home">
          <img 
            src="/local-aid-logo.png" 
            alt="Local Aid Logo" 
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain'
            }}
          />
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
          to="/gallery" 
          className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
          aria-current={location.pathname === '/gallery' ? 'page' : undefined}
        >
          <span>Gallery</span>
        </Link>
        {/* <Link 
          to="/my-requests" 
          className={`nav-link ${location.pathname === '/my-requests' ? 'active' : ''}`}
          aria-current={location.pathname === '/my-requests' ? 'page' : undefined}
        >
          <span>My Requests</span>
        </Link> */}
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
          to="/partners" 
          className={`nav-link ${location.pathname === '/partners' ? 'active' : ''}`}
          aria-current={location.pathname === '/partners' ? 'page' : undefined}
        >
          <span>Partners</span>
        </Link>
        <Link 
          to="/contact" 
          className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          aria-current={location.pathname === '/contact' ? 'page' : undefined}
        >
          <span>Contact</span>
        </Link>
        {isLoggedIn && (
          <Link 
            to="/messages" 
            className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}
            aria-current={location.pathname === '/messages' ? 'page' : undefined}
          >
            <span>Messages</span>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
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
                  <Link to="/events" onClick={() => setShowDropdown(false)} role="menuitem">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                    <span>Browse Events</span>
                  </Link>
                  <Link to="/events?type=urgent" onClick={() => setShowDropdown(false)} role="menuitem">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <span>Urgent Requests</span>
                  </Link>
                  <Link to="/events?type=volunteer" onClick={() => setShowDropdown(false)} role="menuitem">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span>Volunteer Opportunities</span>
                  </Link>
                  <Link to="/events?type=workshop" onClick={() => setShowDropdown(false)} role="menuitem">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    <span>Workshops & Training</span>
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
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
                      {loadingNotifications ? (
                        <div className="notification-item">
                          <div className="notification-content">
                            <p>Loading notifications...</p>
                          </div>
                        </div>
                      ) : notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification._id} 
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                            role="listitem"
                            tabIndex={0}
                            onClick={() => handleNotificationClick(notification)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="notification-content">
                              <h5>{notification.title}</h5>
                              <p>{notification.message}</p>
                              <span className="notification-time">
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </span>
                              <span className={`notification-type ${notification.type}`}>
                                {notification.type.toUpperCase()}
                              </span>
                            </div>
                            {!notification.isRead && <span className="unread-dot" aria-hidden="true"></span>}
                          </div>
                        ))
                      ) : (
                        <div className="notification-item">
                          <div className="notification-content">
                            <p>No notifications yet</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <div className="notification-actions">
                        <button 
                          className="mark-all-read-btn"
                          onClick={markAllAsRead}
                          style={{
                            width: '100%',
                            padding: '10px',
                            background: '#ff6b35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
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
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name || 'User'} 
                      className="profile-avatar-img"
                      style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                    />
                  ) : (
                    <div className="profile-avatar-placeholder">
                      {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <span>Profile</span>
                    </Link>
                    <Link 
                      to="/my-requests" 
                      className="dropdown-item"
                      onClick={closeAllDropdowns}
                      role="menuitem"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M3 6h18M3 12h18M3 18h18"/>
                      </svg>
                      <span>My Requests</span>
                    </Link>
                    {user && user.role && user.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        className="dropdown-item admin-item"
                        onClick={closeAllDropdowns}
                        role="menuitem"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                          <path d="M12 1l3 6 6 .75-4.12 4.62L17 19l-5-3-5 3 .88-6.63L3 7.75 9 7z"/>
                        </svg>
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <div className="dropdown-divider" role="separator"></div>
                    <button 
                      className="dropdown-item logout" 
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      <span>Logout</span>
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
