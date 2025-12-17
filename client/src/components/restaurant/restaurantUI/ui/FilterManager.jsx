import Filter from './Filter'
import MobileFilterModal from './MobileFilterModal'

function FilterManager({ 
  selectedFilters, 
  tempFilters, 
  appliedFilters, 
  showMobileFilter,
  setShowMobileFilter,
  toggleFilter,
  toggleTempFilter,
  setTempFilters,
  applyMobileFilters,
  clearAllFilters,
  content,
  styles,
  searchQuery,
  setSearchQuery,
  resetToFirstPage
}) {
  const applyFilters = () => {
    applyMobileFilters();
    setShowMobileFilter(false);
  };

  const handleClearAllFilters = () => {
    clearAllFilters();
    resetToFirstPage();
  };

  return (
    <>
      {/* Header filter section */}
      <Filter 
        content={content.filterOptions}
        setSearchQuery={setSearchQuery}
        setShowMobileFilter={setShowMobileFilter}
        styles={styles}
      />

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        showMobileFilter={showMobileFilter}
        setShowMobileFilter={setShowMobileFilter}
        tempFilters={tempFilters}
        toggleTempFilter={toggleTempFilter}
        setTempFilters={setTempFilters}
        clearAllFilters={handleClearAllFilters}
        content={content}
        styles={styles}
        applyFilters={applyFilters}
      />
    </>
  )
}

export default FilterManager