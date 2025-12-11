import { pricingContent } from '@/utils/constant/admin/ServiceConstant'
import { pricingStyles } from '@/utils/styles/ServiceStyle'
import FoodSubscriptionContainer from './subsccriptionUI/FoodSubscriptionContainer';

function FoodSubscriptionPlanSection() {
  const content = pricingContent;
  const styles = pricingStyles;

  return (
    <section className={styles.section}>
        {/* Food pricing plan main container */}
        <FoodSubscriptionContainer 
          content={content}
          styles={styles}
        />
    </section>  
  )
}

export default FoodSubscriptionPlanSection