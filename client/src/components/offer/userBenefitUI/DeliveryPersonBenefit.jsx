import BenefitItem from "./BenefitItem"
import DeliveryPersonImage from "./DeliveryPersonImage"

function DeliveryPersonBenefit({ content, styles }) {
  return (
    <div className={styles.container}>     
      {/* Outer Container with Green Gradient Background */}
      <div className={styles.wrapper}>
        <div className={styles.leftImageContainer.container}>
          
          {/* 1. Left Section: Delivery Person Image */}
          <DeliveryPersonImage content={content} styles={styles.leftImageContainer} />
          
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