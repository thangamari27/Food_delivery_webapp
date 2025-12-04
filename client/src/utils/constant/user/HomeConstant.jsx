import {
  ShoppingCart,
  Search,
  User,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Mail,
  Phone,
  
} from 'lucide-react';

// Header navigation links list
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Restaurant', path: '/restaurant' },
  { name: 'Offers', path: '/offer' },
  { name: 'Services', path: '/service' },
  { name: 'Contact', path: '/contact' },
];


// Navbar brand content
export const brandConfig = {
  name: "Let'sFood",
  logo: "🍜",
  tagline: "Fast & Delicious Food Delivery",
  icons: {
    cart: ShoppingCart,
    search: Search,
    user: User,
  },
};

// navbar and Hero section button content
export const ctaButtons = {
  primary: {
    text: "Sign in",
    variant: "primary",
  },
  secondary: {
    text: "Get Started",
    variant: "secondary",
  },
};


// HeroSection contents
export const userHeroContent = {
  title: "",
  highlightedText: "Food",
  description:
    "From local favorites to late-night cravings — we deliver delicious meals at lightning speed. Trackable, reliable and ready when you are.",
  ctaText: "Order Now",
  ctaLink: "/menu-item",
  image: [
      {
        src: './images/food1.jpg',
        srcFallback: './images/food1.jpg',
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 1400,
        height: 840,
      },
      {
        src: './images/food2.jpg',
        srcFallback: './images/food2.jpg',
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 1400,
        height: 840,
      },
      {
        src: './images/food3.jpg',
        srcFallback: './images/food3.jpg',
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 1400,
        height: 840,
      },
    ],
};

// How It work section content
export const howItWork = {
  howItWorkHeader: {
    mainHeading: "How It Works",
    subHeading: "Food Delivery Made Effortless",
    summary: "From craving to delivery in three easy steps. Discover how effortless getting your favorite meals can be with our seamless ordering process.",
  },
  howItWorkCard: [
    {
      id: 1,
      src: "",
      srcFallback: "./images/choose_restaurant.svg",
      alt: "Browse restaurants on mobile app", 
      title: "Choose Restaurant",
      tagline: "Browse local restaurants and discover menus that match your taste and mood.",
    },
    {
      id: 2,
      src: "",
      srcFallback: "./images/place_order.svg",
      alt: "Select food items and checkout", 
      title: "Place Order",
      tagline: "Customize your meal, add to cart, and checkout securely in just a few taps.",
    },
    {
      id: 3,
      src: "",
      srcFallback: "./images/fast_delivery.svg",
      alt: "Food delivery to your doorstep", 
      title: "Fast Delivery",
      tagline: "Track your order in real-time as we prepare and deliver it fresh to you.",
    },
  ],
}

// Special Menu section header content
export const specialMenuContent = {
  specialMenuHeader: {
    title: "Our Special Menu",
    description: "Discover our most loved dishes, carefully prepared with fresh ingredients"
  },
  viewAll: {
    viewAllText: "View More",
    viewAllLink: "/menu-items",
  },
  specialMenuCard: [
      {
      id: 1,
      name: "Salmon Fry",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 150,
      src: "",
      srcFallback: "./images/food1.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
    {
      id: 2,
      name: "Thai Noodles",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 130,
      src: "",
      srcFallback: "./images/food2.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
    {
      id: 3,
      name: "Curry Chicken",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 180,
      src: "",
      srcFallback: "./images/food3.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
    {
      id: 4,
      name: "Chicken Biryani",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 200,
      src: "",
      srcFallback: "./images/food1.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
  ],
}

// Popular menu content
export const popularMenuContent = {
  popularMenuHeader: {
    title: "Popular Menu Cuisines",
    description: "Discover our most loved dishes, carefully prepared with fresh ingredients",
  },
  viewAll: {
    viewAllText: "",
    viewAllLink: "/popular-menu",
  },
  popularMenuCard:  [
      {
      id: 1,
      name: "Salmon Fry",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 150,
      src: "",
      srcFallback: "./images/food1.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
    {
      id: 2,
      name: "Thai Noodles",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 130,
      src: "",
      srcFallback: "./images/food2.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
    {
      id: 3,
      name: "Curry Chicken",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 180,
      src: "",
      srcFallback: "./images/food3.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
    {
      id: 4,
      name: "Chicken Biryani",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 200,
      src: "",
      srcFallback: "./images/food1.jpg",
      width: 800,
      height: 600,
      category: "main-course",
      alt: "image not found",

    },
  ],
}

// Active Offers Timer config
export const offerConfig = {
  timeInterval: 1000,
  waveHeight: 32,
  endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 16 * 60 * 1000 + 33 * 1000).toISOString(),
  images: {
    left: { 
      src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop',
      alt: 'Seafood pasta',
      className: "w-64 h-64 object-cover"
    },
    right: { 
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
      alt: 'Burgers and fries',
      className: "w-72 h-64 object-cover"
    }
  }
};

export const offerContent = {
  badge: "Offer",
  title: "Save Up To 50% Off",
  subtitle: "LIMITED TIME OFFER",
  offerExpire: "Offer Expired!",
  offerExpireDescription: "Stay tuned for more amazing deals",
  labels: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds"
  },
  offerBtn: {
    btnText: "Claim Offer Now",
    btnLink: "/menu-item"
  }
};

// Testimonial header and button content
export const testimonialsSection = {
  title: "They Loves Our Food",
  viewAllText: "View All",
  viewAllLink: "/testimonials",
  notAvailable: "No testimonials available",
};

// Testimonials
export const testimonials = [
    {
    id: 1,
    name: "Balaganesh",
    location: "Mumbai, India",
    rating: 5,
    text: "Amazing service! Booking my Kerala trip was super smooth. The itinerary was well-planned and the support team was very helpful.",
    avatar: "/images/avatar1.jpg"
  },
  {
    id: 2,
    name: "Power",
    location: "Ahmedabad, India",
    rating: 4.5,
    text: "I had a great experience booking a family vacation to Goa. Everything from hotel suggestions to activities was perfectly managed.",
    avatar: "/images/avatar2.jpg"
  },
  {
    id: 3,
    name: "Rakesh",
    location: "Bangalore, India",
    rating: 5,
    text: "Excellent platform! The flight + hotel combo saved me a lot of money. Totally trustable for last-minute plans as well.",
    avatar: "/images/avatar3.jpg"
  },

];


// Footer Section content
export const footerContent = {
  brand: {
    name: "Let'sFood",
    logo: "🍜",
    address: "Tirunelveli, Chennai, Coimbatore",
  },
  quick: {
    title: "Quick Links",
    links: [
      { name: "Home", path: "/" },
      { name: "Menu", path: "/menu" },
      { name: "Restaurant", path: "/restaurant" },
      { name: "Offers", path: "/offers" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
  contact: {
    title: "Get In Touch",
    phone: "+62 896 7311 2766",
    email: "food@example.com",
    icons: {
      phone: Phone,
      mail: Mail,
      location: MapPin,
    },
  },
  social: [
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: Instagram,
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: Facebook,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: Twitter,
    },
  ],
  copyright: `© ${new Date().getFullYear()} Let'sFood. ALL RIGHT RESERVED.`,
};
