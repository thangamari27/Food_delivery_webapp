import React from 'react'

function Pagination({ content, current, total, perPage, totalItems, onPageChange, onPerPageChange, styles }) {
  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, totalItems);

  return (
    <div className={styles.pagination.wrapper}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{content.pagination.rowsPerPageLabel}:</span>
        <select 
          value={perPage} 
          onChange={(e) => onPerPageChange(Number(e.target.value))} 
          className={styles.pagination.select}
        >
          {content.pagination.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-600">Showing {start}-{end} of {totalItems}</div>
      <div className="flex gap-2">
        <button 
          onClick={() => onPageChange(current - 1)} 
          disabled={current === 1} 
          className={`${styles.buttons.secondary} disabled:opacity-50`}
        >
          Previous
        </button>
        <button 
          onClick={() => onPageChange(current + 1)} 
          disabled={current === total} 
          className={`${styles.buttons.secondary} disabled:opacity-50`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination