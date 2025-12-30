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
      likedItems,
      handleLikeToggle,
      handleFilterChange,
      handlePageChange
  } = useTopCategories(content.menuItems, content.pagination.itemsPerPage);

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
      />
    </TopCategoriesContainer>
  )
}

export default TopCategories