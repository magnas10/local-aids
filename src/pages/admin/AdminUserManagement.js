import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, deleteUser, updateUserProfile } from '../../services/api';
import './AdminPages.css';

function AdminUserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllUsers();
      console.log('Users response:', response);
      
      // Handle both formats: response.users or direct response array
      const usersData = response.users || response || [];
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to load users. ' + (error.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      setActionLoading(true);
      setError('');
      
      switch (action) {
        case 'activate':
        case 'unsuspend':
          await updateUserProfile(userId, { status: 'active' });
          break;
        case 'deactivate':
        case 'suspend':
          await updateUserProfile(userId, { status: 'suspended' });
          break;
        case 'verify':
          await updateUserProfile(userId, { verified: true });
          break;
        case 'unverify':
          await updateUserProfile(userId, { verified: false });
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            await deleteUser(userId);
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
      
      // Refresh users list
      await fetchUsers();
      alert(`User ${action} successfully!`);
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      setError(`Failed to ${action} user: ${error.message || 'Please try again.'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && user.isActive) || 
      (filterStatus === 'inactive' && !user.isActive);
    const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
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
          <div className="admin-badge" style={{ color: '#ffc107' }}>👥 USER MANAGEMENT</div>
          <h1 className="admin-hero-title" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '800' }}>
            User <span className="highlight" style={{ color: '#ffc107' }}>Management</span>
          </h1>
          <p className="admin-hero-subtitle" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
            Manage all platform users, volunteers, and their permissions.
          </p>
          <div className="admin-hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {filteredUsers.length}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>TOTAL USERS</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {filteredUsers.filter(u => u.role === 'volunteer').length}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>VOLUNTEERS</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: '#ffffff', fontSize: '3rem', fontWeight: '800' }}>
                {filteredUsers.filter(u => u.isActive || u.status === 'active').length}
              </div>
              <div className="hero-stat-label" style={{ color: '#ffffff' }}>ACTIVE USERS</div>
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

      {/* Filters and Search */}
      <div className="admin-table">
        <div className="admin-table-header">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <label>Role Filter: </label>
              <select 
                value={filterRole} 
                onChange={(e) => setFilterRole(e.target.value)}
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="volunteer">Volunteers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            <div>
              <label>Status Filter: </label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search users..."
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
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th>Help Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id || user.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600' }}>{user.name || 'No Name'}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{user.email}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>📍 {user.location || 'Location not set'}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${user.role}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td>
                    {user.isVerified ? '✅ Verified' : '❌ Not Verified'}
                  </td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : (user.joinDate || 'Unknown')}</td>
                  <td>{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}</td>
                  <td>{user.helpCount || 0}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {user.isActive ? (
                        <button 
                          onClick={() => handleUserAction(user._id || user.id, 'suspend')}
                          disabled={actionLoading}
                          style={{ 
                            padding: '4px 8px', 
                            fontSize: '0.8rem', 
                            background: actionLoading ? '#ccc' : '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '3px',
                            cursor: actionLoading ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {actionLoading ? 'Loading...' : 'Suspend'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleUserAction(user._id || user.id, 'unsuspend')}
                          disabled={actionLoading}
                          style={{ 
                            padding: '4px 8px', 
                            fontSize: '0.8rem', 
                            background: actionLoading ? '#ccc' : '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '3px',
                            cursor: actionLoading ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {actionLoading ? 'Loading...' : 'Unsuspend'}
                        </button>
                      )}
                      
                      {!user.isVerified && (
                        <button 
                          onClick={() => handleUserAction(user._id || user.id, 'verify')}
                          disabled={actionLoading}
                          style={{ 
                            padding: '4px 8px', 
                            fontSize: '0.8rem', 
                            background: actionLoading ? '#ccc' : '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '3px',
                            cursor: actionLoading ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {actionLoading ? 'Loading...' : 'Verify'}
                        </button>
                      )}
                      
                      <button 
                        onClick={() => handleUserAction(user._id || user.id, 'delete')}
                        disabled={actionLoading}
                        style={{ 
                          padding: '4px 8px', 
                          fontSize: '0.8rem', 
                          background: actionLoading ? '#ccc' : '#6c757d', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '3px',
                          cursor: actionLoading ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {actionLoading ? 'Loading...' : 'Delete'}
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
        <h3>📊 User Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-number">{users.length}</div>
              <div className="stat-label">Total Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🙋‍♂️</div>
            <div className="stat-content">
              <div className="stat-number">{users.filter(u => u.role === 'volunteer').length}</div>
              <div className="stat-label">Volunteers</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{users.filter(u => u.isActive).length}</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <div className="stat-number">{users.filter(u => u.isVerified).length}</div>
              <div className="stat-label">Verified Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManagement;