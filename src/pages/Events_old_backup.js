import React, { useState, useEffect } from 'react';
import { getHelpRequests } from '../services/api';
import './Pages.css';

function Events() {
  const [filters, setFilters] = useState({
    distance: 'all',
    type: 'all',
    urgency: 'all'
  });
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch help requests on component mount
  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        setLoading(true);
        const response = await getHelpRequests({ showAsEvent: 'true' });
        const transformedRequests = response.helpRequests.map(request => ({
          id: `help-${request._id}`,
          title: `${getHelpTypeLabel(request.helpType)} Assistance ${request.urgency === 'high' || request.urgency === 'urgent' ? '- ' + request.urgency.toUpperCase() : ''}`,
          date: request.preferredDate || 'Flexible',
          time: request.preferredTime || 'Flexible',
          location: `${request.suburb}, ${request.state}`,
          description: request.description,
          attendees: 0,
          type: 'help-request',
          urgency: request.urgency,
          distance: Math.floor(Math.random() * 20) + 1,
          image: getImageForHelpType(request.helpType),
          helpType: request.helpType,
          isHelpRequest: true,
          originalId: request._id,
          status: request.status,
          postedDate: new Date(request.createdAt)
        }));
        setHelpRequests(transformedRequests);
      } catch (error) {
        console.error('Failed to fetch help requests:', error);
        setHelpRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
  }, []);

  // Helper functions
  const getHelpTypeLabel = (helpType) => {
    const labels = {
      'transport': 'Transport',
      'shopping': 'Shopping',
      'companionship': 'Companionship',
      'household': 'Household',
      'meals': 'Meal',
      'medical': 'Medical',
      'tech': 'Technology',
      'other': 'General'
    };
    return labels[helpType] || 'General';
  };

  const getImageForHelpType = (helpType) => {
    const images = {
      'transport': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      'shopping': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
      'companionship': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=250&fit=crop',
      'household': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      'meals': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
      'medical': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      'tech': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
      'other': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop'
    };
    return images[helpType] || images['other'];
  };

  const staticEvents = [
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

  // Combine static events and help requests
  const allEvents = [...staticEvents, ...helpRequests];

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
    <div className="page-container events-page">
      {/* Hero Section */}
      <section className="events-hero">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">Community Opportunities</span>
            <h1 className="hero-title">
              Make a Difference <span className="highlight">Today</span>
            </h1>
            <p className="hero-description">
              Join our community initiatives and help create positive change. Each opportunity is a chance to impact someone's life and strengthen our community bonds.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <div className="events-container">
        <section className="filters-section" aria-label="Filter events">
          <div className="filter-group">
            <label htmlFor="distance-filter">📍 Distance</label>
            <select 
              id="distance-filter"
              value={filters.distance} 
              onChange={(e) => handleFilterChange('distance', e.target.value)}
            >
              <option value="all">All Distances</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="15">Within 15 km</option>
              <option value="25">Within 25 km</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">🎯 Type</label>
            <select 
              id="type-filter"
              value={filters.type} 
              onChange={(e) => handleFilterChange('type', e.target.value)}
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
            <label htmlFor="urgency-filter">⚡ Urgency</label>
            <select 
              id="urgency-filter"
              value={filters.urgency} 
              onChange={(e) => handleFilterChange('urgency', e.target.value)}
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
          ✕ Clear Filters
        </button>
      </section>

      <div className="results-info">
        <p className="results-count">
          <strong>{filteredEvents.length}</strong> opportunities available
        </p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading opportunities...</p>
        </div>
      ) : (
        <div className="events-grid" role="list" aria-label="Event listings">
        {filteredEvents.map(event => (
          <div 
            key={event.id} 
            className="event-card"
            role="listitem"
          >
            <div className="event-image">
              <img src={event.image} alt={`${event.title} event`} />
              <div className="event-badges">
                {event.urgency === 'urgent' && (
                  <span className="priority-badge urgent">
                    ⚡ URGENT
                  </span>
                )}
                {event.urgency === 'high' && (
                  <span className="priority-badge high">
                    ⚠️ HIGH PRIORITY
                  </span>
                )}
              </div>
            </div>
            <div className="event-content">
              <div className="event-header">
                <span className="event-type-badge">
                  {getTypeBadge(event.type)}
                </span>
              </div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{event.location}</span>
                </div>
                <div className="detail-item distance">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span>{event.distance} km away</span>
                </div>
              </div>
              
              <div className="event-actions">
                {event.location && event.location !== 'Flexible' && (
                  <a
                    className="btn-secondary-outline"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Get directions"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11H1l8-8v6h8l-8 8v-6z"/>
                    </svg>
                    Directions
                  </a>
                )}
                <button className="btn-primary-event">
                  Volunteer Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {filteredEvents.length === 0 && !loading && (
        <div className="no-results" role="status" aria-live="polite">
          <div className="no-results-icon">🔍</div>
          <h3>No events found</h3>
          <p>No events match your current filters. Try adjusting your search criteria.</p>
          <button 
            className="btn-primary-event"
            onClick={() => setFilters({ distance: 'all', type: 'all', urgency: 'all' })}
          >
            Clear All Filters
          </button>
        </div>
      )}
      </div>

      {/* Add Professional Styling */}
      <style jsx="true">{`
        .events-page {
          min-height: 100vh;
          background-color: #ffffff;
        }

        /* Hero Section */
        .events-hero {
          position: relative;
          min-height: 65vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.65) 0%,
            rgba(15, 23, 42, 0.55) 50%,
            rgba(15, 23, 42, 0.65) 100%
          ),
          url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=1080&fit=crop&q=85');
          background-size: cover;
          background-position: center;
          background-attachment: scroll;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0.25) 100%
          );
          z-index: 1;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
          width: 100%;
        }

        .hero-content {
          max-width: 700px;
          text-align: left;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
          color: white;
          padding: 8px 24px;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -2px;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .hero-title .highlight {
          background: linear-gradient(90deg, #4db3a2 0%, #3d8b7a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
          line-height: 1.7;
          max-width: 600px;
        }

        /* Events Container */
        .events-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px 80px 40px;
        }

        /* Filters Section */
        .filters-section {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          padding: 30px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .filter-group {
          flex: 1;
          min-width: 200px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
        }

        .filter-group select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          color: #525252;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #4db3a2;
          box-shadow: 0 0 0 3px rgba(77, 179, 162, 0.1);
        }

        .clear-filters-btn {
          padding: 12px 24px;
          background: #f5f5f5;
          color: #737373;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
          align-self: flex-end;
        }

        .clear-filters-btn:hover {
          background: #e5e5e5;
          border-color: #d4d4d4;
          transform: translateY(-2px);
        }

        .results-info {
          margin-bottom: 30px;
        }

        .results-count {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          color: #737373;
        }

        .results-count strong {
          color: #0f172a;
          font-size: 1.3rem;
        }

        /* Events Grid */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .event-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .event-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .event-card:hover .event-image img {
          transform: scale(1.05);
        }

        .event-badges {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .priority-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Outfit', sans-serif;
          backdrop-filter: blur(8px);
        }

        .priority-badge.urgent {
          background: rgba(239, 68, 68, 0.95);
          color: white;
          animation: pulse 2s infinite;
        }

        .priority-badge.high {
          background: rgba(251, 191, 36, 0.95);
          color: #0f172a;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .event-content {
          padding: 25px;
        }

        .event-header {
          margin-bottom: 15px;
        }

        .event-type-badge {
          display: inline-block;
          background: linear-gradient(135deg, #4db3a2 0%, #3d8b7a 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
        }

        .event-title {
          margin: 0 0 15px 0;
          font-family: 'Outfit', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
        }

        .event-description {
          color: #737373;
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 25px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #525252;
          font-size: 0.9rem;
        }

        .detail-item svg {
          color: #4db3a2;
          flex-shrink: 0;
        }

        .detail-item.distance {
          color: #3d8b7a;
          font-weight: 600;
        }

        .event-actions {
          display: flex;
          gap: 12px;
          padding-top: 20px;
          border-top: 2px solid #f1f5f9;
        }

        .btn-secondary-outline {
          flex: 1;
          padding: 12px 20px;
          background: white;
          color: #525252;
          border: 2px solid #e5e5e5;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-secondary-outline:hover {
          background: #fafafa;
          border-color: #d4d4d4;
          transform: translateY(-2px);
        }

        .btn-primary-event {
          flex: 2;
          padding: 12px 24px;
          background: linear-gradient(135deg, #4db3a2 0%, #3d8b7a 100%);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary-event:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(77, 179, 162, 0.3);
        }

        /* Loading State */
        .loading-state {
          text-align: center;
          padding: 80px 20px;
        }

        .spinner {
          border: 4px solid #f3f4f6;
          border-top: 4px solid #4db3a2;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin: 0 auto 25px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-state p {
          color: #737373;
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 80px 20px;
        }

        .no-results-icon {
          font-size: 5rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .no-results h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.8rem;
          color: #0f172a;
          margin-bottom: 15px;
        }

        .no-results p {
          color: #737373;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .hero-container {
            padding: 60px 20px;
          }

          .events-container {
            padding: 40px 20px 60px 20px;
          }

          .events-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .filters-section {
            padding: 20px;
          }

          .filter-group {
            min-width: 100%;
          }

          .clear-filters-btn {
            width: 100%;
          }

          .event-actions {
            flex-direction: column;
          }

          .btn-secondary-outline,
          .btn-primary-event {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Events;
