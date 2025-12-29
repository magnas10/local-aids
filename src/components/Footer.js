import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const footerColumns = {
    platform: {
      title: 'Platform',
      links: [
        { text: 'How It Works', path: '/about' },
        { text: 'Find Opportunities', path: '/events' },
        { text: 'Post a Request', path: '/signup' },
        { text: 'Success Stories', path: '/blog' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { text: 'Help Center', path: '/help-center' },
        { text: 'Blog', path: '/blog' },
        { text: 'Community Guidelines', path: '/community-guidelines' },
        { text: 'Safety Tips', path: '/safety-tips' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Careers', path: '/contact' },
        { text: 'Press', path: '/contact' },
        { text: 'Partners', path: '/partners' }
      ]
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3>Stay Connected</h3>
            <p>Get updates on community impact and volunteer opportunities</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/local-aid-logo.png"
                alt="Local Aid Logo"
                className="footer-logo-icon"
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              />
              <span className="footer-logo-text">Local AIDS</span>
            </div>
            <p className="footer-tagline">
              Connecting communities through kindness. We help Australians find and offer
              help in their local neighborhoods, building stronger communities together.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerColumns).map((column, index) => (
            <div key={index} className="footer-column">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path} className="footer-link">{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Local AIDS. Connecting Communities Through Kindness. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
