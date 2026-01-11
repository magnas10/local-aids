import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHelpRequests, deleteHelpRequest, updateHelpRequest, submitHelpRequest } from '../services/api';
import './Pages.css';
import './MyRequestsSecurity.css';

function MyRequests() {
  const { user, isLoggedIn } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [email, setEmail] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editFormData, setEditFormData] = useState({});
  const [newRequestData, setNewRequestData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    helpType: '',
    urgency: 'normal',
    description: '',
    preferredDate: '',
    preferredTime: ''
  });

  useEffect(() => {
    if (user) {
      fetchMyRequests();
    }
  }, [user]);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const response = await getHelpRequests();
      console.log('All help requests:', response);
      console.log('Current user:', user);
      // Filter to show only user's own requests
      const userRequests = (response.helpRequests || []).filter(req => 
        req.email === user.email || (req.createdBy && req.createdBy === user.id)
      );
      console.log('Filtered user requests:', userRequests);
      setRequests(userRequests);
    } catch (error) {
      console.error('Failed to fetch help requests:', error);
      setError('Failed to load help requests');
    } finally {
      setLoading(false);
    }
  };

  const openNewRequestForm = () => {
    setShowNewRequestForm(true);
    setError('');
    setSuccess('');
  };

  const closeNewRequestForm = () => {
    setShowNewRequestForm(false);
    setNewRequestData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      suburb: '',
      state: '',
      postcode: '',
      helpType: '',
      urgency: 'normal',
      description: '',
      preferredDate: '',
      preferredTime: ''
    });
    setError('');
  };

  const handleNewRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      await submitHelpRequest(newRequestData);
      setSuccess('Help request submitted successfully!');
      await fetchMyRequests();
      closeNewRequestForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to submit help request');
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteModal = (request) => {
    setSelectedRequest(request);
    setDeleteModalOpen(true);
    setEmail('');
    setError('');
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedRequest(null);
    setEmail('');
    setError('');
  };

  const openEditModal = (request) => {
    setSelectedRequest(request);
    setEditFormData({
      fullName: request.fullName || '',
      phone: request.phone || '',
      address: request.address || '',
      suburb: request.suburb || '',
      state: request.state || '',
      postcode: request.postcode || '',
      helpType: request.helpType || '',
      urgency: request.urgency || '',
      description: request.description || '',
      preferredDate: request.preferredDate || '',
      preferredTime: request.preferredTime || ''
    });
    setEditModalOpen(true);
    setEmail('');
    setError('');
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedRequest(null);
    setEditFormData({});
    setEmail('');
    setError('');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setEditLoading(true);
    setError('');

    try {
      await updateHelpRequest(selectedRequest.id, editFormData, email);
      setSuccess('Help request updated successfully');
      await fetchMyRequests();
      closeEditModal();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update help request');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    
    setDeleteLoading(true);
    setError('');

    try {
      await deleteHelpRequest(selectedRequest.id, user.email);
      setSuccess('Help request deleted successfully');
      await fetchMyRequests();
      closeDeleteModal();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to delete help request. You may not have permission.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'status-pending',
      'matched': 'status-matched',
      'in-progress': 'status-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };

    const statusLabels = {
      'pending': 'Pending',
      'matched': 'Matched',
      'in-progress': 'In Progress', 
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };

    return (
      <span className={`status-badge ${statusClasses[status] || 'status-pending'}`}>
        {statusLabels[status] || 'Unknown'}
      </span>
    );
  };

  // Check if user can delete this request
  const canDelete = (request) => {
    // Admin can delete any request
    if (user.role === 'admin') return true;
    // Owner can delete pending, approved, rejected or cancelled requests (not matched, in-progress, or completed)
    return !['matched', 'in-progress', 'completed'].includes(request.status);
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyClasses = {
      'low': 'urgency-low',
      'normal': 'urgency-normal',
      'high': 'urgency-high',
      'urgent': 'urgency-urgent'
    };

    return (
      <span className={`urgency-badge ${urgencyClasses[urgency] || 'urgency-normal'}`}>
        {urgency ? urgency.charAt(0).toUpperCase() + urgency.slice(1) : 'Normal'}
      </span>
    );
  };

  const getHelpTypeEmoji = (helpType) => {
    const emojis = {
      'shopping': '',
      'transport': '',
      'companionship': '',
      'household': '',
      'meal': '',
      'medical': '',
      'tech': '',
      'other': ''
    };
    return emojis[helpType] || '';
  };

  // Show loading if user not loaded yet
  if (!user) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Help Requests</h1>
        <p>Manage your help requests securely. Only you {user.role === 'admin' && 'and admins'} can delete your requests.</p>
      </div>

      {/* Security Notice */}
      <div className="security-notice">
        <div className="security-icon">🔒</div>
        <div className="security-content">
          <h3>Your Data is Protected</h3>
          <p>You can only view and manage your own help requests. Requests that have been matched with volunteers cannot be deleted to protect the volunteer's commitment.</p>
          <div className="security-features">
            <span className="security-feature">Secure Access</span>
            <span className="security-feature">Privacy Protected</span>
            <span className="security-feature">Your Data Only</span>
          </div>
        </div>
      </div>

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your help requests...</p>
        </div>
      ) : (
        <>
          {requests.length === 0 ? (
            <div className="empty-state">
              <h3>No Help Requests Found</h3>
              <p>You haven't submitted any help requests yet.</p>
              <button onClick={openNewRequestForm} className="btn btn-primary">
                Submit a Request
              </button>
            </div>
          ) : (
            <>
              <div className="requests-header">
                <button onClick={openNewRequestForm} className="btn btn-primary">
                  Submit New Request
                </button>
              </div>
              <div className="requests-grid">
                {requests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <div className="request-type">
                        <span className="help-type-emoji">{getHelpTypeEmoji(request.helpType)}</span>
                        <span className="help-type-label">{request.helpType.charAt(0).toUpperCase() + request.helpType.slice(1)}</span>
                      </div>
                      <div className="request-badges">
                        {getUrgencyBadge(request.urgency)}
                        {getStatusBadge(request.status)}
                      </div>
                    </div>

                    <div className="request-content">
                      <div className="request-description">
                        <p>{request.description}</p>
                      </div>
                      
                      <div className="request-details">
                        <div className="detail-item">
                          <strong>Name:</strong> {request.fullName}
                        </div>
                        <div className="detail-item">
                          <strong>Phone:</strong> {request.phone}
                        </div>
                        <div className="detail-item">
                          <strong>Location:</strong> {request.suburb}, {request.state}
                        </div>
                        {request.preferredDate && (
                          <div className="detail-item">
                            <strong>Preferred Date:</strong> {new Date(request.preferredDate).toLocaleDateString()}
                          </div>
                        )}
                        {request.preferredTime && (
                          <div className="detail-item">
                            <strong>Preferred Time:</strong> {request.preferredTime}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="request-actions" style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                      <button 
                        onClick={() => openEditModal(request)}
                        className="btn btn-sm btn-outline"
                        disabled={['matched', 'in-progress', 'completed'].includes(request.status)}
                        title={['matched', 'in-progress', 'completed'].includes(request.status) ? 'Cannot edit active or completed requests' : 'Edit this request'}
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                      >
                        ✏️ Edit
                      </button>
                      {canDelete(request) ? (
                        <button 
                          onClick={() => openDeleteModal(request)}
                          className="btn btn-sm btn-danger"
                          title="Delete this request"
                          style={{ 
                            padding: '8px 16px', 
                            fontSize: '14px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      ) : (
                        <button 
                          className="btn btn-sm btn-outline"
                          disabled
                          title="Cannot delete active or completed requests"
                          style={{ padding: '8px 16px', fontSize: '14px', opacity: 0.6 }}
                        >
                          🔒 Protected
                        </button>
                      )}
                    </div>

                    <div className="request-footer">
                      <small>Created: {new Date(request.createdAt).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* New Request Form Modal */}
      {showNewRequestForm && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3>Submit New Help Request</h3>
              <button onClick={closeNewRequestForm} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleNewRequestSubmit} className="request-form">
              <div className="form-section">
                <h4>Personal Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={newRequestData.fullName}
                      onChange={(e) => setNewRequestData({...newRequestData, fullName: e.target.value})}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={newRequestData.phone}
                      onChange={(e) => setNewRequestData({...newRequestData, phone: e.target.value})}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={newRequestData.email}
                    onChange={(e) => setNewRequestData({...newRequestData, email: e.target.value})}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Address Information</h4>
                <div className="form-group">
                  <label>Street Address *</label>
                  <input
                    type="text"
                    value={newRequestData.address}
                    onChange={(e) => setNewRequestData({...newRequestData, address: e.target.value})}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Suburb *</label>
                    <input
                      type="text"
                      value={newRequestData.suburb}
                      onChange={(e) => setNewRequestData({...newRequestData, suburb: e.target.value})}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select
                      value={newRequestData.state}
                      onChange={(e) => setNewRequestData({...newRequestData, state: e.target.value})}
                      required
                      className="form-control"
                    >
                      <option value="">Select State</option>
                      <option value="NSW">NSW</option>
                      <option value="VIC">VIC</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="WA">WA</option>
                      <option value="TAS">TAS</option>
                      <option value="NT">NT</option>
                      <option value="ACT">ACT</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Postcode *</label>
                    <input
                      type="text"
                      value={newRequestData.postcode}
                      onChange={(e) => setNewRequestData({...newRequestData, postcode: e.target.value})}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Help Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type of Help *</label>
                    <select
                      value={newRequestData.helpType}
                      onChange={(e) => setNewRequestData({...newRequestData, helpType: e.target.value})}
                      required
                      className="form-control"
                    >
                      <option value="">Select Help Type</option>
                      <option value="shopping">Shopping Assistance</option>
                      <option value="transport">Transportation</option>
                      <option value="companionship">Companionship</option>
                      <option value="household">Household Tasks</option>
                      <option value="meal">Meal Support</option>
                      <option value="medical">Medical Support</option>
                      <option value="tech">Technology Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Urgency Level *</label>
                    <select
                      value={newRequestData.urgency}
                      onChange={(e) => setNewRequestData({...newRequestData, urgency: e.target.value})}
                      className="form-control"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={newRequestData.description}
                    onChange={(e) => setNewRequestData({...newRequestData, description: e.target.value})}
                    required
                    className="form-control"
                    rows="4"
                    placeholder="Please describe the help you need..."
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      value={newRequestData.preferredDate}
                      onChange={(e) => setNewRequestData({...newRequestData, preferredDate: e.target.value})}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time</label>
                    <input
                      type="time"
                      value={newRequestData.preferredTime}
                      onChange={(e) => setNewRequestData({...newRequestData, preferredTime: e.target.value})}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeNewRequestForm} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitLoading} className="btn btn-primary">
                  {submitLoading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete Help Request</h3>
            </div>
            <div className="modal-body">
              <p className="warning-text">⚠️ Are you sure you want to delete this help request? This action cannot be undone.</p>
              <div className="request-summary">
                <p><strong>Type:</strong> {selectedRequest?.helpType}</p>
                <p><strong>Description:</strong> {selectedRequest?.description}</p>
                <p><strong>Status:</strong> {selectedRequest?.status}</p>
              </div>
              
              {error && <div className="alert alert-error">{error}</div>}
              
              <form onSubmit={handleDelete}>
                <div className="modal-footer">
                  <button type="button" onClick={closeDeleteModal} className="btn btn-secondary" disabled={deleteLoading}>
                    Cancel
                  </button>
                  <button type="submit" disabled={deleteLoading} className="btn btn-danger">
                    {deleteLoading ? 'Deleting...' : 'Yes, Delete Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3>Edit Help Request</h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      value={editFormData.fullName || ''}
                      onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      value={editFormData.phone || ''}
                      onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Help Type:</label>
                  <select
                    value={editFormData.helpType || ''}
                    onChange={(e) => setEditFormData({...editFormData, helpType: e.target.value})}
                    className="form-control"
                  >
                    <option value="shopping">Shopping Assistance</option>
                    <option value="transport">Transportation</option>
                    <option value="companionship">Companionship</option>
                    <option value="household">Household Tasks</option>
                    <option value="meal">Meal Support</option>
                    <option value="medical">Medical Support</option>
                    <option value="tech">Technology Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Urgency:</label>
                  <select
                    value={editFormData.urgency || 'normal'}
                    onChange={(e) => setEditFormData({...editFormData, urgency: e.target.value})}
                    className="form-control"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                    className="form-control"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Confirm with your email address:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={closeEditModal} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={editLoading} className="btn btn-primary">
                    {editLoading ? 'Updating...' : 'Update Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRequests;