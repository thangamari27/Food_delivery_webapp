import { X } from "lucide-react";
import FilterContent from "./FilterContent";

function MobileFilterModal({ 
  showMobileFilter, 
  setShowMobileFilter, 
  tempFilters, 
  toggleTempFilter, 
  setTempFilters, 
  clearAllFilters, 
  content, 
  styles, 
  applyFilters 
}) {
  if (!showMobileFilter) return null;

  const FilterContentWrapper = () => (
    <FilterContent
      isMobile={true}
      filters={tempFilters}
      toggleFn={toggleTempFilter}
      setFilters={setTempFilters}
      clearAllFilters={clearAllFilters}
      content={content}
      styles={styles}
    />
  );

  return (
    <div className={styles.mobileFilter} onClick={() => setShowMobileFilter(false)}>
      <div className={styles.mobileFilterContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.mobileFilterHeader}>
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={() => setShowMobileFilter(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className={styles.mobileFilterBody}>
          <FilterContentWrapper />
        </div>

        <div className={styles.applyButton}>
          <button 
            className={styles.button}
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterModal;