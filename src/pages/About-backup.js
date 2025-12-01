import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function About() {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      initials: 'SC',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
      bio: 'Former social worker with 15 years of community service experience. Founded the platform after seeing the gap between those who need help and those willing to give it.',
      location: 'Melbourne, VIC'
    },
    {
      name: 'Michael Torres',
      role: 'Head of Community',
      initials: 'MT',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
      bio: 'Community organizer and volunteer coordinator. Ensures our platform maintains safety standards while fostering genuine connections.',
      location: 'Sydney, NSW'
    },
    {
      name: 'Emma Watson',
      role: 'Product Director',
      initials: 'EW',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
      bio: 'UX specialist focused on accessibility. Designs experiences that work for users of all ages and technical abilities.',
      location: 'Brisbane, QLD'
    },
    {
      name: 'David Kim',
      role: 'Safety & Verification',
      initials: 'DK',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
      bio: 'Former police officer specializing in community safety. Develops and maintains our verification and safety protocols.',
      location: 'Perth, WA'
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
      description: 'We believe in the power of human kindness to transform communities and individual lives.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7L12 2z"/>
          <polyline points="8,11 12,15 16,11"/>
        </svg>
      ),
      title: 'Purpose',
      description: 'Every interaction on our platform has the potential to create lasting positive change.'
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
      description: 'Together we are stronger. Building connections that last beyond a single act of service.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          <path d="M13 5.5V7"/>
          <path d="M11 18.5V17"/>
        </svg>
      ),
      title: 'Accessibility',
      description: 'Making help available to everyone, regardless of age, background, or circumstance.'
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Social Impact Award',
      organization: 'Australian Community Service Foundation'
    },
    {
      year: '2024',
      title: 'Best Digital Platform',
      organization: 'National Volunteering Awards'
    },
    {
      year: '2024',
      title: 'Community Choice Award',
      organization: 'Tech for Good Australia'
    }
  ];
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
        <div className="about-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=800&fit=crop&q=80" 
            alt="Volunteers working together"
          />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content-pro">
          <span className="about-badge-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Our Story
          </span>
          <h1>Connecting Communities<br/>Through Kindness</h1>
          <p>
            Local AIDS was born from a simple belief: that everyone has something 
            valuable to offer, and everyone deserves a helping hand when they need it.
          </p>
          <div className="about-hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">50K+</span>
              <span className="hero-stat-label">Volunteers</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">120K+</span>
              <span className="hero-stat-label">Lives Changed</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-label">Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission-pro">
        <div className="mission-container-pro">
          <div className="mission-image-pro">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=700&h=500&fit=crop&q=80" 
              alt="Volunteers helping community" 
            />
            <div className="mission-image-badge">
              <span className="badge-number">5+</span>
              <span className="badge-text">Years of Impact</span>
            </div>
          </div>
          <div className="mission-content-pro">
            <span className="section-label">Our Mission</span>
            <h2>Creating a More Connected & Compassionate Australia</h2>
            <p>
              We're on a mission to build stronger communities by making it easy for 
              volunteers to find meaningful opportunities and for those in need to 
              access help. Every connection we facilitate creates ripples of positive 
              change across the nation.
            </p>
            <div className="mission-features">
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
      <section className="about-team-pro">
        <div className="team-container-pro">
          <div className="team-header">
            <span className="section-label">Our Team</span>
            <h2>Meet the People Behind Local AIDS</h2>
            <p>Passionate individuals dedicated to making a difference</p>
          </div>
          <div className="team-grid-pro">
            {team.map((member, index) => (
              <div key={index} className="team-card-pro">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} />
                  <div className="team-social">
                    <a href={member.linkedin} aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href={member.twitter} aria-label="Twitter">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role-pro">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="about-partners">
        <div className="partners-container">
          <span className="section-label">Trusted Partners</span>
          <h2>Organizations We Work With</h2>
          <div className="partners-logos">
            {partners.map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-pro">
        <div className="about-cta-bg">
          <img 
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=600&fit=crop&q=80" 
            alt="Community volunteers"
          />
          <div className="cta-overlay"></div>
        </div>
        <div className="about-cta-content-pro">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of Australians who are building stronger communities together.</p>
          <div className="about-cta-buttons-pro">
            <button className="cta-btn-primary" onClick={() => navigate('/signup')}>
              Start Volunteering
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
