import { Eye, Edit2, Trash2, Check, Star, MapPin, Clock, X } from 'lucide-react';
import { getStatusColor } from '../../../../../utils/handler/admin/restaurantFilterHandler';

const RestaurantImage = ({ image, name, size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  const fallbackImages = {
    sm: "https://placeholdit.com/50x50/dddddd/999999?text=R",
    md: "https://placeholdit.com/80x80/dddddd/999999?text=R",
    lg: "https://placeholdit.com/120x120/dddddd/999999?text=Restaurant",
    xl: "https://placeholdit.com/150x150/dddddd/999999?text=Restaurant"
  };

  return (
    image ? (
      <img
        src={image}
        alt={name}
        className={`${sizeClasses[size]} rounded-lg object-cover border border-gray-200`}
      />
    ) : (
      <div className={`${sizeClasses[size]} rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200`}>
        <img 
          src={fallbackImages[size]} 
          alt={`${name} placeholder`} 
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
    )
  );
};

const RestaurantCard = ({ restaurant, onView, onEdit, onDelete, content }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex gap-3 mb-4">
      {/* Restaurant Image */}
      <RestaurantImage image={restaurant.image} name={restaurant.name} size="lg" />
      
      <div className="flex-1 min-w-0">
        {/* Header with Name and Status */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-lg text-gray-900 truncate" title={restaurant.name}>
            {restaurant.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${getStatusColor(restaurant.status)}`}>
            {restaurant.status}
          </span>
        </div>
        
        {/* Cuisine and Contact Person */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 truncate">
            {restaurant.cuisine.join(', ')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Contact: {restaurant.contactPerson}
          </p>
        </div>
        
        {/* Rating with Star */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="text-yellow-400 fill-yellow-400" size={14} aria-hidden="true" />
          <span className="text-sm font-medium">{restaurant.rating}</span>
          <span className="text-xs text-gray-500">/5</span>
        </div>
      </div>
    </div>
    
    {/* Restaurant Details Grid */}
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={14} aria-hidden="true" />
        <span className="truncate" title={restaurant.city}>
          {restaurant.city}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock size={14} aria-hidden="true" />
        <span>{restaurant.deliveryTime}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
        <span className="text-gray-500">Price:</span>
        <span className="font-medium">{restaurant.priceRange}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-gray-500">Delivery:</span>
        {restaurant.deliveryAvailable ? (
          <div className="flex items-center gap-1 text-green-600">
            <Check size={14} />
            <span className="font-medium">Yes</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600">
            <X size={14} />
            <span className="font-medium">No</span>
          </div>
        )}
      </div>
      {restaurant.offers && (
        <div className="col-span-2">
          <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
            {restaurant.offers}
          </span>
        </div>
      )}
    </div>
    
    {/* Action Buttons */}
    <div className="flex gap-2 pt-3 border-t border-gray-100">
      <button
        onClick={() => onView(restaurant)}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
        aria-label={`View ${restaurant.name}`}
      >
        <Eye size={16} />
        {content.buttons.view}
      </button>
      <button
        onClick={() => onEdit(restaurant)}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
        aria-label={`Edit ${restaurant.name}`}
      >
        <Edit2 size={16} />
        {content.buttons.edit}
      </button>
      <button
        onClick={() => onDelete(restaurant.id)}
        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
        aria-label={`Delete ${restaurant.name}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

function RestaurantCards({ restaurants, onView, onEdit, onDelete, content }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          content={content}
        />
      ))}
    </div>
  );
}

export default RestaurantCards;