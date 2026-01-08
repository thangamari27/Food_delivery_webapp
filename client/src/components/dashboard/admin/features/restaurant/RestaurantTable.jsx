import { Eye, Edit2, Trash2, Check, X, Star } from 'lucide-react';
import { getStatusColor } from '../../../../../utils/handler/admin/restaurantFilterHandler';
import TableHeader from './TableHeader';

const RestaurantImage = ({ image, name }) => (
  image ? (
    <img
      src={image}
      alt={name}
      className="w-12 h-12 rounded-lg object-cover"
    />
  ) : (
    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
      {/* <span className="text-xs text-gray-500">No Image</span> */}
      <img src="https://placeholdit.com/600x400/dddddd/999999?text=Restaurant" alt="image not found" />
    </div>
  )
);

const RestaurantInfo = ({ restaurant }) => (
  <div className="flex items-center gap-3">
    <RestaurantImage image={restaurant.image} name={restaurant.name} />
    <div>
      <div className="font-medium text-gray-900">{restaurant.name}</div>
      <div className="text-sm text-gray-500">{restaurant.contactPerson}</div>
    </div>
  </div>
);

const ActionButtons = ({ restaurant, onView, onEdit, onDelete, content }) => (
  <div className="flex items-center justify-end gap-2">
    <button
      onClick={() => onView(restaurant)}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      title="View"
      aria-label={`View ${restaurant.name}`}
    >
      <Eye size={18} />
    </button>
    <button
      onClick={() => onEdit(restaurant)}
      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
      title="Edit"
      aria-label={`Edit ${restaurant.name}`}
    >
      <Edit2 size={18} />
    </button>
    <button
      onClick={() => onDelete(restaurant.id)}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-b-gray-300">
          <tr>
            <TableHeader label="ID" sortable={false} styles={styles} />
            <TableHeader
              label="Name"
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
              sortKey="rating"
              styles={styles}
              currentSort={sortConfig}
            />
            <th className="px-6 py-6 text-right text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">#{restaurant.id}</td>
              <td className="px-6 py-4">
                <RestaurantInfo restaurant={restaurant} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {restaurant.cuisine.join(', ')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{restaurant.city}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(restaurant.status)}`}>
                  {restaurant.status}
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
                  <span className="text-sm font-medium">{restaurant.rating}</span>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantTable;