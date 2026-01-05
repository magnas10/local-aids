import React, { useState } from 'react';
import './Pages.css';

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'account', name: 'Account & Profile', icon: '👤' },
    { id: 'safety', name: 'Safety & Privacy', icon: '🔒' },
    { id: 'donations', name: 'Donations', icon: '💝' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️' }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get started with Local AIDS?',
      answer: 'Getting started is easy! Simply sign up for a free account, complete your profile, and you can start browsing opportunities to help or post your own request for assistance. We recommend verifying your email and adding a profile photo to build trust with the community.'
    },
    {
      category: 'getting-started',
      question: 'What kind of help can I request or offer?',
      answer: 'Our platform supports various types of community help including grocery shopping, yard work, tutoring, companionship, transportation, home repairs, and much more. As long as it\'s legal, safe, and helps build community connections, we welcome it!'
    },
    {
      category: 'account',
      question: 'How do I verify my account?',
      answer: 'Account verification helps build trust in our community. You can verify your account by confirming your email address, adding a phone number, and optionally uploading a government ID. Verified users get a special badge on their profile.'
    },
    {
      category: 'account',
      question: 'Can I edit my profile after creating it?',
      answer: 'Yes! You can edit your profile at any time by clicking on your profile picture and selecting "Edit Profile." You can update your bio, skills, interests, profile photo, and other information.'
    },
    {
      category: 'safety',
      question: 'How does Local AIDS ensure user safety?',
      answer: 'Safety is our top priority. We employ multiple safety measures including user verification, secure messaging, a comprehensive rating system, 24/7 monitoring, and easy reporting tools. We also provide extensive safety guidelines and tips for all users.'
    },
    {
      category: 'safety',
      question: 'What should I do if I feel unsafe?',
      answer: 'If you feel unsafe during any interaction, immediately remove yourself from the situation and contact emergency services if needed (000 in Australia). Then, please report the incident through our platform so we can investigate and take appropriate action.'
    },
    {
      category: 'donations',
      question: 'How do I make a donation?',
      answer: 'You can make a donation by visiting our Donate page and choosing your contribution amount. We accept various payment methods including credit cards, PayPal, and bank transfers. All donations are tax-deductible and go directly toward supporting our community programs.'
    },
    {
      category: 'donations',
      question: 'Where does my donation go?',
      answer: 'Your donations support platform maintenance, safety features, community programs, volunteer training, and helping underserved communities access local support. We maintain full transparency with regular reports on how funds are used.'
    },
    {
      category: 'events',
      question: 'How do I join a community event?',
      answer: 'Browse our Events page to see upcoming community events. Click on any event for more details, then click the "Join Event" button. You\'ll receive confirmation and reminders via email. Some events may require RSVP in advance.'
    },
    {
      category: 'events',
      question: 'Can I organize my own event?',
      answer: 'Yes! Registered users can create events through their dashboard. Provide event details, location, date and time, and what type of help or participation you need. Our team reviews all events to ensure they align with our community guidelines.'
    },
    {
      category: 'technical',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you instructions to reset your password. Make sure to check your spam folder if you don\'t see the email within a few minutes.'
    },
    {
      category: 'technical',
      question: 'The website isn\'t working properly. What should I do?',
      answer: 'First, try refreshing your browser or clearing your cache. Make sure you\'re using an updated browser version. If problems persist, contact our technical support at support@localaids.com with details about the issue, including what browser and device you\'re using.'
    }
  ];

  const quickLinks = [
    { title: 'Create an Account', icon: '✨', link: '/signup' },
    { title: 'Browse Events', icon: '📅', link: '/events' },
    { title: 'Make a Donation', icon: '💝', link: '/donate' },
    { title: 'Community Guidelines', icon: '📋', link: '/community-guidelines' },
    { title: 'Safety Tips', icon: '🛡️', link: '/safety-tips' },
    { title: 'Contact Support', icon: '📧', link: '/contact' }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const searchedFaqs = searchQuery
    ? filteredFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredFaqs;

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="help-hero">
        <h1>Help Center</h1>
        <p>Find answers to your questions and get the support you need</p>
        
        {/* Search Bar */}
        <div className="help-search">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h2>Quick Links</h2>
        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <a key={index} href={link.link} className="quick-link-card">
              <span className="quick-link-icon">{link.icon}</span>
              <span className="quick-link-title">{link.title}</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="help-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {searchedFaqs.length > 0 ? (
          <div className="faq-list">
            {searchedFaqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${expandedFaq === index ? 'active' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`faq-arrow ${expandedFaq === index ? 'rotated' : ''}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No results found for "{searchQuery}". Try different keywords or browse by category.</p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="help-contact">
        <div className="contact-content">
          <h2>Still Need Help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help you.</p>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="method-info">
                <h4>Email Us</h4>
                <p>support@localaids.com</p>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="method-info">
                <h4>Live Chat</h4>
                <p>Available 9am - 5pm AEST</p>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="method-info">
                <h4>Phone Support</h4>
                <p>1300 LOCAL AID</p>
              </div>
            </div>
          </div>
          <a href="/contact" className="btn-primary">Contact Support</a>
        </div>
        <div className="contact-image">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&q=80" 
            alt="Support team" 
          />
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
