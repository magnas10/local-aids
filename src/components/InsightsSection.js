import React from 'react';
import './InsightsSection.css';

function InsightsSection() {
  const insights = [
    { number: '156', label: 'Total Requests' },
    { number: '89', label: 'Active Volunteers' },
    { number: '234', label: 'Tasks Completed' }
  ];

  return (
    <section className="insights-section">
      <h2 className="section-title">Community Insights</h2>
      <div className="insights-container">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card">
            <div className="insight-number">{insight.number}</div>
            <div className="insight-label">{insight.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InsightsSection;
