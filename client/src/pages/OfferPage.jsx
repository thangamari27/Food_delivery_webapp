import OfferHeroSection from '@/components/offer/OfferHeroSection'
import CurrentOfferSection from '@/components/offer/CurrentOfferSection'
import UserBenefitSection from '@/components/offer/UserBenefitSection'
import LoyaltyProgramSection from '@/components/offer/LoyaltyProgramSection'
import HolidaySpecialSection from '@/components/offer/HolidaySpecialSection'
import PageLoaderWrapper from '@/components/common/PageLoaderWrapper'

function OfferPage() {
  return (
    <PageLoaderWrapper>
      <main>
        <OfferHeroSection />
        <CurrentOfferSection />
        <UserBenefitSection />
        <LoyaltyProgramSection />
        <HolidaySpecialSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default OfferPage