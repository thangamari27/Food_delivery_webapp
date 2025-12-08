import BenefitItem from "./BenefitItem"
import Image from '@/components/common/Image'

function DeliveryPersonBenefit({ content, styles }) {
  return (
    <div className={styles.container}>     
      {/* Outer Container with Green Gradient Background */}
      <div className={styles.wrapper}>
        <div className={styles.leftImageContainer.container}>
          
          {/* 1. Left Section: Delivery Person Image */}
          <div className={styles.leftImageContainer.imageContainer}>
            <div className={styles.leftImageContainer.imageWrapper}>
              {/* Subtle blurred background glow */}
              <div className={styles.leftImageContainer.imageShadow}></div>
              
              {/* Responsive Image with different sizes per device */}
              <div className="block lg:hidden"> {/* Mobile & Tablet */}
                <Image 
                  src={content.src}
                  srcFallback={content.srcFallback}
                  alt={content.alt}
                  pictureStyle={styles.leftImageContainer.picture}
                  imageStyle={`${styles.leftImageContainer.image} w-full`} // Force full width
                />
              </div>
              
              <div className="hidden lg:block"> {/* Desktop */}
                <Image 
                  src={content.src}
                  srcFallback={content.srcFallback}
                  alt={content.alt}
                  pictureStyle={styles.leftImageContainer.picture}
                  imageStyle={styles.leftImageContainer.image}
                />
              </div>
            </div>
          </div>
          
          {/* 2. Right Section: Benefit List (Grid) */}
          <div className={styles.benefitItem.outerContainer}>
            {content.benefits.map((benefit, index) => (
              <BenefitItem key={index} {...benefit} styles={styles.benefitItem} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default DeliveryPersonBenefit