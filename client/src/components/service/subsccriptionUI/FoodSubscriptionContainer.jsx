import { useState } from "react"
import PricingPlanHeader from "./PricingPlanHeader"
import PeriodButton from "./PeriodButton"
import PlanCard from "./PlanCard"
import ComparisonTable from "./ComparisonTable"

function FoodSubscriptionContainer({ content, styles }) {
  const [activePeriod, setActivePeriod] = useState('Monthly')
  
  return (
    <div className={styles.container}>
        {/* Pricing plan header */}
        <PricingPlanHeader 
            heading={content.heading} 
            subheading={content.subheading} 
            styles={styles} 
        />

        {/* Period button section */}
        <PeriodButton 
            periods={content.periods}
            active={activePeriod}
            onChange={setActivePeriod}
            styles={styles}
        />

        {/* Pricing plan card */}
        <div className={styles.plansGrid}>
            {content.plans[activePeriod].map(plan => (
                <PlanCard 
                    key={plan.id}
                    plan={plan}
                    period={activePeriod}
                    icon={content.plans.icon}
                    buttonContent={content.buttonContent}
                    styles={styles}
                />
            ))}
        </div>

        <ComparisonTable data={content.comparison} styles={styles} />
    </div>
  )
}

export default FoodSubscriptionContainer