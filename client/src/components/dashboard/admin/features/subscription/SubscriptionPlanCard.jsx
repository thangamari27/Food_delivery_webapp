import { IndianRupee, Eye, Edit2 } from 'lucide-react';
import FeatureListPreview from './FeatureListPreview';

function SubscriptionPlanCard({ content, plan, onView, onEdit, onToggleStatus, onDelete, styles }) {
  return (
    <div className={styles.card.container}>
      <div className={styles.card.header}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className={styles.card.title}>{plan.name}</h3>
            {plan.popular && (
              <span className={styles.badge.popular}>
                {plan.badge_text || content.plan_form.placeholders.badge_text}
              </span>
            )}
          </div>
          <span className={styles.badge.status[plan.status]}>
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>
        </div>
      </div>

      <div className={styles.card.content}>
        <div className={styles.utility.price_container}>
          <div className={styles.utility.currency_symbol}>
            <IndianRupee className={styles.icon.large} />
            <span className={styles.typography.price}>
              {plan.price}
            </span>
          </div>
          {plan.savings && (
            <span className={styles.badge.savings}>
              {plan.savings}% off
            </span>
          )}
        </div>

        <div className={styles.card.divider}>
          <p className={styles.typography.body_small}>Plan Features:</p>
          <FeatureListPreview content={content} features={plan.features} maxVisible={3} styles={styles} />
        </div>

        <div className={styles.utility.action_buttons}>
          <button
            onClick={() => onView(plan)}
            className={styles.button.secondary}
            aria-label={`View ${plan.name} plan`}
          >
            <Eye className={styles.icon.small} />
            {content.plan_form.buttons.view}
          </button>
          <button
            onClick={() => onEdit(plan)}
            className={styles.button.primary}
            aria-label={`Edit ${plan.name} plan`}
          >
            <Edit2 className={styles.icon.small} />
            {content.plan_form.buttons.update_plan}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlanCard