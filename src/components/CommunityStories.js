import React from 'react';
import './CommunityStories.css';

function CommunityStories() {
  const stories = [
    {
      id: 1,
      title: 'Helping Elderly with Groceries',
      location: 'Melbourne, VIC',
      description: 'Sarah helped 15 elderly residents with weekly grocery shopping during winter, ensuring they had fresh food and a friendly face to chat with.',
      impact: '15 families supported',
      category: 'Groceries',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      volunteer: 'Sarah Mitchell',
      duration: '3 months'
    },
    {
      id: 2,
      title: 'Community Garden Project',
      location: 'Sydney, NSW',
      description: 'Local volunteers transformed an empty lot into a thriving community garden, providing fresh produce for local families.',
      impact: '50+ vegetables grown',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      volunteer: 'Green Thumbs Team',
      duration: '6 months'
    },
    {
      id: 3,
      title: 'Tech Support for Seniors',
      location: 'Brisbane, QLD',
      description: 'Volunteers provided free tech support helping seniors stay connected with their families through video calls and social media.',
      impact: '30 seniors helped',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
      volunteer: 'Tech Buddies',
      duration: '2 months'
    }
  ];

  return (
    <section className="community-stories-section">
      <div className="stories-wrapper">
        <div className="stories-header">
          <span className="stories-badge">💝 Making A Difference</span>
          <h2>Community Stories</h2>
          <p>Real stories from our community showing how small acts of kindness create big impacts across Australia.</p>
        </div>
        
        <div className="stories-grid">
          {stories.map((story) => (
            <article key={story.id} className="story-card">
              <div className="story-image">
                <img src={story.image} alt={story.title} />
                <span className="story-category">{story.category}</span>
              </div>
              <div className="story-content">
                <div className="story-location">
                  <span className="location-icon">📍</span>
                  <span>{story.location}</span>
                </div>
                <h3>{story.title}</h3>
                <p className="story-description">{story.description}</p>
                <div className="story-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span>{story.volunteer}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span>{story.duration}</span>
                  </div>
                </div>
                <div className="story-footer">
                  <span className="impact-badge">
                    <span className="impact-icon">🎯</span>
                    {story.impact}
                  </span>
                  <button className="read-story-btn">Read Story →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommunityStories;
