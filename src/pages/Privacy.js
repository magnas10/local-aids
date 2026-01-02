import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Privacy() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)' }}>
        <div className="page-hero-content">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">
            Your privacy matters to us. Learn how we collect, use, and protect your data.
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
            <h2>1. Introduction</h2>
            <p>
              Local Aid ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Information We Collect</h2>
            
            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, password, phone number, profile photo</li>
              <li><strong>Profile Details:</strong> Bio, location, skills, interests, volunteer preferences</li>
              <li><strong>Help Requests:</strong> Description of assistance needed, location, contact preferences</li>
              <li><strong>Communications:</strong> Messages sent through the Platform, support inquiries</li>
              <li><strong>Payment Information:</strong> Donation details (processed securely through third-party providers)</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on Platform</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Location Data:</strong> General location based on IP address (with your permission)</li>
              <li><strong>Cookies:</strong> See our <Link to="/cookies">Cookie Policy</Link> for details</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Connect you with volunteers or those seeking help</li>
              <li>Facilitate communication between users</li>
              <li>Process donations and transactions</li>
              <li>Send notifications about activity on your account</li>
              <li>Improve and personalize your experience</li>
              <li>Analyze Platform usage and trends</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
              <li>Send newsletters and updates (with your consent)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. How We Share Your Information</h2>
            
            <h3>We may share your information with:</h3>
            <ul>
              <li><strong>Other Users:</strong> Profile information visible to help facilitate connections</li>
              <li><strong>Service Providers:</strong> Third-party vendors who help operate our Platform (hosting, analytics, email services)</li>
              <li><strong>Payment Processors:</strong> Secure payment gateways for donation processing</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect rights and safety</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
            </ul>

            <h3>We will NOT:</h3>
            <ul>
              <li>Sell your personal information to third parties</li>
              <li>Share your email or phone number without permission</li>
              <li>Use your data for purposes not disclosed in this policy</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Secure password hashing</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal data</li>
              <li>Firewall and intrusion detection systems</li>
            </ul>
            <p>
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
              <li><strong>Restriction:</strong> Request limitation of data processing</li>
              <li><strong>Object:</strong> Object to certain data processing activities</li>
            </ul>
            <p>
              To exercise these rights, contact us at privacy@localaid.com or through your account settings.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain data for legal, security, or operational purposes for up to 90 days.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. For detailed information, please see our <Link to="/cookies">Cookie Policy</Link>.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Third-Party Services</h2>
            <p>
              Our Platform may contain links to third-party websites or integrate with external services. We are not responsible for the privacy practices of these third parties. Please review their privacy policies.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Children's Privacy</h2>
            <p>
              Local Aid is not intended for users under 18 years of age. We do not knowingly collect information from children. If we discover we have collected data from a child, we will delete it promptly.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </div>

          <div className="legal-section">
            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes via email or Platform notification. The "Last Updated" date at the top reflects the most recent revision.
            </p>
          </div>

          <div className="legal-section">
            <h2>13. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <p>
              <strong>Email:</strong> privacy@localaid.com<br />
              <strong>Mail:</strong> Local Aid Privacy Team, [Your Address]<br />
              <strong>Phone:</strong> [Your Phone Number]
            </p>
          </div>

          <div className="info-card" style={{ marginTop: '40px', background: 'rgba(155, 89, 182, 0.05)', border: '2px solid rgba(155, 89, 182, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ fontSize: '3rem' }}>🔒</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginTop: 0 }}>Your Data is Safe</h3>
                <p>
                  We take your privacy seriously and continuously work to protect your information. For more details on how we use cookies, visit our <Link to="/cookies">Cookie Policy</Link>, or review our <Link to="/terms">Terms of Service</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
