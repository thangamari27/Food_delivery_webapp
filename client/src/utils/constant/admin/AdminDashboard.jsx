import { MessageCircle, Utensils, AlertTriangle, Handshake, FileText, Mail, AlertCircle, Clock, CheckCircle, XCircle, ShoppingBag, UserCheck, UserX, UserPlus, Home, Bell, LogOut, Key, UserCircle, UtensilsCrossed, IndianRupee, ShoppingCart, Users, Package, ForkKnifeCrossedIcon, Building2, Search, CreditCard, Tag } from 'lucide-react';

// Top navbar content
export const headerContent = {
    logo: "GoYum",
    userGreeting: "Hello, TMJK",
    searchPlaceholder: "Search here",
    navLinks: [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Orders", href: "/admin/orders" },
        { label: "Foods", href: "/admin/foods"},
        { label: "Customer", href: "/admin/customers" },
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
          label: "Foods",
          icon: ForkKnifeCrossedIcon,
          href:"/admin/foods",
          hasSubmenu: false,
          submenu: [
          { label: "All Menus", href: "/admin/menus" },
          { label: "Add Menu", href: "/admin/menus/add" },
          ],
    },
    {
        id: 3,
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        // badge: "25",
    },
    {
        id: 4,
        label: "Offers",
        href: "/admin/offers",
        icon: Tag,
    },
    {
        id: 5,
        label: "Restaurants",
        icon: Building2,
        href: "/admin/restaurant",
        hasSubmenu: true,
        submenu: [
        { label: "Add Restaurant", href: "/admin/restaurant/add_restaurant" },
        { label: "Bookings", href: "/admin/restaurant/booking" },
        ],
    },
    {
      id: 6,
      label: "Customers",
      href: '/admin/customers',
      icon: Users,
      // hasSubmenu: false,
      submenu: [
      { label: "Add New", href: "/admin/customers/add" },
      { label: "Members", href: "/admin/customers/members" },
      { label: "General", href: "/admin/customers/general" },
      ],
    },
    {
      id: 7,
      label: "Subscription",
      href: "/admin/subscription",
      icon: CreditCard,
    },
    {
      id: 8,
      label: "Enquiry",
      href: "/admin/enquiry",
      icon: Mail,
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

// Restaurant page content
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

// Food page content
export const foodContent = {
  header: {
    title: "Food Management",
    subtitle: "Manage all food items and special menus",
    addButtonText: "Add New Food",
  },

  tableHeaders: [
    { id: 'image', label: 'Image', width: 'w-20' },
    { id: 'name', label: 'Food Name', sortable: true },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'cuisine', label: 'Cuisine', sortable: true },
    { id: 'price', label: 'Price', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'type', label: 'Type', sortable: true },
    { id: 'actions', label: 'Actions', width: 'w-32' }
  ],

  categories: [
    'Rolls & Wraps',
    'Rice Dishes',
    'Seafood',
    'Appetizers',
    'Desserts',
    'Beverages'
  ],

  cuisines: [
    'Indian',
    'Arabic',
    'Chinese',
    'Thai',
    'Italian',
    'Mexican'
  ],

  foodTypes: [
    { value: 'Regular Menu Item', label: 'Regular Menu' },
    { value: 'Special Menu Item', label: 'Special Menu' }
  ],

  statuses: [
    { value: 'Active', label: 'Active', color: 'bg-green-100 text-green-700' },
    { value: 'Inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-700' }
  ],

  restaurants: [
    { id: 1, name: 'Spice Garden' },
    { id: 2, name: 'Masala Darbar' },
    { id: 3, name: 'Royal Biryani House' },
    { id: 4, name: 'Curry Leaf Express' },
    { id: 5, name: 'Tandoor Junction' },
    { id: 6, name: 'Dosa Palace' },
    { id: 7, name: 'Dragon Wok' },
    { id: 8, name: 'Pizza Fiesta' },
    { id: 9, name: 'Bombay Streets' },
    { id: 10, name: 'Green Salad Bar' }
  ],

  filters: {
    searchPlaceholder: 'Search by food name, category, cuisine or restaurant',
    sortOptions: [
      { value: '', label: 'Sort By' },
      { value: 'recent', label: 'Recently Added' },
      { value: 'name-asc', label: 'Name (A–Z)' },
      { value: 'name-desc', label: 'Name (Z–A)' },
      { value: 'price-asc', label: 'Price (Low → High)' },
      { value: 'price-desc', label: 'Price (High → Low)' }
    ]
  },

  modal: {
    add: {
      title: 'Add New Food Item',
      submitButton: 'Add Food',
      cancelButton: 'Cancel'
    },
    edit: {
      title: 'Edit Food Item',
      submitButton: 'Update Food',
      cancelButton: 'Cancel'
    },
    view: {
      title: 'Food Details',
      editButton: 'Edit Food'
    },
    delete: {
      title: 'Delete Food Item?',
      message: 'This action cannot be undone.',
      confirmButton: 'Delete',
      cancelButton: 'Cancel'
    }
  },

  form: {
    name: {
      label: 'Food Name',
      placeholder: 'e.g. Chicken Shawarma Roll',
      required: true
    },
    category: {
      label: 'Category',
      required: true
    },
    cuisine: {
      label: 'Cuisine',
      required: true
    },
    restaurant: {
      label: 'Restaurant',
      required: true
    },
    price: {
      label: 'Price',
      placeholder: '0.00',
      required: true
    },
    originalPrice: {
      label: 'Original Price',
      placeholder: '0.00',
      required: false
    },
    description: {
      label: 'Description',
      placeholder: 'Describe ingredients or special features...',
      maxLength: 500
    },
    image: {
      label: 'Food Image',
      helper: 'JPG or WebP (Max 5MB)'
    },
    status: {
      label: 'Status',
      activeLabel: 'Active (Item will be visible to customers)'
    },
    type: {
      label: 'Food Type'
    }
  },

  emptyState: {
    title: 'No Food Items Found',
    message: 'Try adjusting your search or filters.',
    buttonText: 'Clear filters'
  },

  pagination: {
    rowsPerPageLabel: 'Rows per page',
    options: [10, 25, 50]
  },

  messages: {
    deleteConfirm: 'Are you sure you want to delete',
    deleteWarning: 'This action cannot be undone.'
  },

  sampleData: [
    { id: 1, name: 'Chicken Shawarma Roll', category: 'Rolls & Wraps', cuisine: 'Arabic', restaurant: 'Spice Garden', description: 'Grilled chicken with garlic sauce, pickles, and fresh vegetables wrapped in pita', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', type: 'Special Menu Item', status: 'Active', createdDate: '2025-01-10' },
    { id: 2, name: 'Vegetable Biryani', category: 'Rice Dishes', cuisine: 'Indian', restaurant: 'Masala Darbar', description: 'Aromatic basmati rice cooked with mixed vegetables and traditional spices', price: 10.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', type: 'Regular Menu Item', status: 'Active', createdDate: '2025-01-08' },
    { id: 3, name: 'Grilled Salmon', category: 'Seafood', cuisine: 'Thai', restaurant: 'Dragon Wok', description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables', price: 24.99, originalPrice: 29.99, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', type: 'Special Menu Item', status: 'Active', createdDate: '2025-01-12' },
    { id: 4, name: 'Pad Thai Noodles', category: 'Rice Dishes', cuisine: 'Thai', restaurant: 'Dragon Wok', description: 'Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce', price: 13.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', type: 'Regular Menu Item', status: 'Inactive', createdDate: '2025-01-05' },
    { id: 5, name: 'Falafel Wrap', category: 'Rolls & Wraps', cuisine: 'Arabic', restaurant: 'Spice Garden', description: 'Crispy falafel with hummus, tahini, and fresh salad in pita bread', price: 9.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', type: 'Regular Menu Item', status: 'Active', createdDate: '2025-01-11' }
  ]
};

// Customer page content
export const customerContent = {
  header: {
    title: 'Customer Management',
    subtitle: 'Manage all registered users and their activity',
    addButton: 'Add Customer',
    refreshButton: 'Refresh'
  },
  stats: {
    total: { label: 'Total Customers', icon: Users, color: 'orange' },
    active: { label: 'Active Customers', icon: UserCheck, color: 'green' },
    blocked: { label: 'Blocked / Inactive', icon: UserX, color: 'red' },
    new: { label: 'New This Week', icon: UserPlus, color: 'purple' }
  },
  filters: {
    searchPlaceholder: 'Search by name, phone, email, or customer ID...',
    filterButton: 'Filters',
    resetButton: 'Reset Filters',
    statusLabel: 'Account Status',
    statusOptions: [
      { value: 'all', label: 'All Status' },
      { value: 'active', label: 'Active', color: 'green' },
      { value: 'blocked', label: 'Blocked', color: 'red' },
      { value: 'inactive', label: 'Inactive', color: 'gray' }
    ],
    sortLabel: 'Sort By',
    sortOptions: [
      { value: 'newest', label: 'Recently Registered' },
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'orders', label: 'Most Orders' },
      { value: 'recent', label: 'Last Active' }
    ]
  },
  table: {
    columns: ['Customer Name', 'Email', 'Phone', 'Orders', 'Status', 'Registered', 'Actions'],
    actions: { view: 'View', edit: 'Edit', block: 'Block', unblock: 'Unblock', delete: 'Delete' }
  },
  pagination: {
    rowsPerPage: 'Rows per page:',
    showing: 'Showing',
    of: 'of',
    customers: 'customers'
  },
  form: {
    createTitle: 'Add New Customer',
    editTitle: 'Edit Customer',
    sections: {
      basic: 'Basic Information',
      address: 'Address Information',
      account: 'Account Settings'
    },
    fields: {
      name: { label: 'Full Name', placeholder: 'Enter full name', required: true },
      email: { label: 'Email Address', placeholder: 'customer@example.com', required: true },
      phone: { label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: true },
      address: { label: 'Address Line', placeholder: 'Street address' },
      city: { label: 'City', placeholder: 'City name' },
      state: { label: 'State', placeholder: 'State name' },
      postal: { label: 'Postal Code', placeholder: '600001' },
      status: { label: 'Account Status' },
      notes: { label: 'Internal Notes', placeholder: 'Add notes visible only to admin...' }
    },
    buttons: { save: 'Save Customer', cancel: 'Cancel' }
  },
  viewModal: {
    title: 'Customer Details',
    editButton: 'Edit Customer',
    sections: {
      profile: 'Profile Information',
      address: 'Address Details',
      account: 'Account Information',
      activity: 'Order Summary'
    }
  },
  confirmModal: {
    block: {
      title: 'Block Customer Account',
      message: 'Are you sure you want to block this customer? They will not be able to place orders.',
      confirm: 'Block Account',
      cancel: 'Cancel'
    },
    unblock: {
      title: 'Unblock Customer Account',
      message: 'This customer will be able to place orders again.',
      confirm: 'Unblock Account',
      cancel: 'Cancel'
    },
    delete: {
      title: 'Delete Customer',
      message: 'This action cannot be undone. Customer data will be permanently removed.',
      warning: 'Customers with existing orders cannot be deleted.',
      confirm: 'Delete Customer',
      cancel: 'Cancel'
    }
  },
  empty: {
    title: 'No customers found',
    noResults: 'No customers match your filters',
    description: 'Get started by adding your first customer',
    addButton: 'Add Customer',
    resetButton: 'Reset Filters'
  },
  toast: {
    customerAdded: 'Customer added successfully',
    customerUpdated: 'Customer updated successfully',
    customerDeleted: 'Customer deleted successfully',
    statusChanged: 'Customer status updated',
    error: 'Something went wrong. Please try again.'
  }
};

// Subscription page content
export const subscriptionContent = {
  heading: "Choose Your Meal Plan",
  subheading: "Fresh, delicious meals delivered to your doorstep",
  periods: ['weekly', 'monthly', 'yearly'],
  button_content: {
    text: "Get Started",
    link: "",
  },
  management: {
    title: "Subscription Plans Management",
    description: "Manage meal plans, pricing, and subscription features",
    actions: {
      refresh: "Refresh",
      create_plan: "Create Plan",
      total_plans: "total plans"
    }
  },
  comparison: {
    title: "Compare Plans",
    description: "Compare features across all plan tiers",
    table_title: ['Features', 'Basic', 'Family', 'Premium'],
    features: [
      'Meals per delivery',
      'Servings per meal',
      'Delivery speed',
      'Recipe cards',
      'Support level',
      'Meal variety',
      'Dietary options',
      'Free extras',
      'Nutrition guidance',
      'Chef specials'
    ],
    basic: ['3-12', '2', 'Standard', true, 'Email', 'Basic', false, false, false, false],
    family: ['5-20', '4', 'Priority', true, 'Phone & Email', 'Premium', true, true, false, false],
    premium: ['7-30', '6', 'Same-day', true, '24/7 Priority', 'Gourmet', true, true, true, true]
  },
  plans: {
    weekly: [
      {
        id: 'basic-weekly',
        name: 'Basic',
        price: 129,
        savings: null,
        status: 'active',
        popular: false,
        badge_text: "Most Popular",
        features: [
          '3 Meals per week',
          '2 Servings per meal',
          'Standard delivery',
          'Recipe cards included',
          'Email support',
          'Basic meal options'
        ]
      },
      {
        id: 'family-weekly',
        name: 'Family',
        price: 249,
        savings: null,
        status: 'active',
        popular: true,
        badge_text: "Most Popular",
        features: [
          '5 Meals per week',
          '4 Servings per meal',
          'Priority delivery',
          'Recipe cards included',
          'Phone & email support',
          'Premium meal options',
          'Dietary customization',
          'Free dessert weekly'
        ]
      },
      {
        id: 'premium-weekly',
        name: 'Premium',
        price: 399,
        savings: null,
        status: 'active',
        popular: false,
        badge_text: "Most Popular",
        features: [
          '7 Meals per week',
          '6 Servings per meal',
          'Same-day delivery',
          'Recipe cards & videos',
          '24/7 Priority support',
          'Gourmet meal options',
          'Full dietary customization',
          'Free desserts & snacks',
          'Nutrition consultation',
          'Exclusive chef specials'
        ]
      }
    ],
    monthly: [
      {
        id: 'basic-monthly',
        name: 'Basic',
        price: 459,
        savings: 15,
        status: 'active',
        popular: false,
        badge_text: "Most Popular",
        features: [
          '12 Meals per month',
          '2 Servings per meal',
          'Standard delivery',
          'Recipe cards included',
          'Email support',
          'Basic meal options'
        ]
      },
      {
        id: 'family-monthly',
        name: 'Family',
        price: 899,
        savings: 20,
        status: 'active',
        popular: true,
        badge_text: "Most Popular",
        features: [
          '20 Meals per month',
          '4 Servings per meal',
          'Priority delivery',
          'Recipe cards included',
          'Phone & email support',
          'Premium meal options',
          'Dietary customization',
          'Free desserts weekly'
        ]
      },
      {
        id: 'premium-monthly',
        name: 'Premium',
        price: 1399,
        savings: 25,
        status: 'active',
        popular: false,
        badge_text: "Most Popular",
        features: [
          '30 Meals per month',
          '6 Servings per meal',
          'Same-day delivery',
          'Recipe cards & videos',
          '24/7 Priority support',
          'Gourmet meal options',
          'Full dietary customization',
          'Free desserts & snacks',
          'Nutrition consultation',
          'Exclusive chef specials'
        ]
      }
    ],
    yearly: [
      {
        id: 'basic-yearly',
        name: 'Basic',
        price: 3999,
        savings: 30,
        status: 'active',
        popular: false,
        badge_text: "Most Popular",
        features: [
          '12 Meals per month',
          '2 Servings per meal',
          'Standard delivery',
          'Recipe cards included',
          'Email support',
          'Basic meal options'
        ]
      },
      {
        id: 'family-yearly',
        name: 'Family',
        price: 7499,
        savings: 35,
        status: 'active',
        popular: true,
        badge_text: "Most Popular",
        features: [
          '20 Meals per month',
          '4 Servings per meal',
          'Priority delivery',
          'Recipe cards included',
          'Phone & email support',
          'Premium meal options',
          'Dietary customization',
          'Free desserts weekly'
        ]
      },
      {
        id: 'premium-yearly',
        name: 'Premium',
        price: 10999,
        savings: 40,
        status: 'active',
        popular: false,
        badge_text: "Most Popular",
        features: [
          '30 Meals per month',
          '6 Servings per meal',
          'Same-day delivery',
          'Recipe cards & videos',
          '24/7 Priority support',
          'Gourmet meal options',
          'Full dietary customization',
          'Free desserts & snacks',
          'Nutrition consultation',
          'Exclusive chef specials'
        ]
      }
    ]
  },
  plan_form: {
    labels: {
      plan_name: "Plan Name *",
      price: "Price (₹) *",
      savings: "Savings (%) - Optional",
      popular_plan: "Mark as Popular Plan",
      badge_text: "Badge Text",
      plan_status: "Plan Status",
      plan_features: "Plan Features (one per line) *",
      feature_preview: "Feature Preview:",
      features_added: "features added"
    },
    placeholders: {
      plan_name: "e.g., Basic, Family, Premium",
      price: "129",
      savings: "15",
      badge_text: "Most Popular",
      features: `3 Meals per week
2 Servings per meal
Standard delivery
Recipe cards included`
    },
    status_options: {
      active: "Active",
      inactive: "Inactive"
    },
    buttons: {
      view: "View",
      cancel: "Cancel",
      close: "Close",
      create_plan: "Create Plan",
      update_plan: "Update Plan"
    } 
  },
  confirmation: {
    delete_title: "Delete Plan",
    delete_message: "Are you sure you want to delete the {plan_name} plan? This action cannot be undone.",
    toggle_title: "{action} Plan",
    toggle_message: "Are you sure you want to {action} the {plan_name} plan?",
    buttons: {
      cancel: "Cancel",
      confirm: "Confirm"
    }
  },
  empty_state: {
    title: "No subscription plans found",
    description: "No subscription plans found for this billing period"
  },
  features_display: {
    show_more: "Show {count} more",
    show_less: "Show less"
  }
};

export const modalTypes = {
  CREATE: 'create',
  EDIT: 'edit',
  VIEW: 'view'
};

export const planStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

// Enquiry page content
export const enquiryContent = {
  header: {
    title: "Contact Enquiry Management",
    subtitle: "Manage customer messages and support requests",
    add_button_text: "New Enquiry",
  },

  stats: [
    { 
      label: 'Total Enquiries', 
      key: 'total', 
      gradient: 'bg-blue-400', 
      icon: 'Mail' 
    },
    { 
      label: 'New Enquiries', 
      key: 'new', 
      gradient: 'bg-orange-400', 
      icon: 'AlertCircle' 
    },
    { 
      label: 'In Progress', 
      key: 'in_progress', 
      gradient: 'bg-yellow-400', 
      icon: 'Clock' 
    },
    { 
      label: 'Resolved', 
      key: 'resolved', 
      gradient: 'bg-green-400', 
      icon: 'CheckCircle' 
    },
    { 
      label: 'High Priority', 
      key: 'high_priority', 
      gradient: 'bg-red-400', 
      icon: 'AlertCircle' 
    }
  ],

  table_headers: [
    { id: 'user', label: 'User', sortable: true },
    { id: 'subject', label: 'Subject', sortable: true },
    { id: 'purpose', label: 'Purpose', sortable: true },
    { id: 'priority', label: 'Priority', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'date', label: 'Date', sortable: true },
    { id: 'actions', label: 'Actions', width: 'w-32' }
  ],

  statuses: [
    { 
      value: 'New', 
      label: 'New', 
      color: 'bg-blue-100 text-blue-700', 
      dot_color: 'bg-blue-500', 
      icon: AlertCircle 
    },
    { 
      value: 'In Progress', 
      label: 'In Progress', 
      color: 'bg-yellow-100 text-yellow-700', 
      dot_color: 'bg-yellow-500', 
      icon: Clock 
    },
    { 
      value: 'Resolved', 
      label: 'Resolved', 
      color: 'bg-green-100 text-green-700', 
      dot_color: 'bg-green-500', 
      icon: CheckCircle 
    },
    { 
      value: 'Closed', 
      label: 'Closed', 
      color: 'bg-gray-100 text-gray-700', 
      dot_color: 'bg-gray-500', 
      icon: XCircle 
    }
  ],

  priorities: [
    { 
      value: 'Low', 
      label: 'Low', 
      color: 'bg-gray-100 text-gray-700', 
      dot_color: 'bg-gray-400' 
    },
    { 
      value: 'Medium', 
      label: 'Medium', 
      color: 'bg-blue-100 text-blue-700', 
      dot_color: 'bg-blue-400' 
    },
    { 
      value: 'High', 
      label: 'High', 
      color: 'bg-red-100 text-red-700', 
      dot_color: 'bg-red-500' 
    }
  ],

  purposes: [
    { 
      value: 'general', 
      label: 'General Inquiry', 
      icon: MessageCircle,
      icon_color: 'text-blue-500',
      icon_size: 'w-4 h-4'
    },
    { 
      value: 'catering', 
      label: 'Catering', 
      icon: Utensils,
      icon_color: 'text-green-500',
      icon_size: 'w-4 h-4'
    },
    { 
      value: 'complaint', 
      label: 'Complaint', 
      icon: AlertTriangle,
      icon_color: 'text-red-500',
      icon_size: 'w-4 h-4'
    },
    { 
      value: 'partnership', 
      label: 'Partnership', 
      icon: Handshake,
      icon_color: 'text-purple-500',
      icon_size: 'w-4 h-4'
    },
    { 
      value: 'other', 
      label: 'Other', 
      icon: FileText,
      icon_color: 'text-gray-500',
      icon_size: 'w-4 h-4'
    }
  ],

  filter_options: {
    status: {
      label: 'Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'New', label: 'New' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Resolved', label: 'Resolved' },
        { value: 'Closed', label: 'Closed' }
      ]
    },
    priority: {
      label: 'Priority',
      options: [
        { value: 'all', label: 'All Priorities' },
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
      ]
    },
    purpose: {
      label: 'Purpose',
      options: [
        { value: 'all', label: 'All Purposes' },
        { value: 'general', label: 'General Inquiry' },
        { value: 'catering', label: 'Catering' },
        { value: 'complaint', label: 'Complaint' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'other', label: 'Other' }
      ]
    }
  },

  modal_content: {
    view: { 
      title: 'Enquiry Details', 
      close_button: 'Close' 
    },
    reply: { 
      title: 'Reply to Enquiry', 
      submit_button: 'Send Reply', 
      cancel_button: 'Cancel' 
    },
    delete: { 
      title: 'Delete Enquiry', 
      message: 'Are you sure you want to delete this enquiry? This action cannot be undone.',
      confirm_button: 'Delete', 
      cancel_button: 'Cancel' 
    },
    create: { 
      title: 'Create Manual Enquiry', 
      submit_button: 'Create Enquiry', 
      cancel_button: 'Cancel' 
    }
  },

  form_fields: {
    name: { 
      label: 'Name', 
      placeholder: 'Customer name', 
      required: true 
    },
    email: { 
      label: 'Email', 
      placeholder: 'customer@email.com', 
      required: true 
    },
    subject: { 
      label: 'Subject', 
      placeholder: 'Brief subject line', 
      required: true 
    },
    purpose: { 
      label: 'Purpose', 
      required: true 
    },
    priority: { 
      label: 'Priority', 
      required: true 
    },
    message: { 
      label: 'Message', 
      placeholder: 'Enquiry details...', 
      required: true 
    },
    reply: { 
      label: 'Reply Message', 
      placeholder: 'Type your reply here...', 
      required: true 
    },
    internal_note: { 
      label: 'Internal Note (Optional)', 
      placeholder: 'Add internal notes...', 
      required: false 
    }
  },

  empty_state: {
    title: 'No Enquiries Found',
    message: 'There are no enquiries matching your filters. Try adjusting your search criteria.',
    icon: 'Search'
  },

  pagination: {
    rows_per_page_label: 'Rows per page:',
    rows_per_page_options: [10, 25, 50, 100],
    of_label: 'of'
  },

  search: {
    placeholder: 'Search by name, email, subject, or ID...'
  },

  action_labels: {
    view: 'View',
    reply: 'Reply',
    resolve: 'Mark as Resolved',
    delete: 'Delete'
  },

  customer_info_labels: {
    name: 'Name',
    email: 'Email',
    enquiry_id: 'Enquiry ID',
    created: 'Created',
    last_updated: 'Last Updated',
    purpose: 'Purpose'
  },

  metadata_labels: {
    status: 'Status',
    priority: 'Priority'
  }
};

export const enquiryConstants = {
  initial_filters: {
    status: 'all',
    priority: 'all',
    purpose: 'all'
  },
  default_page_size: 10,
  initial_page: 1
};


