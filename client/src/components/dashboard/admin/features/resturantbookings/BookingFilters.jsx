import { useState, useCallback } from "react";
import { Search, Filter, X } from "lucide-react";

function BookingFilters({ content, filters, onFilterChange, onClearFilters, styles }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = useCallback((e) => {
    onFilterChange({ search: e.target.value });
  }, [onFilterChange]);

  const handleStatusChange = useCallback((e) => {
    onFilterChange({ status: e.target.value || null });
  }, [onFilterChange]);

  const handleDateFromChange = useCallback((e) => {
    onFilterChange({ dateFrom: e.target.value });
  }, [onFilterChange]);

  const handleDateToChange = useCallback((e) => {
    onFilterChange({ dateTo: e.target.value });
  }, [onFilterChange]);

  const handleGuestsChange = useCallback((e) => {
    onFilterChange({ minGuests: e.target.value ? parseInt(e.target.value) : null });
  }, [onFilterChange]);

  const handleCanCancelChange = useCallback((e) => {
    onFilterChange({ canCancel: e.target.value === '' ? null : e.target.value === 'true' });
  }, [onFilterChange]);
  return (
    <div className={styles.layout.filters_container}>
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder={content.filters.search_placeholder}
            value={filters.search}
            onChange={handleSearchChange}
            className={styles.inputs.search}
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            className={styles.inputs.select}
          >
            {content.filters.status_options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`${styles.buttons.secondary} ${showAdvanced ? 'bg-orange-50 text-orange-700' : ''} text-sm`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{content.filters.filter_button}</span>
          </button>

          {(filters.search || filters.status || filters.dateFrom || filters.dateTo || filters.minGuests !== null || filters.canCancel !== null) && (
            <button onClick={onClearFilters} className={styles.buttons.ghost}>
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">{content.filters.clear_button}</span>
            </button>
          )}
        </div>
      </div>

      {showAdvanced && (
        <div className={styles.borders.filter_divider + ' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}>
          <div>
            <label className={styles.text.label.regular}>
              {content.filters.date_from_label}
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={handleDateFromChange}
              className={styles.inputs.base}
            />
          </div>
          <div>
            <label className={styles.text.label.regular}>
              {content.filters.date_to_label}
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={handleDateToChange}
              className={styles.inputs.base}
            />
          </div>
          <div>
            <label className={styles.text.label.regular}>
              {content.filters.min_guests_label}
            </label>
            <input
              type="number"
              min="1"
              value={filters.minGuests || ''}
              onChange={handleGuestsChange}
              placeholder={content.filters.min_guests_placeholder}
              className={styles.inputs.base}
            />
          </div>
          <div>
            <label className={styles.text.label.regular}>
              {content.filters.can_cancel_label}
            </label>
            <select
              value={filters.canCancel === null ? '' : filters.canCancel.toString()}
              onChange={handleCanCancelChange}
              className={styles.inputs.base}
            >
              {content.filters.can_cancel_options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingFilters