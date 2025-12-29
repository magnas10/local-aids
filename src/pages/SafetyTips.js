import React, { useState } from 'react';
import './Pages.css';

function SafetyTips() {
  const [activeTab, setActiveTab] = useState('online');

  const safetyCategories = {
    online: {
      title: 'Online Safety',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      tips: [
        {
          title: 'Protect Your Personal Information',
          description: 'Never share sensitive details like your full address, financial information, or passwords.',
          icon: '🔒'
        },
        {
          title: 'Use Platform Messaging',
          description: 'Keep initial conversations within the platform\'s messaging system for security and accountability.',
          icon: '💬'
        },
        {
          title: 'Verify Profiles',
          description: 'Check user profiles, reviews, and ratings before committing to help or requesting assistance.',
          icon: '✓'
        },
        {
          title: 'Trust Your Instincts',
          description: 'If something feels off or too good to be true, it probably is. Don\'t hesitate to decline or report.',
          icon: '🎯'
        }
      ]
    },
    meeting: {
      title: 'Meeting in Person',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      tips: [
        {
          title: 'Choose Public Locations',
          description: 'Meet in well-lit, public places with other people around, especially for first meetings.',
          icon: '🏪'
        },
        {
          title: 'Bring a Friend',
          description: 'Consider bringing someone with you, or at least let someone know where you\'re going and when.',
          icon: '👥'
        },
        {
          title: 'Daytime Meetings',
          description: 'Schedule meetings during daylight hours when possible for added safety and visibility.',
          icon: '☀️'
        },
        {
          title: 'Transportation Safety',
          description: 'Arrange your own transportation and avoid accepting rides from people you don\'t know well.',
          icon: '🚗'
        }
      ]
    },
    transactions: {
      title: 'Financial Safety',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      tips: [
        {
          title: 'No Upfront Payments',
          description: 'Be cautious of requests for money before services are provided. Use secure payment methods.',
          icon: '💳'
        },
        {
          title: 'Document Everything',
          description: 'Keep records of agreements, receipts, and communications related to any transactions.',
          icon: '📝'
        },
        {
          title: 'Report Scams',
          description: 'If you encounter suspicious requests for money or donations, report them immediately.',
          icon: '🚨'
        },
        {
          title: 'Verify Organizations',
          description: 'Research charities and organizations before donating to ensure they\'re legitimate.',
          icon: '🔍'
        }
      ]
    },
    emergencies: {
      title: 'Emergency Situations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      tips: [
        {
          title: 'Know Emergency Numbers',
          description: 'Keep emergency contacts handy: Police (000), Crisis Support (13 11 14), Emergency (000).',
          icon: '📞'
        },
        {
          title: 'Share Your Location',
          description: 'Use location sharing with trusted contacts when meeting someone new or going to unfamiliar places.',
          icon: '📍'
        },
        {
          title: 'Report Immediately',
          description: 'If you feel threatened or unsafe, contact authorities first, then report through our platform.',
          icon: '⚠️'
        },
        {
          title: 'Trust Your Gut',
          description: 'Never feel obligated to stay in a situation that makes you uncomfortable. Your safety comes first.',
          icon: '💪'
        }
      ]
    }
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="safety-hero">
        <div className="safety-hero-content">
          <h1>Safety Tips</h1>
          <p>Your safety is our top priority. Learn how to stay safe while helping and connecting with your community.</p>
        </div>
        <div className="safety-hero-image">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=600&fit=crop&q=80" 
            alt="Safety and security" 
          />
        </div>
      </div>

      {/* Safety Stats */}
      <div className="safety-stats">
        <div className="stat-card">
          <div className="stat-number">99.8%</div>
          <div className="stat-label">Safe Interactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Safety Monitoring</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Verified Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">&lt;2hr</div>
          <div className="stat-label">Response Time</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="safety-tabs">
        {Object.entries(safetyCategories).map(([key, category]) => (
          <button
            key={key}
            className={`safety-tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <span className="tab-icon">{category.icon}</span>
            <span className="tab-title">{category.title}</span>
          </button>
        ))}
      </div>

      {/* Safety Tips Content */}
      <div className="safety-content">
        <h2>{safetyCategories[activeTab].title}</h2>
        <div className="safety-tips-grid">
          {safetyCategories[activeTab].tips.map((tip, index) => (
            <div key={index} className="safety-tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags Section */}
      <div className="red-flags-section">
        <h2>🚩 Warning Signs to Watch For</h2>
        <div className="red-flags-grid">
          <div className="red-flag-card">
            <h4>Pressure to Act Quickly</h4>
            <p>Legitimate requests don't require immediate action. Be wary of urgent demands.</p>
          </div>
          <div className="red-flag-card">
            <h4>Requests for Money</h4>
            <p>Be cautious if someone asks for money, especially before meeting or providing services.</p>
          </div>
          <div className="red-flag-card">
            <h4>Incomplete Profiles</h4>
            <p>Profiles with minimal information, no photo, or no verification should raise concerns.</p>
          </div>
          <div className="red-flag-card">
            <h4>Communication Off-Platform</h4>
            <p>Insistence on moving communication away from the platform can be a warning sign.</p>
          </div>
          <div className="red-flag-card">
            <h4>Too Good to Be True</h4>
            <p>Offers that seem unrealistic or overly generous may be scams.</p>
          </div>
          <div className="red-flag-card">
            <h4>Inconsistent Information</h4>
            <p>Stories or details that change or don't add up should make you cautious.</p>
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="safety-features">
        <h2>Our Safety Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>User Verification</h3>
            <p>Multiple verification methods including email, phone, and government ID options.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3>Report System</h3>
            <p>Easy-to-use reporting system with rapid response from our safety team.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <h3>Secure Messaging</h3>
            <p>Encrypted messaging system keeps your conversations private and secure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3>Rating System</h3>
            <p>User ratings and reviews help build trust and accountability in our community.</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="emergency-contact">
        <h2>Need Immediate Help?</h2>
        <p>If you're in immediate danger, contact emergency services first.</p>
        <div className="emergency-numbers">
          <div className="emergency-number">
            <strong>Emergency Services:</strong> 000
          </div>
          <div className="emergency-number">
            <strong>Crisis Support:</strong> 13 11 14 (Lifeline)
          </div>
          <div className="emergency-number">
            <strong>Our Safety Team:</strong> safety@localaids.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetyTips;
