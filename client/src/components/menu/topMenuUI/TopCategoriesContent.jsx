import TopCategoriesHeader from './TopCategoriesHeader';
import CategoryFilter from '@/components/common/topCategory/CategoryFilter';
import MenuItemsGrid from './MenuItemsGrid';
import Pagination from '@/components/common/topCategory/Pagination';
import NotFound from '@/components/common/topCategory/NotFound';
// import LoadingSpinner from '@/components/common/LoadingSpinner'; // Add if you have one

function TopCategoriesContent({
  content,
  styles,
  categoryFilter,
  currentPage,
  paginatedItems,
  totalPages,
  handleFilterChange,
  handlePageChange,
  likedItems, 
  handleLikeToggle,
  hasItems,
  loading
}) {
  // Show loading state
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[400px]">
  //       <LoadingSpinner />
  //       <span className="ml-2">Loading menu items...</span>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* Header */}
      <TopCategoriesHeader 
        content={content} 
        styles={styles} 
      />
      {/* Category Filter */}
      <CategoryFilter 
        categories={content.categoryBar}
        activeFilter={categoryFilter}
        onFilterChange={handleFilterChange}
        styles={styles.scrollContainer}
      />

      {/* Content */}
      {hasItems ? (
        <>
          <MenuItemsGrid 
            items={paginatedItems}
            buttonContent={content.button}
            styles={styles}
            likedItems={likedItems}
            handleLikeToggle={handleLikeToggle}
          />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              styles={styles.pagination}
            />
          )}
        </>
      ) : (
        <NotFound 
          content={content.notFound} 
          styles={styles.notFound}
          filter={categoryFilter}
        />
      )}
    </>
  )
}

export default TopCategoriesContent