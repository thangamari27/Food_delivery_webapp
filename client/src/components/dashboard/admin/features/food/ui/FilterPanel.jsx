/**
 * FilterPanel - Fixed version with proper state management
 * Handles search, filters, and sorting for food items
 */
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import Select from './Select';

function FilterPanel({
  content,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  localFilters,
  setLocalFilters,
  hasActiveFilters,
  resetAllFilters,
  categories,
  cuisines,
  restaurants,
  styles,
  loading
}) {
  // Local state for show/hide filters panel
  const [showFilters, setShowFilters] = React.useState(false);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Count active filters
  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (localFilters.category !== 'all') count++;
    if (localFilters.cuisine !== 'all') count++;
    if (localFilters.type !== 'all') count++;
    if (localFilters.status !== 'all') count++;
    if (localFilters.restaurant !== 'all') count++;
    return count;
  }, [localFilters]);

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={content.filters?.searchPlaceholder || "Search food items..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed min-w-[180px]"
          >
            {content.filters?.sortOptions?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            )) || (
              <>
                <option value="">Sort By</option>
                <option value="recent">Recently Added</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </>
            )}
          </select>

          {/* Filter Toggle Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <Filter size={20} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button 
              onClick={resetAllFilters}
              disabled={loading}
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="all">All Categories</option>
                {categories?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Cuisine Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine
              </label>
              <select
                value={localFilters.cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="all">All Cuisines</option>
                {cuisines?.map(cui => (
                  <option key={cui} value={cui}>{cui}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={localFilters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="all">All Types</option>
                {content.foodTypes?.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                )) || (
                  <>
                    <option value="Special Menu">Special Menu</option>
                    <option value="Regular Menu">Regular Menu</option>
                    <option value="Seasonal Item">Seasonal</option>
                    <option value="Limited Edition">Limited Edition</option>
                  </>
                )}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={localFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="all">All Status</option>
                {content.statuses?.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                )) || (
                  <>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </>
                )}
              </select>
            </div>

            {/* Restaurant Filter */}
            {restaurants && restaurants.length > 0 && (
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant
                </label>
                <select
                  value={localFilters.restaurant}
                  onChange={(e) => handleFilterChange('restaurant', e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="all">All Restaurants</option>
                  {restaurants.map(rest => (
                    <option key={rest._id || rest.id} value={rest._id || rest.id}>
                      {rest.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;