import React from 'react'
import { loyaltyProgramContent } from '@/utils/constant/admin/OfferConstant'
import { loyaltyProgramStyle } from '@/utils/styles/OfferStyle'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import Image from '@/components/common/Image'
import FeaturesList from './loyaltyProgramUI/FeaturesList'

function LoyaltyProgramSection() {
  const content = loyaltyProgramContent;
  const styles = loyaltyProgramStyle;

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.sectionGrid}>
                <div className={styles.header.container}>
                    <Title title={content.title} titleStyle={styles.header.title} />
                    <Paragraph paragraph={content.description} paragraphStyle={styles.header.description} />
                    <FeaturesList features={content.features} icon={content.featureIcon} styles={styles.featureList} />
                    <div className={styles.buttonStyle.buttonContainer}>
                        <button className={styles.buttonStyle.button}>
                            {content.button.buttonTitle}
                        </button>
                    </div>
                </div>
                <div className={styles.rightImage.container}>
                    {content.images.map((image, index) => (
                        <Image key={index} src={image.src} srcFallback={image.srcFallback} alt={image.alt} pictureStyle={styles.rightImage.picture} imageStyle={styles.rightImage.image}  />
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoyaltyProgramSection