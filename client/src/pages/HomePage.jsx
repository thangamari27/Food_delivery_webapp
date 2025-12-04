import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import HowItWorkSection from '@/components/home/HowItWorkSection';
import SpecialMenuSection from '@/components/home/SpecialMenuSection';
import PopularMenuSection from '@/components/home/PopularMenuSection';
import ActiveOfferSection from '@/components/common/activeOffer/ActiveOfferSection';
import TestimonialSection from '@/components/home/TestimonialSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <HowItWorkSection />
        <SpecialMenuSection />
        <PopularMenuSection />
        <ActiveOfferSection />
        <TestimonialSection />
      </main>
    </div>
  );
};

export default HomePage;