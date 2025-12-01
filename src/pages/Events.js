import React, { useState } from 'react';
import './Pages.css';

function Events() {
  const [filters, setFilters] = useState({
    distance: 'all',
    type: 'all',
    urgency: 'all'
  });

  const allEvents = [
    {
      id: 1,
      title: 'Transport to Medical Appointment',
      date: 'Tomorrow, 9:00 AM',
      time: '2 hours',
      location: 'Carlton, VIC',
      description: 'Need a volunteer driver to take me to my medical appointment at Royal Melbourne Hospital and wait to bring me back home.',
      attendees: 1,
      type: 'transport',
      urgency: 'normal',
      distance: 2.3,
      timeAgo: '2 hours ago',
      requester: 'Mary Johnson',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Grocery Shopping Assistance',
      date: 'Saturday, 10:00 AM',
      time: '1.5 hours',
      location: 'Fitzroy, VIC',
      description: 'Looking for someone to help with weekly grocery shopping. I have mobility issues and need help carrying bags.',
      attendees: 1,
      type: 'groceries',
      urgency: 'normal',
      distance: 1.8,
      timeAgo: '4 hours ago',
      requester: 'Tom Smith',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Companion for Elderly',
      date: 'Flexible',
      time: '3 hours',
      location: 'Richmond, VIC',
      description: 'Seeking a friendly companion for my mother who lives alone. Just someone to chat, play cards, or go for a short walk.',
      attendees: 1,
      type: 'companionship',
      urgency: 'normal',
      distance: 3.1,
      timeAgo: '1 day ago',
      requester: 'Helen Kim',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Help with Technology Setup',
      date: 'This Weekend',
      time: '1 hour',
      location: 'Collingwood, VIC',
      description: 'Need help setting up a new laptop and teaching basic email and video calling to stay connected with family overseas.',
      attendees: 1,
      type: 'tech',
      urgency: 'normal',
      distance: 4.2,
      timeAgo: '5 hours ago',
      requester: 'George Miller',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
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
      timeAgo: '1 hour ago',
      requester: 'OzHarvest Brisbane',
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
      urgency: 'normal',
      distance: 20,
      timeAgo: '3 hours ago',
      requester: 'Perth Care Services',
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
      timeAgo: '2 days ago',
      requester: 'Melbourne Health Network',
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
      timeAgo: '30 minutes ago',
      requester: 'RPA Hospital Volunteer Coordinator',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop'
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
    // Only show badges for urgent requests - don't show medium/low/normal priority
    if (urgency === 'urgent') return <span className="urgency-badge urgent">Urgent</span>;
    return null;
  };

  const getTypeBadge = (type) => {
    const typeLabels = {
      transport: '🚗 Transport',
      groceries: '🛒 Groceries', 
      companionship: '👥 Companionship',
      tech: '💻 Tech Support',
      volunteer: '🤝 Volunteer',
      care: '❤️ Care',
      outreach: '📢 Outreach',
      health: '🏥 Health'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Volunteer Opportunities</h1>
        <p>Make a Difference Today</p>
        <p>These are the most recent requests for help in your community. Each opportunity is a chance to positively impact someone's life.</p>
      </div>

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
            <option value="transport">Transport</option>
            <option value="groceries">Groceries</option>
            <option value="companionship">Companionship</option>
            <option value="tech">Tech Support</option>
            <option value="volunteer">Volunteer</option>
            <option value="care">Care & Support</option>
            <option value="outreach">Outreach</option>
            <option value="health">Health Services</option>
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
  );
}

export default Events;
