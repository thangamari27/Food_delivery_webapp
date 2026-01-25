import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ content, currentPage, totalPages, onPageChange, itemsPerPage, totalItems, styles }) {
   const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };
  
  return (
    <div className={styles.layout.pagination_container}>
      <div className={styles.layout.pagination_text}>
        {content.pagination_text.showing}{' '}
        <span className="font-medium">{startItem}</span>{' '}
        {content.pagination_text.to}{' '}
        <span className="font-medium">{endItem}</span>{' '}
        {content.pagination_text.of}{' '}
        <span className="font-medium">{totalItems}</span>{' '}
        {content.pagination_text.results}
      </div>
      
      <div className={styles.layout.pagination_controls}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? 
            styles.buttons.pagination_disabled : 
            styles.buttons.pagination_default}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? 
                styles.buttons.pagination_active : 
                styles.buttons.pagination_inactive}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? 
            styles.buttons.pagination_disabled : 
            styles.buttons.pagination_default}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Pagination