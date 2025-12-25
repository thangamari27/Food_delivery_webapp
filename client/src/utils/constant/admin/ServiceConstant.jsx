import { DollarSign, DollarSignIcon, IndianRupee, MapPinCheck, PackageCheck, Star } from 'lucide-react'

// section: 1
// Hero Service section content
export const serviceHeroContent = {
    leftContent: {
        title: "What We Offers",
        description: "Fresh meals delivered fast — delivery, catering, pickup and subscription plans built for every appetite.",
        button1: {
            text: "Cantact Now",
            link: "/contact",
        },
        button2: {
            text: "View Plan",
            link: "#plan",
        },
        reviews: [
            {
                id: 1,
                icon: Star,
                title: "4.8 Rating",
            },
            {
                id: 2,
                icon: PackageCheck,
                title: "500k+ Orders",
            },
            {
                id: 3,
                icon: MapPinCheck,
                title: "Global Level Service",
            },
        ]
        
    },
    rightContent: {
      src: {
        publicId: "delivery_person2_iaz4rl",
        format: 'webp',
      },
      srcFallback: {
        publicId: "delivery_person2_iaz4rl",
        format: "jpg"
      },
        alt: "delivery person",

    }
}

// section: 2
// Delivery Service section content
export const serviceDeliveryContent = {
    title: "Our Delivery Process",
    description: "We follow a structured approach to ensure quality and efficiency in every project we undertake.",
    
    carouselImages: [
        {
          src: {
            publicId: "delivery_person2_iaz4rl",
            format: 'webp',
          },
          srcFallback: {
            publicId: "delivery_person2_iaz4rl",
            format: "jpg"
          }, 
          alt: "slide1"
        },
        {
          src: {
            publicId: "delivery_person1_qcw2nm",
            format: 'webp',
          },
          srcFallback: {
            publicId: "delivery_person1_qcw2nm",
            format: "jpg"
          },
          alt: "slide2"
        },
        {
          src: {
            publicId: "choose_restaurant_atk7va",
            format: 'webp',
          },
          srcFallback: {
            publicId: "choose_restaurant_atk7va",
            format: "jpg"
          },
          alt: "slide2"
        },
        {
          src: {
            publicId: "active_support_r9wihv",
            format: 'webp',
          },
          srcFallback: {
            publicId: "active_support_r9wihv",
            format: "jpg"
          },
          alt: "slide2"
        },
        {
          src: {
            publicId: "thing_to_say_j9bqqh",
            format: 'webp',
          },
          srcFallback: {
            publicId: "thing_to_say_j9bqqh",
            format: "jpg"
          },
          alt: "slide2"
        }
    ],
    
    processList: [
        {
            step: "01",
            title: "Browse & Select Restaurant",
            subtitle: "Discover Local Eateries",
            description: "Explore a wide variety of restaurants in your area, filter by cuisine, rating, or delivery time.",
            icon: "",
            features: [
                "Browse 500+ restaurants in your city",
                "Filter by cuisine type, price range, and ratings",
                "View detailed menus with photos and reviews",
                "See estimated delivery times in real-time"
            ],
            details: "Our AI-powered recommendations help you discover new favorites based on your past orders and preferences."
        },
        {
            step: "02",
            title: "Customize Your Order",
            subtitle: "Personalize Your Meal",
            description: "Tailor your meal exactly how you want it with our easy customization options.",
            icon: "",
            features: [
                "Add special instructions for preparation",
                "Customize ingredients (extra/less of anything)",
                "Select portion sizes for family or individuals",
                "Choose meal combos for better value"
            ],
            details: "Dietary preferences? We track your allergies and preferences to suggest safe options automatically."
        },
        {
            step: "03",
            title: "Track Real-Time Delivery",
            subtitle: "Live Order Tracking",
            description: "Watch your order journey from restaurant kitchen to your doorstep in real-time.",
            icon: "",
            features: [
                "Real-time GPS tracking of your delivery partner",
                "Estimated time of arrival updates every minute",
                "Live order status (preparing, on the way, arriving)",
                "Direct chat with delivery executive"
            ],
            details: "Our intelligent routing ensures the fastest delivery while keeping your food at optimal temperature."
        },
    ]
}

