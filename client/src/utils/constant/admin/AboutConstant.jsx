import {  
  Users, 
  Award,
  Clock,
  Shield,
  Smile,
  Truck,
  ChefHat,
  Utensils,
  Star,
  MapPin,
  IndianRupee,
  Leaf,
  Heart
  
} from 'lucide-react';

// Section: 1
// hero section content
export const heroContent = {
  badge: "Our Story",
  title: "Our Story — Bringing Restaurant-Quality Meals to Your Doorstep",
  description:"Since 2025, Let'sFood has connected local restaurants with hungry customers through fast, reliable delivery and transparent pricing. We partner with trusted kitchens and trained delivery partners to make great food accessible — hot, fresh, and on time.",
  button: {
    text: "Contact Us",
    link: "/contact",
  },
  image: {
    src: {
      publicId: "about_hero_qbwhrh",
      format: "webp",
    },
    srcFallback: {
      publicId: "about_hero_qbwhrh",
      format: "svg",
    },
    alt: "Assortment of popular dishes ready for delivery",
    width: 400,
    height: 400,
  },
  highlights: [
    "Started with 5 local restaurant partners",
    "Now serving 500+ service areas",
    "Delivered 1M+ orders with care",
    "Growing network of 10,000+ delivery partners"
  ],
  highlightsIcon: Heart,
};

// Section: 2
// why choose us section content
export const whyChooseUsContent = {
  title: "Why Choose Us",
  subTitle: "Fast. Fresh. Fair. Always.",
  features: [
    {
      id: 1,
      icon: Truck,
      title: "Fast, Reliable Delivery",
      description: "Get your meals hot and on time. Track your order from the restaurant to your door."
    },
    {
      id: 2,
      icon: ChefHat,
      title: "Curated Local Restaurants",
      description: "We pick the best local kitchens. Enjoy trusted favorites and consistent quality."
    },
    {
      id: 3,
      icon: Star,
      title: "Real-Time Order Tracking",
      description: "See exactly where your food is. Watch it from prep to pick-up to arrival."
    },
    {
      id: 4,
      icon: IndianRupee,
      title: "Transparent, Fair Pricing",
      description: "Know what you pay. No hidden fees — just clear menu prices and simple charges."
    }
  ],
};

// Section: 3
// quality commitment section contents
export const qualityCommitmentContent = {
  title: "Our Quality Promise",
  description: "We work with local restaurants that cook great food and follow strict quality standards.",
  qualityCommitmentData: [
    {
      id: 1,
      image: {
        src: {
          publicId: "choose_restaurant_atk7va",
          format: "webp",
        },
        srcFallback: {
          publicId: "choose_restaurant_atk7va",
          format: "jpg",
        },
        alt: "Choose restaurant - curated partner kitchens",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
        pictureStyle: "w-24 h-24 overflow-hidden",
      },
      title: {
        title: "Trusted Restaurants",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "We partner with local kitchens known for quality food and high standards.",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 2,
      image: {
        src: {
          publicId: "place_order_rm820h",
          format: "webp",
        },
        srcFallback: {
          publicId: "place_order_rm820h",
          format: "jpg",
        },
        alt: "Place order - simple ordering experience",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
        pictureStyle: "w-24 h-24 overflow-hidden",
      },
      title: {
        title: "Easy Ordering",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Simple menus and clear descriptions make ordering quick and easy.",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 3,
      image: {
        src: {
          publicId: "fast_delivery_zwcycv",
          format: "webp",
        },
        srcFallback: {
          publicId: "fast_delivery_zwcycv",
          format: "jpg",
        },
        alt: "Fast delivery - tracked and punctual",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
        pictureStyle: "w-24 h-24 overflow-hidden",
      },
      title: {
        title: "Fast, Safe Delivery",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "We deliver your food fast, keeping it fresh and at the right temperature.",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
  ],
  cardType: "qualityCommitment",
};

// Section: 4
// Achievements section content
export const achievementContent = {
  stats: {
    items: [
      {
        id: 1,
        number: "1M+",
        label: "Happy Customers",
        icon: Users
      },
      {
        id: 2,
        number: "500+",
        label: "Restaurant Partners",
        icon: Award
      },
      {
        id: 3,
        number: "50+",
        label: "Cities Covered",
        icon: MapPin
      },
      {
        id: 4,
        number: "15 min",
        label: "Avg Delivery Time",
        icon: Clock
      }
    ]
  },
};

// Section: 5
// behind Scense section content
export const behindScenseContent = {
  title: "Behind the Scenes",
  subTitle: "How your food reaches you fresh and hot",
  description: "See how we work with kitchens and riders to bring your favorite meals from the stove to your door.",
  videoContent: {
    src: {
      publicId: "food_promo_video_uujljn",
      format: "mp4"
    },
    srcFallback: {
      publicId: "food_promo_video_uujljn",
      format: "",
    },
    alt: "How your food is prepared and delivered",
    width: "",
    height: "",
  },
  imageContent: {
    src: {
      publicId: "video_not_found_jyphvv",
      format: "webp",
    },
    srcFallback: {
      publicId: "video_not_found_jyphvv",
      format: "jpg",
    },
    alt: "How your food is prepared and delivered",
    height: 600,
    width: 600
  },
  deliveryProcess: [
    
    {
      id: 1,
      name: "Order Preparation",
      description: "Kitchen teams prepare each order to strict recipe and packaging guidelines to preserve taste and temperature.",
      icons: Utensils,
    },
    {
      id: 2,
      name: "Quality Check",
      description: "Every order goes through a quick quality and packaging check before it leaves the kitchen.",
      icons: Shield,
    },
    {
      id: 3,
      name: "Secure Packaging",
      description: "We use secure, insulated packaging to keep your food fresh and spill-free during transit.",
      icons: Leaf, // green/safety icon — indicates freshness & sustainability
    },
    {
      id: 4,
      name: "Delivery & Feedback",
      description: "Real-time tracking and customer feedback help us close the loop and continuously improve service.",
      icons: Smile,
    },
  ],
};
