import { AlertCircle } from 'lucide-react';

function EmptyState({ content, onReset, hasFilters, styles }) {
  return (
    <div className={styles.emptyState.container}>
        <AlertCircle size={48} className={styles.emptyState.icon} />
        <p className={styles.emptyState.message}>{content.emptyState.message}</p>
        {hasFilters && (
        <button onClick={onReset} className={styles.emptyState.button}>
            {content.emptyState.buttonText}
        </button>
        )}
    </div>
  )
}

export default EmptyState