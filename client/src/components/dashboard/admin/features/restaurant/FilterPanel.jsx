import React from 'react';
import { X } from 'lucide-react';

const FilterSelect = ({ label, value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
    aria-label={label}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

function FilterPanel({ filters, onFilterChange, content, cuisineOptions, showClearButton = true }) {
  const statusOptions = [
    { value: 'all', label: content.filters.allStatus },
    { value: 'Active', label: content.status.active },
    { value: 'Inactive', label: content.status.inactive },
    { value: 'Closed', label: content.status.closed }
  ];

  const cuisineSelectOptions = [
    { value: 'all', label: content.filters.allCuisines },
    ...cuisineOptions.map(c => ({ value: c, label: c }))
  ];

  const deliveryOptions = [
    { value: 'all', label: content.filters.deliveryStatus },
    { value: 'yes', label: content.filters.available },
    { value: 'no', label: content.filters.notAvailable }
  ];

  const priceOptions = [
    { value: 'all', label: content.filters.allPrices },
    { value: 'budget', label: content.filters.under300 },
    { value: 'moderate', label: content.filters.moderate },
    { value: 'premium', label: content.filters.premium }
  ];

  // Check if any filter is active
  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.cuisine !== 'all' || 
    filters.delivery !== 'all' || 
    filters.priceRange !== 'all';

  // Clear all filters function
  const clearAllFilters = () => {
    onFilterChange({
      status: 'all',
      cuisine: 'all',
      delivery: 'all',
      priceRange: 'all'
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 py-4 px-2 border border-gray-300 rounded-lg">
        <FilterSelect
          label="Status filter"
          value={filters.status}
          onChange={(value) => onFilterChange({ ...filters, status: value })}
          options={statusOptions}
        />
        
        <FilterSelect
          label="Cuisine filter"
          value={filters.cuisine}
          onChange={(value) => onFilterChange({ ...filters, cuisine: value })}
          options={cuisineSelectOptions}
        />
        
        <FilterSelect
          label="Delivery filter"
          value={filters.delivery}
          onChange={(value) => onFilterChange({ ...filters, delivery: value })}
          options={deliveryOptions}
        />
        
        <FilterSelect
          label="Price range filter"
          value={filters.priceRange}
          onChange={(value) => onFilterChange({ ...filters, priceRange: value })}
          options={priceOptions}
        />
      </div>
      {/* Clear Filters Button */}
      {showClearButton && hasActiveFilters && (
        <div className="flex justify-end items-center">
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-700 rounded-lg transition-colors"
            aria-label="Clear all filters"
          >
            <X size={16} />
            {content.buttons.clearFilters || 'Clear All Filters'}
          </button>
        </div>
      )}    
    </div>
  );
}

export default FilterPanel;