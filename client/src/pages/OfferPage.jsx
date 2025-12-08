import OfferHeroSection from '@/components/offer/OfferHeroSection'
import CurrentOfferSection from '@/components/offer/CurrentOfferSection'
import UserBenefit from '@/components/offer/UserBenefit'

function OfferPage() {
  return (
    <div className=''>
        <main>
            <OfferHeroSection />
            <CurrentOfferSection />
            <UserBenefit />
        </main>
    </div>
  )
}

export default OfferPage