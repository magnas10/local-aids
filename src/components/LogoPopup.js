import React, { useState, useEffect } from 'react';
import './LogoPopup.css';

function LogoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  // Show popup on first visit or after a certain time interval
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('logoPopupSeen');
    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('logoPopupSeen', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="logo-popup-overlay" onClick={handleClose}>
      <div className="logo-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="logo-popup-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Animated background */}
        <div className="logo-popup-background"></div>

        {/* Logo content */}
        <div className="logo-popup-content">
          {/* Main logo circle */}
          <div className="logo-circle">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-svg"
            >
              {/* Background circle */}
              <circle cx="50" cy="50" r="48" fill="#2bbbad" opacity="0.1" />

              {/* Main teal circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#2bbbad" strokeWidth="2" />

              {/* Heart symbol representing care/help */}
              <path
                d="M50 85 C25 70, 15 55, 15 45 C15 35, 22 28, 30 28 C38 28, 45 35, 50 42 C55 35, 62 28, 70 28 C78 28, 85 35, 85 45 C85 55, 75 70, 50 85 Z"
                fill="#2bbbad"
              />

              {/* Hands supporting symbol */}
              <circle cx="35" cy="60" r="4" fill="#10b981" />
              <circle cx="65" cy="60" r="4" fill="#10b981" />
              <path
                d="M33 63 Q35 70, 37 75 M67 63 Q65 70, 63 75"
                stroke="#10b981"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Organization name */}
          <h1 className="logo-popup-title">Local AIDS</h1>

          {/* Tagline */}
          <p className="logo-popup-tagline">Together We Care, Together We Heal</p>

          {/* Description */}
          <p className="logo-popup-description">
            Providing support, resources, and community for those affected by AIDS
          </p>

          {/* CTA Buttons */}
          <div className="logo-popup-buttons">
            <button className="popup-btn primary-btn" onClick={handleClose}>
              Enter Website
            </button>
            <button className="popup-btn secondary-btn" onClick={handleClose}>
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="logo-popup-decoration decoration-1"></div>
        <div className="logo-popup-decoration decoration-2"></div>
      </div>
    </div>
  );
}

export default LogoPopup;
