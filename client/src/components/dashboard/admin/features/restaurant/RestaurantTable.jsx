import { Eye, Edit2, Trash2, Check, X, Star } from 'lucide-react';
import { getStatusColor } from '../../../../../utils/handler/admin/restaurantFilterHandler';
import TableHeader from './TableHeader';

/**
 * UNIFIED IMAGE URL HELPER
 * Handles all possible data structures from backend
 */
const getRestaurantImageUrl = (restaurant) => {
  // Priority 1: Structured image object with URL
  if (restaurant?.image?.url) {
    return restaurant.image.url;
  }
  
  // Priority 2: Direct image string
  if (typeof restaurant?.image === 'string') {
    return restaurant.image;
  }
  
  // Priority 3: Alternative imageUrl field
  if (restaurant?.imageUrl) {
    return restaurant.imageUrl;
  }
  
  // Fallback: Placeholder
  return "https://placehold.co/400x400/FF4F00/white?text=No+Image";
};

const RestaurantImage = ({ restaurant }) => {
  const imageUrl = getRestaurantImageUrl(restaurant);
  
  return (
    <img
      src={imageUrl}
      alt={restaurant.name}
      className="w-20 h-20 rounded-lg object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/400x400/FF4F00/white?text=No+Image";
      }}
    />
  );
};

const RestaurantInfo = ({ restaurant }) => (
  <div className="flex items-center gap-3">
    <div>
    </div>
      <RestaurantImage restaurant={restaurant} />
    <div className='w-40'>
      <div className="font-medium text-gray-900">{restaurant.name}</div>
      <div className="text-sm text-gray-500">{restaurant.contactPerson}</div>
    </div>
  </div>
);

const ActionButtons = ({ restaurant, onView, onEdit, onDelete, content }) => (
  <div className="flex items-center justify-end gap-2">
    <button
      onClick={() => onView(restaurant)}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      title="View Details"
      aria-label={`View ${restaurant.name}`}
    >
      <Eye size={18} />
    </button>
    <button
      onClick={() => onEdit(restaurant)}
      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
      title="Edit"
      aria-label={`Edit ${restaurant.name}`}
    >
      <Edit2 size={18} />
    </button>
    <button
      onClick={() => onDelete(restaurant.rid || restaurant.id)}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
      aria-label={`Delete ${restaurant.name}`}
    >
      <Trash2 size={18} />
    </button>
  </div>
);

function RestaurantTable({ 
  restaurants, 
  sortConfig, 
  onSort, 
  onView, 
  onEdit, 
  onDelete, 
  content,
  styles 
}) {
  // Helper to safely get nested values
  const getAddress = (restaurant) => {
    return restaurant.address?.city || restaurant.city || 'N/A';
  };

  const getRating = (restaurant) => {
    if (restaurant.rating && typeof restaurant.rating === 'object') {
      return restaurant.rating.average || 0;
    }
    return restaurant.rating || 0;
  };

  const getCuisineList = (restaurant) => {
    if (!restaurant.cuisine) return 'N/A';
    if (Array.isArray(restaurant.cuisine)) {
      return restaurant.cuisine.join(', ');
    }
    return restaurant.cuisine;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-300">
          <tr>
            <TableHeader label="ID" sortable={false} styles={styles} />
            <TableHeader
              label="Restaurant"
              sortable={true}
              onSort={onSort}
              sortKey="name"
              currentSort={sortConfig}
              styles={styles}
            />
            <TableHeader styles={styles} label="Cuisine" sortable={false} />
            <TableHeader styles={styles} label="Location" sortable={false} />
            <TableHeader styles={styles} label="Status" sortable={false} />
            <TableHeader styles={styles} label="Delivery" sortable={false} />
            <TableHeader
              label="Rating"
              sortable={true}
              onSort={onSort}
              sortKey="rating.average"
              styles={styles}
              currentSort={sortConfig}
            />
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {restaurants.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                No restaurants found
              </td>
            </tr>
          ) : (
            restaurants.map((restaurant, index) => (
              <tr key={restaurant.rid || restaurant._id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  #{restaurant.rid ? restaurant.rid.slice(0, 8) : index + 1}
                </td>
                <td className="px-6 py-4">
                  <RestaurantInfo restaurant={restaurant} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {getCuisineList(restaurant)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {getAddress(restaurant)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(restaurant.status)}`}>
                    {restaurant.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {restaurant.deliveryAvailable ? (
                    <Check className="text-green-500" size={20} aria-label="Delivery available" />
                  ) : (
                    <X className="text-red-500" size={20} aria-label="Delivery not available" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} aria-hidden="true" />
                    <span className="text-sm font-medium">{getRating(restaurant).toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <ActionButtons
                    restaurant={restaurant}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    content={content}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantTable;
export { getRestaurantImageUrl };