import React from 'react';
import './Footer.css';

function Footer() {
  const footerLinks = [
    'About Us', 'Causes', 'Volunteers', 'Partners', 
    'FAQ', 'News', 'Reports', 'Terms of Use', 
    'Privacy Policy', 'Contact'
  ];

  return (
    <footer className="footer">
      <div className="footer-links">
        {footerLinks.map((link, index) => (
          <a key={index} href="#" className="footer-link">
            {link}
          </a>
        ))}
      </div>
      <p className="footer-copyright">
        © 2025 Connect Communities Through Kindness. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
