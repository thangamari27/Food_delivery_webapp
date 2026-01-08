import React from 'react';

function RestaurantStats({ totalCount, filteredCount }) {
  if (filteredCount === 0) return null;
  
  return (
    <div className="mb-4 text-gray-600">
      Showing {filteredCount} {filteredCount === totalCount ? '' : `of ${totalCount}`} restaurant{filteredCount !== 1 ? 's' : ''}
    </div>
  );
}

export default RestaurantStats;