import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  // Company information
  const companyInfo = {
    name: 'Local Aid',
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
    <div className="page-container">
      {/* Hero Section */}
      <div className="safety-hero">
        <div className="safety-hero-content">
          <h1>Careers at Local Aid</h1>
          <p>Join our mission to connect communities through kindness and volunteer support. Build a career that makes a real difference.</p>
        </div>
        <div className="safety-hero-image">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&q=80" 
            alt="Team collaboration" 
          />
        </div>
      </div>

      {/* Career Stats */}
      <div className="safety-stats">
        <div className="stat-card">
          <div className="stat-number">{companyInfo.teamSize}</div>
          <div className="stat-label">Team Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{companyInfo.volunteersCount}</div>
          <div className="stat-label">Active Volunteers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{companyInfo.clientsServed}</div>
          <div className="stat-label">Clients Served</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{companyInfo.satisfactionRate}</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
      </div>

      {/* Values Section */}
      <div className="safety-content">
        <h2>Our Values</h2>
        <div className="safety-tips-grid">
          {values.map((value, index) => (
            <div key={index} className="safety-tip-card">
              <div className="tip-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="red-flags-section">
        <h2>Why Join {companyInfo.name}?</h2>
        <div className="red-flags-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="red-flag-card">
              <h4>{benefit}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="safety-content">
        <h2>Open Positions</h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          Join our growing team
        </p>
        <div className="careers-jobs-list">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`careers-job-card ${selectedJob?.id === job.id ? 'expanded' : ''}`}
              onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
            >
              <div className="job-card-header">
                <div className="job-title-section">
                  <h3>{job.title}</h3>
                  <span className="job-badge">{job.department}</span>
                </div>
                <span className="job-type-badge">{job.type}</span>
              </div>
              
              <div className="job-meta-info">
                <span className="job-meta-item">
                  <span>📍</span> {job.location}
                </span>
                <span className="job-meta-item">
                  <span>💰</span> {job.salary}
                </span>
              </div>

              <p className="job-desc">{job.description}</p>

              {selectedJob?.id === job.id && (
                <div className="job-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  <Link to="/login" className="job-apply-btn">
                    Apply Now →
                  </Link>
                </div>
              )}

              <button className="job-toggle-btn">
                {selectedJob?.id === job.id ? '▲ Hide Details' : '▼ View Details'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Process */}
      <div className="safety-features">
        <h2>Application Process</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2rem' }}>1️⃣</span>
            </div>
            <h3>Apply</h3>
            <p>Submit your application and resume</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2rem' }}>2️⃣</span>
            </div>
            <h3>Review</h3>
            <p>Our team reviews your qualifications</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2rem' }}>3️⃣</span>
            </div>
            <h3>Interview</h3>
            <p>Chat with our team members</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span style={{ fontSize: '2rem' }}>4️⃣</span>
            </div>
            <h3>Offer</h3>
            <p>Join the Local Aid family</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="emergency-contact">
        <h2>Ready to Make an Impact?</h2>
        <p>Don't see a role that fits? We're always looking for talented people to join our mission.</p>
        <div className="emergency-numbers">
          <div className="emergency-number">
            <strong>Email:</strong> <a href="mailto:careers@localaid.org.au">careers@localaid.org.au</a>
          </div>
          <div className="emergency-number">
            <strong>General Inquiries:</strong> <Link to="/contact">Contact Us</Link>
          </div>
          <div className="emergency-number" style={{ fontSize: '0.95rem', marginTop: '1rem' }}>
            We are committed to building a diverse, equitable, and inclusive team. We encourage applications from all backgrounds.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;
