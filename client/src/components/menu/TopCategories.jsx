import React from 'react'
import { topCategoryContent } from '../../utils/constant/admin/MenuConstant'
import { topCategoryStyles } from '../../utils/styles/MenuStyle'

import Title from '../common/Title'
import CategoryFilter from '../common/topCategory/CategoryFilter'
import Pagination from '../common/topCategory/Pagination'
import TopMenuItem from '../common/topCategory/TopMenuItem'
import NotFound from '../common/topCategory/NotFound'
import { useTopCategories } from '../../hooks/useTopCategories'
function TopCategories() {
  const content = topCategoryContent;
  const styles = topCategoryStyles;

  const { categoryFilter, currentPage, paginatedItems, totalPages, handleFilterChange, handlePageChange } = useTopCategories(content.menuItems, content.pagination.itemsPerPage);

  return (
    <section className={styles.section}>
        <div className={styles.container}>
            {/* Top menu Header */}
            <div className={styles.header.container}>
                <Title title={content.header.title} titleStyle={styles.header.title} />
            </div>

            {/* Menu Category Filter option */}
            <CategoryFilter 
                categories={content.categoryBar}
                activeFilter={categoryFilter}
                onFilterChange={handleFilterChange}
                styles={styles.scrollContainer}
            />

            {/* Menu Items card */}
            {paginatedItems.length > 0 ? (
              <>
                <div className={styles.topCategoryCard.container}>
                    {paginatedItems.map((item) => (
                        <TopMenuItem
                        key={item.id}
                        items={item}
                        styles={styles.topCategoryCard}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                styles={styles.pagination}
                />
                </>
                ) : (
                <NotFound 
                    content={content.notFound} 
                    styles={styles.notFound}
                />
            )}

        </div>
    </section>
  )
}

export default TopCategories