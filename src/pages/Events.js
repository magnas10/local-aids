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
    <div className="page-container">
      <div className="opportunities-header">
        <h1>Make a Difference <span className="highlight-text">Today</span></h1>
        <p>These are the most recent requests for help in your community. Each opportunity is a chance to positively impact someone's life.</p>
      </div>

      <section className="filters-container" aria-label="Filter events">
        <div className="filter-group">
          <label htmlFor="distance-filter">Distance</label>
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
          <label htmlFor="type-filter">Type</label>
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
          <label htmlFor="urgency-filter">Urgency</label>
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
          Clear Filters
        </button>
      </section>

      <p className="results-count">
        Showing {filteredEvents.length} opportunities
      </p>
      <div className="opportunities-grid" role="list" aria-label="Event listings">
        {filteredEvents.map(event => (
          <div 
            key={event.id} 
            className="opportunity-card"
            role="listitem"
          >
            <div className="opportunity-image">
              <img src={event.image} alt={`${event.title} event`} />
              <div className="priority-badge-container">
                {event.urgency === 'urgent' && (
                  <span className="priority-badge high-priority">
                    HIGH PRIORITY
                  </span>
                )}
                <span className="category-badge">
                  {getTypeBadge(event.type)}
                </span>
              </div>
            </div>
            <div className="opportunity-content">
              <h3 className="opportunity-title">{event.title}</h3>
              <p className="opportunity-description">{event.description}</p>
              
              <div className="location-info">
                <div className="location-marker">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="location-text">{event.location.split(',')[0]}, {event.location.split(',')[1]}</span>
                  <a href="#" className="view-map-link">View Map</a>
                </div>
                <div className="distance-info">{event.distance} km away</div>
              </div>
              
              <div className="time-info">
                <div className="time-duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span>2 hours</span>
                </div>
                <div className="time-flexible">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{event.date}, {event.time}</span>
                </div>
              </div>
              
              <div className="volunteer-info">
                <div className="volunteer-avatar">
                  <img src={`https://i.pravatar.cc/40?img=${event.id}`} alt="Volunteer" />
                </div>
                <div className="volunteer-details">
                  <div className="volunteer-name">Requesting Help</div>
                </div>
              </div>
              
              <div className="opportunity-actions">
                <button className="directions-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11H1l8-8v6h8l-8 8v-6z"/>
                  </svg>
                  Directions
                </button>
                <button className="volunteer-btn">
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

      {filteredEvents.length === 0 && (
        <div className="no-results" role="status" aria-live="polite">
          <p>No events match your filters. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Events;
