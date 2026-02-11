import FilterContent from './FilterContent';
import RestaurantGrid from './RestaurantGrid'
import NoRestaurantsFound from './NoRestaurantsFound';

function MainContent({ 
  content, 
  styles, 
  selectedFilters, 
  toggleFilter, 
  setSelectedFilters, 
  handleClearAllFilters,
  applyDesktopFilters,
  filteredRestaurants,
  paginatedRestaurants,
  currentPage,
  totalPages,
  handlePageChange,
  startIndex,
  endIndex,
  onViewMenu,
  onBookNow
}) {
  const hasRestaurants = filteredRestaurants.length > 0;
   
  return (
    <main className={styles.mainContent}>
      <div className={styles.layout}>
        {/* Desktop Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSticky}>
            <FilterContent
              isMobile={false}
              filters={selectedFilters}
              toggleFn={toggleFilter}
              setFilters={setSelectedFilters}
              clearAllFilters={handleClearAllFilters}
              content={content}
              styles={styles}
              applyDesktopFilters={applyDesktopFilters}
            />
          </div>
        </aside>

        {/* Restaurant Grid */}
        <div className={styles.restaurantGrid}>
          <p className={styles.restaurantCount}>
            Showing {filteredRestaurants?.length} of {content.restaurants?.length} restaurants
          </p>
          
          {hasRestaurants ? (
            <RestaurantGrid
              filteredRestaurants={filteredRestaurants}
              paginatedRestaurants={paginatedRestaurants}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              clearAllFilters={handleClearAllFilters}
              styles={styles}
              startIndex={startIndex}
              endIndex={endIndex}
              onViewMenu={onViewMenu}
              onBookNow={onBookNow}
            />
          ) : (
            <NoRestaurantsFound onClearFilters={handleClearAllFilters} />
          )}
        </div>
      </div>
    </main>
  )
}

export default MainContent