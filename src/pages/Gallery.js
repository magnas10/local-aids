import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { galleryAPI } from '../services/api';
import './Pages.css';

function Gallery() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [adminView, setAdminView] = useState('approved'); // approved, pending, rejected
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'community',
    description: '',
    image: null,
    imagePreview: null
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food-drive', label: 'Food Drives' },
    { id: 'elderly-care', label: 'Elderly Care' },
    { id: 'education', label: 'Education' },
    { id: 'environment', label: 'Environment' },
    { id: 'disaster-relief', label: 'Disaster Relief' },
    { id: 'community', label: 'Community Events' },
    { id: 'health', label: 'Health Care' },
    { id: 'general', label: 'General' }
  ];

  // Fetch gallery data
  useEffect(() => {
    fetchGallery();
  }, [activeFilter, adminView, isAdmin]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (activeFilter !== 'all') {
        params.category = activeFilter;
      }
      
      // Admin can see different statuses
      if (isAdmin && adminView !== 'approved') {
        params.status = adminView;
      }
      
      const response = await galleryAPI.getAll(params);
      
      // Convert relative image URLs to full URLs
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
      const imagesWithFullUrls = (response.data || []).map(img => ({
        ...img,
        imageUrl: img.imageUrl.startsWith('http') 
          ? img.imageUrl 
          : `${API_BASE_URL}${img.imageUrl}`
      }));
      
      setGalleryImages(imagesWithFullUrls);
      setError('');
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery images');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      alert('Please login to upload images');
      return;
    }
    setShowUploadModal(true);
    setUploadSuccess(false);
    setUploadError('');
  };

  const handleUploadChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('Image size must be less than 10MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select a valid image file');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      setUploadError('');
    } else {
      setUploadData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadData.image) {
      setUploadError('Please select an image');
      return;
    }
    
    if (!uploadData.title.trim()) {
      setUploadError('Please enter a title');
      return;
    }
    
    console.log('Starting upload...', {
      title: uploadData.title,
      category: uploadData.category,
      imageSize: uploadData.image?.size,
      imageType: uploadData.image?.type
    });
    
    setIsUploading(true);
    setUploadError('');
    
    try {
      const formData = new FormData();
      formData.append('image', uploadData.image);
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('category', uploadData.category);
      
      console.log('Calling galleryAPI.upload...');
      const response = await galleryAPI.upload(formData);
      console.log('Upload successful:', response);
      
      setUploadSuccess(true);
      setUploadError('');
      
      // Reset form
      setUploadData({
        title: '',
        category: 'community',
        description: '',
        image: null,
        imagePreview: null
      });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
        fetchGallery(); // Refresh gallery
      }, 2000);
      
    } catch (err) {
      console.error('Upload error:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack
      });
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await galleryAPI.approve(id);
      fetchGallery(); // Refresh gallery
    } catch (err) {
      console.error('Approve error:', err);
      alert('Failed to approve image');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason (optional):');
    try {
      await galleryAPI.reject(id, reason || '');
      fetchGallery(); // Refresh gallery
    } catch (err) {
      console.error('Reject error:', err);
      alert('Failed to reject image');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }
    
    try {
      await galleryAPI.delete(id);
      fetchGallery(); // Refresh gallery
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete image');
    }
  };

  const filteredImages = galleryImages;

  return (
    <div className="page-container gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">Community Impact</span>
            <h1 className="hero-title">
              Our <span className="highlight">Gallery</span>
            </h1>
            <p className="hero-description">
              Moments that inspire change and celebrate our community's impact through powerful stories and meaningful contributions.
            </p>
            {isLoggedIn && (
              <button className="cta-button primary" onClick={handleUploadClick}>
                📸 Upload Image
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container gallery-container">
        {/* Admin View Selector */}
        {isAdmin && (
          <div className="admin-view-selector">
            <h3>Admin Panel</h3>
            <div className="view-buttons">
              <button 
                className={adminView === 'approved' ? 'active' : ''} 
                onClick={() => setAdminView('approved')}
              >
                ✓ Approved
              </button>
              <button 
                className={adminView === 'pending' ? 'active' : ''} 
                onClick={() => setAdminView('pending')}
              >
                ⏳ Pending ({galleryImages.filter(img => img.status === 'pending').length})
              </button>
              <button 
                className={adminView === 'rejected' ? 'active' : ''} 
                onClick={() => setAdminView('rejected')}
              >
                ✗ Rejected
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-state">
            <p>{error}</p>
            <button className="btn-secondary" onClick={fetchGallery}>
              Try Again
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <div className="gallery-grid">
            {filteredImages.length === 0 ? (
              <div className="empty-state">
                <p>No images found in this category</p>
                {isLoggedIn && (
                  <button className="btn-primary" onClick={handleUploadClick}>
                    Upload First Image
                  </button>
                )}
              </div>
            ) : (
              filteredImages.map(image => (
                <div key={image.id} className="gallery-item" onClick={() => handleImageSelect(image)}>
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                  <div className="gallery-item-overlay">
                    <h3>{image.title}</h3>
                    <p className="category-badge">{image.category}</p>
                    {image.status === 'pending' && <span className="status-badge pending">⏳ Pending</span>}
                    {image.status === 'rejected' && <span className="status-badge rejected">✗ Rejected</span>}
                    {isAdmin && image.status === 'pending' && (
                      <div className="admin-actions" onClick={(e) => e.stopPropagation()}>
                        <button 
                          className="btn-approve" 
                          onClick={() => handleApprove(image.id)}
                        >
                          ✓ Approve
                        </button>
                        <button 
                          className="btn-reject" 
                          onClick={() => handleReject(image.id)}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <div className="modal-image-container">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
            </div>
            <div className="modal-details">
              <h2>{selectedImage.title}</h2>
              <p className="image-meta">
                <span className="category">{selectedImage.category}</span>
                {selectedImage.uploader && (
                  <span className="uploader">By: {selectedImage.uploader.name}</span>
                )}
                <span className="date">
                  {new Date(selectedImage.createdAt).toLocaleDateString()}
                </span>
              </p>
              {selectedImage.description && (
                <p className="image-description">{selectedImage.description}</p>
              )}
              {selectedImage.status === 'rejected' && selectedImage.rejectionReason && (
                <div className="rejection-info">
                  <strong>Rejection Reason:</strong>
                  <p>{selectedImage.rejectionReason}</p>
                </div>
              )}
              {isAdmin && (
                <div className="admin-modal-actions">
                  {selectedImage.status === 'pending' && (
                    <>
                      <button 
                        className="btn-primary" 
                        onClick={() => {
                          handleApprove(selectedImage.id);
                          handleCloseModal();
                        }}
                      >
                        ✓ Approve
                      </button>
                      <button 
                        className="btn-secondary" 
                        onClick={() => {
                          handleReject(selectedImage.id);
                          handleCloseModal();
                        }}
                      >
                        ✗ Reject
                      </button>
                    </>
                  )}
                  <button 
                    className="btn-danger" 
                    onClick={() => {
                      handleDelete(selectedImage.id);
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => !isUploading && setShowUploadModal(false)}>
          <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowUploadModal(false)}
              disabled={isUploading}
            >
              ×
            </button>
            <h2>Upload Image</h2>
            
            {uploadSuccess ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>Image uploaded successfully!</p>
                <p className="small-text">Your image will be visible after admin approval.</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="upload-form">
                {uploadError && (
                  <div className="error-message">{uploadError}</div>
                )}
                
                <div className="form-group">
                  <label htmlFor="image">Select Image *</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleUploadChange}
                    disabled={isUploading}
                    required
                  />
                  {uploadData.imagePreview && (
                    <div className="image-preview">
                      <img src={uploadData.imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={uploadData.title}
                    onChange={handleUploadChange}
                    placeholder="Enter image title"
                    disabled={isUploading}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={uploadData.category}
                    onChange={handleUploadChange}
                    disabled={isUploading}
                    required
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={uploadData.description}
                    onChange={handleUploadChange}
                    placeholder="Describe this image (optional)"
                    rows="4"
                    disabled={isUploading}
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setShowUploadModal(false)}
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add inline styles for gallery-specific elements */}
      <style jsx="true">{`
        .gallery-page {
          min-height: 100vh;
          background-color: #ffffff;
        }

        /* Hero Section - Matching Homepage */
        .gallery-hero {
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
          url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop&q=85');
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
          margin-bottom: 40px;
          line-height: 1.7;
          max-width: 600px;
        }

        .cta-button {
          padding: 16px 40px;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #4db3a2 0%, #3d8b7a 100%);
          color: white;
          box-shadow: 0 10px 30px rgba(77, 179, 162, 0.3);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(77, 179, 162, 0.4);
        }

        /* Gallery Container */
        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .admin-view-selector {
          background: white;
          padding: 30px;
          border-radius: 16px;
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .admin-view-selector h3 {
          margin-bottom: 20px;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .view-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .view-buttons button {
          padding: 12px 24px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          color: #64748b;
        }

        .view-buttons button:hover {
          border-color: #4db3a2;
          color: #3d8b7a;
          transform: translateY(-2px);
        }

        .view-buttons button.active {
          background: linear-gradient(135deg, #4db3a2 0%, #3d8b7a 100%);
          color: white;
          border-color: #4db3a2;
          box-shadow: 0 4px 12px rgba(77, 179, 162, 0.3);
        }

        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 50px;
          justify-content: center;
        }

        .filter-btn {
          padding: 12px 28px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          color: #64748b;
        }

        .filter-btn:hover {
          border-color: #4db3a2;
          color: #3d8b7a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          color: white;
          border-color: #0f172a;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .gallery-item img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
        }

        .gallery-item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent);
          color: white;
          padding: 25px;
          transform: translateY(70%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-item-overlay {
          transform: translateY(0);
        }

        .gallery-item-overlay h3 {
          margin: 0 0 10px 0;
          font-size: 1.15rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
        }

        .category-badge {
          display: inline-block;
          background: linear-gradient(135deg, #4db3a2 0%, #3d8b7a 100%);\n          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 8px;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 10px;
        }

        .status-badge.pending {
          background: #ffa500;
          color: white;
        }

        .status-badge.rejected {
          background: #ef4444;
          color: white;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .btn-approve, .btn-reject {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          font-family: 'Outfit', sans-serif;
        }

        .btn-approve {
          background: #10b981;
          color: white;
        }

        .btn-approve:hover {
          background: #059669;
          transform: scale(1.05);
        }

        .btn-reject {
          background: #ef4444;
          color: white;
        }

        .btn-reject:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .loading-state, .error-state, .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-state {
          font-family: 'Outfit', sans-serif;
        }

        .empty-state p {
          font-size: 1.25rem;
          color: #64748b;
          margin-bottom: 30px;
        }

        .spinner {
          border: 4px solid #f3f4f6;
          border-top: 4px solid #f5c75d;
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

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-modal {
          max-width: 1100px;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: all 0.3s;
        }

        .modal-close:hover {
          background: rgba(0,0,0,0.8);
          transform: rotate(90deg);
        }

        .modal-image-container {
          width: 100%;
          background: #000;
          border-radius: 20px 20px 0 0;
        }

        .modal-image-container img {
          width: 100%;
          max-height: 500px;
          object-fit: contain;
          display: block;
        }

        .modal-details {
          padding: 40px;
        }

        .modal-details h2 {
          margin: 0 0 20px 0;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 700;
        }

        .image-meta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 25px;
          color: #64748b;
          font-size: 0.95rem;
        }

        .image-meta span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .image-description {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 25px;
          font-size: 1.05rem;
        }

        .rejection-info {
          background: #fee2e2;
          padding: 20px;
          border-radius: 12px;
          margin: 25px 0;
          border-left: 4px solid #ef4444;
        }

        .rejection-info strong {
          color: #dc2626;
          display: block;
          margin-bottom: 12px;
          font-family: 'Outfit', sans-serif;
        }

        .admin-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 30px;
          padding-top: 30px;
          border-top: 2px solid #f1f5f9;
        }

        .upload-modal {
          max-width: 650px;
        }

        .upload-modal h2 {
          margin: 35px 35px 25px 35px;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 700;
        }

        .upload-form {
          padding: 0 35px 35px 35px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
        }

        .form-group input[type="text"],
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s;
        }

        .form-group input[type="text"]:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #f5c75d;
          box-shadow: 0 0 0 3px rgba(245, 199, 93, 0.1);
        }

        .form-group input[type="file"] {
          width: 100%;
          padding: 12px;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          cursor: pointer;
        }

        .image-preview {
          margin-top: 20px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
        }

        .image-preview img {
          width: 100%;
          max-height: 350px;
          object-fit: contain;
          background: #f8fafc;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 35px;
        }

        .btn-secondary {
          padding: 14px 32px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: #e2e8f0;
          transform: translateY(-2px);
        }

        .btn-primary {
          padding: 14px 32px;
          background: linear-gradient(135deg, #f5c75d 0%, #d4a017 100%);
          color: #0f172a;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(245, 199, 93, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          background: #fee2e2;
          color: #dc2626;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 25px;
          border-left: 4px solid #ef4444;
          font-weight: 500;
        }

        .success-message {
          text-align: center;
          padding: 50px;
        }

        .success-icon {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          font-size: 3.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          animation: successPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes successPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-message p {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
        }

        .success-message .small-text {
          font-size: 1rem;
          color: #64748b;
        }

        .btn-danger {
          background: #ef4444;
          color: white;
          padding: 14px 28px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
        }

        .btn-danger:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }

          .view-buttons {
            flex-direction: column;
          }

          .view-buttons button {
            width: 100%;
          }

          .hero-container {
            padding: 60px 20px;
          }

          .gallery-container {
            padding: 60px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Gallery;
