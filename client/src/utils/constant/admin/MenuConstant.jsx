// comboDealsContent (new)
import { IndianRupee } from "lucide-react";

// section: 1

// section: 2
export const specialMenuContent = {
  cuisine: [
    'All', 'Arabic', 'Thai', 'Pakistani', 'Indian'
  ],
  specialMenuList: [
    { id: 1, name: 'Salmon Fry', price: 150, cuisine: 'All', description: '2 Salmon Fry · Chili Sauce · Soft Drinks', image: '🐟', isFeatured: false },
    { id: 2, name: 'Thai Noodles', price: 130, cuisine: 'Thai', description: '2 Salmon Fry · Chili Sauce · Soft Drinks', image: '🍜', isFeatured: true },
    { id: 3, name: 'Curry Chicken', price: 180, cuisine: 'Indian', description: '2 Salmon Fry · Chili Sauce · Soft Drinks', image: '🍛', isFeatured: false },
    { id: 4, name: 'Chicken Biryani', price: 200, cuisine: 'Indian', description: '2 Salmon Fry · Chili Sauce · Soft Drinks', image: '🍚', isFeatured: false },
    { id: 5, name: 'Pad Thai', price: 140, cuisine: 'Thai', description: 'Rice noodles · Peanuts · Lime', image: '🍝', isFeatured: false },
    { id: 6, name: 'Shawarma', price: 120, cuisine: 'Arabic', description: 'Grilled meat · Pita · Tahini', image: '🌯', isFeatured: false },
    { id: 7, name: 'Butter Chicken', price: 190, cuisine: 'Indian', description: 'Creamy tomato · Tender chicken', image: '🍗', isFeatured: false },
    { id: 8, name: 'Falafel Wrap', price: 110, cuisine: 'Arabic', description: 'Crispy falafel · Fresh veggies', image: '🥙', isFeatured: false },
    { id: 9, name: 'Hummus Platter', price: 95, cuisine: 'Arabic', description: 'Smooth hummus · Pita bread · Olive oil', image: '🫓', isFeatured: false },
    { id: 10, name: 'Green Curry', price: 165, cuisine: 'Thai', description: 'Coconut milk · Thai basil · Vegetables', image: '🥥', isFeatured: false }
  ]
}
// section: 3

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
      src: "./images/food3.jpg",
      srcFallback:"https://images.unsplash.com/photo-1601924582970-1d5b2f9b0d30?w=800&q=60&auto=format&fit=crop",
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
      src: "",
      srcFallback:"./images/food2.jpg",
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

