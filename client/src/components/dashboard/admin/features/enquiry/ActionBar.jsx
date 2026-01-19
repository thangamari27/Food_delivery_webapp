import { Search, X, Plus } from 'lucide-react';

function ActionBar({ content, search_query, on_search_change, on_create_click, styles }) {
  return (
    <div className={styles.action_bar}>
      <div className={styles.action_bar_inner}>
        <div className={styles.search_wrapper}>
          <Search className={styles.search_icon} />
          <input
            type="text"
            value={search_query}
            onChange={(e) => on_search_change(e.target.value)}
            placeholder={content.search.placeholder}
            className={styles.search_input}
          />
          {search_query && (
            <X 
              className={styles.clear_search_icon} 
              onClick={() => on_search_change('')} 
            />
          )}
        </div>
        <div className={styles.action_buttons}>
          <button 
            onClick={on_create_click} 
            className={styles.button_primary}
          >
            <Plus className={styles.button_icon} />
            {content.header.add_button_text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActionBar