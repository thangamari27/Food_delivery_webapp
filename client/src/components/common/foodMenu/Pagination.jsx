import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange, styles }) {
  if(totalPages <= 1) return null
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i+1);
  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.leftButton}
      >
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pagebutton}
            ${currentPage === number
              ? styles.currentPage
              : styles.otherPage}
          `}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.rightButton}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

export default Pagination