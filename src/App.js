import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNavigation from './components/AdminNavigation';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Messages from './pages/Messages_new';
import Profile from './pages/Profile';
import VolunteerDashboard from './pages/VolunteerDashboard';
import UserDashboard from './pages/UserDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Press from './pages/Press';
import CommunityGuidelines from './pages/CommunityGuidelines';
import SafetyTips from './pages/SafetyTips';
import HelpCenter from './pages/HelpCenter';
import RequestHelp from './pages/RequestHelp';
import MyRequests from './pages/MyRequests';
import TestLogin from './pages/TestLogin';
import HowItWorks from './pages/HowItWorks';

// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminRequestManagement from './pages/admin/AdminRequestManagement';
import AdminGallery from './pages/admin/AdminGallery';
import AdminReports from './pages/admin/AdminReports';
import AdminContent from './pages/admin/AdminContent';
import AdminSettings from './pages/admin/AdminSettings';

// ScrollToTop component - scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main id="main-content" role="main" tabIndex="-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/volunteer-dashboard" element={<ProtectedRoute><VolunteerDashboard /></ProtectedRoute>} />
              <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/partners" element={<Partners />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/press" element={<Press />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              <Route path="/safety-tips" element={<SafetyTips />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/request-help" element={<RequestHelp />} />
              <Route path="/my-requests" element={<MyRequests />} />
              <Route path="/test-login" element={<TestLogin />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminUserManagement />
                </AdminRoute>
              } />
              <Route path="/admin/requests" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminRequestManagement />
                </AdminRoute>
              } />
              <Route path="/admin/gallery" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminGallery />
                </AdminRoute>
              } />
              <Route path="/admin/reports" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminReports />
                </AdminRoute>
              } />
              <Route path="/admin/content" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminContent />
                </AdminRoute>
              } />
              <Route path="/admin/settings" element={
                <AdminRoute>
                  <AdminNavigation />
                  <AdminSettings />
                </AdminRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
