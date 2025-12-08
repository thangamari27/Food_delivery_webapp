import { ShoppingCart, Zap, Package,
  Gift, Home, Clock, Star, Headphones
 } from 'lucide-react'

// section: 1
// Offer hero section content
export const offerHeroContent = {
  heroCarousel: [
    {
      id: 1,
      title: '30% Off',
      subtitle: 'Healthy Fitness Meals',
      description: "Power-packed meals crafted for your daily fitness routine. Fresh, balanced, and ready to fuel your day.",
      src: './images/food8.webp',
      srcFallback: './images/jpg/food8.jpg',
      alt: 'Healthy fitness meals with fresh vegetables and protein',
      bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      id: 2,
      title: '40% Off',
      subtitle: 'Weekend Specials',
      description: "Treat yourself this weekend with chef-crafted meals made to satisfy every craving.",
      src: './images/food9.webp',
      srcFallback: './images/jpg/food9.jpg',
      alt: 'Delicious weekend special meal served fresh',
      bgColor: 'bg-gradient-to-r from-red-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Free Delivery',
      subtitle: 'On Orders Above $25',
      description: "Enjoy doorstep delivery with zero extra fees. Fresh food delivered fast and hot.",
      src: './images/food6.webp',
      srcFallback: './images/jpg/food6.jpg',
      alt: 'Fresh cooked food ready for delivery',
      bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-600'
    }

  ],
}

