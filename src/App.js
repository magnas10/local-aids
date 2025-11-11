import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import CommunityStories from './components/CommunityStories';
import Testimonials from './components/Testimonials';
import Opportunities from './components/Opportunities';
import DonationSection from './components/DonationSection';
import CallToAction from './components/CallToAction';
import InsightsSection from './components/InsightsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <StatsSection />
      <CommunityStories />
      <Testimonials />
      <Opportunities />
      <DonationSection />
      <CallToAction />
      <InsightsSection />
      <Footer />
    </div>
  );
}

export default App;
