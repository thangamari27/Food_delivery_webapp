import { useState } from 'react'
import { userBenefitContent } from '@/utils/constant/admin/OfferConstant'
import { userBenefitStyle } from '@/utils/styles/OfferStyle'
import BenefitHeader from './userBenefitUI/BenefitHeader';
import BenefitCarousel from './userBenefitUI/BenefitCarousel';
import DeliveryPersonBenefit from './userBenefitUI/DeliveryPersonBenefit';

function UserBenefit() {
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const content = userBenefitContent;
  const styles = userBenefitStyle;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
        prev + 1 >= content.benefits.length - 2 ? 0 : prev + 1
    )
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
        prev === 0 ? content.benefits.length -3 : prev - 1
    )
  };

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            {/* user Benefit section Header */}
            <BenefitHeader header={content.header} styles={styles.header} />

            {/* Benefits Cards with Carousel */}
            <BenefitCarousel 
                benefits={content.benefits} 
                currentIndex={currentIndex}
                prevSlide={prevSlide} 
                nextSlide={nextSlide} 
                styles={styles.benefitCarousel} 
            />

            {/* Delivery person and feature benefit section */}
            <DeliveryPersonBenefit content={content.deliveryPerson} styles={styles.deliveryCard} />
        </div>
    </section>
  )
}

export default UserBenefit