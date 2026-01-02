import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHelpOpportunities } from '../services/api';
import './Opportunities.css';
import './HelpRequestStyles.css';

function Opportunities() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLocation, setMapLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  
  // Volunteer Form States
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [volunteerOpportunity, setVolunteerOpportunity] = useState(null);
  const [volunteerForm, setVolunteerForm] = useState({
    message: '',
    phone: '',
    availability: '',
    experience: '',
    transportMode: 'own'
  });
  
  // Notification States
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // Help Requests State
  const [helpOpportunities, setHelpOpportunities] = useState([]);
  const [loadingHelp, setLoadingHelp] = useState(true);

  // Fetch help opportunities on component mount
  useEffect(() => {
    const fetchHelpOpportunities = async () => {
      try {
        setLoadingHelp(true);
        const response = await getHelpOpportunities(3); // Get top 3 high priority requests
        setHelpOpportunities(response || []);
      } catch (error) {
        console.error('Failed to fetch help opportunities:', error);
        setHelpOpportunities([]);
      } finally {
        setLoadingHelp(false);
      }
    };

    fetchHelpOpportunities();
  }, []);

  const staticOpportunities = [
    {
      id: 1,
      title: 'Transport to Medical Appointment',
      description: 'Need a volunteer driver to take me to my medical appointment at Royal Melbourne Hospital and wait to bring me back home.',
      distance: '2.3',
      duration: '2 hours',
      priority: 'High',
      category: 'Transport',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      postedTime: '2 hours ago',
      requester: 'Mary Johnson',
      requesterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      location: 'Carlton, VIC',
      address: '45 Drummond Street, Carlton VIC 3053',
      coordinates: { lat: -37.8008, lng: 144.9671 },
      date: 'Tomorrow, 9:00 AM',
      verified: true
    },
    {
      id: 2,
      title: 'Grocery Shopping Assistance',
      description: 'Looking for someone to help with weekly grocery shopping. I have mobility issues and need help carrying bags.',
      distance: '1.8',
      duration: '1.5 hours',
      priority: 'Medium',
      category: 'Groceries',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
      postedTime: '4 hours ago',
      requester: 'Tom Smith',
      requesterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      location: 'Fitzroy, VIC',
      address: '123 Brunswick Street, Fitzroy VIC 3065',
      coordinates: { lat: -37.7963, lng: 144.9780 },
      date: 'Saturday, 10:00 AM',
      verified: true
    },
    {
      id: 3,
      title: 'Companion for Elderly',
      description: 'Seeking a friendly companion for my mother who lives alone. Just someone to chat, play cards, or go for a short walk.',
      distance: '3.1',
      duration: '3 hours',
      priority: 'Low',
      category: 'Companionship',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=250&fit=crop',
      postedTime: '1 day ago',
      requester: 'Helen Kim',
      requesterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      location: 'Richmond, VIC',
      address: '78 Church Street, Richmond VIC 3121',
      coordinates: { lat: -37.8183, lng: 144.9987 },
      date: 'Flexible',
      verified: false
    },
    {
      id: 4,
      title: 'Help with Technology Setup',
      description: 'Need help setting up a new laptop and teaching basic email and video calling to stay connected with family overseas.',
      distance: '4.2',
      duration: '1 hour',
      priority: 'Medium',
      category: 'Tech Support',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
      postedTime: '5 hours ago',
      requester: 'George Miller',
      requesterImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      location: 'Collingwood, VIC',
      address: '200 Smith Street, Collingwood VIC 3066',
      coordinates: { lat: -37.7989, lng: 144.9876 },
      date: 'This Weekend',
      verified: true
    }
  ];

  // Combine static opportunities with help requests from API
  const opportunities = loadingHelp ? staticOpportunities : [...helpOpportunities, ...staticOpportunities];

  const openMapModal = (opportunity, directionsMode = false) => {
    setMapLocation(opportunity);
    setShowDirections(directionsMode);
    setShowMapModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMapModal = () => {
    setShowMapModal(false);
    setMapLocation(null);
    setShowDirections(false);
    document.body.style.overflow = 'auto';
  };

  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };

  const getDirectionsUrl = (opportunity) => {
    if (!opportunity) return '';
    const { lat, lng } = opportunity.coordinates;
    // Melbourne CBD as starting point for demo
    return `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d25215!2d144.96!3d-37.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC!3m2!1d-37.8136276!2d144.9630576!4m5!1s0x0%3A0x0!2zM${Math.abs(lat).toFixed(4)}!3m2!1d${lat}!2d${lng}!5e0!3m2!1sen!2sau!4v1635000000000!5m2!1sen!2sau`;
  };

  // Volunteer Now Handler
  const handleVolunteerNow = (opportunity, e) => {
    if (e) e.stopPropagation();
    
    if (!isLoggedIn) {
      // Not logged in - redirect to login page
      navigate('/login', { state: { from: '/', opportunityId: opportunity.id } });
      return;
    }
    
    // Logged in - show volunteer form modal
    setVolunteerOpportunity(opportunity);
    setShowVolunteerModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVolunteerModal = () => {
    setShowVolunteerModal(false);
    setVolunteerOpportunity(null);
    setVolunteerForm({
      message: '',
      phone: '',
      availability: '',
      experience: '',
      transportMode: 'own'
    });
    document.body.style.overflow = 'auto';
  };

  const handleVolunteerFormChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    
    // Show success notification
    showNotification('success', `🎉 Thank you for volunteering! ${volunteerOpportunity.requester} will be notified of your offer to help with "${volunteerOpportunity.title}".`);
    
    closeVolunteerModal();
  };

  // Notification System
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const closeNotification = () => {
    setNotification({ show: false, type: '', message: '' });
  };

  const getMapEmbedUrl = (opportunity) => {
    if (!opportunity) return '';
    const { lat, lng } = opportunity.coordinates;
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM37CsDA4JzA2LjQiUyAxNDTCsDU1JzU5LjciRQ!5e0!3m2!1sen!2sau!4v1635000000000!5m2!1sen!2sau`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Transport': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 5H6.3a2 2 0 0 0-1.6.9L2 9.5C1.4 9.7.7 10.5.7 11.4v4c0 .6.4 1 1 1h2m15.3-2H5"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      ),
      'Groceries': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      'Companionship': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      'Tech Support': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    };
    return icons[category] || icons['Companionship'];
  };

  return (
    <section className="opportunities-section" id="opportunities">
      <div className="opportunities-wrapper">
        {/* Section Header */}
        <div className="opp-section-header">
          <div className="opp-header-content">
            <span className="opp-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Volunteer Opportunities
            </span>
            <h2>Make a Difference Today</h2>
            <p>These are the most recent requests for help in your community. Each opportunity is a chance to positively impact someone's life.</p>
          </div>
          <Link to="/events" className="opp-view-all">
            View All Opportunities
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Opportunities Grid */}
        <div className="opp-grid">
          {opportunities.map((opportunity) => (
            <article 
              key={opportunity.id} 
              className={`opp-card priority-${opportunity.priority.toLowerCase()} ${opportunity.type === 'help-request' ? 'help-request-card' : ''}`}
              data-type={opportunity.type}
              onClick={() => setSelectedOpportunity(opportunity)}
            >
              {/* Card Image */}
              <div className="opp-card-image">
                <img src={opportunity.image} alt={opportunity.title} />
                <div className="opp-image-overlay">
                  <span className="opp-category">
                    {getCategoryIcon(opportunity.category)}
                    {opportunity.category}
                  </span>
                </div>
                <div className="opp-time-badge">{opportunity.postedTime}</div>
              </div>

              {/* Card Content */}
              <div className={`opp-card-content ${opportunity.type === 'help-request' ? 'help-request-content' : ''}`}>
                <h3 className="opp-title">{opportunity.title}</h3>
                <p className="opp-description">{opportunity.description}</p>

                {/* Location with Map Link */}
                <div 
                  className="opp-location-row"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMapModal(opportunity);
                  }}
                >
                  <div className="opp-location-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="opp-location-info">
                    <span className="opp-location-name">{opportunity.location}</span>
                    <span className="opp-distance">{opportunity.distance} km away</span>
                  </div>
                  <span className="opp-map-link">
                    View Map
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </span>
                </div>

                {/* Details Row */}
                <div className="opp-details-row">
                  <div className="opp-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{opportunity.duration}</span>
                  </div>
                  <div className="opp-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{opportunity.date}</span>
                  </div>
                </div>

                {/* Requester */}
                <div className="opp-requester">
                  <img src={opportunity.requesterImage} alt={opportunity.requester} className="opp-requester-img" />
                  <div className="opp-requester-info">
                    <span className="opp-requester-name">
                      {opportunity.requester}
                      {opportunity.verified && (
                        <svg viewBox="0 0 24 24" fill="#20b2aa" width="14" height="14" className="verified-badge">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </span>
                    <span className="opp-requester-label">Requesting Help</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="opp-actions">
                  <button 
                    className="opp-btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMapModal(opportunity, true);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    Directions
                  </button>
                  <button 
                    className="opp-btn-primary"
                    onClick={(e) => handleVolunteerNow(opportunity, e)}
                  >
                    Volunteer Now
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Map Section */}
        <div className="opp-map-section">
          <div className="opp-map-header">
            <div className="opp-map-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              <div>
                <h3>Opportunities Near You</h3>
                <p>Click on any location marker to view details</p>
              </div>
            </div>
            <button 
              className="opp-fullmap-btn"
              onClick={() => window.open('https://www.google.com/maps/search/volunteer+opportunities+melbourne', '_blank')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              Open Full Map
            </button>
          </div>
          
          <div className="opp-map-container">
            {/* Interactive Map Placeholder with Markers */}
            <div className="opp-map-interactive">
              <iframe
                title="Opportunities Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50430.06385773056!2d144.94373595!3d-37.8136276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Location Cards Overlay */}
              <div className="opp-map-markers">
                {opportunities.map((opp, index) => (
                  <div 
                    key={opp.id}
                    className={`opp-marker marker-${index + 1}`}
                    onClick={() => openMapModal(opp)}
                    title={opp.title}
                  >
                    <div className={`marker-dot priority-${opp.priority.toLowerCase()}`}>
                      {index + 1}
                    </div>
                    <div className="marker-popup">
                      <strong>{opp.title}</strong>
                      <span>{opp.location}</span>
                      <span className="marker-distance">{opp.distance} km</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location List */}
            <div className="opp-locations-list">
              <h4>All Locations</h4>
              {opportunities.map((opp, index) => (
                <div 
                  key={opp.id}
                  className="opp-location-item"
                  onClick={() => openMapModal(opp)}
                >
                  <div className={`location-number priority-${opp.priority.toLowerCase()}`}>
                    {index + 1}
                  </div>
                  <div className="location-details">
                    <span className="location-title">{opp.title}</span>
                    <span className="location-address">{opp.address}</span>
                  </div>
                  <div className="location-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Modal */}
        {showMapModal && mapLocation && (
          <div className="map-modal-overlay" onClick={closeMapModal}>
            <div className="map-modal" onClick={(e) => e.stopPropagation()}>
              <div className="map-modal-header">
                <div className="map-modal-info">
                  <h3>{mapLocation.title}</h3>
                  <p>{mapLocation.address}</p>
                </div>
                <button className="map-modal-close" onClick={closeMapModal}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div className="map-modal-tabs">
                <button 
                  className={`map-tab ${!showDirections ? 'active' : ''}`}
                  onClick={() => setShowDirections(false)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Location
                </button>
                <button 
                  className={`map-tab ${showDirections ? 'active' : ''}`}
                  onClick={() => setShowDirections(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                  </svg>
                  Directions
                </button>
              </div>

              <div className="map-modal-content">
                {showDirections ? (
                  <iframe
                    title={`Directions to ${mapLocation.title}`}
                    src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d50430!2d144.96!3d-37.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20Central!3m2!1d-37.8102!2d144.9628!4m5!1s0x0%3A0x0!2s${encodeURIComponent(mapLocation.address)}!3m2!1d${mapLocation.coordinates.lat}!2d${mapLocation.coordinates.lng}!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <iframe
                    title={`Map - ${mapLocation.title}`}
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${mapLocation.coordinates.lng}!3d${mapLocation.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLocation!5e0!3m2!1sen!2sau!4v1635000000000!5m2!1sen!2sau`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>

              <div className="map-modal-footer">
                <div className="map-modal-details">
                  <div className="map-detail-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{mapLocation.location} • {mapLocation.distance} km away</span>
                  </div>
                  <div className="map-detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{mapLocation.duration} • {mapLocation.date}</span>
                  </div>
                </div>
                <div className="map-modal-actions">
                  <button 
                    className={`map-btn-directions ${showDirections ? 'active' : ''}`}
                    onClick={toggleDirections}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    {showDirections ? 'View Location' : 'Get Directions'}
                  </button>
                  <button 
                    className="map-btn-volunteer"
                    onClick={() => {
                      closeMapModal();
                      handleVolunteerNow(mapLocation);
                    }}
                  >
                    Volunteer Now
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer Form Modal */}
        {showVolunteerModal && volunteerOpportunity && (
          <div className="volunteer-modal-overlay" onClick={closeVolunteerModal}>
            <div className="volunteer-modal" onClick={(e) => e.stopPropagation()}>
              <div className="volunteer-modal-header">
                <div className="volunteer-modal-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Volunteer Application
                </div>
                <button className="volunteer-modal-close" onClick={closeVolunteerModal}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Opportunity Summary */}
              <div className="volunteer-opp-summary">
                <img src={volunteerOpportunity.image} alt={volunteerOpportunity.title} />
                <div className="volunteer-opp-info">
                  <h3>{volunteerOpportunity.title}</h3>
                  <div className="volunteer-opp-meta">
                    <span>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {volunteerOpportunity.location}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {volunteerOpportunity.duration}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {volunteerOpportunity.date}
                    </span>
                  </div>
                  <div className="volunteer-requester-row">
                    <img src={volunteerOpportunity.requesterImage} alt={volunteerOpportunity.requester} />
                    <span>Helping <strong>{volunteerOpportunity.requester}</strong></span>
                  </div>
                </div>
              </div>

              {/* Volunteer Form */}
              <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
                <div className="volunteer-form-group">
                  <label>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Message to {volunteerOpportunity.requester}
                  </label>
                  <textarea
                    name="message"
                    placeholder="Introduce yourself and explain why you'd like to help..."
                    value={volunteerForm.message}
                    onChange={handleVolunteerFormChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="volunteer-form-row">
                  <div className="volunteer-form-group">
                    <label>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="04XX XXX XXX"
                      value={volunteerForm.phone}
                      onChange={handleVolunteerFormChange}
                      required
                    />
                  </div>

                  <div className="volunteer-form-group">
                    <label>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      Your Availability
                    </label>
                    <select
                      name="availability"
                      value={volunteerForm.availability}
                      onChange={handleVolunteerFormChange}
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="exact">Available at requested time</option>
                      <option value="flexible">Flexible schedule</option>
                      <option value="negotiate">Need to negotiate time</option>
                    </select>
                  </div>
                </div>

                <div className="volunteer-form-row">
                  <div className="volunteer-form-group">
                    <label>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <circle cx="12" cy="8" r="7"/>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                      </svg>
                      Relevant Experience
                    </label>
                    <select
                      name="experience"
                      value={volunteerForm.experience}
                      onChange={handleVolunteerFormChange}
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="first">First time volunteer</option>
                      <option value="some">Some volunteer experience</option>
                      <option value="experienced">Experienced volunteer</option>
                      <option value="professional">Professional background</option>
                    </select>
                  </div>

                  <div className="volunteer-form-group">
                    <label>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="21.17" y1="8" x2="12" y2="8"/>
                        <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
                        <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                      </svg>
                      Transport Mode
                    </label>
                    <select
                      name="transportMode"
                      value={volunteerForm.transportMode}
                      onChange={handleVolunteerFormChange}
                    >
                      <option value="own">Own vehicle</option>
                      <option value="public">Public transport</option>
                      <option value="bike">Bicycle</option>
                      <option value="walk">Walking</option>
                    </select>
                  </div>
                </div>

                <div className="volunteer-form-actions">
                  <button type="button" className="volunteer-btn-cancel" onClick={closeVolunteerModal}>
                    Cancel
                  </button>
                  <button type="submit" className="volunteer-btn-submit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notification Alert */}
        {notification.show && (
          <div className={`notification-alert ${notification.type}`}>
            <div className="notification-content">
              <div className="notification-icon">
                {notification.type === 'success' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                )}
              </div>
              <p>{notification.message}</p>
            </div>
            <button className="notification-close" onClick={closeNotification}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Opportunities;
