import { Search, X, Filter } from "lucide-react";

function ActionBar({ content, searchQuery, showFilterPanel, setSearchQuery, setShowFilterPanel, filters, setFilters, children, placeholder='Search....',styles }) {
  return (
    <div className={styles.actionBar}>
        <div className={styles.actionBarInner}>
        <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            />
            {searchQuery && (
            <X 
                onClick={() => setSearchQuery('')} 
                className={styles.clearSearchIcon} 
            />
            )}
        </div>
        <div className={styles.actionButtons}>
            <button 
            onClick={() => setShowFilterPanel(!showFilterPanel)} 
            className={styles.buttonSecondary}
            >
            <Filter className={styles.buttonIcon} />
            Filter
            </button>
        </div>
        </div>

        {showFilterPanel && (
          <div className={styles.filterPanel}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Filters</h3>
              <button 
                onClick={() => setFilters({ orderStatus: 'all', paymentStatus: 'all', dateRange: 'all' })} 
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Reset
              </button>
            </div>
            <div className={styles.filterGrid}>
              {Object.entries(content.filterOptions).map(([key, option]) => (
                <div key={key} className={styles.filterGroup}>
                  <label className={styles.formLabel}>{option.label}</label>
                  <select 
                    value={filters[key] || 'all'}
                    onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                    className={styles.formSelect}
                  >
                    {option.options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default ActionBar