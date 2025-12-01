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
            </button>
          </div>

          <div className="hero-trust">
            <span>Trusted by</span>
            <div className="trust-logos">
              <span className="trust-item">Red Cross</span>
              <span className="trust-item">Salvation Army</span>
              <span className="trust-item">OzHarvest</span>
              <span className="trust-item">St Vincent de Paul</span>
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
