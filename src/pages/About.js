import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function About() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&q=85'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
      bio: 'Former social worker with 15 years of experience in community development.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'James Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
      bio: 'Expert in nonprofit management and volunteer coordination.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
      bio: 'Passionate about building inclusive communities across Australia.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Thompson',
      role: 'Technology Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
      bio: 'Tech innovator focused on creating accessible digital platforms.',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: 'Compassion',
      description: 'We believe in treating every individual with kindness and understanding.',
      color: '#ef4444'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Community',
      description: 'Building stronger neighborhoods through meaningful connections.',
      color: '#3b82f6'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
        </svg>
      ),
      title: 'Inclusivity',
      description: 'Everyone deserves access to help and the opportunity to give back.',
      color: '#10b981'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      title: 'Impact',
      description: 'Focused on creating real, measurable change in people\'s lives.',
      color: '#8b5cf6'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Local AIDS founded in Melbourne', icon: 'launch' },
    { year: '2021', event: 'Expanded to Sydney and Brisbane', icon: 'expand' },
    { year: '2022', event: 'Reached 10,000 volunteer matches', icon: 'milestone' },
    { year: '2023', event: 'Launched mobile app for iOS and Android', icon: 'app' },
    { year: '2024', event: 'Partnered with 500+ community organizations', icon: 'partner' },
    { year: '2025', event: 'Serving all major cities across Australia', icon: 'national' }
  ];

  const partners = [
    { name: 'Red Cross Australia', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop' },
    { name: 'Salvation Army', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop' },
    { name: 'Beyond Blue', logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop' },
    { name: 'Foodbank Australia', logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=100&fit=crop' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-pro">
        <div className="about-hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`about-hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content-pro">
          <span className="about-badge-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Our Story
          </span>
          <h1>Connecting Communities<br/><span className="highlight">Through Kindness</span></h1>
          <p>
            Local AIDS was born from a simple belief: that everyone has something 
            valuable to offer, and everyone deserves a helping hand when they need it.
          </p>
          <div className="about-hero-cta-section">
            <button className="about-hero-btn-primary" onClick={() => navigate('/signup')}>
              Join Our Mission
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </button>
            <div className="about-hero-stats">
              <div className="hero-stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Volunteers</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">120K+</span>
                <span className="stat-label">Lives Changed</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Partners</span>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel Indicators */}
        <div className="about-carousel-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission-pro">
        <div className="mission-container-pro">
          <div className="mission-content-pro" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Our Mission</span>
            <h2>Creating a More Connected & Compassionate Australia</h2>
            <p>
              We're on a mission to build stronger communities by making it easy for 
              volunteers to find meaningful opportunities and for those in need to 
              access help. Every connection we facilitate creates ripples of positive 
              change across the nation.
            </p>
            <div className="mission-features" style={{ justifyContent: 'center', alignItems: 'center' }}>
              <div className="mission-feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <span>Verified Volunteers</span>
              </div>
              <div className="mission-feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <span>24/7 Support</span>
              </div>
              <div className="mission-feature">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-pro">
        <div className="values-container-pro">
          <div className="values-header">
            <span className="section-label">Our Values</span>
            <h2>The Principles That Guide Everything We Do</h2>
          </div>
          <div className="values-grid-pro">
            {values.map((value, index) => (
              <div key={index} className="value-card-pro" style={{'--value-color': value.color}}>
                <div className="value-icon-pro">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline-pro">
        <div className="timeline-container-pro">
          <div className="timeline-header">
            <span className="section-label">Our Journey</span>
            <h2>Milestones That Define Us</h2>
          </div>
          <div className="timeline-pro">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item-pro">
                <div className="timeline-marker-pro">
                  <span>{milestone.year}</span>
                </div>
                <div className="timeline-content-pro">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-pro" style={{ padding: '100px 20px', background: 'white' }}>
        <div className="team-container-pro" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="team-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label" style={{ color: '#20b2aa', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Our Team</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginTop: '12px', marginBottom: '12px', lineHeight: 1.2 }}>Meet the People Behind Local AIDS</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>Passionate individuals dedicated to making a difference</p>
          </div>
          <div className="team-grid-pro" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {team.map((member, index) => (
              <div key={index} className="team-card-pro" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', border: '1px solid #f0f0f0' }}>
                <div className="team-image-wrapper" style={{ position: 'relative', height: '280px', overflow: 'hidden', background: 'linear-gradient(135deg, #f0f0f0, #e8e8e8)' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="team-social" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <a href={member.linkedin} aria-label="LinkedIn" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A66C2' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href={member.twitter} aria-label="Twitter" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DA1F2' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="team-info" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{member.name}</h3>
                  <span className="team-role-pro" style={{ color: '#20b2aa', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</span>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#666', margin: 0 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(to bottom, white, #f8f9fa)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label" style={{ color: '#20b2aa', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted Partners</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginTop: '12px', marginBottom: '60px', lineHeight: 1.2 }}>Organizations We Work With</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', alignItems: 'center' }}>
            {partners.map((partner, index) => (
              <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: 'all 0.3s', border: '1px solid #f0f0f0' }}>
                <img src={partner.logo} alt={partner.name} style={{ width: '100%', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
                <div style={{ marginTop: '12px', fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', height: '500px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=600&fit=crop&q=80" 
            alt="Community volunteers"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(32, 178, 170, 0.7), rgba(22, 163, 154, 0.7))' }}></div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>Ready to Make a Difference?</h2>
          <p style={{ fontSize: '1.15rem', marginBottom: '32px', opacity: 0.95, lineHeight: 1.6 }}>Join thousands of Australians who are building stronger communities together.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ background: 'white', color: '#20b2aa', border: 'none', borderRadius: '8px', padding: '14px 32px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/signup')}>
              Start Volunteering
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', borderRadius: '8px', padding: '12px 32px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(10px)' }} onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
