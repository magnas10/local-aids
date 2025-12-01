import React from 'react';
import './Pages.css';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about yourself, your skills, and how you want to help or what kind of help you need.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Browse or Post Requests',
      description: 'Find volunteer opportunities near you or post a request for help. Our platform matches you with the right people.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Connect & Communicate',
      description: 'Use our secure messaging system to coordinate details, schedule times, and get to know each other.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Make a Difference',
      description: 'Complete the task, leave feedback, and build your reputation as a trusted community member.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ];

  const features = [
    {
      title: 'Verified Members',
      description: 'All community members go through a verification process for safety.',
      icon: '🛡️'
    },
    {
      title: 'Location-Based Matching',
      description: 'Find opportunities and helpers within your local area.',
      icon: '📍'
    },
    {
      title: 'Secure Messaging',
      description: 'Communicate safely within our platform.',
      icon: '💬'
    },
    {
      title: 'Rating System',
      description: 'Build trust through community feedback and ratings.',
      icon: '⭐'
    }
  ];

  return (
    <div className="page-container how-it-works-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Getting Started
          </span>
          <h1>How Local AIDS Works</h1>
          <p>Connecting those who need help with those who can help. It's simple, safe, and rewarding.</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="section-container">
          <h2>Four Simple Steps</h2>
          <p className="section-subtitle">Getting started is easy. Follow these steps to join our community.</p>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2>Why Choose Local AIDS?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of Australians making a difference in their communities.</p>
          <div className="cta-buttons">
            <a href="/signup" className="btn-primary">Create Account</a>
            <a href="/events" className="btn-secondary">Browse Opportunities</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
