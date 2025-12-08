import OfferHeroSection from '@/components/offer/OfferHeroSection'
import CurrentOfferSection from '@/components/offer/CurrentOfferSection'
import UserBenefitSection from '@/components/offer/UserBenefitSection'
import LoyaltyProgram from '@/components/offer/LoyaltyProgram'

function OfferPage() {
  return (
    <div className=''>
        <main>
            <OfferHeroSection />
            <CurrentOfferSection />
            <UserBenefitSection />
            <LoyaltyProgram />
        </main>
    </div>
  )
}

export default OfferPage