import React from 'react'
import Pagination from '@/components/common/foodMenu/Pagination'

function SpecialMenuPagination({ currentPage, totalPages, onPageChange, styles }) {
  return (
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      styles={styles}
    />
  )
}

export default SpecialMenuPagination