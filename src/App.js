import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AccessDenied from './pages/AccessDenied';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import HowItWorks from './pages/HowItWorks';
import SuccessStories from './pages/SuccessStories';
import HelpCenter from './pages/HelpCenter';
import Blog from './pages/Blog';
import Guidelines from './pages/Guidelines';
import SafetyTips from './pages/SafetyTips';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Partners from './pages/Partners';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Layout component that conditionally renders Header and Footer
function Layout({ children }) {
  const location = useLocation();
  
  // Hide header and footer on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdminPage && <Header />}
      <main id="main-content" role="main" tabIndex="-1">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Admin Routes - No Header/Footer */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            
            {/* Public and Protected Routes with Header/Footer */}
            <Route path="*" element={
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/success-stories" element={<SuccessStories />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/guidelines" element={<Guidelines />} />
                  <Route path="/safety" element={<SafetyTips />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/access-denied" element={<AccessDenied />} />
                  
                  {/* Protected Routes - Require Login */}
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
