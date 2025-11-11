import React from 'react';
import './DonationSection.css';

function DonationSection() {
  const donationOptions = [
    {
      icon: '💚',
      title: 'Fund a Connection',
      amount: '$25',
      description: 'helps us match one volunteer with someone in need'
    },
    {
      icon: '👥',
      title: 'Support 10 Matches',
      amount: '$100',
      description: 'creates meaningful connections for 10 people'
    },
    {
      icon: '🎯',
      title: 'Community Impact',
      amount: '$250',
      description: 'helps us expand to new neighborhoods'
    }
  ];

  return (
    <section className="donation-section">
      <h2 className="section-title">Support Our Community</h2>
      <p className="section-subtitle">
        Your donation helps us connect more volunteers with those in need, maintain our platform,
        and create lasting positive change in communities across Australia.
      </p>
      <div className="donation-options">
        {donationOptions.map((option, index) => (
          <div key={index} className={`donation-card ${index === 1 ? 'featured' : ''}`}>
            <div className="donation-icon">{option.icon}</div>
            <h3 className="donation-title">{option.title}</h3>
            <div className="donation-amount">{option.amount}</div>
            <p className="donation-description">{option.description}</p>
            <button className="donate-btn">Donate Now</button>
          </div>
        ))}
      </div>
      <div className="payment-methods">
        <button className="payment-option">💳 Cards</button>
        <button className="payment-option">PayPal</button>
        <button className="payment-option">🏦 Bank Transfer</button>
      </div>
      <p className="charity-info">
        🔒 100% of your donation goes directly to supporting our community programs.
        We are a registered charity ABN: 12 345 678 901
      </p>
    </section>
  );
}

export default DonationSection;
