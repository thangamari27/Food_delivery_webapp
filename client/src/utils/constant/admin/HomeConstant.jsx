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
  IndianRupee,
  
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
  path: "/",
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
    path: "/",
    variant: "primary",
  },
  secondary: {
    text: "Get Started",
    variant: "secondary",
  },
};

// Section: 1
// HeroSection contents
export const heroContent = {
  title: {
    title: "Fast. Fresh. Delivered",  
    highlightedText: "Food",
  },
  description: "From local favorites to late-night cravings — we deliver delicious meals at lightning speed. Trackable, reliable and ready when you are.",
  buttonContent: {
    buttonText: "Order Now",
    buttonLink: "/menu-item",
  }, 
  image: [
      {
        src: './images/food1.jpg',
        srcFallback: './images/food1.jpg',
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 1400,
        height: 840,
        imageStyle: "w-full h-full object-cover",
      },
      {
        src: './images/food2.jpg',
        srcFallback: './images/food2.jpg',
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 1400,
        height: 840,
        imageStyle: "w-full h-full object-cover",
      },
      {
        src: './images/food3.jpg',
        srcFallback: './images/food3.jpg',
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 1400,
        height: 840,
        imageStyle: "w-full h-full object-cover",
      },
    ],
};

// Section: 2
// How It work section content
export const howItWorkContent = {
  title: "How It Works",  
  subTitle: "Food Delivery Made Effortless",
  description: "From craving to delivery in three easy steps. Discover how effortless getting your favorite meals can be with our seamless ordering process.",
  howItWorksData: [
    {
      id: 1,
      image: {
        src: "",
        srcFallback: "./images/choose_restaurant.svg",
        alt: "Browse restaurants",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Choose Restaurant",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Browse through hundreds of restaurants and cuisines",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 2,
      image: {
        src: "",
        srcFallback: "./images/place_order.svg",
        alt: "Place order",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Place Your Order",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Select your favorite dishes and customize as you like",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 3,
      image: {
        src: "",
        srcFallback: "./images/fast_delivery.svg",
        alt: "Fast delivery",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Fast Delivery",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Get your food delivered hot and fresh to your doorstep",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
  ],
  cardType: "howItWorks",
}

// Section: 3
// Special Menu section header content
export const specialMenuContent = {
  title: "Our Special Menu",
  subTitle: "Discover Culinary Excellence",
  description: "Discover our most loved dishes, carefully prepared with fresh ingredients and authentic flavors that will delight your taste buds.",
  button: {
    buttonText: "View More",
    buttonLink: "/menu-items",
  },
  specialMenuData: [
    {
      id: 1,
      name: "Salmon Fry",
      description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
      price: 150,
      category: "main-course",
      badge: "Popular",
      image: {
        src: "",
        srcFallback: "./images/food1.jpg",
        alt: "Crispy Salmon Fry with chili sauce",
        width: 800,
        height: 600,
        imageStyle: "w-full h-full object-cover",
      },
      
    },
    {
      id: 2,
      name: "Thai Noodles",
      description: "Authentic Thai noodles with vegetables and special sauce",
      price: 130,
      category: "main-course",
      badge: "New",
      image: {
        src: "",
        srcFallback: "./images/food2.jpg",
        alt: "Authentic Thai Noodles",
        width: 800,
        height: 600,
        imageStyle: "w-full h-full object-cover",
      },
      
    },
    {
      id: 3,
      name: "Curry Chicken",
      description: "Spicy chicken curry with traditional herbs and spices",
      price: 180,
      category: "main-course",
      image: {
        src: "",
        srcFallback: "./images/food3.jpg",
        alt: "Spicy Chicken Curry",
        width: 800,
        height: 600,
        imageStyle: "w-full h-full object-cover",
      },
      
    },
    {
      id: 4,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with tender chicken and spices",
      price: 200,
      category: "main-course",
      badge: "Chef's Special",
      image: {
        src: "",
        srcFallback: "./images/food1.jpg",
        alt: "Chicken Biryani",
        width: 800,
        height: 600,
        imageStyle: "w-full h-full object-cover",
      },
      
    },
  ],
  cardType: "specialMenu",
};

// Section: 4
// Popular Menu Section content
export const popularMenuContent = {
    title: {
      title: "Popular Menu Cuisines",
      titleStyle: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
    },
    description: {
      description: "Discover our most loved dishes, carefully prepared with fresh ingredients",
      descriptionStyle: "max-w-2xl mx-auto text-gray-600",
    },
    button: {
      buttonText: "See All",
      buttonLink: "/popular-menu",
      buttonStyle: "inline-flex items-center gap-2 hover:bg-gray-200 bg-orange-500 text-amber-50 border-2 border-white hover:border-2 hover:border-orange-500 hover:text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300",
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
        imageStyle: "w-full h-full object-cover object-center",
        icon: IndianRupee,
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
        imageStyle: "w-full h-full object-cover object-center",
        icon: IndianRupee,

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
        imageStyle: "w-full h-full object-cover object-center",
        icon: IndianRupee,

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
        imageStyle: "w-full h-full object-cover object-center",
        icon: IndianRupee,

      },
    ],
    cardType: "popularMenu",
};

// Section: 5
// Active Offers Timer configuration
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
// Active offer contents
export const offerContent = {
  title: "Save Up To 50% Off",
  description: "LIMITED TIME OFFER",
  button: {
    buttonText: "View More",
    buttonLink: "/popular-menu",
  },
  badge: "Offer",
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

// Section: 6
// Testimonial header and button content
export const testimonialsSection = {
  title: "They Loves Our Food",
  description: "",
  button: {
    buttonText: "View More",
    buttonLink: "",
  },
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