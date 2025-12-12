import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Partners from './pages/Partners';
import Blog from './pages/Blog';
import CommunityGuidelines from './pages/CommunityGuidelines';
import SafetyTips from './pages/SafetyTips';
import HelpCenter from './pages/HelpCenter';

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
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              <Route path="/safety-tips" element={<SafetyTips />} />
              <Route path="/help-center" element={<HelpCenter />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
