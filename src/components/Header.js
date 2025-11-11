import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">📅</span>
          <span>Events</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">💬</span>
          <span>Messages</span>
          <span className="notification-badge">3</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </div>
        <button className="get-started-btn">Get Started</button>
      </nav>
    </header>
  );
}

export default Header;
