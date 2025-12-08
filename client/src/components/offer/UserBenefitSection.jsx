import { userBenefitContent } from '@/utils/constant/admin/OfferConstant'
import { userBenefitStyle } from '@/utils/styles/OfferStyle'
import BenefitHeader from './userBenefitUI/BenefitHeader';
import BenefitCarousel from './userBenefitUI/BenefitCarousel';
import DeliveryPersonBenefit from './userBenefitUI/DeliveryPersonBenefit';
import useUserBenefit from '@/hooks/useUserBenefit';

function UserBenefitSection() {
  const content = userBenefitContent;
  const styles = userBenefitStyle;
  const { currentIndex, prevSlide, nextSlide } = useUserBenefit({content})

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
            <DeliveryPersonBenefit content={content.deliveryPerson} styles={styles.benefitCarousel.deliveryCard} />
        </div>
    </section>
  )
}

export default UserBenefitSection