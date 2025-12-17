import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, Star, MapPin, Clock, IndianRupee, Leaf, Flame, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// Constants
const RESTAURANTS = [
  {
    id: 1,
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    rating: 4.5,
    cuisine: "North Indian, Mughlai",
    address: "MG Road, Bangalore",
    deliveryTime: "30-35 mins",
    priceRange: "₹300 for two",
    offers: "50% off up to ₹100",
    badges: ["Pure Veg", "Bestseller"],
    features: ["Outdoor Seating", "Home Delivery", "Takeaway"]
  },
  {
    id: 2,
    name: "Masala Darbar",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    rating: 4.2,
    cuisine: "South Indian, Chinese",
    address: "Indiranagar, Bangalore",
    deliveryTime: "25-30 mins",
    priceRange: "₹250 for two",
    offers: "Free delivery on orders above ₹199",
    badges: ["Fast Delivery"],
    features: ["AC", "WiFi", "Parking"]
  },
  {
    id: 3,
    name: "Royal Biryani House",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    rating: 4.7,
    cuisine: "Biryani, Hyderabadi",
    address: "Koramangala, Bangalore",
    deliveryTime: "35-40 mins",
    priceRange: "₹400 for two",
    offers: "₹125 off on orders above ₹499",
    badges: ["Bestseller", "Trending"],
    features: ["Family Dining", "Late Night", "Catering"]
  },
  {
    id: 4,
    name: "Curry Leaf Express",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    rating: 4.0,
    cuisine: "Kerala, Seafood",
    address: "HSR Layout, Bangalore",
    deliveryTime: "40-45 mins",
    priceRange: "₹350 for two",
    offers: "10% off on all orders",
    badges: ["Pure Veg"],
    features: ["Contactless Delivery", "Eco-Friendly"]
  },
  {
    id: 5,
    name: "Tandoor Junction",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
    rating: 4.4,
    cuisine: "Punjabi, Tandoor",
    address: "Whitefield, Bangalore",
    deliveryTime: "30-35 mins",
    priceRange: "₹450 for two",
    offers: "Buy 1 Get 1 on selected items",
    badges: ["Award Winner"],
    features: ["Live Music", "Bar Available", "Valet"]
  },
  {
    id: 6,
    name: "Dosa Palace",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80",
    rating: 4.3,
    cuisine: "South Indian, Breakfast",
    address: "Jayanagar, Bangalore",
    deliveryTime: "20-25 mins",
    priceRange: "₹200 for two",
    offers: "Free dessert on orders above ₹299",
    badges: ["Pure Veg", "Fast Delivery"],
    features: ["Breakfast Specials", "Filter Coffee", "Chaat"]
  }
];

const FILTER_OPTIONS = {
  sortBy: [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "deliveryTime", label: "Delivery Time" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" }
  ],
  cuisines: [
    "North Indian", "South Indian", "Chinese", "Biryani", 
    "Punjabi", "Mughlai", "Seafood", "Kerala"
  ],
  dietaryPreferences: [
    { value: "veg", label: "Pure Veg", icon: Leaf },
    { value: "nonveg", label: "Non-Veg", icon: Flame }
  ],
  priceRange: [
    { value: "budget", label: "Under ₹300" },
    { value: "moderate", label: "₹300 - ₹500" },
    { value: "premium", label: "Above ₹500" }
  ],
  features: [
    "Home Delivery", "Takeaway", "Outdoor Seating", 
    "AC", "WiFi", "Parking", "Late Night"
  ]
};

