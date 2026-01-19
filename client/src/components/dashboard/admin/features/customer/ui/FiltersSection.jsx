import { Filter, Search } from "lucide-react";

function FiltersSection({ content, filters, styles }) {
  const { search, setSearch, statusFilter, setStatusFilter, sortBy, setSortBy, showFilters, setShowFilters, activeFilterCount, resetFilters } = filters;

  return (
    <div className={styles.filters.container}>
      <div className={styles.filters.searchRow}>
        <div className={styles.filters.searchWrapper}>
          <Search className={styles.filters.searchIcon} aria-hidden="true" />
          <input
            type="text"
            placeholder={content.filters.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.filters.search}
            aria-label="Search customers"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)} 
          className={styles.filters.filterButton}
          aria-expanded={showFilters}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">{content.filters.filterButton}</span>
          <span className="sr-only">Toggle filters</span>
          {activeFilterCount > 0 && (
            <span className={styles.filters.filterBadge} aria-label={`${activeFilterCount} active filters`}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className={styles.filters.panel} role="region" aria-label="Filter options">
          <div>
            <label className={styles.filters.label} htmlFor="status-filter">
              {content.filters.statusLabel}
            </label>
            <select 
              id="status-filter"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className={styles.filters.select}
              aria-label="Filter by status"
            >
              {content.filters.statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.filters.label} htmlFor="sort-filter">
              {content.filters.sortLabel}
            </label>
            <select 
              id="sort-filter"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className={styles.filters.select}
              aria-label="Sort by"
            >
              {content.filters.sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={resetFilters} className={styles.button.secondary + ' w-full'}>
              {content.filters.resetButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersSection