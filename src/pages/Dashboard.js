import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import UserDashboard from './UserDashboard';

function Dashboard() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Redirect to specific dashboard based on role
    if (user?.role) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'volunteer':
          navigate('/volunteer-dashboard', { replace: true });
          break;
        case 'user':
        default:
          navigate('/user-dashboard', { replace: true });
          break;
      }
    }
  }, [isLoggedIn, user, navigate]);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Fallback: Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'volunteer':
      return <VolunteerDashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
}

export default Dashboard;
