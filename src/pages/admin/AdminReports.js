import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, getHelpRequests } from '../../services/api';
import './AdminPages.css';

function AdminReports() {
  const { user } = useAuth();
  const [activeReport, setActiveReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const reports = [
    { id: 'user-activity', title: 'User Activity Report', icon: '👥', color: 'info' },
    { id: 'platform-stats', title: 'Platform Statistics', icon: '📈', color: 'success' },
    { id: 'issue-reports', title: 'Issue Reports', icon: '⚠️', color: 'warning' },
    { id: 'performance', title: 'Performance Metrics', icon: '📊', color: 'secondary' }
  ];

  const generateReport = async (reportId) => {
    setLoading(true);
    setActiveReport(reportId);
    
    try {
      const usersResponse = await getAllUsers();
      const requestsResponse = await getHelpRequests();
      
      const users = usersResponse.users || usersResponse || [];
      const requests = Array.isArray(requestsResponse) ? requestsResponse : requestsResponse.helpRequests || [];

      let data = {};

      switch(reportId) {
        case 'user-activity':
          data = {
            totalUsers: users.length,
            activeUsers: users.filter(u => u.isActive || u.status === 'active').length,
            volunteers: users.filter(u => u.role === 'volunteer').length,
            admins: users.filter(u => u.role === 'admin').length,
            recentSignups: users.filter(u => {
              const signupDate = new Date(u.createdAt);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return signupDate > weekAgo;
            }).length
          };
          break;
        case 'platform-stats':
          data = {
            totalRequests: requests.length,
            pendingRequests: requests.filter(r => r.status === 'pending').length,
            completedRequests: requests.filter(r => r.status === 'completed').length,
            activeVolunteers: users.filter(u => u.role === 'volunteer' && (u.isActive || u.status === 'active')).length,
            successRate: requests.length > 0 ? ((requests.filter(r => r.status === 'completed').length / requests.length) * 100).toFixed(1) : 0
          };
          break;
        case 'issue-reports':
          data = {
            totalIssues: requests.filter(r => r.status === 'rejected' || r.urgency === 'urgent').length,
            urgentRequests: requests.filter(r => r.urgency === 'urgent').length,
            rejectedRequests: requests.filter(r => r.status === 'rejected').length,
            pendingIssues: requests.filter(r => r.status === 'pending' && r.urgency === 'urgent').length
          };
          break;
        case 'performance':
          const avgResponseTime = '2.5 hours'; // Placeholder
          data = {
            avgResponseTime,
            requestsPerDay: (requests.length / 30).toFixed(1),
            userGrowthRate: '12%', // Placeholder
            volunteerUtilization: '78%' // Placeholder
          };
          break;
        default:
          data = {};
      }

      setReportData(data);
    } catch (error) {
      console.error('Failed to generate report:', error);
      setReportData({ error: 'Failed to generate report' });
    } finally {
      setLoading(false);
    }
  };

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
          <div className="admin-badge" style={{ color: '#ffc107' }}>📊 REPORTS & ANALYTICS</div>
          <h1 className="admin-hero-title" style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: '800' }}>
            Platform <span className="highlight" style={{ color: '#ffc107' }}>Analytics</span>
          </h1>
          <p className="admin-hero-subtitle" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
            Generate comprehensive reports and analyze platform performance.
          </p>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', marginBottom: '30px' }}>
        <h2 style={{ color: '#6c757d', marginBottom: '20px' }}>🚧 Under Development</h2>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Advanced reporting and analytics features are currently being developed.
          <br />This will include user activity reports, platform statistics, and performance metrics.
        </p>
      </div>

      {/* Quick Report Options */}
      <div className="quick-actions" style={{ margin: '30px', padding: '0 20px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2c3e50' }}>📋 Available Reports</h3>
        <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {reports.map(report => (
            <button 
              key={report.id}
              onClick={() => generateReport(report.id)}
              className={`action-btn ${report.color}`}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '20px',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              disabled={loading}
            >
              <span className="action-icon" style={{ fontSize: '1.5rem' }}>{report.icon}</span>
              <span>{report.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Report Display */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', margin: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3>Generating report...</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #20b2aa', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        </div>
      )}

      {reportData && !loading && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', margin: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ color: '#2c3e50', fontSize: '1.8rem' }}>
              {reports.find(r => r.id === activeReport)?.title}
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => window.print()}
                style={{ 
                  padding: '10px 20px', 
                  background: '#20b2aa', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📄 Export PDF
              </button>
              <button 
                onClick={() => setReportData(null)}
                style={{ 
                  padding: '10px 20px', 
                  background: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Close
              </button>
            </div>
          </div>

          {reportData.error ? (
            <div style={{ padding: '20px', background: '#f8d7da', color: '#721c24', borderRadius: '8px' }}>
              {reportData.error}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {Object.entries(reportData).map(([key, value]) => (
                <div key={key} style={{ padding: '25px', background: '#f8f9fa', borderRadius: '12px', border: '2px solid #e9ecef' }}>
                  <div style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '10px', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2c3e50' }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '30px', padding: '20px', background: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
            <strong>📅 Generated:</strong> {new Date().toLocaleString()}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AdminReports;