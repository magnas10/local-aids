import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Cookies() {
  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'Required for the Platform to function properly. Cannot be disabled.',
      examples: [
        'Authentication tokens',
        'Session management',
        'Security features',
        'Form submission data'
      ],
      duration: 'Session or up to 1 year',
      canDisable: false
    },
    {
      name: 'Analytics Cookies',
      description: 'Help us understand how users interact with the Platform to improve our services.',
      examples: [
        'Page views and navigation',
        'Feature usage statistics',
        'Error tracking',
        'Performance metrics'
      ],
      duration: 'Up to 2 years',
      canDisable: true
    },
    {
      name: 'Functional Cookies',
      description: 'Remember your preferences and settings for a personalized experience.',
      examples: [
        'Language preferences',
        'Display settings',
        'Location preferences',
        'Notification settings'
      ],
      duration: 'Up to 1 year',
      canDisable: true
    },
    {
      name: 'Marketing Cookies',
      description: 'Track your activity to provide relevant content and measure campaign effectiveness.',
      examples: [
        'Newsletter signup tracking',
        'Social media integration',
        'Campaign attribution',
        'Personalized content'
      ],
      duration: 'Up to 1 year',
      canDisable: true
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)' }}>
        <div className="page-hero-content">
          <h1 className="page-title">Cookie Policy</h1>
          <p className="page-subtitle">
            Understanding how we use cookies and similar technologies
          </p>
          <p className="page-subtitle" style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            Last Updated: January 2, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="legal-content">
          <div className="legal-section">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They help websites remember your actions and preferences over time, making your browsing experience more efficient and personalized.
            </p>
          </div>

          <div className="legal-section">
            <h2>How We Use Cookies</h2>
            <p>
              Local Aid uses cookies and similar tracking technologies to:
            </p>
            <ul>
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our Platform</li>
              <li>Improve our services and user experience</li>
              <li>Protect against fraud and abuse</li>
              <li>Deliver relevant content and features</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Types of Cookies We Use</h2>
            <div className="cookie-types-grid">
              {cookieTypes.map((type, index) => (
                <div key={index} className="cookie-type-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>{type.name}</h3>
                    {type.canDisable ? (
                      <span className="badge badge-success">Optional</span>
                    ) : (
                      <span className="badge badge-required">Required</span>
                    )}
                  </div>
                  <p>{type.description}</p>
                  <div style={{ marginTop: '15px' }}>
                    <strong>Examples:</strong>
                    <ul style={{ marginTop: '8px', marginBottom: '15px' }}>
                      {type.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ paddingTop: '15px', borderTop: '1px solid #e0e0e0' }}>
                    <small><strong>Duration:</strong> {type.duration}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="legal-section">
            <h2>Third-Party Cookies</h2>
            <p>
              We may also use third-party services that set their own cookies. These include:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Website usage analytics</li>
              <li><strong>Payment Processors:</strong> Secure payment processing</li>
              <li><strong>Social Media Platforms:</strong> Social sharing features</li>
              <li><strong>Content Delivery Networks:</strong> Fast content delivery</li>
            </ul>
            <p>
              These third parties have their own privacy policies governing their use of cookies.
            </p>
          </div>

          <div className="legal-section">
            <h2>Managing Your Cookie Preferences</h2>
            
            <h3>Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul>
              <li>View and delete existing cookies</li>
              <li>Block all cookies</li>
              <li>Block third-party cookies</li>
              <li>Clear cookies when you close your browser</li>
            </ul>

            <h3>Platform Settings</h3>
            <p>
              You can manage your cookie preferences in your account settings. Note that disabling certain cookies may affect Platform functionality.
            </p>

            <div className="info-card" style={{ marginTop: '20px', background: '#fff3cd', border: '1px solid #ffc107' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{ fontSize: '2rem' }}>⚠️</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>Important Note</h4>
                  <p style={{ margin: 0, color: '#856404' }}>
                    If you block essential cookies, you may not be able to use certain features of the Platform, including logging in to your account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2>Other Tracking Technologies</h2>
            
            <h3>Web Beacons</h3>
            <p>
              Small graphic images (also known as pixel tags) that track whether you've visited a particular page or opened an email.
            </p>

            <h3>Local Storage</h3>
            <p>
              HTML5 local storage allows us to store data locally in your browser for improved performance and offline functionality.
            </p>

            <h3>Session Storage</h3>
            <p>
              Temporary storage that persists only for the duration of your browsing session.
            </p>
          </div>

          <div className="legal-section">
            <h2>Do Not Track Signals</h2>
            <p>
              Some browsers include "Do Not Track" (DNT) features. Currently, there is no industry standard for how to respond to DNT signals. We do not respond to DNT signals at this time.
            </p>
          </div>

          <div className="legal-section">
            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal compliance. We encourage you to review this policy periodically.
            </p>
          </div>

          <div className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies or this policy, please contact us:
            </p>
            <p>
              <strong>Email:</strong> privacy@localaid.com<br />
              <strong>Subject Line:</strong> Cookie Policy Inquiry
            </p>
          </div>

          <div className="info-card" style={{ marginTop: '40px', background: 'rgba(230, 126, 34, 0.05)', border: '2px solid rgba(230, 126, 34, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ fontSize: '3rem' }}>🍪</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginTop: 0 }}>Cookie Consent</h3>
                <p>
                  By continuing to use Local Aid, you consent to our use of cookies as described in this policy. You can change your preferences at any time through your browser or account settings.
                </p>
                <div style={{ marginTop: '15px' }}>
                  <Link to="/privacy" style={{ marginRight: '20px' }}>Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cookies;
