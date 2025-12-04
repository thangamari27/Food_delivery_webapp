import HeroCarousel from './heroUI/HeroCarousel'
import { currentOfferSection } from '@/utils/constant/user/OfferConstant'

function OfferSection() {
  return (
    <section className='pt-24 md:pt-24 px-2 sm:px-4 md:px-10 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50 '>
        <HeroCarousel slides={ currentOfferSection.heroCarousel } />
    </section>
  )
}

export default OfferSection