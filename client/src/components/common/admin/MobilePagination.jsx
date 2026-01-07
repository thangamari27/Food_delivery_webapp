import React from 'react'

function MobilePagination({ pagination, handlePageChange, handleRowsPerPageChange, styles }) {
  const { 
    currentPage, 
    totalPages, 
    rowsPerPage, 
    totalOrders, 
    startIndex, 
    endIndex,
    content 
  } = pagination;

  return (
    <div className={`mt-4 ${styles.mobilePagination}`}>
      <div className={styles.paginationDropDown}>
        <div className={styles.paginationDropDownText}>
          <span className={styles.paginationText}>
            {content.pagination.rowsPerPageLabel}
          </span>
          <select 
            value={rowsPerPage} 
            onChange={handleRowsPerPageChange}
            className={styles.paginationSelect}
          >
            {content.pagination.rowsPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <span className={styles.paginationCount}>
          {startIndex}-{endIndex} {content.pagination.ofLabel} {totalOrders}
        </span>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-3 py-1.5 text-sm rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Previous
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 3) {
              pageNum = i + 1;
            } else if (currentPage <= 2) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 1) {
              pageNum = totalPages - 2 + i;
            } else {
              pageNum = currentPage - 1 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center text-sm rounded-lg ${
                  currentPage === pageNum 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          {totalPages > 3 && currentPage < totalPages - 1 && totalPages > 3 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded-lg ${
                currentPage === totalPages 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {totalPages}
            </button>
          )}
        </div>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 text-sm rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Next
        </button>
      </div>
      
      <div className="flex justify-center mt-3">
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  )
}

export default MobilePagination