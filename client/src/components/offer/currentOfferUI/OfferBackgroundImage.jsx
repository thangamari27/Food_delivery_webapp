import React from 'react'
import Image from '@/components/common/Image'

function OfferBackgroundImage({ offer, styles }) {
  return (
    <div className={styles.container}>
      
      <Image 
        src={offer.src}
        srcFallback={offer.srcFallback}
        alt={offer.alt}
        pictureStyle={styles.picture}
        imageStyle={styles.image}
      />
      <div className={styles.imageShadow} />
    </div>
  )
}

export default OfferBackgroundImage