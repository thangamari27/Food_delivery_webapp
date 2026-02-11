import { specialMenuStyle } from "@/utils/styles/MenuStyle"
import { specialMenuContent } from '@/utils/constant/admin/MenuConstant'
import Title from '@/components/common/Title'
import FilterBar from "./specialMenuUI/FilterBar"
import SpecialMenuGrid from "./specialMenuUI/SpecialMenuGrid"
import SpecialMenuPagination from "./specialMenuUI/SpecialMenuPagination"
import useSpecialMenu from "@/hooks/useSpecialMenu"

function SpecialMenuSection() {
  const styles = specialMenuStyle;
  const content = specialMenuContent;

  // Destructure isLiked instead of likedItems
  const { 
    activeCuisine, 
    setActiveCuisine, 
    specialMenuPage, 
    totalPages, 
    paginatedSpecialDishes, 
    handlePageChange, 
    isLiked,  
    handleLikeToggle 
  } = useSpecialMenu();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Title title={content.header.title} titleStyle={styles.header.title} />
        {/* special menu filter bar */}
        <FilterBar 
          content={content}
          styles={styles}
          activeCuisine={activeCuisine}
          setActiveCuisine={setActiveCuisine}
        />
        {/* Special menu Card */}
        <SpecialMenuGrid
          paginatedSpecialDishes={paginatedSpecialDishes}
          content={content}
          styles={styles}
          isLiked={isLiked} 
          handleLikeToggle={handleLikeToggle}
          activeCuisine={activeCuisine}
        />
        {/* special menu pagination container */}
        <SpecialMenuPagination
          currentPage={specialMenuPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          styles={styles.pagination}
        />
      </div>
    </section>
  )
}

export default SpecialMenuSection