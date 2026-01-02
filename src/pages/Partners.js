import React from 'react';
import './Pages.css';
import { partnersAPI } from '../services/api';

function Partners() {
  const partners = [
    {
      id: 1,
      name: 'Australian Red Cross',
      logo: '/logos/redcross.svg',
      type: 'Community Partner',
      description: 'Together, we mobilize volunteers during emergencies and natural disasters across Australia.'
    },
    {
      id: 2,
      name: 'Meals on Wheels',
      logo: '/logos/mealsonwheels.svg',
      type: 'Service Partner',
      description: 'Connecting volunteers with seniors who need meal delivery and companionship services.'
    },
    {
      id: 3,
      name: 'Salvation Army',
      logo: '/logos/salvationarmy.svg',
      type: 'Community Partner',
      description: 'Working together to support vulnerable Australians with essential services and support.'
    },
    {
      id: 4,
      name: 'OzHarvest',
      logo: '/logos/ozharvest.svg',
      type: 'Community Partner',
      description: 'Partnering to reduce food waste and support communities in need across Australia.'
    },
    {
      id: 5,
      name: 'St Vincent de Paul',
      logo: '/logos/svdp.svg',
      type: 'Community Partner',
      description: 'Working together to help people in need and combat poverty and disadvantage.'
    },
    {
      id: 6,
      name: 'Lions Clubs Australia',
      logo: '/logos/lions.svg',
      type: 'Community Partner',
      description: 'Expanding volunteer reach in local communities through shared resources and networks.'
    }
  ];

  const partnerBenefits = [
    {
      icon: '•',
      title: 'Expanded Reach',
      description: 'Access our network of 50,000+ community members and volunteers.'
    },
    {
      icon: '•',
      title: 'Technology Platform',
      description: 'Leverage our technology to streamline volunteer coordination.'
    },
    {
      icon: '•',
      title: 'Co-Marketing',
      description: 'Joint marketing and awareness campaigns to amplify impact.'
    },
    {
      icon: '•',
      title: 'Impact Reporting',
      description: 'Detailed analytics and reporting on community impact.'
    }
  ];

  const partnerTypes = [
    {
      title: 'Community Partners',
      description: 'Non-profit organizations working directly with communities',
      icon: '•'
    },
    {
      title: 'Corporate Partners',
      description: 'Businesses supporting community initiatives through CSR programs',
      icon: '•'
    },
    {
      title: 'Government Partners',
      description: 'Local councils and government agencies serving communities',
      icon: '•'
    },
    {
      title: 'Technology Partners',
      description: 'Tech companies helping us improve our platform',
      icon: '💻'
    }
  ];

  return (
    <div className="partners-page-pro">
      {/* Hero Section */}
      <section className="partners-hero-pro">
        <div 
          className="partners-hero-background"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&q=85)'
          }}
        >
          <div className="partners-hero-overlay"></div>
        </div>
        <div className="partners-hero-content-pro">
          <span className="partners-badge-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Stronger Together
          </span>
          <h1>Our<br /><span className="highlight">Partners</span></h1>
          <p>
            Working together with leading organizations to strengthen
            communities across Australia.
          </p>
          <div className="partners-hero-cta-section">
            <button className="partners-hero-btn-primary" onClick={() => document.getElementById('partners-section').scrollIntoView({ behavior: 'smooth' })}>
              Meet Our Partners
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <div className="partners-hero-stats">
              <div className="hero-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Partners</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Network</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section id="partners-section" className="partners-section">
        <div className="section-container">
          <h2>Our Partners</h2>
          <p className="section-subtitle">We're proud to work with these amazing organizations.</p>

          <div className="partners-grid">
            {partners.map((partner) => (
              <div key={partner.id} className="partner-card">
                <div className="partner-logo">
                  <img src={partner.logo} alt={partner.name} />
                </div>
                <span className="partner-type">{partner.type}</span>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="partner-types-section">
        <div className="section-container">
          <h2>Partnership Opportunities</h2>
          <p className="section-subtitle">Different ways to partner with Local Aid.</p>

          <div className="partner-types-grid">
            {partnerTypes.map((type, index) => (
              <div key={index} className="partner-type-card">
                <span className="type-icon">{type.icon}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="section-container">
          <h2>Why Partner With Us?</h2>
          <div className="partner-benefits-grid">
            {partnerBenefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <span className="benefit-icon">{benefit.icon}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Become a Partner</h2>
          <p>Join us in building stronger, more connected communities across Australia.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Get in Touch</a>
            <a href="mailto:partners@localaids.org.au" className="btn-secondary">partners@localaids.org.au</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Partners;
