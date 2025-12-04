
// common card section styles
export const cardStylesConfig = {
  // How It Works Card Styles
  howItWorks: {
    wrapper: "flex flex-col items-center text-center space-y-4 p-6 rounded-lg 6 transition-all duration-300 group",
    imageContainer: "w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-orange-50 transition-colors duration-300",
    contentContainer: "space-y-3",
  },
  
  // Food Item Card Styles
  foodItem: {
    wrapper: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer",
    imageContainer: "w-full h-48 overflow-hidden",
    contentContainer: "p-4 space-y-2",
    priceStyle: "text-xl font-bold text-orange-500",
    ratingContainer: "flex items-center gap-2",
    ratingStyle: "text-sm text-gray-600",
    authorStyle: "",
  },
  
  // Testimonial Card Styles
  testimonial: {
    wrapper: "bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300",
    imageContainer: "w-16 h-16 rounded-full overflow-hidden mx-auto mb-4",
    contentContainer: "text-center space-y-3",
    priceStyle: "",
    ratingContainer: "flex justify-center gap-1 mb-2",
    ratingStyle: "text-yellow-400",
    authorStyle: "text-sm font-semibold text-gray-900 mt-4",
  },
  
  // Feature Card Styles
  feature: {
    wrapper: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-orange-300 transition-all duration-300",
    imageContainer: "w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4",
    contentContainer: "space-y-3",
    priceStyle: "",
    ratingContainer: "",
    ratingStyle: "",
    authorStyle: "",
  },
};

// Common grid section styles
export const gridStylesConfig = {
  howItWorks: {
    gridWrapper: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12",
  },
  foodItems: {
    gridWrapper: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  },
  testimonials: {
    gridWrapper: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  },
  features: {
    gridWrapper: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  },
};

// Active Offer Section
export const activeOfferStyles = {
    countdownTimer:{
        container: "bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center p-4 overflow-hidden relative",
        foodImage: {
            container: "absolute hidden lg:block",
            wrapper: "relative group",
            circleContainer: "absolute inset-0 bg-white rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity",
            imageStyle: "rounded-full shadow-2xl transform group-hover:scale-105 transition-transform duration-500 object-cover border-8 border-white/20",
            leftPosition: "left-10 top-1/2 -translate-y-1/2",
            rightPosition: "right-10 top-1/2 -translate-y-1/2",
        },
        offerAnimate: {
            container: "absolute inset-0 overflow-hidden pointer-events-none",
            animateTop: "absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse",
            animateBottom: "absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000",
        },
        timeCard: {
            container: "relative z-10 text-center max-w-5xl mx-auto",
            title: "text-5xl md:text-7xl font-bold text-white mb-3 drop-shadow-lg",
            description: "text-white/90 text-sm md:text-base tracking-[0.3em] mb-12 font-light",
            offerBadge: {
                container: "inline-flex items-center gap-2 mb-4",
                leftLine: "h-px w-8 bg-white/50",
                rightLine: "h-px w-8 bg-white/50",
                badge: "text-white text-sm font-medium tracking-widest uppercase",
            },
            timeBox: {
                container: "flex flex-wrap justify-center gap-4 md:gap-6",
                wrapper: "flex flex-col items-center",
                boxContainer: "bg-white rounded-2xl shadow-lg p-6 w-32 h-32 flex items-center justify-center transition-transform duration-300",
                timeText: "text-5xl font-bold text-gray-800",
                label: "text-white text-sm mt-3 font-medium tracking-wide",
            },
            button: "mt-12 px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-red-50"
        },
    },
}