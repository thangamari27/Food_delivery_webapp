// comboDealsContent (new)
import { IndianRupee } from "lucide-react";

// section: 1

// section: 2

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

