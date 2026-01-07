import { Package } from "lucide-react"

function EmptyState({ title, message, styles }) {
  return (
    <div className={styles.emptyState}>
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className={styles.emptyStateTitle}>{title}</h3>
        <p className={styles.emptyStateMessage}>{message}</p>
    </div>
  )
}

export default EmptyState