import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Pages.css';

function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  // Company information
  const companyInfo = {
    name: 'Local AIDS',
    founded: '2018',
    mission: 'Connecting communities through kindness and volunteer support, providing essential services to vulnerable populations',
    teamSize: '50+',
    volunteersCount: '2,000+',
    clientsServed: '10,000+',
    satisfactionRate: '97%'
  };

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Sydney, NSW',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'Join our engineering team and help build and scale our PERN platform that connects thousands of volunteers with people in need. You\'ll work on features that directly impact our community\'s ability to receive critical support services.',
      requirements: [
        '5+ years experience with React, Node.js, and PostgreSQL (or other relational DBs)',
        'Strong understanding of REST APIs and database design',
        'Experience with JWT authentication and security best practices',
        'Passion for building community-focused applications',
        'Experience with healthcare or social impact platforms is a plus'
      ]
    },
    {
      id: 2,
      title: 'Community Manager',
      department: 'Community',
      location: 'Melbourne, VIC',
      type: 'Full-time',
      salary: '$70,000 - $90,000',
      description: 'Build and nurture our thriving volunteer community across multiple cities. Create engagement opportunities and ensure our 2,000+ volunteers feel valued, supported, and equipped to make a difference in their communities.',
      requirements: [
        '3+ years in community management or similar role',
        'Excellent communication and organizational skills',
        'Experience with community events and engagement strategies',
        'Passion for social impact and supporting vulnerable populations',
        'Experience with volunteer management platforms'
      ]
    },
    {
      id: 3,
      title: 'Volunteer Services Coordinator',
      department: 'Community',
      location: 'Sydney, NSW',
      type: 'Full-time',
      salary: '$65,000 - $85,000',
      description: 'Coordinate and support our Medical Transportation, Shopping & Errands, and Companion Visiting programs. Match volunteers with clients, track outcomes, and ensure exceptional service delivery that changes lives.',
      requirements: [
        '2+ years in customer service or volunteer coordination',
        'Strong organizational and communication skills',
        'Ability to work with diverse populations including seniors and vulnerable groups',
        'Empathy and commitment to making a real difference',
        'Experience with volunteer matching or case management systems'
      ]
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $110,000',
      description: 'Design beautiful and intuitive interfaces for our platform used by volunteers and vulnerable populations. Create experiences that make it easy for people to connect, help, and receive support.',
      requirements: [
        '4+ years UX/UI design experience',
        'Proficiency in Figma and prototyping tools',
        'Strong portfolio demonstrating design thinking for accessibility',
        'Experience designing inclusive products for diverse user groups',
        'Passion for social impact design'
      ]
    },
    {
      id: 5,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Sydney, NSW',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      description: 'Drive insights from community data to improve platform performance and measure our impact. Help us understand how we\'re making a difference and where we can do better.',
      requirements: [
        '3+ years data analysis experience',
        'Proficiency in SQL, Python, and data visualization',
        'Experience with PostgreSQL and relational databases',
        'Strong analytical and problem-solving skills',
        'Experience with nonprofit or social impact metrics'
      ]
    },
    {
      id: 6,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Sydney, NSW',
      type: 'Full-time',
      salary: '$70,000 - $90,000',
      description: 'Lead our marketing efforts to grow our volunteer community and increase awareness of critical services. Tell our story of community, compassion, and impact.',
      requirements: [
        '3+ years marketing experience in nonprofit or social impact sector',
        'Experience with digital marketing and social media campaigns',
        'Strong copywriting and campaign management skills',
        'Passion for nonprofit and social impact marketing',
        'Experience growing volunteer communities'
      ]
    },
    {
      id: 7,
      title: 'Partnerships & Outreach Manager',
      department: 'Community',
      location: 'Sydney, NSW',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      description: 'Build and maintain strategic partnerships with community organizations, healthcare providers, and local agencies. Expand our reach to vulnerable populations and strengthen our collaborative impact.',
      requirements: [
        '3+ years in community partnerships or business development',
        'Excellent relationship-building and networking skills',
        'Knowledge of nonprofit partnerships and ecosystem',
        'Experience working with vulnerable or underserved populations',
        'Strong presentation and negotiation abilities'
      ]
    },
    {
      id: 8,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      description: 'Manage and optimize our cloud infrastructure, ensuring scalability, security, and reliability. Protect the data and privacy of the vulnerable communities we serve.',
      requirements: [
        '4+ years DevOps experience',
        'Expertise with AWS or similar cloud platforms',
        'Experience with Docker, Kubernetes, and CI/CD',
        'Strong focus on security, compliance, and monitoring',
        'Healthcare or privacy-focused infrastructure experience a plus'
      ]
    }
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Dignity & Respect',
      description: 'We honor the inherent worth of every individual, treating clients and volunteers with compassion and non-judgment'
    },
    {
      icon: '🔒',
      title: 'Safety & Trust',
      description: 'We maintain rigorous vetting and comprehensive background checks, ensuring the vulnerable populations we serve receive trustworthy support'
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'We recognize that sustainable change comes through strong community bonds and mutual support networks'
    },
    {
      icon: '♿',
      title: 'Accessibility & Equity',
      description: 'We remove barriers to help, ensuring everyone can access support and contribute meaningfully regardless of circumstances'
    }
  ];

  const benefits = [
    'Competitive salary and benefits package',
    'Flexible work arrangements and remote options available',
    'Professional development and training budget for your growth',
    'Comprehensive health and wellness benefits',
    'Generous paid leave, mental health days, and time off',
    'Team building and community engagement events',
    'Make a measurable difference in vulnerable people\'s lives',
    'Work alongside a passionate, mission-driven team',
    'Impact visibility - see the results of your work',
    'Supportive culture that values wellbeing and work-life balance'
  ];

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <span className="careers-badge">Join Our Mission</span>
          <h1 className="careers-title">Build Your Career at {companyInfo.name}</h1>
          <p className="careers-subtitle">
            Since {companyInfo.founded}, we've been connecting communities through kindness and dedicated volunteer support.
            Join our team and help us provide essential services to vulnerable populations. Be part of something that truly matters.
          </p>
          <p className="careers-mission" style={{ marginTop: '1.5rem', fontSize: '1.1rem', opacity: 0.9 }}>
            <strong>Our Mission:</strong> {companyInfo.mission}
          </p>
          <div className="careers-hero-stats">
            <div className="careers-stat">
              <span className="careers-stat-number">{companyInfo.teamSize}</span>
              <span className="careers-stat-text">Team Members</span>
            </div>
            <div className="careers-stat">
              <span className="careers-stat-number">{companyInfo.volunteersCount}</span>
              <span className="careers-stat-text">Active Volunteers</span>
            </div>
            <div className="careers-stat">
              <span className="careers-stat-number">{companyInfo.clientsServed}</span>
              <span className="careers-stat-text">Clients Served</span>
            </div>
            <div className="careers-stat">
              <span className="careers-stat-number">{companyInfo.satisfactionRate}</span>
              <span className="careers-stat-text">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="careers-values">
        <div className="careers-container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>What drives us every day</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="careers-benefits">
        <div className="careers-container">
          <div className="benefits-content">
            <div>
              <h2>Why Join {companyInfo.name}?</h2>
              <p>We offer more than just a job. We offer a career that directly improves lives and strengthens communities. Every role here contributes to our mission of connecting people with the support they need.</p>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <span className="benefit-icon">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="benefits-image">
              <div className="benefits-placeholder">
                <div className="placeholder-text">Team Working Together</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="careers-positions">
        <div className="careers-container">
          <div className="section-header">
            <h2>Open Positions</h2>
            <p>Join our growing team</p>
          </div>

          <div className="jobs-grid">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="job-card"
                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
              >
                <div className="job-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="job-department">{job.department}</p>
                  </div>
                  <span className="job-type">{job.type}</span>
                </div>

                <div className="job-meta">
                  <span className="job-location">📍 {job.location}</span>
                  <span className="job-salary">{job.salary}</span>
                </div>

                <p className="job-description">{job.description}</p>

                {selectedJob?.id === job.id && (
                  <div className="job-details">
                    <h4>Requirements</h4>
                    <ul>
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                    <Link to="/login" className="apply-btn">
                      Apply Now →
                    </Link>
                  </div>
                )}

                <button className="job-expand">
                  {selectedJob?.id === job.id ? '▼ Hide Details' : '▶ View Details'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="careers-process">
        <div className="careers-container">
          <div className="section-header">
            <h2>Application Process</h2>
            <p>Simple and straightforward</p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Apply</h3>
              <p>Submit your application and resume</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Review</h3>
              <p>Our team reviews your qualifications</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Interview</h3>
              <p>Chat with our team members</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Offer</h3>
              <p>Join the Local AIDS family</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <div className="careers-container">
          <div className="cta-content">
            <h2>Ready to Make an Impact?</h2>
            <p>Don't see a role that fits? We're always looking for talented people to join our mission.</p>
            <div className="cta-buttons">
              <a href="mailto:careers@localaids.org.au" className="cta-btn primary">
                Apply or Send Your Resume
              </a>
              <Link to="/contact" className="cta-btn secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Footer */}
      <section className="careers-footer">
        <div className="careers-container">
          <div className="careers-footer-content">
            <h3>Questions About Careers at {companyInfo.name}?</h3>
            <p>Our HR team is here to help. Reach out with any questions about opportunities, the application process, or our organization.</p>
            <a href="mailto:careers@localaids.org.au" className="careers-footer-link">
              careers@localaids.org.au
            </a>
            <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.8 }}>
              We are committed to building a diverse, equitable, and inclusive team. We encourage applications from all backgrounds and experiences.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Careers;
