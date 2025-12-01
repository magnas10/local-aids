import React from 'react';
import './Pages.css';

function SafetyTips() {
  const safetyTips = [
    {
      category: 'Before Meeting',
      icon: '📋',
      tips: [
        {
          title: 'Verify Profiles',
          description: 'Check ratings, reviews, and verification badges before accepting help or offering to volunteer.',
          important: true
        },
        {
          title: 'Use In-App Messaging',
          description: 'Keep initial conversations within Local AIDS. This protects your privacy and creates a record.',
          important: true
        },
        {
          title: 'Research the Task',
          description: 'Make sure you understand what\'s involved before committing. Ask questions if anything is unclear.'
        },
        {
          title: 'Share Your Plans',
          description: 'Tell a friend or family member about your plans, including who you\'re meeting and where.'
        }
      ]
    },
    {
      category: 'When Meeting',
      icon: '🤝',
      tips: [
        {
          title: 'Meet in Public First',
          description: 'For initial meetings, choose well-lit public places like cafes or community centers.',
          important: true
        },
        {
          title: 'Trust Your Instincts',
          description: 'If something feels off, it\'s okay to leave or decline. Your safety comes first.',
          important: true
        },
        {
          title: 'Bring Your Phone',
          description: 'Keep your phone charged and accessible. Share your location with someone you trust.'
        },
        {
          title: 'Set Boundaries',
          description: 'Be clear about what you\'re comfortable with. It\'s okay to say no to additional requests.'
        }
      ]
    },
    {
      category: 'Protecting Your Information',
      icon: '🔐',
      tips: [
        {
          title: 'Guard Personal Details',
          description: 'Don\'t share your home address, financial information, or ID documents with people you don\'t know well.',
          important: true
        },
        {
          title: 'Use Secure Payments',
          description: 'Local AIDS is free. Never send money to other users or share banking details.'
        },
        {
          title: 'Be Wary of Requests',
          description: 'Be cautious if someone asks for personal information beyond what\'s needed for the task.'
        },
        {
          title: 'Protect Your Online Presence',
          description: 'Consider what personal information is visible on your social media profiles.'
        }
      ]
    },
    {
      category: 'After the Interaction',
      icon: '⭐',
      tips: [
        {
          title: 'Leave Honest Reviews',
          description: 'Your feedback helps others make informed decisions and keeps our community safe.',
          important: true
        },
        {
          title: 'Report Issues',
          description: 'If you experienced anything concerning, report it through the app immediately.'
        },
        {
          title: 'Block if Necessary',
          description: 'You can block users who make you uncomfortable. They won\'t be able to contact you.'
        },
        {
          title: 'Take Care of Yourself',
          description: 'Helping others is rewarding, but remember to set limits and take care of your own wellbeing.'
        }
      ]
    }
  ];

  const emergencyContacts = [
    { name: 'Emergency Services', number: '000', description: 'For life-threatening emergencies' },
    { name: 'Police Assistance', number: '131 444', description: 'For non-urgent police matters' },
    { name: 'Lifeline', number: '13 11 14', description: '24/7 crisis support' },
    { name: 'Local AIDS Support', number: '1800 LOCAL AIDS', description: 'Our support team' }
  ];

  return (
    <div className="page-container safety-tips-page">
      {/* Hero Section */}
      <section className="page-hero safety-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Your Safety Matters
          </span>
          <h1>Safety Tips</h1>
          <p>Your safety is our top priority. Follow these guidelines for a safe and positive experience.</p>
        </div>
      </section>

      {/* Safety Tips Sections */}
      <section className="safety-tips-section">
        <div className="section-container">
          {safetyTips.map((section, index) => (
            <div key={index} className="safety-category">
              <div className="category-header">
                <span className="category-icon">{section.icon}</span>
                <h2>{section.category}</h2>
              </div>
              <div className="tips-grid">
                {section.tips.map((tip, i) => (
                  <div key={i} className={`tip-card ${tip.important ? 'important' : ''}`}>
                    {tip.important && <span className="important-badge">Important</span>}
                    <h3>{tip.title}</h3>
                    <p>{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="emergency-section">
        <div className="section-container">
          <div className="emergency-box">
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Emergency Contacts
            </h2>
            <div className="emergency-contacts-grid">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="emergency-contact">
                  <h3>{contact.name}</h3>
                  <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="emergency-number">
                    {contact.number}
                  </a>
                  <p>{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Report Section */}
      <section className="report-section">
        <div className="section-container">
          <div className="report-box">
            <div className="report-content">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" y1="22" x2="4" y2="15"/>
              </svg>
              <div>
                <h2>See Something? Report It.</h2>
                <p>If you witness or experience any concerning behavior, please report it immediately. Your reports help keep our community safe.</p>
              </div>
            </div>
            <a href="/contact" className="btn-primary">Report an Issue</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Have Safety Questions?</h2>
          <p>Our support team is available to help you stay safe.</p>
          <div className="cta-buttons">
            <a href="/help" className="btn-primary">Visit Help Center</a>
            <a href="/guidelines" className="btn-secondary">Read Guidelines</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SafetyTips;
