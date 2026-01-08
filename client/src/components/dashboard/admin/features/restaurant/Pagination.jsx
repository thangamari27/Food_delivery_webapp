import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ content, currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-t border-t-gray-300 bg-white">
      <div className="text-sm text-gray-600">
        {content.titles.showingRestaurants
          .replace('{current}', startItem)
          .replace('{end}', endItem)
          .replace('{total}', totalItems)}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === i + 1
                ? 'bg-orange-500 text-white border-orange-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default Pagination