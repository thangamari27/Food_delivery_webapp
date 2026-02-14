import RestaurantPagination from "./RestaurantPagination";
import RestaurantCard from './RestaurantCard'

function RestaurantGrid({ 
  filteredRestaurants, 
  paginatedRestaurants, 
  currentPage, 
  totalPages, 
  handlePageChange, 
  clearAllFilters, 
  styles,
  startIndex,
  endIndex,
  onViewMenu,
  onBookNow,
  isAuthenticated
}) {
  if (filteredRestaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No restaurants found matching your filters
        </p>
        <button
          onClick={clearAllFilters}
          className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <>
      <p className={styles.paginationInfo}>
        Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, filteredRestaurants.length)} of {filteredRestaurants.length} results
      </p>
      
      <div className={styles.grid}>
        {paginatedRestaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            styles={styles}
            onViewMenu={onViewMenu}
            onBookNow={onBookNow}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <RestaurantPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          styles={styles}
        />
      )}
    </>
  );
}

export default RestaurantGrid;