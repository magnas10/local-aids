import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Connect Communities Through Kindness</h1>
        <p className="hero-subtitle">
          Join Australia's largest volunteer network. Help your neighbors, make a
          difference, and build stronger communities together.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Start Volunteering</button>
          <button className="btn-secondary">Request Help</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
