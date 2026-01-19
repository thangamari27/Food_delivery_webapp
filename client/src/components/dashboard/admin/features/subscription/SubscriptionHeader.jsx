import { useCallback } from 'react'
import { Plus, RefreshCw } from 'lucide-react'

function SubscriptionHeader({ content, onCreateNew, onRefresh, totalPlans, styles }) {
   const handleCreateClick = useCallback(() => {
    onCreateNew();
  }, [onCreateNew]);

  const handleRefreshClick = useCallback(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={styles.typography.heading_1}>
            {content.management.title}
          </h1>
          <p className={`${styles.typography.body} mt-2`}>
            {content.management.description}
            <span className="ml-2 text-sm font-semibold text-orange-600">
              ({totalPlans} {content.management.actions.total_plans})
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshClick}
            className={styles.button.secondary}
            aria-label={content.management.actions.refresh}
          >
            <RefreshCw className={styles.icon.small} />
            <span className="hidden sm:inline">
              {content.management.actions.refresh}
            </span>
          </button>
          <button
            onClick={handleCreateClick}
            className={styles.button.primary}
            aria-label={content.management.actions.create_plan}
          >
            <Plus className={styles.icon.small} />
            {content.management.actions.create_plan}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionHeader