import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ 
  content,
  current_page, 
  total_pages, 
  page_size, 
  total_items, 
  on_page_change, 
  on_page_size_change,
  styles
}) {
  const start_item = (current_page - 1) * page_size + 1;
  const end_item = Math.min(current_page * page_size, total_items);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className={styles.pagination_wrapper}>
        <div className={styles.pagination_info}>
          Showing {start_item} to {end_item} of {total_items} enquiries
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {content.pagination.rows_per_page_label}
            </span>
            <select 
              value={page_size} 
              onChange={(e) => { 
                on_page_size_change(Number(e.target.value)); 
                on_page_change(1); 
              }} 
              className={styles.pagination_select}
            >
              {content.pagination.rows_per_page_options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className={styles.pagination_controls}>
            <button 
              onClick={() => on_page_change(Math.max(1, current_page - 1))} 
              disabled={current_page === 1} 
              className={styles.pagination_button}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600">
              Page {current_page} {content.pagination.of_label} {total_pages}
            </span>
            <button 
              onClick={() => on_page_change(Math.min(total_pages, current_page + 1))} 
              disabled={current_page === total_pages} 
              className={styles.pagination_button}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination