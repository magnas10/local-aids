import React from 'react';
import './Pages.css';

function SuccessStories() {
  const stories = [
    {
      id: 1,
      title: 'A Lifeline During Recovery',
      quote: 'After my surgery, I couldn\'t drive for weeks. Local AIDS connected me with Sarah, who drove me to all my medical appointments. We\'ve become great friends!',
      author: 'Margaret T.',
      location: 'Melbourne, VIC',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      category: 'Transport',
      impact: 'Over 20 trips provided'
    },
    {
      id: 2,
      title: 'Technology Bridge for Grandparents',
      quote: 'My grandchildren live overseas. Thanks to a wonderful volunteer who taught me video calling, I can now see them every week. It changed my life.',
      author: 'George L.',
      location: 'Sydney, NSW',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      category: 'Tech Support',
      impact: 'Weekly video calls with family'
    },
    {
      id: 3,
      title: 'Community Garden Revival',
      quote: 'When I couldn\'t maintain my garden anymore, local volunteers helped restore it. Now it\'s a neighborhood gathering spot where we share vegetables and stories.',
      author: 'Helen K.',
      location: 'Brisbane, QLD',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      category: 'Gardening',
      impact: 'Garden serves 12 families'
    },
    {
      id: 4,
      title: 'From Helper to Friend',
      quote: 'I started volunteering to give back. I\'ve helped dozens of people with groceries, but the friendships I\'ve made are the real reward. This platform is amazing.',
      author: 'David M.',
      location: 'Perth, WA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'Volunteer',
      impact: '150+ hours volunteered'
    },
    {
      id: 5,
      title: 'Emergency Support Network',
      quote: 'When the floods hit our area, Local AIDS mobilized volunteers within hours. Neighbors I\'d never met showed up with supplies and helping hands.',
      author: 'Susan R.',
      location: 'Lismore, NSW',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
      category: 'Emergency',
      impact: '50 families assisted'
    },
    {
      id: 6,
      title: 'Companionship That Heals',
      quote: 'After losing my husband, the loneliness was overwhelming. Now I have regular visits from lovely volunteers who bring joy back into my days.',
      author: 'Dorothy P.',
      location: 'Adelaide, SA',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      category: 'Companionship',
      impact: 'Weekly companionship visits'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'People Helped' },
    { number: '25,000+', label: 'Active Volunteers' },
    { number: '100,000+', label: 'Tasks Completed' },
    { number: '500+', label: 'Communities Served' }
  ];

  return (
    <div className="page-container success-stories-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Real Impact
          </span>
          <h1>Success Stories</h1>
          <p>Real stories from our community members whose lives have been touched by kindness.</p>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Stories Grid */}
      <section className="stories-section">
        <div className="section-container">
          <div className="stories-grid">
            {stories.map((story) => (
              <article key={story.id} className="story-card">
                <div className="story-header">
                  <img src={story.image} alt={story.author} className="story-author-image" />
                  <div className="story-author-info">
                    <h3>{story.author}</h3>
                    <span className="story-location">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {story.location}
                    </span>
                  </div>
                  <span className="story-category">{story.category}</span>
                </div>
                <h4 className="story-title">{story.title}</h4>
                <blockquote className="story-quote">"{story.quote}"</blockquote>
                <div className="story-impact">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  {story.impact}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Have a Story to Share?</h2>
          <p>Your experience can inspire others to join our community and make a difference.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Share Your Story</a>
            <a href="/signup" className="btn-secondary">Join Our Community</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SuccessStories;
