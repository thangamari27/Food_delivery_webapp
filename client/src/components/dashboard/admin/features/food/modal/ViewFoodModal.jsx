/**
 * ViewFoodModal - Updated for Backend Integration
 * Displays detailed food information with proper field mapping
 */

import { Edit, Star, Clock, Package, Award, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from './Modal';

function ViewFoodModal({ content, isOpen, onClose, food, onEdit, styles }) {
  if (!food) return null;

  // Helper functions to safely access backend data
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getImageUrl = () => {
    if (food.image?.url) return food.image.url;
    if (food.imageUrl) return food.imageUrl;
    return 'https://placehold.co/400x400/FF4F00/white?text=No+Image';
  };

  const getRating = () => {
    if (food.rating && typeof food.rating === 'object') {
      return {
        average: food.rating.average || 0,
        count: food.rating.count || 0
      };
    }
    return {
      average: food.rating || 0,
      count: 0
    };
  };

  const getStatus = () => {
    if (food.status) return food.status;
    if (food.isActive && food.isAvailable) return 'Active';
    return 'Inactive';
  };

  const getRestaurantName = () => {
    if (food.restaurantName) return food.restaurantName;
    if (typeof food.restaurant === 'object' && food.restaurant?.name) {
      return food.restaurant.name;
    }
    return 'N/A';
  };

  const rating = getRating();
  const status = getStatus();

  return (
    <Modal
      styles={styles}
      isOpen={isOpen}
      onClose={onClose}
      title="Food Details"
      size="lg"
      footer={
        <Button onClick={() => { onClose(); onEdit(food); }} styles={styles}>
          <Edit size={18} />
          Edit Food
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Image */}
        <div className="relative">
          <img 
            src={getImageUrl()} 
            alt={food.name} 
            className="w-full h-64 object-cover rounded-lg" 
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/FF4F00/white?text=No+Image';
            }}
          />
          {food.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            </div>
          )}
          {food.isBestseller && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Bestseller
              </span>
            </div>
          )}
        </div>

        {/* Name and Restaurant */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{food.name}</h2>
          <p className="text-gray-600 mt-1">{getRestaurantName()}</p>
        </div>

        {/* Status, Rating, and Type */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge type="status" styles={styles}>
            {status}
          </Badge>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="text-sm font-semibold">{rating.average.toFixed(1)}</span>
            <span className="text-sm text-gray-600">({rating.count} reviews)</span>
          </div>
          <Badge type="type" styles={styles}>
            {food.type}
          </Badge>
          {food.isNewArrival && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              New
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category & Cuisine */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
            <Badge type="category" styles={styles}>{food.category}</Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Cuisine</h3>
            <Badge type="cuisine" styles={styles}>{food.cuisine}</Badge>
          </div>

          {/* Pricing */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Price</h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(food.price)}
              </span>
              {food.originalPrice && food.originalPrice > food.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(food.originalPrice)}
                  </span>
                  {food.discount > 0 && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                      {food.discount}% OFF
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-gray-700 leading-relaxed">{food.description || 'No description available'}</p>
          </div>

          {/* Ingredients */}
          {food.ingredients && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Ingredients</h3>
              <p className="text-gray-700">{food.ingredients}</p>
            </div>
          )}

          {/* Dietary Information */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Dietary Information</h3>
            <div className="flex flex-wrap gap-2">
              {food.isVeg && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  🥬 Vegetarian
                </span>
              )}
              {food.isVegan && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  🌱 Vegan
                </span>
              )}
              {food.isGlutenFree && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  🌾 Gluten-Free
                </span>
              )}
              {food.spiceLevel && food.spiceLevel !== 'Not Applicable' && (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  🌶️ {food.spiceLevel}
                </span>
              )}
            </div>
          </div>

          {/* Allergens */}
          {food.allergens && food.allergens.length > 0 && food.allergens[0] !== 'None' && (
            <div className="md:col-span-2">
              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800 mb-1">Allergen Warning</h3>
                  <div className="flex flex-wrap gap-2">
                    {food.allergens.map((allergen, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nutritional Information */}
          {food.nutritionalInfo && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Nutritional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {food.nutritionalInfo.calories > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Calories</p>
                    <p className="text-lg font-semibold text-gray-900">{food.nutritionalInfo.calories}</p>
                  </div>
                )}
                {food.nutritionalInfo.protein > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Protein</p>
                    <p className="text-lg font-semibold text-gray-900">{food.nutritionalInfo.protein}g</p>
                  </div>
                )}
                {food.nutritionalInfo.carbs > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Carbs</p>
                    <p className="text-lg font-semibold text-gray-900">{food.nutritionalInfo.carbs}g</p>
                  </div>
                )}
                {food.nutritionalInfo.fat > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Fat</p>
                    <p className="text-lg font-semibold text-gray-900">{food.nutritionalInfo.fat}g</p>
                  </div>
                )}
                {food.nutritionalInfo.fiber > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Fiber</p>
                    <p className="text-lg font-semibold text-gray-900">{food.nutritionalInfo.fiber}g</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timing & Quantity */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Availability & Timing</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="text-orange-500" size={18} />
                <div>
                  <p className="text-xs text-gray-600">Prep Time</p>
                  <p className="text-sm font-semibold">{food.preparationTime || 15} mins</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="text-orange-500" size={18} />
                <div>
                  <p className="text-xs text-gray-600">Available</p>
                  <p className="text-sm font-semibold">{food.availableQuantity || 0} units</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-orange-500" size={18} />
                <div>
                  <p className="text-xs text-gray-600">Serving Size</p>
                  <p className="text-sm font-semibold">{food.servingSize || '1 serving'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="text-orange-500" size={18} />
                <div>
                  <p className="text-xs text-gray-600">Order Range</p>
                  <p className="text-sm font-semibold">{food.minOrderQuantity || 1}-{food.maxOrderQuantity || 10}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          {(food.orderCount > 0 || food.viewCount > 0) && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Statistics</h3>
              <div className="flex gap-6">
                {food.orderCount > 0 && (
                  <div>
                    <p className="text-xs text-gray-600">Orders</p>
                    <p className="text-xl font-bold text-gray-900">{food.orderCount}</p>
                  </div>
                )}
                {food.viewCount > 0 && (
                  <div>
                    <p className="text-xs text-gray-600">Views</p>
                    <p className="text-xl font-bold text-gray-900">{food.viewCount}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {food.tags && food.tags.length > 0 && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {food.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
            <p className="text-sm text-gray-700">{formatDate(food.create_at)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
            <p className="text-sm text-gray-700">{formatDate(food.update_at)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ViewFoodModal;