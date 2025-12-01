import React, { useState } from 'react';
import './Pages.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Food Drives' },
    { id: 'elderly', label: 'Elderly Care' },
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' },
    { id: 'disaster', label: 'Disaster Relief' },
    { id: 'community', label: 'Community Events' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Melbourne Food Bank Distribution',
      location: 'Melbourne, VIC',
      volunteers: 45,
      date: 'November 2025',
      category: 'food',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      title: 'Sydney Beach Cleanup',
      location: 'Bondi Beach, Sydney',
      volunteers: 120,
      date: 'October 2025',
      category: 'environment',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      title: 'After School Tutoring Program',
      location: 'Brisbane, QLD',
      volunteers: 28,
      date: 'November 2025',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      title: 'Senior Tech Workshop',
      location: 'Perth, WA',
      volunteers: 15,
      date: 'October 2025',
      category: 'elderly',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      title: 'Flood Relief Operations',
      location: 'Lismore, NSW',
      volunteers: 200,
      date: 'September 2025',
      category: 'disaster',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop'
    },
    {
      id: 6,
      title: 'Community Garden Project',
      location: 'Adelaide, SA',
      volunteers: 35,
      date: 'November 2025',
      category: 'environment',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop'
    },
    {
      id: 7,
      title: 'Meals on Wheels Program',
      location: 'Hobart, TAS',
      volunteers: 22,
      date: 'October 2025',
      category: 'elderly',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop'
    },
    {
      id: 8,
      title: 'Christmas Toy Drive',
      location: 'Darwin, NT',
      volunteers: 50,
      date: 'December 2024',
      category: 'community',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&h=600&fit=crop'
    },
    {
      id: 9,
      title: 'School Library Renovation',
      location: 'Cairns, QLD',
      volunteers: 40,
      date: 'August 2025',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'
    },
    {
      id: 10,
      title: 'Tree Planting Initiative',
      location: 'Canberra, ACT',
      volunteers: 85,
      date: 'September 2025',
      category: 'environment',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop'
    },
    {
      id: 11,
      title: 'Emergency Supply Packs',
      location: 'Townsville, QLD',
      volunteers: 60,
      date: 'July 2025',
      category: 'disaster',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop'
    },
    {
      id: 12,
      title: 'Community Breakfast Program',
      location: 'Newcastle, NSW',
      volunteers: 18,
      date: 'November 2025',
      category: 'food',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1543269664-7eef42226a21?w=1920&h=800&fit=crop&q=80" 
            alt="Diverse community group holding hands in circle, including person in wheelchair"
          />
          <div className="gallery-hero-overlay"></div>
        </div>
        <div className="gallery-hero-content">
          <div className="hero-badge">Volunteers making impact</div>
          <div className="hero-subtitle">OUR IMPACT IN ACTION</div>
          <h1 className="gallery-hero-title">Community Gallery</h1>
          <p className="gallery-hero-description">
            Witness the incredible work done by our volunteers and community members across Australia. 
            Every photo tells a story of compassion and change.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gallery-stats-section">
        <div className="container">
          <div className="gallery-stats-grid">
            <div className="gallery-stat-card">
              <div className="gallery-stat-number">2,500+</div>
              <div className="gallery-stat-label">Events Completed</div>
            </div>
            <div className="gallery-stat-card">
              <div className="gallery-stat-number">50,000+</div>
              <div className="gallery-stat-label">Volunteers Engaged</div>
            </div>
            <div className="gallery-stat-card">
              <div className="gallery-stat-number">120,000+</div>
              <div className="gallery-stat-label">Lives Impacted</div>
            </div>
            <div className="gallery-stat-card">
              <div className="gallery-stat-number">500+</div>
              <div className="gallery-stat-label">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Collection */}
      <section className="gallery-browse-section">
        <div className="container">
          <div className="browse-header">
            <h2 className="browse-title">BROWSE COLLECTION</h2>
            <h3 className="browse-subtitle">Explore by Category</h3>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => setSelectedImage(item)}
              >
                <div className="gallery-item-image">
                  <img src={item.image} alt={item.title} />
                  <div className="gallery-item-overlay">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 7v6m-3-3h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="gallery-item-content">
                  <h4 className="gallery-item-title">{item.title}</h4>
                  <div className="gallery-item-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#616161"/>
                    </svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="gallery-item-meta">
                    <div className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#2563eb"/>
                      </svg>
                      <span>{item.volunteers} volunteers</span>
                    </div>
                    <div className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" fill="#616161"/>
                      </svg>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gallery-cta-section">
        <div className="gallery-cta-image">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop" alt="Community volunteers" />
        </div>
        <div className="gallery-cta-content">
          <h2 className="gallery-cta-title">Be Part of the Next Story</h2>
          <p className="gallery-cta-description">
            Join our community of volunteers and help create more moments of impact. 
            Your contribution can make a real difference in someone's life.
          </p>
          <div className="gallery-cta-buttons">
            <button className="btn btn-primary btn-large">Start Volunteering</button>
            <button className="btn btn-outline-blue btn-large">View Opportunities</button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-image" />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <div className="lightbox-details">
                <span>{selectedImage.location}</span>
                <span>•</span>
                <span>{selectedImage.volunteers} volunteers</span>
                <span>•</span>
                <span>{selectedImage.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
