import { Search } from 'lucide-react';

function EmptyState({ content, on_clear_filters, styles }) {
  return (
    <div className={styles.empty_state}>
      <Search className={styles.empty_state_icon} />
      <h3 className={styles.empty_state_title}>
        {content.empty_state.title}
      </h3>
      <p className={styles.empty_state_message}>
        {content.empty_state.message}
      </p>
      <button 
        onClick={on_clear_filters} 
        className={`${styles.button_primary} mt-4`}
      >
        Clear all filters
      </button>
    </div>
  )
}

export default EmptyState