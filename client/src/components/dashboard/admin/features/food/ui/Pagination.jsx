import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  totalItems, 
  onPageChange, 
  onItemsPerPageChange, 
  content, 
  styles 
}) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))} 
          className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-600">
        Showing {start}-{end} of {totalItems}
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-orange-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Mobile page indicator */}
        <div className="sm:hidden px-3 py-1 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next button */}
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;