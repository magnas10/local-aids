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
    <div className="page press-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage.url})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Media Center</h1>
          <p>Press releases, news coverage, and official media resources for Local Aid</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="page-container">
        {/* Media Contact Section */}
        <section className="press-contact-section">
          <div className="contact-card">
            <h2>Press Contact Information</h2>
            <p>For media inquiries, interview requests, or access to additional resources, contact our Media Relations office:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:press@localaids.org">press@localaids.org</a></p>
              <p><strong>Telephone:</strong> <a href="tel:+61234567890">+61 (2) 3456 7890</a></p>
              <p><strong>Media Response:</strong> Standard response time for all inquiries is within 24 business hours</p>
            </div>
          </div>
        </section>

        {/* Press Releases Section */}
        <section className="press-releases-section">
          <h2>Official Press Releases</h2>
          <p className="section-description">Latest organizational announcements and official communications</p>
          <div className="press-releases-list">
            {pressReleases.map((release, index) => (
              <article key={index} className="press-release-item">
                <div className="release-date">{release.date}</div>
                <h3>{release.title}</h3>
                <p className="release-summary">{release.summary}</p>
                {release.fullContent && (
                  <p className="release-content">{release.fullContent}</p>
                )}
                <a href={release.link} className="read-more">Read Full Release →</a>
              </article>
            ))}
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="media-kit-section">
          <h2>Media Kit & Resources</h2>
          <p className="section-description">Professional assets and documentation for editorial and broadcast use</p>
          <div className="media-kit-grid">
            {mediaKits.map((kit, index) => (
              <div key={index} className="media-kit-card">
                <div className="kit-icon">{kit.icon}</div>
                <h3>{kit.title}</h3>
                <p>{kit.description}</p>
                <button className="kit-download-btn">Download Resource</button>
              </div>
            ))}
          </div>
        </section>

        {/* In The News Section */}
        <section className="in-the-news-section">
          <h2>Media Coverage</h2>
          <p className="section-description">Recent editorial coverage and organizational features in major publications</p>
          <div className="news-grid">
            {inTheNews.map((news, index) => (
              <article key={index} className="news-item">
                <div className="news-outlet">{news.outlet}</div>
                <h3>{news.title}</h3>
                <p className="news-description">{news.description}</p>
                <div className="news-date">{news.date}</div>
                <a href="#" className="news-link">Access Article →</a>
              </article>
            ))}
          </div>
        </section>

        {/* Key Facts Section */}
        <section className="key-facts-section">
          <h2>Organizational At a Glance</h2>
          <div className="facts-grid">
            <div className="fact-card">
              <h3>Year Established</h3>
              <p>2022</p>
            </div>
            <div className="fact-card">
              <h3>Registered Volunteers</h3>
              <p>10,000+</p>
            </div>
            <div className="fact-card">
              <h3>Geographic Coverage</h3>
              <p>Multiple Australian Regions</p>
            </div>
            <div className="fact-card">
              <h3>Community Members Assisted</h3>
              <p>50,000+</p>
            </div>
            <div className="fact-card">
              <h3>Service Categories</h3>
              <p>Healthcare, Errands, Specialized Support</p>
            </div>
            <div className="fact-card">
              <h3>Core Mission</h3>
              <p>Enabling community-driven peer support networks</p>
            </div>
          </div>
        </section>

        {/* Organization Overview Section */}
        <section className="organization-overview-section">
          <h2>About Local Aid</h2>
          <div className="overview-content">
            <p>
              Local Aid is a community-driven platform connecting volunteers with individuals requiring healthcare support, 
              transportation assistance, and community services across Australia. Founded in 2022, the organization has established 
              a peer-to-peer support model addressing critical service gaps in healthcare accessibility and community-led assistance.
            </p>
            <p>
              The platform leverages proprietary matching technology to connect trained volunteers with community members requiring 
              support services including medical transportation, shopping assistance, appointment coordination, and specialized assistance 
              for vulnerable populations. Local Aid operates as a registered nonprofit organization committed to evidence-based social 
              impact and sustainable community development.
            </p>
            <h3>Our Commitment to Excellence</h3>
            <ul className="commitment-list">
              <li>Evidence-based service delivery with measurable impact outcomes</li>
              <li>Comprehensive volunteer training and background verification</li>
              <li>Personalized matching utilizing advanced algorithmic assessment</li>
              <li>Community-centered design prioritizing client feedback and continuous improvement</li>
              <li>Transparent reporting and stakeholder engagement</li>
              <li>Sustainable organizational practices and regional expansion</li>
            </ul>
          </div>
        </section>

        {/* Fast Facts Section */}
        <section className="fast-facts-section">
          <h2>Quick Reference: Key Statistics</h2>
          <div className="fast-facts-grid">
            <div className="fast-fact">
              <h4>10,000+</h4>
              <p>Active Volunteers Registered</p>
            </div>
            <div className="fast-fact">
              <h4>50,000+</h4>
              <p>Community Members Assisted</p>
            </div>
            <div className="fast-fact">
              <h4>18,500+</h4>
              <p>Medical Appointments Facilitated</p>
            </div>
            <div className="fast-fact">
              <h4>127%</h4>
              <p>Year-over-Year Growth Rate</p>
            </div>
            <div className="fast-fact">
              <h4>89%</h4>
              <p>Client Satisfaction Rating</p>
            </div>
            <div className="fast-fact">
              <h4>2022</h4>
              <p>Year Organization Founded</p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="press-newsletter-section">
          <h2>Press Distribution List</h2>
          <p>Subscribe to receive official press releases, organizational announcements, media updates, and news briefings delivered directly to your inbox</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
              />
              <button type="submit">Subscribe to Press Distribution</button>
            </div>
            <p className="form-note">We respect your privacy. Unsubscribe at any time. No spam, ever.</p>
          </form>
        </section>

        {/* Footer Information */}
        <section className="press-footer-section">
          <h2>Additional Resources & Support</h2>
          <div className="footer-resources">
            <div className="resource-card">
              <h3>Media Inquiries</h3>
              <p>For journalists, broadcasters, and media organizations seeking comment, interviews, or detailed information</p>
              <p><strong>Email:</strong> <a href="mailto:press@localaids.org">press@localaids.org</a></p>
            </div>
            <div className="resource-card">
              <h3>Partnership & Sponsorship</h3>
              <p>For organizations interested in strategic partnerships, sponsorship opportunities, or collaborative initiatives</p>
              <p><strong>Email:</strong> <a href="mailto:partnerships@localaids.org">partnerships@localaids.org</a></p>
            </div>
            <div className="resource-card">
              <h3>Technical Support</h3>
              <p>For issues accessing media resources, downloading assets, or technical assistance with media kit materials</p>
              <p><strong>Email:</strong> <a href="mailto:support@localaids.org">support@localaids.org</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Press;
