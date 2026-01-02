import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Terms() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)' }}>
        <div className="page-hero-content">
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">
            Last Updated: January 2, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="legal-content">
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Local AIDS ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Platform.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              Local AIDS is a community-driven platform that connects individuals seeking assistance with volunteers willing to help. We facilitate connections but do not directly provide services or guarantee the quality, safety, or legality of interactions between users.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. User Responsibilities</h2>
            <h3>As a User, you agree to:</h3>
            <ul>
              <li>Provide accurate and truthful information in your profile and requests</li>
              <li>Use the Platform only for lawful purposes</li>
              <li>Treat all community members with respect and dignity</li>
              <li>Follow all safety guidelines and best practices</li>
              <li>Not engage in fraudulent, abusive, or harmful behavior</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Report any suspicious or inappropriate activity</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Prohibited Activities</h2>
            <p>You may not use the Platform to:</p>
            <ul>
              <li>Post false, misleading, or deceptive content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share personal information of others without consent</li>
              <li>Engage in commercial activities or solicitation</li>
              <li>Attempt to circumvent security measures</li>
              <li>Use automated systems to access the Platform</li>
              <li>Violate any applicable local, state, or federal laws</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Content and Intellectual Property</h2>
            <p>
              Users retain ownership of content they post. By posting content, you grant Local AIDS a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on the Platform.
            </p>
            <p>
              All Platform software, design, logos, and trademarks are the property of Local AIDS and are protected by intellectual property laws.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Privacy and Data</h2>
            <p>
              Your use of the Platform is also governed by our <Link to="/privacy">Privacy Policy</Link>. Please review it to understand our data practices.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Liability and Disclaimers</h2>
            <p>
              <strong>THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong> Local AIDS:
            </p>
            <ul>
              <li>Does not guarantee the accuracy or reliability of user-generated content</li>
              <li>Is not responsible for the conduct of users on or off the Platform</li>
              <li>Cannot guarantee the safety of in-person interactions</li>
              <li>Is not liable for any damages arising from your use of the Platform</li>
              <li>Reserves the right to modify or discontinue services at any time</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>8. User Safety</h2>
            <p>
              While we provide safety guidelines and tools, users are ultimately responsible for their own safety. We strongly recommend:
            </p>
            <ul>
              <li>Reading our <Link to="/safety-tips">Safety Tips</Link></li>
              <li>Meeting in public places for first interactions</li>
              <li>Informing friends or family of your plans</li>
              <li>Trusting your instincts and reporting concerns</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>9. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms of Service, engage in harmful behavior, or for any reason at our discretion. Users may also delete their accounts at any time.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Modifications to Terms</h2>
            <p>
              Local AIDS reserves the right to modify these Terms of Service at any time. We will notify users of significant changes via email or Platform notification. Continued use after modifications constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms will be resolved through binding arbitration in accordance with the laws of the jurisdiction where Local AIDS operates. Users waive the right to participate in class-action lawsuits.
            </p>
          </div>

          <div className="legal-section">
            <h2>12. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@localaids.com<br />
              <strong>Address:</strong> Local AIDS Legal Department, [Your Address]
            </p>
          </div>

          <div className="info-card" style={{ marginTop: '40px', background: '#f8f9fa', border: '1px solid #dee2e6' }}>
            <h3 style={{ marginTop: 0 }}>Questions?</h3>
            <p>
              If you have any questions about our Terms of Service, please visit our{' '}
              <Link to="/help-center">Help Center</Link> or <Link to="/contact">contact us</Link> directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Terms;
