import { Leaf, Flame } from 'lucide-react';


// section: 1
// Restaurant hero section
export const heroContent = {
    title: "Restaurant",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis cumque reprehenderit mollitia tempore dolorem ab.",
}

// section: 2
// Restaurant filter section
export const restaurantFilterContent = {
    // Filter Options
  filterOptions: {
    filterButton: {
      text: "Filter",
      mobileText: "Filters"
    },
    
    // Sort Options
    sortBy: [
      { value: "relevance", label: "Relevance" },
      { value: "rating", label: "Rating: High to Low" },
      { value: "deliveryTime", label: "Delivery Time" },
      { value: "priceLow", label: "Price: Low to High" },
      { value: "priceHigh", label: "Price: High to Low" }
    ],
    
    // Cuisine Filters
    // NOTE: These are common cuisines. Backend can provide more specific options.
    cuisines: [
      "North Indian",
      "South Indian", 
      "Chinese",
      "Biryani",
      "Punjabi",
      "Mughlai",
      "Seafood",
      "Kerala",
      "Continental",
      "Italian",
      "Mexican",
      "Thai",
      "Japanese",
      "Fast Food",
      "Desserts",
      "Bakery"
    ],
    
    // Dietary Preferences
    dietaryPreferences: [
      { value: "veg", label: "Pure Veg", icon: Leaf },
      { value: "nonveg", label: "Non-Veg", icon: Flame }
    ],
    
    // Price Range Filters
    priceRange: [
      { value: "budget", label: "Under ₹300", min: 0, max: 300 },
      { value: "moderate", label: "₹300 - ₹500", min: 300, max: 500 },
      { value: "premium", label: "Above ₹500", min: 500, max: 99999 }
    ],
    
    // Feature Filters
    features: [
      "Home Delivery",
      "Takeaway", 
      "Outdoor Seating",
      "AC",
      "WiFi",
      "Parking",
      "Late Night",
      "Live Music",
      "Bar Available",
      "Valet",
      "Family Dining",
      "Pet Friendly",
      "Wheelchair Accessible",
      "Private Dining"
    ]
  },

  // Reservation Form Content
  reservationFormContent: {
    title: "Book a Table",
    subtitle: "Reserve your dining experience",
    
    fields: {
      // Customer Information
      name: { 
        label: "Full Name", 
        placeholder: "Enter your full name", 
        required: true,
        type: "text",
        minLength: 2,
        maxLength: 100
      },
      email: { 
        label: "Email Address", 
        placeholder: "your@email.com", 
        required: true,
        type: "email"
      },
      phone: { 
        label: "Phone Number", 
        placeholder: "+91 00000 00000", 
        required: true,
        type: "tel"
      },
      
      // Booking Details
      guests: { 
        label: "Number of Guests", 
        required: true,
        type: "select",
        min: 1,
        max: 50
      },
      date: { 
        label: "Reservation Date", 
        required: true,
        type: "date"
      },
      time: { 
        label: "Preferred Time", 
        required: true,
        type: "select"
      },
      tableType: {
        label: "Table Preference",
        required: false,
        type: "select"
      },
      occasion: {
        label: "Occasion",
        required: false,
        type: "select"
      },
      
      // Special Requirements
      dietaryRestrictions: {
        label: "Dietary Restrictions",
        required: false,
        type: "multiselect"
      },
      specialRequests: { 
        label: "Special Requests", 
        placeholder: "Any dietary restrictions, occasion details, or seating preferences...", 
        required: false,
        type: "textarea",
        maxLength: 500
      }
    },
    
    // Guest Options (1-10 for UI, but backend supports up to 50)
    guestOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    
    // Time Slots (24-hour format HH:MM)
    timeSlots: [
      { value: "11:00", label: "11:00 AM" },
      { value: "11:30", label: "11:30 AM" },
      { value: "12:00", label: "12:00 PM" },
      { value: "12:30", label: "12:30 PM" },
      { value: "13:00", label: "1:00 PM" },
      { value: "13:30", label: "1:30 PM" },
      { value: "14:00", label: "2:00 PM" },
      { value: "14:30", label: "2:30 PM" },
      { value: "18:00", label: "6:00 PM" },
      { value: "18:30", label: "6:30 PM" },
      { value: "19:00", label: "7:00 PM" },
      { value: "19:30", label: "7:30 PM" },
      { value: "20:00", label: "8:00 PM" },
      { value: "20:30", label: "8:30 PM" },
      { value: "21:00", label: "9:00 PM" },
      { value: "21:30", label: "9:30 PM" },
      { value: "22:00", label: "10:00 PM" },
      { value: "22:30", label: "10:30 PM" },
      { value: "23:00", label: "11:00 PM" }
    ],
    
    // Table Type Options
    tableTypes: [
      { value: "Standard", label: "Standard Table" },
      { value: "Window", label: "Window Seat" },
      { value: "Outdoor", label: "Outdoor Seating" },
      { value: "Private", label: "Private Room" },
      { value: "Bar", label: "Bar Counter" },
      { value: "VIP", label: "VIP Section" }
    ],
    
    // Occasion Options
    occasions: [
      { value: "Regular", label: "Regular Dining" },
      { value: "Birthday", label: "Birthday Celebration" },
      { value: "Anniversary", label: "Anniversary" },
      { value: "Business Meeting", label: "Business Meeting" },
      { value: "Date", label: "Date Night" },
      { value: "Family Gathering", label: "Family Gathering" },
      { value: "Celebration", label: "Special Celebration" },
      { value: "Other", label: "Other" }
    ],
    
    // Dietary Restriction Options
    dietaryRestrictions: [
      { value: "None", label: "No Restrictions" },
      { value: "Vegetarian", label: "Vegetarian" },
      { value: "Vegan", label: "Vegan" },
      { value: "Gluten-Free", label: "Gluten-Free" },
      { value: "Dairy-Free", label: "Dairy-Free" },
      { value: "Nut Allergy", label: "Nut Allergy" },
      { value: "Seafood Allergy", label: "Seafood Allergy" }
    ],
    
    // Important Information
    importantInfo: {
      title: "Important Information",
      points: [
        "Please arrive 10 minutes before your reservation time",
        "Reservations are held for 15 minutes past the booking time",
        "For groups larger than 10 guests, please call the restaurant directly",
        "Cancellations must be made at least 24 hours in advance",
        "Special dietary requirements should be mentioned in advance"
      ]
    },
    
    // Button Labels
    buttons: {
      cancel: "Cancel",
      confirm: "Confirm Reservation",
      submitting: "Processing..."
    },
    
    // Success Message
    successMessage: {
      title: "Reservation Confirmed!",
      message: "Your table has been successfully reserved. You will receive a confirmation email shortly."
    },
    
    // Error Messages
    errorMessages: {
      general: "Failed to create booking. Please try again.",
      validation: "Please check all required fields.",
      network: "Network error. Please check your connection."
    }
  },

  // View Menu Content (Categories are fetched dynamically from backend)
  viewMenuContent: {
    title: "Menu",
    searchPlaceholder: "Search menu items...",
    allItemsLabel: "All Items",
    
    // Filter Labels
    filters: {
      all: "All Items",
      veg: "Vegetarian",
      nonVeg: "Non-Vegetarian",
      popular: "Popular",
      new: "New Items"
    },
    
    // Empty States
    emptyStates: {
      noMenu: {
        title: "Menu Not Available",
        message: "This restaurant hasn't added their menu yet. Please check back later or call the restaurant directly."
      },
      noResults: {
        title: "No Items Found",
        message: "We couldn't find any items matching your search. Try adjusting your filters."
      },
      loading: {
        message: "Loading menu items..."
      }
    },
    
    // Item Display
    itemLabels: {
      price: "Price",
      addToCart: "Add to Cart",
      unavailable: "Currently Unavailable",
      veg: "Vegetarian",
      nonVeg: "Non-Vegetarian",
      contains: "Contains",
      spicyLevel: "Spice Level"
    }
  },

  // Search Configuration
  search: {
    placeholder: "Search restaurants, cuisines...",
    noResultsMessage: "No restaurants found matching your search.",
    minCharacters: 2,
    debounceMs: 300
  },

  // Pagination
  pagination: {
    showingText: "Showing",
    ofText: "of",
    restaurantsText: "restaurants",
    pageText: "Page",
    resultsPerPage: 9
  },

  // Empty State Messages
  emptyStates: {
    noRestaurants: {
      title: "No Restaurants Available",
      message: "We couldn't find any restaurants. Please check back later.",
      action: "Refresh"
    },
    noResults: {
      title: "No Results Found",
      message: "We couldn't find any restaurants matching your filters.",
      action: "Clear Filters"
    },
    error: {
      title: "Something Went Wrong",
      message: "We encountered an error loading restaurants. Please try again.",
      action: "Retry"
    }
  },

  // Loading Messages
  loadingMessages: {
    restaurants: "Loading restaurants...",
    menu: "Loading menu...",
    booking: "Processing your reservation..."
  }
}

