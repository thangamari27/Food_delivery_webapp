import React from 'react'

function TableHeader({ label, sortable, onSort, sortKey, currentSort, styles }) {
  return (
    <th 
        className={`${styles.table.header} ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
        onClick={sortable ? () => onSort(sortKey) : undefined}
    >
        <div className="flex items-center gap-2">
        {label}
        {/* {sortable && currentSort.key === sortKey && (
            <span>{currentSort.direction === 'asc' ? '↑' : '↓'}</span>
        )} */}
        </div>
    </th>
  )
}

export default TableHeader