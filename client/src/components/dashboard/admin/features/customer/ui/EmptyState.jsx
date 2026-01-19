import { Users, Plus } from "lucide-react"

function EmptyState({ content, hasFilters, onAdd, onReset, styles }) {
  return (
    <div className={styles.empty.container}>
        <Users className={styles.empty.icon} />
        <h3 className={styles.empty.title}>
        {hasFilters ? content.empty.noResults : content.empty.title}
        </h3>
        <p className={styles.empty.description}>
        {hasFilters ? 'Try adjusting your search or filters' : content.empty.description}
        </p>
        {hasFilters ? (
        <button onClick={onReset} className={styles.button.primary}>
            {content.empty.resetButton}
        </button>
        ) : (
        <button onClick={onAdd} className={styles.button.primary}>
            <Plus className="w-5 h-5" />
            {content.empty.addButton}
        </button>
        )}
    </div>
  )
}

export default EmptyState