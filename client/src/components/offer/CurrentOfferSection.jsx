import React from 'react'
import ActiveOfferSection from '@/components/common/activeOffer/ActiveOfferSection'
import OfferGrid from './currentOfferUI/OfferGrid'
import { currentOfferContent } from '@/utils/constant/admin/OfferConstant'
import { currentOfferStyle } from '@/utils/styles/OfferStyle'

function CurrentOfferSection() {
  const content = currentOfferContent;
  const styles = currentOfferStyle;

  return (
    <section className={styles.section}>
        {/* Active offer component */}
        <ActiveOfferSection />
        
        {/* Current Active offer grid view */}
        {/* <OfferGrid 
          content={content.activeOffers} 
          styles={styles.offerGrid} 
        /> */}
    </section>
  )
}

export default CurrentOfferSection