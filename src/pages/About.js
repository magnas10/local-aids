import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function About() {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      initials: 'SC',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
      bio: 'Former social worker with 15 years of community service experience. Founded the platform after seeing the gap between those who need help and those willing to give it.',
      location: 'Melbourne, VIC'
    },
    {
      name: 'Michael Torres',
      role: 'Head of Community',
      initials: 'MT',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
      bio: 'Community organizer and volunteer coordinator. Ensures our platform maintains safety standards while fostering genuine connections.',
      location: 'Sydney, NSW'
    },
    {
      name: 'Emma Watson',
      role: 'Product Director',
      initials: 'EW',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
      bio: 'UX specialist focused on accessibility. Designs experiences that work for users of all ages and technical abilities.',
      location: 'Brisbane, QLD'
    },
    {
      name: 'David Kim',
      role: 'Safety & Verification',
      initials: 'DK',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
      bio: 'Former police officer specializing in community safety. Develops and maintains our verification and safety protocols.',
      location: 'Perth, WA'
    }
  ];

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: 'Compassion',
      description: 'We believe in the power of human kindness to transform communities and individual lives.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7L12 2z"/>
          <polyline points="8,11 12,15 16,11"/>
        </svg>
      ),
      title: 'Purpose',
      description: 'Every interaction on our platform has the potential to create lasting positive change.'
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
      title: 'Community',
      description: 'Together we are stronger. Building connections that last beyond a single act of service.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          <path d="M13 5.5V7"/>
          <path d="M11 18.5V17"/>
        </svg>
      ),
      title: 'Accessibility',
      description: 'Making help available to everyone, regardless of age, background, or circumstance.'
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Social Impact Award',
      organization: 'Australian Community Service Foundation'
    },
    {
      year: '2024',
      title: 'Best Digital Platform',
      organization: 'National Volunteering Awards'
    },
    {
      year: '2024',
      title: 'Community Choice Award',
      organization: 'Tech for Good Australia'
    }
  ];

  return (
    <div className="about-page-modern">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero-modern">
          <div className="hero-content-with-image">
            <div className="hero-text-content">
              <span className="hero-badge">About Us</span>
              <h1>Australia's Kindest Community</h1>
              <p>
                Creating Australia's most trusted community platform where anyone can find help when they need it 
                and anyone can make a difference in someone else's life.
              </p>
            </div>
            <div className="hero-image-content">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Diverse group of volunteers helping in community - people of all ages working together" 
                className="about-hero-image"
              />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <span className="section-tag">Our Mission</span>
              <h2>Building Stronger Communities</h2>
              <p>
                To create Australia's most trusted community platform where anyone can find help when they need it 
                and anyone can make a difference in someone else's life. We believe that by connecting people through 
                acts of service, we build stronger, more resilient communities where everyone belongs.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&q=80" 
                alt="Community volunteers helping together"
              />
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story-section">
          <div className="story-content">
            <div className="story-text">
              <span className="section-tag">Our Story</span>
              <h2>How It All Started</h2>
              <p>
                Australia's Kindest Community was born from a simple observation: there are countless people who want 
                to help others, and just as many who could use a helping hand, but they struggle to find each other.
              </p>
              <p>
                In 2023, our founder Sarah Chen was caring for her elderly neighbor when she realized how many others 
                in similar situations had no one to turn to. At the same time, she knew dozens of people in her community 
                who wanted to volunteer but didn't know how to start.
              </p>
              <p>
                What started as an informal neighborhood network has grown into Australia's largest community volunteering 
                platform, connecting thousands of volunteers with people who need assistance across the country.
              </p>
              
              <div className="founder-quote">
                <blockquote>
                  "I never imagined that helping one neighbor would lead to building something that touches thousands of lives. 
                  Every day I'm amazed by the kindness of our volunteers."
                </blockquote>
                <cite>— Sarah Chen, Founder</cite>
              </div>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=500&fit=crop&q=80" 
                alt="Sarah Chen helping her elderly neighbor"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values-modern">
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2>What Drives Us</h2>
            <p>The principles that guide everything we do in building Australia's kindest community.</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card-modern">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team-modern">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2>Meet Our Team</h2>
            <p>The passionate people working every day to connect communities across Australia.</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card-modern">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-initials">{member.initials}</div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                  <div className="team-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {member.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section className="about-awards-section">
          <div className="section-header">
            <span className="section-tag">Recognition</span>
            <h2>Recognition & Awards</h2>
            <p>We're honored to be recognized for our impact on Australian communities.</p>
          </div>
          
          <div className="awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-year">{award.year}</div>
                <h4>{award.title}</h4>
                <p>{award.organization}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta-modern">
          <div className="cta-content">
            <h2>Join Australia's Kindest Community</h2>
            <p>
              Whether you need help or want to help others, you belong here. Together, we're building 
              stronger communities one act of kindness at a time.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary-modern" onClick={() => navigate('/signup')}>
                Get Started
              </button>
              <button className="btn-secondary-modern" onClick={() => navigate('/contact')}>
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;