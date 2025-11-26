import React from 'react';
import HeroSection from '../components/HeroSection';
import CommunityStories from '../components/CommunityStories';
import Testimonials from '../components/Testimonials';
import Opportunities from '../components/Opportunities';
import DonationSection from '../components/DonationSection';
import CallToAction from '../components/CallToAction';
import InsightsSection from '../components/InsightsSection';

function Home() {
  return (
    <>
      <HeroSection />
      <Opportunities />
      <CommunityStories />
      <Testimonials />
      <DonationSection />
      <CallToAction />
      <InsightsSection />
    </>
  );
}

export default Home;
