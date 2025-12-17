import { Leaf, Flame } from 'lucide-react';

// section: 1
// Restaurant filter section
export const restaurantFilterContent = {
    restaurants: [
        {
            id: 1,
            name: "Spice Garden",
            image: "./images/food4.webp",
            rating: 4.5,
            cuisine: "North Indian, Mughlai",
            address: "MG Road, Bangalore",
            deliveryTime: "30-35 mins",
            priceRange: "₹300 for two",
            offers: "50% off up to ₹100",
            badges: ["Pure Veg", "Bestseller"],
            features: ["Outdoor Seating", "Home Delivery", "Takeaway"]
        },
        {
            id: 2,
            name: "Masala Darbar",
            image: "./images/food5.webp",
            rating: 4.2,
            cuisine: "South Indian, Chinese",
            address: "Indiranagar, Bangalore",
            deliveryTime: "25-30 mins",
            priceRange: "₹250 for two",
            offers: "Free delivery on orders above ₹199",
            badges: ["Fast Delivery"],
            features: ["AC", "WiFi", "Parking"]
        },
        {
            id: 3,
            name: "Royal Biryani House",
            image: "./images/food6.webp",
            rating: 4.7,
            cuisine: "Biryani, Hyderabadi",
            address: "Koramangala, Bangalore",
            deliveryTime: "35-40 mins",
            priceRange: "₹400 for two",
            offers: "₹125 off on orders above ₹499",
            badges: ["Bestseller", "Trending"],
            features: ["Family Dining", "Late Night", "Catering"]
        },
        {
            id: 4,
            name: "Curry Leaf Express",
            image: "./images/food7.webp",
            rating: 4.0,
            cuisine: "Kerala, Seafood",
            address: "HSR Layout, Bangalore",
            deliveryTime: "40-45 mins",
            priceRange: "₹350 for two",
            offers: "10% off on all orders",
            badges: ["Pure Veg"],
            features: ["Contactless Delivery", "Eco-Friendly"]
        },
        {
            id: 5,
            name: "Tandoor Junction",
            image: "./images/food8.webp",
            rating: 4.4,
            cuisine: "Punjabi, Tandoor",
            address: "Whitefield, Bangalore",
            deliveryTime: "30-35 mins",
            priceRange: "₹450 for two",
            offers: "Buy 1 Get 1 on selected items",
            badges: ["Award Winner"],
            features: ["Live Music", "Bar Available", "Valet"]
        },
        {
            id: 6,
            name: "Dosa Palace",
            image: "./images/food9.webp",
            rating: 4.3,
            cuisine: "South Indian, Breakfast",
            address: "Jayanagar, Bangalore",
            deliveryTime: "20-25 mins",
            priceRange: "₹200 for two",
            offers: "Free dessert on orders above ₹299",
            badges: ["Pure Veg", "Fast Delivery"],
            features: ["Breakfast Specials", "Filter Coffee", "Chaat"]
        }
    ],
    filterOptions: {
        filterButton: {
            text: "Filter",
        },
        sortBy: [
            { value: "relevance", label: "Relevance" },
            { value: "rating", label: "Rating: High to Low" },
            { value: "deliveryTime", label: "Delivery Time" },
            { value: "priceLow", label: "Price: Low to High" },
            { value: "priceHigh", label: "Price: High to Low" }
        ],
        cuisines: [
            "North Indian", "South Indian", "Chinese", "Biryani", 
            "Punjabi", "Mughlai", "Seafood", "Kerala"
        ],
        dietaryPreferences: [
            { value: "veg", label: "Pure Veg", icon: Leaf },
            { value: "nonveg", label: "Non-Veg", icon: Flame }
        ],
        priceRange: [
            { value: "budget", label: "Under ₹300" },
            { value: "moderate", label: "₹300 - ₹500" },
            { value: "premium", label: "Above ₹500" }
        ],
        features: [
            "Home Delivery", "Takeaway", "Outdoor Seating", 
            "AC", "WiFi", "Parking", "Late Night"
        ]
    },
    
    reservationFormContent : {
        title: "Book a Table",
        fields: {
            name: { label: "Full Name", placeholder: "Enter your name", required: true },
            email: { label: "Email Address", placeholder: "your@email.com", required: true },
            phone: { label: "Phone Number", placeholder: "+91 00000 00000", required: true },
            guests: { label: "Number of Guests", required: true },
            date: { label: "Reservation Date", required: true },
            time: { label: "Preferred Time", required: true },
            specialRequests: { label: "Special Requests (Optional)", placeholder: "Any dietary restrictions, occasion, or seating preferences...", required: false }
        },
        guestOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        timeSlots: [
            { value: "11:00", label: "11:00 AM" },
            { value: "11:30", label: "11:30 AM" },
            { value: "12:00", label: "12:00 PM" },
            { value: "12:30", label: "12:30 PM" },
            { value: "13:00", label: "1:00 PM" },
            { value: "13:30", label: "1:30 PM" },
            { value: "14:00", label: "2:00 PM" },
            { value: "18:00", label: "6:00 PM" },
            { value: "18:30", label: "6:30 PM" },
            { value: "19:00", label: "7:00 PM" },
            { value: "19:30", label: "7:30 PM" },
            { value: "20:00", label: "8:00 PM" },
            { value: "20:30", label: "8:30 PM" },
            { value: "21:00", label: "9:00 PM" },
            { value: "21:30", label: "9:30 PM" },
            { value: "22:00", label: "10:00 PM" }
        ],
        importantInfo: {
            title: "Important Information:",
            points: [
            "Please arrive 10 minutes before your reservation time",
            "Reservations are held for 15 minutes",
            "For groups larger than 10, please call the restaurant directly"
            ]
        },
        buttons: {
            cancel: "Cancel",
            confirm: "Confirm Reservation"
        }
    },
    viewMenuContent: {
        categories: [
            {
            name: "Starters",
            items: [
                { name: "Paneer Tikka", price: "₹250", veg: true, description: "Cottage cheese marinated in spices" },
                { name: "Chicken Kebab", price: "₹300", veg: false, description: "Tender chicken pieces grilled to perfection" },
                { name: "Veg Spring Rolls", price: "₹180", veg: true, description: "Crispy rolls filled with mixed vegetables" }
            ]
            },
            {
            name: "Main Course",
            items: [
                { name: "Butter Chicken", price: "₹380", veg: false, description: "Creamy tomato-based curry with tender chicken" },
                { name: "Paneer Butter Masala", price: "₹320", veg: true, description: "Rich curry with cottage cheese cubes" },
                { name: "Biryani (Veg/Chicken)", price: "₹280/₹350", veg: false, description: "Aromatic rice dish with spices" },
                { name: "Dal Makhani", price: "₹240", veg: true, description: "Creamy black lentils slow-cooked overnight" }
            ]
            },
            {
            name: "Breads",
            items: [
                { name: "Butter Naan", price: "₹50", veg: true, description: "Soft flatbread brushed with butter" },
                { name: "Garlic Naan", price: "₹60", veg: true, description: "Naan topped with garlic and herbs" },
                { name: "Tandoori Roti", price: "₹40", veg: true, description: "Whole wheat flatbread from tandoor" }
            ]
            },
            {
            name: "Desserts",
            items: [
                { name: "Gulab Jamun", price: "₹120", veg: true, description: "Sweet milk-solid balls in sugar syrup" },
                { name: "Kulfi", price: "₹100", veg: true, description: "Traditional Indian ice cream" }
            ]
            }
        ]
    },
}

