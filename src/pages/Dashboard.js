import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VolunteerDashboard from './VolunteerDashboard';
import UserDashboard from './UserDashboard';
import './UnifiedDashboard.css';

function Dashboard() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('seeker'); // 'seeker' or 'volunteer'

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Admin gets redirected to admin dashboard
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  if (!user || user.role === 'admin') {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Unified dashboard for all users and volunteers
  return (
    <div className="unified-dashboard">
      <div className="dashboard-mode-toggle">
        <span className="mode-toggle-label">I want to:</span>
        <button 
          className={`mode-btn ${viewMode === 'seeker' ? 'active' : ''}`}
          onClick={() => setViewMode('seeker')}
          aria-pressed={viewMode === 'seeker'}
        >
          🙏 Seek Help
        </button>
        <button 
          className={`mode-btn ${viewMode === 'volunteer' ? 'active' : ''}`}
          onClick={() => setViewMode('volunteer')}
          aria-pressed={viewMode === 'volunteer'}
        >
          ❤️ Volunteer
        </button>
      </div>
      
      {viewMode === 'seeker' ? <UserDashboard /> : <VolunteerDashboard />}
    </div>
  );
}

export default Dashboard;
