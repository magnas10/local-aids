import React from 'react';
import './CommunityStories.css';

function CommunityStories() {
  const stories = [
    {
      title: 'Helping Elderly with Groceries',
      location: 'Melbourne, VIC',
      description: 'Sarah helped 15 elderly residents with weekly grocery shopping during winter.',
      badge: '15 families supported'
    },
    {
      title: 'Community Garden Project',
      location: 'Sydney, NSW',
      description: 'Local volunteers transformed an empty lot into a thriving community garden.',
      badge: '50+ vegetables grown'
    },
    {
      title: 'Tech Support for Seniors',
      location: 'Brisbane, QLD',
      description: 'Volunteers provided free tech support helping seniors stay connected.',
      badge: '30 seniors helped'
    }
  ];

  return (
    <section className="community-stories">
      <h2 className="section-title">Community Stories</h2>
      <div className="stories-container">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <h3 className="story-title">{story.title}</h3>
            <p className="story-location">📍 {story.location}</p>
            <p className="story-description">{story.description}</p>
            <span className="story-badge">{story.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommunityStories;
