import { IndianRupee } from "lucide-react"
import PlanActions from "./PlanActions"

function SubscriptionPlanTable({ content, plans, onView, onEdit, onToggleStatus, onDelete, styles }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No subscription plans found for this billing period</p>
      </div>
    );
  }

  return (
    <div className={`hidden xl:block ${styles.table.container}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className={styles.table.header}>Plan Name</th>
              <th scope="col" className={styles.table.header}>Price (₹)</th>
              <th scope="col" className={styles.table.header}>Savings (%)</th>
              <th scope="col" className={styles.table.header}>Features</th>
              <th scope="col" className={styles.table.header}>Status</th>
              <th scope="col" className={styles.table.header}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id} className={styles.table.row}>
                <td className={styles.table.cell}>
                  <div className={styles.layout.flex.row}>
                    <span className="font-semibold">{plan.name}</span>
                    {plan.popular && (
                      <span className={styles.badge.popular}>
                        {plan.badge_text || 'Most Popular'}
                      </span>
                    )}
                  </div>
                </td>
                <td className={styles.table.cell}>
                  <div className={styles.utility.currency_symbol}>
                    <IndianRupee className={`${styles.icon.small} ${styles.icon.info}`} />
                    <span className={styles.typography.price_small}>
                      {plan.price}
                    </span>
                  </div>
                </td>
                <td className={styles.table.cell}>
                  {plan.savings ? (
                    <span className={styles.badge.savings}>
                      {plan.savings}% off
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className={styles.table.cell}>
                  <span className={styles.typography.body}>
                    {plan.features.length} features
                  </span>
                </td>
                <td className={styles.table.cell}>
                  <span className={styles.badge.status[plan.status]}>
                    {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                  </span>
                </td>
                <td className={styles.table.cell}>
                  <PlanActions
                    content={content}
                    plan={plan}
                    onView={onView}
                    onEdit={onEdit}
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                    styles={styles}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubscriptionPlanTable