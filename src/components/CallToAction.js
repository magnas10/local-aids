import React from 'react';
import './CallToAction.css';

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Join Australia's Kindest Community?</h2>
        <div className="cta-buttons">
          <button className="cta-btn primary">Volunteer</button>
          <button className="cta-btn secondary">Request Help</button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
