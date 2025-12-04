import React from 'react'
import OfferHeroSection from '../components/offer/OfferHeroSection'
import CurrentOfferSection from '../components/offer/CurrentOfferSection'

function OfferPage() {
  return (
    <div className='min-h-screen'>
        <main>
            <OfferHeroSection />
            <CurrentOfferSection />
        </main>
    </div>
  )
}

export default OfferPage