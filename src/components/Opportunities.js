import React from 'react';
import './Opportunities.css';

function Opportunities() {
  const opportunities = [
    {
      title: 'Transport to Medical Appointment',
      distance: '2.3km away',
      duration: '2 hours',
      priority: 'High',
      category: 'Transport'
    },
    {
      title: 'Grocery Shopping Assistance',
      distance: '1.8km away',
      duration: '1.5 hours',
      priority: 'Medium',
      category: 'Groceries'
    },
    {
      title: 'Companion for Elderly',
      distance: '3.1km away',
      duration: '3 hours',
      priority: 'Low',
      category: 'Companionship'
    },
    {
      title: 'Help with Technology Setup',
      distance: '4.2km away',
      duration: '1 hour',
      priority: 'Medium',
      category: 'Tech Support'
    }
  ];

  return (
    <section className="opportunities">
      <h2 className="section-title">Latest Opportunities</h2>
      <div className="opportunities-container">
        {opportunities.map((opportunity, index) => (
          <div key={index} className="opportunity-card">
            <h3 className="opportunity-title">{opportunity.title}</h3>
            <p className="opportunity-detail">📍 {opportunity.distance}</p>
            <p className="opportunity-detail">🕐 {opportunity.duration}</p>
            <div className="opportunity-footer">
              <span className={`priority-badge ${opportunity.priority.toLowerCase()}`}>
                {opportunity.priority}
              </span>
              <span className="category-badge">{opportunity.category}</span>
            </div>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Opportunities;
