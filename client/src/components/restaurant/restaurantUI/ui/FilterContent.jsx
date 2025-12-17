import { SlidersHorizontal, Leaf, IndianRupee } from "lucide-react";
import FilterSection from "./FilterSection";
import FilterCheckbox from "./FilterCheckbox";

function FilterContent({ 
  isMobile = false, 
  filters, 
  toggleFn, 
  setFilters, 
  clearAllFilters, 
  content, 
  styles,
  applyDesktopFilters 
}) {
  return (
    <>
      {/* Clear All Filters */}
      {(filters.cuisines.length > 0 || 
        filters.dietary.length > 0 || 
        filters.priceRange.length > 0 || 
        filters.features.length > 0) && (
        <div className="mb-4 pb-4 border-b border-gray-200 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900">Active Filters</span>
          <button onClick={clearAllFilters} className={styles.clearFiltersButton}>
            Clear All
          </button>
        </div>
      )}

      {/* Sort By */}
      <FilterSection title="Sort By" icon={SlidersHorizontal} styles={styles}>
        {content.filterOptions.sortBy.map((option) => (
          <FilterCheckbox
            key={option.value}
            id={`sort-${option.value}-${isMobile ? 'mobile' : 'desktop'}`}
            value={option.value}
            type="radio"
            name={isMobile ? "sortByMobile" : "sortBy"}
            checked={filters.sortBy === option.value}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            styles={styles}
          >
            {option.label}
          </FilterCheckbox>
        ))}
      </FilterSection>

      {/* Dietary Preferences */}
      <FilterSection title="Dietary Preferences" icon={Leaf} styles={styles}>
        {content.filterOptions.dietaryPreferences.map((option) => {
          const Icon = option.icon;
          return (
            <FilterCheckbox
              key={option.value}
              id={`dietary-${option.value}-${isMobile ? 'mobile' : 'desktop'}`}
              value={option.value}
              checked={filters.dietary.includes(option.value)}
              onChange={() => toggleFn('dietary', option.value)}
              styles={styles}
            >
              <Icon className="w-4 h-4" />
              {option.label}
            </FilterCheckbox>
          );
        })}
      </FilterSection>

      {/* Cuisines */}
      <FilterSection title="Cuisines" styles={styles}>
        {content.filterOptions.cuisines.map((cuisine) => (
          <FilterCheckbox
            key={cuisine}
            id={`cuisine-${cuisine}-${isMobile ? 'mobile' : 'desktop'}`}
            value={cuisine}
            checked={filters.cuisines.includes(cuisine)}
            onChange={() => toggleFn('cuisines', cuisine)}
            styles={styles}
          >
            {cuisine}
          </FilterCheckbox>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" icon={IndianRupee} styles={styles}>
        {content.filterOptions.priceRange.map((range) => (
          <FilterCheckbox
            key={range.value}
            id={`price-${range.value}-${isMobile ? 'mobile' : 'desktop'}`}
            value={range.value}
            checked={filters.priceRange.includes(range.value)}
            onChange={() => toggleFn('priceRange', range.value)}
            styles={styles}
          >
            {range.label}
          </FilterCheckbox>
        ))}
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features" styles={styles}>
        {content.filterOptions.features.map((feature) => (
          <FilterCheckbox
            key={feature}
            id={`feature-${feature}-${isMobile ? 'mobile' : 'desktop'}`}
            value={feature}
            checked={filters.features.includes(feature)}
            onChange={() => toggleFn('features', feature)}
            styles={styles}
          >
            {feature}
          </FilterCheckbox>
        ))}
      </FilterSection>

      {/* Apply Button for Desktop */}
      {!isMobile && applyDesktopFilters && (
        <button 
          className={styles.desktopApplyButton}
          onClick={applyDesktopFilters}
        >
          Apply Filters
        </button>
      )}
    </>
  );
}

export default FilterContent;