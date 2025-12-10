import { MapPinCheck, PackageCheck, Star } from 'lucide-react'

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
        src: "./images/delivery_person2.webp",
        srcFallback: "./images/jpg/delivery_person2.jpg",
        alt: "delivery person",

    }
}

// section: 2
// Delivery Service section content
export const serviceDeliveryContent = {
    title: "Our Delivery Process",
    description: "We follow a structured approach to ensure quality and efficiency in every project we undertake.",
    
    carouselImages: [
        "./images/delivery_person1.webp",
        "./images/delivery_person2.webp",
        "./images/choose_restaurant.svg",
        "./images/place_order.svg",
        "./images/thing_to_say.svg"
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
        "./images/delivery_person1.webp",
        "./images/delivery_person2.webp",
        "./images/choose_restaurant.svg",
        "./images/place_order.svg",
        "./images/thing_to_say.svg"
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
        src: "",
        srcFallback: "./images/location_service.svg",
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
        src: "",
        srcFallback: "./images/customization_service.svg",
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
        src: "",
        srcFallback: "./images/live_tracking.svg",
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
        src: "",
        srcFallback: "./images/take_out_boxes.svg",
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