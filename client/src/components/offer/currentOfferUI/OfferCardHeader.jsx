import React from 'react'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'


function OfferCardHeader({ offer, styles }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title 
          title={offer.title} 
          titleStyle={styles.title} 
        />
        <Paragraph 
          paragraph={offer.subtitle}
          paragraphStyle={styles.description}
        />
      </div>

      <div className={styles.descriptionContainer}>
        <div className={styles.discountWrapper}>
          {offer.discount}
        </div>
      </div>
    </div>
  )
}

export default OfferCardHeader