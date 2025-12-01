import React from 'react';
import './Pages.css';

function Privacy() {
  return (
    <div className="page-container legal-page">
      {/* Hero Section */}
      <section className="page-hero legal-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Privacy
          </span>
          <h1>Privacy Policy</h1>
          <p>Last updated: December 1, 2025</p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="legal-content">
        <div className="section-container">
          <div className="legal-document">
            <div className="legal-toc">
              <h3>Contents</h3>
              <ul>
                <li><a href="#overview">1. Overview</a></li>
                <li><a href="#collection">2. Information We Collect</a></li>
                <li><a href="#use">3. How We Use Your Information</a></li>
                <li><a href="#sharing">4. Information Sharing</a></li>
                <li><a href="#security">5. Data Security</a></li>
                <li><a href="#rights">6. Your Rights</a></li>
                <li><a href="#cookies">7. Cookies</a></li>
                <li><a href="#children">8. Children's Privacy</a></li>
                <li><a href="#changes">9. Policy Changes</a></li>
                <li><a href="#contact">10. Contact Us</a></li>
              </ul>
            </div>

            <div className="legal-sections">
              <section id="overview" className="legal-section">
                <h2>1. Overview</h2>
                <p>Local AIDS Pty Ltd ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
                <p>By using Local AIDS, you consent to the practices described in this policy. We comply with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.</p>
              </section>

              <section id="collection" className="legal-section">
                <h2>2. Information We Collect</h2>
                <h3>Information You Provide</h3>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                  <li><strong>Profile Information:</strong> Photo, bio, skills, availability</li>
                  <li><strong>Location Data:</strong> Suburb, city, state (for matching with nearby users)</li>
                  <li><strong>Communications:</strong> Messages sent through our platform</li>
                  <li><strong>Verification Information:</strong> ID documents for identity verification</li>
                </ul>
                
                <h3>Information Collected Automatically</h3>
                <ul>
                  <li><strong>Device Information:</strong> Device type, operating system, browser type</li>
                  <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
                  <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
                  <li><strong>Cookies:</strong> As described in our Cookie section below</li>
                </ul>
              </section>

              <section id="use" className="legal-section">
                <h2>3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li>Provide and maintain our platform</li>
                  <li>Match you with relevant volunteer opportunities or helpers</li>
                  <li>Process and facilitate connections between users</li>
                  <li>Send notifications about activity, matches, and messages</li>
                  <li>Improve our platform through analytics and research</li>
                  <li>Verify user identities for community safety</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Detect and prevent fraud, abuse, or security issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section id="sharing" className="legal-section">
                <h2>4. Information Sharing</h2>
                <p>We may share your information with:</p>
                <ul>
                  <li><strong>Other Users:</strong> Profile information visible to matched users</li>
                  <li><strong>Service Providers:</strong> Third parties who help us operate the platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                  <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                </ul>
                <p><strong>We never sell your personal information to third parties.</strong></p>
              </section>

              <section id="security" className="legal-section">
                <h2>5. Data Security</h2>
                <p>We implement industry-standard security measures to protect your information:</p>
                <ul>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure servers with access controls</li>
                  <li>Regular security audits and testing</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p>However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>
              </section>

              <section id="rights" className="legal-section">
                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Complaint:</strong> Lodge a complaint with the OAIC</li>
                </ul>
                <p>To exercise these rights, contact us at privacy@localaids.org.au.</p>
              </section>

              <section id="cookies" className="legal-section">
                <h2>7. Cookies</h2>
                <p>We use cookies and similar technologies to:</p>
                <ul>
                  <li>Keep you logged in</li>
                  <li>Remember your preferences</li>
                  <li>Analyze how the platform is used</li>
                  <li>Improve your experience</li>
                </ul>
                <p>You can control cookies through your browser settings. Disabling cookies may affect platform functionality.</p>
              </section>

              <section id="children" className="legal-section">
                <h2>8. Children's Privacy</h2>
                <p>Local AIDS is not intended for users under 18 years of age. We do not knowingly collect information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it.</p>
              </section>

              <section id="changes" className="legal-section">
                <h2>9. Policy Changes</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.</p>
                <p>We encourage you to review this policy periodically.</p>
              </section>

              <section id="contact" className="legal-section">
                <h2>10. Contact Us</h2>
                <p>For privacy-related questions or concerns:</p>
                <div className="contact-info">
                  <p><strong>Privacy Officer</strong></p>
                  <p><strong>Email:</strong> privacy@localaids.org.au</p>
                  <p><strong>Address:</strong> Local AIDS Pty Ltd, 123 Collins Street, Melbourne VIC 3000</p>
                </div>
                <p>For complaints, you may also contact the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
