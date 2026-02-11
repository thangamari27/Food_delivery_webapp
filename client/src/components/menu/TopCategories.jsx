import { topCategoryContent } from '@/utils/constant/admin/MenuConstant'
import { topCategoryStyles } from '@/utils/styles/MenuStyle'
import TopCategoriesContainer from './topMenuUI/TopCategoriesContainer'
import TopCategoriesContent from './topMenuUI/TopCategoriesContent'
import { useTopCategories } from '@/hooks/useTopCategories'

function TopCategories() {
  const content = topCategoryContent;
  const styles = topCategoryStyles;

  const {
      categoryFilter,
      currentPage,
      paginatedItems,
      totalPages,
      isLiked,              
      handleLikeToggle,
      handleFilterChange,
      handlePageChange,
      hasItems,
      filteredItemsCount,
      loading
  } = useTopCategories();

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
        isLiked={isLiked}             
        handleLikeToggle={handleLikeToggle}
        hasItems={hasItems}
        loading={loading}
      />
    </TopCategoriesContainer>
  )
}

export default TopCategories