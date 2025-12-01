import React from 'react';
import './Pages.css';

function Press() {
  const pressReleases = [
    {
      id: 1,
      date: 'November 28, 2025',
      title: 'Local AIDS Reaches 50,000 Community Members Milestone',
      excerpt: 'The community platform celebrates helping over 50,000 Australians connect for mutual support.',
      link: '#'
    },
    {
      id: 2,
      date: 'October 15, 2025',
      title: 'Local AIDS Partners with Australian Red Cross for Disaster Relief',
      excerpt: 'New partnership enables rapid volunteer mobilization during natural disasters.',
      link: '#'
    },
    {
      id: 3,
      date: 'September 3, 2025',
      title: 'Local AIDS Launches Rural Communities Initiative',
      excerpt: 'Expansion program aims to connect remote Australian communities with volunteer support.',
      link: '#'
    },
    {
      id: 4,
      date: 'July 20, 2025',
      title: 'Local AIDS Receives Community Innovation Award',
      excerpt: 'Platform recognized for innovative approach to neighborhood support and volunteering.',
      link: '#'
    }
  ];

  const mediaFeatures = [
    {
      outlet: 'The Australian',
      logo: '📰',
      headline: '"Local AIDS is changing how Australians help each other"',
      date: 'November 2025'
    },
    {
      outlet: 'ABC News',
      logo: '📺',
      headline: '"Community platform connects neighbors in need"',
      date: 'October 2025'
    },
    {
      outlet: 'Sydney Morning Herald',
      logo: '📰',
      headline: '"The app bringing communities together"',
      date: 'September 2025'
    },
    {
      outlet: 'Channel 9 Today',
      logo: '📺',
      headline: '"How technology is reviving neighborhood spirit"',
      date: 'August 2025'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Community Members' },
    { number: '500+', label: 'Communities Served' },
    { number: '100,000+', label: 'Acts of Kindness' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="page-container press-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
              <path d="M18 14h-8"/>
              <path d="M15 18h-5"/>
              <path d="M10 6h8v4h-8V6z"/>
            </svg>
            Press & Media
          </span>
          <h1>Press Center</h1>
          <p>News, announcements, and media resources about Local AIDS.</p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section className="press-releases-section">
        <div className="section-container">
          <h2>Press Releases</h2>
          <div className="press-releases-list">
            {pressReleases.map((release) => (
              <article key={release.id} className="press-release-card">
                <span className="press-date">{release.date}</span>
                <h3>{release.title}</h3>
                <p>{release.excerpt}</p>
                <a href={release.link} className="read-more-link">
                  Read More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Features */}
      <section className="media-features-section">
        <div className="section-container">
          <h2>In the Media</h2>
          <div className="media-features-grid">
            {mediaFeatures.map((feature, index) => (
              <div key={index} className="media-feature-card">
                <span className="media-logo">{feature.logo}</span>
                <span className="media-outlet">{feature.outlet}</span>
                <p className="media-headline">{feature.headline}</p>
                <span className="media-date">{feature.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="media-kit-section">
        <div className="section-container">
          <div className="media-kit-box">
            <div className="media-kit-content">
              <h2>Media Kit</h2>
              <p>Download our media kit for logos, brand guidelines, and high-resolution images.</p>
              <ul className="media-kit-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Brand Guidelines (PDF)
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Logo Pack (ZIP)
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Product Screenshots (ZIP)
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Executive Bios (PDF)
                </li>
              </ul>
            </div>
            <button className="btn-primary">Download Media Kit</button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Media Inquiries</h2>
          <p>For press inquiries, interviews, or additional information, please contact our media team.</p>
          <div className="cta-buttons">
            <a href="mailto:press@localaids.org.au" className="btn-primary">press@localaids.org.au</a>
            <a href="/contact" className="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Press;
