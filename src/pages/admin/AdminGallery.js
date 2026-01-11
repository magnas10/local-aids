import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../../services/api';
import '../Pages.css';

function AdminGallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected, all
  const [selectedImage, setSelectedImage] = useState(null);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });

  useEffect(() => {
    fetchGallery();
  }, [filter]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
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
      
      // Calculate stats
      const allResponse = await galleryAPI.getAll({});
      const allImages = allResponse.data || [];
      setStats({
        pending: allImages.filter(img => img.status === 'pending').length,
        approved: allImages.filter(img => img.status === 'approved').length,
        rejected: allImages.filter(img => img.status === 'rejected').length,
        total: allImages.length
      });
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await galleryAPI.approve(id);
      fetchGallery();
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    } catch (err) {
      console.error('Approve error:', err);
      alert('Failed to approve image');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    
    try {
      await galleryAPI.reject(id, reason);
      fetchGallery();
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    } catch (err) {
      console.error('Reject error:', err);
      alert('Failed to reject image');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this image?')) {
      return;
    }
    
    try {
      await galleryAPI.delete(id);
      fetchGallery();
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete image');
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>🖼️ Gallery Management</h1>
        <p>Review and manage community gallery submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-details">
            <h3>{stats.pending}</h3>
            <p>Pending Review</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-details">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✗</div>
          <div className="stat-details">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-details">
            <h3>{stats.total}</h3>
            <p>Total Images</p>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="admin-filters">
        <button 
          className={filter === 'pending' ? 'active' : ''} 
          onClick={() => setFilter('pending')}
        >
          ⏳ Pending ({stats.pending})
        </button>
        <button 
          className={filter === 'approved' ? 'active' : ''} 
          onClick={() => setFilter('approved')}
        >
          ✓ Approved ({stats.approved})
        </button>
        <button 
          className={filter === 'rejected' ? 'active' : ''} 
          onClick={() => setFilter('rejected')}
        >
          ✗ Rejected ({stats.rejected})
        </button>
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          📋 All ({stats.total})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && (
        <div className="admin-gallery-grid">
          {galleryImages.length === 0 ? (
            <div className="empty-state">
              <p>No images found with status: {filter}</p>
            </div>
          ) : (
            galleryImages.map(image => (
              <div 
                key={image.id} 
                className={`admin-gallery-item ${image.status}`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Error';
                  }}
                />
                <div className="admin-gallery-overlay">
                  <h4>{image.title}</h4>
                  <p className="uploader">
                    {image.uploader ? `By: ${image.uploader.name}` : 'Unknown'}
                  </p>
                  <span className={`status-badge ${image.status}`}>
                    {image.status === 'pending' && '⏳ Pending'}
                    {image.status === 'approved' && '✓ Approved'}
                    {image.status === 'rejected' && '✗ Rejected'}
                  </span>
                  {image.status === 'pending' && (
                    <div className="quick-actions" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="btn-approve-sm" 
                        onClick={() => handleApprove(image.id)}
                        title="Approve"
                      >
                        ✓
                      </button>
                      <button 
                        className="btn-reject-sm" 
                        onClick={() => handleReject(image.id)}
                        title="Reject"
                      >
                        ✗
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content gallery-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            
            <div className="modal-image-section">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Error';
                }}
              />
            </div>
            
            <div className="modal-details-section">
              <div className="detail-header">
                <h2>{selectedImage.title}</h2>
                <span className={`status-badge-lg ${selectedImage.status}`}>
                  {selectedImage.status === 'pending' && '⏳ Pending Review'}
                  {selectedImage.status === 'approved' && '✓ Approved'}
                  {selectedImage.status === 'rejected' && '✗ Rejected'}
                </span>
              </div>
              
              <div className="detail-info">
                <div className="info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{selectedImage.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Uploaded By:</span>
                  <span className="info-value">
                    {selectedImage.uploader ? 
                      `${selectedImage.uploader.name} (${selectedImage.uploader.email})` : 
                      'Unknown'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Upload Date:</span>
                  <span className="info-value">
                    {new Date(selectedImage.createdAt).toLocaleString()}
                  </span>
                </div>
                {selectedImage.approver && (
                  <div className="info-row">
                    <span className="info-label">
                      {selectedImage.status === 'approved' ? 'Approved By:' : 'Rejected By:'}
                    </span>
                    <span className="info-value">{selectedImage.approver.name}</span>
                  </div>
                )}
                {selectedImage.approvedAt && (
                  <div className="info-row">
                    <span className="info-label">Action Date:</span>
                    <span className="info-value">
                      {new Date(selectedImage.approvedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              {selectedImage.description && (
                <div className="detail-description">
                  <h3>Description</h3>
                  <p>{selectedImage.description}</p>
                </div>
              )}
              
              {selectedImage.status === 'rejected' && selectedImage.rejectionReason && (
                <div className="rejection-reason">
                  <h3>Rejection Reason</h3>
                  <p>{selectedImage.rejectionReason}</p>
                </div>
              )}
              
              <div className="detail-actions">
                {selectedImage.status === 'pending' && (
                  <>
                    <button 
                      className="btn-primary" 
                      onClick={() => handleApprove(selectedImage.id)}
                    >
                      ✓ Approve Image
                    </button>
                    <button 
                      className="btn-secondary" 
                      onClick={() => handleReject(selectedImage.id)}
                    >
                      ✗ Reject Image
                    </button>
                  </>
                )}
                <button 
                  className="btn-danger" 
                  onClick={() => handleDelete(selectedImage.id)}
                >
                  🗑️ Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .admin-filters {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .admin-filters button {
          padding: 10px 20px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .admin-filters button:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .admin-filters button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .admin-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .admin-gallery-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }

        .admin-gallery-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .admin-gallery-item.pending {
          border: 3px solid #ffa500;
        }

        .admin-gallery-item.approved {
          border: 3px solid #4caf50;
        }

        .admin-gallery-item.rejected {
          border: 3px solid #f44336;
        }

        .admin-gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .admin-gallery-overlay {
          padding: 15px;
          background: white;
        }

        .admin-gallery-overlay h4 {
          margin: 0 0 8px 0;
          font-size: 1rem;
          color: #333;
        }

        .admin-gallery-overlay .uploader {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 10px;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-badge.pending {
          background: #ffa500;
          color: white;
        }

        .status-badge.approved {
          background: #4caf50;
          color: white;
        }

        .status-badge.rejected {
          background: #f44336;
          color: white;
        }

        .quick-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .btn-approve-sm, .btn-reject-sm {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .btn-approve-sm {
          background: #4caf50;
          color: white;
        }

        .btn-approve-sm:hover {
          background: #45a049;
        }

        .btn-reject-sm {
          background: #f44336;
          color: white;
        }

        .btn-reject-sm:hover {
          background: #da190b;
        }

        .gallery-detail-modal {
          max-width: 1200px;
          display: flex;
          flex-direction: row;
          max-height: 85vh;
          overflow: hidden;
        }

        .modal-image-section {
          flex: 1;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 50%;
        }

        .modal-image-section img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
        }

        .modal-details-section {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
          min-width: 400px;
        }

        .detail-header {
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
        }

        .detail-header h2 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .status-badge-lg {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .status-badge-lg.pending {
          background: #ffa500;
          color: white;
        }

        .status-badge-lg.approved {
          background: #4caf50;
          color: white;
        }

        .status-badge-lg.rejected {
          background: #f44336;
          color: white;
        }

        .detail-info {
          margin-bottom: 25px;
        }

        .info-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-label {
          font-weight: 600;
          color: #555;
          min-width: 140px;
        }

        .info-value {
          color: #333;
          flex: 1;
        }

        .detail-description, .rejection-reason {
          margin-bottom: 25px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 8px;
        }

        .detail-description h3, .rejection-reason h3 {
          margin: 0 0 10px 0;
          font-size: 1rem;
          color: #333;
        }

        .rejection-reason {
          background: #ffebee;
        }

        .rejection-reason h3 {
          color: #c62828;
        }

        .detail-actions {
          display: flex;
          gap: 10px;
          margin-top: 25px;
          padding-top: 25px;
          border-top: 2px solid #eee;
        }

        @media (max-width: 968px) {
          .gallery-detail-modal {
            flex-direction: column;
          }

          .modal-image-section {
            min-width: 100%;
            max-height: 40vh;
          }

          .modal-details-section {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminGallery;
