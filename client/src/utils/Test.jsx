import React, { useState, useMemo, useCallback } from 'react';
import { Heart, ShoppingCart, Plus, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

// --- 1. CONSTANT DATA (Content and Configuration) ---

const DISH_CATEGORIES = [
  { id: 'all', name: 'All', color: 'bg-green-700' },
  { id: 'noodle', name: 'Noodle Dishes' },
  { id: 'rice', name: 'Rice Dishes' },
  { id: 'wraps', name: 'Rolls and Wraps' },
  { id: 'seafood', name: 'Seafood Dishes' },
  { id: 'beverages', name: 'Beverages' },
];

const SPECIAL_MENU_CUISINES = [
  { id: 'all', name: 'All' },
  { id: 'arabic', name: 'Arabic' },
  { id: 'thai', name: 'Thai' },
  { id: 'pakistani', name: 'Pakistani' },
  { id: 'indian', name: 'Indian' },
];

const SPECIAL_DISHES = [
  { id: 'sm1', name: 'Salmon Fry', cuisine: 'arabic', price: 150, desc: '2 Salmon Fry · Chili Sauce · Soft Drinks', imageUrl: 'https://placehold.co/200x200/B0E0E6/264653?text=Salmon' },
  { id: 'sm2', name: 'Thai Noodles', cuisine: 'thai', price: 130, desc: '2 Salmon Fry · Chili Sauce · Soft Drinks', imageUrl: 'https://placehold.co/200x200/F08080/FFFFFF?text=Noodles' },
  { id: 'sm3', name: 'Curry Chicken', cuisine: 'indian', price: 180, desc: '2 Salmon Fry · Chili Sauce · Soft Drinks', imageUrl: 'https://placehold.co/200x200/FFD700/800080?text=Curry' },
  { id: 'sm4', name: 'Chicken Biryani', cuisine: 'indian', price: 200, desc: '2 Salmon Fry · Chili Sauce · Soft Drinks', imageUrl: 'https://placehold.co/200x200/C0C0C0/464646?text=Biryani' },
  { id: 'sm5', name: 'Pakistani Kebabs', cuisine: 'pakistani', price: 190, desc: 'Marinated Beef · Fresh Salad · Yogurt Dip', imageUrl: 'https://placehold.co/200x200/DDA0DD/FFFFFF?text=Kebab' },
  { id: 'sm6', name: 'Fattoush Salad', cuisine: 'arabic', price: 90, desc: 'Fresh Lettuce · Tomatoes · Crispy Bread', imageUrl: 'https://placehold.co/200x200/90EE90/3CB371?text=Fattoush' },
  { id: 'sm7', name: 'Green Curry', cuisine: 'thai', price: 175, desc: 'Spicy Coconut Milk · Bamboo Shoots', imageUrl: 'https://placehold.co/200x200/98FB98/48D1CC?text=Green+Curry' },
  { id: 'sm8', name: 'Butter Chicken', cuisine: 'indian', price: 210, desc: 'Creamy Tomato Sauce · Tender Chicken', imageUrl: 'https://placehold.co/200x200/FFA07A/8B0000?text=Butter+Chicken' },
  { id: 'sm9', name: 'Masala Dosa', cuisine: 'indian', price: 110, desc: 'Thin Rice Crepe · Potato Filling · Sambar', imageUrl: 'https://placehold.co/200x200/F4A460/8B4513?text=Dosa' },
];

const TODAY_MENU_DISHES = [
  { id: 'tm1', name: 'VEGETABLE SPRING ROLLS', category: 'wraps', ingredients: 'tomato, lutes, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/7CFC00/3CB371?text=Spring+Rolls' },
  { id: 'tm2', name: 'MEXICAN TACOS WITH MEAT', category: 'meat', ingredients: 'tomato, lutes, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/FFA500/FFD700?text=Tacos' },
  { id: 'tm3', name: 'SANDWICH WITH TOMATOES', category: 'bread', ingredients: 'tomato, lutes, cucumber', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/87CEFA/4682B4?text=Sandwich' },
  { id: 'tm4', name: 'POPIAH DEEP FRIED SPRING ROLLS', category: 'wraps', ingredients: 'tomato, lutes, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/F0E68C/BDB76B?text=Popiah' },
  { id: 'tm5', name: 'PHO GA, NOODLES, SPRING ROLLS', category: 'noodle', ingredients: 'noodles, lutes, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/ADD8E6/6495ED?text=Pho+Ga' },
  { id: 'tm6', name: 'SHRIMP ROLLS WITH CHEESE', category: 'seafood', ingredients: 'shrimp, lutes, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/B0C4DE/778899?text=Shrimp+Rolls' },
  { id: 'tm7', name: 'SHRIMP SPICY SHOUP', category: 'seafood', ingredients: 'shrimp, lutes, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/CD5C5C/A52A2A?text=Spicy+Soup' },
  { id: 'tm8', name: 'NOODLES SPICY WITH SEAFOOD', category: 'noodle', ingredients: 'noodles, seafood, capsicum', price: 325.00, oldPrice: 348.00, imageUrl: 'https://placehold.co/250x180/9370DB/483D8B?text=Seafood+Noodle' },
];

const ITEMS_PER_PAGE = 4; // Special menu items per page

// --- 2. REUSABLE UI COMPONENTS ---

/**
 * Filter button component for category/cuisine selection.
 */
const FilterButton = ({ label, isActive, onClick, activeColorClasses = 'bg-green-700 text-white', defaultColorClasses = 'bg-gray-100 text-gray-700' }) => (
  <button
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm
      ${isActive ? activeColorClasses : defaultColorClasses}
      hover:opacity-80 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${isActive ? activeColorClasses : 'focus:ring-gray-300'}`}
    onClick={onClick}
  >
    {label}
  </button>
);

/**
 * Card component for the Today's Menu/Top Categories section.
 */
const DishCardCategory = ({ dish }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">
    <div className="h-44 overflow-hidden">
      <img
        src={dish.imageUrl}
        alt={dish.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/250x180/CCCCCC/333333?text=Dish'; }}
      />
    </div>
    <div className="p-4 relative">
      <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 truncate">{dish.name}</h3>
      <p className="text-gray-500 text-xs mb-3 italic">
        Ingredients: {dish.ingredients}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm font-bold text-gray-800">
          PRICE: <span className="text-red-500">${dish.price.toFixed(2)}</span>
          {dish.oldPrice && (
            <span className="ml-2 text-gray-400 line-through font-normal">${dish.oldPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-green-700 hover:text-white transition-colors duration-200 shadow-md"
          title="Add to Cart"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  </div>
);

/**
 * Card component for the Special Menu section (includes Like button).
 */
const DishCardSpecial = ({ dish, isLiked, onLikeToggle, isFeatured = false }) => (
  <div
    className={`p-4 rounded-3xl shadow-lg transition-all duration-300 relative
      ${isFeatured ? 'bg-white border-2 border-orange-400 shadow-orange-200' : 'bg-gray-50 hover:shadow-xl'}
    `}
  >
    <button
      onClick={() => onLikeToggle(dish.id)}
      className="absolute top-6 right-6 p-2 rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-200 z-10"
      title={isLiked ? "Unlike" : "Like"}
    >
      <Heart size={20} className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-300'} />
    </button>
    <div className="h-40 flex justify-center items-center overflow-hidden mb-3">
      <img
        src={dish.imageUrl}
        alt={dish.name}
        className="w-40 h-40 object-cover rounded-full"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/160x160/D3D3D3/000000?text=Dish'; }}
      />
    </div>
    <div className="text-center">
      <h3 className="font-bold text-lg text-gray-900 mb-1">{dish.name}</h3>
      <p className="text-gray-500 text-xs mb-4">{dish.desc}</p>
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-900">${dish.price}</span>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 shadow-md
            ${isFeatured ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-orange-500 border border-orange-500 hover:bg-orange-50'}
          `}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

/**
 * Pagination control component.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${currentPage === number
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100'}
          `}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

/**
 * Not Found Layout component.
 */
const NotFound = ({ message }) => (
  <div className="col-span-full py-16 text-center bg-gray-50 rounded-xl m-4 border border-dashed border-gray-300">
    <Search size={48} className="mx-auto text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-600">No Items Found</h3>
    <p className="text-gray-500">{message}</p>
  </div>
);

// --- 3. MAIN APPLICATION COMPONENT ---

const App = () => {
  // State for Top Categories section
  const [activeCategory, setActiveCategory] = useState('all');

  // State for Special Menu section
  const [activeCuisine, setActiveCuisine] = useState('all');
  const [specialMenuPage, setSpecialMenuPage] = useState(1);
  const [likedItems, setLikedItems] = useState(new Set()); // Efficient set for O(1) lookups

  // --- TOP CATEGORIES LOGIC ---

  const filteredTodayMenu = useMemo(() => {
    if (activeCategory === 'all') {
      return TODAY_MENU_DISHES;
    }
    return TODAY_MENU_DISHES.filter(dish => dish.category === activeCategory);
  }, [activeCategory]);

  // --- SPECIAL MENU LOGIC ---

  const filteredSpecialDishes = useMemo(() => {
    setSpecialMenuPage(1); // Reset page on filter change
    if (activeCuisine === 'all') {
      return SPECIAL_DISHES;
    }
    return SPECIAL_DISHES.filter(dish => dish.cuisine === activeCuisine);
  }, [activeCuisine]);

  const totalPages = Math.ceil(filteredSpecialDishes.length / ITEMS_PER_PAGE);

  const paginatedSpecialDishes = useMemo(() => {
    const start = (specialMenuPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredSpecialDishes.slice(start, end);
  }, [filteredSpecialDishes, specialMenuPage]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setSpecialMenuPage(page);
    }
  }, [totalPages]);

  const handleLikeToggle = useCallback((dishId) => {
    setLikedItems(prevLiked => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(dishId)) {
        newLiked.delete(dishId);
      } else {
        newLiked.add(dishId);
      }
      return newLiked;
    });
  }, []);


  // Custom style to hide the scrollbar for mobile filter rows
  const noScrollbarStyle = {
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none',   /* Firefox */
  };
  // Tailwind utility for hiding scrollbar on Webkit (Chrome, Safari)
  const webkitScrollbarHide = '::-webkit-scrollbar { display: none; }';


  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 font-['Inter']">

      {/* Inject custom styles for scrollbar hiding (as custom Tailwind config isn't available here) */}
      <style>{webkitScrollbarHide}</style>

      {/* --- TOP CATEGORIES PAGE / SECTION --- */}
      <section className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Top Categories
        </h2>

        {/* Categories Filter (Responsive Scrollable Row - Scrollbar hidden on mobile) */}
        <div
          className="flex space-x-3 overflow-x-auto pb-4 pt-1"
          style={noScrollbarStyle} // Apply scrollbar hiding for Firefox/IE
        >
          {DISH_CATEGORIES.map((cat) => (
            <FilterButton
              key={cat.id}
              label={cat.name}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              activeColorClasses="bg-green-700 text-white focus:ring-green-500"
            />
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-12 mb-8">
          Today's Menu
        </h2>

        {/* Today's Menu Grid (Fully Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTodayMenu.length > 0 ? (
            filteredTodayMenu.map((dish) => (
              <DishCardCategory key={dish.id} dish={dish} />
            ))
          ) : (
            <NotFound message={`No dishes found in the '${DISH_CATEGORIES.find(c => c.id === activeCategory)?.name}' category.`} />
          )}
        </div>
      </section>

      {/* --- SPECIAL MENU PAGE / SECTION --- */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Special <span className="text-orange-500">Menu</span>
        </h2>

        {/* Cuisine Filter (Responsive Scrollable Row - Scrollbar hidden on mobile) */}
        <div
          className="flex space-x-3 overflow-x-auto pb-4 pt-1 mb-8"
          style={noScrollbarStyle} // Apply scrollbar hiding for Firefox/IE
        >
          {SPECIAL_MENU_CUISINES.map((cuisine) => (
            <FilterButton
              key={cuisine.id}
              label={cuisine.name}
              isActive={activeCuisine === cuisine.id}
              onClick={() => setActiveCuisine(cuisine.id)}
              activeColorClasses="bg-gray-800 text-white focus:ring-gray-600"
              defaultColorClasses="bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            />
          ))}
        </div>

        {/* Special Menu Grid (Fully Responsive with Pagination) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedSpecialDishes.length > 0 ? (
            paginatedSpecialDishes.map((dish) => (
              <DishCardSpecial
                key={dish.id}
                dish={dish}
                isLiked={likedItems.has(dish.id)}
                onLikeToggle={handleLikeToggle}
                isFeatured={dish.id === 'sm2'} // Example of a featured item
              />
            ))
          ) : (
            <NotFound message={`No special dishes found for '${SPECIAL_MENU_CUISINES.find(c => c.id === activeCuisine)?.name}' cuisine.`} />
          )}
        </div>

        {/* Pagination Control */}
        <Pagination
          currentPage={specialMenuPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default App;