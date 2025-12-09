import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Donate() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedCampaignModal, setSelectedCampaignModal] = useState(null);
  const [campaignData, setCampaignData] = useState({
    title: '',
    category: '',
    goal: '',
    description: '',
    endDate: '',
    image: null
  });

  const impactItems = [
    {
      amount: 25,
      impact: 'Provides essential transportation services for elderly individuals to attend critical medical appointments',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
    },
    {
      amount: 50,
      impact: 'Supplies nutritious groceries and essential provisions for a family in need for one week',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=100&h=100&fit=crop'
    },
    {
      amount: 100,
      impact: 'Funds comprehensive technology training programs for five seniors, improving digital literacy',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=100&h=100&fit=crop'
    },
    {
      amount: 250,
      impact: 'Supports targeted community outreach initiatives in underserved and vulnerable neighborhoods',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop'
    },
    {
      amount: 500,
      impact: 'Enables strategic expansion of volunteer programs to reach new communities across Australia',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=100&h=100&fit=crop'
    }
  ];

  const activeCampaigns = [
    {
      id: 1,
      title: 'Help Melbourne Flood Victims',
      organizer: 'Sarah Mitchell',
      category: 'Disaster Relief',
      goal: 50000,
      raised: 32500,
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=500&h=300&fit=crop&q=80',
      daysLeft: 12,
      donors: 245
    },
    {
      id: 2,
      title: 'School Supplies for Rural Kids',
      organizer: 'James Chen',
      category: 'Education',
      goal: 15000,
      raised: 11200,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop&q=80',
      daysLeft: 8,
      donors: 128
    },
    {
      id: 3,
      title: 'Senior Care Technology Fund',
      organizer: 'Emily Rodriguez',
      category: 'Healthcare',
      goal: 25000,
      raised: 18750,
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=300&fit=crop&q=80',
      daysLeft: 20,
      donors: 189
    },
    {
      id: 4,
      title: 'Community Garden Project',
      organizer: 'Michael Thompson',
      category: 'Environment',
      goal: 8000,
      raised: 6400,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop&q=80',
      daysLeft: 15,
      donors: 92
    }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % activeCampaigns.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + activeCampaigns.length) % activeCampaigns.length);
  };

  const goToSlide = (index) => {
    setCarouselIndex(index);
  };

  const handleCampaignChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    alert('Campaign created successfully! It will be reviewed within 24 hours.');
    setShowCreateCampaign(false);
    setCampaignData({
      title: '',
      category: '',
      goal: '',
      description: '',
      endDate: '',
      image: null
    });
  };

  return (
    <div className="donate-page-pro">
      {/* Hero Section - Enhanced */}
      <section className="donate-hero-pro">
        <div className="donate-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop&q=85" 
            alt="Community volunteers making a real difference together"
          />
          <div className="donate-hero-overlay-dark"></div>
          <div className="donate-hero-glow"></div>
        </div>
        <div className="donate-hero-content-pro">
          <div className="donate-hero-text">
            <span className="donate-hero-badge">Make a Difference</span>
            <h1>Every Gift Creates<br/>Real Change</h1>
            <p className="hero-tagline">
              Your donation directly helps families and communities across Australia. Small acts, big impact.
            </p>
            <div className="donate-hero-cta-section">
              <button className="donate-hero-btn-primary" onClick={() => document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' })}>
                Donate Now
              </button>
              <div className="donate-hero-stats">
                <div className="hero-stat">
                  <span className="stat-number">$2.5M+</span>
                  <span className="stat-label">Raised</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Donors</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">100K+</span>
                  <span className="stat-label">Lives Impacted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="campaign-modal-overlay" onClick={() => setShowCreateCampaign(false)}>
          <div className="campaign-modal-pro" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-pro" onClick={() => setShowCreateCampaign(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="campaign-modal-header-pro">
              <div className="modal-icon-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h2>Create Your Fundraiser</h2>
              <p>Start a campaign to raise funds for a cause you care about</p>
            </div>
            
            <form onSubmit={handleCampaignSubmit} className="campaign-form-pro">
              <div className="form-group-pro">
                <label htmlFor="title">Campaign Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={campaignData.title}
                  onChange={handleCampaignChange}
                  placeholder="e.g., Help Local Families This Winter"
                  required
                />
              </div>

              <div className="form-row-pro">
                <div className="form-group-pro">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={campaignData.category}
                    onChange={handleCampaignChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="disaster-relief">Disaster Relief</option>
                    <option value="environment">Environment</option>
                    <option value="community">Community Development</option>
                    <option value="elderly">Elderly Care</option>
                    <option value="children">Children & Youth</option>
                    <option value="animals">Animal Welfare</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group-pro">
                  <label htmlFor="goal">Fundraising Goal (AUD)</label>
                  <div className="goal-input-wrapper-pro">
                    <span className="currency-prefix-pro">$</span>
                    <input
                      type="number"
                      id="goal"
                      name="goal"
                      value={campaignData.goal}
                      onChange={handleCampaignChange}
                      placeholder="10000"
                      min="100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-pro">
                <label htmlFor="description">Campaign Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={campaignData.description}
                  onChange={handleCampaignChange}
                  placeholder="Tell your story... Why is this cause important? How will the funds be used?"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-row-pro">
                <div className="form-group-pro">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={campaignData.endDate}
                    onChange={handleCampaignChange}
                    required
                  />
                </div>
                <div className="form-group-pro">
                  <label htmlFor="image">Cover Image</label>
                  <div className="file-upload-wrapper-pro">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setCampaignData(prev => ({...prev, image: e.target.files[0]}))}
                    />
                    <span className="file-upload-label-pro">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      {campaignData.image ? campaignData.image.name : 'Choose an image'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="campaign-form-footer-pro">
                <div className="form-note-pro">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <p>Your campaign will be reviewed within 24 hours before going live.</p>
                </div>
                <button type="submit" className="submit-campaign-btn-pro">
                  Create Campaign
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Campaigns Section */}
      <section className="campaigns-section-pro">
        <div className="campaigns-container-pro">
          <div className="campaigns-header-pro">
            <div className="campaigns-title">
              <span className="section-label">Community Initiatives</span>
              <h2>Featured Fundraising Campaigns</h2>
              <p>Join our community in supporting meaningful initiatives that create lasting impact across Australia</p>
            </div>
            <button className="create-campaign-btn-pro" onClick={() => setShowCreateCampaign(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Campaign
            </button>
          </div>

          <div className="campaigns-grid-pro">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="campaign-card-pro">
                <div className="campaign-image-pro">
                  <img src={campaign.image} alt={campaign.title} />
                  <span className="campaign-category-pro">{campaign.category}</span>
                </div>
                <div className="campaign-content-pro">
                  <h3>{campaign.title}</h3>
                  <p className="campaign-organizer-pro">by {campaign.organizer}</p>
                  
                  <div className="campaign-progress-pro">
                    <div className="progress-bar-pro">
                      <div 
                        className="progress-fill-pro" 
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-stats-pro">
                      <div className="progress-raised">
                        <span className="raised-amount">${campaign.raised.toLocaleString()}</span>
                        <span className="raised-label">raised of ${campaign.goal.toLocaleString()}</span>
                      </div>
                      <span className="progress-percent">{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                    </div>
                  </div>

                  <div className="campaign-footer-pro">
                    <div className="campaign-meta">
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {campaign.daysLeft} days left
                      </span>
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        {campaign.donors} donors
                      </span>
                    </div>
                    <button className="donate-campaign-btn">Donate</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Carousel Section */}
      <section className="campaign-carousel-section-pro">
        <div className="carousel-container-pro">
          <div className="carousel-header-pro">
            <h2>Featured Campaigns</h2>
            <p>Explore and support impactful causes</p>
          </div>

          <div className="carousel-wrapper-pro">
            <button className="carousel-btn-prev-pro" onClick={prevSlide} aria-label="Previous campaign">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="carousel-track-pro">
              <div 
                className="carousel-slides-pro"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {activeCampaigns.map((campaign) => (
                  <div 
                    key={campaign.id} 
                    className="carousel-slide-pro"
                    onClick={() => setSelectedCampaignModal(campaign)}
                  >
                    <div className="carousel-card-pro">
                      <div className="carousel-image-pro">
                        <img src={campaign.image} alt={campaign.title} />
                        <div className="carousel-overlay-pro">
                          <button className="carousel-cta-btn-pro">Donate Now</button>
                        </div>
                        <span className="carousel-category-pro">{campaign.category}</span>
                      </div>
                      <div className="carousel-content-pro">
                        <h3>{campaign.title}</h3>
                        <p className="carousel-organizer-pro">by {campaign.organizer}</p>
                        
                        <div className="carousel-progress-pro">
                          <div className="carousel-progress-bar-pro">
                            <div 
                              className="carousel-progress-fill-pro" 
                              style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                            ></div>
                          </div>
                          <div className="carousel-progress-info-pro">
                            <span className="carousel-raised">${campaign.raised.toLocaleString()}</span>
                            <span className="carousel-percent">{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                          </div>
                        </div>

                        <div className="carousel-meta-pro">
                          <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            {campaign.daysLeft} days left
                          </span>
                          <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            {campaign.donors} donors
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-btn-next-pro" onClick={nextSlide} aria-label="Next campaign">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators-pro">
            {activeCampaigns.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot-pro ${index === carouselIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to campaign ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Details Modal */}
      {selectedCampaignModal && (
        <div className="campaign-modal-overlay-pro" onClick={() => setSelectedCampaignModal(null)}>
          <div className="campaign-modal-pro" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn-pro" onClick={() => setSelectedCampaignModal(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="campaign-modal-content-pro">
              <img src={selectedCampaignModal.image} alt={selectedCampaignModal.title} className="modal-image-pro" />
              <div className="modal-info-pro">
                <span className="modal-category-pro">{selectedCampaignModal.category}</span>
                <h2>{selectedCampaignModal.title}</h2>
                <p className="modal-organizer-pro">Organized by {selectedCampaignModal.organizer}</p>
                
                <div className="modal-progress-pro">
                  <div className="modal-progress-bar-pro">
                    <div 
                      className="modal-progress-fill-pro" 
                      style={{ width: `${(selectedCampaignModal.raised / selectedCampaignModal.goal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="modal-stats-pro">
                    <div>
                      <div className="stat-value-pro">${selectedCampaignModal.raised.toLocaleString()}</div>
                      <div className="stat-label-pro">Raised</div>
                    </div>
                    <div>
                      <div className="stat-value-pro">${selectedCampaignModal.goal.toLocaleString()}</div>
                      <div className="stat-label-pro">Goal</div>
                    </div>
                    <div>
                      <div className="stat-value-pro">{selectedCampaignModal.daysLeft}</div>
                      <div className="stat-label-pro">Days Left</div>
                    </div>
                    <div>
                      <div className="stat-value-pro">{selectedCampaignModal.donors}</div>
                      <div className="stat-label-pro">Donors</div>
                    </div>
                  </div>
                </div>

                <button className="modal-donate-btn-pro" onClick={() => {
                  document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
                  setSelectedCampaignModal(null);
                }}>
                  Donate to This Campaign
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

      {/* Impact Cards Section - How Your Donation Helps */}
      <section className="impact-cards-section-pro">
        <div className="impact-cards-container-pro">
          <div className="impact-cards-header-pro">
            <h2>How You Can Bring Joy to Someone's World</h2>
            <p>Every donation creates meaningful change. See the direct impact of your generosity.</p>
          </div>

          <div className="impact-cards-grid-pro">
            {impactItems.map((item, index) => (
              <div key={index} className="impact-card-item-pro">
                <div className="impact-card-icon-pro">
                  {index === 0 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                      <path d="M12 2l3 3h9v12H0V5h9l3-3z"/>
                      <circle cx="8" cy="12" r="2"/>
                      <circle cx="16" cy="12" r="2"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                      <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                      <path d="M8 12l2 2 4-4"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  )}
                  {index === 4 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                </div>
                
                <h3 className="impact-card-amount-pro">${item.amount}</h3>
                <p className="impact-card-description-pro">{item.impact}</p>
                <button 
                  className="impact-card-btn-pro"
                  onClick={() => {
                    handleAmountSelect(item.amount);
                    document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Donate now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="donate-main-pro" id="donation-form">
        <div className="donate-container-pro">
          {/* Donation Form */}
          <div className="donate-form-section-pro">
            <div className="donate-card-pro">
              <h2>Make a Donation</h2>
              
              {/* Donation Type */}
              <div className="donation-type-toggle-pro">
                <button 
                  className={`type-btn-pro ${donationType === 'one-time' ? 'active' : ''}`}
                  onClick={() => setDonationType('one-time')}
                >
                  One-time
                </button>
                <button 
                  className={`type-btn-pro ${donationType === 'monthly' ? 'active' : ''}`}
                  onClick={() => setDonationType('monthly')}
                >
                  Monthly
                </button>
              </div>

              {/* Amount Selection */}
              <div className="amount-selection-pro">
                <label>Select Amount</label>
                <div className="amount-buttons-pro">
                  {[25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      className={`amount-btn-pro ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="custom-amount-input-pro">
                  <span className="currency-symbol-pro">$</span>
                  <input
                    type="number"
                    placeholder="Other amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="donor-info-pro">
                <h3>Your Information</h3>
                <div className="form-row-pro">
                  <div className="form-group-pro">
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                  </div>
                  <div className="form-group-pro">
                    <label>Last Name</label>
                    <input type="text" placeholder="Smith" />
                  </div>
                </div>
                <div className="form-group-pro">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>

              {/* Payment Method */}
              <div className="payment-section-pro">
                <h3>Payment Method</h3>
                <div className="payment-options-pro">
                  <button className="payment-btn-pro active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    Credit Card
                  </button>
                  <button className="payment-btn-pro">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.622c.052-.31.322-.53.634-.53h4.606c3.037 0 5.167 1.63 5.167 4.303 0 3.366-2.893 5.295-6.306 5.295H6.607l-1.228 7.42a.64.64 0 0 1-.634.528h-2.58"/>
                    </svg>
                    PayPal
                  </button>
                  <button className="payment-btn-pro">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                    Bank Transfer
                  </button>
                </div>

                <div className="card-details-pro">
                  <div className="form-group-pro">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-row-pro">
                    <div className="form-group-pro">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group-pro">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button className="donate-submit-btn-pro">
                Donate ${customAmount || selectedAmount} {donationType === 'monthly' ? '/month' : ''}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              <p className="secure-text-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Your payment is secure and encrypted
              </p>
            </div>
          </div>

          {/* Impact Section */}
          <div className="donate-impact-section-pro">
            <div className="impact-card-pro">
              <h3>Measurable Impact</h3>
              <p className="impact-intro-pro">Every contribution creates tangible, lasting change in our communities:</p>
              <div className="impact-list-pro">
                {impactItems.map((item, index) => (
                  <div key={index} className="impact-item-pro">
                    <img src={item.image} alt="" className="impact-icon-pro" />
                    <div className="impact-details-pro">
                      <span className="impact-amount-pro">${item.amount}</span>
                      <p>{item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-pro">
              <div className="trust-badge-pro">
                <div className="trust-icon-pro">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4 8 4v14"/>
                    <path d="M9 21v-8h6v8"/>
                  </svg>
                </div>
                <div className="trust-text">
                  <strong>Registered Charity</strong>
                  <span>ABN: 12 345 678 901</span>
                </div>
              </div>
              <div className="trust-badge-pro">
                <div className="trust-icon-pro">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div className="trust-text">
                  <strong>Tax Deductible</strong>
                  <span>All donations over $2</span>
                </div>
              </div>
              <div className="trust-badge-pro">
                <div className="trust-icon-pro">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div className="trust-text">
                  <strong>95% to Programs</strong>
                  <span>Minimal overhead costs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="other-ways-pro">
        <div className="other-ways-container-pro">
          <div className="other-ways-header">
            <span className="section-label">Get Involved</span>
            <h2>Other Ways to Help</h2>
          </div>
          <div className="ways-grid-pro">
            <div className="way-card-pro">
              <div className="way-icon-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Volunteer Your Time</h3>
              <p>Join our dedicated network of volunteers and make a meaningful, direct impact in communities across Australia.</p>
              <button className="way-btn-pro" onClick={() => navigate('/signup')}>
                Get Started
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
            <div className="way-card-pro">
              <div className="way-icon-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <h3>Corporate Partnership</h3>
              <p>Partner with us to develop comprehensive employee volunteer programs and strategic Corporate Social Responsibility initiatives.</p>
              <button className="way-btn-pro" onClick={() => navigate('/contact')}>
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
            <div className="way-card-pro">
              <div className="way-icon-pro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
              <h3>Amplify Our Mission</h3>
              <p>Help expand our reach by sharing our mission with your network and inspiring others to make a difference.</p>
              <button className="way-btn-pro">
                Share Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Donate;
