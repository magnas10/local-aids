import React from 'react';
import './Pages.css';

function Press() {
  const heroImage = {
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=700&fit=crop',
    alt: 'Professional press and media center'
  };

  const pressReleases = [
    {
      date: 'December 15, 2025',
      title: 'Local Aid Achieves Significant Growth Milestone with 10,000 Active Volunteers',
      summary: 'SYDNEY, AUSTRALIA – Local Aid celebrates a landmark achievement in community engagement and volunteer mobilization. The organization has successfully onboarded its 10,000th registered volunteer, demonstrating unprecedented growth in peer-to-peer support infrastructure. This milestone reflects expanding public commitment to healthcare accessibility and community-led assistance across multiple Australian regions. The achievement underscores the effectiveness of the platform\'s volunteer matching technology and community outreach initiatives.',
      link: '#',
      fullContent: 'The 10,000-volunteer milestone represents a 250% increase from the organization\'s inaugural year. Through strategic expansion efforts and improved volunteer recruitment pathways, Local Aid has established a robust network of trained support providers. The organization attributes this growth to enhanced digital onboarding processes, comprehensive volunteer training programs, and increased awareness of peer support services within target communities.'
    },
    {
      date: 'November 28, 2025',
      title: 'Strategic Healthcare Partnership Strengthens Medical Support Services',
      summary: 'MELBOURNE, AUSTRALIA – Local Aid announces a strategic collaboration with leading regional healthcare networks to enhance medical support service delivery. This partnership expands transportation coordination capabilities, improves specialist appointment accessibility, and establishes integrated referral pathways for vulnerable populations requiring enhanced healthcare support.',
      link: '#',
      fullContent: 'The partnership integrates Local Aid volunteer coordination with established healthcare provider networks, creating seamless support pathways for patients requiring non-emergency medical transportation and appointment assistance. Healthcare providers gain access to vetted volunteer coordinators, while Local Aid expands its service capacity to serve patients across multiple healthcare systems. Initial partnership metrics indicate a 35% improvement in appointment adherence rates for patients utilizing volunteer transportation services.'
    },
    {
      date: 'November 10, 2025',
      title: 'Launch of Rapid Response Emergency Assistance Initiative',
      summary: 'BRISBANE, AUSTRALIA – Local Aid introduces an expanded emergency assistance program designed to provide time-critical support for acute community needs. The initiative establishes expedited volunteer deployment protocols, crisis communication systems, and specialized training for emergency support providers, addressing critical service gaps during acute situations.',
      link: '#',
      fullContent: 'The Rapid Response program enables emergency deployment of trained volunteers within 2-4 hours of request submission. Program protocols include crisis situation assessment, safety protocols for emergency responders, and specialized support for clients experiencing acute health events, housing instability, or emergency service needs. The initiative includes partnerships with emergency services agencies and specialized training certification for participating volunteers.'
    },
    {
      date: 'October 25, 2025',
      title: 'Advanced Matching Algorithm Elevates Service Quality and User Satisfaction',
      summary: 'PERTH, AUSTRALIA – Local Aid releases proprietary technology development data demonstrating significant improvements in volunteer-client compatibility assessment. The advanced matching algorithm utilizes behavioral analytics, service preference assessment, and community location optimization to improve service outcomes and user experience metrics.',
      link: '#',
      fullContent: 'The proprietary matching technology incorporates machine learning algorithms trained on historical service satisfaction data, volunteer performance metrics, and client feedback patterns. Implementation results demonstrate a 42% improvement in client satisfaction ratings, a 38% reduction in service cancellations, and a 31% increase in volunteer retention rates. The technology enables personalized volunteer recommendations based on client-specific needs and volunteer expertise profiles.'
    },
    {
      date: 'September 30, 2025',
      title: 'Annual Impact Assessment: Demonstrable Growth in Community Support Coverage',
      summary: 'ADELAIDE, AUSTRALIA – Local Aid releases its 2025 comprehensive impact assessment, documenting significant expansion in service delivery across multiple geographic regions. The report highlights community members assisted, service delivery statistics, volunteer engagement metrics, and organizational effectiveness indicators reflecting substantial organizational growth.',
      link: '#',
      fullContent: 'The 2025 Impact Report documents 127% year-over-year growth in service requests, 89% client satisfaction ratings, and expanded geographic coverage into five additional regional areas. The report includes detailed outcome metrics for medical transportation services (estimated 18,500+ medical appointments facilitated), shopping assistance services (estimated 12,300+ shopping expeditions completed), and specialized support services. Community feedback demonstrates strong confidence in service quality and volunteer professionalism.'
    },
    {
      date: 'August 15, 2025',
      title: 'Recognition of Organizational Excellence in Social Welfare Innovation',
      summary: 'CANBERRA, AUSTRALIA – Local Aid receives the 2025 Community Excellence Award from the National Social Welfare Association, recognizing outstanding contributions to community development and social impact. The award validates the organization\'s evidence-based approach to peer support programming and community-led healthcare accessibility initiatives.',
      link: '#',
      fullContent: 'The Community Excellence Award recognizes organizations demonstrating exceptional impact in social welfare innovation, community development, and sustainable social change. Award selection criteria include documented community impact, organizational effectiveness, innovative service delivery models, and stakeholder engagement quality. The Local Aid organization was selected from a competitive applicant pool of 280+ organizations across Australia, representing the top 3% of recognized social welfare innovators.'
    }
  ];

  const mediaKits = [
    {
      title: 'Brand Standards & Guidelines',
      description: 'Comprehensive branding documentation including usage standards, visual identity specifications, color palette specifications, typography standards, and design guidelines for consistent media representation across all platforms.',
      icon: '📋'
    },
    {
      title: 'Logo Assets (HD)',
      description: 'High-resolution logo files available in multiple formats (PNG, SVG, PDF, EPS) at various resolutions. Includes primary, secondary, and monochrome variations suitable for digital publication, print media, broadcast applications, and web implementation.',
      icon: '🖼️'
    },
    {
      title: 'Executive Leadership Profiles',
      description: 'Detailed biographical information, professional headshots (high-resolution), organizational role descriptions, expertise summaries, and career background for all founding team members and executive leadership staff.',
      icon: '👥'
    },
    {
      title: 'Impact Data & Analytics',
      description: 'Current organizational metrics, demographic insights, service delivery statistics, outcome measurements, community impact data, volunteer engagement analytics, and comprehensive evidence-based outcome documentation for editorial reference and fact-checking.',
      icon: '📊'
    },
    {
      title: 'Multimedia Archive',
      description: 'Licensed, high-resolution photography and professional video footage depicting community programs, volunteer activities, service delivery operations, client testimonials, and organizational infrastructure. All assets cleared for editorial and broadcast use.',
      icon: '📹'
    },
    {
      title: 'Organizational History & Mission',
      description: 'Comprehensive organizational background documentation, founding narrative and vision statement, organizational evolution timeline from 2022 to present, strategic mission documentation, key milestones, and organizational values framework for comprehensive media coverage.',
      icon: '📚'
    }
  ];

  const inTheNews = [
    {
      outlet: 'Australian Community Weekly',
      title: 'Peer-to-Peer Support Models: Reshaping Community Healthcare Accessibility',
      date: 'December 2025',
      description: 'Feature article examining how Local Aid and similar organizations are transforming healthcare accessibility through peer-to-peer support models and community-driven service delivery.'
    },
    {
      outlet: 'Tech for Social Good Magazine',
      title: 'Digital Platforms Revolutionizing Volunteer Coordination and Community Engagement',
      date: 'November 2025',
      description: 'Technology focused coverage of Local Aid matching algorithms, volunteer coordination systems, and digital innovation in community support service delivery.'
    },
    {
      outlet: 'Healthcare Innovation Today',
      title: 'Technology-Enabled Solutions in Healthcare Support Service Delivery',
      date: 'October 2025',
      description: 'Healthcare industry analysis featuring Local Aid as a case study in technology-enabled service delivery and healthcare accessibility innovation.'
    },
    {
      outlet: 'National Charity Review',
      title: 'Evidence-Based Nonprofits: Measuring Impact in Community Support Services',
      date: 'September 2025',
      description: 'Editorial coverage highlighting Local Aid impact measurement methodologies and evidence-based approaches to nonprofit community service delivery.'
    },
    {
      outlet: 'Social Impact Quarterly',
      title: 'Scalable Models for Sustainable Community Support Networks',
      date: 'August 2025',
      description: 'Long-form analysis of Local Aid organizational scaling strategies, sustainability models, and replication potential for community support networks.'
    },
    {
      outlet: 'Australian Health & Wellness Report',
      title: 'Community-Led Initiatives: Addressing Service Gaps in Healthcare Access',
      date: 'July 2025',
      description: 'Health sector coverage of Local Aid role in addressing critical healthcare access gaps and community-led health support initiatives.'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="safety-hero">
        <div className="safety-hero-content">
          <h1>Media Center</h1>
          <p>Press releases, news coverage, and official media resources for Local Aid</p>
        </div>
        <div className="safety-hero-image">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop&q=80" 
            alt="Professional press and media center" 
          />
        </div>
      </div>

      {/* Press Stats */}
      <div className="safety-stats">
        <div className="stat-card">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Active Volunteers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50,000+</div>
          <div className="stat-label">People Helped</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">127%</div>
          <div className="stat-label">YoY Growth</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">89%</div>
          <div className="stat-label">Satisfaction</div>
        </div>
      </div>
      {/* Media Contact Section */}
      <div className="emergency-contact">
        <h2>Press Contact Information</h2>
        <p>For media inquiries, interview requests, or access to additional resources, contact our Media Relations office:</p>
        <div className="emergency-numbers">
          <div className="emergency-number">
            <strong>Email:</strong> <a href="mailto:press@localaids.org">press@localaids.org</a>
          </div>
          <div className="emergency-number">
            <strong>Telephone:</strong> <a href="tel:+61234567890">+61 (2) 3456 7890</a>
          </div>
          <div className="emergency-number">
            <strong>Response Time:</strong> Within 24 business hours
          </div>
        </div>
      </div>

      {/* Press Releases Section */}
      <div className="safety-content">
        <h2>Official Press Releases</h2>
        <div className="safety-tips-grid">
          {pressReleases.slice(0, 6).map((release, index) => (
            <div key={index} className="safety-tip-card">
              <div className="tip-icon">📰</div>
              <h3>{release.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>{release.date}</p>
              <p>{release.summary.substring(0, 200)}...</p>
              <a href={release.link} style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '0.5rem', display: 'inline-block' }}>
                Read Full Release →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Media Kit Section */}
      <div className="safety-features">
        <h2>Media Kit & Resources</h2>
        <div className="features-grid">
          {mediaKits.map((kit, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <span style={{ fontSize: '2.5rem' }}>{kit.icon}</span>
              </div>
              <h3>{kit.title}</h3>
              <p>{kit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* In The News Section */}
      <div className="red-flags-section">
        <h2>📺 Recent Media Coverage</h2>
        <div className="red-flags-grid">
          {inTheNews.map((news, index) => (
            <div key={index} className="red-flag-card">
              <h4>{news.title}</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>
                <strong>{news.outlet}</strong> • {news.date}
              </p>
              <p style={{ marginTop: '0.75rem' }}>{news.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Organization Overview */}
      <div className="safety-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2>About Local Aid</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          Local Aid is a community-driven platform connecting volunteers with individuals requiring healthcare support, 
          transportation assistance, and community services across Australia. Founded in 2022, the organization has established 
          a peer-to-peer support model addressing critical service gaps in healthcare accessibility and community-led assistance.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          The platform leverages proprietary matching technology to connect trained volunteers with community members requiring 
          support services including medical transportation, shopping assistance, appointment coordination, and specialized assistance 
          for vulnerable populations.
        </p>
      </div>
    </div>
  );
}

export default Press;
