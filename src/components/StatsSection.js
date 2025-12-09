import React from 'react';
import './StatsSection.css';

function StatsSection() {
  const stats = [
    { icon: '', number: '247', label: 'Projects' },
    { icon: '', number: '1,842', label: 'Volunteers' },
    { icon: '', number: '$52,340', label: 'Donations' },
    { icon: '', number: '8,950', label: 'Reach' }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
