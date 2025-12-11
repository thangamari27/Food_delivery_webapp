import { Percent, Check } from "lucide-react"
import Title from "../../common/Title"
import IconComponent from '../../common/IconComponent'

function PlanCard({ plan, period, icon,buttonContent, styles}) {
  return (
    <div className={styles.planCard}>
        {plan.popular && ( 
            <div className={styles.popularBadge}>{plan.badgeText}</div>
        )}

        <Title title={plan.name} titleStyle={styles.planName} />

        <div className={styles.priceContainer}>
            <div className={styles.priceWrapper}>
                <span className={styles.price}>
                    {plan.price}
                    <IconComponent Icon={icon} className={styles.priceIcon} />
                </span>
                <span className={styles.period}>{plan.period}</span>
                {plan.savings && (
                    <div className={styles.savings}>
                        {plan.savings}
                        <Percent className={styles.icon} />
                    </div>
                )}
            </div>
            
            <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                    <li 
                    key={index}
                    className={styles.feature}
                    >
                        <Check className={styles.checkIcon} />
                        <span className={styles.featureText}>{feature}</span>
                    </li>
                ))}
            </ul>
            
            <button 
                className={`${styles.btn}
                ${plan.popular ? styles.btnPrimary : styles.btnSecondary}
                `}
            >
                {buttonContent.text}
            </button>

        </div>
    </div>
  )
}

export default PlanCard