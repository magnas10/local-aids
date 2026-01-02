import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getHelpRequests, updateHelpRequestStatus, deleteHelpRequest } from '../../services/api';
import './AdminPages.css';

function AdminRequestManagement() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getHelpRequests();
      console.log('Help requests response:', response);

      const requestsData = Array.isArray(response) ? response : response.helpRequests || [];
      setRequests(requestsData);
    } catch (error) {
      console.error('Failed to fetch help requests:', error);
      setError('Failed to load help requests. ' + (error.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      setActionLoading(true);
      setError('');

      // Check for token first
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Your session has expired. Please login again.');
        window.location.href = '/login';
        return;
      }

      switch (action) {
        case 'approve':
          await updateHelpRequestStatus(requestId, 'approved');
          break;
        case 'reject':
          await updateHelpRequestStatus(requestId, 'rejected');
          break;
        case 'pending':
          await updateHelpRequestStatus(requestId, 'pending');
          break;
        case 'complete':
          await updateHelpRequestStatus(requestId, 'completed');
          break;
        case 'cancel':
          await updateHelpRequestStatus(requestId, 'cancelled');
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to permanently delete this request? The user will be notified via direct message.')) {
            await deleteHelpRequest(requestId);
          } else {
            setActionLoading(false);
            return;
          }
          break;
        default:
          console.log(`Unknown action: ${action}`);
          setActionLoading(false);
          return;
      }

      await fetchRequests();
    } catch (error) {
      console.error(`Failed to ${action} request:`, error);
      setError(`Failed to ${action} request: ${error.message || 'Please try again.'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#007bff';
      case 'pending': return '#ffc107';
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      case 'accepted': return '#17a2b8';
      case 'matched': return '#17a2b8';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || request.priority === filterUrgency;
    const matchesSearch = (request.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.contactName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesUrgency && matchesSearch;
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-error">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-hero" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}>
        <div className="admin-hero-content">
          <div className="admin-badge" style={{ color: '#ffc107' }}>🆘 REQUEST MANAGEMENT</div>
          <h1 className="admin-hero-title" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '800' }}>
            Help <span className="highlight" style={{ color: '#ffc107' }}>Requests</span>
          </h1>
          <p className="admin-hero-subtitle" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
            Monitor and manage all help requests on the platform.
          </p>
          <div className="admin-hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {filteredRequests.length}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>TOTAL REQUESTS</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {filteredRequests.filter(r => r.status === 'pending').length}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>PENDING</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {filteredRequests.filter(r => r.status === 'completed').length}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>COMPLETED</div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '12px 16px',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Urgent Requests Alert */}
      {requests.filter(r => (r.priority === 'urgent' || r.priority === 'high') && r.status !== 'completed').length > 0 && (
        <div className="urgent-alerts">
          <h3>🚨 Critical Requests Needing Immediate Attention</h3>
          <div className="alerts-grid">
            {requests
              .filter(r => (r.priority === 'urgent' || r.priority === 'high') && r.status !== 'completed')
              .map(request => (
                <div key={request._id} className="alert-card priority-critical">
                  <div className="alert-content">
                    <div className="alert-type">HIGH PRIORITY REQUEST</div>
                    <h4>{request.title}</h4>
                    <p><strong>Requester:</strong> {request.contactName}</p>
                    <p><strong>Location:</strong> {request.location}</p>
                    <p><strong>Time:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                    <button
                      className="alert-action-btn"
                      onClick={() => window.open(`mailto:volunteers@localaid.org?subject=Urgent Help Needed&body=High priority request needs attention: ${request.title}`, '_blank')}
                    >
                      Send Alert to Volunteers
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <label>Status Filter: </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="matched">Matched</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label>Urgency Filter: </label>
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="all">All Urgency</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Request</th>
                <th>Requester</th>
                <th>Status</th>
                <th>Urgency</th>
                <th>Volunteer</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '5px' }}>{request.title}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '5px' }}>
                        {request.description}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                        📍 {request.location} • ⏱️ {request.estimatedTime} • 📂 {request.category}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600' }}>{request.requester}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{request.requesterEmail}</div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(request.status) + '20',
                        color: getStatusColor(request.status),
                        border: `1px solid ${getStatusColor(request.status)}`
                      }}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getUrgencyColor(request.urgency) + '20',
                        color: getUrgencyColor(request.urgency),
                        border: `1px solid ${getUrgencyColor(request.urgency)}`
                      }}
                    >
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                    </span>
                  </td>
                  <td>
                    {request.volunteer ? (
                      <div style={{ fontWeight: '600', color: '#28a745' }}>
                        ✅ {request.volunteer}
                      </div>
                    ) : (
                      <div style={{ color: '#dc3545' }}>
                        ❌ Not assigned
                      </div>
                    )}
                  </td>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleRequestAction(request.id, 'approve')}
                            style={{
                              padding: '4px 8px',
                              fontSize: '0.8rem',
                              background: '#28a745',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleRequestAction(request.id, 'reject')}
                            style={{
                              padding: '4px 8px',
                              fontSize: '0.8rem',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          >
                            ✗ Reject
                          </button>
                        </>
                      )}

                      {(request.status === 'approved' || request.status === 'matched') && request.status !== 'completed' && (
                        <button
                          onClick={() => handleRequestAction(request.id, 'complete')}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          ✓ Mark Complete
                        </button>
                      )}

                      {request.urgency !== 'critical' && (
                        <button
                          onClick={() => handleRequestAction(request.id, 'urgent')}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          Mark Urgent
                        </button>
                      )}

                      {request.status !== 'completed' && request.status !== 'cancelled' && (
                        <button
                          onClick={() => handleRequestAction(request.id, 'cancel')}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      )}

                      <button
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="stats-section">
        <h3>📊 Request Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-number">{requests.length}</div>
              <div className="stat-label">Total Requests</div>
            </div>
          </div>
          <div className="stat-card urgent">
            <div className="stat-icon">🚨</div>
            <div className="stat-content">
              <div className="stat-number">{requests.filter(r => r.urgency === 'critical').length}</div>
              <div className="stat-label">Critical Requests</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{requests.filter(r => r.status === 'open' || r.status === 'pending').length}</div>
              <div className="stat-label">Awaiting Help</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{requests.filter(r => r.status === 'completed').length}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRequestManagement;