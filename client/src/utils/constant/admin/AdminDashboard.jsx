import { ShoppingBag, Coffee, Home, Bell, LogOut, Key, UserCircle, UtensilsCrossed, IndianRupee, ShoppingCart, Users, CheckCircle, Clock, AlertCircle, XCircle, Package, ForkKnifeCrossedIcon, Building2, Search } from 'lucide-react';

// Top navbar content
export const headerContent = {
    logo: "GoYum",
    userGreeting: "Hello, TMJK",
    searchPlaceholder: "Search here",
    navLinks: [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Orders", href: "/admin/orders" },
        { label: "Tools", href: "#"},
        { label: "Help", href: "#" }
    ],
    notifications: [
        { icon: Bell, badge: "12", color: "amber", isAlert: false },
        // { icon: Settings, badge: "!", color: "orange", isAlert: true }
    ],
    profileMenu: [
        { id: 'profile', label: 'View Profile', icon: UserCircle },
        { id: 'password', label: 'Change Password', icon: Key },
        { id: 'logout', label: 'Logout', icon: LogOut }
    ]
}

// Sidebar content
export const sidebarContent = {
    logoText: "Let's GoYum",
    logo: (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="30" 
      height="30" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className='text-gray-600'
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
      <path d="M7.5 4.21v.01" /><path d="M4.21 7.5v.01" />
      <path d="M3 12v.01" /><path d="M4.21 16.5v.01" />
      <path d="M7.5 19.79v.01" /><path d="M12 21v.01" />
      <path d="M16.5 19.79v.01" /><path d="M19.79 16.5v.01" />
      <path d="M21 12v.01" /><path d="M19.79 7.5v.01" />
      <path d="M16.5 4.21v.01" /><path d="M12 3v.01" />
    </svg>
  ),
    menuItems: [
    {
        id: 1,
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: Home,
    },
    {
        id: 2,
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        badge: "25",
    },
    {
        id: 3,
        label: "Add Foods",
        icon: ForkKnifeCrossedIcon,
        href:"/admin/add_foods",
        // hasSubmenu: false,
        submenu: [
        { label: "All Menus", href: "/admin/menus" },
        { label: "Add Menu", href: "/admin/menus/add" },
        ],
    },
    {
        id: 4,
        label: "Add Restaurants",
        icon: Building2,
        href: "/admin/add_restaurant",
        // hasSubmenu: false,
        submenu: [
        { label: "Add New", href: "/admin/customers/add" },
        { label: "Members", href: "/admin/customers/members" },
        { label: "General", href: "/admin/customers/general" },
        ],
    },
    {
        id: 5,
        label: "Customers",
        icon: Users,
        href:"customers",
        // hasSubmenu: false,
        submenu: [
        { label: "Add New", href: "/admin/customers/add" },
        { label: "Members", href: "/admin/customers/members" },
        { label: "General", href: "/admin/customers/general" },
        ],
    },
    ],

}

// Dashboard page content
export const dashboardContent = {
  header: {
    title: "Welcome to",
    highlightText: "Admin Dashboard",
  },
  stats: [
    { label: 'Total Menus', value: '2,947', change: '+12.5%', isPositive: true, icon: UtensilsCrossed, gradient: 'bg-amber-400' },
    { label: 'Total Orders', value: '1,432', change: '-3.1%', isPositive: false, icon: ShoppingCart, gradient: 'bg-blue-400' },
    { label: 'Total Customers', value: '3,892', change: '+15.3%', isPositive: true, icon: Users, gradient: 'bg-pink-400' },
    { label: 'Total Revenue', value: '$45.2K', change: '+8.2%', isPositive: true, icon: IndianRupee, gradient: 'bg-emerald-400' },
  ],
  performanceMetrics: {
    staticContent: {
      title: "Performance Metrics",
      selectOption: [
        { id: 1, optionValue: 'daily', option: 'Daily'},
        { id: 2, optionValue: 'weekly', option: 'Weekly'},
        { id: 3, optionValue: 'monthly', option: 'Monthly'},
        { id: 4, optionValue: 'yearly', option: 'Yearly'},
      ], 
    },
    daily: [
      { label: 'Total Orders', percentage: 75, color: '#f59e0b', indicator: "bg-orange-300" },
      { label: 'Customer Growth', percentage: 60, color: '#10b981', indicator: "bg-emerald-400" },
      { label: 'Total Revenue', percentage: 85, color: '#3b82f6', indicator: "bg-blue-600" }
    ],
    weekly: [
      { label: 'Total Orders', percentage: 82, color: '#f59e0b' },
      { label: 'Customer Growth', percentage: 68, color: '#10b981' },
      { label: 'Total Revenue', percentage: 90, color: '#3b82f6' }
    ],
    monthly: [
      { label: 'Total Orders', percentage: 88, color: '#f59e0b' },
      { label: 'Customer Growth', percentage: 75, color: '#10b981' },
      { label: 'Total Revenue', percentage: 92, color: '#3b82f6' }
    ],
    yearly: [
      { label: 'Total Orders', percentage: 95, color: '#f59e0b' },
      { label: 'Customer Growth', percentage: 85, color: '#10b981' },
      { label: 'Total Revenue', percentage: 98, color: '#3b82f6' }
    ]
  },
  weeklyOrders: {
    staticContent: {
      title: "Orders Analytics",
      selectOption: [
        { id: 1, optionValue: 'daily', option: 'Daily'},
        { id: 2, optionValue: 'weekly', option: 'Weekly'},
        { id: 3, optionValue: 'monthly', option: 'Monthly'},
        { id: 4, optionValue: 'yearly', option: 'Yearly'},
      ], 
    },
    daily: [
      { day: 'Mon', orders: 15 }, { day: 'Tue', orders: 18 }, { day: 'Wed', orders: 22 },
      { day: 'Thu', orders: 19 }, { day: 'Fri', orders: 25 }, { day: 'Sat', orders: 28 }, { day: 'Sun', orders: 20 }
    ],
    weekly: [
      { day: 'Week 1', orders: 145 }, { day: 'Week 2', orders: 178 }, { day: 'Week 3', orders: 165 },
      { day: 'Week 4', orders: 192 }
    ],
    monthly: [
      { day: 'Jan', orders: 645 }, { day: 'Feb', orders: 578 }, { day: 'Mar', orders: 720 },
      { day: 'Apr', orders: 692 }, { day: 'May', orders: 810 }, { day: 'Jun', orders: 765 }
    ],
    yearly: [
      { day: '2021', orders: 7845 }, { day: '2022', orders: 8920 }, { day: '2023', orders: 9650 },
      { day: '2024', orders: 10240 }
    ]
  },
  revenueComparison: {
    staticContent: {
      title: "Revenue Comparison",
      selectOption: [
        { id: 1, optionValue: 'monthly', option: 'Monthly'},
        { id: 2, optionValue: 'quarterly', option: 'Quarterly'},
        { id: 3, optionValue: 'yearly', option: 'Yearly'},
      ], 
    },
    monthly: [
      { month: 'Jan', year2020: 4000, year2021: 2400 }, { month: 'Feb', year2020: 3000, year2021: 1398 },
      { month: 'Mar', year2020: 2000, year2021: 9800 }, { month: 'Apr', year2020: 2780, year2021: 3908 },
      { month: 'May', year2020: 1890, year2021: 4800 }, { month: 'Jun', year2020: 2390, year2021: 3800 },
      { month: 'Jul', year2020: 3490, year2021: 4300 }, { month: 'Aug', year2020: 3490, year2021: 5200 },
      { month: 'Sep', year2020: 2000, year2021: 4100 }, { month: 'Oct', year2020: 3200, year2021: 4800 },
      { month: 'Nov', year2020: 4100, year2021: 5300 }, { month: 'Dec', year2020: 4500, year2021: 6000 }
    ],
    quarterly: [
      { month: 'Q1', year2020: 9000, year2021: 13598 }, { month: 'Q2', year2020: 7060, year2021: 12508 },
      { month: 'Q3', year2020: 8980, year2021: 13600 }, { month: 'Q4', year2020: 11800, year2021: 16100 }
    ],
    yearly: [
      { month: '2018', year2020: 32000, year2021: 28000 }, { month: '2019', year2020: 35000, year2021: 38000 },
      { month: '2020', year2020: 36840, year2021: 42000 }, { month: '2021', year2020: 40000, year2021: 55806 }
    ]
  },
  customerMap: {
    staticContent: {
      title: "Customer Map",
      selectOption: [
        { id: 1, optionValue: 'weekly', option: 'Weekly'},
        { id: 2, optionValue: 'monthly', option: 'Monthly'},
        { id: 3, optionValue: 'yearly', option: 'Yearly'},
      ], 
    },
    weekly: [
      { week: 'Week 1', customers: 420 }, { week: 'Week 2', customers: 380 },
      { week: 'Week 3', customers: 550 }, { week: 'Week 4', customers: 490 }
    ],
    monthly: [
      { week: 'Jan', customers: 1820 }, { week: 'Feb', customers: 1680 }, { week: 'Mar', customers: 2150 },
      { week: 'Apr', customers: 1990 }, { week: 'May', customers: 2340 }, { week: 'Jun', customers: 2180 }
    ],
    yearly: [
      { week: '2021', customers: 18420 }, { week: '2022', customers: 22380 },
      { week: '2023', customers: 25550 }, { week: '2024', customers: 28490 }
    ]
  }
}

// Order page content 
export const ordersContent = {
  header: {
    title: "Orders Management",
    subtitle: "Manage and track all customer orders",
    addButtonText: "Add Order",
  },
  
  tableHeaders: [
    { id: 'select', label: '', width: 'w-12' },
    { id: 'orderId', label: 'Order ID', sortable: true },
    { id: 'customer', label: 'Customer', sortable: true },
    { id: 'orderDate', label: 'Order Date', sortable: true },
    { id: 'amount', label: 'Amount', sortable: true },
    { id: 'orderStatus', label: 'Order Status', sortable: true },
    { id: 'paymentStatus', label: 'Payment Status', sortable: true },
    { id: 'actions', label: 'Actions', width: 'w-32' }
  ],

  orderStatuses: [
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    { value: 'onHold', label: 'On Hold', color: 'bg-orange-100 text-orange-700', icon: AlertCircle },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: XCircle }
  ],

  paymentStatuses: [
    { value: 'paid', label: 'Paid', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
    { value: 'unpaid', label: 'Unpaid', color: 'bg-gray-100 text-gray-700', icon: Clock },
    { value: 'refunded', label: 'Refunded', color: 'bg-blue-100 text-blue-700', icon: IndianRupee }
  ],

  foodItems: [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza' },
    { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'Pizza' },
    { id: 3, name: 'Chicken Burger', price: 9.99, category: 'Burger' },
    { id: 4, name: 'Veggie Burger', price: 8.99, category: 'Burger' },
    { id: 5, name: 'Caesar Salad', price: 7.99, category: 'Salad' },
    { id: 6, name: 'French Fries', price: 4.99, category: 'Sides' },
    { id: 7, name: 'Chicken Wings', price: 11.99, category: 'Appetizer' },
    { id: 8, name: 'Pasta Carbonara', price: 13.99, category: 'Pasta' },
    { id: 9, name: 'Sushi Roll', price: 15.99, category: 'Japanese' },
    { id: 10, name: 'Pad Thai', price: 12.99, category: 'Thai' }
  ],

  filterOptions: {
    orderStatus: {
      label: 'Order Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'success', label: 'Success' },
        { value: 'pending', label: 'Pending' },
        { value: 'onHold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    paymentStatus: {
      label: 'Payment Status',
      options: [
        { value: 'all', label: 'All Payments' },
        { value: 'paid', label: 'Paid' },
        { value: 'unpaid', label: 'Unpaid' },
        { value: 'refunded', label: 'Refunded' }
      ]
    },
    dateRange: {
      label: 'Date Range',
      options: [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
      ]
    }
  },

  modalContent: {
    add: {
      title: 'Add New Order',
      submitButton: 'Create Order',
      cancelButton: 'Cancel'
    },
    edit: {
      title: 'Edit Order',
      submitButton: 'Update Order',
      cancelButton: 'Cancel'
    },
    view: {
      title: 'Order Details',
      closeButton: 'Close'
    },
    delete: {
      title: 'Delete Order',
      message: 'Are you sure you want to delete this order? This action cannot be undone.',
      confirmButton: 'Delete',
      cancelButton: 'Cancel'
    }
  },

  formFields: {
    customerName: {
      label: 'Customer Name',
      placeholder: 'Enter customer name',
      required: true
    },
    phoneNumber: {
      label: 'Phone Number',
      placeholder: '+1 (555) 000-0000',
      required: true
    },
    deliveryAddress: {
      label: 'Delivery Address',
      placeholder: 'Enter full delivery address',
      required: true
    },
    foodItems: {
      label: 'Food Items',
      placeholder: 'Select food items',
      required: true
    },
    orderStatus: {
      label: 'Order Status',
      required: true
    },
    paymentStatus: {
      label: 'Payment Status',
      required: true
    },
    notes: {
      label: 'Order Notes',
      placeholder: 'Additional notes (optional)',
      required: false
    }
  },

  emptyState: {
    title: 'No Orders Found',
    message: 'There are no orders matching your filters. Try adjusting your search criteria.',
    icon: Package
  },

  pagination: {
    rowsPerPageLabel: 'Rows per page:',
    rowsPerPageOptions: [10, 25, 50, 100],
    ofLabel: 'of'
  },

  stats: [
    { label: 'Total Orders', value: '1,432', change: '+8.2%', isPositive: true, icon: Package, gradient: 'bg-blue-400' },
    { label: 'Pending Orders', value: '284', change: '-3.1%', isPositive: false, icon: Clock, gradient: 'bg-yellow-400' },
    { label: 'Completed Today', value: '147', change: '+15.3%', isPositive: true, icon: CheckCircle, gradient: 'bg-green-400' },
    { label: 'Revenue Today', value: '$5.2K', change: '+12.5%', isPositive: true, icon: IndianRupee, gradient: 'bg-emerald-400' }
  ],

  // Sample orders data structure
  sampleOrders: [
    {
      id: 'ORD-2024-001',
      customerName: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Apt 4B, New York, NY 10001',
      orderDate: '2024-01-02T10:30:00',
      items: [
        { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
        { id: 6, name: 'French Fries', price: 4.99, quantity: 1 }
      ],
      subtotal: 30.97,
      tax: 2.79,
      deliveryFee: 5.00,
      total: 38.76,
      orderStatus: 'success',
      paymentStatus: 'paid',
      notes: 'Please ring doorbell'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'Sarah Smith',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      orderDate: '2024-01-02T11:15:00',
      items: [
        { id: 3, name: 'Chicken Burger', price: 9.99, quantity: 1 },
        { id: 7, name: 'Chicken Wings', price: 11.99, quantity: 1 }
      ],
      subtotal: 21.98,
      tax: 1.98,
      deliveryFee: 4.00,
      total: 27.96,
      orderStatus: 'pending',
      paymentStatus: 'unpaid',
      notes: ''
    }
  ]
};

// Restaurant content
export const restaurantContent = {
  titles: {
    main: "Restaurant Management",
    subtitle: "Manage your restaurant listings",
    addRestaurant: "Add Restaurant",
    newRestaurant: "Add New Restaurant",
    editRestaurant: "Edit Restaurant",
    restaurantDetails: "Restaurant Details",
    noRestaurants: "No restaurants found",
    noRestaurantsDesc: "Try adjusting your search or filter criteria",
    searchPlaceholder: "Search by restaurant name or city...",
    showingRestaurants: "Showing {current} to {end} of {total} restaurants",
    filters: "Filters",
    icons: { search: Search }
  },
  
  labels: {
    basicInfo: "Basic Information",
    restaurantName: "Restaurant Name",
    contactPerson: "Contact Person",
    phoneNumber: "Phone Number",
    email: "Email",
    location: "Location",
    address: "Address",
    city: "City",
    cuisineTypes: "Cuisine Types",
    operatingHours: "Operating Hours",
    openingTime: "Opening Time",
    closingTime: "Closing Time",
    pricingDelivery: "Pricing & Delivery",
    priceRange: "Price Range",
    deliveryTime: "Delivery Time",
    deliveryAvailable: "Delivery Available",
    additionalInfo: "Additional Information",
    status: "Status",
    rating: "Rating",
    offers: "Offers",
    badges: "Badges",
    features: "Features",
    description: "Description",
    restaurantImage: "Restaurant Image",
    uploadImage: "Upload Image",
    imageRequirements: "PNG, JPG up to 5MB",
    phonePlaceholder: "+91 00000 00000",
    pricePlaceholder: "₹300 for two",
    deliveryTimePlaceholder: "30-35 mins",
    offersPlaceholder: "50% off up to ₹100"
  },
  
  buttons: {
    cancel: "Cancel",
    add: "Add Restaurant",
    update: "Update Restaurant",
    close: "Close",
    edit: "Edit",
    view: "View",
    delete: "Delete",
    upload: "Upload Image",
    applyFilters: "Apply Filters",
    resetFilters: "Reset Filters"
  },
  
  filters: {
    allStatus: "All Status",
    allCuisines: "All Cuisines",
    allPrices: "All Prices",
    deliveryStatus: "Delivery Status",
    available: "Available",
    notAvailable: "Not Available",
    under300: "Under ₹300",
    moderate: "₹300 - ₹500",
    premium: "Above ₹500"
  },
  
  status: {
    active: "Active",
    inactive: "Inactive",
    closed: "Closed"
  },
  
  validation: {
    required: "is required",
    invalidPhone: "Invalid phone format",
    invalidEmail: "Invalid email format",
    selectCuisine: "Select at least one cuisine",
    fileSize: "File size should be less than 5MB",
    imageType: "Please upload an image file"
  },
  
  confirmations: {
    delete: "Are you sure you want to delete this restaurant?"
  },

  options: {
    cuisine: [
        "North Indian", "South Indian", "Chinese", "Biryani", "Punjabi", 
        "Mughlai", "Seafood", "Kerala", "Italian", "Continental", 
        "Japanese", "Sushi", "American", "Fast Food", "Cafe", 
        "Healthy", "Street Food", "Asian"
    ],
    features: [
        "Home Delivery", "Takeaway", "Outdoor Seating", "AC", "WiFi", 
        "Parking", "Late Night", "Bar Available", "Valet", "Live Music", 
        "Eco-Friendly", "Contactless Delivery", "Catering", "Family Dining", 
        "Breakfast Specials"
    ],
    badges: [
        "Pure Veg", "Bestseller", "Fast Delivery", "Trending", "Award Winner"
    ]
  },
  restaurantData: [
    {
      id: 1, name: "Spice Garden", contactPerson: "Rajesh Kumar", phone: "+91 98765 43210",
      email: "contact@spicegarden.com", rating: 4.5, cuisine: ["North Indian", "Mughlai"],
      address: "MG Road, Bangalore", city: "Bangalore", deliveryTime: "30-35 mins",
      priceRange: "₹300 for two", offers: "50% off up to ₹100", badges: ["Pure Veg", "Bestseller"],
      features: ["Outdoor Seating", "Home Delivery", "Takeaway"], openingTime: "11:00",
      closingTime: "23:00", deliveryAvailable: true, status: "Active",
      description: "Authentic North Indian cuisine with traditional recipes", image: null
    },
    {
      id: 2, name: "Masala Darbar", contactPerson: "Priya Sharma", phone: "+91 98765 43211",
      email: "info@masaladarbar.com", rating: 4.2, cuisine: ["South Indian", "Chinese"],
      address: "Indiranagar, Bangalore", city: "Bangalore", deliveryTime: "25-30 mins",
      priceRange: "₹250 for two", offers: "Free delivery on orders above ₹199",
      badges: ["Fast Delivery"], features: ["AC", "WiFi", "Parking"], openingTime: "09:00",
      closingTime: "22:00", deliveryAvailable: true, status: "Active",
      description: "Multi-cuisine restaurant with fast service", image: null
    },
    {
      id: 3, name: "Royal Biryani House", contactPerson: "Mohammed Ali", phone: "+91 98765 43212",
      email: "royal@biryani.com", rating: 4.7, cuisine: ["Biryani", "Hyderabadi"],
      address: "Koramangala, Bangalore", city: "Bangalore", deliveryTime: "35-40 mins",
      priceRange: "₹400 for two", offers: "₹125 off on orders above ₹499",
      badges: ["Bestseller", "Trending"], features: ["Family Dining", "Late Night", "Catering"],
      openingTime: "12:00", closingTime: "01:00", deliveryAvailable: true, status: "Active",
      description: "Famous for authentic Hyderabadi Biryani", image: null
    },
    {
      id: 4, name: "Curry Leaf Express", contactPerson: "Suresh Nair", phone: "+91 98765 43213",
      email: "curry@leaf.com", rating: 4.0, cuisine: ["Kerala", "Seafood"],
      address: "HSR Layout, Bangalore", city: "Bangalore", deliveryTime: "40-45 mins",
      priceRange: "₹350 for two", offers: "10% off on all orders", badges: [],
      features: ["Contactless Delivery", "Eco-Friendly"], openingTime: "11:30",
      closingTime: "22:30", deliveryAvailable: true, status: "Active",
      description: "Traditional Kerala cuisine and fresh seafood", image: null
    },
    {
      id: 5, name: "Tandoor Junction", contactPerson: "Harpreet Singh", phone: "+91 98765 43214",
      email: "tandoor@junction.com", rating: 4.4, cuisine: ["Punjabi", "Tandoor"],
      address: "Whitefield, Bangalore", city: "Bangalore", deliveryTime: "30-35 mins",
      priceRange: "₹450 for two", offers: "Buy 1 Get 1 on selected items",
      badges: ["Award Winner"], features: ["Live Music", "Bar Available", "Valet"],
      openingTime: "12:00", closingTime: "23:30", deliveryAvailable: true, status: "Active",
      description: "Premium Punjabi dining experience", image: null
    },
    {
      id: 6, name: "Dosa Palace", contactPerson: "Venkatesh Iyer", phone: "+91 98765 43215",
      email: "dosa@palace.com", rating: 4.3, cuisine: ["South Indian", "Breakfast"],
      address: "Jayanagar, Bangalore", city: "Bangalore", deliveryTime: "20-25 mins",
      priceRange: "₹200 for two", offers: "Free dessert on orders above ₹299",
      badges: ["Pure Veg", "Fast Delivery"], features: ["Breakfast Specials", "Filter Coffee"],
      openingTime: "07:00", closingTime: "22:00", deliveryAvailable: true, status: "Active",
      description: "Best South Indian breakfast in town", image: null
    },
    {
      id: 7, name: "Dragon Wok", contactPerson: "Chen Wei", phone: "+91 98765 43216",
      email: "dragon@wok.com", rating: 4.1, cuisine: ["Chinese", "Asian"],
      address: "MG Road, Bangalore", city: "Bangalore", deliveryTime: "35-40 mins",
      priceRange: "₹380 for two", offers: "20% off on weekdays", badges: ["Trending"],
      features: ["AC", "Home Delivery", "Takeaway"], openingTime: "11:00",
      closingTime: "23:00", deliveryAvailable: true, status: "Active",
      description: "Authentic Chinese and Asian cuisine", image: null
    },
    {
      id: 8, name: "Pizza Fiesta", contactPerson: "Marco Rossi", phone: "+91 98765 43217",
      email: "pizza@fiesta.com", rating: 4.5, cuisine: ["Italian", "Continental"],
      address: "Koramangala, Bangalore", city: "Bangalore", deliveryTime: "25-30 mins",
      priceRange: "₹420 for two", offers: "Free garlic bread on orders above ₹399",
      badges: ["Bestseller"], features: ["Home Delivery", "Parking", "WiFi"],
      openingTime: "11:00", closingTime: "23:30", deliveryAvailable: true, status: "Active",
      description: "Wood-fired pizzas and Italian delicacies", image: null
    },
    {
      id: 9, name: "Bombay Streets", contactPerson: "Ashok Patil", phone: "+91 98765 43218",
      email: "bombay@streets.com", rating: 4.6, cuisine: ["Street Food", "North Indian"],
      address: "Indiranagar, Bangalore", city: "Bangalore", deliveryTime: "20-25 mins",
      priceRange: "₹180 for two", offers: "Combo meals starting at ₹99",
      badges: ["Pure Veg", "Fast Delivery"], features: ["Takeaway", "Late Night"],
      openingTime: "10:00", closingTime: "02:00", deliveryAvailable: true, status: "Active",
      description: "Mumbai street food in Bangalore", image: null
    },
    {
      id: 10, name: "Green Salad Bar", contactPerson: "Kavita Reddy", phone: "+91 98765 43219",
      email: "green@salad.com", rating: 4.2, cuisine: ["Healthy", "Continental"],
      address: "HSR Layout, Bangalore", city: "Bangalore", deliveryTime: "15-20 mins",
      priceRange: "₹320 for two", offers: "Free juice with salad bowls", badges: ["Pure Veg"],
      features: ["Eco-Friendly", "Contactless Delivery"], openingTime: "08:00",
      closingTime: "21:00", deliveryAvailable: true, status: "Active",
      description: "Fresh and healthy salad options", image: null
    },
    {
      id: 11, name: "Sushi World", contactPerson: "Kenji Tanaka", phone: "+91 98765 43220",
      email: "sushi@world.com", rating: 4.8, cuisine: ["Japanese", "Sushi"],
      address: "Whitefield, Bangalore", city: "Bangalore", deliveryTime: "40-45 mins",
      priceRange: "₹650 for two", offers: "Premium sushi platter deals",
      badges: ["Award Winner", "Trending"], features: ["Bar Available", "Valet", "AC"],
      openingTime: "12:00", closingTime: "23:00", deliveryAvailable: true, status: "Active",
      description: "Authentic Japanese sushi experience", image: null
    },
    {
      id: 12, name: "The Burger Lab", contactPerson: "Rahul Mehra", phone: "+91 98765 43221",
      email: "burger@lab.com", rating: 4.4, cuisine: ["American", "Fast Food"],
      address: "Koramangala, Bangalore", city: "Bangalore", deliveryTime: "20-25 mins",
      priceRange: "₹280 for two", offers: "Buy 2 Get 1 Free on burgers",
      badges: ["Fast Delivery", "Bestseller"], features: ["Home Delivery", "Takeaway"],
      openingTime: "11:00", closingTime: "23:00", deliveryAvailable: true, status: "Active",
      description: "Gourmet burgers and loaded fries", image: null
    },
    {
      id: 13, name: "Cafe Mocha", contactPerson: "Nisha Kapoor", phone: "+91 98765 43222",
      email: "cafe@mocha.com", rating: 4.3, cuisine: ["Cafe", "Continental"],
      address: "MG Road, Bangalore", city: "Bangalore", deliveryTime: "25-30 mins",
      priceRange: "₹350 for two", offers: "Happy hours 3-6 PM", badges: [],
      features: ["WiFi", "Outdoor Seating", "Parking"], openingTime: "09:00",
      closingTime: "23:00", deliveryAvailable: false, status: "Active",
      description: "Cozy cafe with great ambiance", image: null
    },
    {
      id: 14, name: "Spice Route", contactPerson: "Deepak Sharma", phone: "+91 98765 43223",
      email: "spice@route.com", rating: 3.9, cuisine: ["Mughlai", "North Indian"],
      address: "Jayanagar, Bangalore", city: "Bangalore", deliveryTime: "35-40 mins",
      priceRange: "₹380 for two", offers: "Weekend family specials", badges: [],
      features: ["Family Dining", "Parking", "AC"], openingTime: "11:30",
      closingTime: "22:30", deliveryAvailable: true, status: "Inactive",
      description: "Royal Mughlai dining experience", image: null
    },
    {
      id: 15, name: "Coastal Kitchen", contactPerson: "Ramesh Shetty", phone: "+91 98765 43224",
      email: "coastal@kitchen.com", rating: 4.6, cuisine: ["Seafood", "Kerala"],
      address: "Indiranagar, Bangalore", city: "Bangalore", deliveryTime: "30-35 mins",
      priceRange: "₹480 for two", offers: "Fresh catch of the day specials",
      badges: ["Award Winner"], features: ["Home Delivery", "Catering"], openingTime: "12:00",
      closingTime: "22:00", deliveryAvailable: true, status: "Active",
      description: "Coastal delicacies and fresh seafood", image: null
    }
  ],
  
};
