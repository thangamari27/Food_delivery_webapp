
function NoRestaurantsFound({ onClearFilters }) {
  return (
     <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        No restaurants found matching your filters
      </p>
      <button
        onClick={onClearFilters}
        className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default NoRestaurantsFound