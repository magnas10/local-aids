import React from 'react';
import './Pages.css';

function Guidelines() {
  const guidelines = [
    {
      icon: '🤝',
      title: 'Respect Everyone',
      description: 'Treat all community members with dignity and respect. Discrimination, harassment, or bullying of any kind is not tolerated.',
      rules: [
        'Use respectful language in all communications',
        'Be patient and understanding with others',
        'Respect cultural, religious, and personal differences',
        'Report any harassment or inappropriate behavior'
      ]
    },
    {
      icon: '✅',
      title: 'Be Reliable',
      description: 'Follow through on your commitments. If you volunteer to help, make sure you show up on time and complete the task.',
      rules: [
        'Only accept tasks you can genuinely complete',
        'Communicate promptly if plans change',
        'Arrive on time for scheduled tasks',
        'Notify others immediately if you need to cancel'
      ]
    },
    {
      icon: '🔒',
      title: 'Protect Privacy',
      description: 'Keep personal information confidential. Don\'t share contact details or personal stories without consent.',
      rules: [
        'Keep all personal information confidential',
        'Don\'t share photos or stories without permission',
        'Use in-app messaging for initial communications',
        'Report any privacy violations immediately'
      ]
    },
    {
      icon: '🛡️',
      title: 'Stay Safe',
      description: 'Your safety is our priority. Follow our safety guidelines and trust your instincts.',
      rules: [
        'Meet in public places when possible',
        'Tell someone about your plans',
        'Don\'t share financial information',
        'Report any suspicious behavior'
      ]
    },
    {
      icon: '💬',
      title: 'Communicate Clearly',
      description: 'Clear communication prevents misunderstandings. Be specific about needs, expectations, and availability.',
      rules: [
        'Describe tasks and needs accurately',
        'Ask questions if something is unclear',
        'Provide feedback after each interaction',
        'Keep all communications appropriate and professional'
      ]
    },
    {
      icon: '⭐',
      title: 'Build Trust',
      description: 'Our community thrives on trust. Be honest, authentic, and contribute positively to our community.',
      rules: [
        'Complete your profile verification',
        'Provide honest ratings and reviews',
        'Report inaccurate profiles or suspicious activity',
        'Support new members in the community'
      ]
    }
  ];

  const prohibited = [
    'Any form of harassment, discrimination, or hate speech',
    'Sharing false or misleading information',
    'Soliciting money or conducting business transactions',
    'Sharing inappropriate or explicit content',
    'Using the platform for illegal activities',
    'Creating multiple or fake accounts',
    'Spamming or excessive promotional content',
    'Violating others\' privacy or safety'
  ];

  return (
    <div className="page-container guidelines-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Community Standards
          </span>
          <h1>Community Guidelines</h1>
          <p>Our guidelines help create a safe, respectful, and supportive community for everyone.</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro-section">
        <div className="section-container">
          <div className="intro-box">
            <h2>Our Community Values</h2>
            <p>
              Local AIDS is built on the principles of kindness, trust, and mutual respect. 
              These guidelines exist to ensure every member feels safe and valued. 
              By joining our community, you agree to uphold these standards in all your interactions.
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Grid */}
      <section className="guidelines-section">
        <div className="section-container">
          <h2>Community Guidelines</h2>
          <div className="guidelines-grid">
            {guidelines.map((guideline, index) => (
              <div key={index} className="guideline-card">
                <div className="guideline-icon">{guideline.icon}</div>
                <h3>{guideline.title}</h3>
                <p>{guideline.description}</p>
                <ul className="guideline-rules">
                  {guideline.rules.map((rule, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Section */}
      <section className="prohibited-section">
        <div className="section-container">
          <div className="prohibited-box">
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
              Prohibited Activities
            </h2>
            <p>The following actions are strictly prohibited and may result in account suspension:</p>
            <ul className="prohibited-list">
              {prohibited.map((item, index) => (
                <li key={index}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Enforcement */}
      <section className="enforcement-section">
        <div className="section-container">
          <h2>How We Enforce Guidelines</h2>
          <div className="enforcement-steps">
            <div className="enforcement-step">
              <div className="step-number">1</div>
              <h3>Report</h3>
              <p>Community members report violations through our platform.</p>
            </div>
            <div className="enforcement-step">
              <div className="step-number">2</div>
              <h3>Review</h3>
              <p>Our team reviews each report thoroughly and fairly.</p>
            </div>
            <div className="enforcement-step">
              <div className="step-number">3</div>
              <h3>Action</h3>
              <p>We take appropriate action based on the severity of the violation.</p>
            </div>
            <div className="enforcement-step">
              <div className="step-number">4</div>
              <h3>Follow-up</h3>
              <p>We inform reporters of actions taken to maintain transparency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Questions About Our Guidelines?</h2>
          <p>If you need clarification or want to report a violation, we're here to help.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Contact Us</a>
            <a href="/help" className="btn-secondary">Visit Help Center</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Guidelines;
