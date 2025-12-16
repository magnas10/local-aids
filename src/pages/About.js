import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function About() {
  const navigate = useNavigate();
  const heroImage = {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=700&fit=crop',
    alt: 'People volunteering and helping others in community'
  };

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
      bio: 'With 18 years of experience in community development and nonprofit leadership, Sarah founded Local AIDS to address critical service gaps. Her vision transformed volunteer engagement into a scalable, impact-driven platform serving thousands.'
    },
    {
      name: 'Michael Chen',
      role: 'Director of Volunteer Services & Matching',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
      bio: 'Leading strategic volunteer recruitment and placement, Michael brings 12 years of expertise in community engagement. He has pioneered our matching algorithm, achieving a 95% client satisfaction rate across all volunteer partnerships.'
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Community Partnerships & Outreach',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
      bio: 'Emma oversees all community relationships and expansion efforts with 10+ years in nonprofit sector. She has successfully established partnerships with 50+ organizations, expanding our reach to vulnerable populations across multiple regions.'
    },
    {
      name: 'James Wilson',
      role: 'Director of Operations & Technology',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
      bio: 'Overseeing platform technology and operational excellence, James brings 14 years of systems management experience. He ensures our platform scales securely while maintaining the highest standards of data protection and user experience.'
    }
  ];

  const whatWeDo = [
    {
      title: 'Medical Transportation',
      description: 'Safe, reliable transport to hospitals, clinics, and medical appointments with trained, background-checked volunteers who provide compassionate support.',
      icon: '🚗'
    },
    {
      title: 'Shopping & Errands',
      description: 'Assistance with grocery shopping, pharmacy visits, and essential errands for clients with mobility limitations or transportation barriers.',
      icon: '🛒'
    },
    {
      title: 'Companion Visiting',
      description: 'Regular companionship visits to combat isolation, featuring activities like conversation, games, walking, or simply spending quality time together.',
      icon: '🤝'
    },
    {
      title: 'Digital Literacy Training',
      description: 'Comprehensive technology training to help seniors and others access telehealth, connect with family, and navigate essential online services.',
      icon: '📱'
    },
    {
      title: 'Household Support',
      description: 'Light housekeeping, organization, and minor home maintenance tasks to help clients maintain safe, comfortable living environments.',
      icon: '🏠'
    },
    {
      title: 'Community Engagement',
      description: 'Facilitated connections that build lasting relationships, foster belonging, and strengthen the social bonds essential to overall wellbeing.'
      ,
      icon: '❤️'
    }
  ];

  const values = [
    { title: 'Dignity & Respect', description: 'We honor the inherent worth of every individual, treating clients and volunteers as valued community members deserving of compassionate, non-judgmental support.' },
    { title: 'Safety & Trust', description: 'Rigorous volunteer vetting, comprehensive background checks, and continuous training ensure clients receive safe, trustworthy support they can depend on.' },
    { title: 'Community First', description: 'We recognize that sustainable change comes through strong community bonds. Every interaction strengthens our collective social fabric and mutual support networks.' },
    { title: 'Accessibility & Equity', description: 'Our platform removes barriers to help, ensuring vulnerable populations can access support and everyone has opportunities to contribute meaningfully.' }
  ];

  const milestones = [
    { year: '2018', event: 'Founded Local AIDS with mission to serve vulnerable populations. Launched with core team of 5 and pioneering vision.' },
    { year: '2019', event: 'Developed and launched proprietary digital platform connecting volunteers with those in need. First 500 matches completed.' },
    { year: '2020', event: 'Expanded service offerings and established first partnerships. Grew volunteer network to 200+ active members.' },
    { year: '2022', event: 'Achieved 5,000+ successful matches and 1,000+ trained active volunteers across expanding service areas.' },
    { year: '2023', event: 'Launched mobile app (iOS/Android) and expanded to 3 major cities. Recipient of Community Excellence Award.' },
    { year: '2025', event: 'Serving 10,000+ community members with 2,000+ active volunteers. Operating at 97% client satisfaction rate.' }
  ];

  return (
    <>
      {/* Hero Section - Matching Home Page Style */}
      <section className="hero-section">
        <div
          className="hero-carousel"
          style={{
            backgroundImage: `url(${heroImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: 'auto'
          }}
          role="img"
          aria-label={heroImage.alt}
        />
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨ Learn Our Story</span>
            </div>
            <h1 className="hero-title">Connecting People Who Help With People In Need</h1>
            <p className="hero-subtitle">
              We connect thousands of compassionate volunteers with elderly, disabled, and vulnerable community members to provide essential practical support while fostering meaningful relationships that enhance independence, dignity, and quality of life.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn-primary" onClick={() => navigate('/signup')}>Get Involved</button>
              <button className="hero-btn-secondary" onClick={() => navigate('/contact')}>Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="stats-container">
          <div className="stat-box">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Community Members Supported</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Active Volunteers</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">500+</span>
            <span className="stat-label">Partner Organizations</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Crisis Support</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-mission-section">
        <div className="mission-wrapper">
          <div className="section-header">
            <h2>Our Mission & Vision</h2>
            <p>Guiding our work to create meaningful change</p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To bridge critical support gaps by connecting trained, compassionate volunteers with elderly, disabled, and vulnerable community members. We provide accessible, practical assistance—from transportation to medical appointments and grocery shopping to technology support—while fostering meaningful human connections that enhance dignity, independence, and quality of life.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>A resilient, interconnected community where mutual support is woven into the fabric of daily life. Where no vulnerable person is left isolated, where volunteering is recognized as a fundamental civic responsibility, and where acts of compassion create lasting relationships that strengthen the entire social fabric.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Opportunities Style */}
      <section className="what-we-do-section">
        <div className="what-we-do-wrapper">
          <div className="section-header">
            <h2>What We Do</h2>
            <p>Comprehensive support across multiple areas of need</p>
          </div>
          <div className="what-we-do-grid">
            {whatWeDo.map((item, index) => (
              <div key={index} className="what-we-do-card">
                <div className="what-we-do-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values-section">
        <div className="values-wrapper">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>Principles that guide our work every day</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline-section">
        <div className="timeline-wrapper">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our organizational history</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">{milestone.year}</div>
                <div className="timeline-content">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="team-wrapper">
          <div className="section-header">
            <h2>Leadership Team</h2>
            <p>Passionate professionals dedicated to our mission</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Premium Style */}
      <section className="about-cta-section">
        <div className="cta-background">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=600&fit=crop&q=80" 
            alt="Community support"
          />
        </div>
        <div className="cta-overlay"></div>
        <div className="cta-wrapper">
          <h2>Ready to Make a Difference?</h2>
          <p>Join our community of volunteers and supporters making real change happen every day.</p>
          <div className="cta-buttons">
            <button className="cta-btn-primary" onClick={() => navigate('/signup')}>Get Involved Today</button>
            <button className="cta-btn-secondary" onClick={() => navigate('/contact')}>Learn More</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
