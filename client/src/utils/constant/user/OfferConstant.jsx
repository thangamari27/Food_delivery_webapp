import { Clock, Gift, Users, Star, Zap, Home, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

// offers-data.js
export const currentOfferSection = {
  heroCarousel: [
    {
      id: 1,
      title: '30% Off',
      subtitle: 'Fitness Meal',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
    {
      id: 2,
      title: '40% Off',
      subtitle: 'Weekend Special',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      bgColor: 'bg-gradient-to-r from-red-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Free Delivery',
      subtitle: 'Orders Above $25',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-600'
    }
  ],
  
  activeOffers: [
    {
      id: 1,
      title: '20.02 NGAY HOI SHOPEEFOOD',
      subtitle: 'Limited Time Offer',
      discount: '50% OFF',
      endTime: new Date(Date.now() + 3600000 * 5),
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
      bgColor: 'bg-gradient-to-br from-red-500 to-orange-600'
    },
    {
      id: 2,
      title: 'TET SALE 15.1',
      subtitle: 'Festival Special',
      discount: 'Up to 60%',
      endTime: new Date(Date.now() + 3600000 * 12),
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
      bgColor: 'bg-gradient-to-br from-red-600 to-yellow-600'
    },
    {
      id: 3,
      title: 'BUFFET LAU 149K',
      subtitle: 'All You Can Eat',
      discount: '149K Only',
      endTime: new Date(Date.now() + 3600000 * 8),
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80',
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'SUPER DISCOUNT',
      subtitle: 'Save Big Today',
      discount: '99K OFF',
      endTime: new Date(Date.now() + 3600000 * 6),
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600'
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
};

