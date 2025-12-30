import React, { useState } from 'react';
import './Pages.css';
import './ContactPage.css';
import { contactAPI } from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      errors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await contactAPI.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject,
        message: formData.message.trim()
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again later.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterError('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter your email address');
      return;
    }
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid email address');
      return;
    }

    setNewsletterLoading(true);
    try {
      // Subscribe to newsletter - can be implemented with your backend
      await new Promise(resolve => setTimeout(resolve, 800)); // Mock delay

      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    } catch (err) {
      setNewsletterError('Failed to subscribe. Please try again later.');
      console.error('Newsletter error:', err);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Visit Us',
      details: ['123 Community Street', 'Melbourne, VIC 3000', 'Australia']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: 'Email Us',
      details: ['hello@localaids.org.au', 'support@localaids.org.au']
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: 'Call Us',
      details: ['+61 3 9876 5432', 'Mon-Fri: 9am - 5pm AEST']
    }
  ];

  const faqs = [
    {
      question: 'How do I become a volunteer?',
      answer: 'Simply create an account, complete your profile, and browse available opportunities in your area.'
    },
    {
      question: 'How can I request help?',
      answer: 'Click on "Request Help" button, describe what you need, and we\'ll match you with volunteers.'
    },
    {
      question: 'Is there a cost to use Local AIDS?',
      answer: 'No! Our platform is completely free for both volunteers and those seeking help.'
    },
    {
      question: 'How are volunteers verified?',
      answer: 'All volunteers undergo identity verification and can obtain additional certifications through our platform.'
    }
  ];

  return (
    <div className="contact-page-pro">
      {/* Hero Section */}
      <section className="contact-hero-pro">
        <div 
          className="contact-hero-background"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&q=85)'
          }}
        >
          <div className="contact-hero-overlay"></div>
        </div>
        <div className="contact-hero-content-pro">
          <span className="contact-badge-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Get in Touch
          </span>
          <h1>We'd Love to<br /><span className="highlight">Hear From You</span></h1>
          <p>Have questions, suggestions, or want to partner with us? Our team is here to help.</p>
          <div className="contact-hero-cta-section">
            <button className="contact-hero-btn-primary" onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}>
              Send a Message
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <div className="contact-hero-stats">
              <div className="hero-stat">
                <span className="stat-number">24h</span>
                <span className="stat-label">Response Time</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Messages</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section id="contact-form" className="contact-main-pro">
        <div className="contact-container-pro">
          {/* Contact Form */}
          <div className="contact-form-section-pro">
            <div className="contact-card-pro">
              <h2>Send Us a Message</h2>

              {submitted && (
                <div className="success-message-pro" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <p><strong>Thank you!</strong></p>
                    <p>Your message has been sent. We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-message-pro" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form-pro">
                <div className="form-row-pro">
                  <div className="form-group-pro">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      disabled={loading}
                      aria-invalid={!!validationErrors.name}
                      aria-describedby={validationErrors.name ? 'name-error' : undefined}
                    />
                    {validationErrors.name && (
                      <span className="form-error-pro" id="name-error">{validationErrors.name}</span>
                    )}
                  </div>
                  <div className="form-group-pro">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={loading}
                      aria-invalid={!!validationErrors.email}
                      aria-describedby={validationErrors.email ? 'email-error' : undefined}
                    />
                    {validationErrors.email && (
                      <span className="form-error-pro" id="email-error">{validationErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group-pro">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                    aria-invalid={!!validationErrors.subject}
                    aria-describedby={validationErrors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteering Questions</option>
                    <option value="help">Request Help</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="feedback">Feedback</option>
                    <option value="technical">Technical Support</option>
                  </select>
                  {validationErrors.subject && (
                    <span className="form-error-pro" id="subject-error">{validationErrors.subject}</span>
                  )}
                </div>

                <div className="form-group-pro">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows="6"
                    disabled={loading}
                    aria-invalid={!!validationErrors.message}
                    aria-describedby={validationErrors.message ? 'message-error' : undefined}
                  ></textarea>
                  {validationErrors.message && (
                    <span className="form-error-pro" id="message-error">{validationErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn-pro"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-mini"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section-pro">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card-pro">
                <div className="info-icon-pro">{info.icon}</div>
                <div className="info-content-pro">
                  <h3>{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="social-links-card-pro">
              <h3>Follow Us</h3>
              <div className="social-links-pro">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link-pro facebook" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link-pro twitter" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link-pro instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link-pro linkedin" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-pro">
        <div className="map-container-pro">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop&q=80"
            alt="Melbourne city map view"
            className="map-image"
          />
          <div className="map-overlay-pro">
            <div className="map-info-card">
              <h3>Local AIDS Headquarters</h3>
              <p>123 Community Street, Melbourne VIC 3000</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="directions-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-pro">
        <div className="faq-container-pro">
          <div className="faq-header">
            <span className="section-label">Help Center</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid-pro">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card-pro">
                <div className="faq-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="contact-newsletter-pro">
        <div className="newsletter-container-pro">
          {newsletterSubmitted && (
            <div className="success-message-pro" role="alert" style={{ marginBottom: '30px', width: '100%' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <p><strong>Thanks for subscribing!</strong></p>
                <p>Check your email for confirmation.</p>
              </div>
            </div>
          )}

          {newsletterError && (
            <div className="error-message-pro" role="alert" style={{ marginBottom: '30px', width: '100%' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>{newsletterError}</p>
            </div>
          )}

          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest news and volunteer opportunities</p>
          </div>
          <form className="newsletter-form-pro" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                setNewsletterError('');
              }}
              disabled={newsletterLoading}
              required
            />
            <button type="submit" disabled={newsletterLoading} aria-busy={newsletterLoading}>
              {newsletterLoading ? (
                <>
                  <span className="spinner-mini"></span>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
