import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange, styles }) {
   if (totalPages <= 1) return null;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.button.base} ${
          currentPage === 1 
            ? 'opacity-50 cursor-not-allowed' 
            : styles.button.inactive
        }`}
      >
        <ChevronLeft size={styles.icon.size} />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`${styles.button.base} ${
            currentPage === page 
              ? styles.button.active 
              : styles.button.inactive
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles.button.base} ${
          currentPage === totalPages 
            ? 'opacity-50 cursor-not-allowed' 
            : styles.button.inactive
        }`}
      >
        <ChevronRight size={styles.icon.size} />
      </button>
    </div>
  )
}

export default Pagination