import React, { useState, useEffect } from 'react';
import './Pages.css';

function Partners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedPartner, setExpandedPartner] = useState(null);

  const heroImages = [
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1920&h=1080&fit=crop&q=85'
  ];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Get unique partner types
  const partnerTypesList = ['All', ...new Set(partners.map(p => p.type))];

  // Filter partners based on search and type
  useEffect(() => {
    let filtered = partners;

    if (selectedType !== 'All') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPartners(filtered);
  }, [searchTerm, selectedType]);

  const partnerBenefits = [
    {
      icon: '✓',
      title: 'Expanded Reach',
      description: 'Access our network of 50,000+ community members and volunteers.'
    },
    {
      icon: '✓',
      title: 'Technology Platform',
      description: 'Leverage our technology to streamline volunteer coordination.'
    },
    {
      icon: '✓',
      title: 'Co-Marketing',
      description: 'Joint marketing and awareness campaigns to amplify impact.'
    },
    {
      icon: '✓',
      title: 'Impact Reporting',
      description: 'Detailed analytics and reporting on community impact.'
    }
  ];

  const partnerTypes = [
    {
      title: 'Community Partners',
      description: 'Non-profit organizations working directly with communities',
      icon: '🤝'
    },
    {
      title: 'Corporate Partners',
      description: 'Businesses supporting community initiatives through CSR programs',
      icon: '💼'
    },
    {
      title: 'Government Partners',
      description: 'Local councils and government agencies serving communities',
      icon: '🏛️'
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
        <div className="partners-hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`partners-hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="partners-hero-overlay"></div>
        </div>
        <div className="partners-hero-content-pro">
          <span className="partners-badge-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Stronger Together
          </span>
          <h1>Our<br/><span className="highlight">Partners</span></h1>
          <p>
            Working together with leading organizations to strengthen 
            communities across Australia.
          </p>
          <div className="partners-hero-cta-section">
            <button className="partners-hero-btn-primary" onClick={() => document.getElementById('partners-section').scrollIntoView({ behavior: 'smooth' })}>
              Meet Our Partners
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
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
        {/* Carousel Indicators */}
        <div className="partners-carousel-indicators">
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

      {/* Current Partners */}
      <section id="partners-section" className="partners-section">
        <div className="section-container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <span style={{color: '#20B2AA', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '15px'}}>Our Community</span>
            <h2>Our Partners</h2>
            <p className="section-subtitle">Discover the organizations we collaborate with to create impact.</p>
          </div>
          
          {/* Search and Filter Controls */}
          <div style={styles.filtersContainer}>
            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <svg style={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>

            <div style={styles.filterButtons}>
              {partnerTypesList.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    ...styles.filterButton,
                    ...(selectedType === type ? styles.filterButtonActive : {})
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Partners Grid */}
          <div className="partners-grid">
            {filteredPartners.length > 0 ? (
              filteredPartners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="partner-card"
                  onClick={() => setExpandedPartner(expandedPartner === partner.id ? null : partner.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="partner-logo">
                    <img src={partner.logo} alt={partner.name} />
                  </div>
                  <span className="partner-type">{partner.type}</span>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                  {expandedPartner === partner.id && (
                    <div style={styles.expandedContent}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '/contact';
                        }}
                        style={styles.inquireBtn}
                      >
                        Inquire About Partnership →
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={styles.noResults}>
                <p>No partners found matching your search. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="partner-types-section">
        <div className="section-container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <span style={{color: '#20B2AA', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '15px'}}>Partnership Types</span>
            <h2>Partnership Opportunities</h2>
            <p className="section-subtitle">Different ways to partner with Local AIDS.</p>
          </div>
          
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
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <span style={{color: '#20B2AA', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '15px'}}>Key Benefits</span>
            <h2>Why Partner With Us?</h2>
          </div>
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
          <span style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '15px'}}>Ready to Make an Impact?</span>
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

const styles = {
  filtersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '50px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '0 auto',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    padding: '14px 40px 14px 16px',
    fontSize: '0.95rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  'searchInput:focus': {
    borderColor: '#0091d9',
    boxShadow: '0 0 0 3px rgba(0, 145, 217, 0.1)',
  },
  searchIcon: {
    position: 'absolute',
    right: '12px',
    width: '20px',
    height: '20px',
    color: '#999',
    pointerEvents: 'none',
  },
  filterButtons: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '10px 20px',
    border: '2px solid #E5E7EB',
    background: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: '#666',
  },
  filterButtonActive: {
    background: '#20B2AA',
    color: 'white',
    borderColor: '#20B2AA',
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#999',
  },
  expandedContent: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '2px solid #e0e0e0',
    animation: 'slideDown 0.3s ease',
  },
  inquireBtn: {
    background: 'linear-gradient(135deg, #20B2AA, #0D6B66)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    width: '100%',
  },
};

export default Partners;
