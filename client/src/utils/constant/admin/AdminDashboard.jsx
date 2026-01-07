import { ShoppingBag, Coffee, Home, Bell, LogOut, Key, UserCircle, UtensilsCrossed, IndianRupee, ShoppingCart, Users, CheckCircle, Clock, AlertCircle, XCircle, Package, ForkKnifeCrossedIcon, Building2 } from 'lucide-react';

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