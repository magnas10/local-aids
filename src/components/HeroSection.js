import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RequestHelpModal from './RequestHelpModal';
import './HeroSection.css';

function HeroSection() {
  const { isLoggedIn } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&h=700&fit=crop',
      alt: 'Volunteers helping community'
    },
    {
      url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1400&h=700&fit=crop',
      alt: 'Food bank volunteers'
    },
    {
      url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&h=700&fit=crop',
      alt: 'Community support'
    },
    {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=700&fit=crop',
      alt: 'Healthcare volunteers'
    },
    {
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&h=700&fit=crop',
      alt: 'Helping elderly'
    },
    {
      url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1400&h=700&fit=crop',
      alt: 'Donation and charity'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section">
      {/* Background Image Carousel */}
      <div className="hero-carousel">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.url})` }}
            aria-hidden={index !== currentSlide}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">🇦🇺 Australia's #1 Volunteer Network</span>
          <h1 className="hero-title">
            Connect Communities<br />
            <span className="highlight">Through Kindness</span>
          </h1>
          <p className="hero-subtitle">
            Join Australia's largest volunteer network. Help your neighbors, make a
            difference, and build stronger communities together.
          </p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">10K+</span>
              <span className="stat-text">Volunteers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">500+</span>
              <span className="stat-text">Communities</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">25K+</span>
              <span className="stat-text">People Helped</span>
            </div>
          </div>

          <div className="hero-buttons">
            {!isLoggedIn ? (
              <Link to="/signup" className="hero-btn-primary">
                Start Volunteering
                <span className="btn-arrow">→</span>
              </Link>
            ) : (
              <Link to="/events" className="hero-btn-primary">
                Find Opportunities
                <span className="btn-arrow">→</span>
              </Link>
            )}
            <button className="hero-btn-secondary" onClick={() => setIsModalOpen(true)}>
              Request Help
              <span className="btn-icon">🤝</span>
            </button>
          </div>

          <div className="hero-trust">
            <span>Trusted by</span>
            <div className="trust-logos">
              <a href="https://www.redcross.org.au" target="_blank" rel="noopener noreferrer" className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M19 9h-4V5c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1z"/>
                </svg>
              </a>
              <a href="https://www.salvationarmy.org.au" target="_blank" rel="noopener noreferrer" className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                </svg>
              </a>
              <a href="https://www.ozharvest.org" target="_blank" rel="noopener noreferrer" className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </a>
              <a href="https://www.vinnies.org.au" target="_blank" rel="noopener noreferrer" className="trust-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Request Help Modal */}
      <RequestHelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default HeroSection;
