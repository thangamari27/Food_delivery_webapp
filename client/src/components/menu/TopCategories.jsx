import { topCategoryContent } from '@/utils/constant/admin/MenuConstant'
import { topCategoryStyles } from '@/utils/styles/MenuStyle'
import TopCategoriesContainer from './topMenuUI/TopCategoriesContainer'
import TopCategoriesContent from './topMenuUI/TopCategoriesContent'
import { useTopCategories } from '@/hooks/useTopCategories'

function TopCategories() {
  const content = topCategoryContent;
  const styles = topCategoryStyles;

  // REMOVE the arguments - they're causing issues!
  const {
      categoryFilter,
      currentPage,
      paginatedItems,
      totalPages,
      likedItems,
      handleLikeToggle,
      handleFilterChange,
      handlePageChange,
      hasItems,
      filteredItemsCount,
      loading
  } = useTopCategories(); // No arguments!

  return (
    <TopCategoriesContainer styles={styles}>
      <TopCategoriesContent 
        content={content}
        styles={styles}
        categoryFilter={categoryFilter}
        currentPage={currentPage}
        paginatedItems={paginatedItems}
        totalPages={totalPages}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        likedItems={likedItems}
        handleLikeToggle={handleLikeToggle}
        hasItems={hasItems}
        loading={loading}
      />
    </TopCategoriesContainer>
  )
}

export default TopCategories