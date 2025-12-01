import React from 'react';
import './Pages.css';

function HelpCenter() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Sign Up" button at the top of the page. You can register using your email address or social media accounts. The process takes less than 2 minutes.'
        },
        {
          q: 'Is Local AIDS free to use?',
          a: 'Yes! Local AIDS is completely free for all users. We connect volunteers with those who need help without any fees or charges.'
        },
        {
          q: 'Do I need to verify my identity?',
          a: 'For safety, we encourage all users to complete our verification process. This helps build trust within our community.'
        }
      ]
    },
    {
      category: 'For Those Seeking Help',
      questions: [
        {
          q: 'How do I post a request for help?',
          a: 'After logging in, click "Post a Request" from your dashboard. Describe what you need, when you need it, and provide your location. Volunteers in your area will see your request.'
        },
        {
          q: 'How long does it take to find a volunteer?',
          a: 'Most requests receive responses within 24-48 hours. Urgent requests are highlighted and typically get faster responses.'
        },
        {
          q: 'Can I choose which volunteer helps me?',
          a: 'Yes! You can view volunteer profiles, ratings, and reviews before accepting their offer to help.'
        }
      ]
    },
    {
      category: 'For Volunteers',
      questions: [
        {
          q: 'How do I find volunteer opportunities?',
          a: 'Browse the "Find Opportunities" page to see requests in your area. You can filter by category, distance, and time commitment.'
        },
        {
          q: 'Can I volunteer for multiple tasks?',
          a: 'Absolutely! There\'s no limit to how many people you can help. Just make sure you can commit to each task you accept.'
        },
        {
          q: 'Do I get any recognition for volunteering?',
          a: 'Yes! You earn badges, receive ratings from those you help, and can track your volunteer hours on your profile.'
        }
      ]
    },
    {
      category: 'Safety & Privacy',
      questions: [
        {
          q: 'How do you ensure safety?',
          a: 'We verify user identities, have a rating system, provide in-app messaging, and offer safety guidelines. We never share your personal information without consent.'
        },
        {
          q: 'What if I have a problem with a user?',
          a: 'You can report any concerns through our platform. Our support team reviews all reports and takes appropriate action.'
        },
        {
          q: 'Is my personal information safe?',
          a: 'We use industry-standard encryption and never sell your data. Read our Privacy Policy for full details.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      action: 'support@localaids.org.au'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Available 9am - 5pm AEST'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak to a team member',
      action: '1800 LOCAL AIDS'
    }
  ];

  return (
    <div className="page-container help-center-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Help Center
          </span>
          <h1>How Can We Help You?</h1>
          <p>Find answers to common questions or get in touch with our support team.</p>
          
          {/* Search Box */}
          <div className="help-search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search for help articles..." />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section">
        <div className="section-container">
          <h2>Frequently Asked Questions</h2>
          
          {faqs.map((category, index) => (
            <div key={index} className="faq-category">
              <h3>{category.category}</h3>
              <div className="faq-list">
                {category.questions.map((faq, i) => (
                  <details key={i} className="faq-item">
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="section-container">
          <h2>Still Need Help?</h2>
          <p className="section-subtitle">Our support team is here for you.</p>
          
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-method-card">
                <div className="contact-method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <span className="contact-method-action">{method.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Can't Find What You're Looking For?</h2>
          <p>Send us a message and we'll get back to you as soon as possible.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HelpCenter;
