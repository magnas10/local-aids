import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonationSection.css';

function DonationSection() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');

  const impactStats = [
    { value: '$150K+', label: 'Raised This Year' },
    { value: '2,500+', label: 'Donors' },
    { value: '95%', label: 'Goes to Programs' }
  ];

  const donationTiers = [
    {
      amount: 25,
      title: 'Supporter',
      impact: 'Fund 1 volunteer match',
      benefits: ['Thank you email', 'Monthly newsletter', 'Impact updates']
    },
    {
      amount: 100,
      title: 'Champion',
      impact: 'Support 10 community connections',
      benefits: ['All Supporter benefits', 'Donor recognition', 'Annual report'],
      featured: true
    },
    {
      amount: 250,
      title: 'Community Leader',
      impact: 'Expand to new neighborhoods',
      benefits: ['All Champion benefits', 'Event invitations', 'Personal thank you call']
    }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  return (
    <section className="donation-section">
      <div className="donation-wrapper">
        {/* Header */}
        <div className="donation-header">
          <span className="donation-badge">Make a Difference</span>
          <h2>Support Our Community</h2>
          <p>Your generosity helps us connect volunteers with those in need, creating lasting positive change across Australia.</p>
        </div>

        {/* Impact Stats */}
        <div className="impact-stats">
          {impactStats.map((stat, index) => (
            <div key={index} className="impact-stat">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Donation Content */}
        <div className="donation-content">
          {/* Left - Amount Selection */}
          <div className="amount-selection">
            <h3>Choose Your Impact</h3>
            
            <div className="preset-amounts">
              {[25, 50, 100, 250, 500].map((amount) => (
                <button
                  key={amount}
                  className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <span className="currency">$</span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
              />
            </div>

            <div className="donation-frequency">
              <button className="freq-btn active">One-time</button>
              <button className="freq-btn">Monthly</button>
            </div>

            <button className="main-donate-btn" onClick={() => navigate('/donate')}>
              <span>Donate ${customAmount || selectedAmount}</span>
              <span className="btn-arrow">→</span>
            </button>

            <div className="payment-icons">
              <span className="payment-icon">•</span>
              <span className="payment-icon">•</span>
              <span className="payment-icon">🏦</span>
              <span className="secure-text">🔒 Secure payment</span>
            </div>
          </div>

          {/* Right - Donation Tiers */}
          <div className="donation-tiers">
            {donationTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`tier-card ${tier.featured ? 'featured' : ''} ${selectedAmount === tier.amount ? 'selected' : ''}`}
                onClick={() => handleAmountSelect(tier.amount)}
              >
                {tier.featured && <div className="popular-tag">Most Popular</div>}
                <div className="tier-header">
                  <span className="tier-amount">${tier.amount}</span>
                  <span className="tier-title">{tier.title}</span>
                </div>
                <p className="tier-impact">{tier.impact}</p>
                <ul className="tier-benefits">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="trust-section">
          <div className="trust-item">
            <span className="trust-icon">•</span>
            <div>
              <strong>Registered Charity</strong>
              <span>ABN: 12 345 678 901</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">•</span>
            <div>
              <strong>Transparent</strong>
              <span>Full financial reports</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <div>
              <strong>Tax Deductible</strong>
              <span>All donations over $2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationSection;
