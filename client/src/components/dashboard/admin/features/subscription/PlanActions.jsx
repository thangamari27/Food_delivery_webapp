import { useCallback } from 'react'
import { Eye, Edit2, Trash2, Power } from 'lucide-react';

function PlanActions({ content, plan, onView, onEdit, onToggleStatus, onDelete, styles }) {
  const handleView = useCallback(() => {
    onView(plan);
  }, [plan, onView]);

  const handleEdit = useCallback(() => {
    onEdit(plan);
  }, [plan, onEdit]);

  const handleToggle = useCallback(() => {
    onToggleStatus(plan);
  }, [plan, onToggleStatus]);

  const handleDelete = useCallback(() => {
    onDelete(plan);
  }, [plan, onDelete]);

  return (
    <div className={styles.layout.flex.row}>
      <button
        onClick={handleView}
        className={styles.button.ghost}
        title="View plan details"
        aria-label={`View ${plan.name} plan`}
      >
        <Eye className={styles.icon.small} />
      </button>
      <button
        onClick={handleEdit}
        className={styles.button.ghost}
        title="Edit plan"
        aria-label={`Edit ${plan.name} plan`}
      >
        <Edit2 className={styles.icon.small} />
      </button>
      <button
        onClick={handleToggle}
        className={styles.button.ghost}
        title={`${plan.name} plan`}
        aria-label={`${plan.name} plan`}
      >
        <Power className={`${styles.icon.small} ${
          plan.status === 'active' 
            ? styles.icon.success 
            : styles.icon.danger
        }`} />
      </button>
      <button
        onClick={handleDelete}
        className={`${styles.button.ghost} text-red-600 hover:bg-red-50`}
        title="Delete plan"
        aria-label={`Delete ${plan.name} plan`}
      >
        <Trash2 className={styles.icon.small} />
      </button>
    </div>
  )
}

export default PlanActions