// section: 3
// Catering Service section content 
export const serviceCateringContent = {
    title: "Our Catering Process",
    description: "Quality food, delivered on time, with zero stress for your special events.",
    
    carouselImages: [
        {
          src: {
            publicId: "delivery_person2_iaz4rl",
            format: 'webp',
          },
          srcFallback: {
            publicId: "delivery_person2_iaz4rl",
            format: "jpg"
          }, 
          alt: "slide1"
        },
        {
          src: {
            publicId: "delivery_person1_qcw2nm",
            format: 'webp',
          },
          srcFallback: {
            publicId: "delivery_person1_qcw2nm",
            format: "jpg"
          },
          alt: "slide2"
        },
        {
          src: {
            publicId: "choose_restaurant_atk7va",
            format: 'webp',
          },
          srcFallback: {
            publicId: "choose_restaurant_atk7va",
            format: "jpg"
          },
          alt: "slide3"
        },
        {
          src: {
            publicId: "active_support_r9wihv",
            format: 'webp',
          },
          srcFallback: {
            publicId: "active_support_r9wihv",
            format: "jpg"
          },
          alt: "slide4"
        },
        {
          src: {
            publicId: "thing_to_say_j9bqqh",
            format: 'webp',
          },
          srcFallback: {
            publicId: "thing_to_say_j9bqqh",
            format: "jpg"
          },
          alt: "slide5"
        }
    ],
    
    processList: [
        {
            step: "01",
            title: "Plan Your Menu",
            subtitle: "Easy Selection",
            description: "Pick from our catering menus or customize your own. We cater to all diets and preferences.",
            icon: "",
            features: [
                "Curated menus for different event types",
                "Vegan, gluten-free, and allergy-safe options",
                "Portion guidance based on guest count",
                "Tasting sessions available"
            ],
            details: "Get expert help choosing the right food and quantities for your event."
        },
        {
            step: "02",
            title: "Set Delivery Time",
            subtitle: "Flexible Scheduling",
            description: "Choose when you want your food delivered. We offer precise time slots.",
            icon: "",
            features: [
                "Book days, weeks, or months in advance",
                "Same-day delivery available",
                "30-minute delivery windows",
                "Live driver tracking"
            ],
            details: "Your food arrives hot and fresh, exactly when you need it."
        },
        {
            step: "03",
            title: "We Handle Everything",
            subtitle: "Stress-Free Service",
            description: "From setup to cleanup, we make catering easy so you can enjoy your event.",
            icon: "",
            features: [
                "Setup and presentation included",
                "Serving staff available",
                "Equipment provided",
                "Easy cleanup options"
            ],
            details: "Just enjoy your event - we take care of all the food details."
        },
    ]
}

// section: 4
// Pickup/Takeaway section Content 
export const pickTakeawayContent = {
  title: "How We Deliver Happiness",  
  subTitle: "From Order to Delivery, Seamlessly",
  description: "Experience the perfect blend of technology and convenience with our streamlined food delivery service designed for busy lifestyles.",
  howItWorksData: [
    {
      id: 1,
      image: {
        src: {
            publicId: "choose_restaurant_atk7va",
            format: 'webp',
          },
          srcFallback: {
            publicId: "choose_restaurant_atk7va",
            format: "jpg"
          },
        alt: "Browse restaurants",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Discover Restaurants",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Explore hundreds of local restaurants with detailed menus and ratings",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 2,
      image: {
        src: {
          publicId: "customization_service_luthoo",
          format: 'webp',
        },
        srcFallback: {
          publicId: "customization_service_luthoo",
          format: "jpg"
        },
        alt: "Customize order",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Personalize Your Order",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Customize ingredients, portions, and add special instructions",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 3,
      image: {
        src: {
          publicId: "live_tracking_voeptc",
          format: 'webp',
        },
        srcFallback: {
          publicId: "live_tracking_voeptc",
          format: "jpg"
        },
        alt: "Live tracking",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Track Live Delivery",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Real-time GPS tracking with minute-by-minute ETA updates",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
    {
      id: 4,
      image: {
        src: {
          publicId: "fast_delivery_zwcycv",
          format: 'webp',
        },
        srcFallback: {
          publicId: "fast_delivery_zwcycv",
          format: "jpg"
        },
        alt: "Contactless delivery",
        width: 96,
        height: 96,
        imageStyle: "w-full h-full object-contain",
      },
      title: {
        title: "Safe Delivery",
        titleStyle: "text-xl font-semibold text-gray-900",
      },
      description: {
        description: "Contactless delivery with temperature-controlled packaging",
        descriptionStyle: "text-gray-600 text-sm",
      },
    },
  ],
  cardType: "howItWorks",
}

// section: 5
// Pricing plan and table section Content 
export const pricingContent = {
  heading: "Choose Your Meal Plan",
  subheading: "Fresh, delicious meals delivered to your doorstep",
  periods: ['Weekly', 'Monthly', 'Yearly'],
  buttonContent: {
    text: "Get Start",
    link: "",
  },
  plans: {
    icon: IndianRupee,
    Weekly: [
      {
        id: 'basic',
        name: 'Basic',
        price: 129,
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
        id: 'family',
        name: 'Family',
        price: 249,
        popular: true,
        badgeText: "Most Popular",
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
        id: 'premium',
        name: 'Premium',
        price: 399,
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
    Monthly: [
      {
        id: 'basic',
        name: 'Basic',
        price: 459,
        savings: 15,
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
        id: 'family',
        name: 'Family',
        price: 899,
        popular: true,
        badgeText: "Most Popular",
        savings: 20,
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
        id: 'premium',
        name: 'Premium',
        price: 1399,
        savings: 25,
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
    Yearly: [
      {
        id: 'basic',
        name: 'Basic',
        price: 3999,
        savings: 30,
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
        id: 'family',
        name: 'Family',
        price: 7499,
        popular: true,
        badgeText: "Most Popular",
        savings: 35,
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
        id: 'premium',
        name: 'Premium',
        price: 10999,
        savings: 40,
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
  
  comparison: {
    title: "Compare Plan",
    tableTitle: [
      'Features','Basic','Family','Premium'
    ],
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
  }
};