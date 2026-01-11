import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CallToAction.css';

function CallToAction() {
  const navigate = useNavigate();
  const features = [
    { icon: '•', text: 'Connect with neighbors' },
    { icon: '•', text: 'Quick & easy signup' },
    { icon: '✓', text: 'Free forever' }
  ];

  return (
    <section className="cta-section">
      <div className="cta-wrapper">
        {/* Background Elements */}
        <div className="cta-bg-pattern"></div>
        
        <div className="cta-content">
          <span className="cta-badge">• Join 50,000+ Australians</span>
          <h2 className="cta-title">Ready to Make a Difference<br/>in Your Community?</h2>
          <p className="cta-subtitle">
            Whether you want to volunteer your time or need a helping hand, 
            Local Aid connects you with your community.
          </p>

          <div className="cta-features">
            {features.map((feature, index) => (
              <div key={index} className="cta-feature">
                <span className="feature-icon">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => navigate('/events')}>
              <span>Start Volunteering</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="cta-btn secondary" onClick={() => navigate('/request-help')}>
              <span>Request Help</span>
            </button>
          </div>

          <p className="cta-note">
            ✓ No credit card required &nbsp; ✓ Takes 2 minutes to sign up
          </p>
        </div>

        {/* Floating Stats */}
        <div className="floating-stats">
          <div className="floating-stat left">
            <span className="stat-number">15K+</span>
            <span className="stat-text">Active Volunteers</span>
          </div>
          <div className="floating-stat right">
            <span className="stat-number">98%</span>
            <span className="stat-text">Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
