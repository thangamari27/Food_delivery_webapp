// comboDealsContent (new)
import { IndianRupee, Search, ForkKnifeCrossed } from "lucide-react";

// section: 1
// Menu hero section content
export const heroContent = {
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

// section: 2
// Special menu content
export const specialMenuContent = {
  header: {
    title: "Special Menu",
  },
  itemPerPage: 4,
  cuisine: [
    { id: 'all', name: 'All' },
    { id: 'arabic', name: 'Arabic' },
    { id: 'thai', name: 'Thai' },
    { id: 'pakistani', name: 'Pakistani' },
    { id: 'indian', name: 'Indian' },
  ],
  specialMenuList: [
    { 
      id: 'sm1', 
      name: 'Salmon Fry', 
      cuisine: 'arabic', 
      price: 150, 
      description: '2 Salmon Fry · Chili Sauce · Soft Drinks', 
      src: "./images/food1.webp",
      srcFallback: './images/jpg/food1.jpg' 
    },
    { 
      id: 'sm2', 
      name: 'Thai Noodles', 
      cuisine: 'thai', 
      price: 130, 
      description: '2 Salmon Fry · Chili Sauce · Soft Drinks', 
      src: "./images/food2.webp",
      srcFallback: './images/jpg/food2.jpg' 
    },
    { 
      id: 'sm3', 
      name: 'Curry Chicken', 
      cuisine: 'indian', 
      price: 180, 
      description: '2 Salmon Fry · Chili Sauce · Soft Drinks', 
      src: "./images/food3.webp",
      srcFallback: './images/jpg/food3.jpg' 
    },
    { 
      id: 'sm4', 
      name: 'Chicken Biryani', 
      cuisine: 'indian', 
      price: 200, 
      description: '2 Salmon Fry · Chili Sauce · Soft Drinks', 
      src: "./images/food4.webp",
      srcFallback: './images/jpg/food4.jpg' 
    },
    { 
      id: 'sm5', 
      name: 'Pakistani Kebabs', 
      cuisine: '', 
      price: 190, 
      description: 'Marinated Beef · Fresh Salad · Yogurt Dip', 
      src: "./images/food5.webp",
      srcFallback: './images/jpg/food5.jpg' 
    },
    { 
      id: 'sm6', 
      name: 'Fattoush Salad', 
      cuisine: 'arabic', 
      price: 90, description: 'Fresh Lettuce · Tomatoes · Crispy Bread', 
      src: "./images/food6.webp",
      srcFallback: './images/jpg/food6.jpg'  
    },
    { 
      id: 'sm7', 
      name: 'Green Curry', 
      cuisine: 'thai', 
      price: 175, description: 'Spicy Coconut Milk · Bamboo Shoots', 
      src: "./images/food7.webp",
      srcFallback: './images/jpg/food7.jpg' 
    },
    { 
      id: 'sm8', 
      name: 'Butter Chicken', 
      cuisine: 'indian', 
      price: 210, 
      description: 'Creamy Tomato Sauce · Tender Chicken', 
      src: "./images/food8.webp",
      srcFallback: './images/jpg/food8.jpg' 
    },
    { 
      id: 'sm9', 
      name: 'Masala Dosa', 
      cuisine: 'indian', 
      price: 110, 
      description: 'Thin Rice Crepe · Potato Filling · Sambar', 
      src: "./images/food9.webp",
      srcFallback: './images/jpg/food9.jpg' 
    },
  ],
  specialMenuButton: {
    btntext1: "View Menu",
    btnlink1: "",
    btntext2: "Add to Cart",
    btnlink2: "",
  },
  notFound: {
    title: "",
    description: "",
    message: "No special dishes found for",
    icon: Search,
    iconSize: 48,
  },
  pagination: {

  }
}

// section: 3
// Top category section content
export const topCategoryContent = {
  header: {
    title: "Top Category",
  },
  categoryBar: [
    'All', 'Noodle Dishes', 'Rice Dishes', 'Rolls and Wraps', 'Seafood Dishes', 'Beverages',
  ],

  menuItems: [
    { 
      id: 1, 
      name: 'VEGETABLE SPRING ROLLS', 
      category: 'Rolls and Wraps', 
      ingredients: 'Ingredients: tomato, lettuce, capsicum', 
      priceTitle: "Price:",
      price: 125, 
      originalPrice: 348, 
      src: './images/food2.webp',
      srcFallback: './images/food2.jpg',
      alt: 'Vegetable spring rolls with tomato, lettuce, and capsicum'
    },
    { 
      id: 2, 
      name: 'MEXICAN TACOS WITH MEAT', 
      category: 'Rolls and Wraps', 
      ingredients: 'Ingredients: Meat, Spices', 
      priceTitle: "Price:",
      price: 325, 
      originalPrice: 348, 
      src: './images/food3.webp',
      srcFallback: './images/food3.jpg',
      alt: 'Mexican tacos with meat and spices'
    },
    { 
      id: 3, 
      name: 'SANDWICH WITH TOMATOES', 
      category: 'Rolls and Wraps', 
      ingredients: 'Ingredients: tomato, bun, cucumber', 
      priceTitle: "Price:",
      price: 125, 
      originalPrice: 348, 
      src: './images/food4.webp',
      srcFallback: './images/food4.jpg',
      alt: 'Sandwich with tomatoes, bun, and cucumber'
    },
    { 
      id: 4, 
      name: 'POPIAH DEEP FRIED SPRING ROLLS', 
      category: 'Rolls and Wraps', 
      ingredients: 'Ingredients: tomato, toffu, capsicum', 
      priceTitle: "Price:",
      price: 125, 
      originalPrice: 348, 
      src: './images/food5.webp',
      srcFallback: './images/food5.jpg',
      alt: 'Popiah deep fried spring rolls with tomato, tofu, and capsicum'
    },
    { 
      id: 5, 
      name: 'PHO GA, NOODLES, SPRING ROLLS', 
      category: 'Noodle Dishes', 
      ingredients: 'Ingredients: noodles, toffu, capsicum', 
      priceTitle: "Price:",
      price: 325, 
      originalPrice: 348, 
      src: './images/food6.webp',
      srcFallback: './images/food6.jpg',
      alt: 'Pho Ga with noodles, spring rolls, tofu, and capsicum'
    },
    { 
      id: 6, 
      name: 'SPRING ROLLS WITH CHEESE', 
      category: 'Rolls and Wraps', 
      ingredients: 'Ingredients: tomato, bun, capsicum', 
      priceTitle: "Price:",
      price: 325, 
      originalPrice: 348, 
      src: './images/food7.webp',
      srcFallback: './images/food7.jpg',
      alt: 'Spring rolls with cheese, tomato, and capsicum'
    },
    { 
      id: 7, 
      name: 'SHRIMP SPICY SHOUP', 
      category: 'Seafood Dishes', 
      ingredients: 'Ingredients: shrimp, toffu, capsicum', 
      priceTitle: "Price:",
      price: 325, 
      originalPrice: 348, 
      src: './images/food8.webp',
      srcFallback: './images/food8.jpg',
      alt: 'Spicy shrimp soup with tofu and capsicum'
    },
    { 
      id: 8, 
      name: 'NOODLES SPICY WITH SEAFOOD', 
      category: 'Noodle Dishes', 
      ingredients: 'Ingredients: noodles, seafood, capsicum', 
      priceTitle: "Price:",
      price: 325, 
      originalPrice: 348, 
      src: './images/food9.webp',
      srcFallback: './images/food9.jpg',
      alt: 'Spicy noodles with seafood and capsicum'
    },
    { 
      id: 9, 
      name: 'CHICKEN FRIED RICE', 
      category: 'Rice Dishes', 
      ingredients: 'Ingredients: rice, chicken, vegetables', 
      priceTitle: "Price:",
      price: 280, 
      originalPrice: 348, 
      src: './images/food10.webp',
      srcFallback: './images/food10.jpg',
      alt: 'Chicken fried rice with vegetables'
    },
    { 
      id: 10, 
      name: 'SEAFOOD PAELLA', 
      category: 'Rice Dishes', 
      ingredients: 'Ingredients: rice, seafood, saffron', 
      priceTitle: "Price:",
      price: 380, 
      originalPrice: 448, 
      src: './images/food1.webp',
      srcFallback: './images/food1.jpg',
      alt: 'Seafood paella with saffron'
    },
    { 
      id: 11, 
      name: 'GRILLED SALMON', 
      category: 'Seafood Dishes', 
      ingredients: 'Ingredients: salmon, lemon, herbs', 
      priceTitle: "Price:",
      price: 420, 
      originalPrice: 548, 
      src: './images/food2.webp',
      srcFallback: './images/food2.jpg',
      alt: 'Grilled salmon with lemon and herbs'
    },
    { 
      id: 12, 
      name: 'ICED LEMON TEA', 
      category: '', 
      ingredients: 'Ingredients: tea, lemon, ice', 
      priceTitle: "Price:",
      price: 80, 
      originalPrice: 120, 
      src: './images/food3.webp',
      srcFallback: './images/food3.jpg',
      alt: 'Iced lemon tea'
    }
  ],

  button: {
    btnText1: "View",
    btnLink1: "",
    btnText2: "Add Cart",
    btnLink2: "",
  },

  notFound: {
    icon: ForkKnifeCrossed,
    title: "Not Found",
    description: "Try selecting a different category or check back later for new additions.",
  },

  pagination: {
    itemsPerPage: 8,
    initialFilter: 'All',
    initialPage: 1
  }

}

// section: 4
// Combo deals section content
export const comboDealsContent = {
  header: {
    title: "Combo Deals",
    subtitle: "Pre-set meal combos | Popular pairings | Save with smart choices",
    description:"Choose from carefully curated meal combinations — family packs, pair meals, and value deals that save you time and money.",
  },
  combos: [
    {
      id: "c1",
      badge: "Best Seller",
      title: "Spicy Duo Deal",
      items: ["1 Medium Firecracker Inferno", "1 Medium Buffalo Bliss"],
      price: 21.99,
      priceSuffix: "Save 4",
      color: "bg-red-600 text-white",
      src: "./images/food3.webp",
      srcFallback:"./images/jpg/food3.jpg",
      width: "",
      height: "",
    },
    {
      id: "c2",
      badge: "Popular",
      title: "Cheese Lovers Pair",
      items: ["1 Medium Cheese Avalanche", "1 Medium Truffle Temptation"],
      price: 22.99,
      priceSuffix: "Save 5",
      color: "bg-yellow-400 text-gray-900",
      src: "./images/food2.webp",
      srcFallback:"./images/jpg/food2.jpg",
      width: "",
      height: "",
    },
    // add more combos as needed
  ],
  cta: {
    text: "Order Now",
    link: "/menu?filter=combo",
  },
  currencyIcon: IndianRupee,
};

