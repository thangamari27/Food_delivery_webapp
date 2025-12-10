import OfferHeroSection from '@/components/offer/OfferHeroSection'
import CurrentOfferSection from '@/components/offer/CurrentOfferSection'
import UserBenefitSection from '@/components/offer/UserBenefitSection'
import LoyaltyProgramSection from '@/components/offer/LoyaltyProgramSection'
import HolidaySpecialSection from '@/components/offer/HolidaySpecialSection'

function OfferPage() {
  return (
    <div className=''>
        <main>
            <OfferHeroSection />
            <CurrentOfferSection />
            <UserBenefitSection />
            <LoyaltyProgramSection />
            <HolidaySpecialSection />
        </main>
    </div>
  )
}

export default OfferPage