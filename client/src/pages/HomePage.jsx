import HeroSection from '@/components/Home/HeroSection';
import HowItWorkSection from '@/components/home/HowItWorkSection';
import SpecialMenuSection from '@/components/home/SpecialMenuSection';
import PopularMenuSection from '@/components/home/PopularMenuSection';
import ActiveOfferSection from '@/components/common/activeOffer/ActiveOfferSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import PageLoaderWrapper from '@/components/common/PageLoaderWrapper';

const HomePage = () => {

  return (
    <PageLoaderWrapper>
      <main className='min-h-screen'>
        <HeroSection />
        <HowItWorkSection />
        <SpecialMenuSection />
        <PopularMenuSection />
        <ActiveOfferSection />
        <TestimonialSection />
      </main>
    </PageLoaderWrapper>
  );
};

export default HomePage;