import React from 'react';
import './Pages.css';

function Terms() {
  return (
    <div className="page-container legal-page">
      {/* Hero Section */}
      <section className="page-hero legal-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Legal
          </span>
          <h1>Terms of Service</h1>
          <p>Last updated: December 1, 2025</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="legal-content">
        <div className="section-container">
          <div className="legal-document">
            <div className="legal-toc">
              <h3>Contents</h3>
              <ul>
                <li><a href="#acceptance">1. Acceptance of Terms</a></li>
                <li><a href="#eligibility">2. Eligibility</a></li>
                <li><a href="#account">3. Account Registration</a></li>
                <li><a href="#use">4. Acceptable Use</a></li>
                <li><a href="#content">5. User Content</a></li>
                <li><a href="#safety">6. Safety & Liability</a></li>
                <li><a href="#termination">7. Termination</a></li>
                <li><a href="#changes">8. Changes to Terms</a></li>
                <li><a href="#contact">9. Contact Us</a></li>
              </ul>
            </div>

            <div className="legal-sections">
              <section id="acceptance" className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using Local AIDS ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.</p>
                <p>These Terms constitute a legally binding agreement between you and Local AIDS Pty Ltd ("we," "us," or "our").</p>
              </section>

              <section id="eligibility" className="legal-section">
                <h2>2. Eligibility</h2>
                <p>To use Local AIDS, you must:</p>
                <ul>
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into a binding agreement</li>
                  <li>Be a resident of Australia</li>
                  <li>Not have been previously banned from the Platform</li>
                </ul>
              </section>

              <section id="account" className="legal-section">
                <h2>3. Account Registration</h2>
                <p>To access certain features of the Platform, you must create an account. When creating an account, you agree to:</p>
                <ul>
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section id="use" className="legal-section">
                <h2>4. Acceptable Use</h2>
                <p>You agree to use the Platform only for lawful purposes. You will not:</p>
                <ul>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Post false, misleading, or fraudulent content</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Use the Platform for commercial purposes without authorization</li>
                  <li>Attempt to gain unauthorized access to the Platform</li>
                  <li>Interfere with the proper functioning of the Platform</li>
                  <li>Collect user information without consent</li>
                </ul>
              </section>

              <section id="content" className="legal-section">
                <h2>5. User Content</h2>
                <p>You retain ownership of content you post on the Platform. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with the Platform.</p>
                <p>You are solely responsible for your content and must ensure it:</p>
                <ul>
                  <li>Does not violate any third-party rights</li>
                  <li>Is accurate and not misleading</li>
                  <li>Complies with our Community Guidelines</li>
                  <li>Does not contain illegal or harmful material</li>
                </ul>
              </section>

              <section id="safety" className="legal-section">
                <h2>6. Safety & Liability</h2>
                <p>Local AIDS is a platform that connects users. We do not employ, endorse, or guarantee any users or the services they offer.</p>
                <p>You acknowledge and agree that:</p>
                <ul>
                  <li>Interactions with other users are at your own risk</li>
                  <li>We are not responsible for the conduct of any user</li>
                  <li>We do not guarantee the quality, safety, or legality of services offered</li>
                  <li>You should take appropriate precautions when meeting other users</li>
                </ul>
                <p>To the maximum extent permitted by law, Local AIDS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.</p>
              </section>

              <section id="termination" className="legal-section">
                <h2>7. Termination</h2>
                <p>We reserve the right to suspend or terminate your account at any time for any reason, including:</p>
                <ul>
                  <li>Violation of these Terms</li>
                  <li>Violation of our Community Guidelines</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Conduct harmful to other users or the Platform</li>
                </ul>
                <p>You may terminate your account at any time by contacting us or using the account deletion feature.</p>
              </section>

              <section id="changes" className="legal-section">
                <h2>8. Changes to Terms</h2>
                <p>We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms on the Platform and updating the "Last updated" date.</p>
                <p>Your continued use of the Platform after changes become effective constitutes acceptance of the modified Terms.</p>
              </section>

              <section id="contact" className="legal-section">
                <h2>9. Contact Us</h2>
                <p>If you have questions about these Terms, please contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> legal@localaids.org.au</p>
                  <p><strong>Address:</strong> Local AIDS Pty Ltd, 123 Collins Street, Melbourne VIC 3000</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Terms;
