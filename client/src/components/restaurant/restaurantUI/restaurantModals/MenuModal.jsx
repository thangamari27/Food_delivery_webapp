import { useState, useEffect } from 'react';
import { useFood } from '../../../../context/admin/Foodcontext';
import ModalBase from "./ModalBase";
import MenuHeader from "./MenuHeader";
import RestaurantInfo from "./RestaurantInfo";
import { Leaf, Flame, Search, ChevronRight, Loader2 } from 'lucide-react';

const MenuModal = ({ isOpen, onClose, restaurant, content, styles }) => {
  const { foods, fetchFoods, loading, error } = useFood();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [restaurantFoods, setRestaurantFoods] = useState([]);

  // Fetch foods when modal opens
  useEffect(() => {
    if (isOpen && restaurant?.id) {
      loadRestaurantMenu();
    }
  }, [isOpen, restaurant?.id]);

  const loadRestaurantMenu = async () => {
    try {
      // Fetch foods for this specific restaurant
      await fetchFoods({
        restaurant: restaurant.id,
        status: 'Active',
        isActive: true,
        limit: 100
      });
    } catch (err) {
      console.error('Error loading menu:', err);
    }
  };

  // Filter foods based on search and category
  const filteredFoods = restaurantFoods.filter(food => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        food.name?.toLowerCase().includes(query) ||
        food.description?.toLowerCase().includes(query) ||
        food.category?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && food.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  // Group foods by category
  const foodsByCategory = filteredFoods.reduce((acc, food) => {
    const category = food.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(food);
    return acc;
  }, {});

  // Get unique categories
  const categories = ['all', ...new Set(restaurantFoods.map(food => food.category).filter(Boolean))];

  // Update restaurant foods when foods from context change
  useEffect(() => {
    if (foods && restaurant?.id) {
      // Filter foods for this restaurant
      const filtered = foods.filter(food => {
        // Check if food belongs to this restaurant
        const foodRestaurantId = food.restaurant?.restaurantId || food.restaurant;
        const restaurantId = restaurant.id || restaurant._id;
        return String(foodRestaurantId) === String(restaurantId);
      });
      setRestaurantFoods(filtered);
    }
  }, [foods, restaurant?.id]);

  const modalHeader = (
    <MenuHeader restaurant={restaurant} styles={styles} onClose={onClose} />
  );

  const modalBody = (
    <>
      <RestaurantInfo restaurant={restaurant} styles={styles} />
      
      {/* Search and Filter Section */}
      <div className="px-3 sticky top-0 bg-white z-10 py-4 border-b border-gray-300">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Items' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <div className="py-4 px-3">
        {loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
            <p className="text-gray-600">Loading menu...</p>
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadRestaurantMenu}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Retry
            </button>
          </div>
        ) : restaurantFoods.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">No menu items available</p>
            <p className="text-sm text-gray-500">This restaurant hasn't added their menu yet.</p>
          </div>
        ) : filteredFoods.length === 0 ? (
          // No Results State
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">No items found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          // Menu Items by Category
          Object.entries(foodsByCategory).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-orange-500" />
                {category}
                <span className="text-sm font-normal text-gray-500">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </h3>
              
              <div className="space-y-4">
                {items.map((food) => (
                  <MenuItem key={food.fid || food._id} food={food} styles={styles} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results Count */}
      {!loading && restaurantFoods.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-300 py-3 text-center">
          <p className="text-sm text-gray-600">
            Showing {filteredFoods.length} of {restaurantFoods.length} items
          </p>
        </div>
      )}
    </>
  );

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      showCloseButton={true}
      closeButtonPosition="header"
      styles={styles}
    >
      {{ header: modalHeader, body: modalBody }}
    </ModalBase>
  );
};

// Menu Item Component
const MenuItem = ({ food, styles }) => {
  const isVeg = food.type?.toLowerCase() === 'veg' || food.isVegetarian;
  const price = food.price || 0;
  const isAvailable = food.isAvailable !== false && food.status === 'Active';

  return (
    <div className={`border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors ${
      !isAvailable ? 'opacity-60' : ''
    }`}>
      <div className="flex justify-between items-start gap-4">
        {/* Food Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {/* Veg/Non-Veg Indicator */}
            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
              isVeg ? 'border-green-600' : 'border-red-600'
            }`}>
              {isVeg ? (
                <Leaf className="w-3 h-3 text-green-600" />
              ) : (
                <Flame className="w-3 h-3 text-red-600" />
              )}
            </div>
            
            <h4 className="font-semibold text-gray-900">{food.name}</h4>
            
            {!isAvailable && (
              <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                Unavailable
              </span>
            )}
          </div>

          {food.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {food.description}
            </p>
          )}

          {/* Food Tags */}
          {food.tags && food.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {food.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Dietary Info */}
          {food.allergens && food.allergens.length > 0 && (
            <p className="text-xs text-amber-600 mt-2">
              ⚠️ Contains: {food.allergens.join(', ')}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-gray-900">₹{price}</p>
          {food.originalPrice && food.originalPrice > price && (
            <p className="text-sm text-gray-500 line-through">
              ₹{food.originalPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;