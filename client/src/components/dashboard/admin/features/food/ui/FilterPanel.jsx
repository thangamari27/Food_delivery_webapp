import { Search, Filter } from 'lucide-react';
import FilterCheckbox from './FilterCheckbox';
import Select from './Select';

function FilterPanel({
  content,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  hasFilters,
  resetFilters,
  selectedCategory,
  setSelectedCategory,
  selectedCuisine,
  setSelectedCuisine,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  selectedRestaurant,
  setSelectedRestaurant,
  styles
}) {
  return (
    <div className={styles.filterPanel.container}>
        <div className={styles.filterPanel.row}>
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
            type="text" 
            placeholder={content.filters.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputs.search}
            />
        </div>
        <div className="flex flex-1 flex-wrap lg:flex-nowrap items-center gap-3 justify-start lg:justify-end">
            <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className={`${styles.inputs.base} py-2`}
            >
            {content.filters.sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </select>
            <button 
            onClick={() => setShowFilters(!showFilters)} 
            className={styles.buttons.secondary}
            >
            <Filter size={20} />Filters
            {hasFilters && (
                <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedCategory.length + selectedCuisine.length + (selectedType ? 1 : 0) + (selectedStatus ? 1 : 0) + (selectedRestaurant ? 1 : 0)}
                </span>
            )}
            </button>
            {hasFilters && (
            <button onClick={resetFilters} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Reset
            </button>
            )}
        </div>
        </div>

        {showFilters && (
        <div className={styles.filterPanel.expanded}>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="space-y-2">
                {content.categories.map(cat => (
                <FilterCheckbox 
                    key={cat} 
                    label={cat} 
                    checked={selectedCategory.includes(cat)} 
                    onChange={() => setSelectedCategory(prev => 
                    prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                    )} 
                    styles={styles}
                />
                ))}
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
            <div className="space-y-2">
                {content.cuisines.map(cui => (
                <FilterCheckbox 
                    key={cui} 
                    label={cui} 
                    checked={selectedCuisine.includes(cui)} 
                    onChange={() => setSelectedCuisine(prev => 
                    prev.includes(cui) ? prev.filter(c => c !== cui) : [...prev, cui]
                    )} 
                    styles={styles}
                />
                ))}
            </div>
            </div>
            <div className="space-y-4">
            <Select 
                label="Type" 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                styles={styles}
            >
                <option value="">All Types</option>
                {content.foodTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </Select>
            <Select 
                label="Status" 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                styles={styles}
            >
                <option value="">All Status</option>
                {content.statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
                ))}
            </Select>
            </div>
            <div>
            <Select 
                label="Restaurant" 
                value={selectedRestaurant} 
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                styles={styles}
            >
                <option value="">All Restaurants</option>
                {content.restaurants.map(rest => (
                <option key={rest.id} value={rest.name}>{rest.name}</option>
                ))}
            </Select>
            </div>
        </div>
        )}
    </div>
  )
}

export default FilterPanel