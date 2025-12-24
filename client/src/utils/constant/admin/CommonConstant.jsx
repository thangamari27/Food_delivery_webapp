
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
    buttonLink: "/menu",
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

export const viewItemModalContent = {
  topCategory: {
    descriptionTitle: "Description",
    prepTimeLabel: "Prep Time",
    servesLabel: "Serves",
    reviewsText: "reviews",
    defaultDescription: "Delicious and freshly prepared with the finest ingredients.",
    addToCartText: "Add to Cart",
    buttonText1: "View Details",
    buttonText2: "Quick Add"
  },

  specialMenu: {
    descriptionTitle: "About this dish",
    prepTimeLabel: "Preparation",
    servesLabel: "Best for",
    reviewsText: "ratings",
    defaultDescription: "Chef's special dish crafted with premium ingredients.",
    addToCartText: "Add to Cart",
  },
  
  // Common content
  common: {
    closeButton: "Close",
    quantityLabel: "Quantity",
    discountText: "OFF",
    saveText: "Save",
    currencySymbol: "₹",
    ratingStars: 5,
    defaultRating: 4,
    defaultReviews: 120
  }
};