import React, { useState, useEffect } from 'react';
import { getHelpRequests, eventsAPI } from '../services/api';
import './Events_redesigned.css';

function Events() {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    urgency: 'all',
    date: 'all'
  });
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [volunteerModal, setVolunteerModal] = useState(false);
  const [volunteerEvent, setVolunteerEvent] = useState(null);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    availability: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: '', message: '' });

  // Fetch help requests on component mount
  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        setLoading(true);
        const response = await getHelpRequests({ showAsEvent: 'true' });
        const transformedRequests = response.helpRequests.map(request => ({
          id: `help-${request._id}`,
          title: `${getHelpTypeLabel(request.helpType)} Assistance`,
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
          postedDate: new Date(request.createdAt),
          organizer: 'Community Member',
          category: getHelpTypeLabel(request.helpType)
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
      'transport': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop',
      'shopping': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop',
      'companionship': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=500&fit=crop',
      'household': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      'meals': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
      'medical': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop',
      'tech': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop',
      'other': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop'
    };
    return images[helpType] || images['other'];
  };

  const staticEvents = [
    {
      id: 1,
      title: 'Community Health & Wellness Workshop',
      date: '2026-01-15',
      time: '10:00 AM - 2:00 PM',
      location: 'Melbourne Community Center, Victoria',
      description: 'Join us for a comprehensive health awareness workshop focusing on HIV prevention, testing awareness, and holistic wellness strategies for the Australian community.',
      attendees: 45,
      type: 'workshop',
      urgency: 'normal',
      distance: 5,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
      organizer: 'Melbourne Health Initiative',
      category: 'Health & Wellness'
    },
    {
      id: 2,
      title: 'Volunteer Orientation & Training',
      date: '2026-01-20',
      time: '9:00 AM - 12:00 PM',
      location: 'Community Center, Sydney NSW',
      description: 'Comprehensive training session for new volunteers. Learn how you can make a meaningful difference supporting people in your community.',
      attendees: 28,
      type: 'training',
      urgency: 'normal',
      distance: 10,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      organizer: 'Volunteer Network',
      category: 'Training & Development'
    },
    {
      id: 3,
      title: 'Annual Fundraising Gala - Hope Rising',
      date: '2026-02-14',
      time: '6:00 PM - 11:00 PM',
      location: 'Crown Melbourne, Southbank VIC',
      description: 'Annual fundraising gala to support community programs and initiatives. An elegant evening of dining, entertainment, and community building. Formal attire.',
      attendees: 150,
      type: 'fundraising',
      urgency: 'normal',
      distance: 8,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
      organizer: 'Local AIDS Foundation',
      category: 'Fundraising'
    },
    {
      id: 4,
      title: 'Weekly Peer Support Circle',
      date: 'Every Wednesday',
      time: '5:00 PM - 7:00 PM',
      location: 'Community Hub, Surry Hills',
      description: 'Weekly peer support group providing a safe, confidential space for sharing experiences, building connections, and mutual support.',
      attendees: 20,
      type: 'support',
      urgency: 'normal',
      distance: 3,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop',
      organizer: 'Peer Support Network',
      category: 'Support Group'
    },
    {
      id: 5,
      title: 'URGENT: Food Bank Distribution Help Needed',
      date: '2026-01-10',
      time: '8:00 AM - 4:00 PM',
      location: 'Food Bank, Brisbane QLD',
      description: 'Urgent need for volunteers to help pack and distribute food parcels to community members facing food insecurity. Your help makes a real difference.',
      attendees: 12,
      type: 'volunteer',
      urgency: 'urgent',
      distance: 15,
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop',
      organizer: 'Community Food Bank',
      category: 'Emergency Support'
    },
    {
      id: 6,
      title: 'Home Care & Companionship Program',
      date: '2026-01-18',
      time: '9:00 AM - 1:00 PM',
      location: 'Various Locations, Perth WA',
      description: 'Volunteers needed to provide home care assistance including grocery shopping, meal preparation, and companionship for community members who need support.',
      attendees: 8,
      type: 'care',
      urgency: 'high',
      distance: 20,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=500&fit=crop',
      organizer: 'Home Care Services',
      category: 'Care & Support'
    },
    {
      id: 7,
      title: 'Youth Awareness & Outreach Day',
      date: '2026-01-25',
      time: '11:00 AM - 5:00 PM',
      location: 'Federation Square, Melbourne VIC',
      description: 'Community outreach program to educate young Australians about health awareness, prevention, and available support services.',
      attendees: 35,
      type: 'outreach',
      urgency: 'normal',
      distance: 6,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop',
      organizer: 'Youth Health Initiative',
      category: 'Community Outreach'
    },
    {
      id: 8,
      title: 'Free Health Check & Wellness Day',
      date: '2026-02-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Health Centre, Adelaide SA',
      description: 'Community wellness day offering free health screenings, professional counselling, and wellness resources. Volunteers needed for registration and support.',
      attendees: 60,
      type: 'health',
      urgency: 'high',
      distance: 25,
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=500&fit=crop',
      organizer: 'Adelaide Health Services',
      category: 'Health Services'
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
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        (event.category && event.category.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }
    
    // Type filter
    if (filters.type !== 'all' && event.type !== filters.type) return false;
    
    // Urgency filter
    if (filters.urgency !== 'all' && event.urgency !== filters.urgency) return false;
    
    // Date filter
    if (filters.date !== 'all') {
      const eventDate = new Date(event.date);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      if (filters.date === 'today' && eventDate.toDateString() !== today.toDateString()) return false;
      if (filters.date === 'week' && eventDate > weekFromNow) return false;
      if (filters.date === 'month' && eventDate > monthFromNow) return false;
    }
    
    return true;
  });

  const getTypeBadge = (type) => {
    const typeConfig = {
      workshop: { icon: '📚', label: 'Workshop', color: '#3b82f6' },
      training: { icon: '🎓', label: 'Training', color: '#8b5cf6' },
      fundraising: { icon: '💰', label: 'Fundraising', color: '#10b981' },
      support: { icon: '💬', label: 'Support', color: '#f59e0b' },
      volunteer: { icon: '🤝', label: 'Volunteer', color: '#ec4899' },
      care: { icon: '❤️', label: 'Care', color: '#ef4444' },
      outreach: { icon: '📢', label: 'Outreach', color: '#06b6d4' },
      health: { icon: '🏥', label: 'Health', color: '#14b8a6' },
      'help-request': { icon: '🆘', label: 'Help Request', color: '#f97316' }
    };
    const config = typeConfig[type] || { icon: '📌', label: type, color: '#6b7280' };
    return { ...config };
  };

  const formatDate = (dateString) => {
    if (dateString.toLowerCase().includes('every') || dateString.toLowerCase().includes('flexible')) {
      return dateString;
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-AU', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (hours < 1) return 'Just now';
      if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
      return null; // Don't show if older than a week
    } catch {
      return null;
    }
  };

  const handleVolunteerClick = (event, e) => {
    e.stopPropagation();
    setVolunteerEvent(event);
    setVolunteerModal(true);
    setSubmitStatus({ show: false, type: '', message: '' });
  };

  const handleVolunteerFormChange = (e) => {
    setVolunteerForm({
      ...volunteerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.phone) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(volunteerForm.email)) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(volunteerForm.phone)) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Please enter a valid 10-digit phone number'
      });
      return;
    }

    try {
      // Send volunteer signup to backend
      await eventsAPI.register(volunteerEvent.id);
      
      // Optionally send additional volunteer details via messages or notifications
      console.log('Volunteer signup:', {
        event: volunteerEvent,
        volunteer: volunteerForm
      });

      setSubmitStatus({
        show: true,
        type: 'success',
        message: 'Thank you for volunteering! We will contact you soon.'
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setVolunteerModal(false);
        setVolunteerForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          availability: ''
        });
        setSubmitStatus({ show: false, type: '', message: '' });
      }, 2000);

    } catch (error) {
      setSubmitStatus({
        show: true,
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    }
  };

  const closeVolunteerModal = () => {
    setVolunteerModal(false);
    setVolunteerEvent(null);
    setVolunteerForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      availability: ''
    });
    setSubmitStatus({ show: false, type: '', message: '' });
  };

  return (
    <div className="events-page-redesigned">
      {/* Modern Hero Section */}
      <section className="events-hero-modern">
        <div className="hero-background">
          <div className="hero-image-bg"></div>
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <span className="hero-label">Community Opportunities</span>
            <h1 className="hero-title-modern">
              Discover Ways to
              <span className="highlight-gradient"> Make an Impact</span>
            </h1>
            <p className="hero-subtitle">
              Join meaningful events, volunteer opportunities, and community initiatives. 
              Every action creates positive change.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{allEvents.length}</div>
                <div className="stat-label">Active Opportunities</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{allEvents.filter(e => e.urgency === 'urgent' || e.urgency === 'high').length}</div>
                <div className="stat-label">Urgent Needs</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{allEvents.reduce((sum, e) => sum + (e.attendees || 0), 0)}</div>
                <div className="stat-label">People Helping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Filter Bar */}
      <div className="events-content-wrapper">
        <div className="filter-bar-modern">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search events, locations, or categories..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
            {filters.search && (
              <button 
                className="clear-search"
                onClick={() => handleFilterChange('search', '')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-controls">
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshops</option>
              <option value="training">Training</option>
              <option value="volunteer">Volunteer</option>
              <option value="care">Care & Support</option>
              <option value="health">Health Services</option>
              <option value="fundraising">Fundraising</option>
              <option value="support">Support Groups</option>
              <option value="outreach">Outreach</option>
            </select>

            <select 
              value={filters.urgency}
              onChange={(e) => handleFilterChange('urgency', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High Priority</option>
              <option value="normal">Normal</option>
            </select>

            <select 
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="results-header">
          <p className="results-count-modern">
            <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'opportunity' : 'opportunities'} found
          </p>
          {(filters.search || filters.type !== 'all' || filters.urgency !== 'all' || filters.date !== 'all') && (
            <button 
              className="clear-all-btn"
              onClick={() => setFilters({ search: '', type: 'all', urgency: 'all', date: 'all' })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear all filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-modern">
            <div className="loading-spinner-modern"></div>
            <p>Loading opportunities...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-results-modern">
            <div className="no-results-icon">🔍</div>
            <h3>No opportunities found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button 
              className="btn-primary-modern"
              onClick={() => setFilters({ search: '', type: 'all', urgency: 'all', date: 'all' })}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`events-container-modern ${viewMode}`}>
            {filteredEvents.map(event => {
              const typeInfo = getTypeBadge(event.type);
              const timeAgo = event.createdAt ? getTimeAgo(event.createdAt) : null;
              
              return (
                <article 
                  key={event.id} 
                  className={`event-card-modern ${viewMode}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-image-wrapper">
                    <img src={event.image} alt={event.title} className="event-image-modern" />
                    <div className="event-image-badges">
                      <span className="type-badge-overlay" style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: typeInfo.color }}>
                        {typeInfo.icon} {typeInfo.label}
                      </span>
                      {timeAgo && (
                        <span className="time-badge-overlay">
                          {timeAgo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="event-body">
                    <h3 className="event-title-modern">{event.title}</h3>
                    <p className="event-description-modern">{event.description}</p>

                    <div className="event-location-section">
                      <div className="location-info">
                        <div className="location-icon-wrapper">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        </div>
                        <div className="location-details">
                          <span className="location-name">{event.location}</span>
                          {event.distance && <span className="location-distance">{event.distance} km away</span>}
                        </div>
                      </div>
                      {event.location && !event.location.toLowerCase().includes('flexible') && (
                        <a
                          className="view-map-link"
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Map
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      )}
                    </div>

                    <div className="event-time-info">
                      <div className="time-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{event.duration || '2 hours'}</span>
                      </div>
                      <div className="time-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>{formatDate(event.date)}, {event.time}</span>
                      </div>
                    </div>

                    <div className="event-requester-section">
                      <div className="requester-info">
                        <div className="requester-avatar">
                          {event.requesterName ? event.requesterName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="requester-details">
                          <span className="requester-name">{event.requesterName || 'Community Member'}</span>
                          <span className="requester-label">Requesting Help</span>
                        </div>
                      </div>
                    </div>

                    <div className="event-actions-modern">
                      <button 
                        className="btn-directions-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (event.location) {
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.location)}`, '_blank');
                          }
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m3 11 18-5v12L3 14v-3z"/>
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                        </svg>
                        Directions
                      </button>
                      <button 
                        className="btn-volunteer-modern"
                        onClick={(e) => handleVolunteerClick(event, e)}
                      >
                        Volunteer Now
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14m-7-7l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div className="modal-image">
              <img src={selectedEvent.image} alt={selectedEvent.title} />
            </div>
            
            <div className="modal-content">
              <div className="modal-header">
                <span className="type-badge-modern" style={{ 
                  backgroundColor: `${getTypeBadge(selectedEvent.type).color}15`, 
                  color: getTypeBadge(selectedEvent.type).color 
                }}>
                  {getTypeBadge(selectedEvent.type).icon} {getTypeBadge(selectedEvent.type).label}
                </span>
                {(selectedEvent.urgency === 'urgent' || selectedEvent.urgency === 'high') && (
                  <span className={`urgency-badge-modern ${selectedEvent.urgency}`}>
                    {selectedEvent.urgency === 'urgent' ? '⚡ URGENT' : '⚠️ HIGH PRIORITY'}
                  </span>
                )}
              </div>
              
              <h2 className="modal-title">{selectedEvent.title}</h2>
              <p className="modal-description">{selectedEvent.description}</p>
              
              <div className="modal-details">
                <div className="modal-detail-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>
                    <strong>Date:</strong> {formatDate(selectedEvent.date)}
                  </div>
                </div>
                <div className="modal-detail-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <strong>Time:</strong> {selectedEvent.time}
                  </div>
                </div>
                <div className="modal-detail-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <strong>Location:</strong> {selectedEvent.location}
                  </div>
                </div>
                {selectedEvent.organizer && (
                  <div className="modal-detail-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <div>
                      <strong>Organizer:</strong> {selectedEvent.organizer}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button className="btn-volunteer-modern large">
                  <span>Sign Up to Volunteer</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>
                {selectedEvent.location && !selectedEvent.location.toLowerCase().includes('flexible') && (
                  <a
                    className="btn-directions-modern large"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedEvent.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>Get Directions</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Signup Modal */}
      {volunteerModal && volunteerEvent && (
        <div className="volunteer-modal-overlay" onClick={closeVolunteerModal}>
          <div className="volunteer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVolunteerModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="volunteer-modal-header">
              <h2>Volunteer Sign Up</h2>
              <p className="volunteer-event-title">{volunteerEvent.title}</p>
            </div>

            {submitStatus.show && (
              <div className={`submit-message ${submitStatus.type}`}>
                {submitStatus.type === 'success' ? '✓' : '⚠'} {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleVolunteerSubmit} className="volunteer-form">
              <div className="form-group">
                <label htmlFor="volunteer-name">Full Name *</label>
                <input
                  type="text"
                  id="volunteer-name"
                  name="name"
                  value={volunteerForm.name}
                  onChange={handleVolunteerFormChange}
                  placeholder="Enter your full name"
                  required
                  disabled={submitStatus.type === 'success'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="volunteer-email">Email Address *</label>
                <input
                  type="email"
                  id="volunteer-email"
                  name="email"
                  value={volunteerForm.email}
                  onChange={handleVolunteerFormChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={submitStatus.type === 'success'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="volunteer-phone">Phone Number *</label>
                <input
                  type="tel"
                  id="volunteer-phone"
                  name="phone"
                  value={volunteerForm.phone}
                  onChange={handleVolunteerFormChange}
                  placeholder="10-digit number (e.g., 9876543210)"
                  pattern="[0-9]{10}"
                  required
                  disabled={submitStatus.type === 'success'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="volunteer-availability">Your Availability</label>
                <input
                  type="text"
                  id="volunteer-availability"
                  name="availability"
                  value={volunteerForm.availability}
                  onChange={handleVolunteerFormChange}
                  placeholder="e.g., Weekends, Evenings, Flexible"
                  disabled={submitStatus.type === 'success'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="volunteer-message">Message (Optional)</label>
                <textarea
                  id="volunteer-message"
                  name="message"
                  value={volunteerForm.message}
                  onChange={handleVolunteerFormChange}
                  placeholder="Tell us why you'd like to volunteer or any special skills you have..."
                  rows="4"
                  disabled={submitStatus.type === 'success'}
                />
              </div>

              <div className="volunteer-modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={closeVolunteerModal}
                  disabled={submitStatus.type === 'success'}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-submit-volunteer"
                  disabled={submitStatus.type === 'success'}
                >
                  {submitStatus.type === 'success' ? 'Submitted!' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