const RESERVATION_FORM = {
  title: "Book a Table",
  fields: {
    name: { label: "Full Name", placeholder: "Enter your name", required: true },
    email: { label: "Email Address", placeholder: "your@email.com", required: true },
    phone: { label: "Phone Number", placeholder: "+91 00000 00000", required: true },
    guests: { label: "Number of Guests", required: true },
    date: { label: "Reservation Date", required: true },
    time: { label: "Preferred Time", required: true },
    specialRequests: { label: "Special Requests (Optional)", placeholder: "Any dietary restrictions, occasion, or seating preferences...", required: false }
  },
  guestOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  timeSlots: [
    { value: "11:00", label: "11:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "13:30", label: "1:30 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "18:30", label: "6:30 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "19:30", label: "7:30 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "20:30", label: "8:30 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "21:30", label: "9:30 PM" },
    { value: "22:00", label: "10:00 PM" }
  ],
  importantInfo: {
    title: "Important Information:",
    points: [
      "Please arrive 10 minutes before your reservation time",
      "Reservations are held for 15 minutes",
      "For groups larger than 10, please call the restaurant directly"
    ]
  },
  buttons: {
    cancel: "Cancel",
    confirm: "Confirm Reservation"
  }
};

const MENU_CONTENT = {
  categories: [
    {
      name: "Starters",
      items: [
        { name: "Paneer Tikka", price: "₹250", veg: true, description: "Cottage cheese marinated in spices" },
        { name: "Chicken Kebab", price: "₹300", veg: false, description: "Tender chicken pieces grilled to perfection" },
        { name: "Veg Spring Rolls", price: "₹180", veg: true, description: "Crispy rolls filled with mixed vegetables" }
      ]
    },
    {
      name: "Main Course",
      items: [
        { name: "Butter Chicken", price: "₹380", veg: false, description: "Creamy tomato-based curry with tender chicken" },
        { name: "Paneer Butter Masala", price: "₹320", veg: true, description: "Rich curry with cottage cheese cubes" },
        { name: "Biryani (Veg/Chicken)", price: "₹280/₹350", veg: false, description: "Aromatic rice dish with spices" },
        { name: "Dal Makhani", price: "₹240", veg: true, description: "Creamy black lentils slow-cooked overnight" }
      ]
    },
    {
      name: "Breads",
      items: [
        { name: "Butter Naan", price: "₹50", veg: true, description: "Soft flatbread brushed with butter" },
        { name: "Garlic Naan", price: "₹60", veg: true, description: "Naan topped with garlic and herbs" },
        { name: "Tandoori Roti", price: "₹40", veg: true, description: "Whole wheat flatbread from tandoor" }
      ]
    },
    {
      name: "Desserts",
      items: [
        { name: "Gulab Jamun", price: "₹120", veg: true, description: "Sweet milk-solid balls in sugar syrup" },
        { name: "Kulfi", price: "₹100", veg: true, description: "Traditional Indian ice cream" }
      ]
    }
  ]
};

const ITEMS_PER_PAGE = 6;

// Modal Components
const ReservationModal = ({ isOpen, onClose, restaurant }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    alert(`Reservation confirmed for ${restaurant.name}!`);
    onClose();
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={STYLES.modalOverlay} onClick={onClose}>
      <div className={`${STYLES.modalContent} ${STYLES.modalContentSmall}`} onClick={(e) => e.stopPropagation()}>
        <div className={STYLES.modalHeader}>
          <div className="flex-1">
            <h2 className={STYLES.modalTitle}>{RESERVATION_FORM.title}</h2>
            <p className={STYLES.modalSubtitle}>{restaurant.name}</p>
          </div>
          <button onClick={onClose} className={STYLES.modalCloseButton} aria-label="Close modal">
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className={STYLES.modalBody}>
          <form onSubmit={handleSubmit} className={STYLES.modalBodyPadding}>
            <div className={STYLES.formGroup}>
              <div className={STYLES.formGrid}>
                <div>
                  <label className={STYLES.formLabel}>
                    {RESERVATION_FORM.fields.name.label} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={STYLES.formInput}
                    placeholder={RESERVATION_FORM.fields.name.placeholder}
                  />
                </div>

                <div>
                  <label className={STYLES.formLabel}>
                    {RESERVATION_FORM.fields.email.label} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={STYLES.formInput}
                    placeholder={RESERVATION_FORM.fields.email.placeholder}
                  />
                </div>

                <div>
                  <label className={STYLES.formLabel}>
                    {RESERVATION_FORM.fields.phone.label} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={STYLES.formInput}
                    placeholder={RESERVATION_FORM.fields.phone.placeholder}
                  />
                </div>

                <div>
                  <label className={STYLES.formLabel}>
                    {RESERVATION_FORM.fields.guests.label} *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className={STYLES.formSelect}
                  >
                    {RESERVATION_FORM.guestOptions.map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={STYLES.formLabel}>
                    {RESERVATION_FORM.fields.date.label} *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    className={STYLES.formInput}
                  />
                </div>

                <div>
                  <label className={STYLES.formLabel}>
                    {RESERVATION_FORM.fields.time.label} *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className={STYLES.formSelect}
                  >
                    <option value="">Select time</option>
                    {RESERVATION_FORM.timeSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={STYLES.formLabel}>
                  {RESERVATION_FORM.fields.specialRequests.label}
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="4"
                  className={STYLES.formTextarea}
                  placeholder={RESERVATION_FORM.fields.specialRequests.placeholder}
                ></textarea>
              </div>

              <div className={STYLES.formInfoBox}>
                <div className={STYLES.formInfoContent}>
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={STYLES.formInfoTitle}>
                      {RESERVATION_FORM.importantInfo.title}
                    </p>
                    <ul className={STYLES.formInfoList}>
                      {RESERVATION_FORM.importantInfo.points.map((point, index) => (
                        <li key={index}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={STYLES.formActions}>
                <button
                  type="button"
                  onClick={onClose}
                  className={STYLES.formButtonSecondary}
                >
                  {RESERVATION_FORM.buttons.cancel}
                </button>
                <button
                  type="submit"
                  className={STYLES.formButtonPrimary}
                >
                  {RESERVATION_FORM.buttons.confirm}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const MenuModal = ({ isOpen, onClose, restaurant }) => {
  if (!isOpen) return null;

  return (
    <div className={STYLES.modalOverlay} onClick={onClose}>
      <div className={`${STYLES.modalContent} ${STYLES.modalContentLarge}`} onClick={(e) => e.stopPropagation()}>
        <div className={STYLES.menuHeroImage}>
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className={STYLES.menuImage}
          />
          <div className={STYLES.menuImageOverlay}></div>
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          <div className={STYLES.menuImageContent}>
            <h2 className={STYLES.menuRestaurantName}>{restaurant.name}</h2>
            <p className={STYLES.menuCuisineType}>{restaurant.cuisine}</p>
          </div>
        </div>

        <div className={STYLES.modalBody}>
          <div className={STYLES.menuInfoSection}>
            <div className={STYLES.menuInfoGrid}>
              <div className={STYLES.menuInfoItem}>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                <span className="font-semibold">{restaurant.rating}</span>
              </div>
              <div className={STYLES.menuInfoItem}>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className={STYLES.menuInfoItemText}>{restaurant.deliveryTime}</span>
              </div>
              <div className={STYLES.menuInfoItem}>
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className={STYLES.menuInfoItemText}>{restaurant.priceRange}</span>
              </div>
              <div className={STYLES.menuInfoItem}>
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className={STYLES.menuInfoItemText}>{restaurant.address}</span>
              </div>
            </div>

            {restaurant.offers && (
              <div className={STYLES.menuOfferBanner}>
                <Award className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className={STYLES.menuOfferText}>{restaurant.offers}</span>
              </div>
            )}
          </div>

          <div className={STYLES.modalBodyPadding}>
            <div className={STYLES.menuSection}>
              <h3 className={STYLES.menuSectionTitle}>Available Features</h3>
              <div className={STYLES.menuFeatureGrid}>
                {restaurant.features.map((feature) => (
                  <span key={feature} className={STYLES.menuFeatureTag}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <h3 className={STYLES.menuSectionTitle}>Menu</h3>
            <div className={STYLES.menuCategorySection}>
              {MENU_CONTENT.categories.map((category) => (
                <div key={category.name}>
                  <h4 className={STYLES.menuCategoryTitle}>
                    {category.name}
                  </h4>
                  <div className={STYLES.menuItemList}>
                    {category.items.map((item, index) => (
                      <div key={index} className={STYLES.menuItem}>
                        <div className={STYLES.menuItemContent}>
                          <div className={STYLES.menuItemHeader}>
                            {item.veg ? (
                              <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                            ) : (
                              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                            )}
                            <h5 className={STYLES.menuItemName}>{item.name}</h5>
                          </div>
                          <p className={STYLES.menuItemDescription}>{item.description}</p>
                        </div>
                        <span className={STYLES.menuItemPrice}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const STYLES = {
  container: "min-h-screen bg-gray-50",
  header: "bg-white shadow-sm sticky top-0 z-40",
  searchSection: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8",
  searchWrapper: "flex gap-2 items-center",
  searchInput: "flex-1 relative",
  input: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
  searchIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
  filterButton: "lg:hidden flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors",
  mainContent: "max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8",
  layout: "flex gap-6",
  sidebar: "hidden lg:block w-64 flex-shrink-0",
  sidebarSticky: "sticky top-24 bg-white rounded-lg shadow-sm p-6 overflow-y-auto",
  sidebarHeight: "max-h-[calc(100vh-120px)]",
  restaurantGrid: "flex-1 min-w-0",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  card: "bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer",
  cardImage: "relative h-48 overflow-hidden",
  image: "w-full h-full object-cover transform hover:scale-105 transition-transform duration-300",
  badge: "absolute top-3 left-3 flex flex-wrap gap-2",
  badgeItem: "px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full flex items-center gap-1",
  offerBadge: "absolute bottom-3 left-3 right-3 bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-lg",
  cardContent: "p-4",
  restaurantHeader: "flex justify-between items-start mb-2",
  restaurantName: "text-lg font-bold text-gray-900",
  rating: "flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold",
  cuisine: "text-gray-600 text-sm mb-3",
  infoGrid: "space-y-2",
  infoRow: "flex items-center gap-2 text-sm text-gray-700",
  features: "flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100",
  featureTag: "px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full",
  cardFooter: "px-4 pb-4 flex gap-2",
  bookButton: "flex-1 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm",
  viewMenuButton: "flex-1 py-2.5 border-2 border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors text-sm",
  clearFiltersButton: "text-sm text-orange-600 hover:text-orange-700 font-semibold cursor-pointer",
  resultsCount: "text-sm text-gray-600 mb-4",
  filterSection: "mb-6",
  filterTitle: "text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2",
  filterOptions: "space-y-2",
  checkbox: "flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-orange-600 transition-colors",
  radioInput: "w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500 focus:ring-2",
  checkboxInput: "w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2",
  mobileFilter: "fixed inset-0 bg-black/50 z-50 lg:hidden",
  mobileFilterContent: "absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto",
  mobileFilterHeader: "sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10",
  mobileFilterBody: "p-4",
  applyButton: "sticky bottom-0 bg-white border-t border-gray-200 p-4 z-10",
  button: "w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors",
  desktopApplyButton: "w-full py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors mt-4 sticky bottom-0",
  pagination: "flex items-center justify-center gap-2 mt-8 pb-4",
  paginationButton: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
  paginationButtonActive: "px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors",
  paginationButtonInactive: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
  paginationInfo: "text-sm text-gray-600",
  // Modal Styles
  modalOverlay: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn",
  modalContent: "bg-white rounded-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp",
  modalContentSmall: "max-w-2xl",
  modalContentLarge: "max-w-4xl",
  modalHeader: "sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-start z-10",
  modalTitle: "text-xl sm:text-2xl font-bold text-gray-900",
  modalSubtitle: "text-sm text-gray-600 mt-1",
  modalCloseButton: "p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-4",
  modalBody: "overflow-y-auto max-h-[calc(90vh-80px)]",
  modalBodyPadding: "p-4 sm:p-6",
  // Form Styles
  formGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
  formGroup: "space-y-6",
  formLabel: "block text-sm font-semibold text-gray-900 mb-2",
  formInput: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors",
  formSelect: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors bg-white",
  formTextarea: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-colors",
  formInfoBox: "bg-orange-50 border border-orange-200 rounded-lg p-4",
  formInfoContent: "flex items-start gap-3",
  formInfoTitle: "font-semibold text-gray-900 mb-2",
  formInfoList: "space-y-1 text-sm text-gray-700",
  formActions: "flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6",
  formButtonSecondary: "w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors",
  formButtonPrimary: "w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-sm",
  // Menu Modal Styles
  menuHeroImage: "relative h-40 sm:h-48 md:h-56",
  menuImage: "w-full h-full object-cover",
  menuImageOverlay: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent",
  menuImageContent: "absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4",
  menuRestaurantName: "text-2xl sm:text-3xl font-bold text-white mb-1",
  menuCuisineType: "text-white/90 text-sm",
  menuInfoSection: "p-4 sm:p-6 border-b border-gray-200",
  menuInfoGrid: "flex flex-wrap gap-3 sm:gap-4 mb-4",
  menuInfoItem: "flex items-center gap-2 text-sm sm:text-base",
  menuInfoItemText: "text-gray-600",
  menuOfferBanner: "bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2",
  menuOfferText: "text-sm font-semibold text-orange-900",
  menuSection: "mb-6",
  menuSectionTitle: "text-lg sm:text-xl font-bold text-gray-900 mb-2",
  menuFeatureGrid: "flex flex-wrap gap-2",
  menuFeatureTag: "px-3 py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full",
  menuCategorySection: "space-y-4 sm:space-y-6",
  menuCategoryTitle: "text-base sm:text-lg font-bold text-gray-900 pb-2 border-b-2 border-orange-500 mb-3",
  menuItemList: "space-y-2 sm:space-y-3",
  menuItem: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors",
  menuItemContent: "flex-1",
  menuItemHeader: "flex items-center gap-2 mb-1",
  menuItemName: "font-semibold text-gray-900 text-sm sm:text-base",
  menuItemDescription: "text-xs sm:text-sm text-gray-600",
  menuItemPrice: "font-semibold text-orange-600 whitespace-nowrap text-sm sm:text-base"
};

// Sub-components
const SearchHeader = ({ searchQuery, setSearchQuery, setShowMobileFilter }) => (
  <header className={STYLES.header}>
    <div className={STYLES.searchSection}>
      <div className={STYLES.searchWrapper}>
        <div className={STYLES.searchInput}>
          <Search className={STYLES.searchIcon} />
          <input
            type="text"
            placeholder="Search for restaurants, cuisines, or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={STYLES.input}
          />
        </div>
        <button 
          className={STYLES.filterButton}
          onClick={() => setShowMobileFilter(true)}
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>
    </div>
  </header>
);

const RestaurantCard = ({ restaurant, onBookNow, onViewMenu }) => (
  <div className={STYLES.card}>
    <div className={STYLES.cardImage}>
      <img 
        src={restaurant.image} 
        alt={restaurant.name}
        className={STYLES.image}
      />
      <div className={STYLES.badge}>
        {restaurant.badges.map((badge) => (
          <span key={badge} className={STYLES.badgeItem}>
            {badge === "Pure Veg" && <Leaf className="w-3 h-3 text-green-600" />}
            {badge === "Bestseller" && <Award className="w-3 h-3 text-yellow-600" />}
            {badge === "Trending" && <Flame className="w-3 h-3 text-orange-600" />}
            {badge === "Fast Delivery" && <Clock className="w-3 h-3 text-blue-600" />}
            {badge === "Award Winner" && <Award className="w-3 h-3 text-purple-600" />}
            {badge}
          </span>
        ))}
      </div>
      {restaurant.offers && (
        <div className={STYLES.offerBadge}>
          {restaurant.offers}
        </div>
      )}
    </div>

    <div className={STYLES.cardContent}>
      <div className={STYLES.restaurantHeader}>
        <h3 className={STYLES.restaurantName}>{restaurant.name}</h3>
        <div className={STYLES.rating}>
          <Star className="w-3 h-3 fill-white" />
          {restaurant.rating}
        </div>
      </div>

      <p className={STYLES.cuisine}>{restaurant.cuisine}</p>

      <div className={STYLES.infoGrid}>
        <div className={STYLES.infoRow}>
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{restaurant.address}</span>
        </div>
        <div className={STYLES.infoRow}>
          <Clock className="w-4 h-4 text-gray-500" />
          <span>{restaurant.deliveryTime}</span>
        </div>
        <div className={STYLES.infoRow}>
          <IndianRupee className="w-4 h-4 text-gray-500" />
          <span>{restaurant.priceRange}</span>
        </div>
      </div>

      <div className={STYLES.features}>
        {restaurant.features.slice(0, 3).map((feature) => (
          <span key={feature} className={STYLES.featureTag}>
            {feature}
          </span>
        ))}
      </div>
    </div>

    <div className={STYLES.cardFooter}>
      <button 
        className={STYLES.viewMenuButton}
        onClick={() => onViewMenu(restaurant)}
      >
        View Menu
      </button>
      <button 
        className={STYLES.bookButton}
        onClick={() => onBookNow(restaurant)}
      >
        Book Now
      </button>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={STYLES.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={STYLES.paginationButton}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={STYLES.paginationButtonInactive}
          >
            1
          </button>
          {startPage > 2 && <span className={STYLES.paginationInfo}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            page === currentPage
              ? STYLES.paginationButtonActive
              : STYLES.paginationButtonInactive
          }
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={STYLES.paginationInfo}>...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={STYLES.paginationButtonInactive}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={STYLES.paginationButton}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const FilterSection = ({ filters, toggleFn, setFilters, clearAllFilters, applyFilters, isMobile }) => (
  <>
    {(filters.cuisines.length > 0 || 
      filters.dietary.length > 0 || 
      filters.priceRange.length > 0 || 
      filters.features.length > 0) && (
      <div className="mb-4 pb-4 border-b border-gray-200 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-900">Active Filters</span>
        <button onClick={clearAllFilters} className={STYLES.clearFiltersButton}>
          Clear All
        </button>
      </div>
    )}

    <div className={STYLES.filterSection}>
      <h3 className={STYLES.filterTitle}>
        <SlidersHorizontal className="w-4 h-4" />
        Sort By
      </h3>
      <div className={STYLES.filterOptions}>
        {FILTER_OPTIONS.sortBy.map((option) => (
          <label key={option.value} className={STYLES.checkbox}>
            <input
              type="radio"
              name={isMobile ? "sortByMobile" : "sortBy"}
              value={option.value}
              checked={filters.sortBy === option.value}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className={STYLES.radioInput}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>

    <div className={STYLES.filterSection}>
      <h3 className={STYLES.filterTitle}>
        <Leaf className="w-4 h-4" />
        Dietary Preferences
      </h3>
      <div className={STYLES.filterOptions}>
        {FILTER_OPTIONS.dietaryPreferences.map((option) => {
          const Icon = option.icon;
          return (
            <label key={option.value} className={STYLES.checkbox}>
              <input
                type="checkbox"
                value={option.value}
                checked={filters.dietary.includes(option.value)}
                onChange={() => toggleFn('dietary', option.value)}
                className={STYLES.checkboxInput}
              />
              <Icon className="w-4 h-4" />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>

    <div className={STYLES.filterSection}>
      <h3 className={STYLES.filterTitle}>Cuisines</h3>
      <div className={STYLES.filterOptions}>
        {FILTER_OPTIONS.cuisines.map((cuisine) => (
          <label key={cuisine} className={STYLES.checkbox}>
            <input
              type="checkbox"
              value={cuisine}
              checked={filters.cuisines.includes(cuisine)}
              onChange={() => toggleFn('cuisines', cuisine)}
              className={STYLES.checkboxInput}
            />
            {cuisine}
          </label>
        ))}
      </div>
    </div>

    <div className={STYLES.filterSection}>
      <h3 className={STYLES.filterTitle}>
        <IndianRupee className="w-4 h-4" />
        Price Range
      </h3>
      <div className={STYLES.filterOptions}>
        {FILTER_OPTIONS.priceRange.map((range) => (
          <label key={range.value} className={STYLES.checkbox}>
            <input
              type="checkbox"
              value={range.value}
              checked={filters.priceRange.includes(range.value)}
              onChange={() => toggleFn('priceRange', range.value)}
              className={STYLES.checkboxInput}
            />
            {range.label}
          </label>
        ))}
      </div>
    </div>

    <div className={STYLES.filterSection}>
      <h3 className={STYLES.filterTitle}>Features</h3>
      <div className={STYLES.filterOptions}>
        {FILTER_OPTIONS.features.map((feature) => (
          <label key={feature} className={STYLES.checkbox}>
            <input
              type="checkbox"
              value={feature}
              checked={filters.features.includes(feature)}
              onChange={() => toggleFn('features', feature)}
              className={STYLES.checkboxInput}
            />
            {feature}
          </label>
        ))}
      </div>
    </div>

    {!isMobile && (
      <button 
        className={STYLES.desktopApplyButton}
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    )}
  </>
);

export default function RestaurantPage() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    sortBy: "relevance",
    cuisines: [],
    dietary: [],
    priceRange: [],
    features: []
  });
  const [tempFilters, setTempFilters] = useState({
    sortBy: "relevance",
    cuisines: [],
    dietary: [],
    priceRange: [],
    features: []
  });
  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: "relevance",
    cuisines: [],
    dietary: [],
    priceRange: [],
    features: []
  });

  const filteredRestaurants = RESTAURANTS.filter((restaurant) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.address.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    if (appliedFilters.cuisines.length > 0) {
      const restaurantCuisines = restaurant.cuisine.toLowerCase();
      const matchesCuisine = appliedFilters.cuisines.some(
        cuisine => restaurantCuisines.includes(cuisine.toLowerCase())
      );
      if (!matchesCuisine) return false;
    }

    if (appliedFilters.dietary.length > 0) {
      if (appliedFilters.dietary.includes('veg')) {
        if (!restaurant.badges.includes('Pure Veg')) return false;
      }
    }

    if (appliedFilters.priceRange.length > 0) {
      const price = parseInt(restaurant.priceRange.match(/\d+/)[0]);
      const matchesPrice = appliedFilters.priceRange.some(range => {
        if (range === 'budget' && price < 300) return true;
        if (range === 'moderate' && price >= 300 && price <= 500) return true;
        if (range === 'premium' && price > 500) return true;
        return false;
      });
      if (!matchesPrice) return false;
    }

    if (appliedFilters.features.length > 0) {
      const matchesFeatures = appliedFilters.features.every(
        feature => restaurant.features.includes(feature)
      );
      if (!matchesFeatures) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (appliedFilters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'priceLow':
        return parseInt(a.priceRange.match(/\d+/)[0]) - parseInt(b.priceRange.match(/\d+/)[0]);
      case 'priceHigh':
        return parseInt(b.priceRange.match(/\d+/)[0]) - parseInt(a.priceRange.match(/\d+/)[0]);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  const toggleTempFilter = (category, value) => {
    setTempFilters(prev => {
      const currentFilters = prev[category];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value]
        };
      }
    });
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[category];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value]
        };
      }
    });
  };

  const applyMobileFilters = () => {
    setAppliedFilters(tempFilters);
    setShowMobileFilter(false);
    setCurrentPage(1);
  };

  const applyDesktopFilters = () => {
    setAppliedFilters(selectedFilters);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      sortBy: "relevance",
      cuisines: [],
      dietary: [],
      priceRange: [],
      features: []
    });
    setTempFilters({
      sortBy: "relevance",
      cuisines: [],
      dietary: [],
      priceRange: [],
      features: []
    });
    setAppliedFilters({
      sortBy: "relevance",
      cuisines: [],
      dietary: [],
      priceRange: [],
      features: []
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReservationModal(true);
  };

  const handleViewMenu = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenuModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
    setSelectedRestaurant(null);
  };

  const closeMenuModal = () => {
    setShowMenuModal(false);
    setSelectedRestaurant(null);
  };

  return (
    <div className={STYLES.container}>
      <SearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowMobileFilter={setShowMobileFilter}
      />

      <main className={STYLES.mainContent}>
        <div className={STYLES.layout}>
          <aside className={STYLES.sidebar}>
            <div className={`${STYLES.sidebarSticky} ${STYLES.sidebarHeight}`}>
              <FilterSection
                filters={selectedFilters}
                toggleFn={toggleFilter}
                setFilters={setSelectedFilters}
                clearAllFilters={clearAllFilters}
                applyFilters={applyDesktopFilters}
                isMobile={false}
              />
            </div>
          </aside>

          <div className={STYLES.restaurantGrid}>
            <p className={STYLES.resultsCount}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredRestaurants.length)} of {filteredRestaurants.length} restaurants
            </p>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No restaurants found matching your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={STYLES.grid}>
                  {currentRestaurants.map((restaurant) => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant}
                      onBookNow={handleBookNow}
                      onViewMenu={handleViewMenu}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {showMobileFilter && (
        <div className={STYLES.mobileFilter} onClick={() => setShowMobileFilter(false)}>
          <div className={STYLES.mobileFilterContent} onClick={(e) => e.stopPropagation()}>
            <div className={STYLES.mobileFilterHeader}>
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className={STYLES.mobileFilterBody}>
              <FilterSection
                filters={tempFilters}
                toggleFn={toggleTempFilter}
                setFilters={setTempFilters}
                clearAllFilters={clearAllFilters}
                applyFilters={applyMobileFilters}
                isMobile={true}
              />
            </div>

            <div className={STYLES.applyButton}>
              <button 
                className={STYLES.button}
                onClick={applyMobileFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRestaurant && (
        <>
          <ReservationModal
            isOpen={showReservationModal}
            onClose={closeReservationModal}
            restaurant={selectedRestaurant}
          />
          <MenuModal
            isOpen={showMenuModal}
            onClose={closeMenuModal}
            restaurant={selectedRestaurant}
          />
        </>
      )}
    </div>
  );
}