// Section: 2
// Active Offers Timer configuration
export const offerConfig = {
  timeInterval: 1000,
  waveHeight: 32,
  endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 16 * 60 * 1000 + 33 * 1000).toISOString(),
  images: {
    left: { 
      src: './images/food8.webp',
      alt: 'Seafood pasta',
      className: "w-64 h-64 object-cover"
    },
    right: { 
      src: './images/food7.webp',
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
// Current offer card content
export const currentOfferContent = {
    activeOffers: [
    {
      id: 1,
      title: '20.02 NGAY HOI SHOPEEFOOD',
      subtitle: 'Limited Time Offer',
      discount: '50% OFF',
      include: "Combo deals, fast delivery.",
      endTime: new Date(Date.now() + 3600000 * 5),
      src: "./images/food8.webp",
      srcFallback: "./images/jpg/food8.jpg",
      alt: "offer image",
      bgColor: 'bg-gradient-to-br from-red-500 to-orange-600',
      panelContent: {
        offerTitle: "Offer:",
        includeTitle: "What's included:",
        leftButton: "Order Now",
        rightButton: "View Menu"
      },
    },
    {
      id: 2,
      title: 'TET SALE 15.1',
      subtitle: 'Festival Special',
      discount: 'Up to 60%',
      include: "Combo deals, fast delivery.",
      endTime: new Date(Date.now() + 3600000 * 12),
      src: "./images/food2.webp",
      srcFallback: "./images/jpg/food2.jpg",
      alt: "offer image",
      bgColor: 'bg-gradient-to-br from-red-600 to-yellow-600',
      panelContent: {
        offerTitle: "Offer:",
        includeTitle: "What's included:",
        leftButton: "Order Now",
        rightButton: "View Menu"
      },
    },
    {
      id: 3,
      title: 'BUFFET LAU 149K',
      subtitle: 'All You Can Eat',
      discount: '149K Only',
      include: "Combo deals, fast delivery.",
      endTime: new Date(Date.now() + 3600000 * 8),
      src: "./images/food6.webp",
      srcFallback: "./images/jpg/food6.jpg",
      alt: "offer image",
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
      panelContent: {
        offerTitle: "Offer:",
        includeTitle: "What's included:",
        leftButton: "Order Now",
        rightButton: "View Menu"
      },
    },
    {
      id: 4,
      title: 'SUPER DISCOUNT',
      subtitle: 'Save Big Today',
      discount: '99K OFF',
      include: "Combo deals, fast delivery.",
      endTime: new Date(Date.now() + 3600000 * 6),
      src: "./images/food7.webp",
      srcFallback: "./images/jpg/food7.jpg",
      alt: "offer image",
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      panelContent: {
        offerTitle: "Offer:",
        includeTitle: "What's included:",
        leftButton: "Order Now",
        rightButton: "View Menu"
      },
    }
  ],
  
  firstTimeUser: {
    welcomeDiscount: '25% OFF',
    minOrder: '$15',
    promoCode: 'WELCOME25',
    benefits: [
      { icon: 'Gift', text: 'Welcome bonus on first order' },
      { icon: 'Users', text: 'Refer friends and earn $10' },
      { icon: 'Star', text: 'Free delivery on first 3 orders' }
    ]
  },
  
  loyaltyProgram: {
    tiers: [
      { name: 'Bronze', points: '0-500', benefits: '5% cashback', color: 'bg-amber-700' },
      { name: 'Silver', points: '501-1500', benefits: '10% cashback', color: 'bg-gray-400' },
      { name: 'Gold', points: '1501-3000', benefits: '15% cashback', color: 'bg-yellow-500' },
      { name: 'Platinum', points: '3000+', benefits: '20% cashback', color: 'bg-purple-600' }
    ],
    features: [
      'Earn 1 point per $1 spent',
      'Redeem points for discounts',
      'Exclusive member-only deals',
      'Birthday special rewards'
    ]
  },
  
  serviceFeatures: [
    { icon: 'Zap', title: 'Easy to order', subtitle: 'Ordering is quick, simple' },
    { icon: 'Clock', title: 'Fastest Delivery', subtitle: 'Fast, safe, always reliable' },
    { icon: 'Home', title: 'Home Delivery', subtitle: 'Fast, fresh, food delivered' },
    { icon: 'Star', title: 'Best Quality', subtitle: 'Quality that inspires trust' },
    { icon: 'Gift', title: 'Supper Offers', subtitle: 'Save more, eat better' },
    { icon: 'TrendingUp', title: '24/7 service', subtitle: 'Service anytime, every day' }
  ],
  
  mealDeals: [
    {
      id: 1,
      title: 'Spicy Duo Deal',
      items: ['1 Medium Pepperoni Pizza', '1 Medium Buffalo Pizza'],
      originalPrice: 73.99,
      salePrice: 71.99,
      savings: 2,
      bgColor: 'bg-gradient-to-br from-pink-600 to-red-600'
    },
    {
      id: 2,
      title: 'Cheese Lovers Pair',
      items: ['1 Medium Cheese Avalanche', '1 Medium Truffy Temptation'],
      originalPrice: 27.99,
      salePrice: 22.99,
      savings: 5,
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
    },
    {
      id: 3,
      title: 'Veggie Delight Duo',
      items: ['1 Medium Mediterranean Veggie', '1 Medium Garlic Supreme'],
      originalPrice: 25.99,
      salePrice: 21.99,
      savings: 4,
      bgColor: 'bg-gradient-to-br from-green-500 to-green-700'
    },
    {
      id: 4,
      title: 'Sweet & Savory Combo',
      items: ['1 Medium Chicken Tandoori', '1 Medium Pepperoni Passion'],
      originalPrice: 25.99,
      salePrice: 21.99,
      savings: 4,
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-700'
    }
  ],
  buttonContent : {
    orderNow: 'Order Now',
    viewMenu: 'View Menu',
    close: 'Close details',
    learnMore: 'Learn More',
    applyCode: 'Apply Code'
  },
  textContent : {
    offerLabel: 'Offer:',
    whatsIncluded: 'What\'s included:',
    defaultIncluded: 'Combo deals, fast delivery.',
    welcomeBonus: 'Welcome bonus on first order',
    referFriends: 'Refer friends and earn $10',
    freeDelivery: 'Free delivery on first 3 orders'
  },
}

// Secction: 3
export const userBenefitContent = {
  header: {
    title: "Enjoy Amazing Benefits!",
    description: "Delivering Happiness, One Bite at a Time"
  },
  benefits: [
    {
      id: 1,
      icon: ShoppingCart,
      title: "Easy Ordering",
      subtitle: "Simple & Quick"
    },
    {
      id: 2,
      icon: Zap,
      title: "Fastest Delivery",
      subtitle: "Always On Time"
    },
    {
      id: 3,
      icon: Package,
      title: "Express Delivery",
      subtitle: "Lightning Fast"
    },
    {
      id: 4,
      icon: Gift,
      title: "Exclusive Offers",
      subtitle: "Special Deals For You"
    },
    {
      id: 5,
      icon: Home,
      title: "Home Delivery",
      subtitle: "Right To Your Door"
    },
    {
      id: 6,
      icon: Clock,
      title: "24/7 Service",
      subtitle: "Anytime Support"
    }
  ],
  deliveryPerson: {
    src: "./images/delivery_person1.webp",
    srcFallback: "./images/jpg/delivery_person1.jpg",
    alt: "Friendly delivery person in green uniform",

    benefits: [
      {
        id: 1,
        title: "Fast & Reliable Delivery",
        description: "Get your orders delivered within 24 hours",
        icon: Clock,
        iconColor: "text-green-500",
        iconBgColor: "bg-green-50"
      },
      {
        id: 2,
        title: "Best Quality Guarantee",
        description: "Top-rated items delivered fresh and secure",
        icon: Star,
        iconColor: "text-green-500",
        iconBgColor: "bg-green-50"
      },
      {
        id: 3,
        title: "24/7 Customer Support",
        description: "Our team is always ready to help you",
        icon: Headphones,
        iconColor: "text-green-500",
        iconBgColor: "bg-green-50"
      }
    ]

  }
}
