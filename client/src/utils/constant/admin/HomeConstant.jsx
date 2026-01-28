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
  MenuSquare,
  Building2,
  TicketPercent,
  
} from 'lucide-react';


// Header navigation links list
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu', icon: MenuSquare, },
  { name: 'Restaurant', path: '/restaurant', icon: Building2, },
  { name: 'Offers', path: '/offer', icon: TicketPercent, },
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
    path: "/login",
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
    buttonLink: "/menu",
  }, 
  image: [
      {
        src: {
          publicId: 'food1_zqr8ts',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food1_zqr8ts',
          format: 'jpg'
        },
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 600,
        height: 600,
        imageStyle: "w-full h-full object-cover",
      },
      {
        src: {
          publicId: 'food2_zmpm3c',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food2_zmpm3c',
          format: 'jpg'
        },
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 600,
        height: 600,
        imageStyle: "w-full h-full object-cover",
      },
      {
        src: {
          publicId: 'food3_ifrs58',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food3_ifrs58',
          format: 'jpg'
        },
        alt: 'Assortment of delicious dishes ready for delivery',
        width: 600,
        height: 600,
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
        src: {
          publicId: 'choose_restaurant_atk7va',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'choose_restaurant_atk7va',
          format: 'svg'
        },
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
        src: {
          publicId: 'place_order_rm820h',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'place_order_rm820h',
          format: 'svg'
        },
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
        src: {
          publicId: 'fast_delivery_zwcycv',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'fast_delivery_zwcycv',
          format: 'svg'
        },
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
    buttonLink: "/menu",
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
        src: {
          publicId: 'food1_zqr8ts',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food1_zqr8ts',
          format: 'jpg'
        },
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
        src: {
          publicId: 'food2_zmpm3c',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food2_zmpm3c',
          format: 'jpg'
        },
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
        src: {
          publicId: 'food3_ifrs58',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food3_ifrs58',
          format: 'jpg'
        },
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
        src: {
          publicId: 'food4_wzokhp',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food4_wzokhp',
          format: 'jpg'
        },
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
      buttonLink: "/menu",
      buttonStyle: "inline-flex items-center gap-2 hover:bg-gray-200 bg-orange-500 text-amber-50 border-2 border-white hover:border-2 hover:border-orange-500 hover:text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300",
    },
    popularMenuCard:  [
      {
        id: 1,
        name: "Salmon Fry",
        description: "2 Salmon Fry, Chili Sauce, Soft Drinks",
        price: 150,
        src: {
          publicId: 'food1_zqr8ts',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food1_zqr8ts',
          format: 'jpg'
        },
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
        src: {
          publicId: 'food6_ivbt39',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food6_ivbt39',
          format: 'jpg'
        },
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
        src: {
          publicId: 'food10_mifnur',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food10_mifnur',
          format: 'jpg'
        },
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
        src: {
          publicId: 'food2_zmpm3c',
          format: 'webp'
        },
        srcFallback: {
          publicId: 'food2_zmpm3c',
          format: 'jpg'
        },
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
    location: "Alangulam, India",
    rating: 5,
    text: "Amazing service! Booking my Kerala trip was super smooth. The itinerary was well-planned and the support team was very helpful.",
  },
  {
    id: 2,
    name: "Power",
    location: "Junction, India",
    rating: 4.5,
    text: "I had a great experience booking a family vacation to Goa. Everything from hotel suggestions to activities was perfectly managed.",
  },
  {
    id: 3,
    name: "Rakesh",
    location: "Pettai, India",
    rating: 5,
    text: "Excellent platform! The flight + hotel combo saved me a lot of money. Totally trustable for last-minute plans as well.",
  },

];

// Footer Section content
export const footerContent = {
  brand: {
    name: "Let's GoYum",
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