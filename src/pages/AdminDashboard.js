import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Mock data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'volunteer', status: 'active', joinDate: '2024-01-15', helpCount: 45 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', status: 'active', joinDate: '2024-02-20', helpCount: 12 },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'volunteer', status: 'inactive', joinDate: '2024-03-10', helpCount: 8 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'active', joinDate: '2024-04-05', helpCount: 23 },
    { id: 5, name: 'Admin User', email: 'admin@localaid.com', role: 'admin', status: 'active', joinDate: '2024-01-01', helpCount: 0 },
    { id: 6, name: 'Chris Brown', email: 'chris@example.com', role: 'volunteer', status: 'pending', joinDate: '2024-11-28', helpCount: 0 },
  ]);

  const [helpRequests, setHelpRequests] = useState([
    { id: 1, title: 'Need groceries delivery', requester: 'Sarah Johnson', category: 'Food & Groceries', status: 'open', priority: 'high', date: '2024-12-01', location: 'Melbourne CBD' },
    { id: 2, title: 'Moving assistance needed', requester: 'Emily Davis', category: 'Transportation', status: 'in-progress', priority: 'medium', date: '2024-11-30', location: 'Richmond' },
    { id: 3, title: 'Elderly care companion', requester: 'Mike Wilson', category: 'Healthcare', status: 'completed', priority: 'low', date: '2024-11-28', location: 'St Kilda' },
    { id: 4, title: 'Home repair help', requester: 'John Smith', category: 'Home Services', status: 'open', priority: 'high', date: '2024-12-02', location: 'Carlton' },
    { id: 5, title: 'Pet sitting required', requester: 'Sarah Johnson', category: 'Pet Care', status: 'open', priority: 'medium', date: '2024-12-01', location: 'Fitzroy' },
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRequests: helpRequests.length,
    openRequests: helpRequests.filter(r => r.status === 'open').length,
    completedRequests: helpRequests.filter(r => r.status === 'completed').length,
    totalVolunteers: users.filter(u => u.role === 'volunteer').length,
  };

  const systemSettings = [
    { id: 'maintenance', label: 'Maintenance Mode', value: false, description: 'Enable to temporarily disable the site for maintenance' },
    { id: 'registration', label: 'User Registration', value: true, description: 'Allow new users to register' },
    { id: 'email_notifications', label: 'Email Notifications', value: true, description: 'Send email notifications to users' },
    { id: 'auto_match', label: 'Auto-Match Volunteers', value: true, description: 'Automatically match volunteers to requests' },
  ];

  const recentActivity = [
    { type: 'user', action: 'New user registered', detail: 'Chris Brown', time: '5 minutes ago' },
    { type: 'request', action: 'Help request created', detail: 'Home repair help', time: '1 hour ago' },
    { type: 'match', action: 'Volunteer matched', detail: 'John Smith → Moving assistance', time: '2 hours ago' },
    { type: 'complete', action: 'Request completed', detail: 'Elderly care companion', time: '3 hours ago' },
    { type: 'user', action: 'User updated profile', detail: 'Sarah Johnson', time: '4 hours ago' },
  ];

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter requests based on search
  const filteredRequests = helpRequests.filter(request =>
    request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (userId) => {
    setDeleteTarget({ type: 'user', id: userId });
    setShowDeleteModal(true);
  };

  const handleDeleteRequest = (requestId) => {
    setDeleteTarget({ type: 'request', id: requestId });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget.type === 'user') {
      setUsers(users.filter(u => u.id !== deleteTarget.id));
    } else {
      setHelpRequests(helpRequests.filter(r => r.id !== deleteTarget.id));
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleUserRoleChange = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  const handleRequestStatusChange = (requestId, newStatus) => {
    setHelpRequests(helpRequests.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return;
    
    switch(action) {
      case 'activate':
        setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, status: 'active' } : u));
        break;
      case 'deactivate':
        setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, status: 'inactive' } : u));
        break;
      case 'delete':
        setUsers(users.filter(u => !selectedUsers.includes(u.id)));
        break;
      default:
        break;
    }
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Overview</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Users</span>
            <span className="nav-badge">{users.length}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveSection('requests')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span>Help Requests</span>
            <span className="nav-badge">{helpRequests.filter(r => r.status === 'open').length}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveSection('analytics')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>Analytics</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSection('reports')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            <span>Reports</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/dashboard" className="admin-nav-item back-to-site">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M19 12H5"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Admin Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <h1>
              {activeSection === 'overview' && 'Dashboard Overview'}
              {activeSection === 'users' && 'User Management'}
              {activeSection === 'requests' && 'Help Requests'}
              {activeSection === 'analytics' && 'Analytics & Insights'}
              {activeSection === 'reports' && 'Reports'}
              {activeSection === 'settings' && 'System Settings'}
            </h1>
          </div>
          <div className="admin-header-right">
            <div className="admin-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="admin-user-info">
              <span className="admin-role-badge">Admin</span>
              <span className="admin-user-name">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="admin-overview">
              {/* Stats Grid */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-icon users">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.totalUsers}</span>
                    <span className="stat-label">Total Users</span>
                  </div>
                  <span className="stat-trend positive">+12%</span>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-icon active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.activeUsers}</span>
                    <span className="stat-label">Active Users</span>
                  </div>
                  <span className="stat-trend positive">+8%</span>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-icon requests">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.openRequests}</span>
                    <span className="stat-label">Open Requests</span>
                  </div>
                  <span className="stat-trend negative">-3%</span>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-icon volunteers">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.totalVolunteers}</span>
                    <span className="stat-label">Volunteers</span>
                  </div>
                  <span className="stat-trend positive">+15%</span>
                </div>
              </div>

              {/* Quick Actions & Activity */}
              <div className="admin-overview-grid">
                <div className="admin-quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions-grid">
                    <button className="quick-action-btn" onClick={() => setActiveSection('users')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                      <span>Add User</span>
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveSection('requests')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="12" y1="18" x2="12" y2="12"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                      <span>Review Requests</span>
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveSection('reports')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      <span>Export Report</span>
                    </button>
                    <button className="quick-action-btn" onClick={() => setActiveSection('settings')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4"/>
                      </svg>
                      <span>Settings</span>
                    </button>
                  </div>
                </div>

                <div className="admin-recent-activity">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className={`activity-icon ${activity.type}`}>
                          {activity.type === 'user' && '👤'}
                          {activity.type === 'request' && '📋'}
                          {activity.type === 'match' && '🤝'}
                          {activity.type === 'complete' && '✅'}
                        </div>
                        <div className="activity-content">
                          <p className="activity-action">{activity.action}</p>
                          <p className="activity-detail">{activity.detail}</p>
                        </div>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Management Section */}
          {activeSection === 'users' && (
            <div className="admin-users">
              <div className="admin-toolbar">
                <div className="toolbar-left">
                  <select className="filter-select">
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="user">User</option>
                  </select>
                  <select className="filter-select">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="toolbar-right">
                  {selectedUsers.length > 0 && (
                    <div className="bulk-actions">
                      <span>{selectedUsers.length} selected</span>
                      <button className="bulk-btn activate" onClick={() => handleBulkAction('activate')}>Activate</button>
                      <button className="bulk-btn deactivate" onClick={() => handleBulkAction('deactivate')}>Deactivate</button>
                      <button className="bulk-btn delete" onClick={() => handleBulkAction('delete')}>Delete</button>
                    </div>
                  )}
                  <button className="add-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add User
                  </button>
                </div>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox" 
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={selectAllUsers}
                        />
                      </th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Help Count</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(userItem => (
                      <tr key={userItem.id}>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedUsers.includes(userItem.id)}
                            onChange={() => toggleUserSelection(userItem.id)}
                          />
                        </td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{userItem.name.charAt(0)}</div>
                            <span>{userItem.name}</span>
                          </div>
                        </td>
                        <td>{userItem.email}</td>
                        <td>
                          <select 
                            className={`role-select ${userItem.role}`}
                            value={userItem.role}
                            onChange={(e) => handleUserRoleChange(userItem.id, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <select 
                            className={`status-select ${userItem.status}`}
                            value={userItem.status}
                            onChange={(e) => handleUserStatusChange(userItem.id, e.target.value)}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                          </select>
                        </td>
                        <td>{userItem.joinDate}</td>
                        <td>{userItem.helpCount}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn edit" title="Edit User">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button 
                              className="action-btn delete" 
                              title="Delete User"
                              onClick={() => handleDeleteUser(userItem.id)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Help Requests Section */}
          {activeSection === 'requests' && (
            <div className="admin-requests">
              <div className="admin-toolbar">
                <div className="toolbar-left">
                  <select className="filter-select">
                    <option value="all">All Categories</option>
                    <option value="food">Food & Groceries</option>
                    <option value="transport">Transportation</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="home">Home Services</option>
                  </select>
                  <select className="filter-select">
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select className="filter-select">
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="requests-grid">
                {filteredRequests.map(request => (
                  <div key={request.id} className={`request-card priority-${request.priority}`}>
                    <div className="request-header">
                      <span className={`priority-badge ${request.priority}`}>{request.priority}</span>
                      <select 
                        className={`status-badge ${request.status}`}
                        value={request.status}
                        onChange={(e) => handleRequestStatusChange(request.id, e.target.value)}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <h4>{request.title}</h4>
                    <div className="request-meta">
                      <p><strong>Requester:</strong> {request.requester}</p>
                      <p><strong>Category:</strong> {request.category}</p>
                      <p><strong>Location:</strong> {request.location}</p>
                      <p><strong>Date:</strong> {request.date}</p>
                    </div>
                    <div className="request-actions">
                      <button className="request-btn view">View Details</button>
                      <button className="request-btn assign">Assign Volunteer</button>
                      <button className="request-btn delete" onClick={() => handleDeleteRequest(request.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="admin-analytics">
              <div className="analytics-summary">
                <h3>Platform Insights</h3>
                <div className="analytics-cards">
                  <div className="analytics-card">
                    <h4>User Growth</h4>
                    <div className="analytics-chart-placeholder">
                      <div className="chart-bars">
                        <div className="bar" style={{height: '40%'}}><span>Jan</span></div>
                        <div className="bar" style={{height: '55%'}}><span>Feb</span></div>
                        <div className="bar" style={{height: '45%'}}><span>Mar</span></div>
                        <div className="bar" style={{height: '70%'}}><span>Apr</span></div>
                        <div className="bar" style={{height: '60%'}}><span>May</span></div>
                        <div className="bar" style={{height: '85%'}}><span>Jun</span></div>
                        <div className="bar" style={{height: '90%'}}><span>Jul</span></div>
                        <div className="bar" style={{height: '75%'}}><span>Aug</span></div>
                        <div className="bar" style={{height: '80%'}}><span>Sep</span></div>
                        <div className="bar" style={{height: '95%'}}><span>Oct</span></div>
                        <div className="bar" style={{height: '88%'}}><span>Nov</span></div>
                        <div className="bar active" style={{height: '100%'}}><span>Dec</span></div>
                      </div>
                    </div>
                    <p className="analytics-stat">+156 users this month</p>
                  </div>

                  <div className="analytics-card">
                    <h4>Request Completion Rate</h4>
                    <div className="donut-chart">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                          strokeDasharray="78, 100"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">78%</text>
                      </svg>
                    </div>
                    <p className="analytics-stat">78% completion rate</p>
                  </div>

                  <div className="analytics-card">
                    <h4>Top Categories</h4>
                    <div className="category-stats">
                      <div className="category-bar">
                        <span className="category-name">Food & Groceries</span>
                        <div className="progress-bar"><div className="progress" style={{width: '85%'}}></div></div>
                        <span className="category-count">342</span>
                      </div>
                      <div className="category-bar">
                        <span className="category-name">Transportation</span>
                        <div className="progress-bar"><div className="progress" style={{width: '65%'}}></div></div>
                        <span className="category-count">256</span>
                      </div>
                      <div className="category-bar">
                        <span className="category-name">Healthcare</span>
                        <div className="progress-bar"><div className="progress" style={{width: '50%'}}></div></div>
                        <span className="category-count">198</span>
                      </div>
                      <div className="category-bar">
                        <span className="category-name">Home Services</span>
                        <div className="progress-bar"><div className="progress" style={{width: '35%'}}></div></div>
                        <span className="category-count">142</span>
                      </div>
                    </div>
                  </div>

                  <div className="analytics-card">
                    <h4>Volunteer Engagement</h4>
                    <div className="engagement-stats">
                      <div className="engagement-item">
                        <span className="engagement-value">4.8</span>
                        <span className="engagement-label">Avg Rating</span>
                      </div>
                      <div className="engagement-item">
                        <span className="engagement-value">12.5</span>
                        <span className="engagement-label">Avg Hours/Week</span>
                      </div>
                      <div className="engagement-item">
                        <span className="engagement-value">89%</span>
                        <span className="engagement-label">Retention Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Section */}
          {activeSection === 'reports' && (
            <div className="admin-reports">
              <div className="reports-list">
                <div className="report-card">
                  <div className="report-icon">📊</div>
                  <div className="report-info">
                    <h4>User Activity Report</h4>
                    <p>Detailed breakdown of user registrations, logins, and activity</p>
                  </div>
                  <button className="report-btn">Generate</button>
                </div>
                <div className="report-card">
                  <div className="report-icon">📋</div>
                  <div className="report-info">
                    <h4>Help Request Summary</h4>
                    <p>Overview of all help requests by category, status, and location</p>
                  </div>
                  <button className="report-btn">Generate</button>
                </div>
                <div className="report-card">
                  <div className="report-icon">👥</div>
                  <div className="report-info">
                    <h4>Volunteer Performance</h4>
                    <p>Metrics on volunteer contributions, ratings, and impact</p>
                  </div>
                  <button className="report-btn">Generate</button>
                </div>
                <div className="report-card">
                  <div className="report-icon">💰</div>
                  <div className="report-info">
                    <h4>Donation Report</h4>
                    <p>Summary of donations received and their allocation</p>
                  </div>
                  <button className="report-btn">Generate</button>
                </div>
                <div className="report-card">
                  <div className="report-icon">🌍</div>
                  <div className="report-info">
                    <h4>Geographic Distribution</h4>
                    <p>Heat map and statistics of service coverage areas</p>
                  </div>
                  <button className="report-btn">Generate</button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="admin-settings">
              <div className="settings-section">
                <h3>General Settings</h3>
                <div className="settings-list">
                  {systemSettings.map(setting => (
                    <div key={setting.id} className="setting-item">
                      <div className="setting-info">
                        <h4>{setting.label}</h4>
                        <p>{setting.description}</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked={setting.value} />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-section">
                <h3>Security Settings</h3>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Require 2FA for all admin accounts</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked={true} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Session Timeout</h4>
                      <p>Auto-logout inactive users after specified time</p>
                    </div>
                    <select className="setting-select">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60" selected>1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="save-settings-btn">Save Changes</button>
                <button className="reset-settings-btn">Reset to Defaults</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this {deleteTarget?.type}? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="modal-btn confirm-delete" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
