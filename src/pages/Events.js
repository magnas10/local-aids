import React, { useState, useEffect } from 'react';
import './Pages.css';

function Events() {
  const [filters, setFilters] = useState({
    distance: 'all',
    type: 'all',
    urgency: 'all'
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&h=1080&fit=crop&q=85'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const allEvents = [
    {
      id: 1,
      title: 'Community Health Workshop',
      date: 'December 5, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Melbourne Community Center, Victoria',
      description: 'Join us for a comprehensive health awareness workshop focusing on HIV prevention, testing awareness, and care strategies for the Australian community.',
      attendees: 45,
      type: 'workshop',
      urgency: 'normal',
      distance: 5,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Volunteer Training Session',
      date: 'December 12, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'AIDS Council of NSW, Sydney',
      description: 'Training session for new volunteers. Learn how you can make a difference supporting people living with HIV/AIDS across Australia.',
      attendees: 28,
      type: 'training',
      urgency: 'normal',
      distance: 10,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Fundraising Gala - Red Ribbon Night',
      date: 'December 20, 2025',
      time: '6:00 PM - 10:00 PM',
      location: 'Crown Melbourne, Southbank VIC',
      description: 'Annual fundraising gala to support HIV/AIDS programs and initiatives across Australia. Formal attire required.',
      attendees: 150,
      type: 'fundraising',
      urgency: 'normal',
      distance: 8,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Weekly Support Group Meeting',
      date: 'Every Wednesday',
      time: '5:00 PM - 7:00 PM',
      location: 'Positive Life NSW, Surry Hills',
      description: 'Weekly peer support group for individuals and families affected by HIV/AIDS. Safe space for sharing and connection.',
      attendees: 20,
      type: 'support',
      urgency: 'normal',
      distance: 3,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'URGENT: Emergency Food Bank Volunteers',
      date: 'December 8, 2025',
      time: '8:00 AM - 4:00 PM',
      location: 'OzHarvest Brisbane, QLD',
      description: 'Urgent need for volunteers to help pack and distribute food parcels to people living with HIV/AIDS who are facing food insecurity.',
      attendees: 12,
      type: 'volunteer',
      urgency: 'urgent',
      distance: 15,
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Home Care Assistance Program',
      date: 'December 10, 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Various Locations, Perth WA',
      description: 'Volunteers needed to provide home care assistance including grocery shopping, meal preparation, and companionship for those living with HIV/AIDS.',
      attendees: 8,
      type: 'care',
      urgency: 'high',
      distance: 20,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=250&fit=crop'
    },
    {
      id: 7,
      title: 'Youth HIV Awareness Outreach',
      date: 'December 14, 2025',
      time: '11:00 AM - 5:00 PM',
      location: 'Federation Square, Melbourne VIC',
      description: 'Street outreach program to educate young Australians about HIV prevention, safe practices, and free testing locations.',
      attendees: 35,
      type: 'outreach',
      urgency: 'normal',
      distance: 6,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop'
    },
    {
      id: 8,
      title: 'URGENT: Hospital Visit Companions',
      date: 'December 9, 2025',
      time: '10:00 AM - 3:00 PM',
      location: 'Royal Prince Alfred Hospital, Sydney',
      description: 'Compassionate volunteers urgently needed to provide companionship and emotional support during hospital visits for patients without family support.',
      attendees: 5,
      type: 'care',
      urgency: 'urgent',
      distance: 12,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop'
    },
    {
      id: 9,
      title: 'Free HIV Testing & Counselling Day',
      date: 'December 16, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Adelaide Health Centre, SA',
      description: 'Community testing day offering free, confidential HIV testing with professional counselling support. Volunteers needed for registration and support roles.',
      attendees: 60,
      type: 'health',
      urgency: 'high',
      distance: 25,
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=250&fit=crop'
    },
    {
      id: 10,
      title: 'Christmas Hamper Packing',
      date: 'December 18, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Salvation Army Warehouse, Gold Coast QLD',
      description: 'Help pack Christmas hampers for families affected by HIV/AIDS. Spread holiday cheer to those who need it most this festive season.',
      attendees: 40,
      type: 'volunteer',
      urgency: 'normal',
      distance: 18,
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=250&fit=crop'
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredEvents = allEvents.filter(event => {
    if (filters.distance !== 'all') {
      const maxDistance = parseInt(filters.distance);
      if (event.distance > maxDistance) return false;
    }
    if (filters.type !== 'all' && event.type !== filters.type) return false;
    if (filters.urgency !== 'all' && event.urgency !== filters.urgency) return false;
    return true;
  });

  const getUrgencyBadge = (urgency) => {
    if (urgency === 'urgent') return <span className="urgency-badge urgent">Urgent</span>;
    if (urgency === 'high') return <span className="urgency-badge high">High Priority</span>;
    return null;
  };

  const getTypeBadge = (type) => {
    const typeLabels = {
      workshop: '📚 Workshop',
      training: '🎓 Training',
      fundraising: '💰 Fundraising',
      support: '💬 Support Group',
      volunteer: '🤝 Volunteer',
      care: '❤️ Care',
      outreach: '📢 Outreach',
      health: '🏥 Health'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="events-page-pro">
      {/* Hero Section */}
      <section className="events-hero-pro">
        <div className="events-hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`events-hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="events-hero-overlay"></div>
        </div>
        <div className="events-hero-content-pro">
          <div className="events-hero-text">
            <span className="events-hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Join Our Community
            </span>
            <h1>Volunteer Opportunities<br/><span className="highlight">& Events</span></h1>
            <p className="hero-tagline">
              Browse available requests and find opportunities to make a difference across Australia. Your time and skills can transform lives.
            </p>
            <div className="events-hero-cta-section">
              <button className="events-hero-btn-primary" onClick={() => document.getElementById('events-list').scrollIntoView({ behavior: 'smooth' })}>
                Browse Opportunities
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </button>
              <div className="events-hero-stats">
                <div className="hero-stat">
                  <span className="stat-number">{allEvents.length}+</span>
                  <span className="stat-label">Active Events</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">{allEvents.filter(e => e.urgency === 'urgent').length}</span>
                  <span className="stat-label">Urgent Needs</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">{allEvents.reduce((sum, e) => sum + e.attendees, 0)}+</span>
                  <span className="stat-label">Volunteers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Carousel Indicators */}
        <div className="events-carousel-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Events Content */}
      <div id="events-list" className="events-content-section">
        <section className="filters-container" aria-label="Filter events">
        <div className="filter-group">
          <label htmlFor="distance-filter">Distance</label>
          <select 
            id="distance-filter"
            value={filters.distance} 
            onChange={(e) => handleFilterChange('distance', e.target.value)}
            aria-describedby="results-count"
          >
            <option value="all">All Distances</option>
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="15">Within 15 km</option>
            <option value="25">Within 25 km</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">Type</label>
          <select 
            id="type-filter"
            value={filters.type} 
            onChange={(e) => handleFilterChange('type', e.target.value)}
            aria-describedby="results-count"
          >
            <option value="all">All Types</option>
            <option value="workshop">Workshop</option>
            <option value="training">Training</option>
            <option value="volunteer">Volunteer</option>
            <option value="care">Care & Support</option>
            <option value="outreach">Outreach</option>
            <option value="health">Health Services</option>
            <option value="fundraising">Fundraising</option>
            <option value="support">Support Group</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="urgency-filter">Urgency</label>
          <select 
            id="urgency-filter"
            value={filters.urgency} 
            onChange={(e) => handleFilterChange('urgency', e.target.value)}
            aria-describedby="results-count"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent Only</option>
            <option value="high">High Priority</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        <button 
          className="clear-filters-btn" 
          onClick={() => setFilters({ distance: 'all', type: 'all', urgency: 'all' })}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      </section>

      <p id="results-count" className="results-count" aria-live="polite">
        Showing {filteredEvents.length} opportunities
      </p>

      <div className="events-grid" role="list" aria-label="Event listings">
        {filteredEvents.map(event => (
          <article 
            key={event.id} 
            className={`event-card ${event.urgency === 'urgent' ? 'urgent-card' : ''}`}
            role="listitem"
          >
            <div className="event-image">
              <img src={event.image} alt={`${event.title} event`} />
              {getUrgencyBadge(event.urgency)}
            </div>
            <div className="event-content">
              <div className="event-card-header">
                <div className="event-date-badge">
                  <span><time>{event.date}</time></span>
                </div>
              </div>
              <h3>{event.title}</h3>
              <span className="event-type-badge">{getTypeBadge(event.type)}</span>
              <p className="event-time"><span aria-hidden="true">🕐</span> <span className="sr-only">Time:</span> {event.time}</p>
              <p className="event-location"><span aria-hidden="true">📍</span> <span className="sr-only">Location:</span> {event.location}</p>
              <p className="event-distance"><span aria-hidden="true">📏</span> <span className="sr-only">Distance:</span> {event.distance} km away</p>
              <p className="event-description">{event.description}</p>
              <div className="event-footer">
                <span className="attendees"><span aria-hidden="true">👥</span> <span className="sr-only">Attendees:</span> {event.attendees} attending</span>
                <button className="event-btn" aria-label={`Register for ${event.title}`}>Register</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="no-results" role="status" aria-live="polite">
          <p>No events match your filters. Try adjusting your search criteria.</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Events;
