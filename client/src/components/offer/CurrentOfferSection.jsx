import React from 'react'
// import ActiveOfferSection from '../home/ActiveOfferSection'
import OfferGrid from './currentOfferUI/OfferGrid'

function CurrentOfferSection() {
  return (
    <section className='py-16 md:py-2 min-h-screen bg-amber-50'>
        {/* Active offer component */}
        {/* <ActiveOfferSection /> */}
        
        {/* Current Active offer grid view */}
        <OfferGrid />
    </section>
  )
}

export default CurrentOfferSection