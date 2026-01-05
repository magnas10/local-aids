import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { galleryAPI } from '../services/api';
import './Pages.css';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'community',
    location: '',
    description: '',
    image: null
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  const isLoggedIn = !!user;

  // State for gallery data
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState([
    { number: '2,500+', label: 'Events Completed' },
    { number: '50,000+', label: 'Volunteers Engaged' },
    { number: '120,000+', label: 'Lives Impacted' },
    { number: '500+', label: 'Partner Organizations' }
  ]);

  const heroImages = [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=1080&fit=crop&q=85',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&h=1080&fit=crop&q=85'
  ];

  // Fetch gallery data from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await galleryAPI.getAll();
        setGalleryImages(response.data || []);
        setError('');
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery images');
        // Fallback to placeholder data if API fails
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food-drive', label: 'Food Drives' },
    { id: 'elderly-care', label: 'Elderly Care' },
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' },
    { id: 'disaster-relief', label: 'Disaster Relief' },
    { id: 'community', label: 'Community Events' }
  ];

  // Fallback gallery data if API fails
  const fallbackGalleryImages = [
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
      volunteers: 120,
      description: 'Community members came together to clean up Bondi Beach, collecting over 500kg of waste.'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
      title: 'After School Tutoring Program',
      category: 'education',
      location: 'Brisbane, QLD',
      date: 'November 2025',
      volunteers: 28,
      description: 'Volunteer tutors helping underprivileged students with their homework and exam preparation.'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=600&fit=crop&q=80',
      title: 'Senior Tech Workshop',
      category: 'elderly-care',
      location: 'Perth, WA',
      date: 'October 2025',
      volunteers: 15,
      description: 'Teaching seniors how to use smartphones and tablets to stay connected with their families.'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&q=80',
      title: 'Flood Relief Operations',
      category: 'disaster-relief',
      location: 'Lismore, NSW',
      date: 'September 2025',
      volunteers: 200,
      description: 'Emergency response team providing essential supplies and support to flood-affected communities.'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80',
      title: 'Community Garden Project',
      category: 'community',
      location: 'Adelaide, SA',
      date: 'November 2025',
      volunteers: 35,
      description: 'Local residents working together to create a beautiful community garden in the neighborhood.'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&h=600&fit=crop&q=80',
      title: 'Meals on Wheels Program',
      category: 'elderly-care',
      location: 'Hobart, TAS',
      date: 'October 2025',
      volunteers: 22,
      description: 'Volunteers delivering hot meals to elderly residents who are unable to cook for themselves.'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&q=80',
      title: 'Christmas Toy Drive',
      category: 'community',
      location: 'Darwin, NT',
      date: 'December 2024',
      volunteers: 50,
      description: 'Collecting and distributing toys to ensure every child has a gift this Christmas.'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop&q=80',
      title: 'School Library Renovation',
      category: 'education',
      location: 'Cairns, QLD',
      date: 'August 2025',
      volunteers: 40,
      description: 'Volunteers renovated and restocked a school library in a rural community.'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&q=80',
      title: 'Tree Planting Initiative',
      category: 'environment',
      location: 'Canberra, ACT',
      date: 'September 2025',
      volunteers: 85,
      description: 'Planting 1,000 native trees to restore bushfire-affected areas around Canberra.'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&h=600&fit=crop&q=80',
      title: 'Emergency Supply Packs',
      category: 'disaster-relief',
      location: 'Townsville, QLD',
      date: 'July 2025',
      volunteers: 60,
      description: 'Assembling emergency supply packs for families affected by cyclone season.'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop&q=80',
      title: 'Community Breakfast Program',
      category: 'food-drive',
      location: 'Newcastle, NSW',
      date: 'November 2025',
      volunteers: 18,
      description: 'Serving free nutritious breakfasts to homeless individuals every Sunday morning.'
    }
  ];

  // Use fallback data if gallery is empty and not loading
  const displayImages = galleryImages.length > 0 ? galleryImages : (loading ? [] : fallbackGalleryImages);
  
  const filteredImages = activeFilter === 'all' 
    ? displayImages 
    : displayImages.filter(img => img.category === activeFilter);

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

  const handleUploadChange = (e) => {
    const { name, value } = e.target;
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadData.image) {
      setUploadError('Please select an image');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError('');

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', uploadData.image);
      formData.append('title', uploadData.title);
      formData.append('category', uploadData.category);
      formData.append('location', uploadData.location);
      formData.append('description', uploadData.description);

      // Upload to backend
      const response = await galleryAPI.upload(formData);
      
      setUploadSuccess(true);
      // Refresh gallery data
      const updatedGallery = await galleryAPI.getAll();
      setGalleryImages(updatedGallery.data || []);

      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
        setUploadData({
          title: '',
          category: 'community',
          location: '',
          description: '',
          image: null,
          imagePreview: null
        });
      }, 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    document.body.style.overflow = 'auto';
    setUploadData({
      title: '',
      category: '',
      location: '',
      description: '',
      volunteers: '',
      image: null,
      imagePreview: null
    });
  };

  return (
    <div className="gallery-page-pro">
      {/* Hero Section */}
      <section className="gallery-hero-pro">
        <div className="gallery-hero-carousel">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
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
          <h1>Community<br/><span className="highlight">Gallery</span></h1>
        </div>
        {/* Carousel Indicators */}
        <div className="gallery-carousel-indicators">
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-modal-overlay-pro" onClick={closeUploadModal}>
          <div className="upload-modal-pro" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-pro" onClick={closeUploadModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            {uploadSuccess ? (
              <div className="upload-success-pro">
                <div className="success-icon-pro">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h2>Photo Uploaded Successfully!</h2>
                <p>Your photo will be reviewed and added to the gallery shortly.</p>
              </div>
            ) : (
              <>
                <div className="upload-modal-header-pro">
                  <div className="modal-icon-pro">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <h2>Share Your Impact</h2>
                  <p>Upload a photo from your volunteer experience</p>
                </div>

                <form onSubmit={handleUploadSubmit} className="upload-form-pro">
                  {/* Image Upload Area */}
                  <div className="image-upload-area-pro">
                    {uploadData.imagePreview ? (
                      <div className="image-preview-pro">
                        <img src={uploadData.imagePreview} alt="Preview" />
                        <button 
                          type="button" 
                          className="remove-image-btn-pro"
                          onClick={() => setUploadData(prev => ({...prev, image: null, imagePreview: null}))}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="upload-dropzone-pro">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          required
                        />
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span className="dropzone-text-pro">Click to upload or drag and drop</span>
                        <span className="dropzone-hint-pro">PNG, JPG, GIF up to 10MB</span>
                      </label>
                    )}
                  </div>

                  <div className="form-group-pro">
                    <label htmlFor="upload-title">Photo Title</label>
                    <input
                      type="text"
                      id="upload-title"
                      name="title"
                      value={uploadData.title}
                      onChange={handleUploadChange}
                      placeholder="e.g., Beach Cleanup at Bondi"
                      required
                    />
                  </div>

                  <div className="form-row-pro">
                    <div className="form-group-pro">
                      <label htmlFor="upload-category">Category</label>
                      <select
                        id="upload-category"
                        name="category"
                        value={uploadData.category}
                        onChange={handleUploadChange}
                        required
                      >
                        <option value="">Select category</option>
                        <option value="food-drive">Food Drives</option>
                        <option value="elderly-care">Elderly Care</option>
                        <option value="education">Education</option>
                        <option value="environment">Environment</option>
                        <option value="disaster-relief">Disaster Relief</option>
                        <option value="community">Community Events</option>
                      </select>
                    </div>
                    <div className="form-group-pro">
                      <label htmlFor="upload-location">Location</label>
                      <input
                        type="text"
                        id="upload-location"
                        name="location"
                        value={uploadData.location}
                        onChange={handleUploadChange}
                        placeholder="e.g., Sydney, NSW"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-pro">
                    <label htmlFor="upload-volunteers">Number of Volunteers</label>
                    <input
                      type="number"
                      id="upload-volunteers"
                      name="volunteers"
                      value={uploadData.volunteers}
                      onChange={handleUploadChange}
                      placeholder="e.g., 25"
                      min="1"
                    />
                  </div>

                  <div className="form-group-pro">
                    <label htmlFor="upload-description">Description</label>
                    <textarea
                      id="upload-description"
                      name="description"
                      value={uploadData.description}
                      onChange={handleUploadChange}
                      placeholder="Tell us about this volunteer activity..."
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="upload-form-footer-pro">
                    {uploadError && (
                      <div style={{color: '#e74c3c', marginBottom: '10px', fontSize: '14px'}}>
                        ⚠️ {uploadError}
                      </div>
                    )}
                    <div className="form-note-pro">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                      </svg>
                      <p>Photos will be reviewed before appearing in the gallery.</p>
                    </div>
                    <button 
                      type="submit" 
                      className="submit-upload-btn-pro"
                      disabled={!uploadData.image || isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Filter Section */}
      <section className="gallery-filters-pro">
        <div className="filters-container-gallery-pro">
          <div className="filters-header-pro">
            <div>
              <span className="section-label">Browse Collection</span>
              <h2>Explore by Category</h2>
            </div>
            {isLoggedIn && (
              <button className="add-photo-btn-pro" onClick={openUploadModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Photo
              </button>
            )}
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
          {loading && (
            <div style={{padding: '40px', textAlign: 'center'}}>
              <p>Loading gallery...</p>
            </div>
          )}
          {error && (
            <div style={{padding: '20px', textAlign: 'center', color: '#e74c3c'}}>
              <p>⚠️ {error}</p>
            </div>
          )}
          <div className="gallery-grid-pro">
            {filteredImages.map((image) => (
              <div 
                key={image._id || image.id} 
                className="gallery-item-pro"
              >
                <div className="gallery-item-image-pro" onClick={() => openLightbox(image)}>
                  <img src={image.src || image.imageUrl || image.image} alt={image.title} />
                </div>
                <div className="gallery-item-content-pro">
                  <h3 className="gallery-item-title-pro">{image.title}</h3>
                  {image.description && (
                    <p className="gallery-item-description-pro">{image.description}</p>
                  )}
                  
                  {image.location && (
                    <div className="gallery-location-info-pro">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{image.location}</span>
                    </div>
                  )}
                  
                  <div className="gallery-meta-info-pro">
                    {image.volunteers && (
                      <div className="gallery-volunteers-pro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>{image.volunteers} volunteers</span>
                      </div>
                    )}
                    {image.date && (
                      <div className="gallery-date-pro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>{image.date}</span>
                      </div>
                    )}
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
              <img src={selectedImage.src || selectedImage.imageUrl || selectedImage.image} alt={selectedImage.title} />
            </div>
            
            <div className="lightbox-info-pro">
              <h2>{selectedImage.title}</h2>
              <div className="lightbox-meta-pro">
                {selectedImage.location && (
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {selectedImage.location}
                  </span>
                )}
                {selectedImage.date && (
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {selectedImage.date}
                  </span>
                )}
                {selectedImage.volunteers && (
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    {selectedImage.volunteers} volunteers
                  </span>
                )}
              </div>
              {selectedImage.description && <p>{selectedImage.description}</p>}
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
            <button className="cta-btn-primary" onClick={() => navigate('/signup')}>
              Start Volunteering
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate('/events')}>
              View Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
