import React from 'react';
import './Pages.css';

function CommunityGuidelines() {
  const guidelines = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: 'Treat Everyone with Respect',
      description: 'Be kind, courteous, and considerate in all interactions. Respect diverse backgrounds, beliefs, and experiences.',
      points: [
        'Use respectful language at all times',
        'Listen actively and empathetically',
        'Avoid discrimination or harassment of any kind',
        'Respect personal boundaries and privacy'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Be Honest and Transparent',
      description: 'Build trust by being truthful in your posts, requests, and communications with community members.',
      points: [
        'Provide accurate information in requests and offers',
        'Be upfront about your capabilities and limitations',
        'Report concerns or issues promptly',
        'Honor your commitments and communicate changes'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: 'Protect Privacy and Safety',
      description: 'Prioritize the safety and privacy of yourself and others in the community.',
      points: [
        'Never share sensitive personal information publicly',
        'Meet in safe, public locations when possible',
        'Trust your instincts and report suspicious behavior',
        'Use the platform\'s messaging system for initial communications'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Foster Inclusivity',
      description: 'Create a welcoming environment where everyone feels valued and included.',
      points: [
        'Welcome newcomers and help them feel at home',
        'Embrace diversity in all its forms',
        'Make your events and offers accessible to all',
        'Challenge exclusionary behavior when you see it'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'Communicate Clearly',
      description: 'Effective communication builds stronger connections and prevents misunderstandings.',
      points: [
        'Be clear and specific in your requests and offers',
        'Respond to messages in a timely manner',
        'Ask questions if something is unclear',
        'Provide updates if plans change'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Take Responsibility',
      description: 'Own your actions and their impact on the community.',
      points: [
        'Follow through on commitments you make',
        'Acknowledge and apologize for mistakes',
        'Accept feedback graciously',
        'Contribute positively to the community culture'
      ]
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="guidelines-hero">
        <div className="guidelines-hero-content">
          <h1>Community Guidelines</h1>
          <p>Building a safe, respectful, and inclusive community together</p>
        </div>
        <div className="guidelines-hero-image">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop&q=80" 
            alt="Community together" 
          />
        </div>
      </div>

      {/* Introduction */}
      <div className="guidelines-intro">
        <h2>Our Commitment to Community</h2>
        <p>
          Local AIDS is built on the foundation of trust, respect, and mutual support. These guidelines 
          help ensure that our platform remains a safe and welcoming space for everyone. By participating 
          in our community, you agree to uphold these values and contribute to a positive environment.
        </p>
      </div>

      {/* Guidelines Grid */}
      <div className="guidelines-grid">
        {guidelines.map((guideline, index) => (
          <div key={index} className="guideline-card">
            <div className="guideline-icon">{guideline.icon}</div>
            <h3>{guideline.title}</h3>
            <p>{guideline.description}</p>
            <ul className="guideline-points">
              {guideline.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Unacceptable Behavior */}
      <div className="guidelines-warning">
        <h2>Unacceptable Behavior</h2>
        <div className="warning-content">
          <p>The following behaviors are not tolerated on our platform:</p>
          <ul>
            <li>Harassment, bullying, or intimidation of any kind</li>
            <li>Discriminatory language or actions based on race, gender, religion, sexual orientation, disability, or any other protected characteristic</li>
            <li>Spam, scams, or fraudulent activities</li>
            <li>Sharing of inappropriate or explicit content</li>
            <li>Violation of privacy or sharing others' personal information without consent</li>
            <li>Violence, threats, or promotion of harmful activities</li>
          </ul>
        </div>
      </div>

      {/* Reporting */}
      <div className="guidelines-reporting">
        <div className="reporting-content">
          <h2>Reporting Violations</h2>
          <p>
            If you witness or experience behavior that violates these guidelines, please report it 
            immediately. We take all reports seriously and investigate them promptly.
          </p>
          <button className="btn-primary">Report an Issue</button>
        </div>
        <div className="reporting-image">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop&q=80" 
            alt="Support and safety" 
          />
        </div>
      </div>

      {/* Consequences */}
      <div className="guidelines-consequences">
        <h2>Consequences of Violations</h2>
        <p>
          Violations of these guidelines may result in warnings, temporary suspension, or permanent 
          removal from the platform, depending on the severity and frequency of the violation. We 
          believe in education and growth, but we also prioritize the safety and wellbeing of our community.
        </p>
      </div>
    </div>
  );
}

export default CommunityGuidelines;
