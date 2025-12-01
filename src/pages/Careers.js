import React from 'react';
import './Pages.css';

function Careers() {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Melbourne, VIC (Hybrid)',
      type: 'Full-time',
      description: 'Join our engineering team to build features that connect communities and improve lives.'
    },
    {
      id: 2,
      title: 'Community Manager',
      department: 'Operations',
      location: 'Sydney, NSW',
      type: 'Full-time',
      description: 'Help grow and nurture our volunteer community across Australia.'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote (Australia)',
      type: 'Full-time',
      description: 'Create intuitive experiences that make helping others as easy as possible.'
    },
    {
      id: 4,
      title: 'Marketing Coordinator',
      department: 'Marketing',
      location: 'Brisbane, QLD (Hybrid)',
      type: 'Full-time',
      description: 'Spread the word about Local AIDS and help us reach more communities.'
    },
    {
      id: 5,
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Remote (Australia)',
      type: 'Part-time',
      description: 'Be the friendly voice that helps our community members navigate the platform.'
    }
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', description: 'Fair compensation that reflects your skills and experience' },
    { icon: '🏠', title: 'Flexible Work', description: 'Remote-friendly with flexible hours and hybrid options' },
    { icon: '🌴', title: 'Generous Leave', description: '25 days annual leave plus public holidays' },
    { icon: '📚', title: 'Learning Budget', description: '$2,000 annual budget for courses and conferences' },
    { icon: '🏥', title: 'Health & Wellness', description: 'Comprehensive health insurance and gym membership' },
    { icon: '👶', title: 'Parental Leave', description: '16 weeks paid parental leave for all parents' },
    { icon: '🎯', title: 'Mission-Driven', description: 'Work that genuinely helps people and communities' },
    { icon: '🚀', title: 'Growth', description: 'Clear career paths and regular promotions' }
  ];

  const values = [
    { title: 'Kindness First', description: 'We lead with empathy in everything we do.' },
    { title: 'Community Focus', description: 'We build for and with our communities.' },
    { title: 'Transparency', description: 'We communicate openly and honestly.' },
    { title: 'Continuous Learning', description: 'We grow together through feedback and experimentation.' }
  ];

  return (
    <div className="page-container careers-page">
      {/* Hero Section */}
      <section className="page-hero careers-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Join Our Team
          </span>
          <h1>Build a Career That Matters</h1>
          <p>Help us connect communities and make a real difference in people's lives across Australia.</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <h2>Why Work With Us?</h2>
          <p className="section-subtitle">We take care of our team so they can take care of our community.</p>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <span className="benefit-icon">{benefit.icon}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="positions-section">
        <div className="section-container">
          <h2>Open Positions</h2>
          <p className="section-subtitle">Join our team and help build the future of community support.</p>
          
          <div className="positions-list">
            {openPositions.map((position) => (
              <div key={position.id} className="position-card">
                <div className="position-info">
                  <h3>{position.title}</h3>
                  <div className="position-meta">
                    <span className="position-department">{position.department}</span>
                    <span className="position-location">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {position.location}
                    </span>
                    <span className="position-type">{position.type}</span>
                  </div>
                  <p>{position.description}</p>
                </div>
                <button className="btn-primary">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Don't See the Right Role?</h2>
          <p>We're always looking for talented people. Send us your resume and we'll keep you in mind.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;
