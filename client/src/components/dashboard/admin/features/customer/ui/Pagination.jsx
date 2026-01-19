import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ content, pagination, totalItems, styles }) {
  const { page, perPage, totalPages, startIdx, endIdx, goToPage, changePerPage } = pagination;
  
  return (
    <div className={styles.pagination.container}>
      <div className={styles.pagination.content}>
        <div className={styles.pagination.info}>
          {content.pagination.showing} {startIdx + 1}–{endIdx} {content.pagination.of} {totalItems} {content.pagination.customers}
        </div>
        <div className={styles.pagination.controls}>
          <div className="flex items-center gap-2">
            <label htmlFor="rows-per-page" className="text-sm text-gray-700 sr-only">
              {content.pagination.rowsPerPage}
            </label>
            <select 
              id="rows-per-page"
              value={perPage} 
              onChange={(e) => changePerPage(Number(e.target.value))} 
              className={styles.pagination.select}
              aria-label="Rows per page"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className={styles.pagination.navButtons}>
            <button 
              onClick={() => goToPage(page - 1)} 
              disabled={page === 0}
              className={styles.pagination.navButton}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page <span aria-current="page">{page + 1}</span> of {totalPages}
            </span>
            <button 
              onClick={() => goToPage(page + 1)} 
              disabled={page >= totalPages - 1}
              className={styles.pagination.navButton}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination