import { 
  Building2, 
  MenuSquare, 
  TicketPercent, 
  User,
  Heart,
  ShoppingCart,
  Home,
  Package,
  Calendar,
  Info,
  Briefcase,
  Phone,
  LogOut,
  X,
  Menu
} from "lucide-react";

// Navigation icons mapping
export const NAVIGATION_ICONS = {
  menu: MenuSquare,
  restaurant: Building2,
  offers: TicketPercent,
  home: Home,
  about: Info,
  services: Briefcase,
  contact: Phone
};

// Header navigation links
export const headerNavLinks = {
  loggedOut: [
    { name: 'Home', path: '/', id: 'home', icon: NAVIGATION_ICONS.home },
    { name: 'About', path: '/about', id: 'about', icon: NAVIGATION_ICONS.about },
    { name: 'Menu', path: '/menu', id: 'menu', icon: NAVIGATION_ICONS.menu },
    { name: 'Restaurant', path: '/restaurant', id: 'restaurant', icon: NAVIGATION_ICONS.restaurant },
    { name: 'Offers', path: '/offer', id: 'offers', icon: NAVIGATION_ICONS.offers },
    { name: 'Services', path: '/service', id: 'services', icon: NAVIGATION_ICONS.services },
    { name: 'Contact', path: '/contact', id: 'contact', icon: NAVIGATION_ICONS.contact }
  ],
  loggedIn: [
    { name: 'Menu', path: '/menu', id: 'menu', icon: NAVIGATION_ICONS.menu },
    { name: 'Restaurant', path: '/restaurant', id: 'restaurant', icon: NAVIGATION_ICONS.restaurant },
    { name: 'Offers', path: '/offer', id: 'offers', icon: NAVIGATION_ICONS.offers }
  ],
  ctaButtons: {
    primary: {
      text: "Sign in",
      path: "/login",
      variant: "primary",
      icon: User,
    },
    secondary: {
      text: "Get Started",
      variant: "secondary",
    },
  }
};

// Business logo and title
export const headerBrandConfig = {
  name: "Let'sFood",
  logo: "🍜",
  path: "/",
  tagline: "Fast & Delicious Food Delivery"
};

// sample user data 
export const initialUserData = {
  name: "Tmjk",
  email: "tmjk2710@gmail.com",
  phone: "+91 8248225449",
  address: "123 Main Street, tirunelveli",
  avatar: null,
  profiledropDown: {
    userActions: [
      { text: 'My Profile', icon: User, onClickKey: 'onOpenProfile' },
      { text: 'My Orders', icon: Package, onClickKey: 'onOpenOrders' },
      { text: 'Restaurant Bookings', icon: Calendar, onClickKey: 'onOpenBookings' }
    ],
    quickLinks: [
      { text: 'About Us', icon: Info, href: '/about' },
      { text: 'Services', icon: Briefcase, href: '/service' },
      { text: 'Contact Us', icon: Phone, href: '/contact' }
    ]
  },
};

// sample cart items data
export const initialCartItems = [
  { id: 1, name: 'Spicy Ramen Bowl', price: 12.99, quantity: 2, category: 'Asian', rating: 4.5 },
  { id: 2, name: 'Chicken Wings', price: 8.99, quantity: 1, category: 'American', rating: 4.8 },
  { id: 3, name: 'Caesar Salad', price: 7.50, quantity: 1, category: 'Healthy', rating: 4.3 }
];

// sample liked data items
export const initialLikedItems = [
  { id: 1, name: 'Margherita Pizza', price: 14.99, category: 'Italian', rating: 4.7, likes: 1234 },
  { id: 2, name: 'Beef Burger', price: 11.99, category: 'American', rating: 4.6, likes: 987 },
  { id: 3, name: 'Sushi Platter', price: 24.99, category: 'Japanese', rating: 4.9, likes: 2345 },
  { id: 4, name: 'Pasta Carbonara', price: 13.50, category: 'Italian', rating: 4.5, likes: 876 },
  { id: 5, name: 'Pad Thai', price: 10.99, category: 'Thai', rating: 4.4, likes: 654 },
  { id: 6, name: 'Fish Tacos', price: 9.99, category: 'Mexican', rating: 4.6, likes: 543 }
];

// Sample orders data 
export const initialOrders = [
  { 
    id: 1, 
    orderNumber: '#ORD-2024-001', 
    date: '2024-12-18', 
    status: 'delivered', 
    total: 34.48, 
    items: 3,
    itemsList: ['Spicy Ramen', 'Caesar Salad', 'Chicken Wings'],
    canCancel: false
  },
  { 
    id: 2, 
    orderNumber: '#ORD-2024-002', 
    date: '2024-12-20', 
    status: 'preparing', 
    total: 28.99, 
    items: 2,
    itemsList: ['Margherita Pizza', 'Beef Burger'],
    canCancel: true
  },
  { 
    id: 3, 
    orderNumber: '#ORD-2024-003', 
    date: '2024-12-20', 
    status: 'on_the_way', 
    total: 45.50, 
    items: 4,
    itemsList: ['Sushi Platter', 'Pad Thai', 'Fish Tacos', 'Miso Soup'],
    canCancel: false
  }
];

// sample restaurant booking data
export const initialBookings = [
  { 
    id: 1, 
    restaurant: 'Italian Corner', 
    date: '2024-12-22', 
    time: '7:00 PM', 
    guests: 4, 
    status: 'confirmed',
    canCancel: true,
    specialRequests: 'Window seat preferred'
  },
  { 
    id: 2, 
    restaurant: 'Sushi Paradise', 
    date: '2024-12-25', 
    time: '8:30 PM', 
    guests: 2, 
    status: 'pending',
    canCancel: true,
    specialRequests: 'Anniversary celebration'
  },
  { 
    id: 3, 
    restaurant: 'Mexican Fiesta', 
    date: '2024-12-19', 
    time: '6:00 PM', 
    guests: 6, 
    status: 'completed',
    canCancel: false,
    specialRequests: ''
  }
];