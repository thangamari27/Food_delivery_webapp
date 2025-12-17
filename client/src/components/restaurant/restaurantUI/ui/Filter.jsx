import { Search, SlidersHorizontal } from "lucide-react"

function Filter({ content, setSearchQuery, setShowMobileFilter, styles }) {

  return (
    <header className={styles.header}>
        <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
                <div className={styles.searchInput}>
                    <Search className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder='Search for restaurant, cuisines or dishes...'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button
                    className={styles.filterButton}
                    onClick={() => setShowMobileFilter(true)}
                >
                    <SlidersHorizontal className={styles.filterIcon} />
                    {content.filterButton.text}
                </button>
            </div>
        </div>
    </header>
  )
}

export default Filter