import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Gallery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food-drive', label: 'Food Drives' },
    { id: 'elderly-care', label: 'Elderly Care' },
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' },
    { id: 'disaster-relief', label: 'Disaster Relief' },
    { id: 'community', label: 'Community Events' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop&q=80',
      title: 'Melbourne Food Bank Distribution',
      category: 'food-drive',
      location: 'Melbourne, VIC',
      date: 'November 2025',
      volunteers: 45
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=80',
      title: 'Sydney Beach Cleanup',
      category: 'environment',
      location: 'Bondi Beach, Sydney',
      date: 'October 2025',
      volunteers: 120
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80',
      title: 'After School Tutoring Program',
      category: 'education',
      location: 'Brisbane, QLD',
      date: 'November 2025',
      volunteers: 28
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
      title: 'Senior Tech Workshop',
      category: 'elderly-care',
      location: 'Perth, WA',
      date: 'October 2025',
      volunteers: 15
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&q=80',
      title: 'Flood Relief Operations',
      category: 'disaster-relief',
      location: 'Lismore, NSW',
      date: 'September 2025',
      volunteers: 200
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80',
      title: 'Community Garden Project',
      category: 'community',
      location: 'Adelaide, SA',
      date: 'November 2025',
      volunteers: 35
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&h=600&fit=crop&q=80',
      title: 'Meals on Wheels Program',
      category: 'elderly-care',
      location: 'Hobart, TAS',
      date: 'October 2025',
      volunteers: 22
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&q=80',
      title: 'Christmas Toy Drive',
      category: 'community',
      location: 'Darwin, NT',
      date: 'December 2024',
      volunteers: 50
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop&q=80',
      title: 'School Library Renovation',
      category: 'education',
      location: 'Cairns, QLD',
      date: 'August 2025',
      volunteers: 40
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&q=80',
      title: 'Tree Planting Initiative',
      category: 'environment',
      location: 'Canberra, ACT',
      date: 'September 2025',
      volunteers: 85
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&h=600&fit=crop&q=80',
      title: 'Emergency Supply Packs',
      category: 'disaster-relief',
      location: 'Townsville, QLD',
      date: 'July 2025',
      volunteers: 60
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop&q=80',
      title: 'Community Breakfast Program',
      category: 'food-drive',
      location: 'Newcastle, NSW',
      date: 'November 2025',
      volunteers: 18
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Events Completed' },
    { number: '50,000+', label: 'Volunteers Engaged' },
    { number: '120,000+', label: 'Lives Impacted' },
    { number: '500+', label: 'Partner Organizations' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="gallery-page-pro">
      {/* Hero Section */}
      <section className="gallery-hero-pro">
        <div className="gallery-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=800&fit=crop&q=80" 
            alt="Volunteers making impact"
          />
          <div className="gallery-hero-overlay"></div>
        </div>
        <div className="gallery-hero-content-pro">
          <span className="gallery-badge-pro">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Our Impact in Action
          </span>
          <h1>Community Gallery</h1>
          <p>
            Witness the incredible work done by our volunteers and community members 
            across Australia. Every photo tells a story of compassion and change.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gallery-stats-pro">
        <div className="gallery-stats-container-pro">
          {stats.map((stat, index) => (
            <div key={index} className="gallery-stat-item-pro">
              <span className="stat-number-pro">{stat.number}</span>
              <span className="stat-label-pro">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filters-pro">
        <div className="filters-container-gallery-pro">
          <div className="filters-header-pro">
            <div>
              <span className="section-label">Browse Collection</span>
              <h2>Explore by Category</h2>
            </div>
          </div>
          <div className="filter-buttons-pro">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn-pro ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section-pro">
        <div className="gallery-grid-container-pro">
          <div className="gallery-grid-pro">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item-pro"
                onClick={() => openLightbox(image)}
              >
                <img src={image.src} alt={image.title} loading="lazy" />
                <div className="gallery-item-overlay-pro">
                  <div className="overlay-content-pro">
                    <h3>{image.title}</h3>
                    <div className="gallery-location-pro">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {image.location}
                    </div>
                    <div className="gallery-meta-pro">
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        {image.volunteers} volunteers
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {image.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="no-results-pro">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <h3>No photos found</h3>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay-pro" onClick={closeLightbox}>
          <div className="lightbox-content-pro" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-pro" onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <button className="lightbox-nav-pro prev" onClick={() => navigateImage('prev')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="lightbox-nav-pro next" onClick={() => navigateImage('next')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            
            <div className="lightbox-image-container-pro">
              <img src={selectedImage.src} alt={selectedImage.title} />
            </div>
            
            <div className="lightbox-info-pro">
              <h2>{selectedImage.title}</h2>
              <div className="lightbox-meta-pro">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {selectedImage.location}
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {selectedImage.date}
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {selectedImage.volunteers} volunteers
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="gallery-cta-pro">
        <div className="gallery-cta-bg">
          <img 
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=600&fit=crop&q=80" 
            alt="Community volunteers"
          />
          <div className="cta-overlay"></div>
        </div>
        <div className="gallery-cta-content-pro">
          <h2>Be Part of the Next Story</h2>
          <p>
            Join our community of volunteers and help create more moments of impact. 
            Your contribution can make a real difference in someone's life.
          </p>
          <div className="gallery-cta-buttons-pro">
            <button className="cta-btn-primary" onClick={() => navigate('/opportunities')}>
              Start Volunteering
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
